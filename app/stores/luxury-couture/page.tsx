"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiloItemGrid from "../../components/SiloItemGrid";
import { LUX_INV, calcLx } from "./luxury-inventory";
import NexusCheckoutModal from "../../components/NexusCheckoutModal";
const CATS = [["all","All 160 Suite Pieces"],["watches","⌚ Watches & Winders"],["pens","✒️ Fine Pens"],["purses","👜 Couture Purses"],["jewelry","💎 Vault & Humidors"]];
export default function LuxurySuitesSilo() {
  const [cat, setCat] = useState("all"), [q, setQ] = useState(""), [monoOpen, setMonoOpen] = useState(false);
  const [mono, setMono] = useState(""), [monoSaved, setMonoSaved] = useState("");
  const [ang, setAng] = useState<Record<string, number>>({}), [reelId, setReelId] = useState(""), [tick, setTick] = useState(0), [specId, setSpecId] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({}), [coOpen, setCoOpen] = useState(false), [coMode, setCoMode] = useState("order");
  useEffect(() => { if (!reelId) return; const t = setInterval(() => setTick(s => s > 1 ? 0 : s + 1), 1300); return () => clearInterval(t); }, [reelId]);
  const list = LUX_INV.filter(x => (cat === "all" ? true : x.cat === cat) && x.name.toLowerCase().includes(q.toLowerCase()));
  const lines = LUX_INV.filter(x => (cart[x.id] ? cart[x.id] : 0) > 0), cnt = lines.reduce((s, x) => s + cart[x.id], 0);
  const sub = +lines.reduce((s, x) => s + calcLx(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : sub < 250 ? 5.99 : sub < 500 ? 9.99 : 14.99;
  const tax = +(sub * 0.0825).toFixed(2), tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const spec = LUX_INV.find(x => x.id === specId);
  return (<div style={{ minHeight: "100vh", background: "#09090b", color: "#f8fafc", padding: "18px 14px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", background: "linear-gradient(90deg,#1c1917,#422006,#09090b)", padding: 16, borderRadius: 16, border: "1px solid #eab308", marginBottom: 14 }}>
          <div><Link href="/" style={{ color: "#fde047", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>← ALBS NEXUS HUB</Link><h1 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 900 }}>⌚ LUXURY SUITES • WATCHES, PENS & COUTURE</h1></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}><button onClick={() => setMonoOpen(!monoOpen)} style={{ background: "#ca8a04", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>✒️ {monoOpen ? "Hide Engraving" : "Free VIP Monogram"}</button><button onClick={() => { setCoMode("giftcard"); setCoOpen(true); }} style={{ background: "#facc15", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🎁 Gift Cards ($0 Ship)</button><button onClick={() => { setCoMode("order"); setCoOpen(true); }} style={{ background: "#22c55e", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🛒 Private Vault ({cnt}) • ${tot.toFixed(2)}</button></div>
        </div>
        {monoOpen ? (<div style={{ background: "#18181b", border: "1px solid #eab308", borderRadius: 14, padding: 12, marginBottom: 14, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}><span style={{ fontWeight: 900, color: "#fde047" }}>✒️ COMPLIMENTARY GOLD-FOIL / LASER MONOGRAM & PROVENANCE CARD:</span><input maxLength={6} value={mono} onChange={e => setMono(e.target.value.toUpperCase())} placeholder="Initials (e.g. A.A.S)" style={{ background: "#09090b", border: "1px solid #52525b", color: "#fff", padding: 8, borderRadius: 8 }} /><button onClick={() => setMonoSaved(mono ? mono : "VIP")} style={{ background: "#eab308", color: "#000", fontWeight: 900, border: 0, borderRadius: 8, padding: "8px 14px", cursor: "pointer" }}>Lock Monogram</button>{monoSaved ? <span style={{ color: "#4ade80", fontWeight: 800 }}>✓ Attached to Order: [{monoSaved}]</span> : null}</div>) : null}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>{CATS.map(([k, lbl]) => <button key={k} onClick={() => setCat(k)} style={{ padding: "8px 12px", borderRadius: 999, border: 0, fontWeight: 800, fontSize: 12, cursor: "pointer", background: cat === k ? "#ca8a04" : "#1e293b", color: cat === k ? "#000" : "#fff" }}>{lbl}</button>)}<input placeholder="Search tourbillon watches, fountain pens, quilted purses, humidors..." value={q} onChange={e => setQ(e.target.value)} style={{ flex: 1, minWidth: 210, background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 12 }} /></div>
        <SiloItemGrid items={list} accent="#ca8a04" calc={calcLx} onAdd={id => setCart({ ...cart, [id]: (cart[id] ? cart[id] : 0) + 1 })} onBuy={id => { setCart({ ...cart, [id]: (cart[id] ? cart[id] : 0) + 1 }); setCoMode("order"); setCoOpen(true); }} />
    </div>
    <NexusCheckoutModal open={coOpen} mode0={coMode} store="Luxury Suites" summary={`${cnt} Piece(s)${monoSaved ? " • Monogram [" + monoSaved + "]" : ""} • Sub $${sub.toFixed(2)}`} total={tot} ship={ship} tax={tax} onClose={() => setCoOpen(false)} onDone={() => setCart({})} />
    </div>); }
