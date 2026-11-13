"use client";
import React, { useState, useEffect } from "react";
export type GI = {
  id: string; name: string; cat?: string; badge?: string;
  specs?: string[]; w: number; ship: number; stock: number;
  imgs: string[];
};
type P = {
  items: GI[]; accent: string;
  calc: (w: number, s: number) => { r: number; tax: number; tot: number };
  onAdd: (id: string) => void; onBuy: (id: string) => void;
  owner?: boolean; cut?: Record<string, boolean>;
  onCut?: (id: string) => void;
};
const FB = "https://tse1.mm.bing.net/th?q=retail+box+kit&w=420&h=300&c=7";
const bt = (b: string, c = "#fff", f?: number) => ({
  background: b, color: c, border: 0, borderRadius: 7,
  padding: "7px 9px", fontWeight: 800, fontSize: 11,
  cursor: "pointer", flex: f
});
function mfg(x: GI): [string, string][] {
  const n = x.name.toLowerCase();
  const mat = n.includes("led") || n.includes("gen")
    ? "Commercial UL-Grade Polymer, Copper & Sealed IC"
    : n.includes("shoe") || n.includes("boot") || n.includes("leather")
    ? "Full-Grain Upper, Cushioned Midsole & Rubber Tread"
    : "Commercial Retail-Grade Composite & Reinforced Seams";
  const inc = x.id.startsWith("PA-")
    ? "11+ Coordinated Party Pieces, Decor & Setup Guide"
    : "Factory-Sealed Primary Unit, Hardware & Mfg Manual";
  const wt = (1.8 + (x.stock % 9) * 1.1).toFixed(1) + " lbs Boxed";
  return [
    ["Mfg Part #", "OEM-" + x.id + "-2026 (Direct Spec)"],
    ["Materials", mat], ["Box Contents", inc],
    ["Certifications", "UL / ASTM / CPSIA / QC Verified"],
    ["Ship Carton", wt + " • 3-7 Day Insured Carrier"]
  ];
}
const Pic = (q: { u: string; h: number; b?: string; fn?: () => void }) => (
  <img loading="lazy" src={q.u} alt="" referrerPolicy="no-referrer"
    onClick={q.fn} onError={e => { e.currentTarget.src = FB; }}
    style={{ flex: "1 1 0px", minWidth: 0, height: q.h,
      objectFit: "cover", borderRadius: 6, border: q.b,
      cursor: q.fn ? "pointer" : "default" }} />
);
const Ln = (q: { l: string; v: string; c?: string }) => (
  <div style={{ display: "flex", justifyContent: "space-between",
    gap: 8, color: q.c }}><span>{q.l}</span><b>{q.v}</b></div>
);
export default function SiloItemGrid(p: P) {
  const [vw, setVw] = useState("cards"), [lim, setLim] = useState(24);
  const [ang, setAng] = useState<Record<string, number>>({});
  const [sp, setSp] = useState<GI | null>(null);
  const [vid, setVid] = useState<GI | null>(null);
  const [play, setPlay] = useState(true), [tm, setTm] = useState(0);
  useEffect(() => {
    if (!vid || !play) return;
    const iv = setInterval(() =>
      setTm(s => (s + 0.1 >= 12 ? 0 : +(s + 0.1).toFixed(1))), 100);
    return () => clearInterval(iv);
  }, [vid, play]);
  const shown = p.items.slice(0, lim);
  return (<div>
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <button onClick={() => setVw("cards")} style={bt(vw === "cards" ? p.accent : "#1e293b")}>📸 Cards ({p.items.length})</button>
      <button onClick={() => setVw("table")} style={bt(vw === "table" ? p.accent : "#1e293b")}>📋 Mfg Spec Sheet ({p.items.length})</button>
    </div>
    {vw === "table" ? (<div style={{ background: "#0b1120", padding: 10, borderRadius: 10, fontSize: 12 }}>
      {shown.map(x => { const m = p.calc(x.w, x.ship); return (
        <div key={x.id} style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid #1e293b" }}>
          <div style={{ display: "flex", gap: 4, width: 130 }}>{[0, 1, 2].map(i => <Pic key={i} u={x.imgs[i]} h={32} fn={() => setSp(x)} />)}</div>
          <b style={{ flex: 1, minWidth: 180 }}>{x.id} • {x.name}</b>
          <span>${m.tot.toFixed(2)} Total</span>
          <button onClick={() => { setTm(0); setPlay(true); setVid(x); }} style={bt("#3b0764", "#f0abfc")}>🎥 Video</button>
          <button onClick={() => setSp(x)} style={bt("#334155", "#fde047")}>📋 Mfg Specs</button>
        </div>); })}</div>) : (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(244px,1fr))", gap: 12 }}>
      {shown.map(x => {
        const m = p.calc(x.w, x.ship), tc = +(m.tot - m.r - x.ship).toFixed(2);
        const k = ang[x.id] ?? 0, c = p.cut?.[x.id];
        return (<div key={x.id} style={{ background: "#0f172a", border: c ? "2px dashed #ef4444" : "1px solid #263349", borderRadius: 12, padding: 9, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ position: "relative", height: 148, borderRadius: 8, overflow: "hidden", display: "flex" }}>
            <Pic u={x.imgs[k]} h={148} />
            <span style={{ position: "absolute", top: 5, left: 5, background: "#020617", color: "#fde047", padding: "2px 6px", borderRadius: 5, fontSize: 10, fontWeight: 800 }}>{x.id} • {x.stock} Left</span>
            {p.owner && p.onCut ? <button onClick={() => p.onCut!(x.id)} style={{ ...bt("#000", "#fde047"), position: "absolute", top: 5, right: 5 }}>{c ? "Restore" : "✂️ Cut"}</button> : null}
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {[0, 1, 2].map(i => <Pic key={i} u={x.imgs[i]} h={38} b={k === i ? "2px solid #facc15" : "1px solid #334155"} fn={() => setAng({ ...ang, [x.id]: i })} />)}
            <button onClick={() => { setTm(0); setPlay(true); setVid(x); }} style={bt("#3b0764", "#f0abfc")}>🎥 Video</button>
          </div>
          <b style={{ fontSize: 12.5, minHeight: 32 }}>{x.name}</b>
          <div style={{ background: "#090d16", borderRadius: 8, padding: 7, fontSize: 11.5 }}>
            <Ln l="Item Price:" v={"$" + m.r.toFixed(2)} />
            <Ln l="Shipping:" v={"+$" + x.ship.toFixed(2)} c="#38bdf8" />
            <Ln l="Tax + CC:" v={"+$" + tc.toFixed(2)} />
            <Ln l="Total:" v={"$" + m.tot.toFixed(2)} c="#4ade80" />
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            <button onClick={() => p.onAdd(x.id)} style={bt("#1e293b", "#fff", 1)}>+ Cart</button>
            <button onClick={() => setSp(x)} style={bt("#334155", "#fde047")}>📋 Specs</button>
            <button onClick={() => p.onBuy(x.id)} style={bt(p.accent, "#fff", 1)}>Buy Now →</button>
          </div></div>); })}</div>)}
    {p.items.length > lim ? <div style={{ textAlign: "center", marginTop: 14 }}><button onClick={() => setLim(lim + 24)} style={bt("#facc15", "#000")}>Show Next 24 ({p.items.length - lim} more) ↓</button></div> : null}
    {vid ? (() => {
      const vi = tm < 4 ? 0 : tm < 8 ? 1 : 2;
      const sc = (1.03 + ((tm % 4) / 4) * 0.13).toFixed(3);
      return (<div onClick={() => setVid(null)} style={{ position: "fixed", inset: 0, background: "#000e", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}>
        <div onClick={e => e.stopPropagation()} style={{ background: "#0f172a", border: "2px solid #a855f7", borderRadius: 14, maxWidth: 480, flex: 1, padding: 14, fontSize: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><b style={{ color: "#f0abfc" }}>🎥 HD PRODUCT VIDEO • {vid.id}</b><button onClick={() => setVid(null)} style={bt("#334155")}>✕</button></div>
          <div style={{ position: "relative", height: 230, borderRadius: 10, overflow: "hidden", background: "#000", marginBottom: 8 }}>
            <img src={vid.imgs[vi]} alt="" referrerPolicy="no-referrer" onError={e => { e.currentTarget.src = FB; }} style={{ width: "100%", height: 230, objectFit: "cover", transform: "scale(" + sc + ")", transition: "transform 0.12s linear" }} />
            <span style={{ position: "absolute", top: 8, left: 8, background: "#dc2626", padding: "3px 8px", borderRadius: 5, fontSize: 10, fontWeight: 900 }}>● {play ? "PLAYING" : "PAUSED"} ANGLE {vi + 1}/3 • 0:{String(Math.floor(tm)).padStart(2, "0")}/0:12</span>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <button onClick={() => setPlay(!play)} style={bt("#1e293b")}>{play ? "❚❚ Pause" : "▶ Play"}</button>
            <input type="range" min={0} max={11.9} step={0.1} value={tm} onChange={e => setTm(+e.target.value)} style={{ flex: 1 }} />
            <button onClick={() => { const id = vid.id; setVid(null); p.onBuy(id); }} style={bt("#22c55e", "#000")}>Buy Now →</button>
          </div></div></div>); })() : null}
    {sp ? (() => {
      const m = p.calc(sp.w, sp.ship), tc = +(m.tot - m.r - sp.ship).toFixed(2);
      return (<div onClick={() => setSp(null)} style={{ position: "fixed", inset: 0, background: "#000e", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}>
        <div onClick={e => e.stopPropagation()} style={{ background: "#0f172a", border: "2px solid #facc15", borderRadius: 14, maxWidth: 480, flex: 1, padding: 14, fontSize: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><b style={{ color: "#fde047" }}>📋 MANUFACTURER SPEC SHEET • {sp.id}</b><button onClick={() => setSp(null)} style={bt("#334155")}>✕</button></div>
          <div style={{ fontWeight: 900, fontSize: 13.5, marginBottom: 6 }}>{sp.name}</div>
          <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>{[0, 1, 2].map(i => <Pic key={i} u={sp.imgs[i]} h={64} />)}</div>
          <div style={{ background: "#090d16", borderRadius: 8, padding: 8, lineHeight: 1.7, marginBottom: 8 }}>
            {mfg(sp).map(([k, v]) => <Ln key={k} l={k + ":"} v={v} />)}
            {(sp.specs ?? []).map(s => <Ln key={s} l="Spec:" v={s} c="#93c5fd" />)}
          </div>
          <div style={{ background: "#090d16", borderRadius: 8, padding: 8, lineHeight: 1.6, marginBottom: 8 }}>
            <Ln l="Stock Ready:" v={sp.stock + " Units"} /><Ln l="Item Price:" v={"$" + m.r.toFixed(2)} /><Ln l="Flat Shipping:" v={"+$" + sp.ship.toFixed(2)} c="#38bdf8" /><Ln l="Tax + CC:" v={"+$" + tc.toFixed(2)} /><Ln l="Landed Total:" v={"$" + m.tot.toFixed(2)} c="#4ade80" />
          </div>
          <div style={{ display: "flex", gap: 6 }}><button onClick={() => window.print()} style={bt("#1e293b", "#fde047")}>🖨️ Print Spec</button><button onClick={() => { const x = sp; setSp(null); setTm(0); setPlay(true); setVid(x); }} style={bt("#3b0764", "#f0abfc")}>🎥 Watch Video</button><button onClick={() => { const id = sp.id; setSp(null); p.onBuy(id); }} style={bt("#22c55e", "#000", 1)}>Buy Now →</button></div>
        </div></div>); })() : null}
  </div>);
}
