"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, MapPin, Bell } from "lucide-react";

const ALERTS_LOG = [
  { id: "A-101", type: "sos", severity: "high", ride_id: "R-9921", user: "Ananya Sharma", time: "Just now", message: "SOS triggered near Connaught Place. Contacts notified.", location: "Connaught Place" },
  { id: "A-100", type: "long_stop", severity: "medium", ride_id: "R-9854", user: "Vikram Singh", time: "12m ago", message: "Vehicle stationary for 6 minutes.", location: "Moolchand" },
  { id: "A-099", type: "route_deviation", severity: "medium", ride_id: "R-9850", user: "Neha Gupta", time: "45m ago", message: "Route deviation > 500m detected.", location: "AIIMS" },
];

export default function AdminAlertsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Safety Monitoring & Alerts</h1>
          <p className="text-muted-foreground mt-1">Log of all SOS incidents and AI-triggered risk alerts.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-muted-foreground" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ALERTS_LOG.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg border ${
                  alert.severity === "high" 
                    ? "bg-destructive/10 border-destructive/20" 
                    : "bg-warning/10 border-warning/20"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="mt-1">
                      <AlertTriangle className={`w-5 h-5 ${alert.severity === "high" ? "text-destructive" : "text-warning"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={alert.severity === "high" ? "destructive" : "warning"} className="text-[10px]">
                          {alert.type.replace("_", " ").toUpperCase()}
                        </Badge>
                        <span className="font-semibold text-sm">Ride {alert.ride_id}</span>
                        <span className="text-xs text-muted-foreground hidden sm:inline-block">• {alert.user}</span>
                      </div>
                      <p className="text-sm font-medium">{alert.message}</p>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {alert.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {alert.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-xs font-mono text-muted-foreground">ID: {alert.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
