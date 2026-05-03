import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  type: z.string().min(2, "Pick a hazard type").max(60),
  location: z.string().trim().min(2, "Location required").max(120),
  description: z.string().trim().max(500).optional(),
});

const HAZARDS = ["Pothole", "Accident", "Waterlogging", "Signal outage", "Debris", "Poor visibility", "Other"];

export function IncidentReportForm() {
  const [type, setType] = useState("Pothole");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ type, location, description });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast.success("Report submitted", {
      description: `${type} near ${location} — pending verification (3 confirmations needed).`,
    });
    setLocation("");
    setDescription("");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Hazard type</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {HAZARDS.map((h) => (
            <button
              type="button"
              key={h}
              onClick={() => setType(h)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                type === h
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="loc" className="text-xs uppercase tracking-wider text-muted-foreground">
          Location / landmark
        </Label>
        <Input
          id="loc"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. JM Road near Balgandharva"
          className="mt-2 bg-secondary/40"
          maxLength={120}
        />
      </div>

      <div>
        <Label htmlFor="desc" className="text-xs uppercase tracking-wider text-muted-foreground">
          Details (optional)
        </Label>
        <Textarea
          id="desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What did you see?"
          className="mt-2 min-h-20 bg-secondary/40"
          maxLength={500}
        />
      </div>

      <Button type="submit" disabled={submitting} className="w-full font-semibold">
        {submitting ? "Submitting…" : "Submit report"}
      </Button>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Reports are cross-checked against traffic & weather signals and require 3 confirmations before
        affecting risk scores. Abuse drops your trust score.
      </p>
    </form>
  );
}
