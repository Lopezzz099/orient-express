export type Kpi = {
  label: string;
  unit: string;
  current: number;
  previous: number;
  /** Decimales a mostrar. */
  digits?: number;
  /** Si es true, una baja es una mejora (por ejemplo, accidentes). */
  lowerIsBetter?: boolean;
};

/** Cifras ilustrativas de un sitio de demostración. No corresponden a ninguna empresa real. */
export const operatingFigures: Kpi[] = [
  { label: "Producción promedio", unit: "boe/d", current: 46800, previous: 41200 },
  { label: "Crudo procesado en refinería", unit: "bbl/d", current: 33900, previous: 31500 },
  { label: "Empleo directo", unit: "personas", current: 1340, previous: 1280 },
  { label: "Índice de lesiones registrables (TRIF)", unit: "por millón de horas", current: 0.41, previous: 0.52, digits: 2, lowerIsBetter: true },
  { label: "Agua de proceso reutilizada", unit: "% del total", current: 78, previous: 71 },
];

export function variation(kpi: Kpi): { text: string; improved: boolean } {
  const change = ((kpi.current - kpi.previous) / kpi.previous) * 100;
  const rounded = Math.round(change * 10) / 10;
  const sign = rounded > 0 ? "+" : rounded < 0 ? "−" : "";
  const text = `${sign}${Math.abs(rounded).toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;
  const improved = kpi.lowerIsBetter ? change < 0 : change > 0;
  return { text, improved };
}

export function formatKpi(value: number, digits = 0): string {
  return value.toLocaleString("es-AR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export const kpiNote = "Cifras ilustrativas al 31 de diciembre de 2025, de una empresa ficticia.";
