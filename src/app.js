import { sampleActions } from "./data/sample-actions.js";
const TODAY = new Date().toISOString().slice(0, 10);
const listBody = document.querySelector("#action-list-body");
const emptyState = document.querySelector("#empty-state");
const table = document.querySelector("#action-table");
const statusFilter = document.querySelector("#status-filter");
const priorityFilter = document.querySelector("#priority-filter");
const buildingFilter = document.querySelector("#building-filter");
const overdueFilter = document.querySelector("#overdue-filter");
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
function populateBuildingFilter(actions) {
    const buildings = Array.from(new Set(actions.map((action) => action.buildingRef))).sort();
    for (const building of buildings) {
        const option = document.createElement("option");
        option.value = building;
        option.textContent = building;
        buildingFilter.appendChild(option);
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
    const filtered = sampleActions.filter(matchesFilters);
    listBody.replaceChildren(...filtered.map(buildRow));
    const hasResults = filtered.length > 0;
    table.hidden = !hasResults;
    emptyState.hidden = hasResults;
}
for (const control of [statusFilter, priorityFilter, buildingFilter, overdueFilter]) {
    control.addEventListener("change", render);
}
populateBuildingFilter(sampleActions);
render();
