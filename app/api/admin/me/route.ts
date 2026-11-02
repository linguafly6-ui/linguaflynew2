import {NextRequest,NextResponse} from "next/server";
import {getAdmin} from "@/lib/admin-auth";
export async function GET(request:NextRequest){try{return NextResponse.json({admin:!!(await getAdmin(request))});}catch(error){console.error(error);return NextResponse.json({admin:false},{status:500});}}
