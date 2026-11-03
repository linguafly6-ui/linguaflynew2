import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";
import { A2_UNIT_TITLES, A2_MODULE_TITLES } from "@/lib/a2-speaking-words";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const unitNumber = Number(id);
    if (!Number.isInteger(unitNumber) || unitNumber < 1 || unitNumber > 200) {
      return NextResponse.json({ error: "Unidad no válida" }, { status: 400 });
    }
    const student = await getStudent(req);
    if (!student) return NextResponse.json({ error: "Necesitas crear una cuenta gratuita para acceder a las lecciones.", needAccount: true }, { status: 401 });
    if (unitNumber > 5 && student?.plan !== "pro") {
      return NextResponse.json({ error: "Pro required" }, { status: 403 });
    }
    const env = getEnv();
    const userId = studentUserId(student);
    const p = student
      ? await env.COURSE_DB.prepare("SELECT * FROM a2_speaking_progress WHERE user_id=? AND unit_id=?").bind(userId, unitNumber).first() as any
      : null;
    const previous = student && unitNumber > 6
      ? await env.COURSE_DB.prepare("SELECT score,completed FROM a2_speaking_progress WHERE user_id=? AND unit_id=?").bind(userId, unitNumber - 1).first() as any
      : null;
    const unlocked = unitNumber <= 5 || ((student?.plan === "pro" || student?.plan === "pro_test") && (unitNumber === 6 || Boolean(previous?.completed && Number(previous.score) >= 60)));
    const moduleNumber = Math.ceil(unitNumber / 4);
    const title = A2_UNIT_TITLES[unitNumber - 1];
    return NextResponse.json({
      unit: {
        id: unitNumber,
        unit_number: unitNumber,
        module_number: moduleNumber,
        module_title: A2_MODULE_TITLES[moduleNumber - 1],
        scenario: title,
        objective: "Practicar en voz alta los 10 elementos de " + title.toLowerCase() + " en inglés A2, con pronunciación clara y respuestas completas.",
        system_prompt: "Eres un tutor paciente de inglés Cambridge A2 Key. Evalúa la pronunciación del elemento objetivo y da feedback breve en castellano. Mantén el nivel A2.",
        difficulty: "A2",
        estimated_duration: "2-3 min",
        is_review: unitNumber >= 193 ? 1 : 0,
        key_phrases: [],
        vocabulary: [],
        unlocked,
        status: p?.completed ? "completed" : unlocked ? "unlocked" : "locked",
        score: p?.score ?? null,
        attempts: p?.attempts || 0,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "No se pudo cargar la unidad A2." }, { status: 500 });
  }
}
