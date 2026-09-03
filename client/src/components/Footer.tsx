// DESIGN: Light Premium — Footer with brand blue accents
import { COMPANY, IMAGES, NAV_ITEMS } from "@/lib/data";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import TikTokIcon from "@/components/icons/TikTokIcon";

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0E2240] border-t border-brand-blue/15 relative">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="inline-flex bg-white rounded-sm px-4 py-3 mb-5">
              <img src={IMAGES.logo} alt="Inversiones S&M" className="h-14 w-auto object-contain" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{COMPANY.tagline}</p>
            <p className="hero-blue-gradient font-display font-bold italic text-sm">"{COMPANY.slogan}"</p>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-brand-blue-glow mb-6">Navegación</h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}><button onClick={() => handleNavClick(item.href)} className="text-white/50 text-sm hover:text-brand-blue-glow transition-colors font-display">{item.label}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-brand-blue-glow mb-6">Contacto</h4>
            <ul className="space-y-3">
              <li><a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-white/50 text-sm hover:text-brand-blue-glow transition-colors"><Phone className="w-3.5 h-3.5 text-brand-blue-glow/60" /> {COMPANY.phone}</a></li>
              <li><a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-white/50 text-sm hover:text-brand-blue-glow transition-colors break-all"><Mail className="w-3.5 h-3.5 text-brand-blue-glow/60 shrink-0" /> {COMPANY.email}</a></li>
              <li className="flex items-start gap-2 text-white/50 text-sm"><MapPin className="w-3.5 h-3.5 text-brand-blue-glow/60 shrink-0 mt-0.5" /> {COMPANY.address}, {COMPANY.city}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-brand-blue-glow mb-6">Síguenos</h4>
            <div className="flex gap-3">
              <a href={COMPANY.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook de Inversiones S&M" className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center rounded-sm hover:border-brand-blue-glow/30 hover:bg-brand-blue/10 transition-all group"><Facebook className="w-5 h-5 text-white/50 group-hover:text-brand-blue-glow transition-colors" /></a>
              <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Inversiones S&M" className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center rounded-sm hover:border-brand-blue-glow/30 hover:bg-brand-blue/10 transition-all group"><Instagram className="w-5 h-5 text-white/50 group-hover:text-brand-blue-glow transition-colors" /></a>
              <a href={COMPANY.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok de Inversiones S&M" className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center rounded-sm hover:border-brand-blue-glow/30 hover:bg-brand-blue/10 transition-all group"><TikTokIcon className="w-5 h-5 text-white/50 group-hover:text-brand-blue-glow transition-colors" /></a>
            </div>
            <div className="mt-6">
              <p className="text-white/30 text-xs">RTN: {COMPANY.rtn}</p>
              <p className="text-white/30 text-xs mt-1">{COMPANY.legalName}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/30 text-xs">&copy; {new Date().getFullYear()} {COMPANY.name}. Todos los derechos reservados.</p>
          <p className="text-white/30 text-xs">Parte del Grupo CAP Honduras</p>
        </div>
      </div>
    </footer>
  );
}
