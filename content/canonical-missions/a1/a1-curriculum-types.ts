export type ChoiceQuestion = {
  prompt: string;
  answer: string;
  options: [string, string, string];
  feedback: string;
};

export type Check = [prompt: string, answer: string, distractorOne: string, distractorTwo: string];

export type MissionSpec = {
  position: number;
  title: string;
  objective: string;
  grammar: {
    explanation: string;
    models: { english: string; spanish: string }[];
    practice: string;
    questions: Check[];
  };
  pronunciation: [text: string, translation: string, activity: string, guide: string][];
  reading: { passage: string; checks: Check[] };
  listening: { format: string; script: string; checks: Check[] };
};

export type A1CurriculumMission = Omit<MissionSpec, "grammar" | "reading" | "listening"> & {
  grammar: Omit<MissionSpec["grammar"], "questions"> & { questions: ChoiceQuestion[] };
  reading: { passage: string; questions: ChoiceQuestion[] };
  listening: { format: string; script: string; questions: ChoiceQuestion[] };
};

export function makeQuestions(checks: Check[]): ChoiceQuestion[] {
  return checks.map(([prompt, answer, first, second], index) => {
    const options: [string, string, string] = index % 3 === 0
      ? [answer, first, second]
      : index % 3 === 1
        ? [first, answer, second]
        : [first, second, answer];

    return {
      prompt,
      answer,
      options,
      feedback: `La respuesta correcta es «${answer}».`,
    };
  });
}

export function buildMission(spec: MissionSpec): A1CurriculumMission {
  return {
    ...spec,
    grammar: { ...spec.grammar, questions: makeQuestions(spec.grammar.questions) },
    reading: { passage: spec.reading.passage, questions: makeQuestions(spec.reading.checks) },
    listening: {
      format: spec.listening.format,
      script: spec.listening.script,
      questions: makeQuestions(spec.listening.checks),
    },
  };
}
