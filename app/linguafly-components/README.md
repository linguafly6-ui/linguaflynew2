# LinguaFly AI learning features

The feature page is available at `/features` on this branch. It imports three components from `@/components`:

- `PronunciationTutor.tsx`
- `ConversationPractice.tsx`
- `SpacedRepetition.tsx`

The repository integration is incomplete: two components were uploaded from the supplied UI archive, but the pronunciation component could not be transferred with its original source through the available file connector. The placeholder at `components/PronunciationTutor.tsx` must be replaced with the original component source before merging or deploying.

The original feature code also expects matching API endpoints and Cloudflare bindings; verify those dependencies before enabling the route in production.
