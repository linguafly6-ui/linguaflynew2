# Linguafly Academy — curriculum source of truth

## Canonical structure

- Course catalogue: `content/curriculum/courses.json`
- Mission schema: `schemas/course-mission.schema.json` (JSON Schema 2020-12, version 1.2.0)
- Mission content: `content/missions/{level}/{NNN}.json`
- Existing Pre-A1 missions already live in `content/missions/pre-a1/`.
- A1 missions 051–100 are normalized into `content/missions/a1/`.

Every mission uses the same eight sections, in the same order:

1. `explore` — vocabulary and concepts
2. `practice` — guided mixed practice
3. `grammar` — grammar explanation and checks
4. `pronunciation` — British English listening and repetition
5. `reading` — a short text and comprehension
6. `writing` — dictation and a short writing task
7. `speaking` — guided oral prompts and model answers
8. `listening` — audio, transcript template and gap-fill

## Stable identifiers and student progress

Use permanent identifiers at every level: `courseId`, `unitId`, `missionId`, `sectionId`, `exerciseId` and `itemId`. IDs identify learning activities, not students. A content correction increments `contentVersion`; a retired item ID must never be assigned to a different activity.

Student accounts, attempts, scores and completion records belong in the learning database, never in the curriculum JSON. Progress records should reference the stable curriculum IDs and record the content version used for the attempt. This allows the same course content to be shared by every learner while each learner has an independent progress history.

The current D1 progress tables include legacy course/unit and numeric exercise references. They have not been migrated in this change. Before introducing granular progress writes, audit the deployed D1 schema and existing records, then design a backwards-compatible migration that preserves legacy identifiers and maps them to the stable curriculum IDs.

## Rendering and migration status

A1 051–100 currently have legacy `index-v2.html` pages. The canonical JSON supplies the six additional learning sections through the A1 curriculum API/runtime; the original exploration and practice interactions remain in those pages for now. The next harmonisation step is to move A1 001–050 and the legacy first two sections to the same data-driven renderer. Pre-A1 JSON is already centralized, but its static HTML runtime should be migrated to this shared renderer in a separately tested step.

## Cambridge alignment

A1 content is an editorial learning plan informed by CEFR A1 outcomes and Cambridge English A1 Movers vocabulary, grammar/structures and skills references. Cambridge does not publish this exact 100-mission sequence; do not describe it as an official Cambridge syllabus.

## Adding a course or mission

1. Add the course metadata to `courses.json`.
2. Create a mission JSON file under `content/missions/{level}/`.
3. Validate it against `schemas/course-mission.schema.json`.
4. Keep the eight section keys and their order unchanged.
5. Give every section, exercise and item a stable ID.
6. Add the rendering/API mapping for the new course only after its content validates.
7. Keep learner progress separate from content and test compatibility before any D1 migration.
