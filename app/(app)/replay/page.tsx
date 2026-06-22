"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MockMap } from "@/components/brand/MockMap";
import { ArrowLeft, MapPin, AlertTriangle, CheckCircle2, Navigation } from "lucide-react";
import { usePath } from "@/lib/store";

const REPLAY_EVENTS = [
  { id: 1, time: "18:42", label: "Ride Started", desc: "Rajiv Chowk Metro Station", icon: Navigation, color: "text-primary bg-primary/10" },
  { id: 2, time: "18:49", label: "Route Deviation", desc: "Vehicle 620m off path", icon: AlertTriangle, color: "text-warning bg-warning/10" },
  { id: 3, time: "18:52", label: "Long Stop", desc: "Traffic signal, Connaught Place", icon: AlertTriangle, color: "text-warning bg-warning/10" },
  { id: 4, time: "19:05", label: "Ride Completed", desc: "Home, Greater Kailash II", icon: CheckCircle2, color: "text-success bg-success/10" },
];

export default function RouteReplayPage() {
  const router = useRouter();
  const { resetRide } = usePath();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleBack = () => {
    resetRide();
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-background z-10">
        <Button variant="ghost" size="icon" onClick={handleBack} className="-ml-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="font-semibold">Route Replay</h1>
          <p className="text-xs text-muted-foreground">Today, 18:42 - 19:05</p>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative h-[40vh] border-b">
        <MockMap riskLevel="low" progress={1} />
        {/* Animated Map overlay to simulate replay drawing */}
        <motion.div 
          className="absolute inset-0 bg-background/20 backdrop-blur-[1px] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={isLoaded ? { opacity: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>

      {/* Timeline List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold tracking-tight mb-4">Trip Highlights</h2>
          
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {REPLAY_EVENTS.map((event, index) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                {/* Timeline dot */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 ${event.color}`}>
                  <event.icon className="h-5 w-5" />
                </div>
                
                {/* Content */}
                <Card className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] shadow-none border-border/50">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{event.label}</span>
                      <span className="text-xs text-muted-foreground font-medium">{event.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{event.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
