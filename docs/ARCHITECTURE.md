# 🏛️ RestoPulse — Enterprise System Architecture

**Platform:** RestoPulse Multi-Tenant Cloud ERP & POS  
**Live Production URL:** `https://restopulse.restopulse-cloud.workers.dev`  
**Deployment Infrastructure:** Cloudflare Workers Edge (Global Anycast) + Neon PostgreSQL (AWS Singapore)  
**Last Updated:** November 2026 | Version 4.0.0 Multi-Tenant Production  

---

## 1. Directory Structure

```
src/
  routes/
    __root.tsx                  Root layout, fonts, global meta, PWA service worker updater
    index.tsx                   Platform homepage & live flagship showcase
    login.tsx                   Enterprise Multi-Tenant Gateway & Staff Gatekeeper (/login)
    manam.tsx                   Manam Restaurant Diner Table QR Menu & Ordering (/manam)
    menu.tsx                    Public menu & authentic dish catalog
    branches.tsx                Multi-branch radar map & kitchen hubs
    contact.tsx                 B2B software sales & bulk order booking
    app.tsx                     Authenticated layout: tenant badge, top tab navigation ribbon, <Outlet/>
    app.index.tsx               Executive dashboard (KPIs, net cash margin, COGS, platform commission)
    app.billing.tsx             High-speed counter POS, deg stock tracker, 1-tap checkout, thermal print
    app.reports.tsx             Itemized P&L, night Z-report close, 4-week moving average prep forecast
    app.stock.tsx               Raw material inventory ledger, low-stock pulse alerts, inward moves
    app.items.tsx               Menu item master, custom categories, recipe cost engine
    app.settings.tsx            Branch configs, ESC/POS thermal printer setup, JSON backup/restore
  components/
    site/SiteShell.tsx          Public navigation header, staff login link, footer
    ui/                         Radix UI primitives (dialogs, tabs, dropdowns, buttons)
  lib/
    pos-store.ts                Core state engine, billing calculations, seed data, offline sync
    neon-sync.ts                Server functions connecting to Neon Cloud PostgreSQL
  styles.css                    Tailwind CSS tokens, responsive typography, POS print media queries
  public/
    manifest.json               PWA manifest (standalone display, icons, start_url)
    sw.js                       Service Worker Cache v2 (Network-first with offline fallback)
    icon-192.png                High-res 192x192 PWA application icon
    icon-512.png                High-res 512x512 PWA splash application icon
    favicon.svg                 Vector flame emblem
```

Routing is fully file-based using TanStack Router. All routes are strictly typed in `src/routeTree.gen.ts`.

---

## 2. Multi-Tenant Architecture & Session Isolation

RestoPulse powers multiple independent restaurant client tenants from a single edge codebase:
- **Tenant 1: Spot Light Biriyani (`spotlight-biriyani`)** — Chennai dum biriyani chain with Taramani, Adyar, and Velachery branches.
- **Tenant 2: Manam Restaurant (`manam-restaurant`)** — South Indian dining and QSR with dynamic QR table ordering.

### Tab-Isolated Storage:
To prevent cross-tab contamination when managers or staff open multiple branches or tenants simultaneously, credentials and active tenant IDs are stored in `sessionStorage`:
- `restopulse_session_tenant`: The active restaurant identifier (`spotlight-biriyani` or `manam-restaurant`).
- `restopulse_auth_role`: The authenticated user role (`owner`, `cashier`, `chef`, `admin`).
- Offline sales and local transactions fallback to `localStorage` (`slb.pos.v1`).

---

## 3. High-Availability Cloud Edge Infrastructure

### Why Cloudflare Workers:
1. **Unlimited Bandwidth:** Unlike Vercel which caps free tier transfers at 10 GB/month and suspends production with `HTTP 402 Payment Required`, Cloudflare Workers provides **unlimited bandwidth** with zero risk of mid-rush POS outages.
2. **Global Anycast Edge:** Sub-30ms execution times across Indian edge nodes (Chennai, Mumbai, Bangalore, Hyderabad).
3. **Automated CI/CD:** Pushing commits to GitHub `main` automatically triggers Cloudflare Workers CI/CD build pipelines using Nitro (`npx wrangler deploy`).

### Cloud Database (Neon Serverless PostgreSQL):
- Hosted in AWS Singapore (`ap-southeast-1`) for lowest latency to India.
- Provisioned tables: `Branch`, `Channel`, `DishItem`, `KitchenBatch`, `Sale`, `SaleLine`, `StockItem`, `StockMove`.
- Bidirectional synchronization allows instant offline billing at the counter and automatic cloud persistence.

---

## 4. Hardware Peripherals & Printing

- **Receipt Printing:** Browser print media stylesheet formatted for 80mm and 58mm ESC/POS desktop and handheld thermal printers.
- **Cash Drawer Solenoid:** 24V drawer trigger upon successful bill settlement.
- **Web Audio Chimes:** Real-time synthesized cash-register audio chimes generated via the HTML5 Web Audio API without external audio assets.
