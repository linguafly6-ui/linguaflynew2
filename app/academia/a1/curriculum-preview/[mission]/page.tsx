import Link from "next/link";
import { notFound } from "next/navigation";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import { getSpanishPronunciationGuide } from "@/content/pronunciation-guide";
import mission001 from "@/content/canonical-missions/a1/001.json";
import mission002 from "@/content/canonical-missions/a1/002.json";
import { getPreviewMission, previewMissions } from "@/content/a1-curriculum-preview";

const canonicalMissions: Record<string, Mission> = {
  "001": mission001 as Mission,
  "002": mission002 as Mission,
};
const ids = ["001", "002", ...previewMissions.map((mission) => mission.id)];
const keys = ["explore", "practice", "grammar", "pronunciation", "reading", "writing", "speaking", "listening"];
const types = ["vocabulary_pairs", "mixed_practice", "grammar", "pronunciation_cards", "reading_comprehension", "dictation", "speaking_prompts", "listening_gap_fill"];
const spanish: Record<string, string> = {
  "Spain":"España","Spanish":"español","the United Kingdom":"Reino Unido","British":"británico","France":"Francia","French":"francés","Germany":"Alemania","German":"alemán","Italy":"Italia","Italian":"italiano",
  "letter":"letra","alphabet":"alfabeto","spell":"deletrear","first name":"nombre","surname":"apellido","capital letter":"mayúscula","small letter":"minúscula","double":"doble","vowel":"vocal",
  "who":"quién","what":"qué","where":"dónde","when":"cuándo","how":"cómo","how old":"qué edad","married":"casado/a","single":"soltero/a","address":"dirección","occupation":"ocupación",
  "zero":"cero","ten":"diez","twenty":"veinte","thirty":"treinta","forty":"cuarenta","fifty":"cincuenta","sixty":"sesenta","seventy":"setenta","eighty":"ochenta","ninety":"noventa",
  "English":"inglés","language":"idioma","speak":"hablar","read":"leer","write":"escribir","understand":"entender","practise":"practicar",
  "profile":"perfil","born":"nacido/a","live":"vivir","work":"trabajar","study":"estudiar","favourite":"favorito/a","hobby":"afición","free time":"tiempo libre","profile picture":"foto de perfil",
  "classmate":"compañero/a de clase","teacher":"profesor/a","student":"estudiante","friend":"amigo/a","boy":"chico","girl":"chica","man":"hombre","woman":"mujer","people":"personas","group":"grupo",
  "conversation":"conversación","question":"pregunta","answer":"respuesta","introduce":"presentar","again":"otra vez","slowly":"despacio","together":"juntos","class":"clase","new":"nuevo/a","welcome":"bienvenido/a",
  "daily routine":"rutina diaria","wake up":"despertarse","get up":"levantarse","have breakfast":"desayunar","start":"empezar","finish":"terminar","usually":"normalmente","sometimes":"a veces","always":"siempre","at night":"por la noche",
  "house":"casa","flat":"piso","kitchen":"cocina","bedroom":"dormitorio","bathroom":"baño","living room":"salón","garden":"jardín","sofa":"sofá","table":"mesa","next to":"al lado de",
  "bread":"pan","rice":"arroz","pasta":"pasta","apple":"manzana","banana":"plátano","water":"agua","milk":"leche","coffee":"café","chicken":"pollo","vegetables":"verduras",
  "menu":"menú","order":"pedido","I'd like":"quisiera","cup":"taza","glass":"vaso","bottle":"botella","sandwich":"sándwich","soup":"sopa","bill":"cuenta","please":"por favor",
  "shirt":"camisa","trousers":"pantalones","dress":"vestido","shoes":"zapatos","jacket":"chaqueta","coat":"abrigo","blue":"azul","black":"negro","size":"talla","wear":"llevar puesto"
};
const phraseModels: Record<string, string[]> = {
  "003":["Where are you from?","I'm from Spain.","What nationality are you?","I'm Spanish.","She is from France.","He is German.","We live in Italy.","They are from the United Kingdom.","I speak Spanish and English.","Where is your friend from?"],
  "004":["How do you spell your name?","My name is spelled L-A-U-R-A.","Please use a capital letter.","The first letter is A.","There are five letters in my name.","Is that a double N?","Can you spell your surname?","The word has three vowels.","Write your name in capital letters.","I don't know how to spell it."],
  "005":["Who is your English teacher?","What is your favourite colour?","Where are your parents?","When is your English class?","How old is your brother?","Are you a student?","Is she your sister?","Are they from Spain?","What is his occupation?","How are your friends?"],
  "006":["My phone number ends in twenty.","Her house number is thirty-five.","The class has twenty students.","I am thirty years old.","There are forty people here.","My postcode has five numbers.","The ticket costs fifteen euros.","Please write the number here.","His telephone number is on the card.","Can you repeat that number, please?"],
  "007":["I speak English at work.","She speaks three languages.","Can you speak French?","I can read simple texts.","He can write emails in English.","We understand the teacher.","They practise English every day.","I can't speak German yet.","Please speak slowly.","Do you understand this question?"],
  "008":["I was born in Seville.","I live with my family.","I work in a small shop.","I study English on Mondays.","My favourite food is pasta.","My favourite hobby is reading.","I have one brother and two sisters.","I am friendly and quiet.","In my free time, I play tennis.","This is my personal profile."],
  "009":["This is my classmate, Tom.","Our teacher is very friendly.","There are twelve students in my class.","The girl next to me is Sara.","The boys are in the classroom.","That woman is our English teacher.","My best friend is in this group.","Who is the new student?","The people in my class are nice.","We study English together."],
  "010":["Hello, I'm Marta. What's your name?","I'm from Portugal. Where are you from?","How old are you? I'm twenty-one.","Do you speak English?","A little, but I practise every day.","Can you repeat the question, please?","Please speak more slowly.","This is my friend, Luis. He is a student.","Nice to meet you. Welcome to the class!","See you next lesson. Goodbye!"],
  "011":["I wake up at seven.","I get up at half past seven.","I have breakfast at eight.","I start work at nine.","I finish work at five.","I usually walk to work.","She sometimes reads at night.","He always has breakfast.","What time do you get up?","I go to bed at ten."],
  "012":["There is a kitchen in my flat.","There are two bedrooms.","The sofa is in the living room.","The table is next to the window.","There is a garden behind the house.","The bathroom is small.","There are four chairs in the kitchen.","Is there a desk in your bedroom?","The lamp is on the table.","My flat has a big living room."],
  "013":["I eat bread for breakfast.","We have rice for lunch.","She likes pasta.","He eats an apple every day.","I have a banana.","Would you like some water?","I drink milk in the morning.","My father likes coffee.","They eat chicken and vegetables.","I don't like fish."],
  "014":["Can I see the menu, please?","I'd like a sandwich.","Can I have a glass of water?","I'd like a cup of coffee.","Would you like some soup?","Anything else?","No, thank you. That's all.","How much is the bill?","Can I pay by card?","Here you are. Thank you."],
  "015":["I'm wearing a blue shirt.","She wears black shoes.","This jacket is my size.","Where is my coat?","I like your dress.","These trousers are new.","He is wearing a black coat.","What size do you need?","The shoes are blue.","I wear a jacket in winter."]
};
const passages: Record<string,string> = {
  "003":"Ana is from Portugal. She is Portuguese and lives in Lisbon. She speaks Portuguese and English. Her friend Luca is from Italy. He is Italian and speaks Italian and English.",
  "004":"Laura Bennett is at the welcome desk. Her first name has five letters. She spells her surname B-E-N-N-E-T-T. The first letter is a capital B. There are double letters in her surname.",
  "005":"Emma Wilson is a student. She is twenty years old. Her English teacher is Mr Brown. Her class is on Monday. Her brother is sixteen. Her friends are from Spain and France.",
  "006":"Ben is thirty years old. His house number is thirty-five. His telephone number is 07123 456 890. His postcode has five numbers. He writes the numbers on a contact card.",
  "007":"Sara speaks Spanish and English. She can read simple texts in French, but she can't speak French very well. Her brother speaks German. They practise English every day.",
  "008":"Alex was born in Seville, but lives in Bristol now. He works in a small shop and studies English on Mondays. His favourite hobby is reading. In his free time, he plays tennis.",
  "009":"There are twelve students in our class. Our teacher is Anna. Tom is my classmate and Sara is my best friend. The new student is next to the window. We study English together.",
  "010":"Marta meets Luis on his first day of class. They introduce themselves. Marta is from Portugal and Luis is from Spain. They ask about age and languages. Luis asks Marta to repeat her name slowly.",
  "011":"Daniel wakes up at seven. He gets up and has breakfast at half past seven. He starts work at nine and finishes at five. He usually reads in the evening and sometimes watches TV at night.",
  "012":"Emma lives in a small flat. There are two bedrooms, one bathroom and a kitchen. The living room has a sofa and a table. The kitchen is next to the living room. There is a small garden.",
  "013":"Peter has bread and milk for breakfast. He eats rice, chicken and vegetables for lunch. His favourite fruit is an apple. He drinks water every day, but he doesn't like coffee.",
  "014":"Tom and Anna are at Green Café. Tom would like a sandwich and a cup of coffee. Anna orders soup and a glass of water. They read the menu and enjoy lunch. Tom asks for the bill.",
  "015":"Mia is in a clothes shop. She wants a blue shirt and black shoes. She tries on a jacket and asks for her size. She wears a coat when it is cold."
};

function makeCanonicalMission(p: (typeof previewMissions)[number]): Mission {
  const id = p.id;
  const vocab = p.vocabulary.map((entry) => {
    const parts = entry.split(" / ");
    const english = entry;
    const translated = parts.map((part) => spanish[part] ?? "");
    return { english, spanish: translated.filter(Boolean).join(" / ") || "Traducción pendiente de revisión", pronunciationGuide: getSpanishPronunciationGuide(english) };
  });
  const phrases = phraseModels[id] ?? phraseModels["014"];
  const activities = p.sections;
  const sections = keys.map((key, index) => {
    const activity = activities[index];
    const exerciseId = `english-a1-m${id}-${key}-exercise`;
    let items: any[] = [];
    let content: any;
    let lesson: any;
    let theory: any;
    if (key === "explore") {
      items = vocab.map((word, i) => ({ itemId: `english-a1-m${id}-explore-${i+1}`, position: i+1, ...word, audio: "tts:en-GB" }));
      lesson = {
        phrases: phrases.map((english) => ({ english, spanish: "" })),
        grammar: p.grammar.map((english) => ({ english, spanish: "Estructura objetivo de la misión." })),
        reading: [{ english: passages[id] ?? p.goal, spanish: "" }],
        writing: phrases.slice(0,5).map((english) => ({ english, spanish: "" })),
        speaking: phrases.slice(0,5).map((english) => ({ english, spanish: "", prompt: "Practise this expression.", promptSpanish: "Practica esta expresión." })),
        listening: phrases.slice(0,5).map((english) => ({ english, spanish: "" })),
        examples: phrases.map((english) => ({ english, spanish: "" })),
        communication: phrases.map((english) => ({ english, spanish: "Expresión comunicativa de la misión." }))
      };
      theory = { title: p.grammar[0], explanation: `En esta misión trabajarás ${p.grammar.join("; ")}. Observa los modelos y practica las estructuras en situaciones cotidianas.`, tip: "Lee el ejemplo completo, escucha su pronunciación y cambia una palabra cada vez para crear una frase nueva.", patterns: p.grammar.slice(0,4).map((pattern, i) => ({ label: `Estructura ${i+1}`, pattern, examples: phrases.slice(i,i+2) })) };
    } else if (key === "practice") {
      items = vocab.map((word,i) => ({ itemId: `english-a1-m${id}-practice-${i+1}`, position:i+1, prompt:`Choose the Spanish meaning of “${word.english}”.`, answer:word.spanish, options:[word.spanish, ...vocab.filter((_,j)=>j!==i).slice(0,2).map(x=>x.spanish)], taskType:"vocabulary", evaluation:{type:"single_choice"} }));
    } else if (key === "grammar") {
      items = Array.from({length:10},(_,i) => ({ itemId:`english-a1-m${id}-grammar-${i+1}`, position:i+1, prompt:"Which grammar structure is practised in this mission?", answer:p.grammar[i%p.grammar.length], options:[p.grammar[i%p.grammar.length],p.grammar[(i+1)%p.grammar.length],p.grammar[(i+2)%p.grammar.length]], evaluation:{type:"single_choice"} }));
    } else if (key === "pronunciation") {
      items = vocab.map((word,i) => ({ itemId:`english-a1-m${id}-pronunciation-${i+1}`, position:i+1, word:word.english, translation:word.spanish, pronunciationGuide:getSpanishPronunciationGuide(word.english), audio:"tts:en-GB", prompt:"Listen, read the guide and repeat the word.", options:[word.english,vocab[(i+1)%vocab.length].english,vocab[(i+2)%vocab.length].english], answer:word.english, taskType:"listening_and_guided_production" }));
    } else if (key === "reading") {
      content = { passageId:`english-a1-m${id}-reading-passage`, passage:passages[id] ?? p.goal };
      items = Array.from({length:10},(_,i) => ({ itemId:`english-a1-m${id}-reading-${i+1}`, position:i+1, prompt:`Read the text and identify information about: ${vocab[i%vocab.length].english}.`, answer:vocab[i%vocab.length].english, options:[vocab[i%vocab.length].english,vocab[(i+1)%vocab.length].english,vocab[(i+2)%vocab.length].english], evaluation:{type:"single_choice"} }));
    } else if (key === "writing") {
      items = phrases.map((sentence,i) => ({ itemId:`english-a1-m${id}-writing-${i+1}`, position:i+1, kind:"sentence", audio:"tts:en-GB", audioLocale:"en-GB", repeatCount:3, segments:[{segmentId:`english-a1-m${id}-writing-segment-${i+1}`,text:sentence}], expectedAnswer:sentence, evaluation:{type:"normalised_text"} }));
    } else if (key === "speaking") {
      items = phrases.map((sentence,i) => ({ itemId:`english-a1-m${id}-speaking-${i+1}`, position:i+1, prompt:`Say this sentence: ${sentence}`, modelAnswer:sentence, evaluation:{type:"rubric",transcriptionSeparateFromPronunciation:true} }));
    } else {
      const bank = vocab.slice(0,10);
      const transcript = bank.map((word) => `Please say ${word.english}.`).join(" ");
      const template = bank.map((word,i) => `Please say [[gap-${String(i+1).padStart(2,"0")}]].`).join(" ");
      content = { audio:"tts:en-GB", audioLocale:"en-GB", audioTranscript:transcript, transcriptTemplate:template, wordBank:bank.map((word,i)=>({wordId:`english-a1-m${id}-listening-word-${i+1}`,word:word.english})), interaction:"select_place_move_replace" };
      items = bank.map((word,i) => ({ itemId:`english-a1-m${id}-listening-${i+1}`, position:i+1, gapToken:`[[gap-${String(i+1).padStart(2,"0")}]]`, expectedWordId:`english-a1-m${id}-listening-word-${i+1}` }));
    }
    return { sectionId:`english-a1-m${id}-${key}`, sectionKey:key, position:index+1, title:["Explore","Practice","Grammar","Pronunciation","Reading","Writing","Speaking","Listening"][index], exercise:{ exerciseId, type:types[index], items, ...(content?{content}:{}), ...(lesson?{lesson}:{}), ...(theory?{theory}:{}) } };
  });
  return { course:{level:"A1"}, unit:{title:"A1 · Everyday communication"}, mission:{title:p.title,position:Number(id)}, sections } as Mission;
}

const previewAsCanonical = Object.fromEntries(previewMissions.map((p) => [p.id, makeCanonicalMission(p)])) as Record<string, Mission>;
const allMissions = { ...canonicalMissions, ...previewAsCanonical };
const previous = (id: string) => String(Number(id) - 1).padStart(3, "0");
const next = (id: string) => String(Number(id) + 1).padStart(3, "0");

export const dynamicParams = false;
export function generateStaticParams() { return ids.map((mission) => ({ mission })); }
export async function generateMetadata({ params }: { params: Promise<{ mission: string }> }) {
  const { mission } = await params;
  const data = allMissions[mission];
  return data ? { title: `${data.mission.title} · Vista previa A1 · Linguafly Academy`, robots: { index:false, follow:false } } : {};
}

export default async function A1CurriculumPreviewMission({ params }: { params: Promise<{ mission: string }> }) {
  const { mission } = await params;
  if (!ids.includes(mission)) notFound();
  const data = allMissions[mission];
  const proposed = getPreviewMission(mission);
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/academia/a1/curriculum-preview" className="text-sm font-semibold text-indigo-700 hover:text-indigo-900">← Todas las misiones de la vista previa</Link>
        {proposed && (
          <section className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-bold text-amber-950">Propuesta curricular · pendiente de validación</p><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">Vista previa</span></div>
            <p className="mt-2 text-sm leading-6 text-amber-900">{proposed.audit}</p>
          </section>
        )}
        <div className="mt-5"><CanonicalMission missionData={data} /></div>
        <nav className="mt-8 flex items-center justify-between gap-3 border-t border-slate-200 pt-5">
          {mission !== "001" ? <Link href={`/academia/a1/curriculum-preview/${previous(mission)}`} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-indigo-300">← Misión anterior</Link> : <span />}
          {mission !== "014" ? <Link href={`/academia/a1/curriculum-preview/${next(mission)}`} className="rounded-xl bg-indigo-700 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-800">Misión siguiente →</Link> : <Link href="/academia/a1/curriculum-preview" className="rounded-xl bg-indigo-700 px-4 py-3 text-sm font-semibold text-white">Volver al índice →</Link>}
        </nav>
      </div>
    </main>
  );
}
