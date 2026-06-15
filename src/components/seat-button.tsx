import type { CSSProperties, DragEvent } from "react";

import { DietaryBadges } from "@/components/dietary-badges";
import type { Messages } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Guest, Seat } from "@/planner/types";
import { DND_GUEST_TYPE } from "@/planner/dnd";

export function SeatButton({
  assignment,
  guest,
  onClear,
  onDrop,
  onOpen,
  readOnly,
  seat,
  style,
  t,
}: {
  assignment?: string;
  guest?: Guest;
  onClear: (seatId: string) => void;
  onDrop: (event: DragEvent<HTMLButtonElement>, seatId: string) => void;
  onOpen: (seatId: string) => void;
  readOnly?: boolean;
  seat: Seat;
  style?: CSSProperties;
  t: Messages;
}) {
  return (
    <button
      className={cn(
        "group relative flex h-14 w-20 min-w-0 flex-none flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border border-dashed border-input bg-background px-1.5 py-1 text-center text-xs leading-tight font-bold text-muted-foreground transition-all",
        !readOnly && "cursor-pointer hover:border-primary hover:ring-2 hover:ring-ring/20",
        guest && "overflow-visible border-solid border-amber-600 bg-seat-filled text-foreground",
        style && "absolute",
      )}
      draggable={Boolean(guest) && !readOnly}
      onClick={() => {
        if (!readOnly) onOpen(seat.id);
      }}
      onDragOver={(event) => {
        if (!readOnly) event.preventDefault();
      }}
      onDragStart={(event) => {
        if (!assignment || readOnly) return;
        event.dataTransfer.setData(DND_GUEST_TYPE, assignment);
      }}
      onDrop={(event) => {
        if (!readOnly) onDrop(event, seat.id);
      }}
      style={style}
      title={guest ? [guest.name, seat.label, guest.dietary].filter(Boolean).join(" - ") : seat.label}
      type="button"
    >
      <span className="line-clamp-2 max-w-full overflow-hidden text-center">{guest?.name ?? "+"}</span>
      {guest ? <DietaryBadges className="absolute -top-2 left-1/2 z-10 w-max -translate-x-1/2" dietary={guest.dietary} compact /> : null}
      {guest && !readOnly && (
        <em
          className="pointer-events-none absolute top-1 right-1 flex size-4 items-center justify-center rounded-full border border-amber-200 bg-background text-xs not-italic text-destructive opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-visible:pointer-events-auto group-focus-visible:opacity-100"
          title={t.actions.clearSeat}
          onClick={(event) => {
            event.stopPropagation();
            onClear(seat.id);
          }}
        >
          x
        </em>
      )}
    </button>
  );
}
