import { describe, expect, it } from "vitest";
import { buildQuoteMessage, buildWhatsAppHref } from "@/lib/quote";

describe("buildQuoteMessage", () => {
  it("lista cada línea con cantidad, nombre y marca", () => {
    const msg = buildQuoteMessage([
      { product: { name: "Disco de freno", brand: "R-TECH" }, qty: 2 },
      { product: { name: "Bufas" }, qty: 1 },
    ]);
    expect(msg).toContain("- 2 x Disco de freno R-TECH\n- 1 x Bufas\n");
    expect(msg.startsWith("Hola, quisiera cotizar los siguientes repuestos:")).toBe(true);
  });

  it("no agrega marca cuando el producto no la tiene", () => {
    expect(buildQuoteMessage([{ product: { name: "Zapatas" }, qty: 3 }])).toContain("- 3 x Zapatas\n");
  });
});

describe("buildWhatsAppHref", () => {
  it("codifica el mensaje completo en el parámetro text", () => {
    const href = buildWhatsAppHref("https://wa.me/50492109620", [{ product: { name: "Sensor", brand: "WAGNER" }, qty: 1 }]);
    expect(href.startsWith("https://wa.me/50492109620?text=")).toBe(true);
    expect(decodeURIComponent(href)).toContain("- 1 x Sensor WAGNER");
  });
});
