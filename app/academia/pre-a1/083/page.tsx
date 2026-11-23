import Link from "next/link";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import missionData from "@/content/canonical-missions/pre-a1/083.json";
export const metadata = { title: "At the Hairdresser · Misión 083 · Linguafly", description: "Practica inglés Pre-A1 con vocabulario, comprensión y actividades guiadas: At the Hairdresser.", robots: { index: false, follow: false } };
export default function MissionPage() { return <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6"><div className="mx-auto max-w-5xl"><Link href="/academia/pre-a1" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700">← Misiones Pre-A1</Link><div className="mt-5"><CanonicalMission missionData={missionData as Mission} /></div></div></main>; }
