# Product Brief: Building Safety Remedial Action Tracker

## Context
This is a learning-and-portfolio project built by a junior web developer and
Product Manager. It has two goals at once:

1. Learn Claude Code (VS Code) as an AI-native product workflow.
2. Produce evidence against four capability marks from a target PM role at a
   property-compliance SaaS company.

The project is deliberately run like a small work environment: discovery before
delivery, documentation kept alongside the build, and decisions recorded as they
are made. It is strictly non-commercial.

## The four marks this project must evidence
1. Rapid prototyping of functional concepts and interactive UX flows, testable
   before engineering time is spent.
2. Writing epics and user stories in a structured, unambiguous format an
   AI-assisted workflow can build against with minimal back-and-forth.
3. Maintaining a product knowledge base as a living resource (decisions,
   patterns, domain context, product history).
4. Demonstrating judgement about when to trust, challenge, or override
   AI-generated output.

## The product
A browser-based tool for tracking remedial actions arising from a building fire
risk assessment (FRA). In UK building safety, an FRA produces findings; each
finding becomes a remedial action with a priority, an owner, and a target date,
and moves through a lifecycle to completion, leaving an audit trail (the
"golden thread"). This tool models that action lifecycle.

## Target users
- Compliance lead or property manager tracking outstanding actions across a
  building.
- (Future) contractors updating action status from site.

## Core data model
An "action" has:
- building or block reference
- description
- priority: immediate / short-term / longer-term
- owner
- target completion date
- status: open / in-progress / completed
- evidence note (optional)

## In scope (v1)
- List all actions.
- Add a new action.
- Update an action's status.
- Filter by status, priority, building, and overdue.
- Store data in the browser (no backend).

## Out of scope (recorded, not built)
User accounts, multiple building dashboards, file or photo uploads, charts and
reporting, and any server or database. These are noted here to demonstrate
deliberate scope control, not because they are trivial.

## Tech stack
HTML, CSS, and Typescript for v1, to keep scope to a few days. Use Firebase for Hosting the built site.

## Success criteria
- A stakeholder can click through a working prototype, not just read about it.
- Each user story is well-formed enough that a fresh Claude Code session can
  build it without re-explanation.
- The docs folder and decision log show genuine evolution over time in git
  history.

## Conventions
- All file and folder names in kebab-case.
- UK English throughout.