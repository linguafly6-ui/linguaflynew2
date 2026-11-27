import Link from "next/link";
import { notFound } from "next/navigation";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import mission001 from "@/content/canonical-missions/a1/001.json";
import mission002 from "@/content/canonical-missions/a1/002.json";

const canonicalMissions: Record<string, Mission> = {
  "001": mission001 as Mission,
  "002": mission002 as Mission,
};

const missionIds = Array.from({ length: 100 }, (_, index) =>
  String(index + 1).padStart(3, "0")
);

export const dynamicParams = false;

export function generateStaticParams() {
  return missionIds.map((mission) => ({ mission }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mission: string }>;
}) {
  const { mission } = await params;
  if (!missionIds.includes(mission)) return {};

  const canonical = canonicalMissions[mission];
  return {
    title: canonical
      ? `${canonical.mission.title} · Misión ${mission} · Linguafly A1`
      : `Misión ${mission} · Curso de inglés A1 · Linguafly`,
    description: canonical
      ? `Practica inglés A1 con la misión ${mission}: ${canonical.mission.title}.`
      : `Accede al contenido de la misión ${mission} del curso de inglés A1.`,
  };
}

export default async function A1MissionPage({
  params,
}: {
  params: Promise<{ mission: string }>;
}) {
  const { mission } = await params;
  if (!missionIds.includes(mission)) notFound();

  const canonical = canonicalMissions[mission];
  const legacyFile = Number(mission) <= 40 ? "index.html" : "index-v2.html";
  const legacySrc = `/missions/a1/${mission}/${legacyFile}?rev=20261123-a1-unified`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/academia/a1"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
        >
          <span aria-hidden="true">←</span> Volver al curso A1
        </Link>
        <div className="mt-5">
          {canonical ? (
            <CanonicalMission missionData={canonical} />
          ) : (
            <>
              <div className="mb-5">
                <p className="text-xs font-extrabold uppercase tracking-[.18em] text-indigo-700">
                  Linguafly Academy · Nivel A1
                </p>
                <h1 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                  Misión {mission}
                </h1>
              </div>
              <iframe
                title={`Misión ${mission} · Curso A1`}
                src={legacySrc}
                className="h-[1100px] w-full rounded-2xl border border-slate-200 bg-white"
                loading="eager"
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
