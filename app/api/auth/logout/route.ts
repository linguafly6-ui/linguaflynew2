import { NextRequest,NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { clearStudentSession,hashSessionToken,STUDENT_COOKIE } from "@/lib/student-auth";
export async function POST(req:NextRequest){
 const token=req.cookies.get(STUDENT_COOKIE)?.value;
 if(token){try{const db=getEnv().COURSE_DB;if(db)await db.prepare("DELETE FROM student_sessions WHERE token_hash=?").bind(await hashSessionToken(token)).run();}catch(e){console.error(e);}}
 const response=NextResponse.json({success:true});clearStudentSession(response);return response;
}