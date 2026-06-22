"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { usePath } from "@/lib/store";
import { findDriver } from "@/lib/data";
import { DriverCard } from "@/components/brand/DriverCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play } from "lucide-react";

// PRD §7 Step 3-4 — driver profile view before starting ride.
export default function DriverProfilePage() {
  const params = useParams();
  const router = useRouter();
  const driverId = params.id as string;
  const driver = findDriver(driverId);
  const { startRide, phase } = usePath();

  if (!driver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-muted-foreground">Driver not found.</p>
        <Button variant="outline" onClick={() => router.push("/scan")}>
          Back to Scanner
        </Button>
      </div>
    );
  }

  const handleStart = () => {
    startRide();
    router.push("/ride");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.push("/scan")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Badge>Step 3 — Verify Driver</Badge>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DriverCard driver={driver} />
      </motion.div>

      {/* Verification checklist (PRD §7 Step 4) */}
      <div className="rounded-xl border bg-card p-4 space-y-2">
        <h3 className="text-sm font-semibold mb-2">Verification Checklist</h3>
        {[
          { label: "Driver Name", value: driver.name },
          { label: "Vehicle Number", value: driver.vehicle_number },
          { label: "Trust Score", value: `${driver.trust_score}/100` },
          { label: "Verification Badge", value: driver.verification_status === "verified" ? "✓ Verified" : "✗ Pending" },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>

      {/* PRD §7 Step 5 — Start Ride */}
      <Button className="w-full" size="lg" onClick={handleStart}>
        <Play className="h-5 w-5 mr-2" />
        Start Ride
      </Button>
    </div>
  );
}
