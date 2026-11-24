import { getEnv } from "@/lib/cf-context";

export type SpeakingLevel = "a1" | "a2" | "b1" | "b2" | "c1" | "c2";

export type SpeakingR2Content = {
  unitWords?: Record<string, string[]>;
  defaultWords?: string[];
  defaultTopics?: Record<string, string[]>;
  sentenceBuilderUnits?: number[];
  unitTitles?: string[];
  moduleTitles?: string[];
};

const cache = new Map<string, { expiresAt: number; value: SpeakingR2Content }>();
const TTL_MS = 5 * 60 * 1000;

export async function getSpeakingR2Content(level: SpeakingLevel): Promise<SpeakingR2Content> {
  const cached = cache.get(level);
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  const bucket = getEnv().LINGUAFLY_MEDIA;
  if (!bucket) throw new Error("Speaking R2 bucket is not configured");

  const object = await bucket.get(`speaking/${level}.json`);
  if (!object) throw new Error(`Speaking content not found in R2: ${level}`);

  const content = JSON.parse(await object.text()) as SpeakingR2Content;
  cache.set(level, { value: content, expiresAt: Date.now() + TTL_MS });
  return content;
}
