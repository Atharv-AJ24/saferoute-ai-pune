import { riskLabel, type RiskLevel } from "@/data/puneRiskData";
import { cn } from "@/lib/utils";

const styles: Record<RiskLevel, string> = {
  low: "bg-[var(--risk-low)]/15 text-[var(--risk-low)] border-[var(--risk-low)]/40",
  med: "bg-[var(--risk-med)]/15 text-[var(--risk-med)] border-[var(--risk-med)]/40",
  high: "bg-[var(--risk-high)]/15 text-[var(--risk-high)] border-[var(--risk-high)]/40",
  critical: "bg-[var(--risk-critical)]/15 text-[var(--risk-critical)] border-[var(--risk-critical)]/40",
};

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
        styles[level],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {riskLabel[level]}
    </span>
  );
}
