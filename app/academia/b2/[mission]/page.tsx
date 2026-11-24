import Link from "next/link";
import CanonicalMissionFromAsset from "@/components/academy/CanonicalMissionFromAsset";

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: 99 }, (_, index) => ({
    mission: `${String(index + 2).padStart(3, "0")}-canonical`,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mission: string }>;
}) {
  const { mission } = await params;
  const missionNumber = mission.slice(0, 3);
  return {
    title: `B2 · Misión ${missionNumber} · Linguafly Academy`,
    description: `Practica inglés B2 con la misión ${missionNumber} de Linguafly Academy.`,
  };
}

export default async function B2MissionPage({
  params,
}: {
  params: Promise<{ mission: string }>;
}) {
  const { mission } = await params;
  const missionNumber = Number(mission.slice(0, 3));
  const unitNumber = Math.ceil((missionNumber - 1) / 10);
  const unitFile = `unit-${String(unitNumber).padStart(2, "0")}.json`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/academia/b2"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
        >
          ← Volver al curso B2
        </Link>
        <div className="mt-5">
          <CanonicalMissionFromAsset
            src={`/canonical-missions/b2/${unitFile}`}
            missionKey={mission}
          />
        </div>
      </div>
    </main>
  );
}
