export type JobArea =
  | "Operaciones de campo"
  | "Refinación"
  | "Logística"
  | "Ingeniería"
  | "Seguridad y ambiente"
  | "Administración y finanzas"
  | "Tecnología";

export type JobLocation = "Añelo" | "Centenario" | "Neuquén Capital" | "Bahía Blanca";

export type Job = {
  id: string;
  title: string;
  area: JobArea;
  location: JobLocation;
  schedule: string;
  summary: string;
  requirements: string[];
  posted: string;
};

/** Vacantes de ejemplo. No hay procesos de selección reales detrás de este sitio. */
export const jobs: Job[] = [
  {
    id: "ingeniero-de-produccion",
    title: "Ingeniero/a de producción",
    area: "Ingeniería",
    location: "Añelo",
    schedule: "Régimen 14x14",
    summary: "Seguimiento de pozos, optimización de sistemas de extracción y análisis de curvas de declinación.",
    requirements: ["Título de Ingeniería en Petróleo, Química o afín", "3 años en producción de hidrocarburos", "Manejo de herramientas de simulación y bases de datos"],
    posted: "2026-09-29",
  },
  {
    id: "operador-de-planta-de-tratamiento",
    title: "Operador/a de planta de tratamiento",
    area: "Operaciones de campo",
    location: "Añelo",
    schedule: "Turnos rotativos",
    summary: "Operación y control de equipos de separación, deshidratación y bombeo en la planta de Loma Alta.",
    requirements: ["Secundario técnico completo", "Experiencia en plantas de proceso", "Curso básico de seguridad en instalaciones petroleras"],
    posted: "2026-09-24",
  },
  {
    id: "supervisor-de-turno-refineria",
    title: "Supervisor/a de turno de refinería",
    area: "Refinación",
    location: "Centenario",
    schedule: "Turnos rotativos",
    summary: "Coordinación del turno de proceso, gestión de paradas programadas y comunicación con el centro de control.",
    requirements: ["Ingeniería Química, Mecánica o afín", "5 años en refinación o petroquímica", "Experiencia liderando equipos de operación"],
    posted: "2026-09-19",
  },
  {
    id: "analista-de-seguridad-operativa",
    title: "Analista de seguridad operativa",
    area: "Seguridad y ambiente",
    location: "Neuquén Capital",
    schedule: "Lunes a viernes, con visitas a campo",
    summary: "Análisis de incidentes, auditorías de permisos de trabajo y capacitación a contratistas.",
    requirements: ["Licenciatura en Higiene y Seguridad o afín", "2 años en industria de procesos", "Disponibilidad para viajar a yacimientos"],
    posted: "2026-09-15",
  },
  {
    id: "coordinador-de-despachos",
    title: "Coordinador/a de despachos y buques",
    area: "Logística",
    location: "Bahía Blanca",
    schedule: "Lunes a viernes, guardias rotativas",
    summary: "Programación de cargas, documentación aduanera y relación con agentes marítimos en la Terminal Costa Sur.",
    requirements: ["Estudios en Logística, Comercio Exterior o afín", "Experiencia en terminales marítimas", "Inglés intermedio"],
    posted: "2026-09-10",
  },
  {
    id: "analista-de-control-de-gestion",
    title: "Analista de control de gestión",
    area: "Administración y finanzas",
    location: "Neuquén Capital",
    schedule: "Lunes a viernes",
    summary: "Seguimiento presupuestario de proyectos de inversión y elaboración de reportes para la gerencia.",
    requirements: ["Contador/a o Licenciado/a en Administración", "Manejo avanzado de planillas de cálculo", "Experiencia previa en la industria, deseable"],
    posted: "2026-09-04",
  },
  {
    id: "tecnico-de-instrumentos-y-control",
    title: "Técnico/a de instrumentos y control",
    area: "Operaciones de campo",
    location: "Centenario",
    schedule: "Régimen 7x7",
    summary: "Mantenimiento y calibración de instrumentos de medición y válvulas de control en la refinería.",
    requirements: ["Técnico en Electrónica o Automatización", "Conocimiento de lazos de control y PLC", "Matrícula profesional vigente"],
    posted: "2026-08-28",
  },
  {
    id: "especialista-en-datos-de-ductos",
    title: "Especialista en datos de ductos",
    area: "Tecnología",
    location: "Neuquén Capital",
    schedule: "Lunes a viernes, con modalidad híbrida",
    summary: "Integración de datos de inspección y de sensores para priorizar tareas de mantenimiento en la red de oleoductos.",
    requirements: ["Ingeniería, Sistemas o Ciencias de Datos", "Experiencia en SQL y Python", "Conocimientos de integridad de ductos, deseable"],
    posted: "2026-08-20",
  },
];

export const jobAreas: JobArea[] = [...new Set(jobs.map((j) => j.area))].sort() as JobArea[];
export const jobLocations: JobLocation[] = [...new Set(jobs.map((j) => j.location))].sort() as JobLocation[];
