import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Plus, LogOut, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/i18n";

export function DashboardPage() {
  const { t } = useI18n();
  const { signOut } = useAuthActions();
  const navigate = useNavigate();
  const plans = (useQuery(api.plans.list) ?? []) as { _id: string; name: string; updatedAt: number }[];
  const createPlan = useMutation(api.plans.create);
  const createTable = useMutation(api.tables.create);
  const updatePlan = useMutation(api.plans.update);
  const deletePlan = useMutation(api.plans.remove);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleCreate = useCallback(async () => {
    const name = newName.trim();
    if (!name) return;
    setLoading(true);
    try {
      const planId = await createPlan({ name });
      await createTable({
        planId: planId as never,
        name: `${t.defaults.table} 1`,
        shape: "round",
        roundSeats: 10,
        topSeats: 0,
        rightSeats: 0,
        bottomSeats: 0,
        leftSeats: 0,
      } as never);
      setNewName("");
      navigate(`/plan/${planId}`);
    } finally {
      setLoading(false);
    }
  }, [newName, createPlan, createTable, t, navigate]);

  const handleRename = useCallback(
    async (planId: string) => {
      const name = editName.trim();
      if (!name) return;
      try {
        await updatePlan({ planId: planId as never, name });
        setEditingId(null);
      } catch { /* mutation handles rollback via useQuery */ }
    },
    [editName, updatePlan],
  );

  const handleDelete = useCallback(
    async (planId: string) => {
      try {
        await deletePlan({ planId: planId as never });
        setConfirmDeleteId(null);
      } catch { /* mutation handles rollback via useQuery */ }
    },
    [deletePlan],
  );

  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t.dashboard.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="outline" onClick={() => signOut()}>
              <LogOut className="mr-2 size-4" />
              {t.actions.logout}
            </Button>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <Input
            placeholder={t.defaults.planName}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <Button disabled={loading || !newName.trim()} onClick={handleCreate}>
            <Plus className="mr-2 size-4" />
            {t.actions.createPlan}
          </Button>
        </div>

        {plans.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <p className="text-lg font-semibold text-foreground">{t.dashboard.emptyTitle}</p>
              <p className="text-sm text-muted-foreground">{t.dashboard.emptyDescription}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {plans.map((plan) => (
              <Card key={plan._id} className="cursor-pointer hover:border-primary" onClick={() => navigate(`/plan/${plan._id}`)}>
                <CardHeader className="flex flex-row items-center justify-between p-4">
                  <div className="min-w-0 flex-1">
                    {editingId === plan._id ? (
                      <Input
                        autoFocus
                        className="mb-1 h-8 w-64"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRename(plan._id);
                          if (e.key === "Escape") setEditingId(null);
                        }}
                        onBlur={() => handleRename(plan._id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <CardTitle className="text-base">{plan.name}</CardTitle>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {t.dashboard.updatedAt} {new Date(plan.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setEditingId(plan._id);
                            setEditName(plan.name);
                          }}
                        >
                          <Pencil className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{t.actions.rename}</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost" onClick={() => setConfirmDeleteId(plan._id)}>
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{t.actions.delete}</TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
        <Dialog open={!!confirmDeleteId} onOpenChange={(open) => !open && setConfirmDeleteId(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{t.confirm.deleteTitle}</DialogTitle>
              <DialogDescription>{t.confirm.deleteDescription}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>{t.actions.cancel}</Button>
              <Button variant="destructive" onClick={() => confirmDeleteId && handleDelete(confirmDeleteId)}>{t.actions.delete}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
