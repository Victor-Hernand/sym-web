// DESIGN: Light Premium — Hero with parallax, particles, brand blue gradient
import { COMPANY, IMAGES } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MessageCircle, BookOpen } from "lucide-react";
import { useRef, useMemo } from "react";

function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 6,
      duration: Math.random() * 8 + 6,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0 ? "rgba(27, 58, 107, 0.5)" : "rgba(255, 255, 255, 0.2)",
          }}
          animate={{
            y: [0, -60, -30, -80, 0],
            x: [0, 20, -15, 25, 0],
            opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
            scale: [1, 1.3, 0.8, 1.1, 1],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="inicio" ref={ref} className="relative min-h-screen flex items-center overflow-hidden noise-overlay">
      <div className="absolute inset-0 z-0">
        <img src={IMAGES.heroBanner} alt="Bodega de autopartes Inversiones S&M" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
      </div>

      <Particles />

      <motion.div className="container relative z-20 pt-24 pb-16" style={{ y: textY, opacity }}>
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-blue inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-sm">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span className="text-white text-xs font-display font-bold uppercase tracking-[0.2em]">Distribución mayorista de autopartes en Honduras</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1] mb-6 [text-shadow:_0_4px_24px_rgba(0,0,0,0.7)]">
            <span className="text-white">Distribución mayorista de</span><br />
            <span className="hero-blue-gradient drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">autopartes en Honduras</span>
          </motion.h1>


          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-white text-base md:text-lg max-w-xl leading-relaxed mb-4 [text-shadow:_0_2px_12px_rgba(0,0,0,0.8)]">
            Más de 7 años abasteciendo tiendas de autopartes con stock continuo, precios competitivos y entregas inmediatas.
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="hero-blue-gradient text-xl md:text-2xl font-display font-bold italic mb-10">
            "{COMPANY.slogan}"
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-4">
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-brand px-8 py-4 rounded-sm font-display text-base flex items-center gap-3">
                <MessageCircle className="w-5 h-5" /> SOLICITAR COTIZACIÓN MAYORISTA
              </a>
              <button onClick={() => document.querySelector("#productos")?.scrollIntoView({ behavior: "smooth" })} className="border-2 border-white/40 text-white font-semibold uppercase tracking-wider px-8 py-4 rounded-sm font-display text-base flex items-center gap-3 hover:bg-white/10 hover:border-white/60 transition-all">
                <BookOpen className="w-5 h-5" /> VER CATÁLOGO DE PRODUCTOS
              </button>
            </div>
            <span className="text-white/60 text-xs font-display uppercase tracking-wider">Atención exclusiva para clientes B2B</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-white/40 text-xs font-display uppercase tracking-widest">Descubrir</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown className="w-5 h-5 text-brand-blue-light/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
