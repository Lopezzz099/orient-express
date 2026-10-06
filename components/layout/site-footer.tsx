import Link from "next/link";
import { contactNav, primaryNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { pageContainer, textLinkInverse } from "@/lib/ui";
import { LogoMark } from "./logo";

const audiences = [
  { label: "Inversores", email: site.emails.inversores },
  { label: "Clientes industriales", email: site.emails.clientes },
  { label: "Proveedores", email: site.emails.proveedores },
  { label: "Prensa", email: site.emails.prensa },
];

export function SiteFooter() {
  return (
    <footer className="surface-dark bg-ink-950 text-ink-300">
      <div className={`${pageContainer} grid gap-12 py-16 tablet:grid-cols-2 laptop:grid-cols-[1.3fr_1fr_1fr_1.2fr]`}>
        <div>
          <div className="flex items-center gap-3 text-white">
            <LogoMark />
            <p className="text-lg font-bold tracking-[0.08em] [font-stretch:118%]">ORIENT EXPRESS</p>
          </div>
          <address className="mt-6 max-w-xs text-[0.9375rem] not-italic leading-relaxed">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
            <br />
            {site.address.region}, {site.address.country}
            <br />
            <span className="num">{site.phone}</span>
          </address>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="text-base font-semibold text-white">Sitio</h2>
          <ul className="mt-4 space-y-1">
            {[...primaryNav, contactNav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center text-[0.9375rem] transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-base font-semibold text-white">Contacto por público</h2>
          <ul className="mt-4 space-y-4 text-[0.9375rem]">
            {audiences.map((a) => (
              <li key={a.email}>
                <span className="block text-label text-ink-300">{a.label}</span>
                <a href={`mailto:${a.email}`} className={`${textLinkInverse} inline-flex min-h-11 items-center`}>
                  {a.email}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="tablet:col-span-2 laptop:col-span-1">
          <h2 className="text-base font-semibold text-white">Sitio de demostración</h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed">{site.demoNotice}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className={`${pageContainer} flex flex-col gap-2 py-6 text-label tablet:flex-row tablet:items-center tablet:justify-between`}>
          <p>© {new Date().getFullYear()} {site.legalName} (empresa ficticia). Diseño de ejemplo.</p>
          <p>
            Fotografías y video:{" "}
            <a href="https://www.pexels.com" className={`${textLinkInverse} inline-flex min-h-11 items-center`} rel="noopener noreferrer">
              Pexels
            </a>
            . Mapa: © colaboradores de OpenStreetMap.
          </p>
        </div>
      </div>
    </footer>
  );
}
