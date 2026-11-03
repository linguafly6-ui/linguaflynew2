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

    const env = getEnv();
    const db = env.COURSE_DB || env.DB;
    if (!db) return NextResponse.json({ error: "Base de datos no disponible." }, { status: 503 });

    const key = word.toLocaleLowerCase("en");
    const id = await cacheId(key);
    const cached = await db.prepare("SELECT translation FROM translation_cache WHERE id = ?").bind(id).first() as { translation?: string } | null;
    if (cached?.translation) return NextResponse.json({ translation: cached.translation, word });

    if (!env.AI?.run) return NextResponse.json({ error: "Servicio de traducción no disponible." }, { status: 503 });
    const result = await env.AI.run(MODEL as any, {
      messages: [
        { role: "system", content: "Translate the following English word/phrase to Spanish. Return ONLY the translation, nothing else." },
        { role: "user", content: word }
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
