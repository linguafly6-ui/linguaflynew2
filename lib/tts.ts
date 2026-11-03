import { getEnv } from "@/lib/cf-context";
import { checkAiRateLimit } from "@/lib/ai-helpers";
const MODEL = "@cf/myshell-ai/melotts";
async function hash(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), (v) => v.toString(16).padStart(2, "0")).join("");
}
export async function generateCachedTts(text: string, lang: "en" | "es", userId: string, prefix = "tts") {
  const env = getEnv();
  const textHash = await hash(text.trim() + lang);
  const cacheKey = await hash(textHash + ":" + lang);
  const cached = await env.DB.prepare("SELECT r2_key FROM tts_cache WHERE cache_key=?").bind(cacheKey).first() as any;
  if (cached?.r2_key && await env.LINGUAFLY_MEDIA.head(cached.r2_key)) return String(cached.r2_key);
  if (!(await checkAiRateLimit(userId))) throw new Error("AI_RATE_LIMITED");
  const result = await env.AI.run(MODEL as any, { prompt: text.trim(), lang });
  const encoded = (result as any)?.audio;
  if (typeof encoded !== "string" || !encoded) throw new Error("MeloTTS no ha generado audio");
  const binary = atob(encoded), bytes = new Uint8Array(binary.length);
  for (let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
  const key = `${prefix}/${cacheKey}.mp3`;
  await env.LINGUAFLY_MEDIA.put(key, bytes, { httpMetadata: { contentType: "audio/mpeg" } });
  await env.DB.prepare("INSERT INTO tts_cache (cache_key,text_hash,lang,r2_key) VALUES (?,?,?,?) ON CONFLICT(cache_key) DO UPDATE SET r2_key=excluded.r2_key").bind(cacheKey,textHash,lang,key).run();
  return key;
}
export const audioServeUrl = (key: string) => `/api/audio/serve?key=${encodeURIComponent(key)}`;