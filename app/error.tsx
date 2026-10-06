"use client";

import { Button, ButtonLink } from "@/components/ui/button";
import { pageContainer } from "@/lib/ui";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className={`${pageContainer} py-section`}>
      <h1 className="text-h1">Algo salió mal en esta página</h1>
      <p className="mt-5 max-w-prose font-serif text-lede text-ink-600">
        Ocurrió un error inesperado. Podés reintentar o volver al inicio; el resto del sitio sigue funcionando.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="primary" size="lg" onClick={reset}>
          Reintentar
        </Button>
        <ButtonLink href="/" variant="outline" size="lg">
          Ir al inicio
        </ButtonLink>
      </div>
    </div>
  );
}
