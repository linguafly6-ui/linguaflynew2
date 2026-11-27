import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import missionData from "@/content/canonical-missions/a1/026.json";

export const metadata = {
  title: "Body and Health · Misión 026 · Linguafly A1",
  description: "Nombra partes del cuerpo y expresa molestias sencillas."
};

export default function MissionPage() {
  return <CanonicalMission missionData={missionData as Mission} />;
}
