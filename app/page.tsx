"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RIBBONS, NODES } from "./wheel-data";

function RibbonSVG({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <svg width="26" height="34" viewBox="0 0 36 44" style={{ flexShrink: 0, filter: `drop-shadow(0 0 6px ${c1})` }}>
      <path d="M18 4 C10 4 7 11 11 19 L24 41 L29 38 L16 17 C14 12 15 9 18 9 C21 9 22 12 20 17 L7 38 L12 41 L25 19 C29 11 26 4 18 4 Z" fill={c1} stroke={c2} strokeWidth="2.4" />
      <circle cx="18" cy="11" r="3.5" fill="#03040b" />
    </svg>
  );
}

function lightningSpoke(cx: number, cy: number, tx: number, ty: number, s: number) {
  const dx = tx - cx, dy = ty - cy, nx = -dy, ny = dx;
  const steps = [[0.2,0.05*s],[0.34,-0.07*s],[0.48,0.09*s],[0.63,-0.06*s],[0.78,0.07*s],[0.9,-0.03*s]];
  let m = `M ${cx} ${cy}`;
  steps.forEach(([t,o]) => { m += ` L ${(cx+dx*t+nx*o).toFixed(1)} ${(cy+dy*t+ny*o).toFixed(1)}`; });
  m += ` L ${tx.toFixed(1)} ${ty.toFixed(1)}`;
  const bx = cx+dx*0.48+nx*0.09*s, by = cy+dy*0.48+ny*0.09*s;
  const fx = cx+dx*0.7+nx*0.18*s, fy = cy+dy*0.7+ny*0.18*s;
  return { main: m, fork: `M ${bx.toFixed(1)} ${by.toFixed(1)} L ${fx.toFixed(1)} ${fy.toFixed(1)}` };
}

function lightningRing(cx: number, cy: number, r: number, spikes: number) {
  let d = "";
  for (let i = 0; i <= spikes; i++) {
    const a = (i / spikes) * Math.PI * 2;
    const jit = i % 2 === 0 ? r + 10 : r - 8;
    const x = (cx + Math.cos(a) * jit).toFixed(1), y = (cy + Math.sin(a) * jit).toFixed(1);
    d += (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
  }
  return d + " Z";
}

export default function AlbsNexusEnergyLobby() {
  const [q, setQ] = useState("");
  const [zips, setZips] = useState<Record<string, string>>({
    autism: "77301", down: "77301", deafblind: "77301", ptsd: "77301", mobility: "77301", peptides: "77301"
  });
  const [activeRadar, setActiveRadar] = useState<string | null>(null);

  const hits = q.trim() ? [...NODES, ...RIBBONS.map(r => ({ id: r.id, title: r.name, sub: r.sub, href: r.href }))].filter(n => (n.title + " " + n.sub).toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div style={{ minHeight: "100vh", color: "#f8fafc", paddingBottom: "60px" }}>
      <div style={{ maxWidth: "1200px", margin: "10px auto 0", padding: "0 14px", position: "relative", zIndex: 30 }}>
        <div style={{ background: "rgba(6,9,18,0.8)", borderRadius: "22px", padding: "12px 16px", boxShadow: "0 0 45px rgba(56,189,248,0.22)" }}>
          <h2 style={{ margin: "0 0 10px", textAlign: "center", fontSize: "17px", fontWeight: 900, letterSpacing: "0.18em", color: "#fef08a", textShadow: "0 0 16px rgba(250,204,21,0.75)" }}>
            🎗️ SANCTUARIES OF HOPE 🎗️
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))", gap: "10px" }}>
            {RIBBONS.map(r => (
              <div key={r.id} style={{ background: r.bg, borderRadius: "15px", padding: "9px", boxShadow: `0 0 22px ${r.accent}44`, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "6px" }}>
                <Link href={`${r.href}${r.href.includes("?") ? "&" : "?"}zip=${zips[r.id]}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
                  <RibbonSVG c1={r.r1} c2={r.r2} />
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 900, color: r.text }}>{r.name}</div>
                    <div style={{ fontSize: "9.5px", color: "#f8fafc", fontWeight: 700 }}>{r.sub}</div>
                  </div>
                </Link>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.65)", borderRadius: "8px", padding: "3px 7px" }}>
                  <span style={{ fontSize: "9px", fontWeight: 900, color: r.text }}>📍 12-Mi ZIP:</span>
                  <input value={zips[r.id]} onChange={e => setZips({ ...zips, [r.id]: e.target.value })} maxLength={5} style={{ width: "50px", background: "transparent", border: "none", borderBottom: `1px solid ${r.accent}`, color: "#fff", fontSize: "10px", fontWeight: 900, textAlign: "center" }} />
                  <Link href={`${r.href}${r.href.includes("?") ? "&" : "?"}zip=${zips[r.id]}`} style={{ fontSize: "9px", fontWeight: 900, color: r.accent, textDecoration: "none" }}>Go →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: "1240px", margin: "8px auto 0", padding: "0 10px" }}>
        {activeRadar && (
          <div style={{ maxWidth: "560px", margin: "0 auto 8px", padding: "8px 16px", borderRadius: "999px", background: "radial-gradient(circle, rgba(56,189,248,0.4), rgba(244,63,94,0.4))", textAlign: "center", fontSize: "11.5px", fontWeight: 900, color: "#fef08a" }}>
            📡 12-MILE RADAR ACTIVE: {activeRadar} — <Link href="/nostalgia/concierge" style={{ color: "#38bdf8", textDecoration: "underline" }}>Open Local Feed →</Link>
          </div>
        )}

        <div style={{ position: "relative", width: "100%", aspectRatio: "1240 / 820", minHeight: "620px" }}>
          <svg viewBox="0 0 1240 820" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 8 }}>
            <defs>
              <filter id="boltGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {/* LIGHTNING ARCS CRACKLING RIGHT AROUND THE CENTER ENERGY BALL */}
            <g filter="url(#boltGlow)" style={{ transformOrigin: "620px 410px", animation: "spinRingCW 16s linear infinite" }}>
              <path d={lightningRing(620, 410, 126, 38)} fill="none" stroke="#38bdf8" strokeWidth="3" />
              <path d={lightningRing(620, 410, 126, 38)} fill="none" stroke="#ffffff" strokeWidth="1.1" />
            </g>
            <g filter="url(#boltGlow)" style={{ transformOrigin: "620px 410px", animation: "spinRingCCW 12s linear infinite" }}>
              <path d={lightningRing(620, 410, 140, 44)} fill="none" stroke="#f43f5e" strokeWidth="2.8" />
              <path d={lightningRing(620, 410, 140, 44)} fill="none" stroke="#fde047" strokeWidth="1" />
            </g>

            {/* 8 FORKED REAL LIGHTNING BOLTS FROM CENTER BALL TO EVERY SPHERE */}
            {NODES.map((n, i) => {
              const r = ((n.angle - 90) * Math.PI) / 180, tx = 620 + Math.cos(r) * 445, ty = 410 + Math.sin(r) * 290;
              const b1 = lightningSpoke(620, 410, tx, ty, i % 2 === 0 ? 1 : -1);
              const b2 = lightningSpoke(620, 410, tx, ty, i % 2 === 0 ? -0.65 : 0.65);
              return (
                <g key={n.id} filter="url(#boltGlow)" style={{ animation: `boltFlicker ${1.4 + (i % 3) * 0.3}s infinite` }}>
                  <path d={b1.main} fill="none" stroke={n.glow} strokeWidth="4.2" />
                  <path d={b1.fork} fill="none" stroke="#38bdf8" strokeWidth="2.2" />
                  <path d={b2.main} fill="none" stroke="#f43f5e" strokeWidth="2" strokeOpacity="0.8" />
                  <path d={b1.main} fill="none" stroke="#ffffff" strokeWidth="1.4" />
                </g>
              );
            })}
          </svg>

          {/* DEAD-CENTER (50%, 50%) FREE-FLOATING ENERGY BALL WITH EMBEDDED SEARCH & CONCIERGE */}
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 30 }}>
            <div style={{
              width: "228px", height: "228px", borderRadius: "50%", border: "none",
              background: "radial-gradient(circle at 38% 32%, #ffffff 0%, #38bdf8 24%, #f43f5e 56%, #7e22ce 82%, transparent 100%)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "14px", textAlign: "center",
              animation: "corePulseOnly 3.2s ease-in-out infinite"
            }}>
              <div style={{ fontSize: "8.5px", fontWeight: 900, color: "#fef08a", letterSpacing: "0.14em", textShadow: "0 1px 4px #000" }}>⚡ PURE ENERGY CORE ⚡</div>
              <div style={{ fontSize: "23px", fontWeight: 900, color: "#fff", lineHeight: 0.98, margin: "3px 0 6px", textShadow: "0 0 14px #020617, 0 0 24px #f43f5e" }}>ALBS NEXUS</div>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search All Malls..." style={{ width: "178px", padding: "6px 10px", borderRadius: "999px", border: "none", background: "rgba(2,6,23,0.82)", color: "#fff", fontSize: "10.5px", fontWeight: 800, textAlign: "center", boxShadow: "0 0 12px rgba(56,189,248,0.8)" }} />
              <Link href="/nostalgia/concierge" style={{ marginTop: "6px", width: "178px", padding: "6px 8px", borderRadius: "999px", background: "linear-gradient(90deg, #f43f5e, #a855f7, #38bdf8)", color: "#fff", fontWeight: 900, fontSize: "9.5px", textDecoration: "none", boxShadow: "0 0 16px rgba(244,63,94,0.85)" }}>
                🎩 3-Hr AI Concierge →
              </Link>
            </div>
            {hits.length > 0 && (
              <div style={{ position: "absolute", top: "236px", left: "50%", transform: "translateX(-50%)", width: "240px", background: "rgba(6,9,18,0.96)", borderRadius: "12px", padding: "8px", display: "grid", gap: "4px", boxShadow: "0 0 30px #38bdf8", zIndex: 60 }}>
                {hits.map(h => (
                  <Link key={h.id} href={h.href} style={{ display: "flex", justifyContent: "space-between", padding: "5px 8px", background: "#0f172a", borderRadius: "6px", color: "#fef08a", fontSize: "10.5px", fontWeight: 800, textDecoration: "none" }}>
                    <span>{h.title}</span><span style={{ color: "#38bdf8" }}>Go →</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 8 BORDERLESS ENERGY SPHERES WITH UNCLIPPED FLOATING RADAR BADGES */}
          {NODES.map((n) => {
            const r = ((n.angle - 90) * Math.PI) / 180;
            const left = ((620 + Math.cos(r) * 445) / 1240) * 100, top = ((410 + Math.sin(r) * 290) / 820) * 100;
            return (
              <div key={n.id} className="energy-node" style={{ position: "absolute", left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -50%)", width: "166px", height: "166px", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
                <Link href={n.href} style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "none", boxShadow: `0 0 42px 12px ${n.glow}88, 0 0 80px 22px ${n.glow}44, inset 0 0 30px ${n.glow}`, backgroundImage: `radial-gradient(circle at 50% 30%, transparent 8%, rgba(2,6,23,0.84) 62%, ${n.glow}77 100%), url('${n.img}')`, backgroundSize: "cover", backgroundPosition: "center", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", padding: "14px 10px 26px", textAlign: "center" }}>
                  <div style={{ fontSize: "11.5px", fontWeight: 900, color: "#fff", textShadow: `0 0 12px ${n.glow}, 0 2px 6px #000`, lineHeight: 1.1 }}>{n.title}</div>
                  <div style={{ fontSize: "9.5px", color: n.text, fontWeight: 800, marginTop: "3px", lineHeight: 1.15, textShadow: "0 1px 4px #000" }}>{n.sub}</div>
                </Link>
                <button onClick={() => setActiveRadar(`${n.title} (${n.info})`)} style={{ position: "relative", zIndex: 25, transform: "translateY(8px)", whiteSpace: "nowrap", padding: "4px 10px", borderRadius: "999px", border: "none", background: `linear-gradient(90deg, ${n.glow}, #090d16)`, color: "#fff", fontSize: "8.5px", fontWeight: 900, cursor: "pointer", boxShadow: `0 0 16px ${n.glow}` }}>
                  {n.info}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
