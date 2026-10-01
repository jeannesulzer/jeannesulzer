import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import logoUrl from "@/assets/logo-ilovedada.png";
import { useCartStore } from "@/stores/cartStore";
import { fetchProductByHandle, type ShopifyProduct } from "@/lib/shopify";
import {
  TSHIRT_PRODUCT_HANDLE,
  GARMENT_OPTION_LABEL,
  getTshirtVariantId,
} from "@/lib/tshirtVariants";

/**
 * I Love Dada — Simulateur t-shirt
 * Direction "Atelier Dada" : split-panel éditorial, ombre dure bleue Dada,
 * contrôles numérotés façon atelier de sérigraphie.
 */

type ColorSwatch = {
  id: string;
  name: string;
  hex: string;
  border?: string; // pour les couleurs claires qui ont besoin d'un liseré
};

const GARMENT_COLORS: ColorSwatch[] = [
  { id: "cream", name: "Blanc cassé", hex: "#F7F4EE", border: "#161616" },
  { id: "dada", name: "Bleu Dada", hex: "#2A38D4" },
  { id: "navy", name: "Marine", hex: "#111832" },
  { id: "terracotta", name: "Terracotta", hex: "#C86B4A" },
  { id: "sand", name: "Sable", hex: "#D8C6A1" },
  { id: "olive", name: "Vert olive", hex: "#6B7A4F" },
  { id: "black", name: "Noir profond", hex: "#161616" },
];

const INK_COLORS: ColorSwatch[] = [
  { id: "dada", name: "Bleu Dada", hex: "#2A38D4" },
  { id: "black", name: "Noir", hex: "#161616" },
  { id: "cream", name: "Blanc cassé", hex: "#F7F4EE", border: "#161616" },
  { id: "yellow", name: "Jaune Sète", hex: "#F2C230" },
  { id: "terracotta", name: "Terracotta", hex: "#C86B4A" },
  { id: "olive", name: "Vert olive", hex: "#6B7A4F" },
];

type Motif = "full" | "stamp";
const MOTIFS: { id: Motif; label: string; subtitle: string; description: string }[] = [
  { id: "full", label: "Slogan + tampon", subtitle: "Le complet", description: "PARTYING IS A HUMAN RIGHT + logo circulaire" },
  { id: "stamp", label: "Tampon seul", subtitle: "Minimaliste", description: "Uniquement le logo I ♥ DADA" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
type Size = (typeof SIZES)[number];

const PRICE_EUR = 45;

/* --------- Pastille de couleur cliquable --------- */

interface SwatchButtonProps {
  color: ColorSwatch;
  selected: boolean;
  onClick: () => void;
}

const SwatchButton = ({ color, selected, onClick }: SwatchButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={color.name}
    aria-pressed={selected}
    className="relative h-10 w-10 md:h-11 md:w-11 rounded-full transition-transform duration-300 active:scale-90 hover:scale-110"
    style={{
      backgroundColor: color.hex,
      border: selected ? "2px solid hsl(var(--foreground))" : `1px solid ${color.border ?? "rgba(0,0,0,0.12)"}`,
      boxShadow: selected ? "0 0 0 3px hsl(var(--background)), 0 0 0 5px hsl(var(--foreground))" : "0 2px 6px rgba(0,0,0,0.08)",
    }}
  />
);

/* --------- Aperçu SVG du t-shirt --------- */

interface TshirtPreviewProps {
  garmentHex: string;
  garmentBorder?: string;
  inkHex: string;
  motif: Motif;
  view: "front" | "back";
}

const TshirtPreview = ({ garmentHex, garmentBorder, inkHex, motif, view }: TshirtPreviewProps) => {
  const seam = garmentBorder ?? "rgba(0,0,0,0.15)";
  return (
    <svg
      viewBox="0 0 400 480"
      className="w-full h-auto"
      role="img"
      aria-label={`Aperçu t-shirt ${view === "front" ? "face" : "dos"}`}
    >
      <defs>
        <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Ombre portée douce */}
      <ellipse cx="200" cy="462" rx="140" ry="12" fill="#000" opacity="0.1" filter="url(#soft)" />

      {/* Corps du t-shirt */}
      <path
        d="
          M 100 90
          L 60 120
          L 30 200
          L 70 220
          L 90 180
          L 90 440
          Q 90 460 110 460
          L 290 460
          Q 310 460 310 440
          L 310 180
          L 330 220
          L 370 200
          L 340 120
          L 300 90
          L 260 75
          Q 200 110 140 75
          Z
        "
        fill={garmentHex}
        stroke={seam}
        strokeWidth={garmentBorder ? 1.5 : 1}
        style={{ transition: "fill 0.4s ease" }}
      />

      {/* Coutures d'épaule et ourlets pour un rendu plus réel */}
      <path d="M 140 75 Q 200 110 260 75" fill="none" stroke={seam} strokeWidth={2.5} style={{ transition: "stroke 0.4s ease" }} />
      <path d="M 90 180 L 90 435 M 310 180 L 310 435" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth={1.5} />
      <path d="M 100 430 L 300 430" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={1.5} />

      {/* Face — slogan + tampon */}
      {view === "front" && motif === "full" && (
        <>
          <g textAnchor="middle" style={{ fontFamily: "'Anton', 'Archivo Black', sans-serif" }}>
            <text x="200" textAnchor="middle" y="172" fontSize="42" fill={inkHex} letterSpacing="-1" style={{ transition: "fill 0.4s ease" }}>PARTYING</text>
            <text x="200" textAnchor="middle" y="212" fontSize="42" fill={inkHex} letterSpacing="-1" style={{ transition: "fill 0.4s ease" }}>IS A</text>
            <text x="200" textAnchor="middle" y="252" fontSize="42" fill={inkHex} letterSpacing="-1" style={{ transition: "fill 0.4s ease" }}>HUMAN</text>
            <text x="200" textAnchor="middle" y="292" fontSize="42" fill={inkHex} letterSpacing="-1" style={{ transition: "fill 0.4s ease" }}>RIGHT</text>
          </g>
          <image href={logoUrl} x={252} y={312} width={56} height={56} preserveAspectRatio="xMidYMid meet" />
        </>
      )}

      {/* Face — tampon seul, centré poitrine */}
      {view === "front" && motif === "stamp" && (
        <image href={logoUrl} x={130} y={180} width={140} height={140} preserveAspectRatio="xMidYMid meet" />
      )}

      {/* Dos — petit tampon entre les omoplates */}
      {view === "back" && (
        <image href={logoUrl} x={165} y={165} width={70} height={70} preserveAspectRatio="xMidYMid meet" />
      )}
    </svg>
  );
};

/* --------- Page simulateur --------- */

const Simulateur = () => {
  const [garment, setGarment] = useState<ColorSwatch>(GARMENT_COLORS[0]);
  const [ink, setInk] = useState<ColorSwatch>(INK_COLORS[0]);
  const [motif, setMotif] = useState<Motif>("full");
  const [size, setSize] = useState<Size>("M");
  const [view, setView] = useState<"front" | "back">("front");

  // Empêcher un contraste catastrophique : si textile et encre identiques → on inverse l'encre
  const effectiveInk = useMemo(() => {
    if (garment.hex.toLowerCase() === ink.hex.toLowerCase()) {
      return garment.id === "cream" ? INK_COLORS[1] : INK_COLORS[2];
    }
    return ink;
  }, [garment, ink]);

  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let active = true;
    fetchProductByHandle(TSHIRT_PRODUCT_HANDLE)
      .then((node) => {
        if (active && node) setProduct({ node } as unknown as ShopifyProduct);
      })
      .catch((e) => console.error("Chargement produit simulateur:", e));
    return () => {
      active = false;
    };
  }, []);

  const handleAdd = async () => {
    const variantId = getTshirtVariantId(garment.id, size);
    if (!variantId || !product) {
      toast.error("Produit indisponible", {
        description: "Impossible de charger cette déclinaison pour le moment.",
      });
      return;
    }

    await addItem({
      product,
      variantId,
      variantTitle: `${GARMENT_OPTION_LABEL[garment.id]} / ${size}`,
      price: { amount: String(PRICE_EUR), currencyCode: "EUR" },
      quantity: 1,
      selectedOptions: [
        { name: "Couleur", value: GARMENT_OPTION_LABEL[garment.id] },
        { name: "Taille", value: size },
        { name: "Encre", value: effectiveInk.name },
        { name: "Motif", value: MOTIFS.find((m) => m.id === motif)?.label ?? "" },
      ],
    });

    setAdded(true);
    toast.success("Ajouté au panier", {
      description: `T-shirt ${garment.name} · encre ${effectiveInk.name} · taille ${size}`,
      position: "top-center",
    });
  };

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (!url) {
      toast.error("Panier vide", { description: "Ajoute d'abord un t-shirt.", position: "top-center" });
      return;
    }
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-background pt-24 md:pt-28 pb-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 bg-card shadow-[12px_12px_0_hsl(var(--primary))] lg:shadow-[24px_24px_0_hsl(var(--primary))]"
        >
          {/* ---------- Colonne visuel ---------- */}
          <div className="lg:col-span-7 relative bg-background lg:border-r border-border/40 p-6 md:p-10 flex flex-col items-center justify-center overflow-hidden">
            {/* Texture DADA en fond */}
            <div aria-hidden className="absolute inset-0 pointer-events-none flex flex-wrap content-start gap-x-6 gap-y-2 p-6 opacity-[0.035] select-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="font-poster text-8xl md:text-9xl leading-none text-foreground">
                  DADA
                </span>
              ))}
            </div>

            {/* Toggle Recto / Verso */}
            <div className="relative self-start flex gap-2 mb-6 md:mb-0 lg:absolute lg:top-8 lg:left-8 z-10">
              {(["front", "back"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={`px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase border transition-colors ${
                    view === v
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/40 text-foreground/70 hover:bg-foreground hover:text-background hover:border-foreground"
                  }`}
                >
                  {v === "front" ? "Recto" : "Verso"}
                </button>
              ))}
            </div>

            {/* T-shirt */}
            <div className="relative w-full max-w-md pt-4 lg:pt-10 pb-8">
              <TshirtPreview
                garmentHex={garment.hex}
                garmentBorder={garment.border}
                inkHex={effectiveInk.hex}
                motif={motif}
                view={view}
              />
            </div>

            <p className="relative text-[10px] uppercase tracking-[0.25em] text-foreground/40">
              Coton bio 220 g · Coupe unisexe
            </p>
          </div>

          {/* ---------- Colonne configuration ---------- */}
          <div className="lg:col-span-5 p-6 md:p-10 lg:p-12 flex flex-col">
            {/* En-tête */}
            <header className="mb-10">
              <span className="font-display italic text-primary text-xs font-bold tracking-[0.3em] uppercase block mb-3">
                L'Atelier Dada
              </span>
              <h1 className="font-display text-4xl md:text-5xl text-foreground leading-tight">
                Compose ton Dada
              </h1>
              <p className="mt-4 text-sm text-foreground/60 leading-relaxed max-w-xs">
                Choisis ta couleur, ton encre, ton motif. Chaque t-shirt est imprimé
                à la demande, en petite série, expédié depuis la France.
              </p>
            </header>

            <div className="space-y-8 lg:space-y-9">
              {/* 01. Couleur du support */}
              <section>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40 mb-3">
                  01. Couleur du support — <span className="text-foreground/70 normal-case tracking-normal">{garment.name}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {GARMENT_COLORS.map((c) => (
                    <SwatchButton
                      key={c.id}
                      color={c}
                      selected={garment.id === c.id}
                      onClick={() => setGarment(c)}
                    />
                  ))}
                </div>
              </section>

              {/* 02. Couleur de l'encre */}
              <section>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40 mb-3">
                  02. Couleur de l'encre — <span className="text-foreground/70 normal-case tracking-normal">{effectiveInk.name}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {INK_COLORS.map((c) => (
                    <SwatchButton
                      key={c.id}
                      color={c}
                      selected={ink.id === c.id}
                      onClick={() => setInk(c)}
                    />
                  ))}
                </div>
                {garment.hex.toLowerCase() === ink.hex.toLowerCase() && (
                  <p className="mt-3 text-xs text-foreground/60 italic">
                    Encre identique au textile — on inverse pour rester lisible.
                  </p>
                )}
              </section>

              {/* 03. Motif */}
              <section>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40 mb-3">
                  03. Motif graphique
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {MOTIFS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMotif(m.id)}
                      aria-pressed={motif === m.id}
                      className={`text-left p-4 transition-colors ${
                        motif === m.id
                          ? "border-2 border-primary"
                          : "border border-foreground/10 hover:border-foreground"
                      }`}
                    >
                      <span className={`block text-[10px] uppercase tracking-widest mb-1 ${motif === m.id ? "text-primary font-bold" : "text-foreground/40"}`}>
                        {m.subtitle}
                      </span>
                      <span className="block font-display text-lg leading-tight text-foreground">
                        {m.label}
                      </span>
                      <span className="block text-[11px] text-foreground/50 mt-1.5 leading-snug">
                        {m.description}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              {/* 04. Taille */}
              <section>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40 mb-3">
                  04. Taille — <span className="text-foreground/70 normal-case tracking-normal">{size}</span>
                </label>
                <div className="flex gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      aria-pressed={size === s}
                      className={`flex-1 h-12 text-sm transition-colors ${
                        size === s
                          ? "border-2 border-primary font-bold"
                          : "border border-foreground/10 font-medium hover:border-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Récapitulatif + CTA */}
            <div className="mt-auto pt-10">
              <div className="border-t border-foreground/10 pt-6 flex justify-between items-end mb-6">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                    Récapitulatif
                  </p>
                  <p className="text-xs font-bold uppercase tracking-tight italic text-foreground">
                    Tee {garment.name} / Encre {effectiveInk.name} / {size}
                  </p>
                  <p className="text-[11px] text-foreground/50">
                    {MOTIFS.find((m) => m.id === motif)?.label}
                  </p>
                </div>
                <span className="font-display text-3xl text-foreground">{PRICE_EUR},00 €</span>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={isLoading || !product}
                className="group relative w-full overflow-hidden bg-primary text-primary-foreground py-5 px-8 font-bold uppercase tracking-[0.2em] text-sm transition-colors disabled:opacity-60 disabled:pointer-events-none"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {product ? "Ajouter au panier" : "Chargement…"}
                </span>
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-0 bg-foreground transition-all duration-300 group-hover:w-full"
                />
              </button>

              {added && (
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="mt-3 w-full border-2 border-foreground text-foreground font-bold uppercase tracking-[0.2em] text-sm py-4 hover:bg-foreground hover:text-background transition-colors"
                >
                  Passer au paiement
                </button>
              )}

              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-foreground/40 text-center">
                Imprimé à la demande · Expédié sous 7–10 jours
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Simulateur;
