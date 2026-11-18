"use client";
import React, { useState, useEffect } from "react";
import { getSizeSpec, saveItemSize } from "./size-helper";
export type GI = {
  id: string; name: string; cat?: string; badge?: string;
  specs?: string[]; w: number; ship: number; stock: number; imgs: string[];
};
type P = {
  items: GI[]; accent: string;
  calc: (w: number, s: number) => { r: number; tax: number; tot: number };
  onAdd: (id: string) => void; onBuy: (id: string) => void;
  owner?: boolean; cut?: Record<string, boolean>; onCut?: (id: string) => void;
};
const FB = "https://tse1.mm.bing.net/th?q=retail+product+box&w=420&h=300&c=7";
const bt = (b: string, c = "#fff", f?: number) => ({
  background: b, color: c, border: 0, borderRadius: 7,
  padding: "7px 9px", fontWeight: 800, fontSize: 11, cursor: "pointer", flex: f
});
const Pic = (q: { u: string; h: number; b?: string; fn?: () => void }) => (
  <img loading="lazy" src={q.u} alt="" referrerPolicy="no-referrer"
    onClick={q.fn} onError={e => { e.currentTarget.src = FB; }}
    style={{ flex: "1 1 0px", minWidth: 0, height: q.h, objectFit: "cover",
      borderRadius: 6, border: q.b, cursor: q.fn ? "pointer" : "default" }} />
);
const Ln = (q: { l: string; v: string; c?: string }) => (
  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, color: q.c }}>
    <span>{q.l}</span><b>{q.v}</b></div>
);
export default function SiloItemGrid(p: P) {
  const [vw, setVw] = useState("cards"), [lim, setLim] = useState(24);
  const [ang, setAng] = useState<Record<string, number>>({});
  const [szs, setSzs] = useState<Record<string, string>>({});
  const [needSz, setNeedSz] = useState("");
  const [sp, setSp] = useState<GI | null>(null), [vid, setVid] = useState<GI | null>(null);
  const [play, setPlay] = useState(true), [tm, setTm] = useState(0);
  useEffect(() => {
    if (!vid || !play) return;
    const iv = setInterval(() => setTm(s => (s + 0.1 >= 12 ? 0 : +(s + 0.1).toFixed(1))), 100);
    return () => clearInterval(iv);
  }, [vid, play]);
  const pickAct = (x: GI, buy: boolean) => {
    const spec = getSizeSpec(x.id, x.name), chosen = szs[x.id] || "";
    if (spec && !chosen) { setNeedSz(x.id); return; }
    if (chosen) saveItemSize(x.id, chosen);
    setNeedSz("");
    if (buy) p.onBuy(x.id); else p.onAdd(x.id);
  };
  const shown = p.items.slice(0, lim);
  return (<div>
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <button onClick={() => setVw("cards")} style={bt(vw === "cards" ? p.accent : "#1e293b")}>📸 Cards ({p.items.length})</button>
      <button onClick={() => setVw("table")} style={bt(vw === "table" ? p.accent : "#1e293b")}>📋 Master Spec & Order Sheet ({p.items.length})</button>
    </div>
    {vw === "table" ? (<div style={{ background: "#0b1120", padding: 10, borderRadius: 10, fontSize: 12 }}>
      {shown.map(x => { const m = p.calc(x.w, x.ship); return (
        <div key={x.id} style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid #1e293b" }}>
          <b style={{ flex: 1, minWidth: 180 }}>{x.id} • {x.name}</b><span>${m.tot.toFixed(2)}</span>
          <span style={{ color: "#93c5fd", fontSize: 11 }}>📦 Case Pack: 6 Units • ✅ In Stock</span><button onClick={() => setSp(x)} style={bt("#334155", "#fde047")}>📋 Specs</button><button onClick={() => p.onAdd(x.id)} style={bt("#1e293b")}>+ Cart</button><button onClick={() => p.onBuy(x.id)} style={bt(p.accent)}>Buy Now →</button>
        </div>); })}</div>) : (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(248px,1fr))", gap: 12 }}>
      {shown.map(x => {
        const m = p.calc(x.w, x.ship), tc = +(m.tot - m.r - x.ship).toFixed(2);
        const k = ang[x.id] ?? 0, c = p.cut?.[x.id], szSpec = getSizeSpec(x.id, x.name), curSz = szs[x.id] || "";
        return (<div key={x.id} style={{ background: "#0f172a", border: c ? "2px dashed #ef4444" : "1px solid #263349", borderRadius: 12, padding: 9, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ position: "relative", height: 148, borderRadius: 8, overflow: "hidden", display: "flex" }}>
            <Pic u={x.imgs[k]} h={148} />
            <span style={{ position: "absolute", top: 5, left: 5, background: "#020617", color: "#fde047", padding: "2px 6px", borderRadius: 5, fontSize: 10, fontWeight: 800 }}>{x.id} • {x.stock} Left</span>
            {p.owner && p.onCut ? <button onClick={() => p.onCut!(x.id)} style={{ ...bt("#000", "#fde047"), position: "absolute", top: 5, right: 5 }}>{c ? "Restore" : "✂️ Cut"}</button> : null}
          </div>
          <div style={{ display: "flex", gap: 4 }}>{[0, 1, 2].map(i => <Pic key={i} u={x.imgs[i]} h={38} b={k === i ? "2px solid #facc15" : "1px solid #334155"} fn={() => setAng({ ...ang, [x.id]: i })} />)}<button onClick={() => { setTm(0); setPlay(true); setVid(x); }} style={bt("#3b0764", "#f0abfc")}>🎥 Video</button></div>
          <b style={{ fontSize: 12.5, minHeight: 32 }}>{x.name}</b>
          {szSpec ? (<div style={{ background: "#06101f", border: needSz === x.id ? "2px solid #facc15" : curSz ? "1.5px solid #22c55e" : "1px solid #38bdf8", borderRadius: 8, padding: 6 }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: needSz === x.id ? "#fde047" : "#93c5fd", marginBottom: 4 }}>{needSz === x.id ? "👆 Pick your size first:" : "📏 " + szSpec.label + ":"}</div>
            <select value={curSz} onChange={e => { setSzs({ ...szs, [x.id]: e.target.value }); setNeedSz(""); }} style={{ width: "100%", background: "#0f172a", color: "#fff", border: "1px solid #475569", borderRadius: 6, padding: "6px 8px", fontSize: 12, fontWeight: 800 }}>
              <option value="">Select Size...</option>
              {szSpec.opts.map(o => <option key={o} value={o}>{o}</option>)}
            </select></div>) : null}
          <div style={{ background: "#090d16", borderRadius: 8, padding: 7, fontSize: 11.5 }}>
            <Ln l="Item Price:" v={"$" + m.r.toFixed(2)} /><Ln l="Shipping:" v={"+$" + x.ship.toFixed(2)} c="#38bdf8" /><Ln l="Tax + CC:" v={"+$" + tc.toFixed(2)} /><Ln l="Total:" v={"$" + m.tot.toFixed(2)} c="#4ade80" />
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            <button onClick={() => pickAct(x, false)} style={bt("#1e293b", "#fff", 1)}>+ Cart</button>
            <button onClick={() => setSp(x)} style={bt("#334155", "#fde047")}>📋 Specs</button>
            <button onClick={() => pickAct(x, true)} style={bt(p.accent, "#fff", 1)}>Buy Now →</button>
          </div></div>); })}</div>)}
    {p.items.length > lim ? <div style={{ textAlign: "center", marginTop: 14 }}><button onClick={() => setLim(lim + 24)} style={bt("#facc15", "#000")}>Show Next 24 ({p.items.length - lim} more) ↓</button></div> : null}
    {vid ? (() => { const vi = tm < 4 ? 0 : tm < 8 ? 1 : 2; return (<div onClick={() => setVid(null)} style={{ position: "fixed", inset: 0, background: "#000e", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}><div onClick={e => e.stopPropagation()} style={{ background: "#0f172a", border: "2px solid #a855f7", borderRadius: 14, maxWidth: 460, flex: 1, padding: 14, fontSize: 12 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><b style={{ color: "#f0abfc" }}>🎥 HD VIDEO • {vid.id}</b><button onClick={() => setVid(null)} style={bt("#334155")}>✕</button></div><img src={vid.imgs[vi]} alt="" referrerPolicy="no-referrer" onError={e => { e.currentTarget.src = FB; }} style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 8, marginBottom: 8 }} /><div style={{ display: "flex", gap: 6, alignItems: "center" }}><button onClick={() => setPlay(!play)} style={bt("#1e293b")}>{play ? "❚❚" : "▶"}</button><input type="range" min={0} max={11.9} step={0.1} value={tm} onChange={e => setTm(+e.target.value)} style={{ flex: 1 }} /></div></div></div>); })() : null}
    {sp ? (() => { const m = p.calc(sp.w, sp.ship); return (<div onClick={() => setSp(null)} style={{ position: "fixed", inset: 0, background: "#000e", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}><div onClick={e => e.stopPropagation()} style={{ background: "#0f172a", border: "2px solid #facc15", borderRadius: 14, maxWidth: 460, flex: 1, padding: 14, fontSize: 12 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><b style={{ color: "#fde047" }}>📋 MFG SPEC SHEET • {sp.id}</b><button onClick={() => setSp(null)} style={bt("#334155")}>✕</button></div><b>{sp.name}</b><div style={{ display: "flex", gap: 5, margin: "8px 0" }}>{[0, 1, 2].map(i => <Pic key={i} u={sp.imgs[i]} h={60} />)}</div><div style={{ background: "#090d16", borderRadius: 8, padding: 8, lineHeight: 1.7 }}><Ln l="Mfg Part #:" v={"OEM-" + sp.id + "-2026"} /><Ln l="Certifications:" v="UL / ASTM / QC Verified" /><Ln l="Stock:" v={sp.stock + " Avail"} /><Ln l="Total w/ Ship & Tax:" v={"$" + m.tot.toFixed(2)} c="#4ade80" /></div></div></div>); })() : null}
  </div>);
}
