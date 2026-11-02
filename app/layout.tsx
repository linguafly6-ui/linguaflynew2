import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://linguafly.app"),
  title: {
    default: "LinguaFly — British English, from A1 to C2",
    template: "%s | LinguaFly"
  },
  description: "Learn British English with structured courses, practical exercises and articles."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB"><body>{children}</body></html>;
}
