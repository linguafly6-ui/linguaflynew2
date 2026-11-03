import VoiceConversation from "@/components/VoiceConversation";

export const metadata = {
  title: "Lecciones de Speaking — LinguaFly",
  description: "Lecciones de ingles con explicaciones en espanol y audio para practicar pronunciacion.",
};

export default function LeccionesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lecciones de Speaking</h1>
          <p className="text-gray-500 mt-2">
            El tutor explica en español. Pulsa el botón de audio para escuchar la pronunciación en inglés.
          </p>
        </div>
        <VoiceConversation initialUnitId={1} />
      </div>
    </main>
  );
}
