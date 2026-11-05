// Lista de cotización (carrito) — guarda los repuestos que el cliente quiere cotizar.
// Se persiste en localStorage para que sobreviva a recargas y cambios de página.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "@/lib/data";

export type QuoteItem = { id: string; qty: number };

type CartContextValue = {
  items: QuoteItem[];
  /** Cantidad total de unidades (no de líneas) para el contador del navbar. */
  count: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
};

const STORAGE_KEY = "sym-lista-cotizacion";
const CartContext = createContext<CartContextValue | null>(null);

const MAX_QTY = 999;
const validIds = new Set(PRODUCTS.map((p) => p.id));

function readStorage(): QuoteItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Descarta productos que ya no existen en el catálogo o cantidades inválidas.
    return parsed
      .filter((i): i is QuoteItem => typeof i?.id === "string" && validIds.has(i.id) && Number.isInteger(i.qty) && i.qty > 0)
      .map((i) => ({ id: i.id, qty: Math.min(i.qty, MAX_QTY) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>(readStorage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Almacenamiento lleno o bloqueado: la lista sigue funcionando en memoria.
    }
  }, [items]);

  const add = useCallback((id: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: Math.min(i.qty + qty, MAX_QTY) } : i));
      }
      return [...prev, { id, qty: Math.min(qty, MAX_QTY) }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, MAX_QTY) } : i));
    });
  }, []);

  const remove = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((sum, i) => sum + i.qty, 0),
      add,
      setQty,
      remove,
      clear,
      has: (id) => items.some((i) => i.id === id),
    }),
    [items, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}

/** Resuelve los productos de la lista con su información del catálogo. */
export function useQuoteLines() {
  const { items } = useCart();
  return useMemo(
    () =>
      items
        .map((i) => {
          const product: Product | undefined = PRODUCTS.find((p) => p.id === i.id);
          return product ? { product, qty: i.qty } : null;
        })
        .filter((l): l is { product: Product; qty: number } => l !== null),
    [items],
  );
}
