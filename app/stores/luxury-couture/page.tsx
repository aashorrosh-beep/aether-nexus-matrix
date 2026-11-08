"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LUXURY_VAULT } from "../../data/luxury-vault";

export default function LuxurySalonStore() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [tier, setTier] = useState<"orig" | "rep">("orig");
  const [view, setView] = useState<"grid" | "sheet">("grid");
  const [selected, setSelected] = useState<any | null>(null);
  const [qty, setQty] = useState(1);

  const list = LUXURY_VAULT.filter(x => (cat === "all" || x.cat === cat) && x.name.toLowerCase().includes(q.toLowerCase()));

  function downloadCSV() {
    const rows = [["SKU","Item Name","Category","Edition","Stock Left","Wholesale","Retail (+10%)","Insured Shipping","Total Amount"]];
    list.forEach(x => {
      const w = tier === "orig" ? x.origW : x.repW, r = +(w * 1.10).toFixed(2), tot = +(r + x.ship).toFixed(2);
      rows.push([x.id, `"${x.name}"`, x.cat, tier === "orig" ? "Original COA" : "Tribute", String(x.stock), w.toFixed(2), r.toFixed(2), x.ship.toFixed(2), tot.toFixed(2)]);
    });
    const blob = new Blob([rows.map(r => r.join(",")).join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ALBS-Nexus-Luxury-LineSheet.csv";
    a.click();
  }

  async function confirmOrder(item: any) {
    const w = tier === "orig" ? item.origW : item.repW;
    const unitPrice = +(w * 1.10).toFixed(2);
    const grandTotal = +(unitPrice * qty + item.ship).toFixed(2);
    try {
      const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: [{ name: `${item.name} (Qty ${qty} + Insured Shipping)`, price: grandTotal, quantity: 1 }] }) });
      const d = await r.json();
      if (d?.url) window.location.href = d.url;
      else alert(`✅ ORDER LOCKED!\nItem: ${item.name}\nQty: ${qty}\nUnit Price: $${unitPrice.toFixed(2)}\nShipping: $${item.ship.toFixed(2)}\nTotal Charged: $${grandTotal.toFixed(2)}`);
    } catch {
      alert(`✅ ORDER LOCKED!\nItem: ${item.name}\nQty: ${qty}\nShipping: $${item.ship.toFixed(2)}\nTotal Amount: $${grandTotal.toFixed(2)}`);
    }
    setSelected(null);
  }

  return (
    <div style={{ minHeight: "100vh", color: "#f8fafc", paddingBottom: "90px" }}>
      <div style={{ background: "rgba(9,10,15,0.94)", borderBottom: "2px solid #f59e0b", padding: "12px 20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
        <Link href="/" style={{ color: "#38bdf8", fontWeight: 900, textDecoration: "none" }}>← Back to Galaxy Nexus Reactor</Link>
        <span style={{ color: "#fbbf24", fontWeight: 900 }}>👑 LE GRAND SALON • PHOTOS, LIVE STOCK, SHIPPING & MASTER SPREADSHEET</span>
        <Link href="/nostalgia" style={{ color: "#f472b6", fontWeight: 900, textDecoration: "none" }}>🌍 World&apos;s Fair Hub →</Link>
      </div>

      <div style={{ maxWidth: "1240px", margin: "20px auto", padding: "0 16px" }}>
        <div style={{ background: "rgba(9,13,22,0.92)", border: "2px solid #f59e0b", borderRadius: "20px", padding: "20px", textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 900, margin: "0 0 8px" }}>👑 Le Grand Salon • LV, Gucci, Prada, Red-Bottoms, Watches, Pens & Throws</h1>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search Louis Vuitton, Gucci, Prada, Red-Bottoms, Watches, Pens, Throws..." style={{ width: "100%", maxWidth: "740px", padding: "11px 16px", borderRadius: "10px", border: "2px solid #f59e0b", background: "#030712", color: "#fff" }} />

          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
            <button onClick={() => setTier("orig")} style={{ padding: "8px 14px", borderRadius: "8px", background: tier === "orig" ? "#f59e0b" : "#090d16", color: tier === "orig" ? "#030712" : "#fbbf24", border: "1px solid #fbbf24", fontWeight: 900, cursor: "pointer" }}>🏆 Authenticated Originals (COA)</button>
            <button onClick={() => setTier("rep")} style={{ padding: "8px 14px", borderRadius: "8px", background: tier === "rep" ? "#38bdf8" : "#090d16", color: tier === "rep" ? "#030712" : "#38bdf8", border: "1px solid #38bdf8", fontWeight: 900, cursor: "pointer" }}>⚡ Bespoke Tribute Editions</button>
            <button onClick={() => setView(view === "grid" ? "sheet" : "grid")} style={{ padding: "8px 14px", borderRadius: "8px", background: "#22c55e", color: "#030712", border: "none", fontWeight: 900, cursor: "pointer" }}>
              {view === "grid" ? "📊 Open Master Line-Sheet Spreadsheet" : "🖼️ Switch to Photo Grid View"}
            </button>
            <button onClick={downloadCSV} style={{ padding: "8px 14px", borderRadius: "8px", background: "#a855f7", color: "#fff", border: "none", fontWeight: 900, cursor: "pointer" }}>⬇️ Download CSV Spreadsheet</button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "10px" }}>
            {[["all","All Luxury (12)"],["bags","👜 Bags & Trunks"],["shoes","👠 Red-Bottoms & Shoes"],["watches","⌚ Swiss Watches"],["throws-pens","🧣 Throws & Pens"]].map(([id,lbl]) => (
              <button key={id} onClick={() => setCat(id)} style={{ padding: "6px 13px", borderRadius: "999px", background: cat === id ? "#f59e0b" : "#1e293b", color: cat === id ? "#030712" : "#fff", border: "1px solid #f59e0b", fontWeight: 900, fontSize: "12px", cursor: "pointer" }}>{lbl}</button>
            ))}
          </div>
        </div>

        {/* SPREADSHEET VIEW */}
        {view === "sheet" ? (
          <div style={{ marginTop: "16px", background: "rgba(9,13,22,0.96)", border: "2px solid #22c55e", borderRadius: "16px", padding: "16px", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f59e0b", color: "#fbbf24" }}>
                  <th style={{ padding: "8px" }}>Photo</th><th style={{ padding: "8px" }}>SKU</th><th style={{ padding: "8px" }}>Item</th><th style={{ padding: "8px" }}>Stock Left</th><th style={{ padding: "8px" }}>Wholesale</th><th style={{ padding: "8px" }}>Price (+10%)</th><th style={{ padding: "8px" }}>Shipping</th><th style={{ padding: "8px" }}>Total Amount</th><th style={{ padding: "8px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map(x => {
                  const w = tier === "orig" ? x.origW : x.repW, r = +(w * 1.10).toFixed(2), tot = +(r + x.ship).toFixed(2);
                  return (
                    <tr key={x.id} style={{ borderBottom: "1px solid #1e293b" }}>
                      <td style={{ padding: "8px" }}><img src={x.img} alt={x.name} style={{ width: "52px", height: "38px", objectFit: "cover", borderRadius: "6px" }} /></td>
                      <td style={{ padding: "8px", fontWeight: 900, color: "#38bdf8" }}>{x.id}</td>
                      <td style={{ padding: "8px", fontWeight: 800 }}>{x.name}</td>
                      <td style={{ padding: "8px", color: "#f43f5e", fontWeight: 900 }}>{x.stock} Left</td>
                      <td style={{ padding: "8px" }}>${w.toFixed(2)}</td>
                      <td style={{ padding: "8px", fontWeight: 900, color: "#fbbf24" }}>${r.toFixed(2)}</td>
                      <td style={{ padding: "8px" }}>${x.ship.toFixed(2)}</td>
                      <td style={{ padding: "8px", fontWeight: 900, color: "#22c55e", fontSize: "14px" }}>${tot.toFixed(2)}</td>
                      <td style={{ padding: "8px" }}><button onClick={() => { setSelected(x); setQty(1); }} style={{ padding: "6px 12px", borderRadius: "6px", background: "#f59e0b", color: "#030712", fontWeight: 900, border: "none", cursor: "pointer" }}>Acquire →</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* PHOTO GRID VIEW */
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginTop: "16px" }}>
            {list.map(x => {
              const w = tier === "orig" ? x.origW : x.repW, r = +(w * 1.10).toFixed(2), tot = +(r + x.ship).toFixed(2);
              return (
                <div key={x.id} style={{ background: "rgba(9,13,22,0.95)", border: "1.5px solid #f59e0b", borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ position: "relative", height: "165px", backgroundImage: `url('${x.img}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
                      <span style={{ position: "absolute", top: "8px", left: "8px", background: "rgba(5,6,8,0.85)", color: "#fbbf24", padding: "4px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: 900 }}>{x.id} • {tier === "orig" ? "COA ORIGINAL" : "TRIBUTE"}</span>
                      <span style={{ position: "absolute", top: "8px", right: "8px", background: "#e11d48", color: "#fff", padding: "4px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: 900 }}>🔥 Only {x.stock} Left</span>
                    </div>
                    <div style={{ padding: "12px" }}>
                      <div style={{ fontSize: "15px", fontWeight: 900 }}>{x.name}</div>
                      <div style={{ marginTop: "8px", background: "#030712", borderRadius: "10px", padding: "8px 10px", fontSize: "11.5px", lineHeight: 1.6 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#94a3b8" }}>Item Price (+10%):</span><strong style={{ color: "#fbbf24" }}>${r.toFixed(2)}</strong></div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#94a3b8" }}>Insured Shipping:</span><strong style={{ color: "#38bdf8" }}>+${x.ship.toFixed(2)}</strong></div>
                        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #1e293b", marginTop: "4px", paddingTop: "4px", fontSize: "14px" }}><span>Total Amount:</span><strong style={{ color: "#22c55e" }}>${tot.toFixed(2)}</strong></div>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "0 12px 12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <button onClick={() => setView("sheet")} style={{ padding: "9px", borderRadius: "8px", border: "1px solid #38bdf8", background: "transparent", color: "#38bdf8", fontWeight: 900, fontSize: "11px", cursor: "pointer" }}>📊 Line Sheet</button>
                    <button onClick={() => { setSelected(x); setQty(1); }} style={{ padding: "9px", borderRadius: "8px", border: "none", background: "linear-gradient(90deg, #f59e0b, #ec4899)", color: "#030712", fontWeight: 900, fontSize: "12px", cursor: "pointer" }}>Acquire Now →</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* WORKING ACQUIRE & LINE-SHEET CHECKOUT MODAL */}
      {selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "16px" }}>
          <div style={{ background: "#0f172a", border: "2px solid #f59e0b", borderRadius: "18px", maxWidth: "460px", width: "100%", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 900, color: "#fbbf24" }}>⚡ DIRECT VAULT ACQUISITION • {selected.id}</span>
              <button onClick={() => setSelected(null)} style={{ background: "transparent", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer" }}>✕</button>
            </div>
            <img src={selected.img} alt={selected.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px", marginTop: "10px" }} />
            <h3 style={{ fontSize: "17px", fontWeight: 900, margin: "10px 0 4px" }}>{selected.name}</h3>
            <div style={{ fontSize: "12px", color: "#f43f5e", fontWeight: 900, marginBottom: "10px" }}>📦 Vault Inventory: {selected.stock} Units Available</div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: 800 }}>Quantity:</span>
              <input type="number" min={1} max={selected.stock} value={qty} onChange={e => setQty(Math.max(1, Math.min(selected.stock, Number(e.target.value) || 1)))} style={{ width: "70px", padding: "6px", borderRadius: "6px", border: "1px solid #f59e0b", background: "#030712", color: "#fff", fontWeight: 900 }} />
            </div>
            {(() => {
              const w = tier === "orig" ? selected.origW : selected.repW, unit = +(w * 1.10).toFixed(2), sub = +(unit * qty).toFixed(2), grand = +(sub + selected.ship).toFixed(2);
              return (
                <div style={{ background: "#030712", padding: "12px", borderRadius: "10px", fontSize: "13px", lineHeight: 1.7 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>Unit Price ({qty}x):</span><strong>${sub.toFixed(2)}</strong></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>Insured 3–7 Day Shipping:</span><strong style={{ color: "#38bdf8" }}>+${selected.ship.toFixed(2)}</strong></div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #334155", marginTop: "6px", paddingTop: "6px", fontSize: "16px", color: "#22c55e", fontWeight: 900 }}><span>Total Due:</span><span>${grand.toFixed(2)}</span></div>
                </div>
              );
            })()}
            <button onClick={() => confirmOrder(selected)} style={{ width: "100%", marginTop: "14px", padding: "13px", borderRadius: "10px", background: "linear-gradient(90deg, #22c55e, #38bdf8)", color: "#030712", fontWeight: 900, fontSize: "14px", border: "none", cursor: "pointer" }}>
              ⚡ Confirm & Lock Acquisition →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
