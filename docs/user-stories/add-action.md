# Add action

## Story
As a compliance lead, I want to add a new remedial action with its building
reference, description, priority, owner, and target completion date, so that
a new FRA finding is tracked from the moment it is raised.

## Priority & estimate
- Priority: Must-have for v1 (core scope, per product-brief.md).
- Estimate: S/M — single form, one write path, no edit/delete complexity.

## Acceptance criteria
- A form lets the user enter: building/block reference, description,
  priority (immediate / short-term / longer-term), owner, target completion
  date, and an optional evidence note.
- Status is set to "open" automatically on creation and is not user-editable
  at creation time.
- Building/block reference, description, priority, owner, and target
  completion date are required; the form cannot be submitted while any of
  them is empty. Evidence note is optional.
- On successful submit, the new action is written to localStorage and
  appears immediately in the action list view.
- Target completion date must be a valid calendar date and must be today or
  later; dates in the past are rejected on submit.
- After a successful submit, the form clears so the next action can be
  entered.

## Test conditions
- Given the form is empty, when the user attempts to submit, then submission
  is blocked and the missing required field(s) are indicated.
- Given all required fields are filled and the evidence note is left blank,
  when submitted, then the action is created with the evidence note stored
  as empty/absent.
- Given a valid action is submitted, when the action list view is opened,
  then the new action appears with status "open".
- Given a valid action is submitted, when the page is reloaded, then the
  action is still present (localStorage persistence).
- Given a target completion date in the past, when the user attempts to
  submit, then submission is blocked and the date field is indicated as
  invalid.
- Given a target completion date of today, when the user submits, then the
  action is created successfully (today is a valid target date, not just
  strictly-future dates).

## Data touched
Writes a new action record: building/block reference, description,
priority, owner, target completion date, evidence note (optional). Status is
system-set to "open", not accepted as user input.

## Out of scope
Editing or deleting existing actions, file/photo evidence upload (text note
only in v1), and validating owner against a real user/account list — all
explicitly out of scope for v1 per product-brief.md.
