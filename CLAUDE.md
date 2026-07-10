# Building Safety Remedial Action Tracker

Browser-only tool for tracking remedial actions from a fire risk assessment.
Learning-and-portfolio project. See docs/product-brief.md for full context.

## tech stack
- HTML, CSS, Typescript. Firebase Hosting is the place to build for.
- Data persisted in browser localStorage.

## commands
- `npm install` — install TypeScript, the local dev server, and the
  Firebase CLI.
- `npm run build` — compiles `src/**/*.ts` into `public/` and copies
  `src/index.html`/`src/styles.css` there too. `public/` is fully
  generated, gitignored, and is exactly what gets deployed.
- `npm run dev` — builds, then serves `public/` at http://localhost:5173,
  so local preview always matches what `deploy` would publish.
- `npm run deploy` — builds, then runs `firebase deploy`. Requires
  `firebase login` and `firebase use --add` (to link your own Firebase
  project) run once, manually, first — not automated, not run by Claude.
- No test or lint tooling beyond a one-off accessibility scan (see decision
  log); TypeScript's own strict type-checking is the only check on every
  build.

## architecture
- src/index.html, src/styles.css: source templates, copied into public/
  by `npm run build` (via scripts/copy-static-assets.mjs) — never edit the
  copies in public/ directly, they're overwritten on every build.
- src/app.ts: state, rendering, and filtering logic. Compiles into
  public/app.js. The repo is TypeScript-source-of-truth; public/ holds
  zero hand-written content.
- src/firebase-config.js: Firebase SDK config from the console's "add web
  app" flow. Currently inert scaffolding — nothing imports or wires it up.
  Kept for possible future Firebase usage beyond Hosting; not part of the
  live app. The API key in it is safe to have public (Firebase's access
  control is Security Rules, not key secrecy).
- public/: fully generated build/deploy output (gitignored, never
  committed) — what firebase.json points Hosting at. .firebaserc is
  committed (it's just the project alias, `claudecproject`, not a secret)
  — that's how a fresh clone knows which Firebase project to deploy to.
  `firebase login` itself still can't be set up on your behalf.
- src/data/: sample-actions.ts is demo/seed data only, not the real data
  source. Real state lives in the browser's localStorage (key
  `remedial-actions`), read/written by src/app.ts's loadActions/saveActions.
  A brand-new browser has zero actions, per action-list-view.md's empty
  state — sample data is never auto-loaded.
- The "Load sample data (dev)" button on the empty state is a demo/dev
  affordance, not one of the four v1 stories. It only appears when there
  are truly zero actions in storage; naming it explicitly here so it isn't
  mistaken for in-scope product behaviour later.
- The "Clear list (dev)" button (next to the filter bar) is likewise a
  demo/dev affordance, not one of the four v1 stories. It clears all
  actions from storage after a confirm prompt, and only appears when
  there is at least one action — the reset counterpart to "Load sample
  data (dev)", for bouncing between empty/sample/real data without
  clearing browser storage by hand.
- docs/: living knowledge base (brief, domain notes, stories, decision log).

## conventions
- kebab-case for all file and folder names.
- UK English in all copy, comments, and docs.
- Keep the action data model as defined in docs/product-brief.md.

## git conventions
- Conventional commits (feat:, fix:, docs:, chore:).
- main only ever holds confirmed, working checkpoints — treat it as "live."
- All work happens on a single working branch until a checkpoint is
  confirmed working end-to-end; only then does it merge into main. One
  working branch at a time, reused until its scope is confirmed done.
- Committing directly to main is a manual, explicitly-approved exception
  only — never automatic.
- Stage files individually; do not use git add -A.
- Remote: origin → https://github.com/RacoonsInATrenchcoat/Practice-CCode.git

## working style
- Discovery before delivery: agree a plan before building.
- Record notable decisions in docs/decision-log.md as they happen, including
  where I overrode or corrected AI output.
- Cadence per checkpoint: plan, build, test/confirm (adjust if needed),
  document. Checkpoints are versioned (0.1, 0.2, ...) as visible fallback
  points.
- Claude drafts CLAUDE.md updates as the project evolves; the user reviews
  and approves before they're saved.
- Claude runs git init and commits locally at each confirmed checkpoint
  without asking each time; Claude always asks before touching the GitHub
  remote (push, first remote add, etc).
- docs/Self/ is personal working notes, not the product knowledge base, and
  is excluded from git via .gitignore.
- UI verification: the user checks changes themselves via `npm run dev`.
  Claude may additionally run an automated headless-browser check, but it
  must use a saved, visible script (never a silent/throwaway one) and
  Claude must say so before running it.