import { NextResponse } from "next/server";
import mission051 from "@/content/missions/a1/051.json";
import mission052 from "@/content/missions/a1/052.json";
import mission053 from "@/content/missions/a1/053.json";
import mission054 from "@/content/missions/a1/054.json";
import mission055 from "@/content/missions/a1/055.json";
import mission056 from "@/content/missions/a1/056.json";
import mission057 from "@/content/missions/a1/057.json";
import mission058 from "@/content/missions/a1/058.json";
import mission059 from "@/content/missions/a1/059.json";
import mission060 from "@/content/missions/a1/060.json";

const missions: Record<string, unknown> = {
  "051": mission051, "052": mission052, "053": mission053, "054": mission054, "055": mission055,
  "056": mission056, "057": mission057, "058": mission058, "059": mission059, "060": mission060,
};

export function GET(_request: Request, { params }: { params: Promise<{ mission: string }> }) {
  return params.then(({ mission }) => {
    const content = missions[mission];
    if (!content) return NextResponse.json({ error: "Mission not found" }, { status: 404 });
    return NextResponse.json(content, { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=3600" } });
  });
}
