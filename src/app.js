import { sampleActions } from "./data/sample-actions.js";
const TODAY = new Date().toISOString().slice(0, 10);
// Prototype checkpoint: in-memory working copy, not persisted. A later
// checkpoint swaps this for reads/writes against localStorage.
const actions = [...sampleActions];
const listBody = document.querySelector("#action-list-body");
const emptyState = document.querySelector("#empty-state");
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
function buildRow(action) {
    const row = document.createElement("tr");
    if (isOverdue(action))
        row.classList.add("is-overdue");
    const cells = [
        ["Building", action.buildingRef],
        ["Description", action.description],
        ["Priority", PRIORITY_LABELS[action.priority]],
        ["Owner", action.owner],
        ["Target date", action.targetDate + (isOverdue(action) ? " (overdue)" : "")],
        ["Status", STATUS_LABELS[action.status]],
    ];
    for (const [label, value] of cells) {
        const cell = document.createElement("td");
        cell.dataset.label = label;
        cell.textContent = value;
        row.appendChild(cell);
    }
    return row;
}
function render() {
    const filtered = actions.filter(matchesFilters);
    listBody.replaceChildren(...filtered.map(buildRow));
    const hasResults = filtered.length > 0;
    table.hidden = !hasResults;
    emptyState.hidden = hasResults;
}
for (const control of [statusFilter, priorityFilter, buildingFilter, overdueFilter]) {
    control.addEventListener("change", render);
}
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
    populateBuildingFilter(actions);
    render();
    addForm.reset();
    for (const field of requiredFields)
        clearFieldError(field);
});
populateBuildingFilter(actions);
render();
