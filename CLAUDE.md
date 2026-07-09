# Building Safety Remedial Action Tracker

Browser-only tool for tracking remedial actions from a fire risk assessment.
Learning-and-portfolio project. See docs/product-brief.md for full context.

## tech stack
- HTML, CSS, Typescript. Firebase Hosting is the place to build for.
- Data persisted in browser localStorage.

## commands
- (No test or lint tooling in v1.)

## architecture
- src/index.html: markup and structure.
- src/styles.css: all styling.
- src/app.js: state, rendering, and filtering logic.
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