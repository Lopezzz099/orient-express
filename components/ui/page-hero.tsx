import Image from "next/image";
import type { ReactNode } from "react";
import type { Media } from "@/lib/media";
import { pageContainer } from "@/lib/ui";

/** Cabecera de página interior: texto a la izquierda, fotografía a la derecha. */
export function PageHero({
  title,
  lede,
  image,
  children,
}: {
  title: string;
  lede: string;
  image: Media;
  children?: ReactNode;
}) {
  return (
    <div className="surface-dark relative overflow-hidden bg-ink-950 text-white">
      <div className={`${pageContainer} grid items-stretch gap-10 py-14 laptop:grid-cols-[1.15fr_1fr] laptop:gap-16 laptop:py-20`}>
        <div className="flex flex-col justify-center">
          <h1 className="text-h1">{title}</h1>
          <p className="mt-6 max-w-xl font-serif text-lede text-ink-300">{lede}</p>
          {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-800 laptop:aspect-auto laptop:min-h-96">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            sizes="(min-width: 66rem) 40vw, 100vw"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
