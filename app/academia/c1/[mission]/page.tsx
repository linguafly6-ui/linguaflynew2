import Link from "next/link";
import { notFound } from "next/navigation";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";

const missionLoaders: Record<string, () => Promise<Mission>> = {
  "001": async () => (await import("@/content/canonical-missions/c1/001.json")).default as Mission,
  "002": async () => (await import("@/content/canonical-missions/c1/002.json")).default as Mission,
  "003": async () => (await import("@/content/canonical-missions/c1/003.json")).default as Mission,
  "004": async () => (await import("@/content/canonical-missions/c1/004.json")).default as Mission,
  "005": async () => (await import("@/content/canonical-missions/c1/005.json")).default as Mission,
  "006": async () => (await import("@/content/canonical-missions/c1/006.json")).default as Mission,
  "007": async () => (await import("@/content/canonical-missions/c1/007.json")).default as Mission,
  "008": async () => (await import("@/content/canonical-missions/c1/008.json")).default as Mission,
  "009": async () => (await import("@/content/canonical-missions/c1/009.json")).default as Mission,
  "010": async () => (await import("@/content/canonical-missions/c1/010.json")).default as Mission,
  "011": async () => (await import("@/content/canonical-missions/c1/011.json")).default as Mission,
  "012": async () => (await import("@/content/canonical-missions/c1/012.json")).default as Mission,
  "013": async () => (await import("@/content/canonical-missions/c1/013.json")).default as Mission,
  "014": async () => (await import("@/content/canonical-missions/c1/014.json")).default as Mission,
  "015": async () => (await import("@/content/canonical-missions/c1/015.json")).default as Mission,
  "016": async () => (await import("@/content/canonical-missions/c1/016.json")).default as Mission,
  "017": async () => (await import("@/content/canonical-missions/c1/017.json")).default as Mission,
  "018": async () => (await import("@/content/canonical-missions/c1/018.json")).default as Mission,
  "019": async () => (await import("@/content/canonical-missions/c1/019.json")).default as Mission,
  "020": async () => (await import("@/content/canonical-missions/c1/020.json")).default as Mission,
  "021": async () => (await import("@/content/canonical-missions/c1/021.json")).default as Mission,
  "022": async () => (await import("@/content/canonical-missions/c1/022.json")).default as Mission,
  "023": async () => (await import("@/content/canonical-missions/c1/023.json")).default as Mission,
  "024": async () => (await import("@/content/canonical-missions/c1/024.json")).default as Mission,
  "025": async () => (await import("@/content/canonical-missions/c1/025.json")).default as Mission,
  "026": async () => (await import("@/content/canonical-missions/c1/026.json")).default as Mission,
  "027": async () => (await import("@/content/canonical-missions/c1/027.json")).default as Mission,
  "028": async () => (await import("@/content/canonical-missions/c1/028.json")).default as Mission,
  "029": async () => (await import("@/content/canonical-missions/c1/029.json")).default as Mission,
  "030": async () => (await import("@/content/canonical-missions/c1/030.json")).default as Mission,
  "031": async () => (await import("@/content/canonical-missions/c1/031.json")).default as Mission,
  "032": async () => (await import("@/content/canonical-missions/c1/032.json")).default as Mission,
  "033": async () => (await import("@/content/canonical-missions/c1/033.json")).default as Mission,
  "034": async () => (await import("@/content/canonical-missions/c1/034.json")).default as Mission,
  "035": async () => (await import("@/content/canonical-missions/c1/035.json")).default as Mission,
  "036": async () => (await import("@/content/canonical-missions/c1/036.json")).default as Mission,
  "037": async () => (await import("@/content/canonical-missions/c1/037.json")).default as Mission,
  "038": async () => (await import("@/content/canonical-missions/c1/038.json")).default as Mission,
  "039": async () => (await import("@/content/canonical-missions/c1/039.json")).default as Mission,
  "040": async () => (await import("@/content/canonical-missions/c1/040.json")).default as Mission,
  "041": async () => (await import("@/content/canonical-missions/c1/041.json")).default as Mission,
  "042": async () => (await import("@/content/canonical-missions/c1/042.json")).default as Mission,
  "043": async () => (await import("@/content/canonical-missions/c1/043.json")).default as Mission,
  "044": async () => (await import("@/content/canonical-missions/c1/044.json")).default as Mission,
  "045": async () => (await import("@/content/canonical-missions/c1/045.json")).default as Mission,
  "046": async () => (await import("@/content/canonical-missions/c1/046.json")).default as Mission,
  "047": async () => (await import("@/content/canonical-missions/c1/047.json")).default as Mission,
  "048": async () => (await import("@/content/canonical-missions/c1/048.json")).default as Mission,
  "049": async () => (await import("@/content/canonical-missions/c1/049.json")).default as Mission,
  "050": async () => (await import("@/content/canonical-missions/c1/050.json")).default as Mission,
  "051": async () => (await import("@/content/canonical-missions/c1/051.json")).default as Mission,
  "052": async () => (await import("@/content/canonical-missions/c1/052.json")).default as Mission,
  "053": async () => (await import("@/content/canonical-missions/c1/053.json")).default as Mission,
  "054": async () => (await import("@/content/canonical-missions/c1/054.json")).default as Mission,
  "055": async () => (await import("@/content/canonical-missions/c1/055.json")).default as Mission,
  "056": async () => (await import("@/content/canonical-missions/c1/056.json")).default as Mission,
  "057": async () => (await import("@/content/canonical-missions/c1/057.json")).default as Mission,
  "058": async () => (await import("@/content/canonical-missions/c1/058.json")).default as Mission,
  "059": async () => (await import("@/content/canonical-missions/c1/059.json")).default as Mission,
  "060": async () => (await import("@/content/canonical-missions/c1/060.json")).default as Mission,
  "061": async () => (await import("@/content/canonical-missions/c1/061.json")).default as Mission,
  "062": async () => (await import("@/content/canonical-missions/c1/062.json")).default as Mission,
  "063": async () => (await import("@/content/canonical-missions/c1/063.json")).default as Mission,
  "064": async () => (await import("@/content/canonical-missions/c1/064.json")).default as Mission,
  "065": async () => (await import("@/content/canonical-missions/c1/065.json")).default as Mission,
  "066": async () => (await import("@/content/canonical-missions/c1/066.json")).default as Mission,
  "067": async () => (await import("@/content/canonical-missions/c1/067.json")).default as Mission,
  "068": async () => (await import("@/content/canonical-missions/c1/068.json")).default as Mission,
  "069": async () => (await import("@/content/canonical-missions/c1/069.json")).default as Mission,
  "070": async () => (await import("@/content/canonical-missions/c1/070.json")).default as Mission,
  "071": async () => (await import("@/content/canonical-missions/c1/071.json")).default as Mission,
  "072": async () => (await import("@/content/canonical-missions/c1/072.json")).default as Mission,
  "073": async () => (await import("@/content/canonical-missions/c1/073.json")).default as Mission,
  "074": async () => (await import("@/content/canonical-missions/c1/074.json")).default as Mission,
  "075": async () => (await import("@/content/canonical-missions/c1/075.json")).default as Mission,
  "076": async () => (await import("@/content/canonical-missions/c1/076.json")).default as Mission,
  "077": async () => (await import("@/content/canonical-missions/c1/077.json")).default as Mission,
  "078": async () => (await import("@/content/canonical-missions/c1/078.json")).default as Mission,
  "079": async () => (await import("@/content/canonical-missions/c1/079.json")).default as Mission,
  "080": async () => (await import("@/content/canonical-missions/c1/080.json")).default as Mission,
  "081": async () => (await import("@/content/canonical-missions/c1/081.json")).default as Mission,
  "082": async () => (await import("@/content/canonical-missions/c1/082.json")).default as Mission,
  "083": async () => (await import("@/content/canonical-missions/c1/083.json")).default as Mission,
  "084": async () => (await import("@/content/canonical-missions/c1/084.json")).default as Mission,
  "085": async () => (await import("@/content/canonical-missions/c1/085.json")).default as Mission,
  "086": async () => (await import("@/content/canonical-missions/c1/086.json")).default as Mission,
  "087": async () => (await import("@/content/canonical-missions/c1/087.json")).default as Mission,
  "088": async () => (await import("@/content/canonical-missions/c1/088.json")).default as Mission,
  "089": async () => (await import("@/content/canonical-missions/c1/089.json")).default as Mission,
  "090": async () => (await import("@/content/canonical-missions/c1/090.json")).default as Mission,
  "091": async () => (await import("@/content/canonical-missions/c1/091.json")).default as Mission,
  "092": async () => (await import("@/content/canonical-missions/c1/092.json")).default as Mission,
  "093": async () => (await import("@/content/canonical-missions/c1/093.json")).default as Mission,
  "094": async () => (await import("@/content/canonical-missions/c1/094.json")).default as Mission,
  "095": async () => (await import("@/content/canonical-missions/c1/095.json")).default as Mission,
  "096": async () => (await import("@/content/canonical-missions/c1/096.json")).default as Mission,
  "097": async () => (await import("@/content/canonical-missions/c1/097.json")).default as Mission,
  "098": async () => (await import("@/content/canonical-missions/c1/098.json")).default as Mission,
  "099": async () => (await import("@/content/canonical-missions/c1/099.json")).default as Mission,
  "100": async () => (await import("@/content/canonical-missions/c1/100.json")).default as Mission,
};

async function loadMission(mission: string): Promise<Mission | undefined> {
  const loader = missionLoaders[mission];
  return loader ? loader() : undefined;
}

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
  const data = await loadMission(mission);

  if (!data) return {};

  return {
    title: `${data.mission.title} · C1 Mission ${mission} · Linguafly`,
    description: `Practica inglés C1 con la misión ${mission}: ${data.mission.title}.`,
    robots: { index: false, follow: false },
  };
}

export default async function C1MissionPage({
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
          href="/academia/c1"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
        >
          <span aria-hidden="true">←</span> Volver a C1
        </Link>
        <div className="mt-5">
          <CanonicalMission missionData={data} />
        </div>
      </div>
    </main>
  );
}
