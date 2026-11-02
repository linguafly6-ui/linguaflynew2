import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseUnit, getCourseUnits } from "@/lib/academy";
import ExerciseCard from "@/components/academy/ExerciseCard";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ path: string[] }> };
type ExerciseContent = {
  prompt?: string;
  options?: string[];
  stimulus?: string;
  sentence?: string;
};

function safeExerciseContent(raw: unknown): ExerciseContent {
  try {
    const parsed = JSON.parse(String(raw ?? "{}")) as Record<string, unknown>;
    return {
      prompt: typeof parsed.prompt === "string" ? parsed.prompt : undefined,
      options: Array.isArray(parsed.options) ? parsed.options.filter((value): value is string => typeof value === "string").slice(0, 8) : undefined,
      stimulus: typeof parsed.stimulus === "string" ? parsed.stimulus : undefined,
      sentence: typeof parsed.sentence === "string" ? parsed.sentence : undefined,
    };
  } catch {
    return {};
  }
}

export default async function AcademyPathPage({ params }: Props) {
  const { path = [] } = await params;

  if (path.length === 1) {
    const level = path[0];
    const units = await getCourseUnits(level);
    if (!units.length) notFound();
    return (
      <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">
        <Link href="/academia" className="font-bold text-blue-700">← Academy</Link>
        <h1 className="mt-8 text-4xl font-black">{level.toUpperCase()} course</h1>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {units.map((unit) => (
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

    const grouped = new Map<string, typeof data.exercises>();
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
                  <ExerciseCard
                    key={String(exercise.exercise_id)}
                    exerciseId={String(exercise.exercise_id)}
                    level={level}
                    unit={unit}
                    title={String(exercise.exercise_title || exercise.exercise_instructions || "Exercise")}
                    exerciseType={String(exercise.exercise_type_id || "")}
                    content={safeExerciseContent(exercise.content_json)}
                  />
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
