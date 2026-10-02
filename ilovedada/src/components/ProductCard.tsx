import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import type { ShopifyProduct } from "@/lib/shopify";
import { isNewProduct, isForcedSoldOut, showOutOfStock } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { node } = product;
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants.edges[0]?.node;
  const soldOut = showOutOfStock(product);
  const cannotBuy = soldOut || !firstVariant?.availableForSale;
  // Plusieurs tailles/couleurs : le choix se fait sur la fiche produit
  const needsChoice = node.variants.edges.length > 1;

  const handleAddToCart = async (e: React.MouseEvent) => {
    if (needsChoice) return; // laisse le lien ouvrir la fiche produit
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant || cannotBuy) return;

    const ok = await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });

    if (ok) toast.success("Ajouté au panier", { description: node.title });
    else toast.error("L'ajout au panier a échoué", { description: "Réessayez dans un instant." });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
    >
      <Link to={`/product/${node.handle}`} className="group block">
        <div className="relative overflow-hidden aspect-[3/4] mb-3 rounded-lg bg-card">
          {isNewProduct(product) && (
            <span className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground font-body text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
              New
            </span>
          )}
          {soldOut && (
            <span className="absolute top-3 right-3 z-10 bg-foreground text-background font-body text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
              Out of stock
            </span>
          )}
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${soldOut ? 'opacity-70' : ''}`}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-body text-[11px] text-muted-foreground">Bientôt disponible</span>
            </div>
          )}
          <button
            onClick={handleAddToCart}
            disabled={!needsChoice && (isLoading || cannotBuy)}
            className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm text-foreground font-body text-[11px] font-medium uppercase tracking-[0.1em] py-3 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {soldOut ? "Out of stock" : needsChoice ? "Choisir" : isLoading ? <Loader2 size={12} className="animate-spin" /> : cannotBuy ? "Indisponible" : "Ajouter au panier"}
          </button>
        </div>
        <h3 className="font-body text-sm font-medium text-foreground leading-snug mb-0.5">
          {node.title}
        </h3>
        <p className="font-body text-[12px] text-muted-foreground">
          {parseFloat(price.amount).toFixed(0)} {price.currencyCode}
        </p>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
