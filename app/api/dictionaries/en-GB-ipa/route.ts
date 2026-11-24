import { getEnv } from "@/lib/cf-context";

const DICTIONARY_CHUNK_COUNT = 10;
const DICTIONARY_PREFIX = "dictionaries/en-GB-ipa/chunk-";

export async function GET() {
  try {
    const env = getEnv();
    if (!env?.LINGUAFLY_MEDIA) {
      return new Response("Dictionary storage unavailable", { status: 503 });
    }

    const chunks = await Promise.all(
      Array.from({ length: DICTIONARY_CHUNK_COUNT }, async (_, index) => {
        const key = `${DICTIONARY_PREFIX}${String(index).padStart(3, "0")}`;
        const object = await env.LINGUAFLY_MEDIA.get(key);
        if (!object) throw new Error(`Missing dictionary chunk: ${key}`);
        return object.text();
      })
    );

    const dictionaryText = chunks.join("");
    const dictionary = JSON.parse(dictionaryText) as Record<string, string>;
    if (!dictionary || typeof dictionary !== "object" || Array.isArray(dictionary)) {
      throw new Error("Invalid IPA dictionary payload");
    }

    return new Response(JSON.stringify(dictionary), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("IPA dictionary GET failed:", error);
    return new Response("Dictionary unavailable", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
