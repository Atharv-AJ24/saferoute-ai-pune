import { liveFeed } from "@/data/puneRiskData";

export function LiveTicker() {
  const items = [...liveFeed, ...liveFeed];
  return (
    <div className="relative overflow-hidden border-y bg-card/60 py-2 backdrop-blur">
      <div className="ticker-track flex gap-10 whitespace-nowrap text-sm">
        {items.map((i, idx) => (
          <span key={idx} className="inline-flex items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">{i.time}</span>
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background:
                  i.severity === "critical"
                    ? "var(--risk-critical)"
                    : i.severity === "high"
                    ? "var(--risk-high)"
                    : i.severity === "med"
                    ? "var(--risk-med)"
                    : "var(--risk-low)",
              }}
            />
            <span className="font-medium">{i.type}</span>
            <span className="text-muted-foreground">· {i.area}</span>
            <span className="rounded-full border border-border/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              {i.source}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
