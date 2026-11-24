# Canonical mission content in D1

## Scope

The first migration pilot moves C1 and B2 canonical mission JSON into the existing
Cloudflare D1 database bound as `COURSE_DB` (`linguafly-learning`). It does not
touch the blog database (`DB`), student records, progress, billing, or C2
missions 091–100.

## Files

- `migrations/d1/educational_content.sql`: additive schema for the content store.
- `scripts/build-canonical-missions-seed.mjs`: validates current public C1/B2
  JSON and generates reproducible SQL. It does not connect to Cloudflare or run SQL.

## Generate and verify the seed

```bash
node scripts/build-canonical-missions-seed.mjs
node scripts/build-canonical-missions-seed.mjs --write --output=/tmp/canonical-missions.seed.sql
```

The importer validates each mission ID, course level, content version, duplicate
IDs and duplicate route keys. The generated SQL uses parameter-safe SQL string
escaping and an upsert keyed by (level, route_key).

## Safety / rollout

1. Apply the schema only to the **Preview COURSE_DB**, never to `DB` or production.
2. Generate the seed from the repository revision being tested and import it into
   Preview COURSE_DB.
3. Compare per-level row counts and retrieve representative missions to verify
   byte-equivalent JSON structures.
4. Only then switch the C1/B2 reader to D1, keeping a temporary static-asset
   fallback until Preview validation is complete.
5. Keep source JSON in Git until the new reader has passed the Preview build and
   functional checks. No source content is deleted in this phase.

This phase intentionally does not change the page reader yet. The D1 schema and
seed must be validated before changing the runtime contract.
