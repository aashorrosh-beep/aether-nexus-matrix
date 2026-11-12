"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiloItemGrid from "../../components/SiloItemGrid";
import { SQUISH_INV, calcSq } from "./squish-inventory";
import NexusCheckoutModal from "../../components/NexusCheckoutModal";
const CATS = [["all","All 200 Craze SKUs"],["stuffer","🧦 Stocking Stuffers ($11–$25)"],["blindbox","🎁 Blind Boxes ($25–$68)"],["jumbo","🧸 Jumbo Plush ($62–$155)"],["vault","📦 Sealed Cases ($175+)"]];
export default function SquishVaultSilo() {
  const [cat, setCat] = useState("all"), [q, setQ] = useState(""), [ang, setAng] = useState<Record<string, number>>({});
  const [reelId, setReelId] = useState(""), [tick, setTick] = useState(0), [specId, setSpecId] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({}), [coOpen, setCoOpen] = useState(false), [coMode, setCoMode] = useState("order");
  useEffect(() => { if (!reelId) return; const t = setInterval(() => setTick(s => s > 1 ? 0 : s + 1), 1300); return () => clearInterval(t); }, [reelId]);
  const list = SQUISH_INV.filter(x => (cat === "all" ? true : x.cat === cat) && x.name.toLowerCase().includes(q.toLowerCase()));
  const lines = SQUISH_INV.filter(x => (cart[x.id] ? cart[x.id] : 0) > 0);
  const cnt = lines.reduce((s, x) => s + cart[x.id], 0);
  const sub = +lines.reduce((s, x) => s + calcSq(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : sub < 250 ? 5.99 : sub < 500 ? 9.99 : 14.99;
  const tax = +(sub * 0.0825).toFixed(2), tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const spec = SQUISH_INV.find(x => x.id === specId);
  return (
    <div style={{ minHeight: "100vh", background: "#090d16", color: "#f8fafc", padding: "18px 14px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", background: "linear-gradient(90deg,#3b0764,#831843,#1e1b4b)", padding: 16, borderRadius: 16, border: "1px solid #f472b6", marginBottom: 14 }}>
          <div><Link href="/" style={{ color: "#f9a8d4", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>← ALBS NEXUS HUB</Link><h1 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 900 }}>🧸 SQUISH & BLIND VAULT • 200 HOLIDAY CRAZE</h1></div>
          <div style={{ display: "flex", gap: 8 }}><button onClick={() => { setCoMode("giftcard"); setCoOpen(true); }} style={{ background: "#facc15", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🎁 Gift Cards ($0 Ship)</button><button onClick={() => { setCoMode("order"); setCoOpen(true); }} style={{ background: "#22c55e", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🛒 Checkout ({cnt}) • ${tot.toFixed(2)}</button></div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>{CATS.map(([k, lbl]) => <button key={k} onClick={() => setCat(k)} style={{ padding: "8px 12px", borderRadius: 999, border: 0, fontWeight: 800, fontSize: 12, cursor: "pointer", background: cat === k ? "#ec4899" : "#1e293b", color: "#fff" }}>{lbl}</button>)}<input placeholder="Search 200 plush, blind boxes, stocking stuffers..." value={q} onChange={e => setQ(e.target.value)} style={{ flex: 1, minWidth: 210, background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 12 }} /></div>
        <SiloItemGrid items={list} accent="#ec4899" calc={calcSq} onAdd={id => setCart({ ...cart, [id]: (cart[id] ? cart[id] : 0) + 1 })} onBuy={id => { setCart({ ...cart, [id]: (cart[id] ? cart[id] : 0) + 1 }); setCoMode("order"); setCoOpen(true); }} />
    </div>
    <NexusCheckoutModal open={coOpen} mode0={coMode} store="Squish & Blind Vault" summary={`${cnt} Item(s) • Sub $${sub.toFixed(2)}`} total={tot} ship={ship} tax={tax} onClose={() => setCoOpen(false)} onDone={() => setCart({})} />
    </div>); }
