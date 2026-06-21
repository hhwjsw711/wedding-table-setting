import { type DragEvent, memo } from "react";

import { SeatButton } from "@/components/seat-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Messages } from "@/i18n";
import type { Guest, WeddingTable } from "@/planner/types";
import { createSeatsForTable, getRoundSeatStyle } from "@/planner/utils";

export const TableView = memo(TableViewInner);

function TableViewInner({
  assignments,
  guestById,
  onClearSeat,
  onClearTable,
  onRename,
  onOpenSeat,
  onSeatDrop,
  table,
  t,
}: {
  assignments: Record<string, string>;
  guestById: Map<string, Guest>;
  onClearSeat: (seatId: string) => void;
  onClearTable: () => void;
  onRename: (name: string) => void;
  onOpenSeat: (seatId: string) => void;
  onSeatDrop: (event: DragEvent<HTMLButtonElement>, seatId: string) => void;
  table: WeddingTable;
  t: Messages;
}) {
  const seats = createSeatsForTable(table, t.seats);
  const assignedCount = seats.filter((seat) => assignments[seat.id]).length;
  const topSeats = seats.filter((seat) => seat.side === "top");
  const leftSeats = seats.filter((seat) => seat.side === "left");
  const rightSeats = seats.filter((seat) => seat.side === "right");
  const bottomSeats = seats.filter((seat) => seat.side === "bottom");
  const hasLeft = leftSeats.length > 0;
  const hasRight = rightSeats.length > 0;
  const tableName = table.name.trim() || t.defaults.table;

  return (
    <article className="min-h-0 rounded-lg border border-border bg-background/90 p-4 shadow-xl transition-all hover:border-input hover:shadow-2xl">
      <div className="mb-3.5 flex items-center justify-between gap-3">
        <Input
          aria-label={t.aria.nameForTable(table.name)}
          className="h-9 w-auto flex-auto border-transparent bg-transparent px-2 py-1 text-sm font-extrabold hover:border-border hover:bg-background"
          value={table.name}
          onChange={(event) => onRename(event.target.value)}
        />
        <div className="flex flex-none items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">
            {assignedCount}/{seats.length}
          </span>
          <Button
            className="min-h-8 px-2 py-1 text-xs font-bold disabled:border-border disabled:bg-accent disabled:text-muted-foreground"
            type="button"
            variant="destructive"
            onClick={onClearTable}
            disabled={assignedCount === 0}
          >
            {t.actions.unseatTable}
          </Button>
        </div>
      </div>
      {table.shape === "round" ? (
        <div className="relative mx-auto aspect-square min-h-72 max-w-md max-sm:min-h-64">
          <div className="absolute top-1/2 left-1/2 flex h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-primary-muted px-4 text-center font-extrabold text-primary">
            <span className="max-w-full overflow-hidden text-wrap break-words">{tableName}</span>
          </div>
          {seats.map((seat, index) => (
            <SeatButton
              assignment={assignments[seat.id]}
              guest={guestById.get(assignments[seat.id])}
              key={seat.id}
              onClear={onClearSeat}
              onDrop={onSeatDrop}
              onOpen={onOpenSeat}
              seat={seat}
              t={t}
              style={getRoundSeatStyle(index, seats.length)}
            />
          ))}
        </div>
      ) : (
        <div className="mx-auto min-h-72 max-w-md max-sm:min-h-64">
          <div className="grid min-h-0 gap-2.5">
            {topSeats.length > 0 && (
              <div className="flex min-h-14 justify-center gap-2">
                {topSeats.map((seat) => (
                  <SeatButton
                    assignment={assignments[seat.id]}
                    guest={guestById.get(assignments[seat.id])}
                    key={seat.id}
                    onClear={onClearSeat}
                    onDrop={onSeatDrop}
                    onOpen={onOpenSeat}
                    seat={seat}
                    t={t}
                  />
                ))}
              </div>
            )}
            <div className="flex items-stretch gap-2">
              {hasLeft && (
                <div className="flex flex-col justify-center gap-2">
                  {leftSeats.map((seat) => (
                    <SeatButton
                      assignment={assignments[seat.id]}
                      guest={guestById.get(assignments[seat.id])}
                      key={seat.id}
                      onClear={onClearSeat}
                      onDrop={onSeatDrop}
                      onOpen={onOpenSeat}
                      seat={seat}
                      t={t}
                    />
                  ))}
                </div>
              )}
              <div className="flex min-h-44 min-w-40 flex-1 items-center justify-center rounded-lg border border-input bg-table-surface px-4 text-center font-extrabold text-secondary-foreground">
                <span className="max-w-full overflow-hidden text-wrap break-words">{tableName}</span>
              </div>
              {hasRight && (
                <div className="flex flex-col justify-center gap-2">
                  {rightSeats.map((seat) => (
                    <SeatButton
                      assignment={assignments[seat.id]}
                      guest={guestById.get(assignments[seat.id])}
                      key={seat.id}
                      onClear={onClearSeat}
                      onDrop={onSeatDrop}
                      onOpen={onOpenSeat}
                      seat={seat}
                      t={t}
                    />
                  ))}
                </div>
              )}
            </div>
            {bottomSeats.length > 0 && (
              <div className="flex min-h-14 justify-center gap-2">
                {bottomSeats.map((seat) => (
                  <SeatButton
                    assignment={assignments[seat.id]}
                    guest={guestById.get(assignments[seat.id])}
                    key={seat.id}
                    onClear={onClearSeat}
                    onDrop={onSeatDrop}
                    onOpen={onOpenSeat}
                    seat={seat}
                    t={t}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
