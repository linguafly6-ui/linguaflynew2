import { getEnv } from "@/lib/cf-context";
import { checkAiRateLimit } from "@/lib/ai-helpers";
const MODEL = "@cf/myshell-ai/melotts";
async function hash(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), (v) => v.toString(16).padStart(2, "0")).join("");
}
export async function generateCachedTts(text: string, lang: "en" | "es", userId: string, prefix = "tts") {
  try {
    console.log("TTS STEP 1: getEnv");
    const env = getEnv();
    console.log("TTS STEP 2: hash", { hasEnv: !!env, hasDB: !!env?.DB, hasAI: !!env?.AI, hasR2: !!env?.LINGUAFLY_MEDIA });
    const textHash = await hash(text.trim() + lang);
    const cacheKey = await hash(textHash + ":" + lang);
    console.log("TTS STEP 3: cache check");
    const cached = await env.DB.prepare("SELECT r2_key FROM tts_cache WHERE cache_key=?").bind(cacheKey).first() as any;
    if (cached?.r2_key && await env.LINGUAFLY_MEDIA.head(cached.r2_key)) return String(cached.r2_key);
    console.log("TTS STEP 4: rate limit");
    if (!(await checkAiRateLimit(userId))) throw new Error("AI_RATE_LIMITED");
    console.log("TTS STEP 5: AI.run melotts");
    const response = await env.AI.run(MODEL as any, { prompt: text.trim(), lang }) as Response;
    console.log("TTS STEP 6: response", { type: typeof response, ok: response?.ok });
    if (!response || typeof response.arrayBuffer !== "function") throw new Error("Respuesta inválida de MeloTTS");
    if (!response.ok) throw new Error(`MeloTTS respondió con estado ${response.status}`);
    console.log("TTS STEP 7: arrayBuffer");
    const audioBuffer = await response.arrayBuffer();
    console.log("TTS STEP 8: audio", { byteLength: audioBuffer.byteLength });
    if (!audioBuffer.byteLength) throw new Error("MeloTTS no ha generado audio");
    const bytes = new Uint8Array(audioBuffer);
    const key = `${prefix}/${cacheKey}.mp3`;
    console.log("TTS STEP 9: R2 put");
    await env.LINGUAFLY_MEDIA.put(key, bytes, { httpMetadata: { contentType: "audio/mpeg" } });
    console.log("TTS STEP 10: D1 cache insert");
    await env.DB.prepare("INSERT INTO tts_cache (cache_key,text_hash,lang,r2_key) VALUES (?,?,?,?) ON CONFLICT(cache_key) DO UPDATE SET r2_key=excluded.r2_key").bind(cacheKey,textHash,lang,key).run();
    console.log("TTS STEP 11: done");
    return key;
  } catch (error) {
    console.error("TTS ERROR en generateCachedTts:", error);
    throw error;
  }
}
export const audioServeUrl = (key: string) => `/api/audio/serve?key=${encodeURIComponent(key)}`;
