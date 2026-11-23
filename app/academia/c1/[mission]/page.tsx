import Link from "next/link";
import { notFound } from "next/navigation";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import mission001 from "@/content/canonical-missions/c1/001.json";
import mission002 from "@/content/canonical-missions/c1/002.json";
import mission003 from "@/content/canonical-missions/c1/003.json";
import mission004 from "@/content/canonical-missions/c1/004.json";
import mission005 from "@/content/canonical-missions/c1/005.json";
import mission006 from "@/content/canonical-missions/c1/006.json";
import mission007 from "@/content/canonical-missions/c1/007.json";
import mission008 from "@/content/canonical-missions/c1/008.json";
import mission009 from "@/content/canonical-missions/c1/009.json";
import mission010 from "@/content/canonical-missions/c1/010.json";
import mission011 from "@/content/canonical-missions/c1/011.json";
import mission012 from "@/content/canonical-missions/c1/012.json";
import mission013 from "@/content/canonical-missions/c1/013.json";
import mission014 from "@/content/canonical-missions/c1/014.json";
import mission015 from "@/content/canonical-missions/c1/015.json";
import mission016 from "@/content/canonical-missions/c1/016.json";
import mission017 from "@/content/canonical-missions/c1/017.json";
import mission018 from "@/content/canonical-missions/c1/018.json";
import mission019 from "@/content/canonical-missions/c1/019.json";
import mission020 from "@/content/canonical-missions/c1/020.json";
import mission021 from "@/content/canonical-missions/c1/021.json";
import mission022 from "@/content/canonical-missions/c1/022.json";
import mission023 from "@/content/canonical-missions/c1/023.json";
import mission024 from "@/content/canonical-missions/c1/024.json";
import mission025 from "@/content/canonical-missions/c1/025.json";
import mission026 from "@/content/canonical-missions/c1/026.json";
import mission027 from "@/content/canonical-missions/c1/027.json";
import mission028 from "@/content/canonical-missions/c1/028.json";
import mission029 from "@/content/canonical-missions/c1/029.json";
import mission030 from "@/content/canonical-missions/c1/030.json";
import mission031 from "@/content/canonical-missions/c1/031.json";
import mission032 from "@/content/canonical-missions/c1/032.json";
import mission033 from "@/content/canonical-missions/c1/033.json";
import mission034 from "@/content/canonical-missions/c1/034.json";
import mission035 from "@/content/canonical-missions/c1/035.json";
import mission036 from "@/content/canonical-missions/c1/036.json";
import mission037 from "@/content/canonical-missions/c1/037.json";
import mission038 from "@/content/canonical-missions/c1/038.json";
import mission039 from "@/content/canonical-missions/c1/039.json";
import mission040 from "@/content/canonical-missions/c1/040.json";
import mission041 from "@/content/canonical-missions/c1/041.json";
import mission042 from "@/content/canonical-missions/c1/042.json";
import mission043 from "@/content/canonical-missions/c1/043.json";
import mission044 from "@/content/canonical-missions/c1/044.json";
import mission045 from "@/content/canonical-missions/c1/045.json";
import mission046 from "@/content/canonical-missions/c1/046.json";
import mission047 from "@/content/canonical-missions/c1/047.json";
import mission048 from "@/content/canonical-missions/c1/048.json";
import mission049 from "@/content/canonical-missions/c1/049.json";
import mission050 from "@/content/canonical-missions/c1/050.json";
import mission051 from "@/content/canonical-missions/c1/051.json";
import mission052 from "@/content/canonical-missions/c1/052.json";
import mission053 from "@/content/canonical-missions/c1/053.json";
import mission054 from "@/content/canonical-missions/c1/054.json";
import mission055 from "@/content/canonical-missions/c1/055.json";
import mission056 from "@/content/canonical-missions/c1/056.json";
import mission057 from "@/content/canonical-missions/c1/057.json";
import mission058 from "@/content/canonical-missions/c1/058.json";
import mission059 from "@/content/canonical-missions/c1/059.json";
import mission060 from "@/content/canonical-missions/c1/060.json";
import mission061 from "@/content/canonical-missions/c1/061.json";
import mission062 from "@/content/canonical-missions/c1/062.json";
import mission063 from "@/content/canonical-missions/c1/063.json";
import mission064 from "@/content/canonical-missions/c1/064.json";
import mission065 from "@/content/canonical-missions/c1/065.json";
import mission066 from "@/content/canonical-missions/c1/066.json";
import mission067 from "@/content/canonical-missions/c1/067.json";
import mission068 from "@/content/canonical-missions/c1/068.json";
import mission069 from "@/content/canonical-missions/c1/069.json";
import mission070 from "@/content/canonical-missions/c1/070.json";
import mission071 from "@/content/canonical-missions/c1/071.json";
import mission072 from "@/content/canonical-missions/c1/072.json";
import mission073 from "@/content/canonical-missions/c1/073.json";
import mission074 from "@/content/canonical-missions/c1/074.json";
import mission075 from "@/content/canonical-missions/c1/075.json";
import mission076 from "@/content/canonical-missions/c1/076.json";
import mission077 from "@/content/canonical-missions/c1/077.json";
import mission078 from "@/content/canonical-missions/c1/078.json";
import mission079 from "@/content/canonical-missions/c1/079.json";
import mission080 from "@/content/canonical-missions/c1/080.json";
import mission081 from "@/content/canonical-missions/c1/081.json";
import mission082 from "@/content/canonical-missions/c1/082.json";
import mission083 from "@/content/canonical-missions/c1/083.json";
import mission084 from "@/content/canonical-missions/c1/084.json";
import mission085 from "@/content/canonical-missions/c1/085.json";
import mission086 from "@/content/canonical-missions/c1/086.json";
import mission087 from "@/content/canonical-missions/c1/087.json";
import mission088 from "@/content/canonical-missions/c1/088.json";
import mission089 from "@/content/canonical-missions/c1/089.json";
import mission090 from "@/content/canonical-missions/c1/090.json";
import mission091 from "@/content/canonical-missions/c1/091.json";
import mission092 from "@/content/canonical-missions/c1/092.json";
import mission093 from "@/content/canonical-missions/c1/093.json";
import mission094 from "@/content/canonical-missions/c1/094.json";
import mission095 from "@/content/canonical-missions/c1/095.json";
import mission096 from "@/content/canonical-missions/c1/096.json";
import mission097 from "@/content/canonical-missions/c1/097.json";
import mission098 from "@/content/canonical-missions/c1/098.json";
import mission099 from "@/content/canonical-missions/c1/099.json";
import mission100 from "@/content/canonical-missions/c1/100.json";

const missions: Record<string, Mission> = {
  "001": mission001 as Mission,
  "002": mission002 as Mission,
  "003": mission003 as Mission,
  "004": mission004 as Mission,
  "005": mission005 as Mission,
  "006": mission006 as Mission,
  "007": mission007 as Mission,
  "008": mission008 as Mission,
  "009": mission009 as Mission,
  "010": mission010 as Mission,
  "011": mission011 as Mission,
  "012": mission012 as Mission,
  "013": mission013 as Mission,
  "014": mission014 as Mission,
  "015": mission015 as Mission,
  "016": mission016 as Mission,
  "017": mission017 as Mission,
  "018": mission018 as Mission,
  "019": mission019 as Mission,
  "020": mission020 as Mission,
  "021": mission021 as Mission,
  "022": mission022 as Mission,
  "023": mission023 as Mission,
  "024": mission024 as Mission,
  "025": mission025 as Mission,
  "026": mission026 as Mission,
  "027": mission027 as Mission,
  "028": mission028 as Mission,
  "029": mission029 as Mission,
  "030": mission030 as Mission,
  "031": mission031 as Mission,
  "032": mission032 as Mission,
  "033": mission033 as Mission,
  "034": mission034 as Mission,
  "035": mission035 as Mission,
  "036": mission036 as Mission,
  "037": mission037 as Mission,
  "038": mission038 as Mission,
  "039": mission039 as Mission,
  "040": mission040 as Mission,
  "041": mission041 as Mission,
  "042": mission042 as Mission,
  "043": mission043 as Mission,
  "044": mission044 as Mission,
  "045": mission045 as Mission,
  "046": mission046 as Mission,
  "047": mission047 as Mission,
  "048": mission048 as Mission,
  "049": mission049 as Mission,
  "050": mission050 as Mission,
  "051": mission051 as Mission,
  "052": mission052 as Mission,
  "053": mission053 as Mission,
  "054": mission054 as Mission,
  "055": mission055 as Mission,
  "056": mission056 as Mission,
  "057": mission057 as Mission,
  "058": mission058 as Mission,
  "059": mission059 as Mission,
  "060": mission060 as Mission,
  "061": mission061 as Mission,
  "062": mission062 as Mission,
  "063": mission063 as Mission,
  "064": mission064 as Mission,
  "065": mission065 as Mission,
  "066": mission066 as Mission,
  "067": mission067 as Mission,
  "068": mission068 as Mission,
  "069": mission069 as Mission,
  "070": mission070 as Mission,
  "071": mission071 as Mission,
  "072": mission072 as Mission,
  "073": mission073 as Mission,
  "074": mission074 as Mission,
  "075": mission075 as Mission,
  "076": mission076 as Mission,
  "077": mission077 as Mission,
  "078": mission078 as Mission,
  "079": mission079 as Mission,
  "080": mission080 as Mission,
  "081": mission081 as Mission,
  "082": mission082 as Mission,
  "083": mission083 as Mission,
  "084": mission084 as Mission,
  "085": mission085 as Mission,
  "086": mission086 as Mission,
  "087": mission087 as Mission,
  "088": mission088 as Mission,
  "089": mission089 as Mission,
  "090": mission090 as Mission,
  "091": mission091 as Mission,
  "092": mission092 as Mission,
  "093": mission093 as Mission,
  "094": mission094 as Mission,
  "095": mission095 as Mission,
  "096": mission096 as Mission,
  "097": mission097 as Mission,
  "098": mission098 as Mission,
  "099": mission099 as Mission,
  "100": mission100 as Mission,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(missions).map((mission) => ({ mission }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mission: string }>;
}) {
  const { mission } = await params;
  const data = missions[mission];

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
  const data = missions[mission];

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
