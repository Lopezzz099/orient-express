export type TimelineEvent = { year: number; title: string; text: string };

export const timeline: TimelineEvent[] = [
  {
    year: 1994,
    title: "Se constituye la compañía",
    text: "Un grupo de ingenieros y productores funda Orient Express S.A. en Neuquén, con una concesión de explotación y doce empleados.",
  },
  {
    year: 2004,
    title: "Arranca la Refinería Río Limay",
    text: "La compañía incorpora la refinación a su negocio con una unidad de destilación de 12.000 barriles por día.",
  },
  {
    year: 2008,
    title: "Meseta Colorada",
    text: "Entra en producción el primer yacimiento propio de escala, cerca de Rincón de los Sauces.",
  },
  {
    year: 2012,
    title: "Terminal Allen y primer oleoducto",
    text: "Se completa el primer tramo de ducto hacia el este y se habilita la Terminal Allen para almacenar y bombear.",
  },
  {
    year: 2014,
    title: "Salida al Atlántico",
    text: "La Terminal Costa Sur permite cargar buques tanque y abrir el mercado de exportación.",
  },
  {
    year: 2016,
    title: "Pozos horizontales",
    text: "Bajo del Toro es el primer desarrollo diseñado para perforación horizontal y producción por pads.",
  },
  {
    year: 2021,
    title: "Nueva conducción",
    text: "Lucía Benavídez asume como directora general y el directorio incorpora a tres miembros independientes.",
  },
  {
    year: 2026,
    title: "Primera energía solar",
    text: "Entra en operación el Parque Solar Mari Menuco, de 40 MW, para abastecer plantas y refinería.",
  },
];

export const mission =
  "Producir, procesar y transportar energía con seguridad, con respeto por el entorno y con resultados que puedan verificarse.";

export const values = [
  { title: "Seguridad primero", text: "Ninguna meta de producción justifica una tarea que no se pueda hacer con seguridad." },
  { title: "Rigor técnico", text: "Las decisiones se apoyan en datos, en procedimientos escritos y en revisiones independientes." },
  { title: "Palabra cumplida", text: "Informamos lo que hacemos, también cuando el resultado no es el esperado." },
  { title: "Arraigo", text: "Operamos en la provincia hace treinta años y contratamos primero en las localidades donde trabajamos." },
];
