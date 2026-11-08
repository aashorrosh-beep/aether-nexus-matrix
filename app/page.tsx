"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RIBBONS, NODES } from "./wheel-data";

function RibbonSVG({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <svg width="28" height="36" viewBox="0 0 36 44" style={{ flexShrink: 0 }}>
      <path d="M18 4 C10 4 7 11 11 19 L24 41 L29 38 L16 17 C14 12 15 9 18 9 C21 9 22 12 20 17 L7 38 L12 41 L25 19 C29 11 26 4 18 4 Z" fill={c1} stroke={c2} strokeWidth="2.4" />
      <circle cx="18" cy="11" r="3.5" fill="#03040b" />
    </svg>
  );
}

function bolt(cx: number, cy: number, tx: number, ty: number, s: number) {
  const dx = tx - cx, dy = ty - cy, nx = -dy, ny = dx;
  return `M ${cx} ${cy} L ${(cx+dx*0.28+nx*0.07*s).toFixed(1)} ${(cy+dy*0.28+ny*0.07*s).toFixed(1)} L ${(cx+dx*0.55-nx*0.08*s).toFixed(1)} ${(cy+dy*0.55-ny*0.08*s).toFixed(1)} L ${(cx+dx*0.8+nx*0.05*s).toFixed(1)} ${(cy+dy*0.8+ny*0.05*s).toFixed(1)} L ${tx.toFixed(1)} ${ty.toFixed(1)}`;
}

export default function AlbsNexusLobby() {
  const [q, setQ] = useState("");
  const [zip, setZip] = useState("77301");
  const hits = q.trim() ? [...NODES, ...RIBBONS.map(r => ({ id: r.id, title: r.name, sub: r.sub, href: r.href }))].filter(n => (n.title + " " + n.sub).toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div style={{ minHeight: "100vh", color: "#f8fafc", paddingBottom: "60px" }}>
      {/* TOP BEACON OF HOPE: 6 NATIONALLY RECOGNIZED AWARENESS RIBBONS */}
      <div style={{ maxWidth: "1140px", margin: "10px auto 0", padding: "0 12px" }}>
        <div style={{ background: "rgba(9,13,22,0.92)", border: "2px solid #fbbf24", borderRadius: "20px", padding: "12px 14px", boxShadow: "0 0 35px rgba(251,191,36,0.25)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", fontWeight: 900, color: "#fef08a", letterSpacing: "0.1em" }}>🎗️ BEACON OF HOPE SANCTUARIES • OFFICIAL CAUSE RIBBONS</span>
            <span style={{ fontSize: "11px", fontWeight: 900, color: "#38bdf8" }}>📍 12-MILE RADAR ZIP: <input value={zip} onChange={e => setZip(e.target.value)} maxLength={5} style={{ width: "60px", padding: "2px 6px", background: "#030712", border: "1px solid #fbbf24", color: "#fef08a", borderRadius: "6px", fontWeight: 900 }} /></span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: "8px" }}>
            {RIBBONS.map(r => (
              <Link key={r.id} href={r.href} style={{ background: "#030712", border: `1.5px solid ${r.c1}`, borderRadius: "12px", padding: "8px", textDecoration: "none", color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
                <RibbonSVG c1={r.c1} c2={r.c2} />
                <div>
                  <div style={{ fontSize: "11.5px", fontWeight: 900 }}>{r.name}</div>
                  <div style={{ fontSize: "9.5px", color: "#cbd5e1" }}>{r.sub}</div>
                  <div style={{ fontSize: "9px", fontWeight: 900, color: r.c2 }}>📍 {zip} →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* SCALABLE SOLAR-FLARE SPOKE & WHEEL (WORKS ON BOTH FULL & HALF SCREEN) */}
      <div style={{ width: "100%", maxWidth: "1100px", margin: "10px auto 0", padding: "0 8px" }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "1100 / 740", minHeight: "540px" }}>
          <svg viewBox="0 0 1100 740" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 5 }}>
            <circle cx="550" cy="365" r="300" fill="none" stroke="rgba(56,189,248,0.35)" strokeWidth="1.5" strokeDasharray="10 8" />
            <circle cx="550" cy="365" r="180" fill="none" stroke="rgba(251,191,36,0.45)" strokeWidth="2" />
            {NODES.map((n, i) => {
              const r = ((n.angle - 90) * Math.PI) / 180, tx = 550 + Math.cos(r) * 395, ty = 365 + Math.sin(r) * 260;
              const b = bolt(550, 365, tx, ty, i % 2 === 0 ? 1 : -1);
              return (
                <g key={n.id}>
                  <path d={b} fill="none" stroke={n.border} strokeWidth="3.5" />
                  <path d={b} fill="none" stroke="#ffffff" strokeWidth="1.2" />
                </g>
              );
            })}
          </svg>

          {/* CENTER SOLAR NUCLEUS + SEARCH ALL MALLS + 3-HR CONCIERGE */}
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "26%", minWidth: "210px", zIndex: 25, textAlign: "center" }}>
            <div style={{ width: "175px", height: "175px", margin: "0 auto", borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #fef9c3 0%, #fbbf24 35%, #ea580c 72%, #7c2d12 100%)", border: "4px solid #fef08a", boxShadow: "0 0 55px #f59e0b, 0 0 110px #38bdf8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px" }}>
              <div style={{ fontSize: "9px", fontWeight: 900, color: "#451a03" }}>⚡ THE FUTURE OF MALLS ⚡</div>
              <div style={{ fontSize: "23px", fontWeight: 900, color: "#020617", lineHeight: 1, margin: "3px 0" }}>ALBS<br/>NEXUS</div>
              <div style={{ fontSize: "9px", fontWeight: 900, color: "#fef08a", background: "#090d16", padding: "2px 8px", borderRadius: "999px" }}>6 Malls • 2,000+ SKUs</div>
            </div>
            <div style={{ marginTop: "8px", background: "rgba(3,7,18,0.95)", border: "1.5px solid #38bdf8", borderRadius: "12px", padding: "8px" }}>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search All Malls..." style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #fbbf24", background: "#090d16", color: "#fff", fontSize: "11.5px", fontWeight: 700 }} />
              {hits.length > 0 && (
                <div style={{ marginTop: "5px", display: "grid", gap: "3px", maxHeight: "95px", overflowY: "auto" }}>
                  {hits.map(h => (
                    <Link key={h.id} href={h.href} style={{ display: "flex", justifyContent: "space-between", padding: "5px 7px", background: "#0f172a", borderRadius: "5px", color: "#fbbf24", fontSize: "10.5px", fontWeight: 800, textDecoration: "none" }}>
                      <span>{h.title}</span><span style={{ color: "#38bdf8" }}>Go →</span>
                    </Link>
                  ))}
                </div>
              )}
              <Link href="/nostalgia/concierge" style={{ display: "block", marginTop: "6px", padding: "6px", borderRadius: "6px", background: "linear-gradient(90deg, #f59e0b, #ec4899)", color: "#020617", fontWeight: 900, fontSize: "10.5px", textDecoration: "none" }}>
                🎩 3-Hr AI Concierge (24-Hr Hold) →
              </Link>
            </div>
          </div>

          {/* 8 CIRCULAR SPOKE PORTALS */}
          {NODES.map((n) => {
            const r = ((n.angle - 90) * Math.PI) / 180;
            const left = ((550 + Math.cos(r) * 395) / 1100) * 100, top = ((365 + Math.sin(r) * 260) / 740) * 100;
            return (
              <Link key={n.id} href={n.href} style={{ position: "absolute", left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -50%)", width: "16.5%", minWidth: "138px", aspectRatio: "1 / 1", borderRadius: "50%", overflow: "hidden", border: `3px solid ${n.border}`, boxShadow: `0 0 25px ${n.border}88, inset 0 0 20px rgba(0,0,0,0.85)`, textDecoration: "none", color: "#fff", zIndex: 20, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", textAlign: "center", padding: "12px 8px", backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.08) 0%, rgba(2,6,23,0.84) 56%, rgba(2,6,23,0.96) 100%), url('${n.img}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div style={{ fontSize: "11px", fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>{n.title}</div>
                <div style={{ fontSize: "9px", color: "#fef08a", fontWeight: 800, marginTop: "2px", lineHeight: 1.15 }}>{n.sub}</div>
                <div style={{ fontSize: "8.5px", color: "#38bdf8", fontWeight: 800, marginTop: "2px" }}>{n.info}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
