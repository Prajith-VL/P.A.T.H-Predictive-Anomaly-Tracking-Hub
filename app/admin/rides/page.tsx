"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Navigation } from "lucide-react";
import { DEMO_DRIVER } from "@/lib/data";

const ACTIVE_RIDES = [
  { id: "R-9921", user: "Ananya Sharma", driver: DEMO_DRIVER.name, status: "deviated", location: "Connaught Place", time: "4m ago", route: "Rajiv Chowk -> GK II" },
  { id: "R-9922", user: "Vikram Singh", driver: "Rajeev T.", status: "on_track", location: "Saket", time: "12m ago", route: "Saket Metro -> Pushp Vihar" },
  { id: "R-9923", user: "Neha Gupta", driver: "Sunita Devi", status: "on_track", location: "Hauz Khas", time: "15m ago", route: "Hauz Khas -> Green Park" },
];

const RIDE_HISTORY = [
  { id: "R-9920", user: "Rahul Desai", driver: DEMO_DRIVER.name, status: "completed", time: "1h ago", duration: "18m", route: "Lajpat Nagar -> South Ex" },
  { id: "R-9919", user: "Priya Sharma", driver: "Amit K.", status: "completed", time: "2h ago", duration: "24m", route: "Nehru Place -> Kalkaji" },
];

export default function AdminRidesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ride Monitoring</h1>
          <p className="text-muted-foreground mt-1">Live active rides and historical trip data.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search rides by ID or user..." className="pl-9" />
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Live Active Rides ({ACTIVE_RIDES.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ACTIVE_RIDES.map((ride) => (
                <div key={ride.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-card/50 gap-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="font-semibold">{ride.user}</p>
                      <p className="text-xs text-muted-foreground">with {ride.driver}</p>
                    </div>
                    <div>
                      <p className="text-sm flex items-center gap-1"><Navigation className="w-3 h-3" /> {ride.route}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> {ride.location}</p>
                    </div>
                    <div className="flex flex-col justify-center">
                      <Badge variant={ride.status === "deviated" ? "warning" : "secondary"} className="w-fit">
                        {ride.status === "deviated" ? "Deviated" : "On Track"}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right flex items-center md:flex-col justify-between">
                    <span className="text-xs text-muted-foreground">{ride.time}</span>
                    <span className="text-xs font-mono text-muted-foreground">{ride.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ride History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium text-muted-foreground hidden md:grid">
                <div className="col-span-2">Ride ID</div>
                <div className="col-span-3">User & Driver</div>
                <div className="col-span-4">Route</div>
                <div className="col-span-2">Duration</div>
                <div className="col-span-1 text-right">Status</div>
              </div>
              <div className="divide-y">
                {RIDE_HISTORY.map((ride) => (
                  <div key={ride.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 items-center text-sm">
                    <div className="col-span-1 md:col-span-2 font-mono text-muted-foreground">{ride.id}</div>
                    <div className="col-span-1 md:col-span-3">
                      <span className="font-medium">{ride.user}</span>
                      <br /><span className="text-xs text-muted-foreground">{ride.driver}</span>
                    </div>
                    <div className="col-span-1 md:col-span-4 text-muted-foreground">{ride.route}</div>
                    <div className="col-span-1 md:col-span-2 text-muted-foreground">{ride.duration}</div>
                    <div className="col-span-1 md:col-span-1 md:text-right">
                      <Badge variant="outline" className="text-success border-success/20 bg-success/10">Completed</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
