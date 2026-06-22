"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEMO_CONTACTS,
  DEMO_DRIVER,
  DEMO_USER,
  EXPECTED_RIDE_SECONDS,
} from "./data";
import type {
  RidePhase,
  SafetyAlert,
  TrustedContact,
  User,
} from "./types";

// ---------------------------------------------------------------------------
// AI Safety Engine (PRD §15). A scripted timeline mirrors the Demo Flow:
// Step 6 driver deviates -> Rule 1 alert -> Step 7 AI alert -> Step 8 SOS.
// Fires as ride progress crosses thresholds.
// ---------------------------------------------------------------------------

export interface ScriptedAlert {
  atProgress: number; // fire when progress >= this value
  alert_type: SafetyAlert["alert_type"];
  severity: SafetyAlert["severity"];
  message: string;
  fired?: boolean;
}

export const SCRIPTED_ALERTS: ScriptedAlert[] = [
  {
    atProgress: 0.42,
    alert_type: "route_deviation",
    severity: "medium",
    message: "Route deviation detected. Vehicle is ~620m off the expected path.",
  },
  {
    atProgress: 0.66,
    alert_type: "long_stop",
    severity: "medium",
    message: "Vehicle stationary for 6 minutes at Connaught Place.",
  },
  {
    atProgress: 0.82,
    alert_type: "excess_duration",
    severity: "medium",
    message: "Trip duration exceeds expected duration by 22%.",
  },
];

interface PathState {
  // auth
  user: User | null;
  isAuthed: boolean;

  // ride state machine (PRD §7)
  phase: RidePhase;
  activeDriverId: string | null;
  rideStartTs: number | null;
  rideProgress: number; // 0..1 along route
  currentLocationLabel: string;

  // safety
  alerts: SafetyAlert[];
  riskLevel: "low" | "medium" | "high";
  sosActive: boolean;

  // contacts (PRD Feature 3 — max 3)
  contacts: TrustedContact[];

  // history
  completedRideIds: string[];
  lastRating: number | null;

  // actions
  loginAs: (u: User) => void;
  logout: () => void;

  beginScan: () => void;
  resolveDriver: (driverId: string) => void;
  startRide: () => void;
  tickProgress: (delta: number) => void;
  endRide: () => void;
  resetRide: () => void;

  triggerSos: () => void;
  resolveSos: () => void;
  acknowledgeAlert: (id: string) => void;

  addContact: (c: Omit<TrustedContact, "id" | "user_id">) => void;
  removeContact: (id: string) => void;
  setRating: (r: number) => void;
}

const START_LABEL = "Rajiv Chowk Metro Station";
const END_LABEL = "Home · Greater Kailash II";

export const usePath = create<PathState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthed: false,
      phase: "idle",
      activeDriverId: null,
      rideStartTs: null,
      rideProgress: 0,
      currentLocationLabel: START_LABEL,
      alerts: [],
      riskLevel: "low",
      sosActive: false,
      contacts: DEMO_CONTACTS,
      completedRideIds: [],
      lastRating: null,

      loginAs: (u) => set({ user: u, isAuthed: true }),
      logout: () =>
        set({
          user: null,
          isAuthed: false,
          phase: "idle",
          activeDriverId: null,
          rideProgress: 0,
          rideStartTs: null,
          alerts: [],
          sosActive: false,
        }),

      beginScan: () => set({ phase: "scanning", activeDriverId: null }),

      resolveDriver: (driverId) =>
        set({ phase: "verified", activeDriverId: driverId }),

      startRide: () => {
        const { phase } = get();
        if (phase !== "verified" && phase !== "idle") return;
        set({
          phase: "active",
          rideStartTs: Date.now(),
          rideProgress: 0,
          alerts: [],
          riskLevel: "low",
          currentLocationLabel: START_LABEL,
          sosActive: false,
        });
      },

      tickProgress: (delta) => {
        const { phase, rideProgress, alerts } = get();
        if (phase !== "active") return;
        const next = Math.min(1, rideProgress + delta);

        // Fire scripted alerts whose threshold we just crossed.
        const newAlerts: SafetyAlert[] = [];
        for (const s of SCRIPTED_ALERTS) {
          const already = alerts.some((a) => a.alert_type === s.alert_type);
          if (!already && next >= s.atProgress) {
            newAlerts.push({
              id: `a_${s.alert_type}_${Date.now()}`,
              ride_id: "r_active",
              alert_type: s.alert_type,
              severity: s.severity,
              message: s.message,
              timestamp: Date.now(),
            });
          }
        }

        // PRD §15 risk escalation: any medium alert -> medium; SOS -> high.
        const allAlerts = [...alerts, ...newAlerts];
        const hasMedium = allAlerts.some((a) => a.severity === "medium");
        const risk: "low" | "medium" | "high" = get().sosActive
          ? "high"
          : hasMedium
            ? "medium"
            : "low";

        const label =
          next >= 0.95
            ? END_LABEL
            : next >= 0.6
              ? "Connaught Place"
              : next >= 0.3
                ? "Barakhamba Road"
                : START_LABEL;

        const patch: Partial<PathState> = {
          rideProgress: next,
          currentLocationLabel: label,
          riskLevel: risk,
        };
        if (newAlerts.length) patch.alerts = allAlerts;

        // Auto-complete at end of route.
        if (next >= 1) {
          patch.phase = "completed";
        }
        set(patch);
      },

      endRide: () =>
        set((s) => ({
          phase: "completed",
          rideProgress: 1,
          completedRideIds: [...s.completedRideIds, "r_active"],
        })),

      resetRide: () =>
        set({
          phase: "idle",
          activeDriverId: null,
          rideStartTs: null,
          rideProgress: 0,
          alerts: [],
          riskLevel: "low",
          sosActive: false,
          currentLocationLabel: START_LABEL,
        }),

      triggerSos: () => {
        // PRD §15 Rule 4 — SOS -> High Risk Alert.
        const sosAlert: SafetyAlert = {
          id: `a_sos_${Date.now()}`,
          ride_id: "r_active",
          alert_type: "sos",
          severity: "high",
          message: "SOS triggered. Trusted contacts and PATH dashboard notified.",
          timestamp: Date.now(),
        };
        set((s) => ({
          sosActive: true,
          riskLevel: "high",
          alerts: [...s.alerts, sosAlert],
        }));
      },

      resolveSos: () => set({ sosActive: false }),

      acknowledgeAlert: (id) =>
        set((s) => ({
          alerts: s.alerts.map((a) =>
            a.id === id ? { ...a, acknowledged: true } : a,
          ),
        })),

      addContact: (c) => {
        if (get().contacts.length >= 3) return; // PRD Feature 3: max 3
        set((s) => ({
          contacts: [
            ...s.contacts,
            { ...c, id: `c_${Date.now()}`, user_id: DEMO_USER.id },
          ],
        }));
      },

      removeContact: (id) =>
        set((s) => ({ contacts: s.contacts.filter((c) => c.id !== id) })),

      setRating: (r) => set({ lastRating: r }),
    }),
    {
      name: "path-store-v1",
      partialize: (s) => ({
        user: s.user,
        isAuthed: s.isAuthed,
        contacts: s.contacts,
        completedRideIds: s.completedRideIds,
        lastRating: s.lastRating,
        // Ride state is ephemeral; don't persist active rides.
      }),
    },
  ),
);

// Convenience selector for the demo's primary driver.
export const DEMO = { DRIVER: DEMO_DRIVER, USER: DEMO_USER, EXPECTED_RIDE_SECONDS };
