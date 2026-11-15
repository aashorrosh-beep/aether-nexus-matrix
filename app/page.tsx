"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { RIBBONS, NODES, EXTRA_SEARCH, RibbonItem } from "./wheel-data";
function RibbonSVG({ r }: { r: RibbonItem }) {
  return (
    <svg viewBox="0 0 36 46" style={{ width:18, height:23, flexShrink:0 }}>
      {r.puzzle ? (<>
        <path d="M18 4 C10 4 7 11 11 19 L18 30 L21 25 L16 17 C14 12 15 9 18 9 Z" fill={r.r1} />
        <path d="M18 4 C26 4 29 11 25 19 L18 30 L15 25 L20 17 C22 12 21 9 18 9 Z" fill={r.r2} />
        <path d="M18 30 L25 43 L30 40 L21 25 Z" fill={r.r3} />
        <path d="M18 30 L11 43 L6 40 L15 25 Z" fill={r.r4} />
      </>) : (<>
        <path d="M18 4 C10 4 7 11 11 19 L25 43 L30 40 L16 17 C14 12 15 9 18 9 Z" fill={r.r1} />
        <path d="M18 4 C26 4 29 11 25 19 L11 43 L6 40 L20 17 C22 12 21 9 18 9 Z" fill={r.r2} />
      </>)}
      <circle cx="18" cy="11.5" r="3.4" fill="#090b12" />
    </svg>);
}
function FlameHalo({ c1, c2, id }: { c1: string; c2: string; id: string }) {
  const d = Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2, tip = i % 2 === 0 ? 98 : 92;
    const p = (ang: number, r: number) =>
      (100 + Math.cos(ang) * r).toFixed(1) + " " + (100 + Math.sin(ang) * r).toFixed(1);
    return "M" + p(a - 0.15, 72) + " Q" + p(a - 0.04, 88) + " " +
      p(a + 0.05, tip) + " Q" + p(a + 0.09, 83) + " " + p(a + 0.16, 72) + "Z";
  }).join(" ");
  const g = "fg-" + id;
  return (
    <svg className="orb-flame" viewBox="0 0 200 200"
      style={{ position:"absolute", inset:"-16%", width:"132%", height:"132%",
        zIndex:1, filter:"drop-shadow(0 0 8px " + c1 + ")" }}>
      <defs>
        <radialGradient id={g} cx="50%" cy="50%" r="50%">
          <stop offset="68%" stopColor="#fff7ed" />
          <stop offset="83%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} stopOpacity="0.15" />
        </radialGradient>
      </defs>
      <path d={d} fill={"url(#" + g + ")"} />
    </svg>);
}
function drawArc(ctx: CanvasRenderingContext2D, x1: number, y1: number,
  x2: number, y2: number, disp: number, depth: number) {
  const pts: [number, number][] = [[x1, y1], [x2, y2]];
  let d = disp;
  for (let s = 0; s < depth; s++) {
    for (let i = pts.length - 1; i > 0; i--) {
      const [ax, ay] = pts[i - 1], [bx, by] = pts[i];
      const dx = bx - ax, dy = by - ay, ln = Math.hypot(dx, dy) || 1;
      const off = (Math.random() - 0.5) * d;
      pts.splice(i, 0, [(ax+bx)/2 + (-dy/ln)*off, (ay+by)/2 + (dx/ln)*off]);
    }
    d *= 0.54;
  }
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.stroke();
  return pts;
}
export default function AlbsNexusGalaxy() {
  const [q, setQ] = useState(""), [es, setEs] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hotRef = useRef<string | null>(null);
  useEffect(() => {
    let anim = 0, last = 0;
    const loop = (t: number) => {
      anim = requestAnimationFrame(loop);
      if (t - last < 55) return;
      last = t;
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, 1600, 1200);
      [[425,335],[640,445]].forEach(([rx, ry]) => {
        ctx.beginPath(); ctx.ellipse(800, 582, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(186,230,253,0.12)"; ctx.lineWidth = 1.2;
        ctx.shadowBlur = 0; ctx.stroke();
      });
      NODES.forEach(n => {
        const hot = hotRef.current === n.id;
        ctx.lineCap = "round"; ctx.shadowColor = n.bolt;
        ctx.shadowBlur = hot ? 28 : 16; ctx.strokeStyle = n.bolt;
        ctx.lineWidth = hot ? 5.2 : 3.2;
        const pts = drawArc(ctx, 800, 582, n.x, n.y, hot ? 64 : 44, 5);
        ctx.shadowBlur = 5; ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = hot ? 2.1 : 1.2; ctx.beginPath();
        pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
        ctx.stroke();
      });
    };
    anim = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(anim);
  }, []);
  const allSearch = [...NODES, ...EXTRA_SEARCH,
    ...RIBBONS.map(r => ({ id: r.id, title: r.name, href: r.href }))];
  const hits = q.trim() ? allSearch.filter(n =>
    n.title.toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <div className="galaxy-canvas">
      <div style={{ position:"relative", zIndex:35, maxWidth:1320, margin:"0 auto 6px",
        background:"rgba(9,13,24,0.92)", border:"1.5px solid rgba(56,189,248,0.45)",
        borderRadius:16, padding:"9px 12px", boxShadow:"0 0 28px rgba(56,189,248,0.16)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
          flexWrap:"wrap", gap:8, marginBottom:8 }}>
          <span style={{ fontSize:13, fontWeight:900, letterSpacing:"0.12em", color:"#fde047" }}>
            {es ? "🎗️ SANTUARIOS DE ESPERANZA • AYUDA Y TIENDAS" : "🎗️ SANCTUARIES OF HOPE • EVENTS ZIP, LOCAL HELP & STORES"}
          </span>
          <button onClick={() => setEs(!es)} style={{ background:"#facc15", color:"#000",
            fontWeight:900, border:0, borderRadius:999, padding:"4px 12px", fontSize:11, cursor:"pointer" }}>
            {es ? "🇺🇸 ENGLISH" : "🇪🇸 ESPAÑOL"}
          </button>
        </div>
        <div className="sanctuary-grid">
          {RIBBONS.map(r => (
            <Link key={r.id} href={r.href} style={{ background:"#0c1220",
              border:"1.5px solid " + r.border, borderRadius:10, padding:"7px 9px",
              display:"flex", alignItems:"center", gap:7, textDecoration:"none", color:"#fff" }}>
              <RibbonSVG r={r} />
              <span style={{ fontSize:11.5, fontWeight:800, lineHeight:1.2 }}>{es ? r.es : r.name}</span>
            </Link>))}
        </div>
      </div>
      <div className="solar-stage">
        <canvas ref={canvasRef} width={1600} height={1200}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} />
        <div style={{ position:"absolute", left:"50%", top:"48.5%",
          transform:"translate(-50%,-50%)", width:"24cqw", height:"24cqw", zIndex:30 }}>
          <FlameHalo c1="#ef4444" c2="#fde047" id="sun" />
          <div style={{ position:"absolute", inset:0, zIndex:2, borderRadius:"50%", overflow:"hidden",
            border:"2.5px solid #fca5a5",
            boxShadow:"0 0 3cqw rgba(239,68,68,0.9), inset 0 0 2.5cqw #dc2626" }}>
            <svg viewBox="0 0 240 240" style={{ width:"100%", height:"100%", display:"block" }}>
              <defs><filter id="cm" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="turbulence" baseFrequency="0.032" numOctaves={4} seed={11} result="t" />
                <feColorMatrix type="matrix" values="-4.2 0 0 0 1.48 0 -6.8 0 0 0.32 0 0 -7.5 0 0.32 0 0 0 1 0" in="t" />
              </filter></defs>
              <rect width="240" height="240" filter="url(#cm)" />
            </svg>
          </div>
          <div style={{ position:"absolute", top:"15%", left:0, right:0, textAlign:"center", zIndex:8 }}>
            <div style={{ fontSize:"clamp(8.5px,1cqw,14px)", fontWeight:700, color:"#fecaca" }}>Electric Sun</div>
            <div style={{ fontSize:"clamp(15px,2.45cqw,34px)", fontWeight:900, color:"#fff" }}>ALBS NEXUS</div>
            <div style={{ fontSize:"clamp(8px,0.95cqw,13px)", fontWeight:700, color:"#e2e8f0" }}>10 Worlds • Mega Stores</div>
          </div>
          <div style={{ position:"absolute", left:"-2%", right:"-2%", top:"51%", height:"40%", zIndex:12,
            background:"linear-gradient(180deg,rgba(14,17,26,0.96),rgba(4,5,9,0.99))",
            borderRadius:"22% 22% 52% 52% / 26% 26% 74% 74%",
            borderTop:"2px solid rgba(226,232,240,0.5)", borderBottom:"2px solid rgba(244,63,94,0.7)",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 10px" }}>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search All Malls & Mega Stores..."
              style={{ width:"84%", background:"#0b0f19", border:"1px solid #475569", color:"#fff",
                borderRadius:999, padding:"5px 11px", fontSize:"clamp(8px,0.9cqw,13px)" }} />
            <Link href="/nostalgia/concierge" style={{ marginTop:"0.35cqw", color:"#fde047",
              fontSize:"clamp(7.5px,0.82cqw,12px)", fontWeight:800, textDecoration:"none" }}>
              3-Hr AI Concierge (24-Hr Hold) →
            </Link>
          </div>
          {hits.length > 0 ? (<div style={{ position:"absolute", top:"102%", left:"50%",
            transform:"translateX(-50%)", width:250, background:"#090d16", border:"1px solid #38bdf8",
            borderRadius:10, padding:6, zIndex:60 }}>
            {hits.slice(0, 8).map(h => (<Link key={h.id} href={h.href} style={{ display:"flex",
              justifyContent:"space-between", padding:"5px 7px", color:"#fff", textDecoration:"none", fontSize:12 }}>
              <span>{h.title}</span><span style={{ color:"#38bdf8" }}>Go →</span></Link>))}
          </div>) : null}
        </div>
        {NODES.map(n => (
          <Link key={n.id} href={n.href} className="planet-orb"
            onMouseEnter={() => { hotRef.current = n.id; }} onMouseLeave={() => { hotRef.current = null; }}
            style={{ position:"absolute", left:((n.x/1600)*100)+"%", top:((n.y/1200)*100)+"%",
              transform:"translate(-50%,-50%)", textDecoration:"none", textAlign:"center", zIndex:22 }}>
            <div style={{ position:"relative", width:n.size+"cqw", height:n.size+"cqw", margin:"0 auto" }}>
              <FlameHalo c1={n.f1} c2={n.f2} id={n.id} />
              <div style={{ position:"absolute", inset:0, zIndex:2, borderRadius:"50%", overflow:"hidden",
                background:"#060b18", border:"2.2px solid rgba(255,255,255,0.92)",
                boxShadow:"0 0 18px " + n.f1 + "aa, inset 0 0 14px rgba(0,0,0,0.45)" }}>
                <img src={n.img} alt={n.title} referrerPolicy="no-referrer"
                  style={{ width:"100%", height:"100%", objectFit:"cover",
                    transform:"scale(1.18)", display:"block" }} />
                <div style={{ position:"absolute", inset:0, borderRadius:"50%",
                  background:"radial-gradient(circle at 30% 24%, rgba(255,255,255,0.28) 0%, transparent 42%, rgba(2,6,23,0.38) 100%)" }} />
              </div>
            </div>
            <div style={{ position:"relative", zIndex:4, marginTop:"0.55cqw", whiteSpace:"nowrap", textShadow:"0 2px 8px #000" }}>
              <div style={{ fontSize:"clamp(8.5px,0.96cqw,14px)", fontWeight:900,
                color:n.size>12?"#fef08a":"#fff" }}>{n.title}</div>
              <div style={{ fontSize:"clamp(6.5px,0.75cqw,11px)", fontWeight:600, color:"#e2e8f0" }}>{n.sub}</div>
            </div>
          </Link>))}
      </div>
    </div>);
}
