import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import logoImg from "@/assets/logo-ilovedada.png";
import meImg from "@/assets/me.jpg";
import partyingImg from "@/assets/partying.jpg";
import boucharaImg from "@/assets/bouchara.jpg";
import frankImg from "@/assets/frank.jpg";
import discoFabricsImg from "@/assets/disco-fabrics.jpg";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const DOORS = [
  { to: "/qui-suis-je", label: "Qui suis-je", caption: "Avocate, chineuse, héritière Bouchara", img: boucharaImg, rot: "-2deg" },
  { to: "/histoire", label: "Histoire de la marque", caption: "Née à Phnom Penh", img: frankImg, rot: "1.5deg" },
  { to: "/eshop", label: "E-shop", caption: "Pièces uniques & nouveautés", img: discoFabricsImg, rot: "-1deg" },
];

const Index = () => (
  <div className="min-h-screen bg-background">
      {/* Hero — portrait plein cadre noir et blanc */}
      <section className="relative min-h-[92vh] md:min-h-screen overflow-hidden bg-foreground flex items-end">
        {/* Portrait plein cadre, noir et blanc */}
        <img
          src={meImg}
          alt="Jeanne Sulzer — fondatrice d'I Love Dada, portrait par Sophie Biron"
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

        {/* Tampon logo en haut à droite */}
        <motion.img
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          src={logoImg}
          alt="I Love Dada — Phnom Penh · Pyla · Sète"
          className="absolute top-24 right-6 md:top-28 md:right-12 h-16 md:h-28 w-auto z-20 drop-shadow-lg"
        />

        {/* Pin / écusson PARTYING IS A HUMAN RIGHT en haut à gauche */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -18 }}
          animate={{ opacity: 1, scale: 1, rotate: -10 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute z-20 top-24 left-6 md:top-28 md:left-12 w-20 md:w-28"
        >
          <div className="rounded-xl overflow-hidden border-[3px] border-background shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)] bg-background aspect-square p-1.5">
            <img src={partyingImg} alt="Badge Partying is a human right" className="w-full h-full object-contain" />
          </div>
        </motion.div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-12 md:pb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.35em] text-background/75 mb-5"
          >
            Phnom Penh · Pyla · Sète
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="font-poster text-background text-[7.5vw] md:text-[2.6vw] leading-[1.05] tracking-[0.14em] select-none max-w-[22ch]"
          >
            PARTYING IS A HUMAN RIGHT
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <p className="font-body text-[14px] md:text-[15px] text-background/85 max-w-md leading-relaxed">
              La fête comme droit fondamental. Des pièces uniques, brodées main,
              entre l'Asie du Sud-Est et la Méditerranée.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/simulateur" className="font-body text-[12px] md:text-[13px] font-semibold uppercase tracking-wider bg-primary text-primary-foreground px-7 py-3.5 md:px-8 md:py-4 rounded-full hover:bg-primary/90 transition-colors">
                Compose ton dada
              </a>
              <a href="/eshop" className="font-body text-[12px] md:text-[13px] font-semibold uppercase tracking-wider text-background border-2 border-background/80 px-7 py-3.5 md:px-8 md:py-4 rounded-full hover:bg-background hover:text-foreground transition-colors">
                Voir les pièces
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pourquoi Dada — en ouverture */}
      <section className="py-20 px-6 md:px-8">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center"
        >
              <div className="space-y-5">
                <h3 className="font-display text-2xl text-foreground">Pourquoi Dada ?</h3>
                <blockquote className="font-display text-lg md:text-xl text-foreground italic leading-[1.4]">
                  "DADA doute de tout. DADA est un tatou. Tout est DADA aussi."
                </blockquote>
                <p className="font-body text-[10px] text-muted-foreground/50 uppercase tracking-wider">
                  — Tristan Tzara, Manifeste Dada, 1918
                </p>
                <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Zürich, 1916. Le Cabaret Voltaire. <strong className="text-foreground">DADA</strong> est 
                    un cri contre la raison qui a engendré la guerre, contre l'art bourgeois, 
                    contre tout ce qui est figé. Le beau naît du chaos, du mélange, de l'accident heureux.
                  </p>
                  <p>
                    C'est exactement ce que je retrouve dans les tissus : la beauté inattendue 
                    du mélange, du chaos organisé, de la couleur qui résiste. 
                    La beauté n'a pas de frontières, et la mode peut être un acte de résistance.
                  </p>
                </div>
              </div>
        </motion.div>
      </section>

      {/* Portes vers les pages */}
      <section className="pb-24 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
          {DOORS.map((d, i) => (
            <motion.div key={d.to} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Link to={d.to} className="group block">
                <div className="polaroid max-w-[300px] mx-auto" style={{ transform: `rotate(${d.rot})` }}>
                  <div className="aspect-[4/5] overflow-hidden bg-muted">
                    <img src={d.img} alt={d.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <p className="polaroid-caption">{d.caption}</p>
                </div>
                <p className="mt-6 text-center font-display text-xl text-foreground flex items-center justify-center gap-2 group-hover:text-primary transition-colors">
                  {d.label} <ArrowRight size={16} />
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

    <Footer />
  </div>
);

export default Index;
