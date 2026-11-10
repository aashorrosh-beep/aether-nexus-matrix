"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RIBBONS, NODES } from "./wheel-data";

function RibbonSVG({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <svg viewBox="0 0 36 46" style={{ width: "1.9cqw", minWidth: "16px", flexShrink: 0, filter: `drop-shadow(0 0 4px ${c1})` }}>
      <path d="M18 4 C10 4 7 11 11 19 L25 43 L30 40 L16 17 C14 12 15 9 18 9 Z" fill={c1} />
      <path d="M18 4 C26 4 29 11 25 19 L11 43 L6 40 L20 17 C22 12 21 9 18 9 Z" fill={c2} />
      <circle cx="18" cy="11.5" r="3.5" fill="#090b12" />
    </svg>
  );
}

function boltPath(cx: number, cy: number, tx: number, ty: number, s: number) {
  const dx = tx - cx, dy = ty - cy, nx = -dy, ny = dx;
  const p = [[0.18,0.04*s],[0.33,-0.05*s],[0.49,0.06*s],[0.66,-0.04*s],[0.83,0.03*s]];
  let m = `M ${cx} ${cy}`;
  p.forEach(([t,o]) => { m += ` L ${(cx+dx*t+nx*o).toFixed(1)} ${(cy+dy*t+ny*o).toFixed(1)}`; });
  m += ` L ${tx} ${ty}`;
  const f1 = `M ${(cx+dx*0.33-nx*0.05*s).toFixed(1)} ${(cy+dy*0.33-ny*0.05*s).toFixed(1)} L ${(cx+dx*0.5-nx*0.16*s).toFixed(1)} ${(cy+dy*0.5-ny*0.16*s).toFixed(1)}`;
  const f2 = `M ${(cx+dx*0.49+nx*0.06*s).toFixed(1)} ${(cy+dy*0.49+ny*0.06*s).toFixed(1)} L ${(cx+dx*0.7+nx*0.17*s).toFixed(1)} ${(cy+dy*0.7+ny*0.17*s).toFixed(1)}`;
  return { m, f1, f2 };
}

export default function AlbsNexusLayeredSolar() {
  const [q, setQ] = useState("");
  const [zips, setZips] = useState<Record<string, string>>({
    autism: "77301", down: "77301", deafblind: "77301", ptsd: "77301", mobility: "77301", peptides: "77301"
  });
  const hits = q.trim() ? [...NODES, ...RIBBONS.map(r => ({ id: r.id, title: r.name, href: r.href }))].filter(n => n.title.toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div className="galaxy-canvas">
      {/* LOCKED PROPORTIONAL STAGE */}
      <div style={{ maxWidth: "1360px", margin: "0 auto", containerType: "inline-size" }}>
        {/* SINGLE-ROW 6-RIBBON SANCTUARIES OF HOPE HEADER */}
        <div style={{ width: "86%", margin: "0 auto 0.4cqw", background: "rgba(10,13,22,0.86)", border: "1px solid rgba(148,163,184,0.25)", borderRadius: "1.1cqw", padding: "0.7cqw 1cqw", boxShadow: "0 10px 35px rgba(0,0,0,0.8)" }}>
          <h2 style={{ margin: "0 0 0.6cqw", textAlign: "center", fontSize: "clamp(11px, 1.35cqw, 19px)", fontWeight: 800, letterSpacing: "0.14em", color: "#f8fafc" }}>
            SANCTUARIES OF HOPE
          </h2>
          <div className="sanctuary-bar">
            {RIBBONS.map(r => (
              <div key={r.id} style={{ background: "rgba(16,19,30,0.9)", border: `1.5px solid ${r.border}`, boxShadow: `0 0 12px ${r.border}44, inset 0 0 10px ${r.border}22`, borderRadius: "0.7cqw", padding: "0.5cqw 0.55cqw", display: "flex", alignItems: "center", gap: "0.45cqw" }}>
                <RibbonSVG c1={r.r1} c2={r.r2} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <Link href={`${r.href}${r.href.includes("?") ? "&" : "?"}zip=${zips[r.id]}`} style={{ fontSize: "clamp(7.5px, 0.88cqw, 12px)", fontWeight: 700, color: "#f8fafc", textDecoration: "none", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</Link>
                  <div style={{ marginTop: "0.3cqw", background: "rgba(4,6,12,0.92)", border: "1px solid rgba(148,163,184,0.3)", borderRadius: "0.35cqw", padding: "1px 3px", fontSize: "clamp(6.5px, 0.68cqw, 9.5px)", color: "#cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" }}>
                    <span>12-MI ZIP [</span>
                    <input value={zips[r.id]} onChange={e => setZips({ ...zips, [r.id]: e.target.value })} maxLength={5} style={{ width: "3.2cqw", minWidth: "26px", background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "inherit", fontWeight: 800, textAlign: "center" }} />
                    <span>]</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="solar-stage">
        {/* LAYER A: ORBIT RINGS, LUNAR LIMB & MULTI-BRANCHED LIGHTNING */}
        <svg viewBox="0 0 1600 920" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 5 }}>
          <defs>
            <filter id="bGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {/* Procedural Cracked Obsidian & Molten Lava Shader for Electric Sun */}
            <filter id="solarMagma" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="turbulence" baseFrequency="0.032" numOctaves="4" seed="11" result="t" />
              <feColorMatrix type="matrix" values="-4.5 0 0 0 1.42  -5.6 0 0 0 0.82  -6.8 0 0 0 0.58  0 0 0 0 1" in="t" />
            </filter>
          </defs>
          {/* Subtle lunar horizon behind Stadium (bottom-right) */}
          <circle cx="1055" cy="855" r="105" fill="rgba(148,163,184,0.12)" stroke="rgba(226,232,240,0.22)" strokeWidth="1.5" />
          {/* 4 Concentric Elliptical Orbit Rings */}
          {[ [270,150], [400,225], [535,300], [670,375] ].map(([rx, ry], i) => (
            <ellipse key={i} cx="800" cy="435" rx={rx} ry={ry} fill="none" stroke="rgba(148,163,184,0.14)" strokeWidth="1.1" />
          ))}
          {/* Cyan & Red Branched Lightning Spokes */}
          {NODES.map((n, i) => {
            const b = boltPath(800, 435, n.x, n.y, i % 2 === 0 ? 1 : -1);
            return (
              <g key={n.id} filter="url(#bGlow)">
                <path d={b.m} fill="none" stroke={n.bolt} strokeWidth="5" />
                <path d={b.f1} fill="none" stroke={n.bolt} strokeWidth="2.4" strokeOpacity="0.85" />
                <path d={b.f2} fill="none" stroke={n.bolt} strokeWidth="2.2" strokeOpacity="0.8" />
                <path d={b.m} fill="none" stroke="#ffffff" strokeWidth="1.6" />
              </g>
            );
          })}
        </svg>

        {/* LAYER B: CENTER CRACKED OBSIDIAN & LAVA "ELECTRIC SUN" + 3D CURVED VISOR */}
        <div style={{ position: "absolute", left: "50%", top: "47.3%", transform: "translate(-50%, -50%)", width: "18.2cqw", height: "18.2cqw", zIndex: 25, animation: "sunGlow 3.6s ease-in-out infinite" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", boxShadow: "inset 0 0 2.2cqw #ef4444, 0 0 1.2cqw #dc2626" }}>
            <svg viewBox="0 0 240 240" style={{ width: "100%", height: "100%", display: "block" }}>
              <rect width="240" height="240" filter="url(#solarMagma)" />
              <circle cx="120" cy="120" r="118" fill="none" stroke="#ef4444" strokeWidth="6" opacity="0.75" />
            </svg>
          </div>
          {/* Crisp Center Typography over Upper Hemisphere */}
          <div style={{ position: "absolute", top: "17%", left: 0, right: 0, textAlign: "center", zIndex: 6, pointerEvents: "none" }}>
            <div style={{ fontSize: "clamp(8px, 0.85cqw, 12px)", fontWeight: 700, color: "#f8fafc", textShadow: "0 2px 6px #000" }}>Electric Sun</div>
            <div style={{ fontSize: "clamp(13px, 1.95cqw, 28px)", fontWeight: 900, color: "#ffffff", letterSpacing: "0.04em", lineHeight: 1.04, textShadow: "0 2px 10px #000, 0 0 14px #000" }}>ALBS NEXUS</div>
            <div style={{ fontSize: "clamp(7.5px, 0.82cqw, 11.5px)", fontWeight: 700, color: "#f1f5f9", marginTop: "0.15cqw", textShadow: "0 2px 6px #000" }}>6 Malls • 2,000+ SKUs</div>
          </div>

          {/* 3D Wrap-Around Curved Metallic Black Visor (Bottom Red Sun Tip Peeks Below!) */}
          <div style={{ position: "absolute", left: "-6%", right: "-6%", top: "49%", height: "41%", zIndex: 10 }}>
            <svg viewBox="0 0 280 115" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.9))" }}>
              <defs>
                <linearGradient id="visorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#141824" stopOpacity="0.96" />
                  <stop offset="55%" stopColor="#05060a" stopOpacity="0.98" />
                  <stop offset="100%" stopColor="#110910" stopOpacity="0.96" />
                </linearGradient>
              </defs>
              <path d="M 6 8 Q 140 34 274 8 C 282 58 242 108 140 108 C 38 108 -2 58 6 8 Z" fill="url(#visorGrad)" stroke="rgba(226,232,240,0.55)" strokeWidth="2.2" />
              <path d="M 16 18 C 12 48 28 78 52 92" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round" />
              <path d="M 264 18 C 268 48 252 78 228 92" fill="none" stroke="rgba(244,63,94,0.45)" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div style={{ position: "relative", zIndex: 12, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "1.1cqw" }}>
              <div style={{ width: "74%", display: "flex", alignItems: "center", background: "rgba(15,18,28,0.95)", border: "1px solid rgba(148,163,184,0.38)", borderRadius: "999px", padding: "0.2cqw 0.25cqw 0.2cqw 0.8cqw" }}>
                <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search All Malls..." style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "clamp(7px, 0.75cqw, 10.5px)" }} />
                <span style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)", color: "#fff", borderRadius: "50%", width: "1.35cqw", height: "1.35cqw", minWidth: "14px", minHeight: "14px", fontSize: "clamp(7px, 0.65cqw, 9px)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>🔍</span>
              </div>
              <Link href="/nostalgia/concierge" style={{ marginTop: "0.35cqw", padding: "0.22cqw 0.8cqw", borderRadius: "999px", border: "1px solid rgba(148,163,184,0.4)", background: "rgba(12,16,26,0.92)", color: "#e2e8f0", fontWeight: 700, fontSize: "clamp(6.5px, 0.64cqw, 9px)", textDecoration: "none", whiteSpace: "nowrap" }}>
                3-Hr AI Concierge (24-Hr Hold) →
              </Link>
            </div>
          </div>

          {hits.length > 0 && (
            <div style={{ position: "absolute", top: "103%", left: "50%", transform: "translateX(-50%)", width: "220px", background: "rgba(6,9,18,0.98)", border: "1px solid #ef4444", borderRadius: "10px", padding: "6px", display: "grid", gap: "4px", zIndex: 80 }}>
              {hits.map(h => (
                <Link key={h.id} href={h.href} style={{ display: "flex", justifyContent: "space-between", padding: "5px 8px", background: "#0f172a", borderRadius: "6px", color: "#fff", fontSize: "10.5px", fontWeight: 800, textDecoration: "none" }}>
                  <span>{h.title}</span><span style={{ color: "#f43f5e" }}>Go →</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* LAYER C: 8 PLANETARY ORBS PLACED ONE-BY-ONE AROUND THE SUN */}
        {NODES.map((n) => (
          <Link key={n.id} href={n.href} className="planet-item" style={{ position: "absolute", left: `${(n.x / 1600) * 100}%`, top: `${(n.y / 920) * 100}%`, transform: "translate(-50%, -50%)", textDecoration: "none", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ position: "relative", width: `${n.size}cqw`, height: `${n.size}cqw`, borderRadius: "50%", border: "2px solid rgba(224,242,254,0.88)", boxShadow: "0 0 2cqw 0.4cqw rgba(125,211,252,0.55), inset 0 0 1.2cqw rgba(2,6,23,0.5)", backgroundImage: `url('${n.img}')`, backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
              {n.id === "stargazer" && (
                <div style={{ position: "absolute", top: "10%", right: "14%", width: "30%", height: "30%", borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #e2e8f0, #475569 75%)", boxShadow: "0 0 10px rgba(226,232,240,0.7)" }} />
              )}
              {n.id === "matrix" && (
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 58% 38%, rgba(16,185,129,0.35), rgba(2,6,23,0.45))" }} />
              )}
            </div>
            <div style={{ marginTop: "0.45cqw", textAlign: "center", whiteSpace: "nowrap", textShadow: "0 2px 8px #000, 0 0 12px #000" }}>
              <div style={{ fontSize: "clamp(8.5px, 0.96cqw, 13.5px)", fontWeight: 800, color: "#ffffff", letterSpacing: "0.04em" }}>{n.title}</div>
              <div style={{ fontSize: "clamp(7px, 0.78cqw, 11px)", fontWeight: 600, color: "#cbd5e1", marginTop: "1px" }}>{n.sub}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
