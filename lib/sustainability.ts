import { media, type Media } from "./media";

export type Commitment = {
  title: string;
  text: string;
  target: string;
  status: string;
};

export type SustainabilityPillar = {
  id: string;
  title: string;
  intro: string;
  image: Media;
  commitments: Commitment[];
};

/** Metas y avances ficticios. */
export const pillars: SustainabilityPillar[] = [
  {
    id: "ambiente",
    title: "Compromisos ambientales",
    intro:
      "Medimos emisiones, agua y residuos en cada instalación y publicamos los resultados cada año. Las metas se revisan con el Comité de Sustentabilidad del directorio.",
    image: media.eolico,
    commitments: [
      {
        title: "Gas venteado y quemado",
        text: "Instalamos compresores para recuperar el gas asociado en las plantas de Loma Alta y Bajo del Toro.",
        target: "Reducir 60 % para 2030 respecto de 2022",
        status: "Avance 2025: 31 %",
      },
      {
        title: "Agua de proceso",
        text: "El agua que vuelve de los pozos se trata y se reutiliza en nuevas operaciones de perforación.",
        target: "Reutilizar el 90 % del agua de proceso para 2028",
        status: "Avance 2025: 78 %",
      },
      {
        title: "Electricidad renovable",
        text: "El Parque Solar Mari Menuco y la electrificación de equipos reducen el consumo de gas propio.",
        target: "40 % de electricidad renovable para 2030",
        status: "Avance 2026: 22 %",
      },
    ],
  },
  {
    id: "seguridad",
    title: "Seguridad operativa",
    intro:
      "Un incidente en una planta o en un ducto puede lastimar a personas y al ambiente. Por eso la seguridad tiene un comité propio, auditorías independientes y autoridad para detener cualquier tarea.",
    image: media.plantaGas,
    commitments: [
      {
        title: "Permisos de trabajo",
        text: "Cada tarea de riesgo se revisa en conjunto entre la empresa y la contratista antes de empezar.",
        target: "100 % de las tareas críticas con permiso verificado",
        status: "Cumplimiento 2025: 99,4 %",
      },
      {
        title: "Integridad de ductos",
        text: "Inspecciones internas con herramientas instrumentadas y detección de fugas en tiempo real.",
        target: "Inspeccionar el 100 % de la red cada 5 años",
        status: "Avance 2025: 64 %",
      },
      {
        title: "Lesiones registrables",
        text: "Se investigan todos los incidentes, incluso los que no causan lesiones, y se comparten las lecciones aprendidas.",
        target: "TRIF por debajo de 0,35 en 2027",
        status: "TRIF 2025: 0,41",
      },
    ],
  },
  {
    id: "comunidades",
    title: "Comunidades",
    intro:
      "Trabajamos en territorios donde viven personas, comunidades mapuche y productores. Consultamos antes de iniciar obras, informamos con regularidad y abrimos un canal de reclamos con respuesta por escrito.",
    image: media.yacimiento,
    commitments: [
      {
        title: "Empleo local",
        text: "Las búsquedas de campo se publican primero en las localidades vecinas a cada instalación.",
        target: "70 % de la dotación de campo con residencia local",
        status: "Avance 2025: 66 %",
      },
      {
        title: "Consulta previa",
        text: "Las obras nuevas se presentan a municipios y a comunidades de la zona antes del inicio.",
        target: "Consulta previa en el 100 % de los proyectos nuevos",
        status: "Cumplimiento 2025: 100 %",
      },
      {
        title: "Proveedores de la región",
        text: "Un programa de desarrollo capacita a pymes locales en seguridad y calidad para que puedan contratar con la compañía.",
        target: "150 pymes de la provincia calificadas para 2028",
        status: "Avance 2025: 112",
      },
    ],
  },
];
