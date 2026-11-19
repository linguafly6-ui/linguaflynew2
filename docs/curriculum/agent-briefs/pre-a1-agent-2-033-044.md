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
**Agente 2 — Misiones 033–044**  
Rama: `agent/pre-a1-033-044`  
Rango: misiones 033–044 (12 misiones).

| ID | Título | Tema | Vocabulario / estructuras curriculares | Objetivo de aprendizaje | Foco y plan gramatical | Objetivos de pronunciación | Formato de Listening |
|---|---|---|---|---|---|---|---|
| 033 | Clean and Tidy | Objetos de limpieza y orden | clean, wash, brush, soap, towel, tidy, dirty | Reconocer acciones de higiene y orden; comprender imperativos básicos. | Imperativos: wash / brush / clean. Modelo: Wash your hands. Brush your teeth. Práctica: ordenar instrucciones de higiene de forma lógica. | clean; wash; brush; soap; towel; tidy; dirty | Situación dramatizada |
| 034 | Bath Time | Higiene personal | bath, shower, toothbrush, toothpaste, shampoo, hands | Identificar objetos de aseo y secuenciar una rutina visual. | Imperativos y secuencia sencilla de rutina. Modelo: Brush your teeth. Wash your hands. Práctica: relacionar cada objeto del baño con una instrucción. | bath; shower; toothbrush; toothpaste; shampoo; hands | Programa de radio |
| 035 | My Daily Routine | Rutinas cotidianas | wake up, get up, eat, go, play, sleep | Reconocer acciones del día y ordenar una secuencia sencilla. | Patrones de presente simple: I…. Modelo: I wake up. I eat. I sleep. Práctica: ordenar tres imágenes de rutina y decir las acciones. | wake up; get up; eat; go; play; sleep | Entrevista |
| 036 | What Time Is It? | Horas en punto y momentos del día | one o'clock–twelve o'clock, morning, afternoon, evening, night | Leer horas en punto con apoyo de relojes ilustrados. | What time is it? It is… o’clock. Modelo: It’s one o’clock. It’s twelve o’clock. Práctica: leer un reloj y completar la hora. | one o'clock–twelve o'clock; morning; afternoon; evening; night | Historia narrada |
| 037 | My Birthday | Cumpleaños, edad y celebraciones | birthday, cake, candle, present, card; How old are you? | Comprender preguntas y respuestas modelo sobre edad y cumpleaños. | How old are you? I’m…. Modelo: How old are you? I’m six. Práctica: completar un diálogo de cumpleaños con una edad. | birthday; cake; candle; present; card; How old are you? | Situación dramatizada |
| 038 | Party Time | Fiestas, invitaciones y cortesía | party, balloon, music, dance, gift, please, thank you | Reconocer vocabulario de fiesta y expresiones sociales. | Imperativos y fórmulas de cortesía. Modelo: Dance, please. Thank you. Práctica: elegir una expresión cortés para una situación de fiesta. | party; balloon; music; dance; gift; please; thank you | Programa de radio |
| 039 | My Favorite Things | Gustos y preferencias | favorite, like, love, don't like; toys, food, animals | Expresar preferencias con estructuras memorizables y vocabulario conocido. | Preferencias: My favourite… / I like…. Modelo: My favourite toy is a car. I like animals. Práctica: expresar una preferencia con un sustantivo conocido. | favorite; like; love; don't like; toys; food; animals | Entrevista |
| 040 | Can You Do It? | Habilidad y verbo can en afirmativa e interrogativa simple | can, can't, swim, run, jump, dance, sing, fly | Preguntar y expresar capacidades mediante acciones ilustradas. | Can / can’t + verbo base. Modelo: I can swim. I can’t fly. Práctica: relacionar habilidades con can / can’t. | can; can't; swim; run; jump; dance; sing; fly | Historia narrada |
| 041 | Let's Move! | Deportes y movimiento | football, basketball, tennis, swim, run, ride a bike | Identificar deportes y comprender instrucciones de movimiento. | Patrones de acciones en presente simple; repaso de can. Modelo: I can swim. I ride a bike. Práctica: elegir un deporte y decir qué puedes hacer. | football; basketball; tennis; swim; run; ride a bike | Situación dramatizada |
| 042 | At the Sports Day | Material deportivo y acciones | ball, racket, goal, team, win, start, stop | Relacionar equipo y deporte; seguir reglas sencillas. | Imperativos: Start / Stop; sustantivos sencillos. Modelo: Start the game. Stop the ball. Práctica: seguir una instrucción de una jornada deportiva. | ball; racket; goal; team; win; start; stop | Programa de radio |
| 043 | Transport Town | Medios de transporte | car, bus, train, bike, boat, plane, taxi | Nombrar transportes y reconocer sonidos y contextos. | It is a…; sustantivos de transporte. Modelo: It is a bus. It is a train. Práctica: identificar un transporte usando una frase breve. | car; bus; train; bike; boat; plane; taxi | Entrevista |
| 044 | On the Road | Lugares y seguridad vial | road, street, traffic light, red, green, stop, go | Comprender señales y órdenes básicas en contexto. | Imperativos: Stop / Go. Modelo: Stop at red. Go at green. Práctica: elegir la instrucción correcta para un semáforo. | road; street; traffic light; red; green; stop; go | Historia narrada |

## Verificación de alcance
- Debes crear 12 archivos, uno por cada ID de la tabla.
- Mantén los títulos e IDs exactamente como aparecen en la tabla.
- No cambies las palabras objetivo de pronunciación sin justificarlo en el PR; la selección procede de la hoja Pronunciación.
- Para la misión 070, el reading/listening y las preguntas deben ser una evaluación integradora de Pre-A1, pero no introducir gramática A1 que no esté en el bloque 001–069.
