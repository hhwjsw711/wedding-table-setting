import { useMemo, useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { DietaryBadges } from "@/components/dietary-badges";
import { SeatButton } from "@/components/seat-button";
import { Stat } from "@/components/stat";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n";
import type { Guest, WeddingTable } from "@/planner/types";
import { createSeatsForTable, getRoundSeatStyle } from "@/planner/utils";

type AssignmentDoc = {
  _id: string;
  planId: string;
  seatId: string;
  guestId: string;
};

export function PlanViewerPage() {
  const { shareToken } = useParams<{ shareToken: string }>();
  const { t } = useI18n();
  if (!shareToken) return <div className="flex min-h-screen items-center justify-center bg-canvas"><p className="text-muted-foreground">{t.viewer.invalidLink}</p></div>;
  const plan = useQuery(api.plans.getByShareToken, { shareToken: shareToken! });
  const planId = plan?._id as string | undefined;
  const tableDocs = useQuery(api.tables.listPublic, planId && shareToken ? { planId: planId as never, shareToken } : "skip") as Record<string, unknown>[] | undefined;
  const guestDocs = useQuery(api.guests.listPublic, planId && shareToken ? { planId: planId as never, shareToken } : "skip") as Record<string, unknown>[] | undefined;
  const assignmentDocs = useQuery(api.assignments.listPublic, planId && shareToken ? { planId: planId as never, shareToken } : "skip") as AssignmentDoc[] | undefined;
  const [searchQuery, setSearchQuery] = useState("");

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
  const guestById = useMemo(() => new Map(safeGuests.map((g) => [g.id, g])), [safeGuests]);
  const assignmentMap: Record<string, string> = useMemo(
    () => Object.fromEntries(safeAssignments.map((a) => [a.seatId, a.guestId])),
    [safeAssignments],
  );

  const filteredGuests = useMemo(() => {
    if (!searchQuery.trim()) return safeGuests;
    const q = searchQuery.toLowerCase();
    return safeGuests.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.group.toLowerCase().includes(q) ||
        g.dietary.toLowerCase().includes(q),
    );
  }, [safeGuests, searchQuery]);

  const highlightedSeatIds = useMemo(() => {
    if (!searchQuery.trim()) return new Set<string>();
    const ids = new Set<string>();
    const matchedGuestIds = new Set(filteredGuests.map((g) => g.id));
    for (const [seatId, guestId] of Object.entries(assignmentMap)) {
      if (matchedGuestIds.has(guestId)) {
        ids.add(seatId);
      }
    }
    return ids;
  }, [filteredGuests, assignmentMap, searchQuery]);

  if (plan === undefined || tableDocs === undefined || guestDocs === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <p className="text-muted-foreground">{t.viewer.loading}</p>
      </div>
    );
  }

  if (plan === null) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas p-4 text-center">
        <p className="text-lg font-semibold text-foreground">{t.viewer.notFound}</p>
        <p className="text-sm text-muted-foreground">{t.viewer.notFoundDescription}</p>
        <Link className="text-sm font-medium text-primary underline" to="/">
          {t.viewer.createYourOwn}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas font-sans text-foreground antialiased">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold">{plan.name}</h1>
            <p className="text-xs text-muted-foreground">{t.viewer.poweredBy}</p>
          </div>
          <div className="flex items-center gap-3">
            <Input
              className="w-48"
              placeholder={t.viewer.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Link
              className="text-sm font-medium text-primary underline hover:text-primary/80"
              to="/"
            >
              {t.viewer.createYourOwn}
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <div
            className="grid w-full max-w-3xl grid-cols-4 items-stretch overflow-hidden rounded-lg border border-border bg-background/80 max-sm:grid-cols-2"
          >
            <Stat label={t.stats.tables} value={safeTables.length} />
            <Stat label={t.stats.seats} value={seats.length} />
            <Stat label={t.stats.guests} value={safeGuests.length} />
            <Stat label={t.stats.open} value={Math.max(0, seats.length - Object.keys(assignmentMap).length)} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            {safeTables.map((table) => (
              <div key={table.id} className="grid gap-1.5">
                {table.shape === "round" ? (
                  <div className="relative mx-auto aspect-square w-full max-w-64">
                    <div className="absolute inset-[15%] flex flex-col items-center justify-center rounded-full bg-table-surface">
                      <p className="text-sm font-semibold">{table.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {seats.filter((s) => s.tableId === table.id && assignmentMap[s.id]).length}/{table.roundSeats}
                      </p>
                    </div>
                    {seats
                      .filter((s) => s.tableId === table.id)
                      .map((seat, index) => (
                        <SeatButton
                          assignment={assignmentMap[seat.id]}
                          guest={guestById.get(assignmentMap[seat.id])}
                          key={seat.id}
                          onClear={() => {}}
                          onDrop={() => {}}
                          onOpen={() => {}}
                          readOnly
                          seat={seat}
                          style={getRoundSeatStyle(index, table.roundSeats)}
                          t={t}
                        />
                      ))}
                  </div>
                ) : (
                  <Card className="border bg-background p-4">
                    <div className="mb-2 text-center">
                      <p className="text-sm font-semibold">{table.name}</p>
                    </div>
                    {table.topSeats > 0 && (
                      <div className="mb-2 flex justify-center gap-1">
                        {seats
                          .filter((s) => s.tableId === table.id && s.side === "top")
                          .map((seat) => (
                            <SeatButton
                              assignment={assignmentMap[seat.id]}
                              guest={guestById.get(assignmentMap[seat.id])}
                              key={seat.id}
                              onClear={() => {}}
                              onDrop={() => {}}
                              onOpen={() => {}}
                              readOnly
                              seat={seat}
                              t={t}
                            />
                          ))}
                      </div>
                    )}
                    <div className="grid gap-2" style={{ gridTemplateColumns: `${table.leftSeats > 0 ? "auto " : ""}1fr${table.rightSeats > 0 ? " auto" : ""}` }}>
                      {table.leftSeats > 0 && (
                        <div className="flex flex-col gap-1">
                          {seats
                            .filter((s) => s.tableId === table.id && s.side === "left")
                            .map((seat) => (
                              <SeatButton
                                assignment={assignmentMap[seat.id]}
                                guest={guestById.get(assignmentMap[seat.id])}
                                key={seat.id}
                                onClear={() => {}}
                                onDrop={() => {}}
                                onOpen={() => {}}
                                readOnly
                                seat={seat}
                                t={t}
                              />
                            ))}
                        </div>
                      )}
                      <div className="flex min-h-16 items-center justify-center rounded bg-table-surface">
                        <p className="text-xs text-muted-foreground">
                          {seats.filter((s) => s.tableId === table.id && assignmentMap[s.id]).length}/
                          {table.topSeats + table.rightSeats + table.bottomSeats + table.leftSeats}
                        </p>
                      </div>
                      {table.rightSeats > 0 && (
                        <div className="flex flex-col gap-1">
                          {seats
                            .filter((s) => s.tableId === table.id && s.side === "right")
                            .map((seat) => (
                              <SeatButton
                                assignment={assignmentMap[seat.id]}
                                guest={guestById.get(assignmentMap[seat.id])}
                                key={seat.id}
                                onClear={() => {}}
                                onDrop={() => {}}
                                onOpen={() => {}}
                                readOnly
                                seat={seat}
                                t={t}
                              />
                            ))}
                        </div>
                      )}
                    </div>
                    {table.bottomSeats > 0 && (
                      <div className="mt-2 flex justify-center gap-1">
                        {seats
                          .filter((s) => s.tableId === table.id && s.side === "bottom")
                          .map((seat) => (
                            <SeatButton
                              assignment={assignmentMap[seat.id]}
                              guest={guestById.get(assignmentMap[seat.id])}
                              key={seat.id}
                              onClear={() => {}}
                              onDrop={() => {}}
                              onOpen={() => {}}
                              readOnly
                              seat={seat}
                              t={t}
                            />
                          ))}
                      </div>
                    )}
                  </Card>
                )}
              </div>
            ))}
          </div>

          <div className="max-h-[calc(100vh-12rem)] overflow-auto rounded-lg border border-border bg-background p-4">
            <h2 className="mb-3 text-sm font-semibold">{t.sections.guests}</h2>
            <div className="grid gap-1.5">
              {filteredGuests.map((guest) => (
                <div
                  key={guest.id}
                  className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{guest.name}</p>
                    {guest.group ? <p className="truncate text-xs text-muted-foreground">{guest.group}</p> : null}
                  </div>
                  <DietaryBadges compact dietary={guest.dietary} />
                </div>
              ))}
              {filteredGuests.length === 0 && searchQuery ? (
                <p className="text-sm text-muted-foreground">{t.empty.noGuestsFound}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
