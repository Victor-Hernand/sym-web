// DESIGN: Light Premium — Contact with glass form and brand blue accents on light background
import { useInView } from "@/hooks/useInView";
import { COMPANY } from "@/lib/data";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const contactInfo = [
  { icon: Phone, label: "Teléfono", value: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s/g, "")}` },
  { icon: Mail, label: "Correo", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: MapPin, label: "Dirección", value: `${COMPANY.address}, ${COMPANY.city}`, href: "#" },
  { icon: Clock, label: "Horario de atención comercial", value: "Lun-Vie: 8:00 AM - 5:00 PM | Sáb: 8:00 AM - 12:00 PM", href: "#" },
];

const CLIENT_TYPES = [
  "Tienda de Repuestos",
  "Distribuidora de repuestos",
  "Comerciante Individual",
  "Colaborador de la empresa",
  "Taller mecánico",
];

export default function ContactSection() {
  const { ref, isInView } = useInView();
  const [formData, setFormData] = useState({ name: "", company: "", clientType: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hola, soy ${formData.name} de ${formData.company}.\nTipo de cliente: ${formData.clientType}\n\n${formData.message}\n\nTeléfono: ${formData.phone}\nEmail: ${formData.email}`
    );
    const waNumber = COMPANY.whatsapp.replace(/\D/g, "");
    window.open(`https://wa.me/${waNumber}?text=${msg}`, "_blank");
    toast.success("Redirigiendo a WhatsApp para completar su solicitud.");
  };

  const inputClass = "w-full bg-white border border-[#1B3A6B]/12 text-[#1B3A6B] px-4 py-3 rounded-sm text-sm focus:border-brand-blue-light/50 focus:outline-none focus:ring-1 focus:ring-brand-blue/20 transition-all placeholder:text-[#1B3A6B]/30";

  return (
    <section id="contacto" className="py-24 md:py-32 bg-light-bg relative noise-overlay" ref={ref}>
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="section-label justify-center">Contáctenos</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#1B3A6B] mt-4 mb-4">
            Hablemos de su <span className="text-gradient-red">Negocio</span>
          </h2>
          <p className="text-[#1B3A6B]/55 max-w-2xl mx-auto">Atención exclusiva para clientes mayoristas. Solicite una cotización o agende una visita con uno de nuestros asesores comerciales.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="lg:col-span-2 space-y-4">
            {contactInfo.map((info, i) => (
              <motion.a key={info.label} href={info.href} initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.08 }} className="bg-white border border-[#1B3A6B]/8 shadow-sm p-4 rounded-sm flex items-start gap-4 group hover:border-brand-blue-light/25 hover:shadow-md transition-all block">
                <div className="w-10 h-10 bg-[#1B3A6B]/8 flex items-center justify-center rounded-sm shrink-0 group-hover:bg-[#1B3A6B]/12 transition-colors">
                  <info.icon className="w-5 h-5 text-brand-blue-light" />
                </div>
                <div>
                  <span className="text-[#1B3A6B]/45 text-xs font-display font-semibold uppercase tracking-wider">{info.label}</span>
                  <p className="text-[#1B3A6B]/80 text-sm mt-0.5">{info.value}</p>
                </div>
              </motion.a>
            ))}
            <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white py-4 px-6 font-display font-bold uppercase tracking-wider transition-all rounded-sm text-sm mt-4">
              <MessageCircle className="w-5 h-5" /> ESCRIBIR POR WHATSAPP
            </a>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white border border-[#1B3A6B]/8 shadow-sm p-8 rounded-sm space-y-5">
              <h3 className="font-display font-bold text-xl text-[#1B3A6B] uppercase tracking-wider mb-1">Solicitar cotización mayorista</h3>
              <p className="text-[#1B3A6B]/45 text-sm mb-6">Complete el formulario y uno de nuestros asesores comerciales se pondrá en contacto con usted.</p>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[#1B3A6B]/55 text-xs font-display font-semibold uppercase tracking-wider mb-2 block">Nombre Completo *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder="Su nombre" />
                </div>
                <div>
                  <label className="text-[#1B3A6B]/55 text-xs font-display font-semibold uppercase tracking-wider mb-2 block">Empresa *</label>
                  <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className={inputClass} placeholder="Nombre de su empresa" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[#1B3A6B]/55 text-xs font-display font-semibold uppercase tracking-wider mb-2 block">Tipo de cliente *</label>
                  <select
                    required
                    value={formData.clientType}
                    onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                    className={inputClass}
                  >
                    <option value="" disabled>Seleccione una opción</option>
                    {CLIENT_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[#1B3A6B]/55 text-xs font-display font-semibold uppercase tracking-wider mb-2 block">Teléfono *</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} placeholder="+504 ____-____" />
                </div>
                <div>
                  <label className="text-[#1B3A6B]/55 text-xs font-display font-semibold uppercase tracking-wider mb-2 block">Correo Electrónico</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder="correo@empresa.com" />
                </div>
              </div>
              <div>
                <label className="text-[#1B3A6B]/55 text-xs font-display font-semibold uppercase tracking-wider mb-2 block">Mensaje / Productos *</label>
                <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputClass} resize-none`} placeholder="Describa los productos que necesita o el tipo de negocio al que pertenece." />
              </div>
              <button type="submit" className="btn-brand w-full py-4 rounded-sm font-display text-sm flex items-center justify-center gap-3">
                <Send className="w-4 h-4" /> ENVIAR SOLICITUD DE COTIZACIÓN
              </button>
              <p className="text-[#1B3A6B]/30 text-xs text-center">Al enviar, será redirigido a WhatsApp con su mensaje pre-cargado.</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
