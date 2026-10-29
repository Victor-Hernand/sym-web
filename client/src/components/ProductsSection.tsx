// DESIGN: Light Premium — Products carousel and featured products
import Lightbox from "@/components/Lightbox";
import { useInView } from "@/hooks/useInView";
import { CATEGORIES, COMPANY, FEATURED_PRODUCTS } from "@/lib/data";
import { motion } from "framer-motion";
import { Cog, CircleDot, Settings, ArrowUpDown, Zap, Thermometer, Circle, Star, ArrowRight, MessageCircle, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const iconMap: Record<string, React.ElementType> = { Cog, CircleDot, Settings, ArrowUpDown, Zap, Thermometer, Circle };

const AUTOPLAY_MS = 6000;

export default function ProductsSection() {
  const { ref, isInView } = useInView();
  const [activeTab, setActiveTab] = useState(0);
  const category = CATEGORIES[activeTab];
  const [zoomed, setZoomed] = useState(false);
  const [paused, setPaused] = useState(false);

  const count = CATEGORIES.length;
  const goTo = (i: number) => setActiveTab((i + count) % count);

  // Avance automático del carrusel. Se pausa al pasar el mouse, con el visor abierto
  // o si el usuario pide menos movimiento; cada cambio manual reinicia el temporizador.
  useEffect(() => {
    if (paused || zoomed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActiveTab((t) => (t + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, zoomed, activeTab, count]);

  const flyers = useMemo(
    () => CATEGORIES.map((cat, i) => ({ src: cat.image, alt: cat.imageAlt, caption: cat.name, tabIndex: i })),
    [],
  );

  const [featuredZoom, setFeaturedZoom] = useState<number | null>(null);
  const featuredItems = useMemo(
    () => FEATURED_PRODUCTS.map((p) => ({ src: p.image, alt: p.imageAlt, caption: `${p.name} ${p.brand}` })),
    [],
  );

  return (
    <section id="productos" className="pt-0 pb-6 md:pb-8 bg-light-bg relative noise-overlay" ref={ref}>
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="section-label justify-center">Nuestro Catálogo B2B</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#1B3A6B] mt-4 mb-4">
            Categorías de autopartes para tu <span className="blue-gradient">negocio mayorista</span>
          </h2>
          <p className="text-[#1B3A6B]/55 md:whitespace-nowrap">Categorías de alta rotación con stock continuo y marcas líderes para entrega inmediata.</p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Cog;
            return (
              <motion.button
                key={cat.name}
                onClick={() => goTo(i)}
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-sm font-display font-semibold text-xs uppercase tracking-wider transition-all ${
                  activeTab === i ? "btn-brand" : "bg-white border border-[#1B3A6B]/10 shadow-sm text-[#1B3A6B]/60 hover:text-brand-blue-light hover:border-brand-blue-light/25"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.name}
              </motion.button>
            );
          })}
        </div>

        {/* Active Category Detail */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white border border-[#1B3A6B]/10 shadow-md p-8 md:p-12 rounded-sm mb-20">
          <div className="grid grid-cols-1 md:grid-cols-[auto_minmax(0,1fr)] gap-8 md:gap-12 items-center justify-items-center md:justify-items-start">
            {/* Carrusel: alto fijo y ancho automático; las fotos quedan sin franjas vacías */}
            <div
              className="relative shrink-0 max-w-full"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <button
                type="button"
                onClick={() => setZoomed(true)}
                aria-label={`Ampliar imagen de ${category.name}`}
                className="relative block h-64 md:h-96 max-w-full rounded-sm overflow-hidden border border-[#1B3A6B]/10 shadow-md cursor-zoom-in group/flyer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-light focus-visible:ring-offset-2"
              >
                <img
                  src={category.image}
                  alt={category.imageAlt}
                  className="h-full w-auto max-w-full object-contain group-hover/flyer:scale-[1.04] transition-transform duration-500"
                />
                <span className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#0f0f14]/70 text-white text-[11px] font-display font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-sm opacity-0 group-hover/flyer:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5" /> Ampliar
                </span>
              </button>

              <button
                type="button"
                onClick={() => goTo(activeTab - 1)}
                aria-label="Categoría anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 border border-[#1B3A6B]/10 shadow-md rounded-sm text-[#1B3A6B] hover:bg-brand-blue hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-light"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeTab + 1)}
                aria-label="Categoría siguiente"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 border border-[#1B3A6B]/10 shadow-md rounded-sm text-[#1B3A6B] hover:bg-brand-blue hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-light"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="flex justify-center gap-2 mt-4">
                {CATEGORIES.map((cat, i) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Mostrar ${cat.name}`}
                    aria-current={activeTab === i}
                    className={`h-2.5 rounded-full transition-all ${activeTab === i ? "w-6 bg-brand-blue" : "w-2.5 bg-[#1B3A6B]/20 hover:bg-[#1B3A6B]/40"}`}
                  />
                ))}
              </div>
            </div>

            <div className="w-full min-w-0 text-center md:text-left">
              <h3 className="font-display font-black text-3xl md:text-4xl text-[#1B3A6B] mb-3">{category.name}</h3>
              <ul className="flex flex-wrap gap-2 justify-center md:justify-start">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="bg-[#1B3A6B]/5 border border-[#1B3A6B]/8 text-[#1B3A6B]/70 text-sm px-3 py-1.5 rounded-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 max-w-xl mx-auto md:mx-0">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-[#1B3A6B]/45 font-display font-bold text-[11px] uppercase tracking-[0.15em]">Disponibilidad en bodega</span>
                  <span className="font-display font-black text-brand-blue-light text-lg tabular-nums">{category.percentage}%</span>
                </div>
                <div className="w-full bg-[#1B3A6B]/8 rounded-full h-2 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${category.percentage}%` }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-gradient-to-r from-brand-blue to-brand-blue-light rounded-full" />
                </div>
              </div>

              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand mt-8 px-6 py-3 rounded-sm font-display text-sm inline-flex items-center gap-2"
              >
                SOLICITAR COTIZACIÓN MAYORISTA <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Featured Products */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
          <h3 className="font-display font-black text-2xl md:text-3xl text-[#1B3A6B] text-center mb-10">
            Líneas destacadas para tu <span className="blue-gradient">negocio automotriz</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_PRODUCTS.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="bg-white border border-[#1B3A6B]/8 shadow-sm rounded-sm overflow-hidden card-shine group hover:shadow-lg transition-shadow flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => setFeaturedZoom(i)}
                  aria-label={`Ampliar imagen de ${product.name} ${product.brand}`}
                  className="relative aspect-[4/3] overflow-hidden bg-[#1B3A6B]/5 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-light focus-visible:ring-inset"
                >
                  <img src={product.image} alt={product.imageAlt} loading="lazy" className="w-full h-full object-contain p-16 group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-3 right-3 bg-brand-blue/90 text-white text-xs font-display font-bold px-3 py-1 rounded-sm flex items-center gap-1">
                    <Star className="w-3 h-3" /> {product.tag}
                  </span>
                  <span className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#0f0f14]/70 text-white text-[11px] font-display font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" /> Ampliar
                  </span>
                </button>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-brand-blue-light font-display font-bold text-[11px] uppercase tracking-[0.15em] mb-1">{product.brand}</span>
                  <h4 className="font-display font-bold text-lg text-[#1B3A6B] mb-2">{product.name}</h4>
                  <p className="text-[#1B3A6B]/55 text-sm leading-relaxed mb-4 flex-1">{product.description}</p>
                  <a
                    href={`${COMPANY.whatsapp}?text=${encodeURIComponent(`Hola, me interesa cotizar: ${product.name} ${product.brand}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Cotizar ${product.name} ${product.brand} por WhatsApp`}
                    className="text-brand-blue-light hover:text-brand-blue font-display font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 mt-auto group/cta"
                  >
                    <MessageCircle className="w-4 h-4" /> Cotizar
                    <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Lightbox
        items={featuredItems}
        index={featuredZoom}
        onIndexChange={setFeaturedZoom}
        onClose={() => setFeaturedZoom(null)}
      />

      <Lightbox
        items={flyers}
        index={zoomed ? activeTab : null}
        onIndexChange={(i) => goTo(i)}
        onClose={() => setZoomed(false)}
      />
    </section>
  );
}
