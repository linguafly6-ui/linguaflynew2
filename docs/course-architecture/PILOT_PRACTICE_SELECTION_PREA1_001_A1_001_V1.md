# Practice selection — Pre-A1 001 and A1 001

**Status:** proposed fixed editorial selections, ready for canonicalisation after review.  
**Rule:** exactly 20 items per mission; preserve source order within the selected sequence; no random truncation at runtime. Each selected item becomes its own permanent item ID after content freeze.

## Pre-A1 001 — Greetings and Introductions

**Selection:** source Practice items 1–20 from `public/missions/pre-a1/001/index.html`.

| New position | Source position | English prompt | Expected Spanish |
|---:|---:|---|---|
| 1 | 1 | hello | hola |
| 2 | 2 | goodbye | adiós |
| 3 | 3 | please | por favor |
| 4 | 4 | thank you | gracias |
| 5 | 5 | yes | sí |
| 6 | 6 | no | no |
| 7 | 7 | name | nombre |
| 8 | 8 | friend | amigo |
| 9 | 9 | teacher | profesor |
| 10 | 10 | student | alumno |
| 11 | 11 | Hello! | ¡Hola! |
| 12 | 12 | Good morning. | Buenos días. |
| 13 | 13 | Good afternoon. | Buenas tardes. |
| 14 | 14 | Good evening. | Buenas noches. |
| 15 | 15 | Goodbye! | ¡Adiós! |
| 16 | 16 | See you soon. | Hasta pronto. |
| 17 | 17 | Please, help me. | Por favor, ayúdame. |
| 18 | 18 | Thank you very much. | Muchas gracias. |
| 19 | 19 | You are welcome. | De nada. |
| 20 | 20 | What is your name? | ¿Cómo te llamas? |

**Editorial note:** positions 1–10 reinforce the core ten vocabulary pairs from Exploración, while 11–20 broaden practice to greetings, polite expressions and introductions. This deliberate reinforcement is preferable to pulling in unrelated classroom commands from later source items.

## A1 001 — Who Am I?

**Selection:** source Practice items 1–20 from `public/missions/a1/001/index.html`, with item 18 privacy-adapted.

| New position | Source position | English prompt | Expected Spanish | Editorial status |
|---:|---:|---|---|---|
| 1 | 1 | name | nombre | Source |
| 2 | 2 | surname | apellido | Source |
| 3 | 3 | age | edad | Source |
| 4 | 4 | address | dirección | Source |
| 5 | 5 | city | ciudad | Source |
| 6 | 6 | country | país | Source |
| 7 | 7 | nationality | nacionalidad | Source |
| 8 | 8 | phone number | número de teléfono | Source |
| 9 | 9 | email address | dirección de correo electrónico | Source |
| 10 | 10 | date of birth | fecha de nacimiento | Source |
| 11 | 11 | My name is Alex. | Me llamo Alex. | Adapted fictional name |
| 12 | 12 | I am twenty years old. | Tengo veinte años. | Source |
| 13 | 13 | I live in Madrid. | Vivo en Madrid. | Source |
| 14 | 14 | I am from Spain. | Soy de España. | Source |
| 15 | 15 | My surname is Taylor. | Mi apellido es Taylor. | Adapted fictional surname |
| 16 | 16 | What is your address? | ¿Cuál es tu dirección? | Source prompt; privacy reminder required |
| 17 | 17 | What is your phone number? | ¿Cuál es tu número de teléfono? | Source prompt; privacy reminder required |
| 18 | 18 | My email address is alex@example.test. | Mi correo electrónico es alex@example.test. | Adapted fictional reserved test domain |
| 19 | 19 | Where do you live? | ¿Dónde vives? | Source |
| 20 | 20 | When is your birthday? | ¿Cuándo es tu cumpleaños? | Source |

**Privacy and pedagogy notes**
- Do not ask learners to enter or disclose their real address, phone number or email. These are comprehension prompts only.
- The email uses the reserved `.test` domain and the name/surname are fictional.
- The original Reading passage in the A1 source contains realistic-looking contact details. Before production, it must be rewritten with fictional placeholders and its ten questions rechecked against the revised passage. This selection document does not claim that Reading rewrite is complete.

## Acceptance checks

- [x] Exactly 20 Practice items selected for each mission.
- [x] Selection is deterministic and ordered; no runtime random selection.
- [x] Both selections retain vocabulary plus sentence-level practice.
- [x] A1 Practice item 18 is privacy-adapted.
- [ ] Map each selected source item to a permanent canonical `itemId` after the full mission content is frozen.
- [ ] Keep correct answers in protected server-side evaluator data.
- [ ] Run schema and validator checks against the complete canonical mission JSON.

**Scope boundary:** this is an editorial selection record, not a canonical mission JSON and not a runtime integration. No page, runtime, API, database, merge or deployment changes are included.
