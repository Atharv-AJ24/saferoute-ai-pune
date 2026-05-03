import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  hint,
  icon,
  accent = "primary",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
  accent?: "primary" | "accent" | "destructive";
}) {
  const ring =
    accent === "destructive"
      ? "from-destructive/30"
      : accent === "accent"
      ? "from-accent/30"
      : "from-primary/30";
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card p-5 transition hover:border-primary/40">
      <div className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${ring} to-transparent blur-2xl`} />
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
          <div className="mt-2 font-mono text-3xl font-bold text-foreground">{value}</div>
          {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
        </div>
        {icon && <div className="text-primary opacity-80">{icon}</div>}
      </div>
    </div>
  );
}
