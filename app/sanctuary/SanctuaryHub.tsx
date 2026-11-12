"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useEs, SpanishBtn } from "../components/HomepageSanctuaryBar";
import NexusCheckoutModal from "../components/NexusCheckoutModal";
import { getWing, calcSc } from "./sanctuary-data";
const FB = "https://tse1.mm.bing.net/th?q=sensory+therapy+wellness+care+kit&w=420&h=300&c=7";
export default function SanctuaryHub({ slug }: { slug: string }) {
  const w = getWing(slug.toLowerCase()), { es } = useEs();
  const [tab, setTab] = useState<"care" | "store">("care"), [q, setQ] = useState(""), [zip, setZip] = useState("77433"), [loc, setLoc] = useState("Cypress, TX 77433");
  const [ang, setAng] = useState<Record<string, number>>({}), [cart, setCart] = useState<Record<string, number>>({});
  const [coOpen, setCoOpen] = useState(false), [coMode, setCoMode] = useState("order");
  const findZip = (z0: string) => {
    const z = z0.replace(/\D/g, "").slice(0, 5); if (z.length !== 5) return;
    setLoc(`ZIP ${z} (12-Mi)`);
    fetch(`https://api.zippopotam.us/us/${z}`).then(r => r.ok ? r.json() : null).then(d => { const p = d?.places?.[0]; if (p) setLoc(`${p["place name"]}, ${p["state abbreviation"]} ${z}`); }).catch(() => {});
  };
  useEffect(() => { const z = new URLSearchParams(window.location.search).get("zip"); if (z) { setZip(z); findZip(z); } }, []);
  const list = w.skus.filter(x => (es ? x.nameEs : x.name).toLowerCase().includes(q.toLowerCase()));
  const lines = w.skus.filter(x => (cart[x.id] ?? 0) > 0), cnt = lines.reduce((s, x) => s + cart[x.id], 0);
  const sub = +lines.reduce((s, x) => s + calcSc(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : 5.99, tax = +(sub * 0.0825).toFixed(2), tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const bt = (bg: string, c = "#fff") => ({ background: bg, color: c, fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", fontSize: 12.5, cursor: "pointer" });
  const gmap = (term: string) => `https://www.google.com/maps/search/${encodeURIComponent(term + " near " + zip)}`;
  return (<div style={{ minHeight: "100vh", background: "#060b16", color: "#f8fafc", padding: "16px 12px", fontFamily: "system-ui, sans-serif" }}>
    <div style={{ maxWidth: 1220, margin: "0 auto" }}>
      <div style={{ background: "#0f172a", border: `2px solid ${w.col}`, borderRadius: 16, padding: 16, marginBottom: 14 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", marginBottom: 10 }}>
          <div><Link href="/" style={{ color: "#93c5fd", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>{es ? "← VOLVER A ALBS NEXUS" : "← BACK TO ALBS NEXUS"}</Link><h1 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 900 }}>🎗️ {es ? w.es : w.en}</h1></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button onClick={() => setTab("care")} style={bt(tab === "care" ? w.col : "#1e293b")}>{es ? "💜 Panel de Ayuda y ZIP" : "💜 Care Welcome Hub"}</button>
            <button onClick={() => setTab("store")} style={bt(tab === "store" ? w.col : "#1e293b")}>{es ? `🛍️ Tienda (${w.skus.length})` : `🛍️ Sanctuary Store (${w.skus.length})`}</button>
            <button onClick={() => { setCoMode("giftcard"); setCoOpen(true); }} style={bt("#facc15", "#000")}>{es ? "🎁 Tarjetas ($0 Envío)" : "🎁 Gift Cards ($0 Ship)"}</button>
            <button onClick={() => { setCoMode("order"); setCoOpen(true); }} style={bt("#22c55e", "#000")}>🛒 ({cnt}) • ${tot.toFixed(2)}</button>
          </div></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <input value={q} onChange={e => { setQ(e.target.value); if (e.target.value) setTab("store"); }} placeholder={es ? "Buscar productos de apoyo y tecnología..." : "Search supportive gear & assistive tech..."} style={{ flex: 1, minWidth: 210, background: "#020617", border: "1px solid #475569", color: "#fff", borderRadius: 999, padding: "10px 16px", fontSize: 13 }} />
          <SpanishBtn />
        </div></div>
      {tab === "care" ? (<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 14, padding: 16 }}>
          <p style={{ margin: "0 0 12px", fontSize: 14, color: "#cbd5e1", lineHeight: 1.5 }}>{es ? w.careEs : w.careEn}</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 8, background: "#1e293b", padding: "8px 12px", borderRadius: 10, marginBottom: 10 }}>
            <b style={{ fontSize: 13, color: "#fde047" }}>{es ? "📍 Ingrese su Código Postal abajo para ver ayuda y actividades a 12 millas:" : "📍 Need Español or Local Help? Click 🇪🇸 ESPAÑOL or enter your ZIP code below:"}</b>
            <SpanishBtn />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <input value={zip} maxLength={5} onChange={e => setZip(e.target.value)} placeholder="ZIP (e.g. 77433)" style={{ width: 150, background: "#020617", border: `2px solid ${w.col}`, color: "#fff", borderRadius: 10, padding: "10px 12px", fontSize: 15, fontWeight: 900 }} />
            <button onClick={() => findZip(zip)} style={bt(w.col)}>{es ? "🔍 Buscar Ayuda en Mi ZIP" : "🔍 Find Local Help & Things To Do"}</button>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#4ade80" }}>📍 {es ? "Área activa:" : "Active Area:"} {loc}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 8 }}>
            {[[es ? "🎡 Qué Hacer Inclusivo (12 Mi)" : "🎡 Sensory & Accessible Things To Do", `${w.en.split(" ")[0]} friendly activities parks`],[es ? "🏥 Especialistas y Terapia" : "🏥 Local Therapy & Specialists", `${w.en.split(" ")[0]} therapy clinic`],[es ? "🤝 Grupos de Apoyo Familiar" : "🤝 Support Groups & Nonprofits", `${w.en.split(" ")[0]} family support group`],[es ? "🚨 Centros de Apoyo Cercanos" : "🚨 Local Care & Respite Centers", `${w.en.split(" ")[0]} resource center`]].map(([lbl, term]) => <a key={lbl} href={gmap(term)} target="_blank" rel="noreferrer" style={{ background: "#090d16", border: "1px solid #334155", borderRadius: 10, padding: 11, color: "#38bdf8", textDecoration: "none", fontWeight: 800, fontSize: 12.5 }}>{lbl} ({zip}) ↗</a>)}
          </div></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 14 }}>
          <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 14, padding: 14 }}>
            <h3 style={{ margin: "0 0 10px", color: "#f87171", fontSize: 15 }}>{es ? "📞 Líneas de Ayuda Directa 24/7" : "📞 24/7 Hotlines & Immediate Help"}</h3>
            {w.hot.map(([le, ls, ph]) => <div key={ph + le} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#090d16", padding: "9px 11px", borderRadius: 9, marginBottom: 7 }}><span style={{ fontSize: 12.5, fontWeight: 700 }}>{es ? ls : le}</span><a href={`tel:${ph.replace(/\D/g, "")}`} style={{ background: "#dc2626", color: "#fff", padding: "5px 10px", borderRadius: 7, textDecoration: "none", fontWeight: 900, fontSize: 12 }}>📞 {ph}</a></div>)}
          </div>
          <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 14, padding: 14 }}>
            <h3 style={{ margin: "0 0 10px", color: "#fde047", fontSize: 15 }}>{es ? "🎡 Qué Hacer y Actividades Familiares" : "🎡 Things To Do & Family Activities"}</h3>
            {(es ? w.todoEs : w.todoEn).map(t => <div key={t} style={{ background: "#090d16", padding: "9px 11px", borderRadius: 9, marginBottom: 7, fontSize: 12.5 }}>✓ {t}</div>)}
          </div></div>
        <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 14, padding: 14 }}>
          <h3 style={{ margin: "0 0 10px", color: "#4ade80", fontSize: 15 }}>{es ? "🚀 Tecnología de Asistencia Actualizada (2026)" : "🚀 Up-To-Date Assistive Technology (2026)"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 10 }}>{(es ? w.techEs : w.techEn).map(([ti, d]) => <div key={ti} style={{ background: "#090d16", border: "1px solid #1e293b", borderRadius: 10, padding: 11 }}><b style={{ color: "#38bdf8", fontSize: 13 }}>{ti}</b><div style={{ fontSize: 12, color: "#cbd5e1", marginTop: 4 }}>{d}</div></div>)}</div>
        </div>
        <div style={{ background: "linear-gradient(90deg,#0f172a,#1e293b)", border: `2px solid ${w.col}`, borderRadius: 14, padding: 16, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div><b style={{ fontSize: 16 }}>{es ? "🛍️ ¿Buscas herramientas sensoriales o de apoyo?" : "🛍️ Looking for Verified Supportive Tools & Tech?"}</b><div style={{ fontSize: 12.5, color: "#cbd5e1" }}>{es ? "Explora 40 artículos seleccionados con envío directo a casa." : "Browse 40 curated supportive products with direct home delivery."}</div></div>
          <button onClick={() => setTab("store")} style={bt("#22c55e", "#000")}>{es ? "🛍️ Entrar a la Tienda del Santuario →" : "🛍️ Visit the Sanctuary Store (40 Items) →"}</button>
        </div></div>) : (
      <div>
        <div style={{ marginBottom: 10 }}><button onClick={() => setTab("care")} style={bt("#1e293b")}>{es ? "← Volver al Panel de Ayuda, Líneas 24/7 y ZIP" : "← Back to Care Welcome Hub, Hotlines & ZIP Finder"}</button></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(245px,1fr))", gap: 12 }}>{list.map(x => {
          const m = calcSc(x.w, x.ship), k = ang[x.id] ?? 0, nm = es ? x.nameEs : x.name;
          return (<div key={x.id} style={{ background: "#0f172a", border: "1px solid #263349", borderRadius: 12, padding: 10, display: "flex", flexDirection: "column", gap: 7 }}>
            <div style={{ position: "relative", height: 152, borderRadius: 8, overflow: "hidden", background: "#020617", display: "flex" }}><img loading="lazy" src={x.imgs[k]} alt={nm} referrerPolicy="no-referrer" onError={e => { e.currentTarget.src = FB; }} style={{ flex: "1 1 0px", minWidth: 0, height: 152, objectFit: "cover" }} /><span style={{ position: "absolute", top: 6, right: 6, background: "#15803d", padding: "2px 7px", borderRadius: 5, fontSize: 10, fontWeight: 900 }}>{x.stock} {es ? "Disp." : "In Stock"}</span></div>
            <div style={{ display: "flex", gap: 5 }}>{[0, 1, 2].map(i => <img key={i} loading="lazy" src={x.imgs[i]} alt="" referrerPolicy="no-referrer" onError={e => { e.currentTarget.src = FB; }} onClick={() => setAng({ ...ang, [x.id]: i })} style={{ flex: "1 1 0px", minWidth: 0, height: 38, objectFit: "cover", borderRadius: 5, cursor: "pointer", border: k === i ? `2px solid ${w.col}` : "1px solid #334155" }} />)}</div>
            <b style={{ fontSize: 13, minHeight: 32 }}>{nm}</b>
            <div style={{ background: "#090d16", borderRadius: 8, padding: 8, fontSize: 11.5, lineHeight: 1.55 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>{es ? "Precio:" : "Price:"}</span><b>${m.r.toFixed(2)}</b></div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#38bdf8" }}><span>{es ? "Envío:" : "Shipping:"}</span><b>+${x.ship.toFixed(2)}</b></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>{es ? "Impuestos:" : "Tax & Processing:"}</span><b>+${m.tc.toFixed(2)}</b></div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#4ade80", fontWeight: 900, fontSize: 13 }}><span>Total:</span><span>${m.tot.toFixed(2)}</span></div>
            </div>
            <div style={{ display: "flex", gap: 6 }}><button onClick={() => setCart({ ...cart, [x.id]: (cart[x.id] ?? 0) + 1 })} style={{ ...bt("#1e293b"), flex: 1 }}>{es ? "+ Carrito" : "+ Cart"}</button><button onClick={() => { setCart({ ...cart, [x.id]: (cart[x.id] ?? 0) + 1 }); setCoMode("order"); setCoOpen(true); }} style={{ ...bt(w.col), flex: 1 }}>{es ? "Comprar →" : "Buy Now →"}</button></div>
          </div>); })}</div></div>)}
    </div>
    <NexusCheckoutModal open={coOpen} mode0={coMode} store={es ? w.es : w.en} summary={`${cnt} Item(s) • Sub $${sub.toFixed(2)}`} total={tot} ship={ship} tax={tax} onClose={() => setCoOpen(false)} onDone={() => setCart({})} />
  </div>);
}
