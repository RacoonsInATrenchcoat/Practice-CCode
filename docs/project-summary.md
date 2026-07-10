# Project summary

A short "what/why/how" overview of this project as it currently stands. For
full detail, see `product-brief.md` (original scope) and `decision-log.md`
(every decision made along the way).

## What this is

A browser-based tracker for remedial actions raised from a building fire
risk assessment (FRA): each finding becomes an action with a priority,
owner, and target date, moving through open → in-progress → completed.
Live at https://claudecproject.web.app/

## Why it exists

A learning-and-portfolio project built by a junior PM to (a) learn Claude
Code as an AI-native product workflow, and (b) produce evidence against four
capability marks for a target PM role: rapid prototyping, structured user
stories, a living product knowledge base, and judgement about when to trust
or override AI output. It is strictly non-commercial.

## How it was built

Run like a small work environment: discovery before delivery, one working
branch at a time, and a plan → build → test/confirm → document cadence per
checkpoint. HTML, CSS, and TypeScript, no framework or bundler, deployed to
Firebase Hosting, with all data stored in the browser's `localStorage` —
no backend.

## Current capabilities (v1, all built, tested, and live)

- List all actions, showing building reference, description, priority,
  owner, target date, and status.
- Add a new action, with required-field validation and a target date that
  must be today or later.
- Update an action's status directly from the list.
- Filter by status, priority, building, and overdue (combinable).
- Data persists in `localStorage` across reloads.
- Two dev-only affordances for testing: "Load sample data" and "Clear list"
  buttons, both explicitly outside the four v1 stories.

## Deliberately out of scope

Recorded in `product-brief.md` from the start, not dropped along the way:
user accounts, multiple building dashboards, file/photo uploads, charts and
reporting, and any server or database. Also out of scope within the stories
themselves: editing/deleting existing actions, bulk status updates, a
status-change audit trail, sorting/pagination/search.

## Where the AI-workflow judgement shows up

`decision-log.md` has the full record, but the recurring pattern worth
knowing before reading it: genuine ambiguities in the brief were resolved
with explicit product judgement (e.g. target dates can't be backdated),
and process slips — Claude editing `CLAUDE.md` without the agreed approval
step, more than once — were caught and corrected rather than left to repeat
silently.

## Status

All four v1 user stories are built, tested by the user directly, and
deployed live. No open scope remains against `product-brief.md`.
