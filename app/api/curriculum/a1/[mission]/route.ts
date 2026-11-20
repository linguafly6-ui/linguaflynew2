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
import mission061 from "@/content/missions/a1/061.json";
import mission062 from "@/content/missions/a1/062.json";
import mission063 from "@/content/missions/a1/063.json";
import mission064 from "@/content/missions/a1/064.json";
import mission065 from "@/content/missions/a1/065.json";
import mission066 from "@/content/missions/a1/066.json";
import mission067 from "@/content/missions/a1/067.json";
import mission068 from "@/content/missions/a1/068.json";
import mission069 from "@/content/missions/a1/069.json";
import mission070 from "@/content/missions/a1/070.json";
import mission071 from "@/content/missions/a1/071.json";
import mission072 from "@/content/missions/a1/072.json";
import mission073 from "@/content/missions/a1/073.json";
import mission074 from "@/content/missions/a1/074.json";
import mission075 from "@/content/missions/a1/075.json";
import mission076 from "@/content/missions/a1/076.json";
import mission077 from "@/content/missions/a1/077.json";
import mission078 from "@/content/missions/a1/078.json";
import mission079 from "@/content/missions/a1/079.json";
import mission080 from "@/content/missions/a1/080.json";

const missions: Record<string, unknown> = {
  "051": mission051, "052": mission052, "053": mission053, "054": mission054, "055": mission055,
  "056": mission056, "057": mission057, "058": mission058, "059": mission059, "060": mission060,
  "061": mission061, "062": mission062, "063": mission063, "064": mission064, "065": mission065, "066": mission066, "067": mission067, "068": mission068, "069": mission069, "070": mission070,
  "071": mission071, "072": mission072, "073": mission073, "074": mission074, "075": mission075, "076": mission076, "077": mission077, "078": mission078, "079": mission079, "080": mission080
};

export function GET(_request: Request, { params }: { params: Promise<{ mission: string }> }) {
  return params.then(({ mission }) => {
    const content = missions[mission];
    if (!content) return NextResponse.json({ error: "Mission not found" }, { status: 404 });
    return NextResponse.json(content, { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=3600" } });
  });
}
