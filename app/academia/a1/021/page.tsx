import CanonicalMission from "@/components/academy/CanonicalMission";
import mission from "@/content/canonical-missions/a1/021.json";

export const metadata = {
  title: "At the Café and Restaurant · Misión 021 · Linguafly A1",
  description: "Pide comida y bebida con educación, comprende el servicio y paga en una cafetería o restaurante."
};

export default function MissionPage() {
  return <CanonicalMission mission={mission} />;
}
