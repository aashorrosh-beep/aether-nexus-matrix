"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { RIBBONS, NODES } from "./wheel-data";

function RibbonSVG({ r }: { r: any }) {
  return (
    <svg viewBox="0 0 36 46" style={{ width: "1.9cqw", minWidth: "17px", flexShrink: 0, filter: `drop-shadow(0 0 5px ${r.border})` }}>
      {r.puzzle ? (
        <>
          <path d="M18 4 C10 4 7 11 11 19 L18 30 L21 25 L16 17 C14 12 15 9 18 9 Z" fill={r.r1} />
          <path d="M18 4 C26 4 29 11 25 19 L18 30 L15 25 L20 17 C22 12 21 9 18 9 Z" fill={r.r2} />
          <path d="M18 30 L25 43 L30 40 L21 25 Z" fill={r.r3} />
          <path d="M18 30 L11 43 L6 40 L15 25 Z" fill={r.r4} />
        </>
      ) : (
        <>
          <path d="M18 4 C10 4 7 11 11 19 L25 43 L30 40 L16 17 C14 12 15 9 18 9 Z" fill={r.r1} />
          <path d="M18 4 C26 4 29 11 25 19 L11 43 L6 40 L20 17 C22 12 21 9 18 9 Z" fill={r.r2} />
        </>
      )}
      <circle cx="18" cy="11.5" r="3.4" fill="#090b12" />
    </svg>
  );
}

function drawArc(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, disp: number, depth: number) {
  const pts: [number, number][] = [[x1, y1], [x2, y2]];
  let d = disp;
  for (let s = 0; s < depth; s++) {
    for (let i = pts.length - 1; i > 0; i--) {
      const [ax, ay] = pts[i - 1], [bx, by] = pts[i];
      const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
      const off = (Math.random() - 0.5) * d;
      pts.splice(i, 0, [(ax + bx) / 2 + (-dy / len) * off, (ay + by) / 2 + (dx / len) * off]);
    }
    d *= 0.54;
  }
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.stroke();
  return pts;
}

export default function AlbsNexusLiveSizzle() {
  const [q, setQ] = useState("");
  const [zips, setZips] = useState<Record<string, string>>({
    autism: "77301", down: "77301", deafblind: "77301", ptsd: "77301", mobility: "77301", peptides: "77301"
  });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hotRef = useRef<string | null>(null);
  const hits = q.trim() ? [{ id: "em", title: "🚨 Emergency Superstore • Flood • Hurricane • Fire", href: "/stores/emergency-ready" }, ...NODES, ...RIBBONS.map(r => ({ id: r.id, title: r.name, href: r.href }))].filter(n => n.title.toLowerCase().includes(q.toLowerCase())) : [];

  useEffect(() => {
    let anim = 0, last = 0;
    const loop = (t: number) => {
      anim = requestAnimationFrame(loop);
      if (t - last < 55) return;
      last = t;
      const c = canvasRef.current;
      if (!c) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, 1600, 1060);

      // Concentric elliptical orbit tracks
      [[270, 155], [410, 235], [555, 315], [690, 385]].forEach(([rx, ry]) => {
        ctx.beginPath();
        ctx.ellipse(800, 510, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(186,230,253,0.12)";
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 0;
        ctx.stroke();
      });

      // Live sizzling plasma bolts + hover orb sizzle ring
      NODES.forEach((n) => {
        const hot = hotRef.current === n.id;
        ctx.lineCap = "round";
        ctx.shadowColor = n.bolt;
        ctx.shadowBlur = hot ? 30 : 18;
        ctx.strokeStyle = n.bolt;
        ctx.lineWidth = hot ? 5.5 : 3.4;
        const mainPts = drawArc(ctx, 800, 510, n.x, n.y, hot ? 68 : 48, 5);

        // White-hot inner core
        ctx.shadowBlur = 6;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = hot ? 2.2 : 1.3;
        ctx.beginPath();
        mainPts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
        ctx.stroke();

        // Branching forks
        ctx.strokeStyle = n.bolt;
        ctx.lineWidth = hot ? 2.6 : 1.7;
        const m1 = mainPts[10], m2 = mainPts[20];
        drawArc(ctx, m1[0], m1[1], m1[0] + (n.x - 800) * 0.18 - 35, m1[1] + (n.y - 510) * 0.18 + 30, 22, 3);
        drawArc(ctx, m2[0], m2[1], m2[0] + (n.x - 800) * 0.16 + 35, m2[1] + (n.y - 510) * 0.16 - 30, 20, 3);

        // Extra sizzling corona around the orb & bolt when hovered/touched!
        if (hot) {
          ctx.strokeStyle = "#ffffff";
          ctx.shadowColor = n.bolt;
          ctx.shadowBlur = 24;
          ctx.lineWidth = 2.2;
          drawArc(ctx, 800, 510, n.x, n.y, 75, 5);
          for (let a = 0; a < 6; a++) {
            const a1 = (a / 6) * Math.PI * 2 + Math.random() * 0.4, a2 = a1 + 1.05;
            drawArc(ctx, n.x + Math.cos(a1) * 98, n.y + Math.sin(a1) * 98, n.x + Math.cos(a2) * 98, n.y + Math.sin(a2) * 98, 18, 3);
          }
        }
      });
    };
    anim = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(anim);
  }, []);

  return (
    <div className="galaxy-canvas">
      <div style={{ position: "relative", zIndex: 30, maxWidth: "1400px", margin: "0 auto", containerType: "inline-size" }}>
        <div style={{ width: "95%", margin: "0 auto 0.2cqw", background: "rgba(10,13,22,0.85)", border: "1px solid rgba(148,163,184,0.28)", borderRadius: "1.1cqw", padding: "0.65cqw 1cqw", backdropFilter: "blur(8px)", boxShadow: "0 10px 35px rgba(0,0,0,0.85)" }}>
          <h2 style={{ margin: "0 0 0.55cqw", textAlign: "center", fontSize: "clamp(11px, 1.35cqw, 19px)", fontWeight: 800, letterSpacing: "0.15em", color: "#f8fafc" }}>SANCTUARIES OF HOPE</h2>
          <div className="sanctuary-bar" data-z={zips.autism} onClick={() => setZips(zips)}>
{RIBBONS.map((r) => (
  <Link key={r.id} href={r.href} style={{
    background:"rgba(14,18,29,0.92)", border:"1.5px solid " + r.border,
    borderRadius:10, padding:"6px 8px", display:"flex",
    alignItems:"center", gap:6, textDecoration:"none", color:"#fff" }}>
    <RibbonSVG r={r} />
    <div style={{ minWidth:0, flex:1 }}>
      <div style={{ fontSize:11, fontWeight:800, whiteSpace:"nowrap",
        overflow:"hidden", textOverflow:"ellipsis" }}>{r.name}</div>
      <div style={{ marginTop:3, background:"#05070e", borderRadius:5,
        padding:"2px 5px", fontSize:9, fontWeight:800, color:"#fde047" }}>
        Sanctuary &amp; Information →</div>
    </div></Link>))}</div>
        </div>
      </div>

      <div className="solar-stage">
        <canvas ref={canvasRef} width={1600} height={1060} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 8 }} />

        {/* CENTER ELECTRIC SUN */}
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "18.6cqw", height: "18.6cqw", borderRadius: "50%", zIndex: 25, animation: "sunSizzle 3.4s ease-in-out infinite" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", boxShadow: "inset 0 0 2.2cqw #dc2626" }}>
            <svg viewBox="0 0 240 240" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <filter id="crimsonMagma" x="0%" y="0%" width="100%" height="100%">
                  <feTurbulence type="turbulence" baseFrequency="0.032" numOctaves="4" seed="11" result="t" />
                  <feColorMatrix type="matrix" values="-4.2 0 0 0 1.48  -6.8 0 0 0 0.32  -7.5 0 0 0 0.32  0 0 0 0 1" in="t" />
                </filter>
              </defs>
              <rect width="240" height="240" filter="url(#crimsonMagma)" />
              <circle cx="120" cy="120" r="117" fill="none" stroke="#ef4444" strokeWidth="6" opacity="0.85" />
            </svg>
          </div>
          <div style={{ position: "absolute", top: "16%", left: 0, right: 0, textAlign: "center", zIndex: 8, pointerEvents: "none" }}>
            <div style={{ fontSize: "clamp(8px, 0.85cqw, 12px)", fontWeight: 700, color: "#fee2e2", textShadow: "0 2px 6px #000" }}>Electric Sun</div>
            <div style={{ fontSize: "clamp(13px, 1.98cqw, 28px)", fontWeight: 900, color: "#ffffff", letterSpacing: "0.04em", lineHeight: 1.04, textShadow: "0 2px 12px #000" }}>ALBS NEXUS</div>
            <div style={{ fontSize: "clamp(7.5px, 0.82cqw, 11.5px)", fontWeight: 700, color: "#f8fafc", marginTop: "0.15cqw", textShadow: "0 2px 6px #000" }}>6 Malls • 2,000+ SKUs</div>
          </div>
          <div style={{ position: "absolute", left: "-3%", right: "-3%", top: "50%", height: "41%", zIndex: 12, background: "linear-gradient(180deg, rgba(16,19,28,0.95) 0%, rgba(4,5,9,0.98) 65%, rgba(18,8,12,0.96) 100%)", borderRadius: "22% 22% 52% 52% / 26% 26% 74% 74%", borderTop: "1.8px solid rgba(226,232,240,0.48)", borderBottom: "1.8px solid rgba(244,63,94,0.65)", boxShadow: "0 10px 24px rgba(0,0,0,0.9), inset 0 6px 14px rgba(255,255,255,0.14)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.4cqw 1.2cqw 0.6cqw" }}>
            <div style={{ width: "80%", display: "flex", alignItems: "center", background: "rgba(12,15,24,0.96)", border: "1px solid rgba(148,163,184,0.38)", borderRadius: "999px", padding: "0.18cqw 0.22cqw 0.18cqw 0.75cqw" }}>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search All Malls..." style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "clamp(7px, 0.74cqw, 10.5px)" }} />
              <span style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)", color: "#fff", borderRadius: "50%", width: "1.35cqw", height: "1.35cqw", minWidth: "14px", minHeight: "14px", fontSize: "clamp(7px, 0.65cqw, 9px)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>🔍</span>
            </div>
            <Link href="/nostalgia/concierge" style={{ marginTop: "0.35cqw", padding: "0.2cqw 0.75cqw", borderRadius: "999px", border: "1px solid rgba(148,163,184,0.38)", background: "rgba(12,16,26,0.9)", color: "#e2e8f0", fontWeight: 700, fontSize: "clamp(6.5px, 0.62cqw, 9px)", textDecoration: "none", whiteSpace: "nowrap" }}>3-Hr AI Concierge (24-Hr Hold) →</Link><Link href="/stores/emergency-ready" style={{ marginTop: "0.3cqw", padding: "0.22cqw 0.8cqw", borderRadius: "999px", border: "1px solid #f59e0b", background: "#b91c1c", color: "#fde047", fontWeight: 900, fontSize: "clamp(6.5px, 0.62cqw, 9px)", textDecoration: "none", whiteSpace: "nowrap" }}>🚨 EMERGENCY SUPERSTORE • Flood • Hurricane • Fire →</Link>
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

        {/* 9 STAGGERED PLANETARY STORE ORBS (HOVER OR TOUCH TO SIZZLE!) */}
        {NODES.map((n) => (
          <Link key={n.id} href={n.href} className="planet-orb" onMouseEnter={() => { hotRef.current = n.id; }} onMouseLeave={() => { hotRef.current = null; }} onTouchStart={() => { hotRef.current = n.id; }} style={{ position: "absolute", left: `${(n.x / 1600) * 100}%`, top: `${(n.y / 1060) * 100}%`, transform: "translate(-50%, -50%)", textDecoration: "none", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ position: "relative", width: `${n.size}cqw`, height: `${n.size}cqw`, borderRadius: "50%", border: "2.2px solid rgba(224,242,254,0.9)", boxShadow: "0 0 2.2cqw 0.45cqw rgba(125,211,252,0.58), inset 0 0 1.2cqw rgba(2,6,23,0.45)", backgroundImage: `url('${n.img}')`, backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 30% 24%, rgba(255,255,255,0.24) 0%, transparent 45%, rgba(2,6,23,0.45) 100%)", pointerEvents: "none" }} />
            </div>
            <div style={{ marginTop: "0.45cqw", textAlign: "center", whiteSpace: "nowrap", textShadow: "0 2px 8px #000, 0 0 14px #000" }}>
              <div style={{ fontSize: "clamp(8.5px, 0.96cqw, 13.5px)", fontWeight: 800, color: "#ffffff", letterSpacing: "0.04em" }}>{n.title}</div>
              <div style={{ fontSize: "clamp(7px, 0.76cqw, 11px)", fontWeight: 600, color: "#e2e8f0", marginTop: "1px" }}>{n.sub}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
