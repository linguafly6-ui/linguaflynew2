import Link from "next/link";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import mission from "@/content/canonical-missions/c2/087.json";

export const metadata = {
  title: "Equality, Discrimination and Substantive Justice · Mission 087 · Linguafly C2",
  description: "Interrogate direct and indirect discrimination, equality before the law, reasonable accommodation and structural barriers to justice.",
  robots: { index: false, follow: false },
};

export default function C2Mission87Page() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/academia/c2" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700">← Volver al curso C2</Link>
        <div className="mt-5"><CanonicalMission missionData={mission as Mission} /></div>
      </div>
    </main>
  );
}
