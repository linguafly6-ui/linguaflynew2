import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";
import { C1_UNIT_TITLES, C1_MODULE_TITLES } from "@/lib/c1-speaking-words";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const unitNumber = Number(id);
    if (!Number.isInteger(unitNumber) || unitNumber < 1 || unitNumber > 200) {
      return NextResponse.json({ error: "Unidad no válida" }, { status: 400 });
    }
    const student = await getStudent(req);
    if (!student) return NextResponse.json({ error: "Necesitas crear una cuenta gratuita para acceder a las lecciones.", needAccount: true }, { status: 401 });
    if (unitNumber > 5 && student?.plan !== "pro" && student?.plan !== "pro_test") {
      return NextResponse.json({ error: "Pro required" }, { status: 403 });
    }
    const env = getEnv();
    const db = env.COURSE_DB || env.DB;
    const userId = studentUserId(student);
    let p: any = null, previous: any = null;
    if (student && db) {
      try {
        p = await db.prepare("SELECT * FROM c1_speaking_progress WHERE user_id=? AND unit_id=?").bind(userId, unitNumber).first();
        if (unitNumber > 6) {
          previous = await db.prepare("SELECT score,completed FROM c1_speaking_progress WHERE user_id=? AND unit_id=?").bind(userId, unitNumber - 1).first();
        }
      } catch (error) {
        console.error("Could not load C1 unit progress:", error);
      }
    }
    const unlocked = unitNumber <= 5 || ((student?.plan === "pro" || student?.plan === "pro_test") && (unitNumber === 6 || Boolean(previous?.completed && Number(previous.score) >= 60)));
    const moduleNumber = Math.ceil(unitNumber / 4);
    const title = C1_UNIT_TITLES[unitNumber - 1];
    const isConversation = unitNumber % 4 === 0;
    return NextResponse.json({
      unit: {
        id: unitNumber,
        unit_number: unitNumber,
        module_number: moduleNumber,
        module_title: C1_MODULE_TITLES[moduleNumber - 1],
        scenario: title,
        objective: isConversation
          ? "Practicar un diálogo guiado de 10 líneas sobre " + C1_MODULE_TITLES[moduleNumber - 1] + " en inglés C1."
          : "Practicar 10 frases completas sobre " + title.toLowerCase() + " en inglés C1.",
        system_prompt: "Eres un tutor paciente de inglés Cambridge C1 Advanced. Evalúa pronunciación y claridad, y da feedback breve en castellano.",
        difficulty: "C1",
        estimated_duration: "4-5 min",
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
    console.error("C1 unit loading error:", error);
    return NextResponse.json({ error: "No se pudo cargar la unidad C1." }, { status: 500 });
  }
}
