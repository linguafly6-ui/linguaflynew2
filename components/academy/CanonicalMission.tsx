"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import missionSource from "@/content/canonical-missions/a1/001.json";

type DictationSegment = { segmentId: string; text: string };
type Item = { itemId: string; english?: string; spanish?: string; prompt?: string; answer?: string; options?: string[]; word?: string; translation?: string; pronunciationGuide?: string; expectedAnswer?: string; kind?: string; audioLocale?: string; audio?: string; repeatCount?: number; segments?: DictationSegment[]; modelAnswer?: string; focus?: string; expectedWordId?: string; gapToken?: string; position: number };
type LessonEntry = { english: string; spanish: string; note?: string; prompt?: string; promptSpanish?: string; pronunciationGuide?: string };
type Lesson = { phrases: LessonEntry[]; grammar: LessonEntry[]; reading: LessonEntry[]; writing: LessonEntry[]; speaking: LessonEntry[]; listening: LessonEntry[]; examples?: LessonEntry[]; communication?: LessonEntry[] };
type Section = { sectionId: string; sectionKey: string; position: number; title?: string; exercise: { exerciseId: string; type: string; items: Item[]; lesson?: Lesson; theory?: { title: string; explanation: string; tip: string; patterns: ({ label?: string; pattern: string; translation?: string; examples?: string[]; exampleTranslations?: string[] } | string)[] }; content?: { passageId?: string; passage?: string; audio?: string; audioTranscript?: string; transcriptTemplate?: string; wordBank?: { wordId: string; word: string }[]; translation?: string; blocks?: { position?: number; title?: string; content?: string; example?: string; translation?: string }[] } } };
export type Mission = { course: { level: string }; unit: { title: string }; mission: { title: string; position?: number }; sections: Section[] };
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
  "I can + verb.": "Puedo + verbo."
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

export default function CanonicalMission({ missionData = missionSource as Mission }: { missionData?: Mission }) {
  const mission = missionData;
  const exploreTranslations = useMemo(() => {
    const normalise = (value: string) => value.toLocaleLowerCase("en-GB").replace(/[“”]/g, '"').replace(/[.!?…]/g, "").replace(/\s+/g, " ").trim();
    const translations = new Map<string, string>();
    const add = (english?: string, spanish?: string, overwrite = false) => {
      if (!english?.trim() || !spanish?.trim()) return;
      const value = spanish.trim();
      if (/^(frase de repaso|modelo oral|modelo completo|estructura practicada|texto completo|repaso no evaluable|modelos con su significado|estructura y ejemplos|saludar|despedirse|preguntar|responder|expresar|reconocer|identificar|presentar|hablar|usar|utilizar|distinguir|aprender|practicar|comprender|observar|leer|elegir|decir|describir|fórmula|regla|concordancia|orden de las palabras)/i.test(value)) return;
      const key = normalise(english);
      if (overwrite || !translations.has(key)) translations.set(key, value);
    };
    mission.sections.forEach((currentSection) => {
      currentSection.exercise.items.forEach((entry) => {
        add(entry.english, entry.spanish);
        add(entry.word, entry.translation);
        add(entry.modelAnswer, entry.translation);
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
    return translations;
  }, [mission]);
  const getExampleTranslation = (english: string) => exploreTranslations.get(english.toLocaleLowerCase("en-GB").replace(/[“”]/g, '"').replace(/[.!?…]/g, "").replace(/\s+/g, " ").trim());
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
  const activeItems = sectionKey === "practice" ? section.exercise.items.slice(0, 10) : section.exercise.items;
  const item = activeItems[index];
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
  const pronunciationByWord = new Map([...exploreItems, ...(pronunciationSection?.exercise.items ?? [])].map((entry) => [((entry.word ?? entry.english) ?? "").toLowerCase(), entry.pronunciationGuide ?? ""]));
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
        {section.exercise.content?.passage && <article className="mt-6 rounded-xl bg-slate-50 p-5 text-base leading-8 text-slate-700">{section.exercise.content?.passage}</article>}
        {sectionKey === "explore" && <div className="mt-7 space-y-8">
          <div className="rounded-2xl border border-[#dce8f4] bg-gradient-to-br from-[#f3f8fd] to-white p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#55779d]">ANTES DE PRACTICAR</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#203752]">Primero comprende. Después practica.</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#61738a]">Aquí tienes explicado todo lo que aparecerá en esta misión. Cada palabra y frase en inglés se acompaña de su significado en español para que puedas aprender desde cero. Primero comprende; después escucha y practica.</p><p className="mt-2 text-xs leading-5 text-[#8792a3]">Aviso: los botones de escucha usan voz sintética del navegador; todavía no representan grabaciones de audio reales revisadas por el equipo académico.</p>
          </div>

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
                  run:"🏃",jump:"🤸",climb:"🧗",swing:"🛝",slide:"🛝",stop:"🛑",walk:"🚶",hop:"🐇",skip:"🦘",breakfast:"🍳",cereal:"🥣",toast:"🍞",egg:"🥚",yoghurt:"🥛",pancake:"🥞",waffle:"🧇",porridge:"🥣",tea:"🍵",sandwich:"🥪",coffee:"☕",lemonade:"🍋",cocoa:"☕",moo:"🐮",quack:"🦆",rooster:"🐓",turkey:"🦃",farm:"🚜",barn:"🏚️",field:"🌾",farmer:"👩‍🌾",goat:"🐐",hen:"🐔",tractor:"🚜",silo:"🏭",shark:"🦈",whale:"🐋",dolphin:"🐬",octopus:"🐙",crab:"🦀",turtle:"🐢",seal:"🦭",jellyfish:"🪼",seahorse:"🐴",bee:"🐝",butterfly:"🦋",ant:"🐜",spider:"🕷️",ladybird:"🐞",caterpillar:"🐛",mosquito:"🦟",beetle:"🪲",dragonfly:"🪰",grasshopper:"🦗",tiger:"🐯",elephant:"🐘",giraffe:"🦒",monkey:"🐒",zebra:"🦓",bear:"🐻",rhino:"🦏",hippo:"🦛",crocodile:"🐊",in:"📦",on:"📚",under:"⬇️","next to":"↔️",behind:"🚪","in front of":"➡️",above:"⬆️",below:"⬇️",inside:"📦",outside:"🏡",baby:"👶",aunt:"👩",uncle:"👨",cousin:"🧑",boy:"👦",girl:"👧",child:"🧒",man:"👨",woman:"👩",eyes:"👀",neighbour:"🏠",person:"🧑",face:"🙂",curly:"🌀",straight:"➡️",blonde:"👱",wear:"👕","put on":"🧥","take off":"🧥",shoes:"👟",coat:"🧥",hat:"🧢",button:"🔘",zip:"🤐",tie:"👔",fold:"📄",clean:"🧽",soap:"🧼",towel:"🧻",tidy:"🧹",dirty:"🫧",sponge:"🧽",broom:"🧹",mop:"🪣",bath:"🛁",shower:"🚿",toothbrush:"🪥",toothpaste:"🦷",shampoo:"🧴",hands:"👐",flannel:"🧽",razor:"🪒",comb:"💇",mirror:"🪞","lunch":"🥪","clock":"🕒","birthday":"🎂","cake":"🍰","candle":"🕯️","present":"🎁","card":"💌","guest":"🧑","invitation":"💌","wish":"🌠","decorate":"🎨","chocolate":"🍫","party":"🎉","balloon":"🎈","music":"🎵","dance":"💃","gift":"🎁","confetti":"🎊","streamer":"🎀","banner":"🏳️","favourite":"⭐","like":"👍","love":"❤️","don't like":"👎","toys":"🧸","food":"🍽️","animals":"🐾","best":"🏆","worst":"👎","game":"🎮","can":"👍","can't":"👎","swim":"🏊","sing":"🎤","fly":"🪽","cook":"🍳" ,"skate":"⛸️","football":"⚽","basketball":"🏀","tennis":"🎾","sport":"🏅","team":"👥","ball":"⚽","racket":"🎾","goal":"🥅","win":"🏆","start":"▶️","medal":"🥇","player":"🏃","race":"🏁","car":"🚗","bus":"🚌","train":"🚆","bike":"🚲","boat":"🚤","plane":"✈️","taxi":"🚕","station":"🚉","driver":"🧑‍✈️","ticket":"🎫","road":"🛣️","street":"🛣️","traffic light":"🚦","cross":"🚶","safe":"🦺","wait":"⏳","school":"🏫","park":"🌳","shop":"🏪","hospital":"🏥","library":"📚","supermarket":"🛒","town":"🏘️","place":"📍"
                };
                const numberCounts: Record<string,number> = {one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10};
                const word = (entry.english ?? "").toLowerCase();
                const count = numberCounts[word];
                const pronunciationGuide = entry.pronunciationGuide ?? pronunciationByWord.get(word);
                return <article key={entry.itemId} className="flex min-w-0 flex-col items-center rounded-2xl border border-[#e8ebf0] bg-white p-3 text-center sm:p-4">
                  <div aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-2xl bg-[#f2f6fb] sm:h-20 sm:w-20">
                    {count ? <div className="flex flex-col items-center justify-center"><span className="text-3xl font-extrabold leading-none text-[#2872c8] sm:text-4xl">{count}</span><span className="mt-1 grid grid-cols-5 gap-0.5 text-[10px] leading-none sm:text-xs">{Array.from({length:count},(_,i)=><span key={i}>🍎</span>)}</span></div> : <span className="text-4xl sm:text-5xl">{word.length === 1 && /^[a-z]$/.test(word) ? "🔠" : visual[word] ?? "🖼️"}</span>}
                  </div>
                  <p className="mt-3 break-words text-base font-bold text-[#26364b] sm:text-lg">{entry.english}</p>
                  <p className="mt-1 text-sm font-medium text-[#64816f]">{entry.spanish}</p>
                  <p className="mt-1 min-h-5 text-xs font-semibold text-[#55708f]">{pronunciationGuide || "Guía de pronunciación pendiente"}</p>
                  <button type="button" aria-label={`Escuchar pronunciación de ${entry.english}`} onClick={() => speak(entry.english ?? "")} className="mt-3 rounded-full border border-[#dce6f0] bg-white px-3 py-1.5 text-xs font-semibold text-[#55708f]">♫ Escuchar voz automática</button>
                </article>;
              })}
            </div>
          </section>}

          {(section.exercise.lesson?.phrases?.length ?? 0) > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">02 · EXPRESIONES</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Frases que vas a utilizar</h3><p className="mt-1 text-sm text-[#7b8798]">Estas son las expresiones que aparecerán en la práctica de traducción.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              {(section.exercise.lesson?.phrases ?? []).map((entry,i) => <article key={i} className="flex items-start gap-3 rounded-xl border border-[#e8ebf0] bg-white p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f2f6fb] text-xl" aria-hidden="true">{["👋","🌅","☀️","🌆","👋","🗓️","🙏","💛","🤝","❓"][i]}</span>
                <div className="min-w-0 flex-1"><p className="font-semibold text-[#26364b]">{entry.english}</p><p className="mt-1 text-sm text-[#64816f]">{entry.spanish}</p>{entry.pronunciationGuide && <p className="mt-1 text-xs font-semibold text-[#55708f]">{entry.pronunciationGuide}</p>}{entry.note && <p className="mt-1 text-xs leading-5 text-[#8290a3]">{entry.note}</p>}</div>
                <button type="button" aria-label={`Escuchar ${entry.english}`} onClick={() => speak(entry.english)} className="shrink-0 rounded-full border border-[#dce6f0] px-3 py-2 text-xs text-[#55708f]">♫</button>
              </article>)}
            </div>
          </section>}

          {((section.exercise.theory?.title || section.exercise.theory?.explanation || (section.exercise.theory?.patterns?.length ?? 0) > 0) || (section.exercise.lesson?.grammar?.length ?? 0) > 0) && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">03 · GRAMÁTICA</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">{section.exercise.theory?.title ?? "Gramática de la misión"}</h3><p className="mt-1 text-sm leading-6 text-[#7b8798]">{section.exercise.theory?.explanation}</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              {(section.exercise.theory?.patterns ?? []).filter(Boolean).map((pattern, i) => <article key={typeof pattern === "string" ? pattern : pattern.label ?? pattern.pattern ?? i} className="rounded-xl border border-[#e8ebf0] bg-[#fbfcfe] p-4">
                {typeof pattern !== "string" && pattern.label && <p className="text-xs font-bold uppercase tracking-wide text-[#55779d]">{pattern.label}</p>}
                <p className="mt-2 font-semibold text-[#26364b]">{typeof pattern === "string" ? pattern : pattern.pattern}</p>{typeof pattern !== "string" && (pattern.translation ?? getExampleTranslation(pattern.pattern)) && <p className="mt-1 text-sm text-[#47745b]">{pattern.translation ?? getExampleTranslation(pattern.pattern)}</p>
                {typeof pattern !== "string" && pattern.examples?.length ? <ul className="mt-3 space-y-2">{(pattern.examples ?? []).map((example, exampleIndex) => {
                  const inlineTranslation = example.match(/^(.+?)\s+[—–]\s+(.+)$/);
                  const displayedExample = inlineTranslation?.[1] ?? example;
                  const translation = pattern.exampleTranslations?.[exampleIndex] ?? getExampleTranslation(displayedExample) ?? inlineTranslation?.[2];
                  return <li key={example + exampleIndex} className="list-none rounded-xl border border-[#e8edf3] bg-white p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold leading-6 text-[#26364b]">{displayedExample}</p>
                        {translation ? <p className="mt-1 text-sm leading-6 text-[#47745b]">{translation}</p> : <p className="mt-1 text-xs text-amber-700">Traducción pendiente de revisión académica.</p>}
                      </div>
                      <button type="button" aria-label={`Escuchar ${displayedExample}`} onClick={() => speak(displayedExample)} className="shrink-0 rounded-full border border-[#dce6f0] px-3 py-2 text-xs font-semibold text-[#55708f]">♫</button>
                    </div>
                  </li>;
                })}</ul> : null}
              </article>)}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {(section.exercise.lesson?.grammar ?? []).map((entry,i) => <article key={i} className="rounded-xl border border-[#e8ebf0] bg-white p-4">
                <p className="font-semibold text-[#26364b]">{entry.english}</p><p className="mt-1 text-sm font-medium text-[#64816f]">{entry.spanish}</p>{entry.note && <p className="mt-1 text-xs leading-5 text-[#8290a3]">{entry.note}</p>}
                <button type="button" onClick={() => speak(entry.english)} className="mt-2 text-xs font-semibold text-[#55708f]">♫ Escuchar ejemplo</button>
              </article>)}
            </div>
            {section.exercise.theory?.tip && <p className="mt-3 rounded-xl bg-[#f3f7fb] p-4 text-sm leading-6 text-[#53657b]"><strong>Recuerda:</strong> {section.exercise.theory.tip}</p>}
          </section>}

          {(mission.sections.find(s => s.sectionKey === "pronunciation")?.exercise.items.length ?? 0) > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">04 · PRONUNCIACIÓN</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Así suenan las palabras</h3><p className="mt-1 text-sm text-[#7b8798]">La guía está adaptada a hispanohablantes; las MAYÚSCULAS marcan la sílaba tónica. Es aproximada, no AFI.</p></div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {mission.sections.find(s => s.sectionKey === "pronunciation")?.exercise.items.map(entry => <article key={entry.itemId} className="rounded-xl border border-[#e8ebf0] bg-white p-4">
                <p className="text-lg font-bold text-[#26364b]">{entry.word}</p><p className="text-sm text-[#64816f]">{entry.translation}</p><div className="mt-2 rounded-lg bg-[#f3f7fb] px-3 py-2"><p className="text-[10px] font-bold uppercase tracking-wide text-[#8290a3]">Guía para hispanohablantes</p><p className="mt-1 text-sm font-semibold text-[#55708f]">{entry.pronunciationGuide}</p></div>
                <button type="button" onClick={() => speak(entry.word ?? "")} className="mt-3 rounded-full border border-[#dce6f0] px-3 py-1.5 text-xs font-semibold text-[#55708f]">♫ Escuchar</button>
              </article>)}
            </div>
          </section>}

          {(section.exercise.lesson?.reading?.length ?? 0) > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">05 · LECTURA</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Lee y comprende el texto</h3><p className="mt-1 text-sm text-[#7b8798]">Cada frase aparece con su traducción para que entiendas el texto antes de responder preguntas.</p></div>
            <div className="space-y-2">{(section.exercise.lesson?.reading ?? []).map((entry,i) => <article key={i} className="grid gap-1 rounded-xl border border-[#e8ebf0] bg-white p-4 sm:grid-cols-2 sm:gap-4"><p className="font-medium text-[#26364b]">{entry.english}</p><p className="text-sm text-[#64816f]">{entry.spanish}</p></article>)}</div>
          </section>}

          {(section.exercise.lesson?.writing?.length ?? 0) > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">06 · ESCRITURA</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Frases del dictado</h3><p className="mt-1 text-sm text-[#7b8798]">Estas son exactamente las frases que escucharás y escribirás en la actividad.</p></div>
            <div className="grid gap-2 sm:grid-cols-2">{(section.exercise.lesson?.writing ?? []).map((entry,i) => <article key={i} className="rounded-xl border border-[#e8ebf0] bg-white p-4"><p className="font-semibold text-[#26364b]">{entry.english}</p><p className="mt-1 text-sm text-[#64816f]">{entry.spanish}</p><button type="button" onClick={() => speak(entry.english)} className="mt-2 text-xs font-semibold text-[#55708f]">♫ Escuchar frase</button></article>)}</div>
          </section>}

          {(section.exercise.lesson?.speaking?.length ?? 0) > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">07 · EXPRESIÓN ORAL</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Lo que podrás decir</h3><p className="mt-1 text-sm text-[#7b8798]">Primero entiende la consigna y aprende una posible respuesta.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">{(section.exercise.lesson?.speaking ?? []).map((entry,i) => <article key={i} className="rounded-xl border border-[#e8ebf0] bg-white p-4">
              <p className="text-xs font-semibold text-[#8290a3]">{entry.promptSpanish}</p><p className="mt-2 font-semibold text-[#26364b]">{entry.english}</p><p className="mt-1 text-sm text-[#64816f]">{entry.spanish}</p><button type="button" onClick={() => speak(entry.english)} className="mt-2 text-xs font-semibold text-[#55708f]">♫ Escuchar modelo</button>
            </article>)}</div>
          </section>}

          {(section.exercise.lesson?.listening?.length ?? 0) > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">08 · COMPRENSIÓN AUDITIVA</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Escucha el contenido antes del ejercicio</h3><p className="mt-1 text-sm text-[#7b8798]">Lee el audio completo con su traducción. Después podrás reconocer estas mismas palabras y expresiones al escucharlas.</p></div>
            <div className="mb-3 rounded-xl border border-[#dce8f4] bg-[#f3f8fd] p-4"><p className="text-xs font-bold uppercase tracking-wide text-[#55779d]">Audio completo</p><button type="button" onClick={() => speak(mission.sections.find(s => s.sectionKey === "listening")?.exercise.content?.audioTranscript?.replace(/^tts:en-GB:/,"") ?? "")} className="mt-2 rounded-full border border-[#dce6f0] bg-white px-3 py-2 text-xs font-semibold text-[#55708f]">♫ Escuchar audio modelo</button></div>
            <div className="space-y-2">{(section.exercise.lesson?.listening ?? []).map((entry,i) => <article key={i} className="grid gap-1 rounded-xl border border-[#e8ebf0] bg-white p-4 sm:grid-cols-2 sm:gap-4"><p className="font-medium text-[#26364b]">{entry.english}</p><p className="text-sm text-[#64816f]">{entry.spanish}</p></article>)}</div>
          </section>}
          {(section.exercise.lesson?.examples?.length ?? 0) > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">09 · EJEMPLOS EN CONTEXTO</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">El inglés en situaciones reales</h3><p className="mt-1 text-sm text-[#7b8798]">Observa cómo se combinan las palabras y estructuras de la misión.</p></div>
            <div className="grid gap-2 sm:grid-cols-2">{(section.exercise.lesson?.examples ?? []).map((entry,i) => <article key={i} className="rounded-xl border border-[#e8ebf0] bg-white p-4"><p className="font-semibold text-[#26364b]">{entry.english}</p><p className="mt-1 text-sm text-[#64816f]">{entry.spanish}</p>{entry.note && <p className="mt-2 text-xs leading-5 text-[#8290a3]">{entry.note}</p>}<button type="button" onClick={() => speak(entry.english)} className="mt-2 text-xs font-semibold text-[#55708f]">♫ Escuchar ejemplo</button></article>)}</div>
          </section>}
          {(section.exercise.lesson?.communication?.length ?? 0) > 0 && <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">10 · GUÍA DE COMUNICACIÓN</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Utiliza lo que has aprendido</h3><p className="mt-1 text-sm text-[#7b8798]">Estas expresiones te ayudan a resolver la situación comunicativa de la misión.</p></div>
            <div className="space-y-2">{(section.exercise.lesson?.communication ?? []).map((entry,i) => <article key={i} className="grid gap-1 rounded-xl border border-[#e8ebf0] bg-white p-4 sm:grid-cols-2 sm:gap-4"><div><p className="font-semibold text-[#26364b]">{entry.english}</p>{entry.note && <p className="mt-1 text-xs text-[#8290a3]">{entry.note}</p>}</div><div className="flex items-start justify-between gap-3"><p className="text-sm text-[#64816f]">{entry.spanish}</p><button type="button" onClick={() => speak(entry.english)} className="shrink-0 text-xs font-semibold text-[#55708f]">♫</button></div></article>)}</div>
          </section>}
          <div className="rounded-2xl border border-[#dce8f4] bg-[#f3f8fd] p-5 text-center"><p className="text-sm font-semibold text-[#284866]">Ya has visto y comprendido el temario de esta misión.</p><p className="mt-1 text-sm text-[#61738a]">Cuando estés preparado, pasa a las actividades para practicarlo.</p></div>
        </div>}
        {sectionKey === "pronunciation" && item?.options?.length ? <div className="mt-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Actividad de pronunciación {index + 1} de {activeItems.length}</p>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="text-lg font-bold text-slate-900">{item.word}</p><p className="mt-1 text-sm text-slate-600">{item.translation}</p><div className="mt-2 inline-block rounded-lg bg-white px-3 py-2"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Guía para hispanohablantes</p><p className="mt-1 text-sm font-semibold text-blue-800">{item.pronunciationGuide}</p></div><p className="mt-2 text-xs text-slate-500">Guía aproximada para hispanohablantes; no es AFI.</p><button type="button" onClick={() => speak(item.word ?? "")} className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold">♫ Escuchar modelo británico</button></div>
          <h3 className="mt-5 text-lg font-semibold leading-7">{item.prompt}</h3>
          <div className="mt-4 grid gap-2">{optionsReady ? getOptions(item).map((option) => <button key={option} type="button" disabled={checked} onClick={() => mark(option === getCorrectAnswer(item), getCorrectAnswer(item))} className={`rounded-xl border px-4 py-3 text-left text-sm transition disabled:cursor-default ${checked && option === getCorrectAnswer(item) ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-blue-400"}`}>{option}</button>) : <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">Preparando opciones…</p>}</div>
        </div> : null}
        {sectionKey === "pronunciation" && !item?.options?.length && <div className="mt-6 grid gap-3 sm:grid-cols-2">{section.exercise.items.map((entry) => <article key={entry.itemId} className="rounded-xl border border-slate-200 p-4"><p className="text-lg font-semibold">{entry.word}</p><p className="text-sm text-slate-500">{entry.translation}</p><div className="mt-2 rounded-lg bg-blue-50 px-3 py-2"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Guía para hispanohablantes</p><p className="mt-1 font-medium text-blue-700">{entry.pronunciationGuide}</p></div><p className="text-xs text-slate-400">Guía aproximada para hispanohablantes; no es AFI.</p><button onClick={() => speak(entry.word ?? "")} className="mt-3 rounded-lg border border-slate-200 px-3 py-2 text-sm">▶ Escuchar modelo británico</button></article>)}</div>}
        {["practice", "grammar", "reading"].includes(sectionKey) && item && <div className="mt-7"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Actividad {index + 1} de {activeItems.length}</p><h3 className="mt-3 text-lg font-semibold leading-7">{item.prompt}</h3>{sectionKey === "grammar" && item.audio && <button type="button" onClick={() => speak(item.audio?.replace(/^tts:[^:]+:/, "") ?? "")} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800">♫ Escuchar nombre de la letra</button>}<div className="mt-5 grid gap-2">{optionsReady ? getOptions(item).map((option) => <button key={option} disabled={checked} onClick={() => mark(option === getCorrectAnswer(item), getCorrectAnswer(item))} className={`rounded-xl border px-4 py-3 text-left text-sm transition disabled:cursor-default ${checked && option === getCorrectAnswer(item) ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-blue-400"}`}>{option}</button>) : <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">Preparando opciones…</p>}</div></div>}
{sectionKey === "writing" && item && <div className="mt-7"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Dictado {index + 1} de 10 · {item.kind === "passage" ? "Texto" : "Una frase"}</p><p className="mt-3 text-sm leading-6 text-slate-600">Escucha como en un dictado de clase. Cada frase se reproduce tres veces: a ritmo natural, más despacio y de nuevo a ritmo natural. El texto no se muestra hasta que compruebes tu respuesta.</p><div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-semibold text-slate-800">Dictado guiado</p><span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">3 repeticiones por frase</span></div><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={startDictation} className="rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white">▶ {dictationPlaying ? "Reiniciar dictado" : "Reproducir dictado"}</button><button type="button" onClick={dictationPaused ? resumeDictation : pauseDictation} disabled={!dictationPlaying} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 disabled:opacity-40">{dictationPaused ? "Continuar" : "Pausar"}</button><button type="button" onClick={stopDictation} disabled={!dictationPlaying} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 disabled:opacity-40">Detener</button></div><div className="mt-4 flex items-center justify-between gap-3 text-xs text-slate-500"><span>Frase {dictationSegment + 1} de {item.segments?.length ?? 1}</span><span>Repetición {dictationRepeat || 0} de {item.repeatCount ?? 3}</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-blue-700 transition-all" style={{ width: (((dictationSegment * (item.repeatCount ?? 3)) + dictationRepeat) / ((item.segments?.length ?? 1) * (item.repeatCount ?? 3))) * 100 + "%" }} /></div><p role="status" aria-live="polite" className="mt-3 text-xs leading-5 text-slate-500">{dictationMessage || "Pulsa reproducir para empezar. Puedes pausar o repetir el dictado."}</p></div><label className="mt-5 block text-sm font-medium">Escribe lo que has escuchado<textarea value={draft} onChange={(e) => setDraft(e.target.value)} disabled={checked} rows={item.kind === "passage" ? 7 : 3} placeholder="Escribe aquí el dictado completo…" className="mt-2 block w-full resize-y rounded-xl border border-slate-300 p-3 leading-7 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50" /></label><p className="mt-2 text-xs text-slate-500">Puedes volver a escuchar el audio tantas veces como necesites. El campo empieza vacío para que escribas lo que oyes.</p><div className="mt-3 flex flex-wrap items-center gap-2"><button type="button" disabled={checked || dictationHintLevel >= 2} onClick={() => setDictationHintLevel((level) => Math.min(level + 1, 2))} className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-900 disabled:opacity-40">💡 {dictationHintLevel === 0 ? "Mostrar pista" : "Mostrar otra pista"}</button>{dictationHintLevel > 0 && <span className="text-xs font-medium text-slate-500">Pista {dictationHintLevel} de 2: <strong className="font-mono tracking-wider text-slate-800">{buildDictationHint(item.expectedAnswer ?? "", dictationHintLevel)}</strong></span>}</div><p className="mt-1 text-xs text-slate-500">La pista revela algunas letras, pero nunca muestra por completo una palabra. En respuestas de una sola letra solo indica el espacio que debes completar.</p><button disabled={checked || !draft.trim()} onClick={() => { const normalise = (value: string) => value.toLocaleLowerCase("en-GB").normalize("NFKC").replace(/[.,!?;:'’"]/g, "").replace(/\s+/g, " ").trim(); mark(normalise(draft) === normalise(item.expectedAnswer ?? ""), item.expectedAnswer ?? ""); }} className="mt-3 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-40">Comprobar dictado</button></div>}
        {sectionKey === "speaking" && item && <div className="mt-7"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Tarea oral {index + 1} de 10</p><h3 className="mt-3 text-lg font-semibold">{item.prompt}</h3><div className="mt-4 rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Modelo de referencia</p><p className="mt-2 text-sm text-slate-700">{item.modelAnswer}</p><button onClick={() => speak(item.modelAnswer ?? "")} className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">▶ Escuchar modelo</button></div><div className="mt-4 flex flex-wrap gap-2"><button onClick={recording ? stopRecording : startRecording} className={recording ? "rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white" : "rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white"}>{recording ? "■ Detener grabación" : "● Grabar mi respuesta"}</button>{recordedUrl && <audio controls src={recordedUrl} className="w-full" />}</div><p role="status" className="mt-3 text-sm text-slate-500">{recordingMessage || "La grabación permanece en esta página y no se envía al servidor."}</p><p className="mt-2 text-xs text-slate-400">No se genera una nota fonética automática en esta versión.</p><button disabled={checked} onClick={() => { setChecked(true); setFeedback("Tarea oral completada. Tu grabación permanece en esta página y no se ha evaluado."); }} className="mt-4 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold disabled:opacity-40">Marcar tarea como completada</button></div>}
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
        {feedback && <p role="status" aria-live="polite" className="mt-5 rounded-2xl border border-[#e4ebf2] bg-[#f5f8fb] p-4 text-sm font-semibold leading-6 text-[#43546b]">{feedback}</p>}
        {sectionKey !== "explore" && sectionKey !== "pronunciation" && sectionKey !== "listening" && <div className="mt-7 flex items-center justify-between gap-3"><span className="text-xs text-slate-400">Puntuación de esta sesión: {score}</span><button onClick={next} disabled={!checked} className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">{index === activeItems.length - 1 ? "Finalizar sección" : "Siguiente →"}</button></div>}
      </section>
      <p className="mt-4 text-center text-[11px] leading-5 text-[#9aa3b1]">Vista piloto · El progreso y las grabaciones son temporales y no se guardan en tu cuenta.</p>
    </div>
  );
}
