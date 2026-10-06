const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "America/Argentina/Buenos_Aires",
});

const shortDateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "America/Argentina/Buenos_Aires",
});

/** Fechas ISO (YYYY-MM-DD) tratadas como mediodía local para evitar corrimientos por huso horario. */
function parse(iso: string): Date {
  return new Date(`${iso}T12:00:00-03:00`);
}

export const formatDate = (iso: string) => dateFormatter.format(parse(iso));
export const formatShortDate = (iso: string) => shortDateFormatter.format(parse(iso));
export const formatNumber = (n: number) => new Intl.NumberFormat("es-AR").format(n);
