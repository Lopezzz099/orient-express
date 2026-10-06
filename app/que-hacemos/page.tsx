import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { CountUp } from "@/components/ui/count-up";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SectionNav } from "@/components/ui/section-nav";
import { businessAreas } from "@/lib/areas";
import { media } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Qué hacemos",
  description:
    "Exploración y producción, refinación, logística y transporte, y energías de transición: las cuatro áreas de Orient Express.",
  path: "/que-hacemos",
});

export default function QueHacemosPage() {
  return (
    <>
      <PageHero
        title="Qué hacemos"
        lede="Cuatro áreas que cubren el recorrido completo del hidrocarburo, desde el pozo hasta el cliente, y una línea nueva de generación eléctrica."
        image={media.yacimiento}
      >
        <ButtonLink href="/operaciones" variant="accent" size="lg">
          Ver el mapa de operaciones <ArrowRight />
        </ButtonLink>
      </PageHero>

      <SectionNav items={businessAreas.map((a) => ({ id: a.slug, label: a.name }))} />

      {businessAreas.map((area, index) => {
        const imageFirst = index % 2 === 1;
        return (
          <Section key={area.slug} id={area.slug} labelledBy={`${area.slug}-titulo`} tone={index % 2 === 0 ? "light" : "mist"}>
            <div className="grid items-center gap-10 laptop:grid-cols-2 laptop:gap-20">
              <div className={`reveal ${imageFirst ? "laptop:order-2" : ""}`}>
                <h2 id={`${area.slug}-titulo`} className="text-h2">
                  {area.name}
                </h2>
                <p className="mt-5 max-w-prose font-serif text-lede text-ink-600">{area.detail}</p>

                <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-line py-6">
                  {area.figures.map((figure) => (
                    <div key={figure.label}>
                      <dt className="text-[0.9375rem] text-ink-600">{figure.label}</dt>
                      <dd className="mt-1 text-h2 font-semibold text-petrol-700 [font-stretch:108%]">
                        <CountUp value={figure.value} />
                      </dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-6 space-y-3">
                  {area.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 bg-petrol-700" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`reveal-mask relative aspect-[4/3] overflow-hidden bg-ink-800 ${imageFirst ? "laptop:order-1" : ""}`}>
                <Image
                  src={area.image.src}
                  alt={area.image.alt}
                  width={area.image.width}
                  height={area.image.height}
                  sizes="(min-width: 66rem) 45vw, 100vw"
                  className="size-full object-cover"
                />
              </div>
            </div>
          </Section>
        );
      })}

      <Section tone="petrol" labelledBy="clientes-titulo">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 id="clientes-titulo" className="text-h2">
              Para clientes industriales
            </h2>
            <p className="mt-4 font-serif text-lede text-petrol-100">
              Vendemos naftas, gasoil, GLP y asfaltos con despacho por camión, ducto o ferrocarril. Un equipo comercial arma cada cotización según volumen y entrega.
            </p>
          </div>
          <ButtonLink href="/contacto" variant="inverse" size="lg">
            Pedir una cotización <ArrowRight />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
