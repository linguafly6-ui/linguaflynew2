/**
 * ============================================================
 * SISTEMA DE GUIONES DE CONVERSACIÓN
 * ============================================================
 * Genera y gestiona guiones estructurados para las 100 unidades
 * de LinguaFly, adaptados a los niveles A1, A2, B1 y B2.
 * ============================================================
 */

export type Level = "A1" | "A2" | "B1" | "B2";

export type StepType =
  | "teacher_intro"
  | "teacher_question"
  | "user_response"
  | "teacher_feedback"
  | "teacher_conclusion";

export interface ScriptStep {
  stepNumber: number;
  type: StepType;
  teacherText: string;
  instructions?: string;
  expectedKeywords?: string[];
  evaluationCriteria?: string;
  isFinal?: boolean;
}

export interface ConversationScript {
  unitId: number;
  level: Level;
  title: string;
  description: string;
  language: string;
  instructions: string;
  totalSteps: number;
  steps: ScriptStep[];
}

export interface UnitInfo {
  id: number;
  level: Level;
  title: string;
  description: string;
  language: string;
  topic: string;
}

const LEVEL_BY_UNIT = (unitId: number): Level => {
  if (unitId <= 25) return "A1";
  if (unitId <= 50) return "A2";
  if (unitId <= 75) return "B1";
  return "B2";
};

interface ScriptTemplate {
  instructions: string;
  steps: Omit<ScriptStep, "stepNumber">[];
}

function getTemplate(level: Level, title: string, topic: string): ScriptTemplate {
  const templates: Record<Level, ScriptTemplate> = {
    A1: {
      instructions: `Welcome to "${title}"! In this unit, you will practice basic English. Listen to your teacher, then answer the questions. Don't worry about mistakes — your teacher will help you correct them.`,
      steps: [
        {
          type: "teacher_intro",
          teacherText: `Hello! Today we are going to talk about ${topic}. Are you ready to start? Let's begin!`,
          instructions: "Listen to your teacher and get ready to answer.",
        },
        {
          type: "teacher_question",
          teacherText: `Let's start with a simple question. Can you tell me something about ${topic}? Use one or two sentences.`,
          instructions: "Answer the teacher's question in 1-2 simple sentences.",
          expectedKeywords: [],
          evaluationCriteria:
            "Check for basic vocabulary related to the topic, simple sentence structure (subject + verb), and correct use of present tense.",
        },
        {
          type: "teacher_feedback",
          teacherText: `Good effort! Now, let me ask you another question. What do you like about ${topic}?`,
          instructions: "Answer using 'I like...' or 'I enjoy...'",
          expectedKeywords: ["like", "enjoy", "love", "prefer"],
          evaluationCriteria:
            "Check for correct use of 'I like/I enjoy' structure and topic-related vocabulary.",
        },
        {
          type: "teacher_question",
          teacherText: `Interesting! Now tell me, how often do you think about ${topic}? Every day, sometimes, or never?`,
          instructions: "Answer using frequency words: every day, sometimes, never, etc.",
          expectedKeywords: ["every day", "sometimes", "never", "often", "always", "usually"],
          evaluationCriteria: "Check for correct use of frequency adverbs and simple present tense.",
        },
        {
          type: "teacher_conclusion",
          teacherText: `Excellent work today! You practiced talking about ${topic}. Keep practicing and you will improve. See you in the next lesson!`,
          instructions: "You have completed this unit. Great job!",
          isFinal: true,
        },
      ],
    },
    A2: {
      instructions: `Welcome to "${title}"! In this unit, you will practice elementary English. You will answer questions and describe situations. Your teacher will correct your mistakes and help you improve.`,
      steps: [
        {
          type: "teacher_intro",
          teacherText: `Hi there! Today's lesson is about ${topic}. We are going to have a conversation about it. I will ask you some questions and I would like you to answer in full sentences. Let's get started!`,
          instructions: "Listen carefully and prepare to answer in full sentences.",
        },
        {
          type: "teacher_question",
          teacherText: `To begin, can you describe your experience with ${topic}? What do you usually do related to this topic?`,
          instructions: "Answer in 2-3 sentences using present simple or present continuous.",
          expectedKeywords: [],
          evaluationCriteria:
            "Check for correct use of present simple/continuous, topic vocabulary, and sentence connectors (and, but, because).",
        },
        {
          type: "teacher_feedback",
          teacherText: `That's interesting! Now tell me about a specific time when you were involved with ${topic}. What happened? Use the past tense.`,
          instructions: "Answer using past simple tense (went, did, was, etc.).",
          expectedKeywords: ["went", "did", "was", "were", "had", "said", "saw"],
          evaluationCriteria:
            "Check for correct past simple forms, use of time expressions (yesterday, last week), and basic narrative structure.",
        },
        {
          type: "teacher_question",
          teacherText: `Great! Now, what are you going to do related to ${topic} in the future? Do you have any plans?`,
          instructions: "Answer using 'going to' or 'will' for future plans.",
          expectedKeywords: ["going to", "will", "plan", "want to", "hope to"],
          evaluationCriteria:
            "Check for correct use of future forms (going to / will), modal verbs, and topic-related vocabulary.",
        },
        {
          type: "teacher_conclusion",
          teacherText: `Well done! You did a great job talking about ${topic}. You used past, present, and future tenses. Keep practicing and see you next time!`,
          instructions: "You have completed this unit. Excellent work!",
          isFinal: true,
        },
      ],
    },
    B1: {
      instructions: `Welcome to "${title}"! In this unit, you will practice intermediate English. You will express opinions, share experiences, and discuss topics in more detail. Your teacher will provide detailed feedback on grammar and vocabulary.`,
      steps: [
        {
          type: "teacher_intro",
          teacherText: `Hello! Today we are going to discuss ${topic}. This is an intermediate-level conversation, so I expect you to express your opinions clearly and use a variety of vocabulary. Let's dive in!`,
          instructions: "Listen to the introduction and prepare to share your opinions.",
        },
        {
          type: "teacher_question",
          teacherText: `Let's start with your perspective. What is your opinion about ${topic}? Why do you think that way?`,
          instructions:
            "Express your opinion using phrases like 'In my opinion', 'I believe', 'I think that...'",
          expectedKeywords: ["opinion", "believe", "think", "feel", "because", "since"],
          evaluationCriteria:
            "Check for opinion expressions, supporting reasons, use of present perfect or intermediate vocabulary, and sentence variety.",
        },
        {
          type: "teacher_feedback",
          teacherText: `That's a thoughtful answer. Now, can you share a personal experience related to ${topic}? What happened and how did it affect you?`,
          instructions: "Share a personal experience using past tenses and descriptive language.",
          expectedKeywords: ["experience", "happened", "when", "because", "although"],
          evaluationCriteria:
            "Check for narrative tenses (past simple, past continuous, past perfect), descriptive adjectives, and connectors (however, although, therefore).",
        },
        {
          type: "teacher_question",
          teacherText: `Fascinating. Now let's think about this from a different angle. What are the advantages and disadvantages of ${topic}? Can you compare both sides?`,
          instructions: "Compare advantages and disadvantages using comparative structures.",
          expectedKeywords: [
            "advantage",
            "disadvantage",
            "however",
            "on the other hand",
            "although",
            "while",
            "compared to",
          ],
          evaluationCriteria:
            "Check for comparative/superlative forms, contrast connectors, and balanced argument structure.",
        },
        {
          type: "teacher_question",
          teacherText: `Very good analysis. One more question: if you could change one thing about ${topic}, what would it be and why?`,
          instructions: "Use conditional structures (If I could..., I would...).",
          expectedKeywords: ["if", "would", "could", "should", "wish", "change"],
          evaluationCriteria: "Check for second conditional structures, modal verbs, and hypothetical language.",
        },
        {
          type: "teacher_conclusion",
          teacherText: `Excellent discussion today! You expressed your opinions, shared experiences, and analyzed ${topic} from multiple perspectives. Your English is improving noticeably. See you in the next lesson!`,
          instructions: "You have completed this unit. Outstanding work!",
          isFinal: true,
        },
      ],
    },
    B2: {
      instructions: `Welcome to "${title}"! This is an upper-intermediate unit. You will engage in complex discussions, debate ideas, and use advanced grammar structures. Your teacher will challenge you with nuanced questions and provide detailed corrections.`,
      steps: [
        {
          type: "teacher_intro",
          teacherText: `Welcome to today's advanced discussion on ${topic}. I expect you to articulate your ideas clearly, use sophisticated vocabulary, and support your arguments with examples. Let's begin!`,
          instructions: "Listen to the introduction and prepare for an in-depth discussion.",
        },
        {
          type: "teacher_question",
          teacherText: `To kick things off, I'd like to hear your perspective on ${topic}. What are the key issues surrounding this topic, and where do you stand on them?`,
          instructions:
            "Present a well-structured argument with a clear position, supporting evidence, and nuanced vocabulary.",
          expectedKeywords: [
            "argue",
            "perspective",
            "stance",
            "position",
            "furthermore",
            "moreover",
            "consequently",
          ],
          evaluationCriteria:
            "Check for advanced vocabulary, complex sentence structures, discourse markers, and clear argumentation with supporting evidence.",
        },
        {
          type: "teacher_feedback",
          teacherText: `That's a compelling argument. Now, I'd like to challenge your position. Can you think of a counterargument to what you just said? How would you respond to someone who disagrees with you?`,
          instructions:
            "Present a counterargument and rebut it using expressions like 'While it is true that...', 'Nevertheless...'",
          expectedKeywords: [
            "however",
            "nevertheless",
            "admittedly",
            "despite",
            "although",
            "on the contrary",
            "counterargument",
          ],
          evaluationCriteria:
            "Check for concession structures, rebuttal expressions, balanced argumentation, and advanced connectors.",
        },
        {
          type: "teacher_question",
          teacherText: `Excellent critical thinking. Now let's consider the broader implications. How does ${topic} affect society as a whole? What are the long-term consequences we should be aware of?`,
          instructions: "Discuss societal implications using abstract language and complex structures.",
          expectedKeywords: [
            "society",
            "impact",
            "consequence",
            "implication",
            "long-term",
            "affect",
            "influence",
          ],
          evaluationCriteria:
            "Check for abstract vocabulary, passive constructions, cleft sentences, and ability to discuss broader societal themes.",
        },
        {
          type: "teacher_question",
          teacherText: `Very insightful. Let me ask you one final question: if you were in a position of power to make decisions about ${topic}, what changes would you implement and what challenges would you anticipate?`,
          instructions: "Use hypothetical and conditional structures to discuss policy changes.",
          expectedKeywords: [
            "if",
            "were",
            "would",
            "could",
            "implement",
            "challenge",
            "anticipate",
            "policy",
          ],
          evaluationCriteria:
            "Check for advanced conditionals (mixed, inverted), subjunctive mood, formal register, and policy-related vocabulary.",
        },
        {
          type: "teacher_conclusion",
          teacherText: `Outstanding discussion today! You demonstrated advanced language skills, critical thinking, and the ability to argue complex points about ${topic}. Your command of English is impressive. Keep up the excellent work and see you in the next unit!`,
          instructions: "You have completed this unit. Exceptional performance!",
          isFinal: true,
        },
      ],
    },
  };

  return templates[level];
}

export function generateScript(unit: UnitInfo): ConversationScript {
  const level = unit.level;
  const template = getTemplate(level, unit.title, unit.topic);

  const steps: ScriptStep[] = template.steps.map((step, index) => ({
    ...step,
    stepNumber: index,
  }));

  return {
    unitId: unit.id,
    level,
    title: unit.title,
    description: unit.description,
    language: unit.language,
    instructions: template.instructions,
    totalSteps: steps.length,
    steps,
  };
}

export function generateScriptFromId(
  unitId: number,
  title: string,
  description: string,
  language: string,
  topic: string
): ConversationScript {
  const level = LEVEL_BY_UNIT(unitId);
  const unit: UnitInfo = { id: unitId, level, title, description, language, topic };
  return generateScript(unit);
}

export async function loadUnitFromDb(
  db: D1Database,
  unitId: number
): Promise<UnitInfo | null> {
  const row = await db
    .prepare(
      "SELECT id, level, title, description, language, topic FROM conversation_units WHERE id = ?"
    )
    .bind(unitId)
    .first();

  if (!row) return null;

  return {
    id: row.id as number,
    level: row.level as Level,
    title: row.title as string,
    description: (row.description as string) || "",
    language: (row.language as string) || "en",
    topic: (row.topic as string) || "general",
  };
}

export function parseScriptFromJson(jsonStr: string): ConversationScript | null {
  try {
    const parsed = JSON.parse(jsonStr) as ConversationScript;
    if (!parsed.steps || !Array.isArray(parsed.steps)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getLevelForUnit(unitId: number): Level {
  return LEVEL_BY_UNIT(unitId);
}

export function getNextStep(
  script: ConversationScript,
  currentStep: number
): ScriptStep | null {
  if (currentStep + 1 >= script.totalSteps) return null;
  return script.steps[currentStep + 1] ?? null;
}

export function isLastStep(script: ConversationScript, currentStep: number): boolean {
  return currentStep >= script.totalSteps - 1;
}
