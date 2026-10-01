import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { fetchProducts, type ShopifyProduct, type ProductCategory, CATEGORIES, categorizeProduct, isNewProduct, isTshirtGenerator } from "@/lib/shopify";
import { TSHIRT_PRICE_EUR } from "@/lib/tshirtVariants";
import partyingImg from "@/assets/partying.jpg";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const Eshop = () => {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const activeCategory = (params.get("cat") as ProductCategory) || "all";
  const setActiveCategory = (c: ProductCategory) => setParams(c === "all" ? {} : { cat: c });

  useEffect(() => {
    fetchProducts(100)
      // Le t-shirt personnalisable se commande uniquement via le simulateur
      .then(all => setProducts(all.filter(p => !isTshirtGenerator(p))))
      .catch(console.error)
      .finally(() => setLoadingProducts(false));
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory !== "all") return products.filter(p => categorizeProduct(p) === activeCategory);
    const order: ProductCategory[] = ["tissus", "vestes", "sacs"];
    return [...products].sort((a, b) => order.indexOf(categorizeProduct(a)) - order.indexOf(categorizeProduct(b)));
  }, [products, activeCategory]);
  const newProducts = useMemo(() => products.filter(isNewProduct), [products]);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Atelier t-shirt */}
      {(activeCategory === 'all' || activeCategory === 'vestes') && (
        <section className="px-6 md:px-8 pt-8">
          <Link
            to="/simulateur"
            className="group max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center gap-6 md:gap-10 bg-primary text-primary-foreground rounded-2xl p-6 md:p-10 overflow-hidden"
          >
            <img
              src={partyingImg}
              alt=""
              className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-xl bg-background p-1.5 -rotate-6 transition-transform duration-500 group-hover:rotate-0 flex-shrink-0"
            />
            <div className="flex-1 text-center sm:text-left">
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">
                L'Atelier Dada
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight mt-1">
                Compose ton t-shirt
              </h2>
              <p className="font-body text-sm opacity-80 mt-2 max-w-md">
                PARTYING IS A HUMAN RIGHT : 7 couleurs de coton bio, 6 encres, imprimé à la demande.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 bg-background text-foreground font-body text-[11px] font-semibold uppercase tracking-[0.2em] px-6 py-3.5 rounded-full whitespace-nowrap">
              {TSHIRT_PRICE_EUR} € · Créer le mien
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </section>
      )}

      {/* Nouveautés */}
      {activeCategory === 'all' && newProducts.length > 0 && (
        <section id="nouveautes" className="py-16 px-6 md:px-8 scroll-mt-20 bg-card">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="inline-flex items-center justify-center bg-primary text-primary-foreground font-body text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
                New
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-foreground">
                Nouveautés
              </h2>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10"
            >
              {newProducts.map((product, idx) => (
                <ProductCard key={product.node.id} product={product} index={idx} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Products */}
      <section id="products" className="py-12 px-6 md:px-8 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <h2 className="font-display text-2xl md:text-3xl text-foreground">
              {activeCategory === 'all' ? 'Toutes les pièces' : CATEGORIES.find(c => c.key === activeCategory)?.label}
            </h2>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`font-body text-[12px] font-medium px-5 py-2 rounded-full border transition-all ${
                    activeCategory === cat.key
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {loadingProducts ? (
            <div className="flex justify-center py-24">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-body text-sm text-muted-foreground">Aucun produit dans cette catégorie.</p>
            </div>
          ) : (
            <div className="space-y-20">
              {CATEGORIES.filter(c => c.key !== 'all' && (activeCategory === 'all' || c.key === activeCategory)).map(cat => {
                const items = filteredProducts.filter(p => categorizeProduct(p) === cat.key);
                if (items.length === 0) return null;
                return (
                  <motion.div
                    key={cat.key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {activeCategory === 'all' && (
                      <div className="flex items-baseline gap-4 mb-8 border-b border-border pb-3">
                        <h3 className="font-display text-xl md:text-2xl text-foreground">{cat.label}</h3>
                        <span className="font-body text-[11px] text-muted-foreground">{items.length} pièces</span>
                      </div>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
                      {items.map((product, idx) => (
                        <ProductCard key={product.node.id} product={product} index={idx} />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Eshop;
