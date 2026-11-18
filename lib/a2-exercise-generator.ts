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
  { q: "When did the event or activity take place?", fact: 0, n: "Busca la referencia temporal en el texto." },
  { q: "What challenge, problem or decision appears in the story?", fact: 1, n: "Localiza el problema o la decisión principal." },
  { q: "Who helped, participated or was involved?", fact: 2, n: "Identifica a las personas que aparecen en la historia." },
  { q: "What action did the person or group take?", fact: 3, n: "Busca la acción que permitió continuar o resolver la situación." },
  { q: "What was the result?", fact: 4, n: "Resume el desenlace utilizando información concreta del texto." }
];

const readingFacts: string[][] = [
  ["Last month.", "The plan seemed difficult and a problem changed the original plan.", "A friend offered to help.", "They found another way instead of giving up.", "Alex felt more confident and wrote down what was learned."],
  ["At the weekend.", "They needed to choose an activity and the weather was not perfect.", "Mia and her friends took part.", "They changed one activity and helped each other.", "They still had a good time together."],
  ["When Daniel was looking for information; the first meeting followed.", "Daniel was new to the local project and made a few mistakes.", "The people at the project showed him what to do.", "He read the instructions, asked questions and took part.", "He learned quickly and recommended the project to a neighbour."],
  ["When Sofia had to make a decision.", "She had two options with different advantages.", "She spoke to her family.", "She compared advantages, disadvantages, time and cost.", "She chose the option that suited her needs best."],
  ["On Saturday morning.", "Something unexpected changed the group's original plan.", "Everyone in the group was involved.", "They discussed alternatives and agreed on a new arrangement.", "The activity went well."],
  ["Every week.", "Some students were nervous about speaking English.", "Their teacher encouraged them.", "They practised questions, vocabulary and descriptions together.", "They became more confident and understood more."],
  ["On Friday.", "The streets were busy and Leo had several tasks to complete.", "Leo met a colleague near the library.", "He walked, checked opening times and followed a list.", "He finished early and visited a new café."],
  ["As part of her daily routine.", "Ella wanted to feel more organised.", "Ella made the changes herself.", "She prepared clothes, listed tasks and stopped checking her phone during meals.", "Her mornings became calmer and her work easier."],
  ["A few days after the new family moved in.", "The family needed advice about a local service.", "Their neighbour helped them.", "She shared useful information and recommended a trusted place.", "They became friendly neighbours."],
  ["When the friends met to discuss the coming year.", "They needed to turn their different goals into realistic plans.", "A group of friends took part.", "They shared goals and agreed to support one another.", "They felt preparation would help them reach their goals."],
  ["On a Saturday.", "The community wanted to improve a shared space and the work took longer than expected.", "People from the neighbourhood volunteered.", "They divided tasks, cleaned, painted and planted flowers.", "The space looked brighter and the organisers thanked everyone."],
  ["After Noah tried a new service.", "He needed to describe both positive points and a problem fairly.", "Noah wrote the review and another person used it.", "He included specific examples and explained who might find it useful.", "His review helped someone make a decision."]
];

export function getA2ReadingPassages(unit?: A2PdfUnit) { return unit?.readingPassages ?? readingStories; }

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
  if (unit.readingPassages?.length) {
    unit.readingPassages.forEach((story, storyIndex) => {
      const sentences = story.body.match(/[^.!?]+[.!?]+/g) ?? [story.body];
      for (let q = 0; q < 10; q++) {
        const evidence = sentences[q % sentences.length].trim();
        const prompts = [
          "What information does the text give?",
          "Which detail supports the main idea?",
          "What does the writer tell us about this situation?",
          "Find one fact mentioned in the passage.",
          "What happens according to the text?"
        ];
        reading.push({
          question: `READING ${storyIndex + 1} — ${story.title}. ${prompts[q % prompts.length]}`,
          answer: evidence,
          note: "La respuesta se encuentra directamente en el texto. Puedes expresarla con tus propias palabras sin cambiar el significado."
        });
      }
    });
  } else {
    readingStories.forEach((story, storyIndex) => {
      for (let q = 0; q < 5; q++) {
        const item = readingQuestions[q];
        reading.push({
          question: `READING ${storyIndex + 1} — ${story.title}. ${item.q}`,
          answer: readingFacts[storyIndex][item.fact],
          note: item.n
        });
      }
    });
  }
  return [
    { title: "GRAMMAR — 80 ejercicios", exercises: grammar },
    { title: "VOCABULARY — 60 ejercicios", exercises: vocabulary },
    { title: "READING — 60 preguntas de comprensión", exercises: reading }
  ];
}
