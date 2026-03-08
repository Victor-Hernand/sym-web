// DESIGN: Light Premium — Brands with infinite marquee and brand blue accents
import { useInView } from "@/hooks/useInView";
import { BRANDS } from "@/lib/data";
import { motion } from "framer-motion";

export default function BrandsSection() {
  const { ref, isInView } = useInView();
  const firstRow = BRANDS.slice(0, Math.ceil(BRANDS.length / 2));
  const secondRow = BRANDS.slice(Math.ceil(BRANDS.length / 2));

  return (
    <section id="marcas" className="py-24 md:py-32 bg-light-surface relative overflow-hidden border-y border-brand-blue/8" ref={ref}>
      <div className="container relative z-10 mb-14">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center">
          <span className="section-label justify-center">Nuestras Marcas</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#1B3A6B] mt-4 mb-4">
            Marcas de <span className="blue-gradient">Confianza</span>
          </h2>
          <p className="text-[#1B3A6B]/55 max-w-2xl mx-auto">Trabajamos con más de 30 marcas reconocidas internacionalmente, garantizando calidad y respaldo en cada producto.</p>
        </motion.div>
      </div>

      {/* Marquee row 1 */}
      <div className="relative mb-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...firstRow, ...firstRow, ...firstRow].map((brand, i) => (
            <div key={`r1-${i}`} className="inline-flex items-center justify-center mx-3 px-8 py-4 bg-white border border-[#1B3A6B]/8 shadow-sm hover:border-brand-blue-light/30 hover:shadow-md transition-all duration-300 shrink-0 group">
              <span className="font-display font-bold text-sm uppercase tracking-wider text-[#1B3A6B]/40 group-hover:text-brand-blue-light transition-colors whitespace-nowrap">{brand}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee row 2 */}
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {[...secondRow, ...secondRow, ...secondRow].map((brand, i) => (
            <div key={`r2-${i}`} className="inline-flex items-center justify-center mx-3 px-8 py-4 bg-white border border-[#1B3A6B]/8 shadow-sm hover:border-brand-blue-light/30 hover:shadow-md transition-all duration-300 shrink-0 group">
              <span className="font-display font-bold text-sm uppercase tracking-wider text-[#1B3A6B]/40 group-hover:text-brand-blue-light transition-colors whitespace-nowrap">{brand}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-33.333%); } 100% { transform: translateX(0); } }
        .animate-marquee { animation: marquee 50s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 45s linear infinite; }
        .animate-marquee:hover, .animate-marquee-reverse:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
}
