import { ButtonLink } from "@/components/ui/button";
import { pageContainer } from "@/lib/ui";

export default function NotFound() {
  return (
    <div className={`${pageContainer} py-section`}>
      <h1 className="text-h1">No encontramos esa página</h1>
      <p className="mt-5 max-w-prose font-serif text-lede text-ink-600">
        El enlace puede estar mal escrito o la página pudo haberse movido. Volvé al inicio o escribinos desde la página de contacto.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="primary" size="lg">
          Ir al inicio
        </ButtonLink>
        <ButtonLink href="/contacto" variant="outline" size="lg">
          Contacto
        </ButtonLink>
      </div>
    </div>
  );
}
