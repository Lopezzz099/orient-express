/**
 * Piezas de interfaz repetidas, centralizadas.
 * Regla: la clase base no define fondo ni color de borde.
 * Cada variante trae su propio fondo y borde para que ninguna pise a otra.
 */

export type ButtonVariant = "primary" | "accent" | "outline" | "inverse" | "outlineInverse";
export type ButtonSize = "sm" | "md" | "lg";

const buttonBase =
  "inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-sm border font-semibold " +
  "whitespace-nowrap transition-colors duration-200 ease-out-quart " +
  "disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-petrol-700 border-petrol-700 text-white hover:bg-petrol-900 hover:border-petrol-900",
  accent:
    "bg-signal-500 border-signal-500 text-ink-950 hover:bg-signal-400 hover:border-signal-400",
  outline:
    "bg-paper border-ink-950 text-ink-950 hover:bg-ink-950 hover:text-white",
  inverse:
    "bg-white border-white text-ink-950 hover:bg-petrol-100 hover:border-petrol-100",
  outlineInverse:
    "bg-ink-950/40 border-white/70 text-white hover:bg-white hover:border-white hover:text-ink-950",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-[0.9375rem]",
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-12 px-6 text-base",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra = "",
): string {
  return [buttonBase, buttonVariants[variant], buttonSizes[size], extra]
    .filter(Boolean)
    .join(" ");
}

/** Enlace de texto con subrayado, para párrafos y listas. */
export const textLink =
  "font-medium text-petrol-700 underline decoration-petrol-700/40 underline-offset-4 " +
  "transition-colors duration-200 hover:text-petrol-900 hover:decoration-petrol-900";

/** Variante para fondos oscuros. */
export const textLinkInverse =
  "font-medium text-white underline decoration-white/50 underline-offset-4 " +
  "transition-colors duration-200 hover:text-signal-500 hover:decoration-signal-500";

/** Contenedor de página con el gutter fluido. */
export const pageContainer = "mx-auto w-full max-w-page px-gutter";

/** Campos de formulario. Cada estado define su propio borde y fondo. */
export const fieldBase =
  "block w-full min-h-12 rounded-sm border bg-white px-3.5 py-2.5 text-base text-ink-950 " +
  "placeholder:text-ink-600 transition-colors duration-200 hover:border-ink-600 " +
  "focus-visible:border-petrol-700";
export const fieldOk = "border-ink-300";
export const fieldError = "border-danger bg-danger-soft";

export const fieldLabel = "mb-1.5 block text-[0.9375rem] font-semibold text-ink-950";
export const fieldHint = "mt-1.5 text-label text-ink-600";
export const fieldErrorText = "mt-1.5 text-[0.9375rem] font-medium text-danger";

/** Etiqueta pequeña de estado o categoría (no es un eyebrow de sección). */
export const tag =
  "inline-flex items-center rounded-sm border border-line bg-mist px-2 py-0.5 text-label font-medium text-ink-800";
