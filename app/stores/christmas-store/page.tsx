"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CHRISTMAS_100, XmasItem } from "../../data/christmas-100";
import { calcOrderMath } from "../../data/pricing-engine";

export default function ChristmasStore165() {
  const [cat, setCat] = useState("all");
  const [tier, setTier] = useState("all");
  const [q, setQ] = useState("");
  const [sheet, setSheet] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [preview, setPreview] = useState<XmasItem | null>(null);

  const list = CHRISTMAS_100.filter(x =>
    (cat === "all" || x.cat === cat) &&
    (tier === "all" || x.tier === tier) &&
    x.name.toLowerCase().includes(q.toLowerCase())
  );

  function toggleItem(id: string) {
    setCart(prev => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = 1;
      return next;
    });
  }

  function setItemQty(id: string, val: number, stock: number) {
    if (val <= 0) setCart(prev => { const n = { ...prev }; delete n[id]; return n; });
    else setCart(prev => ({ ...prev, [id]: Math.min(stock, val) }));
  }

  const selectedItems = CHRISTMAS_100.filter(x => cart[x.id] > 0);
  const wSum = selectedItems.reduce((s, x) => s + x.w * cart[x.id], 0);
  const sSum = selectedItems.reduce((s, x) => s + x.ship, 0);
  const totals = selectedItems.length ? calcOrderMath(wSum, sSum) : null;

  function downloadCSV() {
    const hdr = ["SKU","Item","Category","Tier","Stock","Wholesale","Price (+10%)","Ship Tier","Cust Tax (8.25%)","CC Fee","Customer Total","Our 10% Net"];
    const rows = [hdr.join(",")];
    list.forEach(x => {
      const m = calcOrderMath(x.w, x.ship);
      rows.push([x.id, `"${x.name}"`, x.cat, `"${x.tierLabel}"`, x.stock, x.w.toFixed(2), m.retailSubtotal.toFixed(2), m.shipping.toFixed(2), m.tax.toFixed(2), m.ccFee.toFixed(2), m.grandTotal.toFixed(2), m.netProfit10.toFixed(2)].join(","));
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv" }));
    a.download = "ALBS-Christmas-165-Tiered-LineSheet.csv";
    a.click();
  }

  const tierColor = (t: string) => t === "T1" ? "#38bdf8" : t === "T2" ? "#facc15" : "#f43f5e";

  return (
    <div style={{ minHeight: "100vh", color: "#f8fafc", paddingBottom: "110px" }}>
      <div style={{ background: "rgba(9,13,22,0.96)", borderBottom: "2px solid #ef4444", padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", position: "sticky", top: 0, zIndex: 40 }}>
        <Link href="/" style={{ color: "#38bdf8", fontWeight: 900, textDecoration: "none" }}>← Back to ALBS Nexus</Link>
        <span style={{ color: "#fca5a5", fontWeight: 900, fontSize: "13.5px" }}>🎄 THE CHRISTMAS STORE • 165 TIERED SKUs • $3.99/$5.99/$7.99 SHIP • 10% PROTECTED NET</span>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button onClick={() => setSheet(!sheet)} style={{ padding: "7px 13px", borderRadius: "8px", background: "#22c55e", color: "#020617", fontWeight: 900, border: "none", cursor: "pointer" }}>
            {sheet ? `🖼️ Photo Grid (${list.length})` : `📊 Open Multi-Buy Spreadsheet (${list.length})`}
          </button>
          <button onClick={downloadCSV} style={{ padding: "7px 12px", borderRadius: "8px", background: "#a855f7", color: "#fff", fontWeight: 900, border: "none", cursor: "pointer" }}>⬇️ CSV</button>
          {selectedItems.length > 0 && (
            <button onClick={() => setCheckoutOpen(true)} style={{ padding: "7px 14px", borderRadius: "8px", background: "linear-gradient(90deg,#f59e0b,#ef4444)", color: "#fff", fontWeight: 900, border: "none", cursor: "pointer" }}>
              🛒 Checkout ({selectedItems.length}) • ${totals?.grandTotal.toFixed(2)} →
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "1320px", margin: "16px auto", padding: "0 14px" }}>
        <div style={{ background: "rgba(9,13,22,0.92)", border: "1.5px solid #ef4444", borderRadius: "16px", padding: "14px", textAlign: "center", marginBottom: "16px" }}>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search 165 Yard Inflatables, Exterior Lights, Wrapping Paper, Boxes, Labels & Hottest 2026 Gifts..." style={{ width: "100%", maxWidth: "740px", padding: "9px 14px", borderRadius: "8px", border: "1px solid #ef4444", background: "#030712", color: "#fff", marginBottom: "10px" }} />
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginBottom: "10px" }}>
            {[
              ["all","🎄 All Holiday (165)"],
              ["lights","💡 Exterior Lights & Yard Inflatables (55)"],
              ["gifts","🔥 Hottest 2026 Wanted Gifts (55)"],
              ["wrapping","🎁 Paper, Boxes, Bags & Labels (30)"],
              ["decor","🏠 Indoor Trees & Decor (25)"]
            ].map(([id,lbl]) => (
              <button key={id} onClick={() => setCat(id)} style={{ padding: "6px 13px", borderRadius: "999px", background: cat === id ? "#ef4444" : "#1e293b", color: "#fff", border: "1px solid #ef4444", fontWeight: 800, fontSize: "12px", cursor: "pointer" }}>{lbl}</button>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
            {[
              ["all","⚡ All Price Tiers"],
              ["T1","🥉 Tier 1: Stocking & Value ($3.99 Ship)"],
              ["T2","🥈 Tier 2: Signature Mid-Tier ($5.99 Ship)"],
              ["T3","🥇 Tier 3: Flagship & Jumbo ($7.99 Ship)"]
            ].map(([id,lbl]) => (
              <button key={id} onClick={() => setTier(id)} style={{ padding: "5px 12px", borderRadius: "999px", background: tier === id ? "#0284c7" : "#0f172a", color: "#e0f2fe", border: "1px solid #38bdf8", fontWeight: 800, fontSize: "11.5px", cursor: "pointer" }}>{lbl}</button>
            ))}
          </div>
        </div>

        {sheet ? (
          <div style={{ background: "rgba(9,13,22,0.96)", border: "2px solid #22c55e", borderRadius: "16px", padding: "14px", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #ef4444", color: "#fca5a5" }}>
                  <th style={{ padding: "8px" }}>Buy</th><th>SKU</th><th>Tier</th><th>Item</th><th>Stock</th><th>Qty</th><th>Price (+10%)</th><th>Ship</th><th>Tax+CC</th><th>Cust. Total</th><th>Our 10% Net</th>
                </tr>
              </thead>
              <tbody>
                {list.map(x => {
                  const qty = cart[x.id] || 1;
                  const m = calcOrderMath(x.w * qty, x.ship);
                  const checked = !!cart[x.id];
                  return (
                    <tr key={x.id} style={{ borderBottom: "1px solid #1e293b", background: checked ? "rgba(34,197,94,0.12)" : "transparent" }}>
                      <td style={{ padding: "7px" }}><input type="checkbox" checked={checked} onChange={() => toggleItem(x.id)} style={{ width: "16px", height: "16px", cursor: "pointer" }} /></td>
                      <td style={{ fontWeight: 800, color: "#38bdf8" }}>{x.id}</td>
                      <td><span style={{ color: tierColor(x.tier), fontWeight: 900, fontSize: "11px" }}>{x.tierLabel}</span></td>
                      <td style={{ fontWeight: 700 }}>{x.name}</td>
                      <td style={{ color: "#f43f5e", fontWeight: 900 }}>{x.stock} Left</td>
                      <td><input type="number" min={1} max={x.stock} value={cart[x.id] || 1} onChange={e => setItemQty(x.id, Number(e.target.value)||1, x.stock)} style={{ width: "48px", background: "#030712", color: "#fff", border: "1px solid #475569", borderRadius: "4px", padding: "3px" }} /></td>
                      <td style={{ fontWeight: 800 }}>${m.retailSubtotal.toFixed(2)}</td>
                      <td style={{ color: "#38bdf8", fontWeight: 900 }}>${m.shipping.toFixed(2)}</td>
                      <td style={{ color: "#94a3b8" }}>${(m.tax + m.ccFee).toFixed(2)}</td>
                      <td style={{ color: "#22c55e", fontWeight: 900 }}>${m.grandTotal.toFixed(2)}</td>
                      <td style={{ color: "#fde047", fontWeight: 900 }}>+${m.netProfit10.toFixed(2)} ✓</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(265px, 1fr))", gap: "14px" }}>
            {list.map(x => {
              const m = calcOrderMath(x.w * (cart[x.id] || 1), x.ship);
              const checked = !!cart[x.id];
              return (
                <div key={x.id} style={{ background: "rgba(9,13,22,0.95)", border: checked ? "2px solid #22c55e" : "1.5px solid #ef4444", borderRadius: "14px", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div onClick={() => setPreview(x)} style={{ height: "150px", backgroundImage: `url('${x.img}')`, backgroundSize: "cover", backgroundPosition: "center", position: "relative", cursor: "pointer" }}>
                      <span style={{ position: "absolute", top: "8px", left: "8px", background: "rgba(2,6,23,0.9)", color: tierColor(x.tier), border: `1px solid ${tierColor(x.tier)}`, padding: "3px 7px", borderRadius: "6px", fontSize: "10px", fontWeight: 900 }}>{x.tierLabel}</span>
                      <span style={{ position: "absolute", top: "8px", right: "8px", background: "#dc2626", padding: "3px 7px", borderRadius: "6px", fontSize: "10px", fontWeight: 900 }}>🎄 {x.stock} Left</span>
                    </div>
                    <div style={{ padding: "11px" }}>
                      <div style={{ fontSize: "10.5px", color: "#38bdf8", fontWeight: 800 }}>{x.id}</div>
                      <div style={{ fontWeight: 900, fontSize: "14px", marginTop: "2px" }}>{x.name}</div>
                      <div style={{ marginTop: "8px", background: "#030712", padding: "8px", borderRadius: "8px", fontSize: "11.5px", lineHeight: 1.55 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}><span>Price (+10% Margin):</span><strong>${m.retailSubtotal.toFixed(2)}</strong></div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}><span>Flat Shipping Tier:</span><strong style={{ color: "#38bdf8" }}>+${m.shipping.toFixed(2)}</strong></div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}><span>Cust. Tax + CC Fee:</span><span style={{ color: "#94a3b8" }}>+${(m.tax + m.ccFee).toFixed(2)}</span></div>
                        <div style={{ display: "flex", justifyContent: "space-between", color: "#22c55e", fontWeight: 900, fontSize: "13.5px", borderTop: "1px solid #1e293b", marginTop: "4px", paddingTop: "4px" }}><span>Total:</span><span>${m.grandTotal.toFixed(2)}</span></div>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "0 11px 11px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                    <button onClick={() => toggleItem(x.id)} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #22c55e", background: checked ? "#22c55e" : "transparent", color: checked ? "#020617" : "#22c55e", fontWeight: 900, fontSize: "11.5px", cursor: "pointer" }}>{checked ? "✓ Selected" : "+ Multi-Buy"}</button>
                    <button onClick={() => { setItemQty(x.id, cart[x.id] || 1, x.stock); setCheckoutOpen(true); }} style={{ padding: "8px", borderRadius: "8px", border: "none", background: "linear-gradient(90deg,#dc2626,#22c55e)", color: "#fff", fontWeight: 900, fontSize: "11.5px", cursor: "pointer" }}>Acquire →</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {preview && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.86)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 95, padding: "16px" }}>
          <div style={{ background: "#0f172a", border: "2px solid #38bdf8", borderRadius: "16px", maxWidth: "460px", width: "100%", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}><strong style={{ color: "#fde047" }}>{preview.id} • {preview.tierLabel}</strong><button onClick={() => setPreview(null)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>✕</button></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
              <img src={preview.img} style={{ width: "100%", height: "85px", objectFit: "cover", borderRadius: "6px" }} alt="1" />
              <img src={preview.img + "&sat=35"} style={{ width: "100%", height: "85px", objectFit: "cover", borderRadius: "6px" }} alt="2" />
              <img src={preview.img + "&con=25"} style={{ width: "100%", height: "85px", objectFit: "cover", borderRadius: "6px" }} alt="3" />
            </div>
            <div style={{ fontWeight: 900, marginTop: "10px" }}>{preview.name}</div>
            <button onClick={() => { setItemQty(preview.id, 1, preview.stock); setPreview(null); setCheckoutOpen(true); }} style={{ width: "100%", marginTop: "12px", padding: "10px", borderRadius: "8px", background: "#22c55e", color: "#020617", fontWeight: 900, border: "none", cursor: "pointer" }}>Add & Proceed to Checkout →</button>
          </div>
        </div>
      )}

      {checkoutOpen && totals && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.86)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "16px" }}>
          <div style={{ background: "#0f172a", border: "2px solid #22c55e", borderRadius: "16px", maxWidth: "480px", width: "100%", padding: "18px", maxHeight: "88vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <strong style={{ color: "#fde047" }}>🎄 HOLIDAY MULTI-BUY CHECKOUT ({selectedItems.length} SKUs)</strong>
              <button onClick={() => setCheckoutOpen(false)} style={{ background: "none", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer" }}>✕</button>
            </div>
            {selectedItems.map(x => (
              <div key={x.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", padding: "6px 0", borderBottom: "1px solid #1e293b" }}>
                <span style={{ flex: 1, paddingRight: "8px" }}><strong>[{x.tier}]</strong> {x.name}</span>
                <input type="number" min={1} max={x.stock} value={cart[x.id]} onChange={e => setItemQty(x.id, Number(e.target.value)||0, x.stock)} style={{ width: "48px", background: "#030712", color: "#fff", border: "1px solid #475569", padding: "3px", borderRadius: "4px" }} />
              </div>
            ))}
            <div style={{ background: "#030712", padding: "12px", borderRadius: "10px", marginTop: "12px", fontSize: "12.5px", lineHeight: 1.7 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Items Subtotal (+10% Margin):</span><strong>${totals.retailSubtotal.toFixed(2)}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Tiered Shipping ($3.99/$5.99/$7.99):</span><strong style={{ color: "#38bdf8" }}>+${totals.shipping.toFixed(2)}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Customer Sales Tax (8.25%):</span><strong>+${totals.tax.toFixed(2)}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Credit Card Fee (2.9% + $0.30):</span><strong>+${totals.ccFee.toFixed(2)}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #334155", marginTop: "6px", paddingTop: "6px", fontSize: "15px", color: "#22c55e", fontWeight: 900 }}><span>Customer Grand Total:</span><span>${totals.grandTotal.toFixed(2)}</span></div>
              <div style={{ fontSize: "11px", color: "#fde047", textAlign: "right", marginTop: "2px" }}>✓ ALBS Protected 10% Net Income: +${totals.netProfit10.toFixed(2)}</div>
            </div>
            <button onClick={() => { alert(`✅ HOLIDAY ORDER LOCKED!\nSKUs: ${selectedItems.length}\nCustomer Paid: $${totals.grandTotal.toFixed(2)}\nALBS 10% Protected Net: $${totals.netProfit10.toFixed(2)}`); setCart({}); setCheckoutOpen(false); }} style={{ width: "100%", marginTop: "12px", padding: "12px", borderRadius: "10px", background: "linear-gradient(90deg,#22c55e,#38bdf8)", color: "#020617", fontWeight: 900, border: "none", cursor: "pointer" }}>
              ⚡ Confirm & Charge Customer ${totals.grandTotal.toFixed(2)} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
