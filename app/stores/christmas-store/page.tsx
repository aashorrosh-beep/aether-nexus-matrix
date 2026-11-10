"use client";
import React, { useState } from "react";
import Link from "next/link";

const XMAS = [
  { id:"XM-101", name:"9ft Royal Balsam Pre-Lit Warm Micro-LED Tree", stock:9, w:340, ship:24.99, img:"https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=600&q=80" },
  { id:"XM-102", name:"24-Pc Hand-Blown European Glass Heirloom Ornaments", stock:16, w:85, ship:11.99, img:"https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=600&q=80" },
  { id:"XM-103", name:"Animated Victorian Porcelain Christmas Village & Train", stock:6, w:195, ship:18.99, img:"https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=600&q=80" },
  { id:"XM-104", name:"Commercial RGBTwinkle Yard Arch & Synchronization Hub", stock:11, w:150, ship:16.99, img:"https://images.unsplash.com/photo-1482517967863-00e15c9b44be?auto=format&fit=crop&w=600&q=80" },
  { id:"XM-105", name:"5ft Hand-Painted Wooden Guard Nutcracker Twin Pair", stock:5, w:260, ship:29.99, img:"https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?auto=format&fit=crop&w=600&q=80" },
  { id:"XM-106", name:"48-Inch Frosted Pine & Velvet Bow Estate Front Wreath", stock:14, w:95, ship:12.99, img:"https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=600&q=80" }
];

export default function ChristmasStore() {
  const [sheet, setSheet] = useState(false);
  const [sel, setSel] = useState<any | null>(null);
  const [qty, setQty] = useState(1);

  return (
    <div style={{ minHeight: "100vh", color: "#f8fafc", paddingBottom: "80px" }}>
      <div style={{ background: "rgba(9,13,22,0.95)", borderBottom: "2px solid #ef4444", padding: "12px 20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
        <Link href="/" style={{ color: "#38bdf8", fontWeight: 900, textDecoration: "none" }}>← Back to ALBS Nexus</Link>
        <span style={{ color: "#fca5a5", fontWeight: 900 }}>🎄 THE CHRISTMAS STORE • 365 HOLIDAY WONDERLAND</span>
        <button onClick={() => setSheet(!sheet)} style={{ padding: "6px 12px", borderRadius: "8px", background: "#22c55e", color: "#020617", fontWeight: 900, border: "none", cursor: "pointer" }}>{sheet ? "🖼️ Photo Grid" : "📊 Open Line-Sheet Spreadsheet"}</button>
      </div>
      <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 16px" }}>
        {sheet ? (
          <div style={{ background: "rgba(9,13,22,0.96)", border: "2px solid #22c55e", borderRadius: "16px", padding: "16px", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
              <thead><tr style={{ borderBottom: "2px solid #ef4444", color: "#fca5a5" }}><th>SKU</th><th>Item</th><th>Stock</th><th>Price (+10%)</th><th>Shipping</th><th>Total</th><th>Action</th></tr></thead>
              <tbody>{XMAS.map(x => { const r = +(x.w*1.1).toFixed(2), tot = +(r+x.ship).toFixed(2); return (
                <tr key={x.id} style={{ borderBottom: "1px solid #1e293b" }}><td style={{ padding: "8px" }}>{x.id}</td><td>{x.name}</td><td style={{ color: "#f43f5e", fontWeight: 900 }}>{x.stock} Left</td><td>${r.toFixed(2)}</td><td>${x.ship.toFixed(2)}</td><td style={{ color: "#22c55e", fontWeight: 900 }}>${tot.toFixed(2)}</td><td><button onClick={() => { setSel(x); setQty(1); }} style={{ padding: "5px 10px", background: "#ef4444", color: "#fff", borderRadius: "6px", border: "none", fontWeight: 900, cursor: "pointer" }}>Acquire →</button></td></tr>
              );})}</tbody>
            </table>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {XMAS.map(x => { const r = +(x.w*1.1).toFixed(2), tot = +(r+x.ship).toFixed(2); return (
              <div key={x.id} style={{ background: "rgba(9,13,22,0.94)", border: "1.5px solid #ef4444", borderRadius: "16px", overflow: "hidden" }}>
                <div style={{ height: "170px", backgroundImage: `url('${x.img}')`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                  <span style={{ position: "absolute", top: "8px", right: "8px", background: "#dc2626", padding: "4px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: 900 }}>🎄 {x.stock} Left</span>
                </div>
                <div style={{ padding: "12px" }}>
                  <div style={{ fontWeight: 900, fontSize: "15px" }}>{x.name}</div>
                  <div style={{ marginTop: "8px", background: "#030712", padding: "8px", borderRadius: "8px", fontSize: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}><span>Price (+10%):</span><strong>${r.toFixed(2)}</strong></div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}><span>Shipping:</span><strong style={{ color: "#38bdf8" }}>+${x.ship.toFixed(2)}</strong></div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#22c55e", fontWeight: 900, fontSize: "14px", marginTop: "4px" }}><span>Total:</span><span>${tot.toFixed(2)}</span></div>
                  </div>
                  <button onClick={() => { setSel(x); setQty(1); }} style={{ width: "100%", marginTop: "10px", padding: "10px", borderRadius: "8px", background: "linear-gradient(90deg, #dc2626, #22c55e)", color: "#fff", fontWeight: 900, border: "none", cursor: "pointer" }}>Acquire Now →</button>
                </div>
              </div>
            );})}
          </div>
        )}
      </div>
      {sel && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 90, padding: "16px" }}>
          <div style={{ background: "#0f172a", border: "2px solid #ef4444", borderRadius: "16px", maxWidth: "440px", width: "100%", padding: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ color: "#fca5a5" }}>🎄 {sel.id} • 3-ANGLE & VIDEO</strong><button onClick={() => setSel(null)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>✕</button></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", marginTop: "8px" }}>
              <img src={sel.img} style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "6px" }} alt="1" />
              <img src={sel.img + "&sat=30"} style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "6px" }} alt="2" />
              <img src={sel.img + "&con=20"} style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "6px" }} alt="3" />
            </div>
            <div style={{ marginTop: "10px", fontWeight: 900 }}>{sel.name} ({sel.stock} in stock)</div>
            <div style={{ marginTop: "8px" }}>Qty: <input type="number" min={1} max={sel.stock} value={qty} onChange={e => setQty(Number(e.target.value)||1)} style={{ width: "60px", background: "#030712", color: "#fff", border: "1px solid #ef4444", padding: "4px", borderRadius: "4px" }} /></div>
            <button onClick={() => { alert(`✅ HOLIDAY ORDER LOCKED: ${sel.name} (Qty ${qty})`); setSel(null); }} style={{ width: "100%", marginTop: "12px", padding: "12px", borderRadius: "8px", background: "#22c55e", color: "#020617", fontWeight: 900, border: "none", cursor: "pointer" }}>⚡ Confirm Holiday Order →</button>
          </div>
        </div>
      )}
    </div>
  );
}
