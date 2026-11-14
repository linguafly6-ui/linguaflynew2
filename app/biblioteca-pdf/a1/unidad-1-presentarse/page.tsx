import type { Metadata } from "next";
import Link from "next/link";

const canonical = "https://linguafly.app/biblioteca-pdf/a1/unidad-1-presentarse";
const title = "Ejercicios de inglés A1: saludos y presentaciones – Unidad 1";
const description =
  "Practica inglés A1 con ejercicios de saludos, presentaciones, verbo to be, países y posesivos. Aprende con explicaciones y ejemplos.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    type: "article",
    title,
    description,
    url: canonical,
    siteName: "Linguafly",
  },
  twitter: { card: "summary_large_image", title, description },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  inLanguage: "es",
  author: { "@type": "Organization", name: "Linguafly" },
  publisher: { "@type": "Organization", name: "Linguafly" },
  mainEntityOfPage: canonical,
  educationalLevel: "A1",
  isAccessibleForFree: true,
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://linguafly.app/" },
    { "@type": "ListItem", position: 2, name: "Biblioteca PDF", item: "https://linguafly.app/biblioteca-pdf" },
    { "@type": "ListItem", position: 3, name: "Inglés A1: saludos y presentaciones", item: canonical },
  ],
};

const faqs = [
  {
    question: "¿Qué se aprende en esta unidad de inglés A1?",
    answer:
      "Aprenderás a saludar, despedirte, presentarte, preguntar nombres, decir de dónde eres y utilizar am, are, my y your en frases sencillas.",
  },
  {
    question: "¿Es adecuada para principiantes?",
    answer:
      "Sí. Está planteada para estudiantes de nivel inicial A1 y trabaja expresiones cotidianas y estructuras gramaticales básicas.",
  },
  {
    question: "¿Qué debo practicar después?",
    answer:
      "Conviene repasar las preguntas y respuestas con to be, memorizar los saludos en contexto y practicar pequeñas conversaciones de presentación.",
  },
];

export default function A1Unit1LibraryPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />

      <nav aria-label="Ruta de navegación" className="mb-8 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-700">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/biblioteca-pdf" className="hover:text-blue-700">Biblioteca PDF</Link>
        <span className="mx-2">/</span>
        <span aria-current="page" className="text-slate-700">Inglés A1 · Unidad 1</span>
      </nav>

      <header className="mb-10">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-700">Biblioteca de ejercicios · Nivel A1</p>
        <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          Ejercicios de inglés A1 – Unidad 1: saludos y presentaciones
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Aprende a saludar, decir tu nombre, preguntar cómo se llama otra persona y explicar de dónde eres.
          Esta unidad reúne las expresiones y estructuras esenciales para iniciar conversaciones sencillas en inglés.
        </p>
      </header>

      <article className="space-y-8 text-base leading-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">1. Saludos y despedidas en inglés</h2>
          <p className="mt-3">
            Los saludos son una de las primeras cosas que necesitas aprender cuando estudias inglés. La expresión
            <strong> Hello</strong> significa «hola» y se puede utilizar en muchas situaciones. <strong>Hi</strong>
            también significa «hola», aunque suele tener un tono más informal. En inglés existen saludos relacionados
            con el momento del día: <strong>Good morning</strong> (buenos días), <strong>Good afternoon</strong>
            (buenas tardes) y <strong>Good evening</strong> (buenas tardes o noches al saludar por la tarde-noche).
            <strong> Good night</strong> se utiliza normalmente al despedirse o antes de dormir.
          </p>
          <p className="mt-3">
            Para despedirte puedes decir <strong>Goodbye</strong>, <strong>Bye</strong> o <strong>See you later</strong>
            («hasta luego»). También es habitual utilizar <strong>See you tomorrow</strong> («hasta mañana»).
            Una conversación puede empezar así: <em>“Hello! How are you?”</em> — «¡Hola! ¿Cómo estás?».
            Algunas respuestas habituales son <em>“I'm fine, thanks”</em> («estoy bien, gracias») y
            <em> “Very well”</em> («muy bien»).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">2. Cómo presentarse y preguntar el nombre</h2>
          <p className="mt-3">
            Para decir tu nombre puedes utilizar <strong>My name is Laura</strong> («me llamo Laura») o la forma
            más breve <strong>I'm Laura</strong> («soy Laura»). Si quieres preguntar el nombre de otra persona,
            utiliza <strong>What's your name?</strong> («¿cómo te llamas?»). La contracción <em>What's</em>
            equivale a <em>What is</em>. Para presentar a alguien puedes decir <strong>This is my friend</strong>
            («este es mi amigo» o «esta es mi amiga»).
          </p>
          <p className="mt-3">
            Cuando conoces a alguien, una fórmula educada es <strong>Nice to meet you</strong> («encantado/a de
            conocerte»). Por ejemplo: <em>“Hi! What's your name?”</em> — <em>“My name is Daniel. Nice to meet you.”</em>
            — <em>“Nice to meet you too.”</em>. Practicar el diálogo completo ayuda a recordar las expresiones
            dentro de una situación real y no como palabras aisladas.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">3. El verbo to be: am y are</h2>
          <p className="mt-3">
            El verbo <strong>to be</strong> significa «ser» o «estar». En esta unidad trabajarás especialmente
            <strong> am</strong> y <strong>are</strong>, que sirven para hablar de ti y dirigirte a otra persona.
            Las formas principales son <strong>I am</strong> (yo soy/estoy), <strong>You are</strong> (tú eres/estás),
            <strong>We are</strong> (nosotros somos/estamos) y <strong>They are</strong> (ellos son/están).
          </p>
          <p className="mt-3">
            En inglés se utilizan mucho las contracciones: <strong>I'm</strong> = I am, <strong>You're</strong> = You are,
            <strong> We're</strong> = We are y <strong>They're</strong> = They are. Por ejemplo, <em>“I'm a student”</em>
            significa «soy estudiante» y <em>“You are my friend”</em> significa «tú eres mi amigo». Para negar,
            añadimos <strong>not</strong>: <em>“I'm not tired”</em> («no estoy cansado»).
          </p>
          <p className="mt-3">
            En las preguntas, el verbo se coloca delante del sujeto: <strong>Are you ready?</strong> («¿estás preparado?»).
            Las respuestas cortas son <strong>Yes, I am</strong> («sí») y <strong>No, I'm not</strong> («no»).
            Recuerda que con el pronombre <strong>I</strong> se utiliza siempre <strong>am</strong>, nunca <em>are</em>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">4. Cómo decir de dónde eres</h2>
          <p className="mt-3">
            Para preguntar por la procedencia de alguien se utiliza <strong>Where are you from?</strong>
            («¿de dónde eres?»). Puedes responder con la estructura <strong>I'm from + país</strong>:
            <em> “I'm from Spain”</em> (soy de España), <em>“I'm from Italy”</em> (soy de Italia),
            <em> “I'm from France”</em> (soy de Francia) o <em>“I'm from Brazil”</em> (soy de Brasil).
            La palabra <strong>from</strong> significa «de» cuando indica procedencia.
          </p>
          <p className="mt-3">
            Conviene distinguir el nombre de un país de su nacionalidad: <strong>Spain</strong> es España y
            <strong> Spanish</strong> significa español o española. En esta unidad practicarás especialmente
            los nombres de países y la estructura necesaria para expresar tu origen de forma sencilla.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">5. Los posesivos my y your</h2>
          <p className="mt-3">
            Los posesivos <strong>my</strong> y <strong>your</strong> permiten indicar a quién pertenece algo o
            con quién se relaciona una información. <strong>My</strong> significa «mi» o «mis», mientras que
            <strong> your</strong> significa «tu», «tus», «su» o «sus», según la persona a la que nos dirigimos.
            Algunos ejemplos son <em>“My name is Peter”</em> («mi nombre es Peter»), <em>“What's your name?”</em>
            («¿cómo te llamas?») y <em>“This is my friend”</em> («este es mi amigo»).
          </p>
          <p className="mt-3">
            Recuerda que <strong>my</strong> acompaña a algo relacionado con quien habla y <strong>your</strong>
            se refiere a la persona con quien hablamos. Son palabras muy frecuentes en las presentaciones,
            por lo que aprenderlas junto con frases completas facilita su uso espontáneo.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">6. Qué practicar en esta unidad</h2>
          <p className="mt-3">
            Al terminar esta primera unidad deberías poder saludar y despedirte en situaciones cotidianas,
            decir tu nombre, preguntar el nombre de otra persona, explicar de dónde eres y construir frases
            sencillas con <strong>am</strong>, <strong>are</strong>, <strong>my</strong> y <strong>your</strong>.
            Practica primero cada expresión en voz alta y después combina varias en diálogos breves.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Saludar y despedirse según el momento y la situación.</li>
            <li>Presentarte y preguntar el nombre de otra persona.</li>
            <li>Utilizar am y are en frases, preguntas y respuestas cortas.</li>
            <li>Preguntar y responder por la procedencia.</li>
            <li>Usar my y your para dar información personal.</li>
          </ul>
        </section>
      </article>

      <section className="mt-12 rounded-3xl border border-blue-100 bg-blue-50/70 p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-700">Cuaderno de práctica</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">200 ejercicios de inglés A1</h2>
        <p className="mt-3 leading-7 text-slate-700">
          El cuaderno descargable de esta unidad está pendiente de incorporarse al almacenamiento de archivos.
          Esta página ya contiene la explicación didáctica para lectura e indexación; el enlace de descarga se
          activará cuando el PDF se haya cargado y verificado.
        </p>
      </section>

      <section className="mt-12 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-extrabold text-slate-950">Preguntas frecuentes</h2>
        <div className="mt-5 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-bold text-slate-900">{faq.question}</h3>
              <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 text-sm text-slate-500">
        Explora más recursos gratuitos en <Link href="/blog" className="font-semibold text-blue-700 hover:underline">el blog de Linguafly</Link>.
      </p>
    </main>
  );
}
