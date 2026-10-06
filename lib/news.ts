import { media, type Media } from "./media";

export type NewsCategory = "Comunicado" | "Operaciones" | "Sustentabilidad" | "Corporativo" | "Logística";

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  category: NewsCategory;
  excerpt: string;
  body: string[];
  image: Media;
};

/** Noticias inventadas. Orden: la más reciente primero. */
export const news: NewsItem[] = [
  {
    slug: "parque-solar-mari-menuco-entra-en-operacion",
    title: "El Parque Solar Mari Menuco entra en operación",
    date: "2026-09-18",
    category: "Sustentabilidad",
    excerpt: "El parque de 40 MW abastece parte de la demanda eléctrica de las plantas de tratamiento y de la refinería.",
    body: [
      "Orient Express puso en servicio el Parque Solar Mari Menuco, con 40 MW de potencia instalada y conexión a la red provincial. La energía generada se destina a plantas de tratamiento de crudo y gas y a la Refinería Río Limay.",
      "Con la entrada en operación, el 22 % de la electricidad que consumen las plantas de la compañía proviene de una fuente renovable. La empresa prevé reemplazar equipos de bombeo a gas por equipos eléctricos en Loma Alta durante los próximos dos años.",
      "El proyecto empleó a 210 personas en el pico de obra, el 60 % de ellas residentes de la provincia, y se construyó sin interrumpir el servicio de los caminos vecinales.",
    ],
    image: media.solar,
  },
  {
    slug: "resultados-del-segundo-trimestre-de-2026",
    title: "Orient Express presenta sus resultados del segundo trimestre de 2026",
    date: "2026-08-13",
    category: "Comunicado",
    excerpt: "La producción promedio superó los 48.000 boe/d y la refinería operó con una utilización del 91 %.",
    body: [
      "La compañía informó una producción promedio de 48.300 boe/d durante el segundo trimestre, un 3,2 % más que en el trimestre anterior. La Refinería Río Limay procesó 34.600 barriles por día, con una utilización del 91 %.",
      "El índice de lesiones registrables (TRIF) fue de 0,38 por millón de horas trabajadas. El directorio mantuvo el plan de inversiones anunciado a comienzos de año.",
      "La presentación completa y el informe de resultados están disponibles en la sección Inversores. Las cifras de este comunicado son ilustrativas y forman parte de un sitio de demostración.",
    ],
    image: media.refineriaTorre,
  },
  {
    slug: "terminal-costa-sur-amplia-su-playa-de-tanques",
    title: "Terminal Costa Sur completa la ampliación de su playa de tanques",
    date: "2026-07-02",
    category: "Logística",
    excerpt: "Dos tanques nuevos suman 30.000 m³ de almacenaje y mejoran la programación de buques.",
    body: [
      "La Terminal Costa Sur terminó la construcción de dos tanques de techo flotante de 15.000 m³ cada uno. La capacidad total de la terminal llega a 120.000 m³.",
      "La ampliación incorpora sistemas de medición automática y un nuevo circuito de recolección de drenajes. La obra se ejecutó con 340.000 horas trabajadas y sin lesiones con tiempo perdido.",
    ],
    image: media.terminalBuques,
  },
  {
    slug: "dos-millones-de-horas-sin-lesiones",
    title: "Dos millones de horas sin lesiones con tiempo perdido en las áreas de producción",
    date: "2026-06-11",
    category: "Operaciones",
    excerpt: "El equipo de Loma Alta y Bajo del Toro alcanzó el hito tras rediseñar los permisos de trabajo.",
    body: [
      "Las áreas Loma Alta y Bajo del Toro acumularon dos millones de horas trabajadas sin lesiones con tiempo perdido. El resultado se atribuye a un nuevo esquema de permisos de trabajo, con revisión conjunta entre la empresa y las contratistas antes de cada tarea de riesgo.",
      "La compañía extenderá el esquema a la refinería y a las terminales durante el segundo semestre.",
    ],
    image: media.plantaGas,
  },
  {
    slug: "nuevo-pad-de-perforacion-en-loma-alta",
    title: "Nuevo pad de perforación en Loma Alta",
    date: "2026-05-20",
    category: "Operaciones",
    excerpt: "El pad reúne seis pozos horizontales y comparte infraestructura con las instalaciones existentes.",
    body: [
      "Orient Express inició la perforación de un nuevo pad con seis pozos horizontales en el área Loma Alta. Las instalaciones usan el mismo camino de acceso y la misma línea de conducción que el pad vecino.",
      "Se estima que los pozos entrarán en producción durante el cuarto trimestre. El proyecto se evaluó con los municipios y las comunidades de la zona antes del inicio de obra.",
    ],
    image: media.yacimiento,
  },
  {
    slug: "convocatoria-a-la-asamblea-ordinaria-2026",
    title: "Convocatoria a la asamblea ordinaria de accionistas",
    date: "2026-04-08",
    category: "Corporativo",
    excerpt: "La asamblea se realizará el 28 de abril en la sede de Neuquén. El orden del día está disponible para consulta.",
    body: [
      "El directorio convoca a los accionistas a la asamblea ordinaria que se realizará el 28 de abril de 2026 en la sede de la compañía, en Neuquén Capital. El orden del día incluye la consideración de la memoria y de los estados financieros del ejercicio 2025.",
      "La documentación de la asamblea se publicó en la sección Inversores. Este comunicado es parte de un sitio de demostración.",
    ],
    image: media.refineriaAerea,
  },
];

export const getNewsBySlug = (slug: string) => news.find((item) => item.slug === slug);
