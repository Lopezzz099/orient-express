import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "@/components/ui/icon-map";
import { ArrowRight } from "@/components/ui/icons";
import { Section, SectionIntro } from "@/components/ui/section";
import { businessAreas } from "@/lib/areas";

export function AreasList() {
  return (
    <Section labelledBy="areas-titulo">
      <div className="grid gap-10 laptop:grid-cols-[1fr_2.2fr] laptop:gap-20">
        <div className="laptop:sticky laptop:top-28 laptop:self-start">
          <SectionIntro
            id="areas-titulo"
            title="De la boca de pozo al buque tanque"
            lede="Cuatro áreas conectadas entre sí. Lo que se produce en el yacimiento se trata, se transporta, se refina o se embarca sin salir de la misma cadena."
          />
          <Link
            href="/que-hacemos"
            className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-petrol-700 underline decoration-petrol-700/40 underline-offset-4 transition-colors hover:text-petrol-900"
          >
            Ver todas las áreas <ArrowRight />
          </Link>
        </div>

        <ul className="border-b border-line">
          {businessAreas.map((area) => (
            <li key={area.slug} className="reveal border-t border-line">
              <Link
                href={`/que-hacemos#${area.slug}`}
                className="group grid gap-5 py-7 tablet:grid-cols-[13rem_1fr] tablet:gap-8"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                  <Image
                    src={area.image.src}
                    alt={area.image.alt}
                    width={area.image.width}
                    height={area.image.height}
                    sizes="(min-width: 46rem) 13rem, 100vw"
                    className="size-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <IconBadge name={area.icon} />
                    <h3 className="text-h3">{area.name}</h3>
                  </div>
                  <p className="mt-2 max-w-xl text-ink-600">{area.summary}</p>
                  <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                    {area.figures.map((figure) => (
                      <div key={figure.label}>
                        <dt className="sr-only">{figure.label}</dt>
                        <dd className="text-[0.9375rem] text-ink-600">
                          <span className="num text-lg font-semibold text-ink-950">{figure.value}</span>{" "}
                          <span aria-hidden="true">{figure.label}</span>
                          <span className="sr-only">{figure.label}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-petrol-700 group-hover:text-petrol-900">
                    Más sobre {area.name.toLowerCase()}
                    <ArrowRight className="size-4 transition-transform duration-300 ease-out-quart group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
