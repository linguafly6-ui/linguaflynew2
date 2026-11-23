import Link from "next/link";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import missionData from "@/content/canonical-missions/pre-a1/076.json";

export const metadata = {
  title: "Pre-A1 · Misión 076 · My Town · Linguafly Academy",
  description: "My Town: vocabulario, expresiones y comprensión en inglés inicial.",
  robots: { index: false, follow: false },
};

export default function PreA1Mission076Page() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/academia/pre-a1" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700">
          <span aria-hidden="true">←</span> Volver a Pre-A1
        </Link>
        <div className="mt-5">
          <CanonicalMission missionData={missionData as Mission} />
        </div>
      </div>
    </main>
  );
}
