import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Linguafly — Aprende inglés con IA conversacional";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          color: "white",
          background: "linear-gradient(135deg, #123c9a 0%, #245fe0 52%, #5428a8 100%)",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: -100, top: -170, width: 520, height: 520, borderRadius: 260, background: "rgba(255,255,255,0.08)", display: "flex" }} />
        <div style={{ position: "absolute", right: 110, bottom: -300, width: 560, height: 560, borderRadius: 280, border: "2px solid rgba(255,255,255,0.16)", display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 700, letterSpacing: "-1px" }}>
          <div style={{ width: 58, height: 58, borderRadius: 18, background: "white", color: "#245fe0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 900 }}>L</div>
          Linguafly
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 900 }}>
          <div style={{ fontSize: 68, lineHeight: 1.08, fontWeight: 800, letterSpacing: "-3px", display: "flex" }}>Habla inglés con confianza.</div>
          <div style={{ fontSize: 32, lineHeight: 1.3, color: "#dbeafe", display: "flex" }}>Aprende con IA conversacional · De A1 a C2</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22, color: "#dbeafe" }}>
          <span>Pronunciación · Conversación · Progreso</span>
          <span>linguafly.app</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
