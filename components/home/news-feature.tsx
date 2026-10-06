import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { Section, SectionIntro } from "@/components/ui/section";
import { formatDate } from "@/lib/format";
import { news } from "@/lib/news";
import { tag } from "@/lib/ui";

export function NewsFeature() {
  const [lead, ...rest] = news;
  const others = rest.slice(0, 3);
  return (
    <Section tone="mist" labelledBy="noticias-titulo">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionIntro id="noticias-titulo" title="Noticias destacadas" />
        <Link
          href="/prensa"
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-petrol-700 underline decoration-petrol-700/40 underline-offset-4 transition-colors hover:text-petrol-900"
        >
          Ir a prensa <ArrowRight />
        </Link>
      </div>

      <div className="mt-12 grid gap-10 laptop:grid-cols-[1.4fr_1fr] laptop:gap-16">
        <article className="group">
          <Link href={`/prensa/${lead.slug}`} className="block">
            <div className="relative aspect-[16/10] overflow-hidden bg-ink-800">
              <Image
                src={lead.image.src}
                alt={lead.image.alt}
                width={lead.image.width}
                height={lead.image.height}
                sizes="(min-width: 66rem) 55vw, 100vw"
                className="size-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-105"
              />
            </div>
            <div className="mt-6 flex items-center gap-3 text-[0.9375rem] text-ink-600">
              <span className={tag}>{lead.category}</span>
              <time dateTime={lead.date}>{formatDate(lead.date)}</time>
            </div>
            <h3 className="mt-3 text-h2 group-hover:text-petrol-700">{lead.title}</h3>
            <p className="mt-3 max-w-xl text-ink-600">{lead.excerpt}</p>
          </Link>
        </article>

        <ul className="flex flex-col border-b border-line">
          {others.map((item) => (
            <li key={item.slug} className="border-t border-line">
              <article>
                <Link href={`/prensa/${item.slug}`} className="group flex flex-col gap-2 py-6">
                  <div className="flex items-center gap-3 text-[0.9375rem] text-ink-600">
                    <span className={tag}>{item.category}</span>
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                  </div>
                  <h3 className="text-h3 group-hover:text-petrol-700">{item.title}</h3>
                  <p className="text-[0.9375rem] text-ink-600">{item.excerpt}</p>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
