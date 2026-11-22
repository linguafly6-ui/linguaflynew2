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
    <section className="mt-10 grid gap-5 md:grid-cols-2">
      <Link href="/academia/pre-a1" className="block rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-blue-300">
        <p className="text-sm font-extrabold tracking-widest text-blue-700">00 / STARTER</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950">PRE-A1 · Empieza desde cero</h2>
        <p className="mt-3 text-slate-600">Primeras palabras e instrucciones cotidianas en inglés.</p>
        <span className="mt-6 inline-block font-bold text-blue-700">Ver misiones →</span>
      </Link>
      <Link href="/academia/a1" className="block rounded-3xl border border-indigo-200 bg-indigo-50 p-7 shadow-sm transition hover:border-indigo-400">
        <p className="text-sm font-extrabold tracking-widest text-indigo-700">01 / ELEMENTARY</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950">A1 · Inglés elemental</h2>
        <p className="mt-3 text-slate-600">32 temas organizados en 8 bloques: información personal, vida diaria, hogar, compras, salud, estudios, viajes y comunicación.</p>
        <span className="mt-6 inline-block font-bold text-indigo-700">Ver catálogo temático →</span>
      </Link>
      <Link href="/academia/b1" className="block rounded-3xl border border-violet-200 bg-violet-50 p-7 shadow-sm transition hover:border-violet-400">
        <p className="text-sm font-extrabold tracking-widest text-violet-700">03 / INDEPENDENT</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950">B1 · Inglés intermedio</h2>
        <p className="mt-3 text-slate-600">Cuenta experiencias, expresa opiniones y participa en conversaciones con mayor autonomía. La misión piloto ya está disponible.</p>
        <span className="mt-6 inline-block font-bold text-violet-700">Ver B1 →</span>
      </Link>
      <Link href="/academia/c1" className="block rounded-3xl border border-fuchsia-200 bg-fuchsia-50 p-7 shadow-sm transition hover:border-fuchsia-400">
        <p className="text-sm font-extrabold tracking-widest text-fuchsia-700">04 / PROFICIENT</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950">C1 · Inglés avanzado</h2>
        <p className="mt-3 text-slate-600">Desarrolla argumentos complejos, adapta el registro y comunica ideas con precisión a través de 100 misiones C1.</p>
        <span className="mt-6 inline-block font-bold text-fuchsia-700">Ver C1 →</span>
      </Link>
      <Link href="/academia/speaking" className="block rounded-3xl border border-cyan-200 bg-cyan-50 p-7 shadow-sm transition hover:border-cyan-400 md:col-span-2">
        <p className="text-sm font-extrabold tracking-widest text-cyan-800">02 / PRONUNCIATION STUDIO</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950">Speaking · British English</h2>
        <p className="mt-3 max-w-2xl text-slate-700">Escucha, grábate y practica sonidos británicos con IPA, ejemplos y consejos concretos para mejorar tu pronunciación.</p>
        <span className="mt-6 inline-block font-bold text-cyan-800">Abrir Speaking Lab →</span>
      </Link>
      <p className="text-sm text-slate-500 md:col-span-2">El catálogo A1 presenta el recorrido temático; sus actividades interactivas se añadirán progresivamente.</p>
    </section>
  </main>;
}
