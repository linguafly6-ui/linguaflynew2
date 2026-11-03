"use client";

import { useEffect, useState } from "react";

interface CourseAdProps {
  variant: "mid" | "end";
}

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
        if (active) {
          setHasAccount(false);
          setIsPro(false);
        }
      })
      .finally(() => {
        if (active) setSessionChecked(true);
      });

    return () => {
      active = false;
    };
  }, []);

  // Evita mostrar anuncios brevemente a alumnos Pro mientras se comprueba la sesión.
  if (!sessionChecked || isPro) return null;

  const ctaHref = hasAccount ? "/suscripcion" : "/crear-cuenta";
  const ctaLabel = hasAccount ? "Hazte Pro →" : "Empezar gratis →";

  if (variant === "mid") {
    return (
      <aside aria-label="Curso recomendado de LinguaFly" className="my-10 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">🎯 Curso recomendado</p>
            <h2 className="mt-2 text-xl font-bold leading-snug text-slate-950">
              Deja de leer sobre apps y empieza a hablar inglés
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Nuestro tutor de IA escucha tu voz, te corrige y te guía frase a frase.
              Practica desde A1 hasta C2 con speaking y ejercicios. Sin tarjeta y sin compromiso.
            </p>
          </div>
          <div className="w-full shrink-0 sm:w-48">
            <a href={ctaHref} className="block rounded-xl bg-blue-600 px-5 py-3.5 text-center font-bold text-white shadow-sm transition hover:bg-blue-700">
              {ctaLabel}
            </a>
            <p className="mt-2 text-center text-xs text-slate-600">5 unidades gratis por curso · Sin tarjeta</p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside aria-label="Empieza a aprender inglés con LinguaFly" className="my-10 overflow-hidden rounded-2xl border border-blue-200 shadow-md">
      <div className="bg-gradient-to-br from-blue-700 to-indigo-800 p-6 text-white sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-100">LinguaFly · Speaking + ejercicios</p>
        <h2 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">
          {hasAccount ? "Desbloquea todos los cursos de LinguaFly" : "Tu camino para hablar inglés con confianza"}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-blue-100">
          {hasAccount
            ? "Pasa a Pro y continúa tu aprendizaje con todos los niveles y unidades."
            : "Crea tu cuenta gratis y empieza a practicar hoy mismo, a tu ritmo."}
        </p>
      </div>

      <div className="grid gap-8 bg-white p-6 sm:grid-cols-2 sm:p-8">
        <section>
          <h3 className="mb-4 text-lg font-bold text-slate-950">¿Por qué LinguaFly?</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="text-2xl" aria-hidden="true">🎙️</span>
              <div>
                <p className="font-semibold text-slate-900">Tutor de IA que te escucha</p>
                <p className="text-sm leading-6 text-slate-600">Habla en inglés y recibe orientación y correcciones para mejorar tus respuestas.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <div>
                <p className="font-semibold text-slate-900">6 niveles, de A1 a C2</p>
                <p className="text-sm leading-6 text-slate-600">Avanza desde principiante hasta un dominio avanzado del idioma.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl" aria-hidden="true">🔊</span>
              <div>
                <p className="font-semibold text-slate-900">Práctica de listening y speaking</p>
                <p className="text-sm leading-6 text-slate-600">Combina escucha, repetición y conversación para consolidar lo aprendido.</p>
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-lg font-bold text-slate-950">Lo que incluye</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="text-2xl" aria-hidden="true">💬</span>
              <div>
                <p className="font-semibold text-slate-900">Cursos de speaking A1–C2</p>
                <p className="text-sm leading-6 text-slate-600">Frases, conversaciones y prácticas para ganar soltura al hablar.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl" aria-hidden="true">✏️</span>
              <div>
                <p className="font-semibold text-slate-900">Ejercicios A1–C2</p>
                <p className="text-sm leading-6 text-slate-600">Refuerza gramática, vocabulario, reading y listening.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl" aria-hidden="true">📊</span>
              <div>
                <p className="font-semibold text-slate-900">Progreso guardado</p>
                <p className="text-sm leading-6 text-slate-600">Consulta tu avance cuando vuelvas a entrar en tu cuenta.</p>
              </div>
            </li>
          </ul>
        </section>
      </div>

      <div className="flex flex-col gap-4 bg-slate-50 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-xl font-black text-slate-950">{hasAccount ? "Pro desde 7,99 €/mes" : "Gratis para empezar"}</p>
          <p className="mt-1 text-sm text-slate-600">
            {hasAccount
              ? "También disponible el plan anual por 59,99 € · Cancela cuando quieras"
              : "5 unidades gratis por curso · Sin tarjeta de crédito"}
          </p>
        </div>
        <a href={ctaHref} className="rounded-xl bg-blue-600 px-7 py-3.5 text-center font-bold text-white shadow-sm transition hover:bg-blue-700">
          {hasAccount ? "Hazte Pro ahora →" : "Crear cuenta gratis →"}
        </a>
      </div>
    </aside>
  );
}
