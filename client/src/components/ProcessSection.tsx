// DESIGN: Light Premium — Process timeline with brand blue accents and real photos
import { useInView } from "@/hooks/useInView";
import { IMAGES, COMPANY } from "@/lib/data";
import { motion } from "framer-motion";
import { Phone, ClipboardList, Package, Truck, CheckCircle, Handshake, ArrowRight } from "lucide-react";

const steps = [
  { icon: Phone, title: "Contacto Inicial", description: "Comunícate con nosotros vía WhatsApp, teléfono o correo electrónico.", image: IMAGES.realAsesorTelefono },
  { icon: ClipboardList, title: "Asesoría Personalizada", description: "Nuestro equipo de asesores te guía para encontrar las piezas exactas.", image: IMAGES.realAsesorClipboard },
  { icon: Handshake, title: "Cotización y Acuerdo", description: "Recibe una cotización competitiva con condiciones de pago flexibles.", image: IMAGES.realBodegueroEmpaque },
  { icon: Package, title: "Preparación del Pedido", description: "Tu pedido se prepara con cuidado desde nuestra bodega central.", image: IMAGES.realBodegueroEscalera },
  { icon: Truck, title: "Entrega Nacional", description: "Logística eficiente con entregas al día siguiente en todo Honduras.", image: IMAGES.realConductorCamion },
  { icon: CheckCircle, title: "Seguimiento Post-Venta", description: "Garantía completa y soporte continuo para tu tranquilidad.", image: IMAGES.realEquipoCompleto },
];

export default function ProcessSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="proceso" className="py-24 md:py-32 bg-light-bg relative noise-overlay" ref={ref}>
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="section-label justify-center">Proceso B2B</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#1B3A6B] mt-4 mb-4">
            Cómo <span className="blue-gradient">Trabajamos</span>
          </h2>
          <p className="text-[#1B3A6B]/55 max-w-2xl mx-auto">Un proceso diseñado para la eficiencia de su negocio, desde el primer contacto hasta la entrega en su puerta.</p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-white border border-[#1B3A6B]/8 shadow-sm rounded-sm overflow-hidden card-shine group hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img src={step.image} alt={step.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 w-10 h-10 glass-blue flex items-center justify-center rounded-sm">
                  <span className="blue-gradient font-display font-black text-sm">{String(i + 1).padStart(2, "0")}</span>
                </div>
              </div>
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <step.icon className="w-5 h-5 text-brand-blue-light" />
                  <h4 className="font-display font-bold text-base text-[#1B3A6B] uppercase tracking-wider">{step.title}</h4>
                </div>
                <p className="text-[#1B3A6B]/55 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-brand px-10 py-4 rounded-sm font-display text-sm inline-flex items-center gap-3">
            SOLICITAR VISITA DE ASESOR <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
