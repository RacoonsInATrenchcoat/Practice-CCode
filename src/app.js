import { sampleActions } from "./data/sample-actions.js";
const TODAY = new Date().toISOString().slice(0, 10);
const STORAGE_KEY = "remedial-actions";
function loadActions() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw)
        return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    }
    catch {
        return [];
    }
}
function saveActions(currentActions) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentActions));
}
// Real persisted state: empty on a brand-new browser, per action-list-view.md.
const actions = loadActions();
const listBody = document.querySelector("#action-list-body");
const emptyState = document.querySelector("#empty-state");
const emptyStateMessage = document.querySelector("#empty-state-message");
const loadSampleDataButton = document.querySelector("#load-sample-data-button");
const table = document.querySelector("#action-table");
const statusFilter = document.querySelector("#status-filter");
const priorityFilter = document.querySelector("#priority-filter");
const buildingFilter = document.querySelector("#building-filter");
const overdueFilter = document.querySelector("#overdue-filter");
const addForm = document.querySelector("#add-action-form");
const newBuilding = document.querySelector("#new-building");
const newDescription = document.querySelector("#new-description");
const newPriority = document.querySelector("#new-priority");
const newOwner = document.querySelector("#new-owner");
const newTargetDate = document.querySelector("#new-target-date");
const newEvidenceNote = document.querySelector("#new-evidence-note");
const STATUS_LABELS = {
    open: "Open",
    "in-progress": "In progress",
    completed: "Completed",
};
const PRIORITY_LABELS = {
    immediate: "Immediate",
    "short-term": "Short-term",
    "longer-term": "Longer-term",
};
function isOverdue(action) {
    return action.status !== "completed" && action.targetDate < TODAY;
}
function populateBuildingFilter(currentActions) {
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
function matchesFilters(action) {
    if (statusFilter.value !== "all" && action.status !== statusFilter.value)
        return false;
    if (priorityFilter.value !== "all" && action.priority !== priorityFilter.value)
        return false;
    if (buildingFilter.value !== "all" && action.buildingRef !== buildingFilter.value)
        return false;
    if (overdueFilter.checked && !isOverdue(action))
        return false;
    return true;
}
function textCell(label, value) {
    const cell = document.createElement("td");
    cell.dataset.label = label;
    cell.textContent = value;
    return cell;
}
function statusCell(action) {
    const cell = document.createElement("td");
    cell.dataset.label = "Status";
    const select = document.createElement("select");
    select.className = "status-select";
    select.setAttribute("aria-label", `Status for ${action.description}`);
    for (const value of Object.keys(STATUS_LABELS)) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = STATUS_LABELS[value];
        option.selected = value === action.status;
        select.appendChild(option);
    }
    select.addEventListener("change", () => {
        action.status = select.value;
        saveActions(actions);
        render();
    });
    cell.appendChild(select);
    return cell;
}
function buildRow(action) {
    const row = document.createElement("tr");
    if (isOverdue(action))
        row.classList.add("is-overdue");
    row.appendChild(textCell("Building", action.buildingRef));
    row.appendChild(textCell("Description", action.description));
    row.appendChild(textCell("Priority", PRIORITY_LABELS[action.priority]));
    row.appendChild(textCell("Owner", action.owner));
    row.appendChild(textCell("Target date", action.targetDate + (isOverdue(action) ? " (overdue)" : "")));
    row.appendChild(statusCell(action));
    return row;
}
function render() {
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
function requiredField(inputId, errorId, label) {
    return {
        input: document.querySelector(`#${inputId}`),
        errorEl: document.querySelector(`#${errorId}`),
        label,
    };
}
const requiredFields = [
    requiredField("new-building", "new-building-error", "Building/block reference"),
    requiredField("new-description", "new-description-error", "Description"),
    requiredField("new-priority", "new-priority-error", "Priority"),
    requiredField("new-owner", "new-owner-error", "Owner"),
    requiredField("new-target-date", "new-target-date-error", "Target completion date"),
];
function clearFieldError(field) {
    field.errorEl.textContent = "";
    field.input.removeAttribute("aria-invalid");
}
function setFieldError(field, message) {
    field.errorEl.textContent = message;
    field.input.setAttribute("aria-invalid", "true");
}
function validateForm() {
    let isValid = true;
    for (const field of requiredFields) {
        clearFieldError(field);
        if (field.input.value.trim() === "") {
            setFieldError(field, `${field.label} is required.`);
            isValid = false;
        }
    }
    if (newTargetDate.value.trim() !== "" && newTargetDate.value < TODAY) {
        setFieldError(requiredFields.find((f) => f.input === newTargetDate), "Target completion date cannot be in the past.");
        isValid = false;
    }
    return isValid;
}
addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateForm())
        return;
    const newAction = {
        id: crypto.randomUUID(),
        buildingRef: newBuilding.value.trim(),
        description: newDescription.value.trim(),
        priority: newPriority.value,
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
    for (const field of requiredFields)
        clearFieldError(field);
});
populateBuildingFilter(actions);
render();
