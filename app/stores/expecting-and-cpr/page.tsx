"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiloItemGrid from "../../components/SiloItemGrid";
import { MAT_INV, calcMc } from "./maternity-inventory";
import NexusCheckoutModal from "../../components/NexusCheckoutModal";
const CATS = [["all","All 160 Nursery SKUs"],["nursery","🛏️ Cribs & Nursery"],["strollers","👶 Strollers & Travel"],["feeding","🍼 Pumps & Mom Care"],["safety","🫀 Baby Safety & CPR"]];
const STEPS = ["1. Tap foot & shout; call 911 on speaker immediately","2. Infant CPR: 30 two-finger center-chest compressions (1.5 in deep, 100-120/min)","3. Give 2 gentle puffs covering nose & mouth (neutral head position)","4. Choking Infant: 5 firm back slaps face-down + 5 two-finger chest thrusts"];
export default function MaternityCprSilo() {
  const [cat, setCat] = useState("all"), [q, setQ] = useState(""), [cprOpen, setCprOpen] = useState(false);
  const [pName, setPName] = useState(""), [cert, setCert] = useState("");
  const [ang, setAng] = useState<Record<string, number>>({}), [reelId, setReelId] = useState(""), [tick, setTick] = useState(0), [specId, setSpecId] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({}), [coOpen, setCoOpen] = useState(false), [coMode, setCoMode] = useState("order");
  useEffect(() => { if (!reelId) return; const t = setInterval(() => setTick(s => s > 1 ? 0 : s + 1), 1300); return () => clearInterval(t); }, [reelId]);
  const list = MAT_INV.filter(x => (cat === "all" ? true : x.cat === cat) && x.name.toLowerCase().includes(q.toLowerCase()));
  const lines = MAT_INV.filter(x => (cart[x.id] ? cart[x.id] : 0) > 0), cnt = lines.reduce((s, x) => s + cart[x.id], 0);
  const sub = +lines.reduce((s, x) => s + calcMc(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : sub < 250 ? 5.99 : sub < 500 ? 9.99 : 14.99;
  const tax = +(sub * 0.0825).toFixed(2), tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const spec = MAT_INV.find(x => x.id === specId);
  return (
    <div style={{ minHeight: "100vh", background: "#071318", color: "#f8fafc", padding: "18px 14px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", background: "linear-gradient(90deg,#0f766e,#0369a1,#1e293b)", padding: 16, borderRadius: 16, border: "1px solid #38bdf8", marginBottom: 14 }}>
          <div><Link href="/" style={{ color: "#bae6fd", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>← ALBS NEXUS HUB</Link><h1 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 900 }}>👶 MATERNITY, NURSERY & FREE INFANT CPR</h1></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}><button onClick={() => setCprOpen(!cprOpen)} style={{ background: "#f43f5e", color: "#fff", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🫀 {cprOpen ? "Hide CPR Course" : "Free Infant CPR Cert ($0)"}</button><button onClick={() => { setCoMode("giftcard"); setCoOpen(true); }} style={{ background: "#facc15", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🎁 Gift Cards ($0 Ship)</button><button onClick={() => { setCoMode("order"); setCoOpen(true); }} style={{ background: "#22c55e", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🛒 Registry Cart ({cnt}) • ${tot.toFixed(2)}</button></div>
        </div>
        {cprOpen ? (<div style={{ background: "#0f172a", border: "2px solid #f43f5e", borderRadius: 12, padding: 12, marginBottom: 12 }}>{STEPS.map(s => <div key={s} style={{ fontSize: 12, marginBottom: 4 }}>{s}</div>)}</div>) : null}
<SiloItemGrid items={list} accent="#0284c7" calc={calcMc} onAdd={id => setCart({ ...cart, [id]: (cart[id] ? cart[id] : 0) + 1 })} onBuy={id => { setCart({ ...cart, [id]: (cart[id] ? cart[id] : 0) + 1 }); setCoMode("order"); setCoOpen(true); }} />
    </div>
    <NexusCheckoutModal open={coOpen} mode0={coMode} store="Maternity & Free CPR" summary={`${cnt} Item(s) • Sub $${sub.toFixed(2)}`} total={tot} ship={ship} tax={tax} onClose={() => setCoOpen(false)} onDone={() => setCart({})} />
    </div>); }
