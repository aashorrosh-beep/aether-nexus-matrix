"use client";
import React, { useState } from "react";
import Link from "next/link";
import SiloItemGrid from "../components/SiloItemGrid";
import NexusCheckoutModal from "../components/NexusCheckoutModal";
import { getWing, calcSc } from "./sanctuary-data";
const CATS = [
  ["all","🛍️ All (100)","🛍️ Todos (100)"],
  ["hard","🔎 50 Hardest to Find (Youth/Adult)","🔎 50 Más Difíciles"],
  ["best","⭐ 35 Best-Sellers","⭐ 35 Más Usados"],
  ["care","💊 15 Vitamins & Caretaker","💊 15 Vitaminas y Cuidador"]
];
export default function SanctuaryHub({ slug }: { slug: string }) {
  const w = getWing(slug.toLowerCase());
  const [es, setEs] = useState(false), [tab, setTab] = useState("info");
  const [cat, setCat] = useState("all"), [q, setQ] = useState("");
  const [ez, setEz] = useState("77433"), [el, setEl] = useState("Cypress, TX 77433");
  const [hz, setHz] = useState("77433"), [hl, setHl] = useState("Cypress, TX 77433");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [co, setCo] = useState(false), [cm, setCm] = useState("order");
  const look = (raw: string, fn: (v: string) => void) => {
    const z = raw.replace(/\D/g, "").slice(0, 5); if (z.length !== 5) return;
    fn(`ZIP ${z} (12-Mi)`);
    fetch(`https://api.zippopotam.us/us/${z}`).then(r => (r.ok ? r.json() : null))
      .then(d => { const p = d?.places?.[0]; if (p) fn(`${p["place name"]}, ${p["state abbreviation"]} ${z}`); }).catch(() => {});
  };
  const list = w.skus.filter(x => (cat === "all" ? true : x.cat === cat) && x.name.toLowerCase().includes(q.toLowerCase()));
  const ln = w.skus.filter(x => (cart[x.id] ?? 0) > 0), cnt = ln.reduce((s, x) => s + cart[x.id], 0);
  const sub = +ln.reduce((s, x) => s + calcSc(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : 5.99, tax = +(sub * 0.0825).toFixed(2);
  const tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const bt = (bg: string, c = "#fff") => ({ background: bg, color: c, fontWeight: 900, border: 0, borderRadius: 9, padding: "8px 12px", fontSize: 12, cursor: "pointer" });
  const rZip = (ti: string, z: string, sZ: (v: string) => void, loc: string, sL: (v: string) => void, col: string, L: [string, string][]) => (
    <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 14, padding: 14 }}><h3 style={{ margin: "0 0 8px", color: col, fontSize: 15 }}>{ti}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}><input value={z} maxLength={5} onChange={e => sZ(e.target.value)} placeholder="ZIP" style={{ width: 100, background: "#020617", border: `2px solid ${col}`, color: "#fff", borderRadius: 8, padding: 8, fontWeight: 900 }} /><button onClick={() => look(z, sL)} style={bt(col, "#000")}>{es ? "Buscar" : "Find ZIP"}</button><span style={{ fontSize: 12, color: "#4ade80", alignSelf: "center", fontWeight: 800 }}>📍 {loc}</span></div>
      {L.map(([l, t]) => <a key={l} href={`https://www.google.com/maps/search/${encodeURIComponent(w.key + " " + t + " near " + z)}`} target="_blank" rel="noreferrer" style={{ display: "block", background: "#090d16", padding: "8px 10px", borderRadius: 8, color: "#7dd3fc", textDecoration: "none", fontWeight: 800, fontSize: 12, marginBottom: 6 }}>{l} ({z}) ↗</a>)}</div>);
  return (<div style={{ minHeight: "100vh", background: "#060b16", color: "#f8fafc", padding: "16px 12px", fontFamily: "system-ui" }}><div style={{ maxWidth: 1240, margin: "0 auto" }}>
    <div style={{ background: "#0f172a", border: `2px solid ${w.col}`, borderRadius: 16, padding: 15, marginBottom: 14 }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", marginBottom: 10 }}>
        <div><Link href="/" style={{ color: "#93c5fd", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>← ALBS NEXUS</Link><h1 style={{ margin: "3px 0 0", fontSize: 21, fontWeight: 900 }}>🎗️ {es ? w.es : w.en} • {es ? "Santuario e Información" : "Sanctuary & Information"}</h1></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}><button onClick={() => setTab("info")} style={bt(tab === "info" ? w.col : "#1e293b")}>{es ? "💜 Info y ZIP" : "💜 Sanctuary & Info"}</button><button onClick={() => setTab("store")} style={bt(tab === "store" ? "#16a34a" : "#1e293b")}>{es ? "🛍️ Tienda (100)" : "🛍️ Store (100)"}</button><button onClick={() => { setCm("giftcard"); setCo(true); }} style={bt("#facc15", "#000")}>🎁 Gift Cards</button><button onClick={() => { setCm("order"); setCo(true); }} style={bt("#22c55e", "#000")}>🛒 ({cnt}) ${tot.toFixed(2)}</button><button onClick={() => setEs(!es)} style={bt("#fde047", "#000")}>{es ? "🇺🇸 ENGLISH" : "🇪🇸 ESPAÑOL"}</button></div>
      </div>
      <div style={{ display: "flex", marginBottom: 9 }}><input value={q} onChange={e => { setQ(e.target.value); if (e.target.value) setTab("store"); }} placeholder={es ? "🔍 Buscar en los 100 artículos del Santuario..." : "🔍 Search 100 Sanctuary items (adult jumpsuits, safety tents, supplies, vitamins)..."} style={{ flex: 1, background: "#020617", border: `1.5px solid ${w.col}`, color: "#fff", borderRadius: 999, padding: "9px 15px", fontSize: 13 }} /></div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>{CATS.map(([k, e1, e2]) => <button key={k} onClick={() => { setCat(k); setTab("store"); }} style={bt(tab === "store" && cat === k ? w.col : "#1e293b")}>{es ? e2 : e1}</button>)}</div>
    </div>
    {tab === "info" ? (<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 14 }}>
        {rZip(es ? "🎡 Buscador ZIP: Eventos (12 Mi)" : "🎡 ZIP Finder: Local Events (12-Mi)", ez, setEz, el, setEl, "#fde047", [["🎡 Sensory & Inclusive Events","events activities"],["🌳 Accessible Parks & Rec","accessible parks"],["🤝 Family Meetups","family meetup"],["📅 Community Calendar","community events"]])}
        {rZip(es ? "🏥 Buscador ZIP: Ayuda Local (12 Mi)" : "🏥 ZIP Finder: Local Help Areas (12-Mi)", hz, setHz, hl, setHl, "#4ade80", [["🏥 Specialists & Therapy","therapy clinic"],["💬 Support Nonprofits","support nonprofit"],["🏠 Adult & Respite Care","adult care respite"],["🚑 Direct Help Centers","resource center"]])}
      </div>
      <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 14, padding: 14, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
        <div><b>📞 24/7 Hotlines:</b> <a href={`tel:${w.ph.replace(/\D/g, "")}`} style={{ color: "#fde047", fontWeight: 900, marginRight: 12 }}>{w.ph}</a> <a href="tel:988" style={{ color: "#f87171", fontWeight: 900 }}>📞 988 Crisis</a></div>
        <button onClick={() => { setCat("all"); setTab("store"); }} style={bt("#22c55e", "#000")}>🛍️ {es ? "Ver los 100 Artículos →" : "See All 100 Sanctuary Items →"}</button>
      </div></div>) : (<div>
      <div style={{ marginBottom: 10 }}><button onClick={() => setTab("info")} style={bt("#1e293b")}>← {es ? "Volver a Buscadores ZIP e Info" : "Back to Events ZIP & Local Help ZIP"}</button></div>
      <SiloItemGrid items={list} accent={w.col} calc={calcSc} onAdd={id => setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 })} onBuy={id => { setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 }); setCm("order"); setCo(true); }} /></div>)}
  </div><NexusCheckoutModal open={co} mode0={cm} store={w.en} summary={`${cnt} Item(s)`} total={tot} ship={ship} tax={tax} onClose={() => setCo(false)} onDone={() => setCart({})} /></div>); }
