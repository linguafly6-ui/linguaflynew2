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
  "shirt":"camisa","T-shirt":"camiseta","trousers":"pantalones","jeans":"vaqueros","dress":"vestido","skirt":"falda","shoes":"zapatos","jacket":"chaqueta","coat":"abrigo","trainers":"zapatillas deportivas","blue":"azul","black":"negro","red":"rojo","white":"blanco","size":"talla","wear":"llevar puesto",
  "football":"fútbol","tennis":"tenis","basketball":"baloncesto","swimming":"natación","cycling":"ciclismo","run":"correr","jump":"saltar","play":"jugar","can":"poder / saber","can't":"no poder / no saber","sports equipment":"material deportivo","training":"entrenamiento","ride a bicycle":"montar en bicicleta"
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
  "017":["What do you do in your free time?","I like listening to music.","She loves reading books.","He doesn't like cooking.","Do you like dancing?","Yes, I do. I love it.","Does Nina enjoy taking photos?","They like meeting their friends.","My favourite hobby is cycling.","We sometimes play games together."],
  "016":["I am wearing a blue shirt.","She wears black shoes.","He is wearing a red jacket.","What colour is your T-shirt?","I need a new pair of jeans.","This dress is white.","Do you have this skirt in black?","What size do you need?","I like your trainers.","The coat is too big."],
  "015":["I can swim very well.","She can't play tennis.","Can you ride a bicycle?","My brother plays football on Saturdays.","We can speak two languages.","He can't run very fast.","Can they play basketball?","I like swimming in the sea.","You can use my sports equipment.","I can't come to training today."]
};
const mission017Grammar = [
  { prompt:"Choose the correct sentence.", answer:"I like reading.", options:["I like reading.","I likes reading.","I like read."] },
  { prompt:"Complete: She ___ dancing.", answer:"likes", options:["likes","like","liking"] },
  { prompt:"Choose the correct negative.", answer:"I don't like cooking.", options:["I don't like cooking.","I doesn't like cooking.","I not like cooking."] },
  { prompt:"Choose the correct question.", answer:"Do you like music?", options:["Do you like music?","Are you like music?","Does you like music?"] },
  { prompt:"Complete: ___ he like taking photos?", answer:"Does", options:["Does","Do","Is"] },
  { prompt:"Choose the correct short answer.", answer:"Yes, I do.", options:["Yes, I do.","Yes, I like.","Yes, I am."] },
  { prompt:"Complete: They ___ meeting friends.", answer:"love", options:["love","loves","loving"] },
  { prompt:"Which form follows like in this lesson?", answer:"verb + -ing", options:["verb + -ing","verb + -s only","past form"] },
  { prompt:"Choose the correct sentence.", answer:"He doesn't like watching TV.", options:["He doesn't like watching TV.","He don't like watching TV.","He doesn't likes watching TV."] },
  { prompt:"Complete: What ___ you like doing?", answer:"do", options:["do","does","are"] }
];
const mission017Reading = [
  { prompt:"What does Alex like doing?", answer:"Listening to music and cycling.", options:["Listening to music and cycling.","Cooking and dancing.","Taking photos and swimming."] },
  { prompt:"Does Alex like cooking?", answer:"No, he doesn't.", options:["No, he doesn't.","Yes, he does.","The text doesn't say."] },
  { prompt:"What is Nina's favourite hobby?", answer:"Taking photos.", options:["Taking photos.","Reading books.","Playing football."] },
  { prompt:"Does Nina enjoy reading?", answer:"Yes, she does.", options:["Yes, she does.","No, she doesn't.","The text doesn't say."] },
  { prompt:"When do Alex and Nina meet?", answer:"At the weekend.", options:["At the weekend.","Every morning.","After every lesson."] },
  { prompt:"What do they sometimes do together?", answer:"Play games.", options:["Play games.","Cook dinner.","Watch a film at school."] },
  { prompt:"Who likes dancing?", answer:"Nina.", options:["Nina.","Alex.","Both of them."] },
  { prompt:"Which activity does Alex dislike?", answer:"Cooking.", options:["Cooking.","Cycling.","Listening to music."] },
  { prompt:"What do they have in common?", answer:"They both like music.", options:["They both like music.","They both like cooking.","They both dislike reading."] },
  { prompt:"What is the text mainly about?", answer:"Free-time activities and hobbies.", options:["Free-time activities and hobbies.","Clothes and colours.","A visit to a café."] }
];
const mission016Grammar = [
  { prompt:"Choose the correct word order.", answer:"a blue shirt", options:["a blue shirt","a shirt blue","blue a shirt"] },
  { prompt:"Complete: She ___ black shoes.", answer:"wears", options:["wears","wear","wearing"] },
  { prompt:"Choose the correct sentence.", answer:"I'm wearing a red jacket.", options:["I'm wearing a red jacket.","I wearing a red jacket.","I am wear a red jacket."] },
  { prompt:"Choose the correct question about colour.", answer:"What colour is it?", options:["What colour is it?","What is colour it?","Which colour it is?"] },
  { prompt:"Complete: He ___ a white T-shirt.", answer:"is wearing", options:["is wearing","wear","wears wearing"] },
  { prompt:"Choose the correct phrase.", answer:"black trousers", options:["black trousers","trousers black","the black trouserses"] },
  { prompt:"Complete: What size ___ you need?", answer:"do", options:["do","are","does"] },
  { prompt:"Choose the correct sentence.", answer:"I wear jeans every day.", options:["I wear jeans every day.","I wears jeans every day.","I am wear jeans every day."] },
  { prompt:"Which adjective comes first?", answer:"The colour", options:["The colour","The clothing noun","The size"] },
  { prompt:"Complete: This coat ___ too big.", answer:"is", options:["is","are","be"] }
];
const mission016Reading = [
  { prompt:"What is Mia wearing?", answer:"A blue T-shirt and black jeans.", options:["A blue T-shirt and black jeans.","A red dress and white shoes.","A green coat and blue trousers."] },
  { prompt:"What colour is Leo's jacket?", answer:"Red.", options:["Red.","Black.","White."] },
  { prompt:"What does Mia want to buy?", answer:"A new pair of trainers.", options:["A new pair of trainers.","A blue skirt.","A white shirt."] },
  { prompt:"What size does the shop assistant show her?", answer:"Size 38.", options:["Size 38.","Size 40.","Size 36."] },
  { prompt:"Are the first trainers too small?", answer:"Yes, they are.", options:["Yes, they are.","No, they aren't.","The text doesn't say."] },
  { prompt:"What colour trainers does Mia choose?", answer:"White.", options:["White.","Black.","Red."] },
  { prompt:"What is Leo wearing?", answer:"A red jacket and grey trousers.", options:["A red jacket and grey trousers.","A blue shirt and black jeans.","A white coat and a skirt."] },
  { prompt:"Where are Mia and Leo?", answer:"In a clothes shop.", options:["In a clothes shop.","At school.","In a café."] },
  { prompt:"Which item is plural?", answer:"Trainers.", options:["Trainers.","Jacket.","T-shirt."] },
  { prompt:"What is the main topic?", answer:"Clothes, colours and sizes.", options:["Clothes, colours and sizes.","Sports and abilities.","Food and drink."] }
];
const mission015Grammar = [
  { prompt:"Choose the correct sentence.", answer:"I can swim.", options:["I can swim.","I can to swim.","I cans swim."] },
  { prompt:"Complete: She ___ play tennis.", answer:"can't", options:["can't","don't","isn't"] },
  { prompt:"Choose the correct question.", answer:"Can you ride a bicycle?", options:["Can you ride a bicycle?","Do you can ride a bicycle?","Can ride you a bicycle?"] },
  { prompt:"Choose the short answer: Can Leo swim?", answer:"No, he can't.", options:["No, he can't.","No, he doesn't.","No, he isn't."] },
  { prompt:"Complete: Mia can ___ very well.", answer:"swim", options:["swim","swims","swimming"] },
  { prompt:"Choose the correct sentence about two people.", answer:"They can play basketball.", options:["They can play basketball.","They cans play basketball.","They can to play basketball."] },
  { prompt:"Which verb form follows can?", answer:"base form (play)", options:["base form (play)","plays","to play"] },
  { prompt:"Complete: He ___ run very fast.", answer:"can't", options:["can't","can to","doesn't can"] },
  { prompt:"Choose the natural expression.", answer:"play football", options:["play football","go football","do football"] },
  { prompt:"Choose the natural expression.", answer:"go swimming", options:["go swimming","play swimming","do swim"] }
];
const mission015Reading = [
  { prompt:"Which sports can Mia do?", answer:"Swimming and cycling.", options:["Swimming and cycling.","Tennis and football.","Basketball and running."] },
  { prompt:"Can Mia play tennis?", answer:"No, she can't.", options:["No, she can't.","Yes, she can.","The text doesn't say."] },
  { prompt:"Which sports can Leo play?", answer:"Football and basketball.", options:["Football and basketball.","Tennis and swimming.","Cycling and tennis."] },
  { prompt:"Can Leo swim?", answer:"No, he can't.", options:["No, he can't.","Yes, he can.","Only in summer."] },
  { prompt:"When do Mia and Leo practise?", answer:"After school.", options:["After school.","Before breakfast.","At the weekend."] },
  { prompt:"Who runs fast?", answer:"Leo.", options:["Leo.","Mia.","Both of them."] },
  { prompt:"What does Mia ask Leo to teach her?", answer:"Basketball.", options:["Basketball.","Tennis.","Swimming."] },
  { prompt:"Does Leo agree to help Mia?", answer:"Yes, he does.", options:["Yes, he does.","No, he doesn't.","The text doesn't say."] },
  { prompt:"Find the sentence that expresses inability.", answer:"Mia can't play tennis.", options:["Mia can't play tennis.","Mia can swim very well.","Leo can play football."] },
  { prompt:"What is the main topic of the text?", answer:"Sports and abilities.", options:["Sports and abilities.","School subjects.","Food and drink."] }
];
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
  "016":"Mia and Leo are in a clothes shop. Mia is wearing a blue T-shirt and black jeans. Leo is wearing a red jacket and grey trousers. Mia wants to buy new trainers. The shop assistant shows her size 38, but the first pair is too small. She tries size 40 and chooses white trainers. Leo says her new trainers look great.",
  "015":"Mia and Leo are talking about sport. Mia can swim very well and she can ride a bicycle, but she can't play tennis. Leo can play football and basketball. He runs fast, but he can't swim. They practise after school and help each other. Mia says, “Can you teach me basketball?” Leo says, “Yes, I can!”"
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
      items = (id === "017" ? mission017Grammar : id === "016" ? mission016Grammar : id === "015" ? mission015Grammar : Array.from({length:10},(_,i) => ({ prompt:"Which grammar structure is practised in this mission?", answer:p.grammar[i%p.grammar.length], options:[p.grammar[i%p.grammar.length],p.grammar[(i+1)%p.grammar.length],p.grammar[(i+2)%p.grammar.length]] }))).map((q:any,i:number) => ({ itemId:`english-a1-m${id}-grammar-${i+1}`, position:i+1, ...q, evaluation:{type:"single_choice"} }));
    } else if (key === "pronunciation") {
      items = vocab.flatMap((word,i) => word.english.split(" / ").map((term,partIndex) => ({ itemId:`english-a1-m${id}-pronunciation-${i+1}-${partIndex+1}`, position:i+1, word:term, translation:word.spanish.split(" / ")[partIndex] ?? word.spanish, pronunciationGuide:getSpanishPronunciationGuide(term), audio:"tts:en-GB", prompt:"Listen, read the guide and repeat the word.", options:[term,vocab[(i+1)%vocab.length].english,vocab[(i+2)%vocab.length].english], answer:term, taskType:"listening_and_guided_production" })));
    } else if (key === "reading") {
      content = { passageId:`english-a1-m${id}-reading-passage`, passage:passages[id] ?? p.goal };
      items = (id === "017" ? mission017Reading : id === "016" ? mission016Reading : id === "015" ? mission015Reading : Array.from({length:10},(_,i) => ({ prompt:`Read the text and identify information about: ${vocab[i%vocab.length].english}.`, answer:vocab[i%vocab.length].english, options:[vocab[i%vocab.length].english,vocab[(i+1)%vocab.length].english,vocab[(i+2)%vocab.length].english] }))).map((q:any,i:number) => ({ itemId:`english-a1-m${id}-reading-${i+1}`, position:i+1, ...q, evaluation:{type:"single_choice"} }));
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
          {mission !== "017" ? <Link href={`/academia/a1/curriculum-preview/${next(mission)}`} className="rounded-xl bg-indigo-700 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-800">Misión siguiente →</Link> : <Link href="/academia/a1/curriculum-preview" className="rounded-xl bg-indigo-700 px-4 py-3 text-sm font-semibold text-white">Volver al índice →</Link>}
        </nav>
      </div>
    </main>
  );
}
