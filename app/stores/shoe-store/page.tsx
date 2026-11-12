"use client";
import React, { useState } from "react";
import Link from "next/link";
import SiloItemGrid from "../../components/SiloItemGrid";
import { SHOE_INV, calcSh } from "./shoe-inventory";
import NexusCheckoutModal from "../../components/NexusCheckoutModal";
const CATS = [["all","👟 All Shoes (160)"],["sneakers","👟 Sneakers"],["running","🏃 Running & Sport"],["boots","🥾 Boots & Work"],["dress","👞 Dress & Loafers"]];
const SIZES = ["US 6","US 7","US 8","US 8.5","US 9","US 9.5","US 10","US 10.5","US 11","US 12","US 13","US 14","Wide","Youth"];
export default function ShoeStorePage() {
  const [cat, setCat] = useState("all"), [q, setQ] = useState(""), [sz, setSz] = useState("US 10");
  const [cart, setCart] = useState<Record<string, number>>({}), [co, setCo] = useState(false), [cm, setCm] = useState("order");
  const list = SHOE_INV.filter(x => (cat === "all" ? true : x.cat === cat) && x.name.toLowerCase().includes(q.toLowerCase()));
  const ln = SHOE_INV.filter(x => (cart[x.id] ?? 0) > 0), cnt = ln.reduce((s, x) => s + cart[x.id], 0);
  const sub = +ln.reduce((s, x) => s + calcSh(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : 5.99, tax = +(sub * 0.0825).toFixed(2), tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const b = (bg: string, c = "#fff") => ({ background: bg, color: c, fontWeight: 900, border: 0, borderRadius: 9, padding: "8px 12px", fontSize: 12, cursor: "pointer" });
  return (<div style={{ minHeight: "100vh", background: "#090d16", color: "#fff", padding: "16px 12px", fontFamily: "system-ui" }}><div style={{ maxWidth: 1260, margin: "0 auto" }}>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", background: "#0f172a", padding: 15, borderRadius: 14, border: "2px solid #38bdf8", marginBottom: 12 }}>
      <div><Link href="/" style={{ color: "#38bdf8", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>← ALBS NEXUS HUB</Link><h1 style={{ margin: "3px 0 0", fontSize: 20, fontWeight: 900 }}>👟 NEXUS SHOE STORE</h1></div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}><select value={sz} onChange={e => setSz(e.target.value)} style={{ background: "#1e293b", color: "#fde047", border: "1px solid #38bdf8", borderRadius: 8, padding: "8px 10px", fontWeight: 800 }}>{SIZES.map(s => <option key={s} value={s}>Size: {s}</option>)}</select><button onClick={() => { setCm("giftcard"); setCo(true); }} style={b("#facc15", "#000")}>🎁 Gift Cards</button><button onClick={() => { setCm("order"); setCo(true); }} style={b("#22c55e", "#000")}>🛒 ({cnt}) ${tot.toFixed(2)}</button></div></div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 12 }}>{CATS.map(([k, l]) => <button key={k} onClick={() => setCat(k)} style={b(cat === k ? "#0284c7" : "#1e293b")}>{l}</button>)}<input placeholder="Search sneakers, running shoes, boots, loafers..." value={q} onChange={e => setQ(e.target.value)} style={{ flex: 1, minWidth: 190, background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 12 }} /></div>
    <SiloItemGrid items={list} accent="#0284c7" calc={calcSh} onAdd={id => setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 })} onBuy={id => { setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 }); setCm("order"); setCo(true); }} /></div>
  <NexusCheckoutModal open={co} mode0={cm} store="NEXUS Shoe Store" summary={`${cnt} Pair(s) • Size [${sz}]`} total={tot} ship={ship} tax={tax} onClose={() => setCo(false)} onDone={() => setCart({})} /></div>); }
