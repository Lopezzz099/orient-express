import { statSync } from "node:fs";
import { join } from "node:path";

export type InvestorDocument = {
  slug: string;
  title: string;
  category: "Resultados" | "Gobierno corporativo" | "Sustentabilidad" | "Presentaciones";
  date: string;
  description: string;
  file: string;
};

/** Documentos ficticios. Los archivos PDF de public/documentos los genera scripts/generar-documentos.mjs. */
export const investorDocuments: InvestorDocument[] = [
  {
    slug: "resultados-2t-2026",
    title: "Informe de resultados del segundo trimestre de 2026",
    category: "Resultados",
    date: "2026-08-13",
    description: "Producción, ventas, inversiones y estado de resultados del trimestre.",
    file: "resultados-2t-2026.pdf",
  },
  {
    slug: "presentacion-institucional",
    title: "Presentación institucional para inversores",
    category: "Presentaciones",
    date: "2026-08-13",
    description: "Resumen de activos, plan de inversiones y perspectivas para el segundo semestre.",
    file: "presentacion-institucional-2026.pdf",
  },
  {
    slug: "informe-anual-2025",
    title: "Informe anual 2025",
    category: "Resultados",
    date: "2026-03-26",
    description: "Memoria del directorio, reservas, producción y análisis de la gerencia.",
    file: "informe-anual-2025.pdf",
  },
  {
    slug: "estados-financieros-2025",
    title: "Estados financieros consolidados 2025",
    category: "Resultados",
    date: "2026-03-26",
    description: "Estados financieros auditados al 31 de diciembre de 2025, con notas.",
    file: "estados-financieros-2025.pdf",
  },
  {
    slug: "informe-de-sustentabilidad-2025",
    title: "Informe de sustentabilidad 2025",
    category: "Sustentabilidad",
    date: "2026-04-15",
    description: "Indicadores ambientales, de seguridad y sociales, con metas por año.",
    file: "informe-de-sustentabilidad-2025.pdf",
  },
  {
    slug: "codigo-de-conducta",
    title: "Código de conducta",
    category: "Gobierno corporativo",
    date: "2025-11-20",
    description: "Reglas de conducta para empleados, directores y proveedores.",
    file: "codigo-de-conducta.pdf",
  },
];

export type CalendarEvent = {
  date: string;
  title: string;
  detail: string;
};

/** Hoy en el sitio de demostración es una fecha fija: se muestran próximos eventos y últimos realizados. */
export const financialCalendar: CalendarEvent[] = [
  { date: "2026-11-12", title: "Resultados del tercer trimestre de 2026", detail: "Publicación a las 18:00 y conferencia con analistas a las 10:00 del día siguiente." },
  { date: "2027-03-04", title: "Resultados del cuarto trimestre y del año 2026", detail: "Publicación de estados financieros del ejercicio." },
  { date: "2027-04-27", title: "Asamblea ordinaria de accionistas", detail: "Sede de Neuquén Capital. La convocatoria se publica con 30 días de anticipación." },
  { date: "2027-05-13", title: "Resultados del primer trimestre de 2027", detail: "Publicación a las 18:00." },
  { date: "2026-08-13", title: "Resultados del segundo trimestre de 2026", detail: "Publicados." },
  { date: "2026-05-14", title: "Resultados del primer trimestre de 2026", detail: "Publicados." },
];

export function documentSize(file: string): string {
  try {
    const bytes = statSync(join(process.cwd(), "public", "documentos", file)).size;
    return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  } catch {
    return "PDF";
  }
}
