# Action list view

## Story
As a compliance lead or property manager, I want to see a list of all
remedial actions and filter it by status, priority, building, and overdue,
so that I can track outstanding work across a building at a glance.

## Priority & estimate
- Priority: Must-have for v1 (core scope, per product-brief.md).
- Estimate: M — filter logic across four dimensions plus empty states.

## Acceptance criteria
- All actions persisted in localStorage are displayed on page load, each
  showing: building/block reference, description, priority, owner, target
  completion date, and status.
- User can filter by status: open / in-progress / completed.
- User can filter by priority: immediate / short-term / longer-term.
- User can filter by building/block reference.
- User can filter to show only overdue actions (target completion date is in
  the past AND status is not completed).
- Filters can be combined (e.g. status = open AND overdue).
- When the list is empty, or no actions match the active filters, an
  empty-state message is shown instead of a blank list.
- The list reflects the current contents of localStorage on every load (no
  actions are lost or duplicated on refresh).

## Test conditions
- Given no actions exist in storage, when the page loads, then an
  empty-state message is shown.
- Given actions exist with mixed statuses, when the status filter is set to
  "open", then only open actions are shown.
- Given an action's target date is in the past and its status is not
  completed, when the overdue filter is applied, then it appears in the
  filtered list.
- Given an action's target date is in the past but its status is completed,
  when the overdue filter is applied, then it does NOT appear (completed
  actions are never overdue, regardless of date).
- Given multiple filters are applied together and no action satisfies all of
  them, when the filters are applied, then the empty-state message is shown.
- Given actions exist in storage, when the page is reloaded, then the same
  actions are still listed.

## Data touched
Reads all fields of the action model (building reference, description,
priority, owner, target completion date, status, evidence note). Writes
none — this story is read-only.

## Out of scope
Sorting, pagination, free-text search, file/photo uploads, and multi-building
dashboards — all explicitly out of scope for v1 per product-brief.md.
