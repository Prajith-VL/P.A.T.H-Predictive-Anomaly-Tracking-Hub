"use client";

import { usePath } from "@/lib/store";
import { useRouter, usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { BottomNav } from "./BottomNav";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Bell, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, isAuthed, sosActive } = usePath();
  const router = useRouter();
  const pathname = usePathname();
  const isRide = pathname === "/ride" || pathname === "/sos";

  React.useEffect(() => {
    if (!isAuthed) router.replace("/login");
  }, [isAuthed, router]);

  if (!isAuthed || !user) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background/50">
      {!isRide && (
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <Logo className="h-6 w-auto text-primary" />
              <span className="font-bold tracking-tight text-xl hidden sm:inline-block">PATH</span>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="relative hidden sm:inline-flex">
                <Bell className="h-5 w-5" />
                {sosActive && (
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive animate-pulse" />
                )}
              </Button>
              <div 
                className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1.5 rounded-full transition-colors"
                onClick={() => router.push("/profile")}
              >
                <Avatar className="h-8 w-8 border border-primary/10">
                  <AvatarImage src={user.photo_url} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
              </div>
            </div>
          </div>
        </header>
      )}

      <main className={cn("flex-1 mx-auto w-full", isRide ? "" : "max-w-6xl px-4 sm:px-6 py-6 pb-24")}>
        {children}
      </main>

      {!isRide && <BottomNav />}
    </div>
  );
}
