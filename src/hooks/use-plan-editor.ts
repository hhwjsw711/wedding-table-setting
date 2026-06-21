import { type ChangeEvent, DragEvent, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Messages } from "@/i18n";
import type { Guest, GuestEditModalState, NewGuestForm, SeatModalState, WeddingTable } from "@/planner/types";
import {
  createDefaultTable,
  createId,
  createSeatsForTable,
  groupGuests,
  parseGuestsCsv,
} from "@/planner/utils";
import { DND_GUEST_TYPE } from "@/planner/dnd";

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

  const debounceTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    return () => {
      for (const timer of debounceTimers.current.values()) {
        clearTimeout(timer);
      }
      debounceTimers.current.clear();
    };
  }, []);

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

  const [seatModal, setSeatModal] = useState<SeatModalState>(null);
  const [guestModal, setGuestModal] = useState<GuestEditModalState>(null);
  const [csvText, setCsvText] = useState("");
  const [newGuest, setNewGuest] = useState<NewGuestForm>({ name: "", group: "", dietary: "" });
  const [openTableEditorIds, setOpenTableEditorIds] = useState<Set<string>>(new Set());

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
  };
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
