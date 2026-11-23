"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import missionSource from "@/content/canonical-missions/a1/001.json";
import britishIpa from "@/content/dictionaries/en-GB-ipa.json";

type DictationSegment = { segmentId: string; text: string };
type Item = { itemId: string; english?: string; spanish?: string; prompt?: string; translation?: string; optionTranslations?: string[]; answerTranslation?: string; answer?: string; options?: string[]; word?: string; pronunciationGuide?: string; expectedAnswer?: string; kind?: string; audioLocale?: string; audio?: string; repeatCount?: number; segments?: DictationSegment[]; modelAnswer?: string; focus?: string; expectedWordId?: string; gapToken?: string; position: number };
type LessonEntry = { english: string; spanish: string; note?: string; prompt?: string; promptSpanish?: string; pronunciationGuide?: string };
type Lesson = { phrases: LessonEntry[]; grammar: LessonEntry[]; reading: LessonEntry[]; writing: LessonEntry[]; speaking: LessonEntry[]; listening: LessonEntry[]; examples?: LessonEntry[]; communication?: LessonEntry[] };
type Section = { sectionId: string; sectionKey: string; position: number; title?: string; exercise: { exerciseId: string; type: string; items: Item[]; lesson?: Lesson; theory?: { title: string; explanation: string; tip: string; patterns: ({ label?: string; pattern: string; translation?: string; examples?: string[]; exampleTranslations?: string[] } | string)[] }; content?: { passageId?: string; passage?: string; audio?: string; audioTranscript?: string; transcriptTemplate?: string; wordBank?: { wordId: string; word: string }[]; translation?: string; blocks?: { position?: number; title?: string; content?: string; example?: string; translation?: string }[] } } };
export type Mission = { course: { level: string }; unit: { title: string }; mission: { title: string; position?: number }; sections: Section[] };
function visualForVocabulary(english: string, spanish: string) {
  const source = `${english} ${spanish}`.toLowerCase();
  const groups: [string[], string][] = [
    [["trabajo","empleo","profesión","oficina","empresa","jefe","reunión","salario","carrera","entrevista","cliente","equipo"],"💼"],
    [["viaje","viajar","turismo","viajero","aeropuerto","vuelo","tren","autobús","hotel","equipaje","billete","destino","mapa","carretera"],"🧳"],
    [["familia","madre","padre","hermano","hermana","abuelo","abuela","hijo","hija","pariente"],"👨‍👩‍👧"],
    [["amigo","amistad","relación","pareja","vecino","compañero","comunidad"],"🫂"],
    [["salud","médico","doctor","hospital","dolor","enfermo","síntoma","medicina","descanso","sueño","estrés","bienestar","ejercicio"],"🩺"],
    [["comida","alimento","desayuno","almuerzo","cena","fruta","verdura","bebida","cocinar","restaurante"],"🍎"],
    [["estudio","aprender","enseñar","curso","clase","escuela","universidad","examen","conocimiento","habilidad","idioma","gramática"],"📚"],
    [["cultura","tradición","costumbre","festival","museo","arte","música","película","teatro","libro","historia"],"🎭"],
    [["dinero","precio","coste","gasto","ahorro","pagar","compra","vender","presupuesto","descuento","factura"],"💳"],
    [["tecnología","internet","digital","ordenador","móvil","teléfono","aplicación","pantalla","red","mensaje","correo"],"📱"],
    [["medioambiente","ambiente","naturaleza","clima","energía","reciclaje","residuo","contaminación","planeta","bosque","agua"],"🌍"],
    [["tiempo","fecha","hora","mañana","tarde","noche","semana","mes","año","momento","plazo"],"🕒"],
    [["problema","solución","decisión","opción","elección","resultado","objetivo","meta","progreso","mejora","reto","desafío"],"🧩"],
    [["emoción","sentimiento","feliz","triste","miedo","confianza","orgullo","sorpresa","preocupación","esperanza"],"💬"],
    [["ley","norma","regla","derecho","deber","permiso","seguridad","responsabilidad"],"⚖️"],
    [["comunicación","conversación","hablar","escuchar","pregunta","respuesta","opinión","argumento","debate"],"🗣️"],
    [["edificio","casa","vivienda","habitación","cocina","jardín","ciudad","pueblo","barrio"],"🏙️"],
    [["deporte","correr","caminar","nadar","jugar","partido"],"🏃"],
    [["ropa","vestir","zapato","camisa","abrigo","uniforme"],"👕"]
  ];
  for (const [words, emoji] of groups) if (words.some(word => source.includes(word))) return emoji;
  return "💡";
}

const C1_PRACTICE_WORD_TRANSLATIONS: Record<string, string> = {
  "a": "un / una",
  "an": "un / una",
  "the": "el / la / los / las",
  "of": "de",
  "in": "en",
  "on": "en / sobre",
  "at": "en / a",
  "to": "a / para",
  "for": "para / por",
  "from": "de / desde",
  "with": "con",
  "without": "sin",
  "after": "después de",
  "before": "antes de",
  "through": "a través de / mediante",
  "as": "como",
  "by": "por / mediante",
  "into": "dentro de / en",
  "out": "fuera",
  "over": "sobre / por encima de",
  "under": "debajo de",
  "between": "entre",
  "about": "sobre / acerca de",
  "against": "contra",
  "despite": "a pesar de",
  "within": "dentro de",
  "during": "durante",
  "until": "hasta",
  "yet": "sin embargo / aún",
  "while": "mientras",
  "although": "aunque",
  "because": "porque",
  "if": "si",
  "than": "que",
  "then": "entonces",
  "so": "así que / tan",
  "and": "y",
  "or": "o",
  "but": "pero",
  "nor": "ni",
  "both": "ambos / ambas",
  "all": "todo / todos",
  "every": "cada",
  "each": "cada uno",
  "no": "no / ningún",
  "not": "no",
  "only": "solo / solamente",
  "most": "la mayoría / más",
  "more": "más",
  "less": "menos",
  "very": "muy",
  "too": "demasiado / también",
  "much": "mucho",
  "many": "muchos",
  "some": "algunos",
  "any": "cualquier / ningún",
  "one": "uno",
  "another": "otro",
  "other": "otro / otros",
  "same": "mismo",
  "different": "diferente",
  "what": "qué / lo que",
  "which": "cuál / qué",
  "who": "quién",
  "where": "dónde",
  "when": "cuándo",
  "why": "por qué",
  "how": "cómo",
  "whose": "de quién",
  "does": "hace / auxiliar verbal",
  "do": "hacer / auxiliar verbal",
  "did": "hizo / auxiliar verbal",
  "is": "es / está",
  "are": "son / están",
  "was": "era / estaba / fue",
  "were": "eran / estaban / fueron",
  "be": "ser / estar",
  "been": "sido / estado",
  "being": "siendo / estando",
  "has": "ha / tiene",
  "have": "haber / tener",
  "had": "había / tuvo",
  "can": "poder",
  "could": "podría / podía",
  "may": "puede que / podría",
  "might": "podría",
  "must": "deber",
  "should": "debería",
  "would": "haría / auxiliar condicional",
  "will": "hará / auxiliar de futuro",
  "shall": "deberá / auxiliar de futuro",
  "it": "ello / lo",
  "its": "su / sus",
  "they": "ellos / ellas",
  "them": "los / las / ellos",
  "their": "su / sus",
  "theirs": "suyo / suya",
  "we": "nosotros / nosotras",
  "us": "nos / nosotros",
  "our": "nuestro / nuestra",
  "you": "tú / usted / vosotros",
  "your": "tu / su / vuestro",
  "he": "él",
  "him": "lo / le / él",
  "his": "su / suyo",
  "she": "ella",
  "her": "la / le / su",
  "i": "yo",
  "me": "me / mí",
  "my": "mi",
  "mine": "mío / mía",
  "this": "este / esta / esto",
  "that": "ese / esa / que",
  "these": "estos / estas",
  "those": "esos / esas",
  "there": "allí / hay",
  "here": "aquí",
  "someone": "alguien",
  "something": "algo",
  "everyone": "todo el mundo",
  "everything": "todo",
  "nothing": "nada",
  "choose": "elegir",
  "closest": "más cercano / más parecido",
  "meaning": "significado",
  "complete": "completar",
  "collocation": "colocación léxica",
  "deeply": "profundamente",
  "belief": "creencia",
  "retrieved": "recuperado",
  "ingrained": "arraigado",
  "anticipated": "previsto / anticipado",
  "look": "mirar",
  "back": "atrás",
  "experience": "experiencia",
  "avoid": "evitar",
  "remember": "recordar",
  "predict": "predecir",
  "blessing": "bendición",
  "disguise": "disfraz",
  "unexpected": "inesperado",
  "obligation": "obligación",
  "fortunate": "afortunado",
  "coincidence": "coincidencia",
  "downside": "inconveniente",
  "apparently": "aparentemente",
  "bad": "malo",
  "good": "bueno",
  "result": "resultado",
  "appropriately": "adecuadamente",
  "hedged": "matizado / expresado con cautela",
  "claim": "afirmación",
  "event": "acontecimiento",
  "definitely": "definitivamente",
  "created": "creó",
  "identity": "identidad",
  "influenced": "influyó",
  "outlook": "perspectiva",
  "proves": "demuestra",
  "always": "siempre",
  "accurate": "preciso",
  "reformulate": "reformular",
  "don't": "no / no lo",
  "detail": "detalle",
  "precisely": "con precisión",
  "vividly": "vívidamente",
  "recollection": "recuerdo",
  "incomplete": "incompleto",
  "contrast": "contraste",
  "recall": "recordar / recuerdo",
  "recollect": "rememorar",
  "often": "a menudo",
  "deliberate": "deliberado",
  "formal": "formal",
  "forget": "olvidar",
  "opposite": "opuesto",
  "linker": "conector",
  "move": "mudanza / movimiento",
  "failure": "fracaso",
  "now": "ahora",
  "see": "ver",
  "benefits": "beneficios",
  "consequently": "por consiguiente",
  "addition": "adición",
  "far": "lejos",
  "meeting": "reunión",
  "took": "tuvo / tomó",
  "place": "lugar",
  "early": "a principios de / temprano",
  "june": "junio",
  "statement": "afirmación",
  "reflects": "refleja",
  "reading": "lectura",
  "position": "postura",
  "exact": "exacto",
  "recording": "registro / grabación",
  "personal": "personal",
  "memories": "recuerdos",
  "inventions": "invenciones",
  "source": "fuente",
  "monitoring": "supervisión",
  "forgetting": "olvido",
  "entire": "entero",
  "memorising": "memorizar",
  "information": "información",
  "repetition": "repetición",
  "identifying": "identificar",
  "remembered": "recordado",
  "came": "vino / procedió",
  "term": "término",
  "refers": "se refiere",
  "personally": "personalmente",
  "experienced": "experimentado / vivido",
  "semantic": "semántico",
  "working": "de trabajo",
  "episodic": "episódico",
  "retrieval": "recuperación",
  "cue": "indicio / pista",
  "clock": "reloj",
  "trace": "rastro",
  "corroborate": "corroborar",
  "account": "relato",
  "repeat": "repetir",
  "confidently": "con confianza",
  "support": "respaldar / apoyo",
  "additional": "adicional",
  "evidence": "pruebas / evidencia",
  "change": "cambiar",
  "chronology": "cronología",
  "expression": "expresión",
  "signals": "indica / señala",
  "uncertainty": "incertidumbre",
  "conceivable": "concebible",
  "doubt": "duda",
  "universally": "universalmente",
  "established": "establecido",
  "cannot": "no puede",
  "rule": "descartar / regla",
  "possibility": "posibilidad",
  "false": "falso",
  "occur": "ocurrir",
  "difficult": "difícil",
  "stored": "almacenado",
  "process": "proceso",
  "helps": "ayuda",
  "stabilise": "estabilizar",
  "newly": "recientemente",
  "acquired": "adquirido",
  "consolidation": "consolidación",
  "confabulation": "confabulación",
  "interference": "interferencia",
  "paraphrase": "parafrasear",
  "jog": "estimular / refrescar",
  "prompt": "incitar / sugerir",
  "prevent": "impedir",
  "recalling": "recordar",
  "distinction": "distinción",
  "important": "importante",
  "careful": "cuidadoso",
  "report": "informe / relato",
  "confidence": "confianza",
  "versus": "frente a",
  "fluency": "fluidez",
  "direct": "directo",
  "inference": "inferencia",
  "past": "pasado",
  "present": "presente",
  "tense": "tiempo verbal",
  "fragmentary": "fragmentario",
  "suggest": "sugerir",
  "fully": "completamente",
  "description": "descripción",
  "verbatim": "literal",
  "transcript": "transcripción"
};

const C1_PRACTICE_EXTRA_WORD_TRANSLATIONS: Record<string, string> = {
  ability: "capacidad",
  accept: "aceptar",
  act: "actuar",
  argument: "argumento",
  behalf: "nombre / representación",
  bodies: "organismos",
  carry: "llevar",
  case: "caso",
  citizens: "ciudadanos",
  citizenship: "ciudadanía",
  competently: "competentemente",
  concept: "concepto",
  consequences: "consecuencias",
  consistent: "coherente / constante",
  constitution: "constitución",
  cooperation: "cooperación",
  culture: "cultura",
  data: "datos",
  decision: "decisión",
  decisions: "decisiones",
  degree: "grado",
  deserving: "merecedor",
  exercised: "ejercido",
  explain: "explicar",
  framing: "encuadre",
  granted: "concedido",
  greater: "mayor",
  hold: "mantener / sostener",
  holders: "titulares",
  ideology: "ideología",
  impartial: "imparcial",
  including: "incluido",
  institution: "institución",
  institutions: "instituciones",
  interest: "interés",
  known: "conocido",
  laws: "leyes",
  making: "hacer / elaboración",
  names: "nombres",
  networks: "redes",
  office: "cargo / oficina",
  organisation: "organización",
  party: "partido",
  principle: "principio",
  protest: "protesta",
  publicly: "públicamente",
  rather: "más bien",
  regarded: "considerado",
  relationships: "relaciones",
  responsibilities: "responsabilidades",
  review: "revisión",
  rightful: "legítimo",
  scrutiny: "escrutinio",
  situation: "situación",
  society: "sociedad",
  study: "estudio",
  subject: "tema / sujeto",
  substantially: "considerablemente",
  throughout: "a lo largo de",
  together: "juntos",
  writer: "autor / redactor",
  adapt: "adaptarse",
  communicates: "comunica",
  communication: "comunicación",
  concern: "preocupación",
  concise: "conciso",
  coordinating: "coordinar",
  correspondence: "correspondencia",
  damaging: "perjudicial",
  demand: "exigir / demanda",
  disagreement: "desacuerdo",
  disrupt: "alterar",
  else: "más / otro",
  entrusted: "encomendado",
  events: "acontecimientos",
  expectations: "expectativas",
  explicitly: "explícitamente",
  formally: "formalmente",
  given: "dado",
  helping: "ayudar",
  high: "alto",
  institutional: "institucional",
  knowledge: "conocimiento",
  leaders: "líderes",
  leadership: "liderazgo",
  limits: "límites",
  listeners: "oyentes",
  matters: "asuntos / importa",
  meetings: "reuniones",
  message: "mensaje",
  motivates: "motiva",
  need: "necesidad",
  needlessly: "innecesariamente",
  negotiation: "negociación",
  objective: "objetivo",
  parties: "partes",
  performance: "rendimiento",
  person: "persona",
  persuasive: "persuasivo",
  plan: "plan",
  plausible: "verosímil",
  positions: "posturas",
  practical: "práctico",
  precedence: "prioridad",
  preferred: "preferido",
  preparation: "preparación",
  presentations: "presentaciones",
  presents: "presenta",
  professional: "profesional",
  proposals: "propuestas",
  relations: "relaciones",
  responsible: "responsable",
  risks: "riesgos",
  senior: "de alto rango",
  stakes: "lo que está en juego",
  stated: "afirmado",
  structured: "estructurado",
  table: "tabla",
  taking: "tomar",
  use: "usar",
  wording: "redacción",
  abstract: "abstracto",
  academic: "académico",
  across: "a través de",
  apparent: "aparente",
  appropriate: "adecuado",
  architecture: "arquitectura",
  care: "cuidado",
  cases: "casos",
  causation: "causalidad",
  caution: "cautela",
  certainty: "certeza",
  compares: "compara",
  connects: "conecta",
  correlation: "correlación",
  critical: "crítico",
  debate: "debate",
  designed: "diseñado",
  distort: "distorsionar",
  ensure: "garantizar",
  evaluation: "evaluación",
  evidentiality: "evidencialidad",
  examined: "examinado",
  explanation: "explicación",
  expressed: "expresado",
  factor: "factor",
  findings: "hallazgos",
  focused: "centrado",
  hypotheses: "hipótesis",
  investigate: "investigar",
  issue: "cuestión",
  limitations: "limitaciones",
  list: "lista",
  logic: "lógica",
  measured: "medido",
  methodology: "metodología",
  methods: "métodos",
  paper: "artículo / trabajo",
  participants: "participantes",
  precise: "preciso",
  produces: "produce",
  provisional: "provisional",
  published: "publicado",
  qualification: "matización",
  questions: "preguntas",
  reasoned: "razonado",
  reasoning: "razonamiento",
  rebuttal: "refutación",
  relationship: "relación",
  reproducible: "reproducible",
  selected: "seleccionado",
  seminar: "seminario",
  studies: "estudios",
  supported: "respaldado",
  taken: "tomado",
  transparent: "transparente",
  unmeasured: "no medido",
  whether: "si / ya sea que",
  adequate: "adecuado",
  agreement: "acuerdo",
  analysis: "análisis",
  assessment: "evaluación",
  automated: "automatizado",
  bioethics: "bioética",
  capabilities: "capacidades",
  collecting: "recopilar",
  comparative: "comparativo",
  compromised: "comprometido",
  computational: "computacional",
  conditions: "condiciones",
  current: "actual",
  discourse: "discurso",
  entails: "implica",
  ethics: "ética",
  extent: "alcance / medida",
  innovation: "innovación",
  intellectual: "intelectual",
  malfunction: "fallo de funcionamiento",
  meaningful: "significativo",
  meets: "cumple",
  necessary: "necesario",
  operation: "funcionamiento",
  outcomes: "resultados",
  outputs: "resultados generados",
  participation: "participación",
  policy: "política",
  precision: "precisión",
  privacy: "privacidad",
  produce: "producir",
  produced: "producido",
  proposal: "propuesta",
  purpose: "propósito",
  recommendations: "recomendaciones",
  recurring: "recurrente",
  reliably: "de forma fiable",
  retaining: "conservar",
  risk: "riesgo",
  scenario: "escenario",
  specified: "especificado",
  standards: "normas",
  surveillance: "vigilancia",
  system: "sistema",
  systematic: "sistemático",
  technology: "tecnología",
  thought: "pensamiento",
  train: "entrenar",
  understanding: "comprensión",
  understood: "comprendido",
  unfairness: "injusticia",
  unsuitable: "inadecuado",
  used: "utilizado",
  way: "manera",
  adaptation: "adaptación",
  aesthetics: "estética",
  ambiguity: "ambigüedad",
  arrangement: "disposición",
  art: "arte",
  artistic: "artístico",
  based: "basado",
  bias: "sesgo",
  context: "contexto",
  create: "crear",
  criteria: "criterios",
  criticism: "crítica",
  deception: "engaño",
  departs: "se aparta",
  depends: "depende",
  details: "detalles",
  distinctive: "distintivo",
  editing: "edición",
  effect: "efecto",
  elements: "elementos",
  essays: "ensayos",
  examination: "examen",
  film: "película",
  frame: "marco / encuadre",
  gathers: "reúne",
  image: "imagen",
  imagery: "imaginería",
  limited: "limitado",
  literal: "literal",
  literary: "literario",
  merit: "mérito",
  metaphor: "metáfora",
  narrators: "narradores",
  object: "objeto",
  particular: "particular",
  presence: "presencia",
  reader: "lector",
  receives: "recibe",
  recurs: "reaparece",
  reviews: "reseñas / revisiones",
  science: "ciencia",
  significance: "importancia",
  story: "historia / relato",
  structure: "estructura",
  symbolism: "simbolismo",
  text: "texto",
  told: "contado",
  translation: "traducción",
  work: "obra / trabajo",
  affordable: "asequible",
  agreed: "acordado",
  aid: "ayuda",
  assistance: "asistencia",
  availability: "disponibilidad",
  chains: "cadenas",
  coercion: "coacción",
  compelled: "obligado",
  countries: "países",
  country: "país",
  crises: "crisis",
  danger: "peligro",
  delivered: "entregado",
  difference: "diferencia",
  diplomatic: "diplomático",
  driven: "impulsado",
  economic: "económico",
  emission: "emisión",
  essential: "esencial",
  geopolitics: "geopolítica",
  globalisation: "globalización",
  goods: "bienes / mercancías",
  homes: "hogares",
  inequality: "desigualdad",
  international: "internacional",
  involved: "implicado",
  involving: "que implica",
  leave: "dejar",
  location: "ubicación",
  lower: "inferior / reducir",
  measure: "medida / medir",
  migration: "migración",
  moving: "conmovedor / en movimiento",
  network: "red",
  organisations: "organizaciones",
  people: "personas",
  practices: "prácticas",
  progress: "progreso",
  reach: "alcanzar",
  reliable: "fiable",
  reliance: "dependencia",
  reports: "informes",
  resources: "recursos",
  services: "servicios",
  several: "varios",
  shaped: "moldeado",
  shift: "cambio",
  social: "social",
  stages: "etapas",
  strategic: "estratégico",
  supplier: "proveedor",
  sustainable: "sostenible",
  systems: "sistemas",
  towards: "hacia",
  access: "acceso",
  action: "acción",
  acts: "actos / actúa",
  actually: "en realidad",
  approval: "aprobación",
  attitude: "actitud",
  beyond: "más allá de",
  choice: "elección",
  choices: "elecciones",
  cognition: "cognición",
  cognitive: "cognitivo",
  conversation: "conversación",
  conveyed: "transmitido",
  cross: "cruzar / transversal",
  cultural: "cultural",
  disapproval: "desaprobación",
  emotion: "emoción",
  figurative: "figurado",
  filtering: "filtrado",
  flow: "flujo",
  holds: "mantiene",
  idea: "idea",
  implied: "implícito",
  inferred: "inferido",
  input: "entrada",
  interaction: "interacción",
  issues: "cuestiones",
  management: "gestión",
  manipulates: "manipula",
  mapping: "mapeo",
  mental: "mental",
  misunderstanding: "malentendido",
  oral: "oral",
  performing: "realizar / representar",
  perspectives: "perspectivas",
  persuasion: "persuasión",
  politeness: "cortesía",
  pragmatics: "pragmática",
  promising: "prometedor",
  public: "público",
  requesting: "solicitar",
  resolves: "resuelve",
  restores: "restablece",
  selecting: "seleccionar",
  self: "uno mismo",
  speaker: "hablante",
  synthesis: "síntesis",
  temporarily: "temporalmente",
  understand: "entender",
  utterance: "enunciado",
  word: "palabra",
  words: "palabras",
  challenges: "desafíos",
  checking: "comprobación",
  circulated: "difundido",
  circulates: "circula",
  critically: "críticamente",
  deceive: "engañar",
  deliberately: "deliberadamente",
  directly: "directamente",
  earlier: "anterior",
  ecosystems: "ecosistemas",
  editorial: "editorial",
  evaluate: "evaluar",
  fact: "hecho",
  fallacies: "falacias",
  flaw: "defecto",
  history: "historia",
  human: "humano",
  images: "imágenes",
  inaccurate: "inexacto",
  influence: "influencia",
  intending: "con intención de",
  interconnected: "interconectado",
  interpret: "interpretar",
  irony: "ironía",
  language: "idioma / lenguaje",
  messages: "mensajes",
  mislead: "inducir a error",
  multimodal: "multimodal",
  necessarily: "necesariamente",
  origin: "origen",
  piece: "pieza",
  platforms: "plataformas",
  presentation: "presentación",
  propaganda: "propaganda",
  psychology: "psicología",
  receive: "recibir",
  satire: "sátira",
  set: "conjunto / establecer",
  shared: "compartido",
  speech: "discurso",
  technique: "técnica",
  weakens: "debilita",
  achievement: "logro",
  acknowledgement: "reconocimiento",
  advanced: "avanzado",
  capstone: "proyecto final",
  clear: "claro",
  coherent: "coherente",
  combining: "combinando",
  complex: "complejo",
  concessions: "concesiones",
  course: "curso",
  demonstrating: "demostrando",
  form: "forma",
  forms: "formas",
  ideas: "ideas",
  inform: "informar",
  justified: "justificado",
  make: "hacer",
  makers: "responsables / creadores",
  material: "material",
  mediation: "mediación",
  mutual: "mutuo",
  points: "puntos",
  priorities: "prioridades",
  proposed: "propuesto",
  reached: "alcanzado",
  relative: "relativo",
  reliability: "fiabilidad",
  setting: "contexto",
  sound: "sólido / sonido",
  sources: "fuentes",
  spoken: "hablado",
  strength: "fortaleza",
  summary: "resumen",
  supporting: "que respalda",
  using: "utilizando",
  whole: "entero",
  writing: "escritura",
  s: "de una persona",
  ai: "inteligencia artificial",
  "bonds": "vínculos / lazos",
  "treatment": "tratamiento",
  "committee": "comité",
  "consciousness": "conciencia",
  "cost": "coste / costo",
  "literature": "literatura",
  "offs": "desventajas / compensaciones",
  "producing": "produciendo",
  "state's": "del Estado",
  "person's": "de una persona",
  "such": "tal / semejante",
  "attention": "atención",
  "audience": "público / audiencia",
  "layout": "diseño / disposición",
  "body": "cuerpo",
  "discussion": "debate / discusión",
  "originated": "se originó"
};



const C1_PRACTICE_EXTRA_WORD_TRANSLATIONS_3: Record<string, string> = {
  "hindsight": "retrospectiva",
  "emotional": "emocional",
  "group": "grupo",
  "motivation": "motivación",
  "extrinsic": "extrínseco",
  "incentive": "incentivo",
  "sense": "sentido",
  "procrastination": "procrastinación",
  "effort": "esfuerzo",
  "confirmation": "confirmación",
  "anchoring": "sesgo de anclaje",
  "counter": "contrarrestar",
  "sample": "muestra",
  "rebuild": "reconstruir",
  "consent": "consentimiento",
  "conflict": "conflicto",
  "resilience": "resiliencia",
  "belonging": "pertenencia",
  "reflective": "reflexivo",
  "narrative": "narrativa",
  "reconstructive": "reconstructivo",
  "temperament": "temperamento",
  "trait": "rasgo",
  "openness": "apertura",
  "conscientiousness": "responsabilidad / escrupulosidad",
  "agreeableness": "amabilidad",
  "goals": "objetivos",
  "derive": "derivar",
  "satisfaction": "satisfacción",
  "sustain": "mantener",
  "internalise": "interiorizar",
  "growth": "crecimiento",
  "mindset": "mentalidad",
  "curiosity": "curiosidad",
  "fixed": "fijo",
  "determination": "determinación",
  "engagement": "participación / implicación",
  "goal": "objetivo",
  "heuristic": "heurística",
  "alternative": "alternativa",
  "disconfirming": "que contradice",
  "draw": "extraer / dibujar",
  "premature": "prematuro",
  "skewed": "sesgado",
  "weigh": "sopesar",
  "attribute": "atribuir",
  "overlook": "pasar por alto",
  "variable": "variable",
  "impression": "impresión",
  "reciprocity": "reciprocidad",
  "assertiveness": "asertividad",
  "codependency": "codependencia",
  "labour": "trabajo / mano de obra",
  "power": "poder",
  "imbalance": "desequilibrio",
  "respectful": "respetuoso",
  "expectation": "expectativa",
  "refusal": "rechazo",
  "compromise": "compromiso / acuerdo",
  "values": "valores",
  "unresolved": "sin resolver",
  "feelings": "sentimientos",
  "major": "principal / importante",
  "strategy": "estrategia",
  "transition": "transición",
  "recognition": "reconocimiento",
  "turning": "decisivo / giro",
  "causal": "causal",
  "thematic": "temático",
  "thread": "hilo",
  "theme": "tema",
  "legitimacy": "legitimidad",
  "civic": "cívico",
  "procedural": "procedimental",
  "fairness": "imparcialidad / equidad",
  "mandate": "mandato",
  "cohesion": "cohesión",
  "asymmetry": "asimetría",
  "law": "ley",
  "informal": "informal",
  "mobility": "movilidad",
  "trade": "comercio",
  "deliberation": "deliberación",
  "brief": "breve",
  "authority": "autoridad",
  "literacy": "alfabetización / competencia",
  "integrated": "integrado",
  "executive": "ejecutivo",
  "reporting": "presentación de informes",
  "underlying": "subyacente",
  "delegated": "delegado",
  "priority": "prioridad",
  "phrasing": "formulación",
  "owner": "responsable / propietario",
  "contingency": "contingencia",
  "planning": "planificación",
  "address": "abordar / dirección",
  "research": "investigación",
  "sampling": "muestreo",
  "confounding": "de confusión",
  "methodological": "metodológico",
  "rigour": "rigor",
  "epistemic": "epistémico",
  "stance": "postura",
  "hypothesis": "hipótesis",
  "operational": "operativo",
  "mechanism": "mecanismo",
  "challenge": "desafío",
  "scientific": "científico",
  "algorithmic": "algorítmico",
  "model": "modelo",
  "ethical": "ético",
  "oversight": "supervisión",
  "training": "entrenamiento",
  "capability": "capacidad",
  "minimisation": "minimización",
  "informed": "informado",
  "mode": "modo",
  "system's": "del sistema",
  "voice": "voz",
  "unreliable": "poco fiable",
  "narrator": "narrador",
  "aesthetic": "estético",
  "symbolic": "simbólico",
  "motif": "motivo",
  "visual": "visual",
  "composition": "composición",
  "close": "detallado / cercano",
  "specificity": "especificidad",
  "interpretive": "interpretativo",
  "supply": "suministro",
  "climate": "clima",
  "multilateral": "multilateral",
  "global": "global",
  "humanitarian": "humanitario",
  "development": "desarrollo",
  "energy": "energía",
  "dependency": "dependencia",
  "security": "seguridad",
  "forced": "forzado",
  "displacement": "desplazamiento",
  "geopolitical": "geopolítico",
  "indicator": "indicador",
  "implementation": "implementación",
  "gap": "brecha",
  "assess": "evaluar",
  "implicature": "implicatura",
  "repair": "reparación",
  "conversational": "conversacional",
  "selective": "selectivo",
  "evaluative": "evaluativo",
  "conceptual": "conceptual",
  "interactional": "interaccional",
  "media": "medios de comunicación",
  "rhetoric": "retórica",
  "news": "noticias",
  "agenda": "agenda",
  "logical": "lógico",
  "ecosystem": "ecosistema",
  "rhetorical": "retórico",
  "device": "recurso",
  "fallacy": "falacia",
  "provenance": "procedencia",
  "portfolio": "cartera / portafolio",
  "argumentative": "argumentativo",
  "coherence": "coherencia",
  "attribution": "atribución",
  "negotiated": "negociado",
  "settlement": "acuerdo / resolución",
  "register": "registro",
  "hierarchy": "jerarquía",
  "proportionate": "proporcionado",
};
const C1_PRACTICE_EXTRA_WORD_TRANSLATIONS_2: Record<string, string> = {
  "abandoning": "abandonar",
  "abilities": "capacidades",
  "absence": "ausencia",
  "accepted": "aceptado",
  "accompany": "acompañar",
  "according": "según",
  "accountability": "responsabilidad",
  "acknowledging": "reconocer",
  "adapting": "adaptarse",
  "advance": "anticipación / avance",
  "advice": "consejo",
  "agency": "capacidad de actuar",
  "agree": "estar de acuerdo",
  "allow": "permitir",
  "also": "también",
  "alternatives": "alternativas",
  "altogether": "por completo",
  "appear": "parecer",
  "apprehension": "aprensión",
  "arising": "que surge",
  "arousal": "activación",
  "aspects": "aspectos",
  "associated": "asociado",
  "assumed": "supuesto",
  "assumes": "presupone",
  "assuming": "suponiendo",
  "assumption": "suposición",
  "assumptions": "suposiciones",
  "autonomy": "autonomía",
  "avoidance": "evitación",
  "avoiding": "evitar",
  "awareness": "conciencia",
  "balanced": "equilibrado",
  "becomes": "se convierte",
  "behaviour": "comportamiento",
  "beliefs": "creencias",
  "benefit": "beneficio",
  "blaming": "culpar",
  "bonus": "bonificación",
  "bouncing": "recuperarse",
  "boundaries": "límites",
  "boundary": "límite",
  "build": "construir",
  "capacity": "capacidad",
  "captures": "capta",
  "carefully": "cuidadosamente",
  "category": "categoría",
  "central": "central",
  "chain": "cadena",
  "changes": "cambios",
  "changing": "cambiar",
  "character": "carácter",
  "characterises": "caracteriza",
  "choosing": "elegir",
  "chronological": "cronológico",
  "circumstances": "circunstancias",
  "claims": "afirmaciones",
  "clarifying": "aclarar",
  "clearly": "claramente",
  "closely": "estrechamente",
  "coexist": "coexistir",
  "comes": "viene",
  "communicated": "comunicado",
  "communicating": "comunicar",
  "compassion": "compasión",
  "completely": "completamente",
  "concealing": "ocultar",
  "concerns": "preocupaciones",
  "conclusion": "conclusión",
  "conclusions": "conclusiones",
  "confirm": "confirmar",
  "conformity": "conformidad",
  "conscientious": "concienzudo",
  "consider": "considerar",
  "consideration": "consideración",
  "considered": "meditado",
  "considers": "considera",
  "constant": "constante",
  "contains": "contiene",
  "continuing": "continuar",
  "contradictions": "contradicciones",
  "control": "control",
  "conversations": "conversaciones",
  "coping": "afrontamiento",
  "correct": "correcto",
  "corroborated": "corroborado",
  "credibility": "credibilidad",
  "definition": "definición",
  "definitive": "definitivo",
  "delayed": "aplazado",
  "demands": "exigencias",
  "denying": "negar",
  "dependable": "fiable",
  "describe": "describir",
  "describes": "describe",
  "detailed": "detallado",
  "determine": "determinar",
  "determines": "determina",
  "develop": "desarrollar",
  "difficulty": "dificultad",
  "discomfort": "malestar",
  "distinguish": "distinguir",
  "distinguishes": "distingue",
  "distress": "angustia",
  "dramatic": "dramático",
  "education": "educación",
  "efficacy": "eficacia",
  "eliminating": "eliminar",
  "emotions": "emociones",
  "encountered": "encontrado",
  "enduring": "soportar",
  "enjoyment": "disfrute",
  "entirely": "por completo",
  "episodes": "episodios",
  "equal": "igual",
  "escalate": "intensificar",
  "examine": "examinar",
  "example": "ejemplo",
  "exchange": "intercambio",
  "exclude": "excluir",
  "exclusion": "exclusión",
  "existing": "existente",
  "exists": "existe",
  "experiences": "experiencias",
  "explanatory": "explicativo",
  "expresses": "expresa",
  "external": "externo",
  "face": "afrontar / cara",
  "factors": "factores",
  "fairly": "justamente",
  "familiar": "familiar",
  "family": "familia",
  "favouring": "favorecer",
  "feedback": "comentarios / retroalimentación",
  "feeling": "sentimiento",
  "final": "final",
  "financial": "financiero",
  "flexibility": "flexibilidad",
  "following": "siguiente",
  "frequency": "frecuencia",
  "frustration": "frustración",
  "further": "más / adicional",
  "gained": "adquirido",
  "gaps": "lagunas",
  "giving": "dar",
  "gratification": "gratificación",
  "happen": "ocurrir",
  "harsh": "duro",
  "having": "tener",
  "heavily": "en gran medida",
  "heighten": "intensificar",
  "help": "ayudar",
  "hostile": "hostil",
  "identical": "idéntico",
  "ignoring": "ignorar",
  "illusion": "ilusión",
  "immediate": "inmediato",
  "imposing": "imponer",
  "impulse": "impulso",
  "impulsive": "impulsivo",
  "incentives": "incentivos",
  "incompatible": "incompatible",
  "independently": "de forma independiente",
  "individual": "individual",
  "individuals": "individuos",
  "ineffective": "ineficaz",
  "influences": "influencias",
  "inherited": "heredado",
  "initial": "inicial",
  "insufficient": "insuficiente",
  "intensity": "intensidad",
  "intent": "intención",
  "interact": "interactuar",
  "interacting": "que interactúan",
  "interpretation": "interpretación",
  "interprets": "interpreta",
  "intersectional": "interseccional",
  "intrinsic": "intrínseco",
  "involve": "implicar",
  "involves": "implica",
  "judgement": "juicio",
  "later": "más tarde",
  "learning": "aprendizaje",
  "lens": "enfoque / perspectiva",
  "likely": "probable",
  "limit": "límite",
  "linear": "lineal",
  "linking": "que conecta",
  "listening": "escucha",
  "long": "largo",
  "made": "hecho",
  "main": "principal",
  "manage": "gestionar",
  "managing": "gestionar",
  "matter": "importar / asunto",
  "mean": "significar",
  "meanings": "significados",
  "means": "significa / medios",
  "membership": "pertenencia",
  "mentioned": "mencionado",
  "mind": "mente",
  "mindfulness": "atención plena",
  "mixed": "mezclado",
  "neat": "ordenado",
  "needs": "necesidades",
  "negative": "negativo",
  "negotiating": "negociar",
  "non": "no / sin",
  "noticing": "darse cuenta",
  "nuanced": "matizado",
  "numerical": "numérico",
  "obvious": "evidente",
  "occurred": "ocurrió",
  "off": "fuera / de",
  "one's": "de uno mismo",
  "oneself": "uno mismo",
  "ongoing": "continuo",
  "option": "opción",
  "order": "orden",
  "organised": "organizado",
  "original": "original",
  "otherwise": "de lo contrario",
  "outcome": "resultado",
  "overestimates": "sobreestima",
  "overwhelmed": "abrumado",
  "own": "propio",
  "paragraph": "párrafo",
  "part": "parte",
  "passage": "pasaje / texto",
  "pausing": "hacer una pausa",
  "people's": "de las personas",
  "perceived": "percibido",
  "personality": "personalidad",
  "perspective": "perspectiva",
  "phrase": "frase",
  "point": "punto",
  "popularity": "popularidad",
  "population": "población",
  "predictable": "previsible",
  "pressure": "presión",
  "prompts": "provoca / indicaciones",
  "proving": "demostrar",
  "psychological": "psicológico",
  "punishment": "castigo",
  "putting": "poner",
  "qualified": "matizado",
  "question": "pregunta",
  "reaction": "reacción",
  "readily": "fácilmente",
  "reading's": "del texto / de la lectura",
  "reappraisal": "reevaluación",
  "reassurance": "tranquilización",
  "recommendation": "recomendación",
  "reconsidering": "reconsiderar",
  "record": "registro",
  "reduce": "reducir",
  "reducing": "reducir",
  "refer": "referirse",
  "reference": "referencia",
  "refuse": "rechazar",
  "regulation": "regulación",
  "related": "relacionado",
  "relevant": "pertinente",
  "relief": "alivio",
  "relying": "depender",
  "remain": "permanecer",
  "remains": "permanece",
  "removes": "elimina",
  "removing": "eliminar",
  "repeated": "repetido",
  "replicated": "replicado",
  "replying": "responder",
  "represent": "representar",
  "representative": "representativo",
  "request": "solicitud",
  "require": "requerir",
  "resisting": "resistir",
  "respectfully": "respetuosamente",
  "respond": "responder",
  "responding": "responder",
  "response": "respuesta",
  "retrieve": "recuperar",
  "returning": "volver",
  "reveal": "revelar",
  "revisable": "revisable",
  "revising": "revisar",
  "revision": "revisión",
  "reward": "recompensa",
  "roles": "roles",
  "routines": "rutinas",
  "satisfy": "satisfacer",
  "saw": "vio",
  "seeing": "ver",
  "seeking": "buscar",
  "sending": "enviar",
  "separate": "separar",
  "separating": "separar",
  "setback": "contratiempo",
  "setbacks": "contratiempos",
  "shape": "moldear / forma",
  "shapes": "moldea",
  "sided": "parcial",
  "simply": "simplemente",
  "solving": "resolver",
  "state": "estado / afirmar",
  "stereotypes": "estereotipos",
  "still": "todavía",
  "stimulus": "estímulo",
  "stories": "historias",
  "strategies": "estrategias",
  "strong": "fuerte",
  "succeed": "tener éxito",
  "summarises": "resume",
  "supports": "apoya",
  "suppress": "suprimir",
  "suppressing": "suprimir",
  "task": "tarea",
  "tension": "tensión",
  "tensions": "tensiones",
  "time": "tiempo",
  "title": "título",
  "tolerance": "tolerancia",
  "toughness": "fortaleza",
  "traits": "rasgos",
  "transitions": "transiciones",
  "treating": "tratar",
  "trigger": "desencadenante",
  "trust": "confianza",
  "unchanged": "sin cambios",
  "uncritical": "acrítico",
  "unequal": "desigual",
  "unmet": "no satisfecho",
  "unnecessarily": "innecesariamente",
  "unreasonable": "irrazonable",
  "unsolicited": "no solicitado",
  "useful": "útil",
  "valuable": "valioso",
  "variables": "variables",
  "vary": "variar",
  "view": "opinión / ver",
  "views": "opiniones",
  "visible": "visible",
  "vs": "frente a",
  "weighed": "sopesado",
  "weight": "peso",
  "withdrawal": "retirada",
  "writer's": "del autor",
  "writers": "autores",
  "written": "escrito",
  "angry": "enfadado",
  "best": "mejor",
  "de": "de",
  "first": "primero",
  "improve": "mejorar",
  "kind": "tipo / amable",
  "listen": "escuchar",
  "memory": "memoria",
  "never": "nunca",
  "open": "abrir",
  "puzzle": "rompecabezas",
  "mastering": "dominar / perfeccionar"
};

const labels: Record<string, string> = { explore: "Exploración", practice: "Práctica", grammar: "Gramática", pronunciation: "Pronunciación", reading: "Lectura", writing: "Escritura", speaking: "Expresión oral", listening: "Comprensión auditiva" };

const PRE_A1_EXAMPLE_TRANSLATIONS: Record<string, string> = {
  "Correct: Jump! / Not: Jumps!": "Correcto: «¡Salta!». Incorrecto: añadir una -s al imperativo.",
  "one, two, three, four, five": "uno, dos, tres, cuatro, cinco",
  "six, seven, eight, nine, ten": "seis, siete, ocho, nueve, diez",
  "eleven, twelve, thirteen, fourteen, fifteen": "once, doce, trece, catorce, quince",
  "sixteen, seventeen, eighteen, nineteen, twenty": "dieciséis, diecisiete, dieciocho, diecinueve, veinte",
  "I'm one year old. / I'm ten years old.": "Tengo un año. / Tengo diez años.",
  "thirTEEN, fourTEEN, fifTEEN": "Trece, catorce y quince (las mayúsculas marcan la sílaba tónica).",
  "my mother": "mi madre",
  "my brother": "mi hermano",
  "He is my father.": "Él es mi padre.",
  "She is my mother.": "Ella es mi madre.",
  "mother, father, sister, brother": "madre, padre, hermana, hermano",
  "grandmother, grandfather": "abuela, abuelo",
  "my desk": "mi pupitre",
  "my schoolbag": "mi mochila",
  "your chair": "tu silla",
  "your book": "tu libro",
  "I have a pencil.": "Tengo un lápiz.",
  "a desk": "un pupitre",
  "a chair": "una silla",
  "the board": "la pizarra",
  "the window": "la ventana",
  "in my classroom": "en mi aula",
  "in the schoolbag": "en la mochila",
  "a book and a pen": "un libro y un bolígrafo",
  "a pencil and a ruler": "un lápiz y una regla",
  "Tomorrow is Tuesday.": "Mañana es martes.",
  "Tomorrow is Sunday.": "Mañana es domingo.",
  "Seven days in a week.": "Siete días en una semana.",
  "on Monday": "el lunes",
  "on Friday": "el viernes",
  "Saturday and Sunday": "sábado y domingo",
  "the weekend": "el fin de semana",
  "I go to school on Tuesday.": "Voy a la escuela el martes.",
  "I go to school on Friday.": "Voy a la escuela el viernes.",
  "Monday and Tuesday": "lunes y martes",
  "Tomorrow is Thursday.": "Mañana es jueves.",
  "Tomorrow is Monday.": "Mañana es lunes.",
  "It's sunny.": "Hace sol.",
  "It's rainy.": "Está lloviendo.",
  "It's cloudy.": "Está nublado.",
  "It's windy.": "Hace viento.",
  "It's hot.": "Hace calor.",
  "It's cool.": "Hace fresco.",
  "The sun.": "El sol.",
  "The wind.": "El viento.",
  "a cloud": "una nube",
  "a coat": "un abrigo",
  "I have a hat.": "Tengo un sombrero.",
  "sun and cloud": "sol y nube",
  "rain and wind": "lluvia y viento",
  "spring and summer": "primavera y verano",
  "autumn and winter": "otoño e invierno",
  "Four seasons in a year.": "Cuatro estaciones en un año.",
  "in spring": "en primavera",
  "in winter": "en invierno",
  "A flower in spring.": "Una flor en primavera.",
  "A leaf; two leaves.": "Una hoja; dos hojas.",
  "four seasons in a year": "cuatro estaciones en un año",
  "a new year": "un año nuevo",
  "I like mango.": "Me gusta el mango.",
  "I don't like pears.": "No me gustan las peras.",
  "I don't like cherries.": "No me gustan las cerezas.",
  "My favourite fruit is pear.": "Mi fruta favorita es la pera.",
  "a red apple": "una manzana roja",
  "a yellow banana": "un plátano amarillo",
  "two apples": "dos manzanas",
  "three bananas": "tres plátanos",
  "apples and pears": "manzanas y peras",
  "mango and banana": "mango y plátano",
  "at the market": "en el mercado",
  "fruit, please": "fruta, por favor",
  "I like peas.": "Me gustan los guisantes.",
  "I don't like peppers.": "No me gustan los pimientos.",
  "The tomato is red.": "El tomate es rojo.",
  "The carrots are orange.": "Las zanahorias son naranjas.",
  "A vegetable garden.": "Un huerto.",
  "Wash the carrots.": "Lava las zanahorias.",
  "Wash the tomatoes.": "Lava los tomates.",
  "A tomato, please.": "Un tomate, por favor.",
  "carrots and peas": "zanahorias y guisantes",
  "tomatoes and lettuce": "tomates y lechuga",
  "green peas": "guisantes verdes",
  "green lettuce": "lechuga verde",
  "Where is the hairdresser?": "¿Dónde está el peluquero?",
  "Is your hair short or long?": "¿Tienes el pelo corto o largo?",
  "How long is your hair?": "¿Cuánto mide tu pelo?",
  "Where is the hair?": "¿Dónde está el pelo?",
  "Where is the comb?": "¿Dónde está el peine?",
  "Where is the brush?": "¿Dónde está el cepillo?",
  "Where is the scissors?": "¿Dónde están las tijeras?",
  "Where are the scissors?": "¿Dónde están las tijeras?",
  "I want a teddy bear.": "Quiero un oso de peluche.",
  "Have you got a toy train?": "¿Tienes un tren de juguete?",
  "The robot is blue.": "El robot es azul.",
  "Where is the pet shop?": "¿Dónde está la tienda de animales?",
  "Where is the pet?": "¿Dónde está la mascota?",
  "Where is the dog?": "¿Dónde está el perro?",
  "Where is the cat?": "¿Dónde está el gato?",
  "Where is the fish?": "¿Dónde está el pez?",
  "Where is the clothes shop?": "¿Dónde está la tienda de ropa?",
  "Where is the shirt?": "¿Dónde está la camisa?",
  "Where are the trousers?": "¿Dónde están los pantalones?",
  "Where is the skirt?": "¿Dónde está la falda?",
  "Where is the dress?": "¿Dónde está el vestido?",
  "Listen, please.": "Escucha, por favor.",
  "Repeat after me.": "Repite después de mí.",
  "Read the sentence.": "Lee la oración.",
  "Write your name.": "Escribe tu nombre.",
  "Open your book.": "Abre tu libro.",
  "There is a farm shop.": "Hay una tienda en la granja.",
  "There are six eggs.": "Hay seis huevos.",
  "I buy milk and cheese.": "Compro leche y queso.",
  "A firefighter wears a helmet.": "Un bombero lleva un casco.",
  "The fire engine is red.": "El camión de bomberos es rojo.",
  "The firefighter uses a hose.": "El bombero usa una manguera.",
  "I am at the campsite.": "Estoy en el camping.",
  "My tent is near the lake.": "Mi tienda de campaña está cerca del lago.",
  "I have a sleeping bag.": "Tengo un saco de dormir.",
  "I'd like a cup of tea, please.": "Quisiera una taza de té, por favor.",
  "Can I have a sandwich?": "¿Me pones un sándwich, por favor?",
  "The juice is in a glass.": "El zumo está en un vaso.",
  "I feel tired today.": "Hoy me siento cansado/a.",
  "I am hungry and thirsty.": "Tengo hambre y sed.",
  "I am better now.": "Ahora estoy mejor.",
  "The horse is big.": "El caballo es grande.",
  "The duck can swim.": "El pato puede nadar.",
  "The sheep is white.": "La oveja es blanca.",
  "There is a boat in the harbour.": "Hay un barco en el puerto.",
  "The lighthouse is tall.": "El faro es alto.",
  "The sand is warm.": "La arena está templada.",
  "There is a sofa in the living room.": "Hay un sofá en el salón.",
  "The remote control is on the table.": "El mando a distancia está sobre la mesa.",
  "The clock is on the wall.": "El reloj está en la pared.",
  "I can climb.": "Puedo trepar.",
  "I can jump and run.": "Puedo saltar y correr.",
  "Let's share the ball.": "Compartamos el balón.",
  "a bottle of water": "una botella de agua",
  "a packet of rice": "un paquete de arroz",
  "a few apples": "unas pocas manzanas",
  "I have my passport.": "Tengo mi pasaporte.",
  "The plane is on the runway.": "El avión está en la pista.",
  "The pilot is on the plane.": "El piloto está en el avión.",
  "I have breakfast in the morning.": "Desayuno por la mañana.",
  "I eat lunch in the afternoon.": "Almuerzo por la tarde.",
  "I go to bed at night.": "Me voy a la cama por la noche.",
  "There is a plant in the pot.": "Hay una planta en la maceta.",
  "The seed grows in the soil.": "La semilla crece en la tierra.",
  "I water the rose.": "Riego la rosa.",
  "I clean my room.": "Limpio mi habitación.",
  "I sweep the floor.": "Barro el suelo.",
  "Please wash the cup.": "Lava la taza, por favor.",
  "Hello! I am Alex.": "¡Hola! Soy Alex.",
  "This is my family.": "Esta es mi familia.",
  "I have a book. Thank you!": "Tengo un libro. ¡Gracias!",
  "I like + sport.": "Me gusta + deporte.",
  "I can + verb.": "Sé + verbo / Puedo + verbo.",
  "A = éi · B = bí · C = sí · D = dí · E = í": "Pronunciación aproximada de las letras A, B, C, D y E en inglés.",
  "A / a · B / b · C / c": "Las letras A, B y C en mayúscula y en minúscula.",
  "A = éi · E = í · I = ái · O = óu · U = iú": "Pronunciación aproximada de las cinco vocales en inglés.",
  "B / D · E / I · G / J · M / N · P / T": "Pares de letras que conviene distinguir al escuchar y deletrear.",
  "Tom → T-O-M · Ben → B-E-N": "Tom se deletrea T-O-M; Ben se deletrea B-E-N.",
  "I am a friend.": "Soy un amigo / una amiga.",
  "You're my friend.": "Eres mi amigo / mi amiga.",
  "I eat cereal.": "Como cereales.",
  "I drink milk in the morning.": "Bebo leche por la mañana.",
  "It is morning.": "Es por la mañana.",
  "Thank you for the tea.": "Gracias por el té.",
  "A drink, please.": "Una bebida, por favor.",
  "What is it? It is a duck.": "¿Qué es? Es un pato.",
  "There is a cow in the field.": "Hay una vaca en el campo.",
  "There is a barn on the farm.": "Hay un granero en la granja.",
  "This is a barn.": "Esto es un granero.",
  "A barn in the field.": "Un granero en el campo.",
  "What is it? It is a dolphin.": "¿Qué es? Es un delfín.",
  "I see an ant.": "Veo una hormiga.",
  "I see a spider.": "Veo una araña.",
  "a ladybird": "una mariquita",
  "an ant": "una hormiga",
  "I see a monkey.": "Veo un mono.",
  "I see a zebra.": "Veo una cebra.",
  "Where is the ball?": "¿Dónde está el balón?",
  "Where is the book?": "¿Dónde está el libro?",
  "They are my grandparents.": "Ellos son mis abuelos.",
  "They are my parents.": "Ellos son mis padres.",
  "Put on your hat.": "Ponte el sombrero.",
  "Clean your room.": "Limpia tu habitación.",
  "The table is clean.": "La mesa está limpia.",
  "I wash my face.": "Me lavo la cara.",
  "This is my comb.": "Este es mi peine.",
  "I wake up in the morning.": "Me despierto por la mañana.",
  "What time is it?": "¿Qué hora es?",
  "Party time!": "¡Hora de la fiesta!",
  "I like toys.": "Me gustan los juguetes.",
  "I can't skate.": "No sé patinar.",
  "Can you swim?": "¿Sabes nadar?",
  "Yes, I can.": "Sí, sé nadar.",
  "Let's have a race.": "Hagamos una carrera.",
  "I go by bus.": "Voy en autobús.",
  "I go by train.": "Voy en tren.",
  "Red means stop.": "El rojo significa parar.",
  "Green means go.": "El verde significa avanzar.",
  "There is a park.": "Hay un parque.",
  "The shop is on the street.": "La tienda está en la calle.",
  "It is a nice place.": "Es un lugar bonito.",
  "How much? One coin, please.": "¿Cuánto cuesta? Una moneda, por favor.",
  "What's the weather like? It's sunny.": "¿Qué tiempo hace? Hace sol.",
  "It's rainy. It's cold.": "Llueve. Hace frío.",
  "a book · an apple": "un libro · una manzana",
  "What is it? Who is she?": "¿Qué es? ¿Quién es ella?",
  "This is my bag. I've got a ball.": "Esta es mi mochila. Tengo una pelota.",
  "I like apples. It has got a tail.": "Me gustan las manzanas. Tiene cola.",
  "This is my bag.": "Esta es mi mochila.",
  "This is your book.": "Este es tu libro.",
  "I've got a ball.": "Tengo una pelota.",
  "Have you got a pencil?": "¿Tienes un lápiz?",
  "I like apples.": "Me gustan las manzanas.",
  "It has got a tail.": "Tiene cola.",
  "It is big.": "Es grande.",
  "It's a red hat.": "Es un sombrero rojo.",
  "What is it?": "¿Qué es?",
  "Talk about sports": "Hablar de deportes",
  "Talk about movement": "Hablar de actividades y movimiento",
  "Name a team and place": "Nombrar un equipo y un lugar",
  "This is my team. · This is the field.": "Este es mi equipo. · Este es el campo.",
  "Review ownership and possessions": "Repasar la posesión y los objetos que tenemos",
  "my · your · I've got · Have you got?": "mi · tu · tengo · ¿tienes?",
  "Review preferences and descriptions": "Repasar gustos y descripciones",
  "I like · It has got · It is.": "Me gusta · Tiene · Es/está.",
  "Review questions": "Repasar preguntas",
  "What is it? · Where is the book?": "¿Qué es? · ¿Dónde está el libro?",
  "Complete:": "Completa:",
  "Choose the correct answer.": "Elige la respuesta correcta.",
  "Listen and complete.": "Escucha y completa.",
  "Say the English sentence aloud.": "Di la frase en inglés en voz alta."
};

const C1_EXPLORATION_TRANSLATIONS: Record<string, string> = {
  "Not until the move was complete did she realise how much had changed.": "No fue hasta que terminó la mudanza cuando se dio cuenta de cuánto había cambiado todo.",
  "If he had sought support earlier, he might feel more settled now.": "Si hubiera buscado apoyo antes, quizá ahora se sentiría más adaptado.",
  "What matters most is the ability to reassess priorities.": "Lo que más importa es la capacidad de reconsiderar las prioridades.",
  "Although the transition was difficult, it created new opportunities.": "Aunque la transición fue difícil, creó nuevas oportunidades.",
  "Having considered the alternatives, they reached a measured decision.": "Tras considerar las alternativas, llegaron a una decisión ponderada.",
  "The evidence appears to suggest a gradual change in perspective.": "Las pruebas parecen indicar un cambio gradual de perspectiva.",
  "Rarely do personal changes follow a predictable sequence.": "Rara vez los cambios personales siguen una secuencia predecible.",
  "Were further support available, the adjustment might be easier.": "Si se dispusiera de más apoyo, la adaptación podría ser más fácil.",
  "She acknowledged that the outcome could have been different.": "Reconoció que el resultado podría haber sido diferente.",
  "The account is persuasive, albeit not entirely conclusive.": "El relato resulta convincente, aunque no es del todo concluyente.",
  "Had the committee disclosed the assumptions earlier, the debate might have been more focused.": "Si el comité hubiera revelado antes los supuestos, el debate podría haber estado más centrado.",
  "Not only does the proposal address immediate concerns, but it also anticipates longer-term risks.": "La propuesta no solo aborda las preocupaciones inmediatas, sino que también anticipa riesgos a más largo plazo.",
  "Although the evidence is persuasive, its implications should be interpreted with caution.": "Aunque las pruebas son convincentes, sus implicaciones deben interpretarse con cautela.",
  "Were the data independently verified, the recommendation would carry greater weight.": "Si los datos se verificaran de forma independiente, la recomendación tendría más peso.",
  "What remains unclear is whether the observed change can be attributed to the intervention.": "Lo que sigue sin estar claro es si el cambio observado puede atribuirse a la intervención.",
  "Having reviewed the alternatives, the panel reached a conditional agreement.": "Tras revisar las alternativas, el comité alcanzó un acuerdo condicionado.",
  "Rarely has the issue been examined from the perspective of those most affected.": "Rara vez se ha examinado la cuestión desde la perspectiva de quienes se ven más afectados.",
  "The findings, which were drawn from a limited sample, should not be generalised without qualification.": "Los resultados, obtenidos a partir de una muestra limitada, no deben generalizarse sin matices.",
  "Much as the approach is promising, its implementation depends on adequate oversight.": "Por prometedor que sea el enfoque, su aplicación depende de una supervisión adecuada.",
  "The report is concise, albeit more qualified than the initial proposal.": "El informe es conciso, aunque incluye más matices que la propuesta inicial.",
  "By the time we moved, I had already made up my mind.": "Para cuando nos mudamos, ya me había decidido.",
  "I had been questioning my assumptions for months.": "Llevaba meses cuestionando mis suposiciones.",
  "I realised that I had misremembered the conversation.": "Me di cuenta de que recordaba mal la conversación.",
  "I was trying to fit in when the incident happened.": "Estaba intentando encajar cuando ocurrió el incidente.",
  "It was the move that changed my perspective.": "Fue la mudanza lo que cambió mi perspectiva.",
  "Rarely do we question the stories we tell ourselves.": "Rara vez cuestionamos las historias que nos contamos a nosotros mismos.",
  "The experience may have influenced my outlook.": "Puede que la experiencia haya influido en mi manera de ver las cosas.",
  "Having reconsidered the event, I saw it differently.": "Tras reconsiderar lo ocurrido, lo vi de otra manera.",
  "I remember questioning the decision.": "Recuerdo haber cuestionado la decisión.",
  "Admittedly, memory is selective; that does not make it meaningless.": "Es cierto que la memoria es selectiva; eso no significa que carezca de sentido.",
  "By the time the interview began, the witness had already spoken to a colleague.": "Para cuando empezó la entrevista, el testigo ya había hablado con un compañero.",
  "She had been trying to retrieve the detail for several minutes.": "Llevaba varios minutos intentando recuperar ese detalle.",
  "The witness may have confused the two dates.": "Puede que el testigo haya confundido las dos fechas.",
  "He said that he had seen the vehicle near the station.": "Dijo que había visto el vehículo cerca de la estación.",
  "She recalled noticing a distinctive sound.": "Recordó haber percibido un sonido distintivo.",
  "At no point did he claim to remember every detail.": "En ningún momento afirmó recordar todos los detalles.",
  "What remains uncertain is the source of that image.": "Lo que sigue siendo incierto es el origen de esa imagen.",
  "Having checked the diary, she revised her account.": "Tras consultar el diario, revisó su relato.",
  "The note, which had been written years earlier, contradicted the claim.": "La nota, que se había escrito años antes, contradecía la afirmación.",
  "The available records would appear to support that interpretation.": "Los registros disponibles parecen respaldar esa interpretación.",
  "She may well have underestimated the time required.": "Es muy posible que haya subestimado el tiempo necesario.",
  "If he had planned ahead, he would be less stressed now.": "Si hubiera planificado con antelación, ahora estaría menos estresado.",
  "Only then did she recognise the pattern.": "Solo entonces reconoció el patrón.",
  "What drives her is a sense of purpose.": "Lo que la motiva es tener un propósito.",
  "The tutor recommended that he take a short break.": "El tutor recomendó que se tomara un breve descanso.",
  "She avoided setting unrealistic targets.": "Evitó fijarse objetivos poco realistas.",
  "Although rewards can help, they are not always sufficient.": "Aunque las recompensas pueden ayudar, no siempre son suficientes.",
  "Having reconsidered the goal, he changed direction.": "Tras reconsiderar el objetivo, cambió de rumbo.",
  "a sustained commitment to professional development": "un compromiso sostenido con el desarrollo profesional",
  "This may partly explain the difference.": "Esto puede explicar en parte la diferencia.",
  "Rarely do we question our first impressions.": "Rara vez cuestionamos nuestras primeras impresiones.",
  "If the sample had been wider, the conclusion would be more robust now.": "Si la muestra hubiera sido más amplia, la conclusión sería más sólida ahora.",
  "The effect is thought to be context-dependent.": "Se cree que el efecto depende del contexto.",
  "The wording may have influenced the responses.": "Es posible que la formulación haya influido en las respuestas.",
  "What matters is how the evidence was selected.": "Lo importante es cómo se seleccionaron las pruebas.",
  "Admittedly, the pattern is striking; nevertheless, the sample is small.": "Es cierto que el patrón es llamativo; aun así, la muestra es pequeña.",
  "Having checked the source, the team revised its report.": "Tras comprobar la fuente, el equipo revisó su informe.",
  "The panel insisted that the claim be tested.": "El comité insistió en que se comprobara la afirmación.",
  "the selective presentation of evidence": "la presentación selectiva de las pruebas",
  "The analyst objected to treating correlation as causation.": "El analista se opuso a tratar la correlación como causalidad.",
  "I see your point; nevertheless, the boundary still matters.": "Entiendo tu punto de vista; sin embargo, el límite sigue siendo importante.",
  "Under no circumstances should consent be assumed.": "Bajo ninguna circunstancia debe darse por hecho el consentimiento.",
  "What we need is a clearer agreement.": "Lo que necesitamos es un acuerdo más claro.",
  "You should be able to decline without pressure.": "Deberías poder negarte sin sentir presión.",
  "Were expectations clearer, fewer misunderstandings might arise.": "Si las expectativas fueran más claras, habría menos malentendidos.",
  "She explained that she had felt unable to refuse.": "Explicó que se había sentido incapaz de negarse.",
  "He objected to being excluded from the discussion.": "Se opuso a que lo excluyeran de la conversación.",
  "They insisted that the agreement be reviewed.": "Insistieron en que se revisara el acuerdo.",
  "Having acknowledged the tension, they discussed a solution.": "Tras reconocer la tensión, hablaron de una solución.",
  "The response may reflect an underlying power imbalance.": "La respuesta puede reflejar un desequilibrio de poder subyacente.",
  "I may have overreacted because I was exhausted.": "Puede que haya reaccionado de forma exagerada porque estaba agotado.",
  "If I had paused, I would feel less unsettled now.": "Si me hubiera detenido un momento, ahora me sentiría menos inquieto.",
  "Rarely do we recognise a trigger immediately.": "Rara vez reconocemos un desencadenante de inmediato.",
  "What matters is how we choose to respond.": "Lo importante es cómo elegimos responder.",
  "Although anger is understandable, aggression is not acceptable.": "Aunque la ira es comprensible, la agresividad no es aceptable.",
  "The counsellor suggested that he take time to reflect.": "El orientador sugirió que se tomara un tiempo para reflexionar.",
  "Having identified the trigger, she reconsidered her response.": "Tras identificar el desencadenante, reconsideró su reacción.",
  "You need not resolve the issue immediately.": "No tienes por qué resolver el problema de inmediato.",
  "He avoided escalating the disagreement.": "Evitó agravar el desacuerdo.",
  "The reaction may partly reflect accumulated stress.": "La reacción puede reflejar en parte el estrés acumulado."
};


const preA1Listening: Record<number, { audioTranscript: string; template: string; words: string[] }> = {
  1: { audioTranscript: "At the school door, Mia and Ben meet. Mia: Hello, Ben! Ben: Hi, Mia! Mia: Hello! Ben: Hi! Mia: Goodbye, Ben! Ben: Bye, Mia! Mia: See you! Ben: See you! Mia: Goodbye!", template: "[[gap-01]] [[gap-02]] [[gap-03]] [[gap-04]] [[gap-05]] [[gap-06]] [[gap-07]] [[gap-08]] [[gap-09]] [[gap-10]]", words: ["At the school door, Mia and Ben meet.","Mia: Hello, Ben!","Ben: Hi, Mia!","Mia: Hello!","Ben: Hi!","Mia: Goodbye, Ben!","Ben: Bye, Mia!","Mia: See you!","Ben: See you!","Mia: Goodbye!"] },
  2: { audioTranscript: "Ana and Leo meet. Ana: Hello! What's your name? Leo: My name is Leo. Ana: My name is Ana. Leo: Hello, Ana! Ana: Hi, Leo! Leo: What's your name? Ana: My name is Ana. Leo: See you! Ana: Goodbye!", template: "[[gap-01]] [[gap-02]] [[gap-03]] [[gap-04]] [[gap-05]] [[gap-06]] [[gap-07]] [[gap-08]] [[gap-09]] [[gap-10]]", words: ["Ana and Leo meet.","Ana: Hello! What's your name?","Leo: My name is Leo.","Ana: My name is Ana.","Leo: Hello, Ana!","Ana: Hi, Leo!","Leo: What's your name?","Ana: My name is Ana.","Leo: See you!","Ana: Goodbye!"] },
  3: { audioTranscript: "At school, Ana and Leo talk. Ana: Hello, Leo. How are you? Leo: I'm fine. And you? Ana: I'm good. Leo: Very well. Ana: I'm very happy today. Leo: I'm tired today. Ana: I'm OK. Leo: Not bad. Ana: Great!", template: "[[gap-01]] [[gap-02]] [[gap-03]] [[gap-04]] [[gap-05]] [[gap-06]] [[gap-07]] [[gap-08]] [[gap-09]] [[gap-10]]", words: ["At school, Ana and Leo talk.","Ana: Hello, Leo. How are you?","Leo: I'm fine. And you?","Ana: I'm good.","Leo: Very well.","Ana: I'm very happy today.","Leo: I'm tired today.","Ana: I'm OK.","Leo: Not bad.","Ana: Great!"] },
  4: { audioTranscript: "Ben needs help at the door. Ben: Excuse me. Ana: Yes? Ben: Help, please. Ana: Here. Ben: Thank you. Ana: You're welcome. Ben: Sorry. Ana: It's OK. Ben: Goodbye!", template: "[[gap-01]] [[gap-02]] [[gap-03]] [[gap-04]] [[gap-05]] [[gap-06]] [[gap-07]] [[gap-08]] [[gap-09]] [[gap-10]]", words: ["Ben needs help at the door.","Ben: Excuse me.","Ana: Yes?","Ben: Help, please.","Ana: Here.","Ben: Thank you.","Ana: You're welcome.","Ben: Sorry.","Ana: It's OK.","Ben: Goodbye!"] },
  5: { audioTranscript: "Mia asks Ben a question. Mia: True or false? Ben: Maybe. Mia: Correct! Ben: OK. Mia: That's right. Ben: That's wrong? Mia: No. Ben: Again, please. Mia: Repeat, please.", template: "[[gap-01]] [[gap-02]] [[gap-03]] [[gap-04]] [[gap-05]] [[gap-06]] [[gap-07]] [[gap-08]] [[gap-09]] [[gap-10]]", words: ["Mia asks Ben a question.","Mia: True or false?","Ben: Maybe.","Mia: Correct!","Ben: OK.","Mia: That's right.","Ben: That's wrong?","Mia: No.","Ben: Again, please.","Mia: Repeat, please."] },
  6: { audioTranscript: "Tom and Ben meet at school. Tom: Hello! My name is Tom. Ben: Hi! My name is Ben. Tom: How do you spell your name? Ben: B-E-N. Tom: Thank you. Ben: You're welcome. Ben: How do you spell your name? Tom: T-O-M. Ben: Goodbye!", template: "[[gap-01]] [[gap-02]] [[gap-03]] [[gap-04]] [[gap-05]] [[gap-06]] [[gap-07]] [[gap-08]] [[gap-09]] [[gap-10]]", words: ["Tom and Ben meet at school.","Tom: Hello! My name is Tom.","Ben: Hi! My name is Ben.","Tom: How do you spell your name?","Ben: B-E-N.","Tom: Thank you.","Ben: You're welcome.","Ben: How do you spell your name?","Tom: T-O-M.","Ben: Goodbye!"] },
  7: { audioTranscript: "Teacher: Look at the picture. Student: Hat? Teacher: Yes, a hat. Student: House? Teacher: Yes, a house. Student: Hand? Teacher: Yes, a hand. Teacher: Three sheep. Student: Ship? Teacher: No, sheep. Listen: ship and sheep.", template: "[[gap-01]] [[gap-02]] [[gap-03]] [[gap-04]] [[gap-05]] [[gap-06]] [[gap-07]] [[gap-08]] [[gap-09]] [[gap-10]]", words: ["Teacher: Look at the picture.","Student: Hat?","Teacher: Yes, a hat.","Student: House?","Teacher: Yes, a house.","Student: Hand?","Teacher: Yes, a hand.","Teacher: Three sheep.","Student: Ship?","Teacher: No, sheep. Listen: ship and sheep."] },
  8: { audioTranscript: "At school, Ana talks to Tom. Tom: Hello, Ana. How are you today? Ana: I am very happy. Tom: I am a teacher. Ana: I am a student. Tom: I am happy today. Ana: I am tired. Tom: I am calm. Ana: I am excited. Tom: Great!", template: "[[gap-01]] [[gap-02]] [[gap-03]] [[gap-04]] [[gap-05]] [[gap-06]] [[gap-07]] [[gap-08]] [[gap-09]] [[gap-10]]", words: ["At school, Ana talks to Tom.","Tom: Hello, Ana. How are you today?","Ana: I am very happy.","Tom: I am a teacher.","Ana: I am a student.","Tom: I am happy today.","Ana: I am tired.","Tom: I am calm.","Ana: I am excited.","Tom: Great!"] },
  9: { audioTranscript: "At school, Ana and Leo talk. Ana: Hello, Leo. I'm happy today. Leo: You're happy. Ana: I'm fine. Leo: You're great. Ana: I'm ready. Leo: You're nice. Ana: I'm a student. Leo: You're a teacher. Ana: Goodbye!", template: "[[gap-01]] [[gap-02]] [[gap-03]] [[gap-04]] [[gap-05]] [[gap-06]] [[gap-07]] [[gap-08]] [[gap-09]] [[gap-10]]", words: ["At school, Ana and Leo talk.","Ana: Hello, Leo. I'm happy today.","Leo: You're happy.","Ana: I'm fine.","Leo: You're great.","Ana: I'm ready.","Leo: You're nice.","Ana: I'm a student.","Leo: You're a teacher.","Ana: Goodbye!"] },
  10: { audioTranscript: "At the door, Ana meets Alex and Ben. Ana: Hello! This is my friend, Alex. Alex: Nice to meet you. Ana: Nice to meet you too. Ben: Pleased to meet you. Ana: This is Ben. Ben: You're my friend. Alex: What's your name? Ben: My name is Ben. Alex: Goodbye!", template: "[[gap-01]] [[gap-02]] [[gap-03]] [[gap-04]] [[gap-05]] [[gap-06]] [[gap-07]] [[gap-08]] [[gap-09]] [[gap-10]]", words: ["At the door, Ana meets Alex and Ben.","Ana: Hello! This is my friend, Alex.","Alex: Nice to meet you.","Ana: Nice to meet you too.","Ben: Pleased to meet you.","Ana: This is Ben.","Ben: You're my friend.","Alex: What's your name?","Ben: My name is Ben.","Alex: Goodbye!"] },
};

function buildDictationHint(answer: string, level: number) {
  return answer.replace(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g, (word) => {
    const letters = [...word].filter((character) => /[A-Za-z0-9]/.test(character)).length;
    if (letters <= 1) return "□";
    const revealCount = Math.min(level === 1 ? 1 : 2, letters - 1);
    let revealed = 0;
    return [...word].map((character) => {
      if (!/[A-Za-z0-9]/.test(character)) return character;
      revealed += 1;
      return revealed <= revealCount ? character : "＿";
    }).join("");
  });
}

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-GB";
  window.speechSynthesis.speak(utterance);
}

function getSpanishPronunciationGuide(word: string) {
  const normalized = word.toLowerCase().replace(/’/g, "'");
  const ipa = (britishIpa as Record<string, string>)[normalized];
  if (!ipa) return "";

  // Convert British IPA into an accessible Spanish-friendly reading aid.
  // This is deliberately an approximation, not a second phonetic alphabet.
  let value = ipa.replace(/^\/+|\/+$/g, "").replace(/[ˈˌː]/g, "");
  // In Spanish-friendly spelling, /j/ after an initial consonant is read as
  // an "i" glide: future becomes fiu-cha rather than fyu-cha.
  value = value.replace(/([bcdfghjklmnñpqrstvwxyz])j(?=u)/g, "$1i");
  const rules: Array<[RegExp, string]> = [
    [/tʃ/g, "ch"], [/dʒ/g, "dy"], [/θ/g, "z"], [/ð/g, "d"],
    [/ʃ/g, "sh"], [/ʒ/g, "zh"], [/ŋ/g, "ng"], [/ɹ/g, "r"],
    [/j/g, "y"], [/h/g, "j"], [/eɪ/g, "ei"], [/aɪ/g, "ai"], [/aʊ/g, "au"], [/əʊ/g, "ou"], [/oʊ/g, "ou"], [/ɔɪ/g, "oi"], [/ɪə/g, "ia"], [/eə/g, "ea"], [/ʊə/g, "ua"], [/ɐ/g, "a"], [/ə/g, "e"],
    [/ʌ/g, "a"], [/æ/g, "a"], [/ɑ/g, "a"], [/ɒ/g, "o"],
    [/ɔ/g, "o"], [/ɛ/g, "e"], [/ɪ/g, "i"], [/i/g, "i"],
    [/ʊ/g, "u"], [/u/g, "u"], [/ɜː?/g, "er"],
    [/ɡ/g, "g"], [/r/g, "r"], [/w/g, "u"], [/v/g, "v"],
    [/ð/g, "d"], [/z/g, "z"], [/s/g, "s"], [/ʔ/g, ""]
  ];
  for (const [pattern, sound] of rules) value = value.replace(pattern, sound);
  value = value.replace(/[^a-zñ]/gi, "").replace(/([aeiou])\1+/g, "$1");
  value = value.replace(/^e/, "a").replace(/e$/, "a");

  // Add syllable breaks between vowel nuclei, keeping English digraphs intact.
  // Example: fiucha -> fiu-cha; jelou -> je-lou.
  const nuclei = [...value.matchAll(/[aeiou]+/g)];
  const breaks: number[] = [];
  for (let i = 0; i < nuclei.length - 1; i += 1) {
    const end = (nuclei[i].index ?? 0) + nuclei[i][0].length;
    const nextStart = nuclei[i + 1].index ?? end;
    const cluster = value.slice(end, nextStart);
    if (!cluster) continue;
    const digraphStart = cluster.search(/ch|sh|zh|ng/);
    const splitAt = digraphStart >= 0 ? end + digraphStart : cluster.length > 1 ? nextStart - 1 : end;
    breaks.push(splitAt);
  }
  for (const position of breaks.reverse()) {
    value = value.slice(0, position) + "-" + value.slice(position);
  }
  return value || "";
}

export default function CanonicalMission({ missionData = missionSource as Mission }: { missionData?: Mission }) {
  const mission = missionData;
  const exploreTranslations = useMemo(() => {
    const normalise = (value: string) => value.toLocaleLowerCase("en-GB").replace(/[“”]/g, '"').replace(/[.!?…]/g, "").replace(/\s+/g, " ").trim();
    const translations = new Map<string, string>();
    const add = (english?: string, spanish?: string, overwrite = false) => {
      if (!english?.trim() || !spanish?.trim()) return;
      const value = spanish.trim();
      if (/^(frase|expresión|texto|modelo|estructura|repaso|práctica|practica|contenido|significado|saludar|despedirse|preguntar|responder|expresar|reconocer|identificar|presentar|hablar|usar|utilizar|distinguir|aprender|comprender|observar|leer|elegir|decir|describir|fórmula|regla|concordancia|orden de las palabras)/i.test(value)) return;
      const key = normalise(english);
      if (overwrite || !translations.has(key)) translations.set(key, value);
    };
    mission.sections.forEach((currentSection) => {
      currentSection.exercise.items.forEach((entry) => {
        add(entry.english, entry.spanish);
        add(entry.word, entry.translation);
        add(entry.modelAnswer, entry.translation);
        add(entry.prompt, entry.translation);
        entry.options?.forEach((option, index) => add(option, entry.optionTranslations?.[index]));
        add(entry.answer, entry.answerTranslation);
        const prompt = entry.prompt ?? "";
        const translatedPhrase = prompt.match(/(?:Traduce la frase:|¿Qué significa)\s*[“"](.+?)[”"]\??$/i)?.[1];
        if (translatedPhrase && entry.options?.[0]) add(translatedPhrase, entry.options[0]);
      });
      const lesson = currentSection.exercise.lesson;
      if (lesson) Object.values(lesson).forEach((entries) => {
        if (Array.isArray(entries)) entries.forEach((entry) => add(entry.english, entry.spanish));
      });
      const content = currentSection.exercise.content as (typeof currentSection.exercise.content & { translation?: string }) | undefined;
      add(content?.audioTranscript ?? content?.passage, content?.translation);
      currentSection.exercise.content?.blocks?.forEach((block) => add(block.example, block.translation));
      currentSection.exercise.theory?.patterns.forEach((pattern) => {
        if (typeof pattern !== "string") {
          add(pattern.pattern, pattern.translation, true);
          pattern.examples?.forEach((example, index) => add(example, pattern.exampleTranslations?.[index], true));
        }
      });
    });
    Object.entries(PRE_A1_EXAMPLE_TRANSLATIONS).forEach(([english, spanish]) => add(english, spanish));
    Object.entries(C1_EXPLORATION_TRANSLATIONS).forEach(([english, spanish]) => add(english, spanish, true));
    Object.entries(C1_PRACTICE_WORD_TRANSLATIONS).forEach(([english, spanish]) => add(english, spanish, true));
    Object.entries(C1_PRACTICE_EXTRA_WORD_TRANSLATIONS).forEach(([english, spanish]) => add(english, spanish, true));
    Object.entries(C1_PRACTICE_EXTRA_WORD_TRANSLATIONS_2).forEach(([english, spanish]) => add(english, spanish, true));
    Object.entries(C1_PRACTICE_EXTRA_WORD_TRANSLATIONS_3).forEach(([english, spanish]) => add(english, spanish, true));
    return translations;
  }, [mission]);
  const getExampleTranslation = (english: string) => exploreTranslations.get(english.toLocaleLowerCase("en-GB").replace(/[“”]/g, '"').replace(/[.!?…]/g, "").replace(/\s+/g, " ").trim());
  const resolveSpanish = (english?: string, spanish?: string) => {
    const isPlaceholder = !spanish?.trim() || /^(frase|expresión|texto|modelo|estructura|patrón gramatical|repaso|práctica|practica|contenido|significado|saludar|despedirse|preguntar|responder|expresar|reconocer|identificar|presentar|hablar|usar|utilizar|distinguir|aprender|comprender|observar|leer|elegir|decir|describir)/i.test(spanish);
    return isPlaceholder ? (english ? getExampleTranslation(english) : undefined) ?? "Traducción pendiente de revisión académica." : spanish;
  };
  const wordTranslations = useMemo(() => {
    const words = new Map<string, string>();
    exploreTranslations.forEach((translation, english) => {
      if (/^[\p{L}]+(?:['’][\p{L}]+)?$/u.test(english)) words.set(english, translation);
    });
    // Vocabulario funcional frecuente en los enunciados de Practice C1.
    const promptWords: Record<string, string> = {
      phrase: "frase / expresión", phrases: "frases / expresiones",
      meaning: "significado", meanings: "significados",
      choose: "elegir", chooses: "elige", chosen: "elegido", choosing: "elección",
      complete: "completar", completes: "completa", completed: "completado",
      collocation: "colocación léxica", collocations: "colocaciones léxicas",
      closest: "más parecido", correct: "correcto",
      answer: "respuesta", answers: "respuestas",
      select: "seleccionar", selected: "seleccionado",
      find: "buscar / encontrar", refers: "se refiere", referred: "mencionado / referido",
      expression: "expresión", expressions: "expresiones",
      concept: "concepto", precisely: "con precisión",
      statement: "afirmación", statements: "afirmaciones",
      claim: "afirmación", claims: "afirmaciones",
      reformulate: "reformular", reformulation: "reformulación",
      linker: "conector", linkers: "conectores",
      reading: "lectura / texto", text: "texto",
      writer: "autor", case: "caso", study: "estudio",
      belief: "creencia", experience: "experiencia", position: "postura",
      reflects: "refleja", best: "mejor", most: "más",
      appropriately: "adecuadamente", hedged: "matizada / expresada con cautela",
      what: "qué", which: "cuál / qué", why: "por qué", how: "cómo",
      does: "auxiliar interrogativo", mean: "significar",
      suggest: "sugerir", suggests: "sugiere",
      distinction: "distinción", process: "proceso",
      signals: "indica", uncertainty: "incertidumbre",
      account: "relato / explicación", paraphrase: "paráfrasis",
      indicate: "indicar", indicates: "indica",
      identify: "identificar", identifies: "identifica", term: "término"
    };
    Object.entries(promptWords).forEach(([english, spanish]) => words.set(english, spanish));
    return words;
  }, [exploreTranslations]);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const renderTranslatedWords = (text?: string) => {
    if (!text) return text;
    return text.split(/([\p{L}]+(?:['’][\p{L}]+)?)/gu).map((part, index) => {
      // Conserva los espacios como separadores reales entre las palabras interactivas.
      if (/^\s+$/u.test(part)) return part;
      if (!/[\p{L}]/u.test(part)) return part;
      // Si no existe traducción aislada, usa la traducción del término o frase completa.
      // Así cada palabra de una expresión inglesa mantiene acceso a su significado contextual.
      const translation = wordTranslations.get(part.toLocaleLowerCase("en-GB")) ?? getExampleTranslation(text);
      if (!translation) return part;
      const wordId = `${index}:${part.toLocaleLowerCase("en-GB")}`;
      const isOpen = hoveredWord === wordId;
      return (
        <button
          key={`${wordId}:${part}`}
          type="button"
          aria-label={`${part}: ${translation}`}
          aria-expanded={isOpen}
          onMouseEnter={() => setHoveredWord(wordId)}
          onMouseLeave={() => setHoveredWord((current) => current === wordId ? null : current)}
          onFocus={() => setHoveredWord(wordId)}
          onBlur={() => setHoveredWord((current) => current === wordId ? null : current)}
          onClick={() => setHoveredWord(wordId)}
          className="relative inline cursor-help border-0 border-b border-dotted border-[#7895b5] bg-transparent p-0 align-baseline [font:inherit] text-inherit"
        >
          {part}
          {isOpen && (
            <span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-max max-w-56 -translate-x-1/2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium leading-5 text-white shadow-lg">
              {translation}
            </span>
          )}
        </button>
      );
    });
  };
  const getPromptTranslation = (prompt?: string) => {
    if (!prompt?.trim()) return undefined;
    const exact = getExampleTranslation(prompt);
    if (exact) return exact;
    const value = prompt.trim();
    const meaning = value.match(/^Choose the Spanish meaning of [“"](.+?)[”"]\.?$/i);
    if (meaning) return `Elige el significado en español de «${meaning[1]}».`;
    const find = value.match(/^Find [“"](.+?)[”"] in the reading text\.?$/i);
    if (find) return `Busca «${find[1]}» en el texto de lectura.`;
    if (/^Say the English sentence aloud\.?$/i.test(value)) return "Di la frase en inglés en voz alta.";
    if (/^Say the sentence\./i.test(value)) return "Di la frase en voz alta. Utiliza el modelo como ayuda.";
    if (/^Listen and complete\.?$/i.test(value)) return "Escucha y completa.";
    if (/^Choose the correct answer\.?$/i.test(value)) return "Elige la respuesta correcta.";
    if (/^Select the correct answer\.?$/i.test(value)) return "Selecciona la respuesta correcta.";
    if (/^Complete:/i.test(value)) return value.replace(/^Complete:/i, "Completa:");
    if (/^Choose:/i.test(value)) return value.replace(/^Choose:/i, "Elige:");
    const closest = value.match(/^Choose the closest meaning of [“"](.+?)[”"]\.?$/i);
    if (closest) return `Elige el significado más parecido de «${closest[1]}».`;
    const collocation = value.match(/^Complete the collocation:\s*[“"](.+?)[”"]\.?$/i);
    if (collocation) return `Completa la colocación léxica: «${collocation[1]}».`;
    const meaningOf = value.match(/^Choose the meaning of [“"](.+?)[”"]\.?$/i);
    if (meaningOf) return `Elige el significado de «${meaningOf[1]}».`;
    const caseStudy = value.match(/^In a case study of (.+?), the writer refers to (.+?)\. Which expression names this concept most precisely\?$/i);
    if (caseStudy) {
      const topic = caseStudy[1].replace(/\s*,\s*/g, ", ");
      const description = caseStudy[2].replace(/[“”]/g, '"');
      return `En un estudio de caso sobre ${topic}, el autor se refiere a «${description}». ¿Qué expresión nombra este concepto con mayor precisión?`;
    }
    const chooseClaim = value.match(/^Choose the (.+?) claim\.?$/i);
    if (chooseClaim) return `Elige la afirmación ${chooseClaim[1] === "most appropriately hedged" ? "mejor matizada y expresada con cautela" : chooseClaim[1]}.`;
    const reformulate = value.match(/^Reformulate [“"](.+?)[”"] (.+?)\.?$/i);
    if (reformulate) return `Reformula «${reformulate[1]}» ${reformulate[2]}.`;
    const bestLinker = value.match(/^Choose the best linker:\s*[“"](.+?)[”"]\.?$/i);
    if (bestLinker) return `Elige el mejor conector: «${bestLinker[1]}».`;
    const completeQuoted = value.match(/^Complete:\s*[“"](.+?)[”"]\.?$/i);
    if (completeQuoted) return `Completa: «${completeQuoted[1]}».`;
    const closestExpression = value.match(/^Which statement best (.+?)\?$/i);
    if (closestExpression) return `¿Qué afirmación ${closestExpression[1] === "reflects the reading's position" ? "refleja mejor la postura del texto" : closestExpression[1]}?`;
    return undefined;
  };
  const sectionLabel = (key: string) => mission.course.level.toUpperCase() === "B1" && key === "practice" ? "Vocabulary" : labels[key] ?? key;
  const [sectionKey, setSectionKey] = useState("explore");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [optionOrders, setOptionOrders] = useState<Record<string, string[]>>({});
  const [optionsReady, setOptionsReady] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, string>>({});
  const [selectedListeningWord, setSelectedListeningWord] = useState("");
  const [draft, setDraft] = useState("");
  const [dictationPlaying, setDictationPlaying] = useState(false);
  const [dictationPaused, setDictationPaused] = useState(false);
  const [dictationSegment, setDictationSegment] = useState(0);
  const [dictationRepeat, setDictationRepeat] = useState(0);
  const [dictationMessage, setDictationMessage] = useState("");
  const [dictationHintLevel, setDictationHintLevel] = useState(0);
  const dictationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dictationRunRef = useRef(0);
  const [recording, setRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState("");
  const [recordingMessage, setRecordingMessage] = useState("");
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (recordedUrl) URL.revokeObjectURL(recordedUrl);
  }, [recordedUrl]);

  useEffect(() => {
    const nextOrders: Record<string, string[]> = {};
    for (const currentSection of mission.sections) {
      const questions = currentSection.exercise.items.filter((entry) => entry.options?.length);
      const positionsByItem: Record<string, number> = {};
      const groups = new Map<number, Item[]>();
      for (const question of questions) {
        const optionCount = question.options?.length ?? 0;
        const group = groups.get(optionCount) ?? [];
        group.push(question);
        groups.set(optionCount, group);
      }
      for (const [optionCount, group] of groups) {
        const remaining = Array.from({ length: optionCount }, (_, position) =>
          Math.floor(group.length / optionCount) + (position < group.length % optionCount ? 1 : 0)
        );
        const sequence: number[] = [];
        let previous = -1;
        while (sequence.length < group.length) {
          let candidates = remaining.map((count, position) => ({ count, position }))
            .filter(({ count, position }) => count > 0 && position !== previous);
          if (!candidates.length) {
            candidates = remaining.map((count, position) => ({ count, position })).filter(({ count }) => count > 0);
          }
          const highestRemaining = Math.max(...candidates.map(({ count }) => count));
          const best = candidates.filter(({ count }) => count === highestRemaining);
          const selected = best[Math.floor(Math.random() * best.length)].position;
          sequence.push(selected);
          remaining[selected] -= 1;
          previous = selected;
        }
        group.forEach((entry, questionIndex) => { positionsByItem[entry.itemId] = sequence[questionIndex]; });
      }
      questions.forEach((entry, questionIndex) => {
        const options = [...(entry.options ?? [])];
        const correct = entry.answer && options.includes(entry.answer) ? entry.answer : mission.course.level.toUpperCase() === "PRE-A1" ? options[0] : undefined;
        if (!correct || new Set(options).size !== options.length) return;
        const distractors = options.filter((option) => option !== correct);
        for (let i = distractors.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
        }
        const shuffled = [...distractors];
        const correctPosition = Math.min((positionsByItem[entry.itemId] ?? 0) % options.length, shuffled.length);
        shuffled.splice(correctPosition, 0, correct);
        nextOrders[entry.itemId] = shuffled;
      });
    }
    setOptionOrders(nextOrders);
    setOptionsReady(true);
  }, [mission]);

  const getOptions = (entry: Item) => optionOrders[entry.itemId] ?? entry.options ?? [];
  const getCorrectAnswer = (entry: Item) => entry.answer ?? (mission.course.level.toUpperCase() === "PRE-A1" ? entry.options?.[0] : "") ?? "";

  useEffect(() => () => {
    dictationRunRef.current += 1;
    if (dictationTimerRef.current) clearTimeout(dictationTimerRef.current);
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  function stopDictation() {
    dictationRunRef.current += 1;
    if (dictationTimerRef.current) clearTimeout(dictationTimerRef.current);
    dictationTimerRef.current = null;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setDictationPlaying(false); setDictationPaused(false);
    setDictationMessage("Dictado detenido. Puedes volver a escucharlo cuando quieras.");
  }

  function startDictation() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) { setDictationMessage("Este navegador no dispone de reproducción de voz."); return; }
    const segments = item?.segments?.map((segment) => segment.text) ?? [item?.expectedAnswer ?? ""];
    if (!segments.length || !segments.every((segment) => segment.trim())) return;
    stopDictation();
    const run = dictationRunRef.current;
    let segmentIndex = 0;
    let repetition = 0;
    const repeatCount = item?.repeatCount ?? 3;
    setDictationSegment(0); setDictationRepeat(0); setDictationPlaying(true); setDictationPaused(false);
    setDictationMessage("Escucha con atención. Cada fragmento se repetirá tres veces.");
    const playCurrentSegment = () => {
      if (run !== dictationRunRef.current) return;
      repetition += 1; setDictationSegment(segmentIndex); setDictationRepeat(repetition);
      const utterance = new SpeechSynthesisUtterance(segments[segmentIndex]);
      utterance.lang = item?.audioLocale ?? "en-GB";
      utterance.rate = repetition === 2 ? 0.78 : 0.92;
      const britishVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase() === "en-gb");
      if (britishVoice) utterance.voice = britishVoice;
      utterance.onend = () => {
        if (run !== dictationRunRef.current) return;
        if (repetition < repeatCount) dictationTimerRef.current = setTimeout(playCurrentSegment, 900);
        else if (segmentIndex < segments.length - 1) { segmentIndex += 1; repetition = 0; dictationTimerRef.current = setTimeout(playCurrentSegment, 1300); }
        else { setDictationPlaying(false); setDictationPaused(false); setDictationMessage("Dictado terminado. Revisa lo que has escrito antes de comprobarlo."); }
      };
      utterance.onerror = () => { if (run !== dictationRunRef.current) return; setDictationPlaying(false); setDictationPaused(false); setDictationMessage("No se pudo completar el audio. Puedes intentarlo de nuevo."); };
      window.speechSynthesis.speak(utterance);
    };
    playCurrentSegment();
  }

  function pauseDictation() { if (!dictationPlaying || dictationPaused) return; window.speechSynthesis.pause(); setDictationPaused(true); }
  function resumeDictation() { if (!dictationPaused) return; window.speechSynthesis.resume(); setDictationPaused(false); }
  async function startRecording() {
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
        setRecordingMessage("Este navegador no permite grabar audio."); return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => { if (event.data.size) chunksRef.current.push(event.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        setRecordedUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        setRecordingMessage("Grabación guardada temporalmente en esta página. No se ha enviado al servidor.");
      };
      recorder.start(); setRecording(true); setRecordingMessage("Grabando… habla cuando estés preparado.");
    } catch {
      setRecordingMessage("No se pudo acceder al micrófono. Revisa los permisos del navegador.");
    }
  }

  function stopRecording() {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    setRecording(false);
  }
  const section = mission.sections.find((item) => item.sectionKey === sectionKey) ?? mission.sections[0];
  const activeItems = section.exercise.items;
  const item = activeItems[index];
  // Baraja las opciones por pregunta sin separar la respuesta correcta de su texto.
  const shuffledOptions = useMemo(() => {
    if (!item?.options?.length) return [];
    if (mission.course.level.toUpperCase() !== "B1") return item.options;
    const options = [...item.options];
    for (let i = options.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }, [item?.itemId, item?.options]);
  const preA1Audio = mission.course.level.toUpperCase() === "PRE-A1" ? { audioTranscript: section.exercise.content?.audioTranscript ?? "", template: section.exercise.content?.transcriptTemplate ?? "", words: (section.exercise.content?.wordBank ?? []).map((entry) => entry.word) } : undefined;
  const listeningAudioTranscript = preA1Audio?.audioTranscript ?? section.exercise.content?.audioTranscript ?? "";
  const listeningTemplate = preA1Audio?.template ?? section.exercise.content?.transcriptTemplate ?? "";
  const listeningWordBank = preA1Audio
    ? preA1Audio.words.map((word, index) => ({ wordId: `pre-a1-m${String(mission.mission.position).padStart(3, "0")}-listening-word-${String(index + 1).padStart(2, "0")}`, word }))
    : section.exercise.content?.wordBank ?? [];
  const listeningItems = preA1Audio
    ? preA1Audio.words.map((_, index) => ({ itemId: `pre-a1-m${String(mission.mission.position).padStart(3, "0")}-listening-item-${String(index + 1).padStart(2, "0")}`, position: index + 1, gapToken: `[[gap-${String(index + 1).padStart(2, "0")}]]`, expectedWordId: `pre-a1-m${String(mission.mission.position).padStart(3, "0")}-listening-word-${String(index + 1).padStart(2, "0")}` }))
    : section.exercise.items;
  const getListeningAnswer = (entry: (typeof listeningItems)[number]) => {
    if ("answer" in entry && entry.answer) return entry.answer;
    if ("expectedWordId" in entry && entry.expectedWordId) {
      return listeningWordBank.find((word) => word.wordId === entry.expectedWordId)?.word ?? "";
    }
    return "";
  };
  const pronunciationSection = mission.sections.find((entry) => entry.sectionKey === "pronunciation");
  const exploreItems = mission.sections.find((entry) => entry.sectionKey === "explore")?.exercise.items ?? [];
  const pronunciationByWord = new Map<string, string>();
  [...exploreItems, ...(pronunciationSection?.exercise.items ?? [])].forEach((entry) => {
    const sourceWords = (entry.word ?? entry.english ?? "").toLowerCase().match(/[a-z]+(?:['’][a-z]+)?/g) ?? [];
    const guideWords = (entry.pronunciationGuide ?? "").trim().split(/\s+/).filter(Boolean);
    if (!sourceWords.length || !guideWords.length) return;
    sourceWords.forEach((word, wordIndex) => {
      const remainingWords = sourceWords.length - wordIndex;
      const remainingGuide = guideWords.length - wordIndex;
      const take = wordIndex === sourceWords.length - 1 ? remainingGuide : Math.max(1, remainingGuide - (remainingWords - 1));
      const guide = guideWords.slice(wordIndex, wordIndex + take).join(" ");
      if (guide && !pronunciationByWord.has(word)) pronunciationByWord.set(word, guide);
    });
  });
  const progress = useMemo(() => activeItems.length ? Math.round(((index + (checked ? 1 : 0)) / activeItems.length) * 100) : 0, [index, checked, activeItems.length]);

  function changeSection(key: string) {
    stopDictation();
    setSectionKey(key); setIndex(0); setFeedback(""); setChecked(false); setDraft(""); setDictationHintLevel(0); setListeningAnswers({}); setSelectedListeningWord(""); setScore(0);
  }
  function mark(correct: boolean, expected: string) {
    if (checked) return;
    setChecked(true);
    setFeedback(correct ? "¡Correcto!" : `Respuesta correcta: ${expected}`);
    if (correct) setScore((value) => value + 1);
  }
  function next() {
    stopDictation();
    if (index === activeItems.length - 1) {
      setFeedback("Sección completada. Has llegado al final de las actividades.");
      return;
    }
    setIndex((value) => value + 1);
    setChecked(false); setFeedback(""); setDraft(""); setDictationHintLevel(0);
  }

  return (
    <div className="mx-auto w-full max-w-5xl text-[#172033]">
      <header className="relative mb-6 overflow-hidden rounded-[26px] border border-[#e8ebf0] bg-white p-6 shadow-[0_12px_34px_rgba(25,42,70,0.045)] sm:p-8">
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#55779d]">LINGUAFLY ACADEMY <span className="px-1 text-[#c1c9d3]">/</span> NIVEL {mission.course.level}</p>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div><h1 className="mt-2 text-3xl font-semibold tracking-[-.04em] text-[#172033]">{mission.mission.title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#718096]">{mission.unit.title}</p><p className="mt-3 text-xs text-[#8792a3]">Avanza a tu ritmo. Puedes cambiar de sección cuando quieras.</p></div>
          <span className="rounded-full border border-[#e8ebf0] bg-[#f8fafc] px-3 py-1.5 text-xs font-semibold text-[#64748b]">MISIÓN {String(mission.mission.position ?? 1).padStart(3, "0")}</span>
        </div>
      </header>
      <nav aria-label="Secciones de la misión" className="mb-5 flex gap-2 overflow-x-auto rounded-2xl border border-[#e8ebf0] bg-white p-2 pb-3 shadow-[0_6px_20px_rgba(25,42,70,0.025)]">
        {mission.sections.map((entry, i) => <button key={entry.sectionId} onClick={() => changeSection(entry.sectionKey)} className={`shrink-0 rounded-xl border px-3 py-2.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#557da8] ${sectionKey === entry.sectionKey ? "border-[#183b67] bg-[#183b67] text-white shadow-sm" : "border-transparent bg-[#f7f8fa] text-[#647087] hover:border-[#dce4ed] hover:bg-[#f0f4f8]"}`}><span className="mr-1.5 text-xs opacity-70">{String(i + 1).padStart(2, "0")}</span>{sectionLabel(entry.sectionKey)}</button>)}
      </nav>
      <section className="rounded-[26px] border border-[#e8ebf0] bg-white p-5 shadow-[0_12px_34px_rgba(25,42,70,0.04)] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#8290a3]">ETAPA {String(section.position).padStart(2, "0")} DE 08</p><h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#172033]">{sectionLabel(section.sectionKey) || section.title}</h2><p className="mt-1 text-xs text-[#8792a3]">{sectionKey === "explore" ? "Explicación visual y traducción de todo el temario." : "Practica lo que has aprendido en Exploración."}</p></div>
          <span className="rounded-full bg-[#f3f6fa] px-3 py-1.5 text-xs font-semibold text-[#65758b]">{sectionKey === "explore" ? "Temario completo" : `${activeItems.length} actividades`}</span>
        </div>
        {sectionKey !== "explore" && <div className="mt-5" aria-label="Progreso de la sección"><div className="mb-2 flex justify-between text-[11px] font-medium text-[#8792a3]"><span>Tu avance en esta etapa</span><span className="tabular-nums">{sectionKey === "listening" ? Object.keys(listeningAnswers).length * 10 : progress}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#edf0f4]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={sectionKey === "listening" ? Object.keys(listeningAnswers).length * 10 : progress}><div className="h-full rounded-full bg-[#557da8] transition-all duration-300" style={{ width: `${sectionKey === "listening" ? Object.keys(listeningAnswers).length * 10 : progress}%` }} /></div></div>}
        {section.exercise.theory && sectionKey !== "explore" && <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5"><h3 className="font-semibold">{section.exercise.theory.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{section.exercise.theory.explanation}</p><ul className="mt-4 grid gap-2 text-sm text-slate-700">{section.exercise.theory.patterns.map((pattern, i) => <li key={typeof pattern === "string" ? pattern : pattern.label ?? pattern.pattern ?? i}>• {typeof pattern === "string" ? pattern : pattern.pattern}</li>)}</ul><p className="mt-4 text-sm text-slate-600"><strong>Consejo:</strong> {section.exercise.theory.tip}</p><div className="mt-4 grid gap-2 sm:grid-cols-3">{section.exercise.theory.patterns.map((pattern, i) => <div key={typeof pattern === "string" ? pattern : pattern.label ?? pattern.pattern ?? i} className="rounded-lg border border-slate-200 bg-white p-3 text-sm"><p className="font-medium">{typeof pattern === "string" ? pattern : pattern.pattern}</p>{typeof pattern !== "string" && pattern.examples?.length ? <p className="mt-1 text-slate-500">{pattern.examples.join(" · ")}</p> : null}</div>)}</div></div>}
        {section.exercise.content?.passage && !(mission.course.level === "C1" && sectionKey === "explore") && <article className="mt-6 rounded-xl bg-slate-50 p-5 text-base leading-8 text-slate-700">{section.exercise.content?.passage}</article>}
        {sectionKey === "explore" && <div className="mt-7 space-y-8">
          <div className="rounded-2xl border border-[#dce8f4] bg-gradient-to-br from-[#f3f8fd] to-white p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#55779d]">ANTES DE PRACTICAR</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#203752]">Primero comprende. Después practica.</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#61738a]">Aquí encontrarás únicamente el vocabulario y la gramática que trabajarás en esta misión. Después podrás aplicar estos contenidos en las actividades.</p><p className="mt-2 text-xs leading-5 text-[#8792a3]">Aviso: los botones de escucha usan voz sintética del navegador; todavía no representan grabaciones de audio reales revisadas por el equipo académico.</p>
          </div>

          {mission.course.level !== "C1" && (() => {
            const readingContent = mission.sections.find((entry) => entry.sectionKey === "reading")?.exercise.content as { passage?: string; passageTranslation?: string } | undefined;
            const listeningContent = mission.sections.find((entry) => entry.sectionKey === "listening")?.exercise.content as { audioTranscript?: string; audio?: string; translation?: string } | undefined;
            const listeningText = (listeningContent?.audioTranscript ?? listeningContent?.audio ?? "").replace(/^tts:en-GB:/, "");
            return <>
              {readingContent?.passage && <section className="rounded-2xl border border-[#e8ebf0] bg-white p-5">
                <div className="mb-3"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">LECTURA COMPLETA</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Lee en inglés y consulta el significado</h3></div>
                <p className="whitespace-pre-line text-sm leading-7 text-[#26364b]">{renderTranslatedWords(readingContent.passage)}</p>
                {readingContent.passageTranslation && <p className="mt-3 whitespace-pre-line border-t border-[#e8ebf0] pt-3 text-sm leading-7 text-[#47745b]">{readingContent.passageTranslation}</p>}
              </section>}
              {listeningText && <section className="rounded-2xl border border-[#e8ebf0] bg-[#fbfcfe] p-5">
                <div className="mb-3"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">DIÁLOGO COMPLETO</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Comprende lo que vas a escuchar</h3></div>
                <p className="whitespace-pre-line text-sm leading-7 text-[#26364b]">{renderTranslatedWords(listeningText)}</p>
                {listeningContent?.translation && <p className="mt-3 whitespace-pre-line border-t border-[#e8ebf0] pt-3 text-sm leading-7 text-[#47745b]">{listeningContent?.translation}</p>}
                <button type="button" onClick={() => speak(listeningText)} className="mt-3 rounded-full border border-[#dce6f0] bg-white px-3 py-2 text-xs font-semibold text-[#55708f]">♫ Escuchar diálogo</button>
              </section>}
            </>;
          })()}

          {section.exercise.items.length > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">01 · VOCABULARIO</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Palabras esenciales</h3><p className="mt-1 text-sm text-[#7b8798]">Mira cada imagen, lee su significado y escucha cómo suena en inglés.</p></div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {section.exercise.items.map((entry) => {
                const visual: Record<string,string> = {
                  hello:"👋",goodbye:"👋",please:"🙏","thank you":"💛",yes:"👍",no:"👎",name:"🪪",friend:"🧑‍🤝‍🧑",teacher:"👩‍🏫",student:"🎒",
                  red:"🔴",blue:"🔵",yellow:"🟡",green:"🟢",black:"⚫",white:"⚪",orange:"🟠",pink:"🩷",purple:"🟣",brown:"🟤",
                  mother:"👩",father:"👨",sister:"👧",brother:"👦",grandmother:"👵",grandfather:"👴",parents:"👨‍👩‍👧",daughter:"👧",son:"👦",family:"👨‍👩‍👧‍👦",
                  dog:"🐶",cat:"🐱",bird:"🐦",fish:"🐟",rabbit:"🐰",horse:"🐴",cow:"🐮",duck:"🦆",sheep:"🐑",lion:"🦁",
                  apple:"🍎",bread:"🍞",cheese:"🧀",rice:"🍚",chicken:"🍗",banana:"🍌",water:"💧",milk:"🥛",juice:"🧃",carrot:"🥕",
                  book:"📘",pen:"🖊️",pencil:"✏️",ruler:"📏",rubber:"🧽",schoolbag:"🎒",notebook:"📓",desk:"🪑",chair:"🪑","pencil case":"🖍️",
                  head:"🙂",hair:"💇",eye:"👁️",ear:"👂",nose:"👃",mouth:"👄",tooth:"🦷",hand:"✋",arm:"💪",leg:"🦵",
                  house:"🏠",kitchen:"🍳",bedroom:"🛏️",bathroom:"🛁","living room":"🛋️",table:"🪑",bed:"🛏️",sofa:"🛋️",door:"🚪",window:"🪟",
                  "wake up":"⏰","get up":"🛌",wash:"🧼",brush:"🪥",eat:"🍽️",drink:"🥤",go:"🚶",study:"📚",play:"🧸",sleep:"😴",
                  run:"🏃",jump:"🤸",climb:"🧗",swing:"🛝",slide:"🛝",stop:"🛑",walk:"🚶",hop:"🐇",skip:"🦘",breakfast:"🍳",cereal:"🥣",toast:"🍞",egg:"🥚",yoghurt:"🥛",pancake:"🥞",waffle:"🧇",porridge:"🥣",tea:"🍵",sandwich:"🥪",coffee:"☕",lemonade:"🍋",cocoa:"☕",moo:"🐮",quack:"🦆",rooster:"🐓",turkey:"🦃",farm:"🚜",barn:"🏚️",field:"🌾",farmer:"👩‍🌾",goat:"🐐",hen:"🐔",tractor:"🚜",silo:"🏭",shark:"🦈",whale:"🐋",dolphin:"🐬",octopus:"🐙",crab:"🦀",turtle:"🐢",seal:"🦭",jellyfish:"🪼",seahorse:"🐴",bee:"🐝",butterfly:"🦋",ant:"🐜",spider:"🕷️",ladybird:"🐞",caterpillar:"🐛",mosquito:"🦟",beetle:"🪲",dragonfly:"🪰",grasshopper:"🦗",tiger:"🐯",elephant:"🐘",giraffe:"🦒",monkey:"🐒",zebra:"🦓",bear:"🐻",rhino:"🦏",hippo:"🦛",crocodile:"🐊",in:"📦",on:"📚",under:"⬇️","next to":"↔️",behind:"🚪","in front of":"➡️",above:"⬆️",below:"⬇️",inside:"📦",outside:"🏡",baby:"👶",aunt:"👩",uncle:"👨",cousin:"🧑",boy:"👦",girl:"👧",child:"🧒",man:"👨",woman:"👩",eyes:"👀",neighbour:"🏠",person:"🧑",face:"🙂",curly:"🌀",straight:"➡️",blonde:"👱",wear:"👕","put on":"🧥","take off":"🧥",shoes:"👟",coat:"🧥",hat:"🧢",button:"🔘",zip:"🤐",tie:"👔",fold:"📄",clean:"🧽",soap:"🧼",towel:"🧻",tidy:"🧹",dirty:"🫧",sponge:"🧽",broom:"🧹",mop:"🪣",bath:"🛁",shower:"🚿",toothbrush:"🪥",toothpaste:"🦷",shampoo:"🧴",hands:"👐",flannel:"🧽",razor:"🪒",comb:"💇",mirror:"🪞","lunch":"🥪","clock":"🕒","birthday":"🎂","cake":"🍰","candle":"🕯️","present":"🎁","card":"💌","guest":"🧑","invitation":"💌","wish":"🌠","decorate":"🎨","chocolate":"🍫","party":"🎉","balloon":"🎈","music":"🎵","dance":"💃","gift":"🎁","confetti":"🎊","streamer":"🎀","banner":"🏳️","favourite":"⭐","like":"👍","love":"❤️","don't like":"👎","toys":"🧸","food":"🍽️","animals":"🐾","best":"🏆","worst":"👎","game":"🎮","can":"👍","can't":"👎","swim":"🏊","sing":"🎤","fly":"🪽","cook":"🍳" ,"skate":"⛸️","football":"⚽","basketball":"🏀","tennis":"🎾","sport":"🏅","team":"👥","ball":"⚽","racket":"🎾","goal":"🥅","win":"🏆","start":"▶️","medal":"🥇","player":"🏃","race":"🏁","car":"🚗","bus":"🚌","train":"🚆","bike":"🚲","boat":"🚤","plane":"✈️","taxi":"🚕","station":"🚉","driver":"🧑‍✈️","ticket":"🎫","road":"🛣️","traffic light":"🚦","cross":"🚶","safe":"🦺","wait":"⏳","school":"🏫","park":"🌳","shop":"🏪","hospital":"🏥","library":"📚","supermarket":"🛒","town":"🏘️","place":"📍","country":"🌍","nationality":"🌍","phone number":"📱","email address":"✉️","date of birth":"🎂","first":"1️⃣","twenty":"🔢","meet":"🤝","check":"☑️","complete":"✅","street":"🛣️","tall":"🧍","short":"🧍","slim":"🧍","well-built":"💪","curly hair":"🌀","straight hair":"💇","wavy hair":"〰️","shoulder-length hair":"💇","fair hair":"👱","dark hair":"👩","bald":"👨‍🦲","a beard":"🧔","moustache":"👨","glasses":"👓","freckles":"🟤","in her thirties":"👩","friendly":"😊","shy":"😳","confident":"😎","hard-working":"💼","quite":"💬","rather":"💬","a little":"🤏","look like":"👀","be like":"🧑","both":"👥","similar":"🟰","different":"↔️","appearance":"🪞","kind":"💛","funny":"😂","quiet":"🤫","clever":"🧠","helpful":"🤝","generous":"🎁","honest":"🤝","polite":"🙏","rude":"😠","lazy":"🛋️","careful":"⚠️","careless":"🤦","brave":"🦁","talkative":"🗣️","serious":"😐","creative":"🎨","usually":"🔁","sometimes":"🔄","never":"🚫","always":"♾️","often":"🔁","patient with":"🧘","good at":"🏅","bad at":"👎","get on well with":"🤝","because":"💬","life experience":"🌍","achievement":"🏆","memory":"🧠","childhood":"🧒","opportunity":"🚪","challenge":"🧗","journey":"🧭","recently":"🕒","so far":"📈","in the past":"🕰️","grow up":"🌱","take part in":"🙋","achieve":"🏆","improve":"📈","move abroad":"✈️","learn from":"📚","be proud of":"🏅","once":"1️⃣","several times":"🔁","travel abroad":"🌍","make friends":"🧑‍🤝‍🧑","find out":"🔎","look back":"↩️","at first":"1️⃣","eventually":"⏳","make progress":"📈","be interested in":"❤️","spend time":"⏰","experience":"🌍","first name":"🪪","surname":"🪪","age":"🎂","years old":"🎂","address":"🏠","city":"🏙️","personal details":"🪪","form":"📋","write":"✍️","welcome desk":"🛎️","classmate":"🧑‍🤝‍🧑","nice to meet you":"🤝","everyone":"👥","introduce":"🗣️","children":"🧒","photo":"📷","classroom":"🏫","board":"📋","eraser":"🧽","computer":"💻","monday":"📅","tuesday":"📅","wednesday":"📅","thursday":"📅","friday":"📅","saturday":"📅","sunday":"📅","day":"🌞","week":"🗓️","today":"📆","tomorrow":"📅","weekend":"🏖️","weather":"🌤️","sunny":"☀️","rainy":"🌧️","cloudy":"☁️","windy":"🌬️","snowy":"🌨️","hot":"🥵","cold":"🥶","warm":"🌤️","cool":"🧊","rain":"🌧️","snow":"❄️","sun":"☀️","cloud":"☁️","wind":"🌬️","season":"🍂","spring":"🌷","summer":"🏖️","autumn":"🍁","fall":"🍂","winter":"⛄","flower":"🌸","tree":"🌳","grass":"🌱","seed":"🌰","leaf":"🍃","leaves":"🍃","soil":"🪴","plant":"🪴","grow":"🌱","fruit":"🍇","strawberry":"🍓","grapes":"🍇","pear":"🍐","lemon":"🍋","watermelon":"🍉","peach":"🍑","mango":"🥭","cherry":"🍒","market":"🛒","vegetable":"🥕","tomato":"🍅","potato":"🥔","onion":"🧅","lettuce":"🥬","cucumber":"🥒","broccoli":"🥦","pepper":"🫑","peas":"🫛","corn":"🌽","bean":"🫘","garden":"🪴","pig":"🐷","ride a bike":"🚴","buy":"🛍️","money":"💰","coin":"🪙","bag":"👜","price":"🏷️","there is":"📍","there are":"📍","beach":"🏖️","sea":"🌊","sand":"🏖️","shell":"🐚","bucket":"🪣","spade":"🪏","umbrella":"☂️","wave":"🌊","boots":"🥾","scarf":"🧣","happy":"😊","sad":"😢","angry":"😠","tired":"😴","hungry":"🍽️","thirsty":"🥤","calm":"😌","sick":"🤒","this":"👉","that":"👈","these":"🫵","those":"🫵","books":"📚","a book":"📘","an apple":"🍎","many":"🔢","apples":"🍎","cars":"🚗","boxes":"📦","letters":"🔤","spell":"🔠","listen":"🎧","look":"👀","read":"📖","repeat":"🔁","open":"📂","close":"📁","sit down":"🪑","stand up":"🧍","answer":"💬","toy":"🧸","his":"👨","her":"👩","big":"🐘","small":"🐜","fast":"⚡","slow":"🐢","tail":"🐈","wings":"🪽","t-shirt":"👕","trousers":"👖","lamp":"💡","what":"❓","who":"👤","where":"📍","when":"🕒","platform":"🚉","train station":"🚉","passenger":"🧳","suitcase":"🧳","arrival":"🛬","departure":"🛫","seat":"💺","swimming pool":"🏊","swimsuit":"🩱","swimming cap":"🏊","goggles":"🥽","ladder":"🪜","lifeguard":"🛟","doctor":"🧑‍⚕️","nurse":"👩‍⚕️","patient":"🤒","appointment":"📅","medicine":"💊","pain":"🩹","temperature":"🌡️","seller":"🧑‍💼","customer":"🛍️","basket":"🧺","pillow":"🛏️","blanket":"🛌","wardrobe":"🚪","drawer":"🗄️","alarm clock":"⏰","curtain":"🪟","bedside table":"🛏️","rug":"🧶","cinema":"🎬","film":"🎞️","screen":"🖥️","popcorn":"🍿","actor":"🎭","actress":"🎭","story":"📖","song":"🎵","forest":"🌲","wood":"🪵","branch":"🌿","mushroom":"🍄","fox":"🦊","deer":"🦌","river":"🏞️","mountain":"⛰️","farm shop":"🛒","honey":"🍯","fire station":"🚒","firefighter":"🧑‍🚒","fire engine":"🚒","helmet":"⛑️","hose":"🚿","fire":"🔥","uniform":"🦺","alarm":"🚨","hairdresser":"💇","scissors":"✂️","toy shop":"🧸","doll":"🪆","teddy bear":"🧸","puzzle":"🧩","kite":"🪁","robot":"🤖","dinosaur":"🦖","yo-yo":"🪀","toy car":"🚗","campsite":"🏕️","tent":"⛺","sleeping bag":"🛌","torch":"🔦","campfire":"🔥","backpack":"🎒","map":"🗺️","lake":"🏞️","path":"🥾","pet shop":"🐾","pet":"🐾","lead":"🦮","cage":"🪹","bowl":"🥣","clothes shop":"👕","shirt":"👔","skirt":"👗","dress":"👗","jacket":"🧥","size":"📏","colour":"🎨","café":"☕","menu":"📋","cup":"☕","glass":"🥛","sugar":"🍬","ill":"🤒","better":"💚","well":"😊","seaside":"🏖️","harbour":"⚓","fisherman":"🎣","rock":"🪨","lighthouse":"🗼","coast":"🌊","goose":"🪿","donkey":"🫏","armchair":"🛋️","television":"📺","remote control":"🎛️","coffee table":"🪑","bookcase":"📚","cushion":"🛋️","carpet":"🧶","fireplace":"🔥","throw":"🤾","catch":"🧤","share":"🤝","laugh":"😂","bottle":"🍼","a bottle":"🍼","packet":"📦","a packet":"📦","kilo":"⚖️","a kilo":"⚖️","litre":"🧴","a litre":"🧴","loaf":"🍞","a loaf":"🍞","tin":"🥫","a tin":"🥫","carton":"🧃","a carton":"🧃","pilot":"👨‍✈️","flight attendant":"🧑‍✈️","airport":"🛫","gate":"🚪","passport":"🛂","security":"🛡️","luggage":"🧳","runway":"🛫","morning":"🌅","afternoon":"☀️","evening":"🌆","night":"🌙","early":"🌄","late":"🌙","dinner":"🍽️","bedtime":"🌙","root":"🌱","pot":"🪴","watering can":"🚿","rose":"🌹","sweep":"🧹","dust":"🧹","vacuum":"🧹","bin":"🗑️","what's the weather like?":"🌤️","it's sunny":"☀️","it's rainy":"🌧️","it's cold":"🥶"
                };
                const numberCounts: Record<string,number> = {one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10};
                const word = (entry.english ?? "").toLowerCase();
                const count = numberCounts[word];
                const pronunciationGuide = getSpanishPronunciationGuide(word) || entry.pronunciationGuide || pronunciationByWord.get(word);
                return <article key={entry.itemId} className="flex min-w-0 flex-col items-center rounded-2xl border border-[#e8ebf0] bg-white p-3 text-center sm:p-4">
                  <div aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-2xl bg-[#f2f6fb] sm:h-20 sm:w-20">
                    {count ? <div className="flex flex-col items-center justify-center"><span className="text-3xl font-extrabold leading-none text-[#2872c8] sm:text-4xl">{count}</span><span className="mt-1 grid grid-cols-5 gap-0.5 text-[10px] leading-none sm:text-xs">{Array.from({length:count},(_,i)=><span key={i}>🍎</span>)}</span></div> : <span className="text-4xl sm:text-5xl">{word.length === 1 && /^[a-z]$/.test(word) ? "🔠" : visual[word] ?? visualForVocabulary(word, entry.spanish ?? "")}</span>}
                  </div>
                  <p className="mt-3 break-words text-base font-bold text-[#26364b] sm:text-lg">{renderTranslatedWords(entry.english)}</p>
                  <p className="mt-1 text-sm font-medium text-[#64816f]">{resolveSpanish(entry.english, entry.spanish)}</p>
                  <p className="mt-1 min-h-5 text-xs font-semibold text-[#55708f]">{pronunciationGuide || "Guía de pronunciación pendiente"}</p>
                  <button type="button" aria-label={`Escuchar pronunciación de ${entry.english}`} onClick={() => speak(entry.english ?? "")} className="mt-3 rounded-full border border-[#dce6f0] bg-white px-3 py-1.5 text-xs font-semibold text-[#55708f]">♫ Escuchar voz automática</button>
                </article>;
              })}
            </div>
          </section>}

          {mission.course.level !== "C1" && (section.exercise.lesson?.phrases?.length ?? 0) > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">02 · EXPRESIONES</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Frases que vas a utilizar</h3><p className="mt-1 text-sm text-[#7b8798]">Estas son las expresiones que aparecerán en la práctica de traducción.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              {(section.exercise.lesson?.phrases ?? []).map((entry,i) => <article key={i} className="flex items-start gap-3 rounded-xl border border-[#e8ebf0] bg-white p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f2f6fb] text-xl" aria-hidden="true">{["👋","🌅","☀️","🌆","👋","🗓️","🙏","💛","🤝","❓"][i]}</span>
                <div className="min-w-0 flex-1"><p className="font-semibold text-[#26364b]">{renderTranslatedWords(entry.english)}</p><p className="mt-1 text-sm text-[#64816f]">{resolveSpanish(entry.english, entry.spanish)}</p>{entry.pronunciationGuide && <p className="mt-1 text-xs font-semibold text-[#55708f]">{entry.pronunciationGuide}</p>}{entry.note && <p className="mt-1 text-xs leading-5 text-[#8290a3]">{entry.note}</p>}</div>
                <button type="button" aria-label={`Escuchar ${entry.english}`} onClick={() => speak(entry.english)} className="shrink-0 rounded-full border border-[#dce6f0] px-3 py-2 text-xs text-[#55708f]">♫</button>
              </article>)}
            </div>
          </section>}

          {mission.course.level === "C1" ? (
            (section.exercise.lesson?.grammar?.length ?? 0) > 0 && <section>
              <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">02 · GRAMÁTICA</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Gramática de la misión</h3><p className="mt-1 text-sm leading-6 text-[#7b8798]">Estas son las estructuras gramaticales que trabajarás en esta misión.</p></div>
              <div className="grid gap-3 sm:grid-cols-2">
                {(section.exercise.lesson?.grammar ?? []).map((entry, i) => <article key={i} className="rounded-xl border border-[#e8ebf0] bg-white p-4">
                  <p className="font-semibold text-[#26364b]">{renderTranslatedWords(entry.english)}</p><p className="mt-1 text-sm font-medium text-[#64816f]">{resolveSpanish(entry.english, entry.spanish)}</p>{entry.note && <p className="mt-1 text-xs leading-5 text-[#8290a3]">{renderTranslatedWords(entry.note)}</p>}
                  {entry.note && getExampleTranslation(entry.note) && <p className="mt-1 text-xs leading-5 text-[#64816f]">{getExampleTranslation(entry.note)}</p>}
                  <button type="button" onClick={() => speak(entry.english)} className="mt-2 text-xs font-semibold text-[#55708f]">♫ Escuchar ejemplo</button>
                </article>)}
              </div>
            </section>
          ) : (
((section.exercise.theory?.title || section.exercise.theory?.explanation || (section.exercise.theory?.patterns?.length ?? 0) > 0) || (section.exercise.lesson?.grammar?.length ?? 0) > 0) && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">03 · GRAMÁTICA</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">{section.exercise.theory?.title ?? "Gramática de la misión"}</h3><p className="mt-1 text-sm leading-6 text-[#7b8798]">{section.exercise.theory?.explanation}</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              {(section.exercise.theory?.patterns ?? []).filter(Boolean).map((pattern, i) => <article key={typeof pattern === "string" ? pattern : pattern.label ?? pattern.pattern ?? i} className="rounded-xl border border-[#e8ebf0] bg-[#fbfcfe] p-4">
                {typeof pattern !== "string" && pattern.label && <p className="text-xs font-bold uppercase tracking-wide text-[#55779d]">{pattern.label}{getExampleTranslation(pattern.label) && <span className="mt-1 block text-[11px] font-medium normal-case tracking-normal text-[#64816f]">{getExampleTranslation(pattern.label)}</span>}</p>}
                <p className="mt-2 font-semibold text-[#26364b]">{typeof pattern === "string" ? pattern : pattern.pattern}</p>{typeof pattern !== "string" && (pattern.translation ?? getExampleTranslation(pattern.pattern)) && <p className="mt-1 text-sm text-[#47745b]">{pattern.translation ?? getExampleTranslation(pattern.pattern)}</p>}
                {typeof pattern !== "string" && pattern.examples?.length ? (
                  <ul className="mt-3 space-y-2">
                    {pattern.examples.map((example, exampleIndex) => {
                      const inlineTranslation = example.match(/^(.+?)\\s+[—–]\\s+(.+)$/);
                      const displayedExample = inlineTranslation?.[1] ?? example;
                      const translation = pattern.exampleTranslations?.[exampleIndex] ?? getExampleTranslation(displayedExample) ?? inlineTranslation?.[2];
                      return (
                        <li key={example + exampleIndex} className="list-none rounded-xl border border-[#e8edf3] bg-white p-3">
                          <p className="font-semibold leading-6 text-[#26364b]">{displayedExample}</p>
                          {translation ? <p className="mt-1 text-sm leading-6 text-[#47745b]">{translation}</p> : <p className="mt-1 text-xs text-amber-700">Traducción pendiente de revisión académica.</p>}
                          <button type="button" aria-label={`Escuchar ${displayedExample}`} onClick={() => speak(displayedExample)} className="mt-2 rounded-full border border-[#dce6f0] px-3 py-1.5 text-xs font-semibold text-[#55708f]">♫ Escuchar</button>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </article>)}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {(section.exercise.lesson?.grammar ?? []).map((entry,i) => <article key={i} className="rounded-xl border border-[#e8ebf0] bg-white p-4">
                <p className="font-semibold text-[#26364b]">{renderTranslatedWords(entry.english)}</p><p className="mt-1 text-sm font-medium text-[#64816f]">{resolveSpanish(entry.english, entry.spanish)}</p>{entry.note && <p className="mt-1 text-xs leading-5 text-[#8290a3]">{entry.note}</p>}
                <button type="button" onClick={() => speak(entry.english)} className="mt-2 text-xs font-semibold text-[#55708f]">♫ Escuchar ejemplo</button>
              </article>)}
            </div>
            {section.exercise.theory?.tip && <p className="mt-3 rounded-xl bg-[#f3f7fb] p-4 text-sm leading-6 text-[#53657b]"><strong>Recuerda:</strong> {section.exercise.theory.tip}</p>}
          </section>
          )}
          {mission.course.level !== "C1" && (mission.sections.find(s => s.sectionKey === "pronunciation")?.exercise.items.length ?? 0) > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">04 · PRONUNCIACIÓN</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Así suenan las palabras</h3><p className="mt-1 text-sm text-[#7b8798]">La guía está adaptada a hispanohablantes; las MAYÚSCULAS marcan la sílaba tónica. Es aproximada, no AFI.</p></div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {mission.sections.find(s => s.sectionKey === "pronunciation")?.exercise.items.map(entry => <article key={entry.itemId} className="rounded-xl border border-[#e8ebf0] bg-white p-4">
                <p className="text-lg font-bold text-[#26364b]">{renderTranslatedWords(entry.word)}</p><p className="text-sm text-[#64816f]">{entry.translation}</p><div className="mt-2 rounded-lg bg-[#f3f7fb] px-3 py-2"><p className="text-[10px] font-bold uppercase tracking-wide text-[#8290a3]">Guía para hispanohablantes</p><p className="mt-1 text-sm font-semibold text-[#55708f]">{entry.pronunciationGuide}</p></div>
                <button type="button" onClick={() => speak(entry.word ?? "")} className="mt-3 rounded-full border border-[#dce6f0] px-3 py-1.5 text-xs font-semibold text-[#55708f]">♫ Escuchar</button>
              </article>)}
            </div>
          </section>}

          {mission.course.level !== "C1" && (section.exercise.lesson?.reading?.length ?? 0) > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">05 · LECTURA</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Lee y comprende el texto</h3><p className="mt-1 text-sm text-[#7b8798]">El texto se presenta en inglés con apoyo en español. Las frases clave y los modelos aparecen traducidos para que puedas comprenderlos antes de responder.</p></div>
            <div className="space-y-2">{(section.exercise.lesson?.reading ?? []).map((entry,i) => <article key={i} className="grid gap-1 rounded-xl border border-[#e8ebf0] bg-white p-4 sm:grid-cols-2 sm:gap-4"><p className="font-medium text-[#26364b]">{renderTranslatedWords(entry.english)}</p><p className="text-sm text-[#64816f]">{resolveSpanish(entry.english, entry.spanish)}</p></article>)}</div>
          </section>}

          {mission.course.level !== "C1" && (section.exercise.lesson?.writing?.length ?? 0) > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">06 · ESCRITURA</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Frases del dictado</h3><p className="mt-1 text-sm text-[#7b8798]">Estas son exactamente las frases que escucharás y escribirás en la actividad.</p></div>
            <div className="grid gap-2 sm:grid-cols-2">{(section.exercise.lesson?.writing ?? []).map((entry,i) => <article key={i} className="rounded-xl border border-[#e8ebf0] bg-white p-4"><p className="font-semibold text-[#26364b]">{renderTranslatedWords(entry.english)}</p><p className="mt-1 text-sm text-[#64816f]">{resolveSpanish(entry.english, entry.spanish)}</p><button type="button" onClick={() => speak(entry.english)} className="mt-2 text-xs font-semibold text-[#55708f]">♫ Escuchar frase</button></article>)}</div>
          </section>}

          {mission.course.level !== "C1" && (section.exercise.lesson?.speaking?.length ?? 0) > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">07 · EXPRESIÓN ORAL</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Lo que podrás decir</h3><p className="mt-1 text-sm text-[#7b8798]">Primero entiende la consigna y aprende una posible respuesta.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">{(section.exercise.lesson?.speaking ?? []).map((entry,i) => <article key={i} className="rounded-xl border border-[#e8ebf0] bg-white p-4">
              <p className="text-xs font-semibold text-[#8290a3]">{entry.promptSpanish}</p><p className="mt-2 font-semibold text-[#26364b]">{renderTranslatedWords(entry.english)}</p><p className="mt-1 text-sm text-[#64816f]">{resolveSpanish(entry.english, entry.spanish)}</p><button type="button" onClick={() => speak(entry.english)} className="mt-2 text-xs font-semibold text-[#55708f]">♫ Escuchar modelo</button>
            </article>)}</div>
          </section>}

          {mission.course.level !== "C1" && (section.exercise.lesson?.listening?.length ?? 0) > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">08 · COMPRENSIÓN AUDITIVA</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Escucha el contenido antes del ejercicio</h3><p className="mt-1 text-sm text-[#7b8798]">Consulta el diálogo y su apoyo en español. Las expresiones nuevas se presentan traducidas antes de escucharlas.</p></div>
            <div className="mb-3 rounded-xl border border-[#dce8f4] bg-[#f3f8fd] p-4"><p className="text-xs font-bold uppercase tracking-wide text-[#55779d]">Audio completo</p><button type="button" onClick={() => speak(mission.sections.find(s => s.sectionKey === "listening")?.exercise.content?.audioTranscript?.replace(/^tts:en-GB:/,"") ?? "")} className="mt-2 rounded-full border border-[#dce6f0] bg-white px-3 py-2 text-xs font-semibold text-[#55708f]">♫ Escuchar audio modelo</button></div>
            <div className="space-y-2">{(section.exercise.lesson?.listening ?? []).map((entry,i) => <article key={i} className="grid gap-1 rounded-xl border border-[#e8ebf0] bg-white p-4 sm:grid-cols-2 sm:gap-4"><p className="font-medium text-[#26364b]">{renderTranslatedWords(entry.english)}</p><p className="text-sm text-[#64816f]">{resolveSpanish(entry.english, entry.spanish)}</p></article>)}</div>
          </section>}
          {mission.course.level !== "C1" && (section.exercise.lesson?.examples?.length ?? 0) > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">09 · EJEMPLOS EN CONTEXTO</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">El inglés en situaciones reales</h3><p className="mt-1 text-sm text-[#7b8798]">Observa cómo se combinan las palabras y estructuras de la misión.</p></div>
            <div className="grid gap-2 sm:grid-cols-2">{(section.exercise.lesson?.examples ?? []).map((entry,i) => <article key={i} className="rounded-xl border border-[#e8ebf0] bg-white p-4"><p className="font-semibold text-[#26364b]">{renderTranslatedWords(entry.english)}</p><p className="mt-1 text-sm text-[#64816f]">{resolveSpanish(entry.english, entry.spanish)}</p>{entry.note && <p className="mt-2 text-xs leading-5 text-[#8290a3]">{entry.note}</p>}<button type="button" onClick={() => speak(entry.english)} className="mt-2 text-xs font-semibold text-[#55708f]">♫ Escuchar ejemplo</button></article>)}</div>
          </section>}
          {mission.course.level !== "C1" && (section.exercise.lesson?.communication?.length ?? 0) > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">10 · GUÍA DE COMUNICACIÓN</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Utiliza lo que has aprendido</h3><p className="mt-1 text-sm text-[#7b8798]">Estas expresiones te ayudan a resolver la situación comunicativa de la misión.</p></div>
            <div className="space-y-2">{(section.exercise.lesson?.communication ?? []).map((entry,i) => <article key={i} className="grid gap-1 rounded-xl border border-[#e8ebf0] bg-white p-4 sm:grid-cols-2 sm:gap-4"><div><p className="font-semibold text-[#26364b]">{renderTranslatedWords(entry.english)}</p>{entry.note && <p className="mt-1 text-xs text-[#8290a3]">{entry.note}</p>}</div><div className="flex items-start justify-between gap-3"><p className="text-sm text-[#64816f]">{resolveSpanish(entry.english, entry.spanish)}</p><button type="button" onClick={() => speak(entry.english)} className="shrink-0 text-xs font-semibold text-[#55708f]">♫</button></div></article>)}</div>
          </section>}
          <div className="rounded-2xl border border-[#dce8f4] bg-[#f3f8fd] p-5 text-center"><p className="text-sm font-semibold text-[#284866]">Ya has visto y comprendido el temario de esta misión.</p><p className="mt-1 text-sm text-[#61738a]">Cuando estés preparado, pasa a las actividades para practicarlo.</p></div>
        </div>}
        {sectionKey === "pronunciation" && item?.options?.length ? <div className="mt-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Actividad de pronunciación {index + 1} de {activeItems.length}</p>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="text-lg font-bold text-slate-900">{renderTranslatedWords(item.word)}</p><p className="mt-1 text-sm text-slate-600">{item.translation}</p><div className="mt-2 inline-block rounded-lg bg-white px-3 py-2"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Guía para hispanohablantes</p><p className="mt-1 text-sm font-semibold text-blue-800">{item.pronunciationGuide}</p></div><p className="mt-2 text-xs text-slate-500">Guía aproximada para hispanohablantes; no es AFI.</p><button type="button" onClick={() => speak(item.word ?? "")} className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold">♫ Escuchar modelo británico</button></div>
          <h3 className="mt-5 text-lg font-semibold leading-7">{renderTranslatedWords(item.prompt)}</h3>{getPromptTranslation(item.prompt) && <p className="mt-1 text-sm leading-6 text-[#64816f]">{getPromptTranslation(item.prompt)}</p>}
          <div className="mt-4 grid gap-2">{optionsReady ? getOptions(item).map((option) => <button key={option} type="button" disabled={checked} onClick={() => mark(option === getCorrectAnswer(item), getCorrectAnswer(item))} className={`rounded-xl border px-4 py-3 text-left text-sm transition disabled:cursor-default ${checked && option === getCorrectAnswer(item) ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-blue-400"}`}>{option}</button>) : <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">Preparando opciones…</p>}</div>
        </div> : null}
        {sectionKey === "pronunciation" && !item?.options?.length && <div className="mt-6 grid gap-3 sm:grid-cols-2">{section.exercise.items.map((entry) => <article key={entry.itemId} className="rounded-xl border border-slate-200 p-4"><p className="text-lg font-semibold">{renderTranslatedWords(entry.word)}</p><p className="text-sm text-slate-500">{entry.translation}</p><div className="mt-2 rounded-lg bg-blue-50 px-3 py-2"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Guía para hispanohablantes</p><p className="mt-1 font-medium text-blue-700">{entry.pronunciationGuide}</p></div><p className="text-xs text-slate-400">Guía aproximada para hispanohablantes; no es AFI.</p><button onClick={() => speak(entry.word ?? "")} className="mt-3 rounded-lg border border-slate-200 px-3 py-2 text-sm">▶ Escuchar modelo británico</button></article>)}</div>}
        {["practice", "grammar", "reading"].includes(sectionKey) && item && <div className="mt-7"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Actividad {index + 1} de {activeItems.length}</p><h3 className="mt-3 text-lg font-semibold leading-7">{renderTranslatedWords(item.prompt)}</h3>{sectionKey === "practice" && (item.translation || getPromptTranslation(item.prompt)) && <p className="mt-2 rounded-xl bg-emerald-50/70 px-3 py-2 text-sm leading-6 text-emerald-900">{item.translation ?? getPromptTranslation(item.prompt)}</p>}{sectionKey === "grammar" && item.audio && <button type="button" onClick={() => speak(item.audio?.replace(/^tts:[^:]+:/, "") ?? "")} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800">♫ Escuchar nombre de la letra</button>}<div className="mt-5 grid gap-2">{optionsReady ? getOptions(item).map((option) => <button key={option} disabled={checked} onClick={() => mark(option === getCorrectAnswer(item), getCorrectAnswer(item))} className={`rounded-xl border px-4 py-3 text-left text-sm transition disabled:cursor-default ${checked && option === getCorrectAnswer(item) ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-blue-400"}`}>{sectionKey === "practice" ? renderTranslatedWords(option) : option}</button>) : <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">Preparando opciones…</p>}</div></div>}
{sectionKey === "writing" && item && <div className="mt-7"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Dictado {index + 1} de 10 · {item.kind === "passage" ? "Texto" : "Una frase"}</p><p className="mt-3 text-sm leading-6 text-slate-600">Escucha como en un dictado de clase. Cada frase se reproduce tres veces: a ritmo natural, más despacio y de nuevo a ritmo natural. El texto no se muestra hasta que compruebes tu respuesta.</p><div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-semibold text-slate-800">Dictado guiado</p><span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">3 repeticiones por frase</span></div><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={startDictation} className="rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white">▶ {dictationPlaying ? "Reiniciar dictado" : "Reproducir dictado"}</button><button type="button" onClick={dictationPaused ? resumeDictation : pauseDictation} disabled={!dictationPlaying} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 disabled:opacity-40">{dictationPaused ? "Continuar" : "Pausar"}</button><button type="button" onClick={stopDictation} disabled={!dictationPlaying} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 disabled:opacity-40">Detener</button></div><div className="mt-4 flex items-center justify-between gap-3 text-xs text-slate-500"><span>Frase {dictationSegment + 1} de {item.segments?.length ?? 1}</span><span>Repetición {dictationRepeat || 0} de {item.repeatCount ?? 3}</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-blue-700 transition-all" style={{ width: (((dictationSegment * (item.repeatCount ?? 3)) + dictationRepeat) / ((item.segments?.length ?? 1) * (item.repeatCount ?? 3))) * 100 + "%" }} /></div><p role="status" aria-live="polite" className="mt-3 text-xs leading-5 text-slate-500">{dictationMessage || "Pulsa reproducir para empezar. Puedes pausar o repetir el dictado."}</p></div><label className="mt-5 block text-sm font-medium">Escribe lo que has escuchado<textarea value={draft} onChange={(e) => setDraft(e.target.value)} disabled={checked} rows={item.kind === "passage" ? 7 : 3} placeholder="Escribe aquí el dictado completo…" className="mt-2 block w-full resize-y rounded-xl border border-slate-300 p-3 leading-7 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50" /></label><p className="mt-2 text-xs text-slate-500">Puedes volver a escuchar el audio tantas veces como necesites. El campo empieza vacío para que escribas lo que oyes.</p><div className="mt-3 flex flex-wrap items-center gap-2"><button type="button" disabled={checked || dictationHintLevel >= 2} onClick={() => setDictationHintLevel((level) => Math.min(level + 1, 2))} className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-900 disabled:opacity-40">💡 {dictationHintLevel === 0 ? "Mostrar pista" : "Mostrar otra pista"}</button>{dictationHintLevel > 0 && <span className="text-xs font-medium text-slate-500">Pista {dictationHintLevel} de 2: <strong className="font-mono tracking-wider text-slate-800">{buildDictationHint(item.expectedAnswer ?? "", dictationHintLevel)}</strong></span>}</div><p className="mt-1 text-xs text-slate-500">La pista revela algunas letras, pero nunca muestra por completo una palabra. En respuestas de una sola letra solo indica el espacio que debes completar.</p><button disabled={checked || !draft.trim()} onClick={() => { const normalise = (value: string) => value.toLocaleLowerCase("en-GB").normalize("NFKC").replace(/[.,!?;:'’"]/g, "").replace(/\s+/g, " ").trim(); mark(normalise(draft) === normalise(item.expectedAnswer ?? ""), item.expectedAnswer ?? ""); }} className="mt-3 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-40">Comprobar dictado</button></div>}
        {sectionKey === "speaking" && item && <div className="mt-7"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Tarea oral {index + 1} de 10</p><h3 className="mt-3 text-lg font-semibold">{renderTranslatedWords(item.prompt)}</h3><div className="mt-4 rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Modelo de referencia</p><p className="mt-2 text-sm text-slate-700">{renderTranslatedWords(item.modelAnswer)}</p><button onClick={() => speak(item.modelAnswer ?? "")} className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">▶ Escuchar modelo</button></div><div className="mt-4 flex flex-wrap gap-2"><button onClick={recording ? stopRecording : startRecording} className={recording ? "rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white" : "rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white"}>{recording ? "■ Detener grabación" : "● Grabar mi respuesta"}</button>{recordedUrl && <audio controls src={recordedUrl} className="w-full" />}</div><p role="status" className="mt-3 text-sm text-slate-500">{recordingMessage || "La grabación permanece en esta página y no se envía al servidor."}</p><p className="mt-2 text-xs text-slate-400">No se genera una nota fonética automática en esta versión.</p><button disabled={checked} onClick={() => { setChecked(true); setFeedback("Tarea oral completada. Tu grabación permanece en esta página y no se ha evaluado."); }} className="mt-4 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold disabled:opacity-40">Marcar tarea como completada</button></div>}
        {sectionKey === "listening" && <div className="mt-7">
          <p className="text-sm leading-6 text-slate-600">Escucha el pasaje completo y completa los diez huecos seleccionando palabras del banco. Puedes mover o sustituir palabras antes de comprobar.</p>
          <button onClick={() => speak(listeningAudioTranscript)} className="mt-3 rounded-xl border border-slate-200 px-4 py-3 text-sm">▶ Escuchar audio completo</button>
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5 text-base leading-10 text-slate-700">
            {listeningTemplate.split(/(\[\[gap-(?:0[1-9]|10)\]\])/g).map((part, i) => {
              const gap = listeningItems.find((entry) => entry.gapToken === part);
              if (!gap) return <span key={`text-${i}`}>{part}</span>;
              const placed = listeningAnswers[gap.itemId];
              return <button key={gap.itemId} disabled={checked} onClick={() => {
                if (selectedListeningWord) {
                  setListeningAnswers((old) => ({ ...old, [gap.itemId]: selectedListeningWord }));
                  setSelectedListeningWord("");
                } else if (placed) {
                  setListeningAnswers((old) => { const copy = { ...old }; delete copy[gap.itemId]; return copy; });
                }
              }} className={`mx-1 inline-flex min-w-24 items-center justify-center rounded-lg border px-3 py-1 text-sm font-semibold ${placed ? "border-blue-300 bg-blue-50 text-blue-800" : "border-slate-300 bg-white text-slate-500"}`}>{placed ?? (selectedListeningWord ? "Colocar aquí" : "____")}</button>;
            })}
          </div>
          <div className="mt-5 rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Banco de palabras</p><div className="mt-3 flex flex-wrap gap-2">{listeningWordBank.map((bankItem) => bankItem.word).map((word) => <button key={word} disabled={checked || Object.values(listeningAnswers).includes(word)} onClick={() => setSelectedListeningWord(word)} className={`rounded-lg border px-3 py-2 text-sm ${selectedListeningWord === word ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white"} disabled:opacity-30`}>{word}</button>)}</div><p className="mt-3 text-xs text-slate-500">{selectedListeningWord ? `Seleccionada: ${selectedListeningWord}. Pulsa un hueco para colocarla.` : `${Object.keys(listeningAnswers).length} de 10 palabras colocadas. Pulsa un hueco ocupado para devolver su palabra al banco.`}</p></div>
          <button disabled={checked || Object.keys(listeningAnswers).length !== 10} onClick={() => { const correct = listeningItems.filter((entry) => listeningAnswers[entry.itemId]?.toLowerCase() === getListeningAnswer(entry).toLowerCase()).length; setScore((value) => value + correct); setChecked(true); setFeedback(`Resultado: ${correct} de 10 respuestas correctas. Soluciones: ${listeningItems.map((entry, i) => `${i + 1}. ${getListeningAnswer(entry)}`).join(" · ")}`); }} className="mt-4 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-40">Comprobar las 10 respuestas</button>
        </div>}
        {sectionKey === "pronunciation" && item?.options && item.options.length > 0 && <div className="mt-7 flex items-center justify-between gap-3"><span className="text-xs text-slate-400">Actividad {index + 1} de {activeItems.length}</span><button onClick={next} disabled={!checked} className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">{index === activeItems.length - 1 ? "Finalizar sección" : "Siguiente →"}</button></div>}
        {feedback && <p role="status" aria-live="polite" className="mt-5 rounded-2xl border border-[#e4ebf2] bg-[#f5f8fb] p-4 text-sm font-semibold leading-6 text-[#43546b]">{feedback.startsWith("Respuesta correcta: ") ? <>Respuesta correcta: {renderTranslatedWords(feedback.slice("Respuesta correcta: ".length))}</> : feedback}</p>}
        {sectionKey !== "explore" && sectionKey !== "pronunciation" && sectionKey !== "listening" && <div className="mt-7 flex items-center justify-between gap-3"><span className="text-xs text-slate-400">Puntuación de esta sesión: {score}</span><button onClick={next} disabled={!checked} className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">{index === activeItems.length - 1 ? "Finalizar sección" : "Siguiente →"}</button></div>}
      </section>
      <p className="mt-4 text-center text-[11px] leading-5 text-[#9aa3b1]">Vista piloto · El progreso y las grabaciones son temporales y no se guardan en tu cuenta.</p>
    </div>
  );
}
