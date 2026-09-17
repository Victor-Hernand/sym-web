// DESIGN: Light Premium — Coverage section with real truck photo
import { useInView } from "@/hooks/useInView";
import { COMPANY, IMAGES } from "@/lib/data";
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

        {/* Logo decorativo */}
        <motion.img
          src={IMAGES.logo}
          alt="Logo S&M"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.8 }}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 lg:top-10 lg:right-10 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 object-contain pointer-events-none drop-shadow-[0_0_80px_rgba(255,255,255,0.8)] md:drop-shadow-[0_0_120px_rgba(255,255,255,1)]"
        />

        <div className="absolute bottom-0 left-0 right-0 pb-16">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
              <span className="section-label section-label-light">Logística & Cobertura</span>
              <h2 className="font-display font-black text-4xl md:text-5xl text-white mt-4 leading-tight [text-shadow:_0_2px_16px_rgba(0,0,0,0.55)]">
                Cobertura a nivel <span className="hero-blue-gradient">nacional</span>
              </h2>
              <p className="text-white/80 leading-relaxed max-w-3xl mt-5 text-sm md:text-base">
                Ofrecemos cobertura a nivel nacional a través de un equipo de asesores de ventas altamente capacitados que visitan tu empresa de forma directa. Al realizar tu pedido lo recibes al día siguiente, con un sistema de logística optimizado que procesa pedidos con rapidez, empaca de forma segura y coordina entregas en todo el territorio nacional.
              </p>
              <div className="glass-dark inline-flex items-start gap-3 mt-6 px-5 py-4 rounded-sm">
                <MapPin className="w-5 h-5 text-[#7DD3FC] shrink-0 mt-0.5" />
                <div>
                  <div className="font-display font-bold text-xs uppercase tracking-wider text-white">Bodega Principal</div>
                  <div className="text-sm text-white/80 mt-1">{COMPANY.address}, {COMPANY.city}</div>
                </div>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="glass-dark p-5 rounded-sm card-shine group hover:border-white/30 hover-lift"
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
