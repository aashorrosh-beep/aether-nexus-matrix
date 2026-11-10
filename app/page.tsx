"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RIBBONS, NODES } from "./wheel-data";

function RibbonSVG({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <svg width="24" height="34" viewBox="0 0 36 46" style={{ flexShrink: 0, filter: `drop-shadow(0 0 6px ${c1})` }}>
      <path d="M18 4 C10 4 7 11 11 19 L25 43 L30 40 L16 17 C14 12 15 9 18 9 Z" fill={c1} />
      <path d="M18 4 C26 4 29 11 25 19 L11 43 L6 40 L20 17 C22 12 21 9 18 9 Z" fill={c2} />
      <circle cx="18" cy="11.5" r="3.5" fill="#090b12" />
    </svg>
  );
}

function branchedBolt(cx: number, cy: number, tx: number, ty: number, s: number) {
  const dx = tx - cx, dy = ty - cy, nx = -dy, ny = dx;
  const pts = [[0.18,0.04*s],[0.34,-0.06*s],[0.5,0.07*s],[0.68,-0.05*s],[0.84,0.04*s]];
  let m = `M ${cx} ${cy}`;
  pts.forEach(([t,o]) => { m += ` L ${(cx+dx*t+nx*o).toFixed(1)} ${(cy+dy*t+ny*o).toFixed(1)}`; });
  m += ` L ${tx.toFixed(1)} ${ty.toFixed(1)}`;
  const f1 = `M ${(cx+dx*0.34-nx*0.06*s).toFixed(1)} ${(cy+dy*0.34-ny*0.06*s).toFixed(1)} L ${(cx+dx*0.52-nx*0.18*s).toFixed(1)} ${(cy+dy*0.52-ny*0.18*s).toFixed(1)}`;
  const f2 = `M ${(cx+dx*0.5+nx*0.07*s).toFixed(1)} ${(cy+dy*0.5+ny*0.07*s).toFixed(1)} L ${(cx+dx*0.72+nx*0.19*s).toFixed(1)} ${(cy+dy*0.72+ny*0.19*s).toFixed(1)}`;
  return { main: m, f1, f2 };
}

export default function AlbsNexusSolarSystem() {
  const [q, setQ] = useState("");
  const [zips, setZips] = useState<Record<string, string>>({
    autism: "77301", down: "77301", deafblind: "77301", ptsd: "77301", mobility: "77301", peptides: "77301"
  });
  const hits = q.trim() ? [...NODES, ...RIBBONS.map(r => ({ id: r.id, title: r.name, href: r.href }))].filter(n => n.title.toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div style={{ minHeight: "100vh", color: "#f8fafc", paddingBottom: "40px" }}>
      <div style={{ maxWidth: "1160px", margin: "12px auto 0", padding: "0 14px", position: "relative", zIndex: 30 }}>
        <div style={{ background: "rgba(10,13,22,0.82)", border: "1px solid rgba(148,163,184,0.22)", borderRadius: "16px", padding: "10px 14px", boxShadow: "0 10px 40px rgba(0,0,0,0.75)" }}>
          <h2 style={{ margin: "0 0 10px", textAlign: "center", fontSize: "18px", fontWeight: 800, letterSpacing: "0.14em", color: "#f8fafc" }}>
            SANCTUARIES OF HOPE
          </h2>
          <div className="sanctuary-row">
            {RIBBONS.map(r => (
              <div key={r.id} style={{ background: "rgba(15,18,28,0.88)", border: `1.5px solid ${r.border}`, boxShadow: `0 0 14px ${r.border}44, inset 0 0 12px ${r.border}22`, borderRadius: "10px", padding: "8px 9px", display: "flex", alignItems: "center", gap: "8px" }}>
                <RibbonSVG c1={r.r1} c2={r.r2} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <Link href={`${r.href}${r.href.includes("?") ? "&" : "?"}zip=${zips[r.id]}`} style={{ fontSize: "11.5px", fontWeight: 700, color: "#f8fafc", textDecoration: "none", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</Link>
                  <div style={{ marginTop: "5px", background: "rgba(4,6,12,0.9)", border: "1px solid rgba(148,163,184,0.28)", borderRadius: "5px", padding: "2px 5px", fontSize: "8.5px", color: "#cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", gap: "2px" }}>
                    <span>12-MI ZIP [</span>
                    <input value={zips[r.id]} onChange={e => setZips({ ...zips, [r.id]: e.target.value })} maxLength={5} style={{ width: "34px", background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "8.5px", fontWeight: 800, textAlign: "center" }} />
                    <span>]</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: "1280px", margin: "2px auto 0", padding: "0 8px" }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "1280 / 820", minHeight: "620px" }}>
          <svg viewBox="0 0 1280 820" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 6 }}>
            <defs>
              <filter id="bGlow" x="-35%" y="-35%" width="170%" height="170%">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {/* Concentric thin elliptical orbit rings */}
            {[ [230,135], [330,195], [435,255], [540,315] ].map(([rx, ry], idx) => (
              <ellipse key={idx} cx="640" cy="390" rx={rx} ry={ry} fill="none" stroke="rgba(148,163,184,0.13)" strokeWidth="1" />
            ))}
            {/* Cyan & Fiery Red multi-branched lightning spokes */}
            {NODES.map((n, i) => {
              const b = branchedBolt(640, 390, n.x, n.y, i % 2 === 0 ? 1 : -1);
              return (
                <g key={n.id} filter="url(#bGlow)" style={{ animation: `arcPulse ${1.8 + (i % 3) * 0.35}s infinite` }}>
                  <path d={b.main} fill="none" stroke={n.bolt} strokeWidth="4.2" />
                  <path d={b.f1} fill="none" stroke={n.bolt} strokeWidth="2" strokeOpacity="0.85" />
                  <path d={b.f2} fill="none" stroke={n.bolt} strokeWidth="1.8" strokeOpacity="0.75" />
                  <path d={b.main} fill="none" stroke="#ffffff" strokeWidth="1.3" />
                </g>
              );
            })}
          </svg>

          {/* CENTER ELECTRIC SUN WITH WRAP-AROUND GLOSSY BLACK EQUATOR VISOR */}
          <div style={{ position: "absolute", left: "50%", top: "47.5%", transform: "translate(-50%, -50%)", zIndex: 30, width: "252px", height: "234px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              width: "224px", height: "224px", borderRadius: "50%", position: "relative",
              background: "radial-gradient(circle at 42% 24%, #ff4d4d 0%, #dc2626 24%, #090a0f 52%, #b91c1c 78%, #050508 94%)",
              animation: "sunCorona 3.5s ease-in-out infinite", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "24px", textAlign: "center"
            }}>
              {/* Cracked magma lightning veins across upper sun */}
              <svg viewBox="0 0 200 110" style={{ position: "absolute", top: 0, left: "12px", width: "200px", height: "110px", pointerEvents: "none", opacity: 0.75 }}>
                <path d="M25 65 L55 38 L88 52 L118 22 L152 46 L178 35 M65 18 L98 44 L128 68" fill="none" stroke="#fecaca" strokeWidth="1.6" />
              </svg>
              <div style={{ position: "relative", zIndex: 4 }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#f8fafc", textShadow: "0 2px 6px #000" }}>Electric Sun</div>
                <div style={{ fontSize: "26px", fontWeight: 900, color: "#ffffff", letterSpacing: "0.04em", lineHeight: 1.05, textShadow: "0 2px 12px #000" }}>ALBS NEXUS</div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#e2e8f0", marginTop: "2px", textShadow: "0 2px 6px #000" }}>6 Malls • 2,000+ SKUs</div>
              </div>
            </div>

            {/* 3D Wrap-Around Curved Glossy Black Visor */}
            <div style={{
              position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", width: "248px",
              background: "linear-gradient(180deg, rgba(12,14,22,0.96) 0%, rgba(4,5,9,0.99) 100%)",
              borderTop: "2px solid rgba(226,232,240,0.45)", borderBottom: "2px solid rgba(239,68,68,0.65)",
              borderRadius: "20px 20px 110px 110px", padding: "12px 20px 14px", textAlign: "center",
              boxShadow: "0 12px 28px rgba(0,0,0,0.92), inset 0 4px 12px rgba(255,255,255,0.12)", zIndex: 10
            }}>
              <div style={{ display: "flex", alignItems: "center", background: "rgba(15,18,28,0.95)", border: "1px solid rgba(148,163,184,0.35)", borderRadius: "999px", padding: "3px 4px 3px 12px" }}>
                <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search All Malls..." style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "10.5px" }} />
                <span style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)", color: "#fff", borderRadius: "50%", width: "20px", height: "20px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 10px #ec4899", flexShrink: 0 }}>🔍</span>
              </div>
              <Link href="/nostalgia/concierge" style={{ display: "inline-block", marginTop: "7px", padding: "4px 12px", borderRadius: "999px", border: "1px solid rgba(148,163,184,0.38)", background: "rgba(15,20,32,0.9)", color: "#e2e8f0", fontWeight: 700, fontSize: "9px", textDecoration: "none" }}>
                3-Hr AI Concierge (24-Hr Hold) →
              </Link>
            </div>

            {hits.length > 0 && (
              <div style={{ position: "absolute", top: "234px", left: "50%", transform: "translateX(-50%)", width: "240px", background: "rgba(6,9,18,0.98)", border: "1px solid #ef4444", borderRadius: "12px", padding: "8px", display: "grid", gap: "4px", zIndex: 60 }}>
                {hits.map(h => (
                  <Link key={h.id} href={h.href} style={{ display: "flex", justifyContent: "space-between", padding: "5px 8px", background: "#0f172a", borderRadius: "6px", color: "#fff", fontSize: "10.5px", fontWeight: 800, textDecoration: "none" }}>
                    <span>{h.title}</span><span style={{ color: "#f43f5e" }}>Go →</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 8 ELLIPTICAL ARC PLANET ORBS WITH ICE-BLUE ATMOSPHERIC HALO */}
          {NODES.map((n) => (
            <Link key={n.id} href={n.href} className="orb-link" style={{ position: "absolute", left: `${(n.x / 1280) * 100}%`, top: `${(n.y / 820) * 100}%`, transform: "translate(-50%, -50%)", textDecoration: "none", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: `${n.size}px`, height: `${n.size}px`, borderRadius: "50%", border: "2px solid rgba(224,242,254,0.85)", boxShadow: "0 0 28px 6px rgba(125,211,252,0.55), inset 0 0 18px rgba(2,6,23,0.55)", backgroundImage: `url('${n.img}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ marginTop: "8px", textAlign: "center", whiteSpace: "nowrap", textShadow: "0 2px 8px #000, 0 0 14px #000" }}>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#ffffff", letterSpacing: "0.04em" }}>{n.title}</div>
                <div style={{ fontSize: "10.5px", fontWeight: 600, color: "#cbd5e1", marginTop: "1px" }}>{n.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
