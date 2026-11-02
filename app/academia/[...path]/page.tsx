import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseUnit, getCourseUnits } from "@/lib/academy";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ path: string[] }> };

export default async function AcademyPathPage({ params }: Props) {
  const { path } = await params;

  if (path.length === 1) {
    const level = path[0];
    const units = await getCourseUnits(level);
    if (!units.length) notFound();

    return (
      <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">
        <Link href="/academia" className="font-bold text-blue-700">← Academy</Link>
        <h1 className="mt-8 text-4xl font-black">{level.toUpperCase()} course</h1>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {units.map((unit: any) => (
            <Link key={unit.unit_id} href={`/academia/${level.toLowerCase()}/${unit.unit_number}`} className="rounded-xl border bg-white p-5">
              <div className="flex justify-between gap-3">
                <h2 className="font-bold">Unit {unit.unit_number}: {unit.title}</h2>
                <span className="text-xs text-slate-400">{unit.status}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    );
  }

  if (path.length === 2) {
    const [level, unit] = path;
    const number = Number.parseInt(unit, 10);
    if (!Number.isInteger(number) || String(number) !== unit) notFound();
    const data = await getCourseUnit(level, number);
    if (!data) notFound();

    const grouped = new Map<string, Record<string, unknown>[]>();
    for (const exercise of data.exercises) {
      const key = String(exercise.section_id);
      grouped.set(key, [...(grouped.get(key) ?? []), exercise]);
    }

    return (
      <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">
        <Link href={`/academia/${level.toLowerCase()}`} className="font-bold text-blue-700">← {level.toUpperCase()} units</Link>
        <h1 className="mt-8 text-4xl font-black">{String(data.unit.title)}</h1>
        <p className="mt-2 text-sm text-slate-500">Unit {number} · {String(data.unit.status)}</p>
        <div className="mt-8 space-y-8">
          {[...grouped.entries()].map(([id, exercises]) => (
            <section key={id} className="rounded-2xl border bg-white p-6">
              <h2 className="text-xl font-bold">{String(exercises[0].section_title)}</h2>
              <p className="mt-1 text-sm text-slate-500">{String(exercises[0].section_instructions || "")}</p>
              <div className="mt-5 space-y-4">
                {exercises.map((exercise) => (
                  <div key={String(exercise.exercise_id)} className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase text-blue-700">{String(exercise.exercise_type_id)}</p>
                    <h3 className="mt-2 font-semibold">{String(exercise.exercise_title || exercise.exercise_instructions || "Exercise")}</h3>
                    <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-xs text-slate-600">{String(exercise.content_json)}</pre>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    );
  }

  notFound();
}
