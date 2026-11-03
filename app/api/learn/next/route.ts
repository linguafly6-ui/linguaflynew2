import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent } from "@/lib/student-auth";
import { ensureLearnUnit, getSpeakingProgress, LEARN_COURSES } from "@/lib/learn";

export async function GET(request: NextRequest) {
  try {
    const student = await getStudent(request);
    if (!student) return NextResponse.json({ error: "Inicia sesión para continuar aprendiendo." }, { status: 401 });
    const env = getEnv();
    const db = env.COURSE_DB || env.DB;
    if (!db) return NextResponse.json({ error: "Base de datos no disponible." }, { status: 503 });

    let lockedCourse: { courseId: string; unitNumber: number } | null = null;
    for (const course of LEARN_COURSES) {
      for (let unitNumber = 1; unitNumber <= 100; unitNumber++) {
        const progress = await db.prepare(
          "SELECT COUNT(*) AS completed FROM learning_exercise_progress lep JOIN exercise_items ei ON ei.id=lep.exercise_id JOIN exercise_units eu ON eu.id=ei.unit_id WHERE lep.student_id=? AND lep.course_id=? AND lep.unit_number=? AND lep.status='completed'"
        ).bind(student.id, course, unitNumber).first() as { completed?: number } | null;
        const completedCount = Number(progress?.completed || 0);
        if (completedCount >= 60) {
          const speaking = await getSpeakingProgress(db, course, Number(student.id), unitNumber);
          if (!speaking?.completed) {
            if (unitNumber > 5 && student.plan !== "pro" && student.plan !== "pro_test") {
              lockedCourse = { courseId: course, unitNumber };
              break;
            }
            return NextResponse.json({
              type: "speaking",
              courseId: course,
              unitId: unitNumber,
              scenarioId: course + "-speaking-" + unitNumber,
              prompt: "Practica conversación en inglés para completar la unidad " + unitNumber + " de " + course.toUpperCase() + ".",
              progress: { completed: completedCount, total: 60 }
            });
          }
          continue;
        }

        if (unitNumber > 5 && student.plan !== "pro" && student.plan !== "pro_test") {
          return NextResponse.json({ courseId: course, unitNumber, proRequired: true, message: "Desbloquea esta unidad con LinguaFly Pro." });
        }

        const { unitId, unit, total } = await ensureLearnUnit(db, course, unitNumber);
        const speaking = await getSpeakingProgress(db, course, Number(student.id), unitNumber);
        if (completedCount >= 10 && !speaking?.completed) {
          return NextResponse.json({
            type: "speaking",
            courseId: course,
            unitId: unitNumber,
            scenarioId: course + "-speaking-" + unitNumber,
            prompt: unit.description,
            progress: { completed: completedCount, total }
          });
        }
        const item = await db.prepare(
          "SELECT ei.id,ei.category,ei.exercise_type,ei.question,ei.instruction,ei.passage,ei.audio_key,ei.options,ei.explanation,ei.\"order\" FROM exercise_items ei LEFT JOIN learning_exercise_progress lep ON lep.exercise_id=ei.id AND lep.student_id=? WHERE ei.unit_id=? AND COALESCE(lep.status,'in_progress')<>'completed' ORDER BY ei.\"order\" ASC LIMIT 1"
        ).bind(student.id, unitId).first() as any;

        if (!item) {
          const speaking = await getSpeakingProgress(db, course, Number(student.id), unitNumber);
          if (!speaking?.completed) {
            return NextResponse.json({ type: "speaking", courseId: course, unitId: unitNumber, scenarioId: course + "-speaking-" + unitNumber, prompt: unit.description, progress: { completed: completedCount, total } });
          }
          continue;
        }

        return NextResponse.json({
          type: "exercise",
          exerciseId: item.id,
          unitId,
          unitNumber,
          courseId: course,
          question: item.question,
          instruction: item.instruction,
          passage: item.passage,
          options: typeof item.options === "string" ? JSON.parse(item.options) : item.options,
          exerciseType: item.exercise_type,
          category: item.category,
          explanation: item.explanation,
          order: item.order,
          prompt: unit.topic,
          progress: { completed: completedCount, total }
        });
      }
    }

    if (lockedCourse) return NextResponse.json({ courseId: lockedCourse.courseId, unitNumber: lockedCourse.unitNumber, proRequired: true, message: "Has completado las unidades gratuitas. Desbloquea el resto de cursos con LinguaFly Pro." });

    const streak = await db.prepare("SELECT xp_total,current_streak,longest_streak FROM learning_streaks WHERE student_id=?")
      .bind(student.id).first() as any;
    return NextResponse.json({ completed: true, message: "¡Has completado todos los ejercicios disponibles!", xp: Number(streak?.xp_total || 0), streak: Number(streak?.current_streak || 0) });
  } catch (error) {
    console.error("Learn next error:", error);
    return NextResponse.json({ error: "No se pudo cargar el siguiente ejercicio." }, { status: 500 });
  }
}
