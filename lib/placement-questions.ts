export type PlacementLevel = "A1" | "A2" | "B1" | "B2" | "C1";
export type PlacementQuestion = { id: number; level: "A1" | "A2" | "B1" | "B2"; question: string; options: string[]; correctOption: string };

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    "id": 1,
    "level": "A1",
    "question": "I ___ from Spain.",
    "options": [
      "am",
      "is",
      "are",
      "be"
    ],
    "correctOption": "am"
  },
  {
    "id": 2,
    "level": "A1",
    "question": "She ___ a student.",
    "options": [
      "are",
      "is",
      "am",
      "be"
    ],
    "correctOption": "is"
  },
  {
    "id": 3,
    "level": "A1",
    "question": "They ___ football every Saturday.",
    "options": [
      "plays",
      "playing",
      "play",
      "played"
    ],
    "correctOption": "play"
  },
  {
    "id": 4,
    "level": "A1",
    "question": "What time ___ you get up?",
    "options": [
      "does",
      "are",
      "do",
      "is"
    ],
    "correctOption": "do"
  },
  {
    "id": 5,
    "level": "A1",
    "question": "There ___ two books on the table.",
    "options": [
      "is",
      "are",
      "am",
      "be"
    ],
    "correctOption": "are"
  },
  {
    "id": 6,
    "level": "A2",
    "question": "We ___ to the cinema last night.",
    "options": [
      "go",
      "went",
      "have go",
      "going"
    ],
    "correctOption": "went"
  },
  {
    "id": 7,
    "level": "A2",
    "question": "I have lived here ___ 2020.",
    "options": [
      "for",
      "during",
      "since",
      "from"
    ],
    "correctOption": "since"
  },
  {
    "id": 8,
    "level": "A2",
    "question": "If it rains, we ___ at home.",
    "options": [
      "stay",
      "stayed",
      "will stay",
      "would stay"
    ],
    "correctOption": "will stay"
  },
  {
    "id": 9,
    "level": "A2",
    "question": "This is ___ than my old phone.",
    "options": [
      "good",
      "better",
      "best",
      "more good"
    ],
    "correctOption": "better"
  },
  {
    "id": 10,
    "level": "A2",
    "question": "You ___ wear a seat belt in a car.",
    "options": [
      "should to",
      "must",
      "must to",
      "are"
    ],
    "correctOption": "must"
  },
  {
    "id": 11,
    "level": "B1",
    "question": "I’m interested ___ learning Japanese.",
    "options": [
      "on",
      "at",
      "in",
      "for"
    ],
    "correctOption": "in"
  },
  {
    "id": 12,
    "level": "B1",
    "question": "By the time we arrived, the film ___.",
    "options": [
      "starts",
      "has started",
      "had started",
      "was start"
    ],
    "correctOption": "had started"
  },
  {
    "id": 13,
    "level": "B1",
    "question": "She asked me where ___.",
    "options": [
      "did I live",
      "I lived",
      "do I live",
      "I am living"
    ],
    "correctOption": "I lived"
  },
  {
    "id": 14,
    "level": "B1",
    "question": "You ___ have told me earlier; I could have helped.",
    "options": [
      "should",
      "must",
      "can",
      "may"
    ],
    "correctOption": "should"
  },
  {
    "id": 15,
    "level": "B1",
    "question": "Despite ___ tired, he finished the report.",
    "options": [
      "he was",
      "being",
      "was",
      "be"
    ],
    "correctOption": "being"
  },
  {
    "id": 16,
    "level": "B2",
    "question": "If I ___ about the delay, I would have left later.",
    "options": [
      "knew",
      "had known",
      "would know",
      "have known"
    ],
    "correctOption": "had known"
  },
  {
    "id": 17,
    "level": "B2",
    "question": "The proposal was rejected, ___ surprised nobody.",
    "options": [
      "that",
      "what",
      "which",
      "who"
    ],
    "correctOption": "which"
  },
  {
    "id": 18,
    "level": "B2",
    "question": "Rarely ___ such a convincing performance.",
    "options": [
      "I have seen",
      "have I seen",
      "I saw",
      "did I have seen"
    ],
    "correctOption": "have I seen"
  },
  {
    "id": 19,
    "level": "B2",
    "question": "The manager insisted that the report ___ by Friday.",
    "options": [
      "is finished",
      "was finished",
      "be finished",
      "will finish"
    ],
    "correctOption": "be finished"
  },
  {
    "id": 20,
    "level": "B2",
    "question": "Had they left earlier, they ___ the train.",
    "options": [
      "would catch",
      "would have caught",
      "caught",
      "had caught"
    ],
    "correctOption": "would have caught"
  }
];

export const PLACEMENT_LEVELS: PlacementLevel[] = ["A1", "A2", "B1", "B2", "C1"];
