import type { Metadata } from "next";
import Link from "next/link";

const canonical = "https://linguafly.app/biblioteca-pdf/a1/unidad-3-to-be-negativa-preguntas";
const title = "Ejercicios de inglés A1: to be en negativa y preguntas – Unidad 3";
const description =
  "Practica inglés A1 con 200 ejercicios de to be en negativa y preguntas, emociones, reading, listening y writing. Incluye solucionario y explicaciones.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { type: "article", title, description, url: canonical, siteName: "Linguafly" },
};

export default function A1Unit3LibraryPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <nav aria-label="Ruta de navegación" className="mb-8 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-700">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/biblioteca-pdf" className="hover:text-blue-700">Biblioteca PDF</Link>
        <span className="mx-2">/</span>
        <span aria-current="page" className="text-slate-700">Inglés A1 · Unidad 3</span>
      </nav>

      <header className="mb-10">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-700">Biblioteca de ejercicios · Nivel A1</p>
        <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          Ejercicios de inglés A1 – Unidad 3: to be en negativa y preguntas
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Aprende a formar frases negativas con am not, isn't y aren't, hacer preguntas de sí/no y responder
          de forma breve. Amplía el vocabulario para hablar de estados y emociones.
        </p>
      </header>

      <article className="space-y-8 text-base leading-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">1. Gramática: negativa e interrogativa</h2>
          <p className="mt-3">
            Con <strong>I</strong> utilizamos <strong>am not</strong>; con <strong>he, she e it</strong>,
            <strong> isn't</strong>; y con <strong>you, we y they</strong>, <strong>aren't</strong>.
            Para formular preguntas de sí/no, colocamos am, is o are delante del sujeto:
            <em> Are you tired?</em>, <em>Is she happy?</em>.
          </p>
          <p className="mt-3">
            Las respuestas cortas mantienen el auxiliar: <em>Yes, I am</em>, <em>No, I'm not</em>,
            <em> Yes, she is</em> y <em>No, they aren't</em>.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">2. Vocabulario: estados y emociones</h2>
          <p className="mt-3">
            Practica palabras como <em>happy, sad, tired, hungry, thirsty, angry, excited, bored, scared</em>
            y <em>fine</em>. Aprende a responder a <em>How are you?</em> con frases sencillas.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">3. Reading: Laura and Tom</h2>
          <p className="mt-3">
            Comprende un texto breve sobre Laura y Tom, cómo se sienten, qué han hecho y cómo se encuentran
            en la escuela. Identifica frases afirmativas, negativas y preguntas con <em>to be</em>.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">4. Listening: Ben and Ana</h2>
          <p className="mt-3">
            Sigue un diálogo en recepción en el que Ben y Ana hablan de cómo se sienten, si tienen hambre
            o sed y cómo están ese día.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">5. Writing: How I feel</h2>
          <p className="mt-3">
            Escribe frases cortas sobre cómo te sientes, transforma frases a negativa, formula preguntas
            sobre otra persona y redacta pequeños mensajes y párrafos.
          </p>
        </section>
      </article>

      <section className="mt-12 rounded-3xl border border-blue-100 bg-blue-50/70 p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-700">Cuaderno de práctica</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">200 ejercicios de inglés A1</h2>
        <p className="mt-3 leading-7 text-slate-700">
          Diez bloques de actividades para practicar la gramática, las emociones y las destrezas de la unidad.
          Incluye solucionario y explicaciones en español.
        </p>
        <a
          href="/api/biblioteca-pdf/a1/unidad-3-to-be-negativa-preguntas"
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          download
        >
          Descargar los 200 ejercicios en PDF
        </a>
        <p className="mt-3 text-sm text-slate-500">Archivo PDF · Nivel A1 · Unidad 3 · Incluye solucionario.</p>
      </section>

      <aside className="mt-8 rounded-2xl border border-slate-200 p-5">
        <p className="font-semibold text-slate-900">Amplía la explicación en el blog</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Consulta la guía teórica y el artículo original de ejercicios de la Unidad 3.
        </p>
        <div className="mt-3 flex flex-col gap-2 text-sm font-semibold text-blue-700">
          <a href="https://linguafly.app/blog/curso-a1/unidad-3-to-be-negativa-preguntas" target="_blank" rel="noreferrer" className="hover:underline">Guía: To be en negativa y preguntas</a>
          <a href="https://linguafly.app/blog/curso-a1/unidad-3-to-be-ejercicios-soluciones" target="_blank" rel="noreferrer" className="hover:underline">Artículo: ejercicios de la Unidad 3 con soluciones</a>
        </div>
      </aside>

      <p className="mt-10 text-sm text-slate-500">
        <Link href="/biblioteca-pdf" className="font-semibold text-blue-700 hover:underline">Volver a la biblioteca PDF</Link>
      </p>
    </main>
  );
}
