import type { Metadata } from "next";

const title = "Crear cuenta — Linguafly";
const description = "Crea tu cuenta gratuita en Linguafly y empieza a practicar inglés con IA desde tu nivel.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/crear-cuenta" },
  openGraph: { type: "website", title, description, url: "https://linguafly.app/crear-cuenta", siteName: "Linguafly" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RegisterLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
