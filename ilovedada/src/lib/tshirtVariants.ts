// Généré automatiquement — mapping couleur textile × taille → variant Shopify
// Produit : « T-shirt PARTYING — Simulateur Dada » (handle t-shirt-partying-simulateur-dada)

export const TSHIRT_PRODUCT_HANDLE = "t-shirt-partying-simulateur-dada";
export const TSHIRT_PRODUCT_ID = "gid://shopify/Product/16138500047180";
export const TSHIRT_PRICE_EUR = 45;

/** Nom de l'option Shopify « Couleur » pour chaque couleur du simulateur */
export const GARMENT_OPTION_LABEL: Record<string, string> = {
  cream: "Blanc cassé",
  dada: "Bleu Dada",
  navy: "Marine",
  terracotta: "Terracotta",
  sand: "Sable",
  olive: "Vert olive",
  black: "Noir profond",
};

/** couleur:taille -> variantId Shopify (format GraphQL) */
export const TSHIRT_VARIANTS: Record<string, string> = {
  "cream:XS": "gid://shopify/ProductVariant/58939570192716",
  "cream:S": "gid://shopify/ProductVariant/58939570225484",
  "cream:M": "gid://shopify/ProductVariant/58939570258252",
  "cream:L": "gid://shopify/ProductVariant/58939570291020",
  "cream:XL": "gid://shopify/ProductVariant/58939570323788",
  "cream:XXL": "gid://shopify/ProductVariant/58939570356556",
  "dada:XS": "gid://shopify/ProductVariant/58939570389324",
  "dada:S": "gid://shopify/ProductVariant/58939570422092",
  "dada:M": "gid://shopify/ProductVariant/58939570454860",
  "dada:L": "gid://shopify/ProductVariant/58939570487628",
  "dada:XL": "gid://shopify/ProductVariant/58939570520396",
  "dada:XXL": "gid://shopify/ProductVariant/58939570553164",
  "navy:XS": "gid://shopify/ProductVariant/58939570585932",
  "navy:S": "gid://shopify/ProductVariant/58939570618700",
  "navy:M": "gid://shopify/ProductVariant/58939570651468",
  "navy:L": "gid://shopify/ProductVariant/58939570684236",
  "navy:XL": "gid://shopify/ProductVariant/58939570717004",
  "navy:XXL": "gid://shopify/ProductVariant/58939570749772",
  "terracotta:XS": "gid://shopify/ProductVariant/58939570782540",
  "terracotta:S": "gid://shopify/ProductVariant/58939570815308",
  "terracotta:M": "gid://shopify/ProductVariant/58939570848076",
  "terracotta:L": "gid://shopify/ProductVariant/58939570880844",
  "terracotta:XL": "gid://shopify/ProductVariant/58939570913612",
  "terracotta:XXL": "gid://shopify/ProductVariant/58939570946380",
  "sand:XS": "gid://shopify/ProductVariant/58939570979148",
  "sand:S": "gid://shopify/ProductVariant/58939571011916",
  "sand:M": "gid://shopify/ProductVariant/58939571044684",
  "sand:L": "gid://shopify/ProductVariant/58939571077452",
  "sand:XL": "gid://shopify/ProductVariant/58939571110220",
  "sand:XXL": "gid://shopify/ProductVariant/58939571142988",
  "olive:XS": "gid://shopify/ProductVariant/58939571175756",
  "olive:S": "gid://shopify/ProductVariant/58939571208524",
  "olive:M": "gid://shopify/ProductVariant/58939571241292",
  "olive:L": "gid://shopify/ProductVariant/58939571274060",
  "olive:XL": "gid://shopify/ProductVariant/58939571306828",
  "olive:XXL": "gid://shopify/ProductVariant/58939571339596",
  "black:XS": "gid://shopify/ProductVariant/58939571372364",
  "black:S": "gid://shopify/ProductVariant/58939571405132",
  "black:M": "gid://shopify/ProductVariant/58939571437900",
  "black:L": "gid://shopify/ProductVariant/58939571470668",
  "black:XL": "gid://shopify/ProductVariant/58939571503436",
  "black:XXL": "gid://shopify/ProductVariant/58939571536204",
};

export function getTshirtVariantId(garmentId: string, size: string): string | undefined {
  return TSHIRT_VARIANTS[`${garmentId}:${size}`];
}
