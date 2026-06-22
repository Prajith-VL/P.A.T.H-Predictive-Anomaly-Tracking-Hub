"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { usePath } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, LogOut, Settings, ShieldCheck, Map, CreditCard } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, completedRideIds, logout } = usePath();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 py-2">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")} className="-ml-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-semibold text-lg">Profile</h1>
      </div>

      <div className="space-y-6 py-4">
        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center space-y-4 py-6"
        >
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src={user?.photo_url} />
            <AvatarFallback className="text-3xl">{user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          <Card className="bg-primary/5 border-primary/10">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary mb-2" />
              <span className="text-2xl font-bold">{completedRideIds.length}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Safe Rides</span>
            </CardContent>
          </Card>
          <Card className="bg-secondary/5 border-secondary/10">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Map className="h-6 w-6 text-secondary mb-2" />
              <span className="text-2xl font-bold">14.2</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Total km</span>
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings Menu */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Settings</h3>
          <Button variant="outline" className="w-full justify-start h-14 font-normal" asChild>
            <div>
              <Settings className="w-5 h-5 mr-3 text-muted-foreground" />
              Account Settings
            </div>
          </Button>
          <Button variant="outline" className="w-full justify-start h-14 font-normal" asChild>
            <div>
              <CreditCard className="w-5 h-5 mr-3 text-muted-foreground" />
              Payment Methods
            </div>
          </Button>
          <Button variant="outline" className="w-full justify-start h-14 font-normal text-destructive hover:text-destructive hover:bg-destructive/5" onClick={handleLogout}>
            <LogOut className="w-5 h-5 mr-3" />
            Log Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
