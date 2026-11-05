// Ficha de producto: imagen ampliada, vehículos compatibles, referencias y acción de cotizar.
import { useState } from "react";
import { COMPANY, type Product } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Car, MessageCircle, Minus, Plus, ShoppingCart } from "lucide-react";

type ProductDialogProps = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ProductDialog({ product, open, onOpenChange }: ProductDialogProps) {
  const { add, items } = useCart();
  const [qty, setQty] = useState(1);
  if (!product) return null;

  const inList = items.find((i) => i.id === product.id)?.qty ?? 0;
  const askText = `Hola, quisiera cotizar: ${product.name}${product.brand ? ` ${product.brand}` : ""}${product.vehicle ? ` para ${product.vehicle}` : ""}`;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) setQty(1);
        onOpenChange(v);
      }}
    >
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden border-[#1B3A6B]/10 bg-white sm:max-w-3xl">
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="bg-gradient-to-br from-[#e9eef6] to-[#dbe4f0] flex items-center justify-center p-8 min-h-64">
            <img src={product.image} alt={product.imageAlt} className="max-h-80 w-auto object-contain" />
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <DialogHeader className="text-left space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[#1B3A6B]/50 font-display font-bold text-[10px] uppercase tracking-[0.15em]">{product.category}</span>
                {product.brand && (
                  <span className="bg-brand-blue/10 text-brand-blue font-display font-bold text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 rounded-sm">
                    {product.brand}
                  </span>
                )}
              </div>
              <DialogTitle className="font-display font-black text-xl text-[#1B3A6B] leading-snug">{product.name}</DialogTitle>
              <DialogDescription className="text-[#1B3A6B]/55 text-sm">{product.description}</DialogDescription>
            </DialogHeader>

            <div className="mt-5 rounded-sm border border-[#1B3A6B]/10 bg-[#1B3A6B]/[0.03] p-4">
              <p className="flex items-center gap-2 text-[#1B3A6B]/50 font-display font-bold text-[10px] uppercase tracking-[0.15em] mb-2">
                <Car className="w-3.5 h-3.5" /> Compatible con
              </p>
              {product.vehicle ? (
                <p className="font-semibold text-[#1B3A6B] text-sm leading-relaxed">{product.vehicle}</p>
              ) : (
                <p className="text-[#1B3A6B]/55 text-sm">
                  Uso general. Confirma la compatibilidad con tu vehículo por WhatsApp antes de comprar.
                </p>
              )}
            </div>

            {product.refs.length > 0 && (
              <div className="mt-4">
                <p className="text-[#1B3A6B]/50 font-display font-bold text-[10px] uppercase tracking-[0.15em] mb-2">Referencias</p>
                <ul className="flex flex-wrap gap-1.5">
                  {product.refs.map((r) => (
                    <li key={r} className="font-mono text-[11px] text-[#1B3A6B]/75 bg-white border border-[#1B3A6B]/12 px-2 py-1 rounded-sm">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto pt-6 flex flex-col gap-3">
              {inList > 0 && (
                <p className="text-xs text-brand-blue font-semibold">Ya tienes {inList} en tu lista de cotización.</p>
              )}
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center border border-[#1B3A6B]/15 rounded-sm">
                  <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Restar cantidad" className="w-9 h-10 flex items-center justify-center text-[#1B3A6B] hover:bg-[#1B3A6B]/5">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-semibold tabular-nums text-[#1B3A6B]">{qty}</span>
                  <button type="button" onClick={() => setQty((q) => Math.min(999, q + 1))} aria-label="Sumar cantidad" className="w-9 h-10 flex items-center justify-center text-[#1B3A6B] hover:bg-[#1B3A6B]/5">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    add(product.id, qty);
                    onOpenChange(false);
                    setQty(1);
                  }}
                  className="btn-brand flex-1 h-10 px-3 rounded-sm font-display text-xs whitespace-nowrap inline-flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" /> AGREGAR A COTIZACIÓN
                </button>
              </div>
              <a
                href={`${COMPANY.whatsapp}?text=${encodeURIComponent(askText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-[#1B3A6B]/60 hover:text-brand-blue-light font-display font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
