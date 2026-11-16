# 🚀 RestoPulse Multi-Tenant Platform — Screen-by-Screen Walkthrough

**Platform:** RestoPulse Enterprise Cloud ERP & POS  
**Live Production Gateway:** `https://restopulse.restopulse-cloud.workers.dev`  
**Tenant Case Studies:** Spot Light Biriyani (Flagship) & Manam Restaurant (South Indian Dining)  

---

## 1. Public Experience & Customer Touchpoints

| Route | Feature & Purpose |
| --- | --- |
| `/` **Platform Home** | RestoPulse flagship storefront featuring live kitchen batch countdown, authentic dishes, party buckets, and 1-tap WhatsApp quick order. |
| `/login` **Terminal Gateway** | Role-based gatekeeper with dynamic active client restaurant selector (Spot Light Biriyani, Manam Restaurant). |
| `/menu` **Live Menu** | Real-time synchronized menu grouped by category (Dum Biriyanis, Starters, Breads, Halwa). Automatically updates whenever prices or dish availability are edited in the management app. |
| `/branches` **Chennai Radar** | Authentic South Chennai radar map with coastline and live GPS hub pins (Tharamani OMR Flagship, Adyar Beach Kitchen, Velachery Hub) showing batch stock levels and 1-tap Google Maps directions. |
| `/manam` **Diner Table QR Menu** | Dynamic mobile menu and ordering portal targeted by QR codes on dining tables. |
| Header **Staff Login** | Secure gateway for restaurant owners, billing counter cashiers, and kitchen head chefs. |

---

## 2. Management & POS Application (`/app`)

### 2.1 Billing Terminal (`/app/billing`)
1. **Top Navigation Ribbon:** 1-tap tabs for `Dashboard`, `Billing & Floor POS`, `Captain POS`, `Reports & Forecast`, `Stock & Deg`, `Menu & Costs`, and `Settings`.
2. **Kitchen Deg Batch Tracker:** Real-time visibility into cooked capacity (160 plates), sold today counter, and live depletion gauge.
3. **Dynamic Sales Channels:** Switch between Dine-in Counter, Swiggy, and Zomato. Menu prices automatically adjust to compensate for delivery commissions.
4. **1-Tap Unified Payments:** Settle bills instantly with dedicated tabs for `UPI`, `Cash`, and `Card`.
5. **Thermal Printer Integration:** 1-tap instant print tailored for 80mm desktop and 58mm portable thermal receipt engines with ESC/POS commands.
6. **Past Bills & Audit Trail:** Search historical bills and perform cryptographic corrections with audit badges to prevent cashier fraud.
7. **KDS & Z-Report:** Kitchen display screens and end-of-day cash drawer reconciliation.

### 2.2 Executive Dashboard (`/app`)
- **True Operating Profit:** The exact cash left in the business after subtracting Food Cost (meat, rice, ghee), Aggregator Commissions, and Packaging fees.
- **Platform Commission Bleed:** Real-time visibility into the exact rupee amount lost to Swiggy and Zomato.
- **Multi-Tenant Filter:** Switch between active branches and tenants without data crossover.

### 2.3 Raw Material & Kitchen Inventory Ledger (`/app/stock`)
- Live tracking of chicken, mutton, seeraga samba rice, ghee, and cooking oil.
- Low-stock red pulse warning alerts.

### 2.4 Intelligent Prep Forecasting (`/app/reports`)
- 4-week weighted moving average algorithm predicting tomorrow morning's plate count during 10:00 PM night day-close.
