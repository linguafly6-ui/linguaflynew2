import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

const MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";

async function cacheId(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { word?: unknown };
    const word = typeof body.word === "string" ? body.word.trim().replace(/\s+/g, " ") : "";
    if (!word || word.length > 120 || !/[a-z]/i.test(word)) {
      return NextResponse.json({ error: "Introduce una palabra o frase corta en inglés." }, { status: 400 });
    }

    if (word.toLowerCase() === "to") return NextResponse.json({ translation: "a", word });

    const env = getEnv();
    const db = env.COURSE_DB || env.DB;
    if (!db) return NextResponse.json({ error: "Base de datos no disponible." }, { status: 503 });

    const key = "v2:" + word.toLocaleLowerCase("en");
    const startsWithTo = /^to\s+/i.test(word);
    const translationInput = startsWithTo ? word.replace(/^to\s+/i, "").trim() : word;
    const id = await cacheId(key);
    const cached = await db.prepare("SELECT translation FROM translation_cache WHERE id = ?").bind(id).first() as { translation?: string } | null;
    if (cached?.translation) return NextResponse.json({ translation: cached.translation, word });

    if (!env.AI?.run) return NextResponse.json({ error: "Servicio de traducción no disponible." }, { status: 503 });
    const result = await env.AI.run(MODEL as any, {
      messages: [
        { role: "system", content: startsWithTo ? "Translate this English verb as a Spanish infinitive ending in -ar, -er, or -ir. Do not translate it as a noun. Return ONLY the infinitive." : "Translate the English word or phrase to Spanish. Consider grammatical function and context. Verbs must be infinitives (trabajar, comer, vivir); nouns must be nouns (trabajo, comida, vida). If an isolated word is ambiguous between verb and noun, return both as infinitive (verbo) / noun (sustantivo). Return ONLY the translation." },
        { role: "user", content: translationInput }
      ],
      max_tokens: 100,
      temperature: 0.1
    });
    const translation = String((result as any)?.response || "").trim().replace(/^["'“”]+|["'“”]+$/g, "");
    if (!translation) throw new Error("La IA no devolvió una traducción.");

    await db.prepare(
      "INSERT INTO translation_cache (id, word, translation, created_at) VALUES (?, ?, ?, datetime('now')) ON CONFLICT(id) DO UPDATE SET translation=excluded.translation"
    ).bind(id, key, translation).run();

    return NextResponse.json({ translation, word });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: "No se pudo traducir el texto." }, { status: 500 });
  }
}
