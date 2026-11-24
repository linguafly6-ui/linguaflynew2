import Link from "next/link";
import CanonicalMissionFromD1 from "@/components/academy/CanonicalMissionFromD1";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ mission: string }> }) {
  const { mission } = await params;
  return {
    title: `A1 · Misión ${mission} · Linguafly Academy`,
    description: `Practica inglés A1 con la misión ${mission} de Linguafly Academy.`,
    robots: { index: false, follow: false },
  };
}

export default async function MissionPage({ params }: { params: Promise<{ mission: string }> }) {
  const { mission } = await params;
  const number = Number(mission);
  if (!/^\d{3}$/.test(mission) || number < 1 || number > 2) {
    return <main className="min-h-screen bg-slate-50 p-8">Misión no encontrada.</main>;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/academia/a1" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700">
          ← Volver al curso A1
        </Link>
        <div className="mt-5">
          <CanonicalMissionFromD1 level="A1" routeKey={mission} />
        </div>
      </div>
    </main>
  );
}
