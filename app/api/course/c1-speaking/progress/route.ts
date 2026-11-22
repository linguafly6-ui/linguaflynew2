import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";
import { saveUnifiedProgress } from "@/lib/unified-progress";

export async function POST(req: NextRequest) {
  try {
    const student = await getStudent(req);
    if (!student) return NextResponse.json({ success:true, saved:false, reason:"guest" });
    const body = await req.json() as any;
    const rawId = Number(body.unitId);
    const points = Number(body.score);
    if (!Number.isInteger(rawId) || rawId < 1 || rawId > 200 || !Number.isFinite(points)) {
      return NextResponse.json({ error:"Datos no válidos" },{status:400});
    }
    const score = Math.max(0,Math.min(100,Math.round(points)));
    const db = getEnv().COURSE_DB;
    if (!db) return NextResponse.json({ error:"Base de datos no disponible." },{status:503});
    const unitNumber = rawId;
    if (!unitNumber) return NextResponse.json({ error:"Unidad no encontrada" },{status:404});
    if (unitNumber > 5 && student.plan !== "pro" && student.plan !== "pro_test") return NextResponse.json({ error:"Pro required" },{status:403});
    const userId = studentUserId(student);
    if (unitNumber > 6) {
      const previous = await db.prepare("SELECT score,completed FROM c1_speaking_progress WHERE user_id=? AND unit_id=?")
        .bind(userId,rawId-1).first() as any;
      if (!previous?.completed || Number(previous.score)<60) return NextResponse.json({ error:"La unidad anterior requiere 60 puntos." },{status:403});
    }
    const completed = score >= 60;
    await db.prepare(
      "INSERT INTO c1_speaking_progress (user_id,unit_id,score,completed,attempts,feedback,updated_at) VALUES (?,?,?,?,1,?,datetime('now')) ON CONFLICT(user_id,unit_id) DO UPDATE SET score=MAX(score,excluded.score),completed=MAX(completed,excluded.completed),attempts=attempts+1,feedback=excluded.feedback,updated_at=datetime('now')"
    ).bind(userId,rawId,score,completed?1:0,String(body.feedback||"").slice(0,1000)).run();
    await saveUnifiedProgress(db,Number(student.id),"c1-speaking",unitNumber,score,completed);
    
    return NextResponse.json({ success:true,saved:true,score,completed,next:completed&&unitNumber<200?unitNumber+1:null });
  } catch (error) {
    console.error("C1 progress save error:",error);
    return NextResponse.json({ error:"No se pudo guardar el progreso." },{status:500});
  }
}
