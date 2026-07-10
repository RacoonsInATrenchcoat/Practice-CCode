# Building Safety Remedial Action Tracker

A small browser-based tool for tracking remedial actions raised from a
building fire risk assessment (FRA) — the "golden thread" of findings,
owners, and target dates that UK building safety compliance work runs on.

**Live demo:** https://claudecproject.web.app/

## Why this project exists

This is a learning-and-portfolio project, not a commercial product. It was
built end-to-end with Claude Code, run deliberately like a small work
environment — discovery before delivery, documentation kept alongside the
build, decisions recorded as they were made — to demonstrate four things:

1. Rapid prototyping of functional concepts and interactive UX flows,
   testable before engineering time is spent.
2. Writing epics and user stories in a structured, unambiguous format an
   AI-assisted workflow can build against with minimal back-and-forth.
3. Maintaining a product knowledge base as a living resource (decisions,
   patterns, domain context, product history).
4. Demonstrating judgement about when to trust, challenge, or override
   AI-generated output.

`docs/project-summary.md` is the fastest way to see how those four things
played out in practice. `docs/decision-log.md` has the full detail, including
every point the AI's output was accepted, corrected, or overridden.

## What it does

- List all remedial actions, each with building/block reference,
  description, priority, owner, target completion date, and status.
- Add a new action (with validation — required fields, target date can't be
  in the past).
- Update an action's status (open / in-progress / completed) directly from
  the list.
- Filter by status, priority, building, and overdue.
- Everything persists in the browser's `localStorage` — no backend, no
  accounts.

## Tech stack

HTML, CSS, and TypeScript, built with no framework or bundler, hosted on
Firebase Hosting. See `CLAUDE.md` for the full architecture and command
reference.

## Running it locally

```
npm install
npm run dev
```

This builds the TypeScript and serves the result at
http://localhost:5173 — the same output that gets deployed.

## More detail

- `docs/product-brief.md` — original scope and success criteria.
- `docs/project-summary.md` — current state, capabilities, and what was
  deliberately left out of scope.
- `docs/decision-log.md` — chronological record of every notable decision.
- `docs/user-stories/` — the three user stories the build was scoped against.
