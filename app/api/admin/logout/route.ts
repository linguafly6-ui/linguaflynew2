import {NextRequest,NextResponse} from "next/server";
import {clearAdminSession} from "@/lib/admin-auth";
export async function POST(request:NextRequest){try{const response=NextResponse.json({success:true});await clearAdminSession(request,response);return response;}catch(error){console.error(error);return NextResponse.json({error:"No se pudo cerrar sesión."},{status:500});}}
