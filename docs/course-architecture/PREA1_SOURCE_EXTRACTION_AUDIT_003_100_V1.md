# Pre-A1 003–100: source extraction and migration audit

**Status:** extraction/audit only. No mission content or runtime has been changed.  
**Repository baseline:** `main` at `a7d632062377953de65a95518ebbfe3e99a4d5f3` (20 Nov 2026).  
**Scope:** legacy source pages `public/missions/pre-a1/003–100/index.html`, shared Pre-A1 runtimes and Writing runtimes. Canonical missions 001 and 002 are already in main and are reference implementations, not part of this extraction range.

## Executive findings

The 98 remaining pages do not form one homogeneous source format. The inventory identifies four practical migration families:

1. **003–010 — standalone legacy HTML:** large self-contained pages with their own markup, embedded activity logic and content. They do not declare `window.LINGUAFLY_MISSION` and do not load the shared `mission-runtime.js`.
2. **011–040 — data-driven missions with shared runtime and legacy Writing payloads:** compact HTML wrappers declare `window.LINGUAFLY_MISSION`, load `mission-runtime.js`, and provide `LF_WRITING_ITEMS` through one of two Writing runtime files. The data is incomplete relative to the canonical contract.
3. **041–070 — data-driven missions with shared runtime, without a mission-specific Writing payload:** wrappers declare `window.LINGUAFLY_MISSION` and load `mission-runtime.js`; Writing is generated generically by the runtime rather than supplied as ten authored dictation targets.
4. **071–100 — standalone legacy HTML rebuilt as a second UI family:** large pages with their own embedded interface and activity logic. The sampled and inventoried pages expose only four tabs (Exploración, Práctica, Pronunciación, Speaking), rather than the eight canonical sections.

This means a single HTML regex conversion would be unsafe. Extraction must preserve the lesson theme and source material, while separately identifying missing or generic activities that need editorial authoring.

## Repository source inventory

All 98 numbered source paths from 003 through 100 were located on `main`. Their titles and source family are:

| Range | Mission | Title | Source family |
|---|---:|---|---|
| 003–010 | 003 | Colours | Standalone HTML |
| 003–010 | 004 | My Family | Standalone HTML |
| 003–010 | 005 | Animals | Standalone HTML |
| 003–010 | 006 | Food and Drinks | Standalone HTML |
| 003–010 | 007 | School Things | Standalone HTML |
| 003–010 | 008 | My Body | Standalone HTML |
| 003–010 | 009 | At Home | Standalone HTML |
| 003–010 | 010 | Daily Actions | Standalone HTML |
| 011–040 | 011 | At the Playground | Data + runtime + Writing payload |
| 011–040 | 012 | Shapes Around Us | Data + runtime + Writing payload |
| 011–040 | 013 | Big and Small | Data + runtime + Writing payload |
| 011–040 | 014 | My School Bag | Data + runtime + Writing payload |
| 011–040 | 015 | The Classroom | Data + runtime + Writing payload |
| 011–040 | 016 | Days of the Week | Data + runtime + Writing payload |
| 011–040 | 017 | Weather Watchers | Data + runtime + Writing payload |
| 011–040 | 018 | Seasons of the Year | Data + runtime + Writing payload |
| 011–040 | 019 | Fruit Market | Data + runtime + Writing payload |
| 011–040 | 020 | Veggie Garden | Data + runtime + Writing payload |
| 011–040 | 021 | Breakfast Time | Data + runtime + Writing payload |
| 011–040 | 022 | At the Café | Data + runtime + Writing payload |
| 011–040 | 023 | Animal Sounds | Data + runtime + Writing payload |
| 011–040 | 024 | Farm Friends | Data + runtime + Writing payload |
| 011–040 | 025 | Under the Sea | Data + runtime + Writing payload |
| 011–040 | 026 | The Bug Hunt | Data + runtime + Writing payload |
| 011–040 | 027 | At the Zoo | Data + runtime + Writing payload |
| 011–040 | 028 | Where Is It? | Data + runtime + Writing payload |
| 011–040 | 029 | My Family | Data + runtime + Writing payload |
| 011–040 | 030 | People Around Me | Data + runtime + Writing payload |
| 011–040 | 031 | My Face and Hair | Data + runtime + Writing payload |
| 011–040 | 032 | Getting Dressed | Data + runtime + Writing payload |
| 011–040 | 033 | Clean and Tidy | Data + runtime + Writing payload |
| 011–040 | 034 | Bath Time | Data + runtime + Writing payload |
| 011–040 | 035 | My Daily Routine | Data + runtime + Writing payload |
| 011–040 | 036 | What Time Is It? | Data + runtime + Writing payload |
| 011–040 | 037 | My Birthday | Data + runtime + Writing payload |
| 011–040 | 038 | Party Time | Data + runtime + Writing payload |
| 011–040 | 039 | My Favorite Things | Data + runtime + Writing payload |
| 011–040 | 040 | Can You Do It? | Data + runtime + Writing payload |
| 041–070 | 041 | Let's Move! | Data + shared runtime |
| 041–070 | 042 | At the Sports Day | Data + shared runtime |
| 041–070 | 043 | Transport Town | Data + shared runtime |
| 041–070 | 044 | On the Road | Data + shared runtime |
| 041–070 | 045 | My Town | Data + shared runtime |
| 041–070 | 046 | At the Shops | Data + shared runtime |
| 041–070 | 047 | My Home – Where Things Are | Data + shared runtime |
| 041–070 | 048 | In the Garden | Data + shared runtime |
| 041–070 | 049 | At the Beach | Data + shared runtime |
| 041–070 | 050 | The Weather Report | Data + shared runtime |
| 041–070 | 051 | Feelings and Needs | Data + shared runtime |
| 041–070 | 052 | This or That? | Data + shared runtime |
| 041–070 | 053 | One or Many | Data + shared runtime |
| 041–070 | 054 | The Alphabet Adventure | Data + shared runtime |
| 041–070 | 055 | Spell It! | Data + shared runtime |
| 041–070 | 056 | My Name and Me | Data + shared runtime |
| 041–070 | 057 | Hello and Goodbye | Data + shared runtime |
| 041–070 | 058 | Classroom English | Data + shared runtime |
| 041–070 | 059 | What Is This? | Data + shared runtime |
| 041–070 | 060 | Is It…? | Data + shared runtime |
| 041–070 | 061 | My Things | Data + shared runtime |
| 041–070 | 062 | Whose Is It? | Data + shared runtime |
| 041–070 | 063 | I Have Got | Data + shared runtime |
| 041–070 | 064 | Have You Got…? | Data + shared runtime |
| 041–070 | 065 | Food I Like | Data + shared runtime |
| 041–070 | 066 | Animal Descriptions | Data + shared runtime |
| 041–070 | 067 | My Clothes and Colors | Data + shared runtime |
| 041–070 | 068 | Around the House – Review | Data + shared runtime |
| 041–070 | 069 | Let's Ask Questions | Data + shared runtime |
| 041–070 | 070 | Pre-A1 Grand Adventure | Data + shared runtime |
| 071–100 | 071 | At the Train Station | Standalone legacy HTML |
| 071–100 | 072 | At the Swimming Pool | Standalone legacy HTML |
| 071–100 | 073 | At the Doctor's | Standalone legacy HTML |
| 071–100 | 074 | At the Market | Standalone legacy HTML |
| 071–100 | 075 | In the Bedroom | Standalone legacy HTML |
| 071–100 | 076 | At the Beach | Standalone legacy HTML |
| 071–100 | 077 | At the Cinema | Standalone legacy HTML |
| 071–100 | 078 | At the Birthday Party | Standalone legacy HTML |
| 071–100 | 079 | In the Forest | Standalone legacy HTML |
| 071–100 | 080 | At the Sports Centre | Standalone legacy HTML |
| 071–100 | 081 | At the Farm Shop | Standalone legacy HTML |
| 071–100 | 082 | At the Fire Station | Standalone legacy HTML |
| 071–100 | 083 | At the Hairdresser | Standalone legacy HTML |
| 071–100 | 084 | At the Toy Shop | Standalone legacy HTML |
| 071–100 | 085 | At the Campsite | Standalone legacy HTML |
| 071–100 | 086 | At the Pet Shop | Standalone legacy HTML |
| 071–100 | 087 | At the Clothes Shop | Standalone legacy HTML |
| 071–100 | 088 | In the Classroom: Instructions | Standalone legacy HTML |
| 071–100 | 089 | At the Café | Standalone legacy HTML |
| 071–100 | 090 | At the Doctor's: How I Feel | Standalone legacy HTML |
| 071–100 | 091 | At the Seaside | Standalone legacy HTML |
| 071–100 | 092 | At the Farm: More Animals | Standalone legacy HTML |
| 071–100 | 093 | In the Living Room | Standalone legacy HTML |
| 071–100 | 094 | At the Playground: Actions | Standalone legacy HTML |
| 071–100 | 095 | At the Supermarket: Quantities | Standalone legacy HTML |
| 071–100 | 096 | At the Airport: People and Places | Standalone legacy HTML |
| 071–100 | 097 | My Daily Routine: Times | Standalone legacy HTML |
| 071–100 | 098 | In the Garden: Plants | Standalone legacy HTML |
| 071–100 | 099 | Around the House: Cleaning | Standalone legacy HTML |
| 071–100 | 100 | Pre-A1 Grand Review | Standalone legacy HTML |

## Structured extraction: missions 011–070

The compact HTML wrappers embed a JSON-like `window.LINGUAFLY_MISSION` object. The following counts are from the source fields, not estimates of what a learner sees after runtime rendering.

| Range | Vocabulary pairs (source) | Pronunciation entries | Grammar source items | Reading questions | Listening questions | Writing source |
|---|---:|---:|---:|---:|---:|---|
| 011–020 | 3–8 in `words` (016 has 7 additional entries in `extraVocabulary`) | 3–8 | 3 | 0 explicit in 011–020 | 0 explicit in 011–020 | 21–23 legacy character dictations |
| 021–040 | 6–16 | 5–8 | 4 | 10 each | 10 each | 21–23 legacy character dictations |
| 041–070 | 5–26 | 5–26 | 4 | 10 each | 10 each | no mission-specific Writing payload |

Important source-specific examples:

- **011 At the Playground:** 7 vocabulary words, 7 pronunciation entries, 3 grammar source items, a 229-character Reading passage, a 262-character Listening script and 23 legacy Writing targets. The source does not contain authored Reading/Listening question arrays. It supplies an `answers` index list; the runtime combines that list with generic repeated prompt templates.
- **016 Days of the Week:** only 3 items in `words`, plus 7 in `extraVocabulary`. A converter must combine the two vocab sources deliberately; reading only `words` would omit most of the lesson's vocabulary.
- **021 Breakfast Time:** 7 vocabulary pairs, 7 pronunciation entries, 4 grammar items, a Reading passage with 10 explicit questions, a Listening script with 10 explicit questions, and 22 legacy character-level Writing targets.
- **031 My Face and Hair:** 10 vocabulary pairs but only 8 pronunciation entries; 4 grammar items and 10 questions each for Reading and Listening; 21 legacy Writing targets.
- **036 What Time Is It?:** 16 vocabulary entries but only 5 pronunciation entries; 4 grammar items, 10 Reading and 10 Listening questions, 22 Writing targets.
- **050 The Weather Report:** 7 vocabulary pairs, 7 pronunciation entries, 4 grammar items, 10 Reading and 10 Listening questions. This source is structurally data-driven, but does not contain a mission-specific Writing payload.
- **054 The Alphabet Adventure:** 26 vocabulary entries and 26 pronunciation entries, with only 4 grammar items and 10 Reading/Listening questions. This is an important edge case for the canonical 10-item Vocabulary and Pronunciation limits: selection must be editorial, not a blind slice.
- **056 My Name and Me:** 5 vocabulary pairs and 5 pronunciation entries; 4 grammar items and 10 questions each for Reading and Listening.
- **058 Classroom English:** 9 vocabulary pairs but 8 pronunciation entries; 4 grammar items and 10 questions each for Reading and Listening.
- **070 Pre-A1 Grand Adventure:** 10 vocabulary pairs, 8 pronunciation entries, 4 grammar items and 10 questions each for Reading and Listening.

### Shared runtime behaviour (011–070)

- Generates 20 Practice tasks from the vocabulary and grammar source pools. Task types include meaning/translation, listening choice, spelling completion, visual recognition, grammar prompts, sentence ordering and a final model choice. The displayed Practice total is therefore a runtime-generated set, not a source array of 20 authored canonical tasks.
- Maps the Grammar quiz directly from `M.grammar.items`; source sets have 3 or 4 items, not the canonical 10.
- Uses explicit Reading and Listening question arrays when present. When absent (notably 011–020), it builds questions from `M.answers` and fixed generic prompt templates. Those generated questions are not ten distinct authored comprehension questions.
- Presents Listening as audio/script plus multiple-choice comprehension questions; transcript visibility is deferred until after answering. This is not the canonical inline ten-gap word-bank interaction.
- Generates Speaking from the vocabulary list as word-level practice/recording, not ten separately authored prompt/model pairs. The UI describes transcription feedback as distinct from phonetic scoring; no phonetic assessment should be inferred.
- For 041–070, the shared runtime creates generic Writing stages from the vocabulary/model rather than loading ten mission-specific dictation targets.
- Audio is browser speech synthesis configured for `en-GB`; the source does not establish the existence of stored, verified audio assets.

### Legacy Writing runtimes (011–040)

- `writing-runtime-002-020.js` and `writing-runtime-021-040.js` implement letter-by-letter dictation.
- The per-mission `LF_WRITING_ITEMS` arrays commonly contain 21–23 entries, not ten phrase/word dictation exercises.
- They track per-character correctness in the current browser session. Their displayed note says errors are not saved to the learner account.
- The 021–040 runtime may derive translations from the mission vocabulary when the Writing item does not contain a suitable translation. That mapping needs review; it is not a substitute for validating every authored target.

## Standalone HTML families

### 003–010

The sampled pages 003 Colours and 004 My Family are self-contained, large HTML documents (approximately 43 KB each). They have their own markup and inline scripts; they are not JSON mission records and do not load the common data-driven runtime. Their tab structures include the original Explore/Practice/Grammar/Pronunciation/Reading/Listening/Speaking activities; Writing behaviour and per-page task counts need individual source extraction. Example 003 exposes a legacy Practice counter of 100 and an extra Grammar quiz starting at item 51, so the visible legacy counts must not be mistaken for canonical section quantities.

### 071–100

The pages in this range are also large standalone HTML documents (roughly 43–45 KB each), but they are a different UI family from 003–010. The inspected pages 071, 095 and 100 expose only four navigation tabs: Explore, Practice, Pronunciation and Speaking. Page 071 shows a 50-item Practice counter. The canonical Grammar, Reading, Writing and Listening sections are not exposed as tabs in these pages. The content, answer logic, and Speaking behaviour are embedded in each individual file and must be extracted page by page.

## Migration blockers against the canonical contract

The canonical contract requires exactly eight sections in this order, with exact counts: Explore 10, Practice 20, Grammar 10, Pronunciation 10, Reading 10, Writing 10, Speaking 10, Listening 10.

| Canonical section | Extraction finding | Required migration treatment |
|---|---|---|
| Explore | Many data missions contain 3–9 words; some have additional vocabulary in a separate array; some have more than 10. | Consolidate all source vocab pools, select exactly 10 thematically valid pairs and preserve stable IDs. |
| Practice | Shared runtime generates 20 tasks from smaller pools; standalone pages may expose 50 or 100 legacy tasks. | Extract the existing source tasks, editorially select/author exactly 20 valid tasks, and keep the set deterministic. |
| Grammar | Data-driven missions generally have 3 or 4 source items. | Preserve valid items and author the missing distinct items; do not repeat a small source set merely to reach ten. |
| Pronunciation | Source lists range from 3 to 26 and may not match vocabulary count. | Select exactly 10 relevant targets; record English, Spanish meaning, Spanish-speaker cue and `en-GB` audio directive. |
| Reading | Passages exist in data missions; some early missions have generic fallback questions, while later data missions have ten explicit MCQs. | Preserve the complete passage; retain or revise ten passage-grounded questions and their answer keys. |
| Writing | 011–040 use 21–23 letter-by-letter dictations; 041–070 have generic runtime stages; standalone pages vary. | Author exactly ten word/phrase dictation targets with expected answers; keep them on-topic and server-protected. |
| Speaking | Data runtime offers word-level recording; standalone pages vary. | Create ten distinct prompts and model answers. Keep transcription similarity separate from phonetic assessment. |
| Listening | Data runtime uses script + MCQ + delayed transcript. | Convert the source script into exactly ten inline `[[gap-01]]`…`[[gap-10]]` tokens and a bank of ten unique words, preserving a coherent passage. |

## Data integrity and security requirements for conversion

- Do not expose `answer`, `answers`, `expectedAnswer` or `expectedWordId` values to the learner browser. The source legacy pages currently embed correct answers in client-readable JavaScript/data.
- The canonical answer evaluator must remain authenticated and server-side, following the existing Pre-A1 001/002 pattern. Do not reuse the legacy client-side answer maps.
- Do not invent audio file URLs. Existing `en-GB` speech is browser TTS unless a real, verified asset is supplied.
- Do not label transcription similarity as pronunciation/phonetic scoring.
- Use permanent IDs based on mission/section/exercise/item identity, independent of visible text.
- Preserve original theme/content; use synthetic learner details where personal-looking example data appears.
- Keep the canonical Listening interaction exactly as agreed: ten inline gaps, ten unique bank entries, select/place/move/replace, correction, solutions and score.

## What this extraction does and does not certify

**Completed in this audit**
- Located all 98 numbered source HTML files (003–100) on `main`.
- Recorded all 98 lesson titles and grouped pages by source/runtime family.
- Inspected the shared Pre-A1 runtime and both legacy Writing runtime files.
- Parsed the structured mission objects for 011–070 to measure vocabulary, pronunciation, grammar, Reading and Listening source counts and Writing payload presence.
- Identified important edge cases and the mismatch between legacy Listening and the canonical gap-fill.

**Not yet completed**
- Full item-by-item transcription of every embedded array and every standalone HTML page (especially 003–010 and 071–100).
- Editorial selection of vocabulary/pronunciation targets where source counts are below or above ten.
- Writing/Speaking authoring for missions that lack canonical exercises.
- Canonical JSON generation, schema validation, protected evaluator routes, HTML conversion, browser tests, microphone tests and audio playback tests.

This is an extraction baseline, not a claim that missions 003–100 have been converted or certified. The next safe step is a content-level extraction workbook/report per mission, followed by editorial gap resolution, then canonical JSON and UI generation.


## Detailed content extraction: standalone HTML pages 003–010

These eight pages share the same standalone code structure. Each embeds a `data` object with exactly ten English–Spanish vocabulary pairs and 50 multiple-choice `qs` entries.

### Extracted vocabulary

| Mission | Theme | Ten source pairs (English — Spanish) |
|---:|---|---|
| 003 | Colours | red—rojo; blue—azul; yellow—amarillo; green—verde; black—negro; white—blanco; orange—naranja; pink—rosa; purple—morado; brown—marrón |
| 004 | My Family | mother—madre; father—padre; sister—hermana; brother—hermano; grandmother—abuela; grandfather—abuelo; parents—padres; family—familia; baby—bebé; cousin—primo |
| 005 | Animals | dog—perro; cat—gato; bird—pájaro; fish—pez; horse—caballo; cow—vaca; rabbit—conejo; duck—pato; lion—león; elephant—elefante |
| 006 | Food and Drinks | apple—manzana; bread—pan; milk—leche; water—agua; cheese—queso; banana—plátano; rice—arroz; egg—huevo; juice—zumo; sandwich—bocadillo |
| 007 | School Things | book—libro; pen—bolígrafo; pencil—lápiz; ruler—regla; rubber—goma; bag—mochila; desk—pupitre; chair—silla; notebook—cuaderno; door—puerta |
| 008 | My Body | head—cabeza; eyes—ojos; ears—orejas; nose—nariz; mouth—boca; hands—manos; arms—brazos; legs—piernas; feet—pies; hair—pelo |
| 009 | At Home | house—casa; kitchen—cocina; bedroom—dormitorio; bathroom—baño; living room—salón; table—mesa; bed—cama; window—ventana; sofa—sofá; garden—jardín |
| 010 | Daily Actions | wake up—despertarse; get up—levantarse; eat—comer; drink—beber; go—ir; play—jugar; read—leer; write—escribir; sleep—dormir; walk—caminar |

### Exercise structure and content defects

- Each page contains 50 Practice MCQs. Items 1–10 test the ten lesson vocabulary pairs. Items 11–50 are the same generic greetings/classroom-expression set reused across all eight themes (e.g. `Hello!`, `Good morning.`, `Good afternoon.`, `What is your name?`, `Open the book.`). They are not theme-specific practice for Colours, Family, Animals, Food, School Things, Body, Home or Daily Actions.
- The legacy UI labels the whole activity as 100 challenges and starts the Grammar sequence at challenge 51. This is a combined counter, not evidence of 100 Practice tasks.
- Each page has a mission-specific grammar objective and model:
  - 003: adjective + noun; `It is…` — “It is a red ball.”
  - 004: `My…` + family words; `he/she is…` — “This is my mother. She is kind.”
  - 005: `It is a…` + animal names — “It is a dog. It is a cat.”
  - 006: `I like…`; `I eat… / I drink…` — “I like apples. I drink water.”
  - 007: `This is a…`; `a/an` + school objects — “This is a pencil. It is a book.”
  - 008: imperatives `Touch… / Clap…` — “Touch your nose. Clap your hands.”
  - 009: `There is…`; `in / on` — “There is a bed in the bedroom.”
  - 010: present simple `I + action verb` — “I wake up. I eat. I play.”
- Pronunciation uses the lesson vocabulary with browser speech synthesis; no stored audio files or verified audio URLs were found in the inspected source.
- Speaking includes a browser recording/recognition workflow, but the UI describes checking which words the system recognises. It is not a verified phonetic assessment.
- Reading and Listening panels are present in the standalone markup. Listening uses a spoken passage and ten comprehension questions, with transcript withheld until the learner has answered. This is not the canonical gap-fill.
- The source pages embed correct MCQ choices in browser-readable JavaScript. These answer arrays must not be copied into learner-facing canonical payloads.

## Detailed content extraction: standalone HTML pages 071–100

All 30 pages use the second standalone HTML family. Each page embeds ten vocabulary pairs and 50 MCQ entries. The first ten MCQs test vocabulary. The next forty are generated from a repeating sentence frame around each vocabulary entry (for example `I can see the …`, `Where is the …?`, `I like the …`, `This is the …`). The frame is not semantically valid for every word class or phrase.

### Extracted vocabulary

| Mission | Theme | Ten source pairs (English — Spanish) |
|---:|---|---|
| 071 | At the Train Station | train—el tren; platform—el andén; ticket—el billete; train station—la estación; passenger—el pasajero; suitcase—la maleta; clock—el reloj; arrival—la llegada; departure—la salida; seat—el asiento |
| 072 | At the Swimming Pool | swimming pool—la piscina; swimsuit—el bañador; towel—la toalla; water—el agua; swimming cap—el gorro; goggles—las gafas; ladder—la escalera; lifeguard—el socorrista; shower—la ducha; float—el flotador |
| 073 | At the Doctor's | doctor—el médico; nurse—la enfermera; patient—el paciente; appointment—la cita; medicine—la medicina; pain—el dolor; head—la cabeza; arm—el brazo; temperature—la temperatura; hospital—el hospital |
| 074 | At the Market | market—el mercado; seller—el vendedor; customer—el cliente; fruit—la fruta; vegetables—las verduras; apple—la manzana; tomato—el tomate; basket—la cesta; money—el dinero; price—el precio |
| 075 | In the Bedroom | bed—la cama; pillow—la almohada; blanket—la manta; wardrobe—el armario; lamp—la lámpara; drawer—el cajón; alarm clock—el despertador; curtain—la cortina; **床**—la mesita (source corruption: Chinese characters instead of an English target); rug—la alfombra |
| 076 | At the Beach | sand—la arena; sea—el mar; shell—la concha; beach—la playa; sun—el sol; umbrella—la sombrilla; towel—la toalla; bucket—el cubo; spade—la pala; wave—la ola |
| 077 | At the Cinema | cinema—el cine; film—la película; ticket—la entrada; screen—la pantalla; seat—el asiento; popcorn—las palomitas; actor—el actor; actress—la actriz; music—la música; story—la historia |
| 078 | At the Birthday Party | birthday—el cumpleaños; party—la fiesta; present—el regalo; cake—la tarta; candle—la vela; balloon—el globo; card—la tarjeta; guest—el invitado; song—la canción; dance—el baile |
| 079 | In the Forest | forest—el bosque; wood—la madera; leaf—la hoja; branch—la rama; mushroom—la seta; rabbit—el conejo; fox—el zorro; deer—el ciervo; river—el río; mountain—la montaña |
| 080 | At the Sports Centre | sports centre—el polideportivo; court—la pista; football—el fútbol; basketball—el baloncesto; tennis—el tenis; ball—la pelota; trainer—el entrenador; player—el jugador; team—el equipo; shoes—las zapatillas |
| 081 | At the Farm Shop | farm shop—la tienda de la granja; egg—el huevo; milk—la leche; cheese—el queso; honey—la miel; apple—la manzana; potato—la patata; carrot—la zanahoria; basket—la cesta; farmer—el granjero |
| 082 | At the Fire Station | fire station—el parque de bomberos; firefighter—el bombero; fire engine—el camión de bomberos; helmet—el casco; hose—la manguera; ladder—la escalera; fire—el fuego; water—el agua; uniform—el uniforme; alarm—la alarma |
| 083 | At the Hairdresser | hairdresser—el peluquero; hair—el pelo; scissors—las tijeras; comb—el peine; brush—el cepillo; mirror—el espejo; chair—la silla; shampoo—el champú; short—corto; long—largo |
| 084 | At the Toy Shop | toy shop—la juguetería; doll—la muñeca; teddy bear—el oso de peluche; train—el tren; puzzle—el rompecabezas; kite—la cometa; robot—el robot; dinosaur—el dinosaurio; yo-yo—el yoyó; toy car—el coche de juguete |
| 085 | At the Campsite | campsite—el camping; tent—la tienda de campaña; sleeping bag—el saco de dormir; torch—la linterna; campfire—la hoguera; backpack—la mochila; map—el mapa; lake—el lago; boots—las botas; path—el sendero |
| 086 | At the Pet Shop | pet shop—la tienda de animales; pet—la mascota; dog—el perro; cat—el gato; fish—el pez; bird—el pájaro; food—la comida; lead—la correa; cage—la jaula; bowl—el cuenco |
| 087 | At the Clothes Shop | clothes shop—la tienda de ropa; shirt—la camisa; trousers—los pantalones; skirt—la falda; dress—el vestido; jacket—la chaqueta; shoes—los zapatos; size—la talla; colour—el color; price—el precio |
| 088 | In the Classroom: Instructions | listen—escuchar; repeat—repetir; read—leer; write—escribir; open—abrir; close—cerrar; stand up—levantarse; sit down—sentarse; look—mirar; answer—responder |
| 089 | At the Café | café—la cafetería; coffee—el café; tea—el té; juice—el zumo; sandwich—el sándwich; menu—el menú; cup—la taza; glass—el vaso; sugar—el azúcar; milk—la leche |
| 090 | At the Doctor's: How I Feel | tired—cansado; hungry—hambriento; thirsty—sediento; cold—tener frío; hot—tener calor; happy—contento; sad—triste; ill—enfermo; better—mejor; well—bien |
| 091 | At the Seaside | seaside—la costa; harbour—el puerto; boat—el barco; fisherman—el pescador; fish—el pez; rock—la roca; sand—la arena; shell—la concha; lighthouse—el faro; coast—la costa |
| 092 | At the Farm: More Animals | horse—el caballo; cow—la vaca; sheep—la oveja; goat—la cabra; pig—el cerdo; duck—el pato; chicken—la gallina; hen—la gallina; goose—el ganso; donkey—el burro |
| 093 | In the Living Room | sofa—el sofá; armchair—el sillón; television—el televisor; remote control—el mando a distancia; coffee table—la mesa de centro; bookcase—la estantería; cushion—el cojín; carpet—la alfombra; fireplace—la chimenea; clock—el reloj |
| 094 | At the Playground: Actions | climb—trepar; slide—deslizarse; swing—columpiarse; run—correr; jump—saltar; throw—lanzar; catch—atrapar; play—jugar; share—compartir; laugh—reír |
| 095 | At the Supermarket: Quantities | a bottle—una botella; a packet—un paquete; a kilo—un kilo; a litre—un litro; a loaf—una barra; a tin—una lata; a carton—un cartón; some—algo de; many—muchos; few—pocos |
| 096 | At the Airport: People and Places | pilot—el piloto; flight attendant—el auxiliar de vuelo; passenger—el pasajero; airport—el aeropuerto; gate—la puerta de embarque; passport—el pasaporte; security—el control de seguridad; luggage—el equipaje; plane—el avión; runway—la pista |
| 097 | My Daily Routine: Times | morning—la mañana; afternoon—la tarde; evening—la tarde-noche; night—la noche; early—temprano; late—tarde; breakfast—el desayuno; lunch—la comida; dinner—la cena; bedtime—la hora de dormir |
| 098 | In the Garden: Plants | plant—la planta; seed—la semilla; tree—el árbol; leaf—la hoja; root—la raíz; soil—la tierra; pot—la maceta; watering can—la regadera; spade—la pala; rose—la rosa |
| 099 | Around the House: Cleaning | clean—limpiar; wash—lavar; sweep—barrer; mop—fregar; dust—quitar el polvo; vacuum—pasar la aspiradora; bucket—el cubo; sponge—la esponja; soap—el jabón; bin—la papelera |
| 100 | Pre-A1 Grand Review | hello—hola; family—la familia; house—la casa; food—la comida; school—la escuela; friend—el amigo; water—el agua; book—el libro; happy—contento; thank you—gracias |

### Repeated template and source quality findings (071–100)

- All 30 pages expose four main navigation tabs: Explore, Practice, Pronunciation and Speaking. Their source includes a Writing panel/stages, but Writing is open-ended composition (five keyword definitions, two sentences, then a short text), not ten audio dictations.
- Grammar, Reading and Listening are not available as complete canonical learner sections in the four-tab UI. Some script code contains generic grammar/reading/listening rule or helper definitions; these are not evidence of ten mission-specific, authored exercises for each section.
- Practice has 50 legacy MCQs, not 20. The first ten are vocabulary checks. Remaining items are templated with repeated sentence frames and many ungrammatical/semantically mismatched combinations.
- Concrete defects observed in source questions:
  - 075 contains the non-English target `床` paired with Spanish “la mesita”.
  - 088 generates “I can see the listen/repeat/read/write…” from imperative verbs.
  - 090 generates “I can see the tired/hungry/thirsty…” from adjectives and states.
  - 095 generates “I can see the a bottle/a packet/a kilo…” with a duplicated article.
  - 099 generates “I can see the clean/wash/sweep…” from action verbs.
  - 100 generates “I can see the hello/thank you…” from greetings and expressions.
  - Other noun-based pages also mechanically force `I can see the` and `Where is the` on words that may need an article, plural, or different construction; each item needs linguistic review rather than wholesale reuse.
- The 071–100 Speaking panel selects vocabulary words and records learner speech. It does not provide ten separate communicative prompts with distinct model answers. The UI uses speech recognition/transcription feedback; it must not be described as validated phonetic scoring.
- Correct options are embedded in the client-side `data.qs` object. They must be moved to server-side evaluation during canonical conversion.
- Browser speech synthesis is used for English models; the pages do not establish verified stored audio assets.

## Per-mission extraction status for the standalone families

| Mission range | Vocabulary source | Practice source | Grammar | Pronunciation | Reading | Writing | Speaking | Listening |
|---|---|---|---|---|---|---|---|---|
| 003–010 | 10 pairs each, extracted above | 50 MCQs each; only first 10 are lesson vocabulary, remaining 40 are generic greetings/classroom phrases | mission-specific objective/model; legacy quiz starts at combined challenge 51; item-level extraction/review still needed | lesson word audio/repeat; exact card metadata needs extraction | panel and passage present; question/passage item-level extraction still needed | no canonical ten dictation list certified | recording/recognition panel; no ten distinct prompts certified | audio + ten MCQ comprehension, delayed transcript; must be rebuilt as canonical gap-fill |
| 071–100 | 10 pairs each, extracted above | 50 MCQs each; first 10 vocab, remaining 40 templated sentence patterns | no complete canonical grammar section in learner UI | vocabulary pronunciation/recording panel; exact cue/translation cards need extraction | no complete canonical reading section in learner UI | three open-ended writing stages, not dictation | word selection/recording, not ten modelled prompts | no complete canonical Listening gap-fill section |

## Revised completion statement

This second extraction pass now transcribes the full ten-pair vocabulary banks for all 38 standalone missions (003–010 and 071–100), the 50-question counts and representative repeated question patterns, the grammar objectives for 003–010, and concrete defects found in the 071–100 question generator.

Still outstanding before any canonical JSON is safe to generate:
- Item-by-item extraction of all 50 MCQs and answer options from each standalone mission (1,900 MCQs across 38 pages), with editorial selection and correction.
- Exact extraction and review of all Reading passages/questions and Listening scripts/questions for 003–010.
- Full item-level extraction of Grammar, Pronunciation and Speaking data from standalone pages, rather than relying on visible labels or generic UI text.
- Item-level content extraction for 011–070, beyond the structural counts and representative edge cases already recorded.
- Editorial creation of missing ten-item Writing/Speaking and canonical Listening gap-fill content where no valid source exists.
- Canonical JSON creation, schema validation, protected evaluator routes and page conversion.

No mission in 003–100 is certified as canonically converted by this audit.

## Full source extraction: Practice banks for all standalone missions

The original `data.qs` arrays have now been extracted verbatim into five structured audit files. Together they cover all 38 standalone pages and **1,900 source Practice entries**:

| Extraction file | Missions | Source Practice entries |
|---|---:|---:|
| `extractions/prea1-003-010.json` | 8 | 400 |
| `extractions/prea1-071-078.json` | 8 | 400 |
| `extractions/prea1-079-086.json` | 8 | 400 |
| `extractions/prea1-087-094.json` | 8 | 400 |
| `extractions/prea1-095-100.json` | 6 | 300 |
| **Total** | **38** | **1,900** |

Each extracted mission record preserves:
- Mission number and visible page title.
- The ten original vocabulary pairs.
- Every Practice source entry in original order, with source index, question type, English prompt, Spanish source answer and original options.

These files are editorial source records only. They are not canonical JSON, must not be served as learner payloads, and do not certify that the old questions are pedagogically or linguistically suitable. The source answer/options were already embedded in the legacy HTML; canonical delivery must continue to keep answer keys on the server.

### Quality checks and limits

- The five extraction batches were parsed from each page's embedded `const data` object using JSON parsing, rather than manually retyping the arrays.
- Each batch contains the expected number of mission records and was extracted from `main`.
- The 1,900 questions are now available for review and deterministic selection, but they have not yet been individually rewritten or approved.
- This extraction does not yet include the full inline Reading passages, Listening scripts, Grammar question banks, Pronunciation metadata, or Speaking prompts/models from all standalone pages. Those require a separate field-by-field extraction pass.
- The 011–070 data-driven family also still needs a full item-level extraction, beyond the counts and representative samples in the earlier audit.

### Recommended next editorial operation

Review the 1,900 Practice entries by mission and classify each as `keep`, `rewrite`, `replace`, or `exclude`. Select exactly 20 valid canonical Practice items per mission only after the theme fit, grammar, distractors and answer uniqueness have been checked. Do not automatically select the first 20 entries.


## Follow-up extraction: remaining source sections and data-driven family

The item-level source extraction pass has now been extended beyond the standalone Practice arrays. The following source records have been added under `docs/course-architecture/extractions/`:

### Standalone pages 003–010
- `prea1-003-010-sections.json`: static Grammar, Pronunciation, Reading, Listening and Speaking panel markup/text. No Writing panel is present in this page family.
- `prea1-003-010-scripts.json`: original inline scripts retained to trace generated questions, audio playback and Speaking behaviour.
- The Reading passage and Listening transcript remain source HTML; Listening uses the legacy ten-question quiz model rather than the canonical gap-fill.

### Standalone pages 071–100
- `prea1-071-080-sections.json`, `prea1-081-090-sections.json`, `prea1-091-100-sections.json`: static panel markup/text.
- `prea1-071-080-scripts.json`, `prea1-081-090-scripts.json`, `prea1-091-100-scripts.json`: inline page scripts preserved because Writing is generated dynamically.
- These pages expose Pronunciation and Speaking, but no canonical Grammar, Reading or Listening panels. Writing is a generated open-ended composition flow, not ten audio dictations.

### Data-driven pages 011–070
- `prea1-011-020-source.json`: mission data objects, Writing item arrays and generic Reading/Listening prompt templates.
- `prea1-021-030-source.json` and `prea1-031-040-source.json`: mission data objects and explicit Writing item arrays.
- `prea1-041-050-source.json`, `prea1-051-060-source.json`, `prea1-061-070-source.json`: mission data objects, including the available Vocabulary, Pronunciation, Grammar, Reading and Listening source fields.
- `prea1-shared-runtimes-source.json`: original shared mission and Writing runtime code, retained to trace runtime-generated exercises.

### Findings and limitations

- Missions 011–020 have only three explicit Grammar source items each. Their Reading and Listening question prompt arrays are generic repeated templates, not ten individually authored comprehension questions per section.
- Missions 021–040 generally expose four Grammar source items and legacy Writing targets in the 21–23 range. The Writing runtime treats these as letter-by-letter dictation data; counts are not the canonical ten.
- Missions 041–070 generally expose four Grammar items and ten Reading plus ten Listening MCQs in the data object. Writing is generated by the shared runtime rather than supplied as ten mission-authored dictation targets.
- Source Vocabulary and Pronunciation counts vary by mission. They must not be truncated automatically to ten; for example, mission 054 includes 26 vocabulary entries.
- The 003–010 and 071–100 panel/script archives preserve source content and mechanics for editorial review. Static HTML and scripts are not proof that a section meets the canonical counts or behaviour.
- All answer-bearing source JSON and scripts are audit-only. They must never be exposed directly as learner payloads.
- Browser TTS directives, speech synthesis calls and microphone UI are not verified stored audio assets. No real audio/device/browser test was performed in this extraction pass.
- No source section in this pass is certified as canonically converted. This remains an extraction and audit deliverable, not a runtime migration.

This section supersedes the earlier statement above that the full Reading/Listening/Grammar/Pronunciation/Speaking source extraction and the 011–070 item-level extraction were still entirely outstanding. Some fields remain runtime-generated or generic, as described here; those are gaps in the legacy source, not completed authored exercises.
