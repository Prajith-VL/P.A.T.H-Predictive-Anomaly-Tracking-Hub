import type { Driver, MapPoint, TrustedContact, User } from "./types";

// PRD §6 — Working Woman, Night-Time Commuter, College Student.
export const DEMO_USER: User = {
  id: "u_001",
  name: "Ananya Sharma",
  email: "ananya.sharma@gmail.com",
  photo_url: "https://i.pravatar.cc/150?img=47",
  created_at: Date.now() - 1000 * 60 * 60 * 24 * 120,
};

// PRD §12 — Drivers table. Two demo drivers, one is the verified demo target.
export const DEMO_DRIVERS: Driver[] = [
  {
    id: "d_100",
    name: "Ramesh Kumar",
    photo_url: "https://i.pravatar.cc/150?img=12",
    vehicle_number: "DL 05 AB 4521",
    vehicle_type: "Auto Rickshaw",
    rating: 4.8,
    trust_score: 92,
    verification_status: "verified",
    safe_rides: 537,
    emergency_contact: "+91 98100 12345",
    qr_code: "PATH-DL05AB4521",
  },
  {
    id: "d_101",
    name: "Sunita Devi",
    photo_url: "https://i.pravatar.cc/150?img=45",
    vehicle_number: "DL 07 EF 9982",
    vehicle_type: "E-Rickshaw",
    rating: 4.9,
    trust_score: 96,
    verification_status: "verified",
    safe_rides: 812,
    emergency_contact: "+91 98200 67890",
    qr_code: "PATH-DL07EF9982",
  },
];

export const DEMO_DRIVER = DEMO_DRIVERS[0];

// PRD §13 — GET /drivers/{id}
export function findDriver(id: string): Driver | undefined {
  return DEMO_DRIVERS.find((d) => d.id === id);
}

// PRD §7 (Step 3-6) — initial trusted contacts (up to 3 per PRD Feature 3).
export const DEMO_CONTACTS: TrustedContact[] = [
  {
    id: "c_1",
    user_id: DEMO_USER.id,
    name: "Priya Sharma",
    phone: "+91 98765 43210",
    relationship: "Sister",
  },
  {
    id: "c_2",
    user_id: DEMO_USER.id,
    name: "Amit Sharma",
    phone: "+91 99100 11223",
    relationship: "Father",
  },
];

// --- Mock-map route polyline (viewBox 0..100) -----------------------------
// A night-time ride: metro station → home, with one mid-way stop.
// The route deviates briefly (PRD AI Rule 1) and pauses (Rule 2).
export const ROUTE_POINTS: MapPoint[] = [
  { x: 12, y: 84 }, // metro station (start)
  { x: 20, y: 76 },
  { x: 26, y: 70 },
  { x: 30, y: 62 },
  { x: 36, y: 55 },
  { x: 42, y: 50 },
  { x: 48, y: 44 },
  { x: 54, y: 40 },
  { x: 60, y: 36 },
  { x: 64, y: 40 }, // deviation begins here (Rule 1)
  { x: 68, y: 46 },
  { x: 72, y: 44 }, // long stop here (Rule 2)
  { x: 76, y: 38 },
  { x: 80, y: 32 },
  { x: 84, y: 26 },
  { x: 88, y: 20 },
  { x: 92, y: 14 }, // home (end)
];

export const ROUTE_STOP = { label: "Traffic signal · Connaught Place", x: 72, y: 44 };

// Expected ride duration in seconds (for AI Rule 3: trip > 120% expected).
export const EXPECTED_RIDE_SECONDS = 540; // ~9 min

// Map a route progress value (0..1) to a point on the polyline.
export function pointAtProgress(progress: number): MapPoint {
  const p = Math.max(0, Math.min(1, progress));
  const segCount = ROUTE_POINTS.length - 1;
  const scaled = p * segCount;
  const i = Math.min(segCount - 1, Math.floor(scaled));
  const t = scaled - i;
  const a = ROUTE_POINTS[i];
  const b = ROUTE_POINTS[i + 1];
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

// Build an SVG `d` path string from the polyline.
export function routePathD(points: MapPoint[] = ROUTE_POINTS): string {
  return points
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`)
    .join(" ");
}
