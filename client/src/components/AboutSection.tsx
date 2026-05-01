// DESIGN: Light Premium — About with glass cards, real team photo
import { useInView } from "@/hooks/useInView";
import { IMAGES, VALUES } from "@/lib/data";
import { motion } from "framer-motion";
import { Target, Eye, Star, Users } from "lucide-react";

const valueIcons = [Star, Target, Eye, Users];

export default function AboutSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="nosotros" className="py-24 md:py-32 bg-light-bg relative overflow-hidden noise-overlay" ref={ref}>
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} className="relative">
            <div className="relative">
              <img src={IMAGES.realEquipoCompleto} alt="Equipo Inversiones S&M" className="w-full aspect-[4/3] object-cover rounded-sm" />
              <div className="absolute inset-0 bg-gradient-to-t from-light-bg/60 via-transparent to-transparent rounded-sm" />
            </div>
            <p className="text-[#1B3A6B]/65 text-sm mt-4 font-display italic text-center">
              Equipo comercial y logístico especializado en atención B2B
            </p>
            <div className="absolute -bottom-6 -right-6 glass-blue p-6 rounded-sm">
              <div className="blue-gradient font-display font-black text-5xl leading-none">30+</div>
              <div className="text-[#1B3A6B]/55 font-display font-semibold text-sm uppercase tracking-wider mt-1">Años de Experiencia</div>
            </div>
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-brand-blue-light/40" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <span className="section-label">Quiénes Somos</span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#1B3A6B] mt-4 mb-6 leading-tight">
              Importadores y distribuidores <span className="blue-gradient">mayoristas de autopartes</span>
            </h2>
            <p className="text-[#1B3A6B]/60 leading-relaxed mb-8">
              Inversiones S&M es una empresa hondureña especializada en la importación y distribución mayorista de autopartes, orientada exclusivamente al mercado B2B.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white border border-[#1B3A6B]/8 shadow-sm p-5 rounded-sm card-shine">
                <h4 className="font-display font-bold text-brand-blue-light text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Misión
                </h4>
                <p className="text-[#1B3A6B]/55 text-sm leading-relaxed">
                  Abastecer distribuidoras automotrices con autopartes confiables, precios competitivos y un servicio ágil que garantice continuidad y rentabilidad en tu negocio.
                </p>
              </div>
              <div className="bg-white border border-[#1B3A6B]/8 shadow-sm p-5 rounded-sm card-shine">
                <h4 className="font-display font-bold text-brand-blue-light text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Visión
                </h4>
                <p className="text-[#1B3A6B]/55 text-sm leading-relaxed">
                  Consolidarnos como la distribuidora mayorista de autopartes líder en Honduras, reconocida por su eficiencia logística, disponibilidad de inventario y relaciones comerciales duraderas con nuestros clientes B2B.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {VALUES.map((val, i) => {
                const Icon = valueIcons[i];
                return (
                  <motion.div key={val.title} initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 + i * 0.1 }} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-[#1B3A6B]/6 flex items-center justify-center rounded-sm group-hover:bg-brand-blue/10 transition-colors">
                      <Icon className="w-4 h-4 text-brand-blue-light" />
                    </div>
                    <span className="text-[#1B3A6B]/70 text-sm font-display font-semibold uppercase tracking-wider group-hover:text-brand-blue-light transition-colors">{val.title}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
