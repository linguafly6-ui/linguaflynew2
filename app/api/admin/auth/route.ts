import { NextRequest,NextResponse } from "next/server";
import { authenticateAdmin,createAdminSession } from "@/lib/admin-auth";
export async function POST(request:NextRequest){
 try{
  const body:any=await request.json(),email=String(body?.email||"").trim().toLowerCase(),password=String(body?.password||"");
  if(!email||!password)return NextResponse.json({error:"Introduce email y contraseña."},{status:400});
  const admin=await authenticateAdmin(email,password);
  if(!admin)return NextResponse.json({error:"Email o contraseña incorrectos."},{status:401});
  const response=NextResponse.json({success:true});await createAdminSession(admin.id,response);return response;
 }catch(error){console.error("Admin login error:",error);return NextResponse.json({error:"No se pudo iniciar sesión."},{status:500});}
}
