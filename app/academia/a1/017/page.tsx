import Link from "next/link";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import missionData from "@/content/canonical-missions/a1/017.json";

export const metadata = { title: "There Is and There Are · Misión 017 · Linguafly Academy", description: "Aprende a decir qué hay y qué no hay en una vivienda con there is y there are." };

export default function A1Mission017Page() {
  return <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6"><div className="mx-auto max-w-5xl"><Link href="/academia/a1" className="text-sm font-medium text-slate-500 hover:text-blue-700">← Volver al curso A1</Link><div className="mt-5"><CanonicalMission missionData={missionData as Mission} /></div></div></main>;
}
