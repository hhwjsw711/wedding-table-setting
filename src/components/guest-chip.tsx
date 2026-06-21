import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { DietaryBadges } from "@/components/dietary-badges";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useI18n } from "@/i18n";
import type { Guest } from "@/planner/types";
import { DND_GUEST_TYPE } from "@/planner/dnd";

export function GuestChip({
  guest,
  onEdit,
  onRemove,
}: {
  guest: Guest;
  onEdit: (guest: Guest) => void;
  onRemove: (guestId: string) => void;
}) {
  const { t } = useI18n();
  const [confirmRemove, setConfirmRemove] = useState(false);

  return (
    <>
      <Card
        className="!grid min-h-14 grid-cols-12 items-center gap-2.5 rounded-lg border-border bg-background py-2.5 pr-2.5 pl-3 shadow-none transition-all hover:border-primary hover:shadow-lg"
        draggable
        onDragStart={(event) => {
          event.dataTransfer.setData(DND_GUEST_TYPE, guest.id);
        }}
      >
        <span className="col-span-5 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
          {guest.name}
          {guest.group ? <small className="block overflow-hidden text-xs leading-tight text-ellipsis text-muted-foreground">{guest.group}</small> : null}
        </span>
        <div className="col-span-4 justify-self-end">
          <DietaryBadges dietary={guest.dietary} />
        </div>
        <div className="col-span-3 flex justify-self-end gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="text-primary hover:border-primary hover:bg-accent"
                type="button"
                size="icon-sm"
                variant="outline"
                aria-label={t.aria.editGuest(guest.name)}
                onClick={() => onEdit(guest)}
              >
                <Pencil aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t.aria.editGuest(guest.name)}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="text-destructive hover:border-destructive/30 hover:bg-destructive-muted"
                type="button"
                size="icon-sm"
                variant="outline"
                aria-label={t.aria.removeGuest(guest.name)}
                onClick={() => setConfirmRemove(true)}
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t.aria.removeGuest(guest.name)}</TooltipContent>
          </Tooltip>
        </div>
      </Card>
      <Dialog open={confirmRemove} onOpenChange={(open) => !open && setConfirmRemove(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t.confirm.removeTitle}</DialogTitle>
            <DialogDescription>{t.confirm.removeDescription}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmRemove(false)}>{t.actions.cancel}</Button>
            <Button variant="destructive" onClick={() => { onRemove(guest.id); setConfirmRemove(false); }}>{t.actions.delete}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
