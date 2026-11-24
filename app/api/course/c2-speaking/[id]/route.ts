import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";
import { getSpeakingR2Content } from "@/lib/speaking-r2";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const unitNumber = Number(id);
    if (!Number.isInteger(unitNumber) || unitNumber < 1 || unitNumber > 200) {
      return NextResponse.json({ error: "Unidad no válida" }, { status: 400 });
    }
    const student = await getStudent(req);
    if (!student) return NextResponse.json({ error: "Necesitas crear una cuenta gratuita para acceder a las lecciones.", needAccount: true }, { status: 401 });
    if (unitNumber > 5 && student.plan !== "pro" && student.plan !== "pro_test") {
      return NextResponse.json({ error: "Pro required" }, { status: 403 });
    }

    const [env, metadata] = [getEnv(), await getSpeakingR2Content("c2")];
    const title = metadata.unitTitles?.[unitNumber - 1];
    const moduleNumber = Math.ceil(unitNumber / 4);
    const moduleTitle = metadata.moduleTitles?.[moduleNumber - 1];
    if (!title || !moduleTitle) throw new Error("C2 Speaking metadata is incomplete in R2");

    const db = env.COURSE_DB || env.DB;
    const userId = studentUserId(student);
    let progress: any = null;
    let previous: any = null;
    if (db) {
      progress = await db.prepare("SELECT * FROM c2_speaking_progress WHERE user_id=? AND unit_id=?")
        .bind(userId, unitNumber).first();
      if (unitNumber > 6) {
        previous = await db.prepare("SELECT score,completed FROM c2_speaking_progress WHERE user_id=? AND unit_id=?")
          .bind(userId, unitNumber - 1).first();
      }
    }
    const unlocked = unitNumber <= 5 || ((student.plan === "pro" || student.plan === "pro_test") &&
      (unitNumber === 6 || Boolean(previous?.completed && Number(previous.score) >= 60)));
    const isConversation = unitNumber % 4 === 0;

    return NextResponse.json({
      unit: {
        id: unitNumber,
        unit_number: unitNumber,
        module_number: moduleNumber,
        module_title: moduleTitle,
        scenario: title,
        objective: isConversation
          ? "Practicar un diálogo guiado de 10 líneas sobre " + moduleTitle + " en inglés C2."
          : "Practicar 10 frases completas sobre " + title.toLowerCase() + " en inglés C2.",
        system_prompt: "Eres un tutor paciente de inglés Cambridge C2 Proficiency. Evalúa pronunciación y claridad, y da feedback breve en castellano.",
        difficulty: "C2",
        estimated_duration: "4-5 min",
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
    console.error("C2 unit loading error:", error);
    return NextResponse.json({ error: "No se pudo cargar la unidad C2 desde R2." }, { status: 503 });
  }
}
