// DESIGN: Light Premium — Invitación a trabajar con nosotros (reclutamiento)
import { COMPANY } from "@/lib/data";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Linkedin, Send } from "lucide-react";

export default function CareersSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="trabaja-con-nosotros" className="py-24 md:py-32 bg-light-surface relative overflow-hidden border-y border-brand-blue/8 noise-overlay" ref={ref}>
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-blue/5 rounded-full blur-3xl animate-blob" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl animate-blob [animation-delay:6s]" />

      <div className="container relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="section-label justify-center">Únete al equipo</span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl md:text-5xl text-[#1B3A6B] leading-tight mt-4 mb-6"
          >
            ¿Deseas trabajar con <span className="blue-gradient">nosotros</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-[#1B3A6B]/55 text-lg max-w-2xl mx-auto mb-10"
          >
            Súmate al equipo de Inversiones S&amp;M y del Grupo CAP Honduras. Conoce nuestras vacantes y envía tu aplicación.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              href={COMPANY.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1B3A6B] text-white font-bold uppercase tracking-wider px-10 py-4 rounded-sm font-display text-base flex items-center gap-3 hover:bg-[#0E2240] hover:shadow-lg transition-all"
            >
              <Linkedin className="w-5 h-5" /> VER VACANTES EN LINKEDIN
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              href={COMPANY.careersApply}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#1B3A6B]/40 text-[#1B3A6B] font-semibold uppercase tracking-wider px-10 py-4 rounded-sm font-display text-base flex items-center gap-3 hover:bg-[#1B3A6B]/5 hover:border-[#1B3A6B]/60 transition-all"
            >
              <Send className="w-5 h-5" /> APLICAR AHORA
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
