import type { IconName } from "./icon-names";
import { media, type Media } from "./media";

export type BusinessArea = {
  slug: string;
  icon: IconName;
  name: string;
  summary: string;
  detail: string;
  image: Media;
  figures: { value: string; label: string }[];
  points: string[];
};

export const businessAreas: BusinessArea[] = [
  {
    slug: "exploracion-y-produccion",
    icon: "droplets",
    name: "Exploración y producción",
    summary: "Tres áreas operadas en la cuenca neuquina, con perforación de pozos horizontales y producción de petróleo y gas.",
    detail:
      "Operamos las áreas Loma Alta, Bajo del Toro y Meseta Colorada. Cada locación se planifica como un sistema: un pad con varios pozos, una planta de tratamiento cercana y un ducto de salida. Eso reduce caminos, superficie ocupada y tiempos de conexión.",
    image: media.yacimiento,
    figures: [
      { value: "46.800", label: "boe/d de producción promedio en 2025" },
      { value: "312", label: "pozos activos al cierre de 2025" },
    ],
    points: [
      "Perforación horizontal con equipos propios y contratados",
      "Plantas de tratamiento de crudo y de gas en cada área",
      "Monitoreo remoto de pozos con lectura cada 15 minutos",
    ],
  },
  {
    slug: "refinacion",
    icon: "factory",
    name: "Refinación",
    summary: "Refinería Río Limay: naftas, gasoil, GLP y asfaltos para clientes industriales y distribuidores del sur del país.",
    detail:
      "La Refinería Río Limay procesa crudo de nuestras propias áreas y de terceros. Su esquema de conversión permite ajustar la mezcla de productos según la demanda de cada temporada y cumplir las especificaciones de azufre vigentes.",
    image: media.refineriaAerea,
    figures: [
      { value: "38.000", label: "barriles por día de capacidad de destilación" },
      { value: "89 %", label: "de utilización promedio en 2025" },
    ],
    points: [
      "Unidades de destilación, hidrotratamiento y reformado",
      "Laboratorio propio con certificación de ensayos",
      "Despacho por camión, ducto y ferrocarril",
    ],
  },
  {
    slug: "logistica-y-transporte",
    icon: "ship",
    name: "Logística y transporte",
    summary: "Oleoductos, estaciones de bombeo y dos terminales que conectan la cuenca con el mercado interno y la exportación.",
    detail:
      "Una red de 720 km de oleoductos lleva el crudo desde los yacimientos hasta la Terminal Allen y, desde allí, hasta la Terminal Costa Sur, sobre el Atlántico. Cada tramo tiene válvulas de bloqueo, detección de fugas y un centro de control que opera las 24 horas.",
    image: media.terminalBuques,
    figures: [
      { value: "720 km", label: "de oleoductos propios" },
      { value: "230.000 m³", label: "de capacidad de almacenaje" },
    ],
    points: [
      "Centro de control con operación continua",
      "Inspección interna de ductos con herramientas instrumentadas",
      "Programación de buques y despachos por cliente",
    ],
  },
  {
    slug: "energias-de-transicion",
    icon: "sun",
    name: "Energías de transición",
    summary: "Generación solar, electrificación de yacimientos y proyectos piloto para reducir las emisiones de las operaciones.",
    detail:
      "El Parque Solar Mari Menuco abastece parte de la demanda eléctrica de nuestras plantas. En paralelo, reemplazamos motores a gas por equipos eléctricos en los yacimientos y evaluamos el aprovechamiento de gas asociado que hoy se quema.",
    image: media.solar,
    figures: [
      { value: "40 MW", label: "de potencia instalada en energía solar" },
      { value: "22 %", label: "de la electricidad de planta de origen renovable" },
    ],
    points: [
      "Parque solar conectado a la red provincial",
      "Electrificación progresiva de equipos de bombeo",
      "Pruebas de captura y reutilización de gas asociado",
    ],
  },
];
