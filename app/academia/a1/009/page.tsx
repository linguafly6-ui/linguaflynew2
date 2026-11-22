import Link from "next/link";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import missionData from "@/content/canonical-missions/a1/009.json";

export const metadata = {
  title: "People in My Class · Misión 009 · Linguafly Academy",
  description: "Describe a compañeros y profesores con pronombres, posesivos y adjetivos sencillos.",
};

export default function A1Mission009Page() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/academia/a1" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700">
          <span aria-hidden="true">←</span> Volver al curso A1
        </Link>
        <div className="mt-5">
          <CanonicalMission missionData={missionData as Mission} />
        </div>
      </div>
    </main>
  );
}
