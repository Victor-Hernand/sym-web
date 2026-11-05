// Buscador tipo tienda justo debajo del hero: lleva al catálogo con la búsqueda o la categoría elegida.
import { useState } from "react";
import { useLocation } from "wouter";
import { CATEGORIES, COMPANY } from "@/lib/data";
import { Search, MessageCircle, Cog, CircleDot, Settings, ArrowUpDown, Zap, Thermometer, Circle, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Cog, CircleDot, Settings, ArrowUpDown, Zap, Thermometer, Circle };

export default function StoreSearchSection() {
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();

  const goToCatalog = (params: Record<string, string>) => {
    const search = new URLSearchParams(params).toString();
    navigate(search ? `/catalogo?${search}` : "/catalogo");
    window.scrollTo({ top: 0 });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    goToCatalog(q ? { q } : {});
  };

  return (
    <section className="relative bg-light-bg pt-10 md:pt-12 pb-4">
      <div className="container">
        <form
          onSubmit={submit}
          className="relative max-w-3xl mx-auto bg-white border border-[#1B3A6B]/10 shadow-xl rounded-sm p-2 flex flex-col sm:flex-row gap-2 -mt-20 md:-mt-24 z-30 focus-within:ring-2 focus-within:ring-brand-blue-light/40"
          role="search"
        >
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1B3A6B]/40" />
            <input
              type="search"
              name="q"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué repuesto buscas? Ej: pastillas, WELMET…"
              aria-label="Buscar repuestos en el catálogo"
              className="block w-full min-w-0 h-12 bg-transparent text-[#1B3A6B] placeholder:text-[#1B3A6B]/35 pl-12 pr-3 text-sm focus:outline-none"
            />
          </div>
          <button type="submit" className="btn-brand h-12 px-6 rounded-sm font-display text-sm inline-flex items-center justify-center gap-2">
            BUSCAR
          </button>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Cog;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => goToCatalog({ cat: cat.name })}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#1B3A6B]/10 shadow-sm rounded-sm text-[#1B3A6B]/75 font-display font-semibold text-xs uppercase tracking-wider hover:text-brand-blue-light hover:border-brand-blue-light/35 hover:-translate-y-0.5 transition-[transform,opacity,box-shadow,background-color,border-color,color]"
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.name}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            type="button"
            onClick={() => goToCatalog({})}
            className="btn-brand px-7 py-3.5 rounded-sm font-display text-sm inline-flex items-center gap-2"
          >
            VER CATÁLOGO COMPLETO <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={`${COMPANY.whatsapp}?text=${encodeURIComponent("Hola, quisiera información para comprar repuestos al mayoreo.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1B3A6B]/70 hover:text-brand-blue-light font-display font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> ¿No encuentras tu repuesto? Escríbenos
          </a>
        </div>
      </div>
    </section>
  );
}
