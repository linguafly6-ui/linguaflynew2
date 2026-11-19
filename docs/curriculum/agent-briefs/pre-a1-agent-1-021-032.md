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
**Agente 1 — Misiones 021–032**  
Rama: `agent/pre-a1-021-032`  
Rango: misiones 021–032 (12 misiones).

| ID | Título | Tema | Vocabulario / estructuras curriculares | Objetivo de aprendizaje | Foco y plan gramatical | Objetivos de pronunciación | Formato de Listening |
|---|---|---|---|---|---|---|---|
| 021 | Breakfast Time | Comidas del día y desayuno | breakfast, cereal, toast, milk, juice, egg, yogurt | Nombrar alimentos del desayuno y comprender I eat / I drink. | I eat… / I drink…. Modelo: I eat toast. I drink milk. Práctica: clasificar alimentos y completar la frase verbal. | breakfast; cereal; toast; milk; juice; egg; yogurt | Situación dramatizada |
| 022 | At the Café | Pedir alimentos y bebidas de forma guiada | water, juice, milk, tea, sandwich, please, thank you | Reconocer fórmulas sociales y elegir un pedido sencillo. | Peticiones corteses: please / thank you. Modelo: Water, please. Thank you. Práctica: construir un intercambio de dos turnos en un café. | water; juice; milk; tea; sandwich; please; thank you | Programa de radio |
| 023 | Animal Sounds | Animales y sonidos | cow, sheep, duck, horse, pig, chicken; moo, quack | Relacionar sonido, animal e imagen; comprender What is it? | What is it? It is a…. Modelo: What is it? It’s a duck. Práctica: preguntar y responder sobre un sonido animal. | cow; sheep; duck; horse; pig; chicken; moo; quack | Entrevista |
| 024 | Farm Friends | Animales de granja y entorno | farm, barn, field, farmer, cow, sheep, goat, hen | Ampliar animales y ubicaciones; reconocer there is en contexto receptivo. | There is… (introducción receptiva). Modelo: There is a cow on the farm. Práctica: elegir la imagen que coincide con There is… | farm; barn; field; farmer; cow; sheep; goat; hen | Historia narrada |
| 025 | Under the Sea | Animales marinos | fish, shark, whale, dolphin, octopus, crab, turtle | Identificar animales marinos y sus características visuales. | It is a…; sustantivos singulares de animales. Modelo: It is a shark. It is a whale. Práctica: identificar un animal marino en una frase sencilla. | fish; shark; whale; dolphin; octopus; crab; turtle | Situación dramatizada |
| 026 | The Bug Hunt | Insectos y pequeños animales | bee, butterfly, ant, spider, ladybird, caterpillar | Distinguir insectos y comprender instrucciones de búsqueda. | Imperativos: Look for… / Find…. Modelo: Find a bee. Look for a butterfly. Práctica: seguir una instrucción de búsqueda de insectos. | bee; butterfly; ant; spider; ladybird; caterpillar | Programa de radio |
| 027 | At the Zoo | Animales salvajes | lion, tiger, elephant, giraffe, monkey, zebra, bear | Nombrar animales y asociar hábitats e imágenes. | It is a…; adjetivo + animal. Modelo: It is a big elephant. Práctica: elegir un animal y describirlo con una palabra. | lion; tiger; elephant; giraffe; monkey; zebra; bear | Entrevista |
| 028 | Where Is It? | Preposiciones espaciales básicas | in, on, under, next to, behind, in front of | Localizar objetos en una escena ilustrada y seguir instrucciones. | Preposiciones: in / on / under / next to. Modelo: The ball is under the table. Práctica: colocar un objeto según una frase oral. | in; on; under; next to; behind; in front of | Historia narrada |
| 029 | My Family | Familia y relaciones | mother, father, sister, brother, baby, grandmother, grandfather | Nombrar familiares y usar he/she/they con apoyo visual. | Etiquetas de parentesco; he / she. Modelo: She is my mother. He is my father. Práctica: relacionar familiares con He is / She is. | mother; father; sister; brother; baby; grandmother; grandfather | Situación dramatizada |
| 030 | People Around Me | Personas y descripciones físicas sencillas | boy, girl, child, man, woman, hair, eyes | Describir personas con vocabulario conocido y pronombres. | He is… / She is…. Modelo: He is a boy. She is a girl. Práctica: elegir el pronombre correcto para una persona. | boy; girl; child; man; woman; hair; eyes | Programa de radio |
| 031 | My Face and Hair | Rasgos faciales y colores | face, hair, eyes, nose, mouth; curly, straight, brown, black, blonde | Describir rasgos visibles mediante modelos cortos. | Have got (receptivo): has got; adjetivo + hair. Modelo: She has got brown hair. Práctica: relacionar una descripción facial con un personaje. | face; hair; eyes; nose; mouth; curly; straight; brown | Entrevista |
| 032 | Getting Dressed | Acciones relacionadas con la ropa | wear, put on, take off, shoes, coat, hat | Comprender y ejecutar instrucciones relacionadas con vestirse. | Imperativos: put on / take off. Modelo: Put on your coat. Take off your shoes. Práctica: ordenar instrucciones para vestirse. | wear; put on; take off; shoes; coat; hat | Historia narrada |

## Verificación de alcance
- Debes crear 12 archivos, uno por cada ID de la tabla.
- Mantén los títulos e IDs exactamente como aparecen en la tabla.
- No cambies las palabras objetivo de pronunciación sin justificarlo en el PR; la selección procede de la hoja Pronunciación.
- Para la misión 070, el reading/listening y las preguntas deben ser una evaluación integradora de Pre-A1, pero no introducir gramática A1 que no esté en el bloque 001–069.
