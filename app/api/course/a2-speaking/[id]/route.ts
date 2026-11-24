import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";
import { getSpeakingR2Content } from "@/lib/speaking-r2";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const unitNumber = Number(id);
    if (!Number.isInteger(unitNumber) || unitNumber < 1 || unitNumber > 200) {
      return NextResponse.json({ error: "Unidad no válida" }, { status: 400 });
    }

    const student = await getStudent(_req);
    if (!student) return NextResponse.json({ error: "Necesitas crear una cuenta gratuita para acceder a las lecciones.", needAccount: true }, { status: 401 });
    if (unitNumber > 5 && student.plan !== "pro" && student.plan !== "pro_test") {
      return NextResponse.json({ error: "Pro required" }, { status: 403 });
    }

    const [env, metadata] = [getEnv(), await getSpeakingR2Content("a2")];
    const title = metadata.unitTitles?.[unitNumber - 1];
    const moduleNumber = Math.ceil(unitNumber / 4);
    const moduleTitle = metadata.moduleTitles?.[moduleNumber - 1];
    if (!title || !moduleTitle) throw new Error("A2 Speaking metadata is incomplete in R2");

    const userId = studentUserId(student);
    const progress = await env.COURSE_DB.prepare("SELECT * FROM a2_speaking_progress WHERE user_id=? AND unit_id=?")
      .bind(userId, unitNumber).first() as any;
    const previous = unitNumber > 6
      ? await env.COURSE_DB.prepare("SELECT score,completed FROM a2_speaking_progress WHERE user_id=? AND unit_id=?")
          .bind(userId, unitNumber - 1).first() as any
      : null;
    const unlocked = unitNumber <= 5 || ((student.plan === "pro" || student.plan === "pro_test") &&
      (unitNumber === 6 || Boolean(previous?.completed && Number(previous.score) >= 60)));

    return NextResponse.json({
      unit: {
        id: unitNumber,
        unit_number: unitNumber,
        module_number: moduleNumber,
        module_title: moduleTitle,
        scenario: title,
        objective: "Practicar en voz alta los 10 elementos de " + title.toLowerCase() + " en inglés A2, con pronunciación clara y respuestas completas.",
        system_prompt: "Eres un tutor paciente de inglés Cambridge A2 Key. Evalúa la pronunciación del elemento objetivo y da feedback breve en castellano. Mantén el nivel A2.",
        difficulty: "A2",
        estimated_duration: "2-3 min",
        is_review: unitNumber >= 193 ? 1 : 0,
        key_phrases: [],
        vocabulary: [],
        unlocked,
        status: progress?.completed ? "completed" : unlocked ? "unlocked" : "locked",
        score: progress?.score ?? null,
        attempts: progress?.attempts || 0,
      },
    });
  } catch (error) {
    console.error("Could not load A2 Speaking unit:", error);
    return NextResponse.json({ error: "No se pudo cargar la unidad A2 desde R2." }, { status: 503 });
  }
}
