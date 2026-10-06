export const site = {
  name: "Orient Express",
  legalName: "Orient Express S.A.",
  tagline: "Energía desde la cuenca neuquina",
  description:
    "Orient Express produce, refina y transporta petróleo y gas desde Neuquén, Argentina. Sitio de demostración de una empresa ficticia.",
  address: {
    street: "Av. del Trabajador 1200, piso 9",
    city: "Neuquén Capital",
    region: "Provincia del Neuquén",
    country: "Argentina",
    postalCode: "Q8300",
  },
  phone: "+54 299 555-0100",
  emails: {
    general: "contacto@orientexpress.example",
    inversores: "inversores@orientexpress.example",
    clientes: "clientes@orientexpress.example",
    proveedores: "proveedores@orientexpress.example",
    prensa: "prensa@orientexpress.example",
    empleo: "talento@orientexpress.example",
  },
  /** Vercel define VERCEL_PROJECT_PRODUCTION_URL; en local se usa localhost. */
  url: process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  demoNotice:
    "Este es un sitio de demostración. Orient Express es una empresa ficticia: sus nombres, personas, cifras, documentos y ubicaciones son inventados y no corresponden a ninguna compañía real.",
} as const;
