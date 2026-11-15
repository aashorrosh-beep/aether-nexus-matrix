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
      <circle cx="18" cy="11.5" r="3.4" fill="#090b12" />
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
        <filter id="magma" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves={5} seed={14} result="t" />
          <feColorMatrix type="matrix" values="2.6 0 0 0 0.35  1.4 0.3 0 0 -0.12  0.2 0 0 0 -0.15  0 0 0 1 0" in="t" />
        </filter>
      </defs>
    </svg>);
}
function OrbHalo({ n }: { n: NodeItem }) {
  const st: React.CSSProperties = {
    position:"absolute", inset:"-30%", width:"160%", height:"160%",
    zIndex:1, pointerEvents:"none"
  };
  if (n.kind === "ringneb") {
    return (
      <svg viewBox="0 0 220 220" style={st}>
        <g transform="rotate(-18 110 110)" filter="url(#wisp)">
          <ellipse cx="110" cy="110" rx="92" ry="74" fill="none" stroke="#dc2626" strokeWidth="15" opacity="0.72" />
          <ellipse cx="110" cy="110" rx="80" ry="64" fill="none" stroke="#fb923c" strokeWidth="12" opacity="0.88" />
          <ellipse cx="110" cy="110" rx="70" ry="56" fill="none" stroke="#fef08a" strokeWidth="7" />
          <ellipse cx="110" cy="110" rx="63" ry="50" fill="#0ea5e9" opacity="0.45" />
        </g>
      </svg>);
  }
  const flt = n.kind === "fire" ? "url(#wispFire)" : "url(#wisp)";
  const dash = n.kind === "fog" ? "44 18 28 14" : n.kind === "fire" ? "26 10 18 8" : "56 16";
  return (
    <svg viewBox="0 0 220 220" style={{ ...st, filter:"drop-shadow(0 0 12px " + n.c1 + ")" }}>
      <g filter={flt}>
        <circle className="gas-cw" cx="110" cy="110" r="82" fill="none"
          stroke={n.c1} strokeWidth={n.kind === "fog" ? 24 : 19} strokeDasharray={dash} opacity="0.85" />
        <circle className="gas-ccw" cx="110" cy="110" r="73" fill="none"
          stroke={n.c2} strokeWidth="12" strokeDasharray="32 14" opacity="0.9" />
        <circle cx="110" cy="110" r="67" fill="none" stroke="#ffffff" strokeWidth="3.5" opacity="0.65" />
      </g>
    </svg>);
}
function PlanetRingHalf({ front }: { front: boolean }) {
  return (
    <div style={{ position:"absolute", left:"-44%", width:"188%", top:"2%", height:"96%",
      transform:"rotate(-14deg)", zIndex:front ? 10 : 1, pointerEvents:"none" }}>
      <svg viewBox={front ? "0 120 440 120" : "0 0 440 120"}
        style={{ position:"absolute", left:0, width:"100%", top:front ? "50%" : "0%",
          height:"50%", overflow:"hidden", filter:"drop-shadow(0 0 10px #f59e0b)" }}>
        <ellipse cx="220" cy="120" rx="208" ry="66" fill="none" stroke="rgba(251,146,60,0.34)" strokeWidth="18" />
        <ellipse cx="220" cy="120" rx="192" ry="60" fill="none" stroke="rgba(253,224,71,0.78)" strokeWidth="6" />
        <ellipse cx="220" cy="120" rx="176" ry="54" fill="none" stroke="rgba(234,88,12,0.65)" strokeWidth="9" />
        <ellipse cx="220" cy="120" rx="162" ry="49" fill="none" stroke="#fffbeb" strokeWidth="2.6" opacity="0.9" />
      </svg>
    </div>);
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
      if (t - last < 58) return;
      last = t;
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, 1600, 1200);
      [[425,335],[640,445]].forEach(([rx, ry]) => {
        ctx.beginPath(); ctx.ellipse(800, 588, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(253,224,71,0.09)"; ctx.lineWidth = 1.2;
        ctx.shadowBlur = 0; ctx.stroke();
      });
      NODES.forEach(n => {
        const hot = hotRef.current === n.id, r = n.size * 8.4;
        ctx.lineCap = "round"; ctx.shadowColor = n.bolt;
        ctx.shadowBlur = hot ? 26 : 14; ctx.strokeStyle = n.bolt;
        ctx.lineWidth = hot ? 4.4 : 2.6;
        const pts = drawArc(ctx, 800, 588, n.x, n.y, hot ? 58 : 38, 5);
        ctx.shadowBlur = 4; ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1.1;
        ctx.beginPath();
        pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
        ctx.stroke();
        if (n.kind === "static") {
          for (let k = 0; k < 3; k++) {
            const a1 = Math.random() * 6.28, a2 = a1 + 0.9;
            ctx.strokeStyle = k === 0 ? "#fde047" : "#7dd3fc"; ctx.lineWidth = 1.8;
            drawArc(ctx, n.x+Math.cos(a1)*r, n.y+Math.sin(a1)*r, n.x+Math.cos(a2)*r, n.y+Math.sin(a2)*r, 18, 3);
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
      <div style={{ position:"relative", zIndex:35, maxWidth:1420,
        margin:"0 auto -18px", padding:"16px 8px 8px" }}>
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none"
          style={{ position:"absolute", left:"-5%", width:"110%", top:0,
            height:"100%", pointerEvents:"none", zIndex:1 }}>
          <ellipse cx="720" cy="1115" rx="2200" ry="1106" fill="none" stroke="rgba(251,191,36,0.3)" strokeWidth="14" />
          <ellipse cx="720" cy="1115" rx="2200" ry="1096" fill="none" stroke="#fde047" strokeWidth="3.5" />
          <ellipse cx="720" cy="1115" rx="2200" ry="1045" fill="none" stroke="rgba(245,158,11,0.16)" strokeWidth="88" />
          <ellipse cx="720" cy="1115" rx="2200" ry="996" fill="none" stroke="rgba(253,224,71,0.65)" strokeWidth="3" />
        </svg>
        <div className="ring-arch-shell">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
            flexWrap:"wrap", gap:8, marginBottom:6, padding:"0 8px" }}>
            <span style={{ fontSize:13, fontWeight:900, letterSpacing:"0.12em",
              color:"#fde047", textShadow:"0 0 14px rgba(250,204,21,0.55)" }}>
              {es ? "🎗️ SANTUARIOS DE ESPERANZA • AYUDA Y TIENDAS" : "🎗️ SANCTUARIES OF HOPE • EVENTS ZIP, LOCAL HELP & STORES"}
            </span>
            <button onClick={() => setEs(!es)} style={{ background:"#facc15", color:"#000",
              fontWeight:900, border:0, borderRadius:999, padding:"4px 13px", fontSize:11, cursor:"pointer" }}>
              {es ? "🇺🇸 ENGLISH" : "🇪🇸 ESPAÑOL"}
            </button>
          </div>
          <div className="sanctuary-arch-grid">
            {RIBBONS.map((r, idx) => (
              <Link key={r.id} href={r.href} className={"arch-pill-" + idx}
                style={{ background:"rgba(10,14,26,0.92)", border:"1.5px solid " + r.border,
                  boxShadow:"0 0 14px " + r.border + "33", borderRadius:12, padding:"7px 9px",
                  display:"flex", alignItems:"center", gap:7, textDecoration:"none", color:"#fff" }}>
                <RibbonSVG r={r} />
                <span style={{ fontSize:11.5, fontWeight:800, lineHeight:1.2 }}>{es ? r.es : r.name}</span>
              </Link>))}
          </div>
        </div>
      </div>
      <div className="solar-stage">
        <canvas ref={canvasRef} width={1600} height={1200}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} />
        <div style={{ position:"absolute", left:"50%", top:"49%",
          transform:"translate(-50%,-50%)", width:"24cqw", height:"24cqw", zIndex:30 }}>
          <PlanetRingHalf front={false} />
          <div style={{ position:"absolute", inset:0, zIndex:3, borderRadius:"50%", overflow:"hidden",
            border:"2px solid rgba(254,240,138,0.85)",
            boxShadow:"0 0 3.4cqw rgba(249,115,22,0.95), 0 0 6cqw rgba(220,38,38,0.55), inset 0 0 2.5cqw #fffbeb" }}>
            <svg viewBox="0 0 240 240" style={{ width:"100%", height:"100%", display:"block" }}>
              <rect width="240" height="240" filter="url(#magma)" />
            </svg>
            <div style={{ position:"absolute", inset:0, borderRadius:"50%",
              background:"radial-gradient(circle at 36% 28%, rgba(254,249,195,0.42) 0%, transparent 45%, rgba(15,4,2,0.68) 100%)" }} />
          </div>
          <div style={{ position:"absolute", top:"15%", left:0, right:0, textAlign:"center",
            zIndex:8, textShadow:"0 2px 10px rgba(0,0,0,0.95)" }}>
            <div style={{ fontSize:"clamp(8.5px,1cqw,14px)", fontWeight:800, color:"#fef08a" }}>Electric Sun</div>
            <div style={{ fontSize:"clamp(15px,2.45cqw,34px)", fontWeight:900, color:"#fff" }}>ALBS NEXUS</div>
            <div style={{ fontSize:"clamp(8px,0.95cqw,13px)", fontWeight:800, color:"#fed7aa" }}>10 Worlds • Mega Stores</div>
          </div>
          <PlanetRingHalf front={true} />
          <div style={{ position:"absolute", left:"-2%", right:"-2%", top:"54%", height:"38%", zIndex:14,
            background:"linear-gradient(180deg,rgba(14,17,26,0.95),rgba(4,5,9,0.99))",
            borderRadius:"22% 22% 52% 52% / 26% 26% 74% 74%",
            borderTop:"2px solid rgba(253,224,71,0.65)", borderBottom:"2px solid rgba(249,115,22,0.75)",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 10px" }}>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search All Malls & Mega Stores..."
              style={{ width:"84%", background:"#0b0f19", border:"1px solid #475569", color:"#fff",
                borderRadius:999, padding:"5px 11px", fontSize:"clamp(8px,0.9cqw,13px)" }} />
            <Link href="/nostalgia/concierge" style={{ marginTop:"0.32cqw", color:"#fde047",
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
              <OrbHalo n={n} />
              <div style={{ position:"absolute", inset:0, zIndex:3, borderRadius:"50%", overflow:"hidden",
                background:"#060b18", border:"2px solid rgba(255,255,255,0.88)",
                boxShadow:"0 0 22px " + n.c1 + "aa, inset 0 0 14px rgba(0,0,0,0.5)" }}>
                <img src={n.img} alt="" referrerPolicy="no-referrer"
                  onError={e => { e.currentTarget.src = ORB_FALLBACK; }}
                  style={{ width:"100%", height:"100%", objectFit:"cover", transform:"scale(1.12)", display:"block" }} />
                <div style={{ position:"absolute", inset:0, borderRadius:"50%",
                  background:"radial-gradient(circle at 30% 24%, rgba(255,255,255,0.26) 0%, transparent 44%, rgba(2,6,23,0.42) 100%)" }} />
              </div>
            </div>
            <div style={{ position:"relative", zIndex:4, marginTop:"0.6cqw", whiteSpace:"nowrap", textShadow:"0 2px 8px #000" }}>
              <div style={{ fontSize:"clamp(8.5px,0.96cqw,14px)", fontWeight:900,
                color:n.size>12?"#fef08a":"#fff" }}>{n.title}</div>
              <div style={{ fontSize:"clamp(6.5px,0.75cqw,11px)", fontWeight:600, color:"#e2e8f0" }}>{n.sub}</div>
            </div>
          </Link>))}
      </div>
    </div>);
}
