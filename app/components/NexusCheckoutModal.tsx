"use client";
import React, { useState, useEffect } from "react";
const inp = { background: "#0f172a", border: "1px solid #334155", color: "#fff", padding: "8px 10px", borderRadius: 8, fontSize: 12, flex: 1 };
export interface CheckoutProps { open: boolean; mode0?: string; store: string; summary: string; total: number; ship: number; tax: number; onClose: () => void; onDone: () => void; }
export default function NexusCheckoutModal(p: CheckoutProps) {
  const [mode, setMode] = useState("order"), [amt, setAmt] = useState(50), [rcpt, setRcpt] = useState("");
  const [a, setA] = useState({ name: "", email: "", street: "", city: "", state: "", zip: "" });
  const [gc, setGc] = useState(""), [off, setOff] = useState(0), [err, setErr] = useState("");
  const [res, setRes] = useState<{ orderId?: string; giftCode?: string; amount?: number; shipTo?: string }>({});
  useEffect(() => { if (p.mode0) setMode(p.mode0); setRes({}); setErr(""); }, [p.open, p.mode0]);
  if (!p.open) return null;
  const due = Math.max(0, +(p.total - off).toFixed(2));
  const applyGc = () => { const v = Number(gc.trim().toUpperCase().split("-")[2]); setOff(v > 0 ? v : 0); setErr(v > 0 ? "" : "Format: NEXUS-GC-50-XXXX"); };
  const go = async () => {
    setErr("");
    const body = mode === "giftcard" ? { mode, amount: amt, recipientEmail: rcpt } : { mode, store: p.store, summary: p.summary, address: a, due };
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const d = await r.json();
    if (!d.ok) { setErr(d.msg); return; }
    setRes(d); if (mode === "order") p.onDone();
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(2,6,23,0.88)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 14 }}>
      <div style={{ background: "#1e293b", border: "2px solid #38bdf8", borderRadius: 16, maxWidth: 480, flex: 1, padding: 16, color: "#fff", fontSize: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontWeight: 900 }}><span>{mode === "giftcard" ? "🎁 ALBS NEXUS GIFT CARDS ($0 SHIP)" : "🛡️ CHECKOUT • " + p.store}</span><button onClick={p.onClose} style={{ background: "#334155", color: "#fff", border: 0, borderRadius: 6, padding: "2px 8px" }}>✕</button></div>
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          <button onClick={() => { setMode("order"); setRes({}); }} style={{ flex: 1, padding: 7, borderRadius: 8, border: 0, fontWeight: 800, background: mode === "order" ? "#38bdf8" : "#0f172a", color: mode === "order" ? "#000" : "#fff" }}>🛒 Ship Order</button>
          <button onClick={() => { setMode("giftcard"); setRes({}); }} style={{ flex: 1, padding: 7, borderRadius: 8, border: 0, fontWeight: 800, background: mode === "giftcard" ? "#facc15" : "#0f172a", color: mode === "giftcard" ? "#000" : "#fff" }}>🎁 Buy Gift Card ($0 Ship)</button>
        </div>
        {res.orderId ? (<div style={{ background: "#064e3b", padding: 12, borderRadius: 10, lineHeight: 1.6 }}><div style={{ fontWeight: 900, color: "#fde047", fontSize: 14 }}>✅ CONFIRMED • {res.orderId}</div>{res.giftCode ? <div>Gift Card Code: <b>{res.giftCode}</b> (${res.amount})</div> : <div>Ship To: <b>{res.shipTo}</b> • Paid: <b>${due.toFixed(2)}</b></div>}</div>) : mode === "giftcard" ? (<div>
          <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>{[25, 50, 100, 250, 500].map(v => <button key={v} onClick={() => setAmt(v)} style={{ flex: 1, padding: 7, borderRadius: 8, border: 0, fontWeight: 800, background: amt === v ? "#22c55e" : "#0f172a", color: "#fff" }}>${v}</button>)}</div>
          <div style={{ display: "flex", marginBottom: 8 }}><input placeholder="Recipient Email Address" value={rcpt} onChange={e => setRcpt(e.target.value)} style={inp} /></div>
          {err ? <div style={{ color: "#f87171", marginBottom: 6 }}>{err}</div> : null}
          <div style={{ display: "flex" }}><button onClick={go} style={{ flex: 1, background: "#22c55e", color: "#000", fontWeight: 900, border: 0, borderRadius: 8, padding: 10 }}>Issue ${amt} Gift Card ($0 Ship) →</button></div>
        </div>) : (<div>
          <div style={{ background: "#0f172a", padding: 8, borderRadius: 8, marginBottom: 8 }}>{p.summary} • Ship ${p.ship.toFixed(2)} • Tax ${p.tax.toFixed(2)} {off > 0 ? "• GC -$" + off : ""} • <b style={{ color: "#4ade80" }}>Due ${due.toFixed(2)}</b></div>
          <div style={{ display: "flex", gap: 6, marginBottom: 6 }}><input placeholder="Full Name" value={a.name} onChange={e => setA({ ...a, name: e.target.value })} style={inp} /><input placeholder="Email" value={a.email} onChange={e => setA({ ...a, email: e.target.value })} style={inp} /></div>
          <div style={{ display: "flex", marginBottom: 6 }}><input placeholder="Street Address & Apt/Suite" value={a.street} onChange={e => setA({ ...a, street: e.target.value })} style={inp} /></div>
          <div style={{ display: "flex", gap: 6, marginBottom: 6 }}><input placeholder="City" value={a.city} onChange={e => setA({ ...a, city: e.target.value })} style={inp} /><input placeholder="State" value={a.state} onChange={e => setA({ ...a, state: e.target.value })} style={{ ...inp, maxWidth: 70 }} /><input placeholder="ZIP" value={a.zip} onChange={e => setA({ ...a, zip: e.target.value })} style={{ ...inp, maxWidth: 90 }} /></div>
          <div style={{ display: "flex", gap: 6, marginBottom: 8 }}><input placeholder="Gift Card Code (NEXUS-GC-50-XXXX)" value={gc} onChange={e => setGc(e.target.value)} style={inp} /><button onClick={applyGc} style={{ background: "#facc15", color: "#000", fontWeight: 800, border: 0, borderRadius: 8, padding: "0 12px" }}>Apply</button></div>
          {err ? <div style={{ color: "#f87171", marginBottom: 6 }}>{err}</div> : null}
          <div style={{ display: "flex" }}><button onClick={go} style={{ flex: 1, background: "#22c55e", color: "#000", fontWeight: 900, border: 0, borderRadius: 8, padding: 10 }}>Complete Order • ${due.toFixed(2)} →</button></div>
        </div>)}
      </div>
    </div>); }
