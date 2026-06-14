export function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid min-h-14 gap-0.5 border-r border-border px-3 py-2.5 last:border-r-0">
      <strong className="text-2xl leading-none">{value}</strong>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
