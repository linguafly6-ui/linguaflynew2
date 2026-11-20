# Canonical pilot missions — Pre-A1 001 and A1 001

**Status:** canonical v1 JSON draft; structurally checked in the creation workflow.  
**Language:** British English (`en-GB`). No runtime/API/database wiring.

## Files
- `content/missions/pre-a1/001.json` — Greetings and Introductions.
- `content/missions/a1/001.json` — Who Am I?

## IDs and versions
Hierarchical course, unit, mission, section, exercise and item IDs are stable slugs independent of visible text. `contentVersion` is 1.

## Audio
Audio fields use `tts:en-GB:<text>` directives for browser speech synthesis. These are not audio URLs or stored assets.

## Assessment and data-protection boundary
These files are **canonical authoring/server-source data, not safe public client payloads**. The schema requires `expectedAnswer` for Writing and `expectedWordId` for Listening, so those answer mappings are present here. Speaking also contains model answers. Do not serve these files directly to browsers or publish them as static assets. A protected server-side delivery/evaluator layer must strip or withhold keys and return only the learner-facing fields. Practice, Grammar and Reading evaluation modes are declared, but their correct-answer maps and choice sets still need to be implemented in the protected evaluator.

Speaking uses `transcription_feedback` with `transcriptionSeparateFromPronunciation: true`. No phonetic accuracy claim is made.

## Editorial adaptations
- A1 Reading uses fictional Alex Taylor details and reserved `example.test` email.
- A1 Practice contact-detail prompts tell learners to use fictional information.
- Listening has ten explicit unique bank entries with stable IDs; answer mappings are included for server use only.
- Practice has exactly 20 fixed items per mission; all other sections have exact contract counts.
- Pronunciation guides are approximate Spanish-speaker cues, not IPA; A1 cues in particular need qualified editorial review.

## Checks performed
- Parsed both JSON serialisations.
- Checked eight ordered sections and counts 10/20/10/10/10/10/10/10.
- Checked uniqueness of section/exercise/item IDs and every Listening word reference.
- Did not execute the repository Python validator or a full JSON Schema engine in this environment. These remain required before runtime integration.
- No browser, audio playback, visual or accessibility tests were run.

## Required gates before release
1. Implement protected server-side delivery/evaluation; never expose the canonical files or answer mappings in browser bundles.
2. Add correct-answer maps and choice sets for Practice, Grammar and Reading.
3. Verify all translations and pronunciation cues editorially.
4. Confirm TTS support and fallback behaviour on target browsers.
5. Run the repository Python validator and a full JSON Schema validation, then test the runtime.

No runtime, page HTML, API, database, student progress, merge or deployment changes are included.
