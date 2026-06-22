import { Shield } from "lucide-react";
import Link from "next/link";

export function Logo({ size = "default" }: { size?: "default" | "large" }) {
  const iconSize = size === "large" ? "h-8 w-8" : "h-5 w-5";
  const textSize = size === "large" ? "text-2xl" : "text-lg";
  return (
    <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
      <Shield className={`${iconSize} text-primary`} />
      <span className={textSize}>PATH</span>
    </Link>
  );
}
