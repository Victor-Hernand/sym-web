// DESIGN: Light Premium — Footer with brand blue accents
import { IMAGES } from "@/lib/data";
import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import { useInView } from "@/hooks/useInView";

export default function Footer() {
  const { ref, isInView } = useInView();

  return (
    <footer className="bg-light-surface border-t border-[#1B3A6B]/10 relative" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="container py-6 flex flex-col items-center gap-5"
      >
        <div className="inline-flex bg-white rounded-sm px-4 py-3">
          <img src={IMAGES.logo} alt="Inversiones S&M" className="h-14 w-auto object-contain" />
        </div>
        <SocialLinks />
        <a href="/privacidad" className="text-xs text-[#1B3A6B]/50 hover:text-brand-blue-light transition-colors">Política de privacidad</a>
      </motion.div>
    </footer>
  );
}
