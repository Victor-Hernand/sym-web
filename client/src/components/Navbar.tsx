// DESIGN: Light Premium — Glassmorphism navbar with brand blue accents
import { COMPANY, IMAGES, NAV_ITEMS } from "@/lib/data";
import { Phone, Mail, Clock, Menu, X, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* TopBar */}
      <div className="bg-light-bg border-b border-brand-blue/8 hidden md:block relative z-50">
        <div className="container py-2 flex justify-between items-center text-xs text-sym-charcoal/50">
          <div className="flex items-center gap-6">
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-brand-blue-light transition-colors">
              <Phone className="w-3 h-3 text-brand-blue-light" /> {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-1.5 hover:text-brand-blue-light transition-colors">
              <Mail className="w-3 h-3 text-brand-blue-light" /> {COMPANY.email}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-brand-blue-light" /> {COMPANY.schedule}
            </span>
            <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-brand px-4 py-1 text-xs rounded-sm font-display">
              COTIZAR AHORA
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "glass shadow-2xl shadow-brand-blue/10" : "bg-light-surface/80 backdrop-blur-sm"}`}>
        <div className="container py-3 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3 group">
            <img src={IMAGES.logo} alt="Inversiones S&M" className="h-12 w-auto object-contain" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-4 py-2 text-sm font-display font-semibold uppercase tracking-wider text-sym-charcoal/70 hover:text-brand-blue-light transition-all relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-blue to-brand-blue-light group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={COMPANY.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand px-6 py-2.5 rounded-sm font-display text-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              CONTÁCTANOS
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-sym-black p-2">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Blue accent line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-40" />

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass border-t border-brand-blue/8"
            >
              <div className="container py-4 flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="py-3 px-4 text-left font-display font-semibold uppercase tracking-wider text-sym-charcoal/70 hover:text-brand-blue-light hover:bg-brand-blue/5 transition-all"
                  >
                    {item.label}
                  </button>
                ))}
                <a
                  href={COMPANY.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brand px-6 py-3 rounded-sm font-display text-sm text-center mt-2"
                >
                  COTIZAR POR WHATSAPP
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
