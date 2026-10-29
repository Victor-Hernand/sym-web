// Navegación compartida: rutas de página (/nosotros) o secciones de la home (#productos)
export function goToNavItem(href: string, navigate: (to: string) => void, currentPath: string) {
  if (href.startsWith("/")) {
    navigate(href);
    window.scrollTo({ top: 0 });
    return;
  }
  // Desde otra página, volver a la home y dejar que el navegador vaya al ancla
  if (currentPath !== "/") {
    window.location.assign(`/${href}`);
    return;
  }
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}
