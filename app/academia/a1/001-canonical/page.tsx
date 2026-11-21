import Link from "next/link";
import CanonicalMissionFrame from "@/components/academy/CanonicalMissionFrame";

export const metadata = {
  title: "A1 · Misión 001 · Linguafly Academy",
  description: "Misión piloto con la presentación minimalista unificada de Linguafly Academy.",
  robots: { index: false, follow: false },
};

export default function CanonicalA1MissionPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/academia/preview" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700">
          <span aria-hidden="true">←</span> Volver al diseño de la academia
        </Link>
        <div className="mt-5">
          <CanonicalMissionFrame />
        </div>
        <p className="mx-auto mt-4 max-w-3xl text-xs leading-5 text-slate-400">
          Piloto visual. Se reutiliza el contenido y el runtime de la misión existente; esta vista no modifica ni registra el progreso del alumno.
        </p>
      </div>
    </main>
  );
}
