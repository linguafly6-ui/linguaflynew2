import type { Metadata } from "next";
import Link from "next/link";
import { A2_PDF_UNITS } from "@/lib/a2-pdf-units";

const canonical = "https://linguafly.app/biblioteca-pdf/a2";

export const metadata: Metadata = {
  title: "Curso de inglés A2 en PDF: unidades y ejercicios | Linguafly",
  description: "Biblioteca independiente del curso de inglés A2. Accede a las primeras treinta unidades con explicaciones, ejemplos, vocabulario, ejercicios y soluciones descargables en PDF.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    title: "Curso de inglés A2 en PDF: unidades y ejercicios | Linguafly",
    description: "Treinta cuadernos de inglés A2 con teoría, vocabulario, práctica y soluciones.",
    url: canonical,
    siteName: "Linguafly",
  },
};

export default function A2PdfLibraryPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <Link href="/biblioteca-pdf" className="text-sm font-bold text-blue-700 hover:underline">← Biblioteca A1</Link>
      <header className="mt-9 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-700">Linguafly · Elementary</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Curso de inglés A2 en PDF</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Avanza al nivel elemental con una colección independiente de treinta unidades. Cada cuaderno reúne
          explicaciones en español, estructuras gramaticales, ejemplos, vocabulario, actividades y soluciones explicadas.
        </p>
      </header>
      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-950">Unidades del curso A2</h2>
            <p className="mt-2 text-sm text-slate-600">Selecciona una unidad para estudiar y descargar su PDF.</p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-800">30 unidades</span>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {A2_PDF_UNITS.map((unit) => (
            <Link key={unit.slug} href={`/biblioteca-pdf/a2/${unit.slug}`} className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Unidad {unit.number} · A2</span>
              <h3 className="mt-2 text-xl font-extrabold text-slate-950">{unit.title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{unit.focus}</p>
              <span className="mt-4 inline-flex font-bold text-blue-700">Ver unidad y descargar PDF →</span>
            </Link>
          ))}
        </div>
      </section>
      <footer className="mt-12 border-t border-slate-200 pt-6">
        <Link href="/biblioteca-pdf" className="font-bold text-blue-700 hover:underline">Volver a la biblioteca A1</Link>
      </footer>
    </main>
  );
}
