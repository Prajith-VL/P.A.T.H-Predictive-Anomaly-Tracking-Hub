"use client";

import { useRouter } from "next/navigation";
import { usePath } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SOSButton({ className }: { className?: string }) {
  const router = useRouter();
  const { sosActive } = usePath();

  // Navigate to the full SOS screen, which triggers SOS on mount (PRD §8 Feature 4).
  const handleSOS = () => router.push("/sos");

  return (
    <Button
      size="lg"
      variant="destructive"
      onClick={handleSOS}
      disabled={sosActive}
      className={cn(
        "relative rounded-full px-8 py-6 text-lg font-bold uppercase tracking-wider shadow-lg shadow-destructive/30",
        sosActive && "animate-pulse",
        className,
      )}
    >
      {sosActive ? (
        <span className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inset-0 rounded-full bg-white animate-ping" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
          </span>
          SOS Active
        </span>
      ) : (
        "SOS"
      )}
    </Button>
  );
}
