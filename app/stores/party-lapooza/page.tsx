"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiloItemGrid from "../../components/SiloItemGrid";
import { PARTY_INV, calcPa } from "./party-inventory";
import NexusCheckoutModal from "../../components/NexusCheckoutModal";
const CATS = [["all","All 160 Event SKUs"],["faceswap","🎭 AI Face-Swap"],["arches","🎈 Arches & LED"],["themes","🦸 Theme Mega Kits"],["vipbulk","🎪 360 Booths & Bulk"]];
const THEMES = ["Comic Superhero Squad","Pro Football Champion","Space Galaxy Astronaut","Royal Castle Crown","Neon Pit-Stop Racer"];
export default function PartyLapoozaSilo() {
  const [cat, setCat] = useState("all"), [q, setQ] = useState(""), [studio, setStudio] = useState(false);
  const [guest, setGuest] = useState("Birthday VIP"), [thm, setThm] = useState(THEMES[0]), [face, setFace] = useState("");
  const [ang, setAng] = useState<Record<string, number>>({}), [reelId, setReelId] = useState(""), [tick, setTick] = useState(0), [specId, setSpecId] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({}), [coOpen, setCoOpen] = useState(false), [coMode, setCoMode] = useState("order");
  useEffect(() => { if (!reelId) return; const t = setInterval(() => setTick(s => s > 1 ? 0 : s + 1), 1300); return () => clearInterval(t); }, [reelId]);
  const list = PARTY_INV.filter(x => (cat === "all" ? true : x.cat === cat) && x.name.toLowerCase().includes(q.toLowerCase()));
  const lines = PARTY_INV.filter(x => (cart[x.id] ? cart[x.id] : 0) > 0), cnt = lines.reduce((s, x) => s + cart[x.id], 0);
  const sub = +lines.reduce((s, x) => s + calcPa(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : sub < 250 ? 5.99 : sub < 500 ? 9.99 : 14.99;
  const tax = +(sub * 0.0825).toFixed(2), tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const spec = PARTY_INV.find(x => x.id === specId);
  const onPic = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files ? e.target.files[0] : null; if (!f) return; const r = new FileReader(); r.onload = () => setFace(String(r.result)); r.readAsDataURL(f); };
  return (
    <div style={{ minHeight: "100vh", background: "#090714", color: "#f8fafc", padding: "18px 14px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", background: "linear-gradient(90deg,#4c1d95,#be185d,#0f172a)", padding: 16, borderRadius: 16, border: "1px solid #c084fc", marginBottom: 14 }}>
          <div><Link href="/" style={{ color: "#e9d5ff", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>← ALBS NEXUS HUB</Link><h1 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 900 }}>🎉 PARTY LAPOOZA • EVENTS & AI FACE-SWAP</h1></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}><button onClick={() => setStudio(!studio)} style={{ background: "#a855f7", color: "#fff", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🎭 {studio ? "Hide AI Studio" : "Open AI Face-Swap Studio"}</button><button onClick={() => { setCoMode("giftcard"); setCoOpen(true); }} style={{ background: "#facc15", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🎁 Gift Cards ($0 Ship)</button><button onClick={() => { setCoMode("order"); setCoOpen(true); }} style={{ background: "#22c55e", color: "#000", fontWeight: 900, border: 0, borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>🛒 Checkout ({cnt}) • ${tot.toFixed(2)}</button></div>
        </div>
        {studio ? (<div style={{ background: "#1e1b4b", border: "2px solid #c084fc", borderRadius: 14, padding: 14, marginBottom: 14, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}><div style={{ flex: 1, minWidth: 240, display: "flex", flexDirection: "column", gap: 8 }}><div style={{ fontWeight: 900, color: "#f0abfc" }}>🎭 AI HERO & VIP FACE-SWAP BANNER STUDIO</div><input value={guest} onChange={e => setGuest(e.target.value)} placeholder="Guest of Honor Name & Age" style={{ background: "#0f172a", border: "1px solid #475569", color: "#fff", padding: 8, borderRadius: 8 }} /><select value={thm} onChange={e => setThm(e.target.value)} style={{ background: "#0f172a", border: "1px solid #475569", color: "#fff", padding: 8, borderRadius: 8 }}>{THEMES.map(t => <option key={t} value={t}>{t}</option>)}</select><input type="file" accept="image/*" onChange={onPic} style={{ fontSize: 12 }} /><button onClick={() => { setCart({ ...cart, "PA-001": (cart["PA-001"] ? cart["PA-001"] : 0) + 1 }); setStudio(false); }} style={{ background: "#ec4899", color: "#fff", fontWeight: 900, border: 0, borderRadius: 8, padding: 9, cursor: "pointer" }}>+ Lock Custom Face-Swap Banner to Cart →</button></div><div style={{ width: 240, height: 150, borderRadius: 12, background: "linear-gradient(135deg,#7e22ce,#db2777)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 10, textAlign: "center" }}>{face ? <img src={face} alt="" style={{ width: 64, height: 64, borderRadius: 999, objectFit: "cover", border: "3px solid #fde047" }} /> : <div style={{ fontSize: 28 }}>🦸</div>}<div style={{ fontWeight: 900, marginTop: 4 }}>{guest}</div><div style={{ fontSize: 11, color: "#fde047" }}>{thm}</div></div></div>) : null}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>{CATS.map(([k, lbl]) => <button key={k} onClick={() => setCat(k)} style={{ padding: "8px 12px", borderRadius: 999, border: 0, fontWeight: 800, fontSize: 12, cursor: "pointer", background: cat === k ? "#a855f7" : "#1e293b", color: "#fff" }}>{lbl}</button>)}<input placeholder="Search custom banners, balloon arches, 360 booths, themes..." value={q} onChange={e => setQ(e.target.value)} style={{ flex: 1, minWidth: 210, background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 12 }} /></div>
        <SiloItemGrid items={list} accent="#a855f7" calc={calcPa} onAdd={id => setCart({ ...cart, [id]: (cart[id] ? cart[id] : 0) + 1 })} onBuy={id => { setCart({ ...cart, [id]: (cart[id] ? cart[id] : 0) + 1 }); setCoMode("order"); setCoOpen(true); }} />
    </div>
    <NexusCheckoutModal open={coOpen} mode0={coMode} store="Party Lapooza" summary={`${cnt} Item(s) • Sub $${sub.toFixed(2)}`} total={tot} ship={ship} tax={tax} onClose={() => setCoOpen(false)} onDone={() => setCart({})} />
    </div>); }
