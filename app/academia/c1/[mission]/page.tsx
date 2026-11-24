import Link from "next/link";
import CanonicalMissionFromAsset from "@/components/academy/CanonicalMissionFromAsset";

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: 100 }, (_, index) => ({
    mission: String(index + 1).padStart(3, "0"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mission: string }>;
}) {
  const { mission } = await params;
  return {
    title: `C1 · Misión ${mission} · Linguafly Academy`,
    description: `Practica inglés C1 con la misión ${mission} de Linguafly Academy.`,
    robots: { index: false, follow: false },
  };
}

export default async function C1MissionPage({
  params,
}: {
  params: Promise<{ mission: string }>;
}) {
  const { mission } = await params;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/academia/c1"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
        >
          <span aria-hidden="true">←</span> Volver a C1
        </Link>
        <div className="mt-5">
          <CanonicalMissionFromAsset
            src={`/canonical-missions/c1/${mission}.json`}
            level="C1"
            routeKey={mission}
          />
        </div>
      </div>
    </main>
  );
}
