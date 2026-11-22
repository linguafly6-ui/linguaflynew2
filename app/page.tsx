import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Linguafly — Blog para aprender inglés",
  description: "Consejos, recursos y guías para mejorar tu inglés con Linguafly.",
  alternates: { canonical: "/" },
};

export const dynamic = "force-dynamic";

export default function HomePage() {
  redirect("/blog");
}
