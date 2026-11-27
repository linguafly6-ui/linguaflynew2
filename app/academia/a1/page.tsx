import Link from "next/link";

export const metadata = {
  title: "Inglés A1 · 100 misiones · Linguafly Academy",
  description: "Curso de inglés A1 con 100 misiones organizadas en 10 bloques temáticos."
};

const blocks = [
  [
    "A1.1",
    "001–010 · Identidad y presentaciones",
    "Intercambia información personal y aprende a presentarte."
  ],
  [
    "A1.2",
    "011–020 · Familia y relaciones",
    "Describe personas cercanas y habla de tus relaciones."
  ],
  [
    "A1.3",
    "021–030 · Hogar y entorno",
    "Describe tu casa y los lugares que te rodean."
  ],
  [
    "A1.4",
    "031–040 · Rutinas y tiempo",
    "Habla de actividades diarias, horarios y hábitos."
  ],
  [
    "A1.5",
    "041–050 · Comida y restaurantes",
    "Pide comida y participa en conversaciones sencillas."
  ],
  [
    "A1.6",
    "051–060 · Compras, ropa y dinero",
    "Pregunta por prendas, productos, precios y cantidades."
  ],
  [
    "A1.7",
    "061–070 · Tiempo libre y habilidades",
    "Habla de aficiones, deportes y actividades."
  ],
  [
    "A1.8",
    "071–080 · Estudios, trabajo y comunicación",
    "Describe estudios, ocupaciones y mensajes cotidianos."
  ],
  [
    "A1.9",
    "081–090 · Ciudad y viajes",
    "Pide indicaciones y resuelve situaciones de viaje."
  ],
  [
    "A1.10",
    "091–100 · Salud y vida cotidiana",
    "Practica intercambios cotidianos e integra lo aprendido."
  ]
] as const;

const missions = [
  {
    "id": "001",
    "title": "Who Am I?",
    "description": "Datos personales"
  },
  {
    "id": "002",
    "title": "Nice to Meet You",
    "description": "Saludos y presentaciones"
  },
  {
    "id": "003",
    "title": "Where Are You From?",
    "description": "Países y nacionalidades"
  },
  {
    "id": "004",
    "title": "Spelling My Name",
    "description": "Alfabeto y deletreo"
  },
  {
    "id": "005",
    "title": "Personal Questions",
    "description": "Preguntas personales"
  },
  {
    "id": "006",
    "title": "Numbers and Contact Details",
    "description": "Números y contacto"
  },
  {
    "id": "007",
    "title": "Languages I Speak",
    "description": "Idiomas y habilidades"
  },
  {
    "id": "008",
    "title": "My Profile",
    "description": "Perfil personal"
  },
  {
    "id": "009",
    "title": "People in My Class",
    "description": "Personas de la clase"
  },
  {
    "id": "010",
    "title": "First Conversation",
    "description": "Conversación integrada"
  },
  {
    "id": "011",
    "title": "Family and Friends",
    "description": "Familia y amistades"
  },
  {
    "id": "012",
    "title": "Daily Routines",
    "description": "Rutinas diarias"
  },
  {
    "id": "013",
    "title": "Days, Dates and Times",
    "description": "Días, fechas y horas"
  },
  {
    "id": "014",
    "title": "Free Time and Hobbies",
    "description": "Tiempo libre y aficiones"
  },
  {
    "id": "015",
    "title": "Sports and Abilities",
    "description": "Deportes y habilidades"
  },
  {
    "id": "016",
    "title": "My Home",
    "description": "La vivienda"
  },
  {
    "id": "017",
    "title": "There Is and There Are",
    "description": "Describir lo que hay"
  },
  {
    "id": "018",
    "title": "Places in Town",
    "description": "Lugares de la ciudad"
  },
  {
    "id": "019",
    "title": "Directions and Location",
    "description": "Direcciones y ubicación"
  },
  {
    "id": "020",
    "title": "Food and Drinks",
    "description": "Comida y bebidas"
  },
  {
    "id": "021",
    "title": "At the Café and Restaurant",
    "description": "En la cafetería y restaurante"
  },
  {
    "id": "022",
    "title": "Shopping and Clothes",
    "description": "Compras y ropa"
  },
  {
    "id": "023",
    "title": "Prices and Quantities",
    "description": "Precios y cantidades"
  },
  {
    "id": "024",
    "title": "Physical Appearance",
    "description": "Aspecto físico"
  },
  {
    "id": "025",
    "title": "Personality and Feelings",
    "description": "Personalidad y emociones"
  },
  {
    "id": "026",
    "title": "Body and Health",
    "description": "Cuerpo y salud"
  },
  {
    "id": "027",
    "title": "At the Doctor",
    "description": "En el médico"
  },
  {
    "id": "028",
    "title": "School and Classroom",
    "description": "Escuela y aula"
  },
  {
    "id": "029",
    "title": "Jobs and Workplaces",
    "description": "Profesiones y lugares de trabajo"
  },
  {
    "id": "030",
    "title": "My Week",
    "description": "Mi semana"
  },
  {
    "id": "031",
    "title": "A Typical Day",
    "description": "Rutina diaria"
  },
  {
    "id": "032",
    "title": "Morning and Evening",
    "description": "Momentos del día"
  },
  {
    "id": "033",
    "title": "Telling the Time",
    "description": "La hora"
  },
  {
    "id": "034",
    "title": "Days and Months",
    "description": "Días, meses y fechas"
  },
  {
    "id": "035",
    "title": "How Often?",
    "description": "Frecuencia"
  },
  {
    "id": "036",
    "title": "Do You Get Up Early?",
    "description": "Preguntas en presente simple"
  },
  {
    "id": "037",
    "title": "My Week",
    "description": "Rutina semanal"
  },
  {
    "id": "038",
    "title": "At the Weekend",
    "description": "Fin de semana"
  },
  {
    "id": "039",
    "title": "School and Work Schedules",
    "description": "Horarios de estudio y trabajo"
  },
  {
    "id": "040",
    "title": "My Daily Routine",
    "description": "Rutina integrada"
  },
  {
    "id": "041",
    "title": "Food and Drinks",
    "description": "Alimentos y bebidas"
  },
  {
    "id": "042",
    "title": "Fruit, Vegetables and Snacks",
    "description": "Frutas, verduras y tentempiés"
  },
  {
    "id": "043",
    "title": "Meals and Mealtimes",
    "description": "Comidas y horarios"
  },
  {
    "id": "044",
    "title": "At the Café",
    "description": "Pedir en una cafetería"
  },
  {
    "id": "045",
    "title": "At the Restaurant",
    "description": "En el restaurante"
  },
  {
    "id": "046",
    "title": "Menus and Prices",
    "description": "Menús y precios"
  },
  {
    "id": "047",
    "title": "Ordering Food and Drinks",
    "description": "Pedir comida y bebida"
  },
  {
    "id": "048",
    "title": "Likes, Dislikes and Preferences",
    "description": "Gustos y preferencias"
  },
  {
    "id": "049",
    "title": "A Restaurant Conversation",
    "description": "Conversación en un restaurante"
  },
  {
    "id": "050",
    "title": "Food and Ordering",
    "description": "Repaso: comida y pedidos"
  },
  {
    "id": "051",
    "title": "Clothes and Colours",
    "description": "Prendas y colores"
  },
  {
    "id": "052",
    "title": "What Are You Wearing?",
    "description": "Ropa y presente continuo"
  },
  {
    "id": "053",
    "title": "At the Clothes Shop",
    "description": "Comprar ropa"
  },
  {
    "id": "054",
    "title": "How Much Are These Shoes?",
    "description": "Demostrativos y precios"
  },
  {
    "id": "055",
    "title": "Money and Numbers",
    "description": "Números y monedas"
  },
  {
    "id": "056",
    "title": "Shopping Questions",
    "description": "Preguntas en tiendas"
  },
  {
    "id": "057",
    "title": "Everyday Objects",
    "description": "Objetos personales"
  },
  {
    "id": "058",
    "title": "My Favourite Outfit",
    "description": "Describir conjuntos"
  },
  {
    "id": "059",
    "title": "At the Market",
    "description": "Puestos y cantidades"
  },
  {
    "id": "060",
    "title": "Shopping Mission",
    "description": "Compra integrada"
  },
  {
    "id": "061",
    "title": "Free Time Activities",
    "description": "Aficiones y tiempo libre"
  },
  {
    "id": "062",
    "title": "Sports I Play",
    "description": "Deportes"
  },
  {
    "id": "063",
    "title": "Can You Swim?",
    "description": "Habilidades con can / can't"
  },
  {
    "id": "064",
    "title": "Making Invitations",
    "description": "Invitaciones"
  },
  {
    "id": "065",
    "title": "What Are You Doing?",
    "description": "Presente continuo"
  },
  {
    "id": "066",
    "title": "At the Sports Centre",
    "description": "Lugares y actividades deportivas"
  },
  {
    "id": "067",
    "title": "My Favourite Hobby",
    "description": "Expresar preferencias"
  },
  {
    "id": "068",
    "title": "Plans for Saturday",
    "description": "Planes próximos sencillos"
  },
  {
    "id": "069",
    "title": "Agreeing and Disagreeing",
    "description": "Aceptar y rechazar propuestas"
  },
  {
    "id": "070",
    "title": "Free Time Conversation",
    "description": "Conversación integrada"
  },
  {
    "id": "071",
    "title": "School Subjects",
    "description": "Asignaturas y material"
  },
  {
    "id": "072",
    "title": "Classroom English",
    "description": "Instrucciones de aula"
  },
  {
    "id": "073",
    "title": "Jobs and Workplaces",
    "description": "Profesiones y lugares de trabajo"
  },
  {
    "id": "074",
    "title": "What Do You Do?",
    "description": "Preguntas sobre ocupación"
  },
  {
    "id": "075",
    "title": "A Working Day",
    "description": "Tareas y rutinas laborales"
  },
  {
    "id": "076",
    "title": "Technology Around Us",
    "description": "Dispositivos y tecnología"
  },
  {
    "id": "077",
    "title": "Messages and Emails",
    "description": "Comunicación escrita básica"
  },
  {
    "id": "078",
    "title": "Phone Conversations",
    "description": "Conversación telefónica"
  },
  {
    "id": "079",
    "title": "Rules at School and Work",
    "description": "Normas y obligación básica"
  },
  {
    "id": "080",
    "title": "Study and Work Profile",
    "description": "Perfil de estudio y trabajo"
  },
  {
    "id": "081",
    "title": "Getting Around Town",
    "description": "Transporte urbano"
  },
  {
    "id": "082",
    "title": "Where Is the Station?",
    "description": "Preguntar por lugares"
  },
  {
    "id": "083",
    "title": "Travel Plans",
    "description": "Planes de viaje"
  },
  {
    "id": "084",
    "title": "At the Train Station",
    "description": "Estación y billetes"
  },
  {
    "id": "085",
    "title": "At the Airport",
    "description": "Aeropuerto"
  },
  {
    "id": "086",
    "title": "Staying at a Hotel",
    "description": "Alojamiento"
  },
  {
    "id": "087",
    "title": "Travel Questions",
    "description": "Preguntas de viaje"
  },
  {
    "id": "088",
    "title": "Weather and Seasons",
    "description": "Tiempo y estaciones"
  },
  {
    "id": "089",
    "title": "Holiday Activities",
    "description": "Actividades de vacaciones"
  },
  {
    "id": "090",
    "title": "Travel Conversation",
    "description": "Viaje integrado"
  },
  {
    "id": "091",
    "title": "At the Doctor",
    "description": "Salud y síntomas"
  },
  {
    "id": "092",
    "title": "Parts of the Body",
    "description": "Cuerpo y salud"
  },
  {
    "id": "093",
    "title": "Healthy Habits",
    "description": "Hábitos saludables"
  },
  {
    "id": "094",
    "title": "Weather Plans",
    "description": "Tiempo y actividades"
  },
  {
    "id": "095",
    "title": "Celebrations",
    "description": "Celebraciones y cumpleaños"
  },
  {
    "id": "096",
    "title": "Making Arrangements",
    "description": "Quedar y organizarse"
  },
  {
    "id": "097",
    "title": "Past Events: A First Look",
    "description": "Pasado inicial frecuente"
  },
  {
    "id": "098",
    "title": "A Short Story",
    "description": "Secuencia de acontecimientos"
  },
  {
    "id": "099",
    "title": "Reading and Listening Challenge",
    "description": "Comprensión integrada"
  },
  {
    "id": "100",
    "title": "My A1 Project",
    "description": "Proyecto final integrado"
  }
] as const;

export default function A1Page() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/academia" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-indigo-800">
        <span aria-hidden="true">←</span> Linguafly Academy
      </Link>

      <header className="relative mt-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-800 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-200">Linguafly Academy · Elementary</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Curso de inglés A1</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
            Avanza desde tus primeras frases hasta desenvolverte en situaciones cotidianas. El curso reúne las 100 misiones en una ruta clara y organizada.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">100 misiones</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">10 bloques temáticos</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">Nivel MCER A1</span>
          </div>
        </div>
      </header>

      <section className="mt-9">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-indigo-700">Tu recorrido</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">Explora las misiones A1</h2>
            <p className="mt-2 text-sm text-slate-600">Selecciona cualquier misión para abrir su contenido.</p>
          </div>
          <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-800">001–100</span>
        </div>

        <div className="mt-6 space-y-6">
          {blocks.map((block, blockIndex) => {
            const start = blockIndex * 10;
            const blockMissions = missions.slice(start, start + 10);
            return (
              <section key={block[0]} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/80 px-5 py-5 sm:px-6">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[.18em] text-indigo-700">{block[0]}</p>
                    <h3 className="mt-1 text-lg font-extrabold text-slate-950 sm:text-xl">{block[1]}</h3>
                    <p className="mt-1 text-sm text-slate-600">{block[2]}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 ring-1 ring-slate-200">10 misiones</span>
                </div>
                <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
                  {blockMissions.map((mission) => (
                    <Link
                      key={mission.id}
                      href={`/academia/a1/${mission.id}`}
                      className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] font-extrabold tracking-[.16em] text-indigo-700">MISIÓN {mission.id}</span>
                        <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600" aria-hidden="true">→</span>
                      </div>
                      <h4 className="mt-2 font-bold text-slate-950">{mission.title}</h4>
                      <p className="mt-1 text-sm leading-5 text-slate-600">{mission.description}</p>
                      <span className="mt-4 inline-flex text-xs font-bold text-indigo-700">Abrir misión</span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
