"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Student = { id: number; email: string };

export default function InicioPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (active) setStudent(data.student ?? null);
      })
      .catch(() => {
        if (active) setStudent(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  if (loading) return <main className="mx-auto max-w-5xl px-5 py-24 text-center text-slate-500">Cargando tu campus…</main>;

  if (!student) return (
    <main className="mx-auto max-w-xl px-5 py-20 text-center">
      <h1 className="text-3xl font-black text-slate-950">Tu campus Linguafly</h1>
      <p className="mt-3 text-slate-600">Inicia sesión para acceder a tu curso PRE-A1.</p>
      <Link href="/iniciar-sesion" className="mt-6 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-bold text-white">Iniciar sesión</Link>
    </main>
  );

  return (
    <main className="mx-auto min-h-[70vh] max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-700">Linguafly · Mi campus</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">¡Bienvenido/a!</h1>
          <p className="mt-2 text-slate-600">Tu espacio para aprender inglés paso a paso.</p>
        </div>
        <nav className="flex flex-wrap gap-2 text-sm font-bold">
          <Link href="/mi-cuenta" className="rounded-lg border px-3 py-2">Mi cuenta</Link>
          <Link href="/mi-cuenta/soporte" className="rounded-lg border px-3 py-2">Soporte</Link>
        </nav>
      </header>

      <section className="overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-amber-50 p-6 sm:p-9">
        <div className="max-w-2xl">
          <p className="text-sm font-extrabold uppercase tracking-wider text-sky-700">Tu curso disponible</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Inglés PRE-A1</h2>
          <p className="mt-3 text-slate-600">Empieza desde cero con diez misiones ilustradas e interactivas. Puedes avanzar a tu ritmo y continuar donde lo dejaste.</p>
          <Link href="/curso/pre-a1" className="mt-6 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-extrabold text-white shadow-sm transition hover:bg-blue-800">Entrar en mi curso <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <h3 className="font-bold text-slate-900">Un recorrido claro</h3>
          <p className="mt-2 text-sm text-slate-600">Diez misiones, en orden, con sus actividades y recursos originales.</p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <h3 className="font-bold text-slate-900">Tu progreso</h3>
          <p className="mt-2 text-sm text-slate-600">Consulta qué misiones has completado y cuál puedes continuar.</p>
        </div>
      </section>
    </main>
  );
}
