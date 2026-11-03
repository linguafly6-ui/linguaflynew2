"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { A2_UNIT_WORDS, A2_DEFAULT_WORDS } from "@/lib/a2-speaking-words";
import { B1_UNIT_WORDS, B1_DEFAULT_WORDS } from "@/lib/b1-speaking-words";
import { B2_UNIT_WORDS, B2_DEFAULT_WORDS } from "@/lib/b2-speaking-words";
import { C1_UNIT_WORDS, C1_DEFAULT_WORDS } from "@/lib/c1-speaking-words";
import { C2_UNIT_WORDS, C2_DEFAULT_WORDS } from "@/lib/c2-speaking-words";


// ============================================================
// LISTAS DE PALABRAS Y FRASES POR UNIDAD (1-100)
// Cada cuarta unidad es un constructor de frases.
// ============================================================

const UNIT_WORDS: Record<string, string[]> = {
  "a1-speaking-1": ["Hello", "Good morning", "Good afternoon", "Good evening", "Hi there", "Goodbye", "See you later", "Good night", "Nice to meet you", "Have a nice day"],
  "a1-speaking-2": ["How are you", "I'm fine thank you", "What's your name", "My name is", "Nice to meet you", "Where are you from", "I'm from Spain", "How old are you", "I'm twenty years old", "See you soon"],
  "a1-speaking-3": ["Can you help me", "Excuse me", "Sorry", "Thank you", "You're welcome", "Please", "Of course", "No problem", "I don't understand", "Could you repeat that"],
  "a1-speaking-4": ["Hello, how are you", "Good morning, my name is John", "Can you help me please", "Thank you, you're welcome", "Hi there, nice to meet you", "Sorry, I don't understand", "Goodbye, see you later", "Excuse me, where are you from", "Good night, have a nice day", "How old are you, I'm twenty"],
  "a1-speaking-5": ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"],
  "a1-speaking-6": ["Red", "Blue", "Green", "Yellow", "Black", "White", "Orange", "Purple", "Brown", "Pink"],
  "a1-speaking-7": ["Mother", "Father", "Brother", "Sister", "Grandmother", "Grandfather", "Son", "Daughter", "Aunt", "Uncle"],
  "a1-speaking-8": ["My mother is from Spain", "I have two brothers and one sister", "The apple is red", "My father is forty years old", "Hello, my name is John and I'm ten", "Can you help me, thank you", "Good morning, how are you today", "My favorite color is blue", "Nice to meet you, goodbye", "I'm from Spain, see you soon"],
  "a1-speaking-9": ["Water", "Bread", "Milk", "Coffee", "Tea", "Apple", "Banana", "Rice", "Chicken", "Fish"],
  "a1-speaking-10": ["I like coffee", "I don't like tea", "Can I have water", "I want bread", "Do you like fish", "I love apples", "The rice is good", "I need milk", "Thank you for the chicken", "No problem, enjoy your meal"],
  "a1-speaking-11": ["Breakfast", "Lunch", "Dinner", "Hungry", "Thirsty", "Delicious", "Restaurant", "Menu", "Waiter", "Bill"],
  "a1-speaking-12": ["I'm hungry, can I have bread", "Good morning, I'd like coffee please", "My mother makes delicious chicken", "What's your name, are you hungry", "I don't like fish but I love rice", "Excuse me waiter, can I have the bill", "Thank you, the breakfast was delicious", "I'm thirsty, can I have water", "Hello, welcome to the restaurant", "I have lunch at one o'clock"],
  "a1-speaking-13": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Today", "Tomorrow", "Yesterday"],
  "a1-speaking-14": ["Morning", "Afternoon", "Evening", "Night", "Week", "Weekend", "Time", "Hour", "Minute", "Clock"],
  "a1-speaking-15": ["Get up", "Have breakfast", "Go to work", "Have lunch", "Go home", "Have dinner", "Watch TV", "Go to bed", "Take a shower", "Brush my teeth"],
  "a1-speaking-16": ["I get up at seven on Monday", "I have breakfast and then go to work", "What time is it, it's five o'clock", "I go home at six in the evening", "On Saturday I watch TV", "I have dinner at nine at night", "Good morning, did you have breakfast", "I take a shower and brush my teeth", "Tomorrow is Friday, the weekend is near", "Yesterday I had lunch at the restaurant"],
  "a1-speaking-17": ["House", "Room", "Kitchen", "Bedroom", "Bathroom", "Living room", "Door", "Window", "Table", "Chair"],
  "a1-speaking-18": ["Bed", "Sofa", "Lamp", "Clock", "Mirror", "Cupboard", "Shelf", "Carpet", "Curtain", "Pillow"],
  "a1-speaking-19": ["In", "On", "Under", "Next to", "Behind", "In front of", "Above", "Below", "Inside", "Outside"],
  "a1-speaking-20": ["The lamp is on the table", "My bed is in the bedroom", "The clock is next to the window", "I have a mirror in the bathroom", "The sofa is in the living room", "The carpet is under the chair", "There is a curtain behind the door", "The pillow is above the bed", "My house has a big kitchen", "The cupboard is inside the kitchen"],
  "a1-speaking-21": ["Shirt", "Trousers", "Dress", "Skirt", "Shoes", "Socks", "Coat", "Hat", "Gloves", "Scarf"],
  "a1-speaking-22": ["Head", "Hair", "Eyes", "Nose", "Mouth", "Ears", "Hands", "Feet", "Arms", "Legs"],
  "a1-speaking-23": ["I have", "I need", "I want", "I like", "I wear", "I see", "I hear", "I touch", "I smell", "I feel"],
  "a1-speaking-24": ["I wear a blue shirt and black trousers", "My head hurts, can you help me", "I need new shoes for work", "She has brown eyes and long hair", "I want a red dress for dinner", "Put on your coat and scarf, it's cold", "I see a hat on the table", "My hands are cold, I need gloves", "I have two socks in my cupboard", "I hear you, can you repeat please"],
  "a1-speaking-25": ["Sunny", "Rainy", "Cloudy", "Windy", "Snowy", "Hot", "Cold", "Warm", "Cool", "Storm"],
  "a1-speaking-26": ["Spring", "Summer", "Autumn", "Winter", "Sun", "Rain", "Snow", "Wind", "Cloud", "Sky"],
  "a1-speaking-27": ["It is sunny", "It is raining", "It is cold today", "It is a beautiful day", "I like the summer", "The sky is blue", "It is snowing", "The wind is strong", "It is very hot", "I don't like the rain"],
  "a1-speaking-28": ["It is sunny and warm today", "I like spring because it is not cold", "The sky is cloudy, it might rain", "In winter it is snowy and cold", "Good morning, it's a beautiful day", "It is raining, I need my coat", "The wind is strong in autumn", "It is very hot in the summer", "I don't like storms, I'm scared", "Today is sunny, let's go to the park"],
  "a1-speaking-29": ["Car", "Bus", "Train", "Plane", "Bike", "Boat", "Taxi", "Metro", "Left", "Right"],
  "a1-speaking-30": ["Go straight", "Turn left", "Turn right", "Stop here", "Next to the bank", "On the corner", "Opposite the school", "Behind the restaurant", "In front of the house", "Where is the station"],
  "a1-speaking-31": ["Ticket", "Driver", "Passenger", "Station", "Airport", "Arrival", "Departure", "Journey", "Map", "Bridge"],
  "a1-speaking-32": ["Excuse me, where is the station", "Go straight and turn left next to the bank", "I take the bus to go to work", "The train arrives at the station", "Can I have a ticket please", "Turn right, the airport is on the corner", "I need a map for the journey", "The taxi is behind the restaurant", "Take the metro, it's faster", "The plane departs from the airport"],
  "a1-speaking-33": ["Teacher", "Doctor", "Student", "Worker", "Manager", "Nurse", "Cook", "Driver", "Artist", "Farmer"],
  "a1-speaking-34": ["School", "University", "Office", "Hospital", "Factory", "Shop", "Library", "Classroom", "Homework", "Exam"],
  "a1-speaking-35": ["I work", "I study", "I learn", "I teach", "I read", "I write", "I listen", "I practice", "I remember", "I forget"],
  "a1-speaking-36": ["My mother is a doctor at the hospital", "I study English at the university", "The teacher is in the classroom", "I do my homework after dinner", "My father works in a factory", "I read books in the library", "Can you help me with my exam", "I practice English every morning", "I forget the words, can you repeat", "The nurse works at the hospital"],
  "a1-speaking-37": ["Shop", "Money", "Price", "Cheap", "Expensive", "Buy", "Sell", "Pay", "Cash", "Card"],
  "a1-speaking-38": ["How much", "How many", "I want to buy", "Can I pay", "It's too expensive", "Do you have", "I need a bag", "Where can I", "How much is it", "I'll take it"],
  "a1-speaking-39": ["Shirt", "Trousers", "Shoes", "Book", "Phone", "Computer", "Food", "Drink", "Gift", "Ticket"],
  "a1-speaking-40": ["How much is this shirt", "Can I pay by card or cash", "I want to buy a new phone", "It's too expensive, do you have something cheaper", "How many tickets do you need", "I need a bag for the food", "Excuse me, where can I buy shoes", "I'll take it, how much is it", "The book is ten euros, that's cheap", "Can I pay with my card please"],
  "a1-speaking-41": ["Football", "Tennis", "Swimming", "Running", "Basketball", "Cycling", "Yoga", "Dancing", "Reading", "Painting"],
  "a1-speaking-42": ["Play", "Win", "Lose", "Team", "Game", "Match", "Practice", "Score", "Ball", "Race"],
  "a1-speaking-43": ["I like playing", "I enjoy", "I prefer", "I hate", "I love", "I'm good at", "I'm bad at", "My favorite", "In my free time", "On weekends"],
  "a1-speaking-44": ["I like playing football on weekends", "My favorite sport is tennis", "I enjoy swimming in the summer", "I'm good at basketball but bad at running", "In my free time I like reading books", "My team won the match yesterday", "I practice yoga every morning", "I love dancing with my sister", "On Saturday I play games with my friends", "I prefer cycling to running"],
  "a1-speaking-45": ["Headache", "Stomachache", "Fever", "Cough", "Cold", "Medicine", "Doctor", "Hospital", "Healthy", "Sick"],
  "a1-speaking-46": ["I feel", "I have a", "I need to", "I should", "I must rest", "I feel better", "I feel worse", "It hurts", "Get well", "Take care"],
  "a1-speaking-47": ["Water", "Sleep", "Exercise", "Fruit", "Vegetables", "Walk", "Relax", "Rest", "Fresh air", "Wash hands"],
  "a1-speaking-48": ["I have a headache, I need medicine", "I feel sick, I should see a doctor", "You should drink water and rest", "I feel better after a good sleep", "Eat fruit and vegetables to stay healthy", "I have a cold and a cough", "Take care and get well soon", "I need to exercise and walk more", "Wash your hands to stay healthy", "I feel worse today, I must rest"],
  "a1-speaking-49": ["Travel", "Holiday", "Beach", "Mountain", "Hotel", "Suitcase", "Passport", "Ticket", "Map", "Camera"],
  "a1-speaking-50": ["I went to", "I visited", "I stayed at", "I travelled by", "I saw", "I took photos", "I bought", "I ate", "I enjoyed", "I came back"],
  "a1-speaking-51": ["Sea", "Sand", "Sun", "Swim", "Relax", "Explore", "Beautiful", "Amazing", "Fun", "Adventure"],
  "a1-speaking-52": ["I went to the beach on holiday", "I stayed at a hotel near the mountain", "I travelled by plane with my passport", "I took photos of the beautiful sea", "I enjoyed swimming in the warm water", "I bought a map and explored the city", "My suitcase is heavy, can you help me", "I came back home yesterday evening", "The holiday was amazing and fun", "I love travelling, it's a great adventure"],
  "a1-speaking-53": ["Phone", "Computer", "Internet", "Email", "Message", "Screen", "Keyboard", "Mouse", "Battery", "Charger"],
  "a1-speaking-54": ["Call", "Text", "Send", "Receive", "Download", "Upload", "Search", "Click", "Open", "Close"],
  "a1-speaking-55": ["I use", "I need", "I have a problem", "Can you fix", "It's not working", "Turn on", "Turn off", "Plug in", "Connect", "Disconnect"],
  "a1-speaking-56": ["I use my phone to send messages", "Can you fix my computer, it's not working", "I need to charge the battery", "Turn on the computer and connect to the internet", "I sent you an email yesterday", "I have a problem with my screen", "Can you help me download this", "Turn off your phone and plug in the charger", "I search the internet for information", "I received a message from my mother"],
  "a1-speaking-57": ["Dog", "Cat", "Bird", "Fish", "Horse", "Cow", "Sheep", "Chicken", "Tree", "Flower"],
  "a1-speaking-58": ["Forest", "River", "Lake", "Mountain", "Beach", "Garden", "Farm", "Park", "Field", "Nature"],
  "a1-speaking-59": ["Big", "Small", "Fast", "Slow", "Beautiful", "Dangerous", "Friendly", "Wild", "Cute", "Strong"],
  "a1-speaking-60": ["My dog is big and very friendly", "I saw a beautiful bird in the forest", "The river is near the mountain", "Cows and sheep live on the farm", "I like walking in the park with my dog", "The horse is fast and strong", "There are many trees and flowers in the garden", "Wild animals can be dangerous", "My cat is small and cute", "I love nature and the beautiful beach"],
};

const SENTENCE_BUILDER_UNITS = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100];

function isSentenceBuilderUnit(unitId: string): boolean {
  const match = unitId.match(/(?:a1|a2|b1|b2|c1)-speaking-(\d+)/);
  return !!match && Number(match[1]) % 4 === 0;
}

function isB1ConversationUnit(unitId: string): boolean {
  const match = unitId.match(/(?:b1|b2|c1|c2)-speaking-(\d+)/);
  return !!match && Number(match[1]) % 4 === 0;
}

function getB1PracticePrompt(item: string, index: number, total: number, feedback = ""): string {
  const phrase = item.replace(/^\[(?:Tutor|Alumno)\]\s*/i, "").trim();
  const role = item.match(/^\[(Tutor|Alumno)\]/i)?.[1]?.toLowerCase();
  const prefix = feedback ? feedback + " " : "";
  if (role === "tutor") return prefix + "El tutor hace esta pregunta. Escúchala y repítela en inglés. Línea " + (index + 1) + " de " + total + ": [ENGLISH: " + phrase + "]";
  if (role === "alumno") return prefix + "Responde en inglés con esta respuesta modelo. Escúchala y repítela. Línea " + (index + 1) + " de " + total + ": [ENGLISH: " + phrase + "]";
  return prefix + "Frase " + (index + 1) + " de " + total + ": escucha y repite en inglés. [ENGLISH: " + phrase + "]";
}

function isLikelyPhraseMatch(expected: string, spoken: string): boolean {
  const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  const a = normalise(expected), b = normalise(spoken);
  if (!a || !b) return false;
  const words = a.split(" "), spokenWords = new Set(b.split(" "));
  const overlap = words.filter((word) => spokenWords.has(word)).length / words.length;
  return overlap >= 0.72;
}

const DEFAULT_TOPICS: Record<number, string[]> = {
  61: ["City", "Town", "Village", "Street", "Road", "Bridge", "Building", "Park", "Square", "Market"],
  62: ["Police", "Firefighter", "Post office", "Bank", "Library", "Museum", "School", "Church", "Stadium", "Pharmacy"],
  63: ["I live in", "I work at", "I go to", "I live near", "It's far from", "It's close to", "Next to my house", "In the center", "On this street", "Around the corner"],
  65: ["Music", "Song", "Guitar", "Piano", "Sing", "Dance", "Listen", "Rhythm", "Melody", "Concert"],
  66: ["Movie", "Cinema", "Actor", "Director", "Comedy", "Drama", "Action", "Horror", "Ticket", "Popcorn"],
  67: ["I watched", "I listened to", "I enjoyed", "I didn't like", "My favorite", "I recommend", "It was great", "It was boring", "I love this", "I hate that"],
  69: ["Friend", "Best friend", "Friendly", "Together", "Share", "Help", "Trust", "Fun", "Laugh", "Smile"],
  70: ["Family", "Parents", "Children", "Grandparents", "Cousin", "Nephew", "Niece", "Relative", "Generation", "Love"],
  71: ["I miss", "I visit", "I call", "I invite", "I share with", "I help my", "I love my", "I live with", "I care about", "I spend time with"],
  73: ["Happy", "Sad", "Angry", "Scared", "Excited", "Tired", "Bored", "Surprised", "Nervous", "Proud"],
  74: ["I feel happy", "I feel sad", "I am excited", "I am tired", "I am scared", "I am bored", "I am angry", "I am surprised", "I am nervous", "I am proud"],
  75: ["I feel happy when", "I feel sad when", "I get excited about", "I get tired after", "I get scared of", "I get bored when", "I get angry when", "I get surprised by", "I get nervous before", "I feel proud of"],
  77: ["Morning routine", "Breakfast", "Get dressed", "Leave home", "Commute", "Arrive", "Start work", "Take a break", "Finish work", "Return home"],
  78: ["Cook dinner", "Set the table", "Wash dishes", "Clean the house", "Do laundry", "Iron clothes", "Water plants", "Feed the dog", "Take out trash", "Lock the door"],
  79: ["Every day I", "In the morning I", "After work I", "Before bed I", "On weekends I", "Sometimes I", "I always", "I never", "I usually", "I often"],
  81: ["Ask", "Answer", "Question", "Understand", "Explain", "Agree", "Disagree", "Suggest", "Decide", "Choose"],
  82: ["I think", "I believe", "I agree", "I disagree", "In my opinion", "I suggest", "I prefer", "I decided", "I'm not sure", "Let me think"],
  83: ["What do you think", "Do you agree", "I think we should", "I suggest that", "In my opinion we", "I prefer to", "I decided to", "I'm not sure but", "Let me think about", "I believe that"],
  85: ["Future", "Will", "Going to", "Plan", "Dream", "Goal", "Hope", "Wish", "Expect", "Promise"],
  86: ["Next year", "Next month", "Next week", "Tomorrow", "Soon", "Later", "In the future", "Someday", "Eventually", "After that"],
  87: ["I will", "I'm going to", "I plan to", "I hope to", "I want to", "I dream of", "I wish I could", "I expect to", "I promise to", "I look forward to"],
  89: ["Past", "Yesterday", "Last week", "Last year", "Before", "Ago", "Earlier", "Used to", "Remember", "Forgot"],
  90: ["I went", "I saw", "I did", "I had", "I was", "I said", "I thought", "I knew", "I took", "I gave"],
  91: ["Yesterday I went", "Last week I saw", "Last year I visited", "I remember when", "I used to", "A long time ago", "Before that I", "I forgot to", "I had a great time", "It was a good day"],
  93: ["Should", "Must", "Have to", "Need to", "Ought to", "Don't have to", "Shouldn't", "Mustn't", "Can", "Could"],
  94: ["You should", "You must", "You have to", "You need to", "You shouldn't", "You mustn't", "You can", "You could", "You don't have to", "You ought to"],
  95: ["You should rest", "You must see a doctor", "You have to eat healthy", "You need to exercise", "You shouldn't smoke", "You mustn't worry", "You can do it", "You could try yoga", "You don't have to hurry", "You ought to sleep more"],
  97: ["Compare", "Bigger", "Smaller", "Better", "Worse", "Faster", "Slower", "More expensive", "Cheaper", "The best"],
  98: ["This is bigger than", "This is better than", "This is faster than", "This is more expensive than", "This is cheaper than", "This is the best", "This is the worst", "This is the biggest", "This is the smallest", "This is the most beautiful"],
  99: ["I prefer this because", "This is better than that", "This one is bigger", "That one is cheaper", "This is the best one", "This is the worst one", "This is more expensive", "That is faster", "This is the most beautiful", "I like this one more"],
};

function getUnitWords(unitId: string): string[] {
  if (unitId.startsWith("c1-speaking-")) return C1_UNIT_WORDS[unitId] || C1_DEFAULT_WORDS;
  if (unitId.startsWith("c2-speaking-")) return C2_UNIT_WORDS[unitId] || C2_DEFAULT_WORDS;
  if (unitId.startsWith("b2-speaking-")) return B2_UNIT_WORDS[unitId] || B2_DEFAULT_WORDS;
  if (unitId.startsWith("b1-speaking-")) return B1_UNIT_WORDS[unitId] || B1_DEFAULT_WORDS;
  if (unitId.startsWith("a2-speaking-")) {
    return A2_UNIT_WORDS[unitId] || A2_DEFAULT_WORDS;
  }
  const match = unitId.match(/a1-speaking-(\d+)/);
  if (!match) return ["Hello", "Please", "Thank you", "Sorry", "Goodbye", "Yes", "No", "Maybe", "Excuse me", "See you later"];
  const unitNumber = Number(match[1]);
  if (UNIT_WORDS[unitId]) return UNIT_WORDS[unitId];
  if (!Number.isInteger(unitNumber) || unitNumber < 1 || unitNumber > 100) {
    return ["Hello", "Please", "Thank you", "Sorry", "Goodbye", "Yes", "No", "Maybe", "Excuse me", "See you later"];
  }
  if (SENTENCE_BUILDER_UNITS.includes(unitNumber)) {
    const previousWords = Array.from({ length: unitNumber - 1 }, (_, index) => index + 1)
      .flatMap((number) => UNIT_WORDS["a1-speaking-" + number] || DEFAULT_TOPICS[number] || []);
    const usableWords = previousWords.filter((word) => word && !/^(I |I'm |It's |My |The |A |An |You |We |They |He |She )/i.test(word));
    const vocabulary = usableWords.length ? usableWords : ["English", "words", "practice"];
    return Array.from({ length: 10 }, (_, index) => {
      const first = vocabulary[(index * 3) % vocabulary.length].toLowerCase();
      const second = vocabulary[(index * 3 + 1) % vocabulary.length].toLowerCase();
      const templates = [
        "I like " + first + " and " + second,
        "The " + first + " is near the " + second,
        "Can you help me with the " + first,
        "I have a " + first + " and a " + second,
        "Where is the " + first + " next to the " + second,
      ];
      return templates[index % templates.length];
    });
  }
  return DEFAULT_TOPICS[unitNumber] || ["Hello", "Please", "Thank you", "Sorry", "Goodbye", "Yes", "No", "Maybe", "Excuse me", "See you later"];
}

interface VoiceScenario {
  id: string;
  title: string;
  description?: string;
  setting?: string;
  language: string;
  level: string;
  persona_prompt: string;
  opening_line: string;
  system_prompt?: string;
}
interface VoiceMessage { role: "assistant" | "user"; content: string; correction?: string | null; }

function extractEnglishPhrase(text: string): { spanishText: string; englishPhrase: string | null } {
  // 1. Buscar marcador explícito [ENGLISH: ...]
  const markerMatch = text.match(/\[ENGLISH:\s*(.+?)\]/i);
  if (markerMatch) {
    const englishPhrase = markerMatch[1].trim();
    const spanishText = text.replace(/\[ENGLISH:\s*.+?\]/i, "").trim();
    return { spanishText, englishPhrase };
  }

  // 2. Fallback: buscar frases entre comillas dobles, simples o tipográficas
  const quotedMatches = text.match(/["“”']([^"“”']{1,100})["“”']/g);
  if (quotedMatches && quotedMatches.length > 0) {
    // Usar la última frase entre comillas como la frase en inglés
    const lastQuoted = quotedMatches[quotedMatches.length - 1];
    const englishPhrase = lastQuoted.replace(/^["“”']|["“”']$/g, "").trim();
    if (englishPhrase) {
      // Quitar las comillas del texto visible pero mantener el resto
      const spanishText = text.replace(/["“”']([^"“”']{1,100})["“”']/g, "$1").trim();
      return { spanishText, englishPhrase };
    }
  }

  return { spanishText: text, englishPhrase: null };
}

function getVisibleTutorText(text: string, unitId = ""): string {
  const { spanishText, englishPhrase } = extractEnglishPhrase(text);
  if (isB1ConversationUnit(unitId)) return spanishText;
  return [spanishText, englishPhrase].filter(Boolean).join("\n");
}

type Phase = "idle" | "speaking" | "listening" | "processing" | "thinking" | "completed";

export default function VoiceConversation({ scenario, userId = "demo-user", onCourseCompleted }: { scenario: VoiceScenario; userId?: string; onCourseCompleted?: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [hint, setHint] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [starting, setStarting] = useState(false);
  const [revealedText, setRevealedText] = useState("");
  const [progress, setProgress] = useState(0);

  const activeRef = useRef(false);
  const sessionRef = useRef<string | null>(null);
  const wordListRef = useRef<string[]>([]);
  const currentWordIndexRef = useRef(0);
  const correctCountRef = useRef(0);
  const finishConversationRef = useRef<(() => Promise<void>) | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const monitorRef = useRef<number | null>(null);
  const subtitleTimerRef = useRef<number | null>(null);
  const listeningStartedRef = useRef(0);
  const voiceStartedRef = useRef(false);
  const speechStartedAtRef = useRef(0);
  const lastVoiceAtRef = useRef(0);

  const VOICE_THRESHOLD = 0.008;
  const SILENCE_DURATION = 2500;
  const MIN_SPEECH_DURATION = 500;
  const hintRequestedRef = useRef(false);
  const discardRecordingRef = useRef(false);
  const lastSpokenRef = useRef("");
  const processingRef = useRef(false);
  const requestControllersRef = useRef<Set<AbortController>>(new Set());
  const startCancelledRef = useRef(false);
  const beginListeningRef = useRef<(() => Promise<void>) | null>(null);

  const conversationFetch = useCallback(async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const controller = new AbortController();
    requestControllersRef.current.add(controller);
    try {
      return await fetch(input, { ...init, signal: controller.signal });
    } finally {
      requestControllersRef.current.delete(controller);
    }
  }, []);

  const abortConversationRequests = useCallback(() => {
    requestControllersRef.current.forEach((controller) => controller.abort());
    requestControllersRef.current.clear();
  }, []);

  const stopMonitor = useCallback(() => {
    if (monitorRef.current !== null) { window.clearInterval(monitorRef.current); monitorRef.current = null; }
  }, []);

  const cleanupAudioResources = useCallback((stopRecorder = true) => {
    stopMonitor();

    const recorder = recorderRef.current;
    if (stopRecorder && recorder && recorder.state !== "inactive") {
      discardRecordingRef.current = true;
      recorder.stop();
    }
    recorderRef.current = null;

    const stream = streamRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    analyserRef.current = null;

    const context = contextRef.current;
    if (context) {
      contextRef.current = null;
      void context.close().catch(() => undefined);
    }
  }, [stopMonitor]);

  const releaseAudio = useCallback(() => {
    cleanupAudioResources();
    if (subtitleTimerRef.current !== null) { window.clearInterval(subtitleTimerRef.current); subtitleTimerRef.current = null; }
    audioRef.current?.pause();
    audioRef.current = null;
    if (audioUrlRef.current) { URL.revokeObjectURL(audioUrlRef.current); audioUrlRef.current = null; }
    window.speechSynthesis?.cancel();
  }, [cleanupAudioResources]);

  const beginListening = useCallback(async () => {
    if (!activeRef.current) return;
    try {
      // Cada turno obtiene recursos nuevos; los de la grabación anterior ya deben estar liberados.
      cleanupAudioResources(false);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      if (!activeRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      streamRef.current = stream;

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const context = new AudioContextClass();
      contextRef.current = context;

      // Forzar resume antes de nada
      if (context.state === "suspended") {
        await context.resume();
      }

      const analyser = context.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.75;
      const source = context.createMediaStreamSource(stream);
      source.connect(analyser);
      analyserRef.current = analyser;

      if (!activeRef.current) {
        cleanupAudioResources(false);
        return;
      }

      chunksRef.current = [];
      voiceStartedRef.current = false;
      speechStartedAtRef.current = 0;
      hintRequestedRef.current = false;
      processingRef.current = false;
      listeningStartedRef.current = Date.now();
      lastVoiceAtRef.current = 0;
      const mimeType = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = mimeType ? new MediaRecorder(streamRef.current, { mimeType }) : new MediaRecorder(streamRef.current);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => { if (event.data.size > 0) chunksRef.current.push(event.data); };
      recorder.onstop = async () => {
        if (discardRecordingRef.current || !activeRef.current) {
          discardRecordingRef.current = false;
          chunksRef.current = [];
          cleanupAudioResources(false);
          return;
        }
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        chunksRef.current = [];
        // El blob ya contiene los datos; liberar micrófono y AudioContext antes de llamar a la API.
        cleanupAudioResources(false);
        if (!blob.size) {
          setNotice("No he podido oírte. Vamos otra vez.");
          if (activeRef.current) void beginListeningRef.current?.();
          return;
        }
        setPhase("processing");
        try {
          const form = new FormData();
          form.append("audio", blob, "linguafly-voice.webm");
          form.append("language", scenario.language);
          const response = await conversationFetch("/api/conversation/voice-input", { method: "POST", body: form });
          const data = await response.json() as any;
          if (!response.ok || data.error) throw new Error(data.error || "No se pudo transcribir el audio");
          const transcription = String(data.transcription || "").trim();
          if (!transcription) throw new Error("No se ha reconocido ninguna frase");
          setMessages((previous) => [...previous, { role: "user", content: transcription }]);
          setHint(null);
          await answerStudent(transcription);
        } catch (err) {
          cleanupAudioResources(false);
          if (!activeRef.current) return;
          setError(err instanceof Error ? err.message : "Error al procesar tu voz");
          activeRef.current = false;
          cleanupAudioResources();
          releaseAudio();
          setPhase("idle");
        }
      };
      recorder.onerror = () => {
        if (activeRef.current) {
          setError("Ha ocurrido un problema con el micrófono. Comprueba los permisos e inténtalo de nuevo.");
          activeRef.current = false;
          releaseAudio();
          setPhase("idle");
        }
      };
      recorder.start(250);
      setNotice(null);
      setPhase("listening");

      monitorRef.current = window.setInterval(() => {
        if (!activeRef.current) return;
        const currentAnalyser = analyserRef.current;
        if (!currentAnalyser) return;
        const samples = new Uint8Array(currentAnalyser.fftSize);
        currentAnalyser.getByteTimeDomainData(samples);
        let sum = 0;
        for (let index = 0; index < samples.length; index++) { const normalized = (samples[index] - 128) / 128; sum += normalized * normalized; }
        const volume = Math.sqrt(sum / samples.length);
        const now = Date.now();
        const elapsed = now - listeningStartedRef.current;
        if (volume > VOICE_THRESHOLD) {
          if (!voiceStartedRef.current) {
            voiceStartedRef.current = true;
            speechStartedAtRef.current = now;
          }
          lastVoiceAtRef.current = now;
        }

        if (!voiceStartedRef.current && elapsed >= 8000 && !hintRequestedRef.current) {
          hintRequestedRef.current = true;
          setNotice("¿No te escucho? Intenta hablar.");
          void conversationFetch("/api/conversation/hint", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId: sessionRef.current, lastMessage: lastSpokenRef.current, personaPrompt: scenario.persona_prompt, language: scenario.language, level: scenario.level }),
          }).then(async (response) => {
            const data = await response.json() as any;
            if (response.ok && data.hint && activeRef.current) setHint(data.hint);
          }).catch(() => undefined);
        }
        if (!voiceStartedRef.current && elapsed >= 30000) {
          stopMonitor();
          discardRecordingRef.current = true;
          if (recorder.state !== "inactive") recorder.stop();
          setError("No he detectado voz en estos 30 segundos. Comprueba el micrófono y vuelve a iniciar la conversación.");
          activeRef.current = false;
          releaseAudio();
          setPhase("idle");
          return;
        }
        if (voiceStartedRef.current && now - lastVoiceAtRef.current >= SILENCE_DURATION && !processingRef.current) {
          const speechDuration = lastVoiceAtRef.current - speechStartedAtRef.current;
          if (speechDuration < MIN_SPEECH_DURATION) {
            // Ignorar golpes de micrófono/ruidos breves y seguir escuchando.
            voiceStartedRef.current = false;
            speechStartedAtRef.current = 0;
            lastVoiceAtRef.current = 0;
            return;
          }
          processingRef.current = true;
          stopMonitor();
          if (recorder.state !== "inactive") recorder.stop();
        }
      }, 100);
    } catch (err) {
      cleanupAudioResources();
      if (activeRef.current) {
        activeRef.current = false;
        setError(err instanceof Error ? err.message : "No se pudo iniciar la escucha. Comprueba los permisos del micrófono.");
        setPhase("idle");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario, stopMonitor, conversationFetch, releaseAudio, cleanupAudioResources]);

  beginListeningRef.current = beginListening;

  const speakLine = useCallback(async (text: string) => {
    if (!activeRef.current || !text.trim()) return;
    lastSpokenRef.current = text;
    setRevealedText("");
    setPhase("speaking");
    setNotice(null);
    setHint(null);

    const { englishPhrase } = extractEnglishPhrase(text);
    const visibleText = getVisibleTutorText(text, scenario.id);

    // Mostrar instrucciones y feedback en castellano; la frase inglesa también queda visible.
    if (subtitleTimerRef.current !== null) window.clearInterval(subtitleTimerRef.current);
    let visibleCharacters = 0;
    subtitleTimerRef.current = window.setInterval(() => {
      visibleCharacters = Math.min(visibleText.length, visibleCharacters + 2);
      setRevealedText(visibleText.slice(0, visibleCharacters));
      if (visibleCharacters >= visibleText.length && subtitleTimerRef.current !== null) {
        window.clearInterval(subtitleTimerRef.current);
        subtitleTimerRef.current = null;
      }
    }, 28);

    // Solo reproducir el fragmento inglés marcado. El texto del tutor nunca se envía al TTS.
    if (englishPhrase) {
      try {
        const response = await conversationFetch("/api/conversation/voice-output", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: englishPhrase, language: "en" }),
        });
        if (!response.ok) throw new Error("TTS no disponible");
        const blob = await response.blob();
        if (!blob.size) throw new Error("Audio vacío");
        if (!activeRef.current) return;
        if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
        const url = URL.createObjectURL(blob);
        audioUrlRef.current = url;
        const audio = new Audio(url);
        audioRef.current = audio;
        await new Promise<void>((resolve, reject) => {
          audio.onended = () => resolve();
          audio.onerror = () => reject(new Error("No se pudo reproducir el audio"));
          audio.play().catch(reject);
        });
      } catch {
        if (activeRef.current) setError("No se pudo generar el audio de la palabra en inglés.");
      }
    }

    if (subtitleTimerRef.current !== null) {
      window.clearInterval(subtitleTimerRef.current);
      subtitleTimerRef.current = null;
    }
    setRevealedText(visibleText);

    // Solo se abre el micrófono cuando hay una frase inglesa concreta que repetir.
    if (englishPhrase && activeRef.current) {
      await beginListening();
    }
  }, [beginListening, conversationFetch]);

  const answerStudent = useCallback(async (message: string) => {
    if (!activeRef.current || !sessionRef.current) return;
    setPhase("thinking");
    try {
      const currentItem = wordListRef.current[currentWordIndexRef.current] || "";
      const isB1 = (scenario.id.startsWith("b1-speaking-") || scenario.id.startsWith("b2-speaking-") || scenario.id.startsWith("c1-speaking-") || scenario.id.startsWith("c2-speaking-"));
      const currentWord = currentItem.replace(/^\[(?:Tutor|Alumno)\]\s*/i, "").trim();
      const totalWords = wordListRef.current.length;
      const evaluationPrompt = isB1
        ? 'Eres un tutor de inglés Cambridge B1/B2/C1/C2. El alumno está practicando la frase: "' + currentWord + '". Evalúa si la transcripción se parece a la frase objetivo y da feedback breve en castellano, animándole a pronunciar con claridad y ritmo natural. No incluyas otra frase en inglés.'
        : 'Eres un tutor de inglés. El alumno está practicando la palabra: "' + currentWord + '". Responde SOLO en castellano en 1-2 frases. Dile si pronunció bien o mal. NO incluyas palabras en inglés ni el formato [ENGLISH: ...] en tu respuesta.';

      const response = await conversationFetch("/api/conversation/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionRef.current,
          message: `${isB1 ? "Frase" : "Palabra"} objetivo: "${currentWord}". El alumno ha dicho: ${message}`,
          personaPrompt: evaluationPrompt,
          scenarioContext: {
            id: scenario.id,
            title: scenario.title,
            description: scenario.description || "",
            setting: scenario.setting || "",
            persona: "Tutor de inglés",
            system_prompt: evaluationPrompt,
          },
          language: scenario.language,
          level: scenario.level,
        }),
      });
      const data = await response.json() as any;
      if (!response.ok || data.error) throw new Error(data.error || "No se pudo generar la respuesta");
      let feedback = String(data.reply || "").trim();
      if (!feedback) feedback = "Bien hecho.";

      // Limpiar cualquier marcador que la IA pueda incluir en el feedback.
      feedback = feedback.replace(/\[ENGLISH:\s*.+?\]/gi, "").trim();

      // Registrar aciertos solo cuando la API proporciona una señal explícita.
      if (data.isCorrect === true || data.correct === true || (isB1 && isLikelyPhraseMatch(currentWord, message))) correctCountRef.current += 1;

      // Avanzar a la siguiente palabra; la secuencia la controla el componente.
      currentWordIndexRef.current += 1;
      setProgress(currentWordIndexRef.current);
      const nextIndex = currentWordIndexRef.current;
      const isLastWord = nextIndex >= totalWords;

      let fullMessage: string;
      if (isLastWord) {
        const completedLabel = (scenario.id.startsWith("b1-speaking-") || scenario.id.startsWith("b2-speaking-")) ? "frases" : "palabras";
        fullMessage = `${feedback} ¡Has completado las ${totalWords} ${completedLabel}! Muy buen trabajo. Vamos a ver tu puntuación.`;
        setMessages((previous) => [...previous, { role: "assistant", content: fullMessage }]);
        setRevealedText(fullMessage);
        window.setTimeout(() => {
          if (activeRef.current) void finishConversationRef.current?.();
        }, 2000);
        return;
      }

      const nextWord = wordListRef.current[nextIndex];
      fullMessage = isB1
        ? getB1PracticePrompt(nextWord, nextIndex, totalWords, feedback)
        : `${feedback} Palabra ${nextIndex + 1} de ${totalWords}: [ENGLISH: ${nextWord}]`;
      setMessages((previous) => [...previous, { role: "assistant", content: fullMessage }]);
      await speakLine(fullMessage);
    } catch (err) {
      if (!activeRef.current) return;
      setError(err instanceof Error ? err.message : "Error en la conversación");
      activeRef.current = false;
      releaseAudio();
      setPhase("idle");
    }
  }, [scenario, speakLine, conversationFetch, releaseAudio]);

  const startConversation = async () => {
    if (starting || activeRef.current) return;
    startCancelledRef.current = false;
    setStarting(true);
    setError(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") throw new Error("Este navegador no permite acceder al micrófono.");
      cleanupAudioResources();
      const response = await conversationFetch("/api/conversation/start", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId: scenario.id, userId }),
      });
      const data = await response.json() as any;
      if (startCancelledRef.current) return;
      if (!response.ok || data.error) throw new Error(data.error || "No se pudo iniciar la conversación");
      sessionRef.current = data.sessionId;
      activeRef.current = true;

      // Cargar la lista de palabras de esta unidad.
      wordListRef.current = getUnitWords(scenario.id);
      currentWordIndexRef.current = 0;
      correctCountRef.current = 0;
      setProgress(0);
      const totalWords = wordListRef.current.length;
      const firstWord = wordListRef.current[0];

      // Mensaje de inicio del tutor.
      const isB1 = (scenario.id.startsWith("b1-speaking-") || scenario.id.startsWith("b2-speaking-") || scenario.id.startsWith("c1-speaking-") || scenario.id.startsWith("c2-speaking-"));
      const isB1Conversation = isB1ConversationUnit(scenario.id);
      const speakingLevel = scenario.id.startsWith("c2-speaking-") ? "C2" : scenario.id.startsWith("c1-speaking-") ? "C1" : scenario.id.startsWith("b2-speaking-") ? "B2" : "B1";
      const isSentenceBuilder = isSentenceBuilderUnit(scenario.id);
      const introText = isB1Conversation
        ? getB1PracticePrompt(firstWord, 0, totalWords, "¡Bienvenido! Vamos a practicar un diálogo guiado de nivel " + speakingLevel + ".")
        : isB1
          ? "¡Bienvenido! En esta unidad practicaremos " + totalWords + " frases completas en inglés " + speakingLevel + ". Escucha cada frase y repítela. " + getB1PracticePrompt(firstWord, 0, totalWords)
          : isSentenceBuilder
            ? `¡Bienvenido! En esta unidad vamos a formar frases usando las palabras que has aprendido. Practicaremos ${totalWords} frases. Escucha cada frase y repítela. Empezamos con la frase 1 de ${totalWords}: [ENGLISH: ${firstWord}]`
            : `¡Bienvenido a la unidad! Vamos a practicar ${totalWords} palabras en inglés. Escucha cada palabra y repítela en voz alta. Empezamos con la palabra 1 de ${totalWords}: [ENGLISH: ${firstWord}]`;
      setMessages([{ role: "assistant", content: introText }]);
      await speakLine(introText);
    } catch (err) {
      cleanupAudioResources();
      releaseAudio();
      activeRef.current = false;
      setError(err instanceof Error ? err.message : "No se pudo iniciar la conversación");
      setPhase("idle");
    } finally { setStarting(false); }
  };

  const finishConversation = async () => {
    startCancelledRef.current = true;
    if (!sessionRef.current || !activeRef.current) {
      abortConversationRequests();
      activeRef.current = false;
      releaseAudio();
      setStarting(false);
      setPhase("idle");
      setNotice(null);
      setError("Conversación detenida.");
      return;
    }
    activeRef.current = false;
    abortConversationRequests();
    stopMonitor();
    releaseAudio();
    setPhase("processing");
    setError(null);

    const totalWords = wordListRef.current.length;
    const correctWords = correctCountRef.current;
    const fallbackScore = totalWords > 0
      ? Math.max(0, Math.min(100, Math.round((correctWords / totalWords) * 100)))
      : 0;
    const coursePrefix = scenario.id.startsWith("a1-speaking-")
      ? "a1-speaking"
      : scenario.id.startsWith("a2-speaking-")
        ? "a2-speaking"
        : scenario.id.startsWith("b1-speaking-")
          ? "b1-speaking"
          : scenario.id.startsWith("b2-speaking-")
            ? "b2-speaking"
            : scenario.id.startsWith("c2-speaking-")
            ? "c2-speaking"
            : scenario.id.startsWith("c1-speaking-")
              ? "c1-speaking"
            : null;
    let resultData: any = null;

    try {
      const response = await conversationFetch("/api/conversation/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          scenarioId: scenario.id,
          sessionId: sessionRef.current,
          correctWords,
          totalWords,
        }),
      });
      const data = await response.json() as any;
      if (!response.ok || data.error) {
        throw new Error(data.error || "No se pudo evaluar la conversación");
      }
      resultData = data;
    } catch (evalError) {
      console.error("Evaluation failed, using fallback score:", evalError);
      resultData = {
        score: fallbackScore,
        stars: fallbackScore >= 90 ? 3 : fallbackScore >= 75 ? 2 : fallbackScore >= 60 ? 1 : 0,
        totalWords,
        correctWords,
        grammar_errors: 0,
        vocabulary_used: correctWords,
        feedback: `Has completado la unidad. Puntuación: ${fallbackScore}/100.`,
        fallback: true,
      };
    }

    // El resultado de la evaluación se muestra aunque el guardado de progreso no esté disponible.
    if (coursePrefix) {
      try {
        const saved = await conversationFetch("/api/course/" + coursePrefix + "/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            unitId: Number(scenario.id.replace(coursePrefix + "-", "")),
            score: resultData.score,
            feedback: resultData.feedback || "",
          }),
        });
        const progress = await saved.json() as any;
        if (!saved.ok) {
          console.error("Could not save course progress:", progress.error || saved.statusText);
        } else {
          resultData.courseProgress = progress;
        }
      } catch (saveError) {
        console.error("Could not save progress:", saveError);
      }
    }

    setResult(resultData);
    setPhase("completed");
  };

  finishConversationRef.current = finishConversation;

  const retry = () => {
    releaseAudio();
    activeRef.current = false;
    sessionRef.current = null;
    wordListRef.current = [];
    currentWordIndexRef.current = 0;
    correctCountRef.current = 0;
    setProgress(0);
    setMessages([]);
    setResult(null);
    setHint(null);
    setNotice(null);
    setError(null);
    setPhase("idle");
  };

  useEffect(() => () => {
    activeRef.current = false;
    startCancelledRef.current = true;
    abortConversationRequests();
    cleanupAudioResources();
    releaseAudio();
  }, [abortConversationRequests, cleanupAudioResources, releaseAudio]);

  const status = phase === "speaking" ? "🤖 Hablando..." : phase === "listening" ? "🔴 Te escucho... habla ahora" : phase === "processing" ? "⏳ Procesando..." : phase === "thinking" ? "🤖 Pensando..." : phase === "completed" ? "Conversación finalizada" : "Listo para hablar";
  const passed = Number(result?.score || 0) >= 60;

  return (
    <div className="relative mx-auto flex min-h-[min(780px,88vh)] max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-slate-50 via-white to-blue-50 shadow-xl shadow-slate-200/70">
      <style jsx>{`@keyframes fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <header className="flex items-center justify-between gap-3 border-b border-slate-100/80 px-5 py-4 sm:px-7">
        <div className="min-w-0"><h2 className="truncate text-base font-bold text-slate-800">{scenario.title}</h2><p className="text-xs text-slate-400">{scenario.level} · {scenario.setting}</p>
          {wordListRef.current.length > 0 && phase !== "idle" && phase !== "completed" && (
            <p className="text-xs font-semibold text-blue-500">{scenario.id.startsWith("b1-speaking-") ? "Frase" : "Palabra"} {Math.min(progress + 1, wordListRef.current.length)} de {wordListRef.current.length}</p>
          )}
        </div>
        {(phase !== "idle" && phase !== "completed" || starting) && <button type="button" onClick={finishConversation} className="shrink-0 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-100">■ Detener conversación</button>}
      </header>
      <main className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-6 sm:px-8">
        {messages.map((message, index) => <div key={index} style={{ animation: "fade-in-up .35s ease-out" }} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${message.role === "user" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-800"}`}>
            <p className="mb-1 text-[11px] font-bold opacity-65">{message.role === "user" ? "🧑 Alumno" : "🤖 LinguaFly"}</p>
            <p className="whitespace-pre-wrap leading-relaxed">{index === messages.length - 1 && message.role === "assistant" && phase === "speaking" ? revealedText : message.role === "assistant" ? getVisibleTutorText(message.content, scenario.id) : message.content}</p>
            {message.correction && <div className="mt-3 rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-950"><p className="mb-1 font-bold">📝 Corrección</p>{message.correction}</div>}
          </div>
        </div>)}
        {hint && phase === "listening" && <div className="self-center rounded-full border border-yellow-200 bg-yellow-50/90 px-4 py-2 text-sm text-yellow-900 shadow-sm">💡 {hint}</div>}
        {notice && phase === "listening" && <p className="self-center text-xs text-slate-400">{notice}</p>}
        {error && <p className="self-center rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}
      </main>
      <footer className="flex min-h-24 flex-col items-center justify-center gap-2 border-t border-slate-100/80 bg-white/60 px-4 py-5">
        {phase === "speaking" && <div className="flex h-7 items-end gap-1.5" aria-label="Hablando"><span className="h-3 w-1.5 animate-pulse rounded-full bg-blue-500" /><span className="h-6 w-1.5 animate-pulse rounded-full bg-blue-500 [animation-delay:100ms]" /><span className="h-4 w-1.5 animate-pulse rounded-full bg-blue-500 [animation-delay:200ms]" /><span className="h-7 w-1.5 animate-pulse rounded-full bg-blue-500 [animation-delay:300ms]" /></div>}
        {phase === "listening" && <span className="h-4 w-4 animate-pulse rounded-full bg-red-500 shadow-[0_0_0_7px_rgba(239,68,68,0.12)]" />}
        {(phase === "processing" || phase === "thinking") && <span className="h-6 w-6 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />}
        <p className={`text-center text-lg font-semibold transition-all duration-300 ${phase === "listening" ? "text-red-600" : "text-slate-700"}`}>{status}</p>
        {phase === "thinking" && <div className="flex gap-1"><span className="animate-bounce">•</span><span className="animate-bounce [animation-delay:120ms]">•</span><span className="animate-bounce [animation-delay:240ms]">•</span></div>}
        {phase === "idle" && <button type="button" onClick={startConversation} disabled={starting} className="mt-2 rounded-full bg-blue-600 px-7 py-3 font-bold text-white shadow-lg shadow-blue-200 transition duration-300 hover:scale-[1.02] hover:bg-blue-700 disabled:opacity-60">{starting ? "Conectando..." : "🔊 Empezar conversación"}</button>}
        {phase === "completed" && result && <div className="mt-3 w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <p className="text-2xl font-extrabold text-slate-900">{result.score}/100 · {"⭐".repeat(result.stars || 0)}</p>
          <p className="mt-2 text-sm text-slate-600">{result.feedback}</p>
          <p className="mt-2 text-xs text-slate-500">Errores gramaticales: {result.grammar_errors} · Vocabulario utilizado: {result.vocabulary_used}</p>
          {passed ? <p className="mt-3 font-bold text-emerald-700">🎉 ¡Enhorabuena! Has desbloqueado el siguiente escenario.</p> : <p className="mt-3 text-sm font-semibold text-amber-700">Necesitas 60 puntos para desbloquear el siguiente. Puedes volver a intentarlo.</p>}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {!passed && <button type="button" onClick={retry} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700">Reintentar</button>}
            <button type="button" onClick={onCourseCompleted} className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-200">{passed ? "Continuar curso" : "Volver al curso"}</button>
          </div>
        </div>}
        {phase === "completed" && !result && <button type="button" onClick={onCourseCompleted} className="mt-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-700">Volver al curso</button>}
      </footer>
    </div>
  );
}
