import { type ChangeEvent, type DragEvent, type FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Messages } from "@/i18n";
import { TABLE_DRAG_MIME } from "@/planner/constants";
import { DND_GUEST_TYPE } from "@/planner/dnd";
import { type SidebarSectionId, createDefaultOpenSidebarSectionIds } from "@/planner/sidebar-sections";
import type { Guest, GuestEditModalState, NewGuestForm, PlannerState, SeatModalState, WeddingTable } from "@/planner/types";
import {
  createDefaultTable,
  createSeatsForTable,
  createSeatConfigurationCsv,
  groupGuests,
  parseGuestsCsv,
} from "@/planner/utils";

const STORAGE_KEY = "wedding-table-demo";

function loadState(): PlannerState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PlannerState;
    if (!parsed.tables || !parsed.guests || !parsed.assignments) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveState(state: PlannerState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or unavailable — silently ignore
  }
}

function createInitialState(t: Messages): PlannerState {
  const table1 = createDefaultTable(1, t.defaults.table);
  const table2 = createDefaultTable(2, t.defaults.table);
  return {
    tables: [table1, table2],
    guests: [],
    assignments: {},
  };
}

function uid() {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createDuplicateTableName(name: string, tables: WeddingTable[], copySuffix: string) {
  const baseName = `${name} ${copySuffix}`;
  const existingNames = new Set(tables.map((t) => t.name.trim()));
  if (!existingNames.has(baseName)) return baseName;
  let n = 2;
  while (existingNames.has(`${baseName} ${n}`)) n++;
  return `${baseName} ${n}`;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function exportFilename(tables: WeddingTable[], tableFallback: string, absoluteFallback: string) {
  const name = tables[0]?.name?.trim() || tableFallback || absoluteFallback;
  return name.slice(0, 48).replace(/[<>:"/\\|?*\x00-\x1f]/g, "-") || absoluteFallback;
}

export function useLocalPlanEditor(t: Messages) {
  const [state, setState] = useState<PlannerState>(() => {
    if (typeof window === "undefined") return createInitialState(t);
    return loadState() ?? createInitialState(t);
  });

  // Persist to localStorage on every change (debounced)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveState(state), 400);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [state]);

  const { tables: safeTables, guests: safeGuests, assignments: assignmentMap } = state;

  const seats = useMemo(() => safeTables.flatMap((table) => createSeatsForTable(table, t.seats)), [safeTables, t.seats]);
  const seatById = useMemo(() => new Map(seats.map((s) => [s.id, s])), [seats]);
  const guestById = useMemo(() => new Map(safeGuests.map((g) => [g.id, g])), [safeGuests]);
  const seatedGuestIds = useMemo(() => new Set(Object.values(assignmentMap)), [assignmentMap]);
  const unseatedGuests = useMemo(() => safeGuests.filter((g) => !seatedGuestIds.has(g.id)), [safeGuests, seatedGuestIds]);
  const groups = useMemo(() => {
    const unique = new Set(safeGuests.map((g) => g.group).filter(Boolean));
    return [...unique].sort((a, b) => a.localeCompare(b));
  }, [safeGuests]);

  const [seatModal, setSeatModal] = useState<SeatModalState>(null);
  const [guestModal, setGuestModal] = useState<GuestEditModalState>(null);
  const [csvText, setCsvText] = useState("");
  const [newGuest, setNewGuest] = useState<NewGuestForm>({ name: "", group: "", dietary: "" });
  const [openTableEditorIds, setOpenTableEditorIds] = useState<Set<string>>(new Set());
  const [openSidebarSectionIds, setOpenSidebarSectionIds] = useState<Set<SidebarSectionId>>(() =>
    createDefaultOpenSidebarSectionIds(state),
  );
  const [sidebarSectionsTouched, setSidebarSectionsTouched] = useState(false);
  const [draggedTableId, setDraggedTableId] = useState<string | null>(null);
  const [tableDropTargetId, setTableDropTargetId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (sidebarSectionsTouched) return;
    setOpenSidebarSectionIds(createDefaultOpenSidebarSectionIds(state));
  }, [sidebarSectionsTouched, state]);

  // --- Table operations ---
  const updateTable = useCallback((tableId: string, patch: Partial<WeddingTable>) => {
    setState((prev) => ({
      ...prev,
      tables: prev.tables.map((t) => (t.id === tableId ? { ...t, ...patch } : t)),
      // Clear assignments for seats that no longer exist
      assignments: patch.shape !== undefined || patch.roundSeats !== undefined ||
        patch.topSeats !== undefined || patch.rightSeats !== undefined ||
        patch.bottomSeats !== undefined || patch.leftSeats !== undefined
        ? clearInvalidAssignments(prev, tableId, patch)
        : prev.assignments,
    }));
  }, []);

  function addTable() {
    const table = createDefaultTable(safeTables.length + 1, t.defaults.table);
    table.id = uid();
    setState((prev) => ({ ...prev, tables: [...prev.tables, table] }));
    setOpenTableEditorIds((curr) => new Set([...curr, table.id]));
  }

  function duplicateTable(tableId: string) {
    const source = safeTables.find((t) => t.id === tableId);
    if (!source) return;
    const name = createDuplicateTableName(source.name, safeTables, t.defaults.copySuffix);
    const newTable: WeddingTable = { ...source, id: uid(), name };
    setState((prev) => ({ ...prev, tables: [...prev.tables, newTable] }));
  }

  function removeTable(tableId: string) {
    setState((prev) => ({
      tables: prev.tables.filter((t) => t.id !== tableId),
      guests: prev.guests,
      assignments: Object.fromEntries(Object.entries(prev.assignments).filter(([seatId]) => !seatId.startsWith(`${tableId}:`))),
    }));
    setOpenTableEditorIds((curr) => { const n = new Set(curr); n.delete(tableId); return n; });
  }

  function moveTable(tableId: string, direction: -1 | 1) {
    const i = safeTables.findIndex((t) => t.id === tableId);
    const j = i + direction;
    if (i < 0 || j < 0 || j >= safeTables.length) return;
    const arr = [...safeTables];
    const [item] = arr.splice(i, 1);
    arr.splice(j, 0, item);
    setState((prev) => ({ ...prev, tables: arr }));
  }

  function reorderTables(draggedId: string, targetId: string) {
    if (draggedId === targetId) return;
    const si = safeTables.findIndex((t) => t.id === draggedId);
    const ti = safeTables.findIndex((t) => t.id === targetId);
    if (si < 0 || ti < 0 || si === ti) return;
    const arr = [...safeTables];
    const [id] = arr.splice(si, 1);
    arr.splice(ti, 0, id);
    setState((prev) => ({ ...prev, tables: arr }));
    setDraggedTableId(null);
    setTableDropTargetId(null);
  }

  function handleTableDragOver(event: DragEvent<HTMLElement>, targetId: string) {
    const isTableDrag = Array.from(event.dataTransfer.types).includes(TABLE_DRAG_MIME);
    if (!draggedTableId || draggedTableId === targetId || !isTableDrag) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setTableDropTargetId((curr) => (curr === targetId ? curr : targetId));
  }

  function handleTableDrop(event: DragEvent<HTMLElement>, targetId: string) {
    const sourceId = event.dataTransfer.getData(TABLE_DRAG_MIME);
    if (!sourceId) return;
    event.preventDefault();
    reorderTables(sourceId, targetId);
  }

  function clearTableDragState() {
    setDraggedTableId(null);
    setTableDropTargetId(null);
  }

  function toggleSidebarSection(sectionId: SidebarSectionId) {
    setSidebarSectionsTouched(true);
    setOpenSidebarSectionIds((curr) => { const n = new Set(curr); n.has(sectionId) ? n.delete(sectionId) : n.add(sectionId); return n; });
  }

  // --- Guest operations ---
  function addGuest(event: FormEvent) {
    event.preventDefault();
    const name = newGuest.name.trim();
    if (!name) return;
    const guest: Guest = { id: uid(), name, group: newGuest.group.trim(), dietary: newGuest.dietary.trim() };
    setState((prev) => ({ ...prev, guests: [...prev.guests, guest] }));
    setNewGuest({ name: "", group: newGuest.group, dietary: "" });
  }

  async function createGuestForSeat(name: string, seatId: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    setSeatModal(null);
    const guest: Guest = { id: uid(), name: trimmed, group: "", dietary: "" };
    setState((prev) => ({
      ...prev,
      guests: [...prev.guests, guest],
      assignments: { ...prev.assignments, [seatId]: guest.id },
    }));
  }

  function importGuestsFromCsv() {
    const imported = parseGuestsCsv(csvText);
    if (imported.length === 0) return;
    const newGuests: Guest[] = imported.map((g) => ({ id: uid(), name: g.name, group: g.group ?? "", dietary: g.dietary ?? "" }));
    setState((prev) => ({ ...prev, guests: [...prev.guests, ...newGuests] }));
    setCsvText("");
  }

  function handleCsvFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    file.text().then(setCsvText);
    event.target.value = "";
  }

  function assignGuestToSeat(guestId: string, seatId: string) {
    setState((prev) => {
      const next = { ...prev.assignments };
      // If target seat already has a guest, swap them
      const existingGuest = next[seatId];
      // Find if guest was previously seated somewhere
      const previousSeat = Object.entries(next).find(([, gid]) => gid === guestId)?.[0];
      if (previousSeat) {
        if (existingGuest && existingGuest !== guestId) {
          next[previousSeat] = existingGuest; // swap
        } else {
          delete next[previousSeat];
        }
      }
      next[seatId] = guestId;
      return { ...prev, assignments: next };
    });
    setSeatModal(null);
  }

  function clearSeat(seatId: string) {
    setState((prev) => {
      const next = { ...prev.assignments };
      delete next[seatId];
      return { ...prev, assignments: next };
    });
  }

  function clearTable(tableId: string) {
    setState((prev) => ({
      ...prev,
      assignments: Object.fromEntries(Object.entries(prev.assignments).filter(([sid]) => !sid.startsWith(`${tableId}:`))),
    }));
  }

  function removeGuest(guestId: string) {
    setState((prev) => ({
      tables: prev.tables,
      guests: prev.guests.filter((g) => g.id !== guestId),
      assignments: Object.fromEntries(Object.entries(prev.assignments).filter(([, gid]) => gid !== guestId)),
    }));
    setGuestModal((curr) => (curr?.guestId === guestId ? null : curr));
  }

  function openGuestEditor(guest: Guest) {
    setGuestModal({ guestId: guest.id, name: guest.name, group: guest.group, dietary: guest.dietary });
  }

  function saveGuest(event: FormEvent) {
    event.preventDefault();
    if (!guestModal) return;
    const name = guestModal.name.trim();
    if (!name) return;
    setState((prev) => ({
      ...prev,
      guests: prev.guests.map((g) =>
        g.id === guestModal.guestId
          ? { ...g, name, group: guestModal.group.trim(), dietary: guestModal.dietary.trim() }
          : g,
      ),
    }));
    setGuestModal(null);
  }

  function autoSeatByGroup() {
    setState((prev) => {
      const occupied = new Set(Object.keys(prev.assignments));
      const assignedGuests = new Set(Object.values(prev.assignments));
      const unseated = prev.guests.filter((g) => !assignedGuests.has(g.id));
      const grouped = groupGuests(unseated, t.fields.ungrouped);
      const allSeats = prev.tables.flatMap((table) => createSeatsForTable(table, t.seats));
      const emptySeatsByTable = prev.tables.map((table) => ({
        tableId: table.id,
        seats: allSeats.filter((s) => s.tableId === table.id && !occupied.has(s.id)),
      }));

      const nextAssignments = { ...prev.assignments };
      for (const group of grouped) {
        let remaining = [...group];
        while (remaining.length > 0) {
          const exactTable = emptySeatsByTable.find((t) => t.seats.length >= remaining.length);
          const table = exactTable ?? [...emptySeatsByTable].sort((a, b) => b.seats.length - a.seats.length).find((item) => item.seats.length > 0);
          if (!table) break;
          while (remaining.length > 0 && table.seats.length > 0) {
            const guest = remaining.shift()!;
            const seat = table.seats.shift()!;
            nextAssignments[seat.id] = guest.id;
            occupied.add(seat.id);
          }
        }
      }
      return { ...prev, assignments: nextAssignments };
    });
  }

  function onSeatDrop(event: DragEvent<HTMLButtonElement>, seatId: string) {
    event.preventDefault();
    const guestId = event.dataTransfer.getData(DND_GUEST_TYPE);
    if (guestId) assignGuestToSeat(guestId, seatId);
  }

  // --- Export ---
  function exportSeatConfigurationCsv() {
    const csv = createSeatConfigurationCsv(
      state,
      t.seats,
      t.defaults.table,
      [t.export.guestHeader, t.export.tableHeader, t.export.seatHeader, t.export.dietaryHeader],
    );
    downloadBlob(
      new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" }),
      `${exportFilename(safeTables, t.defaults.table, t.export.weddingSeatingPlan)}.csv`,
    );
  }

  async function exportToXlsx() {
    setIsExporting(true);
    try {
      const { createSeatingPlanWorkbook } = await import("@/planner/export-workbook");
      const workbook = await createSeatingPlanWorkbook({
        planName: exportFilename(safeTables, t.defaults.table, t.export.weddingSeatingPlan),
        state,
        exportT: t.export,
        tableFallback: t.defaults.table,
      });
      const buffer = await workbook.xlsx.writeBuffer();
      downloadBlob(
        new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
        `${exportFilename(safeTables, t.defaults.table, t.export.weddingSeatingPlan)}.xlsx`,
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  }

  // --- Migrate to cloud ---
  function getMigrationData(): PlannerState {
    return state;
  }

  function clearLocalData() {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
  }

  const modalSeat = seatModal ? seatById.get(seatModal.seatId) : undefined;
  const modalTable = modalSeat ? safeTables.find((t) => t.id === modalSeat.tableId) : undefined;
  const modalAssignedGuest = modalSeat ? guestById.get(assignmentMap[modalSeat.id]) : undefined;

  return {
    tables: safeTables,
    guests: safeGuests,
    assignments: assignmentMap,
    seats,
    seatById,
    guestById,
    seatedGuestIds,
    unseatedGuests,
    groups,
    isLoading: false,
    seatModal,
    setSeatModal,
    guestModal,
    setGuestModal,
    csvText,
    setCsvText,
    newGuest,
    setNewGuest,
    openTableEditorIds,
    setOpenTableEditorIds,
    openSidebarSectionIds,
    setOpenSidebarSectionIds,
    draggedTableId,
    setDraggedTableId,
    tableDropTargetId,
    setTableDropTargetId,
    isExporting,
    modalSeat,
    modalTable,
    modalAssignedGuest,
    updateTable,
    addTable,
    duplicateTable,
    removeTable,
    addGuest,
    createGuestForSeat,
    importGuestsFromCsv,
    handleCsvFile,
    assignGuestToSeat,
    clearSeat,
    clearTable,
    removeGuest,
    openGuestEditor,
    saveGuest,
    autoSeatByGroup,
    onSeatDrop,
    moveTable,
    handleTableDragOver,
    handleTableDrop,
    clearTableDragState,
    toggleSidebarSection,
    exportSeatConfigurationCsv,
    exportToXlsx,
    getMigrationData,
    clearLocalData,
  };
}

function clearInvalidAssignments(prev: PlannerState, tableId: string, patch: Partial<WeddingTable>): Record<string, string> {
  const oldTable = prev.tables.find((t) => t.id === tableId);
  if (!oldTable) return prev.assignments;
  const updatedTable = { ...oldTable, ...patch };
  const validSeatIds = new Set(createSeatsForTable(updatedTable, { top: "", right: "", bottom: "", left: "", seat: "" }).map((s) => s.id));
  return Object.fromEntries(
    Object.entries(prev.assignments).filter(([seatId]) => !seatId.startsWith(`${tableId}:`) || validSeatIds.has(seatId)),
  );
}
