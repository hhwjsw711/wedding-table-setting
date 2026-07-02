import ExcelJS from "exceljs";

import type { Guest, PlannerState, Seat, WeddingTable } from "@/planner/types";
import { createSeatsForTable, findSeatForGuest } from "@/planner/utils";

type ExportWorkbookInput = {
  planName: string;
  state: PlannerState;
};

type SeatingGuestCell = {
  guestName: string;
  placeholder: string;
};

type GuestListRow = {
  dietary: string;
  guest: Guest;
  seatLabel: string;
  tableName: string;
};

const PAGE_COLUMNS = 24;
const TABLES_PER_ROW = 6;
const TABLE_BLOCK_WIDTH = 4;
const MIN_SEATS_PER_SIDE = 11;
const TOP_MARGIN_ROWS = 3;
const SECTION_HEADER_HEIGHT = 8;
const SECTION_FOOTER_ROWS = 8;

const colors = {
  banner: "FFF9F6F2",
  divider: "FFE8DFD3",
  guestListHeader: "FF8AC3E6",
  mare: "FFB9CAD6",
  note: "FFF4CCCC",
  table: "FF91CAD2",
  villa: "FFEED4AF",
};

const thinGridBorder: Partial<ExcelJS.Borders> = {
  bottom: { style: "thin", color: { argb: "FFB7B7B7" } },
  left: { style: "thin", color: { argb: "FFB7B7B7" } },
  right: { style: "thin", color: { argb: "FFB7B7B7" } },
  top: { style: "thin", color: { argb: "FFB7B7B7" } },
};

const tableOutlineBorder: Partial<ExcelJS.Borders> = {
  bottom: { style: "thin", color: { argb: "FF000000" } },
  left: { style: "thin", color: { argb: "FF000000" } },
  right: { style: "thin", color: { argb: "FF000000" } },
  top: { style: "thin", color: { argb: "FF000000" } },
};

export async function createSeatingPlanWorkbook({ planName, state }: ExportWorkbookInput) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Wedding Table Setting";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.properties.date1904 = false;

  addSeatingPlanSheet(workbook, state);
  addGuestListSheet(workbook, state, planName);

  return workbook;
}

function addSeatingPlanSheet(workbook: ExcelJS.Workbook, state: PlannerState) {
  const worksheet = workbook.addWorksheet("Seating Plan", {
    pageSetup: {
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      horizontalCentered: true,
      margins: { bottom: 0.75, footer: 0, header: 0, left: 0.7, right: 0.7, top: 0.75 },
      orientation: "landscape",
      showGridLines: true,
    },
    views: [{ showGridLines: true, zoomScale: 55, zoomScaleNormal: 55 }],
  });

  worksheet.properties.defaultRowHeight = 15.75;
  worksheet.columns = Array.from({ length: PAGE_COLUMNS }, (_, index) => ({
    key: `c${index + 1}`,
    width: index % TABLE_BLOCK_WIDTH === 2 ? 4.8 : 11,
  }));

  const guestRowsByTable = state.tables.map((table) => createTableGuestCells(table, state));
  const sectionCount = Math.max(1, Math.ceil(state.tables.length / TABLES_PER_ROW));
  let sectionTop = TOP_MARGIN_ROWS + 1;

  addTopBanner(worksheet, sectionTop);

  for (let sectionIndex = 0; sectionIndex < sectionCount; sectionIndex += 1) {
    const tables = state.tables.slice(sectionIndex * TABLES_PER_ROW, (sectionIndex + 1) * TABLES_PER_ROW);
    const sectionGuestRows = guestRowsByTable.slice(sectionIndex * TABLES_PER_ROW, (sectionIndex + 1) * TABLES_PER_ROW);
    const seatRows = Math.max(MIN_SEATS_PER_SIDE, ...sectionGuestRows.map((rows) => Math.ceil(rows.length / 2)));
    const headerRow = sectionTop + (sectionIndex === 0 ? 5 : 1);
    const guestStartRow = headerRow + 3;
    const tableNameRow = guestStartRow + seatRows + 3;
    const mareRow = tableNameRow + 3;

    addSectionBand(worksheet, headerRow, "VILLA", colors.villa);
    for (const [tableIndex, table] of tables.entries()) {
      const startColumn = 2 + tableIndex * TABLE_BLOCK_WIDTH;
      addTableBlock(worksheet, {
        cells: sectionGuestRows[tableIndex],
        guestStartRow,
        seatRows,
        startColumn,
        table,
      });
      const tableNameCell = worksheet.getCell(tableNameRow, startColumn);
      worksheet.mergeCells(tableNameRow, startColumn, tableNameRow, Math.min(PAGE_COLUMNS, startColumn + 2));
      tableNameCell.value = table.name.trim() || `Table ${sectionIndex * TABLES_PER_ROW + tableIndex + 1}`;
      tableNameCell.alignment = { horizontal: "center", vertical: "middle" };
      tableNameCell.font = { name: "Arial", size: 10, color: { argb: "FF1D2A36" } };
    }
    addSectionBand(worksheet, mareRow, "MARE", colors.mare);

    sectionTop = mareRow + SECTION_FOOTER_ROWS;
  }

  addNotes(worksheet, sectionTop - 2);
}

function addTopBanner(worksheet: ExcelJS.Worksheet, topRow: number) {
  worksheet.mergeCells(topRow, 4, topRow + 1, 22);
  const title = worksheet.getCell(topRow, 4);
  title.value = "Seating Plan";
  title.fill = solidFill(colors.banner);
  title.font = { name: "Arial", size: 10, color: { argb: "FF1D2A36" } };
  title.alignment = { horizontal: "center", vertical: "middle", wrapText: true };

  worksheet.mergeCells(topRow + 2, 4, topRow + 2, 22);
  const subtitle = worksheet.getCell(topRow + 2, 4);
  subtitle.value = "Please fill the scheme with the names of the Guests";
  subtitle.fill = solidFill(colors.divider);
  subtitle.font = { name: "Arial", size: 10, color: { argb: "FF1D2A36" } };
  subtitle.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  worksheet.getRow(topRow + 2).height = 27;
}

function addSectionBand(worksheet: ExcelJS.Worksheet, rowNumber: number, label: string, color: string) {
  worksheet.mergeCells(rowNumber, 6, rowNumber, 20);
  const cell = worksheet.getCell(rowNumber, 6);
  cell.value = label;
  cell.fill = solidFill(color);
  cell.font = { name: "Arial", size: 10, color: { argb: "FF000000" } };
  cell.alignment = { horizontal: "center", vertical: "middle" };
}

function addTableBlock(
  worksheet: ExcelJS.Worksheet,
  {
    cells,
    guestStartRow,
    seatRows,
    startColumn,
    table,
  }: {
    cells: SeatingGuestCell[];
    guestStartRow: number;
    seatRows: number;
    startColumn: number;
    table: WeddingTable;
  },
) {
  const leftColumn = startColumn;
  const centerColumn = startColumn + 1;
  const rightColumn = startColumn + 2;
  const leftCells = cells.slice(0, Math.ceil(cells.length / 2));
  const rightCells = cells.slice(Math.ceil(cells.length / 2));

  for (let offset = 0; offset < seatRows; offset += 1) {
    writeGuestCell(worksheet.getCell(guestStartRow + offset, leftColumn), leftCells[offset]);
    writeGuestCell(worksheet.getCell(guestStartRow + offset, rightColumn), rightCells[offset]);

    const tableCell = worksheet.getCell(guestStartRow + offset, centerColumn);
    tableCell.fill = solidFill(colors.table);
    tableCell.border = tableOutlineBorder;
  }

  worksheet.getColumn(centerColumn).width = table.shape === "round" ? 6 : 4.8;
}

function writeGuestCell(cell: ExcelJS.Cell, guestCell: SeatingGuestCell | undefined) {
  if (!guestCell) return;

  cell.value = guestCell.guestName || guestCell.placeholder;
  cell.font = { name: "Arial", size: 10, color: { argb: "FF1D2A36" } };
  cell.alignment = { horizontal: "right", vertical: "middle", shrinkToFit: true };
}

function addNotes(worksheet: ExcelJS.Worksheet, rowNumber: number) {
  worksheet.mergeCells(rowNumber, 1, rowNumber, 10);
  const cell = worksheet.getCell(rowNumber, 1);
  cell.value = [
    "* per ogni tavolo considerare 20/22 ospiti",
    "* decidere in che posizione saranno seduti gli sposi",
    "* inserire i nomi di tutti gli ospiti al posto delle scritta guest n.x",
  ].join("\n");
  cell.fill = solidFill(colors.note);
  cell.font = { name: "Arial", size: 10, color: { argb: "FF1D2A36" } };
  cell.alignment = { horizontal: "left", vertical: "middle", wrapText: true };
  worksheet.getRow(rowNumber).height = 57;
}

function addGuestListSheet(workbook: ExcelJS.Workbook, state: PlannerState, planName: string) {
  const worksheet = workbook.addWorksheet("Lista Ospiti", {
    pageSetup: {
      fitToPage: false,
      fitToWidth: 1,
      fitToHeight: 1,
      margins: { bottom: 0.75, footer: 0.3, header: 0.3, left: 0.7, right: 0.7, top: 0.75 },
      orientation: "portrait",
    },
    views: [{ state: "frozen", ySplit: 1, showGridLines: true }],
  });
  worksheet.columns = [
    { header: "Guest", key: "guest", width: 30 },
    { header: "Table", key: "table", width: 24 },
    { header: "Seat", key: "seat", width: 18 },
    { header: "Dietary restrictions", key: "dietary", width: 34 },
  ];

  worksheet.getRow(1).values = ["Guest", "Table", "Seat", "Dietary restrictions"];
  worksheet.getRow(1).height = 22;
  worksheet.getRow(1).eachCell((cell) => {
    cell.fill = solidFill(colors.guestListHeader);
    cell.font = { name: "Arial", size: 11, color: { argb: "FFFFFFFF" }, bold: true };
    cell.alignment = { horizontal: "left", vertical: "middle" };
    cell.border = thinGridBorder;
  });

  for (const [index, row] of createGuestListRows(state).entries()) {
    const worksheetRow = worksheet.getRow(index + 2);
    worksheetRow.getCell(1).value = row.guest.name;
    worksheetRow.getCell(2).value = row.tableName;
    worksheetRow.getCell(3).value = row.seatLabel;
    worksheetRow.getCell(4).value = row.dietary;
    worksheetRow.eachCell((cell) => {
      cell.font = { name: "Helvetica Neue", size: 11, color: { argb: "FF000000" } };
      cell.alignment = { vertical: "top", wrapText: true };
      cell.border = thinGridBorder;
    });
  }

  worksheet.autoFilter = {
    from: { column: 1, row: 1 },
    to: { column: 4, row: Math.max(1, state.guests.length + 1) },
  };
  worksheet.headerFooter.oddHeader = `&C${planName || "Wedding seating plan"}`;
}

function createTableGuestCells(table: WeddingTable, state: PlannerState) {
  const guestById = new Map(state.guests.map((guest) => [guest.id, guest]));
  return createSeatsForTable(table).map((seat, index) => {
    const guest = guestById.get(state.assignments[seat.id]);
    return {
      guestName: guest?.name ?? "",
      placeholder: `guest n.${index + 1}`,
    };
  });
}

function createGuestListRows(state: PlannerState): GuestListRow[] {
  const tableById = new Map(state.tables.map((table) => [table.id, table]));
  const rows = state.guests.map((guest) => {
    const seatId = findSeatForGuest(state.assignments, guest.id);
    const seat = seatId ? findSeat(state.tables, seatId) : null;
    const table = seat ? tableById.get(seat.tableId) : seatId ? tableById.get(getTableIdFromSeatId(seatId)) : null;

    return {
      dietary: guest.dietary,
      guest,
      seatLabel: seat?.label ?? "",
      tableName: table?.name.trim() || "",
    };
  });

  return rows.sort(
    (a, b) =>
      a.tableName.localeCompare(b.tableName, undefined, { numeric: true, sensitivity: "base" }) ||
      a.guest.name.localeCompare(b.guest.name, undefined, { sensitivity: "base" }),
  );
}

function findSeat(tables: WeddingTable[], seatId: string): Seat | null {
  for (const table of tables) {
    const seat = createSeatsForTable(table).find((candidate) => candidate.id === seatId);
    if (seat) return seat;
  }
  return null;
}

function getTableIdFromSeatId(seatId: string) {
  return seatId.split(":")[0] ?? "";
}

function solidFill(argb: string): ExcelJS.Fill {
  return {
    fgColor: { argb },
    pattern: "solid",
    type: "pattern",
  };
}
