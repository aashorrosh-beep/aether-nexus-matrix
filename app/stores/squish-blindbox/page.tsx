"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { SQUISH_ITEMS } from "../../data/squish-blindbox-240";

export default function SquishBlindBoxMegaStore() {
  const [q, setQ] = useState("");
  const [aisle, setAisle] = useState("all");
  const [tier, setTier] = useState("all");
  const [bundle, setBundle] = useState<any[]>([]);

  const filtered = useMemo(() => SQUISH_ITEMS.filter((item) => {
    const mA = aisle === "all" || item.aisle === aisle;
    const mT = tier === "all" || item.tier === tier;
    const mQ = !q.trim() || (item.name + " " + item.aisleLabel + " " + item.size).toLowerCase().includes(q.toLowerCase());
    return mA && mT && mQ;
  }), [q, aisle, tier]);

  const bWhole = bundle.reduce((s, x) => s + x.wholesale, 0);
  const bTotal = +(bWhole * 1.10).toFixed(2);

  async function buy(title: string, price: number) {
    try {
      const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: [{ name: title, price, quantity: 1 }] }) });
      const d = await r.json();
      if (d?.url) window.location.href = d.url;
      else alert("Added to Nexus Cart: " + title + " ($" + price.toFixed(2) + ")");
    } catch { alert("Added to Nexus Cart: " + title + " ($" + price.toFixed(2) + ")"); }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#030712", color: "#f8fafc", paddingBottom: "90px" }}>
      <div style={{ background: "#090d16", borderBottom: "2px solid #f59e0b", padding: "12px 20px", display: "flex", justifyContent: "space-between" }}>
        <Link href="/" style={{ color: "#38bdf8", fontWeight: 900, textDecoration: "none" }}>← Back to ALBS Nexus Reactor</Link>
        <span style={{ color: "#fbbf24", fontWeight: 900 }}>🧸 SQUISHMALLOW, BLIND-BOX & BUNDLE VAULT • 240 SKUS • 10% MARGIN</span>
      </div>
      <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 20px" }}>
        <div style={{ background: "#0f172a", border: "2px solid #ec4899", borderRadius: "20px", padding: "22px", textAlign: "center" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 900, margin: "0 0 10px" }}>Squishmallow & Mystery Blind-Box Superstore (10% Margin)</h1>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search 240 Squishmallows, Pop Mart, Labubu, Skullpanda, Sonny Angel, Smiski & Bundles..." style={{ width: "100%", maxWidth: "780px", padding: "14px", borderRadius: "12px", border: "2px solid #f59e0b", background: "#030712", color: "#fff" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "12px" }}>
            {[["all","All 240"],["squishmallows","🧸 Squishmallows (80)"],["blind-boxes","🎁 Blind Boxes (60)"],["kawaii-plush","🌸 Kawaii Plush (50)"],["bundles","📦 Bundles & Cases (50)"]].map(([id,lbl]) => (
              <button key={id} onClick={() => setAisle(id)} style={{ padding: "8px 14px", borderRadius: "999px", background: aisle === id ? "#f59e0b" : "#090d16", color: aisle === id ? "#030712" : "#fff", border: "1px solid #f59e0b", fontWeight: 900, cursor: "pointer" }}>{lbl}</button>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "8px" }}>
            {[["all","💲 All Prices"],["under-15","Under $15"],["15-35","$15–$35"],["35-75","$35–$75"],["75-plus","$75+ Cases"]].map(([id,lbl]) => (
              <button key={id} onClick={() => setTier(id)} style={{ padding: "6px 12px", borderRadius: "999px", background: tier === id ? "#0284c7" : "#1e293b", color: "#fff", border: "1px solid #38bdf8", fontWeight: 800, fontSize: "11px", cursor: "pointer" }}>{lbl}</button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "14px", background: "#090d16", border: "2px solid #22c55e", borderRadius: "14px", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontWeight: 800, color: "#22c55e" }}>
            📦 Custom Bundle Builder: {bundle.length === 0 ? "Click '+ Bundle' on any item below!" : `${bundle.length} Items • Wholesale $${bWhole.toFixed(2)} • +10% Bundle Price: $${bTotal.toFixed(2)}`}
          </span>
          {bundle.length > 0 && (
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setBundle([])} style={{ padding: "8px 12px", borderRadius: "8px", background: "#1e293b", color: "#fff", border: "none", cursor: "pointer" }}>Clear</button>
              <button onClick={() => buy(`Custom ${bundle.length}-Item Squish Bundle`, bTotal)} style={{ padding: "8px 14px", borderRadius: "8px", background: "#22c55e", color: "#030712", fontWeight: 900, border: "none", cursor: "pointer" }}>Checkout Bundle (${bTotal.toFixed(2)}) →</button>
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px", marginTop: "18px" }}>
          {filtered.map(item => (
            <div key={item.id} style={{ background: "#0f172a", border: "1px solid #ec4899", borderRadius: "16px", padding: "14px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "10px", color: "#f472b6", fontWeight: 900 }}>{item.aisleLabel} • {item.rarity}</div>
                <div style={{ fontSize: "15px", fontWeight: 900, margin: "4px 0" }}>{item.name}</div>
                <div style={{ fontSize: "11px", color: "#38bdf8" }}>{item.size}</div>
              </div>
              <div style={{ marginTop: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", background: "#090d16", padding: "8px", borderRadius: "8px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>Wholesale: ${item.wholesale.toFixed(2)} (+10%)</span>
                  <span style={{ fontSize: "18px", fontWeight: 900, color: "#fbbf24" }}>${item.price.toFixed(2)}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                  <button onClick={() => setBundle(p => [...p, item])} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #22c55e", background: "transparent", color: "#22c55e", fontWeight: 900, cursor: "pointer" }}>+ Bundle</button>
                  <button onClick={() => buy(item.name, item.price)} style={{ padding: "8px", borderRadius: "8px", border: "none", background: "#ec4899", color: "#fff", fontWeight: 900, cursor: "pointer" }}>Buy Now →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
