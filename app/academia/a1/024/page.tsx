import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import missionData from "@/content/canonical-missions/a1/024.json";

export const metadata = {
  title: "Physical Appearance · Misión 024 · Linguafly A1",
  description: "Describe el aspecto físico de una persona con vocabulario sencillo."
};

export default function MissionPage() {
  return <CanonicalMission missionData={missionData as Mission} />;
}
