// Armado del mensaje de cotización que se envía por WhatsApp.
export type QuoteLine = { product: { name: string; brand?: string }; qty: number };

export function buildQuoteMessage(lines: QuoteLine[]): string {
  const detail = lines
    .map(({ product, qty }) => `- ${qty} x ${product.name}${product.brand ? ` ${product.brand}` : ""}`)
    .join("\n");
  return `Hola, quisiera cotizar los siguientes repuestos:\n${detail}\n\n¿Me confirman precio mayorista y disponibilidad? Gracias.`;
}

export function buildWhatsAppHref(whatsappBase: string, lines: QuoteLine[]): string {
  return `${whatsappBase}?text=${encodeURIComponent(buildQuoteMessage(lines))}`;
}
