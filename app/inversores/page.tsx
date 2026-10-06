import type { Metadata } from "next";
import { ButtonAnchor } from "@/components/ui/button";
import { Download } from "@/components/ui/icons";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionIntro } from "@/components/ui/section";
import { SectionNav } from "@/components/ui/section-nav";
import { formatDate, formatShortDate } from "@/lib/format";
import { documentSize, financialCalendar, investorDocuments } from "@/lib/investors";
import { media } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { tag, textLink } from "@/lib/ui";

export const metadata: Metadata = pageMetadata({
  title: "Inversores",
  description:
    "Documentos de resultados, gobierno corporativo y sustentabilidad, y calendario financiero de Orient Express. Contenido ficticio de demostración.",
  path: "/inversores",
});

export default function InversoresPage() {
  const upcoming = financialCalendar.filter((e) => !e.done).sort((a, b) => a.date.localeCompare(b.date));
  const past = financialCalendar.filter((e) => e.done).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHero
        title="Inversores"
        lede="Resultados trimestrales, estados financieros auditados y calendario de publicaciones. Todo el material de esta sección es ficticio."
        image={media.refineriaTorre}
      />

      <SectionNav
        items={[
          { id: "calendario", label: "Calendario de resultados" },
          { id: "documentos", label: "Documentos" },
          { id: "relacion", label: "Relación con inversores" },
        ]}
      />

      <Section id="calendario" labelledBy="calendario-titulo">
        <SectionIntro
          id="calendario-titulo"
          title="Calendario de resultados"
          lede="Las fechas son estimadas y pueden cambiar. Cada publicación se anuncia con anticipación en esta página."
        />
        <div className="mt-12 grid gap-14 laptop:grid-cols-[1.4fr_1fr] laptop:gap-20">
          <div>
            <h3 className="text-h3">Próximas fechas</h3>
            <ol className="mt-4 border-b border-line">
              {upcoming.map((event) => (
                <li key={event.date} className="grid gap-1 border-t border-line py-5 tablet:grid-cols-[11rem_1fr] tablet:gap-8">
                  <time dateTime={event.date} className="num text-lg font-semibold text-petrol-700">
                    {formatShortDate(event.date)}
                  </time>
                  <div>
                    <p className="font-semibold text-ink-950">{event.title}</p>
                    <p className="mt-1 text-[0.9375rem] text-ink-600">{event.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-h3">Ya publicados</h3>
            <ol className="mt-4 border-b border-line">
              {past.map((event) => (
                <li key={event.date} className="border-t border-line py-5">
                  <time dateTime={event.date} className="num text-[0.9375rem] text-ink-600">
                    {formatDate(event.date)}
                  </time>
                  <p className="mt-1 font-medium text-ink-950">{event.title}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section tone="mist" id="documentos" labelledBy="documentos-titulo">
        <SectionIntro
          id="documentos-titulo"
          title="Documentos"
          lede="Archivos PDF de demostración. Descargan una página con el aviso de que el documento es ficticio."
        />
        <ul className="mt-12 border-b border-line">
          {investorDocuments.map((doc) => (
            <li key={doc.slug} className="grid gap-4 border-t border-line py-6 tablet:grid-cols-[1fr_auto] tablet:items-center tablet:gap-10">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-[0.9375rem] text-ink-600">
                  <span className={tag}>{doc.category}</span>
                  <time dateTime={doc.date}>{formatDate(doc.date)}</time>
                </div>
                <h3 className="mt-2 text-h3">{doc.title}</h3>
                <p className="mt-1 max-w-prose text-ink-600">{doc.description}</p>
              </div>
              <ButtonAnchor
                href={`/documentos/${doc.file}`}
                download
                variant="outline"
                aria-label={`Descargar ${doc.title} (PDF, ${documentSize(doc.file)})`}
              >
                <Download />
                Descargar PDF
                <span className="num text-label font-normal">({documentSize(doc.file)})</span>
              </ButtonAnchor>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="relacion" labelledBy="relacion-titulo">
        <div className="grid gap-8 laptop:grid-cols-[1fr_1.4fr] laptop:gap-20">
          <h2 id="relacion-titulo" className="text-h2">
            Relación con inversores
          </h2>
          <div className="space-y-4">
            <p className="font-serif text-lede text-ink-600">
              El equipo de relaciones con inversores responde consultas de accionistas, analistas y tenedores de deuda en dos días hábiles.
            </p>
            <p>
              Escribí a{" "}
              <a href={`mailto:${site.emails.inversores}`} className={textLink}>
                {site.emails.inversores}
              </a>{" "}
              o llamá al <span className="num font-medium">{site.phone}</span>, interno 214.
            </p>
            <p className="text-[0.9375rem] text-ink-600">
              Esta sección no constituye una oferta ni una recomendación de inversión. Orient Express es una empresa ficticia y sus cifras no son reales.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
