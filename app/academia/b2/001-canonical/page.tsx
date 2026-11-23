import Link from "next/link";
import mission from "@/content/canonical-missions/b2/001.json";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";

export const metadata = {
  title: "B2 · Misión 001 · Beyond First Impressions · Linguafly Academy",
  description: "Misión piloto B2 sobre personalidad, comportamiento y primeras impresiones.",
  robots: { index: false, follow: false },
};

export default function B2Mission001Page() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/academia/b2" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700">
          <span aria-hidden="true">←</span> Volver al curso B2
        </Link>
        <div className="mt-5">
          <CanonicalMission missionData={mission as Mission} />
        </div>
      </div>
    </main>
  );
}
