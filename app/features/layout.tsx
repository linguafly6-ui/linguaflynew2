import type { Metadata } from "next";

const title = "Características de Linguafly — Cursos de inglés con IA";
const description = "Descubre cómo practicar pronunciación, conversación y vocabulario con herramientas de IA para aprender inglés.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/features" },
  openGraph: { type: "website", title, description, url: "https://linguafly.app/features", siteName: "Linguafly", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Linguafly — Aprende inglés con IA conversacional" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function FeaturesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
