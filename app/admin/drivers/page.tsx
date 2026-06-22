"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DEMO_DRIVERS } from "@/lib/data";
import { CheckCircle2, Ban, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminDriversPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Driver Management</h1>
          <p className="text-muted-foreground mt-1">Verify, suspend, and view driver ratings.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search drivers..." className="pl-9" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Drivers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b bg-muted/50 p-4 text-sm font-medium text-muted-foreground hidden md:grid">
              <div className="col-span-4">Driver Profile</div>
              <div className="col-span-3">Vehicle Details</div>
              <div className="col-span-2">Trust Score</div>
              <div className="col-span-3 text-right">Actions</div>
            </div>
            <div className="divide-y">
              {DEMO_DRIVERS.map((driver) => (
                <div key={driver.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                  <div className="col-span-1 md:col-span-4 flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={driver.photo_url} />
                      <AvatarFallback>{driver.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{driver.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Badge variant={driver.verification_status === "verified" ? "secondary" : "outline"} className="text-[10px] h-4 px-1">
                          {driver.verification_status.toUpperCase()}
                        </Badge>
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-3">
                    <p className="text-sm font-medium">{driver.vehicle_number}</p>
                    <p className="text-xs text-muted-foreground">{driver.vehicle_type}</p>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-sm font-medium text-success">{driver.trust_score}/100</p>
                    <p className="text-xs text-muted-foreground">{driver.safe_rides} safe rides</p>
                  </div>
                  <div className="col-span-1 md:col-span-3 flex items-center md:justify-end gap-2">
                    <Button variant="outline" size="sm" className="w-full md:w-auto text-success hover:text-success">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Verify
                    </Button>
                    <Button variant="outline" size="sm" className="w-full md:w-auto text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Ban className="w-4 h-4 mr-1" /> Suspend
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
