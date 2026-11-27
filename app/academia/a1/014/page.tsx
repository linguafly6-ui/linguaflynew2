import Link from "next/link";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import missionData from "@/content/canonical-missions/a1/014.json";

export const metadata = { title: "Free Time and Hobbies · Misión 014 · Linguafly Academy", description: "Habla de tus aficiones, gustos y actividades de tiempo libre en inglés A1." };

export default function A1Mission014Page() {
  return <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6"><div className="mx-auto max-w-5xl"><Link href="/academia/a1" className="text-sm font-medium text-slate-500 hover:text-blue-700">← Volver al curso A1</Link><div className="mt-5"><CanonicalMission missionData={missionData as Mission} /></div></div></main>;
}
