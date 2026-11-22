import Link from "next/link";

export const metadata = {
  title: "B2 · Inglés intermedio alto · Linguafly Academy",
  description: "Curso B2 de inglés británico: currículo por unidades y misiones comunicativas.",
};

const units = [
  "Personal Identity and Human Behaviour",
  "Society and Contemporary Issues",
  "Work, Business and Professional Communication",
  "Science, Technology and Innovation",
  "Environment and Global Challenges",
  "Culture, Arts and Media",
  "Travel, Globalisation and Cultural Diversity",
  "Health, Psychology and Lifestyle",
  "Communication, Argumentation and Critical Thinking",
  "Independent and Effective Communication",
];

export default function B2CoursePage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-10">
      <Link href="/academia" className="text-sm font-medium text-slate-500 hover:text-blue-700">← Linguafly Academy</Link>
      <header className="mt-5 rounded-3xl bg-slate-950 px-7 py-10 text-white sm:px-10">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">04 / Upper-intermediate</p>
        <h1 className="mt-3 text-4xl font-black">B2 · Inglés intermedio alto</h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-300">Un recorrido de diez unidades para desarrollar precisión, fluidez, comprensión crítica y comunicación independiente en inglés británico.</p>
        <div className="mt-6">
          <Link href="/academia/b2/001-canonical" className="inline-flex rounded-xl bg-cyan-300 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-200">Empezar misión piloto 001 →</Link>
        </div>
      </header>
      <section className="mt-9">
        <h2 className="text-2xl font-bold text-slate-950">Mapa curricular</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">El curso está organizado en diez unidades. La misión 001 es el primer piloto canónico; las demás misiones se incorporarán después de validar su contenido y funcionamiento.</p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {units.map((unit, index) => (
            <li key={unit} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold tracking-widest text-slate-400">UNIT {String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-semibold text-slate-900">{unit}</h3>
              {index === 0 ? <p className="mt-2 text-xs font-medium text-emerald-700">Misión piloto 001 disponible</p> : <p className="mt-2 text-xs text-slate-400">Contenido en planificación</p>}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
