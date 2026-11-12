"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiloItemGrid from "../components/SiloItemGrid";
import { NOST_INV, calcWf } from "./nostalgia-inventory";
import NexusCheckoutModal from "../components/NexusCheckoutModal";
const CATS = [["all","All 160 Fair & Grail SKUs"],["worldsfair","🌐 1964 World's Fair"],["grails","🪙 Coins, Medals & Slabs"],["arcade","🕹️ 80s–90s Arcade & Audio"],["diner","🥤 Classic Diner & Neon"]];
export default function WorldsFairSilo() {
  const [cat, setCat] = useState("all"), [q, setQ] = useState(""), [hunt, setHunt] = useState(""), [huntId, setHuntId] = useState("");
  const [ang, setAng] = useState<Record<string, number>>({}), [reelId, setReelId] = useState(""), [tick, setTick] = useState(0), [specId, setSpecId] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({}), [coOpen, setCoOpen] = useState(false), [coMode, setCoMode] = useState("order");
  useEffect(() => { if (!reelId) return; const t = setInterval(() => setTick(s => s > 1 ? 0 : s + 1), 1300); return () => clearInterval(t); }, [reelId]);
  const list = NOST_INV.filter(x => (cat === "all" ? true : x.cat === cat) && x.name.toLowerCase().includes(q.toLowerCase()));
  const lines = NOST_INV.filter(x => (cart[x.id] ? cart[x.id] : 0) > 0), cnt = lines.reduce((s, x) => s + cart[x.id], 0);
  const sub = +lines.reduce((s, x) => s + calcWf(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : sub < 250 ? 5.99 : sub < 500 ? 9.99 : 14.99;
  const tax = +(sub * 0.0825).toFixed(2), tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const spec = NOST_INV.find(x => x.id === specId);
  return (<div style={{ minHeight: "100vh", background: "#0d0a07", color: "#f8fafc", padding: "18px 14px", fontFamily: "system-ui, sans-serif" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", background: "linear-gradient(90deg,#78350f,#1e3a8a,#1c1917)", padding: 16, borderRadius: 16, border: "1px solid #f59e0b", marginBottom: 12 }}>
        <div><Link href="/" style={{ color: "#fde68a", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>← ALBS NEXUS HUB</Link><h1 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 900 }}>🌐 1964 WORLD&apos;S FAIR • 60s–90s GRAILS & REPLICAS</h1></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Link href="/nostalgia/concierge" style={{ background: "#0284c7", color: "#fff", fontWeight: 900, borderRadius: 10, padding: "9px 14px", textDecoration: "none", fontSize: 13 }}>🕵️ 3-Hr AI Concierge (24-Hr Hold) →</Link>
          <button onClick={() => { setCoMode("giftcard"); setCoOpen(true); }} style={{ background: "#facc15", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🎁 Gift Cards ($0 Ship)</button>
          <button onClick={() => { setCoMode("order"); setCoOpen(true); }} style={{ background: "#22c55e", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🛒 Vault ({cnt}) • ${tot.toFixed(2)}</button>
        </div>
      </div>
      <div style={{ background: "#1c1917", border: "1px solid #78350f", borderRadius: 12, padding: 10, marginBottom: 14, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}><span style={{ fontWeight: 900, color: "#fbbf24", fontSize: 12 }}>🔎 QUICK GRAIL BOUNTY (COINS • PSA SLABS • 60s–90s MEMORABILIA):</span><input value={hunt} onChange={e => setHunt(e.target.value)} placeholder="Describe rare year, coin, card, or replica..." style={{ flex: 1, minWidth: 200, background: "#09090b", border: "1px solid #44403c", color: "#fff", padding: "7px 10px", borderRadius: 8, fontSize: 12 }} /><button onClick={() => setHuntId(hunt ? "HUNT-" + Date.now().toString(36).toUpperCase() : "")} style={{ background: "#f59e0b", color: "#000", fontWeight: 900, border: 0, borderRadius: 8, padding: "7px 12px", cursor: "pointer" }}>Dispatch 3-Hr Search</button>{huntId ? <span style={{ color: "#4ade80", fontWeight: 800, fontSize: 12 }}>✓ Active Ticket #{huntId} (24-Hr Hold)</span> : null}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>{CATS.map(([k, lbl]) => <button key={k} onClick={() => setCat(k)} style={{ padding: "8px 12px", borderRadius: 999, border: 0, fontWeight: 800, fontSize: 12, cursor: "pointer", background: cat === k ? "#d97706" : "#1e293b", color: "#fff" }}>{lbl}</button>)}<input placeholder="Search Unisphere, bronze medals, silver coins, slabs, arcade, neon..." value={q} onChange={e => setQ(e.target.value)} style={{ flex: 1, minWidth: 210, background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 12 }} /></div>
      <SiloItemGrid items={list} accent="#d97706" calc={calcWf} onAdd={id => setCart({ ...cart, [id]: (cart[id] ? cart[id] : 0) + 1 })} onBuy={id => { setCart({ ...cart, [id]: (cart[id] ? cart[id] : 0) + 1 }); setCoMode("order"); setCoOpen(true); }} />
    </div>
    <NexusCheckoutModal open={coOpen} mode0={coMode} store="1964 World's Fair Vault" summary={`${cnt} Grail(s) • Sub $${sub.toFixed(2)}`} total={tot} ship={ship} tax={tax} onClose={() => setCoOpen(false)} onDone={() => setCart({})} />
  </div>); }
