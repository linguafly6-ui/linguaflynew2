import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";
const CHAT_MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";

export async function POST(request: NextRequest) {
 try {
  const body = await request.json() as any;
  const {userId,scenarioId,sessionId} = body;
  if (!userId || !scenarioId || !sessionId) return NextResponse.json({error:"Faltan userId, scenarioId o sessionId"},{status:400});
  const env = getEnv();
  const session = await env.DB.prepare("SELECT id,user_id,scenario_id FROM conversation_sessions WHERE id = ?").bind(sessionId).first();
  if (!session || (session as any).user_id!==userId || (session as any).scenario_id!==scenarioId) return NextResponse.json({error:"Sesión no encontrada"},{status:404});
  if (String(scenarioId).startsWith("a1-speaking-") || String(scenarioId).startsWith("a2-speaking-")) { const student = await getStudent(request); const unitNumber = Number(String(scenarioId).split("-").pop()); if (unitNumber > 5 && student?.plan !== "pro") return NextResponse.json({error:"Pro required"},{status:403}); if (student && (session as any).user_id !== studentUserId(student)) return NextResponse.json({error:"Sesión no válida"},{status:403}); }
  const resultRows = await env.DB.prepare("SELECT role,content FROM conversation_messages WHERE session_id = ? ORDER BY created_at ASC").bind(sessionId).all();
  const messages = resultRows.results || [];
  if (!messages.some((message:any)=>message.role==="user")) return NextResponse.json({error:"La conversación no contiene respuestas del estudiante"},{status:400});
  const transcript = messages.map((message:any)=>(message.role==="user"?"Estudiante: ":"Personaje: ")+message.content).join("\n");
  const evaluation = await env.AI.run(CHAT_MODEL as any,{
   messages:[
    {role:"system",content:"Eres un evaluador de conversaciones de aprendizaje de idiomas. Analiza la conversación del estudiante. Devuelve SOLO un JSON con: { score: 0-100, feedback: string en español, grammar_errors: number, vocabulary_used: number }. El score refleja fluidez, precisión gramatical y riqueza de vocabulario."},
    {role:"user",content:"Evalúa esta conversación y devuelve únicamente el JSON solicitado:\n\n"+transcript}
   ],max_tokens:300,temperature:0.2
  });
  const raw = String((evaluation as any).response||"").trim();
  const jsonText = raw.replace(/^\`\`\`(?:json)?\s*/i,"").replace(/\s*\`\`\`$/,"");
  let parsed:any;
  try { parsed=JSON.parse(jsonText); } catch {
   const match=jsonText.match(/\{[\s\S]*\}/);
   if(!match) throw new Error("La IA devolvió una evaluación no válida");
   parsed=JSON.parse(match[0]);
  }
  const score=Math.max(0,Math.min(100,Math.round(Number(parsed.score)||0)));
  const stars=score>=90?3:score>=75?2:score>=60?1:0;
  const feedback=String(parsed.feedback||"Sigue practicando para mejorar.");
  const grammar_errors=Math.max(0,Number(parsed.grammar_errors)||0);
  const vocabulary_used=Math.max(0,Number(parsed.vocabulary_used)||0);
  if (String(scenarioId).startsWith("a1-speaking-") || String(scenarioId).startsWith("a2-speaking-")) {
   await env.DB.prepare("UPDATE conversation_sessions SET status='completed',updated_at=datetime('now') WHERE id=?").bind(sessionId).run();
   return NextResponse.json({score,stars,feedback,grammar_errors,vocabulary_used});
  }
  await env.DB.prepare("UPDATE conversation_course_progress SET status=?,score=?,stars=?,attempts=attempts+1,completed_at=CASE WHEN ?='completed' THEN datetime('now') ELSE completed_at END WHERE user_id=? AND scenario_id=?")
   .bind(score>=60?"completed":"available",score,stars,score>=60?"completed":"available",userId,scenarioId).run();
  let unlocked_scenario=null;
  if(score>=60) {
   const current=await env.DB.prepare("SELECT level,course_order FROM conversation_scenarios WHERE id=?").bind(scenarioId).first() as any;
   const next=await env.DB.prepare("SELECT id,title,level,course_order FROM conversation_scenarios WHERE course_order>0 AND ((level=? AND course_order>?) OR (CASE level WHEN 'A1' THEN 1 WHEN 'A2' THEN 2 WHEN 'B1' THEN 3 ELSE 4 END)>(CASE ? WHEN 'A1' THEN 1 WHEN 'A2' THEN 2 WHEN 'B1' THEN 3 ELSE 4 END)) ORDER BY CASE level WHEN 'A1' THEN 1 WHEN 'A2' THEN 2 WHEN 'B1' THEN 3 ELSE 4 END,course_order LIMIT 1").bind(current.level,current.course_order,current.level).first() as any;
   if(next) {
    await env.DB.prepare("UPDATE conversation_course_progress SET status='available' WHERE user_id=? AND scenario_id=? AND status='locked'").bind(userId,next.id).run();
    unlocked_scenario={id:next.id,title:next.title,level:next.level,course_order:next.course_order};
   }
   await env.DB.prepare("UPDATE conversation_sessions SET status='completed',updated_at=datetime('now') WHERE id=?").bind(sessionId).run();
  }
  return NextResponse.json({score,stars,feedback,grammar_errors,vocabulary_used,unlocked_scenario});
 } catch(error) { console.error("Conversation completion error:",error); return NextResponse.json({error:"No se pudo evaluar la conversación"},{status:500}); }
}