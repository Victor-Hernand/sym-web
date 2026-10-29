// Página Contacto — ventana de contacto a pantalla completa (ruta /contacto), con menú visible
import { COMPANY } from "@/lib/data";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Truck, CreditCard, Linkedin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const contactInfo = [
  { icon: Phone, label: "Teléfono", value: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s/g, "")}` },
  { icon: Mail, label: "Correo", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: MapPin, label: "Dirección", value: `${COMPANY.address}, ${COMPANY.city}`, href: "#" },
  { icon: Clock, label: "Horario de atención comercial", value: "Lun-Vie: 8:00 AM - 5:00 PM | Sáb: 8:00 AM - 12:00 PM", href: "#" },
];

const coverageFeatures = [
  { icon: Truck, title: "Entrega al día siguiente", description: "Pedidos preparados y despachados con rapidez para que tu negocio no se detenga." },
  { icon: MapPin, title: "Cobertura nacional", description: "Atendemos clientes en todo Honduras mediante distribución directa y asesoría comercial." },
  { icon: Clock, title: "Logística ágil", description: "Procesos logísticos optimizados para garantizar entregas puntuales y continuidad operativa." },
  { icon: CreditCard, title: "Crédito flexible", description: "Opciones de crédito adaptadas a tu volumen de compra y relación comercial." },
];

const CLIENT_TYPES = [
  "Tienda de Repuestos",
  "Distribuidora de repuestos",
  "Comerciante Individual",
  "Colaborador de la empresa",
  "Taller mecánico",
];

const inputClass = "w-full bg-white border border-[#1B3A6B]/12 text-[#1B3A6B] px-4 py-3 rounded-sm text-sm focus:border-brand-blue-light/50 focus:outline-none focus:ring-1 focus:ring-brand-blue/20 transition-all placeholder:text-[#1B3A6B]/30";

export default function Contacto() {
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

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-light-bg">
        <Navbar />
        <main
          className="flex-1 py-12 md:py-16"
          style={{
            // Trama de ondas con un velo claro para que el texto siga legible
            backgroundColor: "#f8fafc",
            backgroundImage: 'linear-gradient(rgba(248, 250, 252, 0.9), rgba(248, 250, 252, 0.9)), url("/images/hero-ondas.jpg")',
            backgroundSize: "auto, 480px auto",
            backgroundRepeat: "no-repeat, repeat",
          }}
        >
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <span className="section-label justify-center">Contáctenos</span>
              <h1 className="font-display font-black text-4xl md:text-5xl text-[#1B3A6B] mt-4 mb-4">
                Hablemos de su <span className="text-gradient-red">Negocio</span>
              </h1>
              <p className="text-[#1B3A6B]/55 max-w-2xl mx-auto">
                Atención exclusiva para clientes mayoristas. Solicite una cotización o agende una visita con uno de nuestros asesores comerciales.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Información de contacto */}
              <div className="lg:col-span-2 space-y-4">
                {contactInfo.map((info) => (
                  <a key={info.label} href={info.href} className="bg-white border border-[#1B3A6B]/8 shadow-sm p-4 rounded-sm flex items-start gap-4 group hover:border-brand-blue-light/25 hover:shadow-md transition-all block">
                    <div className="w-10 h-10 bg-[#1B3A6B]/8 flex items-center justify-center rounded-sm shrink-0 group-hover:bg-[#1B3A6B]/12 transition-colors">
                      <info.icon className="w-5 h-5 text-brand-blue-light" />
                    </div>
                    <div>
                      <span className="text-[#1B3A6B]/45 text-xs font-display font-semibold uppercase tracking-wider">{info.label}</span>
                      <p className="text-[#1B3A6B]/80 text-sm mt-0.5">{info.value}</p>
                    </div>
                  </a>
                ))}
                <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white py-4 px-6 font-display font-bold uppercase tracking-wider transition-all rounded-sm text-sm mt-4">
                  <MessageCircle className="w-5 h-5" /> ESCRIBIR POR WHATSAPP
                </a>
              </div>

              {/* Formulario */}
              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="bg-white border border-[#1B3A6B]/8 shadow-sm p-8 rounded-sm space-y-5">
                  <h2 className="font-display font-bold text-xl text-[#1B3A6B] uppercase tracking-wider mb-1">Solicitar cotización mayorista</h2>
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
                      <select required value={formData.clientType} onChange={(e) => setFormData({ ...formData, clientType: e.target.value })} className={inputClass}>
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
              </div>
            </div>

            {/* Logística y cobertura */}
            <div className="mt-14 pt-12 border-t border-[#1B3A6B]/10">
              <div className="text-center mb-10">
                <span className="section-label justify-center">Logística & Cobertura</span>
                <h2 className="font-display font-black text-3xl md:text-4xl text-[#1B3A6B] mt-4 mb-4">
                  Cobertura a nivel <span className="blue-gradient">nacional</span>
                </h2>
                <p className="text-[#1B3A6B]/55 max-w-3xl mx-auto leading-relaxed">
                  Ofrecemos cobertura a nivel nacional a través de un equipo de asesores de ventas altamente capacitados que visitan tu empresa de forma directa. Al realizar tu pedido lo recibes al día siguiente, con un sistema de logística optimizado que procesa pedidos con rapidez, empaca de forma segura y coordina entregas en todo el territorio nacional.
                </p>
                <div className="inline-flex items-start gap-3 mt-6 px-5 py-4 bg-white border border-[#1B3A6B]/8 shadow-sm rounded-sm text-left">
                  <MapPin className="w-5 h-5 text-brand-blue-light shrink-0 mt-0.5" />
                  <div>
                    <div className="font-display font-bold text-xs uppercase tracking-wider text-[#1B3A6B]">Bodega principal</div>
                    <div className="text-sm text-[#1B3A6B]/70 mt-1">{COMPANY.address}, {COMPANY.city}</div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {coverageFeatures.map((feat) => (
                  <div key={feat.title} className="bg-white border border-[#1B3A6B]/8 shadow-sm p-5 rounded-sm hover:border-brand-blue-light/25 hover:shadow-md transition-all">
                    <feat.icon className="w-8 h-8 text-brand-blue-light mb-3" />
                    <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#1B3A6B]">{feat.title}</h3>
                    <p className="text-sm text-[#1B3A6B]/60 mt-2 leading-relaxed">{feat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trabaja con nosotros */}
            <div className="mt-14 pt-12 border-t border-[#1B3A6B]/10 text-center">
              <span className="section-label justify-center">Únete al equipo</span>
              <h2 className="font-display font-black text-3xl md:text-4xl text-[#1B3A6B] mt-4 mb-4">
                ¿Deseas trabajar con <span className="blue-gradient">nosotros</span>?
              </h2>
              <p className="text-[#1B3A6B]/55 max-w-2xl mx-auto mb-8">
                Súmate al equipo de Inversiones S&amp;M y del Grupo CAP Honduras. Conoce nuestras vacantes y envía tu aplicación.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={COMPANY.linkedin} target="_blank" rel="noopener noreferrer" className="bg-[#1B3A6B] hover:bg-[#0E2240] text-white font-bold uppercase tracking-wider px-8 py-4 rounded-sm font-display text-sm flex items-center gap-3 transition-all">
                  <Linkedin className="w-5 h-5" /> VER VACANTES EN LINKEDIN
                </a>
                <a href={COMPANY.careersApply} target="_blank" rel="noopener noreferrer" className="border-2 border-[#1B3A6B]/40 text-[#1B3A6B] font-semibold uppercase tracking-wider px-8 py-4 rounded-sm font-display text-sm flex items-center gap-3 hover:bg-[#1B3A6B]/5 transition-all">
                  <Send className="w-5 h-5" /> APLICAR AHORA
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
      </div>
    </MotionConfig>
  );
}
