import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";
import { addSRItem } from "@/lib/spaced-repetition";

export async function POST(request: NextRequest) {
  try {
    const student = await getStudent(request);
    if (!student) return NextResponse.json({ error: "Inicia sesión para guardar tus repasos." }, { status: 401 });
    const env = getEnv();
    if (!env.DB) return NextResponse.json({ error: "Servicio de repetición no disponible." }, { status: 503 });

    const body = await request.json() as { word?: string; translation?: string; language?: string; contextSentence?: string };
    const word = String(body.word || "").trim();
    const translation = String(body.translation || "").trim();
    const language = String(body.language || "en").trim();
    const contextSentence = String(body.contextSentence || "").trim();
    if (!word || !translation || word.length > 160 || translation.length > 240 || language.length > 12 || contextSentence.length > 500) {
      return NextResponse.json({ error: "Los datos de la palabra no son válidos." }, { status: 400 });
    }
    const id = await addSRItem(env.DB, studentUserId(student), word, translation, language, contextSentence);
    return NextResponse.json({ success: true, itemId: id });
  } catch (error) {
    console.error("SR add error:", error);
    return NextResponse.json({ error: "Error al añadir palabra." }, { status: 500 });
  }
}
