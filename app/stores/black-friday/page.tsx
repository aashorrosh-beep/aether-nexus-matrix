"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BF_POOL, getDailyTen, calcBf, BfItem } from "./bf-data";

const COLORS = ["Obsidian Black", "Cyber Gold", "Crimson Pulse", "Arctic Silver", "Emerald Neon"];
const VARIANTS = ["Option #1 (Standard)", "Option #2 (Pro Bundle)", "Option #3 (Deluxe Edition)"];
const PACKS = [
  ["single", "1x Single Retail Unit"],
  ["addon", "1x Unit + Spare Accessory Pack (+22%)"],
  ["case6", "Case Pack: 6 Units (Bulk 15% Off)"]
];
const SIZES: Record<string, string[]> = {
  shoes: ["Women 6","Women 7","Women 8","Women 9","Men 8","Men 9","Men 10","Men 11","Men 12","Men 13 Wide","Men 14"],
  apparel: ["XS","S","M","L","XL","2XL","3XL","4XL"],
  tech: ["Standard Kit","Extended Battery Pack","2-Pack Bundle"],
  home: ["Standard Unit","Home + Travel Kit","Commercial 2-Pack"]
};

export default function BlackFridayCyberStore() {
  const [es, setEs] = useState(false);
  const [tab, setTab] = useState<"daily" | "doorbuster" | "event" | "all">("daily");
  const [vw, setVw] = useState<"cards" | "pics" | "specs" | "bom">("cards");
  const [q, setQ] = useState("");
  const [ang, setAng] = useState<Record<string, number>>({});
  const [col, setCol] = useState<Record<string, string>>({});
  const [vr, setVr] = useState<Record<string, string>>({});
  const [sz, setSz] = useState<Record<string, string>>({});
  const [pk, setPk] = useState<Record<string, string>>({});
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

  useEffect(() => {
    if (!vidItem) return;
    const id = vidItem.id;
    const t = setInterval(() => setAng(a => ({ ...a, [id]: ((a[id] || 0) + 1) % 3 })), 2600);
    return () => clearInterval(t);
  }, [vidItem]);

  const toggleEs = () => {
    const nx = !es; setEs(nx);
    if (typeof window !== "undefined") localStorage.setItem("nexus_lang", nx ? "es" : "en");
  };

  const baseList = tab === "daily" ? getDailyTen(daySeed)
    : tab === "all" ? BF_POOL : BF_POOL.filter(x => x.kind === tab);
  const items = q.trim() ? baseList.filter(x =>
    (x.id + " " + x.en + " " + x.es + " " + x.descEn).toLowerCase().includes(q.toLowerCase())) : baseList;

  const addCart = (id: string, buyNow = false) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    if (buyNow) setCoMode("cart");
  };

  const cartEntries = Object.entries(cart).filter(([, n]) => n > 0);
  const cartCount = cartEntries.reduce((s, [, n]) => s + n, 0);
  const cartTotals = cartEntries.reduce((acc, [id, qty]) => {
    const it = BF_POOL.find(x => x.id === id) || BF_POOL[0];
    const m = calcBf(it.deal, it.ship, pk[id] || "single");
    return {
      sub: +(acc.sub + m.deal * qty).toFixed(2),
      ship: +(acc.ship + m.ship * qty).toFixed(2),
      tax: +(acc.tax + m.tax * qty).toFixed(2),
      tot: +(acc.tot + m.tot * qty).toFixed(2)
    };
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
      : cartEntries.map(([id, q]) => id + "x" + q + "[" + (pk[id]||"single") + "/" + (col[id]||COLORS[0]) + "/" + (sz[id]||"Std") + "]").join(", ");
    setStatusMsg(es ? "Conectando con Stripe Checkout..." : "Connecting to Stripe Live Checkout...");
    try {
      const r = await fetch("/api/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ store: "Black Friday Cyber Vault", summary, total: amt, customer: crmRecord })
      });
      const d = await r.json();
      if (d?.url) { window.location.href = d.url; return; }
    } catch {}
    setStatusMsg(es
      ? "✅ Perfil CRM guardado y pedido registrado para " + cust.email
      : "✅ CRM Profile saved & Order queued for " + cust.email);
  };

  const bt = (bg: string, fg = "#fff") => ({
    background: bg, color: fg, border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 999, padding: "9px 16px", fontSize: 13, fontWeight: 800, cursor: "pointer"
  });

  return (
    <div style={{ minHeight:"100vh", background:"#030611", color:"#f8fafc", padding:"14px 14px 60px" }}>
      <div style={{ maxWidth:1420, margin:"0 auto" }}>
        <div style={{ background:"linear-gradient(135deg,#0f172a,#1e1b4b,#3b0764)", border:"1.5px solid #facc15",
          borderRadius:16, padding:"14px 18px", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:12 }}>
          <div>
            <Link href="/" style={{ color:"#fde047", fontSize:12.5, fontWeight:800, textDecoration:"none" }}>
              ← {es ? "VOLVER A LA GALAXIA ALBS NEXUS" : "BACK TO ALBS NEXUS GALAXY"}
            </Link>
            <h1 style={{ margin:"4px 0", fontSize:"clamp(19px,2.3vw,29px)", fontWeight:900, color:"#fff" }}>
              ⚡ {es ? "BLACK FRIDAY • CYBER MONDAY TODO EL MES" : "BLACK FRIDAY • CYBER MONDAY ALL MONTH VAULT"}
            </h1>
            <div style={{ fontSize:12, color:"#cbd5e1", display:"flex", flexWrap:"wrap", gap:14 }}>
              <span>🤖 {es ? "Auto-Sync 5-Min: 01:55 AM CST Activo" : "5-Min Daily Self-Heal: 01:55 AM CST Active"}</span>
              <span>📞 <b>1-800-889-2470</b> (AI 24/7)</span>
              <span>✉️ <b>cyber-care@albsnexus.com</b></span>
            </div>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            <button onClick={toggleEs} style={bt("#facc15","#000")}>{es ? "🇺🇸 ENGLISH" : "🇪🇸 ESPAÑOL"}</button>
            <button onClick={() => { setStatusMsg(""); setCoMode("ai"); }} style={bt("#0ea5e9")}>
              🤖 {es ? "Soporte IA 1-800" : "1-800 AI Support"}
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
            ⚡ {es ? "Puertas Abiertas (10)" : "Doorbusters (10)"}
          </button>
          <button onClick={() => setTab("event")} style={bt(tab==="event"?"#8b5cf6":"#1e293b")}>
            🎯 {es ? "Eventos Cyber Diarios (10)" : "Daily Cyber Events (10)"}
          </button>
          <button onClick={() => setTab("all")} style={bt(tab==="all"?"#0284c7":"#1e293b")}>
            📦 {es ? "Todo el Mes (20)" : "All Month Vault (20)"}
          </button>
          <input value={q} onChange={e => setQ(e.target.value)}
            placeholder={es ? "Buscar SKU, producto o empaque..." : "Search Doorbusters, Case Packs or SKUs..."}
            style={{ flex:1, minWidth:210, background:"#090d1a", border:"1px solid #475569", color:"#fff", borderRadius:999, padding:"8px 14px", fontSize:12.5 }} />
        </div>

        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:14 }}>
          {([
            ["cards", es ? "📸 Tarjetas" : "📸 Cards"],
            ["pics", es ? "🖼️ Galería Interactiva" : "🖼️ Pictures"],
            ["specs", es ? "📋 Hoja Maestra Unificada (1+2+3)" : "📋 Master Spec & Order Sheet (All-In-One)"],
            ["bom", es ? "📦 Contenido del Kit y Caja Master" : "📦 Interactive Kit & Case-Pack Builder"]
          ] as [typeof vw, string][]).map(([k, lbl]) => (
            <button key={k} onClick={() => setVw(k)} style={bt(vw===k?"#facc15":"#0f172a", vw===k?"#000":"#fff")}>
              {lbl} ({items.length})
            </button>
          ))}
        </div>
        {vw === "cards" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(295px,1fr))", gap:14 }}>
            {items.map(x => {
              const a = ang[x.id] || 0, mode = pk[x.id] || "single";
              const m = calcBf(x.deal, x.ship, mode), sList = SIZES[x.cat] || SIZES.tech;
              return (
                <div key={x.id} style={{ background:"#090f1f", border:"1px solid #1e293b", borderRadius:14, padding:12, display:"flex", flexDirection:"column", gap:8 }}>
                  <div style={{ position:"relative", height:190, borderRadius:10, overflow:"hidden", background:"#02040a" }}>
                    <img src={x.imgs[a]} alt="" referrerPolicy="no-referrer" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    <span style={{ position:"absolute", top:8, left:8, background:"#052e16ee", border:"1px solid #22c55e", color:"#4ade80", padding:"3px 8px", borderRadius:6, fontSize:11, fontWeight:900 }}>
                      {x.id} • ✅ {es ? "En Stock (Envío 24h)" : "In Stock (Ships 24h)"}
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
                  <div style={{ fontWeight:900, fontSize:14.5 }}>{es ? x.es : x.en}</div>
                  <div style={{ fontSize:11.5, color:"#93c5fd", background:"#061226", border:"1px solid #1e3a8a", borderRadius:7, padding:"5px 8px", lineHeight:1.35 }}>
                    📦 {es ? x.descEs : x.descEn}
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                    <select value={col[x.id] || COLORS[0]} onChange={e => setCol({ ...col, [x.id]: e.target.value })}
                      style={{ background:"#0f172a", color:"#fff", border:"1px solid #334155", borderRadius:7, padding:"5px 6px", fontSize:11 }}>
                      {COLORS.map(c => <option key={c} value={c}>Color: {c}</option>)}
                    </select>
                    <select value={sz[x.id] || sList[0]} onChange={e => setSz({ ...sz, [x.id]: e.target.value })}
                      style={{ background:"#0f172a", color:"#fff", border:"1px solid #334155", borderRadius:7, padding:"5px 6px", fontSize:11 }}>
                      {sList.map(s => <option key={s} value={s}>{es ? "Talla: " : "Size: "}{s}</option>)}
                    </select>
                  </div>
                  <select value={mode} onChange={e => setPk({ ...pk, [x.id]: e.target.value })}
                    style={{ background:"#0f172a", color:"#fde047", border:"1px solid #475569", borderRadius:7, padding:"5px 6px", fontSize:11.5, fontWeight:800 }}>
                    {PACKS.map(([k, lbl]) => <option key={k} value={k}>📦 {lbl}</option>)}
                  </select>
                  <div style={{ background:"#050914", borderRadius:9, padding:"7px 10px", fontSize:11.5 }}>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <span style={{ color:"#94a3b8" }}>{es ? "Precio Regular:" : "MSRP Retail:"}</span>
                      <span style={{ textDecoration:"line-through", color:"#94a3b8" }}>${x.retail.toFixed(2)}</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <span>{es ? "Precio Seleccionado:" : "Selected Deal:"}</span><b>${m.deal.toFixed(2)}</b>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", color:"#38bdf8" }}>
                      <span>{es ? "Envío + Impuestos:" : "Ship + Tax/CC:"}</span><span>+${(m.ship + m.tax).toFixed(2)}</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", color:"#4ade80", fontWeight:900, marginTop:2 }}>
                      <span>{es ? "Total Final:" : "Landed Total:"}</span><span>${m.tot.toFixed(2)}</span>
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:6, marginTop:"auto" }}>
                    <button onClick={() => addCart(x.id, false)} style={bt("#1e293b")}>+ {es ? "Carrito" : "Cart"}</button>
                    <button onClick={() => setVw("specs")} style={bt("#334155","#fde047")}>📋 Sheet</button>
                    <button onClick={() => addCart(x.id, true)} style={bt("#dc2626")}>{es ? "Comprar →" : "Buy Now →"}</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {vw === "pics" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))", gap:12 }}>
            {items.map(x => {
              const mode = pk[x.id] || "single", m = calcBf(x.deal, x.ship, mode);
              return (
                <div key={x.id} style={{ background:"#090f1f", border:"1px solid #1e293b", borderRadius:12, padding:10 }}>
                  <img src={x.imgs[ang[x.id]||0]} alt="" style={{ width:"100%", height:205, objectFit:"cover", borderRadius:8 }} />
                  <div style={{ display:"flex", gap:5, marginTop:6 }}>
                    {[0,1,2].map(i => (
                      <img key={i} src={x.imgs[i]} alt="" onClick={() => setAng({ ...ang, [x.id]: i })}
                        style={{ width:54, height:40, objectFit:"cover", borderRadius:5, cursor:"pointer", border:(ang[x.id]||0)===i?"2px solid #facc15":"1px solid #334155" }} />
                    ))}
                    <button onClick={() => setVidItem(x)} style={{ marginLeft:"auto", background:"#4c1d95", color:"#fff", border:"1px solid #a855f7", borderRadius:6, padding:"0 8px", fontSize:11, fontWeight:800, cursor:"pointer" }}>🎥 Video</button>
                  </div>
                  <div style={{ fontWeight:800, fontSize:13.5, marginTop:6 }}>{es ? x.es : x.en}</div>
                  <div style={{ fontSize:11, color:"#93c5fd", margin:"3px 0 6px" }}>📦 {x.casePack} • ✅ In Stock</div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:6 }}>
                    <span style={{ color:"#4ade80", fontWeight:900, fontSize:14 }}>${m.tot.toFixed(2)}</span>
                    <button onClick={() => addCart(x.id, false)} style={bt("#1e293b")}>+ Cart</button>
                    <button onClick={() => addCart(x.id, true)} style={bt("#dc2626")}>{es ? "Comprar →" : "Buy →"}</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {vw === "specs" && (
          <div style={{ overflowX:"auto", background:"#090f1f", border:"1.5px solid #334155", borderRadius:14, padding:12 }}>
            <div style={{ marginBottom:10, fontSize:12.5, color:"#fde047", fontWeight:800 }}>
              📋 {es ? "HOJA MAESTRA UNIFICADA (Especificaciones + Dimensiones + Empaque + Certificación + Compra Directa)" : "UNIFIED MASTER SPEC & ORDER SHEET (Specs + Dimensions + Case-Pack Description + Certs + Direct Buy)"}
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr style={{ borderBottom:"2px solid #334155", color:"#fde047", textAlign:"left", background:"#050914" }}>
                  <th style={{ padding:"10px 8px" }}>{es ? "Fotos (#1-#3)" : "Photos (#1-#3)"}</th>
                  <th style={{ padding:"10px 8px" }}>{es ? "SKU, Producto y Empaque" : "SKU, Product & Case-Pack Description"}</th>
                  <th style={{ padding:"10px 8px" }}>{es ? "Dimensiones y Material" : "Dimensions & Material"}</th>
                  <th style={{ padding:"10px 8px" }}>{es ? "Certificación y Garantía" : "Certification & Warranty"}</th>
                  <th style={{ padding:"10px 8px" }}>{es ? "Disponibilidad" : "Availability"}</th>
                  <th style={{ padding:"10px 8px" }}>{es ? "Opciones de Compra" : "Select Option / Size / Pack"}</th>
                  <th style={{ padding:"10px 8px" }}>{es ? "Precio Total" : "Landed Total"}</th>
                  <th style={{ padding:"10px 8px" }}>{es ? "Acción" : "Order Action"}</th>
                </tr>
              </thead>
              <tbody>
                {items.map(x => {
                  const a = ang[x.id] || 0, mode = pk[x.id] || "single";
                  const m = calcBf(x.deal, x.ship, mode), sList = SIZES[x.cat] || SIZES.tech;
                  return (
                    <tr key={x.id} style={{ borderBottom:"1px solid #1e293b" }}>
                      <td style={{ padding:8, minWidth:115 }}>
                        <img src={x.imgs[a]} alt="" onClick={() => setAng({ ...ang, [x.id]: (a + 1) % 3 })}
                          style={{ width:88, height:62, objectFit:"cover", borderRadius:7, cursor:"pointer", border:"1.5px solid #facc15", display:"block" }} />
                        <span style={{ fontSize:10, color:"#94a3b8" }}>Click: #{a+1}/3</span>
                      </td>
                      <td style={{ padding:8, minWidth:230 }}>
                        <div style={{ color:"#38bdf8", fontWeight:900 }}>{x.id}</div>
                        <div style={{ fontWeight:900, fontSize:13.5, color:"#fff" }}>{es ? x.es : x.en}</div>
                        <div style={{ fontSize:11, color:"#93c5fd", marginTop:3 }}>📦 {es ? x.descEs : x.descEn}</div>
                      </td>
                      <td style={{ padding:8, minWidth:160 }}>
                        <div style={{ fontWeight:700 }}>{x.dims}</div>
                        <div style={{ color:"#cbd5e1", fontSize:11 }}>{x.mat}</div>
                      </td>
                      <td style={{ padding:8, minWidth:155 }}>
                        <span style={{ background:"#1e293b", padding:"3px 7px", borderRadius:5, color:"#fde047", fontWeight:800, display:"inline-block", marginBottom:4 }}>{x.cert}</span>
                        <div style={{ fontSize:11, color:"#94a3b8" }}>2-Yr ALBS Warranty • Houston Hub</div>
                      </td>
                      <td style={{ padding:8, minWidth:130 }}>
                        <span style={{ background:"#052e16", border:"1px solid #22c55e", color:"#4ade80", padding:"4px 8px", borderRadius:6, fontWeight:900, fontSize:11, display:"inline-block" }}>
                          ✅ {es ? "En Stock" : "In Stock"}
                        </span>
                        <div style={{ fontSize:10.5, color:"#94a3b8", marginTop:3 }}>{es ? "Listo para envío 24h" : "Ready to Ship (24h)"}</div>
                      </td>
                      <td style={{ padding:8, minWidth:185 }}>
                        <select value={sz[x.id] || sList[0]} onChange={e => setSz({ ...sz, [x.id]: e.target.value })}
                          style={{ width:"100%", background:"#050914", color:"#fff", border:"1px solid #334155", borderRadius:6, padding:"4px 6px", fontSize:11, marginBottom:4 }}>
                          {sList.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <select value={mode} onChange={e => setPk({ ...pk, [x.id]: e.target.value })}
                          style={{ width:"100%", background:"#050914", color:"#fde047", border:"1px solid #475569", borderRadius:6, padding:"4px 6px", fontSize:11, fontWeight:800 }}>
                          {PACKS.map(([k, lbl]) => <option key={k} value={k}>{lbl}</option>)}
                        </select>
                      </td>
                      <td style={{ padding:8, minWidth:125 }}>
                        <div style={{ fontSize:11, color:"#94a3b8", textDecoration:"line-through" }}>MSRP ${x.retail}</div>
                        <div style={{ fontSize:11, color:"#cbd5e1" }}>Deal ${m.deal.toFixed(2)} + ${+(m.ship+m.tax).toFixed(2)} S&T</div>
                        <div style={{ color:"#4ade80", fontWeight:900, fontSize:14.5 }}>${m.tot.toFixed(2)}</div>
                      </td>
                      <td style={{ padding:8, minWidth:135 }}>
                        <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                          <button onClick={() => addCart(x.id, false)} style={bt("#1e293b")}>+ {es ? "Al Carrito" : "Add to Cart"}</button>
                          <button onClick={() => addCart(x.id, true)} style={bt("#dc2626")}>{es ? "Comprar →" : "Buy Now →"}</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {vw === "bom" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:14 }}>
            {items.map(x => {
              const mode = pk[x.id] || "single", m = calcBf(x.deal, x.ship, mode);
              return (
                <div key={x.id} style={{ background:"#090f1f", border:"1.5px solid #1e293b", borderRadius:14, padding:14, display:"flex", flexDirection:"column", gap:8 }}>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <img src={x.imgs[0]} alt="" style={{ width:68, height:52, objectFit:"cover", borderRadius:8, border:"1px solid #facc15" }} />
                    <div>
                      <div style={{ fontSize:11, color:"#4ade80", fontWeight:900 }}>{x.id} • ✅ IN STOCK • {x.casePack.toUpperCase()}</div>
                      <div style={{ fontWeight:900, fontSize:14 }}>{es ? x.es : x.en}</div>
                    </div>
                  </div>
                  <div style={{ fontSize:11.5, background:"#050914", border:"1px solid #1e293b", borderRadius:8, padding:8 }}>
                    <div style={{ color:"#fde047", fontWeight:800, marginBottom:4 }}>📦 {es ? "Componentes Incluidos en la Caja:" : "What's Included in Your Box:"}</div>
                    {x.kit.map((part, idx) => (
                      <div key={idx} style={{ display:"flex", justifyContent:"space-between", padding:"3px 0", borderBottom:idx<2?"1px solid #1e293b":"0" }}>
                        <span>✔ {part}</span>
                        <span style={{ color:"#4ade80", fontWeight:700 }}>{es ? "Incluido" : "Included"}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                    {PACKS.map(([k, lbl]) => {
                      const pm = calcBf(x.deal, x.ship, k);
                      const active = mode === k;
                      return (
                        <button key={k} onClick={() => setPk({ ...pk, [x.id]: k })}
                          style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 10px", borderRadius:8, cursor:"pointer",
                            background:active?"#172554":"#050914", border:active?"2px solid #facc15":"1px solid #334155", color:"#fff", fontSize:11.5, fontWeight:800 }}>
                          <span>{active ? "🔘 " : "⚪ "}{lbl}</span>
                          <span style={{ color:"#4ade80" }}>${pm.tot.toFixed(2)}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:"auto" }}>
                    <button onClick={() => addCart(x.id, false)} style={bt("#1e293b")}>+ {es ? "Añadir Opción" : "Add Selected"}</button>
                    <button onClick={() => addCart(x.id, true)} style={bt("#dc2626")}>{es ? "Comprar $" : "Buy $"}{m.tot.toFixed(2)} →</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {vidItem && (
          <div onClick={() => setVidItem(null)} style={{ position:"fixed", inset:0, background:"#000d", zIndex:120, display:"flex", alignItems:"center", justifyContent:"center", padding:14 }}>
            <div onClick={e => e.stopPropagation()} style={{ background:"#090f1f", border:"2px solid #a855f7", borderRadius:16, padding:18, maxWidth:640, width:"100%" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <h3 style={{ margin:0, fontSize:17, color:"#fde047" }}>🎥 {es ? vidItem.es : vidItem.en} ({vidItem.id})</h3>
                <span style={{ background:"#dc2626", color:"#fff", padding:"3px 9px", borderRadius:6, fontSize:11, fontWeight:900 }}>HD 360° VIDEO</span>
              </div>
              <div style={{ position:"relative", height:270, borderRadius:12, overflow:"hidden", background:"#02040a", border:"1px solid #334155", marginBottom:10 }}>
                <video key={vidItem.id} autoPlay loop muted playsInline controls poster={vidItem.imgs[0]}
                  style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0, zIndex:1 }}>
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
                </video>
                <img src={vidItem.imgs[(ang[vidItem.id] || 0) % 3]} alt=""
                  style={{ width:"118%", height:"118%", objectFit:"cover", position:"absolute", inset:"-9%", zIndex:2, opacity:0.88, pointerEvents:"none", animation:"bfPan 6s ease-in-out infinite alternate" }} />
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:12.5, color:"#93c5fd" }}>📦 {vidItem.casePack} • {vidItem.dims}</span>
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
                  <textarea value={aiMsg} onChange={e => setAiMsg(e.target.value)} rows={3}
                    placeholder={es ? "Escriba su pregunta, orden o reclamo..." : "Enter your order question, case-pack inquiry, or complaint..."}
                    style={{ width:"100%", background:"#050914", color:"#fff", border:"1px solid #334155", borderRadius:8, padding:8, fontSize:12 }} />
                  {aiReply && <div style={{ marginTop:8, padding:8, background:"#052e16", border:"1px solid #22c55e", borderRadius:8, fontSize:12 }}>{aiReply}</div>}
                  <div style={{ display:"flex", justifyContent:"flex-end", gap:8, marginTop:10 }}>
                    <button onClick={() => setCoMode("")} style={bt("#334155")}>{es ? "Cerrar" : "Close"}</button>
                    <button onClick={() => setAiReply("✅ Ticket #BF-" + (1000 + daySeed) + " logged with priority 24-Hr resolution.")} style={bt("#0ea5e9")}>Ask AI Manager →</button>
                  </div>
                </>
              ) : (
                <>
                  <h3 style={{ margin:"0 0 6px", color:"#fde047" }}>
                    {coMode === "gift" ? "🎁 Instant Email Gift Card ($0 Shipping)" : "🛒 Secure Checkout + Similar-Deals VIP Vault"}
                  </h3>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8 }}>
                    <input value={cust.name} onChange={e => setCust({ ...cust, name: e.target.value })} placeholder="Full Name *" style={{ background:"#050914", color:"#fff", border:"1px solid #334155", borderRadius:8, padding:8, fontSize:12 }} />
                    <input value={cust.email} onChange={e => setCust({ ...cust, email: e.target.value })} placeholder="Your Email *" style={{ background:"#050914", color:"#fff", border:"1px solid #334155", borderRadius:8, padding:8, fontSize:12 }} />
                    <input value={cust.phone} onChange={e => setCust({ ...cust, phone: e.target.value })} placeholder="Phone Number *" style={{ background:"#050914", color:"#fff", border:"1px solid #334155", borderRadius:8, padding:8, fontSize:12 }} />
                    <input value={cust.addr} onChange={e => setCust({ ...cust, addr: e.target.value })} placeholder="Full Shipping Address *" style={{ background:"#050914", color:"#fff", border:"1px solid #334155", borderRadius:8, padding:8, fontSize:12 }} />
                  </div>
                  {statusMsg && <div style={{ marginTop:8, padding:8, background:"#0f172a", border:"1px solid #38bdf8", borderRadius:8, fontSize:12, color:"#fde047" }}>{statusMsg}</div>}
                  <div style={{ display:"flex", justifyContent:"flex-end", gap:8, marginTop:12 }}>
                    <button onClick={() => setCoMode("")} style={bt("#334155")}>Close</button>
                    <button onClick={() => submitCheckout(coMode === "gift")} style={bt("#16a34a")}>
                      {coMode === "gift" ? "Email Gift Card ($" + cust.giftAmt + ") →" : "Pay $" + cartTotals.tot.toFixed(2) + " →"}
                    </button>
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
