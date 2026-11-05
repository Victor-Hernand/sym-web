// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { PRODUCTS } from "@/lib/data";

const [a, b] = PRODUCTS;
const KEY = "sym-lista-cotizacion";

// Expone el carrito para leerlo y modificarlo desde la prueba.
let cart: ReturnType<typeof useCart>;
function Probe() {
  cart = useCart();
  return null;
}
function mount() {
  return render(
    <CartProvider>
      <Probe />
    </CartProvider>,
  );
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("CartProvider", () => {
  it("suma unidades del mismo producto en lugar de duplicar la línea", () => {
    mount();
    act(() => cart.add(a.id));
    act(() => cart.add(a.id, 2));
    expect(cart.items).toEqual([{ id: a.id, qty: 3 }]);
    expect(cart.count).toBe(3);
  });

  it("cuenta unidades de todos los productos", () => {
    mount();
    act(() => cart.add(a.id, 2));
    act(() => cart.add(b.id, 5));
    expect(cart.count).toBe(7);
  });

  it("quitar la cantidad hasta cero elimina la línea", () => {
    mount();
    act(() => cart.add(a.id, 2));
    act(() => cart.setQty(a.id, 0));
    expect(cart.items).toEqual([]);
    expect(cart.has(a.id)).toBe(false);
  });

  it("descarta del almacenamiento los productos que ya no existen", () => {
    window.localStorage.setItem(KEY, JSON.stringify([{ id: "no-existe", qty: 1 }, { id: a.id, qty: 2 }]));
    mount();
    expect(cart.items).toEqual([{ id: a.id, qty: 2 }]);
  });

  it("ignora un almacenamiento corrupto sin fallar", () => {
    window.localStorage.setItem(KEY, "{no es json");
    mount();
    expect(cart.items).toEqual([]);
  });
});
