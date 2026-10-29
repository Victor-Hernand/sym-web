// DESIGN: Light Premium — Process timeline with brand blue accents and real photos
import { useInView } from "@/hooks/useInView";
import { IMAGES, PROCESS_STEPS } from "@/lib/data";
import { motion } from "framer-motion";
import { Handshake, ClipboardList, FileText, CheckCircle, Truck, Receipt, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

/**
 * Ícono y foto de cada paso, en el mismo orden que PROCESS_STEPS.
 * `position` encuadra la franja panorámica sobre el sujeto de cada foto:
 * varias son verticales (4000x5328) y el recorte centrado las deja vacías.
 */
const stepVisuals = [
  { icon: Handshake, image: IMAGES.realAsesorTelefono, position: "object-center" },
  { icon: ClipboardList, image: IMAGES.realEquipoComercial, position: "object-center" },
  { icon: FileText, image: IMAGES.realOperarioMarcas, position: "object-center" },
  { icon: CheckCircle, image: IMAGES.realBodegueroEscalera, position: "object-center" },
  // Los camiones están en el tercio inferior; centrado solo mostraba la pared.
  { icon: Truck, image: IMAGES.realConductorCamion, position: "object-bottom" },
  // El rostro está en la parte alta de la foto vertical; centrado quedaba solo la camiseta.
  { icon: Receipt, image: IMAGES.realBodegueroEmpaque, position: "object-top" },
  { icon: CreditCard, image: IMAGES.realEquipoCompleto, position: "object-center" },
];

const steps = PROCESS_STEPS.map((step, i) => ({ ...step, ...stepVisuals[i] }));

export default function ProcessSection() {
  const { ref, isInView } = useInView();
  const trackRef = useRef<HTMLDivElement>(null);

  // Desplaza una tarjeta a la vez (ancho de la tarjeta + gap)
  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : track.clientWidth;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // Avance automático: cada 4 s; al llegar al final vuelve al inicio. Se pausa con el cursor encima.
  const pausedRef = useRef(false);
  useEffect(() => {
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track || pausedRef.current) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (atEnd) track.scrollTo({ left: 0, behavior: "smooth" });
      else scrollByCard(1);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="proceso" className="pt-0 pb-12 md:pb-16 bg-light-bg relative noise-overlay" ref={ref}>
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="section-label justify-center">Proceso B2B</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#1B3A6B] mt-4 mb-4">
            Cómo abastecemos tu <span className="blue-gradient">negocio automotriz</span>
          </h2>
          <p className="text-[#1B3A6B]/55 max-w-2xl mx-auto">Un proceso B2B ágil que garantiza rapidez, control y cumplimiento en cada pedido.</p>
        </motion.div>

        {/* Steps Grid */}
        <div
          ref={trackRef}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.09 }}
              whileHover={{ y: -8 }}
              className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white border border-[#1B3A6B]/8 shadow-sm rounded-sm overflow-hidden card-shine group hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="relative h-52 md:h-56 overflow-hidden bg-[#0E2240]/5">
                <img src={step.image} alt={step.title} loading="lazy" className={`w-full h-full object-cover ${step.position} group-hover:scale-105 transition-transform duration-700`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 w-10 h-10 glass-blue flex items-center justify-center rounded-sm">
                  <span className="blue-gradient font-display font-black text-sm">{String(i + 1).padStart(2, "0")}</span>
                </div>
                {/* Barra que marca el avance del paso dentro del proceso */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: (i + 1) / steps.length } : {}}
                  transition={{ duration: 0.9, delay: 0.4 + i * 0.09, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 h-1 w-full origin-left bg-gradient-to-r from-[#1B3A6B] to-[#3B6FC4]"
                />
              </div>
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <step.icon className="w-5 h-5 text-brand-blue-light group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300" />
                  <h4 className="font-display font-bold text-base text-[#1B3A6B] uppercase tracking-wider">{step.title}</h4>
                </div>
                <p className="text-[#1B3A6B]/55 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Controles del carrusel */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Paso anterior"
            className="w-11 h-11 flex items-center justify-center rounded-sm border border-[#1B3A6B]/20 text-[#1B3A6B] bg-white hover:bg-[#1B3A6B] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Paso siguiente"
            className="w-11 h-11 flex items-center justify-center rounded-sm border border-[#1B3A6B]/20 text-[#1B3A6B] bg-white hover:bg-[#1B3A6B] hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
