"use client";
import React, { useState } from "react";
import Link from "next/link";
import SiloItemGrid from "../components/SiloItemGrid";
import NexusCheckoutModal from "../components/NexusCheckoutModal";
import { STADIUM_INV, calcSt } from "./stadium-inventory";
const CATS = [
  ["all","🏟️ All (180)"],["football","🏈 Football"],
  ["basketball","🏀 Basketball"],["golf","⛳ Golf & Pickleball"],
  ["combat","🥊 Combat & Fitness"],["atv","🏍️ ATVs & Off-Road"],
  ["fishing","🎣 Fishing & Camping"]
];
export default function StadiumSilo({ defCat = "all" }: { defCat?: string }) {
  const [cat, setCat] = useState(defCat), [q, setQ] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [co, setCo] = useState(false), [cm, setCm] = useState("order");
  const list = STADIUM_INV.filter(x => (cat === "all" ? true : x.cat === cat) && x.name.toLowerCase().includes(q.toLowerCase()));
  const ln = STADIUM_INV.filter(x => (cart[x.id] ?? 0) > 0), cnt = ln.reduce((s, x) => s + cart[x.id], 0);
  const sub = +ln.reduce((s, x) => s + calcSt(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : 7.99, tax = +(sub * 0.0825).toFixed(2);
  const tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const bt = (b: string, c = "#fff") => ({ background: b, color: c, fontWeight: 900, border: 0, borderRadius: 9, padding: "8px 12px", fontSize: 12, cursor: "pointer" });
  return (<div style={{ minHeight: "100vh", background: "#041008", color: "#fff", padding: "16px 12px", fontFamily: "system-ui" }}><div style={{ maxWidth: 1260, margin: "0 auto" }}>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", background: "#064e3b", padding: 15, borderRadius: 16, border: "2px solid #22c55e", marginBottom: 12 }}>
      <div><Link href="/" style={{ color: "#86efac", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>← ALBS NEXUS HUB</Link><h1 style={{ margin: "3px 0 0", fontSize: 20, fontWeight: 900 }}>🏟️ ALBS NEXUS STADIUM • JERSEYS, HATS, SWEATERS, CLEATS &amp; PRO GEAR</h1></div>
      <div style={{ display: "flex", gap: 8 }}><button onClick={() => { setCm("giftcard"); setCo(true); }} style={bt("#facc15", "#000")}>🎁 Gift Cards</button><button onClick={() => { setCm("order"); setCo(true); }} style={bt("#22c55e", "#000")}>🛒 ({cnt}) ${tot.toFixed(2)}</button></div></div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>{CATS.map(([k, l]) => <button key={k} onClick={() => setCat(k)} style={bt(cat === k ? "#16a34a" : "#1e293b")}>{l}</button>)}<input value={q} onChange={e => setQ(e.target.value)} placeholder="Search jerseys, fitted hats, sweaters, cleats, helmets, gloves..." style={{ flex: 1, minWidth: 200, background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 12 }} /></div>
    <SiloItemGrid items={list} accent="#16a34a" calc={calcSt} onAdd={id => setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 })} onBuy={id => { setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 }); setCm("order"); setCo(true); }} />
  </div><NexusCheckoutModal open={co} mode0={cm} store="ALBS Nexus Stadium" summary={cnt + " Item(s)"} total={tot} ship={ship} tax={tax} onClose={() => setCo(false)} onDone={() => setCart({})} /></div>);
}
