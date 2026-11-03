import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Linguafly — Aprende inglés con IA conversacional",
  description: "Practica inglés con tutores de IA, ejercicios guiados y cursos adaptados a tu nivel, de A1 a C2.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Linguafly — Aprende inglés con IA conversacional",
    description: "Practica inglés con tutores de IA, ejercicios guiados y cursos adaptados a tu nivel, de A1 a C2.",
    url: "https://linguafly.app/",
    siteName: "Linguafly",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Linguafly — Aprende inglés con IA conversacional" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linguafly — Aprende inglés con IA conversacional",
    description: "Practica inglés con tutores de IA, ejercicios guiados y cursos adaptados a tu nivel, de A1 a C2.",
    images: ["/opengraph-image"],
  },
};

export const dynamic = "force-dynamic";

export default function HomePage() {
  redirect("/inicio");
}
