import { toast } from "sonner";
import { TSHIRT_PRODUCT_HANDLE } from "@/lib/tshirtVariants";

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'i-dada.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = 'ca7d9ce3914629fdd8bf761be8873dd5';

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    descriptionHtml?: string;
    handle: string;
    productType: string;
    tags: string[];
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

/** Produit vendu via le simulateur (/simulateur) : jamais affiché comme une pièce classique */
export function isTshirtGenerator(product: ShopifyProduct): boolean {
  return product.node.handle === TSHIRT_PRODUCT_HANDLE;
}

export function isNewProduct(product: ShopifyProduct): boolean {
  return product.node.tags?.map(t => t.toLowerCase()).includes('new') ?? false;
}

export type ProductCategory = 'all' | 'tissus' | 'vestes' | 'sacs';

export const CATEGORIES: { key: ProductCategory; label: string }[] = [
  { key: 'all', label: 'Tout' },
  { key: 'tissus', label: 'Paréos & tissus' },
  { key: 'vestes', label: 'Vestes' },
  { key: 'sacs', label: 'Sacs' },
];

const TISSU_KEYWORDS = ['sarong', 'pareo', 'paréo', 'paero', 'flag', 'drapeau', 'nappe', 'tissu', 'wrap', 'pantalon'];
const VESTE_KEYWORDS = ['perfecto', 'jacket', 'veste', 'jackette', 'liberté', 'liberte', 'freedom', 'sweat', 'hoody', 'hoodie', 'sweater', 't-shirt', 'tshirt', 'tee'];

export function categorizeProduct(product: ShopifyProduct): ProductCategory {
  const title = product.node.title.toLowerCase();
  if (TISSU_KEYWORDS.some(k => title.includes(k))) return 'tissus';
  if (VESTE_KEYWORDS.some(k => title.includes(k))) return 'vestes';
  return 'sacs'; // sacs, totes, pochettes, valisettes, computer bags…
}

/** Pièces affichées « Out of stock » sur le site, quel que soit le stock Shopify */
const FORCED_SOLD_OUT_KEYWORDS = ['week end bag', 'week-end bag', 'weekend bag', 'big weekend'];

export function isForcedSoldOut(product: ShopifyProduct): boolean {
  const title = product.node.title.toLowerCase();
  return FORCED_SOLD_OUT_KEYWORDS.some(k => title.includes(k));
}

/** Badge « Out of stock » : week-end bags forcés + vestes uniques épuisées. Jamais pour les tote bags. */
export function showOutOfStock(product: ShopifyProduct): boolean {
  const title = product.node.title.toLowerCase();
  if (title.includes('tote')) return false;
  if (isForcedSoldOut(product)) return true;
  const allSold = product.node.variants.edges.every(v => !v.node.availableForSale);
  return allSold && categorizeProduct(product) === 'vestes';
}


export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Your Shopify store needs an active billing plan. Visit admin.shopify.com to upgrade.",
    });
    return;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(`Shopify error: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }
  return data;
}

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 30) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

export async function fetchProducts(first: number = 36, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query });
  return data?.data?.products?.edges || [];
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct["node"] | null> {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data?.data?.productByHandle || null;
}

// Cart mutations
export const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) { id totalQuantity }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id attributes { key value } merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id attributes { key value } merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

/** Personnalisation transmise à Shopify avec la ligne (visible dans la commande) */
export interface CartLineAttribute {
  key: string;
  value: string;
}

export interface CartLineInput {
  variantId: string;
  quantity: number;
  attributes?: CartLineAttribute[];
}

interface CartLineNode {
  id: string;
  merchandise: { id: string };
  attributes: CartLineAttribute[];
}

function toLineInput(item: CartLineInput) {
  return { quantity: item.quantity, merchandiseId: item.variantId, attributes: item.attributes ?? [] };
}

export function sameAttributes(a: CartLineAttribute[] = [], b: CartLineAttribute[] = []): boolean {
  if (a.length !== b.length) return false;
  return a.every(x => b.some(y => y.key === x.key && y.value === x.value));
}

function findLine(lines: Array<{ node: CartLineNode }>, item: CartLineInput) {
  return lines.find(l => l.node.merchandise.id === item.variantId && sameAttributes(l.node.attributes, item.attributes))?.node;
}

interface UserError {
  field: string[] | null;
  message: string;
}

function isCartNotFoundError(userErrors: UserError[]): boolean {
  return userErrors.some(e => e.message.toLowerCase().includes('cart not found') || e.message.toLowerCase().includes('does not exist'));
}

export async function createShopifyCart(item: CartLineInput): Promise<{ cartId: string; checkoutUrl: string; lineId: string } | null> {
  const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: { lines: [toLineInput(item)] },
  });

  if (data?.data?.cartCreate?.userErrors?.length > 0) {
    console.error('Cart creation failed:', data.data.cartCreate.userErrors);
    return null;
  }

  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) return null;

  const lineId = findLine(cart.lines.edges, item)?.id ?? cart.lines.edges[0]?.node?.id;
  if (!lineId) return null;

  return { cartId: cart.id, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId };
}

export async function addLineToShopifyCart(cartId: string, item: CartLineInput): Promise<{ success: boolean; lineId?: string; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [toLineInput(item)],
  });

  const userErrors = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false };

  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  return { success: true, lineId: findLine(lines, item)?.id };
}

export async function updateShopifyCartLine(cartId: string, lineId: string, quantity: number): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  const userErrors = data?.data?.cartLinesUpdate?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false };
  return { success: true };
}

export async function removeLineFromShopifyCart(cartId: string, lineId: string): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  });

  const userErrors = data?.data?.cartLinesRemove?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false };
  return { success: true };
}
