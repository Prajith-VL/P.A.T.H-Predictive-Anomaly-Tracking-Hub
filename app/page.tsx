"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ArrowRight,
  CheckCircle2,
  QrCode,
  MapPin,
  Users,
  ShieldAlert,
  Brain,
  Star,
  History,
} from "lucide-react";
import { FeatureCard } from "@/components/brand/FeatureCard";
import { PersonaCard } from "@/components/brand/PersonaCard";
import { Logo } from "@/components/brand/Logo";

const HERO_FEATURES = [
  "QR-based driver verification",
  "Real-time GPS ride tracking",
  "Trusted contact live sharing",
  "AI-powered safety monitoring",
];

const FEATURES = [
  { icon: QrCode, title: "QR Verification", description: "Scan driver QR to verify identity, vehicle, rating, and trust score before boarding." },
  { icon: MapPin, title: "Live Tracking", description: "GPS updates every 10 seconds with route path, ETA, and duration monitoring." },
  { icon: Users, title: "Trusted Contacts", description: "Add up to 3 contacts who receive live location, driver details, and SOS alerts." },
  { icon: ShieldAlert, title: "SOS Emergency", description: "One-tap SOS alerts trusted contacts, PATH dashboard, and simulates police notification." },
  { icon: Brain, title: "AI Safety Engine", description: "Detects route deviations, long stops, and excess travel time automatically." },
  { icon: Star, title: "Trust Score", description: "Composite score based on verification, ratings, ride history, and safety record." },
  { icon: History, title: "Route Replay", description: "Review your complete route, stops, and timing after every ride." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero — rebranded from UI reference ruixen-ui-hero.tsx */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-70" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -100 }}
            animate={{ opacity: 0.3, scale: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 0.2, scale: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          {/* Nav */}
          <div className="flex items-center justify-between mb-12">
            <Logo size="large" />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link href="/login">
                <Button size="lg">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">
            {/* Left */}
            <div className="w-full lg:w-1/2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/80 border border-border"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm font-medium">Last-Mile Safety Intelligence</span>
              </motion.div>

              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
                >
                  Make every last-mile journey <span className="text-primary">safe & accountable</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                  className="mt-6 text-lg text-muted-foreground max-w-lg"
                >
                  PATH verifies drivers through QR codes, tracks rides in real time, shares journeys with trusted contacts, and detects safety risks with AI — closing the last-mile safety gap.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/login">
                  <Button size="lg" className="group">
                    Try Demo <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right — feature showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg">
                <ul className="space-y-4">
                  {HERO_FEATURES.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1, ease: "easeOut" }}
                      className="flex items-start gap-4"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-base text-muted-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <Badge className="mb-3">Core Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight">8 features powering your safety</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </div>
      </section>

      {/* Personas */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="text-center mb-10">
          <Badge className="mb-3">Target Users</Badge>
          <h2 className="text-3xl font-bold tracking-tight">Built for those who need it most</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <PersonaCard
            name="Working Woman"
            tagline="Night commuter"
            age="22–40"
            needs={["Ride transparency", "Driver verification", "Family visibility"]}
            painPoints={["Night travel", "Unknown drivers", "Route uncertainty"]}
          />
          <PersonaCard
            name="Night Commuter"
            tagline="Late-night travel"
            age="18–35"
            needs={["Safe late-night travel", "Quick emergency access"]}
            painPoints={["Low visibility", "Delayed assistance"]}
          />
          <PersonaCard
            name="College Student"
            tagline="Budget-friendly safety"
            age="18–25"
            needs={["Affordable and safe transportation"]}
            painPoints={["Traveling alone", "Parents worried about safety"]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to ride safe?</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Experience the complete hackathon demo — from QR scan to SOS to safe arrival.
        </p>
        <Link href="/login">
          <Button size="lg" className="group">
            Start Demo <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          PATH — Personalized Accountability & Tracking Hub. Hackathon Prototype.
        </div>
      </footer>
    </div>
  );
}
