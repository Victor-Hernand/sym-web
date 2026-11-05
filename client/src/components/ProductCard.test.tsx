// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";
import { CartProvider } from "@/contexts/CartContext";
import { PRODUCTS } from "@/lib/data";

const withVehicle = PRODUCTS.find((p) => p.vehicle)!;
const generic = PRODUCTS.find((p) => !p.vehicle)!;

function renderCard(product = withVehicle) {
  return render(
    <CartProvider>
      <ProductCard product={product} />
    </CartProvider>,
  );
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("ProductCard", () => {
  it("muestra el vehículo compatible del repuesto", () => {
    renderCard();
    expect(screen.getByText(withVehicle.vehicle!)).toBeTruthy();
  });

  it("indica uso general cuando el repuesto no tiene vehículo", () => {
    renderCard(generic);
    expect(screen.getByText(/Uso general/)).toBeTruthy();
  });

  it("al agregar, cambia a la lista con cantidad 1", () => {
    renderCard();
    fireEvent.click(screen.getByRole("button", { name: /agregar a cotización/i }));
    expect(screen.getByText(/En tu lista · 1/)).toBeTruthy();
    expect(screen.getByRole("button", { name: `Agregar una unidad de ${withVehicle.name}` })).toBeTruthy();
  });

  it("guarda el producto agregado en localStorage", () => {
    renderCard();
    fireEvent.click(screen.getByRole("button", { name: /agregar a cotización/i }));
    const stored = JSON.parse(window.localStorage.getItem("sym-lista-cotizacion") ?? "[]");
    expect(stored).toEqual([{ id: withVehicle.id, qty: 1 }]);
  });
});
