import Link from "next/link";
import { notFound } from "next/navigation";
import unit01 from "@/content/canonical-missions/b2/unit-01.json";
import unit02 from "@/content/canonical-missions/b2/unit-02.json";
import unit03 from "@/content/canonical-missions/b2/unit-03.json";
import unit04 from "@/content/canonical-missions/b2/unit-04.json";
import unit05 from "@/content/canonical-missions/b2/unit-05.json";
import unit06 from "@/content/canonical-missions/b2/unit-06.json";
import unit07 from "@/content/canonical-missions/b2/unit-07.json";
import unit08 from "@/content/canonical-missions/b2/unit-08.json";
import unit09 from "@/content/canonical-missions/b2/unit-09.json";
import unit10 from "@/content/canonical-missions/b2/unit-10.json";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
const missions = { ...unit01, ...unit02, ...unit03, ...unit04, ...unit05, ...unit06, ...unit07, ...unit08, ...unit09, ...unit10 } as Record<string, Mission>;
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(missions).map((mission) => ({ mission })); }
export async function generateMetadata({ params }: { params: Promise<{ mission: string }> }) { const { mission } = await params; const data = missions[mission]; return data ? { title: `B2 · Misión ${String(data.mission.position).padStart(3,"0")} · ${data.mission.title} · Linguafly Academy`, description: data.sections[0].exercise.theory?.title ?? "Misión de inglés B2" } : {}; }
export default async function B2MissionPage({ params }: { params: Promise<{ mission: string }> }) { const { mission } = await params; const data = missions[mission]; if (!data) notFound(); return <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6"><div className="mx-auto max-w-5xl"><Link href="/academia/b2" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700">← Volver al curso B2</Link><div className="mt-5"><CanonicalMission missionData={data} /></div></div></main>; }
