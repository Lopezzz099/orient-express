"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { contactNav, homeNav, isActive, primaryNav } from "@/lib/nav";
import { buttonClass } from "@/lib/ui";

const PANEL_ID = "panel-menu-movil";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Cierra el panel al cambiar de ruta (ajuste de estado durante el render, sin efecto).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Escape cierra; Tab queda dentro del panel; el fondo no hace scroll.
  useEffect(() => {
    if (!open) return;
    // El panel recién pasa a ser visible en este cuadro: se espera un instante para poder enfocarlo.
    const timer = window.setTimeout(() => closeRef.current?.focus(), 50);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  // Si se agranda la ventana hasta el modo escritorio, el panel se cierra solo.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 66rem)");
    const onChange = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const items = [homeNav, ...primaryNav];
  const contactActive = isActive(pathname, contactNav.href);

  return (
    <div className="laptop:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-(--spacing-header) w-18 cursor-pointer items-center justify-center border-l border-white/15 bg-ink-900 text-white transition-colors duration-200 hover:bg-ink-800"
      >
        <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
          <path d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      </button>

      <div
        aria-hidden="true"
        onClick={close}
        className={[
          "fixed inset-0 z-(--z-backdrop) bg-ink-950/75 transition-[opacity,visibility] duration-300 ease-out-quart",
          open ? "visible opacity-100" : "invisible opacity-0",
        ].join(" ")}
      />

      <div
        ref={panelRef}
        id={PANEL_ID}
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
        inert={!open}
        className={[
          "surface-dark fixed inset-y-0 right-0 z-(--z-drawer) flex w-[min(90vw,24rem)] flex-col bg-ink-950 text-white",
          "shadow-[-8px_0_32px_-8px_oklch(0_0_0/0.5)] transition-[transform,visibility] duration-300 ease-out-quart",
          open ? "visible translate-x-0" : "invisible translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-(--spacing-header) shrink-0 items-center justify-between border-b border-white/15 pl-5">
          <span className="text-[0.9375rem] font-semibold text-ink-300">Menú</span>
          <button
            ref={closeRef}
            type="button"
            aria-label="Cerrar menú"
            onClick={close}
            className="flex h-full w-18 cursor-pointer items-center justify-center border-l border-white/15 bg-ink-900 text-white transition-colors duration-200 hover:bg-ink-800"
          >
            <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <nav aria-label="Menú móvil" className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          <ul className="flex flex-col">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "flex min-h-14 flex-col justify-center rounded-sm px-3 py-2 transition-colors duration-200",
                      active ? "bg-white/10 text-signal-500" : "text-white hover:bg-white/5",
                    ].join(" ")}
                  >
                    <span className="text-lg font-semibold">{item.label}</span>
                    <span className={active ? "text-label text-signal-500/90" : "text-label text-ink-300"}>
                      {item.description}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-white/15 p-5">
          <Link
            href={contactNav.href}
            aria-current={contactActive ? "page" : undefined}
            className={buttonClass(contactActive ? "inverse" : "accent", "lg", "w-full")}
          >
            {contactNav.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
