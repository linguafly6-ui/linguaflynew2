import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { createStudentSession, verifyPassword } from "@/lib/student-auth";
export async function POST(req:NextRequest) {
 try {
  const env=getEnv();if(!env.COURSE_DB)return NextResponse.json({error:"Base de datos de alumnos no disponible."},{status:503});const body=await req.json() as {email?:string;password?:string}, email=String(body.email||"").trim().toLowerCase(), password=String(body.password||"");
  const s=await env.COURSE_DB.prepare("SELECT s.id,s.email,s.password_hash,s.placement_level,CASE WHEN s.plan='pro_test' AND m.test_expires_at IS NOT NULL AND date(m.test_expires_at)<date('now') THEN 'free' ELSE s.plan END AS plan FROM students s LEFT JOIN admin_student_metadata m ON m.student_id=s.id WHERE s.email=?").bind(email).first() as any;
  if(!s||!(await verifyPassword(password,String(s.password_hash)))) return NextResponse.json({error:"Email o contraseña incorrectos."},{status:401});
  const response=NextResponse.json({success:true,student:{id:s.id,email:s.email,plan:s.plan,placementLevel:s.placement_level||null},placementLevel:s.placement_level||null}); await createStudentSession(Number(s.id),response); return response;
 } catch(e){console.error(e);return NextResponse.json({error:"No se pudo iniciar sesión."},{status:500});}
}