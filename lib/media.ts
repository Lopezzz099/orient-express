/**
 * Medios del sitio. Todos provienen de Pexels (ver public/media/CREDITS.md).
 * Los textos alternativos describen lo que se ve y no afirman la ubicación real de la foto.
 */
export type Media = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const media = {
  yacimiento: {
    src: "/media/yacimiento.jpg",
    alt: "Un balancín de bombeo pintado de rojo en un campo abierto, con vegetación baja y un cielo despejado.",
    width: 1920,
    height: 1280,
  },
  refineriaTorre: {
    src: "/media/refineria-torre.jpg",
    alt: "Torre de proceso de una refinería con cañerías y estructuras metálicas contra un cielo con nubes.",
    width: 1920,
    height: 1280,
  },
  refineriaAerea: {
    src: "/media/refineria-aerea.jpg",
    alt: "Vista aérea de una refinería al atardecer: columnas de destilación, cañerías y vapor sobre un fondo de campos.",
    width: 1920,
    height: 1288,
  },
  plantaGas: {
    src: "/media/planta-gas.jpg",
    alt: "Columna de separación con pasarelas amarillas y cañerías aisladas de acero en una planta de gas.",
    width: 1440,
    height: 1280,
  },
  terminalBuques: {
    src: "/media/terminal-buques.jpg",
    alt: "Buques tanque anclados frente a una costa con una fila de tanques de almacenamiento blancos.",
    width: 1920,
    height: 1280,
  },
  eolico: {
    src: "/media/eolico.jpg",
    alt: "Colinas secas con aerogeneradores en el horizonte y un camino que serpentea bajo un cielo azul.",
    width: 1400,
    height: 2100,
  },
  solar: {
    src: "/media/solar.jpg",
    alt: "Vista aérea de paneles solares instalados en un techo.",
    width: 1600,
    height: 1067,
  },
  heroPoster: {
    src: "/media/hero-poster.jpg",
    alt: "Silueta de un balancín de bombeo al atardecer, con matorral bajo, postes de energía y nubes.",
    width: 1280,
    height: 720,
  },
} satisfies Record<string, Media>;

export const heroVideo = {
  src: "/media/hero.mp4",
  poster: "/media/hero-poster.jpg",
} as const;
