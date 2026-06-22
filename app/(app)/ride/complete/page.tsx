"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { usePath } from "@/lib/store";
import { DEMO_DRIVER, findDriver } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RideCompletePage() {
  const router = useRouter();
  const { activeDriverId, setRating } = usePath();
  const driver = activeDriverId ? findDriver(activeDriverId) : DEMO_DRIVER;
  
  const [rating, setLocalRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  const handleSubmit = () => {
    if (rating > 0) {
      setRating(rating);
    }
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-transparent to-primary/5 opacity-70 pointer-events-none" />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10 space-y-8">
        
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
          className="rounded-full bg-success/20 p-4"
        >
          <CheckCircle2 className="w-16 h-16 text-success" />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold tracking-tight">Ride Completed</h1>
          <p className="text-muted-foreground mt-2">You have reached your destination safely.</p>
        </motion.div>

        {/* Driver Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-sm"
        >
          <Card className="border-border bg-card/50 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <Avatar className="h-12 w-12 border border-primary/10">
                <AvatarImage src={driver?.photo_url} alt={driver?.name} />
                <AvatarFallback>{driver?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-semibold text-sm">{driver?.name}</p>
                <p className="text-xs text-muted-foreground">{driver?.vehicle_number}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rating */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <p className="text-sm font-medium">How was your ride?</p>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setLocalRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={cn(
                    "w-8 h-8 transition-colors",
                    star <= (hovered || rating)
                      ? "fill-warning text-warning"
                      : "text-muted-foreground/30"
                  )}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Bottom Actions */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", bounce: 0.2, delay: 0.5 }}
        className="p-4 bg-background border-t space-y-3 z-10 pb-8"
      >
        <Button 
          className="w-full h-12 text-lg" 
          onClick={handleSubmit}
          disabled={rating === 0}
        >
          Submit Rating
        </Button>
        <Button 
          variant="ghost" 
          className="w-full group"
          onClick={() => router.push("/replay")}
        >
          View Route Replay
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </div>
  );
}
