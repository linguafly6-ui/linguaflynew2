# Editorial content pack — Pre-A1 001 and A1 001

**Status:** newly authored editorial material for review; not yet wired into either mission runtime.  
**Parent:** `pilot/editorial-gap-plan-v1` (PR #71).  
**Language:** British English (`en-GB`).  
**Scope:** fill the explicitly approved content gaps only. Existing source material remains source material and is not silently replaced.

## Editorial and implementation rules

- Every list below has the exact requested quantity. Item numbers are editorial ordering only; canonical permanent IDs must be assigned after approval and content freeze.
- Dictation and model-answer text is a target for browser speech synthesis, not a claim that a recorded audio asset exists. Use the existing `en-GB` TTS path provisionally; do not invent audio URLs.
- Speaking feedback must report transcription/match separately from phonetic assessment. Unless a verified phonetic evaluator is integrated, label it **transcription feedback**, not a pronunciation score.
- All answer keys below are authoring references for a future protected evaluator. Do not ship them in public mission JSON or client-side bundles.
- Personal details in learner-facing prompts must be fictional or optional. Never require a learner to disclose a real phone number, email or home address.

---

# 1. Pre-A1 mission 001 — Greetings and Introductions

## 1.1 Writing — 10 dictation targets (new)

Learner instruction: listen to the British-English model and type the word or phrase. Punctuation and capitalisation may be normalised by the evaluator; spelling must be checked.

| # | Dictation target | Spanish support |
|---:|---|---|
| 1 | Hello! | ¡Hola! |
| 2 | Good morning. | Buenos días. |
| 3 | Good afternoon. | Buenas tardes. |
| 4 | Goodbye! | ¡Adiós! |
| 5 | Please. | Por favor. |
| 6 | Thank you. | Gracias. |
| 7 | You're welcome. | De nada. |
| 8 | My name is Alex. | Me llamo Alex. |
| 9 | What is your name? | ¿Cómo te llamas? |
| 10 | Nice to meet you. | Encantado/a de conocerte. |

TTS configuration: `en-GB`; speak the target exactly as written. These are text targets for TTS, not audio-file URLs.

## 1.2 Speaking — 10 distinct prompts and model answers (new)

Learner instruction: listen to the model, record a response, then review the recognised transcript. The model answer is an example; accept equivalent simple answers.

| # | Prompt | Model answer |
|---:|---|---|
| 1 | Greet a classmate in the morning. | Good morning! |
| 2 | Say goodbye to a friend. | Goodbye! See you soon. |
| 3 | Introduce yourself. | Hello. My name is Alex. |
| 4 | Ask another person's name. | What is your name? |
| 5 | Say that you are pleased to meet someone. | Nice to meet you. |
| 6 | Ask someone politely for help. | Please, can you help me? |
| 7 | Thank a person for their help. | Thank you for your help. |
| 8 | Reply when someone says thank you. | You're welcome. |
| 9 | Introduce a friend to your teacher. | This is my friend, Ben. |
| 10 | Say hello and introduce yourself to a new teacher. | Hello. I'm Alex. Nice to meet you. |

Assessment contract: store the recognised transcript and transcript-match feedback separately. A transcript match is not a phonetic score. If the service does not return validated phonetic measurements, show no phoneme accuracy, accent score or pronunciation grade.

## 1.3 Listening — one gap-fill passage, 10 gaps, 10 unique bank entries (new format)

Learner instruction: listen to the passage and complete each gap by selecting one word from the bank. Each bank entry is used once.

**Passage with inline gaps**

“Hello! I'm **[1]**. This is my **[2]**, **[3]**. My **[4]** is **[5]**. We say good **[6]** when we meet. We say **[7]** when we ask for **[8]**, and **[9]** when someone helps us. At the end, we say **[10]**.”

**Word bank (shuffled):** goodbye · Ben · help · teacher · thank you · Alex · Mia · friend · morning · please

| Gap | Expected word |
|---:|---|
| 1 | Alex |
| 2 | teacher |
| 3 | Mia |
| 4 | friend |
| 5 | Ben |
| 6 | morning |
| 7 | please |
| 8 | help |
| 9 | thank you |
| 10 | goodbye |

**Audio source:** the passage above is the exact TTS script. Use `en-GB` speech synthesis. Do not expose the transcript before the learner completes the activity if the existing interaction is intended to be listen-first. The transcript is provided here for editorial review and must remain available in the authoring source.

## 1.4 Existing sections retained, not newly authored

- Exploración: retain the ten source-backed pairs already listed in the extraction report.
- Practice: the 50 source questions still need a reviewed selection of exactly 20. This pack does not silently apply the earlier first-20 proposal.
- Grammar: retain the ten source-backed items after answer review.
- Pronunciation: retain the ten source words, reviewed Spanish translations and approximate Spanish-speaker cues; use `en-GB` TTS provisionally.
- Reading: retain the source passage and ten source questions; render the passage in its own panel before the questions.
- Existing answer keys must be moved to a protected evaluator before public release.

---

# 2. A1 mission 001 — Who Am I?

## 2.1 Grammar — seven additional distinct tasks (new)

The source already contains three distinct authored templates. These seven items are additional and are not repetitions of those templates. Together they make ten distinct grammar items.

| # | Prompt | Options | Correct answer |
|---:|---|---|---|
| 4 | I ___ twenty-four years old. | am / is / are | am |
| 5 | She ___ from Spain. | am / is / are | is |
| 6 | They ___ students. | am / is / are | are |
| 7 | We ___ in Madrid. | am / is / are | are |
| 8 | ___ he your teacher? | Am / Is / Are | Is |
| 9 | My friends ___ from Italy. | am / is / are | are |
| 10 | I ___ not thirty years old. | am / is / are | am |

The original three source templates remain:
1. I ___ from Madrid. (am)
2. My surname ___ Brown. (is)
3. ___ you a student? (Are)

The evaluator must use the full ten-item set and keep correct answers server-side.

## 2.2 Writing — 10 explicit dictation targets (reviewed, replacing runtime-generated cycling)

Learner instruction: listen and type the sentence. These examples use fictional details. Learners should not enter real contact information.

| # | Dictation target | Spanish support |
|---:|---|---|
| 1 | My name is Alex. | Me llamo Alex. |
| 2 | My surname is Taylor. | Mi apellido es Taylor. |
| 3 | I am twenty-four years old. | Tengo veinticuatro años. |
| 4 | I am from Spain. | Soy de España. |
| 5 | I am Spanish. | Soy español/a. |
| 6 | I live in Madrid. | Vivo en Madrid. |
| 7 | My address is 10 Green Street. | Mi dirección es 10 Green Street. |
| 8 | My phone number is 000 123 456. | Mi número de teléfono es 000 123 456. |
| 9 | My email address is alex@example.test. | Mi correo electrónico es alex@example.test. |
| 10 | My birthday is on 12 May. | Mi cumpleaños es el 12 de mayo. |

TTS configuration: `en-GB`. Items 7–9 contain deliberately fictional placeholder details; the UI should repeat the privacy reminder and must not prompt for real contact details.

## 2.3 Speaking — 10 distinct prompts and model answers (new)

Learner instruction: answer in a complete, simple sentence. Model answers use fictional details and are examples, not the only acceptable responses.

| # | Prompt | Model answer |
|---:|---|---|
| 1 | Introduce yourself by giving your first name. | My name is Alex. |
| 2 | Say your first name and surname. | My name is Alex Taylor. |
| 3 | Say how old you are (you may use an imaginary age). | I am twenty-four years old. |
| 4 | Say which country you are from. | I am from Spain. |
| 5 | Say your nationality. | I am Spanish. |
| 6 | Say which city you live in. | I live in Madrid. |
| 7 | Ask another student for their name. | What is your name? |
| 8 | Ask another student where they are from. | Where are you from? |
| 9 | Ask another student how old they are. | How old are you? |
| 10 | Give a short introduction using your name, age and city. | Hello. My name is Alex. I am twenty-four and I live in Madrid. |

Assessment contract: keep transcript recognition/match separate from any phonetic analysis. These prompts can use transcription feedback. Do not claim phonetic accuracy unless the analysis endpoint is verified to return and validate phonetic features.

## 2.4 Listening — explicit editorial gap map (10 unique answers)

**Passage with inline gaps**

“Hello. My name is **[1]** Ruiz. I am **[2]** years old. I am **[3]**. I live in **[4]**. My **[5]** number is **[6] [7] [8]**. My **[9]** is on 3 **[10]**.”

**Word bank (shuffled):** March · phone · Seville · Spanish · 600 · Daniel · birthday · 123 · twenty-eight · 456

| Gap | Expected word |
|---:|---|
| 1 | Daniel |
| 2 | twenty-eight |
| 3 | Spanish |
| 4 | Seville |
| 5 | phone |
| 6 | 600 |
| 7 | 123 |
| 8 | 456 |
| 9 | birthday |
| 10 | March |

All ten bank entries are unique and used exactly once. The audio script is the completed passage read with `en-GB` TTS. The visible gap text and bank must be generated from this explicit map, not selected randomly from transcript positions.

## 2.5 Existing sections retained, not newly authored

- Exploración: retain the ten source words and Spanish translations, after review.
- Practice: the source has 50 legacy challenges. A reviewed selection of exactly 20 is still required; this pack does not claim that selection has been completed.
- Pronunciation: retain ten vocabulary cards and reviewed approximate cues; use the existing `en-GB` browser TTS path provisionally.
- Reading: retain the complete passage and ten source questions, but replace the example's identifiable-looking personal details with clearly fictional placeholders before production.
- The three original Grammar templates remain as listed above and combine with the seven new distinct tasks.
- The ten Writing and Speaking items in this pack replace runtime-generated repetition with explicit, reviewable records.

---

## 3. Acceptance checklist before canonical conversion

- [ ] Editorially review all newly authored English, Spanish support and answer semantics.
- [ ] Confirm the Pre-A1 Practice selection of 20 from the 50 source items and A1 Practice selection of 20 from its 50 source items.
- [ ] Verify every Reading answer against its visible passage.
- [ ] Verify Listening gaps, unique bank entries and exact one-use mapping.
- [ ] Keep answer keys out of public mission JSON and browser bundles.
- [ ] Confirm the browser TTS `en-GB` strategy; no audio-file URLs are asserted by this pack.
- [ ] Assign permanent hierarchical IDs only after the content is frozen.
- [ ] Validate the final canonical JSON against `schemas/course-mission.schema.json` and run the regression suite.
- [ ] Confirm that Speaking UI labels transcription feedback accurately and does not imply phonetic scoring.

**Not included:** canonical mission JSON, runtime integration, API/DB changes, answer-key deployment, audio asset generation, visual QA, merge or deployment. Those remain separate implementation/review steps.
