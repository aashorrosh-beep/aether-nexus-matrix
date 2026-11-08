"use client";
import React, { useState } from "react";
import Link from "next/link";
import { NODES } from "./wheel-data";

const BUZZ = [
  "🔥 'Just locked a Custom 5-Pack Squishmallow & Labubu Blind-Box Bundle at strict 10% margin!' — @SarahK_TX",
  "⚡ 'The 3-Hour AI Concierge found a mint 1985 G.I. Joe USS Flagg & held the price for 24 hrs!' — @RetroVault_88",
  "🌕 'This Lunar Spoke-and-Wheel Mall is wild — went from World's Fair 70s Pulsar Watches straight to VR Rigs!' — @TechKing_HTX",
  "🌟 '12-Mile Sanctuary ZIP Radar matched our clinic with sensory swings & free infant CPR in 30 seconds!' — @PediatricCare_77301",
  "👑 'Le Grand Salon had authenticated LV trunks & cashmere throws right next to the Nostalgia Wall!' — @LuxuryCollector"
];

function bolt(cx: number, cy: number, tx: number, ty: number, f: number) {
  const dx = tx - cx, dy = ty - cy, px = -dy * 0.09 * f, py = dx * 0.09 * f;
  return `M ${cx} ${cy} L ${cx+dx*0.25+px} ${cy+dy*0.25+py} L ${cx+dx*0.5-px} ${cy+dy*0.5-py} L ${cx+dx*0.75+px} ${cy+dy*0.75+py} L ${tx} ${ty}`;
}

export default function NexusLunarLobby() {
  const [q, setQ] = useState("");
  const [zip, setZip] = useState("77301");
  const hits = q.trim() ? NODES.filter(n => (n.title + " " + n.sub).toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div style={{ minHeight: "100vh", position: "relative", background: "radial-gradient(circle at 50% 62%, #1e1b4b 0%, #090d16 55%, #02040a 100%)", color: "#f8fafc", paddingBottom: "90px", overflow: "hidden" }}>
      {/* LIVE VIRAL BUZZ TICKER */}
      <div style={{ background: "#090d16", borderBottom: "1px solid #f59e0b", padding: "8px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-block", animation: "tickerMove 34s linear infinite", fontSize: "12px", fontWeight: 800, color: "#fbbf24" }}>
          {[...BUZZ, ...BUZZ].map((b, i) => <span key={i} style={{ marginRight: "48px" }}>{b}</span>)}
        </div>
      </div>

      {/* TOP COMMAND CONSOLE */}
      <div style={{ maxWidth: "1060px", margin: "14px auto 4px", padding: "0 20px", position: "relative", zIndex: 30 }}>
        <div style={{ background: "rgba(9,13,22,0.92)", border: "2px solid #f59e0b", borderRadius: "20px", padding: "16px 20px", textAlign: "center", boxShadow: "0 0 40px rgba(245,158,11,0.2)" }}>
          <div style={{ fontSize: "11px", fontWeight: 900, color: "#38bdf8", letterSpacing: "0.14em" }}>🌕 ALBS NEXUS LUNAR METROPOLIS • ALL 6 MALLS & 240+ STORES</div>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search all malls (e.g. Squishmallow, Labubu, G.I. Joe, LV, Gucci, sensory, telescope, peptides, CPR)..." style={{ width: "100%", maxWidth: "740px", marginTop: "8px", padding: "11px 16px", borderRadius: "12px", border: "2px solid #f59e0b", background: "#030712", color: "#fff", fontSize: "14px" }} />
          {hits.length > 0 && (
            <div style={{ maxWidth: "740px", margin: "10px auto 0", display: "grid", gap: "6px" }}>
              {hits.map(h => (
                <Link key={h.id} href={h.href} style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px", background: "#090d16", border: "1px solid #38bdf8", borderRadius: "8px", color: "#fbbf24", fontWeight: 800, textDecoration: "none" }}>
                  <span>{h.icon} {h.title} — {h.sub}</span><span style={{ color: "#38bdf8" }}>Enter →</span>
                </Link>
              ))}
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "10px", marginTop: "12px", textAlign: "left" }}>
            <div style={{ background: "#030712", border: "1px solid #38bdf8", borderRadius: "12px", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 900, color: "#38bdf8" }}>🎩 3-HOUR AI CONCIERGE (24-HR HOLD)</div>
                <div style={{ fontSize: "11px", color: "#cbd5e1" }}>We find any item cheaper & lock a 24-hr hold!</div>
              </div>
              <Link href="/nostalgia/concierge" style={{ padding: "8px 12px", borderRadius: "8px", background: "#38bdf8", color: "#030712", fontWeight: 900, textDecoration: "none", fontSize: "11px", whiteSpace: "nowrap" }}>🎩 Hunt Grail →</Link>
            </div>
            <div style={{ background: "#030712", border: "1px solid #f59e0b", borderRadius: "12px", padding: "10px 14px" }}>
              <div style={{ fontSize: "11px", fontWeight: 900, color: "#fbbf24", marginBottom: "4px" }}>🌟 12-MILE SANCTUARY ZIP RADAR: <input value={zip} onChange={e => setZip(e.target.value)} maxLength={5} style={{ width: "70px", padding: "2px 6px", background: "#090d16", border: "1px solid #f59e0b", color: "#fbbf24", borderRadius: "6px", fontWeight: 900 }} /></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 800 }}>
                <Link href="/sanctuary/autism-spectrum" style={{ color: "#38bdf8", textDecoration: "none" }}>🧩 Autism</Link>
                <Link href="/sanctuary/md-mobility" style={{ color: "#facc15", textDecoration: "none" }}>🌻 Mobility</Link>
                <Link href="/sanctuary/blind-deaf" style={{ color: "#22d3ee", textDecoration: "none" }}>🤟 Deaf/Blind</Link>
                <Link href="/sanctuary/ptsd-veterans" style={{ color: "#2dd4bf", textDecoration: "none" }}>🎖️ PTSD Valor</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING HOLOGRAM PICTURES IN THE AIR */}
      {[
        { icon: "🧸", lbl: "10% Squish Vault", left: "6%", top: "38%", d: "0s" },
        { icon: "👑", lbl: "LV & Gucci Salon", left: "88%", top: "36%", d: "1.2s" },
        { icon: "🕹️", lbl: "World's Fair 60s-90s", left: "8%", top: "68%", d: "2.1s" },
        { icon: "🔭", lbl: "300 Dark-Sky Scopes", left: "86%", top: "66%", d: "0.7s" },
        { icon: "🚀", lbl: "Matrix VR & AI", left: "14%", top: "84%", d: "1.6s" },
        { icon: "⌚", lbl: "Swiss Horology", left: "82%", top: "83%", d: "2.5s" }
      ].map((f, i) => (
        <div key={i} style={{ position: "absolute", left: f.left, top: f.top, padding: "8px 12px", borderRadius: "14px", background: "rgba(15,23,42,0.75)", border: "1px solid rgba(56,189,248,0.5)", boxShadow: "0 0 20px rgba(56,189,248,0.3)", fontSize: "12px", fontWeight: 800, color: "#e0f2fe", animation: `floatUp 5s ease-in-out ${f.d} infinite`, pointerEvents: "none", zIndex: 8 }}>
          <span style={{ fontSize: "18px", marginRight: "6px" }}>{f.icon}</span>{f.lbl}
        </div>
      ))}

      {/* LUNAR SPOKE & WHEEL REACTOR */}
      <div style={{ position: "relative", width: "100%", maxWidth: "1000px", height: "720px", margin: "0 auto", zIndex: 20 }}>
        <svg viewBox="0 0 1000 720" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 5 }}>
          <circle cx="500" cy="360" r="315" fill="none" stroke="rgba(56,189,248,0.35)" strokeWidth="2" strokeDasharray="12 8" />
          <circle cx="500" cy="360" r="225" fill="none" stroke="rgba(253,224,71,0.35)" strokeWidth="2" strokeDasharray="6 10" />
          {NODES.map((n, i) => {
            const r = ((n.angle - 90) * Math.PI) / 180, tx = 500 + Math.cos(r) * 355, ty = 360 + Math.sin(r) * 280;
            return (
              <g key={n.id}>
                <line x1="500" y1="360" x2={tx} y2={ty} stroke={n.color} strokeOpacity="0.35" strokeWidth="2.5" />
                <path d={bolt(500, 360, tx, ty, 1)} fill="none" stroke="#38bdf8" strokeWidth="3.2" strokeDasharray="16 10" style={{ animation: `boltOut ${1.4 + (i % 3) * 0.25}s linear infinite` }} />
                <path d={bolt(500, 360, tx, ty, -1)} fill="none" stroke="#fde047" strokeWidth="2.4" strokeDasharray="12 14" style={{ animation: `boltIn ${1.7 + (i % 4) * 0.2}s linear infinite` }} />
              </g>
            );
          })}
        </svg>

        <div style={{ position: "absolute", left: "50%", top: "360px", width: "252px", height: "252px", borderRadius: "50%", border: "2px dashed #38bdf8", animation: "spinCW 20s linear infinite", pointerEvents: "none", zIndex: 10 }} />

        {/* THE GLOWING MOON NEXUS CORE */}
        <div style={{ position: "absolute", left: "50%", top: "360px", width: "212px", height: "212px", borderRadius: "50%", background: "radial-gradient(circle at 32% 30%, #fef9c3 0%, #fde047 28%, #f59e0b 62%, #78350f 92%, #090d16 100%)", border: "4px solid #fef08a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: 25, animation: "moonPulse 3.2s ease-in-out infinite" }}>
          <div style={{ position: "absolute", width: "28px", height: "28px", borderRadius: "50%", background: "rgba(120,53,15,0.22)", top: "28px", left: "42px" }} />
          <div style={{ position: "absolute", width: "18px", height: "18px", borderRadius: "50%", background: "rgba(120,53,15,0.25)", bottom: "38px", right: "36px" }} />
          <div style={{ fontSize: "26px", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.8))" }}>🌕👑⚡</div>
          <div style={{ fontSize: "25px", fontWeight: 900, color: "#020617", letterSpacing: "0.06em", lineHeight: 1.02, marginTop: "2px", textShadow: "0 1px 10px rgba(255,255,255,0.8)" }}>ALBS<br/>NEXUS</div>
          <div style={{ fontSize: "10px", fontWeight: 900, color: "#090d16", background: "rgba(254,240,138,0.85)", padding: "2px 8px", borderRadius: "999px", marginTop: "4px" }}>LUNAR ENERGY CORE</div>
          <div style={{ fontSize: "10px", fontWeight: 800, color: "#1e293b", marginTop: "2px" }}>6 Malls • 240+ Stores</div>
        </div>

        {/* 8 ORBITAL STORE ROOMS */}
        {NODES.map((n) => {
          const r = ((n.angle - 90) * Math.PI) / 180;
          const left = ((500 + Math.cos(r) * 355) / 1000) * 100, top = 360 + Math.sin(r) * 280;
          return (
            <Link key={n.id} href={n.href} className="spoke-card" style={{ position: "absolute", left: `${left}%`, top: `${top}px`, transform: "translate(-50%, -50%)", width: "214px", padding: "11px", borderRadius: "18px", background: "rgba(9,13,22,0.92)", border: `2px solid ${n.color}`, boxShadow: `0 0 28px ${n.color}77`, textDecoration: "none", color: "#fff", textAlign: "center", zIndex: 20 }}>
              <div style={{ fontSize: "9px", fontWeight: 900, color: n.color }}>⚡ {n.badge}</div>
              <div style={{ fontSize: "22px", margin: "2px 0" }}>{n.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: 900 }}>{n.title}</div>
              <div style={{ fontSize: "11px", color: "#cbd5e1", marginTop: "2px" }}>{n.sub}</div>
              <div style={{ fontSize: "11px", fontWeight: 900, color: n.color, marginTop: "4px" }}>Enter Room →</div>
            </Link>
          );
        })}
      </div>

      {/* NEON METROPOLIS SKYLINE WALL AT THE HORIZON */}
      <div style={{ maxWidth: "1100px", margin: "6px auto 0", padding: "0 20px", textAlign: "center", position: "relative", zIndex: 25 }}>
        <div style={{ background: "linear-gradient(180deg, rgba(15,23,42,0.85), rgba(2,6,23,0.98))", borderTop: "2px solid #38bdf8", borderBottom: "2px solid #f59e0b", borderRadius: "18px", padding: "14px 20px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "10px" }}>
          <Link href="/nostalgia" style={{ color: "#fbbf24", fontWeight: 900, textDecoration: "none", fontSize: "13px" }}>🌍 World&apos;s Fair 60s–90s Pavilion →</Link>
          <Link href="/stores/luxury-couture" style={{ color: "#f472b6", fontWeight: 900, textDecoration: "none", fontSize: "13px" }}>👑 Le Grand Salon (LV • Gucci • Prada • Red-Bottoms) →</Link>
          <Link href="/stores/squish-blindbox" style={{ color: "#38bdf8", fontWeight: 900, textDecoration: "none", fontSize: "13px" }}>🧸 240-SKU Squishmallow & Blind-Box Vault →</Link>
          <Link href="/nostalgia/concierge" style={{ color: "#22c55e", fontWeight: 900, textDecoration: "none", fontSize: "13px" }}>🎩 Verified Vintage 3-Hr Concierge →</Link>
        </div>
      </div>
    </div>
  );
}
