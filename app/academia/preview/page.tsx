import Link from "next/link";

const courses = [
  { level: "A1", name: "Elementary", description: "Construye tus primeras conversaciones y gana confianza en situaciones cotidianas.", progress: 28, lessons: "100 misiones", state: "En curso" },
  { level: "A2", name: "Pre-intermediate", description: "Habla de experiencias, planes y situaciones habituales con más soltura.", progress: 12, lessons: "10 misiones iniciales", state: "En curso" },
  { level: "B1", name: "Intermediate", description: "Comunícate con autonomía y desarrolla tus ideas en contextos conocidos.", progress: 0, lessons: "Próximamente", state: "Próximamente" },
  { level: "B2", name: "Upper-intermediate", description: "Expresa matices, argumenta y comunica con mayor precisión.", progress: 0, lessons: "Próximamente", state: "Próximamente" },
  { level: "C1", name: "Advanced", description: "Comprende y produce inglés complejo con naturalidad y flexibilidad.", progress: 0, lessons: "Próximamente", state: "Próximamente" },
  { level: "C2", name: "Proficiency", description: "Domina registros, matices y usos avanzados del idioma.", progress: 0, lessons: "Próximamente", state: "Próximamente" },
];

const sections = [
  ["01", "Exploración", "Vocabulario y contexto"],
  ["02", "Práctica", "Retos guiados"],
  ["03", "Gramática", "Construye frases con precisión"],
  ["04", "Pronunciación", "Escucha y practica sonidos"],
  ["05", "Reading", "Comprensión lectora"],
  ["06", "Writing", "Dictados y escritura"],
  ["07", "Speaking", "Expresión oral"],
  ["08", "Listening", "Comprensión auditiva"],
];

export const metadata = {
  title: "Vista de diseño · Linguafly Academy",
  robots: { index: false, follow: false },
};

export default function AcademyPreviewPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#172033]">
      <div className="border-b border-[#e8ebf0] bg-white/90">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Link href="/academia/preview" className="flex items-center gap-3" aria-label="Linguafly Academy, inicio">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#183b67] text-sm font-black tracking-tight text-white">Lf</span>
            <span><span className="block text-sm font-bold tracking-tight text-[#172033]">linguafly</span><span className="block text-[10px] font-semibold uppercase tracking-[.2em] text-[#718096]">Academy</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-[#e8ebf0] px-3 py-1.5 text-xs font-medium text-[#718096] sm:inline-flex">Vista de demostración · Datos ficticios</span>
            <Link href="/academia/a1/001-canonical" className="rounded-xl bg-[#183b67] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#102d50] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3976b9]">Abrir misión piloto <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-7 px-5 py-6 lg:grid-cols-[232px_minmax(0,1fr)] lg:px-8 lg:py-9">
        <aside className="h-fit lg:sticky lg:top-6">
          <div className="rounded-[22px] border border-[#e8ebf0] bg-white p-3 shadow-[0_8px_30px_rgba(25,42,70,0.035)]">
            <p className="px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#98a2b3]">Tu espacio</p>
            <nav aria-label="Navegación de demostración" className="grid grid-cols-2 gap-1 text-sm lg:grid-cols-1">
              <span aria-current="page" className="flex items-center gap-3 rounded-xl bg-[#edf3fa] px-3 py-3 font-semibold text-[#183b67]"><span aria-hidden="true">⌂</span> Inicio</span>
              <span className="flex items-center gap-3 rounded-xl px-3 py-3 font-medium text-[#647087]"><span aria-hidden="true">▤</span> Mis cursos</span>
              <span className="flex items-center gap-3 rounded-xl px-3 py-3 font-medium text-[#647087]"><span aria-hidden="true">◈</span> Actividades</span>
              <span className="flex items-center gap-3 rounded-xl px-3 py-3 font-medium text-[#647087]"><span aria-hidden="true">↗</span> Mi progreso</span>
            </nav>
            <div className="mt-4 rounded-2xl bg-[#f7f8fa] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#183b67]"><span aria-hidden="true">✦</span> Aprende a tu ritmo</div>
              <p className="mt-2 text-xs leading-5 text-[#778196]">Un camino flexible, con práctica guiada y sin horarios ni clases en directo.</p>
            </div>
          </div>
          <p className="px-3 pt-4 text-[11px] leading-5 text-[#98a2b3]">Una experiencia de aprendizaje diseñada para avanzar paso a paso.</p>
        </aside>

        <div className="min-w-0 space-y-8">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#55779d]">Tu espacio de aprendizaje</p>
              <h1 className="mt-2 text-[32px] font-semibold tracking-[-.045em] text-[#172033] sm:text-[40px]">Tu inglés, a tu ritmo<span className="text-[#55779d]">.</span></h1>
              <p className="mt-2 max-w-2xl text-[15px] leading-7 text-[#718096]">Un lugar para aprender, practicar y descubrir hasta dónde puedes llegar.</p>
            </div>
            <span className="rounded-full border border-[#e2e7ed] bg-white px-3 py-2 text-[11px] font-semibold text-[#7b8798]">PREVIEW · SIN PROGRESO REAL</span>
          </header>

          <section aria-label="Tu siguiente paso" className="relative overflow-hidden rounded-[28px] bg-[#183b67] p-6 text-white shadow-[0_18px_50px_rgba(24,59,103,0.14)] sm:p-8 lg:p-9">
            <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border border-white/10" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-2 -top-14 h-52 w-52 rounded-full border border-white/10" />
            <div className="relative grid gap-7 md:grid-cols-[minmax(0,1fr)_190px] md:items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#b9cce1]">Continúa donde lo dejaste</p>
                <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-[-.035em] sm:text-[30px]">Cada pequeño avance cuenta.</h2>
                <p className="mt-2 max-w-lg text-sm leading-6 text-[#d3dfec]">Retoma tu recorrido con una misión breve y práctica para seguir ganando confianza en inglés.</p>
                <Link href="/academia/a1/001-canonical" className="mt-6 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#183b67] transition hover:bg-[#edf3fa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Continuar misión <span aria-hidden="true">→</span></Link>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/[.08] p-4 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#b9cce1]">Tu recorrido</p>
                <div className="mt-3 flex items-end justify-between"><span className="text-4xl font-semibold tracking-tight">A1</span><span className="pb-1 text-xs text-[#d3dfec]">Elementary</span></div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/20"><div className="h-full w-[28%] rounded-full bg-[#d9e8f7]" /></div>
                <p className="mt-2 text-xs text-[#d3dfec]">28% · ejemplo visual</p>
              </div>
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-3" aria-label="Resumen de ejemplo">
            <article className="rounded-2xl border border-[#e8ebf0] bg-white p-5">
              <p className="text-xs font-medium text-[#8792a3]">Tu nivel</p><p className="mt-2 text-2xl font-semibold tracking-tight text-[#172033]">A1 <span className="text-sm font-medium text-[#8792a3]">· Elementary</span></p><p className="mt-1 text-xs text-[#8792a3]">Punto de partida</p>
            </article>
            <article className="rounded-2xl border border-[#e8ebf0] bg-white p-5">
              <p className="text-xs font-medium text-[#8792a3]">Tu metodología</p><p className="mt-2 text-2xl font-semibold tracking-tight text-[#172033]">Flexible</p><p className="mt-1 text-xs text-[#8792a3]">Aprende cuando quieras</p>
            </article>
            <article className="rounded-2xl border border-[#e8ebf0] bg-white p-5">
              <p className="text-xs font-medium text-[#8792a3]">Tu próxima misión</p><p className="mt-2 text-2xl font-semibold tracking-tight text-[#172033]">001</p><p className="mt-1 text-xs text-[#8792a3]">Who Am I?</p>
            </article>
          </section>

          <section>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#8290a3]">Tu itinerario</p><h2 className="mt-1 text-xl font-semibold tracking-tight text-[#172033]">Explora tus niveles</h2><p className="mt-1 text-sm text-[#8792a3]">Una misma experiencia, desde A1 hasta C2.</p></div>
              <span className="text-xs font-semibold text-[#8792a3]">6 niveles · A1—C2</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <article key={course.level} className="group rounded-[20px] border border-[#e8ebf0] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#cbd7e5] hover:shadow-[0_12px_30px_rgba(25,42,70,0.06)]">
                  <div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#edf3fa] text-sm font-bold text-[#183b67]">{course.level}</span><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${course.progress ? "bg-[#edf5f0] text-[#47775c]" : "bg-[#f3f4f6] text-[#8993a2]"}`}>{course.state}</span></div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-[#202b3d]">{course.name}</h3>
                  <p className="mt-1 min-h-[60px] text-[13px] leading-5 text-[#7b8798]">{course.description}</p>
                  <div className="mt-4 flex items-center justify-between text-[11px]"><span className="font-medium text-[#8792a3]">{course.lessons}</span><span className="font-semibold tabular-nums text-[#52657d]">{course.progress ? `${course.progress}%` : "—"}</span></div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#edf0f4]"><div className="h-full rounded-full bg-[#557da8] transition-all" style={{ width: `${course.progress}%` }} /></div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[24px] border border-[#e8ebf0] bg-white p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#55779d]">Una estructura que te acompaña</p><h2 className="mt-1 text-xl font-semibold tracking-tight text-[#172033]">Así se construye cada misión</h2><p className="mt-1 max-w-xl text-sm leading-6 text-[#8792a3]">Ocho formas de practicar las habilidades que necesitas para comunicarte en inglés.</p></div>
              <span className="rounded-full bg-[#f3f6fa] px-3 py-1.5 text-xs font-semibold text-[#55708f]">8 etapas</span>
            </div>
            <ol className="mt-6 grid gap-2 sm:grid-cols-2">
              {sections.map(([number, name, description]) => (
                <li key={number} className="flex items-center gap-4 rounded-xl border border-[#eef0f3] px-4 py-3.5 transition hover:border-[#d8e1eb] hover:bg-[#fafbfd]">
                  <span className="text-xs font-bold tabular-nums text-[#9aa6b5]">{number}</span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-[#344155]">{name}</span><span className="mt-0.5 block text-xs text-[#8994a4]">{description}</span></span><span aria-hidden="true" className="text-sm text-[#9aa6b5]">↗</span>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#eef0f3] pt-5">
              <p className="text-xs leading-5 text-[#9aa3b1]">Prototipo visual. Los datos de progreso son ilustrativos y no se guardan.</p>
              <Link href="/academia/a1/001-canonical" className="text-sm font-semibold text-[#315f91] transition hover:text-[#183b67]">Conocer la misión piloto <span aria-hidden="true">→</span></Link>
            </div>
          </section>
          <footer className="pb-4 text-center text-[11px] text-[#a0a9b6]">LINGUAFLY ACADEMY · APRENDE A TU RITMO</footer>
        </div>
      </div>
    </main>
  );
}
