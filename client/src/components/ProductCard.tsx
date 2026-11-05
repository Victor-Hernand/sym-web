// Tarjeta de producto: foto, marca, vehículo compatible y acciones de cotización. Abre la ficha al tocar la foto.
import { useState } from "react";
import { COMPANY, type Product } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";
import ProductDialog from "@/components/ProductDialog";
import { Car, Check, Plus, Minus, MessageCircle, ZoomIn } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { add, setQty, items } = useCart();
  const [open, setOpen] = useState(false);
  const qty = items.find((i) => i.id === product.id)?.qty ?? 0;
  const inList = qty > 0;
  const askText = `Hola, quisiera cotizar: ${product.name}${product.brand ? ` ${product.brand}` : ""}${product.vehicle ? ` para ${product.vehicle}` : ""}`;

  return (
    <>
      <article className="group relative bg-white border border-[#1B3A6B]/10 rounded-sm overflow-hidden flex flex-col shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-blue-light/30">
        {/* Accento superior que aparece al pasar el mouse */}
        <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-blue-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Ver ficha de ${product.name}`}
          className="relative aspect-[4/3] w-full bg-gradient-to-br from-[#eef2f8] to-[#dfe7f2] overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue-light"
        >
          <img
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
            className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 bg-[#0E2240]/80 backdrop-blur-sm text-white text-[10px] font-display font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
            {product.category}
          </span>
          {inList && (
            <span className="absolute top-3 right-3 bg-brand-blue text-white text-[10px] font-display font-bold uppercase tracking-wider px-2 py-1 rounded-sm inline-flex items-center gap-1 shadow">
              <Check className="w-3 h-3" /> En tu lista · {qty}
            </span>
          )}
          <span className="absolute bottom-3 right-3 bg-white/90 text-[#1B3A6B] text-[10px] font-display font-bold uppercase tracking-wider px-2 py-1 rounded-sm inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3 h-3" /> Ver ficha
          </span>
        </button>

        <div className="p-5 flex-1 flex flex-col">
          {product.brand && (
            <span className="text-brand-blue-light font-display font-bold text-[10px] uppercase tracking-[0.18em]">{product.brand}</span>
          )}
          <h3 className="font-display font-bold text-[15px] text-[#1B3A6B] leading-snug mt-1 mb-3 line-clamp-2 min-h-[2.6em]">
            <button type="button" onClick={() => setOpen(true)} className="text-left hover:text-brand-blue-light transition-colors focus:outline-none">
              {product.name}
            </button>
          </h3>

          {/* Compatibilidad con el vehículo */}
          <div className="rounded-sm bg-[#1B3A6B]/[0.04] border border-[#1B3A6B]/8 px-3 py-2.5 mb-4">
            <p className="flex items-center gap-1.5 text-[#1B3A6B]/45 font-display font-bold text-[9px] uppercase tracking-[0.15em] mb-1">
              <Car className="w-3 h-3" /> Compatible con
            </p>
            {product.vehicle ? (
              <p className="text-[13px] font-semibold text-[#1B3A6B] leading-snug line-clamp-2">{product.vehicle}</p>
            ) : (
              <p className="text-[13px] text-[#1B3A6B]/50 italic">Uso general · consultar compatibilidad</p>
            )}
          </div>

          <div className="mt-auto flex flex-col gap-2">
            {inList ? (
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center border border-[#1B3A6B]/15 rounded-sm">
                  <button type="button" onClick={() => setQty(product.id, qty - 1)} aria-label={`Quitar una unidad de ${product.name}`} className="w-9 h-10 flex items-center justify-center text-[#1B3A6B] hover:bg-[#1B3A6B]/5">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center text-sm font-semibold tabular-nums text-[#1B3A6B]">{qty}</span>
                  <button type="button" onClick={() => add(product.id)} aria-label={`Agregar una unidad de ${product.name}`} className="w-9 h-10 flex items-center justify-center text-[#1B3A6B] hover:bg-[#1B3A6B]/5">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] text-brand-blue font-semibold">en tu lista</span>
              </div>
            ) : (
              <button type="button" onClick={() => add(product.id)} className="btn-brand w-full h-10 rounded-sm font-display text-xs inline-flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> AGREGAR A COTIZACIÓN
              </button>
            )}
            <a
              href={`${COMPANY.whatsapp}?text=${encodeURIComponent(askText)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Consultar ${product.name} por WhatsApp`}
              className="text-center text-[#1B3A6B]/55 hover:text-brand-blue-light font-display text-[11px] uppercase tracking-wider font-bold inline-flex items-center justify-center gap-1.5 py-1 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </article>

      <ProductDialog product={product} open={open} onOpenChange={setOpen} />
    </>
  );
}
