import type { Metadata } from "next";
import { preconnect } from "react-dom";
import { OperationsExplorer } from "@/components/operaciones/operations-explorer";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { media } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Operaciones",
  description:
    "Mapa interactivo de los yacimientos, la refinería y las terminales de Orient Express, con la lista de activos, capacidades y ubicaciones.",
  path: "/operaciones",
});

export default function OperacionesPage() {
  // El mapa pide teselas a OpenStreetMap: se abre la conexión antes de que Leaflet termine de cargar.
  preconnect("https://tile.openstreetmap.org", { crossOrigin: "anonymous" });
  return (
    <>
      <PageHero
        title="Operaciones"
        lede="Tres yacimientos en la cuenca neuquina, una refinería sobre el río Limay, dos terminales y un parque solar, conectados por 720 km de oleoductos."
        image={media.refineriaAerea}
      />
      <Section labelledBy="mapa-titulo">
        <h2 id="mapa-titulo" className="mb-10 text-h2">
          Mapa de activos
        </h2>
        <OperationsExplorer />
        <p className="mt-10 max-w-prose text-[0.9375rem] text-ink-600">
          Las ubicaciones son ilustrativas y corresponden a una empresa ficticia. Los nombres de localidades se usan solo como referencia geográfica.
        </p>
      </Section>
    </>
  );
}
