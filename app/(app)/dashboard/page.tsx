"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { usePath } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  QrCode,
  MapPin,
  Users,
  History,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Map,
  Briefcase,
  Home as HomeIcon,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const QUICK_ACTIONS = [
  {
    icon: QrCode,
    label: "Scan QR",
    desc: "Verify driver",
    href: "/scan",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: MapPin,
    label: "Active Ride",
    desc: "Live tracking",
    href: "/ride",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: History,
    label: "Ride History",
    desc: "Past trips",
    href: "/replay",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Users,
    label: "Contacts",
    desc: "Trusted people",
    href: "/contacts",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    icon: ShieldCheck,
    label: "Safety Center",
    desc: "Tips & help",
    href: "#",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, completedRideIds, triggerSos } = usePath();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      
      {/* LEFT COLUMN */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <button onClick={() => router.push("/profile")} className="relative focus:outline-none rounded-full">
            <Avatar className="h-16 w-16 shadow-sm border border-border">
              <AvatarImage src={user?.photo_url} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background bg-success"></span>
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome, {user?.name?.split(" ")[0]} <span className="inline-block animate-bounce origin-bottom">👋</span>
            </h1>
            <p className="text-muted-foreground font-medium flex items-center gap-1 mt-0.5">
              Stay safe on every ride <span className="text-primary">💜</span>
            </p>
          </div>
        </motion.div>

        {/* Destination Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Note: In a real app with exact image assets, this card would use background-image: url('/assets/destination-bg.png') */}
          <Card className="overflow-hidden border-primary/10 shadow-sm relative bg-card">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
            <CardContent className="p-6 relative z-10">
              <h2 className="font-bold text-lg mb-4">Where are you headed?</h2>
              
              <div className="flex gap-3 mb-5 max-w-md">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                  <Input 
                    placeholder="Enter destination" 
                    className="pl-10 h-12 bg-background border-border/50 text-base rounded-xl shadow-sm"
                  />
                </div>
                <Button className="h-12 w-12 rounded-xl shrink-0 shadow-md">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="rounded-xl border-border/50 bg-background/50 backdrop-blur-sm h-10 px-4 hover:bg-muted font-semibold">
                  <HomeIcon className="h-4 w-4 mr-2 text-primary" /> Home
                </Button>
                <Button variant="outline" className="rounded-xl border-border/50 bg-background/50 backdrop-blur-sm h-10 px-4 hover:bg-muted font-semibold">
                  <Briefcase className="h-4 w-4 mr-2 text-primary" /> Work
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between px-1">
            <h2 className="font-bold text-xl tracking-tight">Quick Actions</h2>
            <Button variant="link" className="text-primary font-semibold p-0 h-auto">See all</Button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x px-1">
            {QUICK_ACTIONS.map((action, i) => (
              <motion.div
                key={action.label}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="snap-start shrink-0"
              >
                <button
                  onClick={() => router.push(action.href)}
                  className="flex flex-col items-center justify-center p-4 h-[120px] w-[100px] rounded-2xl bg-card border shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className={cn("p-3 rounded-2xl mb-3", action.bg, action.color)}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[13px] font-bold leading-tight mb-1">{action.label}</span>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">{action.desc}</span>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SOS Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-destructive/10 via-destructive/5 to-transparent rounded-3xl p-5 border border-destructive/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center font-bold text-lg shrink-0 shadow-md shadow-destructive/20">
                SOS
              </div>
              <div>
                <h3 className="font-bold text-foreground">Emergency help, just a tap away</h3>
                <p className="text-sm text-muted-foreground mt-0.5 max-w-[200px] sm:max-w-xs">
                  We're here to protect you, anytime, anywhere.
                </p>
              </div>
            </div>
            <Button 
              variant="destructive" 
              className="rounded-full px-6 font-bold shadow-md hover:shadow-lg transition-all"
              onClick={() => {
                triggerSos();
                router.push("/ride");
              }}
            >
              Quick SOS <ShieldAlert className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="lg:col-span-5 space-y-8">
        
        {/* Safety Score Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Note: safety-shield.png would be embedded as an absolute image here */}
          <Card className="border-primary/10 shadow-sm bg-card overflow-hidden relative">
            <CardContent className="p-8">
              <div className="flex justify-between items-start">
                <div className="z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <h2 className="font-bold text-lg">Your Safety Score</h2>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-black text-primary tracking-tighter">92</span>
                    <span className="text-xl text-muted-foreground font-bold">/100</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium max-w-[200px] mb-6">
                    Great! You're taking smart & safe rides.
                  </p>
                  
                  <Progress value={92} className="h-2 w-full max-w-[200px] bg-primary/20 [&>div]:bg-primary" />
                </div>

                {/* CSS Approximate Illustration */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl" />
                  <div className="relative">
                    <ShieldCheck className="w-32 h-32 text-primary drop-shadow-xl" fill="currentColor" opacity={0.9} />
                    <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-primary animate-pulse" />
                    <Sparkles className="absolute bottom-4 -left-6 w-6 h-6 text-primary/50 animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button variant="link" className="text-primary font-bold pr-0 group">
                  View details <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Plan Journey Banner */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
           {/* Note: plan-journey.png would go here */}
          <Card className="border-primary/10 shadow-sm bg-card relative overflow-hidden h-[240px]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-primary/10 dark:from-indigo-950/20 dark:to-primary/5" />
            
            <CardContent className="p-8 h-full flex flex-col justify-center relative z-10">
              <h3 className="text-xl font-bold mb-2">Plan your safe journey</h3>
              <p className="text-sm text-muted-foreground font-medium mb-6 max-w-[220px]">
                Enter your destination to get safe route suggestions
              </p>
              <div>
                <Button className="rounded-xl font-bold shadow-md px-6">
                  Plan Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>

            {/* CSS approximate graphic for the Map/Woman */}
            <div className="absolute right-4 bottom-4 w-40 h-40 opacity-40 pointer-events-none">
               <Map className="w-full h-full text-primary" />
            </div>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
