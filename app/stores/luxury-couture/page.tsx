"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LUXURY_VAULT } from "../../data/luxury-vault";

export default function LuxurySalon() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [tier, setTier] = useState<"orig" | "rep">("orig");
  const list = LUXURY_VAULT.filter(x => (cat === "all" || x.cat === cat) && (x.name + " " + x.badge).toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={{ minHeight: "100vh", background: "#030712", color: "#f8fafc", paddingBottom: "90px" }}>
      <div style={{ background: "#090d16", borderBottom: "2px solid #f59e0b", padding: "12px 20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Link href="/nostalgia" style={{ color: "#38bdf8", fontWeight: 900, textDecoration: "none" }}>← Back to World's Fair Pavilion</Link>
        <span style={{ color: "#fbbf24", fontWeight: 900 }}>👑 LE GRAND SALON • LV, GUCCI, PRADA, RED-BOTTOMS, WATCHES, PENS & THROWS</span>
      </div>
      <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 20px" }}>
        <div style={{ background: "#0f172a", border: "2px solid #f59e0b", borderRadius: "20px", padding: "20px", textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 900, margin: "0 0 8px" }}>👑 Le Grand Salon • Haute Couture, Red-Soles, Horology & Cashmere Throws</h1>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search Louis Vuitton, Gucci, Prada, Red-Bottoms, Watches, Montblanc Pens, Cashmere Throws..." style={{ width: "100%", maxWidth: "740px", padding: "12px", borderRadius: "10px", border: "2px solid #f59e0b", background: "#030712", color: "#fff" }} />
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
            <button onClick={() => setTier("orig")} style={{ padding: "8px 14px", borderRadius: "8px", background: tier === "orig" ? "#f59e0b" : "#090d16", color: tier === "orig" ? "#030712" : "#fbbf24", border: "1px solid #fbbf24", fontWeight: 900, cursor: "pointer" }}>🏆 Authenticated Maison Originals</button>
            <button onClick={() => setTier("rep")} style={{ padding: "8px 14px", borderRadius: "8px", background: tier === "rep" ? "#38bdf8" : "#090d16", color: tier === "rep" ? "#030712" : "#38bdf8", border: "1px solid #38bdf8", fontWeight: 900, cursor: "pointer" }}>⚡ Bespoke Tribute Editions</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "10px" }}>
            {[["all","All Luxury"],["bags","👜 LV, Gucci & Prada Bags"],["shoes","👠 Red-Bottoms & Footwear"],["watches","⌚ Swiss Watches"],["throws-pens","🧣 Throws & Pens"]].map(([id,lbl]) => (
              <button key={id} onClick={() => setCat(id)} style={{ padding: "6px 14px", borderRadius: "999px", background: cat === id ? "#f59e0b" : "#1e293b", color: cat === id ? "#030712" : "#fff", border: "1px solid #f59e0b", fontWeight: 900, cursor: "pointer" }}>{lbl}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "14px", marginTop: "16px" }}>
          {list.map(x => {
            const w = tier === "orig" ? x.origW : x.repW;
            return (
              <div key={x.id} style={{ background: "#0f172a", border: "1px solid #f59e0b", borderRadius: "16px", padding: "14px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "10px", fontWeight: 900, color: "#fbbf24" }}>{x.badge} • {tier === "orig" ? "🏆 COA VERIFIED" : "⚡ TRIBUTE"}</div>
                  <div style={{ fontSize: "15px", fontWeight: 900, margin: "6px 0" }}>{x.name}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8" }}>Wholesale Base: ${w.toFixed(2)} (+10%)</div>
                </div>
                <div style={{ marginTop: "12px", paddingTop: "8px", borderTop: "1px solid #1e293b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "19px", fontWeight: 900, color: "#22c55e" }}>${(w * 1.10).toFixed(2)}</span>
                  <Link href="/nostalgia/concierge" style={{ padding: "7px 12px", borderRadius: "8px", background: "#f59e0b", color: "#030712", fontWeight: 900, textDecoration: "none", fontSize: "12px" }}>Acquire →</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
