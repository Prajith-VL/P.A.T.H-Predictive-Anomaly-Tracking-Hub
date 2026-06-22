"use client";

import { useRouter } from "next/navigation";
import { usePath } from "@/lib/store";
import { RideSimulator } from "@/components/brand/RideSimulator";
import { AlertBanner } from "@/components/brand/AlertBanner";
import { SOSButton } from "@/components/brand/SOSButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";

// PRD §7 Step 6 — Active ride with live tracking, AI alerts, SOS.
export default function RidePage() {
  const router = useRouter();
  const {
    phase,
    rideProgress,
    currentLocationLabel,
    riskLevel,
    alerts,
    sosActive,
    endRide,
    resolveSos,
    resetRide,
  } = usePath();

  // If not in active or completed phase, redirect.
  React.useEffect(() => {
    if (phase !== "active" && phase !== "completed" && phase !== "verified") {
      router.replace("/scan");
    }
  }, [phase, router]);

  // Auto-redirect when ride completes.
  React.useEffect(() => {
    if (phase === "completed") {
      const t = setTimeout(() => router.push("/ride/complete"), 2000);
      return () => clearTimeout(t);
    }
  }, [phase, router]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            endRide();
            router.push("/ride/complete");
          }}
        >
          <X className="h-5 w-5" />
        </Button>
        <Badge
          variant={riskLevel === "high" ? "destructive" : riskLevel === "medium" ? "warning" : "default"}
        >
          {riskLevel === "high" ? "⚠ HIGH RISK" : riskLevel === "medium" ? "⚡ RISK DETECTED" : "✓ MONITORING"}
        </Badge>
        <div className="w-9" />
      </div>

      {/* Map + simulator */}
      <div className="flex-1 relative">
        <RideSimulator />
      </div>

      {/* Alert banner */}
      <AlertBanner className="mx-0 rounded-none border-x-0 border-b" />

      {/* Bottom controls */}
      <div className="px-4 py-4 space-y-3 border-t bg-background">
        {/* SOS */}
        <div className="flex justify-center">
          <SOSButton />
        </div>

        {/* End ride */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            endRide();
            router.push("/ride/complete");
          }}
        >
          End Ride
        </Button>
      </div>
    </div>
  );
}

import React from "react";
