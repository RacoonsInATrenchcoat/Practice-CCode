# Decision log

Chronological record of notable decisions, including where AI-generated
output was accepted, adjusted, or overridden. Newest entries at the bottom.

## 2026-07-09 — Working agreement for the project
- **Decision**: Established the collaboration model before any build work:
  plan → build → test/confirm → document per checkpoint (versioned 0.1,
  0.2, ...); Claude drafts CLAUDE.md updates but the user approves before
  they're saved; Claude runs git init and commits locally at each confirmed
  checkpoint automatically, but always asks before touching the GitHub
  remote; `docs/Self/` (personal notes, including third-party job
  description text) is excluded from git via `.gitignore`.
- **Type**: User-directed. Claude proposed options via structured questions;
  user chose among them.
- **Why it matters**: this is itself evidence for mark #3 (living knowledge
  base) and sets the standard the rest of the project follows.
- **My note**: 
Planning and direction from the start is the most important, even with Ai coding.
Built a system of what I prefer (plan,build,test,document), by having smaller chunks of scope that are testable with specific fallback checkpoints.
Notes and descriptions added for myself, separated and also .gitignore-d.
Scope established and specific documentations creatred and separated into the current folder structure. 
Since this is a test project, I wanted to push what Claude AI/Code can do and what it considers to be "industry standard" to use.

## 2026-07-09 — Target completion date must be today or later
- **Decision**: `docs/user-stories/add-action.md` requires the target
  completion date to be today or in the future; past dates are rejected on
  submit.
- **Type**: Overrode AI output. Claude's first draft of the story explicitly
  left target date unconstrained beyond "valid calendar date," reasoning the
  product brief didn't specify it. The user corrected this on review and
  asked for the today-or-later constraint to be added.
- **Why it matters**: the product brief's data model didn't state this
  constraint, so this was a genuine ambiguity Claude guessed on and the user
  resolved with domain judgement (a target date for remedial action can't
  reasonably be set in the past) — direct evidence for mark #4.
- **My note**:
Asked it for a generic example that is usually as a User Story. 
Note that since there was no context I received, a made-up scenario is used here.
It created the User story, and it is good enough, but I feel having the date limitation is a good function to have to disallow "wrong" options. 
If a use-case for backdating tickets is needed, then it would have been asked with stakeholder first, while pushing that ideally it's not a good method.

## 2026-07-09 — TypeScript build tooling added (checkpoint 0.2)
- **Decision**: Added `package.json` and `tsconfig.json` to compile
  `src/**/*.ts` to `.js` in place (no bundler), since the docs already
  specified TypeScript but no tooling existed to actually run it — the
  scaffolded file was `app.js`, not `app.ts`.
- **Type**: User-directed. Claude surfaced the mismatch (docs say TS,
  scaffold is plain JS, no build tooling present) and offered plain-JS vs
  a proper TypeScript setup; the user chose to set it up properly.
- **Why it matters**: mark #4 evidence — a real inconsistency between the
  docs and the actual repo state, caught and surfaced rather than silently
  resolved one way.
- **My note**: 
Raw Javascript would have worked as well, but Typescript is the typical standard.

## 2026-07-09 — Checkpoint 0.1 pushed to GitHub
- **Decision**: Pushed `main` (checkpoint 0.1) to `origin`.
- **Type**: User-approved. Per the working agreement, Claude never pushes
  without asking first; the user confirmed when asked.

## 2026-07-09 — Claude skipped the CLAUDE.md approval step; corrected
- **Decision**: Claude wrote a CLAUDE.md diff (commands/architecture
  sections) directly instead of presenting it for approval first, breaking
  the working agreement recorded in the first entry above. Caught by the
  user reading the file, not by Claude noticing its own slip.
- **Type**: Corrected AI process (not output). The content was kept once
  shown and reviewed, but the process gap was named explicitly.
- **Why it matters**: mark #4 evidence that a self-imposed process rule can
  quietly slip even when Claude stated the commitment itself — it took the
  user's oversight, not a self-check, to catch it.
- **My note**: 
Yeah, Claude here started to request 6+ steps to locally host and self-check, all withot any note we moved to this step. It describes it below.


## 2026-07-09 — Verification method for UI changes corrected
- **Decision**: Claude had started an unannounced local server (`npx serve`,
  not a documented script) and a throwaway headless-Chrome script (via
  Puppeteer) to self-check the action list prototype, invisible to the user.
  The user stopped this, asked for an explanation, and required: (1) a real
  `npm run dev` script in `package.json` as the one documented way to view
  the app, (2) any automated headless check to use a saved, visible script
  and be announced before running — never silent.
- **Type**: Overrode AI process. The underlying check was accurate, but the
  user rejected the ad hoc/opaque way it was done regardless.
- **Why it matters**: the clearest mark #4 evidence so far — trusting AI
  output isn't only about whether the result is correct, it's about the AI
  operating in ways a human can actually see and audit.
- **My note**: 
Never heard of the lines requested, so pushed back, and told to use either the typical "npm run dev" method or the existing LiveShare addon.
If this was work or commercial, having a sandbox environment for it would be better, but with my PC, I rather not used fully unknown code.
The line of "Claude may additionally run an automated headless-browser check, but it
  must use a saved, visible script (never a silent/throwaway one) and
  Claude must say so before running it." was added due to this.


## 2026-07-09 — Checkpoint 0.2 prototype confirmed working
- **Decision**: The action list click-through prototype (sample data, no
  persistence yet) was confirmed working by the user directly in both
  Firefox and Chrome via `npm run dev`, with no console errors, alongside
  Claude's automated headless check of the same filter behaviour.
- **Type**: User-confirmed.
- **Why it matters**: closes the test/confirm step for checkpoint 0.2 before
  it merges into `main`.

## 2026-07-09 — Compiled .js committed alongside .ts is interim, not final
- **Decision**: Committing both `src/app.ts`/`src/data/sample-actions.ts`
  and their compiled `.js` output stands for now (no build step exists at
  hosting/deploy time), but this is explicitly an interim state. Before the
  project is considered done, the plan is to remove committed compiled
  output and add a real build step at deploy time instead, so the repo
  reads as TypeScript-source-of-truth rather than source-plus-generated.
- **Type**: User-directed, with a deferred follow-up. Claude had only noted
  this trade-off inside a docs diff rather than raising it as its own
  decision; the user caught the gap by asking directly why two versions of
  each file existed, then set the standard: fine as a build convenience
  now, must be cleaned up as a later step.
- **Why it matters**: mark #4 evidence again — the user questioned something
  that was technically explained but not clearly flagged as a decision, and
  turned it into an explicit, trackable commitment rather than letting it
  drift as an unexamined default.
- **My note**:
Normally, a compiler would be used that "builds" before shipping. 
Here it seems to skip it and has a workaround method that rather has JS and TS at the same time.
Made a note that "as long as it works" and to have a cleanup as last step, so only TS remains.

## 2026-07-09 — Checkpoint 0.3 add-action prototype confirmed working
- **Decision**: The add-action form (required-field validation, past-date
  rejection, in-memory add with the list re-rendering live) was confirmed
  working by the user directly: a full valid submission, the date
  restriction, and a missing-priority submission all behaved as specified
  in `add-action.md`. Same prototype scope as checkpoint 0.2 — in-memory
  only, no persistence yet.
- **Type**: User-confirmed, alongside Claude's own saved/announced headless
  check of the same paths.
- **Why it matters**: closes the test/confirm step for checkpoint 0.3 before
  it merges into `main`.

## 2026-07-09 — Sample data drops out on go-live; kept only as a dev affordance
- **Decision**: Once localStorage was wired up (checkpoint 0.4), the app no
  longer auto-loads `sample-actions.ts` into storage — a brand-new browser
  shows the true empty state per `action-list-view.md`. A "Load sample data
  (dev)" button was added instead, visible only when there are zero actions,
  explicitly named as an addition beyond the four core v1 stories rather
  than folded in silently.
- **Type**: User-directed. Claude raised the question (empty-by-default vs.
  keeping a demo affordance) rather than picking silently, since it affects
  both story-correctness and how easily the prototype can be demoed.
- **Why it matters**: mark #4 evidence — a case where Claude surfaced a
  trade-off with real product-scope implications instead of resolving it
  unilaterally either way.

## 2026-07-09 — Checkpoint 0.4 (status update + persistence) confirmed working
- **Decision**: localStorage persistence, the per-row status control, and
  the sample-data dev affordance were confirmed working by the user
  directly: seeded sample data, reloaded (persisted), added a real action
  (seed button correctly disappeared once storage was no longer empty),
  matching `update-status.md` and the corrected `action-list-view.md`
  empty-state behaviour. Confirmed alongside Claude's saved headless check.
- **Type**: User-confirmed.
- **Why it matters**: closes the test/confirm step for checkpoint 0.4 before
  it merges into `main`. All three v1 stories (list/filter, add, update
  status) are now implemented against real persisted state, not prototype
  sample data.

## 2026-07-09 — Recurring slip: Claude editing CLAUDE.md before approval
- **Decision**: Claude wrote directly to `CLAUDE.md` a second time
  (checkpoint 0.4's architecture correction) before showing the diff for
  approval, repeating the exact process gap from checkpoint 0.2. Named
  explicitly as a recurring pattern, not a one-off, since it happened twice
  despite being corrected and recorded once already.
- **Type**: Corrected AI process, repeat occurrence.
- **Why it matters**: mark #4 evidence that naming a rule once in
  `CLAUDE.md` doesn't guarantee it's followed — this is worth watching for
  again in later checkpoints rather than assuming it's resolved.

## 2026-07-09 — One-off accessibility scan run; linting/unit tests declined for now
- **Decision**: Given the choice of what "standard checks" to add before
  the TypeScript cleanup, the user chose a one-off axe-core accessibility
  scan only, declining ESLint and unit tests for now. The scan ran against
  three states (empty, populated list, form with validation errors showing)
  with zero violations across all three. Not added as ongoing project
  tooling — a disposable, announced script, same as the smoke tests.
- **Type**: User-directed, informed by options Claude laid out with their
  respective costs (one-off check vs. permanent convention changes).
- **Why it matters**: mark #4 evidence of deliberate scope control — real
  quality signal gathered without expanding the "no test/lint tooling in
  v1" convention just because tooling was available.

## 2026-07-09 — TypeScript cleanup: compiled JS untracked, deploy scaffolded
- **Decision**: Closed the checkpoint-0.2 deferral. `src/*.js` is now
  gitignored and untracked (`git rm --cached`); `npm run dev` builds before
  serving so nothing relies on a human remembering to run `npm run build`
  first. The repo is TypeScript-source-of-truth. Alongside this, added
  `firebase.json` and a `firebase-tools` devDependency plus `npm run
  deploy` (build then `firebase deploy`) — scaffolding only, since no
  `.firebaserc` is committed and `firebase login`/`firebase use --add` must
  still be run manually by the user against their own Firebase account.
- **Type**: User-directed. Claude flagged that `npm run deploy` wouldn't
  actually work yet when the user asked directly, rather than letting them
  discover that by trying it; the user then chose to scaffold the deploy
  config now rather than defer it further.
- **Why it matters**: mark #4 evidence of the user checking a claim before
  relying on it ("will this work afterwards?") and Claude giving an honest
  "not yet, here's exactly what's missing" instead of implying it was done.
- **My note**:

