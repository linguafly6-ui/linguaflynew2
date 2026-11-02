import Link from "next/link";
import { getCourseLevels } from "@/lib/academy";
export const dynamic = "force-dynamic";
export default async function AcademyPage() {
  const levels = await getCourseLevels();
  return <main className="mx-auto min-h-screen max-w-6xl px-6 py-12"><Link href="/" className="font-bold text-blue-700">← LinguaFly</Link><h1 className="mt-8 text-4xl font-black">British English Academy</h1><p className="mt-3 text-slate-600">Choose your CEFR level.</p>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{levels.map(l => <Link key={l.level} href={`/academia/${l.level.toLowerCase()}`} className="rounded-2xl border bg-white p-6"><span className="text-3xl font-black">{l.level}</span><h2 className="mt-2 font-bold">{l.title}</h2><p className="mt-3 text-sm text-slate-500">{l.units} units · {l.status}</p></Link>)}</div>
  </main>;
}
