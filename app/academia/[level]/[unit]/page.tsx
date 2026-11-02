import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseUnit } from "@/lib/academy";
export const dynamic = "force-dynamic";
export default async function UnitPage({ params }: { params: Promise<{ level: string; unit: string }> }) {
  const { level, unit } = await params;
  const number = Number.parseInt(unit, 10);
  if (!Number.isInteger(number) || String(number) !== unit) notFound();
  const data = await getCourseUnit(level, number);
  if (!data) notFound();
  const grouped = new Map<string, Record<string, unknown>[]>();
  for (const exercise of data.exercises) {
    const key = String(exercise.section_id);
    grouped.set(key, [...(grouped.get(key) ?? []), exercise]);
  }
  return <main className="mx-auto min-h-screen max-w-5xl px-6 py-12"><Link href={`/academia/${level.toLowerCase()}`} className="font-bold text-blue-700">← {level.toUpperCase()} units</Link><h1 className="mt-8 text-4xl font-black">{String(data.unit.title)}</h1><p className="mt-2 text-sm text-slate-500">Unit {number} · {String(data.unit.status)}</p>
    <div className="mt-8 space-y-8">{[...grouped.entries()].map(([id, exercises]) => <section key={id} className="rounded-2xl border bg-white p-6"><h2 className="text-xl font-bold">{String(exercises[0].section_title)}</h2><p className="mt-1 text-sm text-slate-500">{String(exercises[0].section_instructions || "")}</p><div className="mt-5 space-y-4">{exercises.map(ex => <div key={String(ex.exercise_id)} className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase text-blue-700">{String(ex.exercise_type_id)}</p><h3 className="mt-2 font-semibold">{String(ex.exercise_title || ex.exercise_instructions || "Exercise")}</h3><pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-xs text-slate-600">{String(ex.content_json)}</pre></div>)}</div></section>)}</div>
  </main>;
}
