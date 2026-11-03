import { getEnv } from "@/lib/cf-context";
export async function checkAiRateLimit(userId: string): Promise<boolean> {
  const env = getEnv();
  if (!env.AI_RATE_LIMITER?.limit) return true;
  const result = await env.AI_RATE_LIMITER.limit({ key: userId || "anonymous" });
  return Boolean(result?.success);
}