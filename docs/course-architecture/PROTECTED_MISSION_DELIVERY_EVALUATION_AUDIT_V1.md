# Protected mission delivery and evaluation audit — v1

**Baseline:** `main` as inspected on 2026-11-20, plus canonical pilot data from the parent branch.  
**Status:** implementation audit and recommended contract only. No application code or migrations changed.

## 1. Existing infrastructure

### Authentication and storage
- `lib/student-auth.ts` exposes `getStudent(req)`, backed by the `lf_student_session` HttpOnly cookie and Cloudflare D1 `COURSE_DB`.
- `wrangler.jsonc` declares D1 bindings `DB` and `COURSE_DB`, Workers AI binding `AI`, and R2 bucket `LINGUAFLY_MEDIA`.
- `migrations/d1/exercises_system.sql` creates the legacy exercise tables: `exercise_courses`, `exercise_units`, `exercise_items`, `exercise_progress`, and `exercise_answers`.
- The current legacy `exercise_items` table stores `correct_answer` in the same row as learner-facing question fields.

### Existing exercise API findings
- `GET /api/exercises/[course]/[unit]` authenticates a student, builds or seeds legacy exercises into D1, then returns the full exercise rows. The selected columns include `correct_answer` and `explanation`, and the response serialises the rows to the browser.
- Therefore the legacy endpoint exposes the correct answer to the client. This is a confirmed security/design issue for that legacy exercise system; do not copy this response pattern into the new canonical mission API.
- `POST /api/exercises/[course]/[unit]/submit` compares submitted answers server-side against `buildUnit(course,n)`, then writes answer and progress rows. It does not provide the new canonical IDs, content versions or attempt-id idempotency contract.
- Existing progress aggregates by user/course/unit/category. It is not sufficient for preserving immutable item-level attempts under the new contract.
- The canonical JSON is not currently read by these routes; `buildUnit` is a separate legacy content factory.

### Pronunciation findings
- `POST /api/pronunciation/analyze` uses the authenticated student session when available, Workers AI transcription, a text similarity score and recognition feedback.
- Its response labels the score **“Coincidencia de transcripción (no es una nota fonética)”**, returns `similarityType: "transcription-only"`, and currently returns an empty `phoneticIssues` array.
- `lib/pronunciation.ts` uses `@cf/openai/whisper-large-v3-turbo` for speech-to-text and computes edit-distance similarity. This is not acoustic/phoneme scoring.
- The repository also declares a MeloTTS model and R2 reference-audio storage helper. This audit does not verify that a British-English voice or stored audio asset is already configured for the new missions.

## 2. Canonical mission API requirements

The new API should be separate from the legacy `/api/exercises` contract until a deliberate migration is approved.

### Learner-facing read endpoint
- Require `getStudent(req)`; derive `student_id` only from the authenticated session, never from request JSON.
- Resolve a published mission by immutable `courseId`, `unitId`, `missionId` and `contentVersion`.
- Return only learner-facing fields: IDs, section order, prompts, passage, TTS/audio reference, choices and interaction metadata.
- Strip `expectedAnswer`, `expectedWordId`, answer mappings, evaluation secrets and server-only metadata before serialising.
- Never expose raw canonical source files directly as static assets or client bundles.
- Validate access/entitlement using the same established account/plan policy, but do not invent new plan restrictions in this pilot.

### Submission endpoint
- Require authenticated student; accept a stable `attempt_id`, `mission_id`, `content_version` and item responses keyed by permanent `item_id`.
- Validate IDs and content version against the published mission on the server. Reject unknown, duplicate or mismatched item IDs.
- Look up correct answers/rubrics from protected server-side data. Never trust client-provided expected answers, scores, item totals or student IDs.
- Make submissions idempotent on `student_id + attempt_id`; a retry returns the original result rather than writing a second attempt.
- Store immutable attempt headers and item responses, including submitted answer, correctness/feedback, score, duration and timestamp. Do not overwrite historical attempts.
- Keep speaking transcription results and any phonetic measurements as different typed fields. With the current Whisper flow, store/display transcription feedback only.

## 3. Proposed D1 persistence model

A migration should be designed only after the API contract is approved. Suggested tables:

1. `course_missions`: `mission_id`, `course_id`, `unit_id`, `content_version`, `schema_version`, `published_at`, `status`, `content_json` (server-only).
2. `mission_answer_keys`: `mission_id`, `content_version`, `item_id`, `answer_key_json`, `rubric_json` (server-only; never joined into learner GET).
3. `mission_attempts`: `attempt_id`, `student_id`, `mission_id`, `content_version`, `started_at`, `submitted_at`, `duration_ms`, `score`, `status`, unique on `student_id, attempt_id`.
4. `mission_attempt_items`: `attempt_id`, `item_id`, `response_json`, `is_correct`, `feedback_json`, unique on `attempt_id, item_id`.

Use foreign keys/indexes and transactional or batched writes appropriate to D1. Retain old versions and attempts; do not mutate a published version in place. A minor wording change increments `contentVersion`; a semantic change creates a new version according to the master contract.

## 4. Current pilot blockers

- The canonical JSON schema requires Writing `expectedAnswer` and Listening `expectedWordId`; those fields must remain server-side and be stripped from learner responses.
- Practice, Grammar and Reading in the current pilot JSON declare evaluation types/prompts but still need protected choice sets and answer maps before autocorrection can work.
- A1 pronunciation cues are approximate editorial material and require review.
- Browser TTS directives are not stored audio assets. Verify the actual voice selection/fallback in target browsers.
- Existing `GET /api/exercises` leaks legacy correct answers. Fixing that is a separate security change; do not silently alter the legacy API as part of this content pilot.

## 5. Recommended next implementation sequence

1. Approve the endpoint contract and D1 schema before writing migrations.
2. Create a server-only mission repository/loader and learner-safe DTO projection.
3. Add server-side answer-key records and evaluator functions for each exercise type.
4. Add attempt/attempt-item persistence with idempotent submission.
5. Add integration tests proving GET responses contain no answer keys and submissions cannot spoof student IDs or content versions.
6. Decide separately whether to remediate the legacy `/api/exercises` answer leak and how to preserve compatibility.
7. Only then connect the two pilot pages/runtime to the new API.

## 6. Scope

This document records findings and a design proposal only. It does not change `main`, legacy API routes, authentication, D1 schema, runtime, content pages, student data, deployment or production configuration. No migration has been applied.
