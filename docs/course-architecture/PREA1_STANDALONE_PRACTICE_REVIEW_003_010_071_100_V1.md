# Pre-A1 standalone Practice source review (003–010, 071–100)

**Scope:** 38 standalone mission pages; source arrays extracted from `main`.  
**Status:** editorial audit only. No canonical content has been selected or rewritten.

## Extraction totals

- 38 missions.
- 10 vocabulary pairs per mission.
- 50 legacy Practice MCQs per mission.
- 1,900 Practice source entries preserved in the five JSON extraction files.
- All five files were parsed back from the PR branch and checked: each mission has 10 vocabulary pairs, 50 Practice entries, and 3 options per entry.

## Family A: missions 003–010

For each of the eight missions:
- Items 1–10 are direct checks of the mission's ten vocabulary pairs.
- Items 11–50 are the same 40 greetings/classroom-expression prompts in the same order across all eight missions.
- The repeated tail contributes 320 entries in total but only 40 distinct prompts across the family.
- The 40-item tail is largely unrelated to the mission themes Colours, My Family, Animals, Food and Drinks, School Things, My Body, At Home and Daily Actions.

**Editorial recommendation:** do not select the first 20 legacy items as the canonical Practice set. Retain the ten vocabulary checks only if their options and answer mapping pass review, then create or select ten additional mission-specific tasks. This yields exactly 20 tasks without carrying the unrelated greetings bank into every lesson.

## Family B: missions 071–100

For each of the 30 missions:
- Items 1–10 test the ten mission vocabulary pairs.
- Items 11–50 use a repeated set of sentence-frame patterns around each vocabulary target.
- Across the family, the 1,200 tail entries produce 1,112 distinct normalized prompts, because the target words vary. The underlying exercise mechanics remain templated.
- Many sentence frames do not fit the grammatical category or meaning of the target word.

### Confirmed examples requiring exclusion or rewrite

| Mission | Source target / generated form | Problem |
|---:|---|---|
| 075 | `床` paired with Spanish `la mesita` | Chinese text appears where an English target should be |
| 088 | `I can see the listen`, `I can see the repeat` | Imperative verbs forced into a noun phrase |
| 090 | `I can see the tired`, `I can see the hungry` | Adjectives/states forced into a noun phrase |
| 095 | `I can see the a bottle` | Duplicated article |
| 099 | `I can see the clean`, `I can see the wash` | Verbs forced into a noun phrase |
| 100 | `I can see the hello`, `I can see the thank you` | Expressions/greetings forced into a noun phrase |

These are not isolated cosmetic issues. They show that a mechanically generated MCQ cannot be accepted solely because it has three options and an answer.

**Editorial recommendation:** preserve the ten vocabulary checks as candidates, validate each distractor, then write ten additional tasks using sentence frames appropriate to the lesson's word classes and communicative purpose. Do not auto-select source items 11–50.

## Canonical Practice selection policy

For each mission, the eventual canonical set must contain exactly 20 autocorrectable tasks. Apply this workflow:

1. Keep the original source index and prompt for traceability.
2. Classify each source task as `keep`, `rewrite`, `replace` or `exclude`.
3. Verify theme fit, natural British English, Spanish translation, grammatical category, one unambiguous correct answer and plausible distractors.
4. Prefer a balanced mix of vocabulary recall and contextual use; avoid ten near-identical translation checks.
5. Create missing items rather than padding with unrelated or malformed source tasks.
6. Store expected answers only in the protected server-side evaluator; do not send answer maps to the learner page.

## Files and traceability

The extracted source records are in:
- `docs/course-architecture/extractions/prea1-003-010.json`
- `docs/course-architecture/extractions/prea1-071-078.json`
- `docs/course-architecture/extractions/prea1-079-086.json`
- `docs/course-architecture/extractions/prea1-087-094.json`
- `docs/course-architecture/extractions/prea1-095-100.json`

Each record retains the original mission number, page title, vocabulary pairs and every Practice source entry with its source index, prompt, source answer and options. These are audit/source records, not canonical learner payloads.

## Not yet audited at item level

This review does not certify Grammar, Pronunciation, Reading, Writing, Speaking or Listening. Those sections require separate extraction and editorial decisions. The 011–070 data-driven family also remains to be extracted item by item, beyond the structural audit already documented.
