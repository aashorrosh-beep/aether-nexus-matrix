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
      ctx.clearRect(0, 0, 1600, 1060);
      [[270,175],[415,265],[565,360]].forEach(([rx, ry]) => {
        ctx.beginPath(); ctx.ellipse(800, 520, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(186,230,253,0.11)"; ctx.lineWidth = 1.1;
        ctx.shadowBlur = 0; ctx.stroke();
      });
      NODES.forEach(n => {
        const hot = hotRef.current === n.id;
        ctx.lineCap = "round"; ctx.shadowColor = n.bolt;
        ctx.shadowBlur = hot ? 28 : 16; ctx.strokeStyle = n.bolt;
        ctx.lineWidth = hot ? 5.2 : 3.2;
        const pts = drawArc(ctx, 800, 520, n.x, n.y, hot ? 64 : 44, 5);
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
              <span style={{ fontSize:11.5, fontWeight:800, lineHeight:1.2 }}>
                {es ? r.es : r.name}
              </span>
            </Link>))}
        </div>
      </div>
      <div className="solar-stage">
        <canvas ref={canvasRef} width={1600} height={1060}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} />
        <div style={{ position:"absolute", left:"50%", top:"49%",
          transform:"translate(-50%,-50%)", width:"18.4cqw", height:"18.4cqw", zIndex:30 }}>
          <div style={{ position:"absolute", inset:0, borderRadius:"50%", overflow:"hidden",
            boxShadow:"0 0 2.5cqw rgba(239,68,68,0.88), inset 0 0 2.2cqw #dc2626" }}>
            <svg viewBox="0 0 240 240" style={{ width:"100%", height:"100%", display:"block" }}>
              <defs><filter id="cm" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="turbulence" baseFrequency="0.032" numOctaves={4} seed={11} result="t" />
                <feColorMatrix type="matrix" values="-4.2 0 0 0 1.48 0 -6.8 0 0 0.32 0 0 -7.5 0 0.32 0 0 0 1 0" in="t" />
              </filter></defs>
              <rect width="240" height="240" filter="url(#cm)" />
              <circle cx="120" cy="120" r="117" fill="none" stroke="#ef4444" strokeWidth="6" />
            </svg>
          </div>
          <div style={{ position:"absolute", top:"15%", left:0, right:0, textAlign:"center", zIndex:8 }}>
            <div style={{ fontSize:"clamp(7.5px,0.82cqw,11.5px)", fontWeight:700, color:"#fecaca" }}>Electric Sun</div>
            <div style={{ fontSize:"clamp(12px,1.9cqw,26px)", fontWeight:900, color:"#fff" }}>ALBS NEXUS</div>
            <div style={{ fontSize:"clamp(7px,0.78cqw,11px)", fontWeight:700, color:"#e2e8f0" }}>10 Worlds • Mega Stores</div>
          </div>
          <div style={{ position:"absolute", left:"-3%", right:"-3%", top:"50%", height:"41%", zIndex:12,
            background:"linear-gradient(180deg,rgba(14,17,26,0.96),rgba(4,5,9,0.99))",
            borderRadius:"22% 22% 52% 52% / 26% 26% 74% 74%",
            borderTop:"1.8px solid rgba(226,232,240,0.45)", borderBottom:"1.8px solid rgba(244,63,94,0.65)",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 8px" }}>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search All Malls & Mega Stores..."
              style={{ width:"84%", background:"#0b0f19", border:"1px solid #475569", color:"#fff",
                borderRadius:999, padding:"3px 9px", fontSize:"clamp(7px,0.75cqw,11px)" }} />
            <Link href="/nostalgia/concierge" style={{ marginTop:"0.3cqw", color:"#fde047",
              fontSize:"clamp(6.5px,0.7cqw,10px)", fontWeight:800, textDecoration:"none" }}>
              3-Hr AI Concierge (24-Hr Hold) →
            </Link>
          </div>
          {hits.length > 0 ? (<div style={{ position:"absolute", top:"102%", left:"50%",
            transform:"translateX(-50%)", width:230, background:"#090d16", border:"1px solid #38bdf8",
            borderRadius:10, padding:6, zIndex:60 }}>
            {hits.slice(0, 8).map(h => (<Link key={h.id} href={h.href} style={{ display:"flex",
              justifyContent:"space-between", padding:"5px 7px", color:"#fff", textDecoration:"none", fontSize:11.5 }}>
              <span>{h.title}</span><span style={{ color:"#38bdf8" }}>Go →</span></Link>))}
          </div>) : null}
        </div>
        {NODES.map(n => (
          <Link key={n.id} href={n.href} className="planet-orb"
            onMouseEnter={() => { hotRef.current = n.id; }} onMouseLeave={() => { hotRef.current = null; }}
            style={{ position:"absolute", left:((n.x/1600)*100)+"%", top:((n.y/1060)*100)+"%",
              transform:"translate(-50%,-50%)", textDecoration:"none", textAlign:"center", zIndex:22 }}>
            <div style={{ position:"relative", width:n.size+"cqw", height:n.size+"cqw", margin:"0 auto",
              borderRadius:"50%", overflow:"hidden",
              border:n.id==="megastores"?"2.5px solid #facc15":"2px solid rgba(224,242,254,0.85)",
              boxShadow:n.id==="megastores"?"0 0 26px #facc15aa":"0 0 20px rgba(56,189,248,0.45)" }}>
              <div style={{ position:"absolute", inset:0, backgroundImage:"url('"+n.img+"')",
                backgroundSize:"cover", backgroundPosition:"center" }} />
            </div>
            <div style={{ marginTop:"0.4cqw", whiteSpace:"nowrap", textShadow:"0 2px 8px #000" }}>
              <div style={{ fontSize:"clamp(8px,0.92cqw,13px)", fontWeight:900,
                color:n.id==="megastores"?"#fde047":"#fff" }}>{n.title}</div>
              <div style={{ fontSize:"clamp(6.5px,0.72cqw,10.5px)", fontWeight:600, color:"#cbd5e1" }}>{n.sub}</div>
            </div>
          </Link>))}
      </div>
    </div>);
}
