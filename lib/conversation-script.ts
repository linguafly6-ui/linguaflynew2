export type LessonStep = {
  id: number;
  tutorLine: string;
  tutorAudio: string;
  expectedResponse: string;
  instruction_es: string;
  evaluationCriteria: string;
  sampleAnswers: string[];
};
export type LessonScript = {
  unitTitle: string;
  level: string;
  objective_es: string;
  steps: LessonStep[];
};
export function buildDefaultLessonScript(title: string, level = "A1"): LessonScript {
  const normalized = ["A1", "A2", "B1", "B2"].includes(level) ? level : "A1";
  const count = normalized === "A1" ? 5 : normalized === "A2" ? 6 : normalized === "B1" ? 7 : 8;
  const templates: Array<Omit<LessonStep, "id">> = [
    { tutorLine: "Hello! What would you like to practise today?", tutorAudio: "Hello! What would you like to practise today?", expectedResponse: "A simple statement about the lesson topic.", instruction_es: "Saluda y explica brevemente qué quieres practicar.", evaluationCriteria: "Acepta un saludo y una respuesta relacionada con el tema de la unidad.", sampleAnswers: ["Hello! I want to practise.", "I'd like to practise English."] },
    { tutorLine: "Great! Can you tell me a little more?", tutorAudio: "Great! Can you tell me a little more?", expectedResponse: "One relevant detail about the topic.", instruction_es: "Añade un detalle sencillo sobre la situación.", evaluationCriteria: "Acepta una frase comprensible que aporte un detalle relevante.", sampleAnswers: ["I need some help, please.", "I usually do this every day."] },
    { tutorLine: "What do you usually do in this situation?", tutorAudio: "What do you usually do in this situation?", expectedResponse: "A sentence describing an action or routine.", instruction_es: "Describe qué haces normalmente en esta situación.", evaluationCriteria: "Acepta una acción o rutina expresada de forma comprensible.", sampleAnswers: ["I ask for help.", "I usually speak to the teacher."] },
    { tutorLine: "That sounds good. What would you say next?", tutorAudio: "What would you say next?", expectedResponse: "A suitable next phrase for the situation.", instruction_es: "Di qué dirías a continuación en esta situación.", evaluationCriteria: "Acepta una frase apropiada para continuar la interacción.", sampleAnswers: ["Could you help me, please?", "Thank you very much."] },
    { tutorLine: "Can you give me one more detail, please?", tutorAudio: "Can you give me one more detail, please?", expectedResponse: "One additional relevant detail.", instruction_es: "Añade un último detalle relacionado con el tema.", evaluationCriteria: "Acepta una frase adicional relacionada con la unidad.", sampleAnswers: ["It is very important.", "I do it with my family."] },
    { tutorLine: "How would you explain your choice?", tutorAudio: "How would you explain your choice?", expectedResponse: "A short reason using because.", instruction_es: "Explica brevemente el motivo de tu elección.", evaluationCriteria: "Acepta una razón comprensible, preferiblemente con because.", sampleAnswers: ["Because it is useful.", "I choose it because it is easy."] },
    { tutorLine: "What could you do if something went wrong?", tutorAudio: "What could you do if something went wrong?", expectedResponse: "A suitable response to a simple problem.", instruction_es: "Explica qué harías si surgiera un problema.", evaluationCriteria: "Acepta una solución relevante y comprensible.", sampleAnswers: ["I would ask for help.", "I would try again."] },
    { tutorLine: "Could you summarise what you have learned?", tutorAudio: "Could you summarise what you have learned?", expectedResponse: "A brief summary of the practice.", instruction_es: "Resume lo que has practicado en esta unidad.", evaluationCriteria: "Acepta un resumen breve y relacionado con la unidad.", sampleAnswers: ["I learned useful new phrases.", "I can use these expressions now."] },
  ];
  return { unitTitle: title, level: normalized, objective_es: "Practicar inglés en una situación relacionada con " + title + ".", steps: templates.slice(0, count).map((step, index) => ({ ...step, id: index + 1 })) };
}
export function parseLessonScript(raw: string | null | undefined, title: string, level = "A1"): LessonScript {
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as any;
      if (parsed && Array.isArray(parsed.steps) && parsed.steps.length > 0) {
        const steps = parsed.steps.filter((step: any) => step && typeof step.tutorLine === "string" && typeof step.instruction_es === "string").map((step: any, index: number) => ({
          id: Number(step.id) || index + 1,
          tutorLine: String(step.tutorLine),
          tutorAudio: String(step.tutorAudio || step.tutorLine),
          expectedResponse: String(step.expectedResponse || ""),
          instruction_es: String(step.instruction_es),
          evaluationCriteria: String(step.evaluationCriteria || ""),
          sampleAnswers: Array.isArray(step.sampleAnswers) ? step.sampleAnswers.map((answer: any) => String(answer)) : [],
        }));
        if (steps.length) return { unitTitle: String(parsed.unitTitle || title), level: String(parsed.level || level), objective_es: String(parsed.objective_es || ""), steps };
      }
    } catch (error) {
      console.error("No se ha podido interpretar script_json:", error);
    }
  }
  return buildDefaultLessonScript(title, level);
}
