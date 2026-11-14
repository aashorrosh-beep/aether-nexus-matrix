"use client";
import React, { useState } from "react";
import Link from "next/link";
import SiloItemGrid from "../../components/SiloItemGrid";
import { SHOE_INV, calcSh } from "./shoe-inventory";
import NexusCheckoutModal from "../../components/NexusCheckoutModal";
const CATS = [
  ["all","👟 All (160)"],["women","👠 Women's"],["men","👞 Men's"],
  ["sneakers","👟 Sneakers"],["running","🏃 Running"],
  ["boots","🥾 Boots"],["dress","👞 Dress & Loafers"]
];
export default function ShoeStorePage() {
  const [cat, setCat] = useState("all"), [q, setQ] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [co, setCo] = useState(false), [cm, setCm] = useState("order");
  const list = SHOE_INV.filter(x => {
    const mCat = cat === "all" ? true : cat === "women" ? x.name.startsWith("Women")
      : cat === "men" ? x.name.startsWith("Men") : x.cat === cat;
    return mCat && x.name.toLowerCase().includes(q.toLowerCase());
  });
  const ln = SHOE_INV.filter(x => (cart[x.id] ?? 0) > 0), cnt = ln.reduce((s, x) => s + cart[x.id], 0);
  const sub = +ln.reduce((s, x) => s + calcSh(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : 5.99, tax = +(sub * 0.0825).toFixed(2);
  const tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const b = (bg: string, c = "#fff") => ({ background: bg, color: c, fontWeight: 900, border: 0, borderRadius: 9, padding: "8px 12px", fontSize: 12, cursor: "pointer" });
  return (<div style={{ minHeight: "100vh", background: "#090d16", color: "#fff", padding: "16px 12px", fontFamily: "system-ui" }}><div style={{ maxWidth: 1260, margin: "0 auto" }}>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", background: "#0f172a", padding: 15, borderRadius: 14, border: "2px solid #38bdf8", marginBottom: 12 }}>
      <div><Link href="/" style={{ color: "#38bdf8", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>← ALBS NEXUS HUB</Link><h1 style={{ margin: "3px 0 0", fontSize: 20, fontWeight: 900 }}>👟 APEX SHOE VAULT • WOMEN&apos;S 5–12 • MEN&apos;S 6–15 • WIDE &amp; YOUTH</h1></div>
      <div style={{ display: "flex", gap: 8 }}><button onClick={() => { setCm("giftcard"); setCo(true); }} style={b("#facc15", "#000")}>🎁 Gift Cards</button><button onClick={() => { setCm("order"); setCo(true); }} style={b("#22c55e", "#000")}>🛒 ({cnt}) ${tot.toFixed(2)}</button></div></div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 12 }}>{CATS.map(([k, l]) => <button key={k} onClick={() => setCat(k)} style={b(cat === k ? "#0284c7" : "#1e293b")}>{l}</button>)}<input placeholder="Search sneakers, Women's, Men's, boots, loafers..." value={q} onChange={e => setQ(e.target.value)} style={{ flex: 1, minWidth: 190, background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 12 }} /></div>
    <SiloItemGrid items={list} accent="#0284c7" calc={calcSh} onAdd={id => setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 })} onBuy={id => { setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 }); setCm("order"); setCo(true); }} /></div>
  <NexusCheckoutModal open={co} mode0={cm} store="Apex Shoe Vault" summary={cnt + " Pair(s)"} total={tot} ship={ship} tax={tax} onClose={() => setCo(false)} onDone={() => setCart({})} /></div>);
}
