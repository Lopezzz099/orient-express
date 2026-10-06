import type { ReactNode } from "react";
import { pageContainer } from "@/lib/ui";

type Tone = "light" | "mist" | "petrol" | "ink";

const tones: Record<Tone, string> = {
  light: "bg-paper text-ink-900",
  mist: "bg-mist text-ink-900",
  petrol: "surface-dark bg-petrol-900 text-white",
  ink: "surface-dark bg-ink-950 text-white",
};

export function Section({
  tone = "light",
  id,
  labelledBy,
  className = "",
  children,
}: {
  tone?: Tone;
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} py-section ${className}`}>
      <div className={pageContainer}>{children}</div>
    </section>
  );
}

export function SectionIntro({
  id,
  title,
  lede,
  className = "",
}: {
  id?: string;
  title: string;
  lede?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`reveal max-w-3xl ${className}`}>
      <h2 id={id} className="text-h2">
        {title}
      </h2>
      {lede ? <p className="mt-5 max-w-prose font-serif text-lede text-ink-600 [.surface-dark_&]:text-ink-300">{lede}</p> : null}
    </div>
  );
}
