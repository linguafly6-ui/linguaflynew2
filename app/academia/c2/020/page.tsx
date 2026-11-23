import Link from "next/link";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import mission from "@/content/canonical-missions/c2/020.json";
export const metadata = { title: "Rhetoric, Deliberation and Persuasive Integration · Mission 020 · Linguafly C2", description: "Integrate the Unit 2 work on rhetorical framing, argument, evidence, concession, audience, emphasis and public deliberation.", robots: { index: false, follow: false } };
export default function C2Mission020Page() { return <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6"><div className="mx-auto max-w-5xl"><Link href="/academia/c2" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700">← Volver al curso C2</Link><div className="mt-5"><CanonicalMission missionData={mission as Mission} /></div></div></main>; }
