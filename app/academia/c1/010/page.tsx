import Link from "next/link";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import mission from "@/content/canonical-missions/c1/010.json";
export const metadata = { title: "Integration and Review · C1 Mission 010 · Linguafly", description: "Practica comunicación avanzada sobre integrating identity, memory, motivation and resilience en inglés C1.", robots: { index: false, follow: false } };
export default function C1Mission010Page() { return <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6"><div className="mx-auto max-w-5xl"><Link href="/academia/c1" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"><span aria-hidden="true">←</span> Volver a C1</Link><div className="mt-5"><CanonicalMission missionData={mission as Mission} /></div></div></main>; }
