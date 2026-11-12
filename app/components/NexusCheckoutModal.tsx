"use client";
import React, { useState, useEffect } from "react";
const inp = { background: "#0f172a", border: "1px solid #334155", color: "#fff", padding: "8px 10px", borderRadius: 8, fontSize: 12, flex: 1 };
const btn = (background: string, color = "#fff", flex?: number) => ({ background, color, border: 0, borderRadius: 8, padding: "9px 12px", fontWeight: 900, fontSize: 12, cursor: "pointer", flex });
const row = { display: "flex", gap: 6, marginBottom: 7 };
const eb = { color: "#fca5a5", background: "#450a0a", padding: 8, borderRadius: 8, marginBottom: 8 };
export interface CheckoutProps { open: boolean; mode0?: string; store: string; summary: string; total: number; ship: number; tax: number; onClose: () => void; onDone: () => void; }
export default function NexusCheckoutModal(p: CheckoutProps) {
  const [mode, setMode] = useState("order"), [amt, setAmt] = useState(50), [rcpt, setRcpt] = useState(""), [busy, setBusy] = useState(false);
  const [a, setA] = useState({ name: "", email: "", street: "", city: "", state: "", zip: "" });
  const [gc, setGc] = useState(""), [off, setOff] = useState(0), [err, setErr] = useState(""), [auto, setAuto] = useState(false);
  const [res, setRes] = useState<{ orderId?: string; giftCode?: string; paid?: string; shipTo?: string }>({});
  useEffect(() => { if (p.mode0) setMode(p.mode0); setErr(""); }, [p.open, p.mode0]);
  useEffect(() => {
    const sid = new URLSearchParams(window.location.search).get("nx_session");
    if (!sid) return;
    setAuto(true);
    fetch(`/api/checkout?session_id=${encodeURIComponent(sid)}`).then(r => r.json()).then(d => {
      if (d.ok) { setRes(d); p.onDone(); window.history.replaceState({}, "", window.location.pathname); } else setErr(d.msg);
    });
  }, []);
  if (!p.open && !auto) return null;
  const due = Math.max(0, +(p.total - off).toFixed(2));
  const f = (k: keyof typeof a, ph: string, maxWidth?: number) => <input placeholder={ph} value={a[k]} onChange={e => setA({ ...a, [k]: e.target.value })} style={maxWidth ? { ...inp, maxWidth } : inp} />;
  const applyGc = async () => {
    const r = await fetch(`/api/checkout?gc=${encodeURIComponent(gc.trim())}`), d = await r.json();
    setOff(d.ok ? d.off : 0); setErr(d.ok ? "" : d.msg);
  };
  const go = async () => {
    setErr(""); setBusy(true); const returnPath = window.location.pathname;
    const body = mode === "giftcard" ? { mode, amount: amt, recipientEmail: rcpt, returnPath } : { mode, store: p.store, summary: p.summary, address: a, total: p.total, gcCode: off > 0 ? gc : "", returnPath };
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }), d = await r.json();
    setBusy(false);
    if (!d.ok) { setErr(d.msg); return; }
    if (d.stripeUrl) { window.location.href = d.stripeUrl; return; }
    setRes(d); p.onDone();
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(2,6,23,0.9)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}>
      <div style={{ background: "#1e293b", border: "2px solid #38bdf8", borderRadius: 16, maxWidth: 480, flex: 1, padding: 15, color: "#fff", fontSize: 12 }}>
        <div style={{ ...row, justifyContent: "space-between", fontWeight: 900 }}><span>{mode === "giftcard" ? "🎁 GIFT CARDS ($0 SHIP)" : "💳 CHECKOUT • " + p.store}</span><button type="button" onClick={() => { setAuto(false); setRes({}); p.onClose(); }} style={btn("#334155")}>✕</button></div>
        <div style={row}><button type="button" onClick={() => { setMode("order"); setErr(""); }} style={btn(mode === "order" ? "#38bdf8" : "#0f172a", mode === "order" ? "#000" : "#fff", 1)}>🛒 Ship Order</button><button type="button" onClick={() => { setMode("giftcard"); setErr(""); }} style={btn(mode === "giftcard" ? "#facc15" : "#0f172a", mode === "giftcard" ? "#000" : "#fff", 1)}>🎁 Gift Card ($0 Ship)</button></div>
        {res.orderId ? (<div style={{ background: "#064e3b", padding: 12, borderRadius: 10 }}><div style={{ fontWeight: 900, color: "#fde047" }}>✅ CARD PAID • {res.orderId}</div><div>{res.giftCode ? `Gift Card: ${res.giftCode} ($${res.paid})` : `Ship To: ${res.shipTo} • Paid $${res.paid}`}</div></div>) : mode === "giftcard" ? (<div>
          <div style={row}>{[25, 50, 100, 250, 500].map(v => <button type="button" key={v} onClick={() => setAmt(v)} style={btn(amt === v ? "#22c55e" : "#0f172a", "#fff", 1)}>${v}</button>)}</div>
          <div style={row}><input placeholder="Recipient Email Address" value={rcpt} onChange={e => setRcpt(e.target.value)} style={inp} /></div>
          {err ? <div style={eb}>{err}</div> : null}
          <div style={row}><button type="button" disabled={busy} onClick={go} style={btn("#22c55e", "#000", 1)}>{busy ? "Opening Stripe..." : `💳 Pay $${amt}.00 by Card ($0 Ship) →`}</button></div>
        </div>) : (<div>
          <div style={{ background: "#0f172a", padding: 9, borderRadius: 8, marginBottom: 8 }}>{p.summary} • Ship +${p.ship.toFixed(2)} • Tax +${p.tax.toFixed(2)} {off > 0 ? "• GC -$" + off : ""} • <b style={{ color: "#4ade80" }}>Total: ${due.toFixed(2)}</b></div>
          <div style={row}>{f("name", "Full Name")}{f("email", "Email for Receipt")}</div>
          <div style={row}>{f("street", "Street Address & Apt/Suite")}</div>
          <div style={row}>{f("city", "City")}{f("state", "State", 74)}{f("zip", "ZIP", 90)}</div>
          <div style={row}><input placeholder="Paid Gift Card Code (Optional)" value={gc} onChange={e => setGc(e.target.value)} style={inp} /><button type="button" onClick={applyGc} style={btn("#facc15", "#000")}>Apply</button></div>
          {err ? <div style={eb}>{err}</div> : null}
          <div style={row}><button type="button" disabled={busy} onClick={go} style={btn("#22c55e", "#000", 1)}>{busy ? "Opening Stripe..." : `💳 Pay $${due.toFixed(2)} with Credit Card →`}</button></div>
        </div>)}
      </div>
    </div>); }
