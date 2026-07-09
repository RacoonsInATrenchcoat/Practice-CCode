# Building Safety Remedial Action Tracker

Browser-only tool for tracking remedial actions from a fire risk assessment.
Learning-and-portfolio project. See docs/product-brief.md for full context.

## tech stack
- HTML, CSS, Typescript. Firebase Hosting is the place to build for.
- Data persisted in browser localStorage.

## commands
- `npm install` — install TypeScript and the local dev server.
- `npm run build` — compile `src/**/*.ts` to `.js` in place; run after any
  `.ts` change before viewing or deploying.
- `npm run dev` — serve `src/` at http://localhost:5173 for local viewing.
- No test or lint tooling in v1.

## architecture
- src/index.html: markup and structure.
- src/styles.css: all styling.
- src/app.ts: state, rendering, and filtering logic. Compiles to app.js in
  place (both are committed — there's no build step in hosting/deploy yet).
  Run `npm run build` after every .ts edit, before committing — nothing
  else compiles it, and a stale committed .js will silently ship old code.
  This is an interim approach for active development: before the project is
  considered done, committed compiled .js should be removed in favour of a
  real build step at deploy time, so the repo reads as TypeScript-source-of-
  truth, not a mix of source and generated files (see decision log).
- src/data/: placeholder datasets (e.g. sample-actions.ts) standing in for a
  future real data source; only this file changes when persistence lands,
  not the app logic that consumes it.
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