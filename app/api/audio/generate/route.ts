import { NextRequest, NextResponse } from "next/server";
import { getAI, getAIRateLimiter } from "@/lib/db";

export const runtime = "edge";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { text?: string; language?: string };
    const text = typeof body.text === "string" ? body.text.trim() : "";
    if (!text || text.length > 500) return NextResponse.json({ error: "Provide text between 1 and 500 characters." }, { status: 400 });
    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    const limiter = await getAIRateLimiter();
    if (limiter) { const allowed = await limiter.limit({ key: ip }); if (!allowed.success) return NextResponse.json({ error: "Audio limit reached. Please try again shortly." }, { status: 429 }); }
    const language = "en";
    const ai = await getAI();
    const result = await ai.run("@cf/myshell-ai/melotts", { prompt: text, lang: language }) as { audio?: string; audio_base64?: string };
    const encoded = result.audio ?? result.audio_base64;
    if (typeof encoded !== "string" || !encoded.length) return NextResponse.json({ error: "The speech service returned no audio." }, { status: 502 });
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new Response(bytes, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store", "Content-Length": String(bytes.byteLength) } });
  } catch (error) {
    console.error("Audio generation failed", error);
    return NextResponse.json({ error: "Unable to generate audio right now." }, { status: 502 });
  }
}
