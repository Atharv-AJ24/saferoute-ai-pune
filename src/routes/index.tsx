import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { RiskBadge } from "@/components/RiskBadge";
import { StatCard } from "@/components/StatCard";
import { IncidentReportForm } from "@/components/IncidentReportForm";
import { LiveTicker } from "@/components/LiveTicker";
import { HourlyRiskChart } from "@/components/HourlyRiskChart";
import { riskZones, cityStats, type RiskLevel, riskLabel } from "@/data/puneRiskData";
import { AlertTriangle, Activity, Zap, Users, Gauge, ShieldCheck } from "lucide-react";

const RiskMap = lazy(() => import("@/components/RiskMap").then((m) => ({ default: m.RiskMap })));

export const Route = createFileRoute("/")({
  component: Index,
});

const FILTERS: Array<{ key: RiskLevel | "all"; label: string }> = [
  { key: "all", label: "All zones" },
  { key: "critical", label: "Critical" },
  { key: "high", label: "High" },
  { key: "med", label: "Moderate" },
  { key: "low", label: "Low" },
];

function Index() {
  const [filter, setFilter] = useState<RiskLevel | "all">("all");
  const [selectedId, setSelectedId] = useState<string>(riskZones[0].id);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const selected = useMemo(
    () => riskZones.find((z) => z.id === selectedId) ?? riskZones[0],
    [selectedId]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster theme="dark" position="top-right" />

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-glow)]">
                <ShieldCheck className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight">SafeRoute<span className="text-primary">.ai</span></div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Pune · Live Risk Operations
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-2 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-muted-foreground">MODEL ONLINE · v2.4.1</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              Latency <span className="text-foreground">{cityStats.modelLatencyMs}ms</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              Accuracy <span className="text-foreground">{cityStats.predictionAccuracy}%</span>
            </div>
          </div>
        </div>
        <LiveTicker />
      </header>

      {/* Hero */}
      <section className="border-b bg-[var(--gradient-hero)]">
        <div className="mx-auto max-w-[1600px] px-6 py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                <Activity className="h-3 w-3" /> Real-time risk intelligence
              </div>
              <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
                Predicting road danger <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">before</span> it happens.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                SafeRoute.ai fuses live traffic, weather, accident history, social signals and
                citizen reports into a single risk score for every junction in Pune — updated every
                60 seconds.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    filter === f.key
                      ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                      : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-[1600px] px-6 py-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Active risk zones" value={cityStats.activeRiskZones} accent="destructive" icon={<AlertTriangle className="h-5 w-5" />} hint="High + Critical" />
          <StatCard label="Alerts today" value={cityStats.alertsToday} icon={<Zap className="h-5 w-5" />} hint="Push + SMS" />
          <StatCard label="Incidents prevented" value={cityStats.incidentsPrevented} accent="accent" icon={<ShieldCheck className="h-5 w-5" />} hint="Last 24h estimate" />
          <StatCard label="Citizen reports" value={cityStats.citizenReports} icon={<Users className="h-5 w-5" />} hint="This week" />
          <StatCard label="Model accuracy" value={`${cityStats.predictionAccuracy}%`} icon={<Gauge className="h-5 w-5" />} hint="Rolling 7-day F1" />
          <StatCard label="Avg latency" value={`${cityStats.modelLatencyMs}ms`} icon={<Activity className="h-5 w-5" />} hint="Edge inference" />
        </div>
      </section>

      {/* Map + side panel */}
      <section className="mx-auto max-w-[1600px] px-6 pb-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="relative h-[560px] overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-panel)]">
            {mounted ? (
              <Suspense fallback={<div className="grid h-full place-items-center text-muted-foreground">Loading map…</div>}>
                <RiskMap filter={filter} onSelect={setSelectedId} />
              </Suspense>
            ) : (
              <div className="grid h-full place-items-center text-muted-foreground">Loading map…</div>
            )}
            <div className="pointer-events-none absolute left-4 top-4 z-[400] rounded-xl border bg-card/85 px-3 py-2 backdrop-blur">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Risk legend</div>
              <div className="mt-1.5 flex items-center gap-3 text-[11px]">
                {(["low", "med", "high", "critical"] as RiskLevel[]).map((r) => (
                  <span key={r} className="inline-flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        background:
                          r === "critical" ? "var(--risk-critical)" : r === "high" ? "var(--risk-high)" : r === "med" ? "var(--risk-med)" : "var(--risk-low)",
                      }}
                    />
                    {riskLabel[r]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Side: selected zone breakdown */}
          <div className="rounded-2xl border bg-card p-5 shadow-[var(--shadow-panel)]">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Selected zone</div>
                <h3 className="mt-1 text-xl font-bold">{selected.name}</h3>
                <div className="text-xs text-muted-foreground">{selected.area}, Pune</div>
              </div>
              <RiskBadge level={selected.risk} />
            </div>

            <div className="mt-5 rounded-xl border bg-secondary/30 p-4">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Composite risk</div>
                  <div className="font-mono text-4xl font-bold">{selected.score}<span className="text-base text-muted-foreground">/100</span></div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  {selected.recentIncidents} recent incidents
                </div>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-background">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${selected.score}%`,
                    background: "var(--gradient-risk)",
                  }}
                />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Contributing factors</div>
              {Object.entries(selected.factors).map(([k, v]) => (
                <div key={k}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="capitalize text-muted-foreground">{k}</span>
                    <span className="font-mono">{v}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${v}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Forecast + Report */}
      <section className="mx-auto max-w-[1600px] px-6 pb-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-panel)]">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">24-hour forecast</div>
                <h3 className="mt-1 text-xl font-bold">City-wide risk index</h3>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                Peak window<br />
                <span className="font-mono text-foreground">18:00 – 20:00</span>
              </div>
            </div>
            <div className="mt-6">
              <HourlyRiskChart />
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {[
                { t: "Traffic feed", s: "Google Maps + TomTom", v: "Live" },
                { t: "Weather", s: "OpenWeatherMap", v: "Live" },
                { t: "Social signals", s: "X/Twitter NLP", v: "Live" },
              ].map((d) => (
                <div key={d.t} className="rounded-xl border bg-secondary/30 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">{d.t}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {d.v}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{d.s}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-panel)]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-accent" />
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Crowdsource a hazard
              </div>
            </div>
            <h3 className="mt-1 text-xl font-bold">Report what you see</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Your report enters the risk model within 60 seconds.
            </p>
            <div className="mt-5">
              <IncidentReportForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-card/40 py-6">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-2 px-6 text-xs text-muted-foreground md:flex-row">
          <div>© SafeRoute.ai · Built for safer Pune streets</div>
          <div className="font-mono">demo data · model v2.4.1 · OSM tiles</div>
        </div>
      </footer>
    </div>
  );
}
