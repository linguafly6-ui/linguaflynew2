import Link from "next/link";
import { notFound } from "next/navigation";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import mission001 from "@/content/canonical-missions/a1/001.json";
import mission002 from "@/content/canonical-missions/a1/002.json";
import { getPreviewMission, previewMissions } from "@/content/a1-curriculum-preview";

const canonicalMissions: Record<string, Mission> = {
  "001": mission001 as Mission,
  "002": mission002 as Mission,
};
const ids = ["001", "002", ...previewMissions.map((mission) => mission.id)];

export const dynamicParams = false;
export function generateStaticParams() {
  return ids.map((mission) => ({ mission }));
}
export async function generateMetadata({ params }: { params: Promise<{ mission: string }> }) {
  const { mission } = await params;
  const canonical = canonicalMissions[mission];
  const proposed = getPreviewMission(mission);
  if (!canonical && !proposed) return {};
  const title = canonical?.mission.title ?? proposed?.title;
  return { title: `${title} · Vista previa A1 · Linguafly Academy`, robots: { index: false, follow: false } };
}

const previous = (id: string) => String(Number(id) - 1).padStart(3, "0");
const next = (id: string) => String(Number(id) + 1).padStart(3, "0");

export default async function A1CurriculumPreviewMission({ params }: { params: Promise<{ mission: string }> }) {
  const { mission } = await params;
  if (!ids.includes(mission)) notFound();
  const canonical = canonicalMissions[mission];
  const proposed = getPreviewMission(mission);
  const title = canonical?.mission.title ?? proposed?.title ?? `Misión ${mission}`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/academia/a1/curriculum-preview" className="text-sm font-semibold text-indigo-700 hover:text-indigo-900">← Todas las misiones de la vista previa</Link>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-indigo-700">Linguafly Academy · A1 · Misión {mission}</p><h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">{title}</h1></div>
          <span className={canonical ? "rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-800" : "rounded-full bg-amber-100 px-3 py-2 text-xs font-bold text-amber-900"}>{canonical ? "Contenido canónico" : "Propuesta curricular"}</span>
        </div>

        {canonical ? (
          <div className="mt-6"><CanonicalMission missionData={canonical} /></div>
        ) : proposed ? (
          <>
            <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-bold text-amber-950">Ficha curricular en revisión</p>
              <p className="mt-2 text-sm leading-6 text-amber-900">{proposed.audit}</p>
            </section>
            <section className="mt-5 rounded-2xl bg-gradient-to-br from-indigo-950 to-blue-900 p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-cyan-300">Objetivo comunicativo</p>
              <p className="mt-2 text-lg leading-8">{proposed.goal}</p>
            </section>
            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-xl font-black text-slate-950">Vocabulario</h2>
              <div className="mt-4 flex flex-wrap gap-2">{proposed.vocabulary.map((word) => <span key={word} className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">{word}</span>)}</div>
              <h3 className="mt-6 text-lg font-bold text-slate-950">Gramática y estructuras</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">{proposed.grammar.map((item) => <li key={item} className="rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-950">{item}</li>)}</ul>
            </section>
            <section className="mt-7">
              <div><p className="text-xs font-bold uppercase tracking-[.16em] text-indigo-700">Recorrido didáctico</p><h2 className="mt-1 text-2xl font-black text-slate-950">Las ocho secciones</h2><p className="mt-1 text-sm text-slate-500">Cada sección presenta el foco y las actividades previstas para esta misión.</p></div>
              <div className="mt-4 grid gap-3">
                {proposed.sections.map((section, index) => (
                  <details key={section.name} open={index === 0} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4"><div><span className="text-xs font-black tracking-widest text-indigo-700">0{index + 1}</span><h3 className="mt-1 text-lg font-bold text-slate-950">{section.name}</h3><p className="mt-1 text-sm text-slate-600">{section.focus}</p></div><span className="rounded-full bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-800 group-open:rotate-45">+</span></summary>
                    <ul className="mt-4 grid gap-2 border-t border-slate-100 pt-4">{section.activities.map((activity) => <li key={activity} className="flex gap-2 text-sm leading-6 text-slate-700"><span className="font-bold text-indigo-600">•</span><span>{activity}</span></li>)}</ul>
                  </details>
                ))}
              </div>
            </section>
          </>
        ) : null}

        <nav className="mt-8 flex items-center justify-between gap-3 border-t border-slate-200 pt-5">
          {mission !== "001" ? <Link href={`/academia/a1/curriculum-preview/${previous(mission)}`} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-indigo-300">← Misión anterior</Link> : <span />}
          {mission !== "014" ? <Link href={`/academia/a1/curriculum-preview/${next(mission)}`} className="rounded-xl bg-indigo-700 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-800">Misión siguiente →</Link> : <Link href="/academia/a1/curriculum-preview" className="rounded-xl bg-indigo-700 px-4 py-3 text-sm font-semibold text-white">Volver al índice →</Link>}
        </nav>
      </div>
    </main>
  );
}
