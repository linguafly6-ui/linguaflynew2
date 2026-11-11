import Link from "next/link";
import { notFound } from "next/navigation";
import MissionProgressButton from "./progress-button";

const missions: Record<string, { number: number; title: string }> = {
  "001": { number: 1, title: "The Colorful Forest" },
  "002": { number: 2, title: "The Funny Kitchen" },
  "003": { number: 3, title: "The Magic Wardrobe" },
  "004": { number: 4, title: "Who Am I? (To Be)" },
  "005": { number: 5, title: "My Toy Box" },
  "006": { number: 6, title: "My Little House" },
  "007": { number: 7, title: "Number Playground" },
  "008": { number: 8, title: "My Body" },
  "009": { number: 9, title: "Funny Faces" },
  "010": { number: 10, title: "Animal Babies" },
  "011": { number: 11, title: "At the Playground" },
  "012": { number: 12, title: "Shapes Around Us" },
  "013": { number: 13, title: "Big and Small" },
  "014": { number: 14, title: "My School Bag" },
  "015": { number: 15, title: "The Classroom" },
  "016": { number: 16, title: "Days of the Week" },
  "017": { number: 17, title: "Weather Watchers" },
  "018": { number: 18, title: "Seasons of the Year" },
  "019": { number: 19, title: "Fruit Market" },
  "020": { number: 20, title: "Veggie Garden" },
};

export default async function PreA1MissionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mission = missions[id];
  if (!mission) notFound();
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-6 sm:px-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/curso/pre-a1" className="text-sm font-bold text-blue-700 hover:underline">← Volver a las misiones</Link>
          <h1 className="mt-2 text-2xl font-black text-slate-950">{mission.title}</h1>
        </div>
        <MissionProgressButton missionNumber={mission.number} />
      </div>
      <div className="overflow-hidden rounded-2xl border bg-white">
        <iframe
          title={mission.title}
          src={`/quest/missions/${id}/mission-${id}.html`}
          className="h-[calc(100vh-150px)] min-h-[620px] w-full border-0"
          allow="autoplay"
        />
      </div>
      <p className="mt-3 text-xs text-slate-500">El botón de progreso está separado de la actividad original y no modifica sus ejercicios.</p>
    </main>
  );
}
