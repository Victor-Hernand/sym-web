// DESIGN: Light Premium — Photo gallery with real company photos
import Lightbox from "@/components/Lightbox";
import { useInView } from "@/hooks/useInView";
import { IMAGES } from "@/lib/data";
import { motion } from "framer-motion";
import { useState } from "react";

const galleryItems = [
  { src: IMAGES.realEquipoCompleto, alt: "Equipo comercial y logístico especializado", caption: "Equipo comercial y logístico especializado" },
  { src: IMAGES.realBodegaLlena, alt: "Bodega central con alta disponibilidad de inventario", caption: "Bodega central con alta disponibilidad de inventario" },
  { src: IMAGES.realConductorCamion, alt: "Flota propia para entregas rápidas", caption: "Distribución propia para entregas rápidas" },
  { src: IMAGES.realEquipoCascos, alt: "Equipo operativo con equipo de seguridad", caption: "Equipo operativo capacitado" },
  { src: IMAGES.realBodegueroEmpaque, alt: "Preparación y despacho diario de pedidos", caption: "Preparación y despacho diario de pedidos" },
  { src: IMAGES.realBodegueroEscalera, alt: "Control y organización de inventario", caption: "Control de inventario digitalizado" },
  { src: IMAGES.realAsesorClipboard, alt: "Sistema de gestión propio sym.capgrupo.com", caption: "Sistema de gestión propio" },
  { src: IMAGES.realOperarioMarcas, alt: "Control de calidad de productos", caption: "Control de calidad por marca" },
  { src: IMAGES.realEquipoComercial, alt: "Equipo comercial y asesores", caption: "Asesores comerciales B2B" },
  { src: IMAGES.realOperarioCarga, alt: "Preparación y despacho diario de pedidos", caption: "Logística operativa" },
  { src: IMAGES.realWagnerPastillas, alt: "Marcas premium en stock continuo", caption: "Marcas premium en stock" },
  { src: IMAGES.realEquipoFilas, alt: "Equipo WELMET", caption: "Equipo WELMET" },
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

      <Lightbox
        items={galleryItems}
        index={lightbox}
        onIndexChange={setLightbox}
        onClose={() => setLightbox(null)}
      />
    </section>
  );
}
