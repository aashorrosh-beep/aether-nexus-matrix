"use client";
import React, { useState } from "react";
import Link from "next/link";
import { NODES } from "./wheel-data";

function realLightning(cx: number, cy: number, tx: number, ty: number, seed: number) {
  const dx = tx - cx, dy = ty - cy, nx = -dy, ny = dx;
  const pts = [[0.16, 0.06*seed], [0.32, -0.08*seed], [0.48, 0.1*seed], [0.66, -0.07*seed], [0.82, 0.06*seed]];
  let d = `M ${cx} ${cy}`;
  pts.forEach(([t, o]) => { d += ` L ${(cx+dx*t+nx*o).toFixed(1)} ${(cy+dy*t+ny*o).toFixed(1)}`; });
  d += ` L ${tx.toFixed(1)} ${ty.toFixed(1)}`;
  return d;
}

export default function NexusResponsiveHub() {
  const [q, setQ] = useState("");
  const [zip, setZip] = useState("77301");
  const [overdrive, setOverdrive] = useState(false);

  const hits = q.trim() ? NODES.filter(n => (n.title + " " + n.sub).toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div style={{ minHeight: "100vh", color: "#f8fafc", paddingBottom: "60px", width: "100%" }}>
      <div style={{ background: "linear-gradient(90deg, #090a0f, #18181b, #090a0f)", borderBottom: "1px solid #ff007f", padding: "8px 12px", textAlign: "center", fontSize: "11px", fontWeight: 900, letterSpacing: "0.1em" }}>
        ⚡ <span style={{ color: "#ff007f" }}>ALBS NEXUS POWER GRID</span> • 6 MALLS • 240+ STORES • MOBILE & DESKTOP READY
      </div>

      {/* TOP SEARCH & RADAR CONSOLE */}
      <div style={{ maxWidth: "1060px", margin: "12px auto 0", padding: "0 12px", position: "relative", zIndex: 30 }}>
        <div style={{ background: "rgba(15,17,24,0.96)", border: "1px solid #94a3b8", boxShadow: "0 0 30px rgba(255,0,127,0.2)", borderRadius: "14px", padding: "14px", textAlign: "center" }}>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search all 6 Malls (Squishmallows, LV, Gucci, G.I. Joe, Scopes, Peptides, CPR)..." style={{ width: "100%", maxWidth: "780px", padding: "11px 14px", borderRadius: "10px", border: "1px solid #ff007f", background: "#050608", color: "#fff", fontSize: "13px", fontWeight: 700 }} />
          {hits.length > 0 && (
            <div style={{ maxWidth: "780px", margin: "8px auto 0", display: "grid", gap: "6px" }}>
              {hits.map(h => (
                <Link key={h.id} href={h.href} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#090a0f", border: "1px solid #ff007f", borderRadius: "8px", color: "#fff", fontWeight: 800, textDecoration: "none", fontSize: "12px" }}>
                  <span>{h.title}</span><span style={{ color: "#ff007f" }}>OPEN →</span>
                </Link>
              ))}
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "8px", marginTop: "10px", textAlign: "left" }}>
            <div style={{ background: "#07080c", border: "1px solid #475569", borderRadius: "10px", padding: "9px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: 900, color: "#ff007f" }}>🎩 3-HR AI CONCIERGE (24-HR HOLD)</span>
              <Link href="/nostalgia/concierge" style={{ padding: "6px 10px", borderRadius: "6px", background: "#ff007f", color: "#fff", fontWeight: 900, textDecoration: "none", fontSize: "10px", whiteSpace: "nowrap" }}>DISPATCH →</Link>
            </div>
            <div style={{ background: "#07080c", border: "1px solid #475569", borderRadius: "10px", padding: "9px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
              <span style={{ fontSize: "11px", fontWeight: 900, color: "#e2e8f0" }}>12-MI RADAR: <input value={zip} onChange={e => setZip(e.target.value)} maxLength={5} style={{ width: "58px", padding: "2px 5px", background: "#18181b", border: "1px solid #ff007f", color: "#fff", borderRadius: "4px", fontWeight: 900 }} /></span>
              <div style={{ display: "flex", gap: "8px", fontSize: "10.5px", fontWeight: 800 }}>
                <Link href="/sanctuary/autism-spectrum" style={{ color: "#38bdf8", textDecoration: "none" }}>Autism</Link>
                <Link href="/sanctuary/md-mobility" style={{ color: "#e2e8f0", textDecoration: "none" }}>Mobility</Link>
                <Link href="/sanctuary/blind-deaf" style={{ color: "#f472b6", textDecoration: "none" }}>Deaf/Blind</Link>
                <Link href="/sanctuary/ptsd-veterans" style={{ color: "#2dd4bf", textDecoration: "none" }}>PTSD</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. DESKTOP FULL-SCREEN SPOKE & WHEEL (>960px) */}
      <div className="desktop-wheel" style={{ position: "relative", width: "100%", maxWidth: "1000px", height: "720px", margin: "8px auto 0" }}>
        <svg viewBox="0 0 1000 720" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 8 }}>
          <circle cx="500" cy="360" r="305" fill="none" stroke="rgba(148,163,184,0.22)" strokeWidth="1" />
          {NODES.map((n, i) => {
            const r = ((n.angle - 90) * Math.PI) / 180, tx = 500 + Math.cos(r) * 355, ty = 360 + Math.sin(r) * 275;
            const b1 = realLightning(500, 360, tx, ty, i % 2 === 0 ? 1 : -1);
            return (
              <g key={n.id} style={{ animation: `arcFlicker ${overdrive ? 0.45 : 1.3 + (i % 3) * 0.3}s infinite` }}>
                <path d={b1} fill="none" stroke="#ff007f" strokeWidth={overdrive ? "5" : "3.2"} />
                <path d={b1} fill="none" stroke="#ffffff" strokeWidth="1.2" />
              </g>
            );
          })}
        </svg>

        <button onClick={() => setOverdrive(!overdrive)} style={{ position: "absolute", left: "50%", top: "360px", transform: "translate(-50%, -50%)", width: "196px", height: "196px", borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #475569 0%, #18181b 55%, #050608 90%)", border: "3px solid #e2e8f0", outline: "2px solid #ff007f", outlineOffset: "5px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", cursor: "pointer", zIndex: 25, animation: "triggerPulse 2.6s infinite" }}>
          <div style={{ fontSize: "9px", fontWeight: 900, color: "#ff007f", letterSpacing: "0.14em" }}>{overdrive ? "⚡ OVERDRIVE ACTIVE ⚡" : "● MASTER IGNITION ●"}</div>
          <div style={{ fontSize: "25px", fontWeight: 900, margin: "4px 0", textShadow: "0 0 16px #ff007f", lineHeight: 1 }}>ALBS<br/>NEXUS</div>
          <div style={{ fontSize: "9px", fontWeight: 900, background: "#ff007f", padding: "3px 8px", borderRadius: "4px" }}>PUSH TO POWER UP</div>
        </button>

        {NODES.map((n) => {
          const r = ((n.angle - 90) * Math.PI) / 180;
          const left = ((500 + Math.cos(r) * 355) / 1000) * 100, top = 360 + Math.sin(r) * 275;
          return (
            <Link key={n.id} href={n.href} className="photo-node" style={{ position: "absolute", left: `${left}%`, top: `${top}px`, transform: "translate(-50%, -50%)", width: "212px", height: "130px", borderRadius: "12px", overflow: "hidden", border: "1.5px solid #cbd5e1", boxShadow: "0 8px 25px rgba(0,0,0,0.85), 0 0 16px rgba(255,0,127,0.35)", textDecoration: "none", color: "#fff", zIndex: 20, display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundImage: `linear-gradient(180deg, rgba(5,6,8,0.3) 0%, rgba(5,6,8,0.92) 75%), url('${n.img}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <div style={{ padding: "5px 9px", background: "rgba(9,10,15,0.8)", fontSize: "9px", fontWeight: 900, color: "#ff007f" }}>⚡ {n.badge}</div>
              <div style={{ padding: "6px 10px 8px" }}>
                <div style={{ fontSize: "12.5px", fontWeight: 900 }}>{n.title}</div>
                <div style={{ fontSize: "10px", color: "#cbd5e1", lineHeight: 1.2 }}>{n.sub}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 2. CELL PHONE & HALF-SCREEN RESPONSIVE LIGHTNING GRID (<960px) */}
      <div className="mobile-reactor" style={{ maxWidth: "680px", margin: "14px auto 0", padding: "0 12px", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <button onClick={() => setOverdrive(!overdrive)} style={{ width: "164px", height: "164px", borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #475569 0%, #18181b 55%, #050608 90%)", border: "3px solid #e2e8f0", outline: "2px solid #ff007f", outlineOffset: "4px", color: "#fff", cursor: "pointer", animation: "triggerPulse 2.6s infinite" }}>
            <div style={{ fontSize: "8px", fontWeight: 900, color: "#ff007f" }}>{overdrive ? "⚡ OVERDRIVE ⚡" : "● IGNITION CORE ●"}</div>
            <div style={{ fontSize: "21px", fontWeight: 900, margin: "4px 0", textShadow: "0 0 14px #ff007f", lineHeight: 1 }}>ALBS<br/>NEXUS</div>
            <div style={{ fontSize: "8px", fontWeight: 900, background: "#ff007f", padding: "2px 7px", borderRadius: "4px", display: "inline-block" }}>TAP TO POWER UP</div>
          </button>
        </div>

        {/* 2-COLUMN MOBILE/HALF-SCREEN PHOTO PORTAL GRID (ZERO CLIPPING) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
          {NODES.map((n) => (
            <Link key={n.id} href={n.href} className="photo-node" style={{ height: "136px", borderRadius: "12px", overflow: "hidden", border: "1.5px solid #cbd5e1", boxShadow: "0 6px 20px rgba(0,0,0,0.8), 0 0 15px rgba(255,0,127,0.35)", textDecoration: "none", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundImage: `linear-gradient(180deg, rgba(5,6,8,0.28) 0%, rgba(5,6,8,0.92) 74%), url('${n.img}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: "rgba(9,10,15,0.82)", fontSize: "9px", fontWeight: 900, color: "#ff007f" }}>
                <span>⚡ {n.badge}</span>
                <span style={{ color: "#e2e8f0" }}>ONLINE ●</span>
              </div>
              <div style={{ padding: "8px 12px 10px" }}>
                <div style={{ fontSize: "14px", fontWeight: 900 }}>{n.title}</div>
                <div style={{ fontSize: "11px", color: "#cbd5e1", marginTop: "2px" }}>{n.sub}</div>
                <div style={{ fontSize: "10px", fontWeight: 900, color: "#ff007f", marginTop: "4px" }}>TAP TO ENTER SECTOR →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* BOTTOM QUICK ACCESS BAR */}
      <div style={{ maxWidth: "1060px", margin: "16px auto 0", padding: "0 12px" }}>
        <div style={{ background: "#090a0f", border: "1px solid #94a3b8", borderRadius: "12px", padding: "12px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "10px", fontSize: "11.5px", fontWeight: 900 }}>
          <Link href="/nostalgia" style={{ color: "#e2e8f0", textDecoration: "none" }}>🌍 WORLD&apos;S FAIR 60s–90s →</Link>
          <Link href="/stores/luxury-couture" style={{ color: "#ff007f", textDecoration: "none" }}>👑 LE GRAND SALON (LV • GUCCI • PRADA) →</Link>
          <Link href="/stores/squish-blindbox" style={{ color: "#38bdf8", textDecoration: "none" }}>🧸 240-SKU SQUISH & BLIND VAULT →</Link>
          <Link href="/nostalgia/concierge" style={{ color: "#22c55e", textDecoration: "none" }}>🎩 3-HR GRAIL CONCIERGE →</Link>
        </div>
      </div>
    </div>
  );
}
