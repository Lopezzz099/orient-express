"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Alert, Check } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { fieldBase, fieldError, fieldErrorText, fieldHint, fieldLabel, fieldOk } from "@/lib/ui";

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "select" | "textarea";
  required?: boolean;
  autoComplete?: string;
  hint?: string;
  options?: { value: string; label: string }[];
  minLength?: number;
  /** Mensaje cuando el campo obligatorio está vacío. */
  emptyMessage?: string;
};

type Values = Record<string, string>;
type Errors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateField(field: FieldDef, raw: string): string {
  const value = raw.trim();
  if (!value) {
    return field.required ? (field.emptyMessage ?? `Completá el campo «${field.label}».`) : "";
  }
  if (field.type === "email" && !EMAIL.test(value)) {
    return "El correo no parece completo. Revisá que tenga @ y un dominio, por ejemplo nombre@empresa.com.";
  }
  if (field.type === "url") {
    try {
      const url = new URL(value);
      if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("protocolo");
    } catch {
      return "El enlace debe empezar con http:// o https://, por ejemplo https://linkedin.com/in/tu-perfil.";
    }
  }
  if (field.type === "tel" && value.replace(/\D/g, "").length < 8) {
    return "El teléfono parece corto. Incluí el código de área, por ejemplo 299 555 0100.";
  }
  if (field.minLength && value.length < field.minLength) {
    return `Escribí al menos ${field.minLength} caracteres. Ahora tiene ${value.length}.`;
  }
  return "";
}

export function ContactForm({
  fields,
  submitLabel,
  successTitle,
  successText,
  presets = {},
}: {
  fields: FieldDef[];
  submitLabel: string;
  successTitle: string;
  successText: string;
  /** Valores que el sitio completa desde afuera (por ejemplo, la vacante elegida). */
  presets?: Values;
}) {
  const uid = useId();
  const summaryRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Values>(() => Object.fromEntries(fields.map((f) => [f.name, presets[f.name] ?? ""])));
  const [errors, setErrors] = useState<Errors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  // Se compara por contenido: el objeto `presets` puede ser nuevo en cada render del padre.
  const presetKey = JSON.stringify(presets);
  const [lastPresetKey, setLastPresetKey] = useState(presetKey);

  // Si cambia un valor preestablecido desde afuera, se refleja en el campo (ajuste durante el render).
  if (lastPresetKey !== presetKey) {
    const previous: Values = JSON.parse(lastPresetKey);
    setLastPresetKey(presetKey);
    const next = { ...values };
    let changed = false;
    for (const [key, value] of Object.entries(presets)) {
      if (value !== previous[key] && key in next) {
        next[key] = value;
        changed = true;
      }
    }
    if (changed) {
      setValues(next);
      setErrors((current) => {
        const copy = { ...current };
        for (const key of Object.keys(presets)) delete copy[key];
        return copy;
      });
    }
  }

  const idOf = (name: string) => `${uid}-${name}`;

  function onChange(field: FieldDef, value: string) {
    setValues((current) => ({ ...current, [field.name]: value }));
    // Si el campo ya mostraba un error, se revalida mientras escribe para que el mensaje desaparezca apenas se corrige.
    if (errors[field.name]) {
      setErrors((current) => ({ ...current, [field.name]: validateField(field, value) }));
    }
  }

  function onBlur(field: FieldDef) {
    setErrors((current) => ({ ...current, [field.name]: validateField(field, values[field.name] ?? "") }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {};
    for (const field of fields) {
      const message = validateField(field, values[field.name] ?? "");
      if (message) nextErrors[field.name] = message;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setShowSummary(true);
      // El resumen recibe el foco para que lectores de pantalla y teclado lo encuentren enseguida.
      window.setTimeout(() => summaryRef.current?.focus(), 0);
      return;
    }
    setShowSummary(false);
    setStatus("sending");
    // Sitio de demostración: no hay servidor al que enviar. Se simula la respuesta.
    window.setTimeout(() => setStatus("sent"), 900);
  }

  function reset() {
    setValues(Object.fromEntries(fields.map((f) => [f.name, presets[f.name] ?? ""])));
    setErrors({});
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div role="status" className="border border-ok bg-ok-soft p-6 text-ink-950">
        <p className="flex items-center gap-2 text-h3 font-semibold text-ok">
          <Check className="size-6 shrink-0" />
          {successTitle}
        </p>
        <p className="mt-3">{successText}</p>
        <p className="mt-3 text-[0.9375rem] text-ink-600">
          Este es un sitio de demostración: el mensaje no se envió a ninguna casilla real.
        </p>
        <Button variant="outline" className="mt-5" onClick={reset}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  const errorEntries = fields.filter((f) => errors[f.name]);

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={status === "sending"} className="space-y-6">
      {showSummary && errorEntries.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border border-danger bg-danger-soft p-5 text-ink-950 focus-visible:outline-offset-4"
        >
          <p className="flex items-center gap-2 font-semibold text-danger">
            <Alert className="size-5 shrink-0" />
            {errorEntries.length === 1 ? "Hay un dato para corregir" : `Hay ${errorEntries.length} datos para corregir`}
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {errorEntries.map((field) => (
              <li key={field.name}>
                <a href={`#${idOf(field.name)}`} className="font-medium underline underline-offset-4">
                  {field.label}
                </a>
                : {errors[field.name]}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="text-[0.9375rem] text-ink-600">
        Los campos marcados con <span aria-hidden="true">*</span>
        <span className="sr-only">asterisco</span> son obligatorios.
      </p>

      {fields.map((field) => {
        const id = idOf(field.name);
        const error = errors[field.name];
        const describedBy = [field.hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
        const common = {
          id,
          name: field.name,
          value: values[field.name] ?? "",
          required: field.required,
          "aria-required": field.required || undefined,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": describedBy,
          autoComplete: field.autoComplete,
          onBlur: () => onBlur(field),
          className: `${fieldBase} ${error ? fieldError : fieldOk}`,
        };
        return (
          <div key={field.name}>
            <label htmlFor={id} className={fieldLabel}>
              {field.label}
              {field.required ? (
                <span aria-hidden="true" className="ml-1 text-danger">
                  *
                </span>
              ) : (
                <span className="ml-2 text-label font-normal text-ink-600">(opcional)</span>
              )}
            </label>
            {field.type === "textarea" ? (
              <textarea {...common} rows={6} onChange={(e) => onChange(field, e.target.value)} className={`${common.className} min-h-36 resize-y`} />
            ) : field.type === "select" ? (
              <select {...common} onChange={(e) => onChange(field, e.target.value)}>
                <option value="">Elegí una opción</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...common}
                type={field.type}
                inputMode={field.type === "tel" ? "tel" : field.type === "email" ? "email" : undefined}
                spellCheck={field.type === "text" ? undefined : false}
                onChange={(e) => onChange(field, e.target.value)}
              />
            )}
            {field.hint ? (
              <p id={`${id}-hint`} className={fieldHint}>
                {field.hint}
              </p>
            ) : null}
            {error ? (
              <p id={`${id}-error`} className={fieldErrorText}>
                <span className="sr-only">Error: </span>
                {error}
              </p>
            ) : null}
          </div>
        );
      })}

      <Button type="submit" variant="primary" size="lg" disabled={status === "sending"} className="w-full tablet:w-auto">
        {status === "sending" ? "Enviando…" : submitLabel}
      </Button>
    </form>
  );
}
