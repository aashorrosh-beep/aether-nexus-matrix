"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiloItemGrid from "../components/SiloItemGrid";
import { STAD_INV, calcSt } from "./stadium-inventory";
import NexusCheckoutModal from "../components/NexusCheckoutModal";
const CATS = [["all","All 180 Stadium SKUs"],["football","🏈 Football"],["golf","⛳ Golf & Pickleball"],["basketball","🏀 Basketball"],["combat","🥊 Combat & Gym"],["outdoor","🎣 Fishing & Camp"],["offroad","🛞 ATVs & Offroad"]];
const FITS = ["Adult Pro Standard","Collegiate / Varsity","Youth / Junior Spec","Team Bulk Pack"];
export default function StadiumSilo({ initialCat = "all" }: { initialCat?: string }) {
  const [cat, setCat] = useState(initialCat), [q, setQ] = useState(""), [fit, setFit] = useState(FITS[0]);
  const [ang, setAng] = useState<Record<string, number>>({}), [reelId, setReelId] = useState(""), [tick, setTick] = useState(0), [specId, setSpecId] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({}), [coOpen, setCoOpen] = useState(false), [coMode, setCoMode] = useState("order");
  useEffect(() => { if (!reelId) return; const t = setInterval(() => setTick(s => s > 1 ? 0 : s + 1), 1300); return () => clearInterval(t); }, [reelId]);
  const list = STAD_INV.filter(x => (cat === "all" ? true : x.cat === cat) && x.name.toLowerCase().includes(q.toLowerCase()));
  const lines = STAD_INV.filter(x => (cart[x.id] ? cart[x.id] : 0) > 0), cnt = lines.reduce((s, x) => s + cart[x.id], 0);
  const sub = +lines.reduce((s, x) => s + calcSt(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : sub < 250 ? 5.99 : sub < 500 ? 9.99 : 14.99;
  const tax = +(sub * 0.0825).toFixed(2), tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const spec = STAD_INV.find(x => x.id === specId);
  return (<div style={{ minHeight: "100vh", background: "#06100c", color: "#f8fafc", padding: "18px 14px", fontFamily: "system-ui, sans-serif" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", background: "linear-gradient(90deg,#064e3b,#1e3a8a,#0f172a)", padding: 16, borderRadius: 16, border: "1px solid #22c55e", marginBottom: 14 }}>
        <div><Link href="/" style={{ color: "#86efac", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>← ALBS NEXUS HUB</Link><h1 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 900 }}>🏟️ ALBS NEXUS STADIUM • 180 PRO SPORTS & OUTDOOR</h1></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <select value={fit} onChange={e => setFit(e.target.value)} style={{ background: "#0f172a", color: "#fde047", border: "1px solid #22c55e", borderRadius: 10, padding: "8px 10px", fontWeight: 800 }}>{FITS.map(f => <option key={f} value={f}>Spec: {f}</option>)}</select>
          <button onClick={() => { setCoMode("giftcard"); setCoOpen(true); }} style={{ background: "#facc15", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🎁 Gift Cards ($0 Ship)</button>
          <button onClick={() => { setCoMode("order"); setCoOpen(true); }} style={{ background: "#22c55e", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🛒 Locker ({cnt}) • ${tot.toFixed(2)}</button>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>{CATS.map(([k, lbl]) => <button key={k} onClick={() => setCat(k)} style={{ padding: "8px 12px", borderRadius: 999, border: 0, fontWeight: 800, fontSize: 12, cursor: "pointer", background: cat === k ? "#16a34a" : "#1e293b", color: "#fff" }}>{lbl}</button>)}<input placeholder="Search football, golf, pickleball, hoops, gym, fishing, ATV..." value={q} onChange={e => setQ(e.target.value)} style={{ flex: 1, minWidth: 210, background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 12 }} /></div>
      <SiloItemGrid items={list} accent="#16a34a" calc={calcSt} onAdd={id => setCart({ ...cart, [id]: (cart[id] ? cart[id] : 0) + 1 })} onBuy={id => { setCart({ ...cart, [id]: (cart[id] ? cart[id] : 0) + 1 }); setCoMode("order"); setCoOpen(true); }} />
    </div>
    <NexusCheckoutModal open={coOpen} mode0={coMode} store="ALBS Nexus Stadium" summary={`${cnt} Item(s) • Spec [${fit}] • Sub $${sub.toFixed(2)}`} total={tot} ship={ship} tax={tax} onClose={() => setCoOpen(false)} onDone={() => setCart({})} />
  </div>); }
