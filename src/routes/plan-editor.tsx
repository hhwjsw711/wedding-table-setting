import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Check, Copy, Plus, Share2 } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ExportMenu } from "@/components/export-menu";
import { GuestChip } from "@/components/guest-chip";
import { GuestEditModal } from "@/components/guest-edit-modal";
import { SeatAssignmentModal } from "@/components/seat-assignment-modal";
import { SidebarSection } from "@/components/sidebar-section";
import { Stat } from "@/components/stat";
import { TableEditor } from "@/components/table-editor";
import { TableView } from "@/components/table-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LanguageSwitcher } from "@/components/language-switcher";
import { type Messages, useI18n } from "@/i18n";
import { usePlanEditor } from "@/hooks/use-plan-editor";

export function PlanEditorPage() {
  const { planId } = useParams<{ planId: string }>();
  const { t } = useI18n();
  const plan = useQuery(api.plans.getById, { planId: planId as never });
  const editor = usePlanEditor(planId!, t);
  const generateShareToken = useMutation(api.plans.generateShareToken);
  const [shareUrl, setShareUrl] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  if (!planId) return <div className="flex min-h-dvh items-center justify-center bg-canvas"><p className="text-muted-foreground">{t.viewer.invalidLink}</p></div>;

  if (plan === undefined || editor.isLoading) {
    return <div className="flex min-h-dvh items-center justify-center bg-canvas"><p className="text-muted-foreground">{t.viewer.loading}</p></div>;
  }

  if (plan === null) {
    return <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-canvas p-4 text-center"><p className="text-lg font-semibold text-foreground">{t.viewer.notFound}</p><Link className="text-sm font-medium text-primary underline" to="/dashboard">{t.actions.back}</Link></div>;
  }

  const shareLink = shareUrl || `${window.location.origin}/view/...`;

  async function handleShare() {
    if (shareOpen) {
      setShareOpen(false);
      return;
    }
    const token = await generateShareToken({ planId: planId as never } as never);
    const url = `${window.location.origin}/view/${token}`;
    setShareUrl(url);
    setShareOpen(true);
    setShareCopied(false);
  }

  async function copyShareLink(input: HTMLInputElement | null) {
    let didCopy = false;
    try {
      await navigator.clipboard.writeText(shareUrl);
      didCopy = true;
    } catch {
      input?.focus();
      input?.select();
      didCopy = document.execCommand("copy");
    }
    setShareCopied(didCopy);
  }

  return (
    <div className="min-h-dvh min-w-80 bg-canvas font-sans text-foreground antialiased">
      <SidebarProvider className="bg-canvas" style={{ "--sidebar-width": "24rem" } as CSSProperties}>
        <Sidebar className="border-border print:hidden" collapsible="offcanvas">
          <SidebarHeader className="border-b border-border bg-background p-2">
            <div className="flex min-h-10 items-center justify-between gap-2 px-2">
              <div className="min-w-0">
                <h2 className="m-0 overflow-hidden text-sm leading-tight font-semibold text-ellipsis whitespace-nowrap">{plan.name}</h2>
              </div>
              <SidebarTrigger className="flex-none" label={t.aria.toggleSidebar} />
            </div>
          </SidebarHeader>
          <SidebarContent className="gap-0 bg-background">
            <SidebarSection
              isOpen={editor.openSidebarSectionIds.has("tables")}
              meta={String(editor.tables.length)}
              onToggle={() => editor.toggleSidebarSection("tables")}
              title={t.sections.tables}
            >
              <div className="grid gap-2.5">
                {editor.tables.map((table) => (
                  <TableEditor
                    key={table.id}
                    isDragging={editor.draggedTableId === table.id}
                    isDropTarget={editor.tableDropTargetId === table.id}
                    isOpen={editor.openTableEditorIds.has(table.id)}
                    onChange={(patch) => editor.updateTable(table.id, patch)}
                    onDragEnd={editor.clearTableDragState}
                    onDragOver={(event) => editor.handleTableDragOver(event, table.id)}
                    onDragStart={() => editor.setDraggedTableId(table.id)}
                    onDrop={(event) => editor.handleTableDrop(event, table.id)}
                    onDuplicate={() => editor.duplicateTable(table.id)}
                    onKeyboardMove={(direction) => editor.moveTable(table.id, direction)}
                    onRemove={() => editor.removeTable(table.id)}
                    onToggle={(isOpen) =>
                      editor.setOpenTableEditorIds((current) => {
                        const next = new Set(current);
                        if (isOpen) next.add(table.id);
                        else next.delete(table.id);
                        return next;
                      })
                    }
                    canRemove={editor.tables.length > 1}
                    table={table}
                    t={t}
                  />
                ))}
                <Button
                  className="min-h-10 w-full border-dashed border-input bg-transparent px-3 py-2 font-extrabold text-primary hover:border-primary hover:bg-background"
                  type="button"
                  variant="outline"
                  onClick={editor.addTable}
                >
                  <Plus aria-hidden="true" />
                  {t.actions.addTable}
                </Button>
              </div>
            </SidebarSection>

            <SidebarSection
              contentClassName="min-h-44"
              isOpen={editor.openSidebarSectionIds.has("unseated")}
              meta={String(editor.unseatedGuests.length)}
              onToggle={() => editor.toggleSidebarSection("unseated")}
              title={t.sections.unseated}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="mb-3 w-full"
                    type="button"
                    onClick={editor.autoSeatByGroup}
                    disabled={editor.unseatedGuests.length === 0}
                  >
                    {t.actions.seatByGroup}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t.actions.seatByGroupHint}</TooltipContent>
              </Tooltip>
              <div className="grid max-h-96 flex-auto gap-2.5 overflow-auto pr-1">
                {editor.unseatedGuests.length === 0 ? (
                  <p className="m-0 text-sm text-muted-foreground">{t.empty.allGuestsSeated}</p>
                ) : (
                  editor.unseatedGuests.map((guest) => (
                    <GuestChip key={guest.id} guest={guest} onEdit={editor.openGuestEditor} onRemove={editor.removeGuest} />
                  ))
                )}
              </div>
            </SidebarSection>

            <SidebarSection
              isOpen={editor.openSidebarSectionIds.has("guests")}
              meta={t.counts.seatedGuests(editor.guests.length - editor.unseatedGuests.length, editor.guests.length)}
              onToggle={() => editor.toggleSidebarSection("guests")}
              title={t.actions.addGuest}
            >
              <form className="grid gap-2.5" onSubmit={editor.addGuest}>
                <Input
                  placeholder={t.fields.name}
                  value={editor.newGuest.name}
                  onChange={(event) => editor.setNewGuest({ ...editor.newGuest, name: event.target.value })}
                />
                <Input
                  placeholder={t.fields.group}
                  list="guest-groups"
                  value={editor.newGuest.group}
                  onChange={(event) => editor.setNewGuest({ ...editor.newGuest, group: event.target.value })}
                />
                <Input
                  placeholder={t.fields.dietary}
                  value={editor.newGuest.dietary}
                  onChange={(event) => editor.setNewGuest({ ...editor.newGuest, dietary: event.target.value })}
                />
                <Button type="submit">{t.actions.addGuest}</Button>
              </form>
              <datalist id="guest-groups">
                {editor.groups.map((group) => (
                  <option key={group} value={group} />
                ))}
              </datalist>
            </SidebarSection>

            <SidebarSection
              isOpen={editor.openSidebarSectionIds.has("import")}
              meta="CSV"
              onToggle={() => editor.toggleSidebarSection("import")}
              title={t.actions.importGuests}
            >
              <div className="grid gap-2.5">
                <Label className="relative inline-flex min-h-9 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-border bg-background text-sm font-bold transition-colors hover:border-primary hover:text-primary">
                  <Input
                    className="absolute inset-0 h-full opacity-0"
                    accept=".csv,text/csv"
                    type="file"
                    onChange={editor.handleCsvFile}
                  />
                  {t.actions.chooseCsv}
                </Label>
                <Textarea
                  className="min-h-24 resize-y"
                  rows={4}
                  placeholder={t.csvPlaceholder}
                  value={editor.csvText}
                  onChange={(event) => editor.setCsvText(event.target.value)}
                />
                <Button className="w-full" type="button" onClick={editor.importGuestsFromCsv}>
                  {t.actions.importGuests}
                </Button>
              </div>
            </SidebarSection>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="max-h-screen overflow-auto bg-canvas p-4 lg:p-5 max-lg:max-h-none md:peer-data-[collapsible=offcanvas]:ml-0">
          <div className="mb-4 hidden text-center print:block">
            <h1 className="text-xl font-bold tracking-tight">{plan.name}</h1>
          </div>
          <div className="mb-5 grid items-start gap-3 md:grid-cols-[auto_minmax(0,1fr)_auto] print:hidden">
            <div className="flex min-w-0 justify-start">
              <FloatingSidebarTrigger label={t.aria.toggleSidebar} />
            </div>
            <div
              className="grid w-full max-w-3xl justify-self-center grid-cols-4 items-stretch overflow-hidden rounded-lg border border-border bg-background/80 max-md:max-w-none max-sm:grid-cols-2"
              aria-label={t.aria.planStatus}
            >
              <Stat label={t.stats.tables} value={editor.tables.length} />
              <Stat label={t.stats.seats} value={editor.seats.length} />
              <Stat label={t.stats.guests} value={editor.guests.length} />
              <Stat label={t.stats.open} value={Math.max(0, editor.seats.length - Object.keys(editor.assignments).length)} />
            </div>
            <div className="flex min-w-0 justify-end gap-2">
              <LanguageSwitcher />
              <ExportMenu
                isExportingXlsx={editor.isExporting}
                labels={{ csv: t.actions.exportCsv, export: t.actions.exportSeats, xlsx: t.actions.exportXlsx }}
                onExportCsv={editor.exportSeatConfigurationCsv}
                onExportXlsx={() => void editor.exportToXlsx()}
              />
              <ShareControl
                copied={shareCopied}
                isOpen={shareOpen}
                onCopy={copyShareLink}
                onToggle={handleShare}
                t={t}
                url={shareLink}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            {editor.guests.length === 0 && (
              <p className="col-span-full text-center text-sm text-muted-foreground xl:text-left">{t.empty.noGuestsYet}</p>
            )}
            {editor.tables.map((table) => (
              <TableView
                key={table.id}
                assignments={editor.assignments}
                guestById={editor.guestById}
                onClearSeat={editor.clearSeat}
                onClearTable={() => editor.clearTable(table.id)}
                onRename={(name) => editor.updateTable(table.id, { name })}
                onOpenSeat={(seatId) => editor.setSeatModal({ seatId, query: "" })}
                onSeatDrop={editor.onSeatDrop}
                table={table}
                t={t}
              />
            ))}
          </div>
        </SidebarInset>
      </SidebarProvider>

      {editor.seatModal && editor.modalSeat && (
        <SeatAssignmentModal
          assignedGuest={editor.modalAssignedGuest}
          assignments={editor.assignments}
          guests={editor.guests}
          onAssignGuest={editor.assignGuestToSeat}
          onClearSeat={editor.clearSeat}
          onClose={() => editor.setSeatModal(null)}
          onCreateGuest={editor.createGuestForSeat}
          onEditGuest={editor.openGuestEditor}
          onQueryChange={(query) => editor.setSeatModal((current) => (current ? { ...current, query } : current))}
          seat={editor.modalSeat}
          seatById={editor.seatById}
          seatedGuestIds={editor.seatedGuestIds}
          seatModal={editor.seatModal}
          table={editor.modalTable}
          tables={editor.tables}
          t={t}
        />
      )}

      {editor.guestModal && (
        <GuestEditModal
          guestModal={editor.guestModal}
          onChange={(gm) => editor.setGuestModal(gm)}
          onClose={() => editor.setGuestModal(null)}
          onSave={editor.saveGuest}
          t={t}
        />
      )}
    </div>
  );
}

function FloatingSidebarTrigger({ label }: { label: string }) {
  const { isMobile, open, openMobile } = useSidebar();
  if (isMobile ? openMobile : open) return null;
  return <SidebarTrigger className="sticky top-4 z-30 flex-none bg-background shadow-sm [&>svg]:size-3.5" label={label} />;
}

function ShareControl({
  copied,
  isOpen,
  onCopy,
  onToggle,
  t,
  url,
}: {
  copied: boolean;
  isOpen: boolean;
  onCopy: (input: HTMLInputElement | null) => void;
  onToggle: () => void;
  t: Messages;
  url: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onToggle();
        buttonRef.current?.focus();
      }
    },
    [onToggle],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, handleEsc]);

  return (
    <div className="relative flex min-w-0 justify-end">
      <Button aria-expanded={isOpen} aria-label={t.aria.sharePlan} ref={buttonRef} size="icon" type="button" variant="outline" onClick={onToggle}>
        <Share2 aria-hidden="true" className="size-3.5" />
      </Button>
      {isOpen ? (
        <div className="absolute top-11 right-0 z-30 grid w-[min(22rem,calc(100vw-2rem))] gap-2 rounded-lg border border-border bg-background p-3 shadow-xl md:top-[4.5rem]">
          <Input aria-label={t.aria.shareLink} readOnly ref={inputRef} value={url} onFocus={(event) => event.currentTarget.select()} />
          <Button className="w-full" type="button" onClick={() => onCopy(inputRef.current)}>
            {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
            {copied ? t.actions.copied : t.actions.copyLink}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
