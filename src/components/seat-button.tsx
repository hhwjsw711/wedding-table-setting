import { type CSSProperties, type DragEvent, useState } from "react";
import { X } from "lucide-react";

import { DietaryBadges } from "@/components/dietary-badges";
import type { Messages } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Guest, Seat } from "@/planner/types";
import { DND_GUEST_TYPE } from "@/planner/dnd";

export function SeatButton({
  assignment,
  guest,
  compact,
  highlight,
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
  compact?: boolean;
  highlight?: boolean;
  onClear: (seatId: string) => void;
  onDrop: (event: DragEvent<HTMLButtonElement>, seatId: string) => void;
  onOpen: (seatId: string) => void;
  readOnly?: boolean;
  seat: Seat;
  style?: CSSProperties;
  t: Messages;
}) {
  const [dragover, setDragover] = useState(false);

  return (
    <button
      className={cn(
        "group relative flex min-w-0 flex-none flex-col items-center justify-center gap-0.5 overflow-hidden rounded-lg border border-dashed border-input bg-background px-1 py-0.5 text-center leading-tight font-bold text-muted-foreground transition-all",
        compact ? "h-10 w-16 text-[11px]" : "h-14 w-20 gap-1 px-1.5 py-1 text-xs",
        !readOnly && "cursor-pointer hover:border-primary hover:ring-2 hover:ring-ring/20",
        guest && "overflow-visible border-solid border-amber-600 bg-seat-filled text-foreground",
        style && "absolute",
        dragover && "ring-2 ring-primary border-primary bg-primary/10",
        highlight && "ring-2 ring-amber-400 border-amber-400 bg-amber-50",
      )}
      draggable={Boolean(guest) && !readOnly}
      onClick={() => {
        if (!readOnly) onOpen(seat.id);
      }}
      onDragOver={(event) => {
        if (!readOnly) {
          event.preventDefault();
          if (event.dataTransfer.types.includes(DND_GUEST_TYPE)) {
            event.dataTransfer.dropEffect = "move";
            setDragover(true);
          }
        }
      }}
      onDragLeave={() => setDragover(false)}
      onDragStart={(event) => {
        if (!assignment || readOnly) return;
        event.dataTransfer.setData(DND_GUEST_TYPE, assignment);
      }}
      onDrop={(event) => {
        setDragover(false);
        if (!readOnly) onDrop(event, seat.id);
      }}
      style={style}
      title={guest ? [guest.name, seat.label, guest.dietary].filter(Boolean).join(" - ") : seat.label}
      type="button"
    >
      <span className="line-clamp-2 max-w-full overflow-hidden text-center">{guest?.name ?? "+"}</span>
      {guest ? <DietaryBadges className="absolute -top-2 left-1/2 z-10 w-max -translate-x-1/2" dietary={guest.dietary} compact /> : null}
      {guest && !readOnly && (
        <span
          aria-label={t.actions.clearSeat}
          className="pointer-events-none absolute top-1 right-1 flex size-4 items-center justify-center rounded-full border border-amber-200 bg-background text-xs text-destructive opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-visible:pointer-events-auto group-focus-visible:opacity-100"
          role="button"
          tabIndex={0}
          title={t.actions.clearSeat}
          onClick={(event) => {
            event.stopPropagation();
            onClear(seat.id);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
              onClear(seat.id);
            }
          }}
        >
          <X aria-hidden="true" />
        </span>
      )}
    </button>
  );
}
