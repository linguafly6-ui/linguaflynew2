# Encargo de contenido — Pre-A1 021–070

Issue principal: https://github.com/linguafly6-ui/linguaflynew2/issues/29

## Reglas comunes
- Esta rama pertenece a un único bloque. Trabaja solo en las misiones indicadas aquí.
- Crear un archivo independiente por misión: `public/missions/pre-a1/NNN/index.html`.
- Tomar `public/missions/pre-a1/011/index.html` y `020/index.html` como contrato técnico y referencia visual. No copiar sus textos genéricos de comprensión.
- Mantener inglés británico (en-GB), instrucciones/apoyo en español y aproximaciones de pronunciación dirigidas a hispanohablantes, verificadas palabra por palabra.
- Completar Grammar, Pronunciation, Reading y Listening. Textos, diálogos, ejemplos, preguntas y distractores deben ser originales y específicos de cada misión.
- Reading y Listening: texto/guion breve de nivel Pre-A1 y 10 preguntas reales de comprensión, cada una con tres opciones distintas, una respuesta correcta y dos distractores plausibles. Variar quién/qué/dónde, detalles explícitos, secuencias e idea general. No usar preguntas repetitivas de «¿qué palabra aparece?».
- Grammar: seguir el foco exacto del currículo, explicar en español de manera muy sencilla, dar modelos ingleses correctos y 3–5 actividades/preguntas guiadas con soluciones.
- Pronunciation: utilizar las palabras/expresiones indicadas en el currículo (máximo 8 objetivos por misión), incluir actividad y `hint` como aproximación legible en español. No presentarlo como IPA ni como equivalencia exacta.
- El motor común genera los 20 retos de vocabulario/práctica; no crear otra interfaz ni motor. Los campos `hint`, `explanation`, `readingQuestions` y `listeningQuestions` serán habilitados de forma retrocompatible por el coordinador.
- No modificar `public/missions/pre-a1/mission-runtime.js`, páginas, catálogos, rutas, navegación, estilos globales, package files, base de datos ni paneles.
- No modificar 001–020. No trabajar en 071–100 ni niveles superiores en esta tanda.
- No desplegar, no tocar `main`, no cambiar ramas ajenas. Abrir un PR draft hacia `main` al terminar; no fusionarlo.
- Antes de PR: revisar los archivos del bloque, confirmar que cada misión tiene los cuatro apartados y 10+10 preguntas, verificar consistencia de los datos y ejecutar las comprobaciones disponibles. En el PR, enumerar validaciones reales y limitaciones.

## Esquema de cada misión
El objeto `window.LINGUAFLY_MISSION` incluirá `id`, `title`, `theme`, `description`, `words`, `extraVocabulary`, `pronunciation`, `grammar`, `readingText`, `readingQuestions`, `listeningFormat`, `listeningScript` y `listeningQuestions`. Los elementos de pronunciación incluirán `word`, `activity` y `hint`. Grammar incluirá `focus`, `explanation`, `model`, `practice`, `order`, `final` e `items`. Las preguntas tendrán la forma `{ question, answer, options: [opción1, opción2, opción3] }`.

El currículo original es la fuente de verdad para título, tema, vocabulario, objetivo, foco gramatical, lista de pronunciación y formato de Listening. No amplíes la dificultad ni inventes objetivos ajenos a ese documento.

## Tu bloque
**Agente 4 — Misiones 058–070**  
Rama: `agent/pre-a1-058-070`  
Rango: misiones 058–070 (13 misiones).

| ID | Título | Tema | Vocabulario / estructuras curriculares | Objetivo de aprendizaje | Foco y plan gramatical | Objetivos de pronunciación | Formato de Listening |
|---|---|---|---|---|---|---|---|
| 058 | Classroom English | Instrucciones frecuentes de aula | listen, look, read, write, repeat, open, close, sit down, stand up | Comprender instrucciones escolares habituales. | Imperativos de aula. Modelo: Listen. Look. Open your book. Práctica: relacionar instrucciones de clase con acciones. | listen; look; read; write; repeat; open; close; sit down | Programa de radio |
| 059 | What Is This? | Preguntas de identificación | What is this? It's a…; Is it a…? | Identificar objetos y responder preguntas modelo. | What is this? It’s a…. Modelo: What is this? It’s a pencil. Práctica: preguntar y responder sobre un objeto del aula. | What is this?; It's a…; Is it a…? | Entrevista |
| 060 | Is It…? | Preguntas yes/no con to be | Is it…? Yes, it is. No, it isn't. | Reconocer preguntas y respuestas breves con objetos y animales. | Preguntas yes/no con TO BE. Modelo: Is it a cat? Yes, it is. No, it isn’t. Práctica: elegir la respuesta corta correcta. | Is it…?; Yes, it is.; No, it isn't. | Historia narrada |
| 061 | My Things | Posesivos básicos | my, your, his, her; bag, book, pencil, toy | Identificar pertenencias y describir de quién son. | Adjetivos posesivos: my / your / his / her. Modelo: This is my bag. It is her book. Práctica: relacionar un objeto con su propietario. | my; your; his; her; bag; book; pencil; toy | Situación dramatizada |
| 062 | Whose Is It? | Preguntar por pertenencia | Whose…? It's my/your/his/her… | Resolver situaciones de objetos perdidos con apoyo visual. | Whose…? + adjetivo posesivo. Modelo: Whose pencil is it? It’s his pencil. Práctica: completar un diálogo de objetos perdidos. | Whose…?; It's my/your/his/her… | Programa de radio |
| 063 | I Have Got | Have got en afirmativa | I've got, you've got, he's got, she's got | Expresar posesión con vocabulario familiar y modelos breves. | Have got: afirmativa. Modelo: I’ve got a book. She’s got a toy. Práctica: elegir have got / has got según el sujeto. | I've got; you've got; he's got; she's got | Entrevista |
| 064 | Have You Got…? | Preguntas sencillas de posesión | Have you got…? Yes, I have. No, I haven't. | Comprender y responder preguntas guiadas sobre objetos. | Have got: preguntas y respuestas breves. Modelo: Have you got a pen? Yes, I have. Práctica: completar una pregunta y su respuesta corta. | Have you got…?; Yes, I have.; No, I haven't. | Historia narrada |
| 065 | Food I Like | Repaso integrado de comida y gustos | I like, I don't like, Do you like…? | Expresar gustos y responder preguntas sobre alimentos. | Like / don’t like; Do you like…? Modelo: Do you like apples? Yes, I do. Práctica: preguntar y responder sobre preferencias alimentarias. | I like; I don't like; Do you like…? | Situación dramatizada |
| 066 | Animal Descriptions | Descripciones simples con to be y adjetivos | It is…, It has got… (receptivo inicial), big, small, fast, slow | Combinar animal, color, tamaño y una característica. | It is… / It has got… / It can…. Modelo: It is big. It has got a tail. It can run. Práctica: crear una descripción de animal con tres pistas. | It is…; It has got…; big; small; fast; slow | Programa de radio |
| 067 | My Clothes and Colors | Repaso integrado de ropa y descripciones | It's a…, It's blue; I'm wearing… (fórmula guiada) | Describir prendas y colores en personajes ilustrados. | I’m wearing…; It’s…. Modelo: I’m wearing a blue hat. It’s blue. Práctica: describir la ropa y el color de un personaje. | It's a…; It's blue; I'm wearing… | Entrevista |
| 068 | Around the House – Review | Repaso acumulativo de casa, objetos y ubicación | rooms, furniture, there is/are, prepositions | Resolver tareas que mezclan vocabulario de misiones anteriores. | There is / There are + preposiciones (repaso). Modelo: There is a sofa. The chair is next to the table. Práctica: describir una escena de casa con una frase de ubicación. | rooms; furniture; there is/are; prepositions | Historia narrada |
| 069 | Let's Ask Questions | Preguntas básicas con what, who, where | what, who, where; What is it? Who is she? Where is…? | Comprender preguntas frecuentes y seleccionar respuestas adecuadas. | Preguntas Wh: what / who / where. Modelo: What is it? Who is she? Where is the school? Práctica: relacionar cada interrogativo con la información solicitada. | what; who; where; What is it?; Who is she?; Where is…? | Situación dramatizada |
| 070 | Pre-A1 Grand Adventure | Repaso global Pre-A1 | Vocabulario y estructuras de misiones 1–69 | Consolidar comprensión de palabras, instrucciones y frases modelo antes del bloque A1. | Repaso integrado: TO BE, can, likes, there is/are, preposiciones. Modelo: It is a fox. It can run. There is a tree. Práctica: completar un mini-reto con estructuras familiares. | Vocabulario y estructuras de misiones 1–69 | Programa de radio |

## Verificación de alcance
- Debes crear 13 archivos, uno por cada ID de la tabla.
- Mantén los títulos e IDs exactamente como aparecen en la tabla.
- No cambies las palabras objetivo de pronunciación sin justificarlo en el PR; la selección procede de la hoja Pronunciación.
- Para la misión 070, el reading/listening y las preguntas deben ser una evaluación integradora de Pre-A1, pero no introducir gramática A1 que no esté en el bloque 001–069.
