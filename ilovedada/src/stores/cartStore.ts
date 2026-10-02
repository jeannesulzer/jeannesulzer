import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  type ShopifyProduct,
  type CartLineAttribute,
  createShopifyCart,
  addLineToShopifyCart,
  updateShopifyCartLine,
  removeLineFromShopifyCart,
  storefrontApiRequest,
  CART_QUERY,
} from '@/lib/shopify';

export interface CartItem {
  lineId: string | null;
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
  /** Personnalisation envoyée à Shopify (ex. encre et motif du simulateur) */
  attributes?: CartLineAttribute[];
}

/** Identifiant d'une ligne du panier : même variante + même personnalisation */
export function getLineKey(item: Pick<CartItem, 'variantId' | 'attributes'>): string {
  const attrs = [...(item.attributes ?? [])]
    .sort((a, b) => a.key.localeCompare(b.key))
    .map(a => `${a.key}=${a.value}`)
    .join('|');
  return attrs ? `${item.variantId}#${attrs}` : item.variantId;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  /** Renvoie true si l'article a bien été ajouté au panier Shopify */
  addItem: (item: Omit<CartItem, 'lineId'>) => Promise<boolean>;
  updateQuantity: (lineKey: string, quantity: number) => Promise<void>;
  removeItem: (lineKey: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => {
      const createCartWith = async (item: Omit<CartItem, 'lineId'>): Promise<boolean> => {
        const result = await createShopifyCart(item);
        if (!result) return false;
        set({
          cartId: result.cartId,
          checkoutUrl: result.checkoutUrl,
          items: [{ ...item, lineId: result.lineId }],
        });
        return true;
      };

      return {
        items: [],
        cartId: null,
        checkoutUrl: null,
        isLoading: false,
        isSyncing: false,

        addItem: async (item) => {
          const { items, cartId, clearCart } = get();
          const key = getLineKey(item);
          const existingItem = items.find(i => getLineKey(i) === key);

          set({ isLoading: true });
          try {
            if (!cartId) return await createCartWith(item);

            if (existingItem?.lineId) {
              const newQuantity = existingItem.quantity + item.quantity;
              const result = await updateShopifyCartLine(cartId, existingItem.lineId, newQuantity);
              if (result.success) {
                set({ items: get().items.map(i => getLineKey(i) === key ? { ...i, quantity: newQuantity } : i) });
                return true;
              }
              if (!result.cartNotFound) return false;
            } else {
              const result = await addLineToShopifyCart(cartId, item);
              if (result.success) {
                set({ items: [...get().items.filter(i => getLineKey(i) !== key), { ...item, lineId: result.lineId ?? null }] });
                return true;
              }
              if (!result.cartNotFound) return false;
            }

            // Panier expiré côté Shopify : on repart d'un panier neuf avec cet article
            clearCart();
            return await createCartWith(item);
          } catch (error) {
            console.error('Failed to add item:', error);
            return false;
          } finally {
            set({ isLoading: false });
          }
        },

        updateQuantity: async (lineKey, quantity) => {
          if (quantity <= 0) {
            await get().removeItem(lineKey);
            return;
          }
          const { items, cartId, clearCart } = get();
          const item = items.find(i => getLineKey(i) === lineKey);
          if (!item?.lineId || !cartId) return;

          set({ isLoading: true });
          try {
            const result = await updateShopifyCartLine(cartId, item.lineId, quantity);
            if (result.success) {
              set({ items: get().items.map(i => getLineKey(i) === lineKey ? { ...i, quantity } : i) });
            } else if (result.cartNotFound) {
              clearCart();
            }
          } catch (error) {
            console.error('Failed to update quantity:', error);
          } finally {
            set({ isLoading: false });
          }
        },

        removeItem: async (lineKey) => {
          const { items, cartId, clearCart } = get();
          const item = items.find(i => getLineKey(i) === lineKey);
          if (!item?.lineId || !cartId) return;

          set({ isLoading: true });
          try {
            const result = await removeLineFromShopifyCart(cartId, item.lineId);
            if (result.success) {
              const newItems = get().items.filter(i => getLineKey(i) !== lineKey);
              if (newItems.length === 0) clearCart();
              else set({ items: newItems });
            } else if (result.cartNotFound) {
              clearCart();
            }
          } catch (error) {
            console.error('Failed to remove item:', error);
          } finally {
            set({ isLoading: false });
          }
        },

        clearCart: () => set({ items: [], cartId: null, checkoutUrl: null }),
        getCheckoutUrl: () => get().checkoutUrl,

        syncCart: async () => {
          const { cartId, isSyncing, clearCart } = get();
          if (!cartId || isSyncing) return;

          set({ isSyncing: true });
          try {
            const data = await storefrontApiRequest(CART_QUERY, { id: cartId });
            if (!data) return;
            const cart = data?.data?.cart;
            if (!cart || cart.totalQuantity === 0) clearCart();
          } catch (error) {
            console.error('Failed to sync cart:', error);
          } finally {
            set({ isSyncing: false });
          }
        },
      };
    },
    {
      name: 'shopify-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, cartId: state.cartId, checkoutUrl: state.checkoutUrl }),
    }
  )
);
