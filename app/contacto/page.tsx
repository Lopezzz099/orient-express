import type { Metadata } from "next";
import { ContactForm, type FieldDef } from "@/components/forms/contact-form";
import { Icon } from "@/components/ui/icon-map";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { media } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { textLink } from "@/lib/ui";

export const metadata: Metadata = pageMetadata({
  title: "Contacto",
  description: "Formulario y datos de contacto de Orient Express para inversores, clientes industriales, proveedores y prensa.",
  path: "/contacto",
});

const fields: FieldDef[] = [
  { name: "nombre", label: "Nombre y apellido", type: "text", required: true, autoComplete: "name", emptyMessage: "Escribí tu nombre y apellido." },
  {
    name: "email",
    label: "Correo electrónico",
    type: "email",
    required: true,
    autoComplete: "email",
    hint: "Te respondemos a esta casilla.",
    emptyMessage: "Escribí tu correo electrónico para poder responderte.",
  },
  { name: "telefono", label: "Teléfono", type: "tel", autoComplete: "tel", hint: "Con código de área." },
  { name: "empresa", label: "Empresa u organización", type: "text", autoComplete: "organization" },
  {
    name: "motivo",
    label: "Motivo de la consulta",
    type: "select",
    required: true,
    emptyMessage: "Elegí un motivo para derivar tu consulta al equipo correcto.",
    options: [
      { value: "inversores", label: "Inversores y accionistas" },
      { value: "clientes", label: "Cotización o consulta comercial" },
      { value: "proveedores", label: "Proveedores y contratistas" },
      { value: "prensa", label: "Prensa" },
      { value: "comunidad", label: "Comunidades y vecinos" },
      { value: "otro", label: "Otro" },
    ],
  },
  {
    name: "mensaje",
    label: "Mensaje",
    type: "textarea",
    required: true,
    minLength: 20,
    hint: "Contanos qué necesitás, con al menos 20 caracteres.",
    emptyMessage: "Escribí tu mensaje para que podamos ayudarte.",
  },
];

export default function ContactoPage() {
  return (
    <>
      <PageHero
        title="Contacto"
        lede="Escribinos y la consulta llega al equipo que corresponde. Respondemos en dos días hábiles."
        image={media.yacimiento}
      />

      <Section labelledBy="formulario-titulo">
        <div className="grid gap-14 laptop:grid-cols-[1.4fr_1fr] laptop:gap-20">
          <div>
            <h2 id="formulario-titulo" className="text-h2">
              Formulario de contacto
            </h2>
            <div className="mt-8 max-w-2xl">
              <ContactForm
                fields={fields}
                submitLabel="Enviar consulta"
                successTitle="Recibimos tu consulta"
                successText="Un integrante del equipo la va a leer y responderá a tu correo en dos días hábiles."
              />
            </div>
          </div>

          <aside aria-labelledby="sede-titulo" className="space-y-10">
            <div>
              <h2 id="sede-titulo" className="text-h3">
                Sede central
              </h2>
              <address className="mt-4 space-y-3 not-italic text-ink-600">
                <p className="flex gap-3">
                  <Icon name="map-pin" className="mt-0.5 size-5 shrink-0 text-petrol-700" />
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                    <br />
                    {site.address.region}, {site.address.country}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <Icon name="phone" className="size-5 shrink-0 text-petrol-700" />
                  <span className="num">{site.phone}</span>
                </p>
              </address>
              <p className="mt-3 flex items-center gap-3 text-[0.9375rem] text-ink-600">
                <Icon name="clock" className="size-5 shrink-0 text-petrol-700" />
                Atención de lunes a viernes, de 9 a 18.
              </p>
            </div>
            <div>
              <h2 className="text-h3">Escribir directamente</h2>
              <ul className="mt-4 space-y-3">
                {[
                  ["Inversores", site.emails.inversores],
                  ["Clientes industriales", site.emails.clientes],
                  ["Proveedores", site.emails.proveedores],
                  ["Prensa", site.emails.prensa],
                  ["Candidatos", site.emails.empleo],
                ].map(([label, email]) => (
                  <li key={email}>
                    <span className="block text-[0.9375rem] text-ink-600">{label}</span>
                    <a href={`mailto:${email}`} className={`${textLink} inline-flex min-h-11 items-center`}>
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
