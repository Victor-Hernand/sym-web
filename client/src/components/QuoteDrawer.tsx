// Panel lateral con la lista de cotización: ajustar cantidades y enviarla por WhatsApp.
import { COMPANY } from "@/lib/data";
import { useCart, useQuoteLines } from "@/contexts/CartContext";
import { buildWhatsAppHref } from "@/lib/quote";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Minus, Plus, Trash2, MessageCircle, ShoppingCart } from "lucide-react";

type QuoteDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function QuoteDrawer({ open, onOpenChange }: QuoteDrawerProps) {
  const { setQty, remove, clear, count } = useCart();
  const lines = useQuoteLines();
  const whatsappHref = buildWhatsAppHref(COMPANY.whatsapp, lines);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col bg-white p-0 gap-0">
        <SheetHeader className="px-6 py-5 border-b border-[#1B3A6B]/10 text-left">
          <SheetTitle className="font-display font-black uppercase text-[#1B3A6B] flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" /> Lista de cotización
          </SheetTitle>
          <SheetDescription className="text-[#1B3A6B]/55 text-sm">
            {count === 0 ? "Aún no has agregado repuestos." : `${count} ${count === 1 ? "unidad" : "unidades"} en ${lines.length} ${lines.length === 1 ? "producto" : "productos"}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-12 h-12 mx-auto text-[#1B3A6B]/20 mb-4" />
              <p className="text-[#1B3A6B]/55 text-sm mb-6">Agrega repuestos desde el catálogo para pedir tu cotización mayorista.</p>
              <a href="/catalogo" onClick={() => onOpenChange(false)} className="btn-brand px-6 py-3 rounded-sm font-display text-sm inline-block">
                VER CATÁLOGO
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-[#1B3A6B]/10">
              {lines.map(({ product, qty }) => (
                <li key={product.id} className="py-4 flex gap-4">
                  <div className="w-20 h-20 shrink-0 rounded-sm bg-[#1B3A6B]/5 border border-[#1B3A6B]/8 overflow-hidden flex items-center justify-center">
                    <img src={product.image} alt="" className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {product.brand && (
                      <span className="text-brand-blue-light font-display font-bold text-[10px] uppercase tracking-[0.15em]">{product.brand}</span>
                    )}
                    <p className="font-display font-bold text-sm text-[#1B3A6B] leading-snug">{product.name}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center border border-[#1B3A6B]/15 rounded-sm">
                        <button
                          type="button"
                          onClick={() => setQty(product.id, qty - 1)}
                          aria-label={`Quitar una unidad de ${product.name}`}
                          className="w-8 h-8 flex items-center justify-center text-[#1B3A6B] hover:bg-[#1B3A6B]/5"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-semibold tabular-nums text-[#1B3A6B]">{qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(product.id, qty + 1)}
                          aria-label={`Agregar una unidad de ${product.name}`}
                          className="w-8 h-8 flex items-center justify-center text-[#1B3A6B] hover:bg-[#1B3A6B]/5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        className="text-[#1B3A6B]/45 hover:text-sym-red text-xs font-display font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <SheetFooter className="px-6 py-5 border-t border-[#1B3A6B]/10 bg-light-bg flex-col gap-3 sm:flex-col">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand px-6 py-3.5 rounded-sm font-display text-sm inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> ENVIAR COTIZACIÓN POR WHATSAPP
            </a>
            <button
              type="button"
              onClick={clear}
              className="text-[#1B3A6B]/50 hover:text-sym-red text-xs font-display font-bold uppercase tracking-wider transition-colors"
            >
              Vaciar lista
            </button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
