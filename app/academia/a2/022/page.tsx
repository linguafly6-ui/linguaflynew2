import Link from "next/link";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import mission from "@/content/canonical-missions/a2/022.json";

export const metadata = {
  title: "Celebrations, Invitations and Special Occasions · Misión 022 · Linguafly A2",
  description: "Practica invitaciones, celebraciones, planes y ocasiones especiales en inglés.",
  robots: { index: false, follow: false },
};

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/academia/a2" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700">
          <span aria-hidden="true">←</span> Volver a las misiones A2
        </Link>
        <div className="mt-5">
          <CanonicalMission missionData={mission as Mission} />
        </div>
      </div>
    </main>
  );
}
