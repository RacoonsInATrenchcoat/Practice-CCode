export type Priority = "immediate" | "short-term" | "longer-term";
export type Status = "open" | "in-progress" | "completed";

export interface Action {
  id: string;
  buildingRef: string;
  description: string;
  priority: Priority;
  owner: string;
  targetDate: string; // ISO date (YYYY-MM-DD)
  status: Status;
  evidenceNote?: string;
}

// Placeholder in-memory dataset for the checkpoint 0.2 click-through
// prototype. A later checkpoint replaces this with data read from
// localStorage; the shape (Action) is what that swap has to preserve.
export const sampleActions: Action[] = [
  {
    id: "1",
    buildingRef: "Riverside Court - Block A",
    description: "Repair fire door self-closer on 3rd floor",
    priority: "immediate",
    owner: "J. Patel",
    targetDate: "2026-06-15",
    status: "open",
  },
  {
    id: "2",
    buildingRef: "Riverside Court - Block A",
    description: "Replace missing fire extinguisher signage",
    priority: "short-term",
    owner: "J. Patel",
    targetDate: "2026-08-01",
    status: "in-progress",
  },
  {
    id: "3",
    buildingRef: "Elm House",
    description: "Clear communal corridor of stored items (fire escape route)",
    priority: "immediate",
    owner: "R. Osei",
    targetDate: "2026-07-01",
    status: "completed",
    evidenceNote: "Photos taken 2026-07-02 confirming corridor clear",
  },
  {
    id: "4",
    buildingRef: "Elm House",
    description: "Service and test emergency lighting",
    priority: "short-term",
    owner: "R. Osei",
    targetDate: "2026-09-10",
    status: "open",
  },
  {
    id: "5",
    buildingRef: "Maple Gardens - Block C",
    description: "Update fire action plan signage in ground-floor lobby",
    priority: "longer-term",
    owner: "S. Nkemelu",
    targetDate: "2027-01-20",
    status: "open",
  },
  {
    id: "6",
    buildingRef: "Maple Gardens - Block C",
    description: "Repair damaged fire compartmentation wall in basement plant room",
    priority: "immediate",
    owner: "S. Nkemelu",
    targetDate: "2026-07-05",
    status: "in-progress",
  },
  {
    id: "7",
    buildingRef: "Oakfield Tower",
    description: "Install additional fire extinguisher in bin store",
    priority: "longer-term",
    owner: "M. Wallace",
    targetDate: "2026-07-09",
    status: "open",
  },
  {
    id: "8",
    buildingRef: "Oakfield Tower",
    description: "Replace faulty smoke detector in stairwell",
    priority: "short-term",
    owner: "M. Wallace",
    targetDate: "2026-05-20",
    status: "completed",
    evidenceNote: "New detector fitted and tested 2026-05-22",
  },
];
