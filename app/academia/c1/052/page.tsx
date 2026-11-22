import Link from "next/link";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import mission from "@/content/canonical-missions/c1/052.json";
export const metadata = { title: "Symbolism, Imagery and Metaphor · C1 Mission 052 · Linguafly", description: "Practica comunicación avanzada sobre symbolism, imagery and metaphor en inglés C1.", robots: { index: false, follow: false } };
export default function C1Mission052Page() { return <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6"><div className="mx-auto max-w-5xl"><Link href="/academia/c1" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"><span aria-hidden="true">←</span> Volver a C1</Link><div className="mt-5"><CanonicalMission missionData={mission as Mission} /></div></div></main>; }
