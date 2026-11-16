# 🔥 RestoPulse — Enterprise Multi-Tenant Restaurant Cloud ERP & POS Platform

[![Production](https://img.shields.io/badge/Deployment-Cloudflare%20Workers-orange)](https://restopulse.restopulse-cloud.workers.dev)
[![Architecture](https://img.shields.io/badge/Architecture-Multi--Tenant%20Edge-blue)](#architecture)
[![Database](https://img.shields.io/badge/Database-Neon%20Serverless%20PostgreSQL-green)](https://neon.tech)
[![License](https://img.shields.io/badge/License-Proprietary-red)](#)

**RestoPulse** is a high-speed, multi-tenant Cloud ERP, Kitchen Management, and Counter POS operating system engineered for restaurant chains, cloud kitchens, and QSR franchises.

🌐 **Live Production Gateway:** [https://restopulse.restopulse-cloud.workers.dev](https://restopulse.restopulse-cloud.workers.dev)

---

## 🚀 Key Platform Capabilities

- **Multi-Tenant SaaS Engine:** Power multiple independent restaurant chains from a single codebase (e.g. **Spot Light Biriyani**, **Manam Restaurant**).
- **Tab-Isolated Sessions:** Dedicated `sessionStorage` boundaries (`restopulse_session_tenant`, `restopulse_auth_role`) preventing cross-tab data contamination.
- **High-Speed Counter POS:** Sub-3-second order settlement, permanently locked top tabs, 1-tap unified payments (UPI, Cash, Card), and ESC/POS 80mm/58mm thermal printing.
- **Kitchen Deg Batch Tracking:** Live capacity countdown tracking for large food batches (160 plates cooked, real-time depletion gauge, automatic portion limits).
- **AI Prep Forecasting Engine:** 4-week historical moving average algorithm providing night-before plate predictions to eliminate morning food spoilage.
- **Cryptographic Bill Correction:** Zero cashier fraud with full audit trails (`isEdited: true`, original net preservation, and edit timestamping).
- **Zero-Cost Edge Infrastructure:** Deployed globally on Cloudflare Workers edge network with unlimited bandwidth, 0ms cold starts, and zero hosting costs.
- **Offline-First PWA:** Full service worker cache (`public/sw.js` cache-v2) allowing the counter terminal to operate even during internet outages.

---

## 🏛️ Tenant Architecture & Routing

| Endpoint | Purpose | Access Scope |
| :--- | :--- | :--- |
| **`/login`** | Terminal & Staff Gatekeeper | Tenant selection dropdown, role authentication, developer console. |
| **`/app?tenant=spotlight-biriyani`** | Spot Light Biriyani Workspace | Dedicated dashboard, biriyani deg batch tracker, multi-branch sales. |
| **`/app?tenant=manam-restaurant`** | Manam Restaurant Workspace | South Indian dining dashboard, diner table orders, menu management. |
| **`/app/billing`** | Counter POS Billing Terminal | High-speed billing, deg depletion bar, table selector, thermal printing. |
| **`/manam`** | Diner Table QR Menu | Public diner mobile ordering directly to kitchen tickets. |

---

## 💻 Tech Stack

- **Frontend & App Framework:** React 19, TanStack Start, TanStack Router, TypeScript, Tailwind CSS v4.
- **Edge Serverless Runtime:** Cloudflare Workers, Nitro Edge Engine.
- **Cloud Database:** Neon Serverless PostgreSQL (AWS Singapore `ap-southeast-1` — 30ms ping to India).
- **Hardware Peripherals:** Web Serial / Web Bluetooth ESC/POS 80mm Thermal Receipt Printers, HTML5 Web Audio API synthesizer.
- **Offline Storage:** Service Worker Cache v2 + LocalStorage client fallback.

---

## 🛠️ Local Development Setup

```bash
# Clone the repository
git clone https://github.com/manikandansoundar24-iru/Spotlight-Biriyani.git
cd Spotlight-Biriyani

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📚 Master Documentation Index

All technical, operational, and commercial manuals are located under [`docs/`](file:///docs):
- [`docs/RESTOPULSE_FULL_OPERATIONS_MANUAL.md`](file:///docs/RESTOPULSE_FULL_OPERATIONS_MANUAL.md) — Comprehensive operator and cashier manual.
- [`docs/RESTOPULSE_MULTI_TENANT_MASTER_GUIDE.md`](file:///docs/RESTOPULSE_MULTI_TENANT_MASTER_GUIDE.md) — System architecture, sequence diagrams, and business playbook.
- [`docs/CODE_WALKTHROUGH_LINE_BY_LINE.md`](file:///docs/CODE_WALKTHROUGH_LINE_BY_LINE.md) — Line-by-line engineering explanation.
- [`docs/DOCUMENTATION_INDEX_AND_EXPLANATION.md`](file:///docs/DOCUMENTATION_INDEX_AND_EXPLANATION.md) — Study guide and curriculum.

---

## 🔒 Intellectual Property & Ownership
**Copyright © 2026 RestoPulse.** Designed and architected by **Manikandan Soundar**. All rights reserved.
