// DESIGN: Light Premium — Why choose us with glass cards
import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { IMAGES } from "@/lib/data";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Users, BadgeDollarSign, Headphones, Package } from "lucide-react";

const advantages = [
  { icon: ShieldCheck, title: "Garantía de Calidad", description: "Autopartes importadas directamente de fábricas certificadas, reduciendo devoluciones y reclamos para tu negocio." },
  { icon: BadgeDollarSign, title: "Precios Competitivos", description: "Importación directa que nos permite ofrecer los mejores precios del mercado." },
  { icon: Truck, title: "Entrega Rápida", description: "Contamos con una logística eficiente y entregas rápidas, respaldadas por nuestro compromiso de realizar tus entregas en un plazo menor a 48 horas, para que tu negocio mantenga su operación sin interrupciones." },
  { icon: Users, title: "Asesoría Personalizada", description: "Asesores especializados que entienden tu negocio y te recomiendan los productos con mayor rotación." },
  { icon: Headphones, title: "Soporte Continuo", description: "Atención dedicada antes, durante y después de cada compra para resolver cualquier requerimiento." },
  { icon: Package, title: "Amplio Inventario", description: "Más de 10,000 SKU y 33 marcas siempre disponibles en bodega." },
];

export default function WhyUsSection() {
  const { ref, isInView } = useInView();
  // La cinta se detiene al hacer clic y vuelve a moverse con otro clic
  const [paused, setPaused] = useState(false);

  return (
    <section className="pt-0 pb-12 md:pb-16 bg-light-surface relative overflow-hidden noise-overlay" ref={ref}>
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="relative order-2 lg:order-1">
            <img src={IMAGES.realBodegaLlena} alt="Bodega de autopartes Inversiones S&M" className="w-full aspect-[4/3] object-cover rounded-sm" />
            <div className="absolute inset-0 bg-gradient-to-t from-light-surface/40 via-transparent to-transparent rounded-sm" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-brand-blue-light/30" />
          </motion.div>

          {/* Right - Content */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="order-1 lg:order-2 min-w-0">
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#1B3A6B] mt-4 mb-10 leading-tight">
              Por qué <span className="blue-gradient">Inversiones S&M</span> es el socio ideal para tu negocio
            </h2>

            {/* Cinta única; clic para detener o reanudar */}
            <div
              className="overflow-hidden py-1 cursor-pointer"
              role="button"
              tabIndex={0}
              aria-pressed={paused}
              aria-label={paused ? "Reanudar cinta de ventajas" : "Detener cinta de ventajas"}
              onClick={() => setPaused((p) => !p)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setPaused((p) => !p);
              }}
            >
              <style>{`
                @keyframes why-us-ribbon { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
              `}</style>
              <div
                className="flex w-max"
                style={{
                  animation: "why-us-ribbon 40s linear infinite",
                  animationPlayState: paused ? "paused" : "running",
                }}
              >
                {/* Lista duplicada; cada tarjeta lleva margen derecho (no gap) para que -50% cierre el bucle exacto */}
                {[...advantages, ...advantages].map((adv, i) => (
                  <div
                    key={`${adv.title}-${i}`}
                    className="shrink-0 w-56 mr-4 bg-white border border-[#1B3A6B]/8 shadow-sm p-4 rounded-sm"
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className="w-9 h-9 bg-[#1B3A6B]/8 flex items-center justify-center shrink-0 rounded-sm">
                        <adv.icon className="w-4 h-4 text-brand-blue-light" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm uppercase tracking-wider text-[#1B3A6B]">{adv.title}</h4>
                        <p className="text-xs text-[#1B3A6B]/55 mt-1 leading-relaxed">{adv.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
