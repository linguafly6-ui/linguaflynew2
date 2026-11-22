import { getEnv } from "@/lib/cf-context";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const key = path.join("/");
  const env = getEnv();

  if (!env?.LINGUAFLY_MEDIA) {
    return new Response("Media storage unavailable", { status: 500 });
  }

  const object = await env.LINGUAFLY_MEDIA.get(key);

  if (object === null) {
    return new Response("Not Found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new Response(object.body, { headers });
}
