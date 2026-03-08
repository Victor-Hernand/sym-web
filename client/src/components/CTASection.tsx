// DESIGN: Light Premium — CTA with brand blue solid background
import { COMPANY } from "@/lib/data";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { MessageCircle, Phone } from "lucide-react";

export default function CTASection() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0E2240] via-[#1B3A6B] to-[#0E2240]" ref={ref}>
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-blue-bright/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue-bright/10 rounded-full blur-3xl" />

      <div className="container relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            ¿Listo para Impulsar<br />su <span className="text-brand-blue-glow">Negocio</span>?
          </h2>
          <p className="text-white/65 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Únase a los cientos de empresas que confían en Inversiones S&M como su proveedor estratégico de autopartes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-white text-[#1B3A6B] font-bold uppercase tracking-wider px-10 py-4 rounded-sm font-display text-base flex items-center gap-3 hover:bg-white/90 hover:shadow-lg transition-all">
              <MessageCircle className="w-5 h-5" /> COTIZAR POR WHATSAPP
            </a>
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="border-2 border-white/40 text-white font-semibold uppercase tracking-wider px-10 py-4 rounded-sm font-display text-base flex items-center gap-3 hover:bg-white/10 hover:border-white/60 transition-all">
              <Phone className="w-5 h-5" /> LLAMAR AHORA
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
