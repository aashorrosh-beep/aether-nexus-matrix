import fs from 'fs';

fs.writeFileSync('app/page.tsx', `"use client";
import React, { useState } from "react";
import Link from "next/link";
import { NODES } from "./wheel-data";

function bolt(cx: number, cy: number, tx: number, ty: number, f: number) {
  const dx = tx - cx, dy = ty - cy, px = -dy * 0.08 * f, py = dx * 0.08 * f;
  return \`M \${cx} \${cy} L \${cx+dx*0.25+px} \${cy+dy*0.25+py} L \${cx+dx*0.5-px} \${cy+dy*0.5-py} L \${cx+dx*0.75+px} \${cy+dy*0.75+py} L \${tx} \${ty}\`;
}

export default function NexusWheelLobby() {
  const [q, setQ] = useState("");
  const [zip, setZip] = useState("77301");
  const hits = q.trim() ? NODES.filter(n => (n.title + " " + n.sub).toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 25%, #0f172a 0%, #030712 72%)", color: "#f8fafc", paddingBottom: "80px" }}>
      <div style={{ background: "#090d16", borderBottom: "1px solid #f59e0b", padding: "10px", textAlign: "center", fontSize: "13px", fontWeight: 800 }}>
        ⚡ ALBS NEXUS OMNI-REACTOR • 6 MALLS • 240+ VERIFIED STOREFRONTS • EXPEDITED 3–7 DAY SHIPPING
      </div>

      {/* SPOKE & WHEEL LIGHTNING CIRCLE */}
      <div style={{ position: "relative", width: "100%", maxWidth: "1000px", height: "820px", margin: "10px auto 0" }}>
        <svg viewBox="0 0 1000 820" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 5 }}>
          <circle cx="500" cy="410" r="335" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="2" strokeDasharray="10 8" />
          <circle cx="500" cy="410" r="240" fill="none" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5" strokeDasharray="6 10" />
          {NODES.map((n, i) => {
            const r = ((n.angle - 90) * Math.PI) / 180, tx = 500 + Math.cos(r) * 355, ty = 410 + Math.sin(r) * 315;
            return (
              <g key={n.id}>
                <line x1="500" y1="410" x2={tx} y2={ty} stroke={n.color} strokeOpacity="0.25" strokeWidth="2" />
                <path d={bolt(500, 410, tx, ty, 1)} fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="16 10" style={{ animation: \`boltOut \${1.5 + (i % 3) * 0.3}s linear infinite\` }} />
                <path d={bolt(500, 410, tx, ty, -1)} fill="none" stroke="#fbbf24" strokeWidth="2.2" strokeDasharray="12 14" style={{ animation: \`boltIn \${1.8 + (i % 4) * 0.25}s linear infinite\` }} />
              </g>
            );
          })}
        </svg>

        <div style={{ position: "absolute", left: "50%", top: "410px", width: "250px", height: "250px", borderRadius: "50%", border: "2px dashed #38bdf8", animation: "spinCW 22s linear infinite", pointerEvents: "none", zIndex: 10 }} />

        {/* CENTER LOGO: ALBS NEXUS */}
        <div style={{ position: "absolute", left: "50%", top: "410px", width: "204px", height: "204px", borderRadius: "50%", background: "radial-gradient(circle, #1e293b 0%, #020617 100%)", border: "4px solid #f59e0b", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: 25, animation: "pulseCore 3s ease-in-out infinite" }}>
          <div style={{ fontSize: "26px" }}>⚡👑⚡</div>
          <div style={{ fontSize: "24px", fontWeight: 900, color: "#fbbf24", lineHeight: 1.05, marginTop: "4px" }}>ALBS<br/>NEXUS</div>
          <div style={{ fontSize: "10px", fontWeight: 900, color: "#38bdf8", letterSpacing: "0.14em", marginTop: "5px" }}>CENTRAL REACTOR</div>
          <div style={{ fontSize: "10px", color: "#94a3b8" }}>6 Malls • 240+ Stores</div>
        </div>

        {/* 8 OUTER SPOKE STORE CARDS */}
        {NODES.map((n) => {
          const r = ((n.angle - 90) * Math.PI) / 180;
          const left = ((500 + Math.cos(r) * 355) / 1000) * 100, top = 410 + Math.sin(r) * 315;
          return (
            <Link key={n.id} href={n.href} className="spoke-card" style={{ position: "absolute", left: \`\${left}%\`, top: \`\${top}px\`, transform: "translate(-50%, -50%)", width: "210px", padding: "11px", borderRadius: "16px", background: "rgba(15,23,42,0.96)", border: \`2px solid \${n.color}\`, boxShadow: \`0 0 22px \${n.color}55\`, textDecoration: "none", color: "#fff", textAlign: "center", zIndex: 20 }}>
              <div style={{ fontSize: "9px", fontWeight: 900, color: n.color }}>⚡ {n.badge}</div>
              <div style={{ fontSize: "22px", margin: "2px 0" }}>{n.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: 900 }}>{n.title}</div>
              <div style={{ fontSize: "11px", color: "#cbd5e1", marginTop: "2px" }}>{n.sub}</div>
              <div style={{ fontSize: "11px", fontWeight: 800, color: n.color, marginTop: "4px" }}>Enter Wing →</div>
            </Link>
          );
        })}
      </div>

      {/* UNDER-NEXUS MAIN SEARCHES, 3-HR CONCIERGE & 12-MILE SANCTUARY ZIP RADAR */}
      <div style={{ maxWidth: "1060px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ background: "rgba(15,23,42,0.95)", border: "2px solid #f59e0b", borderRadius: "22px", padding: "24px", textAlign: "center" }}>
          <div style={{ fontSize: "12px", fontWeight: 900, color: "#38bdf8", letterSpacing: "0.12em" }}>🔍 MAIN NEXUS SEARCH • ALL 6 MALLS AT ONCE</div>
          <h2 style={{ fontSize: "22px", fontWeight: 900, margin: "6px 0 12px" }}>Search Any Storefront, Sanctuary or Item Below</h2>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search all malls (e.g. sensory, telescope, peptides, party, christmas, sports, CPR)..." style={{ width: "100%", maxWidth: "740px", padding: "14px 18px", borderRadius: "12px", border: "2px solid #f59e0b", background: "#030712", color: "#fff", fontSize: "15px" }} />
          {hits.length > 0 && (
            <div style={{ maxWidth: "740px", margin: "12px auto 0", display: "grid", gap: "8px" }}>
              {hits.map(h => (
                <Link key={h.id} href={h.href} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "#090d16", border: "1px solid #38bdf8", borderRadius: "10px", color: "#fbbf24", fontWeight: 800, textDecoration: "none" }}>
                  <span>{h.icon} {h.title} — {h.sub}</span><span style={{ color: "#38bdf8" }}>Open →</span>
                </Link>
              ))}
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px", marginTop: "20px", textAlign: "left" }}>
            <div style={{ background: "#090d16", border: "1px solid #38bdf8", borderRadius: "14px", padding: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: 900, color: "#38bdf8" }}>🎩 3-HOUR AI CONCIERGE (24-HR HOLD)</div>
              <p style={{ fontSize: "12px", color: "#cbd5e1", margin: "6px 0 12px" }}>Don&apos;t see it? We find it cheaper, email your direct link within 3 hours & lock it on a 24-hour hold!</p>
              <Link href="/stores/holistic-peptides-wellness" style={{ display: "inline-block", padding: "9px 14px", borderRadius: "8px", background: "#38bdf8", color: "#030712", fontWeight: 900, textDecoration: "none", fontSize: "12px" }}>🎩 Get It Within 3 Hrs →</Link>
            </div>

            <div style={{ background: "#090d16", border: "1px solid #f59e0b", borderRadius: "14px", padding: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: 900, color: "#fbbf24", marginBottom: "8px" }}>🌟 12-MILE SANCTUARY ZIP RADAR: <input value={zip} onChange={e => setZip(e.target.value)} maxLength={5} style={{ width: "80px", padding: "4px 8px", background: "#030712", border: "1px solid #f59e0b", color: "#fbbf24", borderRadius: "6px", fontWeight: 900 }} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "11px" }}>
                <Link href="/sanctuary/autism-spectrum" style={{ color: "#38bdf8", textDecoration: "none", fontWeight: 800 }}>🧩 Autism ({zip}) →</Link>
                <Link href="/sanctuary/md-mobility" style={{ color: "#facc15", textDecoration: "none", fontWeight: 800 }}>🌻 Mobility ({zip}) →</Link>
                <Link href="/sanctuary/blind-deaf" style={{ color: "#22d3ee", textDecoration: "none", fontWeight: 800 }}>🤟 Deaf/Blind ({zip}) →</Link>
                <Link href="/sanctuary/ptsd-veterans" style={{ color: "#2dd4bf", textDecoration: "none", fontWeight: 800 }}>🎖️ PTSD Valor ({zip}) →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`);
console.log("STEP 2 DONE!");
