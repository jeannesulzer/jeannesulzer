import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { fetchProductByHandle, isForcedSoldOut, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    fetchProductByHandle(handle)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-display text-4xl font-light text-foreground mb-4">Introuvable</h1>
          <Link to="/" className="font-body text-xs uppercase tracking-widest text-primary hover:underline">Retour</Link>
        </div>
      </div>
    );
  }

  const images = product.images.edges;
  const variants = product.variants.edges;
  const selectedVariant = variants[selectedVariantIdx]?.node;
  const hasMultipleVariants = variants.length > 1 && !(variants.length === 1 && variants[0].node.title === "Default Title");

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product } as ShopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Ajouté au panier", { description: product.title });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-8">
      <div className="max-w-[1400px] mx-auto">
        <Link to="/#collections" className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft size={14} strokeWidth={1.5} /> Collections
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-3"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-card shadow-[0_24px_60px_-30px_hsl(var(--foreground)/0.35)]">
              {images[selectedImage]?.node ? (
                <img src={images[selectedImage].node.url} alt={images[selectedImage].node.altText || product.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">Pas d'image</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-24 overflow-hidden rounded-lg flex-shrink-0 transition-all ${idx === selectedImage ? 'opacity-100 ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-50 hover:opacity-90'}`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start space-y-8"
          >
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-light text-foreground leading-[1.1] mb-4">{product.title}</h1>
              <p className="font-body text-lg font-semibold text-foreground">
                {parseFloat(selectedVariant?.price.amount || "0").toFixed(0)} {selectedVariant?.price.currencyCode}
              </p>
            </div>

            {hasMultipleVariants && product.options.map((option) => (
              <div key={option.name}>
                <label className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground block mb-3">{option.name}</label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const variantIdx = variants.findIndex(v =>
                      v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                    );
                    const isSelected = selectedVariant?.selectedOptions.some(o => o.name === option.name && o.value === value);
                    return (
                      <button
                        key={value}
                        onClick={() => variantIdx >= 0 && setSelectedVariantIdx(variantIdx)}
                        className={`px-5 py-2.5 font-body text-[11px] uppercase tracking-wider border transition-all ${isSelected ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <button
              onClick={handleAddToCart}
              disabled={isCartLoading || !selectedVariant?.availableForSale || isForcedSoldOut({ node: product } as ShopifyProduct)}
              className="w-full bg-foreground text-background font-body text-[11px] font-semibold uppercase tracking-[0.2em] py-4.5 hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {isCartLoading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : selectedVariant?.availableForSale && !isForcedSoldOut({ node: product } as ShopifyProduct) ? (
                "Ajouter au panier"
              ) : (
                "Out of stock"
              )}
            </button>

            {product.description && (
              <div className="pt-4 border-t border-border">
                <div className="font-body text-sm text-muted-foreground leading-[1.8] space-y-3 [&_em]:text-[13px]" dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }} />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
