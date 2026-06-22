"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  QrCode,
  Users,
  UserCircle,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/scan", icon: QrCode, label: "Scan" },
  { href: "/contacts", icon: Users, label: "Contacts" },
  { href: "/profile", icon: UserCircle, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur-md pb-safe">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6 sm:px-12">
        {NAV_ITEMS.map((item) => {
          // Special case for dashboard to not highlight on sub-routes
          const active = item.href === "/dashboard" 
            ? pathname === "/dashboard" 
            : pathname.startsWith(item.href);
            
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <item.icon className={cn("h-5 w-5 transition-transform", active && "scale-110 fill-primary/10")} />
              <span className={cn("text-[10px] font-medium tracking-wide", active && "font-bold")}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
