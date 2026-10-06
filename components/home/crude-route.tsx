import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { Section, SectionIntro } from "@/components/ui/section";
import { assetTypeLabels, assets, type AssetType } from "@/lib/operations";

/** Los cuatro puntos de la cadena, en el orden en que viaja el crudo. */
const stops = ["loma-alta", "refineria-rio-limay", "terminal-allen", "terminal-costa-sur"]
  .map((id) => assets.find((a) => a.id === id))
  .filter((a): a is NonNullable<typeof a> => a !== undefined);

const stopRole: Record<string, string> = {
  "loma-alta": "El crudo sale del pozo y se trata en planta.",
  "refineria-rio-limay": "Se destila en naftas, gasoil, GLP y asfaltos.",
  "terminal-allen": "Se almacena y se bombea hacia el este.",
  "terminal-costa-sur": "Se carga en buques tanque sobre el Atlántico.",
};

function Glyph({ type, pulse = false }: { type: AssetType; pulse?: boolean }) {
  const color = assetTypeLabels[type].color;
  const radius = type === "yacimiento" ? "50%" : "2px";
  const rotate = type === "terminal" ? "rotate(45deg)" : undefined;
  return (
    <span className="relative flex size-11 items-center justify-center" aria-hidden="true">
      {pulse ? (
        <span className="pulse-ring absolute size-5 border border-signal-500" style={{ borderRadius: radius, transform: rotate }} />
      ) : null}
      <span
        className="block size-5 border-[3px] border-white"
        style={{ background: color, borderRadius: radius, transform: rotate, boxShadow: "0 0 0 1px #0b1620" }}
      />
    </span>
  );
}

export function CrudeRoute() {
  return (
    <Section tone="ink" labelledBy="ruta-titulo">
      <SectionIntro
        id="ruta-titulo"
        title="La ruta del crudo"
        lede="Cuatro puntos de la cadena y 720 km de ducto entre ellos. Cada uno abre su ficha en el mapa de operaciones."
      />

      <ol className="relative mt-16 grid gap-12 laptop:grid-cols-4 laptop:gap-8">
        {stops.map((stop, index) => (
          <li key={stop.id} className="reveal relative pl-16 laptop:pl-0">
            {/* Tramo de ducto hasta el próximo punto: trazos que avanzan en el sentido del flujo */}
            {index < stops.length - 1 ? (
              <span
                aria-hidden="true"
                className="pipe absolute top-11 left-[21px] h-[calc(100%+0.25rem)] w-0.5 laptop:top-[21px] laptop:left-11 laptop:h-0.5 laptop:w-[calc(100%-0.75rem)]"
              />
            ) : null}
            <div className="absolute top-0 left-0 laptop:static">
              <Glyph type={stop.type} pulse={index === 0} />
            </div>
            <div className="laptop:mt-6">
              <h3 className="text-h3">{stop.name}</h3>
              <p className="mt-1 text-[0.9375rem] text-ink-300">
                {assetTypeLabels[stop.type].singular} · {stop.locality}
              </p>
              <p className="mt-3 text-white/90">{stopRole[stop.id]}</p>
              <p className="num mt-3 text-lg font-semibold text-signal-500">{stop.capacity}</p>
              <Link
                href={`/operaciones?activo=${stop.id}`}
                className="group mt-3 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-signal-500 hover:decoration-signal-500"
              >
                Ver en el mapa
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
