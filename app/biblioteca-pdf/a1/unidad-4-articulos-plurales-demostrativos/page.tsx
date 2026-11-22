import type { Metadata } from "next";
import Link from "next/link";

const canonical = "https://linguafly.app/biblioteca-pdf/a1/unidad-4-articulos-plurales-demostrativos";
const title = "Ejercicios de inglés A1: artículos, plurales y demostrativos – Unidad 4";
const description = "Practica a/an, plurales regulares, this/that/these/those, números del 1 al 10, objetos y colores. Incluye 200 ejercicios con reading, listening, writing y soluciones.";

export const metadata: Metadata = {
  title, description, alternates: { canonical },
  openGraph: { type: "article", title, description, url: canonical, siteName: "Linguafly" },
};

export default function A1Unit4LibraryPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <nav aria-label="Ruta de navegación" className="mb-8 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-700">Inicio</Link><span className="mx-2">/</span>
        <Link href="/biblioteca-pdf" className="hover:text-blue-700">Biblioteca PDF</Link><span className="mx-2">/</span>
        <span aria-current="page" className="text-slate-700">Inglés A1 · Unidad 4</span>
      </nav>
      <header className="mb-10">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-700">Biblioteca de ejercicios · Nivel A1</p>
        <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">Ejercicios de inglés A1 – Unidad 4: A, An, plurales y This/That</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">Aprende a hablar de objetos concretos del aula, colores y cantidades. Practica los artículos a/an, los plurales regulares y los demostrativos para señalar lo que tienes cerca o lejos.</p>
      </header>
      <article className="space-y-8 text-base leading-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">1. Gramática: artículos, plurales y demostrativos</h2>
          <p className="mt-3">Usa <strong>a</strong> delante de un sonido consonántico (<em>a book</em>) y <strong>an</strong> delante de un sonido vocálico (<em>an eraser</em>). Forma los plurales regulares añadiendo <strong>-s</strong>: <em>book → books</em>, <em>pen → pens</em>.</p>
          <p className="mt-3"><strong>This</strong> y <strong>that</strong> se usan con singular; <strong>these</strong> y <strong>those</strong>, con plural. This/these indican cercanía y that/those distancia: <em>This is a pen</em>, <em>Those are books</em>.</p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">2. Vocabulario: números, objetos y colores</h2>
          <p className="mt-3">Repasa los números del 1 al 10 y palabras del aula como <em>pen, book, ruler, eraser</em> y <em>bag</em>. Combina color y objeto: <em>a red pen</em>, <em>blue books</em>.</p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">3. Reading: Pablo's classroom</h2>
          <p className="mt-3">Lee la descripción que hace Pablo de su aula: una pizarra, veinte sillas, diez mesas y objetos de distintos colores sobre su escritorio. Comprueba la comprensión de cantidades, colores, artículos y demostrativos.</p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">4. Listening: Classroom objects</h2>
          <p className="mt-3">Escucha un diálogo para identificar un lápiz amarillo, cuatro gomas rojas y seis libros. Practica preguntas como <em>What is this?</em>, <em>Is that a bag?</em> y <em>How many books are there?</em>.</p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">5. Writing: My desk</h2>
          <p className="mt-3">Escribe frases y pequeños párrafos para describir tu estuche, mochila, escritorio y aula. Utiliza a/an, plurales, colores, números y this/that/these/those.</p>
        </section>
      </article>
      <section className="mt-12 rounded-3xl border border-blue-100 bg-blue-50/70 p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-700">Cuaderno de práctica</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">200 ejercicios de inglés A1</h2>
        <p className="mt-3 leading-7 text-slate-700">Cinco bloques de 40 actividades basados en las cinco lecciones de la unidad: gramática, vocabulario, reading, listening y writing. Incluye solucionario.</p>
        <a href="/api/biblioteca-pdf/a1/unidad-4-articulos-plurales-demostrativos" className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" download>Descargar los 200 ejercicios en PDF</a>
        <p className="mt-3 text-sm text-slate-500">Archivo PDF · Nivel A1 · Unidad 4 · Incluye solucionario.</p>
      </section>
      <aside className="mt-8 rounded-2xl border border-slate-200 p-5">
        <p className="font-semibold text-slate-900">Amplía la explicación en el blog</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">Consulta la guía teórica y el artículo original de ejercicios de la Unidad 4.</p>
        <div className="mt-3 flex flex-col gap-2 text-sm font-semibold text-blue-700">
          <a href="https://linguafly.app/blog/curso-a1/unidad-4-articulos-plurales-demostrativos" target="_blank" rel="noreferrer" className="hover:underline">Guía: A, An, Plurales y This/That</a>
          <a href="https://linguafly.app/blog/curso-a1/unidad-4-articulos-plurales-ejercicios-soluciones" target="_blank" rel="noreferrer" className="hover:underline">Artículo: ejercicios de la Unidad 4 con soluciones</a>
        </div>
      </aside>
      <p className="mt-10 text-sm text-slate-500"><Link href="/biblioteca-pdf" className="font-semibold text-blue-700 hover:underline">Volver a la biblioteca PDF</Link></p>
    </main>
  );
}
