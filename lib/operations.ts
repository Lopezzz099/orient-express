export type AssetType = "yacimiento" | "refineria" | "terminal" | "energia";

export type Asset = {
  id: string;
  name: string;
  type: AssetType;
  locality: string;
  lat: number;
  lng: number;
  since: number;
  capacity: string;
  summary: string;
};

export const assetTypeLabels: Record<AssetType, { singular: string; plural: string; color: string }> = {
  yacimiento: { singular: "Yacimiento", plural: "Yacimientos", color: "#0e5f63" },
  refineria: { singular: "Refinería", plural: "Refinerías", color: "#8a4b10" },
  terminal: { singular: "Terminal", plural: "Terminales", color: "#2c3e8f" },
  energia: { singular: "Energía solar", plural: "Energía solar", color: "#6b6a00" },
};

/** Ubicaciones inventadas, situadas en localidades reales de la provincia solo como referencia geográfica. */
export const assets: Asset[] = [
  {
    id: "loma-alta",
    name: "Loma Alta",
    type: "yacimiento",
    locality: "Cerca de Añelo, Neuquén",
    lat: -38.3,
    lng: -68.85,
    since: 2011,
    capacity: "21.400 boe/d",
    summary: "Área principal de producción, con 148 pozos y una planta de tratamiento de crudo y gas.",
  },
  {
    id: "bajo-del-toro",
    name: "Bajo del Toro",
    type: "yacimiento",
    locality: "Al noroeste de Añelo, Neuquén",
    lat: -38.1,
    lng: -69.2,
    since: 2016,
    capacity: "15.900 boe/d",
    summary: "Desarrollo de pozos horizontales, con 97 pozos y conexión directa a Loma Alta.",
  },
  {
    id: "meseta-colorada",
    name: "Meseta Colorada",
    type: "yacimiento",
    locality: "Cerca de Rincón de los Sauces, Neuquén",
    lat: -37.45,
    lng: -68.95,
    since: 2008,
    capacity: "9.500 boe/d",
    summary: "Área madura con 67 pozos, recuperación secundaria y planta de gas asociado.",
  },
  {
    id: "refineria-rio-limay",
    name: "Refinería Río Limay",
    type: "refineria",
    locality: "Centenario, Neuquén",
    lat: -38.83,
    lng: -68.12,
    since: 2004,
    capacity: "38.000 bbl/d",
    summary: "Destilación, hidrotratamiento y reformado. Produce naftas, gasoil, GLP y asfaltos.",
  },
  {
    id: "terminal-allen",
    name: "Terminal Allen",
    type: "terminal",
    locality: "Allen, Río Negro",
    lat: -38.97,
    lng: -67.83,
    since: 2012,
    capacity: "110.000 m³",
    summary: "Tanques de almacenaje y estación de bombeo hacia la costa atlántica.",
  },
  {
    id: "terminal-costa-sur",
    name: "Terminal Costa Sur",
    type: "terminal",
    locality: "Cerca de Bahía Blanca, Buenos Aires",
    lat: -38.78,
    lng: -62.28,
    since: 2014,
    capacity: "120.000 m³",
    summary: "Terminal marítima con dos amarraderos para carga de buques tanque.",
  },
  {
    id: "parque-solar-mari-menuco",
    name: "Parque Solar Mari Menuco",
    type: "energia",
    locality: "Cerca de Neuquén Capital",
    lat: -38.62,
    lng: -68.55,
    since: 2026,
    capacity: "40 MW",
    summary: "Parque fotovoltaico que abastece plantas de tratamiento y la refinería.",
  },
];

export type Pipeline = { id: string; name: string; path: [number, number][] };

export const pipelines: Pipeline[] = [
  { id: "p1", name: "Colector Bajo del Toro", path: [[-38.1, -69.2], [-38.2, -69.0], [-38.3, -68.85]] },
  { id: "p2", name: "Colector Meseta Colorada", path: [[-37.45, -68.95], [-37.9, -68.9], [-38.3, -68.85]] },
  { id: "p3", name: "Oleoducto Limay", path: [[-38.3, -68.85], [-38.55, -68.5], [-38.83, -68.12]] },
  { id: "p4", name: "Oleoducto Atlántico", path: [[-38.83, -68.12], [-38.97, -67.83], [-38.9, -66.0], [-38.78, -62.28]] },
];

export const mapCenter: [number, number] = [-38.55, -66.2];
