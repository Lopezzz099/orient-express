"use client";

import "leaflet/dist/leaflet.css";
import type { LayerGroup, Map as LeafletMap, Marker } from "leaflet";
import { useEffect, useRef } from "react";
import { assetTypeLabels, assets, mapCenter, pipelines, type Asset } from "@/lib/operations";

export type MapStatus = "loading" | "ready" | "error";

type Props = {
  visibleIds: string[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onStatus: (status: MapStatus) => void;
  /** Cuenta que cambia para pedir que el mapa vuelva a mostrar todos los activos. */
  resetSignal: number;
};

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function shapeFor(asset: Asset, selected: boolean): string {
  const color = assetTypeLabels[asset.type].color;
  const ring = selected ? "#f2b233" : "#ffffff";
  const size = selected ? 26 : 20;
  const radius = asset.type === "yacimiento" ? "50%" : asset.type === "energia" ? "50% 0" : "2px";
  const rotate = asset.type === "terminal" ? "transform:rotate(45deg);" : "";
  // Contenedor de 44 px para que el objetivo táctil cumpla el mínimo; la figura visible es más chica.
  return `<span style="display:flex;width:44px;height:44px;align-items:center;justify-content:center;">
    <span style="display:block;width:${size}px;height:${size}px;background:${color};border:3px solid ${ring};border-radius:${radius};${rotate}box-shadow:0 0 0 1px #0b1620;"></span>
  </span>`;
}

export function OperationsMap({ visibleIds, selectedId, onSelect, onStatus, resetSignal }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const groupRef = useRef<LayerGroup | null>(null);
  const onSelectRef = useRef(onSelect);
  const onStatusRef = useRef(onStatus);

  useEffect(() => {
    onSelectRef.current = onSelect;
    onStatusRef.current = onStatus;
  });

  // Carga de Leaflet con import() dinámico y creación del mapa.
  useEffect(() => {
    let cancelled = false;
    const markers = markersRef.current;

    (async () => {
      try {
        const L = await import("leaflet");
        if (cancelled || !containerRef.current) return;
        leafletRef.current = L;

        const map = L.map(containerRef.current, {
          center: mapCenter,
          zoom: 6,
          minZoom: 4,
          maxZoom: 13,
          scrollWheelZoom: false,
          zoomControl: true,
          worldCopyJump: false,
        });
        mapRef.current = map;

        let loaded = 0;
        let failed = 0;
        const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">colaboradores de OpenStreetMap</a>',
        });
        tiles.on("tileload", () => {
          loaded += 1;
        });
        tiles.on("tileerror", () => {
          failed += 1;
          if (loaded === 0 && failed >= 4) onStatusRef.current("error");
        });
        tiles.addTo(map);

        pipelines.forEach((pipe) => {
          L.polyline(pipe.path, { color: "#0e5f63", weight: 3, opacity: 0.85, dashArray: "8 6", interactive: false }).addTo(map);
        });

        const group = L.layerGroup().addTo(map);
        groupRef.current = group;
        assets.forEach((asset) => {
          const marker = L.marker([asset.lat, asset.lng], {
            icon: L.divIcon({ html: shapeFor(asset, false), className: "", iconSize: [44, 44], iconAnchor: [22, 22] }),
            title: `${asset.name}, ${assetTypeLabels[asset.type].singular}`,
            alt: `${asset.name}, ${assetTypeLabels[asset.type].singular}`,
            keyboard: true,
            riseOnHover: true,
          });
          marker.on("click", () => onSelectRef.current(asset.id));
          marker.addTo(group);
          markers.set(asset.id, marker);
        });

        map.fitBounds(L.latLngBounds(assets.map((a) => [a.lat, a.lng] as [number, number])), { padding: [48, 48], animate: false });
        // El zoom con la rueda se activa solo cuando el mapa tiene el foco, para no atrapar el scroll de la página.
        map.on("focus", () => map.scrollWheelZoom.enable());
        map.on("blur", () => map.scrollWheelZoom.disable());
        onStatusRef.current("ready");
      } catch {
        if (!cancelled) onStatusRef.current("error");
      }
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      groupRef.current = null;
      markers.clear();
    };
  }, []);

  // Filtro por tipo: solo se muestran los marcadores visibles.
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    markersRef.current.forEach((marker, id) => {
      const shouldShow = visibleIds.includes(id);
      if (shouldShow && !group.hasLayer(marker)) group.addLayer(marker);
      if (!shouldShow && group.hasLayer(marker)) group.removeLayer(marker);
    });
  }, [visibleIds]);

  // Selección: resalta el marcador y centra el mapa.
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map) return;
    markersRef.current.forEach((marker, id) => {
      const asset = assets.find((a) => a.id === id);
      if (!asset) return;
      const selected = id === selectedId;
      marker.setIcon(L.divIcon({ html: shapeFor(asset, selected), className: "", iconSize: [44, 44], iconAnchor: [22, 22] }));
      marker.setZIndexOffset(selected ? 1000 : 0);
    });
    const target = assets.find((a) => a.id === selectedId);
    if (target) {
      map.flyTo([target.lat, target.lng], Math.max(map.getZoom(), 8), { animate: !prefersReducedMotion(), duration: 0.8 });
    }
  }, [selectedId]);

  // Volver a mostrar todo.
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map || resetSignal === 0) return;
    map.fitBounds(L.latLngBounds(assets.map((a) => [a.lat, a.lng] as [number, number])), { padding: [48, 48], animate: !prefersReducedMotion() });
  }, [resetSignal]);

  return <div ref={containerRef} className="size-full bg-mist" />;
}
