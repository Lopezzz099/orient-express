import { useSyncExternalStore } from "react";

/**
 * La URL es la fuente de verdad de filtros y selección: cada vista se puede compartir y volver a abrir.
 * Se escribe con replaceState (sin recargar ni sumar entradas al historial) y se lee con useSyncExternalStore.
 */
const EVENT = "orient:urlstate";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

/** Query string actual. En el servidor es vacío, así que el HTML inicial muestra el estado por defecto. */
export function useQueryString(): string {
  return useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
}

export function writeQuery(entries: Record<string, string | null | undefined>): void {
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(entries)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }
  const query = params.toString();
  const url = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(EVENT));
}
