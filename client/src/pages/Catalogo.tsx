// Catálogo de repuestos: búsqueda, filtros por categoría, marca y vehículo, orden y lista de cotización.
// Acepta ?q= y ?cat= en la URL para enlazar desde la home o desde otras páginas.
import { useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";
import { ArrowLeft, Search, X, PackageSearch, MessageCircle, Car, Cog, CircleDot, Settings, ArrowUpDown, Zap, Thermometer, Circle, Filter, Droplets, Wrench, SlidersHorizontal, Boxes, Tags, BadgeCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import ProductCard from "@/components/ProductCard";
import { COMPANY, PRODUCTS, PRODUCT_BRANDS, PRODUCT_CATEGORIES, VEHICLE_MAKES, type Product } from "@/lib/data";

const ALL = "Todas";

const CATEGORY_ICON: Record<string, React.ElementType> = {
  Motor: Cog,
  Frenos: CircleDot,
  "Embragues y Transmisión": Settings,
  "Dirección y Suspensión": ArrowUpDown,
  Eléctricos: Zap,
  Refrigeración: Thermometer,
  Rodamientos: Circle,
  Filtros: Filter,
  Lubricantes: Droplets,
  Accesorios: Wrench,
};

const SORTS = {
  relevance: "Recomendados",
  name: "Nombre A–Z",
  brand: "Marca A–Z",
  vehicle: "Con vehículo primero",
} as const;
type SortKey = keyof typeof SORTS;

/** Quita tildes y pasa a minúsculas para que "embrague" encuentre "Embragues". */
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

function readParams() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  const veh = params.get("veh");
  return {
    q: params.get("q") ?? "",
    cat: cat && PRODUCT_CATEGORIES.includes(cat) ? cat : ALL,
    veh: veh && VEHICLE_MAKES.includes(veh) ? veh : ALL,
  };
}

const sectionTitle = "text-[#1B3A6B]/45 font-display font-bold text-[11px] uppercase tracking-[0.15em] mb-2";
const selectClass = "w-full bg-white border border-[#1B3A6B]/15 text-[#1B3A6B] px-3 py-2.5 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue-light/50 transition-shadow";

export default function Catalogo() {
  const initial = useMemo(readParams, []);
  const [query, setQuery] = useState(initial.q);
  const [category, setCategory] = useState(initial.cat);
  const [brand, setBrand] = useState(ALL);
  const [vehicleMake, setVehicleMake] = useState(initial.veh);
  const [sort, setSort] = useState<SortKey>("relevance");

  const results = useMemo(() => {
    const q = norm(query);
    const filtered = PRODUCTS.filter((p: Product) => {
      if (category !== ALL && p.category !== category) return false;
      if (brand !== ALL && p.brand !== brand) return false;
      if (vehicleMake !== ALL && !p.vehicleMakes.includes(vehicleMake)) return false;
      if (!q) return true;
      return norm(`${p.name} ${p.brand ?? ""} ${p.category} ${p.vehicle ?? ""} ${p.refs.join(" ")} ${p.description}`).includes(q);
    });
    if (sort === "name") return [...filtered].sort((a, b) => a.name.localeCompare(b.name, "es"));
    if (sort === "brand") return [...filtered].sort((a, b) => (a.brand ?? "ZZZ").localeCompare(b.brand ?? "ZZZ", "es") || a.name.localeCompare(b.name, "es"));
    if (sort === "vehicle") return [...filtered].sort((a, b) => Number(!!b.vehicle) - Number(!!a.vehicle));
    return filtered;
  }, [query, category, brand, vehicleMake, sort]);

  const countFor = (cat: string) => PRODUCTS.filter((p) => cat === ALL || p.category === cat).length;
  const activeChips: { key: string; label: string; clear: () => void }[] = [
    ...(query ? [{ key: "q", label: `Buscar: “${query}”`, clear: () => setQuery("") }] : []),
    ...(category !== ALL ? [{ key: "cat", label: category, clear: () => setCategory(ALL) }] : []),
    ...(brand !== ALL ? [{ key: "brand", label: `Marca: ${brand}`, clear: () => setBrand(ALL) }] : []),
    ...(vehicleMake !== ALL ? [{ key: "veh", label: `Vehículo: ${vehicleMake}`, clear: () => setVehicleMake(ALL) }] : []),
  ];
  const hasFilters = activeChips.length > 0;
  const clearFilters = () => {
    setQuery("");
    setCategory(ALL);
    setBrand(ALL);
    setVehicleMake(ALL);
  };

  const stats = [
    { icon: Boxes, value: PRODUCTS.length, label: "Repuestos" },
    { icon: Tags, value: PRODUCT_CATEGORIES.length, label: "Categorías" },
    { icon: BadgeCheck, value: PRODUCT_BRANDS.length, label: "Marcas" },
    { icon: Car, value: VEHICLE_MAKES.length, label: "Marcas de vehículo" },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-light-bg">
        <Navbar />
        <main className="flex-1">
          {/* Encabezado con buscador y estadísticas */}
          <section className="relative bg-[#0E2240] noise-overlay overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none mix-blend-multiply"
              style={{ backgroundImage: 'url("/images/hero-ondas.jpg")', backgroundSize: "480px auto", backgroundRepeat: "repeat" }}
            />
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-blue-bright/15 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="container relative z-10 py-12 md:py-16">
              <a
                href="/#inicio"
                className="mb-5 inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/5 px-3.5 py-2 font-display text-[11px] font-bold uppercase tracking-wider text-white/85 backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Volver al inicio
              </a>
              <span className="section-label-light block">Catálogo mayorista</span>
              <h1 className="font-display font-black uppercase text-white text-3xl md:text-5xl leading-tight mt-3 mb-3">
                Repuestos para tu <span className="hero-blue-gradient">tienda de autopartes</span>
              </h1>
              <p className="text-white/65 max-w-2xl mb-8">
                Busca por nombre, marca, referencia o vehículo. Agrega lo que necesitas a tu lista y envíala por WhatsApp; te respondemos con precio mayorista y disponibilidad.
              </p>

              <div className="relative max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1B3A6B]/40" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ej: pastillas de freno, Corolla 2005, WELMET, 3B…"
                  aria-label="Buscar repuestos"
                  className="w-full bg-white text-[#1B3A6B] placeholder:text-[#1B3A6B]/35 pl-12 pr-12 py-4 rounded-sm text-base shadow-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue-light"
                />
                {query && (
                  <button type="button" onClick={() => setQuery("")} aria-label="Limpiar búsqueda" className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-[#1B3A6B]/50 hover:text-[#1B3A6B]">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
                {stats.map((s) => (
                  <div key={s.label} className="bg-white/[0.06] border border-white/10 backdrop-blur-sm rounded-sm px-4 py-3 flex items-center gap-3">
                    <s.icon className="w-5 h-5 text-brand-blue-glow shrink-0" />
                    <div>
                      <dt className="text-white/55 text-[10px] font-display font-bold uppercase tracking-wider">{s.label}</dt>
                      <dd className="text-white font-display font-black text-xl tabular-nums leading-none mt-0.5">{s.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <div className="container py-10 md:py-12 grid grid-cols-1 lg:grid-cols-[272px_minmax(0,1fr)] gap-10">
            {/* Filtros: columna en escritorio; chips desplazables en móvil */}
            <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
              <p className={`hidden lg:block ${sectionTitle}`}>Categorías</p>
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 [scrollbar-width:none]">
                {[ALL, ...PRODUCT_CATEGORIES].map((cat) => {
                  const Icon = CATEGORY_ICON[cat] ?? SlidersHorizontal;
                  const active = category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      aria-pressed={active}
                      className={`shrink-0 lg:w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm font-display text-xs font-bold uppercase tracking-wider border transition-[transform,opacity,box-shadow,background-color,border-color,color] lg:justify-between ${
                        active
                          ? "bg-brand-blue text-white border-brand-blue shadow-md"
                          : "bg-white text-[#1B3A6B]/70 border-[#1B3A6B]/12 hover:border-brand-blue-light/40 hover:text-brand-blue-light"
                      }`}
                    >
                      <span className="flex items-center gap-2.5 min-w-0">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{cat}</span>
                      </span>
                      <span className={`hidden lg:inline text-[11px] tabular-nums px-1.5 rounded-sm ${active ? "bg-white/20" : "bg-[#1B3A6B]/8 text-[#1B3A6B]/55"}`}>{countFor(cat)}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <label htmlFor="filtro-vehiculo" className={`block ${sectionTitle}`}>
                    <Car className="inline w-3.5 h-3.5 mr-1 -mt-0.5" /> Vehículo
                  </label>
                  <select id="filtro-vehiculo" value={vehicleMake} onChange={(e) => setVehicleMake(e.target.value)} className={selectClass}>
                    <option value={ALL}>Todas las marcas de vehículo</option>
                    {VEHICLE_MAKES.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="filtro-marca" className={`block ${sectionTitle}`}>
                    <BadgeCheck className="inline w-3.5 h-3.5 mr-1 -mt-0.5" /> Marca del repuesto
                  </label>
                  <select id="filtro-marca" value={brand} onChange={(e) => setBrand(e.target.value)} className={selectClass}>
                    <option value={ALL}>Todas las marcas</option>
                    {PRODUCT_BRANDS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="hidden lg:block mt-8 p-5 rounded-sm bg-gradient-to-br from-[#0E2240] to-[#1B3A6B] text-white">
                <p className="font-display font-bold text-sm mb-1">¿No encuentras tu repuesto?</p>
                <p className="text-white/65 text-xs leading-relaxed mb-4">Dinos la marca, el modelo y el año de tu vehículo y te respondemos por WhatsApp.</p>
                <a
                  href={`${COMPANY.whatsapp}?text=${encodeURIComponent("Hola, busco un repuesto que no encuentro en el catálogo.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#1B3A6B] w-full px-4 py-2.5 rounded-sm font-display text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Consultar
                </a>
              </div>
            </aside>

            <div className="min-w-0">
              {/* Barra de resultados: conteo, filtros activos y orden */}
              <div className="flex flex-col gap-4 mb-6 pb-5 border-b border-[#1B3A6B]/10">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <p className="text-[#1B3A6B]/60 text-sm">
                    <span className="font-display font-black text-2xl text-[#1B3A6B] tabular-nums mr-1.5">{results.length}</span>
                    {results.length === 1 ? "repuesto" : "repuestos"}
                    {category !== ALL && <> en <span className="font-semibold text-[#1B3A6B]">{category}</span></>}
                  </p>
                  <div className="flex items-center gap-3">
                    <label htmlFor="orden" className="text-[#1B3A6B]/50 text-xs font-display font-bold uppercase tracking-wider">Ordenar</label>
                    <select id="orden" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="bg-white border border-[#1B3A6B]/15 text-[#1B3A6B] px-3 py-2 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20">
                      {(Object.keys(SORTS) as SortKey[]).map((k) => (
                        <option key={k} value={k}>{SORTS[k]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {hasFilters && (
                  <div className="flex flex-wrap items-center gap-2">
                    {activeChips.map((c) => (
                      <span key={c.key} className="inline-flex items-center gap-1.5 bg-brand-blue/8 border border-brand-blue/15 text-brand-blue text-xs font-semibold pl-3 pr-1.5 py-1 rounded-sm">
                        {c.label}
                        <button type="button" onClick={c.clear} aria-label={`Quitar filtro ${c.label}`} className="w-5 h-5 flex items-center justify-center rounded-sm hover:bg-brand-blue/15">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <button type="button" onClick={clearFilters} className="ml-1 text-brand-blue-light hover:text-brand-blue font-display font-bold text-[11px] uppercase tracking-wider">
                      Limpiar todo
                    </button>
                  </div>
                )}
              </div>

              {results.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {results.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-[#1B3A6B]/10 rounded-sm py-16 px-6 text-center shadow-sm">
                  <PackageSearch className="w-12 h-12 mx-auto text-[#1B3A6B]/25 mb-4" />
                  <p className="font-display font-bold text-[#1B3A6B] mb-1">No encontramos repuestos con esos filtros</p>
                  <p className="text-[#1B3A6B]/55 text-sm mb-6">Prueba otra palabra, quita algún filtro o consulta directamente por WhatsApp.</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button type="button" onClick={clearFilters} className="px-5 py-2.5 rounded-sm border border-[#1B3A6B]/20 text-[#1B3A6B] font-display text-xs font-bold uppercase tracking-wider hover:bg-[#1B3A6B]/5">
                      Ver todo el catálogo
                    </button>
                    <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-brand px-5 py-2.5 rounded-sm font-display text-xs inline-flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" /> CONSULTAR
                    </a>
                  </div>
                </div>
              )}
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
