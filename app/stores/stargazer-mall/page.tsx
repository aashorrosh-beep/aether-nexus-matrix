"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiloItemGrid from "../../components/SiloItemGrid";
import { STAR_INV, calcSg } from "./stargazer-inventory";
import NexusCheckoutModal from "../../components/NexusCheckoutModal";
const CATS = [["all","All 160 Sky & Auto SKUs"],["telescopes","🔭 Telescopes"],["astro","🌌 Astro Cameras & Mounts"],["detailing","🚘 Pro Auto Detailing"],["garage","🏎️ Track & Garage Tech"]];
const GUIDES = [["City Sky (Bortle 7-9)","Pair GoTo Cassegrain + Light-Pollution Nebula Filter (SG-001 + SG-044)"],["Dark Sky (Bortle 1-4)","Pair 10-In Dobsonian + 2-In Eyepiece Case (SG-002 + SG-043)"],["Black / Dark Clearcoat","Pair 9H Graphene Ceramic + 15mm Dual-Action Polisher (SG-083 + SG-084)"],["Track & Daily Performance","Pair Spot-Free Deionizer + Foam Cannon + 4K Dashcam (SG-085 + SG-121)"]];
export default function StargazerAutoSilo() {
  const [cat, setCat] = useState("all"), [q, setQ] = useState(""), [guideOpen, setGuideOpen] = useState(false), [gIdx, setGIdx] = useState(0);
  const [ang, setAng] = useState<Record<string, number>>({}), [reelId, setReelId] = useState(""), [tick, setTick] = useState(0), [specId, setSpecId] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({}), [coOpen, setCoOpen] = useState(false), [coMode, setCoMode] = useState("order");
  useEffect(() => { if (!reelId) return; const t = setInterval(() => setTick(s => s > 1 ? 0 : s + 1), 1300); return () => clearInterval(t); }, [reelId]);
  const list = STAR_INV.filter(x => (cat === "all" ? true : x.cat === cat) && x.name.toLowerCase().includes(q.toLowerCase()));
  const lines = STAR_INV.filter(x => (cart[x.id] ? cart[x.id] : 0) > 0), cnt = lines.reduce((s, x) => s + cart[x.id], 0);
  const sub = +lines.reduce((s, x) => s + calcSg(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : sub < 250 ? 5.99 : sub < 500 ? 9.99 : 14.99;
  const tax = +(sub * 0.0825).toFixed(2), tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const spec = STAR_INV.find(x => x.id === specId);
  return (<div style={{ minHeight: "100vh", background: "#050914", color: "#f8fafc", padding: "18px 14px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", background: "linear-gradient(90deg,#0f172a,#1e3a8a,#7f1d1d)", padding: 16, borderRadius: 16, border: "1px solid #38bdf8", marginBottom: 14 }}>
          <div><Link href="/" style={{ color: "#7dd3fc", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>← ALBS NEXUS HUB</Link><h1 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 900 }}>🔭🏎️ STARGAZER & PRO AUTO • TELESCOPES & DETAILING</h1></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}><button onClick={() => setGuideOpen(!guideOpen)} style={{ background: "#2563eb", color: "#fff", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🌌 {guideOpen ? "Hide Matcher" : "Sky & Ceramic Matcher"}</button><button onClick={() => { setCoMode("giftcard"); setCoOpen(true); }} style={{ background: "#facc15", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🎁 Gift Cards ($0 Ship)</button><button onClick={() => { setCoMode("order"); setCoOpen(true); }} style={{ background: "#22c55e", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🛒 Bay Cart ({cnt}) • ${tot.toFixed(2)}</button></div>
        </div>
        {guideOpen ? (<div style={{ background: "#0f172a", border: "1px solid #38bdf8", borderRadius: 14, padding: 12, marginBottom: 14, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>{GUIDES.map((g, i) => <button key={g[0]} onClick={() => setGIdx(i)} style={{ background: gIdx === i ? "#38bdf8" : "#1e293b", color: gIdx === i ? "#000" : "#fff", border: 0, borderRadius: 8, padding: "7px 11px", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>{g[0]}</button>)}<span style={{ color: "#fde047", fontWeight: 800, fontSize: 12 }}>→ Recommended Spec: {GUIDES[gIdx][1]}</span></div>) : null}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>{CATS.map(([k, lbl]) => <button key={k} onClick={() => setCat(k)} style={{ padding: "8px 12px", borderRadius: 999, border: 0, fontWeight: 800, fontSize: 12, cursor: "pointer", background: cat === k ? "#2563eb" : "#1e293b", color: "#fff" }}>{lbl}</button>)}<input placeholder="Search GoTo telescopes, astro cams, foam cannons, ceramic coating..." value={q} onChange={e => setQ(e.target.value)} style={{ flex: 1, minWidth: 210, background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 12 }} /></div>
        <SiloItemGrid items={list} accent="#2563eb" calc={calcSg} onAdd={id => setCart({ ...cart, [id]: (cart[id] ? cart[id] : 0) + 1 })} onBuy={id => { setCart({ ...cart, [id]: (cart[id] ? cart[id] : 0) + 1 }); setCoMode("order"); setCoOpen(true); }} />
    </div>
    <NexusCheckoutModal open={coOpen} mode0={coMode} store="Stargazer & Pro Auto" summary={`${cnt} Item(s) • Sub $${sub.toFixed(2)}`} total={tot} ship={ship} tax={tax} onClose={() => setCoOpen(false)} onDone={() => setCart({})} />
    </div>); }
