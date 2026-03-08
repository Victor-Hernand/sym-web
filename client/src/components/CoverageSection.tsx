// DESIGN: Light Premium — Coverage section with real truck photo
import { useInView } from "@/hooks/useInView";
import { IMAGES } from "@/lib/data";
import { motion } from "framer-motion";
import { Truck, Clock, MapPin, CreditCard } from "lucide-react";

const features = [
  { icon: Truck, title: "Entrega al Día Siguiente", description: "Tu pedido preparado y enviado para que lo recibas al día siguiente." },
  { icon: MapPin, title: "Cobertura Nacional", description: "Asesores en todo el país que visitan tu empresa directamente." },
  { icon: Clock, title: "Logística Ágil", description: "Diseñada para apoyarte en tu operación diaria sin interrupciones." },
  { icon: CreditCard, title: "Crédito Flexible", description: "Líneas de crédito con condiciones que se adaptan a tu negocio." },
];

export default function CoverageSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative overflow-hidden" ref={ref}>
      <div className="relative h-[500px] md:h-[600px]">
        <img src={IMAGES.realConductorCamion} alt="Entrega nacional de autopartes" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B] via-[#1B3A6B]/70 to-[#1B3A6B]/30" />

        <div className="absolute bottom-0 left-0 right-0 pb-16">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
              <span className="section-label">Logística & Cobertura</span>
              <h2 className="font-display font-black text-4xl md:text-5xl text-white mt-4 leading-tight">
                Llegamos a Todo <span className="blue-gradient">Honduras</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="glass p-5 card-shine group hover:border-brand-blue-light/20 transition-all"
                >
                  <feat.icon className="w-8 h-8 text-brand-blue-light mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">{feat.title}</h4>
                  <p className="text-xs text-white/60 mt-2 leading-relaxed">{feat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
