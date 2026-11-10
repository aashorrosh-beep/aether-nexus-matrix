"use client";
import React, { useState } from "react";
import Link from "next/link";
import { calcOrderMath } from "../data/pricing-engine";

export interface MallItem {
  id: string;
  name: string;
  cat: string;
  tier?: "T1" | "T2" | "T3";
  tierLabel?: string;
  w: number;
  ship: number;
  stock: number;
  imgs: [string, string, string];
  video: string;
}

export default function StoreCatalogView({
  title,
  accent = "#ef4444",
  items,
  categories,
  showTiers = false,
}: {
  title: string;
  accent?: string;
  items: MallItem[];
  categories?: [string, string][];
  showTiers?: boolean;
}) {
  const [cat, setCat] = useState("all");
  const [tier, setTier] = useState("all");
  const [q, setQ] = useState("");
  const [sheet, setSheet] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<Record<string, number>>({});
  const [mediaModal, setMediaModal] = useState<MallItem | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const list = items.filter(
    (x) =>
      (cat === "all" || x.cat === cat) &&
      (tier === "all" || x.tier === tier) &&
      x.name.toLowerCase().includes(q.toLowerCase())
  );

  const toggleItem = (id: string) =>
    setCart((p) => {
      const n = { ...p };
      if (n[id]) delete n[id];
      else n[id] = 1;
      return n;
    });

  const setQty = (id: string, v: number, max: number) => {
    if (v <= 0) setCart((p) => { const n = { ...p }; delete n[id]; return n; });
    else setCart((p) => ({ ...p, [id]: Math.min(max, v) }));
  };

  const selected = items.filter((x) => cart[x.id] > 0);
  const totals = selected.length
    ? calcOrderMath(
        selected.reduce((s, x) => s + x.w * cart[x.id], 0),
        selected.reduce((s, x) => s + x.ship, 0)
      )
    : null;

  function downloadCSV() {
    const hdr = ["SKU","Item","Category","Stock","Price (+10%)","Ship ($3.99/$5.99/$7.99)","Tax (8.25%)","CC Fee","Customer Total","ALBS 10% Profit","Photo 1","Photo 2","Photo 3","Video URL"];
    const rows = [hdr.join(",")];
    list.forEach((x) => {
      const m = calcOrderMath(x.w, x.ship);
      rows.push([x.id, `"${x.name}"`, x.cat, x.stock, m.retailSubtotal.toFixed(2), m.shipping.toFixed(2), m.tax.toFixed(2), m.ccFee.toFixed(2), m.grandTotal.toFixed(2), m.netProfit10.toFixed(2), x.imgs[0], x.imgs[1], x.imgs[2], x.video].join(","));
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv" }));
    a.download = `${title.replace(/[^a-z0-9]/gi, "-")}-Spreadsheet.csv`;
    a.click();
  }

  return (
    <div style={{ minHeight: "100vh", background: "#04060e", color: "#f8fafc", paddingBottom: "110px" }}>
      {/* TOP COMMAND BAR WITH PROMINENT SPREADSHEET & CSV BUTTONS */}
      <div style={{ background: "rgba(9,13,24,0.98)", borderBottom: `2px solid ${accent}`, padding: "14px 18px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1340px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <Link href="/" style={{ color: "#38bdf8", fontWeight: 900, textDecoration: "none", fontSize: "14px" }}>← Back to ALBS Nexus</Link>
          <div style={{ fontWeight: 900, fontSize: "15px", color: "#fef08a", letterSpacing: "0.05em" }}>{title} • 3 PHOTOS + VIDEO + SPREADSHEET</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button onClick={() => setSheet(false)} style={{ padding: "8px 14px", borderRadius: "8px", background: !sheet ? "#38bdf8" : "#1e293b", color: !sheet ? "#020617" : "#fff", fontWeight: 900, border: "none", cursor: "pointer" }}>
              📸 3-Photo + Video Grid ({list.length})
            </button>
            <button onClick={() => setSheet(true)} style={{ padding: "8px 14px", borderRadius: "8px", background: sheet ? "#22c55e" : "#14532d", color: "#fff", fontWeight: 900, border: "2px solid #22c55e", cursor: "pointer" }}>
              📊 Open Multi-Buy Spreadsheet ({list.length})
            </button>
            <button onClick={downloadCSV} style={{ padding: "8px 14px", borderRadius: "8px", background: "#a855f7", color: "#fff", fontWeight: 900, border: "none", cursor: "pointer" }}>
              ⬇️ Download CSV Spreadsheet
            </button>
            {selected.length > 0 && totals && (
              <button onClick={() => setCheckoutOpen(true)} style={{ padding: "8px 15px", borderRadius: "8px", background: "linear-gradient(90deg,#f59e0b,#ef4444)", color: "#fff", fontWeight: 900, border: "none", cursor: "pointer" }}>
                🛒 Checkout ({selected.length}) • ${totals.grandTotal.toFixed(2)} →
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1340px", margin: "16px auto", padding: "0 14px" }}>
        <div style={{ background: "#0b101d", border: `1.5px solid ${accent}`, borderRadius: "14px", padding: "14px", textAlign: "center", marginBottom: "16px" }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${items.length} items (every SKU includes 3 Photos, Product Video & Spreadsheet Math)...`} style={{ width: "100%", maxWidth: "720px", padding: "9px 14px", borderRadius: "8px", border: `1px solid ${accent}`, background: "#030712", color: "#fff", marginBottom: "10px" }} />
          {categories && (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginBottom: showTiers ? "8px" : "0" }}>
              {categories.map(([id, lbl]) => (
                <button key={id} onClick={() => setCat(id)} style={{ padding: "6px 13px", borderRadius: "999px", background: cat === id ? accent : "#1e293b", color: "#fff", border: `1px solid ${accent}`, fontWeight: 800, fontSize: "12px", cursor: "pointer" }}>{lbl}</button>
              ))}
            </div>
          )}
          {showTiers && (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
              {[["all","⚡ All Tiers"],["T1","🥉 Tier 1 ($3.99 Ship)"],["T2","🥈 Tier 2 ($5.99 Ship)"],["T3","🥇 Tier 3 ($7.99 Ship)"]].map(([id, lbl]) => (
                <button key={id} onClick={() => setTier(id)} style={{ padding: "5px 12px", borderRadius: "999px", background: tier === id ? "#0284c7" : "#0f172a", color: "#e0f2fe", border: "1px solid #38bdf8", fontWeight: 800, fontSize: "11.5px", cursor: "pointer" }}>{lbl}</button>
              ))}
            </div>
          )}
        </div>

        {sheet ? (
          <div style={{ background: "#0b101d", border: "2px solid #22c55e", borderRadius: "16px", padding: "14px", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${accent}`, color: "#fde047" }}>
                  <th style={{ padding: "8px" }}>Buy</th><th>SKU</th><th>Media (3 Pics + Video)</th><th>Item</th><th>Stock</th><th>Qty</th><th>Price (+10%)</th><th>Ship</th><th>Tax+CC</th><th>Cust. Total</th><th>Our 10% Net</th>
                </tr>
              </thead>
              <tbody>
                {list.map((x) => {
                  const qty = cart[x.id] || 1;
                  const m = calcOrderMath(x.w * qty, x.ship);
                  const checked = !!cart[x.id];
                  return (
                    <tr key={x.id} style={{ borderBottom: "1px solid #1e293b", background: checked ? "rgba(34,197,94,0.12)" : "transparent" }}>
                      <td style={{ padding: "7px" }}><input type="checkbox" checked={checked} onChange={() => toggleItem(x.id)} style={{ width: "16px", height: "16px", cursor: "pointer" }} /></td>
                      <td style={{ fontWeight: 800, color: "#38bdf8" }}>{x.id}</td>
                      <td>
                        <button onClick={() => setMediaModal(x)} style={{ padding: "4px 9px", borderRadius: "6px", background: "#1e293b", border: "1px solid #38bdf8", color: "#bae6fd", fontSize: "11px", fontWeight: 800, cursor: "pointer" }}>
                          📸 3 Photos + 🎥 Video
                        </button>
                      </td>
                      <td style={{ fontWeight: 700 }}>{x.name}</td>
                      <td style={{ color: "#f43f5e", fontWeight: 900 }}>{x.stock} Left</td>
                      <td><input type="number" min={1} max={x.stock} value={qty} onChange={(e) => setQty(x.id, Number(e.target.value) || 1, x.stock)} style={{ width: "48px", background: "#030712", color: "#fff", border: "1px solid #475569", borderRadius: "4px", padding: "3px" }} /></td>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "16px" }}>
            {list.map((x) => {
              const tab = activeTab[x.id] ?? 0;
              const m = calcOrderMath(x.w * (cart[x.id] || 1), x.ship);
              const checked = !!cart[x.id];
              return (
                <div key={x.id} style={{ background: "#0b101d", border: checked ? "2px solid #22c55e" : `1.5px solid ${accent}`, borderRadius: "14px", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    {/* MAIN VIEWPORT: ANGLE 1, 2, 3 OR LIVE MP4 VIDEO */}
                    <div style={{ position: "relative", height: "185px", background: "#020617" }}>
                      {tab === 3 ? (
                        <video src={x.video} controls autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <img
                          src={x.imgs[tab]}
                          alt={x.name}
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${x.id}-${tab}/600/420`; }}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      )}
                      <span style={{ position: "absolute", top: "8px", left: "8px", background: "rgba(2,6,23,0.88)", color: "#fde047", padding: "3px 7px", borderRadius: "6px", fontSize: "10px", fontWeight: 900 }}>{x.id} {x.tierLabel ? `• ${x.tierLabel}` : ""}</span>
                      <span style={{ position: "absolute", top: "8px", right: "8px", background: "#dc2626", padding: "3px 7px", borderRadius: "6px", fontSize: "10px", fontWeight: 900 }}>{x.stock} Left</span>
                    </div>

                    {/* VISIBLE 3-PHOTO THUMBNAIL STRIP + LIVE VIDEO BUTTON ON EVERY CARD */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.25fr", gap: "5px", padding: "7px 9px", background: "#050811", borderBottom: "1px solid #1e293b" }}>
                      {[0, 1, 2].map((idx) => (
                        <button key={idx} onClick={() => setActiveTab({ ...activeTab, [x.id]: idx })} style={{ padding: 0, height: "42px", borderRadius: "6px", overflow: "hidden", border: tab === idx ? "2px solid #38bdf8" : "1px solid #334155", cursor: "pointer", position: "relative", background: "#0f172a" }}>
                          <img src={x.imgs[idx]} alt={`Angle ${idx + 1}`} onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${x.id}-${idx}/200/140`; }} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          <span style={{ position: "absolute", bottom: 1, right: 2, background: "rgba(0,0,0,0.75)", color: "#fff", fontSize: "8.5px", padding: "0 3px", borderRadius: "3px", fontWeight: 800 }}>#{idx + 1}</span>
                        </button>
                      ))}
                      <button onClick={() => setActiveTab({ ...activeTab, [x.id]: tab === 3 ? 0 : 3 })} style={{ height: "42px", borderRadius: "6px", border: tab === 3 ? "2px solid #f43f5e" : "1px solid #f43f5e", background: tab === 3 ? "#f43f5e" : "rgba(244,63,94,0.18)", color: "#fff", fontWeight: 900, fontSize: "10.5px", cursor: "pointer" }}>
                        {tab === 3 ? "⏹ Photo" : "🎥 Video"}
                      </button>
                    </div>

                    <div style={{ padding: "11px" }}>
                      <div style={{ fontWeight: 900, fontSize: "14px" }}>{x.name}</div>
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
                    <button onClick={() => { setQty(x.id, cart[x.id] || 1, x.stock); setCheckoutOpen(true); }} style={{ padding: "8px", borderRadius: "8px", border: "none", background: "linear-gradient(90deg,#dc2626,#22c55e)", color: "#fff", fontWeight: 900, fontSize: "11.5px", cursor: "pointer" }}>Acquire →</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FULL 3-PHOTO + LIVE VIDEO MODAL FOR SPREADSHEET ROWS */}
      {mediaModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 95, padding: "16px" }}>
          <div style={{ background: "#0f172a", border: "2px solid #38bdf8", borderRadius: "16px", maxWidth: "560px", width: "100%", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <strong style={{ color: "#fde047" }}>{mediaModal.id} • 3 PHOTOS & PRODUCT VIDEO</strong>
              <button onClick={() => setMediaModal(null)} style={{ background: "none", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "10px" }}>
              {mediaModal.imgs.map((u, idx) => (
                <img key={idx} src={u} alt={`Angle ${idx + 1}`} onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${mediaModal.id}-${idx}/400/300`; }} style={{ width: "100%", height: "110px", objectFit: "cover", borderRadius: "8px", border: "1px solid #38bdf8" }} />
              ))}
            </div>
            <video src={mediaModal.video} controls autoPlay muted loop playsInline style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px", background: "#000" }} />
            <div style={{ fontWeight: 900, marginTop: "10px" }}>{mediaModal.name}</div>
          </div>
        </div>
      )}

      {/* MULTI-ITEM CHECKOUT MODAL */}
      {checkoutOpen && totals && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "16px" }}>
          <div style={{ background: "#0f172a", border: "2px solid #22c55e", borderRadius: "16px", maxWidth: "480px", width: "100%", padding: "18px", maxHeight: "88vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <strong style={{ color: "#fde047" }}>🛒 MULTI-BUY CHECKOUT ({selected.length} SKUs)</strong>
              <button onClick={() => setCheckoutOpen(false)} style={{ background: "none", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer" }}>✕</button>
            </div>
            {selected.map((x) => (
              <div key={x.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", padding: "6px 0", borderBottom: "1px solid #1e293b" }}>
                <span style={{ flex: 1, paddingRight: "8px" }}>{x.name}</span>
                <input type="number" min={1} max={x.stock} value={cart[x.id]} onChange={(e) => setQty(x.id, Number(e.target.value) || 0, x.stock)} style={{ width: "48px", background: "#030712", color: "#fff", border: "1px solid #475569", padding: "3px", borderRadius: "4px" }} />
              </div>
            ))}
            <div style={{ background: "#030712", padding: "12px", borderRadius: "10px", marginTop: "12px", fontSize: "12.5px", lineHeight: 1.7 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Items Subtotal (+10% Margin):</span><strong>${totals.retailSubtotal.toFixed(2)}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Tiered Shipping ($3.99/$5.99/$7.99):</span><strong style={{ color: "#38bdf8" }}>+${totals.shipping.toFixed(2)}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Customer Sales Tax (8.25%):</span><strong>+${totals.tax.toFixed(2)}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Credit Card Fee (2.9% + $0.30):</span><strong>+${totals.ccFee.toFixed(2)}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #334155", marginTop: "6px", paddingTop: "6px", fontSize: "15px", color: "#22c55e", fontWeight: 900 }}><span>Customer Grand Total:</span><span>${totals.grandTotal.toFixed(2)}</span></div>
              <div style={{ fontSize: "11px", color: "#fde047", textAlign: "right", marginTop: "2px" }}>✓ ALBS Protected 10% Net Profit: +${totals.netProfit10.toFixed(2)}</div>
            </div>
            <button onClick={() => { alert(`✅ ORDER LOCKED!\nSKUs: ${selected.length}\nCustomer Paid: $${totals.grandTotal.toFixed(2)}\nALBS 10% Net Kept: $${totals.netProfit10.toFixed(2)}`); setCart({}); setCheckoutOpen(false); }} style={{ width: "100%", marginTop: "12px", padding: "12px", borderRadius: "10px", background: "linear-gradient(90deg,#22c55e,#38bdf8)", color: "#020617", fontWeight: 900, border: "none", cursor: "pointer" }}>
              ⚡ Confirm & Charge Customer ${totals.grandTotal.toFixed(2)} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
