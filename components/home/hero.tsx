"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Pause, Play } from "@/components/ui/icons";
import { heroVideo, media } from "@/lib/media";
import { pageContainer } from "@/lib/ui";

type NetworkInformation = EventTarget & { saveData?: boolean; effectiveType?: string };

function connection(): NetworkInformation | undefined {
  return (navigator as Navigator & { connection?: NetworkInformation }).connection;
}

/**
 * El video solo se carga si la persona no pidió reducir el movimiento
 * ni activó el ahorro de datos. En el servidor siempre se muestra la foto.
 */
function subscribe(onChange: () => void) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  reduced.addEventListener("change", onChange);
  connection()?.addEventListener("change", onChange);
  return () => {
    reduced.removeEventListener("change", onChange);
    connection()?.removeEventListener("change", onChange);
  };
}

function getSnapshot(): boolean {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const info = connection();
  const slow = info?.saveData === true || info?.effectiveType === "slow-2g" || info?.effectiveType === "2g";
  return !reduced && !slow;
}

const audienceLinks = [
  { href: "/inversores", label: "Inversores" },
  { href: "/que-hacemos", label: "Clientes industriales" },
  { href: "/contacto", label: "Proveedores" },
  { href: "/carreras", label: "Candidatos" },
  { href: "/prensa", label: "Prensa" },
];

export function Hero() {
  const videoAllowed = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const userPausedRef = useRef(false);

  // React no refleja `muted` como atributo en el HTML del servidor: se asigna como propiedad antes de play().
  const tryPlay = useCallback((node: HTMLVideoElement | null) => {
    if (!node || userPausedRef.current) return;
    node.muted = true;
    node.defaultMuted = true;
    node.play().catch(() => setPlaying(false));
  }, []);

  const attachVideo = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      tryPlay(node);
    },
    [tryPlay],
  );

  function toggle() {
    const node = videoRef.current;
    if (!node) return;
    if (node.paused) {
      userPausedRef.current = false;
      setUserPaused(false);
      tryPlay(node);
    } else {
      userPausedRef.current = true;
      node.pause();
      setUserPaused(true);
    }
  }

  const showVideo = videoAllowed;

  return (
    <section
      aria-labelledby="hero-titulo"
      className="surface-dark relative flex min-h-[calc(100dvh-var(--spacing-header))] flex-col justify-end overflow-hidden bg-ink-950 text-white"
    >
      <div className="hero-media absolute inset-x-0 bottom-0 -top-[14vh]">
      <Image
        src={heroVideo.poster}
        alt={media.heroPoster.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {showVideo ? (
        <video
          ref={attachVideo}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out-quart ${playing ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroVideo.poster}
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={(event) => tryPlay(event.currentTarget)}
          onCanPlay={(event) => tryPlay(event.currentTarget)}
          onPlaying={() => setPlaying(true)}
        >
          <source src={heroVideo.src} type="video/mp4" />
        </video>
      ) : null}
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/55 to-ink-950/35" />

      <div className={`${pageContainer} hero-copy relative pt-12 pb-8 laptop:pt-16 laptop:pb-12`}>
        <h1 id="hero-titulo" className="motion-rise max-w-5xl text-display">
          Producimos, refinamos y transportamos energía desde Neuquén
        </h1>
        <p className="motion-rise mt-6 max-w-2xl font-serif text-lede text-white/90" style={{ "--i": 2 } as CSSProperties}>
          Orient Express opera tres yacimientos, una refinería y 720 km de oleoductos entre la cuenca neuquina y el Atlántico.
        </p>
        <div className="motion-rise mt-8 flex flex-wrap gap-3" style={{ "--i": 3 } as CSSProperties}>
          <ButtonLink href="/operaciones" variant="accent" size="lg">
            Ver operaciones
          </ButtonLink>
          <ButtonLink href="/inversores" variant="outlineInverse" size="lg">
            Información para inversores
          </ButtonLink>
        </div>
      </div>

      <div className="relative border-t border-white/20 bg-ink-950/70">
        <div className={`${pageContainer} flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1`}>
          <nav aria-label="Accesos por público" className="-mx-3">
            <ul className="flex flex-wrap">
              <li className="flex min-h-11 items-center px-3 text-label text-ink-300">Para:</li>
              {audienceLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-medium text-white underline decoration-white/0 underline-offset-4 transition-colors hover:decoration-signal-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {showVideo ? (
            <button
              type="button"
              onClick={toggle}
              aria-label={userPaused ? "Reproducir video de fondo" : "Pausar video de fondo"}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm border border-white/40 bg-ink-950/60 px-3 text-[0.9375rem] font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-ink-950"
            >
              {userPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
              {userPaused ? "Reproducir" : "Pausar"}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
