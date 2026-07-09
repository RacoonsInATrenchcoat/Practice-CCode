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
