"use client";

import { useEffect, useState } from "react";

interface CourseAdProps { variant: "mid" | "end"; }

export default function CourseAd({ variant }: CourseAdProps) {
  const [hasAccount, setHasAccount] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: any) => {
        if (!active) return;
        const student = data?.student;
        setHasAccount(Boolean(student));
        setIsPro(student?.plan === "pro");
      })
      .catch(() => {
        if (active) { setHasAccount(false); setIsPro(false); }
      })
      .finally(() => { if (active) setSessionChecked(true); });
    return () => { active = false; };
  }, []);

  if (!sessionChecked || isPro) return null;
  const ctaHref = hasAccount ? "/suscripcion" : "/crear-cuenta";
  const ctaLabel = hasAccount ? "Hazte Pro →" : "Empezar gratis →";

  if (variant === "mid") {
    return (
      <aside aria-label="Curso recomendado de LinguaFly" className="relative my-14 rounded-[1.4rem] bg-gradient-to-br from-blue-400 via-indigo-300 to-violet-300 p-[1px] shadow-lg shadow-blue-950/5">
        <div className="rounded-[1.35rem] bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 sm:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-700 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-white shadow-sm">✦ Recomendado</div>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-black leading-snug tracking-tight text-slate-950 sm:text-2xl">Deja de leer sobre apps y empieza a hablar inglés</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">Nuestro tutor de IA escucha tu voz, te corrige y te guía frase a frase. Practica desde A1 hasta C2 con speaking y ejercicios.</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-800">✓ Sin tarjeta</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-800">✓ 5 unidades gratis</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-800">✓ Progreso guardado</span>
              </div>
            </div>
            <div className="w-full shrink-0 sm:w-48">
              <a href={ctaHref} className="block rounded-xl bg-blue-700 px-5 py-4 text-center font-extrabold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg">{ctaLabel}</a>
              <p className="mt-2 text-center text-xs text-slate-500">Empieza a tu ritmo</p>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside aria-label="Empieza a aprender inglés con LinguaFly" className="my-14 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl shadow-blue-950/10">
      <div className="bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-900 px-6 py-10 text-center text-white sm:px-10 sm:py-12">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-200">Tu camino para hablar inglés</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">Empieza hoy con LinguaFly</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-blue-100">Practica speaking con un tutor de IA, ejercicios interactivos y progreso guardado. Todo en una sola plataforma.</p>
      </div>
      <div className="grid gap-px bg-slate-100 sm:grid-cols-2">
        {[
          ["🎙️", "Tutor de IA que te escucha", "Habla en inglés y recibe orientación y correcciones para mejorar tus respuestas."],
          ["📚", "6 niveles, de A1 a C2", "Avanza desde principiante hasta un dominio avanzado del idioma."],
          ["💬", "Cursos de speaking A1–C2", "Frases, conversaciones y prácticas para ganar soltura al hablar."],
          ["✏️", "Ejercicios A1–C2", "Refuerza gramática, vocabulario, reading y listening."],
        ].map(([icon, heading, description]) => (
          <div key={heading} className="bg-white p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="text-3xl" aria-hidden="true">{icon}</span>
              <div><p className="font-extrabold text-slate-900">{heading}</p><p className="mt-1.5 text-sm leading-6 text-slate-600">{description}</p></div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 bg-slate-50 px-6 py-7 text-center sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:text-left">
        <div>
          <p className="text-2xl font-black tracking-tight text-slate-950">{hasAccount ? "Pro desde 7,99 €/mes" : "Gratis para empezar"}</p>
          <p className="mt-1 text-sm text-slate-500">{hasAccount ? "También disponible el plan anual por 59,99 € · Cancela cuando quieras" : "5 unidades gratis por curso · Sin tarjeta de crédito"}</p>
        </div>
        <a href={ctaHref} className="shrink-0 rounded-xl bg-blue-700 px-8 py-4 text-center font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg">{hasAccount ? "Hazte Pro ahora →" : "Crear cuenta gratis →"}</a>
      </div>
    </aside>
  );
}
