import { NextRequest, NextResponse } from "next/server";
import { getAI, getAIRateLimiter, getR2 } from "@/lib/db";

const MODEL = "@cf/deepgram/aura-1";
const SPEAKER = "angus";
const MAX_TEXT_LENGTH = 500;

async function cacheKey(text: string): Promise<string> {
  const source = new TextEncoder().encode(`${MODEL}|${SPEAKER}|en-GB|${text}`);
  const digest = await crypto.subtle.digest("SHA-256", source);
  const hash = Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, "0")).join("");
  return `tts/pre-a1/${hash}.mp3`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { text?: string };
    const text = typeof body.text === "string" ? body.text.trim() : "";
    if (!text || text.length > MAX_TEXT_LENGTH) {
      return NextResponse.json({ error: "Provide text between 1 and 500 characters." }, { status: 400 });
    }

    const key = await cacheKey(text);
    const r2 = await getR2();
    const cached = await r2.get(key);
    if (cached) {
      return new Response(cached.body, {
        headers: {
          "Content-Type": cached.httpMetadata?.contentType || "audio/mpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-Linguafly-Audio-Cache": "HIT"
        }
      });
    }

    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    const limiter = await getAIRateLimiter();
    if (limiter) {
      const allowed = await limiter.limit({ key: ip });
      if (!allowed.success) {
        return NextResponse.json({ error: "Audio limit reached. Please try again shortly." }, { status: 429 });
      }
    }

    const ai = await getAI();
    const generated = await ai.run(
      MODEL,
      { text, speaker: SPEAKER, encoding: "mp3" },
      { returnRawResponse: true }
    ) as Response;

    if (!generated.ok) {
      console.error("Workers AI TTS returned an error", generated.status);
      return NextResponse.json({ error: "The speech service could not generate audio." }, { status: 502 });
    }

    const audio = await generated.arrayBuffer();
    if (!audio.byteLength) {
      return NextResponse.json({ error: "The speech service returned empty audio." }, { status: 502 });
    }

    await r2.put(key, audio, {
      httpMetadata: { contentType: "audio/mpeg" },
      customMetadata: { model: MODEL, speaker: SPEAKER }
    });

    return new Response(audio, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": String(audio.byteLength),
        "X-Linguafly-Audio-Cache": "MISS"
      }
    });
  } catch (error) {
    console.error("Audio generation failed", error);
    return NextResponse.json({ error: "Unable to generate audio right now." }, { status: 502 });
  }
}
