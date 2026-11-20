# Editorial decisions required before canonical pilot conversion

**Status:** decision brief only. This document does not author or replace any course exercise.  
**Parent:** source extraction PR #70.  
**Mission scope:** Pre-A1 001 and A1 001.  
**Rule:** only source-backed content may be extracted into canonical mission data. New pedagogical content requires explicit editorial approval.

## 1. Decisions that can be made without inventing content

### Pre-A1 001 — Practice selection proposal

The source `data.qs` contains 50 multiple-choice items. The first 20 are the most coherent source-backed subset for the approved 20-item Practice section:

- Items 1–10: the ten vocabulary translations already paired in Exploración.
- Items 11–20: ten short greeting / introduction expressions: “Hello!”, “Good morning.”, “Good afternoon.”, “Good evening.”, “Goodbye!”, “See you soon.”, “Please, help me.”, “Thank you very much.”, “You are welcome.”, “What is your name?”

This is a **selection proposal, not an applied conversion**. It preserves a progression from single words to useful short expressions, and does not create new questions. Before adoption, editorial review should decide whether repeating all ten vocabulary pairs in Practice is desirable when they already appear in Exploración.

### Pre-A1 001 — Reading and Grammar

- Grammar: the source has exactly ten distinct records with three options and a stored correct answer. No new questions are required to meet the quantity.
- Reading: the source has a complete visible passage and exactly ten comprehension questions with answer options. Keep the passage as a separate canonical content object and map all ten question records.
- These two sections can proceed to canonical extraction after a content/answer-key review. Correct answers must be stored in the protected evaluation layer, not exposed in a public client mission payload.

### A1 001 — Vocabulary and Reading

- Vocabulary: the ten lesson words and their Spanish meanings are present in the shared helper dictionary.
- Reading: the full passage and ten question/answer/distractor tuples are present in the shared script.
- These can proceed to canonical extraction after reviewing the translations, privacy implications of the sample personal data, and answer-key placement.

## 2. Editorial decisions requiring approval

### Pre-A1 001

| Section | Existing source | Required decision |
|---|---|---|
| Writing | 22 dictations about animals/nature; mission is greetings/introduction | Author ten new on-topic dictation targets, or identify a verified source set |
| Speaking | Recording a selected vocabulary word; no ten-prompt sequence | Author ten distinct prompts and model answers, or approve a redesigned word-level speaking section |
| Listening | One conversation transcript and ten multiple-choice questions | Approve converting the transcript into ten explicit gap-fill items and a ten-word bank; the existing quiz questions cannot be relabelled as gap-fill |

### A1 001

| Section | Existing source | Required decision |
|---|---|---|
| Practice | 50 legacy quiz questions | Approve a reviewed 20-item selection; do not truncate mechanically |
| Grammar | Three authored task templates cycled to produce ten UI steps | Author seven additional distinct tasks, or explicitly approve repetition |
| Pronunciation | Ten cards generated from vocabulary, helper translations/cues and browser TTS | Approve retaining browser-generated en-GB speech as the audio strategy, subject to browser limitations |
| Writing | Ten targets generated algorithmically from five vocabulary words and sentences selected from Listening | Approve freezing the ten generated targets as explicit authored records after review, or author a different ten-item set |
| Speaking | Ten prompts generated from five repeating patterns and vocabulary words | Author ten distinct prompt/model-answer records, or explicitly approve the five-pattern variation |
| Listening | Ten gaps selected algorithmically from transcript word positions | Approve an explicit editorial gap map and ten unique bank entries; verify that every bank entry is used once |

## 3. Technical decisions

1. **Audio representation:** current source uses browser speech synthesis (`SpeechSynthesisUtterance`) with `en-GB`; it does not point to stable audio files. Decide whether schema v1 permits a TTS configuration as an audio source or requires stored audio assets. No fake media URLs will be created.
2. **Speaking assessment:** the current UI reports transcription recognition/match and explicitly says it is not a phonetic score. Keep these as separate evaluation dimensions. Do not describe transcription as phoneme or accent assessment.
3. **Sample personal data:** A1 Reading uses a named example and contact details, including an email and phone number. Review or replace the sample identity/contact data before production publication; do not reuse it as real personal data.
4. **Answer-key protection:** legacy answer keys are client-side. Canonical public mission content should contain prompts/options only; correct answers and scoring rules should be served or checked by a protected server-side evaluator.
5. **Stable IDs:** assign permanent IDs only after content selection is approved and frozen. Legacy IDs such as `W001-01` are traceability metadata, not canonical IDs.

## 4. Recommended approval sequence

1. Approve the Pre-A1 001 Practice selection proposal (or request a different selection).
2. Approve authoring of missing Pre-A1 001 Writing, Speaking and Listening content.
3. Approve the A1 001 Practice selection and whether Grammar/Speaking may use reviewed variants or must be ten fully distinct items.
4. Approve browser TTS as the temporary audio mechanism, or require stored audio assets before conversion.
5. Once approved, create canonical JSON and protected evaluation data, run the schema and validator, and add semantic regression tests.

## 5. Current status

No canonical mission JSON has been generated in this phase. No new exercise text, answer, audio URL, or model response has been invented. This document is a decision gate, not a completion claim. No course pages, runtime, API, database, or deployment have been changed.
