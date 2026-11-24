import Link from "next/link";
import CanonicalMissionFromD1 from "@/components/academy/CanonicalMissionFromD1";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ mission: string }> }) {
  const { mission } = await params;
  return {
    title: `C1 · Misión ${mission} · Linguafly Academy`,
    description: `Practica inglés C1 con la misión ${mission} de Linguafly Academy.`,
    robots: { index: false, follow: false },
  };
}

export default async function C1MissionPage({ params }: { params: Promise<{ mission: string }> }) {
  const { mission } = await params;
  if (!/^\\d{3}$/.test(mission) || Number(mission) < 1 || Number(mission) > 100) {
    return <main className="min-h-screen bg-slate-50 p-8">Misión no encontrada.</main>;
  }
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/academia/c1" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700">← Volver a C1</Link>
        <div className="mt-5"><CanonicalMissionFromD1 level="C1" routeKey={mission} /></div>
      </div>
    </main>
  );
}
