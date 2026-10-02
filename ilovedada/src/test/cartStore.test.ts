import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCartStore, getLineKey } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";

const VARIANT = "gid://shopify/ProductVariant/1";

const product = {
  node: { id: "p1", title: "T-shirt", handle: "t", images: { edges: [] }, variants: { edges: [] } },
} as unknown as ShopifyProduct;

const tee = (encre: string) => ({
  product,
  variantId: VARIANT,
  variantTitle: "Bleu Dada / M",
  price: { amount: "45.0", currencyCode: "EUR" },
  quantity: 1,
  selectedOptions: [],
  attributes: [
    { key: "Encre", value: encre },
    { key: "Motif", value: "Slogan + tampon" },
  ],
});

/** Faux Storefront API : garde les lignes envoyées et renvoie un panier cohérent */
function mockShopify() {
  const lines: Array<{ id: string; merchandise: { id: string }; attributes: { key: string; value: string }[] }> = [];
  const calls: Array<{ query: string; variables: Record<string, unknown> }> = [];
  const cartPayload = () => ({
    id: "gid://shopify/Cart/1",
    checkoutUrl: "https://i-dada.myshopify.com/cart/c/1",
    lines: { edges: lines.map(node => ({ node })) },
  });
  const push = (input: { merchandiseId: string; attributes: { key: string; value: string }[] }) =>
    lines.push({ id: `line-${lines.length + 1}`, merchandise: { id: input.merchandiseId }, attributes: input.attributes });

  vi.stubGlobal("fetch", vi.fn(async (_url: string, init: RequestInit) => {
    const body = JSON.parse(String(init.body));
    calls.push(body);
    let data: unknown = {};
    if (body.query.includes("cartCreate")) {
      body.variables.input.lines.forEach(push);
      data = { cartCreate: { cart: cartPayload(), userErrors: [] } };
    } else if (body.query.includes("cartLinesAdd")) {
      body.variables.lines.forEach(push);
      data = { cartLinesAdd: { cart: cartPayload(), userErrors: [] } };
    }
    return new Response(JSON.stringify({ data }), { status: 200 });
  }));
  return calls;
}

describe("panier Shopify", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it("envoie l'encre et le motif à Shopify avec la ligne", async () => {
    const calls = mockShopify();
    expect(await useCartStore.getState().addItem(tee("Jaune Sète"))).toBe(true);

    const sent = calls[0].variables as { input: { lines: Array<{ attributes: unknown }> } };
    expect(sent.input.lines[0].attributes).toEqual([
      { key: "Encre", value: "Jaune Sète" },
      { key: "Motif", value: "Slogan + tampon" },
    ]);
    expect(useCartStore.getState().items[0].lineId).toBe("line-1");
  });

  it("garde deux lignes pour une même taille/couleur avec des encres différentes", async () => {
    mockShopify();
    const { addItem } = useCartStore.getState();
    await addItem(tee("Jaune Sète"));
    await addItem(tee("Noir"));

    const items = useCartStore.getState().items;
    expect(items).toHaveLength(2);
    expect(items.map(i => i.lineId)).toEqual(["line-1", "line-2"]);
    expect(getLineKey(items[0])).not.toBe(getLineKey(items[1]));
  });
});
