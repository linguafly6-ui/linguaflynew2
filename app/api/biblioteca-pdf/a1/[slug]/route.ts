import { getDB } from "@/lib/db";
export const dynamic = "force-dynamic";
interface PdfFileRow { title:string; filename:string; content_type:string; size_bytes:number; }
interface PdfChunkRow { chunk_index:number; content:ArrayBuffer; }
const allowedSlugs=new Set([
"a1-unidad-5-present-simple-rutinas","a1-unidad-6-familia-posesivos-genitivo","a1-unidad-7-colores-descripciones-fisicas","a1-unidad-8-numeros-edad-precios","a1-unidad-9-profesiones-ocupaciones","a1-unidad-10-rutinas-diarias-hora","a1-unidad-11-lugares-ciudad","a1-unidad-12-dias-semana","a1-unidad-13-rutina-diaria","a1-unidad-14-present-simple-dont-do-you","a1-unidad-15-present-simple-does-doesnt","a1-unidad-16-at-the-cafe","a1-unidad-17-breakfast-lunch-dinner","a1-unidad-18-likes-dislikes","a1-unidad-19-months-dates-birthdays","a1-unidad-20-module-2-review","a1-unidad-21-rooms-in-a-house","a1-unidad-22-furniture-household-items","a1-unidad-23-there-is-there-are","a1-unidad-24-prepositions-of-place","a1-unidad-25-can-cant","a1-unidad-26-present-continuous","a1-unidad-27-past-simple-was-were","a1-unidad-28-past-simple-regular-verbs","a1-unidad-29-past-simple-irregular-verbs","a1-unidad-30-past-simple-negatives-questions","a1-unidad-31-past-continuous","a1-unidad-32-past-simple-vs-past-continuous","a1-unidad-33-comparatives-superlatives","a1-unidad-34-countable-uncountable-nouns","a1-unidad-35-pronouns-possessives","a1-unidad-36-prepositions-place-direction"
,"a1-unidad-37-talent-skills","a1-unidad-38-asking-for-permission","a1-unidad-39-outdoor-activities","a1-unidad-40-module-4-review-abilities-interests","a1-unidad-41-at-the-airport","a1-unidad-42-transport","a1-unidad-43-travel-verbs","a1-unidad-44-the-weather","a1-unidad-45-seasons","a1-unidad-46-at-the-hotel","a1-unidad-47-holidays"]);
export async function GET(_request:Request,{params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const dbSlug=`a1-${slug}`;
 if(!allowedSlugs.has(dbSlug))return new Response("Unidad no encontrada.",{status:404,headers:{"Cache-Control":"no-store"}});
 const db=await getDB();
 const pdf=await db.prepare("SELECT title, filename, content_type, size_bytes FROM biblioteca_pdf_files WHERE slug = ? LIMIT 1").bind(dbSlug).first<PdfFileRow>();
 if(!pdf)return new Response("El PDF todavía no está disponible.",{status:404,headers:{"Cache-Control":"no-store"}});
 const chunks=await db.prepare("SELECT chunk_index, content FROM biblioteca_pdf_chunks WHERE slug = ? ORDER BY chunk_index ASC").bind(dbSlug).all<PdfChunkRow>();
 if(!chunks.results.length)return new Response("El archivo PDF está incompleto.",{status:500,headers:{"Cache-Control":"no-store"}});
 const body=new Uint8Array(pdf.size_bytes); let offset=0;
 for(const chunk of chunks.results){const bytes=new Uint8Array(chunk.content);if(offset+bytes.byteLength>body.byteLength)return new Response("El archivo PDF contiene fragmentos no válidos.",{status:500,headers:{"Cache-Control":"no-store"}});body.set(bytes,offset);offset+=bytes.byteLength;}
 if(offset!==pdf.size_bytes)return new Response("El archivo PDF está incompleto.",{status:500,headers:{"Cache-Control":"no-store"}});
 const safeFilename=pdf.filename.replace(/["\r\n]/g,"");
 return new Response(body,{headers:{"Content-Type":pdf.content_type||"application/pdf","Content-Disposition":`attachment; filename="${safeFilename}"`,"Content-Length":String(pdf.size_bytes),"Cache-Control":"public, max-age=3600","X-Content-Type-Options":"nosniff"}});
}
