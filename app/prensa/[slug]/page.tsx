import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/ui/icons";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { getNewsBySlug, news } from "@/lib/news";
import { site } from "@/lib/site";
import { pageContainer, tag, textLink } from "@/lib/ui";

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata(props: PageProps<"/prensa/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const item = getNewsBySlug(slug);
  if (!item) return {};
  return pageMetadata({
    title: item.title,
    description: item.excerpt,
    path: `/prensa/${item.slug}`,
    type: "article",
    publishedTime: item.date,
  });
}

export default async function NoticiaPage(props: PageProps<"/prensa/[slug]">) {
  const { slug } = await props.params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const related = news.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <article>
      <header className="surface-dark bg-ink-950 text-white">
        <div className={`${pageContainer} max-w-4xl py-14 laptop:py-20`}>
          <nav aria-label="Ruta de navegación" className="text-[0.9375rem] text-ink-300">
            <Link href="/prensa" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-white">
              Prensa
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{item.category}</span>
          </nav>
          <h1 className="mt-4 text-h1">{item.title}</h1>
          <p className="mt-5 flex flex-wrap items-center gap-3 text-ink-300">
            <span className={tag}>{item.category}</span>
            <time dateTime={item.date}>{formatDate(item.date)}</time>
          </p>
        </div>
      </header>

      <div className={`${pageContainer} max-w-4xl py-12 laptop:py-16`}>
        <div className="relative aspect-[16/9] overflow-hidden bg-ink-800">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            priority
            sizes="(min-width: 66rem) 56rem, 100vw"
            className="size-full object-cover"
          />
        </div>

        <div className="mx-auto mt-10 max-w-prose space-y-6 font-serif text-lede leading-relaxed text-ink-900">
          <p className="text-ink-600">{item.excerpt}</p>
          {item.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-prose border-t border-line pt-6 text-[0.9375rem] text-ink-600">
          <p>
            Contacto de prensa:{" "}
            <a href={`mailto:${site.emails.prensa}`} className={textLink}>
              {site.emails.prensa}
            </a>
            . Este comunicado es parte de un sitio de demostración; {site.name} es una empresa ficticia.
          </p>
        </div>
      </div>

      <section aria-labelledby="mas-noticias" className="bg-mist py-section">
        <div className={pageContainer}>
          <h2 id="mas-noticias" className="text-h2">
            Más noticias
          </h2>
          <ul className="mt-8 grid gap-8 laptop:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug} className="border-t border-line pt-5">
                <Link href={`/prensa/${r.slug}`} className="group block">
                  <time dateTime={r.date} className="text-[0.9375rem] text-ink-600">
                    {formatDate(r.date)}
                  </time>
                  <h3 className="mt-2 text-h3 group-hover:text-petrol-700">{r.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-petrol-700">
                    Leer nota <ArrowRight className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
