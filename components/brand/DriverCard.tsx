"use client";

import type { Driver } from "@/lib/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrustScoreRing } from "./TrustScoreRing";
import { Shield, Star, Phone } from "lucide-react";

export function DriverCard({ driver }: { driver: Driver }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex gap-4">
          <Avatar className="h-16 w-16 ring-2 ring-primary/20">
            <AvatarImage src={driver.photo_url} alt={driver.name} />
            <AvatarFallback className="text-lg">{driver.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{driver.name}</h3>
              {driver.verification_status === "verified" && (
                <Badge variant="success" className="gap-1">
                  <Shield className="h-3 w-3" /> Verified
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <p className="text-muted-foreground">Vehicle</p>
              <p className="font-medium">{driver.vehicle_number}</p>
              <p className="text-muted-foreground">Type</p>
              <p className="font-medium">{driver.vehicle_type}</p>
              <p className="text-muted-foreground">Rating</p>
              <p className="font-medium flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                {driver.rating.toFixed(1)}
              </p>
              <p className="text-muted-foreground">Safe Rides</p>
              <p className="font-medium">{driver.safe_rides}+</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <TrustScoreRing score={driver.trust_score} size={80} />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{driver.emergency_contact}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
