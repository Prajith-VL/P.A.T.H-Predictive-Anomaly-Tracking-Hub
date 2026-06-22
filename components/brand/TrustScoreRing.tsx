"use client";

import { cn } from "@/lib/utils";

// SVG ring that displays a Trust Score out of 100 (PRD Feature 6).
export function TrustScoreRing({
  score,
  size = 100,
  strokeWidth = 6,
  className,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color =
    score >= 80 ? "text-success" : score >= 60 ? "text-warning" : "text-destructive";
  const strokeColor =
    score >= 80
      ? "var(--success)"
      : score >= 60
        ? "var(--warning)"
        : "var(--destructive)";

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={cn("text-xl font-bold tabular-nums", color)}>
          {score}
        </span>
        <span className="text-[10px] text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}
