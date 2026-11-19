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
**Agente 3 — Misiones 045–057**  
Rama: `agent/pre-a1-045-057`  
Rango: misiones 045–057 (13 misiones).

| ID | Título | Tema | Vocabulario / estructuras curriculares | Objetivo de aprendizaje | Foco y plan gramatical | Objetivos de pronunciación | Formato de Listening |
|---|---|---|---|---|---|---|---|
| 045 | My Town | Lugares de la ciudad | school, park, shop, hospital, station, library, supermarket | Identificar lugares y asociarlos con actividades cotidianas. | There is… (introducción con apoyo). Modelo: There is a school. There is a park. Práctica: describir una imagen de ciudad con There is… | school; park; shop; hospital; station; library; supermarket | Situación dramatizada |
| 046 | At the Shops | Tiendas, productos y precios sencillos | shop, buy, money, coin, bag, how much? | Reconocer compras y cantidades; participar en intercambios muy guiados. | How much…?; buy… como fórmula fija. Modelo: How much? A coin. I buy a bag. Práctica: completar un intercambio sencillo en una tienda. | shop; buy; money; coin; bag; how much? | Programa de radio |
| 047 | My Home – Where Things Are | Habitaciones, muebles y ubicación | There is, there are; in, on, under, next to | Describir dónde están objetos usando modelos simples. | There is / There are + preposiciones. Modelo: There is a bed. The book is on the table. Práctica: elegir is / are y ubicar un objeto. | There is; there are; in; on; under; next to | Entrevista |
| 048 | In the Garden | Plantas y jardinería | tree, flower, grass, seed, leaf, water, grow | Reconocer partes de plantas y acciones del jardín. | Imperativos y verbos de naturaleza en presente simple. Modelo: Water the flower. Seeds grow. Práctica: relacionar una acción de jardín con una imagen. | tree; flower; grass; seed; leaf; water; grow | Historia narrada |
| 049 | At the Beach | Playa y objetos de verano | beach, sea, sand, shell, bucket, spade, sun, towel | Identificar elementos de playa y seguir instrucciones en escena. | There is…; imperativos en una escena. Modelo: There is sand. Find a shell. Práctica: describir un objeto de playa y seguir una instrucción. | beach; sea; sand; shell; bucket; spade; sun; towel | Situación dramatizada |
| 050 | The Weather Report | Tiempo y ropa adecuada | What's the weather like? It's sunny/rainy/cold; coat, hat, boots | Combinar tiempo atmosférico con prendas y frases modelo. | What’s the weather like? It’s…. Modelo: What’s the weather like? It’s rainy. Práctica: responder a la pregunta del tiempo y elegir ropa apropiada. | What's the weather like? It's sunny/rainy/cold; coat; hat; boots | Programa de radio |
| 051 | Feelings and Needs | Emociones y necesidades | happy, sad, angry, tired, hungry, thirsty, cold, hot | Expresar cómo se siente o qué necesita con to be y fórmulas básicas. | TO BE + sentimientos / necesidades. Modelo: I’m hungry. She’s thirsty. Práctica: completar una frase con am / is. | happy; sad; angry; tired; hungry; thirsty; cold; hot | Entrevista |
| 052 | This or That? | Demostrativos y objetos cercanos/lejanos | this, that, these, those; singular/plural | Elegir y señalar objetos; distinguir uno y varios de forma contextual. | Demostrativos: this / that / these / those. Modelo: This is a book. Those are books. Práctica: elegir el demostrativo según distancia y cantidad. | this; that; these; those; singular/plural | Historia narrada |
| 053 | One or Many | Singular y plural de sustantivos frecuentes | a/an, -s plural; one, two, many | Distinguir singular/plural y usar a/an en vocabulario conocido. | Artículos a / an; plural -s. Modelo: A book. An apple. Two books. Práctica: elegir a / an o añadir -s para formar plural. | a/an; -s plural; one; two; many | Situación dramatizada |
| 054 | The Alphabet Adventure | Alfabeto y deletreo | A–Z; spell, letter | Reconocer nombres de letras y deletrear palabras familiares. | Imperativo Spell…; nombres de las letras. Modelo: Spell ‘cat’. A, B, C. Práctica: escuchar nombres de letras y seleccionar la escritura correcta. | A–Z; spell; letter | Programa de radio |
| 055 | Spell It! | Deletrear nombres y vocabulario conocido | name, letters, first, last | Deletrear palabras cortas y reconocer letras iniciales y finales. | Imperativos Spell…; first / last. Modelo: Spell your name. First letter… Práctica: identificar primera y última letra en una palabra familiar. | name; letters; first; last | Entrevista |
| 056 | My Name and Me | Presentaciones personales | My name is…, I'm…, I'm … years old | Comprender y completar una presentación muy breve. | My name is…; I’m… years old. Modelo: My name is Sam. I’m six years old. Práctica: completar una presentación personal de tres partes. | My name is…; I'm…; I'm … years old | Historia narrada |
| 057 | Hello and Goodbye | Saludos y despedidas | hello, hi, good morning, goodbye, see you, please | Usar saludos y despedidas según situaciones ilustradas. | Saludos según el momento del día. Modelo: Good morning. Goodbye. See you. Práctica: elegir un saludo o despedida para cada situación. | hello; hi; good morning; goodbye; see you; please | Situación dramatizada |

## Verificación de alcance
- Debes crear 13 archivos, uno por cada ID de la tabla.
- Mantén los títulos e IDs exactamente como aparecen en la tabla.
- No cambies las palabras objetivo de pronunciación sin justificarlo en el PR; la selección procede de la hoja Pronunciación.
- Para la misión 070, el reading/listening y las preguntas deben ser una evaluación integradora de Pre-A1, pero no introducir gramática A1 que no esté en el bloque 001–069.
