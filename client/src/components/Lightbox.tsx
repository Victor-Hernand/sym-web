// DESIGN: Light Premium — Visor de imagen a pantalla completa con navegación
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export type LightboxItem = { src: string; alt?: string; caption?: string };

type LightboxProps = {
  items: LightboxItem[];
  /** Índice visible dentro de `items`; `null` mantiene el visor cerrado. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

/** Distancia mínima en px para que un arrastre cuente como swipe. */
const SWIPE_THRESHOLD = 50;

export default function Lightbox({ items, index, onIndexChange, onClose }: LightboxProps) {
  const isOpen = index !== null && index >= 0 && index < items.length;
  const current = isOpen ? items[index] : null;

  // El padre pasa funciones inline; las guardamos en refs para que el efecto de
  // teclado dependa solo de si el visor está abierto.
  const latest = useRef({ onClose, onIndexChange, index, count: items.length });
  latest.current = { onClose, onIndexChange, index, count: items.length };

  const go = (delta: number) => {
    const { index: i, count, onIndexChange: change } = latest.current;
    if (i === null || count < 2) return;
    change((i + delta + count) % count);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        latest.current.onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const touchStartX = useRef<number | null>(null);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
  };

  const hasMultiple = items.length > 1;

  // Portal a <body>: el visor es `fixed` y algunos contenedores animados con
  // framer-motion crean un containing block que lo dejaría mal posicionado.
  return createPortal(
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={current.caption ?? current.alt ?? "Imagen ampliada"}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={onClose}
        >
          <button
            type="button"
            aria-label="Cerrar imagen"
            className="absolute top-6 right-6 z-10 text-white/60 hover:text-white transition-colors"
            onClick={onClose}
          >
            <X className="w-8 h-8" />
          </button>

          {hasMultiple && (
            <span className="absolute top-6 left-6 z-10 text-white/50 font-display font-bold text-sm tabular-nums">
              {(index ?? 0) + 1} / {items.length}
            </span>
          )}

          {hasMultiple && (
            <>
              <button
                type="button"
                aria-label="Imagen anterior"
                className="absolute left-2 md:left-6 z-10 p-2 md:p-3 rounded-full bg-white/8 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
              >
                <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" />
              </button>
              <button
                type="button"
                aria-label="Imagen siguiente"
                className="absolute right-2 md:right-6 z-10 p-2 md:p-3 rounded-full bg-white/8 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
              >
                <ChevronRight className="w-7 h-7 md:w-8 md:h-8" />
              </button>
            </>
          )}

          {/* Imagen y pie en columna: así el pie nunca se encima de la imagen,
              sin importar la altura de la ventana. */}
          <div
            className="flex flex-col items-center gap-4 max-w-full max-h-[88vh] px-10 md:px-20"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current.src}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                src={current.src}
                alt={current.alt ?? ""}
                className="max-w-full max-h-[76vh] object-contain rounded-sm cursor-default select-none"
                draggable={false}
              />
            </AnimatePresence>
            {current.caption && (
              <span className="blue-gradient font-display font-bold text-base md:text-lg uppercase tracking-wider text-center">
                {current.caption}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
