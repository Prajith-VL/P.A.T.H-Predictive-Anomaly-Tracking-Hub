import { Shield } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  size = "default",
  className,
}: {
  size?: "default" | "large";
  className?: string;
}) {
  const iconSize = size === "large" ? "h-8 w-8" : "h-5 w-5";
  const textSize = size === "large" ? "text-2xl" : "text-lg";
  return (
    <Link href="/" className={cn("flex items-center gap-2 font-bold tracking-tight", className)}>
      <Shield className={`${iconSize} text-primary`} />
      <span className={textSize}>PATH</span>
    </Link>
  );
}
