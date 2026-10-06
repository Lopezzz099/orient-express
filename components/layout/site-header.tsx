import { DesktopNav } from "./desktop-nav";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="surface-dark fixed inset-x-0 top-0 z-(--z-header) border-b border-white/10 bg-ink-950 text-white">
      <div className="flex h-(--spacing-header) items-stretch justify-between pl-gutter nav:pr-gutter">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex items-center">
          <DesktopNav />
          <MobileNav />
        </div>
      </div>
      {/* Avance de lectura: un trazo ámbar que crece con el scroll */}
      <div aria-hidden="true" className="scroll-progress absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-signal-500" />
    </header>
  );
}
