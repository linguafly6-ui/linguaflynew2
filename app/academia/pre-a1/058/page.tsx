import Link from "next/link";

export const metadata = {
  title: "Classroom English · Misión 058 · Linguafly",
  description: "Aprende instrucciones habituales del aula en inglés."
};

export default function Mission058Page() {
  return <main className="mx-auto min-h-[70vh] max-w-5xl px-5 py-10">
    <section className="mb-7">
      <Link href="/academia/pre-a1" className="text-sm font-semibold text-blue-700">← Misiones Pre-A1</Link>
      <p className="mt-6 text-sm font-extrabold uppercase tracking-widest text-blue-700">Linguafly Quest · Pre-A1 · Misión 058</p>
      <h1 className="mt-2 text-4xl font-black text-slate-950">Classroom English</h1>
      <p className="mt-3 text-slate-600">Aprende a comprender y seguir instrucciones habituales del aula.</p>
    </section>
    <iframe title="Misión 058 · Classroom English" src="/missions/pre-a1/058/index.html" className="h-[1100px] w-full rounded-2xl border border-slate-200 bg-white" />
  </main>;
}