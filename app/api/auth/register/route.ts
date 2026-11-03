import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { createStudentSession, hashPassword } from "@/lib/student-auth";
export async function POST(req: NextRequest) {
 try {
  const env=getEnv(); if(!env.COURSE_DB)return NextResponse.json({error:"Base de datos de alumnos no disponible."},{status:503});\n  const body = await req.json() as {email?:string;password?:string};
  const email=String(body.email||"").trim().toLowerCase(), password=String(body.password||"");
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||password.length<8||password.length>256) return NextResponse.json({error:"Introduce un email válido y una contraseña de al menos 8 caracteres."},{status:400});
  const result=await env.COURSE_DB.prepare("INSERT INTO students (email,password_hash,plan,subscription_status) VALUES (?,?,'free','inactive')").bind(email,await hashPassword(password)).run();
  const id=Number(result.meta.last_row_id), response=NextResponse.json({success:true,student:{id,email,plan:"free"}});
  await createStudentSession(id,response); return response;
 } catch(e) { if(String(e).toLowerCase().includes("unique")) return NextResponse.json({error:"Ya existe una cuenta con ese email."},{status:409}); console.error(e); return NextResponse.json({error:"No se pudo crear la cuenta."},{status:500}); }
}