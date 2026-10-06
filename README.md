# Orient Express

Sitio institucional de **Orient Express**, una empresa petrolera **ficticia** con sede en Neuquén, Argentina. Es un sitio de demostración: los nombres, personas, cifras, documentos y ubicaciones son inventados.

Hecho con Next.js 16 (App Router), React 19, TypeScript y Tailwind CSS 4. Pensado para desplegarse en Vercel, en la raíz del dominio.

## Cómo correrlo

Requiere Node 20 o superior.

```bash
npm install
npm run dev
```

El sitio queda en http://localhost:3000.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción (debe pasar sin errores antes de cada push) |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | ESLint |
| `node scripts/generar-documentos.mjs` | Regenera los PDF ficticios de `public/documentos` |

## Rutas

| Ruta | Contenido |
|---|---|
| `/` | Hero a pantalla completa con video, áreas de negocio, cifras de operación, noticias y contacto por público |
| `/que-hacemos` | Exploración y producción, refinación, logística y transporte, energías de transición |
| `/quienes-somos` | Misión, línea de tiempo, liderazgo y gobierno corporativo |
| `/sustentabilidad` | Compromisos ambientales, seguridad operativa y comunidades |
| `/operaciones` | Mapa Leaflet + OpenStreetMap con lista que controla el mapa |
| `/inversores` | Calendario de resultados y documentos descargables (PDF ficticios) |
| `/carreras` | Vacantes con filtros y formulario de postulación |
| `/prensa`, `/prensa/[slug]` | Listado de noticias y nota individual |
| `/contacto` | Formulario y datos de contacto |

Los filtros y selecciones de `/operaciones` (`?activo=…&tipos=…`) y `/carreras` (`?area=…&lugar=…`) viven en la URL, así que se pueden compartir.

## Estructura

```
app/                 Rutas (App Router), layout, sitemap, robots, ícono e imagen Open Graph
  globals.css        Tokens de diseño en @theme (color OKLCH, tipografía, tamaños fluidos, puntos de corte)
components/
  layout/            Header fijo, menú móvil lateral, pie de página, logo
  ui/                Botones, secciones, cabecera de página, índice de sección, iconos
  home/              Bloques de la portada (el hero es un componente de cliente)
  forms/             Formulario accesible con validación (cliente)
  operaciones/       Explorador y mapa Leaflet (cliente, Leaflet con import() dinámico)
  carreras/          Tablero de vacantes con filtros (cliente)
lib/                 Datos tipados (áreas, operaciones, noticias, vacantes, personas, inversores…),
                     clases de interfaz repetidas (ui.ts), metadatos, formato y estado en la URL
public/media/        Fotos y video (ver CREDITS.md)
public/documentos/   PDF ficticios de la sección Inversores
scripts/             Generador de PDF
PRODUCT.md           Contexto de producto y diseño (skill impeccable)
```

Los componentes son de servidor por defecto. Llevan `'use client'` solo el menú móvil, el hero (video), los filtros, el mapa y los formularios.

## Notas de diseño

- **Identidad propia**: verde petróleo como color de marca y ámbar de señalización como acento, sobre superficies neutras. Los colores están en OKLCH y se verificó el contraste: todo el texto cumple AA (mínimo 5,8:1) y los bordes de campos superan 3:1.
- **Tipografía**: Archivo (con eje de ancho variable) para títulos e interfaz, y Source Serif 4 para textos de lectura. Se cargan con `next/font`.
- **Movimiento**: en CSS puro, definido al final de `app/globals.css`. Las entradas al cargar animan solo `transform`; las de scroll (`.reveal`, `.reveal-mask`, `.fill-x`, `.fill-y`, `.hero-media`, `.scroll-progress`) usan `animation-timeline` y dependen de la posición, no del tiempo. Con `prefers-reduced-motion: reduce`, o en navegadores sin scroll-driven animations (hoy Firefox y Safari anteriores), la página se ve completa y quieta. El contador de cifras (`components/ui/count-up.tsx`) siempre entrega el valor final desde el servidor.
- **Botones y campos** están en `lib/ui.ts`. La clase base no define fondo ni color de borde: cada variante trae el suyo.
- **Menú móvil**: panel lateral que entra por la derecha, con fondo oscuro, cierre con Escape, con clic afuera y al cambiar de ruta. El enlace de la página actual se marca también en páginas interiores (`/prensa/…` marca Prensa).
- **Video del hero**: `autoPlay muted playsInline loop` con la foto como respaldo. `muted` se asigna como propiedad antes de `play()`. No se carga con `prefers-reduced-motion` ni con ahorro de datos, y tiene botón de pausa.
- **Mapa**: si Leaflet o las teselas no cargan, aparece un aviso y la lista sigue siendo completa (ficha, capacidad, coordenadas).
- **Formularios**: validación con mensajes que explican cómo corregir, resumen de errores con foco, `aria-describedby` y `aria-invalid`. **No hay backend**: el envío se simula y el sitio lo aclara.

## Variables de entorno

Ninguna es obligatoria; el sitio compila y funciona sin definir nada. Están listadas en `.env.example`:

| Variable | Para qué sirve |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública para Open Graph y sitemap. En Vercel se usa `VERCEL_PROJECT_PRODUCTION_URL` si no se define |
| `NEXT_PUBLIC_MAP_TILE_URL` | Servidor de teselas del mapa. Por defecto, OpenStreetMap |

## Despliegue en Vercel

1. Importar el repositorio en Vercel (preset Next.js, sin cambios).
2. No hace falta configurar variables de entorno.
3. No se usa `output: 'export'` ni `basePath`: el sitio funciona en la raíz del dominio.

No hay workflows de GitHub Actions ni GitHub Pages.

## Créditos

Fotografías y video de [Pexels](https://www.pexels.com) (licencia Pexels). El detalle por archivo está en `public/media/CREDITS.md`. Mapa base © colaboradores de [OpenStreetMap](https://www.openstreetmap.org/copyright).
