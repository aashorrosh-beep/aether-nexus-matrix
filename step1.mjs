import fs from 'fs';

fs.writeFileSync('app/globals.css', `@import "tailwindcss";
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: #030712; color: #f8fafc; font-family: system-ui, sans-serif; overflow-x: hidden; }
@keyframes pulseCore {
  0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 45px #f59e0b, 0 0 90px #38bdf8; }
  50% { transform: translate(-50%, -50%) scale(1.06); box-shadow: 0 0 75px #fbbf24, 0 0 130px #38bdf8; }
}
@keyframes boltOut { 0% { stroke-dashoffset: 220; opacity: 0.35; } 50% { opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0.4; } }
@keyframes boltIn { 0% { stroke-dashoffset: 0; opacity: 0.35; } 50% { opacity: 1; } 100% { stroke-dashoffset: 220; opacity: 0.35; } }
@keyframes spinCW { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
.spoke-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
.spoke-card:hover { transform: translate(-50%, -50%) scale(1.1) !important; z-index: 40 !important; }
`);

fs.writeFileSync('app/wheel-data.ts', `export const NODES = [
  { id: "beacon", angle: 0, icon: "🌟", title: "BEACON OF HOPE", sub: "4 Sanctuaries • Holistic & Peptides", badge: "20 STORES + 12-MI RADAR", href: "/sanctuary/autism-spectrum", color: "#38bdf8" },
  { id: "party", angle: 45, icon: "🎉", title: "PARTY LAPOOZA", sub: "15 Party Stores • AI Face-Swap", badge: "250+ PARTY SKUS", href: "/stores/party-lapooza", color: "#f43f5e" },
  { id: "nostalgia", angle: 90, icon: "🎄", title: "NOSTALGIA & HOLIDAY", sub: "Retro 60s–Y2K • Christmas Store", badge: "49 LIVE STORES", href: "/stores/christmas-holiday", color: "#f59e0b" },
  { id: "trend", angle: 135, icon: "🔥", title: "TRENDALOPOLIS", sub: "Top 50 U.S. Viral Categories", badge: "51 LIVE STORES", href: "/stores/holistic-peptides-wellness", color: "#ec4899" },
  { id: "sportflix", angle: 180, icon: "🏈", title: "SPORTSFLIX PLAZA", sub: "7 Pro Arenas • Golf, Hunt, Fish, ATV", badge: "15 SUPER-STORES", href: "/sportflix/baseball", color: "#22c55e" },
  { id: "matrix", angle: 225, icon: "🤖", title: "THE MATRIX • AI TECH", sub: "AI Rigs • Drones • Robotics • Auto", badge: "49 TECH STORES", href: "/stores/car-wash-auto", color: "#a855f7" },
  { id: "stargazer", angle: 270, icon: "🔭", title: "STARGAZER & AUTO", sub: "300 Celestial SKUs • Dark-Sky Radar", badge: "300 CELESTIAL SKUS", href: "/stores/stargazer-mall", color: "#60a5fa" },
  { id: "expecting", angle: 315, icon: "👶", title: "EXPECTING & FREE CPR", sub: "Nursery Store + Instant CPR Cert", badge: "150 BABY SKUS", href: "/stores/expecting-and-cpr", color: "#14b8a6" }
];
`);
console.log("STEP 1 DONE!");
