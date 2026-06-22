"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  children: React.ReactNode;
  title?: string;
}

export function Sheet({ open, onOpenChange, children, title }: SheetProps) {
  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div
        className="relative z-50 mx-auto w-full max-w-lg animate-[slideUp_0.3s_ease-out] rounded-t-2xl border bg-background p-6"
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-muted-foreground/30" />
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">{title}</h3>
            <button onClick={() => onOpenChange(false)} className="rounded-sm opacity-70 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
