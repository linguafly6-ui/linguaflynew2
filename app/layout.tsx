import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://linguafly.app"),
  title: { default: "LinguaFly — British English, from A1 to C2", template: "%s | LinguaFly" },
  description: "Learn British English with structured courses, practical exercises and articles."
};

function SiteHeader() {
  return <header className="site-header"><div className="site-header-inner">
    <Link href="/" className="brand" aria-label="LinguaFly home">LinguaFly<span>.</span></Link>
    <nav aria-label="Main navigation" className="site-nav">
      <Link href="/academia">Academy</Link><Link href="/blog">Blog</Link>
    </nav>
  </div></header>;
}
function SiteFooter() {
  return <footer className="site-footer"><div className="site-footer-inner">
    <Link href="/" className="brand brand-footer">LinguaFly<span>.</span></Link>
    <p>Practical British English learning, from A1 to C2.</p>
    <nav aria-label="Footer navigation"><Link href="/academia">Academy</Link><Link href="/blog">Blog</Link></nav>
    <small>© {new Date().getFullYear()} LinguaFly</small>
  </div></footer>;
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB"><body><SiteHeader />{children}<SiteFooter /></body></html>;
}
