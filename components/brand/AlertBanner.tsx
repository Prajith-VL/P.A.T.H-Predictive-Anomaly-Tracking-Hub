"use client";

import { usePath } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

// Floating banner that surfaces the latest AI alert during an active ride.
export function AlertBanner({ className }: { className?: string }) {
  const { alerts, acknowledgeAlert, phase } = usePath();
  const latest = alerts.filter((a) => !a.acknowledged).at(-1);

  if (phase !== "active" || !latest) return null;

  const variant =
    latest.severity === "high" ? "destructive" : latest.severity === "medium" ? "warning" : "outline";

  return (
    <div
      className={cn(
        "mx-4 rounded-xl border px-4 py-3 animate-fade-in cursor-pointer",
        latest.severity === "high"
          ? "border-destructive/30 bg-destructive/5"
          : "border-warning/30 bg-warning/5",
        className,
      )}
      onClick={() => acknowledgeAlert(latest.id)}
    >
      <div className="flex items-start gap-2">
        <AlertTriangle
          className={cn(
            "h-4 w-4 mt-0.5 shrink-0",
            latest.severity === "high" ? "text-destructive" : "text-warning",
          )}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <Badge variant={variant} className="text-[10px] px-1.5 py-0">
              AI Alert
            </Badge>
            <span className="text-[10px] text-muted-foreground">
              {new Date(latest.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-sm">{latest.message}</p>
          <p className="text-[10px] text-muted-foreground mt-1">Tap to dismiss</p>
        </div>
      </div>
    </div>
  );
}
