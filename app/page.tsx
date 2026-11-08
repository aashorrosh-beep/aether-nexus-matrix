"use client";
import React, { useState } from "react";
import Link from "next/link";
import { NODES } from "./wheel-data";

// Multi-segment realistic jagged lightning path with side branches
function realLightning(cx: number, cy: number, tx: number, ty: number, seed: number) {
  const dx = tx - cx, dy = ty - cy;
  const nx = -dy, ny = dx;
  const pts = [
    [0.14, 0.06 * seed], [0.28, -0.09 * seed], [0.42, 0.11 * seed],
    [0.56, -0.07 * seed], [0.71, 0.09 * seed], [0.86, -0.05 * seed]
  ];
  let d = `M ${cx} ${cy}`;
  pts.forEach(([t, off]) => {
    d += ` L ${(cx + dx * t + nx * off).toFixed(1)} ${(cy + dy * t + ny * off).toFixed(1)}`;
  });
  d += ` L ${tx.toFixed(1)} ${ty.toFixed(1)}`;
  // Branch fork from midpoint
  const bx = cx + dx * 0.42 + nx * 0.11 * seed;
  const by = cy + dy * 0.42 + ny * 0.11 * seed;
  const fx = cx + dx * 0.68 + nx * 0.22 * seed;
  const fy = cy + dy * 0.68 + ny * 0.22 * seed;
  return { main: d, fork: `M ${bx.toFixed(1)} ${by.toFixed(1)} L ${fx.toFixed(1)} ${fy.toFixed(1)}` };
}

export default function NexusPowerHub() {
  const [q, setQ] = useState("");
  const [zip, setZip] = useState("77301");
  const [overdrive, setOverdrive] = useState(false);

  const hits = q.trim() ? NODES.filter(n => (n.title + " " + n.sub).toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div style={{ minHeight: "100vh", color: "#f8fafc", paddingBottom: "70px", position: "relative" }}>
      {/* TOP TITANIUM STATUS RIBBON */}
      <div style={{ background: "linear-gradient(90deg, #090a0f, #18181b, #090a0f)", borderBottom: "1px solid #ff007f", padding: "9px 16px", textAlign: "center", fontSize: "12px", fontWeight: 900, letterSpacing: "0.14em", color: "#e2e8f0" }}>
        ⚡ <span style={{ color: "#ff007f" }}>ALBS NEXUS MASTER POWER GRID</span> • 6 MULTI-MALLS • 240+ VERIFIED STOREFRONTS • INSURED 3–7 DAY DISPATCH
      </div>

      {/* EXECUTIVE SEARCH, 3-HR CONCIERGE & 12-MILE SANCTUARY CONSOLE */}
      <div style={{ maxWidth: "1080px", margin: "14px auto 0", padding: "0 20px", position: "relative", zIndex: 30 }}>
        <div style={{ background: "linear-gradient(145deg, rgba(24,24,27,0.96), rgba(9,10,15,0.98))", border: "1px solid #94a3b8", boxShadow: "0 0 35px rgba(255,0,127,0.22)", borderRadius: "16px", padding: "16px 20px", textAlign: "center" }}>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="SEARCH ALL 6 MALLS & 2,000+ SKUS (Telescopes, LV, Gucci, G.I. Joe, Squishmallows, Peptides, CPR, Sensory)..." style={{ width: "100%", maxWidth: "800px", padding: "12px 18px", borderRadius: "10px", border: "1px solid #ff007f", background: "#050608", color: "#fff", fontSize: "13px", fontWeight: 700, letterSpacing: "0.03em" }} />
          {hits.length > 0 && (
            <div style={{ maxWidth: "800px", margin: "8px auto 0", display: "grid", gap: "6px" }}>
              {hits.map(h => (
                <Link key={h.id} href={h.href} style={{ display: "flex", justifyContent: "space-between", padding: "9px 14px", background: "#090a0f", border: "1px solid #ff007f", borderRadius: "8px", color: "#fff", fontWeight: 800, textDecoration: "none", fontSize: "12px" }}>
                  <span>{h.title} — {h.sub}</span><span style={{ color: "#ff007f" }}>LAUNCH SECTOR →</span>
                </Link>
              ))}
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "10px", marginTop: "12px", textAlign: "left" }}>
            <div style={{ background: "#07080c", border: "1px solid #475569", borderRadius: "10px", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 900, color: "#ff007f", letterSpacing: "0.06em" }}>3-HOUR AI SOURCING CONCIERGE</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>We source any item cheaper & lock a 24-Hr Hold</div>
              </div>
              <Link href="/nostalgia/concierge" style={{ padding: "7px 13px", borderRadius: "6px", background: "linear-gradient(90deg, #ff007f, #e11d48)", color: "#fff", fontWeight: 900, textDecoration: "none", fontSize: "11px" }}>DISPATCH →</Link>
            </div>
            <div style={{ background: "#07080c", border: "1px solid #475569", borderRadius: "10px", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
              <span style={{ fontSize: "11px", fontWeight: 900, color: "#e2e8f0" }}>12-MILE SANCTUARY RADAR: <input value={zip} onChange={e => setZip(e.target.value)} maxLength={5} style={{ width: "64px", padding: "2px 6px", background: "#18181b", border: "1px solid #ff007f", color: "#fff", borderRadius: "4px", fontWeight: 900 }} /></span>
              <div style={{ display: "flex", gap: "10px", fontSize: "11px", fontWeight: 800 }}>
                <Link href="/sanctuary/autism-spectrum" style={{ color: "#38bdf8", textDecoration: "none" }}>Autism</Link>
                <Link href="/sanctuary/md-mobility" style={{ color: "#e2e8f0", textDecoration: "none" }}>Mobility</Link>
                <Link href="/sanctuary/blind-deaf" style={{ color: "#f472b6", textDecoration: "none" }}>Deaf/Blind</Link>
                <Link href="/sanctuary/ptsd-veterans" style={{ color: "#2dd4bf", textDecoration: "none" }}>PTSD Valor</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HIGH-VOLTAGE REACTOR & REAL-LIFE PHOTOGRAPHY PORTALS */}
      <div style={{ position: "relative", width: "100%", maxWidth: "1060px", height: "750px", margin: "6px auto 0", zIndex: 20 }}>
        <svg viewBox="0 0 1000 750" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 8 }}>
          <defs>
            <filter id="plasmaGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation={overdrive ? "7" : "4"} result="blur1" />
              <feGaussianBlur stdDeviation={overdrive ? "14" : "9"} result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle cx="500" cy="375" r="325" fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth="1" />
          <circle cx="500" cy="375" r="145" fill="none" stroke="rgba(255,0,127,0.45)" strokeWidth="1.5" />

          {NODES.map((n, i) => {
            const r = ((n.angle - 90) * Math.PI) / 180;
            const tx = 500 + Math.cos(r) * 380, ty = 375 + Math.sin(r) * 290;
            const b1 = realLightning(500, 375, tx, ty, i % 2 === 0 ? 1 : -1);
            const b2 = realLightning(500, 375, tx, ty, i % 2 === 0 ? -0.65 : 0.65);
            return (
              <g key={n.id} filter="url(#plasmaGlow)" style={{ animation: `arcFlicker ${overdrive ? 0.45 : 1.3 + (i % 3) * 0.3}s infinite` }}>
                {/* Outer Fiery Pink Plasma Bolt */}
                <path d={b1.main} fill="none" stroke="#ff007f" strokeWidth={overdrive ? "5" : "3.2"} />
                <path d={b1.fork} fill="none" stroke="#ff007f" strokeWidth="2" />
                {/* Inner White-Hot Core Bolt */}
                <path d={b1.main} fill="none" stroke="#ffffff" strokeWidth="1.3" />
                {/* Secondary Silver-Blue Arc */}
                <path d={b2.main} fill="none" stroke="#cbd5e1" strokeWidth="1.6" strokeOpacity="0.85" />
              </g>
            );
          })}
        </svg>

        {/* CENTER DETONATOR / TRIGGER CORE: ALBS NEXUS */}
        <button
          onClick={() => setOverdrive(!overdrive)}
          style={{
            position: "absolute", left: "50%", top: "375px", width: "208px", height: "208px", borderRadius: "50%",
            background: "radial-gradient(circle at 35% 30%, #475569 0%, #18181b 52%, #050608 88%)",
            border: "3px solid #e2e8f0",
            outline: "2px solid #ff007f",
            outlineOffset: "6px",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            textAlign: "center", zIndex: 25, cursor: "pointer", color: "#fff",
            animation: "triggerPulse 2.6s ease-in-out infinite"
          }}
        >
          <div style={{ fontSize: "10px", fontWeight: 900, color: "#ff007f", letterSpacing: "0.18em" }}>
            {overdrive ? "⚡ OVERDRIVE ENGAGED ⚡" : "● MASTER IGNITION ●"}
          </div>
          <div style={{ fontSize: "27px", fontWeight: 900, letterSpacing: "0.1em", color: "#f8fafc", lineHeight: 1.02, margin: "6px 0", textShadow: "0 0 18px #ff007f" }}>
            ALBS<br/>NEXUS
          </div>
          <div style={{ fontSize: "9px", fontWeight: 900, background: "linear-gradient(90deg, #ff007f, #9333ea)", color: "#fff", padding: "3px 10px", borderRadius: "4px", letterSpacing: "0.1em" }}>
            {overdrive ? "MAX POWER ACTIVE" : "PUSH TO POWER UP"}
          </div>
          <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "5px", fontWeight: 700 }}>6 Malls • 240+ Storefronts</div>
        </button>

        {/* 8 REAL-LIFE PHOTOGRAPHY SECTOR PORTALS */}
        {NODES.map((n) => {
          const r = ((n.angle - 90) * Math.PI) / 180;
          const left = ((500 + Math.cos(r) * 380) / 1000) * 100, top = 375 + Math.sin(r) * 290;
          return (
            <Link
              key={n.id}
              href={n.href}
              className="photo-node"
              style={{
                position: "absolute", left: `${left}%`, top: `${top}px`, transform: "translate(-50%, -50%)",
                width: "226px", height: "138px", borderRadius: "12px", overflow: "hidden",
                border: "1.5px solid #cbd5e1",
                boxShadow: "0 10px 30px rgba(0,0,0,0.85), 0 0 18px rgba(255,0,127,0.35)",
                textDecoration: "none", color: "#fff", zIndex: 20, display: "flex", flexDirection: "column", justifyContent: "space-between",
                backgroundImage: `linear-gradient(180deg, rgba(5,6,8,0.35) 0%, rgba(5,6,8,0.88) 72%, rgba(5,6,8,0.97) 100%), url('${n.img}')`,
                backgroundSize: "cover", backgroundPosition: "center"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 10px", background: "rgba(9,10,15,0.78)", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                <span style={{ fontSize: "9px", fontWeight: 900, color: "#ff007f", letterSpacing: "0.08em" }}>⚡ {n.badge}</span>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: n.accent, boxShadow: `0 0 8px ${n.accent}` }} />
              </div>
              <div style={{ padding: "8px 11px 10px", textAlign: "left" }}>
                <div style={{ fontSize: "13px", fontWeight: 900, letterSpacing: "0.03em", color: "#f8fafc", textShadow: "0 2px 6px #000" }}>{n.title}</div>
                <div style={{ fontSize: "10.5px", color: "#cbd5e1", marginTop: "2px", lineHeight: 1.25 }}>{n.sub}</div>
                <div style={{ fontSize: "10px", fontWeight: 900, color: "#ff007f", marginTop: "4px", letterSpacing: "0.06em" }}>ENTER SECTOR →</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* BOTTOM EXECUTIVE DIRECT ACCESS BAR */}
      <div style={{ maxWidth: "1080px", margin: "12px auto 0", padding: "0 20px" }}>
        <div style={{ background: "linear-gradient(90deg, #090a0f, #18181b, #090a0f)", border: "1px solid #94a3b8", borderRadius: "12px", padding: "12px 18px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "10px", fontSize: "12px", fontWeight: 900, letterSpacing: "0.04em" }}>
          <Link href="/nostalgia" style={{ color: "#e2e8f0", textDecoration: "none" }}>🌍 WORLD&apos;S FAIR 60s–90s PAVILION →</Link>
          <Link href="/stores/luxury-couture" style={{ color: "#ff007f", textDecoration: "none" }}>👑 LE GRAND SALON (LV • GUCCI • PRADA • RED-BOTTOMS) →</Link>
          <Link href="/stores/squish-blindbox" style={{ color: "#38bdf8", textDecoration: "none" }}>🧸 240-SKU PLUSH & BLIND-BOX VAULT →</Link>
          <Link href="/nostalgia/concierge" style={{ color: "#22c55e", textDecoration: "none" }}>🎩 VERIFIED 3-HR GRAIL CONCIERGE →</Link>
        </div>
      </div>
    </div>
  );
}
