import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseUnits } from "@/lib/academy";
export const dynamic = "force-dynamic";
export default async function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const units = await getCourseUnits(level);
  if (!units.length) notFound();
  return <main className="mx-auto min-h-screen max-w-5xl px-6 py-12"><Link href="/academia" className="font-bold text-blue-700">← Academy</Link><h1 className="mt-8 text-4xl font-black">{level.toUpperCase()} course</h1>
    <div className="mt-8 grid gap-3 sm:grid-cols-2">{units.map((u: any) => <Link key={u.unit_id} href={`/academia/${level.toLowerCase()}/${u.unit_number}`} className="rounded-xl border bg-white p-5"><div className="flex justify-between gap-3"><h2 className="font-bold">Unit {u.unit_number}: {u.title}</h2><span className="text-xs text-slate-400">{u.status}</span></div></Link>)}</div>
  </main>;
}
