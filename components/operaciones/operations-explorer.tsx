"use client";

import { useId, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { assetTypeLabels, assets, type AssetType } from "@/lib/operations";
import { textLink } from "@/lib/ui";
import { OperationsMap, type MapStatus } from "./operations-map";

const types = Object.keys(assetTypeLabels) as AssetType[];

function formatCoords(lat: number, lng: number) {
  const f = (n: number, pos: string, neg: string) => `${Math.abs(n).toFixed(3).replace(".", ",")}° ${n >= 0 ? pos : neg}`;
  return `${f(lat, "N", "S")}, ${f(lng, "E", "O")}`;
}

export function OperationsExplorer() {
  const uid = useId();
  const [activeTypes, setActiveTypes] = useState<AssetType[]>(types);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<MapStatus>("loading");
  const [resetSignal, setResetSignal] = useState(0);
  const mapBoxRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => assets.filter((a) => activeTypes.includes(a.type)), [activeTypes]);
  const visibleIds = useMemo(() => visible.map((a) => a.id), [visible]);
  const selected = assets.find((a) => a.id === selectedId) ?? null;

  function toggleType(type: AssetType) {
    setActiveTypes((current) => {
      const next = current.includes(type) ? current.filter((t) => t !== type) : [...current, type];
      return next;
    });
    if (selected && selected.type === type && activeTypes.includes(type)) setSelectedId(null);
  }

  function select(id: string) {
    setSelectedId(id);
    // En pantallas chicas el mapa queda arriba de la lista: se lo acerca para que se vea el cambio.
    if (window.matchMedia("(max-width: 65.99rem)").matches) {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      mapBoxRef.current?.scrollIntoView({ block: "nearest", behavior: smooth ? "smooth" : "auto" });
    }
  }

  return (
    <div className="grid gap-8 laptop:grid-cols-[minmax(0,26rem)_1fr] laptop:gap-12">
      <div className="order-2 laptop:order-1">
        <fieldset>
          <legend className="text-[0.9375rem] font-semibold text-ink-950">Mostrar en el mapa</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {types.map((type) => {
              const checked = activeTypes.includes(type);
              const id = `${uid}-${type}`;
              const count = assets.filter((a) => a.type === type).length;
              return (
                <div key={type}>
                  <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleType(type)}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={id}
                    className={[
                      "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm border px-3 text-[0.9375rem] font-medium transition-colors",
                      "peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-petrol-700",
                      checked
                        ? "border-ink-950 bg-ink-950 text-white"
                        : "border-ink-300 bg-white text-ink-900 hover:border-ink-600",
                    ].join(" ")}
                  >
                    <span aria-hidden="true" className="size-3 rounded-full border-2 border-white" style={{ background: assetTypeLabels[type].color }} />
                    {assetTypeLabels[type].plural}
                    <span className="num text-label opacity-80">{count}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>

        <p role="status" aria-live="polite" className="mt-5 text-[0.9375rem] text-ink-600">
          {visible.length === 0
            ? "No hay activos con los filtros elegidos."
            : `${visible.length} ${visible.length === 1 ? "activo" : "activos"} en la lista.`}
        </p>

        <ul className="mt-2 border-b border-line">
          {visible.map((asset) => {
            const isSelected = asset.id === selectedId;
            return (
              <li key={asset.id} className="border-t border-line">
                <button
                  type="button"
                  onClick={() => select(asset.id)}
                  aria-pressed={isSelected}
                  className={[
                    "flex min-h-14 w-full cursor-pointer items-start gap-3 px-3 py-4 text-left transition-colors",
                    isSelected ? "bg-petrol-100" : "bg-paper hover:bg-mist",
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-3 shrink-0 rounded-full"
                    style={{ background: assetTypeLabels[asset.type].color }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink-950">{asset.name}</span>
                    <span className="block text-[0.9375rem] text-ink-600">
                      {assetTypeLabels[asset.type].singular} · {asset.locality}
                    </span>
                  </span>
                  <span className="num shrink-0 text-[0.9375rem] font-medium text-petrol-700">{asset.capacity}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div aria-live="polite" className="mt-6">
          {selected ? (
            <article className="border border-line bg-mist p-5" aria-labelledby={`${uid}-detalle`}>
              <p className="text-label text-ink-600">{assetTypeLabels[selected.type].singular}</p>
              <h3 id={`${uid}-detalle`} className="text-h3">
                {selected.name}
              </h3>
              <p className="mt-2 text-ink-900">{selected.summary}</p>
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.9375rem]">
                <div>
                  <dt className="text-ink-600">Capacidad</dt>
                  <dd className="num font-semibold">{selected.capacity}</dd>
                </div>
                <div>
                  <dt className="text-ink-600">En operación desde</dt>
                  <dd className="num font-semibold">{selected.since}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-ink-600">Ubicación</dt>
                  <dd className="font-semibold">{selected.locality}</dd>
                  <dd className="num text-ink-600">{formatCoords(selected.lat, selected.lng)}</dd>
                </div>
              </dl>
              <a
                href={`https://www.openstreetmap.org/?mlat=${selected.lat}&mlon=${selected.lng}#map=10/${selected.lat}/${selected.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${textLink} mt-4 inline-flex min-h-11 items-center gap-2`}
              >
                Ver en OpenStreetMap <ArrowRight className="size-4" />
                <span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>
            </article>
          ) : (
            <p className="text-[0.9375rem] text-ink-600">Elegí un activo de la lista o un punto del mapa para ver su ficha.</p>
          )}
        </div>
      </div>

      <div ref={mapBoxRef} className="order-1 laptop:sticky laptop:top-28 laptop:order-2 laptop:self-start">
        <div
          role="region"
          aria-label="Mapa de activos de Orient Express. La lista de al lado tiene la misma información."
          className="relative h-[24rem] overflow-hidden border border-line bg-mist laptop:h-[36rem]"
        >
          <OperationsMap
            visibleIds={visibleIds}
            selectedId={selectedId}
            onSelect={select}
            onStatus={setStatus}
            resetSignal={resetSignal}
          />
          {status === "loading" ? (
            <p role="status" className="pointer-events-none absolute inset-x-0 top-4 mx-auto w-fit bg-white px-4 py-2 text-[0.9375rem] font-medium shadow-sm">
              Cargando mapa…
            </p>
          ) : null}
          {status === "error" ? (
            <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-mist p-8 text-center">
              <p className="text-lg font-semibold text-ink-950">No pudimos cargar el mapa</p>
              <p className="max-w-sm text-ink-600">La lista de activos funciona igual: tiene capacidad, ubicación y coordenadas de cada instalación.</p>
            </div>
          ) : null}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-label text-ink-600">Las líneas punteadas son oleoductos. Mapa base de OpenStreetMap.</p>
          {status === "ready" ? (
            <Button variant="outline" size="sm" onClick={() => setResetSignal((n) => n + 1)}>
              Ver todos
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
