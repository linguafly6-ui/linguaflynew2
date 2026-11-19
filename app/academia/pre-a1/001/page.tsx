import Link from "next/link";
export const metadata = {
  title: "Greetings and Introductions · Misión 001 · Linguafly",
  description: "Saluda, despídete y di quién eres. Practica también tu pronunciación británica."
};

export default function MissionPage() {
  return <main className="mx-auto min-h-[70vh] max-w-5xl px-5 py-10">
    <section className="mb-7">
      <Link href="/academia/pre-a1" className="text-sm font-semibold text-blue-700">← Misiones Pre-A1</Link>
      <p className="mt-6 text-sm font-extrabold uppercase tracking-widest text-blue-700">Linguafly Quest · Pre-A1 · Misión 001</p>
      <h1 className="mt-2 text-4xl font-black text-slate-950">Greetings and Introductions</h1>
      <p className="mt-3 text-slate-600">Saluda, despídete y di quién eres.</p>
    </section>
    <iframe title="Misión 001 · Greetings and Introductions" src="/missions/pre-a1/001/index.html" className="h-[1100px] w-full rounded-2xl border border-slate-200 bg-white" />
    
  </main>;
}
