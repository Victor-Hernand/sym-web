// DESIGN: Light Premium — Photo gallery with real company photos
import { useInView } from "@/hooks/useInView";
import { IMAGES } from "@/lib/data";
import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const galleryItems = [
  { src: IMAGES.realEquipoCompleto, alt: "Equipo comercial y logístico especializado", caption: "Equipo comercial y logístico especializado" },
  { src: IMAGES.realBodegaLlena, alt: "Bodega central con alta disponibilidad de inventario", caption: "Bodega central con alta disponibilidad de inventario" },
  { src: IMAGES.realOperarioCarga, alt: "Preparación y despacho diario de pedidos", caption: "" },
  { src: IMAGES.realConductorCamion, alt: "Distribución propia para entregas rápidas", caption: "Distribución propia para entregas rápidas" },
  { src: IMAGES.realBodegueroEmpaque, alt: "Preparación y despacho diario de pedidos", caption: "Preparación y despacho diario de pedidos" },
  { src: IMAGES.realBodegueroEscalera, alt: "Control y organización de inventario", caption: "" },
  { src: IMAGES.realAsesorTelefono, alt: "Atención B2B", caption: "" },
  { src: IMAGES.realOperarioMarcas, alt: "Control y organización de inventario", caption: "Control y organización de inventario" },
];

export default function GallerySection() {
  const { ref, isInView } = useInView();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-light-surface relative border-y border-brand-blue/8" ref={ref}>
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="section-label justify-center">Nuestra Empresa</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#1B3A6B] mt-4 mb-4">
            Nuestra infraestructura respalda <span className="blue-gradient">cada entrega</span>
          </h2>
          <p className="text-[#1B3A6B]/55 max-w-2xl mx-auto">Instalaciones y equipo que garantizan stock, eficiencia operativa y entregas confiables a nivel nacional.</p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {galleryItems.map((item, i) => (
            <motion.div
              key={`${item.alt}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.06 }}
              className={`relative overflow-hidden rounded-sm cursor-pointer group ${
                i === 0 || i === 3 ? "md:row-span-2" : ""
              }`}
              onClick={() => setLightbox(i)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                  i === 0 || i === 3 ? "h-full min-h-[300px]" : "h-48 md:h-52"
                }`}
              />
              {item.caption && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-brand-blue-light font-display font-bold text-xs uppercase tracking-wider">{item.caption}</span>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors" onClick={() => setLightbox(null)}>
            <X className="w-8 h-8" />
          </button>
          <img
            src={galleryItems[lightbox].src}
            alt={galleryItems[lightbox].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-sm"
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <span className="blue-gradient font-display font-bold text-lg uppercase tracking-wider">{galleryItems[lightbox].caption}</span>
          </div>
        </motion.div>
      )}
    </section>
  );
}
