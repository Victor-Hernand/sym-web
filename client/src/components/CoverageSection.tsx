// DESIGN: Light Premium — Coverage section with real truck photo
import { useInView } from "@/hooks/useInView";
import { IMAGES } from "@/lib/data";
import { motion } from "framer-motion";
import { Truck, Clock, MapPin, CreditCard } from "lucide-react";

const features = [
  { icon: Truck, title: "Entrega al Día Siguiente", description: "Pedidos preparados y despachados con rapidez para que tu negocio no se detenga." },
  { icon: MapPin, title: "Cobertura Nacional", description: "Atendemos clientes en todo Honduras mediante distribución directa y asesoría comercial." },
  { icon: Clock, title: "Logística Ágil", description: "Procesos logísticos optimizados para garantizar entregas puntuales y continuidad operativa." },
  { icon: CreditCard, title: "Crédito Flexible", description: "Opciones de crédito adaptadas a tu volumen de compra y relación comercial." },
];

export default function CoverageSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative overflow-hidden" ref={ref}>
      <div className="relative h-[500px] md:h-[600px]">
        <img src={IMAGES.realConductorCamion} alt="Entrega nacional de autopartes" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E2240] via-[#0E2240]/85 to-[#0E2240]/40" />

        <div className="absolute bottom-0 left-0 right-0 pb-16">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
              <span className="section-label section-label-light">Logística & Cobertura</span>
              <h2 className="font-display font-black text-4xl md:text-5xl text-white mt-4 leading-tight [text-shadow:_0_2px_16px_rgba(0,0,0,0.55)]">
                Cobertura a nivel <span className="hero-blue-gradient">nacional</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="glass-dark p-5 rounded-sm card-shine group hover:border-white/30 transition-all"
                >
                  <feat.icon className="w-8 h-8 text-[#7DD3FC] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">{feat.title}</h4>
                  <p className="text-sm text-white/80 mt-2 leading-relaxed">{feat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
