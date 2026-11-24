import Link from "next/link";
import CanonicalMissionFromD1 from "@/components/academy/CanonicalMissionFromD1";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ mission: string }> }) {
  const { mission } = await params;
  const missionNumber = mission.slice(0, 3);
  return {
    title: `B2 · Misión ${missionNumber} · Linguafly Academy`,
    description: `Practica inglés B2 con la misión ${missionNumber} de Linguafly Academy.`,
    robots: { index: false, follow: false },
  };
}

export default async function B2MissionPage({ params }: { params: Promise<{ mission: string }> }) {
  const { mission } = await params;
  const valid = /^\\d{3}-canonical$/.test(mission) && Number(mission.slice(0, 3)) >= 2 && Number(mission.slice(0, 3)) <= 100;
  if (!valid) return <main className="min-h-screen bg-slate-50 p-8">Misión no encontrada.</main>;
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/academia/b2" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700">← Volver al curso B2</Link>
        <div className="mt-5"><CanonicalMissionFromD1 level="B2" routeKey={mission} /></div>
      </div>
    </main>
  );
}
