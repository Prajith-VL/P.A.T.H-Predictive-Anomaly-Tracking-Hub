"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { usePath } from "@/lib/store";
import { DEMO_DRIVER } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QrCode, Camera } from "lucide-react";

// Mock QR scanner — simulates scanning and resolves to the demo driver (PRD §7 Step 2).
export default function ScanPage() {
  const router = useRouter();
  const { beginScan, resolveDriver, phase } = usePath();
  const [scanning, setScanning] = useState(false);
  const [found, setFound] = useState(false);

  useEffect(() => {
    beginScan();
  }, [beginScan]);

  useEffect(() => {
    if (!scanning) return;
    const timer = setTimeout(() => {
      setFound(true);
      resolveDriver(DEMO_DRIVER.id);
    }, 2500); // simulate scan time
    return () => clearTimeout(timer);
  }, [scanning, resolveDriver]);

  const handleStartScan = () => {
    setScanning(true);
    setFound(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6">
      <div className="text-center">
        <Badge className="mb-3">Feature 1</Badge>
        <h1 className="text-2xl font-bold">QR Driver Verification</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Scan the driver&apos;s QR code to verify identity (PRD §8)
        </p>
      </div>

      {/* Scanner viewport */}
      <div className="relative w-64 h-64 rounded-2xl border-2 border-dashed border-primary/30 bg-muted/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {!scanning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 text-muted-foreground"
            >
              <QrCode className="h-12 w-12" />
              <p className="text-sm">Tap below to start scanning</p>
            </motion.div>
          )}

          {scanning && !found && (
            <>
              {/* Animated scan line */}
              <motion.div
                className="absolute inset-x-4 top-0 h-0.5 bg-primary scanline-gradient"
                animate={{ y: [0, 240, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Corner markers */}
              <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-primary rounded-tl" />
              <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-primary rounded-tr" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-primary rounded-bl" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-primary rounded-br" />
            </>
          )}

          {found && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center">
                <svg className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-medium text-success">Driver Found!</p>
              <p className="text-xs text-muted-foreground">{DEMO_DRIVER.name}</p>
            </motion.div>
          )}
        </div>
      </div>

      {!scanning && (
        <Button size="lg" onClick={handleStartScan} className="gap-2">
          <Camera className="h-5 w-5" />
          Start Scanning
        </Button>
      )}

      {found && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xs space-y-2"
        >
          <Button
            className="w-full"
            size="lg"
            onClick={() => router.push(`/driver/${DEMO_DRIVER.id}`)}
          >
            View Driver Profile
          </Button>
        </motion.div>
      )}
    </div>
  );
}
