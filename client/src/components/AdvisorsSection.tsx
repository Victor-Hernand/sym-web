// DESIGN: Light Premium — Nuestros asesores de venta B2B
import { useInView } from "@/hooks/useInView";
import { ADVISOR_BENEFITS, COMPANY, IMAGES } from "@/lib/data";
import { motion } from "framer-motion";
import { Handshake, Lightbulb, ClipboardList, LifeBuoy, TrendingUp } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Handshake, Lightbulb, ClipboardList, LifeBuoy, TrendingUp };

export default function AdvisorsSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="asesores" className="py-24 md:py-32 bg-light-bg relative overflow-hidden noise-overlay" ref={ref}>
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-28"
          >
            <span className="section-label">Equipo Comercial</span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#1B3A6B] mt-4 mb-6 leading-tight">
              Nuestros asesores de <span className="blue-gradient">venta B2B</span>
            </h2>
            <p className="text-[#1B3A6B]/60 leading-relaxed mb-8">
              En {COMPANY.name} contamos con un equipo de los mejores asesores en venta de autopartes, dedicados a brindarte un servicio excepcional y una experiencia de compra inigualable.
            </p>
            <img
              src={IMAGES.realEquipoComercial}
              alt="Asesores comerciales de Inversiones S&M"
              className="w-full aspect-[4/3] object-cover rounded-sm"
            />
          </motion.div>

          <div className="space-y-4">
            {ADVISOR_BENEFITS.map((benefit, i) => {
              const Icon = iconMap[benefit.icon] || Handshake;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="bg-white border border-[#1B3A6B]/8 shadow-sm p-5 rounded-sm card-shine group hover:border-brand-blue-light/25 hover-lift"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#1B3A6B]/8 group-hover:bg-brand-blue/10 flex items-center justify-center shrink-0 rounded-sm transition-colors">
                      <Icon className="w-5 h-5 text-brand-blue-light group-hover:scale-125 transition-transform duration-300" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#1B3A6B]">{benefit.title}</h3>
                      <p className="text-sm text-[#1B3A6B]/55 mt-1.5 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
