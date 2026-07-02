import type { PlannerState } from "@/planner/types";

export type SidebarSectionId = "tables" | "unseated" | "guests" | "import";

export function createDefaultOpenSidebarSectionIds(state: PlannerState) {
  const sectionIds: SidebarSectionId[] = ["tables"];
  const unseatedGuestCount = countUnseatedGuests(state);

  if (unseatedGuestCount > 1) sectionIds.push("unseated");
  if (state.guests.length === 0) sectionIds.push("guests", "import");

  return new Set(sectionIds);
}

function countUnseatedGuests(state: PlannerState) {
  const seatedGuestIds = new Set(Object.values(state.assignments));
  return state.guests.filter((guest) => !seatedGuestIds.has(guest.id)).length;
}
