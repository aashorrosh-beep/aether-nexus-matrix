"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CHRISTMAS_INVENTORY, StandaloneXmasSKU, calcChristmasMath } from "./christmas-inventory";
import ProductVideoReel from "./ProductVideoReel";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=700&q=80";

export default function StandaloneChristmasStore() {
  const [cat, setCat] = useState("all");
  const [tier, setTier] = useState("all");
  const [q, setQ] = useState("");
  const [sheet, setSheet] = useState(false);
  const [ownerMode, setOwnerMode] = useState(false);
  const [showCut, setShowCut] = useState(false);

  const [cutIds, setCutIds] = useState<Record<string, boolean>>({});
  const [customStock, setCustomStock] = useState<Record<string, number>>({});
  const [customImgs, setCustomImgs] = useState<Record<string, [string, string, string]>>({});
  const [customVids, setCustomVids] = useState<Record<string, string>>({});

  const [cart, setCart] = useState<Record<string, number>>({});
  const [mediaTab, setMediaTab] = useState<Record<string, number>>({});
  const [modalItem, setModalItem] = useState<StandaloneXmasSKU | null>(null);
  const [modalStartVideo, setModalStartVideo] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      setCutIds(JSON.parse(localStorage.getItem("albs_xmas_cuts") || "{}"));
      setCustomStock(JSON.parse(localStorage.getItem("albs_xmas_stock") || "{}"));
      setCustomImgs(JSON.parse(localStorage.getItem("albs_xmas_imgs") || "{}"));
      setCustomVids(JSON.parse(localStorage.getItem("albs_xmas_vids") || "{}"));
    } catch {}
  }, []);

  const getStock = (x: StandaloneXmasSKU) => customStock[x.id] ?? x.stock;
  const getImgs = (x: StandaloneXmasSKU): [string, string, string] => customImgs[x.id] ?? x.imgs;

  function uploadCustomPhoto(x: StandaloneXmasSKU, slot: 0 | 1 | 2, e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base = [...getImgs(x)] as [string, string, string];
      base[slot] = String(reader.result);
      const next = { ...customImgs, [x.id]: base };
      setCustomImgs(next);
      try { localStorage.setItem("albs_xmas_imgs", JSON.stringify(next)); } catch {}
    };
    reader.readAsDataURL(f);
  }

  function uploadCustomMP4(id: string, e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    const next = { ...customVids, [id]: url };
    setCustomVids(next);
  }

  function toggleCut(id: string) {
    setCutIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (!next[id]) delete next[id];
      try { localStorage.setItem("albs_xmas_cuts", JSON.stringify(next)); } catch {}
      return next;
    });
  }

  function updateStockCount(id: string, val: number) {
    const clean = Math.max(0, val);
    setCustomStock((prev) => {
      const next = { ...prev, [id]: clean };
      try { localStorage.setItem("albs_xmas_stock", JSON.stringify(next)); } catch {}
      return next;
    });
  }

  const activeCatalog = CHRISTMAS_INVENTORY.filter((x) => showCut || !cutIds[x.id]);
  const list = activeCatalog.filter(
    (x) =>
      (cat === "all" || x.cat === cat) &&
      (tier === "all" || x.tier === tier) &&
      x.name.toLowerCase().includes(q.toLowerCase())
  );

  const totalUnitsAvailable = CHRISTMAS_INVENTORY.filter((x) => !cutIds[x.id]).reduce((s, x) => s + getStock(x), 0);
  const cutCount = Object.keys(cutIds).length;

  const toggleBuy = (id: string) =>
    setCart((p) => {
      const n = { ...p };
      if (n[id]) delete n[id];
      else n[id] = 1;
      return n;
    });

  const setQty = (id: string, v: number, max: number) => {
    if (v <= 0) setCart((p) => { const n = { ...p }; delete n[id]; return n; });
    else setCart((p) => ({ ...p, [id]: Math.min(Math.max(1, max), v) }));
  };

  const selected = CHRISTMAS_INVENTORY.filter((x) => !cutIds[x.id] && cart[x.id] > 0);
  const totals = selected.length
    ? calcChristmasMath(
        selected.reduce((s, x) => s + x.w * cart[x.id], 0),
        selected.reduce((s, x) => s + x.ship, 0)
      )
    : null;

  function exportSpreadsheetCSV() {
    const hdr = ["SKU","Status","Tier","Category","Item","Available Stock","Wholesale","Retail (+10%)","Flat Shipping","Cust Tax (8.25%)","CC Fee (2.9%+$0.30)","Customer Total","ALBS 10% Protected Net","Photo 1","Photo 2","Photo 3"];
    const rows = [hdr.join(",")];
    list.forEach((x) => {
      const m = calcChristmasMath(x.w, x.ship);
      const pics = getImgs(x);
      rows.push([x.id, cutIds[x.id] ? "CUT" : "KEEP", `"${x.tierLabel}"`, x.cat, `"${x.name}"`, getStock(x), x.w.toFixed(2), m.retailSubtotal.toFixed(2), m.shipping.toFixed(2), m.tax.toFixed(2), m.ccFee.toFixed(2), m.grandTotal.toFixed(2), m.netProfit10.toFixed(2), pics[0], pics[1], pics[2]].join(","));
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv" }));
    a.download = "ALBS-Christmas-Store-SpecSheet.csv";
    a.click();
  }

  const tierBadgeColor = (t: string) => (t === "T1" ? "#38bdf8" : t === "T2" ? "#facc15" : "#f43f5e");
  const angleCrop = (idx: number) =>
    idx === 0
      ? { objectPosition: "center", transform: "scale(1)" }
      : idx === 1
      ? { objectPosition: "center 30%", transform: "scale(1.32)" }
      : { objectPosition: "bottom right", transform: "scale(1.18)" };

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at top, #1f080c 0%, #050811 55%, #020409 100%)", color: "#f8fafc", paddingBottom: "110px" }}>
      {/* TOP BAR */}
      <div style={{ background: "rgba(12,6,10,0.96)", borderBottom: "2px solid #ef4444", padding: "12px 18px", position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(10px)" }}>
        <div style={{ maxWidth: "1380px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <Link href="/" style={{ color: "#38bdf8", fontWeight: 900, textDecoration: "none", fontSize: "14px" }}>← Back to ALBS Nexus Galaxy</Link>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button onClick={() => setSheet(false)} style={{ padding: "8px 14px", borderRadius: "8px", background: !sheet ? "#ef4444" : "#1e293b", color: "#fff", fontWeight: 900, border: "none", cursor: "pointer" }}>
              📸 3-Photo + Video Cards ({list.length})
            </button>
            <button onClick={() => setSheet(true)} style={{ padding: "8px 14px", borderRadius: "8px", background: sheet ? "#22c55e" : "#14532d", color: "#fff", fontWeight: 900, border: "2px solid #22c55e", cursor: "pointer" }}>
              📊 Open Spec Sheet ({list.length})
            </button>
            <button onClick={exportSpreadsheetCSV} style={{ padding: "8px 13px", borderRadius: "8px", background: "#eab308", color: "#020617", fontWeight: 900, border: "none", cursor: "pointer" }}>
              ⬇️ CSV Spec Sheet
            </button>
            <button onClick={() => setOwnerMode(!ownerMode)} style={{ padding: "8px 13px", borderRadius: "8px", background: ownerMode ? "#f43f5e" : "#0f172a", color: "#fde047", fontWeight: 900, border: "1px solid #fde047", cursor: "pointer" }}>
              🛠️ {ownerMode ? "Finish Editing" : `Owner Edit / Keep-Cut (${cutCount} Cut)`}
            </button>
            {selected.length > 0 && totals && (
              <button onClick={() => setCheckoutOpen(true)} style={{ padding: "8px 15px", borderRadius: "8px", background: "linear-gradient(90deg,#22c55e,#16a34a)", color: "#020617", fontWeight: 900, border: "none", cursor: "pointer" }}>
                🛒 Checkout ({selected.length}) • ${totals.grandTotal.toFixed(2)} →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* HERO BANNER */}
      <div style={{ maxWidth: "1380px", margin: "18px auto 0", padding: "0 14px" }}>
        <div style={{
          borderRadius: "20px", overflow: "hidden", border: "2px solid rgba(239,68,68,0.75)",
          backgroundImage: "linear-gradient(95deg, rgba(10,5,8,0.92) 0%, rgba(28,8,12,0.82) 55%, rgba(6,28,18,0.88) 100%), url('https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover", backgroundPosition: "center", padding: "22px 24px", boxShadow: "0 0 45px rgba(239,68,68,0.28)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.16em", color: "#fde047" }}>🎄 SEGMENT #1 • STANDALONE CHRISTMAS WONDERLAND</div>
              <h1 style={{ margin: "4px 0 6px", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 900, color: "#ffffff" }}>THE ALBS CHRISTMAS STORE</h1>
              <div style={{ fontSize: "13px", color: "#e2e8f0", maxWidth: "690px" }}>
                55 Exterior Lights & Yard Inflatables • 55 Hottest 2026 Gifts • 30 Wrapping, Boxes, Bags & Labels • 25 Indoor Trees & Decor
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <div style={{ background: "rgba(2,6,23,0.85)", border: "1px solid #22c55e", borderRadius: "12px", padding: "10px 14px", textAlign: "center" }}>
                <div style={{ fontSize: "10px", color: "#86efac", fontWeight: 800 }}>ACTIVE SKUs</div>
                <div style={{ fontSize: "20px", fontWeight: 900, color: "#fff" }}>{165 - cutCount}</div>
              </div>
              <div style={{ background: "rgba(2,6,23,0.85)", border: "1px solid #ef4444", borderRadius: "12px", padding: "10px 14px", textAlign: "center" }}>
                <div style={{ fontSize: "10px", color: "#fca5a5", fontWeight: 800 }}>TOTAL AVAILABLE</div>
                <div style={{ fontSize: "20px", fontWeight: 900, color: "#fde047" }}>{totalUnitsAvailable.toLocaleString()} Units</div>
              </div>
              <div style={{ background: "rgba(2,6,23,0.85)", border: "1px solid #38bdf8", borderRadius: "12px", padding: "10px 14px", textAlign: "center" }}>
                <div style={{ fontSize: "10px", color: "#bae6fd", fontWeight: 800 }}>SHIPPING TIERS</div>
                <div style={{ fontSize: "15px", fontWeight: 900, color: "#38bdf8", marginTop: "3px" }}>$3.99 • $5.99 • $7.99</div>
              </div>
            </div>
          </div>

          {ownerMode && (
            <div style={{ marginTop: "14px", padding: "10px 14px", borderRadius: "10px", background: "rgba(250,204,21,0.14)", border: "1px solid #fde047", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", fontSize: "12px" }}>
              <span>🛠️ <strong>Owner Mode:</strong> Swap any <strong>Pic 1/2/3</strong> or upload an <strong>MP4 Video</strong> from your Chromebook, edit <strong>Available Stock</strong>, or click <strong>👎 Cut</strong>.</span>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setShowCut(!showCut)} style={{ padding: "5px 10px", borderRadius: "6px", background: "#1e293b", color: "#fff", border: "1px solid #fde047", cursor: "pointer", fontWeight: 800 }}>
                  {showCut ? "Hide Cut Items" : `Show Cut Items (${cutCount})`}
                </button>
              </div>
            </div>
          )}

          <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.15)", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search 165 items (drones, espresso, inflatables, lights, wrapping boxes, trees)..." style={{ width: "100%", maxWidth: "740px", padding: "9px 14px", borderRadius: "999px", border: "1px solid #ef4444", background: "rgba(3,7,18,0.9)", color: "#fff" }} />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
              {[
                ["all", "🎄 All Christmas"],
                ["lights", "💡 Lights & Yard Inflatables (55)"],
                ["gifts", "🔥 Hottest 2026 Gifts (55)"],
                ["wrapping", "🎁 Wrapping, Boxes, Bags & Labels (30)"],
                ["decor", "🏠 Indoor Trees & Decor (25)"]
              ].map(([id, lbl]) => (
                <button key={id} onClick={() => setCat(id)} style={{ padding: "6px 13px", borderRadius: "999px", background: cat === id ? "#ef4444" : "rgba(15,23,42,0.9)", color: "#fff", border: "1px solid #ef4444", fontWeight: 800, fontSize: "12px", cursor: "pointer" }}>{lbl}</button>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
              {[
                ["all", "⚡ All 3 Price Tiers"],
                ["T1", "🥉 Tier 1: Stocking & Value ($3.99 Ship)"],
                ["T2", "🥈 Tier 2: Signature Family ($5.99 Ship)"],
                ["T3", "🥇 Tier 3: Flagship & Jumbo ($7.99 Ship)"]
              ].map(([id, lbl]) => (
                <button key={id} onClick={() => setTier(id)} style={{ padding: "5px 12px", borderRadius: "999px", background: tier === id ? "#0284c7" : "rgba(15,23,42,0.85)", color: "#e0f2fe", border: "1px solid #38bdf8", fontWeight: 800, fontSize: "11.5px", cursor: "pointer" }}>{lbl}</button>
              ))}
            </div>
          </div>
        </div>

        {/* SPEC SHEET WITH INLINE 3 PHOTOS + WORKING VIDEO OR CARD GRID */}
        <div style={{ marginTop: "18px" }}>
          {sheet ? (
            <div style={{ background: "#090d18", border: "2px solid #22c55e", borderRadius: "16px", padding: "14px", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #ef4444", color: "#fde047" }}>
                    <th style={{ padding: "8px" }}>Buy</th>
                    <th>SKU</th>
                    <th>3 Product Angles + Video</th>
                    <th>Item</th>
                    <th>Available</th>
                    <th>Qty</th>
                    <th>Price (+10%)</th>
                    <th>Ship</th>
                    <th>Tax+CC</th>
                    <th>Cust. Total</th>
                    <th>Our 10% Net</th>
                    {ownerMode && <th>Keep/Cut</th>}
                  </tr>
                </thead>
                <tbody>
                  {list.map((x) => {
                    const avail = getStock(x);
                    const pics = getImgs(x);
                    const qty = cart[x.id] || 1;
                    const m = calcChristmasMath(x.w * qty, x.ship);
                    const checked = !!cart[x.id];
                    const isCut = !!cutIds[x.id];
                    return (
                      <tr key={x.id} style={{ borderBottom: "1px solid #1e293b", opacity: isCut ? 0.45 : 1, background: checked ? "rgba(34,197,94,0.12)" : "transparent" }}>
                        <td style={{ padding: "7px" }}><input type="checkbox" disabled={isCut || avail === 0} checked={checked} onChange={() => toggleBuy(x.id)} style={{ width: "16px", height: "16px", cursor: "pointer" }} /></td>
                        <td style={{ fontWeight: 800, color: tierBadgeColor(x.tier) }}>{x.id}<br/><span style={{ fontSize: "10px" }}>{x.tier}</span></td>
                        <td style={{ padding: "6px 8px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            {[0, 1, 2].map((idx) => (
                              <div key={idx} onClick={() => { setModalItem(x); setModalStartVideo(false); }} style={{ width: "44px", height: "36px", borderRadius: "5px", overflow: "hidden", border: "1px solid #334155", cursor: "pointer", flexShrink: 0 }}>
                                <img src={pics[idx]} alt={`${x.name} ${idx + 1}`} onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG; }} style={{ width: "100%", height: "100%", objectFit: "cover", ...angleCrop(idx) }} />
                              </div>
                            ))}
                            <button onClick={() => { setModalItem(x); setModalStartVideo(true); }} style={{ height: "36px", padding: "0 9px", borderRadius: "5px", background: "#ef4444", color: "#fff", border: "none", fontWeight: 900, fontSize: "11px", cursor: "pointer", whiteSpace: "nowrap" }}>
                              ▶ Video
                            </button>
                          </div>
                        </td>
                        <td style={{ fontWeight: 700, minWidth: "180px" }}>{x.name}</td>
                        <td>
                          {ownerMode ? (
                            <input type="number" min={0} value={avail} onChange={(e) => updateStockCount(x.id, Number(e.target.value) || 0)} style={{ width: "56px", background: "#030712", color: "#fde047", border: "1px solid #fde047", borderRadius: "4px", padding: "3px", fontWeight: 900 }} />
                          ) : (
                            <span style={{ color: "#4ade80", fontWeight: 900 }}>{avail} Avail</span>
                          )}
                        </td>
                        <td><input type="number" min={1} max={Math.max(1, avail)} value={qty} onChange={(e) => setQty(x.id, Number(e.target.value) || 1, avail)} style={{ width: "46px", background: "#030712", color: "#fff", border: "1px solid #475569", borderRadius: "4px", padding: "3px" }} /></td>
                        <td style={{ fontWeight: 800 }}>${m.retailSubtotal.toFixed(2)}</td>
                        <td style={{ color: "#38bdf8", fontWeight: 900 }}>${m.shipping.toFixed(2)}</td>
                        <td style={{ color: "#94a3b8" }}>${(m.tax + m.ccFee).toFixed(2)}</td>
                        <td style={{ color: "#22c55e", fontWeight: 900 }}>${m.grandTotal.toFixed(2)}</td>
                        <td style={{ color: "#fde047", fontWeight: 900 }}>+${m.netProfit10.toFixed(2)} ✓</td>
                        {ownerMode && (
                          <td>
                            <button onClick={() => toggleCut(x.id)} style={{ padding: "4px 8px", borderRadius: "6px", background: isCut ? "#22c55e" : "#ef4444", color: "#fff", border: "none", fontWeight: 800, fontSize: "11px", cursor: "pointer" }}>
                              {isCut ? "👍 Keep" : "👎 Cut"}
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(295px, 1fr))", gap: "16px" }}>
              {list.map((x) => {
                const tab = mediaTab[x.id] ?? 0;
                const avail = getStock(x);
                const pics = getImgs(x);
                const m = calcChristmasMath(x.w * (cart[x.id] || 1), x.ship);
                const checked = !!cart[x.id];
                const isCut = !!cutIds[x.id];
                return (
                  <div key={x.id} style={{ background: "#090d18", opacity: isCut ? 0.5 : 1, border: checked ? "2px solid #22c55e" : "1.5px solid rgba(239,68,68,0.65)", borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ position: "relative", height: "195px", background: "#020617", overflow: "hidden" }}>
                        {tab === 3 ? (
                          <ProductVideoReel sku={x.id} name={x.name} imgs={pics} price={`$${m.retailSubtotal.toFixed(2)}`} stock={avail} customVideo={customVids[x.id]} height={195} />
                        ) : (
                          <>
                            <img src={pics[tab]} alt={x.name} onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG; }} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.25s ease", ...angleCrop(tab) }} />
                            <span style={{ position: "absolute", top: "8px", left: "8px", background: "rgba(2,6,23,0.9)", color: tierBadgeColor(x.tier), border: `1px solid ${tierBadgeColor(x.tier)}`, padding: "3px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: 900 }}>
                              {x.id} • {x.tierLabel}
                            </span>
                            <span style={{ position: "absolute", top: "8px", right: "8px", background: avail > 0 ? "#15803d" : "#dc2626", border: "1px solid #86efac", padding: "3px 8px", borderRadius: "6px", fontSize: "10.5px", fontWeight: 900, color: "#fff" }}>
                              🎄 {avail} Available
                            </span>
                          </>
                        )}
                      </div>

                      {/* 3 DISTINCT PRODUCT ANGLES + WORKING VIDEO PLAYER */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.25fr", gap: "5px", padding: "7px 9px", background: "#050811", borderBottom: "1px solid #1e293b" }}>
                        {[0, 1, 2].map((idx) => (
                          <button key={idx} onClick={() => setMediaTab({ ...mediaTab, [x.id]: idx })} style={{ padding: 0, height: "42px", borderRadius: "6px", overflow: "hidden", border: tab === idx ? "2px solid #38bdf8" : "1px solid #334155", cursor: "pointer", position: "relative" }}>
                            <img src={pics[idx]} alt={`Angle ${idx + 1}`} onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG; }} style={{ width: "100%", height: "100%", objectFit: "cover", ...angleCrop(idx) }} />
                            <span style={{ position: "absolute", bottom: 1, right: 2, background: "rgba(0,0,0,0.8)", color: "#fff", fontSize: "8.5px", padding: "0 3px", borderRadius: "3px", fontWeight: 800 }}>Pic {idx + 1}</span>
                          </button>
                        ))}
                        <button onClick={() => setMediaTab({ ...mediaTab, [x.id]: tab === 3 ? 0 : 3 })} style={{ height: "42px", borderRadius: "6px", border: "1px solid #f43f5e", background: tab === 3 ? "#f43f5e" : "rgba(244,63,94,0.2)", color: "#fff", fontWeight: 900, fontSize: "10.5px", cursor: "pointer" }}>
                          {tab === 3 ? "⏹ Photos" : "▶ Play Video"}
                        </button>
                      </div>

                      <div style={{ padding: "12px" }}>
                        <div style={{ fontWeight: 900, fontSize: "14.5px", lineHeight: 1.25 }}>{x.name}</div>
                        {ownerMode && (
                          <div style={{ marginTop: "8px", padding: "8px", borderRadius: "8px", background: "rgba(250,204,21,0.1)", border: "1px solid #fde047", fontSize: "11px", display: "grid", gap: "6px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <label>Stock: <input type="number" min={0} value={avail} onChange={(e) => updateStockCount(x.id, Number(e.target.value) || 0)} style={{ width: "54px", background: "#030712", color: "#fde047", border: "1px solid #fde047", borderRadius: "4px", padding: "2px 4px", fontWeight: 900 }} /></label>
                              <button onClick={() => toggleCut(x.id)} style={{ padding: "4px 9px", borderRadius: "6px", background: isCut ? "#22c55e" : "#ef4444", color: "#fff", border: "none", fontWeight: 900, cursor: "pointer" }}>
                                {isCut ? "👍 Keep" : "👎 Cut"}
                              </button>
                            </div>
                            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                              {([0, 1, 2] as const).map((slot) => (
                                <label key={slot} style={{ padding: "3px 6px", background: "#1e293b", border: "1px solid #38bdf8", borderRadius: "4px", cursor: "pointer", color: "#bae6fd", fontWeight: 800 }}>
                                  📤 Pic {slot + 1}<input type="file" accept="image/*" onChange={(e) => uploadCustomPhoto(x, slot, e)} style={{ display: "none" }} />
                                </label>
                              ))}
                              <label style={{ padding: "3px 6px", background: "#1e293b", border: "1px solid #f43f5e", borderRadius: "4px", cursor: "pointer", color: "#fda4af", fontWeight: 800 }}>
                                📤 MP4<input type="file" accept="video/*" onChange={(e) => uploadCustomMP4(x.id, e)} style={{ display: "none" }} />
                              </label>
                            </div>
                          </div>
                        )}
                        <div style={{ marginTop: "8px", background: "#030712", padding: "8px", borderRadius: "8px", fontSize: "11.5px", lineHeight: 1.55 }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Price (+10% Margin):</span><strong>${m.retailSubtotal.toFixed(2)}</strong></div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Flat Shipping Tier:</span><strong style={{ color: "#38bdf8" }}>+${m.shipping.toFixed(2)}</strong></div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Cust. Tax + CC Fee:</span><span style={{ color: "#94a3b8" }}>+${(m.tax + m.ccFee).toFixed(2)}</span></div>
                          <div style={{ display: "flex", justifyContent: "space-between", color: "#22c55e", fontWeight: 900, fontSize: "13.5px", borderTop: "1px solid #1e293b", marginTop: "4px", paddingTop: "4px" }}><span>Customer Total:</span><span>${m.grandTotal.toFixed(2)}</span></div>
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: "0 12px 12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                      <button disabled={isCut || avail === 0} onClick={() => toggleBuy(x.id)} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #22c55e", background: checked ? "#22c55e" : "transparent", color: checked ? "#020617" : "#22c55e", fontWeight: 900, fontSize: "11.5px", cursor: "pointer" }}>
                        {checked ? "✓ Selected" : "+ Multi-Buy"}
                      </button>
                      <button disabled={isCut || avail === 0} onClick={() => { setQty(x.id, cart[x.id] || 1, avail); setCheckoutOpen(true); }} style={{ padding: "8px", borderRadius: "8px", border: "none", background: "linear-gradient(90deg,#dc2626,#22c55e)", color: "#fff", fontWeight: 900, fontSize: "11.5px", cursor: "pointer" }}>
                        Acquire →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* SPEC SHEET FULL 3-PHOTO + WORKING VIDEO MODAL */}
      {modalItem && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 95, padding: "16px" }}>
          <div style={{ background: "#0f172a", border: "2px solid #ef4444", borderRadius: "16px", maxWidth: "580px", width: "100%", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <strong style={{ color: "#fde047" }}>{modalItem.id} • {modalItem.name}</strong>
              <button onClick={() => setModalItem(null)} style={{ background: "none", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer" }}>✕</button>
            </div>
            {!modalStartVideo && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "10px" }}>
                {getImgs(modalItem).map((u, idx) => (
                  <div key={idx} style={{ height: "115px", borderRadius: "8px", overflow: "hidden", border: "1px solid #ef4444" }}>
                    <img src={u} alt={`Angle ${idx + 1}`} onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG; }} style={{ width: "100%", height: "100%", objectFit: "cover", ...angleCrop(idx) }} />
                  </div>
                ))}
              </div>
            )}
            <ProductVideoReel
              sku={modalItem.id}
              name={modalItem.name}
              imgs={getImgs(modalItem)}
              price={`$${(modalItem.w * 1.1).toFixed(2)}`}
              stock={getStock(modalItem)}
              customVideo={customVids[modalItem.id]}
              height={240}
            />
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {checkoutOpen && totals && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "16px" }}>
          <div style={{ background: "#0f172a", border: "2px solid #22c55e", borderRadius: "16px", maxWidth: "480px", width: "100%", padding: "18px", maxHeight: "88vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <strong style={{ color: "#fde047" }}>🎄 CHRISTMAS CHECKOUT ({selected.length} SKUs)</strong>
              <button onClick={() => setCheckoutOpen(false)} style={{ background: "none", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer" }}>✕</button>
            </div>
            {selected.map((x) => (
              <div key={x.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", padding: "6px 0", borderBottom: "1px solid #1e293b" }}>
                <span style={{ flex: 1, paddingRight: "8px" }}>{x.name} <em style={{ color: "#4ade80" }}>({getStock(x)} avail)</em></span>
                <input type="number" min={1} max={getStock(x)} value={cart[x.id]} onChange={(e) => setQty(x.id, Number(e.target.value) || 0, getStock(x))} style={{ width: "48px", background: "#030712", color: "#fff", border: "1px solid #475569", padding: "3px", borderRadius: "4px" }} />
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
            <button onClick={() => { alert(`✅ CHRISTMAS ORDER LOCKED!\nSKUs: ${selected.length}\nCustomer Paid: $${totals.grandTotal.toFixed(2)}\nALBS 10% Protected Net: $${totals.netProfit10.toFixed(2)}`); setCart({}); setCheckoutOpen(false); }} style={{ width: "100%", marginTop: "12px", padding: "12px", borderRadius: "10px", background: "linear-gradient(90deg,#22c55e,#38bdf8)", color: "#020617", fontWeight: 900, border: "none", cursor: "pointer" }}>
              ⚡ Confirm & Charge Customer ${totals.grandTotal.toFixed(2)} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
