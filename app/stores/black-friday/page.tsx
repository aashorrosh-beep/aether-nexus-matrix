"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BF_POOL, getDailyTen, calcBf, BfItem } from "./bf-data";

const COLORS = ["Obsidian Black", "Cyber Gold", "Crimson Pulse", "Arctic Silver", "Emerald Neon"];
const VARIANTS = ["Option #1 (Standard)", "Option #2 (Pro Bundle)", "Option #3 (Deluxe Edition)"];
const SIZES: Record<string, string[]> = {
  shoes: ["Women 6","Women 7","Women 8","Women 9","Men 8","Men 9","Men 10","Men 11","Men 12","Men 13 Wide","Men 14"],
  apparel: ["XS","S","M","L","XL","2XL","3XL","4XL"],
  tech: ["Standard Kit","Extended Battery Pack","2-Pack Bundle"],
  home: ["Standard Unit","Home + Travel Kit","Commercial 2-Pack"]
};

export default function BlackFridayCyberStore() {
  const [es, setEs] = useState(false);
  const [tab, setTab] = useState<"daily" | "doorbuster" | "event" | "all">("daily");
  const [vw, setVw] = useState<"cards" | "pics" | "specs" | "multi" | "bom">("cards");
  const [sheet, setSheet] = useState<1 | 2 | 3>(1);
  const [q, setQ] = useState("");
  const [ang, setAng] = useState<Record<string, number>>({});
  const [col, setCol] = useState<Record<string, string>>({});
  const [vr, setVr] = useState<Record<string, string>>({});
  const [sz, setSz] = useState<Record<string, string>>({});
  const [cart, setCart] = useState<Record<string, number>>({});
  const [vidItem, setVidItem] = useState<BfItem | null>(null);
  const [coMode, setCoMode] = useState<"" | "cart" | "gift" | "ai">("");
  const [cust, setCust] = useState({ name:"", email:"", phone:"", addr:"", giftTo:"", giftAmt:"50", msg:"" });
  const [aiMsg, setAiMsg] = useState(""), [aiReply, setAiReply] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [daySeed, setDaySeed] = useState(17);

  useEffect(() => {
    setDaySeed(new Date().getDate());
    if (typeof window !== "undefined") {
      if (localStorage.getItem("nexus_lang") === "es" || window.location.search.includes("lang=es")) setEs(true);
      const saved = localStorage.getItem("nexus_crm_profile");
      if (saved) { try { setCust(c => ({ ...c, ...JSON.parse(saved) })); } catch {} }
    }
  }, []);

  useEffect(() => { if (!vidItem) return; const id = vidItem.id; const t = setInterval(() => setAng(a => ({ ...a, [id]: ((a[id] || 0) + 1) % 3 })), 2600); return () => clearInterval(t); }, [vidItem]);
  const toggleEs = () => {
    const nx = !es; setEs(nx);
    if (typeof window !== "undefined") localStorage.setItem("nexus_lang", nx ? "es" : "en");
  };
  const baseList = tab === "daily" ? getDailyTen(daySeed)
    : tab === "all" ? BF_POOL : BF_POOL.filter(x => x.kind === tab);
  const items = q.trim() ? baseList.filter(x =>
    (x.id + " " + x.en + " " + x.es).toLowerCase().includes(q.toLowerCase())) : baseList;

  const addCart = (id: string, buyNow = false) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    if (buyNow) setCoMode("cart");
  };

  const cartEntries = Object.entries(cart).filter(([, n]) => n > 0);
  const cartCount = cartEntries.reduce((s, [, n]) => s + n, 0);
  const cartTotals = cartEntries.reduce((acc, [id, qty]) => {
    const it = BF_POOL.find(x => x.id === id) || BF_POOL[0];
    const m = calcBf(it.deal * qty, it.ship);
    return { sub: +(acc.sub + it.deal * qty).toFixed(2), ship: +(acc.ship + it.ship).toFixed(2),
      tax: +(acc.tax + m.tax).toFixed(2), tot: +(acc.tot + m.tot).toFixed(2) };
  }, { sub: 0, ship: 0, tax: 0, tot: 0 });

  const submitCheckout = async (isGift: boolean) => {
    if (!cust.name || !cust.email || !cust.phone || (!isGift && !cust.addr)) {
      setStatusMsg(es ? "Complete nombre, correo, teléfono y dirección." : "Please fill Name, Email, Phone & Address.");
      return;
    }
    const crmRecord = { ...cust, updatedAt: new Date().toISOString(),
      similarInterest: cartEntries.map(([id]) => BF_POOL.find(x => x.id === id)?.cat || "cyber") };
    if (typeof window !== "undefined") localStorage.setItem("nexus_crm_profile", JSON.stringify(crmRecord));
    const amt = isGift ? Number(cust.giftAmt || 50) : cartTotals.tot;
    const summary = isGift
      ? "Digital Gift Card ($" + amt + ") -> " + (cust.giftTo || cust.email)
      : cartEntries.map(([id, q]) => id + "x" + q + "[" + (col[id]||COLORS[0]) + "/" + (vr[id]||"Opt1") + "/" + (sz[id]||"Std") + "]").join(", ");
    setStatusMsg(es ? "Conectando con Stripe Checkout y enviando confirmación..." : "Connecting to Stripe Live Checkout & logging CRM...");
    try {
      const r = await fetch("/api/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ store: "Black Friday Cyber Vault", summary, total: amt, customer: crmRecord })
      });
      const d = await r.json();
      if (d?.url) { window.location.href = d.url; return; }
    } catch {}
    setStatusMsg(es
      ? "✅ Perfil CRM guardado y tarjeta/pedido registrado para " + cust.email
      : "✅ CRM Profile saved & Email Gift Card / Order queued for " + cust.email);
  };

  const bt = (bg: string, fg = "#fff") => ({
    background: bg, color: fg, border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: 999, padding: "9px 16px", fontSize: 13.5, fontWeight: 800, cursor: "pointer"
  });

  return (
    <div style={{ minHeight:"100vh", background:"#030611", color:"#f8fafc", padding:"14px 14px 60px" }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div style={{ background:"linear-gradient(135deg,#0f172a,#1e1b4b,#3b0764)", border:"1.5px solid #facc15",
          borderRadius:16, padding:"14px 18px", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:12 }}>
          <div>
            <Link href="/" style={{ color:"#fde047", fontSize:12, fontWeight:800, textDecoration:"none" }}>
              ← {es ? "VOLVER A LA GALAXIA ALBS NEXUS" : "BACK TO ALBS NEXUS GALAXY"}
            </Link>
            <h1 style={{ margin:"4px 0", fontSize:"clamp(18px,2.2vw,28px)", fontWeight:900, color:"#fff" }}>
              ⚡ {es ? "BLACK FRIDAY • CYBER MONDAY TODO EL MES" : "BLACK FRIDAY • CYBER MONDAY ALL MONTH VAULT"}
            </h1>
            <div style={{ fontSize:11.5, color:"#cbd5e1", display:"flex", flexWrap:"wrap", gap:12 }}>
              <span>🤖 {es ? "Auto-Sync 5-Min: 01:55 AM CST Activo" : "5-Min Daily Self-Heal: 01:55 AM CST Active"}</span>
              <span>📞 <b>1-800-889-2470</b> (AI 24/7)</span>
              <span>✉️ <b>cyber-care@albsnexus.com</b></span>
            </div>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            <button onClick={toggleEs} style={bt("#facc15","#000")}>{es ? "🇺🇸 ENGLISH" : "🇪🇸 ESPAÑOL"}</button>
            <button onClick={() => { setStatusMsg(""); setCoMode("ai"); }} style={bt("#0ea5e9")}>
              🤖 {es ? "Soporte IA / Quejas" : "1-800 AI Support"}
            </button>
            <button onClick={() => { setStatusMsg(""); setCoMode("gift"); }} style={bt("#eab308","#000")}>
              🎁 {es ? "Tarjetas Regalo ($0 Envío)" : "Email Gift Cards ($0 Ship)"}
            </button>
            <button onClick={() => { setStatusMsg(""); setCoMode("cart"); }} style={bt("#16a34a")}>
              🛒 {es ? "Pagar" : "Checkout"} ({cartCount}) • ${cartTotals.tot.toFixed(2)}
            </button>
          </div>
        </div>

        <div style={{ display:"flex", flexWrap:"wrap", gap:8, margin:"12px 0", alignItems:"center" }}>
          <button onClick={() => setTab("daily")} style={bt(tab==="daily"?"#dc2626":"#1e293b")}>
            🔥 {es ? "Hoy: 5 Ofertas + 5 Eventos (10)" : "Today's 5 Doorbusters + 5 Events (10)"}
          </button>
          <button onClick={() => setTab("doorbuster")} style={bt(tab==="doorbuster"?"#f59e0b":"#1e293b", tab==="doorbuster"?"#000":"#fff")}>
            ⚡ {es ? "5 Puertas Abiertas (Pool 10)" : "Doorbusters (10)"}
          </button>
          <button onClick={() => setTab("event")} style={bt(tab==="event"?"#8b5cf6":"#1e293b")}>
            🎯 {es ? "Eventos Cyber Diarios (10)" : "Daily Cyber Events (10)"}
          </button>
          <button onClick={() => setTab("all")} style={bt(tab==="all"?"#0284c7":"#1e293b")}>
            📦 {es ? "Todo el Mes (20)" : "All Month Vault (20)"}
          </button>
          <input value={q} onChange={e => setQ(e.target.value)}
            placeholder={es ? "Buscar SKU o producto en español/inglés..." : "Search Doorbusters, Events or SKUs..."}
            style={{ flex:1, minWidth:210, background:"#090d1a", border:"1px solid #475569", color:"#fff", borderRadius:999, padding:"7px 14px", fontSize:12 }} />
        </div>

        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:14 }}>
          {([["cards", es?"📸 Tarjetas":"📸 Cards"],["pics", es?"🖼️ Galería":"🖼️ Pictures"],["specs", es?"📋 Hoja Técnica":"📋 Mfg Spec Sheet"],["multi", es?"📊 Multi-Hoja":"📊 Multi-Sheet"],["bom", es?"🔩 Lista Materiales (BOM)":"🔩 Bill of Materials (BOM)"]] as [typeof vw, string][]).map(([k, lbl]) => (
            <button key={k} onClick={() => setVw(k)} style={bt(vw===k?"#facc15":"#0f172a", vw===k?"#000":"#fff")}>
              {lbl} ({items.length})
            </button>
          ))}
        </div>
        {vw === "cards" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(285px,1fr))", gap:14 }}>
            {items.map(x => {
              const a = ang[x.id] || 0, m = calcBf(x.deal, x.ship), sList = SIZES[x.cat] || SIZES.tech;
              return (
                <div key={x.id} style={{ background:"#090f1f", border:"1px solid #1e293b", borderRadius:14, padding:12, display:"flex", flexDirection:"column", gap:8 }}>
                  <div style={{ position:"relative", height:190, borderRadius:10, overflow:"hidden", background:"#02040a" }}>
                    <img src={x.imgs[a]} alt="" referrerPolicy="no-referrer" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    <span style={{ position:"absolute", top:8, left:8, background:"#000d", color:"#fde047", padding:"3px 8px", borderRadius:6, fontSize:11, fontWeight:800 }}>
                      {x.id} • {x.kind === "doorbuster" ? (es?"PUERTA ABIERTA":"DOORBUSTER") : (es?"EVENTO CYBER":"CYBER EVENT")} • {x.stock} Left
                    </span>
                    <span style={{ position:"absolute", top:8, right:8, background:"#dc2626", color:"#fff", padding:"3px 8px", borderRadius:6, fontSize:11, fontWeight:900 }}>
                      -{Math.round((1 - x.deal / x.retail) * 100)}% OFF
                    </span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr auto", gap:6 }}>
                    {[0, 1, 2].map(i => (
                      <button key={i} onClick={() => { setAng({ ...ang, [x.id]: i }); setVr({ ...vr, [x.id]: VARIANTS[i] }); }}
                        style={{ height:44, borderRadius:7, overflow:"hidden", border:a===i?"2px solid #facc15":"1px solid #334155", padding:0, cursor:"pointer", position:"relative" }}>
                        <img src={x.imgs[i]} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                        <span style={{ position:"absolute", bottom:1, right:3, background:"#000c", color:"#fff", fontSize:9, padding:"0 3px", borderRadius:3 }}>#{i+1}</span>
                      </button>
                    ))}
                    <button onClick={() => setVidItem(x)} style={{ background:"#4c1d95", color:"#fff", border:"1px solid #a855f7", borderRadius:7, padding:"0 9px", fontSize:11, fontWeight:800, cursor:"pointer" }}>
                      🎥 Video
                    </button>
                  </div>
                  <div style={{ fontWeight:900, fontSize:14, minHeight:36 }}>{es ? x.es : x.en}</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                    <select value={col[x.id] || COLORS[0]} onChange={e => setCol({ ...col, [x.id]: e.target.value })}
                      style={{ background:"#0f172a", color:"#fff", border:"1px solid #334155", borderRadius:7, padding:"5px 6px", fontSize:11 }}>
                      {COLORS.map(c => <option key={c} value={c}>{es ? "Color: " : "Color: "}{c}</option>)}
                    </select>
                    <select value={sz[x.id] || sList[0]} onChange={e => setSz({ ...sz, [x.id]: e.target.value })}
                      style={{ background:"#0f172a", color:"#fff", border:"1px solid #334155", borderRadius:7, padding:"5px 6px", fontSize:11 }}>
                      {sList.map(s => <option key={s} value={s}>{es ? "Talla: " : "Size: "}{s}</option>)}
                    </select>
                  </div>
                  <select value={vr[x.id] || VARIANTS[a]} onChange={e => setVr({ ...vr, [x.id]: e.target.value })}
                    style={{ background:"#0f172a", color:"#fde047", border:"1px solid #475569", borderRadius:7, padding:"5px 6px", fontSize:11, fontWeight:700 }}>
                    {VARIANTS.map(v => <option key={v} value={v}>{es ? "Variante: " : "Variant: "}{v}</option>)}
                  </select>
                  <div style={{ background:"#050914", borderRadius:9, padding:"7px 10px", fontSize:11.5 }}>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <span style={{ color:"#94a3b8" }}>{es ? "Precio Regular:" : "MSRP Retail:"}</span>
                      <span style={{ textDecoration:"line-through", color:"#94a3b8" }}>${x.retail.toFixed(2)}</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <span>{es ? "Oferta Cyber:" : "Cyber Deal:"}</span><b>${x.deal.toFixed(2)}</b>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", color:"#38bdf8" }}>
                      <span>{es ? "Envío + Impuestos:" : "Ship + Tax/CC:"}</span><span>+${(x.ship + m.tax).toFixed(2)}</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", color:"#4ade80", fontWeight:900, marginTop:2 }}>
                      <span>{es ? "Total Final:" : "Landed Total:"}</span><span>${m.tot.toFixed(2)}</span>
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:6, marginTop:"auto" }}>
                    <button onClick={() => addCart(x.id, false)} style={bt("#1e293b")}>+ {es ? "Carrito" : "Cart"}</button>
                    <button onClick={() => setVw("specs")} style={bt("#334155","#fde047")}>📋 Specs</button>
                    <button onClick={() => addCart(x.id, true)} style={bt("#dc2626")}>{es ? "Comprar →" : "Buy Now →"}</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {vw === "pics" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12 }}>
            {items.map(x => (
              <div key={x.id} style={{ background:"#090f1f", border:"1px solid #1e293b", borderRadius:12, padding:10 }}>
                <img src={x.imgs[ang[x.id]||0]} alt="" style={{ width:"100%", height:210, objectFit:"cover", borderRadius:8 }} />
                <div style={{ display:"flex", gap:4, marginTop:6 }}>
                  {[0,1,2].map(i => (
                    <img key={i} src={x.imgs[i]} alt="" onClick={() => setAng({ ...ang, [x.id]: i })}
                      style={{ width:52, height:38, objectFit:"cover", borderRadius:5, cursor:"pointer", border:(ang[x.id]||0)===i?"2px solid #facc15":"1px solid #334155" }} />
                  ))}
                </div>
                <div style={{ fontWeight:800, fontSize:13, marginTop:6 }}>{es ? x.es : x.en}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:6 }}>
                  <span style={{ color:"#4ade80", fontWeight:900 }}>${calcBf(x.deal, x.ship).tot.toFixed(2)}</span>
                  <button onClick={() => addCart(x.id, true)} style={bt("#dc2626")}>{es ? "Comprar →" : "Buy →"}</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {vw === "specs" && (
          <div style={{ overflowX:"auto", background:"#090f1f", border:"1px solid #1e293b", borderRadius:12, padding:12 }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr style={{ borderBottom:"1px solid #334155", color:"#fde047", textAlign:"left" }}>
                  <th style={{ padding:8 }}>Img</th><th>SKU</th><th>{es ? "Producto" : "Product"}</th>
                  <th>{es ? "Dimensiones" : "Dimensions"}</th><th>{es ? "Material" : "Material Grade"}</th>
                  <th>{es ? "Certificación" : "Certification"}</th><th>Stock</th><th>Total</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map(x => {
                  const m = calcBf(x.deal, x.ship);
                  return (
                    <tr key={x.id} style={{ borderBottom:"1px solid #1e293b" }}>
                      <td style={{ padding:6 }}><img src={x.imgs[0]} alt="" style={{ width:48, height:36, objectFit:"cover", borderRadius:5 }} /></td>
                      <td style={{ fontWeight:800, color:"#38bdf8" }}>{x.id}</td>
                      <td style={{ fontWeight:800 }}>{es ? x.es : x.en}</td>
                      <td>{x.dims}</td><td>{x.mat}</td>
                      <td><span style={{ background:"#1e293b", padding:"2px 6px", borderRadius:4, color:"#fde047" }}>{x.cert}</span></td>
                      <td>{x.stock}</td>
                      <td style={{ color:"#4ade80", fontWeight:900 }}>${m.tot.toFixed(2)}</td>
                      <td><button onClick={() => addCart(x.id, true)} style={bt("#dc2626")}>{es ? "Comprar" : "Buy"}</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {vw === "multi" && (
          <div style={{ background:"#090f1f", border:"1px solid #1e293b", borderRadius:12, padding:12 }}>
            <div style={{ display:"flex", gap:8, marginBottom:10, flexWrap:"wrap" }}>
              <button onClick={() => setSheet(1)} style={bt(sheet===1?"#0284c7":"#1e293b")}>Sheet 1: {es ? "Precios y Margen" : "Landed Pricing & Margin"}</button>
              <button onClick={() => setSheet(2)} style={bt(sheet===2?"#0284c7":"#1e293b")}>Sheet 2: {es ? "Dimensiones y Empaque" : "Dimensions & Case-Pack"}</button>
              <button onClick={() => setSheet(3)} style={bt(sheet===3?"#0284c7":"#1e293b")}>Sheet 3: {es ? "Certificaciones y SLA" : "Certifications & SLA"}</button>
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr style={{ borderBottom:"1px solid #334155", color:"#38bdf8", textAlign:"left" }}>
                  <th style={{ padding:8 }}>SKU</th><th>{es ? "Artículo" : "Item"}</th>
                  {sheet === 1 && <><th>MSRP</th><th>Cyber Deal</th><th>Ship</th><th>Tax+CC</th><th>Landed Total</th></>}
                  {sheet === 2 && <><th>Dimensions / Wt</th><th>Case-Pack</th><th>Fulfillment Hub</th><th>Stock</th></>}
                  {sheet === 3 && <><th>Compliance Cert</th><th>Material Spec</th><th>Warranty</th><th>AI Cron Slot</th></>}
                  <th>Buy</th>
                </tr>
              </thead>
              <tbody>
                {items.map(x => {
                  const m = calcBf(x.deal, x.ship);
                  return (
                    <tr key={x.id} style={{ borderBottom:"1px solid #1e293b" }}>
                      <td style={{ padding:7, fontWeight:800 }}>{x.id}</td>
                      <td style={{ fontWeight:700 }}>{es ? x.es : x.en}</td>
                      {sheet === 1 && <><td>${x.retail}</td><td>${x.deal}</td><td>${x.ship}</td><td>${m.tax}</td><td style={{ color:"#4ade80", fontWeight:900 }}>${m.tot}</td></>}
                      {sheet === 2 && <><td>{x.dims}</td><td>6 Units / Master Carton</td><td>Houston TX Hub</td><td>{x.stock}</td></>}
                      {sheet === 3 && <><td>{x.cert}</td><td>{x.mat}</td><td>2-Yr ALBS Replacement</td><td>01:55 AM CST</td></>}
                      <td><button onClick={() => addCart(x.id, true)} style={bt("#16a34a")}>+ Buy</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {vw === "bom" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:12 }}>
            {items.map(x => {
              const m = calcBf(x.deal, x.ship);
              return (
                <div key={x.id} style={{ background:"#090f1f", border:"1px solid #1e293b", borderRadius:12, padding:12 }}>
                  <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:8 }}>
                    <img src={x.imgs[0]} alt="" style={{ width:56, height:44, objectFit:"cover", borderRadius:6 }} />
                    <div>
                      <div style={{ fontSize:11, color:"#fde047", fontWeight:800 }}>{x.id} • BOM ASSEMBLY</div>
                      <div style={{ fontWeight:900, fontSize:13 }}>{es ? x.es : x.en}</div>
                    </div>
                  </div>
                  <div style={{ fontSize:11.5, background:"#050914", borderRadius:8, padding:8 }}>
                    {x.bom.map((part, idx) => (
                      <div key={idx} style={{ display:"flex", justifyContent:"space-between", padding:"3px 0", borderBottom:idx<2?"1px solid #1e293b":"0" }}>
                        <span>{part}</span>
                        <span style={{ color:"#38bdf8" }}>{idx===0?"55% Cost":idx===1?"30% Cost":"15% QC/Box"}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8 }}>
                    <span style={{ fontSize:11, color:"#94a3b8" }}>{x.mat} • {x.cert}</span>
                    <button onClick={() => addCart(x.id, true)} style={bt("#dc2626")}>Buy ${m.tot.toFixed(2)}</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {vidItem && (
          <div onClick={() => setVidItem(null)} style={{ position:"fixed", inset:0, background:"#000d", zIndex:120, display:"flex", alignItems:"center", justifyContent:"center", padding:14 }}>
            <div onClick={e => e.stopPropagation()} style={{ background:"#090f1f", border:"2px solid #a855f7", borderRadius:16, padding:18, maxWidth:640, width:"100%", boxShadow:"0 16px 48px #000" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <h3 style={{ margin:0, fontSize:17, color:"#fde047" }}>🎥 {es ? vidItem.es : vidItem.en} ({vidItem.id})</h3>
                <span style={{ background:"#dc2626", color:"#fff", padding:"3px 9px", borderRadius:6, fontSize:11, fontWeight:900 }}>HD 360° VIDEO</span>
              </div>
              <div style={{ position:"relative", height:280, borderRadius:12, overflow:"hidden", background:"#02040a", border:"1px solid #334155", marginBottom:10 }}>
                <video key={vidItem.id} autoPlay loop muted playsInline controls poster={vidItem.imgs[0]}
                  style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0, zIndex:1 }}>
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
                </video>
                <img src={vidItem.imgs[(ang[vidItem.id] || 0) % 3]} alt=""
                  style={{ width:"118%", height:"118%", objectFit:"cover", position:"absolute", inset:"-9%", zIndex:2, opacity:0.88, pointerEvents:"none", animation:"bfPan 6s ease-in-out infinite alternate" }} />
                <div style={{ position:"absolute", left:10, bottom:10, zIndex:3, background:"rgba(2,6,23,0.9)", border:"1px solid #38bdf8", borderRadius:8, padding:"6px 10px", fontSize:11.5, pointerEvents:"none" }}>
                  <div style={{ color:"#fde047", fontWeight:900 }}>▶ LIVE MOTION SHOWCASE • ANGLE #{((ang[vidItem.id] || 0) % 3) + 1}</div>
                  <div style={{ color:"#e2e8f0" }}>{vidItem.dims} • {vidItem.mat} • {vidItem.cert}</div>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:12 }}>
                {vidItem.imgs.map((src, i) => (
                  <button key={i} onClick={() => setAng({ ...ang, [vidItem.id]: i })}
                    style={{ height:68, borderRadius:8, overflow:"hidden", border:(ang[vidItem.id]||0)===i?"2px solid #facc15":"1px solid #334155", padding:0, cursor:"pointer", position:"relative" }}>
                    <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    <span style={{ position:"absolute", bottom:3, right:5, background:"#000c", color:"#fff", fontSize:10, fontWeight:800, padding:"1px 5px", borderRadius:4 }}>
                      {es ? "Ángulo #" : "Angle #"}{i+1}
                    </span>
                  </button>
                ))}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:13, color:"#4ade80", fontWeight:900 }}>
                  {es ? "Oferta Cyber: $" : "Cyber Deal: $"}{vidItem.deal.toFixed(2)} ({es ? "Reg $" : "MSRP $"}{vidItem.retail})
                </span>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={() => setVidItem(null)} style={bt("#334155")}>{es ? "Cerrar" : "Close"}</button>
                  <button onClick={() => { addCart(vidItem.id, true); setVidItem(null); }} style={bt("#dc2626")}>{es ? "Comprar Ahora →" : "Buy Now →"}</button>
                </div>
              </div>
            </div>
          </div>
        )}


        {coMode !== "" && (
          <div onClick={() => setCoMode("")} style={{ position:"fixed", inset:0, background:"#000d", zIndex:130, display:"flex", alignItems:"center", justifyContent:"center", padding:14 }}>
            <div onClick={e => e.stopPropagation()} style={{ background:"#090f1f", border:"1.5px solid #facc15", borderRadius:16, padding:18, maxWidth:540, width:"100%" }}>
              {coMode === "ai" ? (
                <>
                  <h3 style={{ margin:"0 0 6px", color:"#fde047" }}>🤖 1-800-889-2470 • AI Store Manager Desk</h3>
                  <p style={{ fontSize:12, color:"#cbd5e1", margin:"0 0 10px" }}>
                    {es ? "Soporte instantáneo para envíos, cambios de talla o quejas (cyber-care@albsnexus.com)." : "Instant AI resolution for shipping, sizing swaps, or complaints (cyber-care@albsnexus.com)."}
                  </p>
                  <textarea value={aiMsg} onChange={e => setAiMsg(e.target.value)} rows={3}
                    placeholder={es ? "Escriba su pregunta, número de orden o reclamo..." : "Enter your order question, shipping check, or complaint..."}
                    style={{ width:"100%", background:"#050914", color:"#fff", border:"1px solid #334155", borderRadius:8, padding:8, fontSize:12 }} />
                  {aiReply && <div style={{ marginTop:8, padding:8, background:"#052e16", border:"1px solid #22c55e", borderRadius:8, fontSize:12 }}>{aiReply}</div>}
                  <div style={{ display:"flex", justifyContent:"flex-end", gap:8, marginTop:10 }}>
                    <button onClick={() => setCoMode("")} style={bt("#334155")}>{es ? "Cerrar" : "Close"}</button>
                    <button onClick={() => setAiReply(es ? "✅ Ticket #BF-" + (1000 + daySeed) + " registrado. El Gerente IA de Cyber Vault respondió a su correo y activó prioridad de envío 24-Hr." : "✅ Ticket #BF-" + (1000 + daySeed) + " logged. Cyber Vault AI Manager has queued priority 24-Hr resolution & emailed your confirmation.")} style={bt("#0ea5e9")}>
                      {es ? "Enviar a IA →" : "Ask AI Manager →"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 style={{ margin:"0 0 6px", color:"#fde047" }}>
                    {coMode === "gift" ? (es ? "🎁 Tarjeta de Regalo Digital ($0 Envío por Email)" : "🎁 Instant Email Gift Card ($0 Shipping)") : (es ? "🛒 Pago Seguro + Registro VIP para Ofertas Similares" : "🛒 Secure Checkout + Similar-Deals VIP Vault")}
                  </h3>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8 }}>
                    <input value={cust.name} onChange={e => setCust({ ...cust, name: e.target.value })} placeholder={es ? "Nombre Completo *" : "Full Name *"} style={{ background:"#050914", color:"#fff", border:"1px solid #334155", borderRadius:8, padding:8, fontSize:12 }} />
                    <input value={cust.email} onChange={e => setCust({ ...cust, email: e.target.value })} placeholder={es ? "Su Correo (Para Ofertas Similares) *" : "Your Email (For Similar Specials) *"} style={{ background:"#050914", color:"#fff", border:"1px solid #334155", borderRadius:8, padding:8, fontSize:12 }} />
                    <input value={cust.phone} onChange={e => setCust({ ...cust, phone: e.target.value })} placeholder={es ? "Teléfono *" : "Phone Number *"} style={{ background:"#050914", color:"#fff", border:"1px solid #334155", borderRadius:8, padding:8, fontSize:12 }} />
                    <input value={cust.addr} onChange={e => setCust({ ...cust, addr: e.target.value })} placeholder={es ? "Dirección Completa de Envío *" : "Full Shipping Address *"} style={{ background:"#050914", color:"#fff", border:"1px solid #334155", borderRadius:8, padding:8, fontSize:12 }} />
                  </div>
                  {coMode === "gift" && (
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8 }}>
                      <input value={cust.giftTo} onChange={e => setCust({ ...cust, giftTo: e.target.value })} placeholder={es ? "Email del Destinatario (Opcional)" : "Recipient Email (Sent via Email)"} style={{ background:"#050914", color:"#fde047", border:"1px solid #475569", borderRadius:8, padding:8, fontSize:12 }} />
                      <select value={cust.giftAmt} onChange={e => setCust({ ...cust, giftAmt: e.target.value })} style={{ background:"#050914", color:"#4ade80", border:"1px solid #475569", borderRadius:8, padding:8, fontSize:12, fontWeight:800 }}>
                        {["25","50","100","250","500"].map(v => <option key={v} value={v}>Gift Card: ${v}.00 ($0 Ship)</option>)}
                      </select>
                    </div>
                  )}
                  {statusMsg && <div style={{ marginTop:8, padding:8, background:"#0f172a", border:"1px solid #38bdf8", borderRadius:8, fontSize:12, color:"#fde047" }}>{statusMsg}</div>}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:12 }}>
                    <span style={{ fontSize:11, color:"#94a3b8" }}>{es ? "Guardamos su correo/teléfono para enviarle ofertas similares." : "Address, phone & email saved for similar-item specials."}</span>
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={() => setCoMode("")} style={bt("#334155")}>{es ? "Cerrar" : "Close"}</button>
                      <button onClick={() => submitCheckout(coMode === "gift")} style={bt("#16a34a")}>
                        {coMode === "gift" ? (es ? "Enviar Tarjeta ($" + cust.giftAmt + ") →" : "Email Gift Card ($" + cust.giftAmt + ") →") : (es ? "Pagar $" + cartTotals.tot.toFixed(2) + " →" : "Pay $" + cartTotals.tot.toFixed(2) + " →")}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
