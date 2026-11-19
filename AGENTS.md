# Linguafly — working rules for coding agents

## Repository and deployment model

- This is the Linguafly Next.js application deployed to Cloudflare Workers through OpenNext.
- The Cloudflare Worker is `linguaflyapp1`; the connected Git repository is `linguafly6-ui/linguaflynew2`.
- Cloudflare Workers Builds uses `main` as the production branch. Its production build command is `npx opennextjs-cloudflare build` and its production deploy command is `npx wrangler deploy`.
- Cloudflare Preview builds are enabled for non-production branches and use `npx wrangler preview`.
- **Never push directly to `main`. Never run `npx wrangler deploy` or `opennextjs-cloudflare deploy` as part of an agent task.** Production releases happen only after a reviewed PR is merged to `main`.
- Do not change Cloudflare Workers Builds settings, production bindings, secrets, domains, routes, or deployment configuration unless the task explicitly assigns that work to the coordinating maintainer.

## Parallel work

1. Start every task from the latest `main` and use a unique short-lived branch, preferably `agent/<area>/<task-slug>` (for example, `agent/student-panel/saved-vocabulary`).
2. One agent owns one branch and one clearly scoped task. Do not share a working branch or push another agent's commits.
3. Open one PR per coherent task, targeting `main`. Include the affected areas, files, tests, risks, and the Cloudflare Preview URL when available.
4. Keep PRs small. Rebase/update from the latest `main` only on your own branch and resolve conflicts there; never force-push `main`.
5. Do not merge your own PR or merge another agent's PR. The coordinating maintainer reviews integration order and performs the merge.
6. Before editing, check the current branch and inspect recent changes. Avoid overlapping files with another active task; coordinate first if overlap is unavoidable.

## Suggested workstream boundaries

- **Course content:** mission data, individual mission HTML, curriculum and course catalog.
- **Student experience:** student-facing routes, profile, progress and saved vocabulary UI.
- **Backend:** API handlers and service logic. Database schema, migrations, authentication and billing are high-risk shared changes and require maintainer coordination.
- **Design system:** isolated UI components and page-level styling. Shared global styles and root layout require coordination.

These are ownership suggestions, not permission to change shared infrastructure independently.

## Shared files — maintainer coordination required

Do not change these in parallel without explicit assignment:

- `wrangler.jsonc` and Cloudflare deployment/build settings.
- `public/missions/pre-a1/mission-runtime.js` (shared by multiple missions).
- `package.json`, `package-lock.json`, build scripts and framework configuration.
- Root layouts, global styles, authentication/session handling and shared navigation.
- Database schemas, migration files, production resource IDs, secrets and payment/email integrations.

If a task genuinely needs one of these, call it out in the PR and ask the coordinator to sequence or integrate it.

## Preview and data safety

- Use the branch's Cloudflare Preview for visual/functional review. Do not use production URLs for destructive or state-changing tests.
- The Wrangler config points Preview D1 bindings and the Preview R2 bucket at separate test resources. Keep those bindings separate from production; do not copy production resource IDs into the `previews` block.
- **Important limitation:** the `WORKER_SELF_REFERENCE` service binding targets the production Worker. Cloudflare Preview service bindings call the bound Worker's production deployment. Do not rely on that binding for isolated Preview behaviour or send test mutations through it.
- Treat Preview URLs as public unless Cloudflare Access protection has been explicitly verified. Never put real student data, real payment details, production tokens or other sensitive data into a Preview.
- Preview secrets are not inherited from production. Do not add secrets to source control; any Preview secret setup must be coordinated by the maintainer.
- Never run production D1 migrations, send real emails, create real Stripe transactions, or mutate production R2/D1 data while testing.

## Validation

- Install from the lockfile with `npm ci`.
- Run the Cloudflare-compatible build check with `npx opennextjs-cloudflare build`.
- The GitHub Actions quality-gate workflow runs this build for PRs into `main`. It is a build check only; it does not deploy.
- Describe checks that were not run. Do not claim a Preview or build passed unless its result was actually verified.
