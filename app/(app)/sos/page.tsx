"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { usePath } from "@/lib/store";
import { DEMO_DRIVER } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn, formatClock } from "@/lib/utils";
import {
  Users,
  LayoutDashboard,
  Siren,
  MapPin,
  Check,
  X,
  Phone,
} from "lucide-react";

// PRD §8 Feature 4 — SOS Emergency System.
// Four actions execute in sequence on this screen:
//   1. Alert trusted contacts
//   2. Alert PATH dashboard
//   3. Simulate police notification
//   4. Share current location
type Step = "contacts" | "dashboard" | "police" | "location" | "done";

const STEPS: { key: Step; label: string; icon: typeof Users; detail: string }[] = [
  { key: "contacts", label: "Alerting Trusted Contacts", icon: Users, detail: "Live location + driver details sent" },
  { key: "dashboard", label: "Alerting PATH Dashboard", icon: LayoutDashboard, detail: "Incident flagged for monitoring" },
  { key: "police", label: "Simulating Police Notification", icon: Siren, detail: "112 emergency channel notified" },
  { key: "location", label: "Sharing Current Location", icon: MapPin, detail: "GPS coordinates broadcast" },
];

export default function SOSPage() {
  const router = useRouter();
  const { sosActive, triggerSos, resolveSos, currentLocationLabel, contacts, resetRide } =
    usePath();

  const [stepIdx, setStepIdx] = useState(0);
  const [triggeredAt] = useState(() => Date.now());

  // Trigger SOS on mount if not already active (PRD §15 Rule 4 → High Risk).
  useEffect(() => {
    if (!sosActive) triggerSos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Advance through the 4 actions, one every ~1.4s, mirroring a cascade.
  useEffect(() => {
    if (stepIdx >= STEPS.length) return;
    const t = setTimeout(() => setStepIdx((i) => i + 1), 1400);
    return () => clearTimeout(t);
  }, [stepIdx]);

  const allDone = stepIdx >= STEPS.length;

  const handleResolve = () => {
    resolveSos();
    resetRide();
    router.push("/dashboard");
  };

  const elapsedSec = Math.floor((Date.now() - triggeredAt) / 1000);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-destructive text-destructive-foreground">
      {/* Pulsing backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(var(--destructive)),transparent_60%)]" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inset-0 rounded-full bg-white animate-ping" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
          </span>
          <span className="font-bold tracking-widest">SOS ACTIVE</span>
        </div>
        <span className="text-sm tabular-nums opacity-90">+{elapsedSec}s</span>
      </div>

      {/* Body */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-4">
        <h1 className="text-2xl font-bold mb-1">Emergency Alert Sent</h1>
        <p className="text-sm opacity-90 mb-1">
          Your live location and ride details are being shared.
        </p>
        <p className="text-xs opacity-75 mb-6">
          <MapPin className="inline h-3 w-3 mr-1" />
          {currentLocationLabel}
        </p>

        {/* Cascade of actions */}
        <div className="space-y-3">
          {STEPS.map((step, i) => {
            const state =
              i < stepIdx ? "done" : i === stepIdx ? "active" : "pending";
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-3 backdrop-blur-sm transition-colors",
                  state === "done" && "border-white/30 bg-white/10",
                  state === "active" && "border-white/60 bg-white/15",
                  state === "pending" && "border-white/10 bg-white/5 opacity-60",
                )}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                  {state === "done" ? (
                    <Check className="h-5 w-5" />
                  ) : state === "active" ? (
                    <step.icon className="h-5 w-5 animate-pulse" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{step.label}</p>
                  <p className="text-xs opacity-80">{step.detail}</p>
                </div>
                {state === "done" && (
                  <span className="text-xs font-medium opacity-90">Sent</span>
                )}
                {state === "active" && (
                  <span className="text-xs opacity-90 animate-pulse">Sending…</span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Trusted contacts receiving the alert */}
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <p className="text-xs uppercase tracking-wider opacity-75 mb-2">
              Trusted Contacts Notified
            </p>
            <div className="space-y-2">
              {contacts.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm"
                >
                  <Phone className="h-3.5 w-3.5 opacity-80" />
                  <span className="font-medium">{c.name}</span>
                  <span className="opacity-75">· {c.relationship}</span>
                  <span className="ml-auto text-xs opacity-80">{c.phone}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer actions */}
      <div className="relative z-10 px-6 pb-8 pt-4 space-y-2">
        <p className="text-center text-xs opacity-80">
          {allDone ? "All emergency channels notified." : "Notifying emergency channels…"}
        </p>
        <Button
          variant="secondary"
          className="w-full h-12 text-base"
          onClick={handleResolve}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel SOS & End Ride
        </Button>
        <a href="tel:112" className="block">
          <Button className="w-full h-12 text-base bg-white text-destructive hover:bg-white/90">
            <Phone className="h-4 w-4 mr-2" />
            Call 112 Directly
          </Button>
        </a>
      </div>
    </div>
  );
}
