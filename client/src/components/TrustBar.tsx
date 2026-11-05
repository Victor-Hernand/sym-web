// Franja de confianza bajo el buscador: beneficios de compra mayorista que el sitio ya ofrece.
import { BadgeDollarSign, CreditCard, Handshake, Truck } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Entrega nacional", text: "Cobertura en todo Honduras" },
  { icon: BadgeDollarSign, title: "Precios mayoristas", text: "Condiciones para talleres y tiendas" },
  { icon: Handshake, title: "Asesoría dedicada", text: "Un asesor para tu negocio" },
  { icon: CreditCard, title: "Crédito flexible", text: "Según tu línea de crédito" },
];

export default function TrustBar() {
  return (
    <section aria-label="Beneficios de comprar con Inversiones S&M" className="bg-light-bg pt-12 pb-4">
      <ul className="container grid grid-cols-2 gap-4 md:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3.5 rounded-sm border border-[#1B3A6B]/8 bg-white px-4 py-4 shadow-sm">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-gradient-to-br from-[#1B3A6B] to-[#2D5AA0] text-white shadow-md shadow-brand-blue/20">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-sm font-bold text-[#1B3A6B]">{title}</p>
              <p className="text-xs leading-snug text-[#1B3A6B]/55">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
