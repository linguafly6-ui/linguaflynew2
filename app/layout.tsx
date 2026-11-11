import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";

const siteName = "Linguafly";
const siteUrl = "https://linguafly.app";
const defaultTitle = "Linguafly — Aprende inglés con IA conversacional";
const defaultDescription = "Practica inglés con tutores de IA, ejercicios guiados y cursos adaptados a tu nivel, de A1 a C2.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: "%s" },
  description: defaultDescription,
  openGraph: {
    type: "website",
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Linguafly — Aprende inglés con IA conversacional" }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/opengraph-image"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Linguafly",
  url: siteUrl,
  description: "Plataforma de aprendizaje de inglés con IA conversacional",
  areaServed: "ES",
  knowsLanguage: ["es", "en"],
};

function SiteHeader() {
  return (
    <header className="site-header border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="site-header-inner mx-auto flex min-h-20 w-[min(1152px,calc(100%-2rem))] items-center justify-between gap-6">
        <Link href="/" className="brand text-2xl font-black tracking-tight text-slate-900" aria-label="Linguafly home">Linguafly<span>.</span></Link>
        <nav aria-label="Main navigation" className="site-nav flex items-center gap-4 text-sm font-semibold text-slate-600">
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer mt-20 bg-slate-950 text-slate-300">
      <div className="site-footer-inner mx-auto grid w-[min(1152px,calc(100%-2rem))] grid-cols-1 items-center gap-5 py-10 md:grid-cols-2">
        <Link href="/" className="brand brand-footer">Linguafly<span>.</span></Link>
        <p>Practical British English learning, from A1 to C2.</p>
        <nav aria-label="Footer navigation"><Link href="/blog">Blog</Link></nav>
        <small>© {new Date().getFullYear()} Linguafly</small>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"993cb502f4304854a10d3e42d8d5e0d3"}' strategy="afterInteractive" />
      </body>
    </html>
  );
}
