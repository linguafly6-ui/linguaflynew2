"use client";

import { useCallback, useEffect, useRef, useState } from "react";


// ============================================================
// LISTAS DE PALABRAS Y FRASES POR UNIDAD (1-100)
// Cada cuarta unidad es un constructor de frases.
// ============================================================

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

const speakingDataCache = new Map<string, Promise<any>>();

async function loadSpeakingData(level: string): Promise<any> {
  let pending = speakingDataCache.get(level);
  if (!pending) {
    pending = fetch(`/api/speaking/words/${level}`)
      .then(async (response) => {
        if (!response.ok) throw new Error(`Speaking data unavailable for ${level}`);
        return response.json();
      })
      .catch((error) => {
        speakingDataCache.delete(level);
        throw error;
      });
    speakingDataCache.set(level, pending);
  }
  return pending;
}

async function getUnitWords(unitId: string): Promise<string[]> {
  const level = unitId.match(/^(a1|a2|b1|b2|c1|c2)-speaking-/)?.[1];
  const fallback = ["Hello", "Please", "Thank you", "Sorry", "Goodbye", "Yes", "No", "Maybe", "Excuse me", "See you later"];
  if (!level) return fallback;

  const data = await loadSpeakingData(level);
  if (level !== "a1") return data.unitWords?.[unitId] || data.defaultWords || fallback;

  const match = unitId.match(/a1-speaking-(\d+)/);
  if (!match) return fallback;
  const unitNumber = Number(match[1]);
  if (!Number.isInteger(unitNumber) || unitNumber < 1 || unitNumber > 100) return fallback;
  if (data.unitWords?.[unitId]) return data.unitWords[unitId];

  if (unitNumber % 4 === 0) {
    const previousWords = Array.from({ length: unitNumber - 1 }, (_, index) => index + 1)
      .flatMap((number) => data.unitWords?.["a1-speaking-" + number] || data.defaultTopics?.[number] || []);
    const usableWords = previousWords.filter((word: string) => word && !/^(I |I'm |It's |My |The |A |An |You |We |They |He |She )/i.test(word));
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

  return data.defaultTopics?.[unitNumber] || fallback;
}
