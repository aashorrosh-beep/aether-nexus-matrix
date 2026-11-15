"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { RIBBONS, NODES, EXTRA_SEARCH, ORB_FALLBACK, RibbonItem, NodeItem } from "./wheel-data";
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
      <circle cx="18" cy="11.5" r="3.4" fill="#060913" />
    </svg>);
}
function AstrophysicsDefs() {
  return (
    <svg width="0" height="0" style={{ position:"absolute" }}>
      <defs>
        <filter id="wisp" x="-35%" y="-35%" width="170%" height="170%">
          <feTurbulence type="fractalNoise" baseFrequency="0.032" numOctaves={4} seed={7} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={26} xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation={2.2} />
        </filter>
        <filter id="wispFire" x="-40%" y="-40%" width="180%" height="180%">
          <feTurbulence type="turbulence" baseFrequency="0.045" numOctaves={4} seed={19} result="f" />
          <feDisplacementMap in="SourceGraphic" in2="f" scale={32} xChannelSelector="R" yChannelSelector="G" result="df" />
          <feGaussianBlur in="df" stdDeviation={1.6} />
        </filter>
        <filter id="crimsonCore" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="turbulence" baseFrequency="0.032" numOctaves={4} seed={11} result="t" />
          <feColorMatrix type="matrix" values="-4.2 0 0 0 1.48  0 -6.8 0 0 0.18  0 0 -7.5 0 0.18  0 0 0 1 0" in="t" />
        </filter>
      </defs>
    </svg>);
}
function OrbHalo({ n }: { n: NodeItem }) {
  const flt = n.kind === "fire" ? "url(#wispFire)" : "url(#wisp)";
  const dash = n.kind === "fog" ? "44 18 28 14" : n.kind === "fire" ? "26 10 18 8" : "56 16";
  return (
    <svg viewBox="0 0 220 220" style={{ position:"absolute", inset:"-29%",
      width:"158%", height:"158%", zIndex:1, pointerEvents:"none",
      filter:"drop-shadow(0 0 14px " + n.c1 + ")" }}>
      <g filter={flt}>
        <circle className="gas-cw" cx="110" cy="110" r="82" fill="none"
          stroke={n.c1} strokeWidth={n.kind === "fog" ? 24 : 20} strokeDasharray={dash} opacity="0.88" />
        <circle className="gas-ccw" cx="110" cy="110" r="73" fill="none"
          stroke={n.c2} strokeWidth="12" strokeDasharray="32 14" opacity="0.9" />
      </g>
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
    d *= 0.52;
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
      if (t - last < 58) return;
      last = t;
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, 1600, 1200);
      [[375,280],[655,445]].forEach(([rx, ry]) => {
        ctx.beginPath(); ctx.ellipse(800, 588, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(148,163,184,0.12)"; ctx.lineWidth = 1.2;
        ctx.shadowBlur = 0; ctx.stroke();
      });
      NODES.forEach(n => {
        const hot = hotRef.current === n.id, r = n.size * 8.2;
        ctx.lineCap = "round"; ctx.shadowColor = n.bolt;
        ctx.shadowBlur = hot ? 28 : 16; ctx.strokeStyle = n.bolt;
        ctx.lineWidth = hot ? 4.6 : 2.8;
        const pts = drawArc(ctx, 800, 588, n.x, n.y, hot ? 52 : 34, 5);
        ctx.shadowBlur = 4; ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1.2;
        ctx.beginPath();
        pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
        ctx.stroke();
        if (n.kind === "static") {
          for (let k = 0; k < 2; k++) {
            const a1 = Math.random() * 6.28, a2 = a1 + 0.85;
            ctx.strokeStyle = k === 0 ? "#fde047" : "#7dd3fc"; ctx.lineWidth = 1.7;
            drawArc(ctx, n.x+Math.cos(a1)*r, n.y+Math.sin(a1)*r, n.x+Math.cos(a2)*r, n.y+Math.sin(a2)*r, 16, 3);
          }
        }
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
      <AstrophysicsDefs />
      <div className="emerald-ring-wrap">
        <svg viewBox="0 0 1600 250" preserveAspectRatio="none"
          style={{ position:"absolute", left:"-4%", width:"108%", top:0, height:"100%",
            pointerEvents:"none", zIndex:1, filter:"drop-shadow(0 0 22px rgba(16,185,129,0.45))" }}>
          {([[1158,"rgba(16,185,129,0.24)",36],[1144,"#34d399",4],[1084,"rgba(6,78,59,0.72)",112],
             [1058,"rgba(110,231,183,0.34)",3],[1028,"#6ee7b7",3.5]] as [number,string,number][]).map(
            ([ry,st,sw], i) => <ellipse key={i} cx={800} cy={1165} rx={1460} ry={ry} fill="none" stroke={st} strokeWidth={sw} />)}
        </svg>
        <div style={{ position:"relative", zIndex:6, display:"flex", justifyContent:"center",
          alignItems:"center", flexWrap:"wrap", gap:12, paddingTop:4 }}>
          <span style={{ fontSize:"clamp(11px,1.05vw,15px)", fontWeight:900, letterSpacing:"0.11em",
            color:"#fde047", textShadow:"0 2px 12px #000, 0 0 14px rgba(250,204,21,0.5)" }}>
            {es ? "🎗️ SANTUARIOS DE ESPERANZA • EVENTOS, AYUDA Y TIENDAS" : "🎗️ SANCTUARIES OF HOPE • EVENTS, LOCAL HELP & STORES"}
          </span>
          <button onClick={() => setEs(!es)} style={{ background:"#facc15", color:"#000",
            fontWeight:900, border:0, borderRadius:999, padding:"4px 13px", fontSize:11, cursor:"pointer" }}>
            {es ? "🇺🇸 ENGLISH" : "🇪🇸 ESPAÑOL"}
          </button>
        </div>
        <div className="sanctuary-arch-grid">
          {RIBBONS.map((r, idx) => (
            <Link key={r.id} href={r.href} className={"nebula-card arch-pill-" + idx}
              style={{ border:"1.5px solid " + r.border, boxShadow:"0 4px 18px #000b, inset 0 0 18px " + r.border + "38",
                borderRadius:12, padding:"8px 10px", display:"flex", alignItems:"center", gap:7, textDecoration:"none", color:"#fff" }}>
              <RibbonSVG r={r} />
              <span style={{ fontSize:11.5, fontWeight:800, lineHeight:1.2 }}>{es ? r.es : r.name}</span>
            </Link>))}
        </div>
      </div>
      <div className="solar-stage">
        <canvas ref={canvasRef} width={1600} height={1200}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} />
        <div style={{ position:"absolute", left:"50%", top:"49%",
          transform:"translate(-50%,-50%)", width:"23cqw", height:"23cqw", zIndex:30 }}>
          <div style={{ position:"absolute", inset:0, zIndex:3, borderRadius:"50%", overflow:"hidden", border:"2.5px solid #ef4444",
            boxShadow:"0 0 3.2cqw rgba(239,68,68,0.92), 0 0 6cqw rgba(185,28,28,0.5), inset 0 0 2.4cqw #dc2626" }}>
            <svg viewBox="0 0 240 240" style={{ width:"100%", height:"100%", display:"block" }}>
              <rect width="240" height="240" filter="url(#crimsonCore)" />
            </svg>
          </div>
          <div style={{ position:"absolute", top:"15%", left:0, right:0, textAlign:"center", zIndex:8, textShadow:"0 2px 10px #000" }}>
            <div style={{ fontSize:"clamp(8px,0.95cqw,13.5px)", fontWeight:800, color:"#fecaca" }}>Electric Sun</div>
            <div style={{ fontSize:"clamp(15px,2.4cqw,34px)", fontWeight:900, color:"#fff" }}>ALBS NEXUS</div>
            <div style={{ fontSize:"clamp(8px,0.9cqw,12.5px)", fontWeight:800, color:"#e2e8f0" }}>10 Worlds • Mega Stores</div>
          </div>
          <div style={{ position:"absolute", left:"-4%", right:"-4%", top:"51%", height:"38%", zIndex:14,
            background:"linear-gradient(180deg,rgba(14,17,26,0.96),rgba(4,5,9,0.99))", borderRadius:"22% 22% 52% 52% / 26% 26% 74% 74%",
            borderTop:"1.8px solid rgba(226,232,240,0.45)", borderBottom:"1.8px solid rgba(239,68,68,0.75)",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 10px" }}>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search All Malls & Mega Stores..."
              style={{ width:"84%", background:"#0b0f19", border:"1px solid #475569", color:"#fff",
                borderRadius:999, padding:"5px 11px", fontSize:"clamp(8px,0.88cqw,12.5px)" }} />
            <Link href="/nostalgia/concierge" style={{ marginTop:"0.3cqw", color:"#fde047",
              fontSize:"clamp(7px,0.8cqw,11.5px)", fontWeight:800, textDecoration:"none" }}>
              3-Hr AI Concierge (24-Hr Hold) →
            </Link>
          </div>
          <Link href="/stores/emergency-ready" style={{ position:"absolute", top:"91%", left:"50%", transform:"translateX(-50%)",
            zIndex:16, whiteSpace:"nowrap", background:"linear-gradient(90deg,#991b1b,#dc2626,#991b1b)",
            border:"1px solid #fca5a5", borderRadius:999, padding:"2px 10px", color:"#fff",
            fontSize:"clamp(6.5px,0.68cqw,10px)", fontWeight:800, textDecoration:"none" }}>
            🚨 EMERGENCY SUPERSTORE • Flood • Hurricane • Fire →
          </Link>
          {hits.length > 0 ? (<div style={{ position:"absolute", top:"102%", left:"50%", transform:"translateX(-50%)",
            width:250, background:"#090d16", border:"1px solid #38bdf8", borderRadius:10, padding:6, zIndex:60 }}>
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
              <OrbHalo n={n} />
              <div style={{ position:"absolute", inset:0, zIndex:3, borderRadius:"50%", overflow:"hidden",
                background:"#03060f", border:"2px solid rgba(226,232,240,0.86)",
                boxShadow:"0 0 22px " + n.c1 + "aa, inset 0 0 18px #000" }}>
                <img src={n.img} alt="" referrerPolicy="no-referrer"
                  onError={e => { e.currentTarget.src = ORB_FALLBACK; }}
                  style={{ width:"100%", height:"100%", objectFit:"cover",
                    transform:"scale(1.16)", filter:"contrast(1.1) brightness(0.9)", display:"block" }} />
                <div style={{ position:"absolute", inset:0, borderRadius:"50%",
                  background:"radial-gradient(circle at 50% 46%, transparent 38%, rgba(4,8,20,0.5) 70%, rgba(2,4,12,0.95) 100%)" }} />
              </div>
            </div>
            <div style={{ position:"relative", zIndex:4, marginTop:"0.55cqw", whiteSpace:"nowrap", textShadow:"0 2px 8px #000" }}>
              <div style={{ fontSize:"clamp(8.5px,0.96cqw,14px)", fontWeight:900,
                color:n.size>12?"#fef08a":"#fff" }}>{n.title}</div>
              <div style={{ fontSize:"clamp(6.5px,0.75cqw,11px)", fontWeight:600, color:"#cbd5e1" }}>{n.sub}</div>
            </div>
          </Link>))}
      </div>
    </div>);
}
