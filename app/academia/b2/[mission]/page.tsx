import Link from "next/link";
import { notFound } from "next/navigation";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";

const unitLoaders: Record<number, () => Promise<Record<string, Mission>>> = {
  1: async () => (await import("@/content/canonical-missions/b2/unit-01.json")).default as Record<string, Mission>,
  2: async () => (await import("@/content/canonical-missions/b2/unit-02.json")).default as Record<string, Mission>,
  3: async () => (await import("@/content/canonical-missions/b2/unit-03.json")).default as Record<string, Mission>,
  4: async () => (await import("@/content/canonical-missions/b2/unit-04.json")).default as Record<string, Mission>,
  5: async () => (await import("@/content/canonical-missions/b2/unit-05.json")).default as Record<string, Mission>,
  6: async () => (await import("@/content/canonical-missions/b2/unit-06.json")).default as Record<string, Mission>,
  7: async () => (await import("@/content/canonical-missions/b2/unit-07.json")).default as Record<string, Mission>,
  8: async () => (await import("@/content/canonical-missions/b2/unit-08.json")).default as Record<string, Mission>,
  9: async () => (await import("@/content/canonical-missions/b2/unit-09.json")).default as Record<string, Mission>,
  10: async () => (await import("@/content/canonical-missions/b2/unit-10.json")).default as Record<string, Mission>,
};

async function loadMission(mission: string): Promise<Mission | undefined> {
  const missionNumber = Number(mission.slice(0, 3));
  if (!Number.isInteger(missionNumber) || missionNumber < 2 || missionNumber > 100) {
    return undefined;
  }

  const unitNumber = Math.ceil((missionNumber - 1) / 10);
  const loader = unitLoaders[unitNumber];
  if (!loader) return undefined;

  const unitMissions = await loader();
  return unitMissions[mission];
}

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
  const data = await loadMission(mission);

  return data
    ? {
        title: `B2 · Misión ${String(data.mission.position).padStart(3, "0")} · ${data.mission.title} · Linguafly Academy`,
        description:
          data.sections[0].exercise.theory?.title ?? "Misión de inglés B2",
      }
    : {};
}

export default async function B2MissionPage({
  params,
}: {
  params: Promise<{ mission: string }>;
}) {
  const { mission } = await params;
  const data = await loadMission(mission);

  if (!data) notFound();

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
          <CanonicalMission missionData={data} />
        </div>
      </div>
    </main>
  );
}
