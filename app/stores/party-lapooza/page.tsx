"use client";
import React, { useState } from "react";
import Link from "next/link";
import SiloItemGrid from "../../components/SiloItemGrid";
import NexusCheckoutModal from "../../components/NexusCheckoutModal";
import { PARTY_INV, calcPa } from "./party-inventory";
const CATS = [
  ["all","🎉 All (160)"],["age1_5","👶 Ages 1-5"],["age6_10","🧒 Ages 6-10"],
  ["age11_15","🛹 Ages 11-15"],["age15_18","👑 Ages 15-18"],
  ["adult","🥂 Bachelorette/50s/Halloween"],["concession","🍿 Concessions"],
  ["arches","🎈 Pre-Made Arches & Wall"],["faceswap","🦸 AI Face-Swap"]
];
export default function PartyLapoozaMega() {
  const [cat, setCat] = useState("all"), [q, setQ] = useState("");
  const [ppl, setPpl] = useState(15), [hero, setHero] = useState("Birthday Star");
  const [suit, setSuit] = useState("Adult/Kid Comic Superhero"), [face, setFace] = useState("");
  const [addArch, setAddArch] = useState(true), [addWall, setAddWall] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [co, setCo] = useState(false), [cm, setCm] = useState("order");
  const list = PARTY_INV.filter(x =>
    (cat === "all" ? true : x.cat === cat) &&
    x.name.toLowerCase().includes(q.toLowerCase()));
  const ln = PARTY_INV.filter(x => (cart[x.id] ?? 0) > 0);
  const cnt = ln.reduce((s, x) => s + cart[x.id], 0);
  const sub = +ln.reduce((s, x) => s + calcPa(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : 7.99, tax = +(sub * 0.0825).toFixed(2);
  const tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const bt = (bg: string, c = "#fff") => ({ background: bg, color: c, fontWeight: 900, border: 0, borderRadius: 9, padding: "8px 12px", fontSize: 12, cursor: "pointer" });
  const lockBulk = () => {
    const mult = Math.max(1, Math.ceil(ppl / 10));
    const n: Record<string, number> = { ...cart, "PA-006": (cart["PA-006"] ?? 0) + mult, "PA-036": (cart["PA-036"] ?? 0) + 1 };
    if (addArch) n["PA-031"] = (n["PA-031"] ?? 0) + 1;
    if (addWall) n["PA-032"] = (n["PA-032"] ?? 0) + 1;
    setCart(n); setCm("order"); setCo(true);
  };
  return (<div style={{ minHeight: "100vh", background: "#090714", color: "#fff", padding: "16px 12px", fontFamily: "system-ui" }}><div style={{ maxWidth: 1260, margin: "0 auto" }}>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", background: "linear-gradient(90deg,#4c1d95,#be185d,#0f172a)", padding: 15, borderRadius: 16, border: "2px solid #c084fc", marginBottom: 12 }}>
      <div><Link href="/" style={{ color: "#e9d5ff", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>← ALBS NEXUS HUB</Link><h1 style={{ margin: "3px 0 0", fontSize: 21, fontWeight: 900 }}>🎉 PARTY LAPOOZA • AGES 1-18, CONCESSIONS, BULK & AI SUPERHERO</h1></div>
      <div style={{ display: "flex", gap: 8 }}><button onClick={() => { setCm("giftcard"); setCo(true); }} style={bt("#facc15", "#000")}>🎁 Gift Cards</button><button onClick={() => { setCm("order"); setCo(true); }} style={bt("#22c55e", "#000")}>🛒 ({cnt}) ${tot.toFixed(2)}</button></div>
    </div>
    <div style={{ background: "#14102c", border: "2px solid #a855f7", borderRadius: 14, padding: 12, marginBottom: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 12 }}>
      <div>
        <b style={{ color: "#fde047", fontSize: 13 }}>📦 BULK PARTY BUILDER (11-ITEM MINIMUM INCLUDED):</b>
        <div style={{ fontSize: 11, color: "#cbd5e1", margin: "4px 0 7px" }}>Includes Plates, Cake Plates, Cups, Napkins, Cutlery, Tablecover, Banner, Centerpiece, Swirls, Favor Bags & Topper:</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>{[5, 10, 15, 20, 25, 30].map(g => <button key={g} onClick={() => setPpl(g)} style={bt(ppl === g ? "#ec4899" : "#1e293b")}>{g} Guests</button>)}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          <button onClick={() => setAddArch(!addArch)} style={bt(addArch ? "#16a34a" : "#1e293b")}>{addArch ? "✓" : "+"} Pre-Made Balloon Arch</button>
          <button onClick={() => setAddWall(!addWall)} style={bt(addWall ? "#16a34a" : "#1e293b")}>{addWall ? "✓" : "+"} Sequin Wall Decor</button>
        </div>
      </div>
      <div>
        <b style={{ color: "#f0abfc", fontSize: 13 }}>🦸 KID OR GROWN-UP AI SUPERHERO FACE-SWAP:</b>
        <div style={{ display: "flex", gap: 6, margin: "6px 0" }}>
          <input value={hero} onChange={e => setHero(e.target.value)} placeholder="Birthday Name & Age" style={{ flex: 1, background: "#090d16", border: "1px solid #475569", color: "#fff", padding: 7, borderRadius: 7, fontSize: 12 }} />
          <select value={suit} onChange={e => setSuit(e.target.value)} style={{ background: "#090d16", color: "#fde047", border: "1px solid #475569", borderRadius: 7, padding: 7, fontSize: 11 }}><option>Adult/Kid Comic Superhero</option><option>Grown-Up Action Legend</option><option>Disco Cowgirl / VIP Star</option><option>Skate / Rock Icon</option></select>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = () => setFace(String(r.result)); r.readAsDataURL(f); }} style={{ fontSize: 11, flex: 1 }} />
          {face ? <img src={face} alt="" style={{ width: 38, height: 38, borderRadius: 99, objectFit: "cover", border: "2px solid #fde047" }} /> : null}
          <button onClick={lockBulk} style={bt("#22c55e", "#000")}>Lock {ppl}-Guest Bundle →</button>
        </div>
      </div>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
      {CATS.map(([k, l]) => <button key={k} onClick={() => setCat(k)} style={bt(cat === k ? "#a855f7" : "#1e293b")}>{l}</button>)}
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search ages 1-18, concessions, balloon arches, bachelorette, Halloween..." style={{ flex: 1, minWidth: 200, background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 12 }} />
    </div>
    <SiloItemGrid items={list} accent="#a855f7" calc={calcPa} onAdd={id => setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 })} onBuy={id => { setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 }); setCm("order"); setCo(true); }} />
  </div><NexusCheckoutModal open={co} mode0={cm} store="Party Lapooza" summary={cnt + " Item(s) • " + ppl + " Guests • Hero [" + hero + "]"} total={tot} ship={ship} tax={tax} onClose={() => setCo(false)} onDone={() => setCart({})} /></div>);
}
