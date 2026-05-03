import { hourlyRisk } from "@/data/puneRiskData";

export function HourlyRiskChart() {
  const max = Math.max(...hourlyRisk.map((p) => p.v));
  return (
    <div>
      <div className="flex items-end gap-1.5 h-36">
        {hourlyRisk.map((p) => {
          const h = (p.v / max) * 100;
          const color =
            p.v > 80 ? "var(--risk-critical)" : p.v > 65 ? "var(--risk-high)" : p.v > 45 ? "var(--risk-med)" : "var(--risk-low)";
          return (
            <div key={p.h} className="group flex flex-1 flex-col items-center gap-1">
              <div className="relative flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-md transition-all group-hover:opacity-80"
                  style={{ height: `${h}%`, background: `linear-gradient(180deg, ${color}, color-mix(in oklab, ${color} 30%, transparent))` }}
                  title={`${p.h}:00 — risk ${p.v}`}
                />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">{p.h}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>00:00</span>
        <span>Predicted city-wide risk index (next 24h)</span>
        <span>23:00</span>
      </div>
    </div>
  );
}
