// DESIGN: Light Premium — Products with tabs and featured products
import { useInView } from "@/hooks/useInView";
import { CATEGORIES, COMPANY, FEATURED_PRODUCTS } from "@/lib/data";
import { motion } from "framer-motion";
import { Cog, CircleDot, Settings, ArrowUpDown, Zap, Thermometer, Circle, Droplets, Filter, Wrench, Star, ArrowRight } from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = { Cog, CircleDot, Settings, ArrowUpDown, Zap, Thermometer, Circle, Droplets, Filter, Wrench };

export default function ProductsSection() {
  const { ref, isInView } = useInView();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="productos" className="py-24 md:py-32 bg-light-bg relative noise-overlay" ref={ref}>
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="section-label justify-center">Nuestro Catálogo B2B</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#1B3A6B] mt-4 mb-4">
            Categorías de autopartes para tu <span className="blue-gradient">negocio mayorista</span>
          </h2>
          <p className="text-[#1B3A6B]/55 max-w-2xl mx-auto">Más de 10 categorías con stock continuo y marcas líderes para entrega inmediata.</p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Cog;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-sm font-display font-semibold text-xs uppercase tracking-wider transition-all ${
                  activeTab === i ? "btn-brand" : "bg-white border border-[#1B3A6B]/10 shadow-sm text-[#1B3A6B]/60 hover:text-brand-blue-light hover:border-brand-blue-light/25"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Active Category Detail */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white border border-[#1B3A6B]/10 shadow-md p-8 md:p-12 rounded-sm mb-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-[#1B3A6B]/8 flex items-center justify-center rounded-sm shrink-0">
              {(() => { const Icon = iconMap[CATEGORIES[activeTab].icon] || Cog; return <Icon className="w-10 h-10 text-brand-blue-light" />; })()}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-display font-black text-2xl md:text-3xl text-[#1B3A6B] mb-2">{CATEGORIES[activeTab].name}</h3>
              <p className="text-[#1B3A6B]/55 mb-4">{CATEGORIES[activeTab].description}</p>
              <div className="w-full bg-[#1B3A6B]/8 rounded-full h-2 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${CATEGORIES[activeTab].percentage}%` }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-gradient-to-r from-brand-blue to-brand-blue-light rounded-full" />
              </div>
              <span className="text-brand-blue-light text-xs font-display font-bold mt-1 inline-block">{CATEGORIES[activeTab].percentage}% disponibilidad</span>
            </div>
            <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-brand px-6 py-3 rounded-sm font-display text-sm shrink-0 flex items-center gap-2">
              SOLICITAR COTIZACIÓN MAYORISTA <ArrowRight className="w-4 h-4" />
            </a>
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
                <div className="relative h-48 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 bg-brand-blue/90 text-white text-xs font-display font-bold px-3 py-1 rounded-sm flex items-center gap-1">
                    <Star className="w-3 h-3" /> {product.tag}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="font-display font-bold text-lg text-[#1B3A6B] mb-2">{product.name}</h4>
                  <p className="text-[#1B3A6B]/55 text-sm leading-relaxed mb-4 flex-1">{product.description}</p>
                  <a
                    href={`${COMPANY.whatsapp}?text=${encodeURIComponent(`Hola, me interesa cotizar: ${product.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brand px-4 py-2.5 rounded-sm font-display text-xs inline-flex items-center justify-center gap-2 mt-auto"
                  >
                    SOLICITAR COTIZACIÓN <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="text-center mt-12">
          <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline-brand px-10 py-4 rounded-sm font-display text-sm inline-flex items-center gap-3">
            SOLICITAR CATÁLOGO MAYORISTA <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
