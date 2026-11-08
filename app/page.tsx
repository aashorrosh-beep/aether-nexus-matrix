"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NODES, ACCOMPLISHMENTS } from "./wheel-data";

function jaggedBolt(cx: number, cy: number, tx: number, ty: number, s: number) {
  const dx = tx - cx, dy = ty - cy, px = -dy * 0.11 * s, py = dx * 0.11 * s;
  return `M ${cx} ${cy} L ${cx+dx*0.2+px} ${cy+dy*0.2+py} L ${cx+dx*0.38-px*0.7} ${cy+dy*0.38-py*0.7} L ${cx+dx*0.58+px*1.1} ${cy+dy*0.58+py*1.1} L ${cx+dx*0.78-px*0.6} ${cy+dy*0.78-py*0.6} L ${tx} ${ty}`;
}

function getCardStyle(n: any, left: number, top: number): React.CSSProperties {
  const base: React.CSSProperties = { position: "absolute", left: `${left}%`, top: `${top}px`, transform: "translate(-50%, -50%)", width: "212px", padding: "12px", textDecoration: "none", color: "#fff", textAlign: "center", zIndex: 20 };
  if ((n.theme === "squishy" || n.theme === "steel")) return { ...base, borderRadius: "48% 52% 46% 54% / 54% 48% 52% 46%", background: "radial-gradient(circle at 35% 30%, #fbcfe8, #ec4899 65%, #9d174d)", border: "4px solid #fdf2f8", boxShadow: "0 12px 32px rgba(236,72,153,0.65), inset 0 8px 16px rgba(255,255,255,0.6)", animation: "squishyBounce 2.8s ease-in-out infinite" };
  if (n.theme === "globe") return { ...base, width: "204px", height: "204px", borderRadius: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "radial-gradient(circle at 35% 30%, #0284c7 0%, #0369a1 35%, #1e3a8a 68%, #78350f 100%)", border: "3px solid #fbbf24", outline: "2px dashed rgba(251,191,36,0.65)", outlineOffset: "6px", animation: "globeGlow 3.5s ease-in-out infinite" };
  if (n.theme === "steel") return { ...base, borderRadius: "14px", clipPath: "polygon(8% 0, 92% 0, 100% 18%, 100% 82%, 92% 100%, 8% 100%, 0 82%, 0 18%)", background: "linear-gradient(135deg, #f8fafc 0%, #94a3b8 25%, #1e293b 50%, #cbd5e1 78%, #0f172a 100%)", border: "3px solid #e2e8f0", color: "#020617", animation: "steelSpark 2.2s ease-in-out infinite" };
  if (n.theme === "stadium") return { ...base, borderRadius: "999px", background: "repeating-linear-gradient(90deg, #14532d 0px, #14532d 18px, #166534 18px, #166534 36px)", border: "4px solid #f8fafc", boxShadow: "0 0 35px rgba(34,197,94,0.85), inset 0 0 20px rgba(255,255,255,0.35)" };
  if (n.theme === "dome") return { ...base, borderRadius: "110px 110px 18px 18px", background: "radial-gradient(circle at 50% 20%, #1e40af, #090d16 80%)", border: "3px solid #60a5fa", boxShadow: "0 0 30px rgba(96,165,250,0.6)" };
  if (n.theme === "beacon") return { ...base, borderRadius: "32px 32px 14px 14px", background: "linear-gradient(180deg, #0284c7 0%, #0f172a 75%)", border: "3px solid #fde047", boxShadow: "0 -18px 45px rgba(56,189,248,0.85)" };
  if (n.theme === "nursery") return { ...base, borderRadius: "38px", background: "linear-gradient(135deg, #134e4a, #0f172a)", border: "3px dashed #5eead4", boxShadow: "0 0 28px rgba(45,212,191,0.5)" };
  return { ...base, borderRadius: "24px", background: "linear-gradient(135deg, #881337, #1e1b4b)", border: "3px solid #fb7185", boxShadow: "0 0 30px rgba(244,63,94,0.6)" };
}
export default function NexusLunarLobby() {
  const [q, setQ] = useState("");
  const [zip, setZip] = useState("77301");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % ACCOMPLISHMENTS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const hits = q.trim() ? NODES.filter(n => (n.title + " " + n.sub).toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 58%, #1e1b4b 0%, #090d16 55%, #02040a 100%)", color: "#f8fafc", paddingBottom: "70px", overflow: "hidden" }}>
      {/* TIMED ACHIEVEMENT & MILESTONE SKY-PROJECTOR (NEVER CLIPS) */}
      <div style={{ background: "linear-gradient(90deg, #090d16, #1e1b4b, #090d16)", borderBottom: "2px solid #f59e0b", padding: "9px 16px", textAlign: "center", fontSize: "13px", fontWeight: 900, color: "#fef08a", letterSpacing: "0.04em" }}>
        {ACCOMPLISHMENTS[idx]}
      </div>

      {/* TOP COMMAND CONSOLE */}
      <div style={{ maxWidth: "1060px", margin: "12px auto 0", padding: "0 20px", position: "relative", zIndex: 30 }}>
        <div style={{ background: "rgba(9,13,22,0.94)", border: "2px solid #f59e0b", borderRadius: "20px", padding: "14px 20px", textAlign: "center" }}>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search all 6 Malls & 240+ Storefronts (Squishmallows, World's Fair, LV, Gucci, Sensory, Scopes, CPR)..." style={{ width: "100%", maxWidth: "760px", padding: "11px 16px", borderRadius: "12px", border: "2px solid #f59e0b", background: "#030712", color: "#fff", fontSize: "14px" }} />
          {hits.length > 0 && (
            <div style={{ maxWidth: "760px", margin: "8px auto 0", display: "grid", gap: "6px" }}>
              {hits.map(h => (
                <Link key={h.id} href={h.href} style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px", background: "#090d16", border: "1px solid #38bdf8", borderRadius: "8px", color: "#fbbf24", fontWeight: 800, textDecoration: "none" }}>
                  <span>{h.title} — {h.sub}</span><span style={{ color: "#38bdf8" }}>Enter →</span>
                </Link>
              ))}
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "10px", marginTop: "10px", textAlign: "left" }}>
            <div style={{ background: "#030712", border: "1px solid #38bdf8", borderRadius: "12px", padding: "9px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: 900, color: "#38bdf8" }}>🎩 3-HR AI CONCIERGE (24-HR HOLD)</span>
              <Link href="/nostalgia/concierge" style={{ padding: "6px 12px", borderRadius: "8px", background: "#38bdf8", color: "#030712", fontWeight: 900, textDecoration: "none", fontSize: "11px" }}>Hunt Grail →</Link>
            </div>
            <div style={{ background: "#030712", border: "1px solid #f59e0b", borderRadius: "12px", padding: "9px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
              <span style={{ fontSize: "11px", fontWeight: 900, color: "#fbbf24" }}>🎗️ 12-MI SANCTUARY ZIP: <input value={zip} onChange={e => setZip(e.target.value)} maxLength={5} style={{ width: "64px", padding: "2px 6px", background: "#090d16", border: "1px solid #f59e0b", color: "#fbbf24", borderRadius: "6px", fontWeight: 900 }} /></span>
              <div style={{ display: "flex", gap: "8px", fontSize: "11px", fontWeight: 800 }}>
                <Link href="/sanctuary/autism-spectrum" style={{ color: "#38bdf8", textDecoration: "none" }}>🧩Autism</Link>
                <Link href="/sanctuary/md-mobility" style={{ color: "#facc15", textDecoration: "none" }}>🌻Mobility</Link>
                <Link href="/sanctuary/blind-deaf" style={{ color: "#22d3ee", textDecoration: "none" }}>🤟Deaf/Blind</Link>
                <Link href="/sanctuary/ptsd-veterans" style={{ color: "#2dd4bf", textDecoration: "none" }}>🎖️PTSD</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SPOKE & WHEEL WITH REAL JAGGED LIGHTNING & CUSTOM-SHAPED ROOMS */}
      <div style={{ position: "relative", width: "100%", maxWidth: "1020px", height: "720px", margin: "4px auto 0", zIndex: 20 }}>
        <svg viewBox="0 0 1000 720" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 5 }}>
          <circle cx="500" cy="360" r="305" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" strokeDasharray="8 8" />
          {NODES.map((n, i) => {
            const r = ((n.angle - 90) * Math.PI) / 180, tx = 500 + Math.cos(r) * 380, ty = 360 + Math.sin(r) * 290;
            return (
              <g key={n.id} style={{ animation: `flashBolt ${1.6 + (i % 3) * 0.4}s ease-in-out infinite` }}>
                <path d={jaggedBolt(500, 360, tx, ty, 1)} fill="none" stroke="#38bdf8" strokeWidth="3.5" />
                <path d={jaggedBolt(500, 360, tx, ty, -0.7)} fill="none" stroke="#fde047" strokeWidth="2.2" />
              </g>
            );
          })}
        </svg>

        {/* CENTER LUNAR ENERGY CORE */}
        <div style={{ position: "absolute", left: "50%", top: "360px", width: "208px", height: "208px", borderRadius: "50%", background: "radial-gradient(circle at 32% 30%, #fef9c3 0%, #fde047 28%, #f59e0b 62%, #78350f 92%, #090d16 100%)", border: "4px solid #fef08a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: 25, animation: "moonPulse 3.2s ease-in-out infinite" }}>
          <div style={{ fontSize: "24px" }}>🌕👑⚡</div>
          <div style={{ fontSize: "24px", fontWeight: 900, color: "#020617", lineHeight: 1.02, marginTop: "2px" }}>ALBS<br/>NEXUS</div>
          <div style={{ fontSize: "9px", fontWeight: 900, color: "#090d16", background: "#fef08a", padding: "2px 8px", borderRadius: "999px", marginTop: "4px" }}>HIGH-VOLTAGE CORE</div>
          <div style={{ fontSize: "10px", fontWeight: 900, color: "#1e293b", marginTop: "2px" }}>6 Malls • 240+ Stores</div>
        </div>

        {/* 8 CUSTOM-THEMED ORBITAL WORLDS */}
        {NODES.map((n) => {
          const r = ((n.angle - 90) * Math.PI) / 180;
          const left = ((500 + Math.cos(r) * 380) / 1000) * 100, top = 360 + Math.sin(r) * 290;
          return (
            <Link key={n.id} href={n.href} className="world-node" style={getCardStyle(n, left, top)}>
              <div style={{ fontSize: "9px", fontWeight: 900, color: (n.theme === "squishy" || n.theme === "steel") ? "#831843" : "#fef08a", letterSpacing: "0.06em" }}>⚡ {n.badge}</div>
              <div style={{ fontSize: (n.theme === "squishy" || n.theme === "steel") ? "24px" : "20px", fontWeight: 900, margin: "3px 0", color: (n.theme === "squishy" || n.theme === "steel") ? "#831843" : "#fff" }}>{n.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: 900, color: (n.theme === "squishy" || n.theme === "steel") ? "#500724" : "#fff" }}>{n.title}</div>
              <div style={{ fontSize: "11px", color: (n.theme === "squishy" || n.theme === "steel") ? "#831843" : "#e2e8f0", fontWeight: 700, marginTop: "2px" }}>{n.sub}</div>
              <div style={{ fontSize: "11px", fontWeight: 900, color: (n.theme === "squishy" || n.theme === "steel") ? "#fff" : n.color, marginTop: "4px" }}>Enter World →</div>
            </Link>
          );
        })}
      </div>

      {/* BOTTOM WORLD'S FAIR & LUXURY SKYLINE BAR */}
      <div style={{ maxWidth: "1060px", margin: "8px auto 0", padding: "0 20px" }}>
        <div style={{ background: "#090d16", border: "2px solid #f59e0b", borderRadius: "16px", padding: "12px 18px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "10px", fontSize: "13px", fontWeight: 900 }}>
          <Link href="/nostalgia" style={{ color: "#fbbf24", textDecoration: "none" }}>🌍 World&apos;s Fair 60s–90s Poster Pavilion →</Link>
          <Link href="/stores/luxury-couture" style={{ color: "#f472b6", textDecoration: "none" }}>👑 Le Grand Salon (LV • Gucci • Prada • Red-Bottoms) →</Link>
          <Link href="/stores/squish-blindbox" style={{ color: "#38bdf8", textDecoration: "none" }}>🧸 240-SKU Squishy & Blind-Box Vault →</Link>
          <Link href="/nostalgia/concierge" style={{ color: "#22c55e", textDecoration: "none" }}>🎩 Verified 3-Hr Grail Concierge →</Link>
        </div>
      </div>
    </div>
  );
}
