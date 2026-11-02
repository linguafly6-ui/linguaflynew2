import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { createStudentSession, verifyPassword } from "@/lib/student-auth";
export async function POST(req:NextRequest) {
 try {
  const body=await req.json() as {email?:string;password?:string}, email=String(body.email||"").trim().toLowerCase(), password=String(body.password||"");
  const s=await getEnv().COURSE_DB.prepare("SELECT id,email,password_hash,plan FROM students WHERE email=?").bind(email).first() as any;
  if(!s||!(await verifyPassword(password,String(s.password_hash)))) return NextResponse.json({error:"Email o contraseña incorrectos."},{status:401});
  const response=NextResponse.json({success:true,student:{id:s.id,email:s.email,plan:s.plan}}); await createStudentSession(Number(s.id),response); return response;
 } catch(e){console.error(e);return NextResponse.json({error:"No se pudo iniciar sesión."},{status:500});}
}