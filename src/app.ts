import { sampleActions, type Action, type Status, type Priority } from "./data/sample-actions.js";

const TODAY = new Date().toISOString().slice(0, 10);
const STORAGE_KEY = "remedial-actions";

function loadActions(): Action[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Action[]) : [];
  } catch {
    return [];
  }
}

function saveActions(currentActions: Action[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentActions));
}

// Real persisted state: empty on a brand-new browser, per action-list-view.md.
const actions: Action[] = loadActions();

const listBody = document.querySelector<HTMLTableSectionElement>("#action-list-body")!;
const emptyState = document.querySelector<HTMLElement>("#empty-state")!;
const emptyStateMessage = document.querySelector<HTMLElement>("#empty-state-message")!;
const loadSampleDataButton = document.querySelector<HTMLButtonElement>("#load-sample-data-button")!;
const table = document.querySelector<HTMLTableElement>("#action-table")!;
const statusFilter = document.querySelector<HTMLSelectElement>("#status-filter")!;
const priorityFilter = document.querySelector<HTMLSelectElement>("#priority-filter")!;
const buildingFilter = document.querySelector<HTMLSelectElement>("#building-filter")!;
const overdueFilter = document.querySelector<HTMLInputElement>("#overdue-filter")!;

const addForm = document.querySelector<HTMLFormElement>("#add-action-form")!;
const newBuilding = document.querySelector<HTMLInputElement>("#new-building")!;
const newDescription = document.querySelector<HTMLTextAreaElement>("#new-description")!;
const newPriority = document.querySelector<HTMLSelectElement>("#new-priority")!;
const newOwner = document.querySelector<HTMLInputElement>("#new-owner")!;
const newTargetDate = document.querySelector<HTMLInputElement>("#new-target-date")!;
const newEvidenceNote = document.querySelector<HTMLTextAreaElement>("#new-evidence-note")!;

const STATUS_LABELS: Record<Status, string> = {
  open: "Open",
  "in-progress": "In progress",
  completed: "Completed",
};

const PRIORITY_LABELS: Record<Priority, string> = {
  immediate: "Immediate",
  "short-term": "Short-term",
  "longer-term": "Longer-term",
};

function isOverdue(action: Action): boolean {
  return action.status !== "completed" && action.targetDate < TODAY;
}

function populateBuildingFilter(currentActions: Action[]): void {
  const previousValue = buildingFilter.value;
  const buildings = Array.from(new Set(currentActions.map((action) => action.buildingRef))).sort();

  buildingFilter.replaceChildren();
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All buildings";
  buildingFilter.appendChild(allOption);

  for (const building of buildings) {
    const option = document.createElement("option");
    option.value = building;
    option.textContent = building;
    buildingFilter.appendChild(option);
  }

  if (buildings.includes(previousValue) || previousValue === "all") {
    buildingFilter.value = previousValue;
  }
}

function matchesFilters(action: Action): boolean {
  if (statusFilter.value !== "all" && action.status !== statusFilter.value) return false;
  if (priorityFilter.value !== "all" && action.priority !== priorityFilter.value) return false;
  if (buildingFilter.value !== "all" && action.buildingRef !== buildingFilter.value) return false;
  if (overdueFilter.checked && !isOverdue(action)) return false;
  return true;
}

function textCell(label: string, value: string): HTMLTableCellElement {
  const cell = document.createElement("td");
  cell.dataset.label = label;
  cell.textContent = value;
  return cell;
}

function statusCell(action: Action): HTMLTableCellElement {
  const cell = document.createElement("td");
  cell.dataset.label = "Status";

  const select = document.createElement("select");
  select.className = "status-select";
  select.setAttribute("aria-label", `Status for ${action.description}`);

  for (const value of Object.keys(STATUS_LABELS) as Status[]) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = STATUS_LABELS[value];
    option.selected = value === action.status;
    select.appendChild(option);
  }

  select.addEventListener("change", () => {
    action.status = select.value as Status;
    saveActions(actions);
    render();
  });

  cell.appendChild(select);
  return cell;
}

function buildRow(action: Action): HTMLTableRowElement {
  const row = document.createElement("tr");
  if (isOverdue(action)) row.classList.add("is-overdue");

  row.appendChild(textCell("Building", action.buildingRef));
  row.appendChild(textCell("Description", action.description));
  row.appendChild(textCell("Priority", PRIORITY_LABELS[action.priority]));
  row.appendChild(textCell("Owner", action.owner));
  row.appendChild(
    textCell("Target date", action.targetDate + (isOverdue(action) ? " (overdue)" : ""))
  );
  row.appendChild(statusCell(action));

  return row;
}

function render(): void {
  const filtered = actions.filter(matchesFilters);
  listBody.replaceChildren(...filtered.map(buildRow));

  const hasResults = filtered.length > 0;
  table.hidden = !hasResults;
  emptyState.hidden = hasResults;

  if (!hasResults) {
    const noActionsAtAll = actions.length === 0;
    emptyStateMessage.textContent = noActionsAtAll
      ? "No actions yet."
      : "No actions match the selected filters.";
    loadSampleDataButton.hidden = !noActionsAtAll;
  }
}

for (const control of [statusFilter, priorityFilter, buildingFilter, overdueFilter]) {
  control.addEventListener("change", render);
}

// Dev/demo affordance only — not one of the four v1 stories. Only offered
// when there are truly no actions in storage, never to replace real data.
loadSampleDataButton.addEventListener("click", () => {
  actions.push(...sampleActions);
  saveActions(actions);
  populateBuildingFilter(actions);
  render();
});

// --- Add action form ---

interface RequiredField {
  input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  errorEl: HTMLElement;
  label: string;
}

function requiredField(inputId: string, errorId: string, label: string): RequiredField {
  return {
    input: document.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`#${inputId}`)!,
    errorEl: document.querySelector<HTMLElement>(`#${errorId}`)!,
    label,
  };
}

const requiredFields: RequiredField[] = [
  requiredField("new-building", "new-building-error", "Building/block reference"),
  requiredField("new-description", "new-description-error", "Description"),
  requiredField("new-priority", "new-priority-error", "Priority"),
  requiredField("new-owner", "new-owner-error", "Owner"),
  requiredField("new-target-date", "new-target-date-error", "Target completion date"),
];

function clearFieldError(field: RequiredField): void {
  field.errorEl.textContent = "";
  field.input.removeAttribute("aria-invalid");
}

function setFieldError(field: RequiredField, message: string): void {
  field.errorEl.textContent = message;
  field.input.setAttribute("aria-invalid", "true");
}

function validateForm(): boolean {
  let isValid = true;

  for (const field of requiredFields) {
    clearFieldError(field);
    if (field.input.value.trim() === "") {
      setFieldError(field, `${field.label} is required.`);
      isValid = false;
    }
  }

  if (newTargetDate.value.trim() !== "" && newTargetDate.value < TODAY) {
    setFieldError(
      requiredFields.find((f) => f.input === newTargetDate)!,
      "Target completion date cannot be in the past."
    );
    isValid = false;
  }

  return isValid;
}

addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) return;

  const newAction: Action = {
    id: crypto.randomUUID(),
    buildingRef: newBuilding.value.trim(),
    description: newDescription.value.trim(),
    priority: newPriority.value as Priority,
    owner: newOwner.value.trim(),
    targetDate: newTargetDate.value,
    status: "open",
    evidenceNote: newEvidenceNote.value.trim() || undefined,
  };

  actions.unshift(newAction);
  saveActions(actions);
  populateBuildingFilter(actions);
  render();
  addForm.reset();
  for (const field of requiredFields) clearFieldError(field);
});

populateBuildingFilter(actions);
render();
