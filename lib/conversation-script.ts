export type Level = "A1" | "A2" | "B1" | "B2";

export interface LessonItem {
  english: string;
  spanish: string;
  example: string;
}

export interface LessonSection {
  title: string;
  explanation: string;
  items: LessonItem[];
}

export interface Lesson {
  unitId: number;
  level: Level;
  title: string;
  description: string;
  language: string;
  introduction: string;
  sections: LessonSection[];
  tips: string;
}

export interface UnitInfo {
  id: number;
  level: Level;
  title: string;
  description: string;
  language: string;
  topic: string;
}

export function getLevelForUnit(unitId: number): Level {
  if (unitId <= 25) return "A1";
  if (unitId <= 50) return "A2";
  if (unitId <= 75) return "B1";
  return "B2";
}

export async function loadUnitFromDb(db: D1Database, unitId: number): Promise<UnitInfo | null> {
  const row = await db.prepare("SELECT id, level, title, description, language, topic FROM conversation_units WHERE id = ?").bind(unitId).first();
  if (!row) return null;
  return { id: row.id as number, level: row.level as Level, title: row.title as string, description: (row.description as string) || "", language: (row.language as string) || "en", topic: (row.topic as string) || "general" };
}

export async function generateLessonWithAI(ai: Ai, unit: UnitInfo): Promise<Lesson> {
  const levelDesc: Record<Level, string> = {
    A1: "principiantes absolutos. Vocabulario muy basico y frases cortas.",
    A2: "principiantes con algo de base. Vocabulario elemental y frases simples.",
    B1: "intermedios. Vocabulario variado y estructuras mas complejas.",
    B2: "intermedios altos. Vocabulario avanzado y estructuras complejas.",
  };

  const prompt = `You are an English teacher creating a lesson for a Spanish-speaking student at the ${unit.level} level (${levelDesc[unit.level]}). The topic is "${unit.title}" — ${unit.description}. Create a complete lesson in SPANISH explaining English concepts. Include English vocabulary with Spanish translations. Return ONLY a valid JSON object (no markdown, no code blocks): {"title":"Titulo en espanol","introduction":"2-3 frases en espanol","sections":[{"title":"Titulo seccion en espanol","explanation":"Explicacion en espanol 2-4 frases","items":[{"english":"palabra en ingles","spanish":"traduccion al espanol","example":"frase ejemplo en ingles"}]}],"tips":"1-2 consejos de pronunciacion en espanol"}. RULES: All explanations in Spanish. English words in english field. 3-5 items per section. 2-4 sections. Return ONLY JSON.`;

  try {
    const response = await ai.run("@cf/meta/llama-3.1-8b-instruct", {
      messages: [
        { role: "system", content: "You are an English teacher assistant. You always respond with valid JSON only, no markdown, no code blocks." },
        { role: "user", content: prompt },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const rawText = (response as { response?: string }).response ?? "";
    let cleanJson = rawText.trim();
    if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    let parsed: Partial<Lesson>;
    try {
      parsed = JSON.parse(cleanJson);
    } catch {
      const jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        return generateFallbackLesson(unit);
      }
    }

    const lesson: Lesson = {
      unitId: unit.id,
      level: unit.level,
      title: parsed.title || unit.title,
      description: unit.description,
      language: unit.language,
      introduction: parsed.introduction || `En esta unidad aprenderas sobre ${unit.title}.`,
      sections: Array.isArray(parsed.sections) ? parsed.sections.map((s: Partial<LessonSection>, i: number) => ({
        title: s.title || `Seccion ${i + 1}`,
        explanation: s.explanation || "",
        items: Array.isArray(s.items) ? s.items.map((item: Partial<LessonItem>) => ({
          english: item.english || "",
          spanish: item.spanish || "",
          example: item.example || "",
        })).filter((item: LessonItem) => item.english) : [],
      })).filter((s: LessonSection) => s.items.length > 0) : [],
      tips: parsed.tips || "Practica pronunciando cada palabra en voz alta varias veces.",
    };

    if (lesson.sections.length === 0) return generateFallbackLesson(unit);
    return lesson;
  } catch {
    return generateFallbackLesson(unit);
  }
}

function generateFallbackLesson(unit: UnitInfo): Lesson {
  return {
    unitId: unit.id,
    level: unit.level,
    title: unit.title,
    description: unit.description,
    language: unit.language,
    introduction: `En esta unidad aprenderas sobre ${unit.title}. ${unit.description} Estudia el vocabulario y practica la pronunciacion con el audio.`,
    sections: [
      { title: "Vocabulario esencial", explanation: `Aqui tienes las palabras clave sobre ${unit.topic}. Escucha la pronunciacion pulsando el boton de audio.`, items: [
        { english: "Hello", spanish: "Hola", example: "Hello, how are you?" },
        { english: "Please", spanish: "Por favor", example: "Please, sit down." },
        { english: "Thank you", spanish: "Gracias", example: "Thank you very much." },
        { english: "Goodbye", spanish: "Adios", example: "Goodbye, see you tomorrow." },
        { english: "Sorry", spanish: "Lo siento", example: "Sorry, I'm late." },
      ]},
      { title: "Frases utiles", explanation: "Estas frases te ayudaran a comunicarte. Practica pronunciandolas en voz alta.", items: [
        { english: "Nice to meet you", spanish: "Encantado de conocerte", example: "Hi, I'm John. Nice to meet you." },
        { english: "Can you help me?", spanish: "Puedes ayudarme?", example: "Can you help me, please?" },
        { english: "I don't understand", spanish: "No entiendo", example: "I don't understand. Can you repeat?" },
      ]},
    ],
    tips: "Consejo: Escucha el audio de cada palabra varias veces y repitela en voz alta.",
  };
}

