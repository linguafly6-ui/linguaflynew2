import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import missionData from "@/content/canonical-missions/a1/027.json";

export const metadata = {
  title: "At the Doctor · Misión 027 · Linguafly A1",
  description: "Explica cómo te encuentras y comprende consejos sencillos en una consulta."
};

export default function MissionPage() {
  return <CanonicalMission missionData={missionData as Mission} />;
}
