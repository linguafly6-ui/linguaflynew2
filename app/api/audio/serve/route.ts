import { NextRequest } from "next/server";
import { getEnv } from "@/lib/cf-context";
export const runtime = "edge";
export async function GET(request: NextRequest) {
  const key=request.nextUrl.searchParams.get("key")||"";
  if(!key||key.length>512||key.startsWith("/")||key.includes("..")||!/^[a-zA-Z0-9/_-]+\.mp3$/.test(key)) return new Response("No encontrado",{status:404});
  const object=await getEnv().LINGUAFLY_MEDIA.get(key);
  if(!object) return new Response("No encontrado",{status:404});
  return new Response(object.body,{headers:{"Content-Type":object.httpMetadata?.contentType||"audio/mpeg","Cache-Control":"private, max-age=3600","ETag":object.httpEtag,"X-Content-Type-Options":"nosniff"}});
}