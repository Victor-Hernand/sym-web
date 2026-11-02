// DESIGN: Light Premium — Footer with brand blue accents
import { COMPANY, IMAGES } from "@/lib/data";
import { motion } from "framer-motion";
import { Facebook, Instagram } from "lucide-react";
import TikTokIcon from "@/components/icons/TikTokIcon";
import { useInView } from "@/hooks/useInView";

export default function Footer() {
  const { ref, isInView } = useInView();

  return (
    <footer className="bg-white border-t border-[#1B3A6B]/10 relative" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="container py-6 flex flex-col items-center gap-5"
      >
        <div className="inline-flex bg-white rounded-sm px-4 py-3">
          <img src={IMAGES.logo} alt="Inversiones S&M" className="h-14 w-auto object-contain" />
        </div>
        <div className="flex gap-3">
          <a href={COMPANY.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook de Inversiones S&M" className="w-10 h-10 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110 group"><Facebook className="w-5 h-5 text-[#1B3A6B]/60 group-hover:text-brand-blue-light transition-colors" /></a>
          <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Inversiones S&M" className="w-10 h-10 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110 group"><Instagram className="w-5 h-5 text-[#1B3A6B]/60 group-hover:text-brand-blue-light transition-colors" /></a>
          <a href={COMPANY.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok de Inversiones S&M" className="w-10 h-10 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110 group"><TikTokIcon className="w-5 h-5 text-[#1B3A6B]/60 group-hover:text-brand-blue-light transition-colors" /></a>
        </div>
        <a href="/privacidad" className="text-xs text-[#1B3A6B]/50 hover:text-brand-blue-light transition-colors">Política de privacidad</a>
      </motion.div>
    </footer>
  );
}
