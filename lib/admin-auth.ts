import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@/lib/cf-context";
import { hashSessionToken, verifyPassword } from "@/lib/student-auth";
export const ADMIN_COOKIE = "lf_admin_session";
const SESSION_SECONDS = 43200;
export async function authenticateAdmin(email: string, password: string): Promise<any | null> {
 const db = getRequestContext().env.COURSE_DB;
 const admin: any = await db.prepare("SELECT id,email,password_hash FROM admins WHERE email = ?").bind(email).first();
 if (!admin || !(await verifyPassword(password, String(admin.password_hash)))) return null;
 return { id: Number(admin.id), email: String(admin.email) };
}
export async function createAdminSession(adminId: number, response: NextResponse): Promise<void> {
 const token = Array.from(crypto.getRandomValues(new Uint8Array(32)), v => v.toString(16).padStart(2,"0")).join("");
 const expires = new Date(Date.now()+SESSION_SECONDS*1000).toISOString();
 await getRequestContext().env.COURSE_DB.prepare("INSERT INTO admin_sessions (admin_id,token_hash,expires_at) VALUES (?,?,?)").bind(adminId,await hashSessionToken(token),expires).run();
 response.cookies.set(ADMIN_COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:SESSION_SECONDS});
}
export async function getAdmin(request: NextRequest): Promise<any | null> {
 const token=request.cookies.get(ADMIN_COOKIE)?.value; if(!token)return null;
 return await getRequestContext().env.COURSE_DB.prepare("SELECT a.id,a.email FROM admin_sessions s JOIN admins a ON a.id=s.admin_id WHERE s.token_hash=? AND s.expires_at>strftime('%Y-%m-%dT%H:%M:%fZ','now')").bind(await hashSessionToken(token)).first() as any || null;
}
export async function clearAdminSession(request:NextRequest,response:NextResponse):Promise<void>{
 const token=request.cookies.get(ADMIN_COOKIE)?.value;
 if(token) await getRequestContext().env.COURSE_DB.prepare("DELETE FROM admin_sessions WHERE token_hash=?").bind(await hashSessionToken(token)).run();
 response.cookies.set(ADMIN_COOKIE,"",{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:0});
}
export async function requireAdmin(request:NextRequest):Promise<any|null>{return getAdmin(request);}
