"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ROUTE_POINTS, ROUTE_STOP, routePathD } from "@/lib/data";

// Custom SVG map — no tiles, no API key. Street grid + route polyline + markers.
interface MockMapProps {
  progress: number; // 0..1 along route
  riskLevel: "low" | "medium" | "high";
  className?: string;
}

export function MockMap({ progress, riskLevel, className }: MockMapProps) {
  const viewBox = "0 0 100 100";
  // Current vehicle position via linear interpolation along polyline
  const segCount = ROUTE_POINTS.length - 1;
  const scaled = Math.min(1, Math.max(0, progress)) * segCount;
  const i = Math.min(segCount - 1, Math.floor(scaled));
  const t = scaled - i;
  const a = ROUTE_POINTS[i];
  const b = ROUTE_POINTS[i + 1];
  const vx = a.x + (b.x - a.x) * t;
  const vy = a.y + (b.y - a.y) * t;

  const riskColor =
    riskLevel === "high"
      ? "var(--destructive)"
      : riskLevel === "medium"
        ? "var(--warning)"
        : "var(--primary)";

  return (
    <svg
      viewBox={viewBox}
      className={cn("w-full h-full map-grid rounded-xl bg-muted/30", className)}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Filled route area (subtle) */}
      <path
        d={routePathD()}
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 3"
      />

      {/* Traversed route (solid, colored by risk) */}
      <path
        d={routePathD()}
        fill="none"
        stroke={riskColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={ROUTE_POINTS.length * 6}
        strokeDashoffset={ROUTE_POINTS.length * 6 * (1 - progress)}
        className="transition-all duration-300"
      />

      {/* Animated dashes along traveled route */}
      <path
        d={routePathD()}
        fill="none"
        stroke={riskColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="6 8"
        strokeDashoffset={ROUTE_POINTS.length * 6 * (1 - progress)}
        opacity="0.4"
        className="animate-dash-flow"
      />

      {/* Start marker */}
      <circle cx={ROUTE_POINTS[0].x} cy={ROUTE_POINTS[0].y} r="2.2" fill="hsl(var(--primary))" />
      <text x={ROUTE_POINTS[0].x + 3} y={ROUTE_POINTS[0].y + 1} fontSize="3" fill="hsl(var(--foreground))" fontWeight="500">
        Metro
      </text>

      {/* Stop marker */}
      <circle cx={ROUTE_STOP.x} cy={ROUTE_STOP.y} r="1.8" fill="hsl(var(--warning))" opacity="0.7" />
      <text x={ROUTE_STOP.x + 3} y={ROUTE_STOP.y + 1} fontSize="2.5" fill="hsl(var(--muted-foreground)">
        CP
      </text>

      {/* End marker */}
      {progress >= 0.95 && (
        <circle
          cx={ROUTE_POINTS[ROUTE_POINTS.length - 1].x}
          cy={ROUTE_POINTS[ROUTE_POINTS.length - 1].y}
          r="2.2"
          fill="hsl(var(--success))"
        />
      )}

      {/* Vehicle marker with pulse */}
      <circle cx={vx} cy={vy} r="4" fill={riskColor} opacity="0.2" className="animate-pulse-ring" />
      <circle cx={vx} cy={vy} r="2.2" fill={riskColor} />
      <circle cx={vx} cy={vy} r="0.8" fill="white" />
    </svg>
  );
}
