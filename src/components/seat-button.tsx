import type { CSSProperties, DragEvent } from "react";

import { DietaryBadges } from "@/components/dietary-badges";
import { cn } from "@/lib/utils";
import type { Guest, Seat } from "@/planner/types";

export function SeatButton({
  assignment,
  guest,
  onClear,
  onDrop,
  onOpen,
  seat,
  style,
}: {
  assignment?: string;
  guest?: Guest;
  onClear: (seatId: string) => void;
  onDrop: (event: DragEvent<HTMLButtonElement>, seatId: string) => void;
  onOpen: (seatId: string) => void;
  seat: Seat;
  style?: CSSProperties;
}) {
  return (
    <button
      className={cn(
        "relative flex h-14 w-20 min-w-0 flex-none cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border border-dashed border-input bg-background px-1.5 py-1 text-center text-xs leading-tight font-bold text-muted-foreground transition-all hover:border-primary hover:ring-2 hover:ring-ring/20 max-sm:w-16",
        guest && "border-solid border-amber-600 bg-seat-filled text-foreground",
        style && "absolute",
      )}
      draggable={Boolean(guest)}
      onClick={() => onOpen(seat.id)}
      onDragOver={(event) => event.preventDefault()}
      onDragStart={(event) => {
        if (!assignment) return;
        event.dataTransfer.setData("application/x-guest-id", assignment);
      }}
      onDrop={(event) => onDrop(event, seat.id)}
      style={style}
      title={guest ? [guest.name, seat.label, guest.dietary].filter(Boolean).join(" - ") : seat.label}
      type="button"
    >
      <span className="line-clamp-2 max-w-full overflow-hidden text-center">{guest?.name ?? "+"}</span>
      {guest ? <DietaryBadges dietary={guest.dietary} compact /> : null}
      {guest && (
        <em
          className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full border border-amber-200 bg-background text-xs not-italic text-destructive"
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
