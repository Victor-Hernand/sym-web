// DESIGN: Light Premium — CTA with brand blue solid background
import { COMPANY } from "@/lib/data";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { MessageCircle, Phone } from "lucide-react";

export default function CTASection() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative pt-12 md:pt-16 pb-6 md:pb-8 overflow-hidden bg-gradient-to-br from-[#0E2240] via-[#1B3A6B] to-[#0E2240] animate-gradient-shift" ref={ref}>
      {/* Trama de ondas sobre el azul, igual que en el hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("/images/hero-ondas.jpg")', backgroundSize: "480px auto", backgroundRepeat: "repeat" }}
      />
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-blue-bright/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue-bright/10 rounded-full blur-3xl animate-blob [animation-delay:6s]" />

      <div className="container relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4 md:whitespace-nowrap"
          >
            ¿Listo para Impulsar su{" "}
            <motion.span
              className="text-brand-blue-glow inline-block"
              animate={isInView ? { scale: [1, 1.06, 1] } : {}}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              Negocio
            </motion.span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-white/65 text-base md:text-lg max-w-xl mx-auto mb-6"
          >
            Cientos de distribuidoras confían en Inversiones S&M por su stock constante, precios competitivos y entregas confiables.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }} href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-white text-[#1B3A6B] font-bold uppercase tracking-wider px-6 py-3 rounded-sm font-display text-sm flex items-center gap-2 hover:bg-white/90 hover:shadow-lg transition-all">
              <MessageCircle className="w-5 h-5" /> COTIZAR POR WHATSAPP (B2B)
            </motion.a>
            <motion.a whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }} href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="border-2 border-white/40 text-white font-semibold uppercase tracking-wider px-6 py-3 rounded-sm font-display text-sm flex items-center gap-2 hover:bg-white/10 hover:border-white/60 transition-all">
              <Phone className="w-5 h-5" /> LLAMAR A UN ASESOR COMERCIAL
            </motion.a>
          </motion.div>
          <p className="text-white/50 text-xs mt-5">
            {COMPANY.phone} · {COMPANY.address}, {COMPANY.city}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
