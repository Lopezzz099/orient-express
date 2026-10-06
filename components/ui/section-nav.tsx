"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/** Índice fijo de una página larga. Marca con aria-current la sección que está en pantalla. */
export function SectionNav({ items, label = "En esta página" }: { items: Item[]; label?: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);
    if (targets.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }
        if (visible.size > 0) {
          const [first] = [...visible.entries()].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]));
          setActive(first[0]);
        }
      },
      { rootMargin: "-120px 0px -55% 0px", threshold: 0 },
    );
    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="sticky top-(--spacing-header) z-(--z-sticky) border-b border-line bg-paper">
      <ul className="mx-auto flex max-w-page gap-1 overflow-x-auto px-gutter">
        {items.map((item) => {
          const current = active === item.id;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                onClick={() => setActive(item.id)}
                className={[
                  "inline-flex min-h-11 items-center px-3 text-[0.9375rem] underline underline-offset-8 transition-colors",
                  current
                    ? "font-semibold text-petrol-700 decoration-petrol-700 decoration-2"
                    : "font-medium text-ink-900 decoration-transparent hover:decoration-ink-300",
                ].join(" ")}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
