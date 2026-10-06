"use client";

import { useId, useMemo, useRef, useState } from "react";
import { ContactForm, type FieldDef } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { jobAreas, jobLocations, jobs, type JobArea, type JobLocation } from "@/lib/jobs";
import { fieldBase, fieldLabel, fieldOk, tag } from "@/lib/ui";

const SPONTANEOUS = "espontanea";

export function CareersBoard() {
  const uid = useId();
  const [area, setArea] = useState<JobArea | "">("");
  const [location, setLocation] = useState<JobLocation | "">("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>("");
  const formRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () => jobs.filter((job) => (!area || job.area === area) && (!location || job.location === location)),
    [area, location],
  );

  const fields: FieldDef[] = useMemo(
    () => [
      { name: "nombre", label: "Nombre y apellido", type: "text", required: true, autoComplete: "name", emptyMessage: "Escribí tu nombre y apellido." },
      {
        name: "email",
        label: "Correo electrónico",
        type: "email",
        required: true,
        autoComplete: "email",
        emptyMessage: "Escribí tu correo para que Talento pueda contactarte.",
      },
      {
        name: "vacante",
        label: "Vacante",
        type: "select",
        required: true,
        emptyMessage: "Elegí la vacante a la que te postulás, o la opción de postulación espontánea.",
        options: [
          ...jobs.map((job) => ({ value: job.id, label: `${job.title} (${job.location})` })),
          { value: SPONTANEOUS, label: "Postulación espontánea" },
        ],
      },
      {
        name: "perfil",
        label: "Enlace a tu perfil o CV",
        type: "url",
        hint: "Por ejemplo, un perfil profesional en línea o un documento compartido.",
      },
      {
        name: "mensaje",
        label: "Presentación",
        type: "textarea",
        required: true,
        minLength: 40,
        hint: "Contanos tu experiencia en pocas líneas, con al menos 40 caracteres.",
        emptyMessage: "Escribí una breve presentación con tu experiencia.",
      },
    ],
    [],
  );

  function apply(id: string) {
    setSelected(id);
    formRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("select, input")?.focus({ preventScroll: true }));
  }

  return (
    <div className="space-y-20">
      <div>
        <div className="grid gap-4 tablet:grid-cols-2 tablet:gap-6 laptop:max-w-3xl">
          <div>
            <label htmlFor={`${uid}-area`} className={fieldLabel}>
              Área
            </label>
            <select id={`${uid}-area`} value={area} onChange={(e) => setArea(e.target.value as JobArea | "")} className={`${fieldBase} ${fieldOk}`}>
              <option value="">Todas las áreas</option>
              {jobAreas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${uid}-loc`} className={fieldLabel}>
              Lugar de trabajo
            </label>
            <select
              id={`${uid}-loc`}
              value={location}
              onChange={(e) => setLocation(e.target.value as JobLocation | "")}
              className={`${fieldBase} ${fieldOk}`}
            >
              <option value="">Todos los lugares</option>
              {jobLocations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p role="status" aria-live="polite" className="mt-6 text-[0.9375rem] font-medium text-ink-600">
          {visible.length === 1 ? "1 vacante abierta" : `${visible.length} vacantes abiertas`}
          {area || location ? " con los filtros elegidos" : ""}
        </p>

        {visible.length === 0 ? (
          <div className="mt-6 border border-line bg-mist p-6">
            <p className="font-semibold">No hay vacantes con esa combinación.</p>
            <p className="mt-1 text-ink-600">Probá con otra área o lugar, o enviá una postulación espontánea desde el formulario.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setArea("");
                setLocation("");
              }}
            >
              Quitar filtros
            </Button>
          </div>
        ) : (
          <ul className="mt-4 border-b border-line">
            {visible.map((job) => {
              const open = openId === job.id;
              const panelId = `${uid}-${job.id}`;
              return (
                <li key={job.id} className="border-t border-line py-6">
                  <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
                    <div className="min-w-0 flex-1 basis-80">
                      <h3 className="text-h3">{job.title}</h3>
                      <p className="mt-2 flex flex-wrap items-center gap-2 text-[0.9375rem] text-ink-600">
                        <span className={tag}>{job.area}</span>
                        <span>{job.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>{job.schedule}</span>
                      </p>
                      <p className="mt-3 max-w-prose text-ink-600">{job.summary}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenId(open ? null : job.id)}>
                        {open ? "Ocultar requisitos" : "Ver requisitos"}
                      </Button>
                      <Button variant="primary" onClick={() => apply(job.id)} aria-label={`Postularme a ${job.title}`}>
                        Postularme
                      </Button>
                    </div>
                  </div>
                  <div id={panelId} hidden={!open} className="mt-5 max-w-prose bg-mist p-5">
                    <p className="font-semibold">Requisitos</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-900">
                      {job.requirements.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[0.9375rem] text-ink-600">
                      Publicada el <time dateTime={job.posted}>{formatDate(job.posted)}</time>.
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div ref={formRef} id="postulacion" className="scroll-mt-28 grid gap-10 laptop:grid-cols-[1fr_1.4fr] laptop:gap-20">
        <div>
          <h2 className="text-h2">Postulate</h2>
          <p className="mt-4 max-w-prose font-serif text-lede text-ink-600">
            Elegí una vacante con el botón «Postularme» o enviá una postulación espontánea. El equipo de Talento revisa cada mensaje.
          </p>
        </div>
        <div className="max-w-2xl">
          <ContactForm
            fields={fields}
            presets={{ vacante: selected }}
            submitLabel="Enviar postulación"
            successTitle="Recibimos tu postulación"
            successText="El equipo de Talento revisará tu perfil y te escribirá si avanzás en el proceso."
          />
        </div>
      </div>
    </div>
  );
}
