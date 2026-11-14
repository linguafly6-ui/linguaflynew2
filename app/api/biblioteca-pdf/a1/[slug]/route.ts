import { getDB } from "@/lib/db";
export const dynamic = "force-dynamic";
interface PdfFileRow { title:string; filename:string; content_type:string; size_bytes:number; }
interface PdfChunkRow { chunk_index:number; content:ArrayBuffer; }
const allowedSlugs=new Set([
"a1-unidad-5-present-simple-rutinas","a1-unidad-6-familia-posesivos-genitivo","a1-unidad-7-colores-descripciones-fisicas","a1-unidad-8-numeros-edad-precios","a1-unidad-9-profesiones-ocupaciones","a1-unidad-10-rutinas-diarias-hora","a1-unidad-11-lugares-ciudad","a1-unidad-12-dias-semana","a1-unidad-13-rutina-diaria","a1-unidad-14-present-simple-dont-do-you"
]);
export async function GET(_request:Request,{params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 if(!allowedSlugs.has(slug))return new Response("Unidad no encontrada.",{status:404,headers:{"Cache-Control":"no-store"}});
 const db=await getDB();
 const pdf=await db.prepare("SELECT title, filename, content_type, size_bytes FROM biblioteca_pdf_files WHERE slug = ? LIMIT 1").bind(slug).first<PdfFileRow>();
 if(!pdf)return new Response("El PDF todavía no está disponible.",{status:404,headers:{"Cache-Control":"no-store"}});
 const chunks=await db.prepare("SELECT chunk_index, content FROM biblioteca_pdf_chunks WHERE slug = ? ORDER BY chunk_index ASC").bind(slug).all<PdfChunkRow>();
 if(!chunks.results.length)return new Response("El archivo PDF está incompleto.",{status:500,headers:{"Cache-Control":"no-store"}});
 const body=new Uint8Array(pdf.size_bytes); let offset=0;
 for(const chunk of chunks.results){const bytes=new Uint8Array(chunk.content);if(offset+bytes.byteLength>body.byteLength)return new Response("El archivo PDF contiene fragmentos no válidos.",{status:500,headers:{"Cache-Control":"no-store"}});body.set(bytes,offset);offset+=bytes.byteLength;}
 if(offset!==pdf.size_bytes)return new Response("El archivo PDF está incompleto.",{status:500,headers:{"Cache-Control":"no-store"}});
 const safeFilename=pdf.filename.replace(/["\r\n]/g,"");
 return new Response(body,{headers:{"Content-Type":pdf.content_type||"application/pdf","Content-Disposition":`attachment; filename="${safeFilename}"`,"Content-Length":String(pdf.size_bytes),"Cache-Control":"public, max-age=3600","X-Content-Type-Options":"nosniff"}});
}
