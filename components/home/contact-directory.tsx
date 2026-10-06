import { Icon } from "@/components/ui/icon-map";
import { ArrowRight } from "@/components/ui/icons";
import type { IconName } from "@/lib/icon-names";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionIntro } from "@/components/ui/section";
import { site } from "@/lib/site";
import { textLink } from "@/lib/ui";

const directory: { audience: string; icon: IconName; text: string; email: string }[] = [
  {
    audience: "Inversores",
    icon: "trending-up",
    text: "Resultados, calendario financiero y consultas de accionistas.",
    email: site.emails.inversores,
  },
  {
    audience: "Clientes industriales",
    icon: "truck",
    text: "Cotizaciones de combustibles, asfaltos y GLP; condiciones de entrega.",
    email: site.emails.clientes,
  },
  {
    audience: "Proveedores",
    icon: "handshake",
    text: "Registro, calificación y requisitos de seguridad para contratistas.",
    email: site.emails.proveedores,
  },
  {
    audience: "Prensa",
    icon: "newspaper",
    text: "Comunicados, entrevistas y material gráfico.",
    email: site.emails.prensa,
  },
  {
    audience: "Candidatos",
    icon: "hard-hat",
    text: "Búsquedas abiertas y consultas sobre procesos de selección.",
    email: site.emails.empleo,
  },
];

export function ContactDirectory() {
  return (
    <Section labelledBy="contacto-titulo">
      <div className="grid gap-10 laptop:grid-cols-[1fr_2fr] laptop:gap-20">
        <div>
          <SectionIntro
            id="contacto-titulo"
            title="Con quién hablar"
            lede="Cada consulta llega a un equipo específico. Escribí al área que corresponda o usá el formulario general."
          />
          <div className="mt-8">
            <ButtonLink href="/contacto" variant="primary" size="lg">
              Ir al formulario <ArrowRight />
            </ButtonLink>
          </div>
        </div>

        <ul className="border-b border-line">
          {directory.map((row) => (
            <li key={row.audience} className="reveal grid gap-1 border-t border-line py-5 tablet:grid-cols-[12rem_1fr] tablet:gap-8">
              <h3 className="flex items-center gap-3 text-base font-semibold">
                <Icon name={row.icon} className="size-6 shrink-0 text-petrol-700" />
                {row.audience}
              </h3>
              <div>
                <p className="text-ink-600">{row.text}</p>
                <a href={`mailto:${row.email}`} className={`${textLink} mt-1 inline-flex min-h-11 items-center`}>
                  {row.email}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
