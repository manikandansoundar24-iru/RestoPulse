# 🌟 RESTOPULSE — COMPLETE MULTI-TENANT CLOUD ERP & POS OPERATIONS MANUAL

**Platform Version:** 4.0.0 (Enterprise Multi-Tenant Cloud Edition)  
**Author & Solution Architect:** Manikandan Soundar (Platform Owner & Chief Architect)  
**Live Production URL:** `https://restopulse.restopulse-cloud.workers.dev`  
**Target Audience:** Restaurant Owners, Branch Managers, Cashiers, Kitchen Head Chefs, Franchise Partners  
**Last Updated:** November 2026 (Production Release on Cloudflare Workers & Neon PostgreSQL)  

---

## EXECUTIVE SUMMARY & SYSTEM OVERVIEW

**RestoPulse** is a next-generation, high-performance **Multi-Tenant Restaurant Operating System & Counter POS Platform** engineered for authentic restaurant chains, cloud kitchens, and multi-branch hospitality groups.

### Core Architectural Distinction:
* **RestoPulse** is the overarching multi-tenant SaaS operating system and commercial software platform.
* **Spot Light Biriyani** is **Tenant #1** (a high-volume authentic Chennai biriyani chain with branches in Taramani, Adyar, and Velachery).
* **Manam Restaurant** is **Tenant #2** (a contemporary South Indian dining and quick-service restaurant in Velachery).
* RestoPulse can onboard any number of independent restaurant tenants (e.g., Anjappar, A2B, Thalappakatti), each with their own isolated menus, staff roles, billing counters, and accounting ledgers.

### The 3 Financial Leakages RestoPulse Eliminates:
1. **Aggregator Commission Bleed:** Swiggy and Zomato deduct between 22% and 28% in commissions, delivery cuts, and onboarding fees. Traditional billing machines register gross revenue, giving owners a false sense of security. RestoPulse automatically calculates net aggregator deductions in real time so the dashboard reveals your **true cash operating profit**.
2. **Food Wastage & Over-Cooking:** Biriyani and specialty foods are cooked in massive daily batches. Cooking too much leads to unsold rice wastage; cooking too little leads to missed afternoon peak revenues. Our built-in **AI Prep Forecasting Engine** analyzes historical day-of-week sales patterns to tell the kitchen head chef exactly how many plates to prepare each morning.
3. **Cashier Fraud & Skimming:** Unmonitored bill deletions and cash adjustments bleed restaurants every month. RestoPulse enforces cryptographic **Bill Correction Audit Logging** where every edit is recorded with the original net amount, modification timestamp, and reason badge.

---

## 1. MULTI-TENANT ARCHITECTURE & TENANT ROUTING

### How Tenant Isolation Operates:
RestoPulse enforces strict multi-tenant boundary isolation. Every tenant operates inside an isolated sandbox with zero cross-tenant data contamination.

```
                         [ RESTOPULSE CLOUD GATEWAY ]
                 https://restopulse.restopulse-cloud.workers.dev
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
   [ Tenant: spot-light-biriyani ]              [ Tenant: manam-restaurant ]
   ├── Menu: Dum Biriyani, Kushka               ├── Menu: Ghee Roast, Meals
   ├── Branches: Taramani, Adyar, Velachery     ├── Branches: Velachery Central
   ├── Active Batch: 160 Plates Deg             ├── Active Batch: Standard POS
   └── Roles: Owner, Cashier, Chef              └── Roles: Owner, Cashier
```

### Dynamic Routing Endpoints:
1. **`/login` — Multi-Tenant Terminal Gateway:** Allows staff to select their active restaurant tenant from a clean dropdown, choose their role, and sign into their dedicated operational workspace.
2. **`/app?tenant=spotlight-biriyani` — Spot Light Biriyani Dashboard:** Displays live sales, batch depletion, and revenue for the Spot Light biriyani chain.
3. **`/app?tenant=manam-restaurant` — Manam Restaurant Dashboard:** Displays independent revenue and operational metrics for Manam Restaurant.
4. **`/manam` — Direct Diner QR Menu & Mobile Ordering:** QR code target on dining tables allowing customers to browse dishes and punch orders directly to the kitchen.
5. **Session Isolation via `sessionStorage`:** Role authentication and active tenant IDs are stored strictly inside the browser tab's `sessionStorage` (`restopulse_session_tenant`, `restopulse_auth_role`). This ensures multiple tabs can run different tenants or roles side-by-side without session bleeding or cookie conflicts.

---

## 2. SECURITY, AUTHENTICATION & ROLE ACCESS CONTROL

### Role-Based Access Control (`/login`):
Every operational screen is protected by token-authenticated role gatekeeping. Unauthenticated requests are immediately routed to `/login`.

| Role | Default Credential | Permissions & Accessible Screens |
| :--- | :--- | :--- |
| 👑 **Restaurant Owner & Admin** | Password: `spotlight2026`<br>Master PIN: `9999` | Complete access to Executive Dashboard, Consolidated Reports, Multi-Branch P&L, Inventory, Menu Pricing, and Database Backups. |
| 🧮 **Taramani Cashier** | PIN: `1001` | Dedicated Counter POS Terminal for Tharamani Flagship Kitchen. Automatically scopes sales and cash drawer to Taramani. |
| 🧮 **Adyar Cashier** | PIN: `1002` | Dedicated Counter POS Terminal for Adyar Beach Kitchen. Automatically scopes sales and cash drawer to Adyar. |
| 🧮 **Velachery Cashier** | PIN: `1003` | Dedicated Counter POS Terminal for Velachery Delivery Hub. Automatically scopes sales and cash drawer to Velachery. |
| 🧮 **General / Master Cashier** | PIN: `1234` | Allows counter POS billing across any selected branch. |
| 🔥 **Kitchen Head Chef** | PIN: `5555` | Direct access to Raw Material & Kitchen Inventory Ledger (`/app/stock`). Allows recording meat/rice consumption without touching financial reports. |
| 🛠️ **System Architect / Developer** | Master Key: `dev@spotlight2026` | Master administrative ownership held by Manikandan Soundar. Unlocks developer console, raw JSON database inspector, outlet reset, and emergency password bypass. |

---

## 3. HIGH-SPEED COUNTER POS BILLING TERMINAL (`/app/billing`)

### Key Operational Features:
1. **Permanently Enforced Top Navigation Ribbon:**
   RestoPulse features a streamlined top navigation ribbon with 1-tap tabs:
   - `Dashboard`
   - `Billing & Floor POS`
   - `Captain POS`
   - `Reports & Forecast`
   - `Stock & Deg`
   - `Menu & Costs`
   - `Settings`
   The layout is permanently fixed to maximize screen width on counter touch terminals and tablets.

2. **Today's Fresh Kitchen Deg Batch Tracker:**
   - Biriyani is cooked in authentic sealed copper degs.
   - Shows: **Cooked in Deg (e.g. 160 Plates)** | **Sold Today (64 Plates Counter + Online)** | **Remaining Stock (96 Plates Available)**.
   - **Visual Depletion Gauge:** Displays real-time percentage consumed (e.g., `40% Consumed`).
   - **Deg Breakdown:** Live counts of plates sold per dish variant (Chicken 65, Full, Half, Egg, Mutton).
   - Once the deg reaches 0 plates, the terminal alerts cashiers to switch batches or mark items sold out.

3. **Sub-3-Second Order Punching:**
   - Dish cards are stripped of unnecessary margin/food cost clutter, presenting only the dish name, price in bold INR, and available deg capacity.
   - Tapping an item immediately appends it to the right-hand cart.
   - Direct quantity spinners allow instant + / - adjustments.

4. **Service Type & Channel Origin:**
   - `[🍽️ Dine-in]`: For guests seated in the restaurant. Includes table floor plan selector.
   - `[🥡 Takeaway / Parcel]`: Adds parcel packaging instructions and prints parcel tags.
   - `Counter`: 0% platform commission.
   - `Swiggy`: Applies 28% commission deduction in real-time P&L.
   - `Zomato`: Applies 24% commission deduction in real-time P&L.

5. **1-Tap Unified Payment Settlement:**
   - Cashiers settle bills with a single tap on `UPI`, `Cash`, or `Card`.
   - **`[ 🖨️ SAVE BILL & PRINT (F2) ]`** triggers ESC/POS thermal printing in < 1 second.
   - Sequential daily tokens (`Token #33`, `Token #34`) reset automatically each morning.

6. **Bill Correction & Audit Trail Workflow:**
   - If a cashier enters an incorrect bill:
     1. Tap **"Past Bills"** at the top of `/app/billing`.
     2. Search by Bill ID (e.g. `T4G9FZ`) or customer name.
     3. Tap **`[✏️ Correct Bill]`**. Cart reloads historical items.
     4. Adjust quantities or discounts, and click **`[UPDATE & RE-PRINT BILL (F2)]`**.
     5. The system flags the bill with `isEdited: true`, preserves `originalNet`, records `editedAt`, recalculates food costs for P&L, and displays an amber audit badge: `✏️ Corrected (Was ₹...)`. This completely eliminates unauthorized cash drawer skimming.

7. **Z-Report Day Close & Kitchen Display System (KDS):**
   - **KDS Screen:** Kitchen display screen for chefs to see live incoming orders in real time.
   - **Z-Report Day Close:** Generates end-of-day reconciliation totaling cash in drawer, UPI settlements, card transactions, and total plates depleted.

---

## 4. THE DEMO SECRET: "INSTALL AS DESKTOP / TABLET APP" (PWA)

### Why This Feature Is Essential for Sales:
When presenting RestoPulse to a restaurant owner, running inside a regular browser tab with an address bar (`restopulse-cloud.workers.dev`) looks like a website. 
By installing RestoPulse as a **Progressive Web App (PWA)**, it launches in its own dedicated, borderless native application window:
* **NO web address bar.**
* **NO browser tabs.**
* **NO `.workers.dev` URL visible.**
* A dedicated **RestoPulse shortcut icon** on the Windows Desktop and Taskbar.
* It looks, behaves, and performs like a custom ₹50,000 enterprise desktop POS software.

### Step-by-Step Installation Instructions:
1. Open Google Chrome and navigate to `https://restopulse.restopulse-cloud.workers.dev/login`.
2. Look at the top-right corner of Chrome (next to the window close `X` button).
3. Click the **Three Vertical Dots (`⋮`)** Chrome menu.
4. Hover over **"Save and share"** (or **"More tools"** in older versions).
5. Click **"Install RestoPulse..."** OR click **"Create shortcut..."**.
6. In the dialog box that appears:
   - Name: `RestoPulse`
   - **Check the box: ☑ "Open as window"** (Crucial step!).
   - Click **Create** (or **Install**).
7. RestoPulse will immediately detach from Chrome and open in a clean, professional window. A desktop icon is created automatically.

---

## 5. EXECUTIVE DASHBOARD & REAL MARGIN TRACKING (`/app`)

### The 4 Core Financial Metrics:
1. **Total Net Revenue:** Gross sales across Counter, Swiggy, and Zomato.
2. **Net Operating Profit:** True cash left after deducting food costs (meat, rice, ghee), packaging, and aggregator cuts.
3. **Platform Commission Bleed:** Real-time visibility into the exact rupee amount lost to Swiggy and Zomato.
4. **Food Cost (COGS):** Total raw material cost consumed to generate sales.

### Timeframe & Tenant Filters:
* Filter sales by **Today**, **7 Days**, or **30 Days**.
* Multi-branch filtering across Taramani, Adyar, and Velachery.
* Channel P&L matrix comparing counter dine-in margins (~45%) against aggregator margins (~18%).

---

## 6. INTELLIGENT PREP FORECASTING & REPORTS (`/app/reports`)

### The 4-Week Moving Average Algorithm:
Biriyani sales surge drastically on weekends. Sundays generate up to 3x Tuesday volumes.
RestoPulse calculates next-day prep using a weighted historical formula:
$$\text{Target Prep} = (0.4 \times \text{Last Week}) + (0.3 \times \text{2 Weeks Ago}) + (0.2 \times \text{3 Weeks Ago}) + (0.1 \times \text{4 Weeks Ago})$$

### Operational Timing (Night Day-Close at 10:00 PM):
Wholesale meat and poultry markets (Koyambedu, Pulianthope) operate at dawn (4:00 AM – 5:30 AM). Biriyani cooking begins by 7:00 AM. 
Restaurant owners review `/app/reports` during night Z-Report closing (10:00 PM). The **"Prep Tomorrow"** table indicates exact plate quantities so raw ingredients can be ordered for early morning delivery:
- *Chicken Biriyani:* 142 plates
- *Mutton Biriyani:* 68 plates
- *Kushka:* 45 plates

---

## 7. RAW MATERIAL & INVENTORY LEDGER (`/app/stock`)

### Inventory Management:
* **Tracked Commodities:** Broiler Chicken (kg), Tender Goat Mutton (kg), Seeraga Samba / Basmati Rice (kg), Country Ghee (L), Cooking Oil (L), Curd (L), Carry Bags & Parcel Containers.
* **Movement Types:**
  - `Purchase`: Morning inward stock receipt. Increases inventory and asset valuation.
  - `Usage / Cooking`: Consumption into daily biriyani deg batches.
  - `Wastage / Return`: Spoiled or returned items.
* **Low-Stock Pulse Alerts:** When an ingredient drops below its configured `reorderLevel`, its card pulses red on the dashboard, notifying the store manager before evening cooking begins.

---

## 8. HARDWARE, PRINTERS & SETTINGS (`/app/settings`)

### Printing Specifications:
* **Supported Hardware:** Standard 80mm Counter Desktop Thermal Printers and 58mm/56mm Handheld Bluetooth Printers.
* **ESC/POS Command Support:**
  - Auto-cutter command trigger.
  - Cash drawer 24V solenoid pulse kick on bill settlement.
  - Custom Tamil/English receipt headers and FSSAI license numbers.
* **Disaster Recovery:** 1-click **Download Backup (JSON)** and **Restore Backup** buttons guarantee zero data loss.

---

## 9. CLOUDFLARE WORKERS EDGE INFRASTRUCTURE

### Why RestoPulse Migrated from Vercel to Cloudflare Workers:
1. **The Vercel Limitation:** Vercel Hobby tier imposes a strict 10 GB/month Fast Origin Transfer limit. When hit, Vercel instantly suspends production deployments with `HTTP 402 Payment Required / DEPLOYMENT_DISABLED`, causing catastrophic POS downtime during live billing.
2. **The Cloudflare Workers Solution:** Cloudflare Workers provides **unlimited bandwidth** on its free tier, zero cold starts, global Anycast edge routing (< 30ms latency across India), and 100,000 free edge function requests per day.
3. **Continuous Deployment via GitHub:** Code pushed to `main` branch automatically triggers Cloudflare Workers CI/CD, compiling and deploying the production bundle in under 60 seconds.

---

## 10. PETPOOJA COMPARISON & COMMERCIAL PRICING MATRIX

| Feature / Capability | RestoPulse Cloud POS | Petpooja / Posist |
| :--- | :--- | :--- |
| **Annual License Fee** | ₹7,999 – ₹14,999 / year | ₹15,000 – ₹30,000 / year |
| **Deg Batch Stock Cap** | Built-in (Automatic portion limits) | Not available (Generic retail billing) |
| **AI Prep Forecasting** | Built-in (4-week weighted algorithm) | Expensive add-on module |
| **Hardware Requirement** | Runs on ANY phone, tablet, PC, iPad | Proprietary POS terminal lock-in |
| **Bandwidth & Cloud Hosting** | 100% Free on Cloudflare Workers | Server maintenance fees |
| **Offline-First PWA** | Yes (Service Worker Cache v2) | Varies |
| **WhatsApp Receipts** | Deep-link 0 cost receipts | Paid SMS package |

---

## 11. TECHNICAL FAQ & TROUBLESHOOTING

### Q1: Can RestoPulse run when the internet goes down?
**Yes.** RestoPulse includes an offline-first Service Worker (`public/sw.js` cache-v2) that stores the UI and local transactions in browser storage. Bills punched offline sync immediately when the connection restores.

### Q2: What if a client restaurant forgets their password?
The platform architect holds the **Master Developer Key** (`dev@spotlight2026`). You can sign into any outlet, access the raw database inspector, reset passwords, or restore JSON backups.

### Q3: How do we add a new client restaurant tenant?
1. Open `src/routes/login.tsx` and add the restaurant name and identifier to the `TENANTS` array.
2. The new restaurant immediately appears in the login gateway dropdown, ready for independent billing and menu configuration.

