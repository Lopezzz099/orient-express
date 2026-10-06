import Link from "next/link";

/** Marca propia: un sol que sale sobre dos líneas de ducto. */
export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true" focusable="false">
      <path d="M5 21a13 13 0 0 1 26 0Z" fill="var(--color-signal-500)" />
      <rect x="0" y="24" width="36" height="3" fill="currentColor" />
      <rect x="0" y="30" width="36" height="3" fill="currentColor" />
    </svg>
  );
}

export function Logo({ current = false }: { current?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Orient Express, ir al inicio"
      aria-current={current ? "page" : undefined}
      className="group inline-flex min-h-11 items-center gap-3 text-white"
    >
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="text-[1.0625rem] font-bold tracking-[0.08em] [font-stretch:118%]">ORIENT</span>
        <span className="mt-1 text-[0.6875rem] font-medium tracking-[0.34em] text-ink-300 [font-stretch:118%]">
          EXPRESS
        </span>
      </span>
    </Link>
  );
}
