import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import missionData from "@/content/canonical-missions/a1/023.json";

export const metadata = {
  title: "Prices and Quantities · Misión 023 · Linguafly A1",
  description: "Pregunta por precios, cantidades y productos en una compra cotidiana."
};

export default function MissionPage() {
  return <CanonicalMission missionData={missionData as Mission} />;
}
