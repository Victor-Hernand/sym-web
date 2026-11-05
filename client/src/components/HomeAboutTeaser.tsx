// Resumen corto "Quiénes somos" en la home, con enlace a /nosotros y carrusel de fotos del equipo.
import { useEffect, useState } from "react";
import Lightbox from "@/components/Lightbox";
import { COMPANY } from "@/lib/data";
import { ArrowRight, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const TEAM_PHOTOS = [
  { src: "/images/equipo/equipo-5.webp", alt: "Operario de bodega sosteniendo una caja de discos de freno R-TECH" },
  { src: "/images/equipo/equipo-6.webp", alt: "Colaborador de bodega con camiseta WELMET entre los estantes de inventario" },
  { src: "/images/equipo/equipo-7.webp", alt: "Colaborador revisando y registrando cajas WELMET" },
  { src: "/images/equipo/equipo-8.webp", alt: "Colaborador acomodando cajas de productos WAGNER en la bodega" },
  { src: "/images/equipo/equipo-9.webp", alt: "Colaborador trabajando en el sistema de inventario y facturación" },
  { src: "/images/equipo/equipo-10.webp", alt: "Colaborador preparando pedidos junto a cajas WELMET" },
  { src: "/images/equipo/equipo-11.webp", alt: "Colaborador empujando un carrito de carga con repuestos en la bodega" },
];

const AUTOPLAY_MS = 5000;

export default function HomeAboutTeaser() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState<number | null>(null);
  const count = TEAM_PHOTOS.length;
  const go = (i: number) => setIndex((i + count) % count);

  useEffect(() => {
    if (paused || zoom !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, zoom, count]);

  return (
    <section id="quienes-somos" className="relative bg-light-bg pt-14 md:pt-20 pb-10 md:pb-14">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <span className="section-label">Quiénes somos</span>
            <h2 className="mt-4 font-display text-3xl font-black uppercase leading-tight text-[#1B3A6B] md:text-4xl">
              Una empresa que <span className="blue-gradient">crece con tu negocio</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#1B3A6B]/65">
              Somos {COMPANY.name}, distribuidora mayorista de autopartes en Honduras. Importamos directamente, mantenemos stock constante y acompañamos a talleres y tiendas con asesoría, crédito flexible y entregas puntuales.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <a href="/nosotros" className="btn-brand inline-flex items-center gap-2 rounded-sm px-6 py-3 font-display text-sm">
                NOSOTROS <ArrowRight className="h-4 w-4" />
              </a>
              <div className="flex items-center gap-3 border-l border-[#1B3A6B]/15 pl-6">
                <span className="blue-gradient font-display text-3xl font-black leading-none">7+</span>
                <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#1B3A6B]/55">Años abasteciendo negocios</span>
              </div>
            </div>
          </div>

          {/* Carrusel del equipo */}
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative aspect-[3/2] overflow-hidden rounded-sm border border-[#1B3A6B]/10 bg-[#1B3A6B]/5 shadow-xl">
              <div
                className="flex h-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {TEAM_PHOTOS.map((photo, i) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setZoom(i)}
                    aria-label={`Ampliar foto ${i + 1} de ${count}: ${photo.alt}`}
                    className="group relative h-full w-full shrink-0 cursor-zoom-in overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue-light"
                  >
                    <img src={photo.src} alt={photo.alt} loading={i === 0 ? "eager" : "lazy"} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-sm bg-[#0f0f14]/70 px-2.5 py-1.5 font-display text-[11px] font-bold uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <ZoomIn className="h-3.5 w-3.5" /> Ampliar
                    </span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1B3A6B] shadow-md transition-colors hover:bg-brand-blue hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Foto siguiente"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1B3A6B] shadow-md transition-colors hover:bg-brand-blue hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex justify-center gap-2">
              {TEAM_PHOTOS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Ver foto ${i + 1}`}
                  aria-current={index === i}
                  className={`h-2.5 rounded-full transition-[transform,opacity,box-shadow,background-color,border-color,color] ${index === i ? "w-6 bg-brand-blue" : "w-2.5 bg-[#1B3A6B]/20 hover:bg-[#1B3A6B]/40"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Lightbox items={TEAM_PHOTOS.map((p) => ({ src: p.src, alt: p.alt }))} index={zoom} onIndexChange={setZoom} onClose={() => setZoom(null)} />
    </section>
  );
}
