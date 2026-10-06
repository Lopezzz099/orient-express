export type NavItem = { href: string; label: string; description: string };

/** Ordenados de más a menos importante para los públicos del sitio. */
export const primaryNav: NavItem[] = [
  { href: "/que-hacemos", label: "Qué hacemos", description: "Áreas de negocio" },
  { href: "/operaciones", label: "Operaciones", description: "Mapa de activos" },
  { href: "/inversores", label: "Inversores", description: "Resultados y documentos" },
  { href: "/sustentabilidad", label: "Sustentabilidad", description: "Ambiente, seguridad y comunidades" },
  { href: "/quienes-somos", label: "Quiénes somos", description: "Historia y gobierno" },
  { href: "/carreras", label: "Carreras", description: "Vacantes abiertas" },
  { href: "/prensa", label: "Prensa", description: "Noticias y comunicados" },
];

export const contactNav: NavItem = {
  href: "/contacto",
  label: "Contacto",
  description: "Escribinos",
};

export const homeNav: NavItem = { href: "/", label: "Inicio", description: "Página principal" };

export function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
