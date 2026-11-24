import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav aria-label="NavegaciÃ³n principal">
      <Link href="/">Inicio</Link>
      {" | "}
      <Link href="/academia">Academia</Link>
      {" | "}
      <Link href="/blog">Blog</Link>
    </nav>
  );
}
