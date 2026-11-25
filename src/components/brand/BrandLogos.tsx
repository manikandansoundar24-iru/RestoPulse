import React from "react";

export type LogoSize = "xs" | "sm" | "md" | "lg" | "xl";

interface LogoProps {
  size?: LogoSize;
  className?: string;
}

const SIZE_MAP: Record<LogoSize, { box: string; iconSize: number; text: string }> = {
  xs: { box: "size-6", iconSize: 16, text: "text-[10px]" },
  sm: { box: "size-8", iconSize: 20, text: "text-xs" },
  md: { box: "size-10", iconSize: 24, text: "text-sm" },
  lg: { box: "size-14", iconSize: 32, text: "text-base" },
  xl: { box: "size-20", iconSize: 48, text: "text-xl" },
};

/**
 * ⚡ RestoPulse SaaS Platform Logo:
 * A high-vibrancy, futuristic restaurant operating system emblem.
 * Features a radiant fiery gradient squircle with a gleaming white & molten gold
 * culinary cloche silhouette fused with an active real-time operational ECG pulse wave.
 * High-contrast, razor-sharp, and visually stunning in both light and dark modes.
 */
export function RestoPulseLogo({ size = "md", className = "" }: LogoProps) {
  const s = SIZE_MAP[size];
  return (
    <span
      className={`relative inline-flex items-center justify-center shrink-0 rounded-xl bg-gradient-to-tr from-rose-600 via-orange-500 to-amber-300 p-[1.5px] shadow-lg shadow-orange-500/25 group-hover:scale-105 group-hover:shadow-orange-500/40 transition-all duration-300 ${s.box} ${className}`}
      title="RestoPulse Cloud POS & Enterprise Restaurant OS"
    >
      <span className="flex size-full items-center justify-center rounded-[10px] bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600 overflow-hidden relative shadow-inner">
        {/* Luminous Glass Sheen Layer */}
        <span className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/25 pointer-events-none" />

        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-[86%] relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
        >
          {/* Subtle culinary steam wisps */}
          <path
            d="M13.5 5.5C13 4 14 3 13.5 2"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M18 5C17.5 3.5 18.5 2.5 18 1.5"
            stroke="#FFE600"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M22.5 5.5C22 4 23 3 22.5 2"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Cloche Finial Handle */}
          <circle cx="18" cy="7.5" r="2" fill="#FFFFFF" />

          {/* Gleaming White Culinary Cloche Dome */}
          <path
            d="M8.5 22C8.5 14.5 12.5 10.5 18 10.5C23.5 10.5 27.5 14.5 27.5 22H8.5Z"
            fill="#FFFFFF"
            fillOpacity="0.95"
          />

          {/* Inner Cloche Depth Arc */}
          <path
            d="M11 20.5C12 16 14.8 13 18 13C21.2 13 24 16 25 20.5"
            stroke="#FFE600"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* High-Tech Pulse Baseline & Dynamic ECG Heartbeat Wave */}
          {/* Shadow track for maximum pop */}
          <path
            d="M3.5 26.5H10.5L13.5 18L17.5 31.5L21 16L24 26.5H32.5"
            stroke="#8B0000"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
          />
          {/* Radiant Gold Energy Pulse Wave */}
          <path
            d="M3.5 26.5H10.5L13.5 18L17.5 31.5L21 16L24 26.5H32.5"
            stroke="#FFE600"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* White High-Voltage Core Line */}
          <path
            d="M3.5 26.5H10.5L13.5 18L17.5 31.5L21 16L24 26.5H32.5"
            stroke="#FFFFFF"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pulse Signal Beat Dots */}
          <circle cx="17.5" cy="31.5" r="1.4" fill="#FFFFFF" />
          <circle cx="21" cy="16" r="1.4" fill="#FFE600" />
        </svg>
      </span>
    </span>
  );
}

/**
 * 🍲 Spot Light Biriyani Authentic Shop Banner Logo:
 * Recreated accurately from their physical Kalikundram, Chennai shopfront signboard:
 * - A bold ruby-red / amber disc
 * - Outer circle of glowing theater marquee light bulbs
 * - Elegant illuminated "Spot Light" script with hanging spotlight lamp
 * - Bold "BIRIYANI" lettering with Tamil subtitle: ஸ்பாட்லைட் பிரியாணி
 */
export function SpotlightLogo({ size = "md", className = "" }: LogoProps) {
  const s = SIZE_MAP[size];

  return (
    <span
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full shadow-lg shadow-red-600/25 group-hover:scale-105 transition-all duration-300 ${s.box} ${className}`}
      title="Spot Light Biriyani — Kalikundram, Tharamani, Chennai"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-full overflow-visible"
      >
        <defs>
          {/* Radiant Deep Red/Amber Shopfront Background */}
          <radialGradient id="slb-red-glow" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#e63946" />
            <stop offset="45%" stopColor="#ba181b" />
            <stop offset="90%" stopColor="#660708" />
            <stop offset="100%" stopColor="#370617" />
          </radialGradient>

          {/* Golden Spotlight Cone */}
          <linearGradient id="slb-beam" x1="50" y1="12" x2="50" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF9A6" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#FFD166" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FF9F1C" stopOpacity="0.0" />
          </linearGradient>

          {/* Marquee Bulbs Filter */}
          <filter id="bulb-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="0.8" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* Outer Dark Ring */}
        <circle cx="50" cy="50" r="48" fill="#1b0003" stroke="#ffd166" strokeWidth="1.2" />

        {/* Inner Glowing Red Disc */}
        <circle cx="50" cy="50" r="44" fill="url(#slb-red-glow)" />

        {/* Dotted Marquee Spotlight Bulbs (18 perimeter lights like the shop banner) */}
        {[...Array(18)].map((_, i) => {
          const angle = (i * 2 * Math.PI) / 18;
          const cx = 50 + 44 * Math.cos(angle);
          const cy = 50 + 44 * Math.sin(angle);
          const isAccent = i % 2 === 0;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={isAccent ? "2.6" : "2.1"}
              fill={isAccent ? "#ffffff" : "#ffd166"}
              filter="url(#bulb-glow)"
              stroke="#b7094c"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Spotlight Beam casting from top */}
        <path d="M47 14 L53 14 L74 65 L26 65 Z" fill="url(#slb-beam)" />

        {/* Hanging Spotlight Fixture */}
        <path d="M50 4 L50 14" stroke="#ffd166" strokeWidth="1.8" strokeLinecap="round" />
        <ellipse cx="50" cy="14" rx="4.5" ry="2" fill="#ffd166" />
        <circle cx="50" cy="14" r="1.5" fill="#ffffff" />

        {/* "SpotLight" Stylized Script Logo Text */}
        <text
          x="50"
          y="42"
          textAnchor="middle"
          fill="#ffffff"
          style={{
            fontFamily: "'Brush Script MT', 'Dancing Script', cursive, sans-serif",
            fontWeight: 800,
            fontSize: "17px",
            letterSpacing: "0.5px",
            filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.85))",
          }}
        >
          SpotLight
        </text>

        {/* "BIRIYANI" Bold Marquee Underneath */}
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fill="#ffe66d"
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 900,
            fontSize: "10px",
            letterSpacing: "2.2px",
            filter: "drop-shadow(0 1.5px 2px rgba(0,0,0,0.9))",
          }}
        >
          BIRIYANI
        </text>

        {/* Authentic Tamil Script Subtitle from Banner */}
        <text
          x="50"
          y="72"
          textAnchor="middle"
          fill="#ffffff"
          opacity="0.92"
          style={{
            fontFamily: "system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "6.5px",
            letterSpacing: "0.2px",
          }}
        >
          ஸ்பாட்லைட் பிரியாணி
        </text>

        {/* Hot Steaming Biriyani Handi Icon at Bottom */}
        <path
          d="M40 79 C40 76, 60 76, 60 79 L57 85 C57 87, 43 87, 43 85 Z"
          fill="#ffb703"
          stroke="#470000"
          strokeWidth="0.8"
        />
        <circle cx="50" cy="79" r="1" fill="#fff" />
      </svg>
    </span>
  );
}

/**
 * 👑 Manam Restaurant Multi-Cuisine Dining Emblem:
 * Deep royal emerald & gold circular badge with culinary dome,
 * golden cutlery, and royal heritage crown.
 */
export function ManamLogo({ size = "md", className = "" }: LogoProps) {
  const s = SIZE_MAP[size];

  return (
    <span
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full shadow-lg shadow-emerald-950/30 group-hover:scale-105 transition-all duration-300 ${s.box} ${className}`}
      title="Manam Restaurant — Multi-Cuisine Family Dining"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-full overflow-visible"
      >
        <defs>
          <linearGradient id="manam-green" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="50%" stopColor="#047857" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>
          <linearGradient id="manam-gold" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        <circle cx="50" cy="50" r="48" fill="url(#manam-green)" stroke="url(#manam-gold)" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="url(#manam-gold)" strokeWidth="0.8" strokeDasharray="3 2" />

        {/* Royal Cloche Dome */}
        <path d="M30 46 C30 32, 70 32, 70 46 Z" fill="url(#manam-gold)" />
        <rect x="26" y="47" width="48" height="3.5" rx="1.5" fill="url(#manam-gold)" />
        <circle cx="50" cy="30" r="3" fill="url(#manam-gold)" />

        {/* MANAM Typography */}
        <text
          x="50"
          y="66"
          textAnchor="middle"
          fill="#ffffff"
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 900,
            fontSize: "13px",
            letterSpacing: "3px",
          }}
        >
          MANAM
        </text>

        <text
          x="50"
          y="76"
          textAnchor="middle"
          fill="url(#manam-gold)"
          style={{
            fontFamily: "system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "6.5px",
            letterSpacing: "1px",
          }}
        >
          RESTAURANT
        </text>
      </svg>
    </span>
  );
}

/**
 * 🏢 Universal Dynamic Tenant Brand Logo:
 * Automatically inspects the active tenant ID and business name to render
 * their authentic bespoke identity emblem everywhere in the app.
 */
export function TenantBrandLogo({
  tenantId,
  tenantName,
  size = "md",
  className = "",
}: {
  tenantId?: string;
  tenantName?: string;
  size?: LogoSize;
  className?: string;
}) {
  const isSpotlight =
    (tenantId || "").toLowerCase().includes("spotlight") ||
    (tenantName || "").toLowerCase().includes("spotlight") ||
    (tenantName || "").toLowerCase().includes("spot light");

  const isManam =
    (tenantId || "").toLowerCase().includes("manam") ||
    (tenantName || "").toLowerCase().includes("manam");

  if (isSpotlight) {
    return <SpotlightLogo size={size} className={className} />;
  }

  if (isManam) {
    return <ManamLogo size={size} className={className} />;
  }

  // Modern Universal Culinary Fallback
  const s = SIZE_MAP[size];
  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-orange-500 text-white shadow-xs font-display font-black ${s.box} ${className}`}
    >
      {(tenantName || "R").charAt(0).toUpperCase()}
    </span>
  );
}

/**
 * 🟠 Official Swiggy Order Button Component
 */
export function SwiggyButton({
  url = "https://www.swiggy.com/restaurants/spot-light-biriyani-adyar-chennai-647970",
  className = "",
  size = "md",
}: {
  url?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const isSm = size === "sm";
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 rounded-xl border border-[#fc8019]/40 bg-[#fc8019]/10 text-[#fc8019] hover:bg-[#fc8019] hover:text-white transition-all shadow-xs font-bold ${
        isSm ? "px-2.5 py-1.5 text-xs" : "px-4 py-2.5 text-xs sm:text-sm"
      } ${className}`}
      title="Order on Swiggy Delivery (Kalikundram / Tharamani)"
    >
      {/* Official Swiggy GPS Pin SVG Icon */}
      <span className="flex size-5 items-center justify-center rounded-full bg-[#fc8019] text-white group-hover:bg-white group-hover:text-[#fc8019] transition-colors shrink-0">
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-3">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </span>
      <span>Order on Swiggy</span>
    </a>
  );
}

/**
 * 🔴 Official Zomato Order Button Component
 */
export function ZomatoButton({
  url = "https://www.zomato.com/chennai/spot-light-biriyani-taramani",
  className = "",
  size = "md",
}: {
  url?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const isSm = size === "sm";
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 rounded-xl border border-[#e23744]/40 bg-[#e23744]/10 text-[#e23744] hover:bg-[#e23744] hover:text-white transition-all shadow-xs font-bold ${
        isSm ? "px-2.5 py-1.5 text-xs" : "px-4 py-2.5 text-xs sm:text-sm"
      } ${className}`}
      title="Order on Zomato Delivery (Kalikundram / Tharamani)"
    >
      {/* Official Zomato "Z" Badge */}
      <span className="flex size-5 items-center justify-center rounded-full bg-[#e23744] text-white font-serif font-black text-xs italic group-hover:bg-white group-hover:text-[#e23744] transition-colors shrink-0">
        z
      </span>
      <span>Order on Zomato</span>
    </a>
  );
}

