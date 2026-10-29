// DESIGN: Light Premium — Nuestros asesores de venta B2B
import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { ADVISOR_BENEFITS, COMPANY, IMAGES } from "@/lib/data";
import { motion } from "framer-motion";
import { Handshake, Lightbulb, ClipboardList, LifeBuoy, TrendingUp } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Handshake, Lightbulb, ClipboardList, LifeBuoy, TrendingUp };

export default function AdvisorsSection() {
  const { ref, isInView } = useInView();
  // Beneficio abierto (índice en ADVISOR_BENEFITS); null = ninguno
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openBenefit = openIndex !== null ? ADVISOR_BENEFITS[openIndex] : null;

  return (
    <section id="asesores" className="pt-0 pb-12 md:pb-16 bg-light-bg relative overflow-hidden noise-overlay" ref={ref}>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="section-label justify-center">Equipo Comercial</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#1B3A6B] mt-4 mb-6 leading-tight md:whitespace-nowrap">
            Nuestros asesores de <span className="blue-gradient">venta B2B</span>
          </h2>
          <p className="text-[#1B3A6B]/60 leading-relaxed mb-8">
            En {COMPANY.name} contamos con un equipo de los mejores asesores en venta de autopartes, dedicados a brindarte un servicio excepcional y una experiencia de compra inigualable.
          </p>
          <img
            src={IMAGES.realEquipoFremap}
            alt="Equipo de Inversiones S&M en bodega"
            className="w-full max-w-2xl mx-auto aspect-[4/3] object-cover rounded-sm"
          />
        </motion.div>
      </div>

      {/* Cinta de íconos a todo el ancho; se pausa mientras hay un beneficio abierto */}
      <div className="relative z-10 mt-8 max-w-2xl mx-auto overflow-hidden py-1">
        <style>{`
          @keyframes advisors-ribbon { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        `}</style>
        <div
          className="flex w-max"
          style={{
            animation: "advisors-ribbon 40s linear infinite",
            animationPlayState: openIndex !== null ? "paused" : "running",
          }}
        >
          {/* Lista duplicada; el desplazamiento de -50% cierra el bucle sin saltos */}
          {[...ADVISOR_BENEFITS, ...ADVISOR_BENEFITS].map((benefit, i) => {
            const Icon = iconMap[benefit.icon] || Handshake;
            const idx = i % ADVISOR_BENEFITS.length;
            const active = openIndex === idx;
            return (
              <button
                key={`${benefit.title}-${i}`}
                type="button"
                aria-label={benefit.title}
                title={benefit.title}
                aria-expanded={active}
                onClick={() => setOpenIndex(active ? null : idx)}
                className={`shrink-0 w-20 h-20 mr-3 flex items-center justify-center rounded-sm border shadow-sm transition-colors ${
                  active
                    ? "bg-[#1B3A6B] border-[#1B3A6B] text-white"
                    : "bg-white border-[#1B3A6B]/10 text-brand-blue-light hover:border-brand-blue-light/40"
                }`}
              >
                <Icon className="w-7 h-7" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Información del beneficio abierto */}
      {openBenefit && (
        <div className="container relative z-10 mt-6">
          <div className="max-w-md mx-auto bg-white border border-[#1B3A6B]/8 shadow-sm p-5 rounded-sm text-center">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#1B3A6B]">{openBenefit.title}</h3>
            <p className="text-sm text-[#1B3A6B]/55 mt-2 leading-relaxed">{openBenefit.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
