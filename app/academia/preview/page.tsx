import Link from "next/link";

const courses = [
  { level: "A1", name: "Elementary", description: "Presentarte y comunicarte en situaciones cotidianas.", progress: 28, lessons: "100 misiones" },
  { level: "A2", name: "Pre-intermediate", description: "Hablar de experiencias, planes y situaciones habituales.", progress: 12, lessons: "10 misiones iniciales" },
  { level: "B1", name: "Intermediate", description: "Expresarte con autonomía en contextos conocidos.", progress: 0, lessons: "Próximamente" },
  { level: "B2", name: "Upper-intermediate", description: "Comunicarte con precisión y desarrollar argumentos.", progress: 0, lessons: "Próximamente" },
  { level: "C1", name: "Advanced", description: "Comprender y producir inglés complejo con soltura.", progress: 0, lessons: "Próximamente" },
  { level: "C2", name: "Proficiency", description: "Dominar matices y registros avanzados del idioma.", progress: 0, lessons: "Próximamente" },
];

const sections = [
  ["01", "Exploración", "Vocabulario y explicación gramatical"],
  ["02", "Práctica", "20 retos variados con corrección"],
  ["03", "Gramática", "10 ejercicios autocorregibles"],
  ["04", "Pronunciación", "10 palabras con audio británico"],
  ["05", "Reading", "Un texto y 10 preguntas"],
  ["06", "Writing", "10 dictados de palabras y frases"],
  ["07", "Speaking", "10 tareas de expresión oral"],
  ["08", "Listening", "Audio, 10 huecos y banco de palabras"],
];

export const metadata = {
  title: "Vista de diseño · Linguafly Academy",
  robots: { index: false, follow: false },
};

export default function AcademyPreviewPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Linguafly Academy</p>
            <p className="mt-0.5 text-xs text-slate-500">Prototipo visual · No registra progreso real</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/academia/a1/001-canonical" className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700">Probar misión piloto</Link>
            <Link href="/academia" className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">Volver</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4">
          <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Espacio de aprendizaje</p>
          <nav aria-label="Navegación de demostración" className="grid gap-1 text-sm">
            {[
              ["Inicio", true],
              ["Mis cursos", false],
              ["Ejercicios", false],
              ["Mi progreso", false],
              ["Mi perfil", false],
            ].map(([label, active]) => (
              <span key={label as string} className={`rounded-lg px-3 py-2.5 font-medium ${active ? "bg-blue-50 text-blue-700" : "text-slate-600"}`}>
                {label}
              </span>
            ))}
          </nav>
          <div className="mt-6 rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-500">Tu objetivo</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">Aprender a tu ritmo</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">Lecciones asíncronas, sin horarios ni clases en directo.</p>
          </div>
        </aside>

        <div className="min-w-0 space-y-8">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Tu espacio personal</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">Sigue aprendiendo inglés</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Una experiencia sencilla y ordenada para avanzar desde tu nivel, practicar y ver tu evolución.</p>
            </div>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500">Vista de demostración</span>
          </header>

          <section className="grid gap-4 sm:grid-cols-3" aria-label="Resumen de ejemplo">
            {[
              ["Nivel actual", "A1", "Elementary"],
              ["Ritmo", "A tu ritmo", "Sin clases en directo"],
              ["Siguiente paso", "Misión 001", "Who Am I?"],
            ].map(([label, value, note]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <p className="mt-2 text-xl font-semibold tracking-tight text-slate-900">{value}</p>
                <p className="mt-1 text-xs text-slate-500">{note}</p>
              </div>
            ))}
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Mis cursos</h2>
                <p className="mt-1 text-sm text-slate-500">La misma presentación para todos los niveles.</p>
              </div>
              <span className="text-xs font-medium text-slate-400">A1–C2</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <article key={course.level} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{course.level}</span>
                    <span className="text-xs text-slate-400">{course.lessons}</span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{course.name}</h3>
                  <p className="mt-1 min-h-10 text-sm leading-5 text-slate-500">{course.description}</p>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-blue-600" style={{ width: `${course.progress}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{course.progress ? `${course.progress}% de ejemplo` : "Aún sin progreso"}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">Plantilla común de misión</p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">A1 · Misión 001 · Who Am I?</h2>
                <p className="mt-1 text-sm text-slate-500">Las ocho secciones mantienen el mismo orden y diseño en todos los cursos.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">8 secciones</span>
            </div>
            <div className="mt-5 divide-y divide-slate-100 border-y border-slate-100">
              {sections.map(([number, name, description]) => (
                <div key={number} className="flex items-center gap-4 py-3.5">
                  <span className="w-8 shrink-0 text-xs font-semibold tabular-nums text-slate-400">{number}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800">{name}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{description}</p>
                  </div>
                  <span className="text-xs text-slate-400">Ver sección</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-400">Maqueta estática para revisar la dirección visual. Los botones, ejercicios, audios y datos de progreso todavía no están conectados.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
