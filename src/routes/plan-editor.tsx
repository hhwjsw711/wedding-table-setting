import { type CSSProperties, useRef, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Check, Copy, Languages, Plus, Share2 } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { GuestChip } from "@/components/guest-chip";
import { GuestEditModal } from "@/components/guest-edit-modal";
import { SeatAssignmentModal } from "@/components/seat-assignment-modal";
import { Stat } from "@/components/stat";
import { TableEditor } from "@/components/table-editor";
import { TableView } from "@/components/table-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { type Locale, type Messages, useI18n } from "@/i18n";
import { usePlanEditor } from "@/hooks/use-plan-editor";

export function PlanEditorPage() {
  const { planId } = useParams<{ planId: string }>();
  const { locale, setLocale, t } = useI18n();
  const plan = useQuery(api.plans.getById, { planId: planId as never });
  const editor = usePlanEditor(planId!, t);
  const generateShareToken = useMutation(api.plans.generateShareToken);
  const [shareUrl, setShareUrl] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  if (!planId) return <div className="flex min-h-screen items-center justify-center bg-canvas"><p className="text-muted-foreground">{t.dashboard.emptyDescription}</p></div>;

  if (plan === undefined || editor.isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-canvas"><p className="text-muted-foreground">{t.sections.tables}…</p></div>;
  }

  if (plan === null) {
    return <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas p-4 text-center"><p className="text-lg font-semibold text-foreground">{t.dashboard.emptyTitle}</p><Link className="text-sm font-medium text-primary underline" to="/dashboard">{t.actions.back}</Link></div>;
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
    <div className="min-h-screen min-w-80 bg-canvas font-sans text-foreground antialiased">
      <SidebarProvider className="bg-canvas" style={{ "--sidebar-width": "24rem" } as CSSProperties}>
        <Sidebar className="border-border" collapsible="offcanvas">
          <SidebarHeader className="border-b border-border bg-background p-2">
            <div className="flex min-h-10 items-center justify-between gap-2 px-2">
              <div className="min-w-0">
                <Link className="mb-1 flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary" to="/dashboard">
                  <ArrowLeft className="size-3" />
                  {t.actions.back}
                </Link>
                <span className="text-xs font-semibold text-muted-foreground">{t.counts.seats(editor.seats.length)}</span>
              </div>
              <SidebarTrigger className="flex-none" />
            </div>
          </SidebarHeader>
          <SidebarContent className="gap-0 bg-background">
            <SidebarGroup className="border-b border-border p-4 sm:p-5">
              <div className="grid gap-2.5">
                {editor.tables.map((table) => (
                  <TableEditor
                    key={table.id}
                    isOpen={editor.openTableEditorIds.has(table.id)}
                    onChange={(patch) => editor.updateTable(table.id, patch)}
                    onDuplicate={() => editor.duplicateTable(table.id)}
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
            </SidebarGroup>

            <SidebarGroup className="border-b border-border p-4 sm:p-5">
              <div className="mb-3.5 flex items-baseline justify-between">
                <h2 className="m-0 text-sm leading-tight font-semibold">{t.sections.guests}</h2>
                <span className="text-xs font-semibold text-muted-foreground">
                  {t.counts.seatedGuests(editor.guests.length - editor.unseatedGuests.length, editor.guests.length)}
                </span>
              </div>
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
              <div className="mt-3 grid gap-2.5 border-t border-border pt-3">
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
            </SidebarGroup>

            <SidebarGroup className="min-h-56 p-4 sm:p-5">
              <div className="mb-3.5 flex items-baseline justify-between">
                <h2 className="m-0 text-sm leading-tight font-semibold">{t.sections.unseated}</h2>
                <span className="text-xs font-semibold text-muted-foreground">{editor.unseatedGuests.length}</span>
              </div>
              <Button
                className="mb-3 w-full"
                type="button"
                onClick={editor.autoSeatByGroup}
                disabled={editor.unseatedGuests.length === 0}
              >
                {t.actions.seatByGroup}
              </Button>
              <div className="grid max-h-96 flex-auto gap-2.5 overflow-auto pr-1">
                {editor.unseatedGuests.length === 0 ? (
                  <p className="m-0 text-sm text-muted-foreground">{t.empty.allGuestsSeated}</p>
                ) : (
                  editor.unseatedGuests.map((guest) => (
                    <GuestChip key={guest.id} guest={guest} onEdit={editor.openGuestEditor} onRemove={editor.removeGuest} />
                  ))
                )}
              </div>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="max-h-screen overflow-auto bg-canvas p-4 lg:p-5 max-lg:max-h-none md:peer-data-[collapsible=offcanvas]:ml-0">
          <div className="mb-5 grid items-start gap-3 md:grid-cols-[1fr_minmax(0,48rem)_1fr]">
            <div className="flex min-w-0 justify-start">
              <FloatingSidebarTrigger />
            </div>
            <div
              className="grid w-full max-w-3xl grid-cols-4 items-stretch overflow-hidden rounded-lg border border-border bg-background/80 max-md:max-w-none max-sm:grid-cols-2"
              aria-label={t.aria.planStatus}
            >
              <Stat label={t.stats.tables} value={editor.tables.length} />
              <Stat label={t.stats.seats} value={editor.seats.length} />
              <Stat label={t.stats.guests} value={editor.guests.length} />
              <Stat label={t.stats.open} value={Math.max(0, editor.seats.length - Object.keys(editor.assignments).length)} />
            </div>
            <div className="flex min-w-0 justify-end gap-2">
              <LanguageControl
                currentLabel={t.language.current}
                label={t.aria.language}
                nextLabel={t.language.next}
                onToggle={() => {
                  const order: Locale[] = ["en", "zh", "it"];
                  setLocale(order[(order.indexOf(locale) + 1) % order.length]);
                }}
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

function FloatingSidebarTrigger() {
  const { isMobile, open, openMobile } = useSidebar();
  if (isMobile ? openMobile : open) return null;
  return <SidebarTrigger className="sticky top-4 z-30 flex-none bg-background shadow-sm [&>svg]:size-3.5 md:fixed md:top-4 md:left-4" />;
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
  return (
    <div className="relative flex min-w-0 justify-end">
      <Button aria-expanded={isOpen} aria-label={t.aria.sharePlan} size="icon" type="button" variant="outline" onClick={onToggle}>
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

function LanguageControl({
  currentLabel,
  label,
  nextLabel,
  onToggle,
}: {
  currentLabel: string;
  label: string;
  nextLabel: string;
  onToggle: () => void;
}) {
  return (
    <Button aria-label={label} className="relative" title={nextLabel} size="icon" type="button" variant="outline" onClick={onToggle}>
      <Languages aria-hidden="true" className="size-3.5" />
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="absolute -right-1 -bottom-1 rounded-sm border border-border bg-background px-1 text-[10px] font-black leading-4">
        {currentLabel}
      </span>
    </Button>
  );
}
