import logoImg from "@/assets/logo-ilovedada.png";
import meImg from "@/assets/me.jpg";
import worldImg from "@/assets/world.jpg";
import converseImg from "@/assets/converse.jpg";
import frankImg from "@/assets/frank.jpg";
import partyingImg from "@/assets/partying.jpg";
import boucharaImg from "@/assets/bouchara.jpg";
import discoFabricsImg from "@/assets/disco-fabrics.jpg";
import { motion } from "framer-motion";
import { ExpandableText } from "@/components/ExpandableText";


const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};
import Footer from "@/components/Footer";

const Histoire = () => (
  <div className="min-h-screen bg-background pt-20">
      <section id="histoire" className="py-24 px-6 md:px-8 bg-card">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUp} custom={0} className="space-y-6">
              <p className="editorial-label">Histoire de la marque</p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground leading-[1.2]">
                Née au Cambodge
              </h2>
              <ExpandableText
                lead={
                  <p>
                    <img src={logoImg} alt="I Love Dada" className="inline-block h-5 w-auto align-middle" /> est 
                    née à <strong className="text-foreground">Phnom Penh</strong>. Depuis le début, 
                    chaque création est fabriquée en collaboration avec des ONG et des artisans locaux — 
                    jamais en usine, toujours dans le respect.
                  </p>
                }
                detail={
                  <>
                    <p>
                      Au Cambodge, avec <strong className="text-foreground">Tabitha</strong> et 
                      <strong className="text-foreground"> Friends International</strong>. En Inde, au nord de Delhi 
                      avec une ONG locale, et à <strong className="text-foreground">Jaipur</strong> avec des familles 
                      et de tout petits ateliers. De chaque voyage, je rapporte des patches, 
                      des tissus, des trésors textiles qui deviendront des pièces uniques.
                    </p>
                    <p>
                      Puis il y a eu un long break — <strong className="text-foreground">la justice internationale</strong> a 
                      pris toute la place. Des années intenses, nécessaires, mais loin des ateliers 
                      et des marchés aux tissus. Aujourd'hui, c'est le retour. 
                      <img src={logoImg} alt="I Love Dada" className="inline-block h-4 w-auto align-middle" /> ne 
                      sera jamais plus que ça — de petites séries, des pièces uniques, des artisans — 
                      mais c'est essentiel pour moi. Ce site, c'est cette renaissance.
                    </p>
                  </>
                }
              />

              {/* Pourquoi Dada */}
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="grid grid-cols-12 gap-4 md:gap-6 items-center">
              {/* Tuk-tuk — polaroid vidéo */}
              <div className="col-span-7 md:col-span-6">
                <div className="polaroid max-w-[260px] mx-auto" style={{ transform: 'rotate(2deg)' }}>
                  <div className="aspect-[9/16] overflow-hidden bg-muted">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src="/videos/tuktuk.webm" type="video/webm" />
                      <source src="/videos/tuktuk.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <p className="polaroid-caption">Phnom Penh, tuk-tuk et sourire</p>
                </div>
              </div>

              {/* Fuck Hate — polaroid carrée */}
              <div className="col-span-5 md:col-span-6">
                <div className="polaroid max-w-[220px] mx-auto md:mx-0 md:ml-auto" style={{ transform: 'rotate(-2deg)' }}>
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={frankImg}
                      alt="Fuck Hate — l'esprit Dada"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="polaroid-caption">Fuck Hate · l'esprit Dada</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    <Footer />
  </div>
);

export default Histoire;
