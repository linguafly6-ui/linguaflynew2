import type { Metadata } from "next";
import Link from "next/link";

const canonical = "https://linguafly.app/biblioteca-pdf";

export const metadata: Metadata = {
  title: "Biblioteca de ejercicios de inglés en PDF | Linguafly",
  description: "Encuentra cuadernos de ejercicios de inglés por nivel, unidad y tema. Recursos de práctica para aprender inglés paso a paso.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    title: "Biblioteca de ejercicios de inglés en PDF | Linguafly",
    description: "Cuadernos y ejercicios de inglés organizados por nivel y unidad.",
    url: canonical,
    siteName: "Linguafly",
  },
};

export default function PdfLibraryPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <Link href="/" className="text-sm font-bold text-blue-700 hover:underline">← Linguafly</Link>
      <header className="mt-9 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-700">Recursos gratuitos</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Biblioteca de ejercicios de inglés en PDF</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Practica inglés con materiales organizados por nivel y unidad. Cada página explica los contenidos
          que vas a trabajar para que puedas estudiar antes de completar las actividades.
        </p>
      </header>
      <section className="mt-10">
        <h2 className="text-2xl font-extrabold text-slate-950">Nivel A1 · Principiante</h2>
        <div className="mt-5 grid gap-5">
          <Link
            href="/biblioteca-pdf/a1/unidad-1-presentarse"
            className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md"
          >
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Unidad 1</span>
            <h3 className="mt-2 text-xl font-extrabold text-slate-950">Saludos y presentaciones en inglés</h3>
            <p className="mt-2 leading-7 text-slate-600">
              Aprende a saludar, decir tu nombre, preguntar cómo se llama otra persona y hablar de tu procedencia.
              Incluye práctica de am, are, my y your.
            </p>
            <span className="mt-4 inline-flex font-bold text-blue-700">Ver explicación y ejercicios →</span>
          </Link>
          <Link
            href="/biblioteca-pdf/a1/unidad-2-datos-personales"
            className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md"
          >
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Unidad 2</span>
            <h3 className="mt-2 text-xl font-extrabold text-slate-950">El verbo to be e información personal</h3>
            <p className="mt-2 leading-7 text-slate-600">
              Practica am, is y are en afirmaciones, negativas y preguntas; aprende a dar datos personales,
              hablar de edad, país, nacionalidad, profesión y datos de contacto.
            </p>
            <span className="mt-4 inline-flex font-bold text-blue-700">Ver explicación y ejercicios →</span>
          </Link>
          <Link
            href="/biblioteca-pdf/a1/unidad-3-to-be-negativa-preguntas"
            className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md"
          >
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Unidad 3</span>
            <h3 className="mt-2 text-xl font-extrabold text-slate-950">To be: negativa y preguntas</h3>
            <p className="mt-2 leading-7 text-slate-600">
              Practica am not, isn't y aren't, preguntas sí/no, respuestas cortas y vocabulario de estados
              y emociones. Incluye reading, listening y writing.
            </p>
            <span className="mt-4 inline-flex font-bold text-blue-700">Ver explicación y ejercicios →</span>
          </Link>
          <Link
            href="/biblioteca-pdf/a1/unidad-4-articulos-plurales-demostrativos"
            className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md"
          >
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Unidad 4</span>
            <h3 className="mt-2 text-xl font-extrabold text-slate-950">A, An, plurales y This/That</h3>
            <p className="mt-2 leading-7 text-slate-600">
              Practica artículos, plurales regulares, demostrativos, números del 1 al 10, objetos del aula y colores.
              Incluye reading, listening y writing.
            </p>
            <span className="mt-4 inline-flex font-bold text-blue-700">Ver explicación y ejercicios →</span>
          </Link>
          <Link key="unit-5" href="/biblioteca-pdf/a1/unidad-5-present-simple-rutinas" className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Unidad 5</span>
            <h3 className="mt-2 text-xl font-extrabold text-slate-950">Present Simple y rutinas</h3>
            <p className="mt-2 leading-7 text-slate-600">Practica la afirmativa, la regla de la tercera persona (-s/-es/-ies) y los verbos de la rutina diaria.</p>
            <span className="mt-4 inline-flex font-bold text-blue-700">Ver explicación y ejercicios →</span>
          </Link>
          <Link key="unit-6" href="/biblioteca-pdf/a1/unidad-6-familia-posesivos-genitivo" className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Unidad 6</span>
            <h3 className="mt-2 text-xl font-extrabold text-slate-950">Familia, posesivos y genitivo sajón</h3>
            <p className="mt-2 leading-7 text-slate-600">Aprende miembros de la familia, my/your/his/her/our/their y la posesión con 's.</p>
            <span className="mt-4 inline-flex font-bold text-blue-700">Ver explicación y ejercicios →</span>
          </Link>
          <Link key="unit-7" href="/biblioteca-pdf/a1/unidad-7-colores-descripciones-fisicas" className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Unidad 7</span>
            <h3 className="mt-2 text-xl font-extrabold text-slate-950">Colores y descripciones físicas</h3>
            <p className="mt-2 leading-7 text-slate-600">Describe altura, edad, pelo y ojos con colores, adjetivos y have/has got.</p>
            <span className="mt-4 inline-flex font-bold text-blue-700">Ver explicación y ejercicios →</span>
          </Link>
          <Link key="unit-8" href="/biblioteca-pdf/a1/unidad-8-numeros-edad-precios" className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Unidad 8</span>
            <h3 className="mt-2 text-xl font-extrabold text-slate-950">Números del 20 al 100, edad y precios</h3>
            <p className="mt-2 leading-7 text-slate-600">Practica números, How old…?, How much…? y vocabulario de precios y dinero.</p>
            <span className="mt-4 inline-flex font-bold text-blue-700">Ver explicación y ejercicios →</span>
          </Link>
          <Link key="unit-9" href="/biblioteca-pdf/a1/unidad-9-profesiones-ocupaciones" className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Unidad 9</span>
            <h3 className="mt-2 text-xl font-extrabold text-slate-950">Profesiones y ocupaciones</h3>
            <p className="mt-2 leading-7 text-slate-600">Aprende profesiones, a/an y preguntas sobre el trabajo y su lugar.</p>
            <span className="mt-4 inline-flex font-bold text-blue-700">Ver explicación y ejercicios →</span>
          </Link>
          <Link key="unit-10" href="/biblioteca-pdf/a1/unidad-10-rutinas-diarias-hora" className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Unidad 10</span>
            <h3 className="mt-2 text-xl font-extrabold text-slate-950">Rutinas diarias y la hora</h3>
            <p className="mt-2 leading-7 text-slate-600">Describe horarios con What time…?, at, o'clock y half past.</p>
            <span className="mt-4 inline-flex font-bold text-blue-700">Ver explicación y ejercicios →</span>
          </Link>
          <Link key="unit-11" href="/biblioteca-pdf/a1/unidad-11-lugares-ciudad" className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Unidad 11</span>
            <h3 className="mt-2 text-xl font-extrabold text-slate-950">Lugares de la ciudad</h3>
            <p className="mt-2 leading-7 text-slate-600">Practica There is/There are, Where is…? y preposiciones de lugar.</p>
            <span className="mt-4 inline-flex font-bold text-blue-700">Ver explicación y ejercicios →</span>
          </Link>
          <Link key="unit-12" href="/biblioteca-pdf/a1/unidad-12-dias-semana" className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Unidad 12</span>
            <h3 className="mt-2 text-xl font-extrabold text-slate-950">Días de la semana</h3>
            <p className="mt-2 leading-7 text-slate-600">Aprende los siete días, on, weekdays, weekend y actividades semanales.</p>
            <span className="mt-4 inline-flex font-bold text-blue-700">Ver explicación y ejercicios →</span>
          </Link>
          <Link key="unit-13" href="/biblioteca-pdf/a1/unidad-13-rutina-diaria" className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Unidad 13</span>
            <h3 className="mt-2 text-xl font-extrabold text-slate-950">Rutina diaria: First, Then, After that</h3>
            <p className="mt-2 leading-7 text-slate-600">Ordena las acciones de tu día con secuenciadores y Present Simple.</p>
            <span className="mt-4 inline-flex font-bold text-blue-700">Ver explicación y ejercicios →</span>
          </Link>
          <Link key="unit-14" href="/biblioteca-pdf/a1/unidad-14-present-simple-dont-do-you" className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Unidad 14</span>
            <h3 className="mt-2 text-xl font-extrabold text-slate-950">Present Simple: don't y Do you…?</h3>
            <p className="mt-2 leading-7 text-slate-600">Forma negativas y preguntas sobre hábitos con respuestas cortas.</p>
            <span className="mt-4 inline-flex font-bold text-blue-700">Ver explicación y ejercicios →</span>
          </Link>
        </div>
      </section>
    </main>
  );
}