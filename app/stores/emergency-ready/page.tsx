"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiloItemGrid from "../../components/SiloItemGrid";
import { EMERG_INV, calcEm } from "./emergency-inventory";
import NexusCheckoutModal from "../../components/NexusCheckoutModal";
const CATS = [["all","🚨 All"],["flood","🌊 Floods"],["hurricane","🌀 Hurricanes"],["fire","🔥 Fires"],["water","💧 Water"],["rescue","🧰 Rescue"]];
export default function EmergencySuperstore() {
  const [cat, setCat] = useState("all"), [q, setQ] = useState(""), [own, setOwn] = useState(false);
  const [cut, setCut] = useState<Record<string, boolean>>({}), [cart, setCart] = useState<Record<string, number>>({});
  const [co, setCo] = useState(false), [cm, setCm] = useState("order");
  useEffect(() => { try { const s = localStorage.getItem("em_cut"); if (s) setCut(JSON.parse(s)); } catch {} }, []);
  const tog = (id: string) => { const n = { ...cut, [id]: !cut[id] }; setCut(n); localStorage.setItem("em_cut", JSON.stringify(n)); };
  const list = EMERG_INV.filter(x => (own ? true : !cut[x.id]) && (cat === "all" ? true : x.cat === cat) && x.name.toLowerCase().includes(q.toLowerCase()));
  const ln = EMERG_INV.filter(x => (cart[x.id] ?? 0) > 0), cnt = ln.reduce((s, x) => s + cart[x.id], 0);
  const sub = +ln.reduce((s, x) => s + calcEm(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : sub < 250 ? 5.99 : 9.99, tax = +(sub * 0.0825).toFixed(2), tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const b = (bg: string, c = "#fff") => ({ background: bg, color: c, fontWeight: 900, border: 0, borderRadius: 9, padding: "8px 12px", fontSize: 12, cursor: "pointer" });
  return (<div style={{ minHeight: "100vh", background: "#090c14", color: "#fff", padding: "16px 12px", fontFamily: "system-ui" }}><div style={{ maxWidth: 1260, margin: "0 auto" }}>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", background: "#7f1d1d", padding: 15, borderRadius: 14, border: "2px solid #f59e0b", marginBottom: 12 }}>
      <div><Link href="/" style={{ color: "#fde047", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>← ALBS NEXUS HUB</Link><h1 style={{ margin: "3px 0 0", fontSize: 20, fontWeight: 900 }}>🚨 EMERGENCY SUPERSTORE • FLOODS, HURRICANES & FIRES</h1></div>
      <div style={{ display: "flex", gap: 8 }}><button onClick={() => setOwn(!own)} style={b("#1e293b")}>{own ? "👑 ON" : "👑 Cut"}</button><button onClick={() => { setCm("giftcard"); setCo(true); }} style={b("#facc15", "#000")}>🎁 Gift Cards</button><button onClick={() => { setCm("order"); setCo(true); }} style={b("#22c55e", "#000")}>🛒 ({cnt}) ${tot.toFixed(2)}</button></div></div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 12 }}>{CATS.map(([k, l]) => <button key={k} onClick={() => setCat(k)} style={b(cat === k ? "#ea580c" : "#1e293b")}>{l}</button>)}<input placeholder="Search flood, fire, generator, eclipse..." value={q} onChange={e => setQ(e.target.value)} style={{ flex: 1, minWidth: 190, background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 12 }} /></div>
    <SiloItemGrid items={list} accent="#ea580c" calc={calcEm} onAdd={id => setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 })} onBuy={id => { setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 }); setCm("order"); setCo(true); }} owner={own} cut={cut} onCut={tog} /></div>
  <NexusCheckoutModal open={co} mode0={cm} store="Emergency Superstore" summary={`${cnt} Item(s)`} total={tot} ship={ship} tax={tax} onClose={() => setCo(false)} onDone={() => setCart({})} /></div>); }
