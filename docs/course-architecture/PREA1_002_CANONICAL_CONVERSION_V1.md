# Pre-A1 mission 002 — canonical conversion

## Source review
- Legacy page reviewed: `public/missions/pre-a1/002/index.html` on `main`.
- Existing lesson theme is Numbers 1–10. The legacy page mixed unrelated food dictation items into the mission and used a multiple-choice Listening quiz with a delayed transcript and a misleading 100-task counter.
- The original Reading passage about red and blue number cards, balls and books is retained.

## Canonical content
- Eight sections in the master order with exact counts: 10 / 20 / 10 / 10 / 10 / 10 / 10 / 10.
- Explore: ten number/Spanish pairs and a short explanation of counting, How many, There is and There are.
- Practice: ten translation tasks and ten number-sequence tasks.
- Grammar: ten tasks on countable plurals, How many, There is and There are.
- Pronunciation: ten number cards with translation, learner-friendly Spanish approximation and en-GB TTS directive.
- Reading: full passage displayed before ten comprehension questions.
- Writing: ten number dictations, replacing unrelated legacy food dictations.
- Speaking: ten distinct prompts with model answers and transcription feedback; not a phonetic score.
- Listening: ten inline gaps, ten unique bank words, select/place/move/replace interaction, answer checking and solutions.

## Answer security
- Correct answers for Practice, Grammar, Reading, Writing and Listening live only in the authenticated server route.
- The browser page receives a sanitized content object without `expectedAnswer` or `expectedWordId`.
- The API uses the authenticated student session; the student identity is not accepted from the client.

## Limitations
- Audio values are `tts:en-GB:` directives handled by browser speech synthesis, not verified stored audio files.
- Speaking is transcription feedback only; it does not claim phonetic evaluation.
- This PR does not add persistent D1 attempt/progress records.
- Browser, microphone and real-device TTS tests have not been run.
- Only Pre-A1 mission 002 is converted by this PR.
