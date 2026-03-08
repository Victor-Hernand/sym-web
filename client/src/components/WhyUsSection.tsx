// DESIGN: Light Premium — Why choose us with glass cards
import { useInView } from "@/hooks/useInView";
import { IMAGES } from "@/lib/data";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Users, BadgeDollarSign, Headphones, Package } from "lucide-react";

const advantages = [
  { icon: ShieldCheck, title: "Garantía de Calidad", description: "Autopartes importadas directamente de fábricas certificadas con garantía completa." },
  { icon: BadgeDollarSign, title: "Precios Competitivos", description: "Importación directa que nos permite ofrecer los mejores precios del mercado." },
  { icon: Truck, title: "Entrega Rápida", description: "Logística eficiente con entregas al día siguiente en todo el territorio nacional." },
  { icon: Users, title: "Asesoría Personalizada", description: "Equipo de asesores capacitados que visitan su empresa y conocen sus necesidades." },
  { icon: Headphones, title: "Soporte Continuo", description: "Atención al cliente dedicada para resolver cualquier consulta o requerimiento." },
  { icon: Package, title: "Amplio Inventario", description: "Más de 10 categorías de productos y 30+ marcas siempre disponibles en bodega." },
];

export default function WhyUsSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 md:py-32 bg-light-surface relative overflow-hidden noise-overlay" ref={ref}>
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="relative order-2 lg:order-1">
            <img src={IMAGES.realBodegaLlena} alt="Bodega de autopartes Inversiones S&M" className="w-full aspect-[4/3] object-cover rounded-sm" />
            <div className="absolute inset-0 bg-gradient-to-t from-light-surface/40 via-transparent to-transparent rounded-sm" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-brand-blue-light/30" />
          </motion.div>

          {/* Right - Content */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="order-1 lg:order-2">
            <span className="section-label">Ventajas Competitivas</span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#1B3A6B] mt-4 mb-10 leading-tight">
              Por qué Elegir<br /><span className="blue-gradient">Inversiones S&M</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {advantages.map((adv, i) => (
                <motion.div
                  key={adv.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="bg-white border border-[#1B3A6B]/8 shadow-sm p-4 rounded-sm card-shine group hover:border-brand-blue-light/25 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-[#1B3A6B]/8 group-hover:bg-[#1B3A6B]/12 flex items-center justify-center shrink-0 rounded-sm transition-all">
                      <adv.icon className="w-4 h-4 text-brand-blue-light" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm uppercase tracking-wider text-[#1B3A6B]">{adv.title}</h4>
                      <p className="text-xs text-[#1B3A6B]/55 mt-1 leading-relaxed">{adv.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
