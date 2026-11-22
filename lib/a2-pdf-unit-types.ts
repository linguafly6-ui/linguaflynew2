export type A2PdfExercise = { question: string; answer: string; note: string };

export type A2PdfUnit = {
  number: number; slug: string; title: string; focus: string; explanation: string;
  structure: string[]; examples: string[]; vocabulary: string[]; exercises: A2PdfExercise[];
  readingPassages?: { title: string; body: string }[];
};
