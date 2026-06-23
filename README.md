
<div align="center">

# 🛡️ PATH

### Transforming Last-Mile Travel into a Verified, Monitored, and Accountable Journey

<p>
  <img src="https://img.shields.io/badge/Hackathon-2026-blue" />
  <img src="https://img.shields.io/badge/Status-Prototype-success" />
  <img src="https://img.shields.io/badge/React-TypeScript-61DAFB" />
  <img src="https://img.shields.io/badge/FastAPI-Python-009688" />
  <img src="https://img.shields.io/badge/PostgreSQL-Supabase-3ECF8E" />
</p>

<img src="./assets/path-banner.png" width="100%" />

### 🚀 Making Every Last-Mile Journey Verified, Visible & Safe

[Live Demo](#) • [Presentation](#) • [Video Demo](#)

</div>

---

## 🌟 The Reality

Every day, millions of people travel safely through metros, trains, and buses.

But the moment they leave these trusted systems, safety becomes uncertain.

The **last mile** between a transit hub and home remains:

| Problem | Impact |
|----------|---------|
| Unknown Driver Identity | Lack of trust |
| No Live Monitoring | No visibility |
| No Route Transparency | Safety concerns |
| Limited Emergency Response | Delayed assistance |
| Solo Night Travel | Increased anxiety |

---

## 💡 Introducing PATH

PATH transforms informal transportation into a monitored and accountable mobility ecosystem.

### What PATH Provides

✅ QR Driver Verification

✅ Live Ride Tracking

✅ Trusted Contact Monitoring

✅ AI Safety Assistant

✅ SOS Emergency Response

✅ Driver Trust Score

✅ Route Replay

✅ Admin Safety Dashboard

---

## 🎬 Demo Flow

<img src="./assets/demo-flow.png" width="100%" />

### User Journey

```mermaid
flowchart TD
    A[Scan Driver QR] --> B[Verify Driver]
    B --> C[Start Ride]
    C --> D[Live Tracking]
    D --> E[AI Monitoring]
    E --> F[SOS if Needed]
    F --> G[Dashboard Alert]
    G --> H[Ride Complete]
````

---

## 📸 Application Screens

| Home Screen            | Driver Verification      |
| ---------------------- | ------------------------ |
| ![](./assets/home.png) | ![](./assets/driver.png) |

| Live Ride                  | SOS                   |
| -------------------------- | --------------------- |
| ![](./assets/tracking.png) | ![](./assets/sos.png) |

---

## 🏗️ Architecture

<img src="./assets/architecture.png" width="100%" />

---

## 🤖 AI Safety Engine

PATH continuously monitors rides and detects:

* Route Deviations
* Long Stops
* Ride Delays
* Emergency Events

### Example

🚨 Route deviation detected

Risk Level: Medium

Recommended Action:
Notify trusted contacts.

---

## 📊 Driver Trust Score

Trust Score =

Verification Status +
Ride History +
Ratings +
Safety Record +
Route Compliance

Example:

⭐ 92/100

✔ Verified Driver

✔ 500+ Safe Rides

✔ High Reliability

---

## 🛠️ Tech Stack

| Layer    | Technology            |
| -------- | --------------------- |
| Frontend | React + TypeScript    |
| Backend  | FastAPI               |
| Database | PostgreSQL (Supabase) |
| Maps     | Google Maps API       |
| Hosting  | Vercel + Railway      |
| AI Layer | Rule-Based Monitoring |

---

## 🎯 Impact

PATH helps create:

* Safer Commutes
* Verified Drivers
* Faster Emergency Response
* Increased Transparency
* Reduced Travel Anxiety

---

## 🔮 Future Roadmap

* WhatsApp Alerts
* Real Emergency Integration
* Predictive Risk Detection
* Safety Heatmaps
* Smart Route Recommendations

---

## 👨‍💻 Team

Built with a mission to make every journey safer.

### PATH — Your Journey. Verified.

---

# 🛠️ Prototype — Quick Start (Developer Guide)

This repository ships a **fully self-contained, runnable prototype** of the PATH
User Demo Flow described in PRD §20. No backend, no API keys — it runs with
two commands.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Build / type-check:

```bash
npm run build    # production build (17 routes prerender)
```

> Requires Node 18.18+ (Node 20+ recommended).

## Tech stack (as implemented)

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js 15** (App Router) | Static-prerendered, RSC |
| Language | **TypeScript** (strict) | Full domain type system |
| Styling | **Tailwind CSS** + shadcn/ui tokens | Light & dark mode |
| Animation | **motion/react** | Staggered hero, scan-line, cascade |
| Icons | **lucide-react** | Per UI reference PDF |
| State | **Zustand** + `persist` | localStorage refresh-safety |
| Maps | **Custom SVG mock map** | No API key needed |
| Notifications | **Sonner** | AI alert toasts |

## Screens → PRD mapping

| Route | PRD ref | Implements |
|-------|---------|------------|
| `/` | §1–8 | Landing: hero, 8 features, 3 personas |
| `/login` | §9 | Google login + Guest Demo Login (mock) |
| `/dashboard` | §11.1–3 | Quick actions + safety summary |
| `/scan` | §7.2 / Feat 1 | QR scanner with scan animation → driver |
| `/driver/[id]` | §7.3–4 / Feat 6 | Profile + Trust Score ring + verification checklist |
| `/ride` | §7.6 / Feat 2,5,6 | Active ride: mock map, live tick, AI alerts, SOS |
| `/sos` | §8 Feat 4 / §15 R4 | Full SOS cascade: contacts → dashboard → police → location |
| `/ride/complete` | §7.7–8 | Summary + star rating + feedback |
| `/replay` | §8 Feat 7 | Route replay of completed ride |
| `/contacts` | §8 Feat 3 | Manage up to 3 trusted contacts |
| `/profile` | §11.1.10 | User profile |
| `/admin*` | §8 Feat 8 | Admin dashboard, drivers, rides, alerts |

## Simulated AI Safety Engine (PRD §15)

All four rules run client-side on a scripted timeline during `/ride`:

| Rule | Trigger | Risk | Implementation |
|------|---------|------|----------------|
| 1 | Route deviation > 500m | Medium | Fires at ~42% progress (`store.ts`) |
| 2 | Vehicle stationary > 5 min | Medium | Fires at ~66% progress |
| 3 | Trip duration > 20% expected | Medium | Fires at ~82% progress |
| 4 | SOS triggered | **High** | `/sos` page sets `riskLevel = high` |

Risk escalation: any medium alert → ride HUD turns amber; SOS → red.

## Project structure

```
app/                      # Next.js App Router pages
  (app)/                  # Authenticated group (AppShell + BottomNav)
    dashboard/ scan/ driver/[id]/ ride/ ride/complete/ replay/ contacts/ profile/ sos/
  admin/                  # Admin section
  login/                  # Auth
app/page.tsx              # Landing
lib/
  store.ts                # Zustand store + AI rule engine
  data.ts                 # Mock drivers, contacts, route polyline
  types.ts                # Domain types (PRD §12 schema)
  utils.ts                # cn(), formatters
components/
  ui/                     # 11 shadcn primitives (button, card, badge, …)
  brand/                  # MockMap, RideSimulator, SOSButton, TrustScoreRing, …
```

## Demo Flow walkthrough (PRD §20)

1. Open `/` → **Try Demo**
2. `/login` → **Guest Demo Login**
3. `/dashboard` → **Scan QR**
4. `/scan` → tap **Start Scanning** → driver resolves
5. `/driver/[id]` → review Trust Score → **Start Ride**
6. `/ride` → watch the marker advance; AI alerts fire at thresholds
7. tap **SOS** → `/sos` runs the 4-action cascade
8. **End Ride** → `/ride/complete` → rate driver
9. `/replay` → review the route

```
```
