import Link from "next/link";

export const metadata = {
  title: "Inglés A2 · Catálogo de misiones · Linguafly Academy",
  description: "Catálogo de las misiones A2 disponibles de Linguafly Academy."
};

const missions = [
  ["001", "Describing People and Appearance", "Describir el aspecto físico"],
  ["002", "Personality and Qualities", "Personalidad y cualidades"],
  ["003", "Family and Relationships", "Familia y relaciones"],
  ["004", "Friends and Free-time Activities", "Amistades y actividades de tiempo libre"],
  ["005", "Meeting People and Personal Profiles", "Conocer personas y perfiles personales"],
  ["006", "Daily Routines and Time", "Rutinas diarias y la hora"],
  ["007", "Home and Household Chores", "La casa y las tareas domésticas"],
  ["008", "Food, Meals and Eating Out", "Comida, comidas y restaurantes"],
  ["009", "Shopping, Clothes and Prices", "Compras, ropa y precios"],
  ["010", "Places in Town and Giving Directions", "Lugares de la ciudad e indicaciones"],
  ["011", "Weather and the Seasons", "El tiempo y las estaciones"],
  ["012", "Travel and Transport", "Viajes y transporte"],
  ["013", "Holidays and Accommodation", "Vacaciones y alojamiento"],
  ["014", "Holiday Activities and Sightseeing", "Actividades de vacaciones y turismo"],
  ["015", "Nature, Landscapes and Outdoor Activities", "Naturaleza, paisajes y actividades al aire libre"],
  ["016", "Sport, Exercise and Healthy Habits", "Deporte, ejercicio y hábitos saludables"],
  ["017", "At the Doctor's", "En la consulta médica"],
  ["018", "At the Sports Centre: Facilities and Membership", "En el centro deportivo: instalaciones y membresía"],
  ["019", "Everyday Technology and Communication", "Tecnología cotidiana y comunicación"],
  ["020", "Work, Jobs and Workplace Communication", "Trabajo, empleos y comunicación laboral"],
  ["021", "Education, Courses and Learning Skills", "Educación, cursos y técnicas de aprendizaje"],
  ["022", "Celebrations, Invitations and Special Occasions", "Celebraciones, invitaciones y ocasiones especiales"]
] as const;

const units = [
  { title: "People, relationships and everyday life", range: "001–005", description: "Personas, relaciones, perfiles y tiempo libre", from: 0, to: 5 },
  { title: "Daily life and the local area", range: "006–010", description: "Rutinas, hogar, comida, compras y ciudad", from: 5, to: 10 },
  { title: "Weather, travel and the world around us", range: "011–017", description: "Clima, viajes, vacaciones, naturaleza, deporte y salud", from: 10, to: 17 },
  { title: "Facilities, technology and communication", range: "018–020", description: "Servicios, tecnología y comunicación en el trabajo", from: 17, to: 20 },
  { title: "Learning and special occasions", range: "021–030", description: "Educación, celebraciones y otros contextos A2", from: 20, to: 22 }
];

export default function A2Page() {
  return <main className="mx-auto min-h-screen max-w-6xl px-5 py-10">
    <Link href="/academia" className="text-sm font-semibold text-blue-700">← Academia</Link>
    <header className="mt-6 rounded-3xl bg-gradient-to-r from-indigo-700 to-sky-600 p-8 text-white">
      <p className="text-xs font-black uppercase tracking-widest">LINGUAFLY QUEST · A2</p>
      <h1 className="mt-2 text-4xl font-black">Inglés A2 · Misiones</h1>
      <p className="mt-3 max-w-3xl text-indigo-50">Recorrido A2 organizado en diez unidades y cien misiones. Aquí aparecen las misiones publicadas y accesibles en esta versión.</p>
      <p className="mt-5 text-sm font-bold text-white">22 de 100 misiones disponibles</p>
    </header>
    <div className="mt-8 space-y-7">
      {units.map((unit, index) => <section key={unit.range} className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6">
        <p className="text-xs font-black uppercase tracking-widest text-indigo-700">Unidad {index + 1} · Misiones {unit.range}</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950">{unit.title}</h2>
        <p className="mt-2 text-sm text-slate-600">{unit.description}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {missions.slice(unit.from, unit.to).map(([id, title, subtitle]) => <Link key={id} href={`/academia/a2/${id}`} className="rounded-2xl border border-indigo-100 bg-white p-4 transition hover:border-indigo-400 hover:shadow-sm">
            <p className="text-xs font-extrabold tracking-widest text-indigo-700">MISIÓN {id}</p>
            <h3 className="mt-1 font-bold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
            <span className="mt-3 inline-block text-sm font-bold text-indigo-700">Empezar misión →</span>
          </Link>)}
          {index === 4 && <div className="rounded-2xl border border-dashed border-indigo-300 bg-indigo-100/60 p-4">
            <p className="text-xs font-extrabold tracking-widest text-indigo-700">MISIÓN 023–030</p>
            <h3 className="mt-1 font-bold text-slate-800">En preparación</h3>
            <p className="mt-1 text-sm text-slate-600">Las siguientes misiones aparecerán aquí a medida que se publiquen.</p>
          </div>}
        </div>
      </section>)}
    </div>
  </main>;
}
