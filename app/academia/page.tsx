import Link from "next/link";

export const metadata = {
  title: "Linguafly Academy · Rutas de inglés",
  description: "Explora las rutas de aprendizaje de inglés de Linguafly, desde Pre-A1."
};

export default function AcademyPage() {
  return <main className="mx-auto min-h-[70vh] max-w-5xl px-5 py-12">
    <section className="rounded-3xl bg-slate-950 px-7 py-12 text-white sm:px-12">
      <p className="text-sm font-bold uppercase tracking-[.2em] text-cyan-300">Linguafly Academy</p>
      <h1 className="mt-4 text-4xl font-black sm:text-5xl">Tu inglés. <span className="text-cyan-300">Tu siguiente paso.</span></h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Empieza desde cero y avanza con misiones prácticas, vocabulario y comprensión del inglés británico.</p>
    </section>
    <section className="mt-10">
      <Link href="/academia/pre-a1" className="block rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-blue-300">
        <p className="text-sm font-extrabold tracking-widest text-blue-700">00 / STARTER</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950">PRE-A1 · Empieza desde cero</h2>
        <p className="mt-3 text-slate-600">Primeras palabras e instrucciones cotidianas en inglés.</p>
        <span className="mt-6 inline-block font-bold text-blue-700">Ver misiones →</span>
      </Link>
      <p className="mt-6 text-sm text-slate-500">Los demás niveles y su catálogo se irán incorporando a esta sección.</p>
    </section>
  </main>;
}