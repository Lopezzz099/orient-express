import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionIntro } from "@/components/ui/section";
import { media } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";
import { board, governancePillars, leadership } from "@/lib/people";
import { mission, timeline, values } from "@/lib/timeline";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Quiénes somos",
  description:
    "La historia de Orient Express desde 1994, su misión y valores, el equipo directivo y el gobierno corporativo.",
  path: "/quienes-somos",
});

function initials(name: string) {
  return name
    .split(" ")
    .filter((part) => part.length > 2)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export default function QuienesSomosPage() {
  return (
    <>
      <PageHero
        title="Quiénes somos"
        lede="Orient Express nació en Neuquén en 1994 con doce empleados. Hoy emplea a 1.340 personas y opera una cadena integrada de petróleo y gas."
        image={media.refineriaTorre}
      />

      <Section labelledBy="mision-titulo">
        <div className="grid gap-12 laptop:grid-cols-[1fr_1.4fr] laptop:gap-20">
          <h2 id="mision-titulo" className="text-h2">
            Misión
          </h2>
          <div>
            <p className="font-serif text-h3 leading-snug text-ink-950">{mission}</p>
            <dl className="mt-12 grid gap-8 tablet:grid-cols-2">
              {values.map((value) => (
                <div key={value.title} className="border-t border-line pt-4">
                  <dt className="text-lg font-semibold">{value.title}</dt>
                  <dd className="mt-2 text-ink-600">{value.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="historia-titulo">
        <SectionIntro
          id="historia-titulo"
          title="Treinta años en la cuenca"
          lede="Una cronología de los hitos que ampliaron la compañía, de una concesión de explotación a una operación integrada."
        />
        <ol className="mt-14 border-b border-line">
          {timeline.map((event) => (
            <li key={event.year} className="grid gap-2 border-t border-line py-7 tablet:grid-cols-[9rem_1fr] tablet:gap-8 laptop:grid-cols-[12rem_1fr_1.4fr]">
              <p className="num text-h2 font-semibold text-petrol-700 [font-stretch:108%]">{event.year}</p>
              <h3 className="text-h3">{event.title}</h3>
              <p className="text-ink-600 tablet:col-start-2 laptop:col-start-3">{event.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="liderazgo-titulo">
        <SectionIntro id="liderazgo-titulo" title="Liderazgo" lede="El equipo que conduce la compañía. Las personas que se presentan son ficticias." />
        <ul className="mt-12 grid gap-x-16 gap-y-10 laptop:grid-cols-2">
          {leadership.map((person) => (
            <li key={person.name} className="flex gap-5 border-t border-line pt-6">
              <span
                aria-hidden="true"
                className="flex size-14 shrink-0 items-center justify-center bg-petrol-900 text-lg font-semibold text-white [font-stretch:112%]"
              >
                {initials(person.name)}
              </span>
              <div>
                <h3 className="text-h3">{person.name}</h3>
                <p className="mt-1 text-[0.9375rem] font-medium text-petrol-700">{person.role}</p>
                <p className="mt-3 text-ink-600">{person.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="petrol" id="gobierno" labelledBy="gobierno-titulo">
        <SectionIntro
          id="gobierno-titulo"
          title="Gobierno corporativo"
          lede="El directorio supervisa la gestión, aprueba la estrategia y revisa los riesgos. Tres de sus cinco miembros son independientes."
        />
        <div className="mt-12 grid gap-14 laptop:grid-cols-[1.3fr_1fr] laptop:gap-20">
          <dl className="grid gap-8 tablet:grid-cols-2">
            {governancePillars.map((pillar) => (
              <div key={pillar.title} className="border-t border-white/25 pt-4">
                <dt className="text-lg font-semibold text-white">{pillar.title}</dt>
                <dd className="mt-2 text-ink-300">{pillar.text}</dd>
              </div>
            ))}
          </dl>
          <div>
            <h3 className="text-h3">Directorio</h3>
            <ul className="mt-4 border-b border-white/25">
              {board.map((member) => (
                <li key={member.name + member.role} className="border-t border-white/25 py-4">
                  <p className="font-semibold text-white">{member.name}</p>
                  <p className="text-[0.9375rem] text-ink-300">
                    {member.role}. {member.bio}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.9375rem] text-ink-300">
              Los documentos de gobierno corporativo están en{" "}
              <Link href="/inversores#documentos" className="font-medium text-white underline underline-offset-4 hover:text-signal-500">
                Inversores
              </Link>
              . Consultas al secretario del directorio:{" "}
              <a href={`mailto:${site.emails.inversores}`} className="font-medium text-white underline underline-offset-4 hover:text-signal-500">
                {site.emails.inversores}
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
