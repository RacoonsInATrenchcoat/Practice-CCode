# Update action status

## Story
As a compliance lead, I want to update an action's status directly from the
list, so that the tracker reflects real progress on remediation work.

## Priority & estimate
- Priority: Must-have for v1 (core scope, per product-brief.md).
- Estimate: S — single field update on an existing record, no new entities.

## Acceptance criteria
- Each action in the list has a control (e.g. a status dropdown) to change
  its status without leaving the list view.
- Status can be changed to any of: open, in-progress, completed.
- The change is reflected immediately in the list — the status column and
  the overdue flag/highlight (a completed action is never shown as overdue).
- The change is persisted so it survives a page reload.
- No confirmation step is required for v1; a mis-click can be corrected by
  changing the status again.

## Test conditions
- Given an action with status "open", when its status control is changed to
  "in-progress", then the list shows "In progress" for that action without
  a page reload.
- Given an overdue action (target date in the past, not completed) has its
  status changed to "completed", when the overdue filter is active, then
  the action disappears from the filtered list immediately.
- Given a status change is made, when the page is reloaded, then the action
  still shows the updated status.
- Given multiple actions exist, when one action's status is changed, then
  only that action is affected — all others are unchanged.

## Data touched
Updates the `status` field of a single existing action record. No other
fields change.

## Out of scope
Bulk status updates, a status-change history/audit trail, requiring an
evidence note before marking an action completed, and confirmation dialogs
— none of these are required by product-brief.md for v1.
