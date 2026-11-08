"use client";
import React, { useState } from "react";
import Link from "next/link";
import { NOSTALGIA_WALL } from "../data/nostalgia-wall";

export default function NostalgiaMegaHub() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [edition, setEdition] = useState<"orig" | "rep">("orig");

  const list = NOSTALGIA_WALL.filter(x =>
    (cat === "all" || x.cat === cat) &&
    (x.name + " " + x.badge + " " + x.desc).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 12%, #3b0764 0%, #030712 70%)", color: "#f8fafc", paddingBottom: "90px" }}>
      <div style={{ background: "#090d16", borderBottom: "2px solid #f59e0b", padding: "12px 20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
        <Link href="/" style={{ color: "#38bdf8", fontWeight: 900, textDecoration: "none" }}>← Back to ALBS Nexus Reactor</Link>
        <span style={{ color: "#fbbf24", fontWeight: 900 }}>🕹️ CONSOLIDATED NOSTALGIA MEGA-WALL • 60s–2000s TOP SELLERS (ORIGINALS & REPLICAS)</span>
      </div>

      <div style={{ maxWidth: "1220px", margin: "20px auto", padding: "0 20px" }}>
        {/* 3 MEGA PORTAL CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px", marginBottom: "18px" }}>
          <Link href="/stores/squish-blindbox" style={{ background: "#831843", border: "2px solid #ec4899", borderRadius: "16px", padding: "14px", textDecoration: "none", color: "#fff" }}>
            <div style={{ fontSize: "11px", fontWeight: 900, color: "#fbcfe8" }}>🧸 240 SKUS @ 10% MARGIN</div>
            <div style={{ fontSize: "17px", fontWeight: 900 }}>Squishmallow & Blind-Box Vault →</div>
          </Link>
          <Link href="/stores/christmas-holiday" style={{ background: "#14532d", border: "2px solid #22c55e", borderRadius: "16px", padding: "14px", textDecoration: "none", color: "#fff" }}>
            <div style={{ fontSize: "11px", fontWeight: 900, color: "#bbf7d0" }}>🎄 250 HOLIDAY & GAG SKUS</div>
            <div style={{ fontSize: "17px", fontWeight: 900 }}>Christmas Story & Holiday Store →</div>
          </Link>
          <Link href="/nostalgia/concierge" style={{ background: "#1e3a8a", border: "2px solid #38bdf8", borderRadius: "16px", padding: "14px", textDecoration: "none", color: "#fff" }}>
            <div style={{ fontSize: "11px", fontWeight: 900, color: "#bae6fd" }}>🎩 3-HR RARE GRAIL FINDER</div>
            <div style={{ fontSize: "17px", fontWeight: 900 }}>Original Vintage AI Concierge →</div>
          </Link>
        </div>

        {/* MAIN FILTER & ORIGINAL VS REPLICA SWITCHER */}
        <div style={{ background: "#0f172a", border: "2px solid #f59e0b", borderRadius: "20px", padding: "22px", textAlign: "center" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 900, margin: "0 0 8px" }}>🕹️ 60s, 70s, 80s, 90s & 2000s Consolidated Super-Corridor</h1>
          <p style={{ fontSize: "13px", color: "#cbd5e1", margin: "0 0 14px" }}>
            We consolidated 44+ niche nostalgia rooms into 6 power departments. Toggle between <strong style={{ color: "#fbbf24" }}>Original Vintage Collector Grails</strong> and <strong style={{ color: "#38bdf8" }}>Modern Replicas & Tribute Editions</strong> below!
          </p>

          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search G.I. Joe, HeroQuest, Sharper Image, RadioShack, Surge, Altoids, Pokémon, MTG, Sports Cards, Bib Overalls..." style={{ width: "100%", maxWidth: "780px", padding: "13px 16px", borderRadius: "12px", border: "2px solid #f59e0b", background: "#030712", color: "#fff" }} />

          {/* ORIGINAL VS REPLICA TOGGLE */}
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "14px", flexWrap: "wrap" }}>
            <button onClick={() => setEdition("orig")} style={{ padding: "10px 18px", borderRadius: "12px", border: "2px solid #fbbf24", background: edition === "orig" ? "#f59e0b" : "#090d16", color: edition === "orig" ? "#030712" : "#fbbf24", fontWeight: 900, cursor: "pointer" }}>
              🏆 Original Vintage Collector Grails (High-Ticket)
            </button>
            <button onClick={() => setEdition("rep")} style={{ padding: "10px 18px", borderRadius: "12px", border: "2px solid #38bdf8", background: edition === "rep" ? "#38bdf8" : "#090d16", color: edition === "rep" ? "#030712" : "#38bdf8", fontWeight: 900, cursor: "pointer" }}>
              ⚡ Modern Tribute & Reissue Replicas (Everyday Price)
            </button>
          </div>

          {/* 6 CONSOLIDATED DEPARTMENT TABS */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "14px" }}>
            {[
              ["all", "🌟 All Consolidated Stores"],
              ["toys-games", "🎲 Grail Toys (G.I. Joe) & Board Games"],
              ["sharper-shack", "⚡ Sharper Image, RadioShack & Watches"],
              ["candy-drinks", "🍬 Retro Candy, Soda & New Freeze-Dried"],
              ["tcg-coins", "🃏 Combined Pokémon, MTG, Sports Cards & Coins"],
              ["apparel-posters", "👕 60s–90s Overalls, Kicks, Hats & Posters"]
            ].map(([id, lbl]) => (
              <button key={id} onClick={() => setCat(id)} style={{ padding: "8px 14px", borderRadius: "999px", background: cat === id ? "#ec4899" : "#1e293b", color: "#fff", border: "1px solid #f472b6", fontWeight: 800, fontSize: "12px", cursor: "pointer" }}>{lbl}</button>
            ))}
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginTop: "18px" }}>
          {list.map(item => {
            const w = edition === "orig" ? item.origW : item.repW;
            const retail = +(w * item.m).toFixed(2);
            return (
              <div key={item.id} style={{ background: "#0f172a", border: edition === "orig" ? "1px solid #f59e0b" : "1px solid #38bdf8", borderRadius: "16px", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", fontWeight: 900, color: edition === "orig" ? "#fbbf24" : "#38bdf8" }}>
                    <span>{item.badge}</span>
                    <span>{edition === "orig" ? "🏆 ORIGINAL VINTAGE" : "⚡ REPLICA / TRIBUTE"}</span>
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 900, margin: "6px 0" }}>{item.name}</div>
                  <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.4 }}>{item.desc}</p>
                </div>
                <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid #1e293b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "10px", color: "#94a3b8" }}>Wholesale Base: ${w.toFixed(2)}</div>
                    <div style={{ fontSize: "20px", fontWeight: 900, color: "#22c55e" }}>${retail.toFixed(2)}</div>
                  </div>
                  <Link href="/stores/squish-blindbox" style={{ padding: "9px 14px", borderRadius: "10px", background: edition === "orig" ? "#f59e0b" : "#38bdf8", color: "#030712", fontWeight: 900, textDecoration: "none", fontSize: "12px" }}>
                    Lock Order →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
