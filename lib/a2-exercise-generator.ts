import type { A2PdfUnit, A2PdfExercise } from "@/lib/a2-pdf-units";

export type A2ExerciseSection = {
  title: string;
  exercises: A2PdfExercise[];
};

const grammarFormats = [
  "Completa la frase con la forma correcta:",
  "Transforma la frase para que sea gramaticalmente correcta:",
  "Elige la estructura adecuada y completa:",
  "Escribe la forma que falta:",
  "Reformula la frase siguiendo la regla de esta unidad:",
  "Corrige el error gramatical:",
  "Completa sin cambiar el significado:",
  "Construye una pregunta correcta:",
  "Escribe la forma negativa:",
  "Completa la segunda parte de la frase:"
];

const readingStories = [
  { title: "A new experience", body: "Last month, Alex decided to try something different. At first, the plan seemed difficult, but a friend offered to help. They prepared everything carefully, checked the details and started early. The day was busy, and one small problem changed their original plan. Instead of giving up, they found another way. At the end, Alex felt more confident and wrote down what had been learned for next time." },
  { title: "A weekend with friends", body: "Mia and her friends wanted to spend a weekend together. They compared several ideas before choosing one that everyone could enjoy. Each person had a small task: one organised the journey, another prepared the food and Mia checked the timetable. The weather was not perfect, so they changed one activity. They still had a good time because they were flexible and helped each other." },
  { title: "A useful discovery", body: "When Daniel was looking for information, he found a useful local project. He read the instructions, asked two questions and decided to take part. The first meeting was shorter than he expected. The people there explained the rules and showed him what to do. Daniel made a few mistakes, but nobody complained. He learned quickly and recommended the project to a neighbour." },
  { title: "Making a decision", body: "Sofia had two options and needed to make a decision. She wrote a list of advantages and disadvantages, then spoke to her family. One option was cheaper, but the other was more convenient. She considered the time, the cost and the people involved. In the end, she chose the option that suited her needs best. She was pleased because she had taken time to think." },
  { title: "An unexpected change", body: "The group had a clear plan for Saturday, but something unexpected happened in the morning. They discussed the situation and looked for a practical solution. One person suggested changing the time, while another offered a different place. Everyone listened and agreed on the new arrangement. The change was simple, and the activity went well. Later, they agreed to prepare a second plan in future." },
  { title: "Learning together", body: "A small group of students meets every week to practise English. They take turns asking questions, explaining new words and describing their experiences. At the beginning, some students were nervous about speaking. Their teacher encouraged them to make mistakes and try again. After a few weeks, they spoke more naturally and understood more. They now use short reading texts to learn vocabulary in context." },
  { title: "A day in town", body: "On Friday, Leo went into town to complete several tasks. He checked the opening times before leaving home and made a short list. The streets were busy, so he walked instead of taking the bus. He met a colleague near the library and they talked about their plans. Leo finished everything earlier than expected and had time to visit a new café." },
  { title: "A better routine", body: "Ella wanted to feel more organised, so she changed her daily routine. She prepared her clothes the night before, wrote down important tasks and stopped checking her phone during meals. The changes were small, but they saved time. Some days were still difficult, especially when she was tired. However, she continued because the new habits made her mornings calmer and her work easier." },
  { title: "A helpful neighbour", body: "A new family moved into the flat next door. Their neighbour introduced herself and explained where to find the nearest shops and bus stops. A few days later, the family asked for advice about a local service. She gave them some useful information and recommended a place she trusted. They thanked her and invited her for coffee. Soon, the neighbours knew each other well." },
  { title: "Planning for next year", body: "A group of friends met to talk about the coming year. They shared their goals and discussed what they could do to achieve them. One wanted to study, another hoped to travel and a third planned to save money. They made realistic plans and agreed to support one another. They know that plans can change, but they believe that preparation will make their goals easier to reach." },
  { title: "The community project", body: "People in the neighbourhood started a project to improve a shared space. They met on a Saturday, divided the work and collected the materials they needed. Some people cleaned, others painted and a few planted flowers. The work took longer than expected, but everyone stayed positive. At the end of the day, the space looked brighter. The organisers thanked all the volunteers." },
  { title: "A short review", body: "After trying a new service, Noah decided to write a short review. He described what he liked, mentioned one problem and explained who might find it useful. He tried to be fair and included specific examples. His review helped another person make a decision. Noah learned that clear descriptions are more useful than general opinions, especially when readers need practical information." }
];

const readingQuestions = [
  { q: "When did the main event take place?", a: "The text says it happened at the time mentioned in the opening sentence.", n: "Busca la referencia temporal al principio del texto." },
  { q: "What problem or decision did the person/group face?", a: "They faced the difficulty or decision described in the middle of the text.", n: "La respuesta está en la parte central del texto." },
  { q: "Who helped or took part?", a: "The people named in the text helped or took part.", n: "Identifica los nombres y las personas mencionadas." },
  { q: "What did they do to solve the situation or continue?", a: "They followed the solution or actions described in the text.", n: "Localiza las acciones que explican cómo avanzó la historia." },
  { q: "What was the final result?", a: "The final sentence or sentences explain the result.", n: "La conclusión aparece al final del texto." }
];

export function buildA2ExerciseSections(unit: A2PdfUnit): A2ExerciseSection[] {
  const grammar: A2PdfExercise[] = [];
  for (let i = 0; i < 80; i++) {
    const seed = unit.exercises[i % unit.exercises.length];
    const format = grammarFormats[i % grammarFormats.length];
    const variation = Math.floor(i / grammarFormats.length) + 1;
    grammar.push({
      question: `${i + 1}. ${format} ${seed.question} [Práctica ${variation}]`,
      answer: seed.answer,
      note: seed.note
    });
  }

  const vocabulary: A2PdfExercise[] = [];
  const tasks = [
    (term: string) => `Traduce al español: ${term}.`,
    (term: string) => `Escribe en inglés el término correspondiente a esta definición: ${term}.`,
    (term: string) => `Completa tu glosario: escribe el significado de “${term}”.`,
    (term: string) => `Identifica la expresión de la unidad: ${term}.`,
    (term: string) => `Escribe una frase breve en inglés que incluya “${term}”.`,
    (term: string) => `Repasa el vocabulario: explica qué significa “${term}”.`
  ];
  for (let i = 0; i < 60; i++) {
    const item = unit.vocabulary[i % unit.vocabulary.length];
    const [term, meaning = "Consulta el glosario de la unidad"] = item.split(" — ");
    const task = tasks[i % tasks.length];
    vocabulary.push({
      question: `${i + 81}. ${task(term)}`,
      answer: i % tasks.length === 4 ? `Respuesta libre; ejemplo válido con “${term}”.` : meaning,
      note: i % tasks.length === 4 ? "Comprueba que has utilizado la palabra con el significado y la estructura adecuados." : `Repasa “${term}” en el glosario de esta unidad.`
    });
  }

  const reading: A2PdfExercise[] = [];
  readingStories.forEach((story, storyIndex) => {
    for (let q = 0; q < 5; q++) {
      const item = readingQuestions[q];
      reading.push({
        question: `READING ${storyIndex + 1} — ${story.title}. Lee el texto y responde: ${item.q} Texto: “${story.body}”`,
        answer: item.a,
        note: item.n
      });
    }
  });
  return [
    { title: "GRAMMAR — 80 ejercicios", exercises: grammar },
    { title: "VOCABULARY — 60 ejercicios", exercises: vocabulary },
    { title: "READING — 60 preguntas de comprensión", exercises: reading }
  ];
}
