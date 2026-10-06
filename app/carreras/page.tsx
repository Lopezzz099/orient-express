import type { Metadata } from "next";
import { CareersBoard } from "@/components/carreras/careers-board";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { media } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Carreras",
  description: "Vacantes de ejemplo en operaciones, refinación, logística, ingeniería y administración de Orient Express.",
  path: "/carreras",
});

export default function CarrerasPage() {
  return (
    <>
      <PageHero
        title="Carreras"
        lede="Buscamos personas para operar plantas, mantener ductos, programar buques y administrar la compañía. Las vacantes de esta página son de ejemplo."
        image={media.plantaGas}
      />
      <Section labelledBy="vacantes-titulo">
        <h2 id="vacantes-titulo" className="mb-10 text-h2">
          Vacantes abiertas
        </h2>
        <CareersBoard />
      </Section>
    </>
  );
}
