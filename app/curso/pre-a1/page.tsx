"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const missions = [
  { id: "001", title: "The Colorful Forest", detail: "Explora objetos del bosque, sus colores y sus nombres en inglés." },
  { id: "002", title: "The Funny Kitchen", detail: "Descubre objetos de la cocina y practica sus nombres." },
  { id: "003", title: "The Magic Wardrobe", detail: "Aprende vocabulario de ropa con actividades variadas." },
  { id: "004", title: "Who Am I? (To Be)", detail: "Practica el verbo to be a través de una escena en el parque." },
  { id: "005", title: "My Toy Box", detail: "Explora los juguetes y el vocabulario de tu baúl." },
  { id: "006", title: "My Little House", detail: "Conoce habitaciones y muebles de la casa." },
  { id: "007", title: "Number Playground", detail: "Practica los números y su pronunciación." },
  { id: "008", title: "My Body", detail: "Aprende las partes del cuerpo con actividades interactivas." },
  { id: "009", title: "Funny Faces", detail: "Explora caras y emociones." },
  { id: "010", title: "Animal Babies", detail: "Descubre animales y sus nombres." },
];

export default function PreA1CoursePage() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [progressAvailable, setProgressAvailable] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/pre-a1/progress", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return null;
        return await response.json();
      })
      .then((data) => {
        if (!active || !data) return;
        setCompleted((data.progress ?? []).filter((item: { completed: number }) => Number(item.completed) === 1).map((item: { mission_number: number }) => Number(item.mission_number)));
        setProgressAvailable(true);
      })
      .catch(() => { if (active) setProgressAvailable(false); });
    return () => { active = false; };
  }, []);

  const nextMission = missions.find((mission) => !completed.includes(Number(mission.id))) ?? missions[9];

  return (
    <main className="mx-auto min-h-[70vh] max-w-5xl px-4 py-10 sm:px-6">
      <Link href="/inicio" className="text-sm font-bold text-blue-700 hover:underline">← Volver a mi campus</Link>
      <header className="mt-5 rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-amber-50 p-6 sm:p-8">
        <p className="text-sm font-extrabold uppercase tracking-widest text-sky-700">Curso Linguafly</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Inglés PRE-A1</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Diez misiones originales para empezar a familiarizarte con el inglés. Abre una misión para continuar con sus ilustraciones, audios y actividades.</p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500">
          <span>10 misiones · Nivel inicial</span>
          {progressAvailable && <span>· {completed.length} de 10 completadas</span>}
        </div>
        <Link href={`/curso/pre-a1/mision/${nextMission.id}`} className="mt-5 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-bold text-white">Continuar curso →</Link>
      </header>

      <section className="mt-8">
        <h2 className="text-xl font-black text-slate-950">Misiones del curso</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {missions.map((mission, index) => {
            const isComplete = completed.includes(Number(mission.id));
            return (
              <article key={mission.id} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-300 hover:shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-lg font-black text-sky-700">{index + 1}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Misión {mission.id}</p>
                      {isComplete ? <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">Completada</span> : <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">Pendiente</span>}
                    </div>
                    <h3 className="mt-1 text-lg font-extrabold text-slate-900">{mission.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{mission.detail}</p>
                    <Link href={`/curso/pre-a1/mision/${mission.id}`} className="mt-4 inline-flex font-bold text-blue-700 hover:underline">{isComplete ? "Volver a abrir" : "Abrir misión"} →</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
