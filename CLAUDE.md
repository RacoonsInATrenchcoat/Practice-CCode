# Building Safety Remedial Action Tracker

Browser-only tool for tracking remedial actions from a fire risk assessment.
Learning-and-portfolio project. See docs/product-brief.md for full context.

## tech stack
- HTML, CSS, Typescript. Firebase Hosting is the place to build for.
- Data persisted in browser localStorage.

## commands
- `npm install` — install TypeScript, the local dev server, and the
  Firebase CLI.
- `npm run build` — compile `src/**/*.ts` to `.js` in place (gitignored,
  regenerated on demand — not committed).
- `npm run dev` — builds, then serves `src/` at http://localhost:5173.
- `npm run deploy` — builds, then runs `firebase deploy`. Requires
  `firebase login` and `firebase use --add` (to link your own Firebase
  project) run once, manually, first — not automated, not run by Claude.
- No test or lint tooling beyond a one-off accessibility scan (see decision
  log); TypeScript's own strict type-checking is the only check on every
  build.

## architecture
- src/index.html: markup and structure.
- src/styles.css: all styling.
- src/app.ts: state, rendering, and filtering logic. Compiles to app.js in
  place via `npm run build` — the compiled output is gitignored, not
  committed. The repo is TypeScript-source-of-truth.
- firebase.json: Hosting config, points at src/ (compiled output included,
  .ts source excluded from the deploy bundle). No .firebaserc is committed
  — that's generated locally by `firebase use --add` and is
  machine/account-specific, so it can't be set up on your behalf.
- src/data/: sample-actions.ts is demo/seed data only, not the real data
  source. Real state lives in the browser's localStorage (key
  `remedial-actions`), read/written by src/app.ts's loadActions/saveActions.
  A brand-new browser has zero actions, per action-list-view.md's empty
  state — sample data is never auto-loaded.
- The "Load sample data (dev)" button on the empty state is a demo/dev
  affordance, not one of the four v1 stories. It only appears when there
  are truly zero actions in storage; naming it explicitly here so it isn't
  mistaken for in-scope product behaviour later.
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