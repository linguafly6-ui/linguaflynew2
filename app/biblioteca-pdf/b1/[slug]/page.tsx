import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { B1_PDF_UNITS } from "@/lib/b1-pdf-units";
import { getB1ReadingPassages } from "@/lib/b1-exercise-generator";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const unit = B1_PDF_UNITS.find((item) => item.slug === slug);
  if (!unit) return { title: "Unidad B1 no encontrada | Linguafly" };
  const title = `${unit.title} en inglés B1: ejercicios PDF | Linguafly`;
  const description = `Cuaderno de inglés B1, unidad ${unit.number}: ${unit.focus} Incluye explicación, ejemplos, vocabulario, ejercicios y soluciones.`;
  return {
    title,
    description,
    alternates: { canonical: `https://linguafly.app/biblioteca-pdf/b1/${slug}` },
    openGraph: { title, description, type: "article", url: `https://linguafly.app/biblioteca-pdf/b1/${slug}` },
  };
}

export function generateStaticParams() {
  return B1_PDF_UNITS.map((unit) => ({ slug: unit.slug }));
}

export default async function B1PdfUnitPage({ params }: Props) {
  const { slug } = await params;
  const unit = B1_PDF_UNITS.find((item) => item.slug === slug);
  if (!unit) notFound();
  const readingPassages = getB1ReadingPassages(unit);

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <Link href="/biblioteca-pdf" className="text-sm font-bold text-blue-700 hover:underline">← Biblioteca de PDFs</Link>
      <header className="mt-8 rounded-3xl bg-slate-950 p-7 text-white sm:p-10">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-200">Inglés B1 · Unidad {unit.number}</p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">{unit.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">{unit.focus}</p>
        <a href={`/api/biblioteca-pdf/b1/${unit.slug}`} className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-extrabold text-slate-950 hover:bg-blue-50">Descargar cuaderno PDF →</a>
      </header>
      <section className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-extrabold">Qué vas a aprender</h2>
        <p className="mt-3 leading-8 text-slate-700">{unit.explanation}</p>
      </section>
      <section className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-extrabold">Estructuras clave</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            {unit.structure.map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-extrabold">Vocabulario</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            {unit.vocabulary.map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </div>
      </section>
      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-extrabold">Ejemplos en contexto</h2>
        <ul className="mt-4 space-y-3 text-slate-700">
          {unit.examples.map((item) => <li key={item} className="rounded-xl bg-slate-50 p-3">{item}</li>)}
        </ul>
      </section>
      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-extrabold">Reading: textos de comprensión</h2>
        <p className="mt-2 text-sm text-slate-600">Lee estos textos en inglés antes de responder a las 60 preguntas de comprensión incluidas en el cuaderno PDF.</p>
        <div className="mt-5 space-y-5">
          {readingPassages.map((passage, index) => (
            <article key={passage.title} className="rounded-xl bg-slate-50 p-4">
              <h3 className="font-bold text-slate-900">Text {index + 1}: {passage.title}</h3>
              <p className="mt-2 leading-7 text-slate-700">{passage.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-extrabold">Practica lo aprendido</h2>
        <p className="mt-2 text-sm text-slate-600">El cuaderno contiene 200 ejercicios: 80 de gramática, 60 de vocabulario y 60 preguntas de comprensión lectora (reading), con solucionario.</p>
        <a href={`/api/biblioteca-pdf/b1/${unit.slug}`} className="mt-5 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-bold text-white">Descargar PDF de la unidad {unit.number}</a>
      </section>
      <nav className="mt-8 flex items-center justify-between gap-4 text-sm font-bold">
        {unit.number > 1 ? <Link className="text-blue-700 hover:underline" href={`/biblioteca-pdf/b1/${B1_PDF_UNITS[unit.number - 2].slug}`}>← Unidad anterior</Link> : <span />}
        {unit.number < B1_PDF_UNITS.length ? <Link className="text-blue-700 hover:underline" href={`/biblioteca-pdf/b1/${B1_PDF_UNITS[unit.number].slug}`}>Unidad siguiente →</Link> : <Link className="text-blue-700 hover:underline" href="/biblioteca-pdf">Volver a la biblioteca →</Link>}
      </nav>
    </main>
  );
}
