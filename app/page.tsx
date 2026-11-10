"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RIBBONS, NODES } from "./wheel-data";

function RibbonSVG({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <svg width="24" height="32" viewBox="0 0 36 44" style={{ flexShrink: 0, filter: `drop-shadow(0 0 6px ${c1})` }}>
      <path d="M18 4 C10 4 7 11 11 19 L24 41 L29 38 L16 17 C14 12 15 9 18 9 C21 9 22 12 20 17 L7 38 L12 41 L25 19 C29 11 26 4 18 4 Z" fill={c1} stroke={c2} strokeWidth="2.2" />
      <circle cx="18" cy="11" r="3.5" fill="#03040b" />
    </svg>
  );
}

function plasmaBolt(cx: number, cy: number, tx: number, ty: number, s: number) {
  const dx = tx - cx, dy = ty - cy, nx = -dy, ny = dx;
  const pts = [[0.22, 0.06*s], [0.38, -0.07*s], [0.54, 0.08*s], [0.72, -0.05*s], [0.86, 0.04*s]];
  let m = `M ${cx} ${cy}`;
  pts.forEach(([t, o]) => { m += ` L ${(cx+dx*t+nx*o).toFixed(1)} ${(cy+dy*t+ny*o).toFixed(1)}`; });
  m += ` L ${tx.toFixed(1)} ${ty.toFixed(1)}`;
  const bx = cx+dx*0.54+nx*0.08*s, by = cy+dy*0.54+ny*0.08*s;
  const fx = cx+dx*0.74+nx*0.18*s, fy = cy+dy*0.74+ny*0.18*s;
  return { main: m, fork: `M ${bx.toFixed(1)} ${by.toFixed(1)} L ${fx.toFixed(1)} ${fy.toFixed(1)}` };
}

export default function AlbsNexusSolarLobby() {
  const [q, setQ] = useState("");
  const [zips, setZips] = useState<Record<string, string>>({
    autism: "77301", down: "77301", deafblind: "77301", ptsd: "77301", mobility: "77301", peptides: "77301"
  });
  const hits = q.trim() ? [...NODES, ...RIBBONS.map(r => ({ id: r.id, title: r.name, sub: "Sanctuary", href: r.href }))].filter(n => n.title.toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div style={{ minHeight: "100vh", color: "#f8fafc", paddingBottom: "50px" }}>
      <div style={{ maxWidth: "1180px", margin: "10px auto 0", padding: "0 14px", position: "relative", zIndex: 30 }}>
        <div style={{ background: "rgba(8,11,20,0.86)", border: "1px solid rgba(148,163,184,0.22)", borderRadius: "18px", padding: "10px 14px", boxShadow: "0 0 40px rgba(0,0,0,0.7)" }}>
          <h2 style={{ margin: "0 0 10px", textAlign: "center", fontSize: "17px", fontWeight: 900, letterSpacing: "0.16em", color: "#f8fafc" }}>
            SANCTUARIES OF HOPE
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))", gap: "8px" }}>
            {RIBBONS.map(r => (
              <div key={r.id} style={{ background: r.bg, border: `1px solid ${r.accent}66`, borderRadius: "12px", padding: "8px 10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <RibbonSVG c1={r.r1} c2={r.r2} />
                <div style={{ flex: 1 }}>
                  <Link href={`${r.href}${r.href.includes("?") ? "&" : "?"}zip=${zips[r.id]}`} style={{ fontSize: "12px", fontWeight: 800, color: r.text, textDecoration: "none", display: "block" }}>{r.name}</Link>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px", background: "rgba(2,6,23,0.7)", borderRadius: "6px", padding: "2px 6px", fontSize: "9.5px" }}>
                    <span style={{ color: "#cbd5e1" }}>12-Mi ZIP [</span>
                    <input value={zips[r.id]} onChange={e => setZips({ ...zips, [r.id]: e.target.value })} maxLength={5} style={{ width: "40px", background: "transparent", border: "none", color: "#fff", fontSize: "9.5px", fontWeight: 900, textAlign: "center" }} />
                    <span style={{ color: "#cbd5e1" }}>]</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: "1280px", margin: "6px auto 0", padding: "0 8px" }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "1280 / 790", minHeight: "620px" }}>
          <svg viewBox="0 0 1280 790" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 6 }}>
            <defs>
              <filter id="pGlow" x="-35%" y="-35%" width="170%" height="170%">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <ellipse cx="640" cy="380" rx="310" ry="195" fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth="1" />
            <ellipse cx="640" cy="380" rx="500" ry="305" fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="1" />
            {NODES.map((n, i) => {
              const b = plasmaBolt(640, 380, n.x, n.y, i % 2 === 0 ? 1 : -1);
              return (
                <g key={n.id} filter="url(#pGlow)" style={{ animation: `boltFlicker ${1.5 + (i % 3) * 0.3}s infinite` }}>
                  <path d={b.main} fill="none" stroke={n.bolt} strokeWidth="4.2" />
                  <path d={b.fork} fill="none" stroke={n.bolt} strokeWidth="2.2" />
                  <path d={b.main} fill="none" stroke="#ffffff" strokeWidth="1.4" />
                </g>
              );
            })}
          </svg>

          {/* CENTER OBSIDIAN & CRIMSON ELECTRIC SUN WITH DOCKED VISOR */}
          <div style={{ position: "absolute", left: "50%", top: "48.1%", transform: "translate(-50%, -50%)", zIndex: 30 }}>
            <div style={{
              width: "228px", height: "228px", borderRadius: "50%", position: "relative", overflow: "hidden",
              background: "radial-gradient(circle at 35% 28%, #ef4444 0%, #991b1b 32%, #090a0f 62%, #dc2626 88%, #450a0a 100%)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "24px 12px 18px", textAlign: "center",
              animation: "electricSunPulse 3.4s ease-in-out infinite"
            }}>
              <div>
                <div style={{ fontSize: "10px", fontWeight: 800, color: "#fecaca", letterSpacing: "0.08em" }}>Electric Sun</div>
                <div style={{ fontSize: "24px", fontWeight: 900, color: "#ffffff", letterSpacing: "0.04em", lineHeight: 1.05, textShadow: "0 2px 10px #000" }}>ALBS NEXUS</div>
                <div style={{ fontSize: "10.5px", fontWeight: 800, color: "#f8fafc", marginTop: "2px" }}>6 Malls • 2,000+ SKUs</div>
              </div>

              {/* DOCKED LOWER EQUATOR VISOR */}
              <div style={{ width: "198px", background: "linear-gradient(180deg, rgba(5,6,10,0.92), rgba(15,6,12,0.98))", borderTop: "1.5px solid rgba(244,63,94,0.7)", borderRadius: "18px 18px 90px 90px", padding: "10px 12px 14px", boxShadow: "0 -6px 18px rgba(0,0,0,0.9)" }}>
                <div style={{ display: "flex", alignItems: "center", background: "#090b12", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "999px", padding: "3px 4px 3px 10px" }}>
                  <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search All Malls..." style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "10px" }} />
                  <span style={{ background: "#ec4899", color: "#fff", borderRadius: "50%", width: "18px", height: "18px", fontSize: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>🔍</span>
                </div>
                <Link href="/nostalgia/concierge" style={{ display: "inline-block", marginTop: "6px", padding: "4px 10px", borderRadius: "999px", border: "1px solid rgba(244,63,94,0.6)", background: "rgba(15,23,42,0.9)", color: "#f8fafc", fontWeight: 800, fontSize: "8.8px", textDecoration: "none" }}>
                  3-Hr AI Concierge (24-Hr Hold) →
                </Link>
              </div>
            </div>

            {hits.length > 0 && (
              <div style={{ position: "absolute", top: "236px", left: "50%", transform: "translateX(-50%)", width: "240px", background: "rgba(6,9,18,0.98)", border: "1px solid #ef4444", borderRadius: "12px", padding: "8px", display: "grid", gap: "4px", zIndex: 60 }}>
                {hits.map(h => (
                  <Link key={h.id} href={h.href} style={{ display: "flex", justifyContent: "space-between", padding: "5px 8px", background: "#0f172a", borderRadius: "6px", color: "#fff", fontSize: "10.5px", fontWeight: 800, textDecoration: "none" }}>
                    <span>{h.title}</span><span style={{ color: "#f43f5e" }}>Go →</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 8 IDENTICAL-SIZED (164px) PLANETARY STORE ORBS — ALTERNATING CLOSE & FAR */}
          {NODES.map((n) => (
            <Link key={n.id} href={n.href} className="planet-orb" style={{ position: "absolute", left: `${(n.x / 1280) * 100}%`, top: `${(n.y / 790) * 100}%`, transform: "translate(-50%, -50%)", width: "164px", textDecoration: "none", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "148px", height: "148px", borderRadius: "50%", border: "2px solid rgba(224,242,254,0.8)", boxShadow: "0 0 28px 6px rgba(56,189,248,0.55), inset 0 0 22px rgba(2,6,23,0.7)", backgroundImage: `url('${n.img}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ marginTop: "7px", textAlign: "center", whiteSpace: "nowrap", textShadow: "0 2px 8px #000, 0 0 12px #000" }}>
                <div style={{ fontSize: "12.5px", fontWeight: 900, color: "#ffffff", letterSpacing: "0.04em" }}>{n.title}</div>
                <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#cbd5e1", marginTop: "1px" }}>{n.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
