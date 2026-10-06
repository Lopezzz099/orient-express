import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { Section, SectionIntro } from "@/components/ui/section";
import { media } from "@/lib/media";
import { progressHighlights } from "@/lib/sustainability";

export function SustainabilityBand() {
  return (
    <Section labelledBy="sustentabilidad-titulo">
      <div className="grid items-center gap-12 laptop:grid-cols-[0.9fr_1.1fr] laptop:gap-20">
        <div className="relative aspect-[4/3] overflow-hidden bg-ink-800 laptop:aspect-[4/5]">
          <Image
            src={media.eolico.src}
            alt={media.eolico.alt}
            width={media.eolico.width}
            height={media.eolico.height}
            sizes="(min-width: 66rem) 40vw, 100vw"
            className="size-full object-cover"
          />
        </div>

        <div>
          <SectionIntro
            id="sustentabilidad-titulo"
            title="Metas con plazo y avance publicado"
            lede="Cada compromiso ambiental tiene un año límite y un indicador. Estos son tres de los que más pesan en la operación."
          />

          <ul className="mt-10 space-y-8">
            {progressHighlights.map((item) => (
              <li key={item.label} className="reveal">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <p className="font-semibold text-ink-950">{item.label}</p>
                  <p className="num text-[0.9375rem] text-ink-600">
                    <span className="font-semibold text-petrol-700">{item.progress}</span> de la meta de {item.goal} para {item.year}
                  </p>
                </div>
                {/* La barra se llena con el scroll. El número ya dice lo mismo, por eso es decorativa para lectores de pantalla. */}
                <div aria-hidden="true" className="relative mt-3 h-2 bg-line">
                  <div className="fill-x h-full bg-petrol-700" style={{ width: `${item.fraction * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <ButtonLink href="/sustentabilidad" variant="primary" size="lg">
              Ver todos los compromisos <ArrowRight />
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
