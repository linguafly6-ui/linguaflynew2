import type { Metadata } from "next";
import Link from "next/link";

const canonical = "https://linguafly.app/biblioteca-pdf/a1/unidad-2-datos-personales";
const title = "Ejercicios de inglés A1: verbo to be e información personal – Unidad 2";
const description =
  "Practica inglés A1 con 200 ejercicios sobre am, is, are, preguntas, respuestas cortas y datos personales. Incluye explicaciones y solucionario.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { type: "article", title, description, url: canonical, siteName: "Linguafly" },
};

export default function A1Unit2LibraryPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <nav aria-label="Ruta de navegación" className="mb-8 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-700">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/biblioteca-pdf" className="hover:text-blue-700">Biblioteca PDF</Link>
        <span className="mx-2">/</span>
        <span aria-current="page" className="text-slate-700">Inglés A1 · Unidad 2</span>
      </nav>

      <header className="mb-10">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-700">Biblioteca de ejercicios · Nivel A1</p>
        <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          Ejercicios de inglés A1 – Unidad 2: el verbo to be e información personal
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Aprende a utilizar am, is y are para hablar de ti y de otras personas. Practica frases afirmativas,
          negativas, preguntas, respuestas cortas y preguntas sobre nombre, edad, país, nacionalidad y profesión.
        </p>
      </header>

      <article className="space-y-8 text-base leading-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">1. El verbo to be: am, is y are</h2>
          <p className="mt-3">
            El verbo <strong>to be</strong> significa ser o estar. Utilizamos <strong>am</strong> con I,
            <strong> is</strong> con he, she e it, y <strong>are</strong> con you, we y they.
            Ejemplos: <em>I am a student</em>, <em>She is from Spain</em> y <em>They are at school</em>.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">2. Contracciones y frases negativas</h2>
          <p className="mt-3">
            En inglés cotidiano son frecuentes las contracciones: <strong>I'm</strong>, <strong>you're</strong>,
            <strong> he's</strong>, <strong>she's</strong>, <strong>it's</strong>, <strong>we're</strong> y
            <strong> they're</strong>. Para negar, colocamos <strong>not</strong> después del verbo:
            <em> I'm not</em>, <em>isn't</em> y <em>aren't</em>.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">3. Preguntas y respuestas cortas</h2>
          <p className="mt-3">
            Para preguntar, colocamos am, is o are delante del sujeto: <em>Are you ready?</em>,
            <em> Is she a teacher?</em>. Las respuestas breves son <em>Yes, I am</em>,
            <em> No, she isn't</em>, <em>Yes, they are</em> y otras combinaciones equivalentes.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">4. Información personal</h2>
          <p className="mt-3">
            Para compartir datos básicos puedes utilizar <em>What's your name?</em>,
            <em> How old are you?</em>, <em>Where are you from?</em> y <em>What is your nationality?</em>.
            Recuerda que en inglés la edad se expresa con to be: <em>I am 20 years old</em>, no “I have 20”.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">5. Países, nacionalidades y profesiones</h2>
          <p className="mt-3">
            Practica parejas como Spain / Spanish, France / French e Italy / Italian, además de profesiones
            habituales: student, teacher, doctor y nurse. Ejemplos: <em>He is Italian</em> y
            <em> My sister is a doctor</em>.
          </p>
        </section>
      </article>

      <section className="mt-12 rounded-3xl border border-blue-100 bg-blue-50/70 p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-700">Cuaderno de práctica</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">200 ejercicios de inglés A1</h2>
        <p className="mt-3 leading-7 text-slate-700">
          Diez bloques de actividades para practicar la gramática y el vocabulario de la unidad.
          Incluye solucionario y explicaciones en español.
        </p>
        <a
          href="/api/biblioteca-pdf/a1/unidad-2-datos-personales"
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          download
        >
          Descargar los 200 ejercicios en PDF
        </a>
        <p className="mt-3 text-sm text-slate-500">Archivo PDF · Nivel A1 · Unidad 2 · Incluye solucionario.</p>
      </section>

      <p className="mt-10 text-sm text-slate-500">
        <Link href="/biblioteca-pdf" className="font-semibold text-blue-700 hover:underline">Volver a la biblioteca PDF</Link>
      </p>
    </main>
  );
}
