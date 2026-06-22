"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Car, AlertTriangle, ShieldCheck, Activity, MapPin } from "lucide-react";
import { DEMO_DRIVER } from "@/lib/data";

const METRICS = [
  { label: "Active Users", value: "2,543", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Live Rides", value: "128", icon: Car, color: "text-primary", bg: "bg-primary/10" },
  { label: "Route Deviations", value: "3", icon: MapPin, color: "text-warning", bg: "bg-warning/10" },
  { label: "SOS Alerts", value: "1", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
];

const ACTIVE_RIDES = [
  { id: "R-9921", user: "Ananya Sharma", driver: DEMO_DRIVER.name, status: "deviated", location: "Connaught Place", time: "4m ago" },
  { id: "R-9922", user: "Vikram Singh", driver: "Rajeev T.", status: "on_track", location: "Saket", time: "12m ago" },
  { id: "R-9923", user: "Neha Gupta", driver: "Sunita Devi", status: "on_track", location: "Hauz Khas", time: "15m ago" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Real-time monitoring of all active rides and alerts.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
              </div>
              <div className={`p-3 rounded-full ${metric.bg}`}>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Rides Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Live Active Rides</CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              {ACTIVE_RIDES.map((ride) => (
                <div key={ride.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-card/50">
                  <div className="grid gap-1">
                    <span className="font-semibold">{ride.user} <span className="text-muted-foreground font-normal mx-1">with</span> {ride.driver}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {ride.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 mt-3 sm:mt-0">
                    <Badge variant={ride.status === "deviated" ? "warning" : "secondary"}>
                      {ride.status === "deviated" ? "Deviated" : "On Track"}
                    </Badge>
                    <span className="text-xs text-muted-foreground w-12 text-right">{ride.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="border-destructive/20 shadow-sm shadow-destructive/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <Badge variant="destructive" className="text-[10px]">SOS TRIGGERED</Badge>
                  <span className="text-xs text-muted-foreground">Just now</span>
                </div>
                <p className="text-sm font-medium mt-2">Ride R-9921</p>
                <p className="text-xs text-muted-foreground mt-1">User triggered SOS near Connaught Place. Trusted contacts notified.</p>
              </div>
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <Badge variant="warning" className="text-[10px]">LONG STOP</Badge>
                  <span className="text-xs text-muted-foreground">12m ago</span>
                </div>
                <p className="text-sm font-medium mt-2">Ride R-9854</p>
                <p className="text-xs text-muted-foreground mt-1">Vehicle stationary for 6 minutes.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
