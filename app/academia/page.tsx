import Link from "next/link";

export const metadata = {
  title: "Linguafly Academy · Renovación del itinerario",
  description: "El contenido de las misiones está en reconstrucción. Conserva tu acceso al test de nivel."
};

export default function AcademyPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-center px-5 py-16">
      <p className="text-sm font-bold uppercase tracking-[.2em] text-blue-700">Linguafly Academy</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
        Estamos reconstruyendo el itinerario de aprendizaje.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        Hemos retirado el contenido anterior para preparar una nueva estructura de misiones.
        El test de nivel y los datos de las cuentas se mantienen.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/test-nivel" className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800">
          Hacer el test de nivel
        </Link>
        <Link href="/" className="rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-700 hover:bg-slate-50">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
