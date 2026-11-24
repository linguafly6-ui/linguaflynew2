import Link from "next/link";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import mission from "@/content/canonical-missions/c2/078.json";

export const metadata = {
  title: "Consumer Behaviour, Marketing and Ethical Influence · Mission 078 · Linguafly C2",
  description: "Analyse consumer choice, persuasive strategies, behavioural evidence, data use and the ethical limits of commercial influence.",
  robots: { index: false, follow: false },
};

export default function C2Mission78Page() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/academia/c2" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700">← Volver al curso C2</Link>
        <div className="mt-5"><CanonicalMission missionData={mission as Mission} /></div>
      </div>
    </main>
  );
}
