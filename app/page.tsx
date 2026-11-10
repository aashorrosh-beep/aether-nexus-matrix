"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RIBBONS, NODES } from "./wheel-data";

function RibbonSVG({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <svg width="28" height="36" viewBox="0 0 36 44" style={{ flexShrink: 0, filter: `drop-shadow(0 0 6px ${c1})` }}>
      <path d="M18 4 C10 4 7 11 11 19 L24 41 L29 38 L16 17 C14 12 15 9 18 9 C21 9 22 12 20 17 L7 38 L12 41 L25 19 C29 11 26 4 18 4 Z" fill={c1} stroke={c2} strokeWidth="2.4" />
      <circle cx="18" cy="11" r="3.5" fill="#03040b" />
    </svg>
  );
}

// Organic curved energy tentacle + jagged lightning filament
function tentaclePath(cx: number, cy: number, tx: number, ty: number, dir: number) {
  const dx = tx - cx, dy = ty - cy, nx = -dy * 0.16 * dir, ny = dx * 0.16 * dir;
  const c1x = (cx + dx * 0.33 + nx).toFixed(1), c1y = (cy + dy * 0.33 + ny).toFixed(1);
  const c2x = (cx + dx * 0.66 - nx).toFixed(1), c2y = (cy + dy * 0.66 - ny).toFixed(1);
  return `M ${cx} ${cy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${tx.toFixed(1)} ${ty.toFixed(1)}`;
}

export default function AlbsNexusEnergyLobby() {
  const [q, setQ] = useState("");
  const [zips, setZips] = useState<Record<string, string>>({
    autism: "77301", down: "77301", deafblind: "77301", ptsd: "77301", mobility: "77301", peptides: "77301"
  });
  const [activeRadar, setActiveRadar] = useState<string | null>(null);

  const hits = q.trim() ? [...NODES, ...RIBBONS.map(r => ({ id: r.id, title: r.name, sub: r.sub, href: r.href }))].filter(n => (n.title + " " + n.sub).toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div style={{ minHeight: "100vh", color: "#f8fafc", paddingBottom: "70px" }}>
      {/* TOP: CENTERED "SANCTUARIES OF HOPE" WITH COLOR-MATCHED CARDS & INDIVIDUAL 12-MILE RADARS */}
      <div style={{ maxWidth: "1160px", margin: "12px auto 0", padding: "0 14px", position: "relative", zIndex: 30 }}>
        <div style={{ background: "rgba(6,9,18,0.78)", borderRadius: "24px", padding: "14px 18px", boxShadow: "0 0 50px rgba(56,189,248,0.22)" }}>
          <h2 style={{ margin: "0 0 12px", textAlign: "center", fontSize: "18px", fontWeight: 900, letterSpacing: "0.18em", color: "#fef08a", textShadow: "0 0 18px rgba(250,204,21,0.75)" }}>
            🎗️ SANCTUARIES OF HOPE 🎗️
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))", gap: "10px" }}>
            {RIBBONS.map(r => (
              <div key={r.id} style={{ background: r.bg, borderRadius: "16px", padding: "10px", boxShadow: `0 0 24px ${r.accent}44`, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "6px" }}>
                <Link href={`${r.href}${r.href.includes("?") ? "&" : "?"}zip=${zips[r.id]}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
                  <RibbonSVG c1={r.r1} c2={r.r2} />
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 900, color: r.text, textShadow: "0 1px 4px #000" }}>{r.name}</div>
                    <div style={{ fontSize: "10px", color: "#f8fafc", fontWeight: 700 }}>{r.sub}</div>
                  </div>
                </Link>
                {/* INDIVIDUAL 12-MILE ZIP INPUT ONLY FOR THIS SPECIFIC CAUSE */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,6,23,0.65)", borderRadius: "8px", padding: "4px 7px" }}>
                  <span style={{ fontSize: "9.5px", fontWeight: 900, color: r.text }}>📍 12-Mi ZIP:</span>
                  <input
                    value={zips[r.id]}
                    onChange={e => setZips({ ...zips, [r.id]: e.target.value })}
                    maxLength={5}
                    style={{ width: "52px", background: "transparent", border: "none", borderBottom: `1px solid ${r.accent}`, color: "#fff", fontSize: "10.5px", fontWeight: 900, textAlign: "center" }}
                  />
                  <Link href={`${r.href}${r.href.includes("?") ? "&" : "?"}zip=${zips[r.id]}`} style={{ fontSize: "9.5px", fontWeight: 900, color: r.accent, textDecoration: "none" }}>
                    Go →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FREE-FLOATING BALL OF ENERGY & BORDERLESS ENERGY NODES */}
      <div style={{ width: "100%", maxWidth: "1120px", margin: "12px auto 0", padding: "0 8px" }}>
        {activeRadar && (
          <div style={{ maxWidth: "560px", margin: "0 auto 10px", padding: "10px 16px", borderRadius: "999px", background: "radial-gradient(circle, rgba(56,189,248,0.35), rgba(244,63,94,0.35))", textAlign: "center", fontSize: "12px", fontWeight: 900, color: "#fef08a", boxShadow: "0 0 30px rgba(56,189,248,0.5)" }}>
            📡 12-MILE LOCAL EVENT RADAR LOCKED: {activeRadar} — <Link href="/nostalgia/concierge" style={{ color: "#38bdf8", textDecoration: "underline" }}>View Local Events & Meetups →</Link>
          </div>
        )}

        <div style={{ position: "relative", width: "100%", aspectRatio: "1100 / 760", minHeight: "560px" }}>
          <svg viewBox="0 0 1100 760" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 5 }}>
            {NODES.map((n, i) => {
              const r = ((n.angle - 90) * Math.PI) / 180, tx = 550 + Math.cos(r) * 395, ty = 380 + Math.sin(r) * 268;
              const t1 = tentaclePath(550, 380, tx, ty, i % 2 === 0 ? 1 : -1);
              const t2 = tentaclePath(550, 380, tx, ty, i % 2 === 0 ? -0.75 : 0.75);
              return (
                <g key={n.id} style={{ animation: "tentaclePulse 2.6s ease-in-out infinite" }}>
                  {/* Outer Plasma Tentacle */}
                  <path d={t1} fill="none" stroke={n.glow} strokeWidth="6" strokeOpacity="0.45" strokeLinecap="round" />
                  {/* Red/Blue Core Energy Filaments */}
                  <path d={t1} fill="none" stroke="#38bdf8" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={t2} fill="none" stroke="#f43f5e" strokeWidth="2.2" strokeDasharray="10 6" strokeLinecap="round" />
                  <path d={t1} fill="none" stroke="#ffffff" strokeWidth="1" />
                </g>
              );
            })}
          </svg>

          {/* CENTER FREE-FLOATING BALL OF RED, BLUE & MAGENTA ENERGY (NO BORDER) */}
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "26%", minWidth: "215px", zIndex: 25, textAlign: "center" }}>
            <div style={{
              width: "188px", height: "188px", margin: "0 auto", borderRadius: "50%", border: "none",
              background: "radial-gradient(circle at 38% 35%, #ffffff 0%, #38bdf8 24%, #f43f5e 54%, #a855f7 78%, transparent 100%)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "12px",
              animation: "corePlasma 3.2s ease-in-out infinite"
            }}>
              <div style={{ fontSize: "9px", fontWeight: 900, color: "#fef08a", letterSpacing: "0.14em", textShadow: "0 1px 6px #000" }}>⚡ PURE ENERGY CORE ⚡</div>
              <div style={{ fontSize: "26px", fontWeight: 900, color: "#ffffff", lineHeight: 1, margin: "4px 0", textShadow: "0 0 16px #020617, 0 0 28px #f43f5e" }}>ALBS<br/>NEXUS</div>
              <div style={{ fontSize: "9.5px", fontWeight: 900, color: "#e0f2fe", textShadow: "0 1px 4px #000" }}>6 Malls • 2,000+ SKUs</div>
            </div>

            {/* BORDERLESS FLOATING ENERGY SEARCH & CONCIERGE */}
            <div style={{ marginTop: "12px", background: "radial-gradient(circle, rgba(15,23,42,0.92) 0%, rgba(2,6,23,0.75) 100%)", borderRadius: "18px", padding: "10px", boxShadow: "0 0 35px rgba(56,189,248,0.45), 0 0 60px rgba(244,63,94,0.25)" }}>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search All Malls..." style={{ width: "100%", padding: "8px 12px", borderRadius: "999px", border: "none", background: "rgba(2,6,23,0.85)", color: "#fff", fontSize: "11.5px", fontWeight: 800, boxShadow: "inset 0 0 12px rgba(56,189,248,0.6)" }} />
              {hits.length > 0 && (
                <div style={{ marginTop: "6px", display: "grid", gap: "4px", maxHeight: "95px", overflowY: "auto" }}>
                  {hits.map(h => (
                    <Link key={h.id} href={h.href} style={{ display: "flex", justifyContent: "space-between", padding: "5px 8px", background: "rgba(15,23,42,0.95)", borderRadius: "8px", color: "#fef08a", fontSize: "10.5px", fontWeight: 800, textDecoration: "none" }}>
                      <span>{h.title}</span><span style={{ color: "#38bdf8" }}>Enter →</span>
                    </Link>
                  ))}
                </div>
              )}
              <Link href="/nostalgia/concierge" style={{ display: "block", marginTop: "7px", padding: "7px", borderRadius: "999px", background: "linear-gradient(90deg, #f43f5e, #a855f7, #38bdf8)", color: "#fff", fontWeight: 900, fontSize: "10.5px", textDecoration: "none", boxShadow: "0 0 20px rgba(244,63,94,0.6)" }}>
                🎩 3-Hr AI Concierge (24-Hr Hold) →
              </Link>
            </div>
          </div>

          {/* 8 BORDERLESS COLOR-CODED ENERGY NODES WITH TOUCHABLE 12-MI RADAR */}
          {NODES.map((n) => {
            const r = ((n.angle - 90) * Math.PI) / 180;
            const left = ((550 + Math.cos(r) * 395) / 1100) * 100, top = ((380 + Math.sin(r) * 268) / 760) * 100;
            return (
              <div
                key={n.id}
                className="energy-node"
                style={{
                  position: "absolute", left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -50%)",
                  width: "17%", minWidth: "146px", aspectRatio: "1 / 1", borderRadius: "50%", border: "none",
                  boxShadow: `0 0 42px 12px ${n.glow}88, 0 0 80px 24px ${n.glow}44, inset 0 0 32px ${n.glow}`,
                  zIndex: 20, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center",
                  textAlign: "center", padding: "14px 10px", overflow: "hidden",
                  backgroundImage: `radial-gradient(circle at 50% 30%, transparent 10%, rgba(2,6,23,0.82) 62%, ${n.glow}66 100%), url('${n.img}')`,
                  backgroundSize: "cover", backgroundPosition: "center"
                }}
              >
                <Link href={n.href} style={{ textDecoration: "none", color: "#fff", width: "100%" }}>
                  <div style={{ fontSize: "11.5px", fontWeight: 900, color: "#ffffff", textShadow: `0 0 12px ${n.glow}, 0 2px 6px #000`, lineHeight: 1.1 }}>{n.title}</div>
                  <div style={{ fontSize: "9.5px", color: n.text, fontWeight: 800, marginTop: "3px", lineHeight: 1.15, textShadow: "0 1px 4px #000" }}>{n.sub}</div>
                </Link>
                <button
                  onClick={() => setActiveRadar(`${n.title} (${n.info})`)}
                  style={{ marginTop: "4px", padding: "3px 8px", borderRadius: "999px", border: "none", background: `linear-gradient(90deg, ${n.glow}, rgba(2,6,23,0.9))`, color: "#fff", fontSize: "8.5px", fontWeight: 900, cursor: "pointer", boxShadow: `0 0 12px ${n.glow}` }}
                >
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
