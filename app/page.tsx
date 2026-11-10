"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RIBBONS, NODES } from "./wheel-data";

function RibbonSVG({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <svg viewBox="0 0 36 46" style={{ width: "1.85cqw", minWidth: "16px", flexShrink: 0, filter: `drop-shadow(0 0 4px ${c1})` }}>
      <path d="M18 4 C10 4 7 11 11 19 L25 43 L30 40 L16 17 C14 12 15 9 18 9 Z" fill={c1} />
      <path d="M18 4 C26 4 29 11 25 19 L11 43 L6 40 L20 17 C22 12 21 9 18 9 Z" fill={c2} />
      <circle cx="18" cy="11.5" r="3.5" fill="#090b12" />
    </svg>
  );
}

// Deterministic pseudo-random recursive midpoint displacement for natural plasma arcs
function sRand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x) - 0.5;
}

function buildFractal(x1: number, y1: number, x2: number, y2: number, disp: number, depth: number, seed: number): [number, number][] {
  if (depth === 0) return [[x1, y1], [x2, y2]];
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len, ny = dx / len;
  const off = sRand(seed) * disp;
  const px = mx + nx * off, py = my + ny * off;
  const left = buildFractal(x1, y1, px, py, disp * 0.54, depth - 1, seed * 1.73 + 1.1);
  const right = buildFractal(px, py, x2, y2, disp * 0.54, depth - 1, seed * 2.31 + 3.7);
  return [...left.slice(0, -1), ...right];
}

function toPath(pts: [number, number][]) {
  return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
}

function plasmaStream(cx: number, cy: number, tx: number, ty: number, idx: number) {
  const mainPts = buildFractal(cx, cy, tx, ty, 62, 5, idx * 13.7 + 5);
  const secPts = buildFractal(cx, cy, tx, ty, 48, 4, idx * 29.3 + 9);
  const b1 = mainPts[10], b2 = mainPts[19];
  const dx = tx - cx, dy = ty - cy;
  const f1 = buildFractal(b1[0], b1[1], b1[0] + dx * 0.22 - dy * 0.16, b1[1] + dy * 0.22 + dx * 0.16, 26, 3, idx * 7.1);
  const f2 = buildFractal(b2[0], b2[1], b2[0] + dx * 0.2 + dy * 0.15, b2[1] + dy * 0.2 - dx * 0.15, 24, 3, idx * 11.9);
  return { main: toPath(mainPts), sec: toPath(secPts), f1: toPath(f1), f2: toPath(f2) };
}

export default function AlbsNexusMilkyWay() {
  const [q, setQ] = useState("");
  const [zips, setZips] = useState<Record<string, string>>({
    autism: "77301", down: "77301", deafblind: "77301", ptsd: "77301", mobility: "77301", peptides: "77301"
  });
  const hits = q.trim() ? [...NODES, ...RIBBONS.map(r => ({ id: r.id, title: r.name, href: r.href }))].filter(n => n.title.toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div className="galaxy-canvas">
      {/* TOP SINGLE-ROW SANCTUARIES OF HOPE */}
      <div style={{ position: "relative", zIndex: 30, maxWidth: "1380px", margin: "0 auto", containerType: "inline-size" }}>
        <div style={{ width: "88%", margin: "0 auto 0.3cqw", background: "rgba(10,13,22,0.84)", border: "1px solid rgba(148,163,184,0.26)", borderRadius: "1.1cqw", padding: "0.65cqw 1cqw", backdropFilter: "blur(8px)", boxShadow: "0 10px 35px rgba(0,0,0,0.8)" }}>
          <h2 style={{ margin: "0 0 0.55cqw", textAlign: "center", fontSize: "clamp(11px, 1.35cqw, 19px)", fontWeight: 800, letterSpacing: "0.14em", color: "#f8fafc" }}>
            SANCTUARIES OF HOPE
          </h2>
          <div className="sanctuary-bar">
            {RIBBONS.map(r => (
              <div key={r.id} style={{ background: "rgba(16,19,30,0.88)", border: `1.5px solid ${r.border}`, boxShadow: `0 0 12px ${r.border}44, inset 0 0 10px ${r.border}22`, borderRadius: "0.7cqw", padding: "0.48cqw 0.55cqw", display: "flex", alignItems: "center", gap: "0.45cqw" }}>
                <RibbonSVG c1={r.r1} c2={r.r2} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <Link href={`${r.href}${r.href.includes("?") ? "&" : "?"}zip=${zips[r.id]}`} style={{ fontSize: "clamp(7.5px, 0.86cqw, 12px)", fontWeight: 700, color: "#f8fafc", textDecoration: "none", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</Link>
                  <div style={{ marginTop: "0.28cqw", background: "rgba(4,6,12,0.92)", border: "1px solid rgba(148,163,184,0.3)", borderRadius: "0.35cqw", padding: "1px 3px", fontSize: "clamp(6.5px, 0.66cqw, 9.5px)", color: "#cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" }}>
                    <span>12-MI ZIP [</span>
                    <input value={zips[r.id]} onChange={e => setZips({ ...zips, [r.id]: e.target.value })} maxLength={5} style={{ width: "3.1cqw", minWidth: "26px", background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "inherit", fontWeight: 800, textAlign: "center" }} />
                    <span>]</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MILKY WAY SPIRAL STAGE */}
      <div className="solar-stage">
        {/* SPINNING NASA MILKY WAY SATELLITE SPIRAL DISC CENTERED BEHIND ALBS NEXUS */}
        <div style={{ position: "absolute", left: "50%", top: "48%", transform: "translate(-50%, -50%) scaleY(0.62)", width: "118cqw", height: "118cqw", pointerEvents: "none", zIndex: 1 }}>
          <div style={{
            width: "100%", height: "100%", borderRadius: "50%",
            backgroundImage: "radial-gradient(circle, transparent 18%, rgba(2,3,8,0.45) 54%, #020308 72%), url('https://commons.wikimedia.org/wiki/Special:FilePath/Artist%E2%80%99s_impression_of_the_Milky_Way.jpg?width=1920')",
            backgroundSize: "cover", backgroundPosition: "center",
            filter: "saturate(1.45) contrast(1.18) brightness(0.95)",
            animation: "milkySpin 150s linear infinite"
          }} />
        </div>

        {/* CONCENTRIC ORBIT RINGS & REAL FRACTAL PLASMA LIGHTNING */}
        <svg viewBox="0 0 1600 920" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 6 }}>
          <defs>
            <filter id="plasmaAura" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="8" result="b1" />
              <feGaussianBlur stdDeviation="2.5" result="b2" />
              <feMerge><feMergeNode in="b1" /><feMergeNode in="b2" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {[ [275,155], [405,230], [540,305], [675,380] ].map(([rx, ry], i) => (
            <ellipse key={i} cx="800" cy="442" rx={rx} ry={ry} fill="none" stroke="rgba(186,230,253,0.13)" strokeWidth="1.1" />
          ))}
          {NODES.map((n, i) => {
            const p = plasmaStream(800, 442, n.x, n.y, i + 1);
            return (
              <g key={n.id} filter="url(#plasmaAura)" strokeLinecap="round" strokeLinejoin="round">
                <path d={p.main} fill="none" stroke={n.bolt} strokeWidth="9" strokeOpacity="0.28" />
                <path d={p.main} fill="none" stroke={n.bolt} strokeWidth="3.6" />
                <path d={p.sec} fill="none" stroke={n.bolt} strokeWidth="1.8" strokeOpacity="0.72" />
                <path d={p.f1} fill="none" stroke={n.bolt} strokeWidth="2.1" strokeOpacity="0.82" />
                <path d={p.f2} fill="none" stroke={n.bolt} strokeWidth="1.8" strokeOpacity="0.75" />
                <path d={p.main} fill="none" stroke="#ffffff" strokeWidth="1.35" />
              </g>
            );
          })}
        </svg>

        {/* DEAD-CENTER NASA CRIMSON SOLAR PLASMA SPHERE + FLUSH SPHERICAL VISOR */}
        <div style={{ position: "absolute", left: "50%", top: "48%", transform: "translate(-50%, -50%)", width: "18.8cqw", height: "18.8cqw", borderRadius: "50%", zIndex: 25, animation: "sunPulse 3.8s ease-in-out infinite" }}>
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden",
            backgroundColor: "#140204",
            backgroundImage: `
              radial-gradient(circle at 32% 30%, rgba(5,5,10,0.72) 0%, transparent 28%),
              radial-gradient(circle at 68% 36%, rgba(5,5,10,0.78) 0%, transparent 32%),
              radial-gradient(circle at 50% 50%, transparent 56%, rgba(239,68,68,0.85) 94%, #fecaca 100%),
              url("https://commons.wikimedia.org/wiki/Special:FilePath/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA's_Solar_Dynamics_Observatory_-_20100819.jpg?width=800")
            `,
            backgroundSize: "cover", backgroundPosition: "center",
            filter: "hue-rotate(-14deg) saturate(1.85) contrast(1.38)"
          }} />

          {/* Internal Cracked White-Crimson Plasma Filaments */}
          <svg viewBox="0 0 240 240" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: "50%", pointerEvents: "none", zIndex: 4 }}>
            <path d={toPath(buildFractal(35, 85, 205, 75, 34, 4, 3.3))} fill="none" stroke="#fecaca" strokeWidth="1.8" opacity="0.85" />
            <path d={toPath(buildFractal(75, 22, 165, 115, 28, 4, 8.1))} fill="none" stroke="#ffffff" strokeWidth="1.3" opacity="0.75" />
          </svg>

          {/* Upper Sun Title */}
          <div style={{ position: "absolute", top: "16%", left: 0, right: 0, textAlign: "center", zIndex: 8, pointerEvents: "none" }}>
            <div style={{ fontSize: "clamp(8px, 0.86cqw, 12px)", fontWeight: 700, color: "#fee2e2", textShadow: "0 2px 6px #000" }}>Electric Sun</div>
            <div style={{ fontSize: "clamp(13px, 2.0cqw, 28px)", fontWeight: 900, color: "#ffffff", letterSpacing: "0.04em", lineHeight: 1.04, textShadow: "0 2px 12px #000, 0 0 16px #991b1b" }}>ALBS NEXUS</div>
            <div style={{ fontSize: "clamp(7.5px, 0.84cqw, 11.5px)", fontWeight: 700, color: "#f8fafc", marginTop: "0.15cqw", textShadow: "0 2px 6px #000" }}>6 Malls • 2,000+ SKUs</div>
          </div>

          {/* FLUSH SPHERICAL BLACK VISOR (HUGS SPHERE CONTOUR — BOTTOM RED RIM PEEKS UNDERNEATH) */}
          <div style={{
            position: "absolute", left: "-3%", right: "-3%", top: "50%", height: "41%", zIndex: 12,
            background: "linear-gradient(180deg, rgba(16,19,28,0.95) 0%, rgba(4,5,9,0.98) 65%, rgba(18,8,12,0.96) 100%)",
            borderRadius: "22% 22% 52% 52% / 26% 26% 74% 74%",
            borderTop: "1.8px solid rgba(226,232,240,0.48)",
            borderBottom: "1.8px solid rgba(244,63,94,0.65)",
            boxShadow: "0 10px 24px rgba(0,0,0,0.9), inset 0 6px 14px rgba(255,255,255,0.14)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.4cqw 1.2cqw 0.6cqw"
          }}>
            <div style={{ width: "80%", display: "flex", alignItems: "center", background: "rgba(12,15,24,0.96)", border: "1px solid rgba(148,163,184,0.38)", borderRadius: "999px", padding: "0.18cqw 0.22cqw 0.18cqw 0.75cqw" }}>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search All Malls..." style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "clamp(7px, 0.74cqw, 10.5px)" }} />
              <span style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)", color: "#fff", borderRadius: "50%", width: "1.35cqw", height: "1.35cqw", minWidth: "14px", minHeight: "14px", fontSize: "clamp(7px, 0.65cqw, 9px)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>🔍</span>
            </div>
            <Link href="/nostalgia/concierge" style={{ marginTop: "0.35cqw", padding: "0.2cqw 0.75cqw", borderRadius: "999px", border: "1px solid rgba(148,163,184,0.38)", background: "rgba(12,16,26,0.9)", color: "#e2e8f0", fontWeight: 700, fontSize: "clamp(6.5px, 0.62cqw, 9px)", textDecoration: "none", whiteSpace: "nowrap" }}>
              3-Hr AI Concierge (24-Hr Hold) →
            </Link>
          </div>

          {hits.length > 0 && (
            <div style={{ position: "absolute", top: "102%", left: "50%", transform: "translateX(-50%)", width: "220px", background: "rgba(6,9,18,0.98)", border: "1px solid #ef4444", borderRadius: "10px", padding: "6px", display: "grid", gap: "4px", zIndex: 80 }}>
              {hits.map(h => (
                <Link key={h.id} href={h.href} style={{ display: "flex", justifyContent: "space-between", padding: "5px 8px", background: "#0f172a", borderRadius: "6px", color: "#fff", fontSize: "10.5px", fontWeight: 800, textDecoration: "none" }}>
                  <span>{h.title}</span><span style={{ color: "#f43f5e" }}>Go →</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* 8 VIBRANT PLANETARY STORE ORBS FLOATING THROUGH THE MILKY WAY */}
        {NODES.map((n) => (
          <Link key={n.id} href={n.href} className="planet-item" style={{ position: "absolute", left: `${(n.x / 1600) * 100}%`, top: `${(n.y / 920) * 100}%`, transform: "translate(-50%, -50%)", textDecoration: "none", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ position: "relative", width: `${n.size}cqw`, height: `${n.size}cqw`, borderRadius: "50%", border: "2.2px solid rgba(224,242,254,0.92)", boxShadow: "0 0 2.2cqw 0.45cqw rgba(125,211,252,0.6), inset 0 0 1.4cqw rgba(2,6,23,0.45)", overflow: "hidden", backgroundColor: "#060913" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${n.img}')`, backgroundSize: "cover", backgroundPosition: "center", filter: n.filter }} />
              {n.id === "stargazer" && (
                <div style={{ position: "absolute", top: "9%", right: "12%", width: "30%", height: "30%", borderRadius: "50%", backgroundImage: "url('https://commons.wikimedia.org/wiki/Special:FilePath/FullMoon2010.jpg?width=240')", backgroundSize: "cover", boxShadow: "0 0 10px rgba(226,232,240,0.8)" }} />
              )}
              {n.id === "matrix" && (
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(90deg, rgba(2,6,23,0.15) 0%, transparent 55%), url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80')", backgroundSize: "cover", mixBlendMode: "screen", opacity: 0.72 }} />
              )}
              {/* 3D Spherical Glass Highlight */}
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 30% 24%, rgba(255,255,255,0.22) 0%, transparent 45%, rgba(2,6,23,0.42) 100%)", pointerEvents: "none" }} />
            </div>
            <div style={{ marginTop: "0.48cqw", textAlign: "center", whiteSpace: "nowrap", textShadow: "0 2px 8px #000, 0 0 14px #000" }}>
              <div style={{ fontSize: "clamp(8.5px, 0.98cqw, 14px)", fontWeight: 800, color: "#ffffff", letterSpacing: "0.04em" }}>{n.title}</div>
              <div style={{ fontSize: "clamp(7px, 0.78cqw, 11px)", fontWeight: 600, color: "#e2e8f0", marginTop: "1px" }}>{n.sub}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
