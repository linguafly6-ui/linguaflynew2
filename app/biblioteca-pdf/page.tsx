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
        </div>
      </section>
    </main>
  );
}
