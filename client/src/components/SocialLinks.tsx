// Iconos de redes sociales: botón circular blanco con sombra, etiqueta al pasar el mouse y color de marca al hover.
import { COMPANY } from "@/lib/data";
import { Facebook, Instagram } from "lucide-react";
import TikTokIcon from "@/components/icons/TikTokIcon";

const NETWORKS = [
  { name: "Facebook", href: COMPANY.facebook, Icon: Facebook, hoverBg: "hover:bg-[#1877F2]" },
  { name: "Instagram", href: COMPANY.instagram, Icon: Instagram, hoverBg: "hover:bg-gradient-to-br hover:from-[#FEDA75] hover:via-[#E4405F] hover:to-[#833AB4]" },
  { name: "TikTok", href: COMPANY.tiktok, Icon: TikTokIcon, hoverBg: "hover:bg-black" },
] as const;

export default function SocialLinks() {
  return (
    <ul className="flex items-center justify-center gap-4 pt-10 pb-2">
      {NETWORKS.map(({ name, href, Icon, hoverBg }) => (
        <li key={name} className="relative group">
          <span
            role="tooltip"
            className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-[#0E2240] px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-white opacity-0 shadow-lg transition-[transform,opacity,box-shadow,background-color,border-color,color] duration-200 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:-translate-y-0.5"
          >
            {name}
            <span className="absolute left-1/2 -bottom-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#0E2240]" />
          </span>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} de Inversiones S&M`}
            className={`flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1B3A6B] shadow-lg shadow-[#1B3A6B]/10 transition-[transform,opacity,box-shadow,background-color,border-color,color] duration-300 ease-out hover:-translate-y-1 hover:text-white hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-light focus-visible:ring-offset-2 ${hoverBg}`}
          >
            <Icon className="h-5 w-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
