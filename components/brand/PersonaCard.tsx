"use client";

import { cn } from "@/lib/utils";

export function PersonaCard({
  name,
  tagline,
  age,
  needs,
  painPoints,
  className,
}: {
  name: string;
  tagline: string;
  age: string;
  needs: string[];
  painPoints: string[];
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border bg-card p-5", className)}>
      <h3 className="font-semibold">{name}</h3>
      <p className="text-xs text-muted-foreground mb-1">{tagline}</p>
      <p className="text-xs text-primary font-medium mb-3">Age: {age}</p>
      <div className="space-y-2">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Needs</p>
          <ul className="space-y-0.5">
            {needs.map((n) => (
              <li key={n} className="text-xs flex items-start gap-1.5">
                <span className="text-success mt-0.5">●</span> {n}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Pain Points</p>
          <ul className="space-y-0.5">
            {painPoints.map((p) => (
              <li key={p} className="text-xs flex items-start gap-1.5">
                <span className="text-destructive mt-0.5">●</span> {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
