import Link from "next/link";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import missionData from "@/content/canonical-missions/a1/018.json";

export const metadata = { title: "Places in Town · Misión 018 · Linguafly Academy", description: "Aprende vocabulario de lugares y servicios de una localidad con inglés A1." };

export default function A1Mission018Page() {
  return <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6"><div className="mx-auto max-w-5xl"><Link href="/academia/a1" className="text-sm font-medium text-slate-500 hover:text-blue-700">← Volver al curso A1</Link><div className="mt-5"><CanonicalMission missionData={missionData as Mission} /></div></div></main>;
}
