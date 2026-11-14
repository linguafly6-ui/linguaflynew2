import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "edge";

export async function GET() {
  const { env } = await getCloudflareContext({ async: true });
  const object = await env.LINGUAFLY_MEDIA.get(
    "biblioteca-pdf/a1/unidad-1-presentarse.pdf",
  );

  if (!object) {
    return new Response("El PDF todavía no está disponible.", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }

  return new Response(object.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="LinguaFly_A1_Unidad_1_200_ejercicios.pdf"',
      "Content-Length": String(object.size),
      "Cache-Control": "public, max-age=3600",
    },
  });
}
