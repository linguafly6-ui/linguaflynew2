import type { Metadata } from "next";

const title = "Planes y precios — Linguafly";
const description = "Compara los planes de Linguafly y elige el acceso que mejor se adapta a tu práctica de inglés.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/suscripcion" },
  openGraph: { type: "website", title, description, url: "https://linguafly.app/suscripcion", siteName: "Linguafly" },
  twitter: { card: "summary_large_image", title, description },
};

export default function SubscriptionLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
