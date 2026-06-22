"use client";

import { useEffect, useRef } from "react";
import { usePath } from "@/lib/store";
import { MockMap } from "./MockMap";
import { cn, formatDuration, formatClock } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DEMO_DRIVER } from "@/lib/data";

// Displays the active ride with the mock map, HUD overlay, and AI alerts.
// Calls tickProgress on an interval (sped up for demo; PRD says every 10s).
export function RideSimulator() {
  const {
    rideProgress,
    riskLevel,
    rideStartTs,
    currentLocationLabel,
    alerts,
    sosActive,
    tickProgress,
  } = usePath();

  const elapsed = rideStartTs ? (Date.now() - rideStartTs) / 1000 : 0;
  const etaSeconds = Math.max(0, 540 * (1 - rideProgress)); // ~9 min ride
  const driver = DEMO_DRIVER;
  const unacknowledged = alerts.filter((a) => !a.acknowledged);

  // Speed: in a real app tick every 10s (PRD §8). For demo: ~2s per 1% progress.
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      tickProgress(0.008); // ~2% per 4s tick
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [tickProgress]);

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <MockMap progress={rideProgress} riskLevel={riskLevel} />

      {/* HUD overlay */}
      <div className="absolute inset-x-0 top-0 p-3 flex items-start justify-between pointer-events-none">
        <Badge
          variant={riskLevel === "high" ? "destructive" : riskLevel === "medium" ? "warning" : "default"}
          className="pointer-events-auto"
        >
          {riskLevel === "high" ? "⚠ HIGH RISK" : riskLevel === "medium" ? "⚡ MEDIUM RISK" : "✓ LOW RISK"}
        </Badge>
        <div className="bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-medium">
          {currentLocationLabel}
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="absolute inset-x-0 bottom-0 p-3">
        <div className="bg-background/90 backdrop-blur-sm rounded-xl p-3 space-y-2">
          {/* Driver row */}
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={driver.photo_url} alt={driver.name} />
              <AvatarFallback>{driver.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-xs">
              <p className="font-medium">{driver.name}</p>
              <p className="text-muted-foreground">{driver.vehicle_number}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-muted-foreground">ETA</p>
              <p className="text-sm font-semibold tabular-nums">
                {formatDuration(etaSeconds)}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${(rideProgress * 100).toFixed(1)}%` }}
            />
          </div>

          {/* Latest unacknowledged alert */}
          {unacknowledged.length > 0 && (
            <div
              className={cn(
                "rounded-lg px-3 py-2 text-xs animate-fade-in",
                unacknowledged[unacknowledged.length - 1].severity === "high"
                  ? "bg-destructive/10 text-destructive"
                  : "bg-warning/10 text-warning",
              )}
            >
              <span className="font-medium">AI Alert: </span>
              {unacknowledged[unacknowledged.length - 1].message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
