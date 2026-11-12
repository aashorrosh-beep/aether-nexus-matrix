"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { EMERG_INV, calcEm } from "./emergency-inventory";
import NexusCheckoutModal from "../../components/NexusCheckoutModal";
const CATS = [["all","All 160 Readiness SKUs"],["power","⚡ Generators & Power"],["flood","🌊 Flood & Hurricane"],["water","💧 Water & Rations"],["trauma","🧰 Trauma & Go-Bags"]];
export default function EmergencyReadySilo() {
  const [cat, setCat] = useState("all"), [q, setQ] = useState(""), [ang, setAng] = useState<Record<string, number>>({});
  const [reelId, setReelId] = useState(""), [tick, setTick] = useState(0), [specId, setSpecId] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({}), [coOpen, setCoOpen] = useState(false), [coMode, setCoMode] = useState("order");
  useEffect(() => { if (!reelId) return; const t = setInterval(() => setTick(s => s > 1 ? 0 : s + 1), 1300); return () => clearInterval(t); }, [reelId]);
  const list = EMERG_INV.filter(x => (cat === "all" ? true : x.cat === cat) && x.name.toLowerCase().includes(q.toLowerCase()));
  const lines = EMERG_INV.filter(x => (cart[x.id] ? cart[x.id] : 0) > 0);
  const cnt = lines.reduce((s, x) => s + cart[x.id], 0);
  const sub = +lines.reduce((s, x) => s + calcEm(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : sub < 250 ? 5.99 : sub < 500 ? 9.99 : 14.99;
  const tax = +(sub * 0.0825).toFixed(2), tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const spec = EMERG_INV.find(x => x.id === specId);
  return (
    <div style={{ minHeight: "100vh", background: "#0b0f19", color: "#f8fafc", padding: "18px 14px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", background: "linear-gradient(90deg,#7c2d12,#991b1b,#1e293b)", padding: 16, borderRadius: 16, border: "2px solid #f59e0b", marginBottom: 14 }}>
          <div><Link href="/" style={{ color: "#fcd34d", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>← ALBS NEXUS HUB</Link><h1 style={{ margin: "4px 0 0", fontSize: 21, fontWeight: 900 }}>🚨 NEXUS: ALWAYS BE READY • EMERGENCY STORE</h1><div style={{ fontSize: 11, color: "#fde68a" }}>Anti-Gouging 6–10 Margin Lock • Generators • Hurricane & Flood • Water • Trauma</div></div>
          <div style={{ display: "flex", gap: 8 }}><button onClick={() => { setCoMode("giftcard"); setCoOpen(true); }} style={{ background: "#facc15", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🎁 Gift Cards ($0 Ship)</button><button onClick={() => { setCoMode("order"); setCoOpen(true); }} style={{ background: "#22c55e", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🛒 Dispatch ({cnt}) • ${tot.toFixed(2)}</button></div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>{CATS.map(([k, lbl]) => <button key={k} onClick={() => setCat(k)} style={{ padding: "8px 12px", borderRadius: 999, border: 0, fontWeight: 800, fontSize: 12, cursor: "pointer", background: cat === k ? "#ea580c" : "#1e293b", color: "#fff" }}>{lbl}</button>)}<input placeholder="Search generators, flood barriers, water filters, solar, rations..." value={q} onChange={e => setQ(e.target.value)} style={{ flex: 1, minWidth: 210, background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 12 }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(255px, 1fr))", gap: 14 }}>
          {list.map(x => { const m = calcEm(x.w, x.ship), k = reelId === x.id ? tick : (ang[x.id] ? ang[x.id] : 0); return (
            <div key={x.id} style={{ background: "#111827", border: "1px solid #374151", borderRadius: 14, padding: 10, display: "flex", flexDirection: "column", gap: 7 }}>
              <div style={{ position: "relative", height: 185, borderRadius: 10, overflow: "hidden", background: "#020617", display: "flex" }}><img src={x.imgs[k]} alt={x.name} referrerPolicy="no-referrer" style={{ objectFit: "cover", height: 185, flex: 1 }} /><span style={{ position: "absolute", top: 6, left: 6, background: x.stock < 9 ? "#dc2626" : "#d97706", padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 900 }}>{x.stock < 9 ? `⚡ PRIORITY: ${x.stock} LEFT` : x.badge}</span><button onClick={() => setReelId(reelId === x.id ? "" : x.id)} style={{ position: "absolute", bottom: 6, right: 6, background: "#0f172a", color: "#fbbf24", border: "1px solid #fbbf24", borderRadius: 6, fontSize: 10, fontWeight: 800, padding: "3px 7px", cursor: "pointer" }}>{reelId === x.id ? `● REEL ${k+1}/3` : "▶ 3-Angle Reel"}</button></div>
              <div style={{ display: "flex", gap: 5 }}>{[0, 1, 2].map(i => <img key={i} src={x.imgs[i]} alt="" referrerPolicy="no-referrer" onClick={() => { setReelId(""); setAng({ ...ang, [x.id]: i }); }} style={{ height: 42, flex: 1, objectFit: "cover", borderRadius: 6, cursor: "pointer", border: k === i ? "2px solid #f59e0b" : "1px solid #334155" }} />)}</div>
              <div style={{ fontWeight: 800, fontSize: 13, minHeight: 34 }}>{x.name}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}><span style={{ fontSize: 17, fontWeight: 900, color: "#4ade80" }}>${m.r.toFixed(2)}</span><button onClick={() => setSpecId(x.id)} style={{ background: "#1e293b", color: "#fde047", border: 0, borderRadius: 6, padding: "4px 8px", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>📋 Specs</button></div>
              <div style={{ display: "flex", gap: 6 }}><button onClick={() => setCart({ ...cart, [x.id]: (cart[x.id] ? cart[x.id] : 0) + 1 })} style={{ flex: 1, background: "#334155", color: "#fff", border: 0, borderRadius: 8, padding: 8, fontWeight: 800, cursor: "pointer" }}>+ Stage</button><button onClick={() => { setCart({ ...cart, [x.id]: (cart[x.id] ? cart[x.id] : 0) + 1 }); setCoMode("order"); setCoOpen(true); }} style={{ flex: 1, background: "#ea580c", color: "#fff", border: 0, borderRadius: 8, padding: 8, fontWeight: 900, cursor: "pointer" }}>Dispatch →</button></div>
            </div>); })}
        </div>
      </div>
      {spec ? (<div onClick={() => setSpecId("")} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 14 }}><div onClick={e => e.stopPropagation()} style={{ background: "#0f172a", border: "2px solid #f59e0b", borderRadius: 14, maxWidth: 480, flex: 1, padding: 16, fontSize: 12 }}><div style={{ fontWeight: 900, color: "#fbbf24", marginBottom: 8 }}>🚨 {spec.id} • {spec.name}</div><div style={{ display: "flex", gap: 6, marginBottom: 8 }}>{[0, 1, 2].map(i => <img key={i} src={spec.imgs[i]} alt="" referrerPolicy="no-referrer" style={{ height: 85, flex: 1, objectFit: "cover", borderRadius: 6 }} />)}</div><div>Sector: {spec.badge} • Ready Stock: {spec.stock} • Landed Retail: ${calcEm(spec.w, spec.ship).r.toFixed(2)}</div><button onClick={() => setSpecId("")} style={{ marginTop: 10, background: "#ea580c", color: "#fff", border: 0, borderRadius: 8, padding: "6px 14px", fontWeight: 800 }}>Close</button></div></div>) : null}
      <NexusCheckoutModal open={coOpen} mode0={coMode} store="NEXUS Always Be Ready" summary={`${cnt} Item(s) • Sub $${sub.toFixed(2)}`} total={tot} ship={ship} tax={tax} onClose={() => setCoOpen(false)} onDone={() => setCart({})} />
    </div>); }
