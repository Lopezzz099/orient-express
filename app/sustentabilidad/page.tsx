import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SectionNav } from "@/components/ui/section-nav";
import { media } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";
import { pillars } from "@/lib/sustainability";

export const metadata: Metadata = pageMetadata({
  title: "Sustentabilidad",
  description:
    "Compromisos ambientales, seguridad operativa y relación con las comunidades de Orient Express, con metas y avances por año.",
  path: "/sustentabilidad",
});

export default function SustentabilidadPage() {
  return (
    <>
      <PageHero
        title="Sustentabilidad"
        lede="Operar con seguridad y reducir el impacto de cada instalación son condiciones de nuestra licencia para trabajar. Publicamos metas, plazos y avances."
        image={media.eolico}
      />

      <SectionNav items={pillars.map((p) => ({ id: p.id, label: p.title }))} />

      {pillars.map((pillar, index) => (
        <Section key={pillar.id} id={pillar.id} labelledBy={`${pillar.id}-titulo`} tone={index % 2 === 0 ? "light" : "mist"}>
          <div className="grid gap-10 laptop:grid-cols-[1fr_1.6fr] laptop:gap-20">
            <div>
              <h2 id={`${pillar.id}-titulo`} className="text-h2">
                {pillar.title}
              </h2>
              <p className="mt-5 font-serif text-lede text-ink-600">{pillar.intro}</p>
              <div className="reveal-mask relative mt-8 hidden aspect-[4/3] overflow-hidden bg-ink-800 laptop:block">
                <Image
                  src={pillar.image.src}
                  alt={pillar.image.alt}
                  width={pillar.image.width}
                  height={pillar.image.height}
                  sizes="(min-width: 66rem) 30vw, 100vw"
                  className="size-full object-cover"
                />
              </div>
            </div>

            <div>
              <ul className="border-b border-line">
                {pillar.commitments.map((item) => (
                  <li key={item.title} className="reveal border-t border-line py-7">
                    <h3 className="text-h3">{item.title}</h3>
                    <p className="mt-2 max-w-prose text-ink-600">{item.text}</p>
                    <dl className="mt-4 grid gap-x-8 gap-y-2 tablet:grid-cols-2">
                      <div>
                        <dt className="text-label text-ink-600">Meta</dt>
                        <dd className="font-medium">{item.target}</dd>
                      </div>
                      <div>
                        <dt className="text-label text-ink-600">Estado</dt>
                        <dd className="num font-medium text-petrol-700">{item.status}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ))}

      <Section tone="petrol" labelledBy="nota-titulo">
        <div className="max-w-3xl">
          <h2 id="nota-titulo" className="text-h2">
            Sobre estas cifras
          </h2>
          <p className="mt-4 font-serif text-lede text-petrol-100">
            Las metas y avances de esta página son ficticios y forman parte de un sitio de demostración. En una compañía real, cada indicador se
            verificaría con auditoría externa y se publicaría con su metodología.
          </p>
        </div>
      </Section>
    </>
  );
}
