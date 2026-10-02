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

const QuiSuisJe = () => (
  <div className="min-h-screen bg-background pt-20">
      <section id="mon-histoire" className="py-24 px-6 md:px-8 scroll-mt-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUp} custom={0} className="space-y-8">
              <p className="editorial-label">Qui suis-je</p>
              <img src={logoImg} alt="I Love Dada" className="h-16 md:h-20 w-auto" />
              <ExpandableText
                lead={
                  <p>
                    <strong className="text-foreground">Avocate dans les droits de l'Homme</strong>, je travaille 
                    à défendre des causes qui comptent. Mais quand je ne suis pas au tribunal, 
                    je suis dans les marchés — à Battambang, Jaipur ou Caraiva — 
                    à chiner des tissus qui racontent des histoires.
                  </p>
                }
                detail={
                  <>
                    <p>
                      Chaque étoffe porte en elle une culture, un savoir-faire, une résistance. 
                      Les couleurs sont un langage politique autant qu'esthétique. 
                      C'est cette conviction qui m'a amenée à créer <img src={logoImg} alt="I Love Dada" className="inline-block h-5 w-auto align-middle" />.
                    </p>
                    <h3 className="font-display text-lg text-foreground pt-2">
                      La petite histoire dans la grande histoire
                    </h3>
                    <p>
                      Ma famille, les <strong className="text-foreground">Bouchara</strong>, est une famille juive d'Oran arrivée 
                      d'Algérie à la fin du XIXe siècle. Ils ont créé les tissus Bouchara — 
                      des magasins dans toute la France, de Marseille à Paris. 
                      Cet amour des étoffes coule dans mes veines.
                    </p>
                  </>
                }
              />
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="grid grid-cols-12 gap-4 md:gap-6 items-end">
              {/* Famille / héritage — grande polaroid */}
              <div className="col-span-7 md:col-span-6">
                <div className="polaroid" style={{ transform: 'rotate(-2deg)' }}>
                  <div className="aspect-[4/5] overflow-hidden bg-muted">
                    <img
                      src={boucharaImg}
                      alt="Famille Bouchara — l'héritage textile"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="polaroid-caption">Héritage Bouchara · Oran</p>
                </div>
              </div>

              {/* Colonne voyage + style */}
              <div className="col-span-5 md:col-span-6 space-y-4 md:space-y-6">
                <div className="polaroid max-w-[220px] ml-auto" style={{ transform: 'rotate(2deg)' }}>
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={worldImg}
                      alt="Voyage — I Love Dada"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="polaroid-caption">Carnet de route</p>
                </div>
                <div className="polaroid max-w-[180px]" style={{ transform: 'rotate(-1deg)' }}>
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={converseImg}
                      alt="Style — I Love Dada"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="polaroid-caption">Pieds sur terre</p>
                </div>
              </div>

              {/* Petite polaroid Dada, centrée en bas */}
              <div className="col-span-12 flex justify-center -mt-4 md:-mt-8">
                <div className="polaroid max-w-[140px]" style={{ transform: 'rotate(3deg)' }}>
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={partyingImg}
                      alt="Partying is a human right"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="polaroid-caption">Le credo</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    <Footer />
  </div>
);

export default QuiSuisJe;
