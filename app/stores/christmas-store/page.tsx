"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiloItemGrid from "../../components/SiloItemGrid";
import { CHRISTMAS_INVENTORY as INV } from "./christmas-inventory";
import NexusCheckoutModal from "../../components/NexusCheckoutModal";
interface XItem { id: string; name: string; cat?: string; w: number; ship: number; stock: number; imgs: string[]; }
const DATA = INV as unknown as XItem[];
const CATS = [["all","🎄 All (165)"],["lights","✨ Lights & Inflatables (55)"],["gifts","🎁 Hot Gifts (55)"],["wrapping","🎀 Wrapping & Boxes (30)"],["decor","🕯️ Indoor Decor (25)"]];
const calcX = (w: number, sh: number) => { const r = +(w * (w > 120 ? 1.06 : 1.09)).toFixed(2), tax = +(r * 0.0825).toFixed(2), tot = +((r + sh + tax + 0.3) / 0.971).toFixed(2); return { r, sh, tax, tot }; };
export default function XmasStore() {
  const [cat, setCat] = useState("all"), [q, setQ] = useState(""), [lim, setLim] = useState(24);
  const [owner, setOwner] = useState(false), [cut, setCut] = useState<Record<string, boolean>>({});
  const [ang, setAng] = useState<Record<string, number>>({}), [specId, setSpecId] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({}), [coOpen, setCoOpen] = useState(false), [coMode, setCoMode] = useState("order");
  useEffect(() => { try { const s = localStorage.getItem("albs_xmas_cut"); if (s) setCut(JSON.parse(s)); } catch {} }, []);
  const full = DATA.filter(x => (owner ? true : !cut[x.id]) && (cat === "all" ? true : x.cat === cat) && x.name.toLowerCase().includes(q.toLowerCase()));
  const list = full.slice(0, lim);
  const lines = DATA.filter(x => (cart[x.id] ? cart[x.id] : 0) > 0), cnt = lines.reduce((s, x) => s + cart[x.id], 0);
  const sub = +lines.reduce((s, x) => s + calcX(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : sub < 250 ? 5.99 : sub < 500 ? 9.99 : 14.99;
  const tax = +(sub * 0.0825).toFixed(2), tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const spec = DATA.find(x => x.id === specId), togCut = (id: string) => { const n = { ...cut, [id]: !cut[id] }; setCut(n); localStorage.setItem("albs_xmas_cut", JSON.stringify(n)); };
  return (<div style={{ minHeight: "100vh", background: "#07110c", color: "#f8fafc", padding: "16px 12px", fontFamily: "system-ui, sans-serif" }}>
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", background: "linear-gradient(90deg,#7f1d1d,#14532d,#0f172a)", padding: "14px 16px", borderRadius: 14, border: "1px solid #facc15", marginBottom: 12 }}>
        <div><Link href="/" style={{ color: "#fde047", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>← ALBS NEXUS HUB</Link><h1 style={{ margin: "2px 0 0", fontSize: 20, fontWeight: 900 }}>🎄 CHRISTMAS SUPERSTORE • 365 HOLIDAY</h1></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}><button type="button" onClick={() => setOwner(!owner)} style={{ background: owner ? "#ef4444" : "#1e293b", color: "#fff", fontWeight: 800, border: "1px solid #facc15", borderRadius: 8, padding: "8px 12px", cursor: "pointer" }}>{owner ? "👑 Owner ON" : "👑 Keep/Cut"}</button><button type="button" onClick={() => { setCoMode("giftcard"); setCoOpen(true); }} style={{ background: "#facc15", color: "#000", fontWeight: 900, border: 0, borderRadius: 8, padding: "8px 12px", cursor: "pointer" }}>🎁 Gift Cards ($0 Ship)</button><button type="button" onClick={() => { setCoMode("order"); setCoOpen(true); }} style={{ background: "#22c55e", color: "#000", fontWeight: 900, border: 0, borderRadius: 8, padding: "8px 14px", cursor: "pointer" }}>🛒 Checkout ({cnt}) • ${tot.toFixed(2)}</button></div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>{CATS.map(([k, lbl]) => <button type="button" key={k} onClick={() => { setCat(k); setLim(24); }} style={{ padding: "7px 12px", borderRadius: 999, border: 0, fontWeight: 800, fontSize: 12, cursor: "pointer", background: cat === k ? "#dc2626" : "#1e293b", color: "#fff" }}>{lbl}</button>)}<input placeholder="Search 165 lights, gifts, wrapping, decor..." value={q} onChange={e => { setQ(e.target.value); setLim(24); }} style={{ flex: 1, minWidth: 200, background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: 999, padding: "7px 14px", fontSize: 12 }} /></div>
      <SiloItemGrid items={full} accent="#dc2626" calc={calcX} onAdd={id => setCart({ ...cart, [id]: (cart[id] ? cart[id] : 0) + 1 })} onBuy={id => { setCart({ ...cart, [id]: (cart[id] ? cart[id] : 0) + 1 }); setCoMode("order"); setCoOpen(true); }} owner={owner} cut={cut} onCut={togCut} />
    </div>
    <NexusCheckoutModal open={coOpen} mode0={coMode} store="Christmas Superstore" summary={`${cnt} Item(s) • Sub $${sub.toFixed(2)}`} total={tot} ship={ship} tax={tax} onClose={() => setCoOpen(false)} onDone={() => setCart({})} />
  </div>); }
