import { getDB } from "@/lib/db";
import { PDFDocument } from "pdf-lib";

const pdfSeo: Record<string, {title:string; subject:string; keywords:string[]}> = {
"a1-unidad-48-sightseeing":{title:"Sightseeing en inglés A1: lugares turísticos y superlativos",subject:"Ejercicios de sightseeing en inglés A1: lugares turísticos, monumentos, museos y superlativos.",keywords:["sightseeing en inglés","lugares turísticos en inglés","vocabulario de turismo A1","superlativos en inglés","monuments vocabulary","museums in English","ejercicios inglés A1 PDF"]},
"a1-unidad-49-packing-a-suitcase":{title:"Packing a Suitcase en inglés A1: hacer la maleta",subject:"Ejercicios de inglés A1 para hacer la maleta: need to, don't need to y vocabulario de equipaje.",keywords:["hacer la maleta en inglés","packing a suitcase vocabulary","vocabulario de viaje A1","need to en inglés","don't need to ejercicios","equipaje en inglés","inglés A1 PDF"]},
"a1-unidad-50-module-5-review-places-travel":{title:"Repaso de inglés A1: lugares y viajes, unidades 41–49",subject:"Repaso de inglés A1 de lugares y viajes: aeropuerto, transporte, hotel, vacaciones y turismo.",keywords:["repaso inglés A1 viajes","places and travel A1","vocabulario de viajes en inglés","inglés aeropuerto y hotel","transport vocabulary","sightseeing vocabulary","ejercicios inglés A1 PDF"]},
"a1-unidad-51-at-the-supermarket":{title:"At the Supermarket en inglés A1: vocabulario y plurales",subject:"Ejercicios de inglés A1 en el supermercado: vocabulario de compra y sustantivos plurales.",keywords:["supermercado en inglés","vocabulario supermercado inglés","plural nouns exercises","plurales irregulares inglés","food shopping vocabulary","inglés A1 supermercado","ejercicios PDF inglés A1"]},
"a1-unidad-52-countable-uncountable":{title:"Countable and Uncountable en inglés A1: much y many",subject:"Ejercicios de inglés A1 sobre sustantivos contables e incontables, much, many y cantidades.",keywords:["countable and uncountable nouns","contables e incontables inglés","much y many ejercicios","a lot of en inglés","food quantities vocabulary","gramática inglesa A1","ejercicios inglés A1 PDF"]},
"a1-unidad-53-some-any-containers":{title:"Some and Any en inglés A1: cantidades y envases",subject:"Ejercicios de inglés A1 sobre some, any y envases de alimentos y bebidas.",keywords:["some and any ejercicios","some any inglés A1","envases en inglés","containers vocabulary English","a bottle of a packet of","cantidades alimentos inglés","ejercicios inglés A1 PDF"]},
"a1-unidad-54-how-much-how-many":{title:"How Much and How Many en inglés A1: cantidades y precios",subject:"Ejercicios de inglés A1 para preguntar cantidades y precios con How much y How many.",keywords:["how much how many ejercicios","how much en inglés A1","how many en inglés A1","preguntar precios en inglés","cantidades en inglés","shopping English vocabulary","ejercicios inglés A1 PDF"]},
"a1-unidad-55-clothing-store":{title:"Clothing Store en inglés A1: ropa, tallas y compras",subject:"Ejercicios de inglés A1 sobre ropa, tallas y compras en una tienda de ropa.",keywords:["ropa en inglés A1","clothing store vocabulary","tallas de ropa en inglés","too y enough ejercicios","comprar ropa en inglés","clothes shopping English","ejercicios inglés A1 PDF"]},
"a1-unidad-56-at-the-restaurant":{title:"At the Restaurant en inglés A1: pedir comida y bebida",subject:"Ejercicios de inglés A1 para pedir comida en un restaurante y comprender un menú.",keywords:["restaurante en inglés A1","pedir comida en inglés","at the restaurant vocabulary","I'd like ejercicios","Can I have en inglés","menú en inglés vocabulario","ejercicios inglés A1 PDF"]},
"a1-unidad-57-cooking-recipes":{title:"Cooking and Recipes en inglés A1: recetas y verbos de cocina",subject:"Ejercicios de inglés A1 sobre recetas, imperativos, ingredientes y verbos de cocina.",keywords:["recetas en inglés A1","vocabulario de cocina en inglés","cooking and recipes vocabulary","imperatives exercises","verbos de cocina inglés","first then next finally","ejercicios inglés A1 PDF"]},
"a1-unidad-58-health-illness":{title:"Health and Illness en inglés A1: síntomas y consejos",subject:"Ejercicios de inglés A1 sobre salud, síntomas, enfermedades y consejos con should.",keywords:["enfermedades en inglés","síntomas en inglés A1","health and illness vocabulary","should shouldn't ejercicios","dar consejos en inglés","vocabulario salud inglés","ejercicios inglés A1 PDF"]},
"a1-unidad-59-money-currency":{title:"Money and Currency en inglés A1: dinero y precios",subject:"Ejercicios de inglés A1 sobre dinero, moneda, precios, pagos y compras.",keywords:["dinero en inglés","money and currency vocabulary","monedas y billetes en inglés","precios en inglés A1","pay for spend money on cost","compras en inglés vocabulario","ejercicios inglés A1 PDF"]},
"a1-unidad-60-module-6-review-shopping-food":{title:"Repaso de inglés A1: compras y alimentación, unidades 51–59",subject:"Repaso de inglés A1 sobre compras y alimentación: supermercado, cantidades, ropa, restaurante y dinero.",keywords:["repaso inglés A1 compras","shopping and food English","vocabulario alimentos en inglés","supermarket vocabulary","restaurant English","clothes shopping English","money vocabulary","ejercicios inglés A1 PDF"]}
};
export const dynamic = "force-dynamic";
interface PdfFileRow { title:string; filename:string; content_type:string; size_bytes:number; }
interface PdfChunkRow { chunk_index:number; content:ArrayBuffer; }
const allowedSlugs=new Set([
"a1-unidad-5-present-simple-rutinas","a1-unidad-6-familia-posesivos-genitivo","a1-unidad-7-colores-descripciones-fisicas","a1-unidad-8-numeros-edad-precios","a1-unidad-9-profesiones-ocupaciones","a1-unidad-10-rutinas-diarias-hora","a1-unidad-11-lugares-ciudad","a1-unidad-12-dias-semana","a1-unidad-13-rutina-diaria","a1-unidad-14-present-simple-dont-do-you","a1-unidad-15-present-simple-does-doesnt","a1-unidad-16-at-the-cafe","a1-unidad-17-breakfast-lunch-dinner","a1-unidad-18-likes-dislikes","a1-unidad-19-months-dates-birthdays","a1-unidad-20-module-2-review","a1-unidad-21-rooms-in-a-house","a1-unidad-22-furniture-household-items","a1-unidad-23-there-is-there-are","a1-unidad-24-prepositions-of-place","a1-unidad-25-can-cant","a1-unidad-26-present-continuous","a1-unidad-27-past-simple-was-were","a1-unidad-28-past-simple-regular-verbs","a1-unidad-29-past-simple-irregular-verbs","a1-unidad-30-past-simple-negatives-questions","a1-unidad-31-past-continuous","a1-unidad-32-past-simple-vs-past-continuous","a1-unidad-33-comparatives-superlatives","a1-unidad-34-countable-uncountable-nouns","a1-unidad-35-pronouns-possessives","a1-unidad-36-prepositions-place-direction"
,"a1-unidad-37-talent-skills","a1-unidad-38-asking-for-permission","a1-unidad-39-outdoor-activities","a1-unidad-40-module-4-review-abilities-interests","a1-unidad-41-at-the-airport","a1-unidad-42-transport","a1-unidad-43-travel-verbs","a1-unidad-44-the-weather","a1-unidad-45-seasons","a1-unidad-46-at-the-hotel","a1-unidad-47-holidays","a1-unidad-48-sightseeing","a1-unidad-49-packing-a-suitcase","a1-unidad-50-module-5-review-places-travel","a1-unidad-51-at-the-supermarket","a1-unidad-52-countable-uncountable","a1-unidad-53-some-any-containers","a1-unidad-54-how-much-how-many","a1-unidad-55-clothing-store","a1-unidad-56-at-the-restaurant","a1-unidad-57-cooking-recipes","a1-unidad-58-health-illness","a1-unidad-59-money-currency","a1-unidad-60-module-6-review-shopping-food"]);
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
 let responseBody: Uint8Array = body;
 const metadata=pdfSeo[dbSlug];
 if(metadata){
  const document=await PDFDocument.load(body);
  document.setTitle(metadata.title);
  document.setAuthor("LinguaFly");
  document.setSubject(metadata.subject);
  document.setKeywords(metadata.keywords);
  document.setCreator("LinguaFly — Material didáctico de inglés A1");
  document.setProducer("LinguaFly");
  responseBody=await document.save();
 }
 return new Response(responseBody,{headers:{"Content-Type":pdf.content_type||"application/pdf","Content-Disposition":`attachment; filename="${safeFilename}"`,"Content-Length":String(responseBody.byteLength),"Cache-Control":"public, max-age=3600","X-Content-Type-Options":"nosniff"}});
}
