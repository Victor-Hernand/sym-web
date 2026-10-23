// DESIGN: Light Premium — Propuesta de valor: filosofía + 3 pilares diferenciadores
import { useInView } from "@/hooks/useInView";
import { COMPANY, VALUE_PHILOSOPHY, VALUE_PILLARS } from "@/lib/data";
import { motion } from "framer-motion";
import { Boxes, UserCheck, BadgeDollarSign, Quote } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Boxes, UserCheck, BadgeDollarSign };

export default function ValuePropositionSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="propuesta" className="py-24 md:py-32 bg-white relative overflow-hidden noise-overlay" ref={ref}>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="section-label justify-center">Propuesta de Valor</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#1B3A6B] mt-4 mb-4 leading-tight">
            Tres pilares que nos hacen tu <span className="blue-gradient">aliado estratégico</span>
          </h2>
          <p className="text-[#1B3A6B]/55 leading-relaxed">
            La propuesta de valor de {COMPANY.name} se fundamenta en tres pilares diferenciadores que nos posicionan como el mejor aliado estratégico para empresas del sector automotriz hondureño.
          </p>
        </motion.div>

        {/* Filosofía */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-14 bg-[#1B3A6B] rounded-sm p-8 md:p-12 relative overflow-hidden"
        >
          <Quote className="absolute -top-2 right-6 w-28 h-28 text-white/5" aria-hidden="true" />
          <div className="relative grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-start">
            <blockquote className="font-display font-black text-3xl md:text-4xl text-white leading-tight lg:max-w-xs">
              <span className="hero-blue-gradient">"{VALUE_PHILOSOPHY.quote}"</span>
            </blockquote>
            <div className="space-y-4">
              {VALUE_PHILOSOPHY.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="text-white/75 text-sm md:text-base leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pilares */}
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {VALUE_PILLARS.map((pillar, i) => {
            const Icon = iconMap[pillar.icon] || Boxes;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="bg-light-bg border border-[#1B3A6B]/8 shadow-sm p-7 rounded-sm card-shine group hover:border-brand-blue-light/25 hover-lift"
              >
                <div className="w-12 h-12 bg-[#1B3A6B]/8 group-hover:bg-brand-blue/10 flex items-center justify-center rounded-sm transition-colors">
                  <Icon className="w-6 h-6 text-brand-blue-light group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#1B3A6B] mt-5 mb-3 leading-snug">{pillar.title}</h3>
                <p className="text-sm text-[#1B3A6B]/55 leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
