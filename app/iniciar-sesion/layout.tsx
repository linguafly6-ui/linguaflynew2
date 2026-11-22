import type { Metadata } from "next";

const title = "Iniciar sesión — Linguafly";
const description = "Accede a tu cuenta de Linguafly y continúa tu aprendizaje de inglés con IA.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/iniciar-sesion" },
  openGraph: { type: "website", title, description, url: "https://linguafly.app/iniciar-sesion", siteName: "Linguafly", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Linguafly — Aprende inglés con IA conversacional" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
