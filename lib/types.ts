// Core domain types for PATH — mirror the PRD §12 database design.

export type VerificationStatus = "verified" | "pending" | "suspended";

export interface Driver {
  id: string;
  name: string;
  photo_url: string;
  vehicle_number: string;
  vehicle_type: "Auto Rickshaw" | "E-Rickshaw" | "Cab" | "Bike";
  rating: number; // 0-5
  trust_score: number; // 0-100
  verification_status: VerificationStatus;
  safe_rides: number;
  emergency_contact: string;
  qr_code: string;
}

export type AlertType =
  | "route_deviation"
  | "long_stop"
  | "excess_duration"
  | "sos";

export type Severity = "low" | "medium" | "high";

export interface SafetyAlert {
  id: string;
  ride_id: string;
  alert_type: AlertType;
  severity: Severity;
  message: string;
  timestamp: number;
  acknowledged?: boolean;
}

export type RideStatus = "active" | "completed" | "sos";

export type RiskLevel = "low" | "medium" | "high";

export interface RideLocation {
  lat: number;
  lng: number;
  // Map-space coordinates (0-100 viewBox) used by the mock map.
  x: number;
  y: number;
  timestamp: number;
}

export interface Ride {
  id: string;
  user_id: string;
  driver_id: string;
  start_time: number;
  end_time?: number;
  status: RideStatus;
  risk_level: RiskLevel;
  route_deviation: number; // meters
  start_label: string;
  end_label: string;
  stops: { label: string; x: number; y: number }[];
}

export interface TrustedContact {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  photo_url: string;
  created_at: number;
}

export type RidePhase =
  | "idle"
  | "scanning"
  | "verified"
  | "active"
  | "completed";

// A point along the mock-map route polyline (viewBox 0..100).
export interface MapPoint {
  x: number;
  y: number;
}
