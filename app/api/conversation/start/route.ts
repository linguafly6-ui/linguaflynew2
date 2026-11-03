import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  return NextResponse.json({
    lesson: {
      unitId: 1,
      level: "A1",
      title: "Saludos y Presentaciones",
      description: "Aprende a saludar y presentarte en ingles",
      language: "en",
      introduction: "En esta unidad aprenderas a saludar y presentarte en ingles. Escucha la pronunciacion de cada palabra pulsando el boton de audio.",
      sections: [
        {
          title: "Vocabulario basico",
          explanation: "Los saludos mas comunes en ingles son:",
          items: [
            { english: "Hello", spanish: "Hola", example: "Hello, how are you?" },
            { english: "Good morning", spanish: "Buenos dias", example: "Good morning, teacher!" },
            { english: "Hi", spanish: "Hola (informal)", example: "Hi, I'm John" },
            { english: "Goodbye", spanish: "Adios", example: "Goodbye, see you tomorrow" },
            { english: "Thank you", spanish: "Gracias", example: "Thank you very much" }
          ]
        },
        {
          title: "Frases para presentarse",
          explanation: "Para presentarte en ingles, puedes usar estas frases:",
          items: [
            { english: "My name is...", spanish: "Me llamo...", example: "My name is John" },
            { english: "I'm from...", spanish: "Soy de...", example: "I'm from Spain" },
            { english: "Nice to meet you", spanish: "Encantado de conocerte", example: "Nice to meet you, too" },
            { english: "How are you?", spanish: "Como estas?", example: "How are you today?" }
          ]
        }
      ],
      tips: "Consejo: La 'h' en 'hello' no se pronuncia. Practica diciendo 'ello' en voz alta."
    }
  });
}
