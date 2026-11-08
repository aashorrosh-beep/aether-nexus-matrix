"use client";
import React, { useState } from "react";
import Link from "next/link";
import { NOSTALGIA_WALL } from "../data/nostalgia-wall";

export default function WorldsFairPavilion() {
  const [q, setQ] = useState("");
  const [decade, setDecade] = useState("all");
  const [edition, setEdition] = useState<"orig" | "rep">("orig");
  const [bridge, setBridge] = useState(true);

  const list = NOSTALGIA_WALL.filter(x =>
    (decade === "all" || x.decade === decade) &&
    (x.name + " " + x.future + " " + x.cat).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#030712", color: "#f8fafc", paddingBottom: "90px" }}>
      <div style={{ background: "#090d16", borderBottom: "2px solid #f59e0b", padding: "12px 20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Link href="/" style={{ color: "#38bdf8", fontWeight: 900, textDecoration: "none" }}>← Back to ALBS Nexus Reactor</Link>
        <span style={{ color: "#fbbf24", fontWeight: 900 }}>🌍 WORLD'S FAIR EXPO PAVILION • 60s–90s ICONS ➔ THE FUTURE</span>
      </div>
      <div style={{ maxWidth: "1220px", margin: "20px auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "10px", marginBottom: "16px" }}>
          <Link href="/nostalgia/concierge" style={{ background: "#1e3a8a", border: "2px solid #fbbf24", borderRadius: "14px", padding: "12px", textDecoration: "none", color: "#fff", fontWeight: 900 }}>🎩 3-Hr Vintage Grail Concierge →</Link>
          <Link href="/stores/luxury-couture" style={{ background: "#451a03", border: "2px solid #f59e0b", borderRadius: "14px", padding: "12px", textDecoration: "none", color: "#fbbf24", fontWeight: 900 }}>👑 Le Grand Salon (LV, Gucci, Prada) →</Link>
          <Link href="/stores/squish-blindbox" style={{ background: "#831843", border: "2px solid #ec4899", borderRadius: "14px", padding: "12px", textDecoration: "none", color: "#fff", fontWeight: 900 }}>🧸 240 Squish & Blind-Box Vault →</Link>
          <Link href="/netrix/vr-immersion-bay" style={{ background: "#581c87", border: "2px solid #38bdf8", borderRadius: "14px", padding: "12px", textDecoration: "none", color: "#38bdf8", fontWeight: 900 }}>🚀 Enter The Matrix Future Tech →</Link>
        </div>

        <div style={{ background: "#0f172a", border: "2px solid #f59e0b", borderRadius: "20px", padding: "20px", textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 900, margin: "0 0 8px" }}>🌍 World's Fair Pavilion: 28 Hottest Icons (60s–90s) ➔ Future</h1>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search Picturephone, Pulsar Watch, G.I. Joe, Dark Tower, Sharper Image, RadioShack, Overalls..." style={{ width: "100%", maxWidth: "760px", padding: "12px", borderRadius: "10px", border: "2px solid #f59e0b", background: "#030712", color: "#fff" }} />
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
            <button onClick={() => setEdition("orig")} style={{ padding: "8px 14px", borderRadius: "8px", background: edition === "orig" ? "#f59e0b" : "#090d16", color: edition === "orig" ? "#030712" : "#fbbf24", border: "1px solid #fbbf24", fontWeight: 900, cursor: "pointer" }}>🏆 Original Vintage Grails</button>
            <button onClick={() => setEdition("rep")} style={{ padding: "8px 14px", borderRadius: "8px", background: edition === "rep" ? "#38bdf8" : "#090d16", color: edition === "rep" ? "#030712" : "#38bdf8", border: "1px solid #38bdf8", fontWeight: 900, cursor: "pointer" }}>⚡ Modern Replicas</button>
            <button onClick={() => setBridge(!bridge)} style={{ padding: "8px 14px", borderRadius: "8px", background: bridge ? "#a855f7" : "#090d16", color: "#fff", border: "1px solid #a855f7", fontWeight: 900, cursor: "pointer" }}>🔮 Future Bridge: {bridge ? "ON" : "OFF"}</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "10px" }}>
            {[["all","All 28"],["60s","✌️ 1960s"],["70s","🪩 1970s"],["80s","🕹️ 1980s"],["90s","⚡ 1990s"]].map(([id,lbl]) => (
              <button key={id} onClick={() => setDecade(id)} style={{ padding: "6px 14px", borderRadius: "999px", background: decade === id ? "#f59e0b" : "#1e293b", color: decade === id ? "#030712" : "#fff", border: "1px solid #f59e0b", fontWeight: 900, cursor: "pointer" }}>{lbl}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(275px, 1fr))", gap: "14px", marginTop: "16px" }}>
          {list.map(item => {
            const w = edition === "orig" ? item.origW : item.repW;
            return (
              <div key={item.id} style={{ background: "#0f172a", border: "1px solid #f59e0b", borderRadius: "16px", padding: "14px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "10px", fontWeight: 900, color: "#fbbf24" }}>🌍 {item.decade.toUpperCase()} EXPO • {edition === "orig" ? "🏆 ORIGINAL" : "⚡ REPLICA"}</div>
                  <div style={{ fontSize: "15px", fontWeight: 900, margin: "6px 0" }}>{item.name}</div>
                  {bridge && (
                    <Link href={item.futureHref} style={{ display: "block", padding: "8px", borderRadius: "8px", background: "rgba(168,85,247,0.18)", border: "1px solid #a855f7", color: "#e9d5ff", textDecoration: "none", fontSize: "11px" }}>
                      <strong>⚡ FUTURE EVOLUTION ➔</strong> {item.future} →
                    </Link>
                  )}
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
