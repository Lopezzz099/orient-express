/** Personas ficticias. Cualquier parecido con personas reales es casual. */
export type Person = {
  name: string;
  role: string;
  bio: string;
};

export const leadership: Person[] = [
  {
    name: "Lucía Benavídez",
    role: "Directora general (CEO)",
    bio: "Ingeniera en Petróleo. Pasó veintidós años en operaciones de campo y planificación antes de asumir la dirección en 2021.",
  },
  {
    name: "Gustavo Ferreyra",
    role: "Director de Finanzas (CFO)",
    bio: "Contador público. Dirigió las áreas de tesorería y relaciones con inversores en dos compañías energéticas regionales.",
  },
  {
    name: "Ana Paula Quiroga",
    role: "Directora de Operaciones",
    bio: "Ingeniera industrial. Lideró la puesta en marcha de las tres áreas productivas y de la planta de Loma Alta.",
  },
  {
    name: "Martín Echegaray",
    role: "Director de Refinación y Logística",
    bio: "Ingeniero químico. Conduce la Refinería Río Limay, la red de oleoductos y las terminales desde 2018.",
  },
  {
    name: "Silvia Haeberle",
    role: "Directora de Sustentabilidad y Seguridad",
    bio: "Licenciada en Higiene y Seguridad y magíster en gestión ambiental. Preside el comité de seguridad operativa.",
  },
  {
    name: "Federico Salinas",
    role: "Director de Personas y Asuntos Legales",
    bio: "Abogado laboralista. Responsable de relaciones con sindicatos, cumplimiento normativo y desarrollo del personal.",
  },
];

export const board: Person[] = [
  { name: "Marcela Ibarra", role: "Presidenta del Directorio", bio: "Directora independiente desde 2019." },
  { name: "Rodolfo Aguirre", role: "Vicepresidente", bio: "Representa a los accionistas fundadores." },
  { name: "Carolina Pastor", role: "Directora independiente", bio: "Preside el Comité de Auditoría." },
  { name: "Julián Mansilla", role: "Director independiente", bio: "Preside el Comité de Sustentabilidad." },
  { name: "Lucía Benavídez", role: "Directora ejecutiva", bio: "Directora general de la compañía." },
];

export const governancePillars = [
  {
    title: "Directorio y comités",
    text: "El directorio tiene cinco miembros, tres de ellos independientes. El Comité de Auditoría, el de Sustentabilidad y el de Riesgos se reúnen al menos cuatro veces por año.",
  },
  {
    title: "Código de conducta",
    text: "Rige para empleados, directores y proveedores. Incluye reglas sobre conflictos de interés, regalos y relación con funcionarios públicos.",
  },
  {
    title: "Línea de denuncias",
    text: "Un canal externo y confidencial recibe consultas y denuncias las 24 horas. Cada caso se registra y se informa al Comité de Auditoría.",
  },
  {
    title: "Gestión de riesgos",
    text: "La matriz de riesgos corporativos se revisa cada año con el directorio. Incluye riesgos operativos, ambientales, regulatorios y financieros.",
  },
];
