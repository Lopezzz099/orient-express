import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { formatDate } from "@/lib/format";
import { media } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";
import { news } from "@/lib/news";
import { site } from "@/lib/site";
import { tag, textLink } from "@/lib/ui";

export const metadata: Metadata = pageMetadata({
  title: "Prensa",
  description: "Comunicados, noticias de operación y contacto para medios de Orient Express.",
  path: "/prensa",
});

export default function PrensaPage() {
  return (
    <>
      <PageHero
        title="Prensa"
        lede="Comunicados y noticias de la compañía, en orden cronológico. Para entrevistas o material gráfico, escribí al equipo de prensa."
        image={media.solar}
      />

      <Section labelledBy="noticias-titulo">
        <div className="grid gap-12 laptop:grid-cols-[1fr_20rem] laptop:gap-20">
          <div>
            <h2 id="noticias-titulo" className="text-h2">
              Noticias y comunicados
            </h2>
            <ul className="mt-10 border-b border-line">
              {news.map((item) => (
                <li key={item.slug} className="reveal border-t border-line">
                  <article>
                    <Link href={`/prensa/${item.slug}`} className="group grid gap-5 py-7 tablet:grid-cols-[12rem_1fr] tablet:gap-8">
                      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          width={item.image.width}
                          height={item.image.height}
                          sizes="(min-width: 46rem) 12rem, 100vw"
                          className="size-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3 text-[0.9375rem] text-ink-600">
                          <span className={tag}>{item.category}</span>
                          <time dateTime={item.date}>{formatDate(item.date)}</time>
                        </div>
                        <h3 className="mt-2 text-h3 group-hover:text-petrol-700">{item.title}</h3>
                        <p className="mt-2 text-ink-600">{item.excerpt}</p>
                      </div>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          <aside aria-labelledby="contacto-prensa" className="laptop:sticky laptop:top-28 laptop:self-start">
            <div className="border border-line bg-mist p-6">
              <h2 id="contacto-prensa" className="text-h3">
                Contacto de prensa
              </h2>
              <p className="mt-3 text-[0.9375rem] text-ink-600">Respondemos a medios de lunes a viernes, de 9 a 18, en el día.</p>
              <p className="mt-4">
                <a href={`mailto:${site.emails.prensa}`} className={textLink}>
                  {site.emails.prensa}
                </a>
              </p>
              <p className="num mt-1">{site.phone}</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
