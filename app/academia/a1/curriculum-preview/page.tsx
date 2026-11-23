import Link from "next/link";
import { previewMissions } from "@/content/a1-curriculum-preview";

export const metadata = {
  title: "Vista previa del currículo A1 · Linguafly Academy",
  description: "Previsualización de las misiones A1 001–039 y sus ocho secciones.",
  robots: { index: false, follow: false },
};

const canonical = [
  { id: "001", title: "Who Am I?", subtitle: "Datos personales", state: "Canónica" },
  { id: "002", title: "Nice to Meet You", subtitle: "Saludos y presentaciones", state: "Canónica" },
];

export default function A1CurriculumPreviewPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link href="/academia/a1" className="text-sm font-semibold text-indigo-700 hover:text-indigo-900">← Volver al curso A1</Link>
        <header className="mt-5 overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-900 p-7 text-white sm:p-10">
          <p className="text-xs font-extrabold uppercase tracking-[.2em] text-cyan-300">Linguafly Academy · Preview privado</p>
          <h1 className="mt-3 text-3xl font-black sm:text-5xl">Currículo A1 · Misiones 001–039</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-indigo-100">Vista de integración para revisar la estructura de las misiones, sus ocho secciones y la progresión del primer tramo del curso.</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-white/15 px-3 py-2">39 misiones</span>
            <span className="rounded-full bg-white/15 px-3 py-2">8 secciones por misión</span>
            <span className="rounded-full bg-amber-300/20 px-3 py-2 text-amber-100">Contenido en revisión</span>
          </div>
        </header>

        <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          <strong>Estado del contenido:</strong> las misiones 001 y 002 utilizan sus JSON canónicos actuales. Las misiones 003–039 muestran fichas curriculares propuestas a partir de la auditoría del material existente; todavía no sustituyen las actividades publicadas ni se consideran contenido canónico validado.
        </section>

        <section className="mt-9">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-xs font-bold uppercase tracking-[.16em] text-indigo-700">Contenido canónico</p><h2 className="mt-1 text-2xl font-black text-slate-950">Misiones 001–002</h2></div>
            <span className="text-sm text-slate-500">2 misiones</span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {canonical.map((mission) => (
              <Link key={mission.id} href={`/academia/a1/curriculum-preview/${mission.id}`} className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between gap-3"><span className="text-xs font-black tracking-widest text-emerald-700">MISIÓN {mission.id}</span><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">{mission.state}</span></div>
                <h3 className="mt-3 text-xl font-bold text-slate-950">{mission.title}</h3><p className="mt-1 text-sm text-slate-600">{mission.subtitle}</p>
                <span className="mt-5 inline-flex text-sm font-bold text-indigo-700">Ver misión y actividades →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-xs font-bold uppercase tracking-[.16em] text-indigo-700">Fichas curriculares propuestas</p><h2 className="mt-1 text-2xl font-black text-slate-950">Misiones 003–039</h2></div>
            <span className="text-sm text-slate-500">37 fichas para revisión</span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {previewMissions.map((mission) => (
              <Link key={mission.id} href={`/academia/a1/curriculum-preview/${mission.id}`} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md">
                <div className="flex items-center justify-between gap-2"><span className="text-xs font-black tracking-widest text-indigo-700">MISIÓN {mission.id}</span><span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">Propuesta</span></div>
                <h3 className="mt-3 text-lg font-bold text-slate-950">{mission.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{mission.subtitle}</p>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{mission.goal}</p>
                <span className="mt-5 inline-flex text-sm font-bold text-indigo-700 group-hover:text-indigo-900">Revisar ficha →</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
