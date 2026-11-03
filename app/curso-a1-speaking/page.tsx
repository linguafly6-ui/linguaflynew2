import VoiceConversation from "@/components/VoiceConversation";

export const metadata = {
  title: "Curso A1 Speaking — LinguaFly",
  description: "Lecciones de ingles con explicaciones en espanol y audio para practicar la pronunciacion.",
};

export default function CursoA1SpeakingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Curso A1 — Speaking</h1>
          <p className="text-gray-500 mt-2">Lecciones en espanol con audio en ingles para practicar la pronunciacion.</p>
        </div>
        <VoiceConversation initialUnitId={1} />
      </div>
    </main>
  );
}
