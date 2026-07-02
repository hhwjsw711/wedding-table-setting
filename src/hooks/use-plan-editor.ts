import { type ChangeEvent, DragEvent, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Messages } from "@/i18n";
import { TABLE_DRAG_MIME } from "@/planner/constants";
import { DND_GUEST_TYPE } from "@/planner/dnd";
import { type SidebarSectionId, createDefaultOpenSidebarSectionIds } from "@/planner/sidebar-sections";
import type { Guest, GuestEditModalState, NewGuestForm, SeatModalState, WeddingTable } from "@/planner/types";
import {
  createDefaultTable,
  createId,
  createSeatsForTable,
  createSeatConfigurationCsv,
  groupGuests,
  parseGuestsCsv,
} from "@/planner/utils";

type AssignmentDoc = {
  _id: string;
  planId: string;
  seatId: string;
  guestId: string;
};

export function usePlanEditor(planId: string, t: Messages) {
  const tableDocs = useQuery(api.tables.list, { planId: planId as never }) as Record<string, unknown>[] | undefined;
  const guestDocs = useQuery(api.guests.list, { planId: planId as never }) as Record<string, unknown>[] | undefined;
  const assignmentDocs = useQuery(api.assignments.list, { planId: planId as never }) as AssignmentDoc[] | undefined;

  const updateTableMut = useMutation(api.tables.update);
  const createTableMut = useMutation(api.tables.create);
  const removeTableMut = useMutation(api.tables.remove);
  const addGuestMut = useMutation(api.guests.create);
  const batchCreateGuestsMut = useMutation(api.guests.batchCreate);
  const updateGuestMut = useMutation(api.guests.update);
  const removeGuestMut = useMutation(api.guests.remove);
  const assignGuestMut = useMutation(api.assignments.assign);
  const clearSeatMut = useMutation(api.assignments.clear);
  const clearTableMut = useMutation(api.assignments.clearTable);
  const reorderTablesMut = useMutation(api.tables.reorder);

  const debounceTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    return () => {
      for (const timer of debounceTimers.current.values()) {
        clearTimeout(timer);
      }
      debounceTimers.current.clear();
    };
  }, []);

  const safeTables: WeddingTable[] = useMemo(
    () => (tableDocs ?? []).map((d) => ({ ...d, id: d._id as string })) as WeddingTable[],
    [tableDocs],
  );
  const safeGuests: Guest[] = useMemo(
    () => (guestDocs ?? []).map((d) => ({ ...d, id: d._id as string })) as Guest[],
    [guestDocs],
  );
  const safeAssignments = assignmentDocs ?? [];

  const seats = useMemo(() => safeTables.flatMap((table) => createSeatsForTable(table, t.seats)), [safeTables, t.seats]);
  const seatById = useMemo(() => new Map(seats.map((seat) => [seat.id, seat])), [seats]);
  const guestById = useMemo(() => new Map(safeGuests.map((guest) => [guest.id, guest])), [safeGuests]);
  const assignmentMap: Record<string, string> = useMemo(
    () => Object.fromEntries(safeAssignments.map((a) => [a.seatId, a.guestId])),
    [safeAssignments],
  );
  const seatedGuestIds = useMemo(
    () => new Set(Object.values(assignmentMap)),
    [assignmentMap],
  );
  const unseatedGuests = useMemo(
    () => safeGuests.filter((guest) => !seatedGuestIds.has(guest.id)),
    [safeGuests, seatedGuestIds],
  );
  const groups = useMemo(() => {
    const uniqueGroups = new Set(safeGuests.map((guest) => guest.group).filter(Boolean));
    return [...uniqueGroups].sort((a, b) => a.localeCompare(b));
  }, [safeGuests]);

  const [seatModal, setSeatModal] = useState<SeatModalState>(null);
  const [guestModal, setGuestModal] = useState<GuestEditModalState>(null);
  const [csvText, setCsvText] = useState("");
  const [newGuest, setNewGuest] = useState<NewGuestForm>({ name: "", group: "", dietary: "" });
  const [openTableEditorIds, setOpenTableEditorIds] = useState<Set<string>>(new Set());
  const [openSidebarSectionIds, setOpenSidebarSectionIds] = useState<Set<SidebarSectionId>>(() => {
    const state = { tables: safeTables, guests: safeGuests, assignments: assignmentMap };
    return createDefaultOpenSidebarSectionIds(state);
  });
  const [sidebarSectionsTouched, setSidebarSectionsTouched] = useState(false);
  const [draggedTableId, setDraggedTableId] = useState<string | null>(null);
  const [tableDropTargetId, setTableDropTargetId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (sidebarSectionsTouched) return;
    setOpenSidebarSectionIds(createDefaultOpenSidebarSectionIds({ tables: safeTables, guests: safeGuests, assignments: assignmentMap }));
  }, [sidebarSectionsTouched, safeTables, safeGuests, assignmentMap]);

  const updateTable = useCallback(
    (tableId: string, patch: Partial<WeddingTable>) => {
      const existing = debounceTimers.current.get(tableId);
      if (existing) clearTimeout(existing);
      debounceTimers.current.set(
        tableId,
        setTimeout(() => {
          debounceTimers.current.delete(tableId);
          void updateTableMut({ tableId: tableId as never, patch } as never);
        }, 300),
      );
    },
    [updateTableMut],
  );

  function moveTable(tableId: string, direction: -1 | 1) {
    const sourceIndex = safeTables.findIndex((table) => table.id === tableId);
    const targetIndex = sourceIndex + direction;
    if (sourceIndex < 0 || targetIndex < 0 || targetIndex >= safeTables.length) return;

    const orderedIds = [...safeTables.map((t) => t.id)];
    const [id] = orderedIds.splice(sourceIndex, 1);
    orderedIds.splice(targetIndex, 0, id);
    void reorderTablesMut({ planId: planId as never, orderedTableIds: orderedIds } as never);
  }

  function reorderTables(draggedId: string, targetId: string) {
    if (draggedId === targetId) return;

    const sourceIndex = safeTables.findIndex((table) => table.id === draggedId);
    const targetIndex = safeTables.findIndex((table) => table.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return;

    const orderedIds = [...safeTables.map((t) => t.id)];
    const [id] = orderedIds.splice(sourceIndex, 1);
    orderedIds.splice(targetIndex, 0, id);
    void reorderTablesMut({ planId: planId as never, orderedTableIds: orderedIds } as never);

    setDraggedTableId(null);
    setTableDropTargetId(null);
  }

  function handleTableDragOver(event: DragEvent<HTMLElement>, targetId: string) {
    const isTableDrag = Array.from(event.dataTransfer.types).includes(TABLE_DRAG_MIME);
    if (!draggedTableId || draggedTableId === targetId || !isTableDrag) return;

    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setTableDropTargetId((current) => (current === targetId ? current : targetId));
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
    setOpenSidebarSectionIds((current) => {
      const next = new Set(current);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }

  async function addTable() {
    const table = createDefaultTable(safeTables.length + 1, t.defaults.table);
    const newId = await createTableMut({
      planId: planId as never,
      name: table.name,
      shape: table.shape,
      roundSeats: table.roundSeats,
      topSeats: table.topSeats,
      rightSeats: table.rightSeats,
      bottomSeats: table.bottomSeats,
      leftSeats: table.leftSeats,
    } as never);
    setOpenTableEditorIds((current) => new Set([...current, newId as string]));
  }

  async function duplicateTable(tableId: string) {
    const source = safeTables.find((table) => table.id === tableId);
    if (!source) return;
    const name = createDuplicateTableName(source.name, safeTables, t.defaults.copySuffix);
    await createTableMut({
      planId: planId as never,
      name,
      shape: source.shape,
      roundSeats: source.roundSeats,
      topSeats: source.topSeats,
      rightSeats: source.rightSeats,
      bottomSeats: source.bottomSeats,
      leftSeats: source.leftSeats,
    } as never);
  }

  function removeTable(tableId: string) {
    void removeTableMut({ tableId: tableId as never } as never);
    setOpenTableEditorIds((current) => {
      const next = new Set(current);
      next.delete(tableId);
      return next;
    });
  }

  function addGuest(event: FormEvent) {
    event.preventDefault();
    const name = newGuest.name.trim();
    if (!name) return;
    void addGuestMut({
      planId: planId as never,
      name,
      group: newGuest.group.trim(),
      dietary: newGuest.dietary.trim(),
    } as never);
    setNewGuest({ name: "", group: newGuest.group, dietary: "" });
  }

  async function createGuestForSeat(name: string, seatId: string) {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    setSeatModal(null);
    const guestId = await addGuestMut({
      planId: planId as never,
      name: trimmedName,
      group: "",
      dietary: "",
    } as never);
    void assignGuestMut({ planId: planId as never, guestId: guestId as never, seatId } as never);
  }

  function importGuestsFromCsv() {
    const imported = parseGuestsCsv(csvText);
    if (imported.length === 0) return;
    void batchCreateGuestsMut({ planId: planId as never, guests: imported } as never);
    setCsvText("");
  }

  function handleCsvFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    file.text().then(setCsvText);
    event.target.value = "";
  }

  function assignGuestToSeat(guestId: string, seatId: string) {
    void assignGuestMut({ planId: planId as never, guestId: guestId as never, seatId } as never);
    setSeatModal(null);
  }

  function clearSeat(seatId: string) {
    void clearSeatMut({ planId: planId as never, seatId } as never);
  }

  function clearTable(tableId: string) {
    void clearTableMut({ planId: planId as never, tableId: tableId as never } as never);
  }

  function removeGuest(guestId: string) {
    void removeGuestMut({ guestId: guestId as never } as never);
    setGuestModal((current) => (current?.guestId === guestId ? null : current));
  }

  function openGuestEditor(guest: Guest) {
    setGuestModal({
      guestId: guest.id,
      name: guest.name,
      group: guest.group,
      dietary: guest.dietary,
    });
  }

  function saveGuest(event: FormEvent) {
    event.preventDefault();
    if (!guestModal) return;
    const name = guestModal.name.trim();
    if (!name) return;
    void updateGuestMut({
      guestId: guestModal.guestId as never,
      name,
      group: guestModal.group.trim(),
      dietary: guestModal.dietary.trim(),
    } as never);
    setGuestModal(null);
  }

  function autoSeatByGroup() {
    const occupied = new Set(Object.keys(assignmentMap));
    const assignedGuests = new Set(Object.values(assignmentMap));
    const unseated = safeGuests.filter((guest) => !assignedGuests.has(guest.id));
    const grouped = groupGuests(unseated);
    const emptySeatsByTable = safeTables.map((table) => ({
      tableId: table.id,
      seats: seats.filter((seat) => seat.tableId === table.id && !occupied.has(seat.id)),
    }));

    for (const group of grouped) {
      let remaining = [...group];
      while (remaining.length > 0) {
        const exactTable = emptySeatsByTable.find((t) => t.seats.length >= remaining.length);
        const table =
          exactTable ??
          [...emptySeatsByTable].sort((a, b) => b.seats.length - a.seats.length).find((item) => item.seats.length > 0);
        if (!table) break;
        while (remaining.length > 0 && table.seats.length > 0) {
          const guest = remaining.shift()!;
          const seat = table.seats.shift()!;
          void assignGuestMut({ planId: planId as never, guestId: guest.id as never, seatId: seat.id } as never);
          occupied.add(seat.id);
        }
      }
    }
  }

  function onSeatDrop(event: DragEvent<HTMLButtonElement>, seatId: string) {
    event.preventDefault();
    const guestId = event.dataTransfer.getData(DND_GUEST_TYPE);
    if (guestId) assignGuestToSeat(guestId, seatId);
  }

  function exportSeatConfigurationCsv() {
    const state = { tables: safeTables, guests: safeGuests, assignments: assignmentMap };
    const csv = createSeatConfigurationCsv(state, t.seats, t.defaults.table);
    const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${exportFilename(safeTables, t.defaults.table)}.csv`;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  async function exportToXlsx() {
    setIsExporting(true);
    try {
      const { createSeatingPlanWorkbook } = await import("@/planner/export-workbook");
      const state = { tables: safeTables, guests: safeGuests, assignments: assignmentMap };
      const workbook = await createSeatingPlanWorkbook({ planName: exportFilename(safeTables, t.defaults.table), state });
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${exportFilename(safeTables, t.defaults.table)}.xlsx`;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
    } catch {
      // silently handle export error
    } finally {
      setIsExporting(false);
    }
  }

  const modalSeat = seatModal ? seatById.get(seatModal.seatId) : undefined;
  const modalTable = modalSeat ? safeTables.find((table) => table.id === modalSeat.tableId) : undefined;
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
    isLoading: tableDocs === undefined || guestDocs === undefined || assignmentDocs === undefined,
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
  };
}

function exportFilename(tables: WeddingTable[], tableFallback: string) {
  const name = tables[0]?.name?.trim() || tableFallback || "wedding-seating-plan";
  return name.slice(0, 48).replace(/[<>:"/\\|?*\x00-\x1f]/g, "-") || "wedding-seating-plan";
}

function createDuplicateTableName(name: string, tables: WeddingTable[], copySuffix: string) {
  const baseName = `${name} ${copySuffix}`;
  const existingNames = new Set(tables.map((table) => table.name.trim()));
  if (!existingNames.has(baseName)) return baseName;
  let copyNumber = 2;
  while (existingNames.has(`${baseName} ${copyNumber}`)) {
    copyNumber += 1;
  }
  return `${baseName} ${copyNumber}`;
}
