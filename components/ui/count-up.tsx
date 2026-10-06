"use client";

import { useEffect, useRef } from "react";

/**
 * Cifra que cuenta desde cero cuando entra en pantalla.
 * El servidor siempre entrega el valor final, así que sin JavaScript, sin movimiento
 * (prefers-reduced-motion) o con la pestaña oculta el número correcto está a la vista.
 * Acepta formato argentino: "46.800", "0,41", "720 km", "89 %".
 */
const PATTERN = /^(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d+))?([\s\S]*)$/;

export function CountUp({ value, duration = 1500 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    const match = PATTERN.exec(value);
    if (!node || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = Number(`${match[1].replace(/\./g, "")}.${match[2] ?? "0"}`);
    const decimals = match[2]?.length ?? 0;
    const suffix = match[3];
    const format = (n: number) =>
      n.toLocaleString("es-AR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;

    let frame = 0;
    let fallback = 0;
    let started = false;

    const finish = () => {
      cancelAnimationFrame(frame);
      node.textContent = value;
    };

    const run = () => {
      started = true;
      const begin = performance.now();
      node.textContent = format(0);
      const tick = (now: number) => {
        const progress = Math.min(1, (now - begin) / duration);
        // ease-out exponencial: arranca rápido y se asienta
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        if (progress < 1) {
          node.textContent = format(target * eased);
          frame = requestAnimationFrame(tick);
        } else {
          finish();
        }
      };
      frame = requestAnimationFrame(tick);
      // Si el navegador pausa los cuadros (pestaña en segundo plano), igual termina en el valor correcto.
      fallback = window.setTimeout(finish, duration + 150);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !started) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
      node.textContent = value;
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="num">
      {value}
    </span>
  );
}
