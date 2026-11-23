import Link from "next/link";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import mission from "@/content/canonical-missions/b1/011.json";

export const metadata = { title: "Getting to Know People · Misión 011 · Linguafly B1", description: "Practise question forms and indirect questions in everyday relationships and conversations.", robots: { index: false, follow: false } };

export default function B1Mission011Page() {
  return (<main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6"><div className="mx-auto max-w-5xl"><Link href="/academia/b1" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"><span aria-hidden="true">←</span> Volver a B1</Link><div className="mt-5"><CanonicalMission missionData={mission as Mission} /></div></div></main>);
}
