"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { RIBBONS, NODES, EXTRA_SEARCH, ORB_FALLBACK, RibbonItem, NodeItem } from "./wheel-data";

interface Hit { id: string; title: string; store?: string; href: string; kind?: string; }

function RibbonSVG({ r }: { r: RibbonItem }) {
  const p1 = "M18 4 C10 4 7 11 11 19 ", p2 = "M18 4 C26 4 29 11 25 19 ";
  return (
    <svg viewBox="0 0 36 46" style={{ width:20, height:25, flexShrink:0 }}>
      {r.puzzle ? (<>
        <path d={p1 + "L18 30 L21 25 L16 17 C14 12 15 9 18 9 Z"} fill={r.r1} />
        <path d={p2 + "L18 30 L15 25 L20 17 C22 12 21 9 18 9 Z"} fill={r.r2} />
        <path d="M18 30 L25 43 L30 40 L21 25 Z" fill={r.r3} />
        <path d="M18 30 L11 43 L6 40 L15 25 Z" fill={r.r4} />
      </>) : (<>
        <path d={p1 + "L25 43 L30 40 L16 17 C14 12 15 9 18 9 Z"} fill={r.r1} />
        <path d={p2 + "L11 43 L6 40 L20 17 C22 12 21 9 18 9 Z"} fill={r.r2} />
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
          <feColorMatrix type="matrix"
            values="-4.5 0 0 0 1.55  0 -8.0 0 0 0.12  0 0 -9.0 0 0.08  0 0 0 0 1" in="t" />
        </filter>
      </defs>
    </svg>);
}
function OrbHalo({ n }: { n: NodeItem }) {
  const flt = n.kind === "fire" ? "url(#wispFire)" : "url(#wisp)";
  const dash = n.kind === "fog" ? "44 18 28 14" : n.kind === "fire" ? "26 10 18 8" : "56 16";
  return (
    <svg viewBox="0 0 220 220" style={{ position:"absolute", inset:"-26%", width:"152%",
      height:"152%", zIndex:1, pointerEvents:"none", filter:"drop-shadow(0 0 14px " + n.c1 + ")" }}>
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
  const [prodHits, setProdHits] = useState<Hit[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hotRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("nexus_lang") === "es") setEs(true);
  }, []);
  const toggleLang = () => {
    const nx = !es; setEs(nx);
    if (typeof window !== "undefined") localStorage.setItem("nexus_lang", nx ? "es" : "en");
  };

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) { setProdHits([]); return; }
    const ctrl = new AbortController();
    const tm = setTimeout(() => {
      fetch("/api/search?q=" + encodeURIComponent(term), { signal: ctrl.signal })
        .then(r => r.json())
        .then(d => setProdHits(Array.isArray(d.hits) ? d.hits : []))
        .catch(() => {});
    }, 140);
    return () => { clearTimeout(tm); ctrl.abort(); };
  }, [q]);

  useEffect(() => {
    let anim = 0, last = 0;
    const loop = (t: number) => {
      anim = requestAnimationFrame(loop);
      if (t - last < 58) return;
      last = t;
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, 1600, 1200);
      [[380, 265], [655, 435]].forEach(([rx, ry]) => {
        ctx.beginPath(); ctx.ellipse(800, 560, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(148,163,184,0.13)"; ctx.lineWidth = 1.2;
        ctx.shadowBlur = 0; ctx.stroke();
      });
      [[545, 305, "#f59e0b"], [1055, 305, "#ef4444"]].forEach(([mx, my, col]) => {
        ctx.shadowColor = col as string; ctx.shadowBlur = 18;
        ctx.strokeStyle = col as string; ctx.lineWidth = 2.4;
        drawArc(ctx, 800, 560, mx as number, my as number, 26, 4);
      });
      NODES.forEach(n => {
        const hot = hotRef.current === n.id, r = n.size * 8.1;
        ctx.lineCap = "round"; ctx.shadowColor = n.bolt;
        ctx.shadowBlur = hot ? 28 : 16; ctx.strokeStyle = n.bolt;
        ctx.lineWidth = hot ? 4.6 : 2.8;
        const pts = drawArc(ctx, 800, 560, n.x, n.y, hot ? 50 : 32, 5);
        ctx.shadowBlur = 4; ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.2;
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
  const sPool: Hit[] = [
    ...NODES.map(n => ({ id: n.id, title: es ? n.titleEs : n.title, store: "WORLD", href: n.href, kind: "store" })),
    ...EXTRA_SEARCH.map(x => ({ id: x.id, title: x.title, store: "VAULT", href: x.href, kind: "store" })),
    ...RIBBONS.map(r => ({ id: r.id, title: es ? r.es : r.name, store: "SANCTUARY", href: r.href, kind: "store" }))
  ];
  const sHits = q.trim() ? sPool.filter(n => n.title.toLowerCase().includes(q.trim().toLowerCase())) : [];
  const hits = [...sHits.slice(0, 4), ...prodHits].slice(0, 12);

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
          alignItems:"center", flexWrap:"wrap", gap:10, paddingTop:4, textAlign:"center" }}>
          <span style={{ fontSize:"clamp(11.5px,1.15vw,16px)", fontWeight:900, letterSpacing:"0.09em",
            color:"#fde047", textShadow:"0 2px 12px #000, 0 0 14px rgba(250,204,21,0.55)" }}>
            {es ? "🎗️ SANTUARIOS DE ESPERANZA • EVENTOS, AYUDA Y TIENDAS" : "🎗️ SANCTUARIES OF HOPE • EVENTS, LOCAL HELP & STORES"}
          </span>
          <button onClick={toggleLang} style={{ background:"#facc15", color:"#000",
            fontWeight:900, border:0, borderRadius:999, padding:"5px 14px", fontSize:11.5, cursor:"pointer" }}>
            {es ? "🇺🇸 ENGLISH" : "🇪🇸 ESPAÑOL"}
          </button>
        </div>
        <div className="sanctuary-arch-grid">
          {RIBBONS.map((r, idx) => (
            <Link key={r.id} href={r.href + (es ? "?lang=es" : "")} className={"nebula-card arch-pill-" + idx}
              style={{ border:"1.8px solid " + r.border, boxShadow:"0 4px 18px #000c, inset 0 0 18px " + r.border + "44",
                borderRadius:12, padding:"9px 11px", display:"flex", alignItems:"center", gap:8, textDecoration:"none", color:"#fff" }}>
              <RibbonSVG r={r} />
              <span style={{ fontSize:"clamp(12px,0.98vw,14.5px)", fontWeight:900, lineHeight:1.18,
                color:"#f8fafc", textShadow:"0 2px 6px #000" }}>{es ? r.es : r.name}</span>
            </Link>))}
        </div>
      </div>
      <div className="solar-stage">
        <canvas ref={canvasRef} width={1600} height={1200}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} />

        <Link href="/stores/black-friday" className="meteor-card"
          style={{ left:"34%", top:"25.5%", border:"2.5px solid #facc15",
            boxShadow:"-18px -10px 28px rgba(245,158,11,0.55), 0 0 24px rgba(250,204,21,0.65), inset 0 0 18px rgba(251,191,36,0.35)" }}>
          <div style={{ fontSize:"clamp(8px,0.75cqw,11px)", fontWeight:900, color:"#fde047", letterSpacing:"0.08em" }}>
            ☄️ {es ? "METEORO CYBER" : "CYBER METEOR VAULT"}
          </div>
          <div style={{ fontSize:"clamp(10px,1.05cqw,15.5px)", fontWeight:900, color:"#ffffff", lineHeight:1.15, margin:"3px 0", textShadow:"0 2px 6px #000" }}>
            {es ? "BLACK FRIDAY • CYBER MONDAY" : "BLACK FRIDAY • CYBER MONDAY"}
          </div>
          <div style={{ fontSize:"clamp(7.5px,0.75cqw,11px)", fontWeight:800, color:"#fed7aa" }}>
            {es ? "5 Ofertas + 5 Eventos →" : "5 Doorbusters + 5 Events →"}
          </div>
        </Link>

        <Link href="/stores/emergency-ready" className="meteor-card"
          style={{ left:"66%", top:"25.5%", border:"2.5px solid #ef4444",
            boxShadow:"18px -10px 28px rgba(220,38,38,0.65), 0 0 24px rgba(239,68,68,0.7), inset 0 0 18px rgba(220,38,38,0.4)" }}>
          <div style={{ fontSize:"clamp(8px,0.75cqw,11px)", fontWeight:900, color:"#fca5a5", letterSpacing:"0.08em" }}>
            ☄️ {es ? "IMPACTO Y RESCATE" : "METEOR IMPACT & RESCUE"}
          </div>
          <div style={{ fontSize:"clamp(10px,1.05cqw,15.5px)", fontWeight:900, color:"#ffffff", lineHeight:1.15, margin:"3px 0", textShadow:"0 2px 6px #000" }}>
            {es ? "BÓVEDA DE TORMENTA Y SUPERVIVENCIA" : "STORM & SURVIVAL VAULT"}
          </div>
          <div style={{ fontSize:"clamp(7.5px,0.75cqw,11px)", fontWeight:800, color:"#fde047" }}>
            {es ? "Inundación • Energía • Fuego →" : "Power • Flood • Hurricane →"}
          </div>
        </Link>

        <div style={{ position:"absolute", left:"50%", top:"46.5%",
          transform:"translate(-50%,-50%)", width:"23.5cqw", height:"23.5cqw", zIndex:30 }}>
          <div style={{ position:"absolute", inset:0, zIndex:3, borderRadius:"50%", overflow:"hidden",
            background:"radial-gradient(circle at 50% 38%, #dc2626 0%, #7f1d1d 42%, #090000 78%, #020000 100%)",
            border:"2.8px solid #ef4444",
            boxShadow:"0 0 3.5cqw rgba(239,68,68,0.95), 0 0 6.5cqw rgba(185,28,28,0.6), inset 0 0 2.6cqw #ef4444" }}>
            <svg viewBox="0 0 240 240" style={{ width:"100%", height:"100%", display:"block", opacity:0.82 }}>
              <rect width="240" height="240" fill="#050000" />
              <rect width="240" height="240" filter="url(#crimsonCore)" />
            </svg>
          </div>
          <div style={{ position:"absolute", inset:0, zIndex:14, display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center", padding:"0 6%", textAlign:"center", gap:"0.45cqw" }}>
            <div style={{ textShadow:"0 2px 10px #000" }}>
              <div style={{ fontSize:"clamp(7.5px,0.9cqw,13px)", fontWeight:800, color:"#fde047" }}>{es ? "Sol Eléctrico" : "Electric Sun"}</div>
              <div style={{ fontSize:"clamp(12px,2.2cqw,32px)", fontWeight:900, color:"#fff", lineHeight:1.05, whiteSpace:"nowrap" }}>ALBS NEXUS</div>
              <div style={{ fontSize:"clamp(7px,0.82cqw,12px)", fontWeight:800, color:"#fecaca" }}>{es ? "10 Mundos • Mega Tiendas" : "10 Worlds • Mega Stores"}</div>
            </div>
            <input value={q} onChange={e => setQ(e.target.value)}
              placeholder={es ? "🔍 Buscar producto, SKU o tienda..." : "🔍 Search Any Product, SKU or Store..."}
              style={{ width:"96%", background:"#ffffff", color:"#020617", fontWeight:900, textAlign:"center",
                border:"2.5px solid #facc15", borderRadius:999, padding:"7px 12px",
                fontSize:"clamp(8.5px,0.95cqw,13.5px)",
                boxShadow:"0 0 18px rgba(255,255,255,0.9), 0 4px 14px rgba(0,0,0,0.85)" }} />
            <Link href="/nostalgia/concierge" style={{ background:"rgba(4,7,17,0.92)", border:"1.5px solid #38bdf8",
              borderRadius:999, padding:"3px 11px", color:"#fde047",
              fontSize:"clamp(7px,0.82cqw,12px)", fontWeight:900, textDecoration:"none", whiteSpace:"nowrap",
              boxShadow:"0 2px 10px #000" }}>
              {es ? "✨ Conserje IA 3-Hr (Reserva 24-Hr) →" : "✨ 3-Hr AI Concierge (24-Hr Hold) →"}
            </Link>
          </div>
          {hits.length > 0 ? (<div style={{ position:"absolute", top:"103%", left:"50%", transform:"translateX(-50%)",
            width:"min(360px,90vw)", maxHeight:310, overflowY:"auto", background:"#080d19",
            border:"2px solid #38bdf8", borderRadius:12, padding:6, zIndex:95, boxShadow:"0 12px 32px #000e" }}>
            {hits.map((h, i) => (<Link key={h.id + i} href={h.href + (h.kind === "product" ? "?q=" + encodeURIComponent(h.title) : "")}
              style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:8,
                padding:"6px 8px", borderBottom:"1px solid #1e293b", color:"#fff", textDecoration:"none", fontSize:12 }}>
              <div style={{ overflow:"hidden" }}>
                <div style={{ fontWeight:800, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{h.title}</div>
                <div style={{ fontSize:10, color:"#94a3b8" }}>{h.kind === "product" ? h.id + " • " + h.store : h.store}</div>
              </div>
              <span style={{ color:"#fde047", fontWeight:900, fontSize:11, flexShrink:0 }}>{es ? "Ir →" : "Go →"}</span>
            </Link>))}
          </div>) : null}
        </div>

        {NODES.map(n => (
          <Link key={n.id} href={n.href + (es ? "?lang=es" : "")} className="planet-orb" data-edge={n.edge || "mid"}
            onMouseEnter={() => { hotRef.current = n.id; }} onMouseLeave={() => { hotRef.current = null; }}
            style={{ position:"absolute", left:((n.x/1600)*100)+"%", top:((n.y/1200)*100)+"%",
              transform:"translate(-50%,-50%)", textDecoration:"none", textAlign:"center", zIndex:22 }}>
            <div style={{ position:"relative", width:n.size+"cqw", height:n.size+"cqw", margin:"0 auto" }}>
              <OrbHalo n={n} />
              <div style={{ position:"absolute", inset:0, zIndex:3, borderRadius:"50%", overflow:"hidden",
                background:"#03060f", border:"2.2px solid rgba(248,250,252,0.9)",
                boxShadow:"0 0 22px " + n.c1 + "aa, inset 0 0 18px #000" }}>
                <img src={n.img} alt="" referrerPolicy="no-referrer"
                  onError={e => { e.currentTarget.src = ORB_FALLBACK; }}
                  style={{ width:"100%", height:"100%", objectFit:"cover",
                    transform:"scale(1.14)", filter:"contrast(1.08) brightness(0.92)", display:"block" }} />
                <div style={{ position:"absolute", inset:0, borderRadius:"50%",
                  background:"radial-gradient(circle at 50% 46%, transparent 42%, rgba(4,8,20,0.48) 72%, rgba(2,4,12,0.92) 100%)" }} />
              </div>
            </div>
            <div className="orb-label-box" style={{ position:"relative", zIndex:4, marginTop:"0.5cqw", whiteSpace:"nowrap" }}>
              <div style={{ fontSize:"clamp(8.5px,1.02cqw,15px)", fontWeight:900,
                color:n.size>13?"#fde047":"#ffffff", textShadow:"0 2px 6px #000" }}>{es ? n.titleEs : n.title}</div>
              <div style={{ fontSize:"clamp(6.5px,0.8cqw,12px)", fontWeight:700, color:"#e2e8f0" }}>{es ? n.subEs : n.sub}</div>
            </div>
          </Link>))}
      </div>
    </div>);
}
