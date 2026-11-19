import Link from "next/link";

export const metadata = {
  title: "Inglés A1 · Catálogo temático · Linguafly Academy",
  description: "Catálogo de temas para desarrollar las competencias iniciales de inglés A1."
};

const units = [
  { number: "01", title: "About me", subtitle: "Información personal y relaciones", themes: [
    ["Personal information", "Nombre, edad, nacionalidad, dirección y datos de contacto."],
    ["Greetings and introductions", "Saludar, presentarse, despedirse y presentar a otras personas."],
    ["Family and friends", "Familia, amistades, relaciones y descripciones básicas."],
    ["Countries and nationalities", "Países, nacionalidades e idiomas."]
  ]},
  { number: "02", title: "Everyday life", subtitle: "Rutinas, horarios y tiempo libre", themes: [
    ["Daily routines", "Hábitos diarios, acciones frecuentes y expresiones de rutina."],
    ["Days, dates and times", "Días, meses, fechas, horas y momentos del día."],
    ["Free time and hobbies", "Aficiones, intereses y actividades de tiempo libre."],
    ["Sports and abilities", "Deportes, actividades y habilidades con can y can't."]
  ]},
  { number: "03", title: "Home and surroundings", subtitle: "La vivienda y el entorno cercano", themes: [
    ["My home", "Habitaciones, muebles, objetos y tipos de vivienda."],
    ["There is / There are", "Describir qué hay en una habitación o lugar."],
    ["Places in town", "Edificios, comercios y servicios de la localidad."],
    ["Directions and location", "Preguntar y dar indicaciones; preposiciones de lugar."]
  ]},
  { number: "04", title: "Food and shopping", subtitle: "Comida, compras y dinero", themes: [
    ["Food and drinks", "Alimentos, bebidas, comidas y preferencias."],
    ["At the café and restaurant", "Pedir comida, expresar deseos y comprender un menú."],
    ["Shopping and clothes", "Tiendas, prendas, tallas, colores y compras."],
    ["Prices and quantities", "Precios, números, cantidades y envases habituales."]
  ]},
  { number: "05", title: "People and health", subtitle: "Descripciones y bienestar", themes: [
    ["Physical appearance", "Aspecto físico, colores, tamaños y adjetivos descriptivos."],
    ["Personality and feelings", "Personalidad, emociones y estados de ánimo básicos."],
    ["Body and health", "Partes del cuerpo, molestias frecuentes y bienestar."],
    ["At the doctor", "Explicar cómo te encuentras y comprender instrucciones sencillas."]
  ]},
  { number: "06", title: "Study and work", subtitle: "Aprendizaje y ocupaciones", themes: [
    ["School and classroom", "Material escolar, asignaturas e instrucciones de clase."],
    ["Jobs and workplaces", "Profesiones, lugares de trabajo y tareas habituales."],
    ["My week", "Actividades semanales, horarios y obligaciones sencillas."],
    ["Technology and communication", "Dispositivos, mensajes, teléfono y comunicación cotidiana."]
  ]},
  { number: "07", title: "Going places", subtitle: "Transporte, viajes y experiencias", themes: [
    ["Transport", "Medios de transporte y desplazamientos cotidianos."],
    ["Travel and holidays", "Vacaciones, alojamiento, equipaje y actividades de viaje."],
    ["At the station and airport", "Billetes, horarios, lugares y preguntas frecuentes."],
    ["Weather and seasons", "Tiempo atmosférico, estaciones y planes sencillos."]
  ]},
  { number: "08", title: "The world around us", subtitle: "Entorno, cultura y comunicación", themes: [
    ["Animals and nature", "Animales, plantas, paisajes y entorno natural."],
    ["Celebrations and special days", "Cumpleaños, fiestas, invitaciones y felicitaciones."],
    ["Making plans", "Proponer actividades, aceptar, rechazar y quedar."],
    ["A1 everyday communication", "Preguntas frecuentes, respuestas breves y situaciones cotidianas."]
  ]}
];

export default function A1Page() {
  return <main className="mx-auto min-h-[70vh] max-w-6xl px-5 py-10">
    <Link href="/academia" className="text-sm font-semibold text-blue-700">← Linguafly Academy</Link>
    <section className="mt-6 rounded-3xl bg-gradient-to-br from-blue-950 via-indigo-900 to-violet-800 px-7 py-10 text-white sm:px-12">
      <p className="text-sm font-extrabold uppercase tracking-[.2em] text-cyan-300">Linguafly Academy · Elementary</p>
      <h1 className="mt-3 text-4xl font-black sm:text-5xl">Curso de inglés A1</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-100">Catálogo temático para avanzar desde las primeras frases hasta desenvolverte en intercambios cotidianos muy sencillos. Los temas están organizados en ocho bloques progresivos.</p>
      <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold">
        <span className="rounded-full bg-white/15 px-4 py-2">8 bloques</span>
        <span className="rounded-full bg-white/15 px-4 py-2">32 temas</span>
        <span className="rounded-full bg-white/15 px-4 py-2">Nivel MCER A1</span>
      </div>
    </section>
    <div className="mt-8 flex items-center justify-between gap-4">
      <div><h2 className="text-2xl font-black text-slate-950">Temario A1</h2><p className="mt-1 text-sm text-slate-600">Vocabulario y funciones comunicativas de nivel inicial.</p></div>
      <span className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-bold text-blue-800">32 temas</span>
    </div>
    <div className="mt-6 space-y-6">
      {units.map((unit) => <section key={unit.number} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50 px-6 py-5 sm:px-8">
          <p className="text-xs font-black tracking-[.18em] text-blue-700">BLOQUE {unit.number}</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">{unit.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{unit.subtitle}</p>
        </div>
        <ol className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7">
          {unit.themes.map((theme, index) => <li key={theme[0]} className="rounded-2xl border border-slate-100 bg-white p-4">
            <p className="text-xs font-extrabold uppercase tracking-wider text-violet-700">Tema {unit.number}.{index + 1}</p>
            <h4 className="mt-2 text-lg font-bold text-slate-900">{theme[0]}</h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">{theme[1]}</p>
          </li>)}
        </ol>
      </section>)}
    </div>
    <section className="mt-8 rounded-2xl bg-amber-50 p-5 text-sm leading-6 text-amber-950">
      <strong>Nota:</strong> este apartado es el catálogo temático del curso A1. Los temas organizan el recorrido didáctico; las actividades y misiones interactivas se incorporarán progresivamente.
    </section>
  </main>;
}
