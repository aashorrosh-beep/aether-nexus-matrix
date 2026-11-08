"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function VintageGrailConcierge() {
  const [item, setItem] = useState("");
  const [era, setEra] = useState("1980s");
  const [cond, setCond] = useState("Mint Boxed / Graded");
  const [budget, setBudget] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 15%, #1e3a8a 0%, #030712 70%)", color: "#f8fafc", paddingBottom: "90px" }}>
      <div style={{ background: "#090d16", borderBottom: "2px solid #38bdf8", padding: "12px 20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Link href="/nostalgia" style={{ color: "#fbbf24", fontWeight: 900, textDecoration: "none" }}>← Back to World&apos;s Fair Pavilion</Link>
        <span style={{ color: "#38bdf8", fontWeight: 900 }}>🎩 VERIFIED VINTAGE GRAIL CONCIERGE • 3-HR AUTHENTICATED SOURCING</span>
      </div>

      <div style={{ maxWidth: "820px", margin: "28px auto", padding: "0 20px" }}>
        <div style={{ background: "#0f172a", border: "2px solid #f59e0b", borderRadius: "22px", padding: "28px", boxShadow: "0 0 45px rgba(245,158,11,0.2)" }}>
          <div style={{ fontSize: "12px", fontWeight: 900, color: "#fbbf24", letterSpacing: "0.12em" }}>🔍 AUTHENTICATED ARCHIVE & AUCTION NETWORK</div>
          <h1 style={{ fontSize: "28px", fontWeight: 900, margin: "6px 0 10px" }}>Hunt Any Old, Classic or Rare Item — Verified & Delivered</h1>
          <p style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: 1.5, marginBottom: "20px" }}>
            Looking for an original 60s–90s toy, sealed board game, vintage watch, classic arcade, PSA slab, or discontinued piece of history? Our concierge team verifies authenticity, serial numbers, and provenance across private vaults within <strong>3 Hours</strong> and locks your price on a <strong>24-Hour Hold</strong>.
          </p>

          {submitted ? (
            <div style={{ background: "#090d16", border: "2px solid #22c55e", borderRadius: "16px", padding: "22px", textAlign: "center" }}>
              <div style={{ fontSize: "24px" }}>✅🎩⚡</div>
              <h3 style={{ color: "#22c55e", fontWeight: 900, margin: "6px 0" }}>3-Hour Vintage Grail Search Dispatched!</h3>
              <p style={{ fontSize: "13px", color: "#e2e8f0" }}>
                Target: <strong>{item}</strong> ({era} • {cond})<br/>
                We are scanning verified collector vaults now and will send your private authenticated checkout link to <strong>{contact}</strong> within 3 hours.
              </p>
              <button onClick={() => setSubmitted(false)} style={{ marginTop: "12px", padding: "10px 18px", borderRadius: "10px", background: "#f59e0b", color: "#030712", fontWeight: 900, border: "none", cursor: "pointer" }}>Submit Another Grail Hunt</button>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "14px" }}>
              <input value={item} onChange={e => setItem(e.target.value)} placeholder="Exact vintage item name (e.g. 1985 G.I. Joe USS Flagg, 1972 Pulsar LED Watch, 1979 Walkman)..." style={{ padding: "14px", borderRadius: "12px", border: "1px solid #38bdf8", background: "#030712", color: "#fff" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <select value={era} onChange={e => setEra(e.target.value)} style={{ padding: "13px", borderRadius: "12px", border: "1px solid #475569", background: "#030712", color: "#fbbf24", fontWeight: 800 }}>
                  <option>1960s Classic</option><option>1970s Vintage</option><option>1980s Golden Era</option><option>1990s Throwback</option><option>2000s Y2K Vault</option>
                </select>
                <select value={cond} onChange={e => setCond(e.target.value)} style={{ padding: "13px", borderRadius: "12px", border: "1px solid #475569", background: "#030712", color: "#38bdf8", fontWeight: 800 }}>
                  <option>Mint Boxed / Sealed (AFA/PSA)</option><option>Verified Working Original</option><option>Complete Collector Grade</option><option>Modern Replica / Reissue</option>
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input value={budget} onChange={e => setBudget(e.target.value)} placeholder="Target Budget (e.g. $250 - $1,500)" style={{ padding: "13px", borderRadius: "12px", border: "1px solid #475569", background: "#030712", color: "#fff" }} />
                <input value={contact} onChange={e => setContact(e.target.value)} placeholder="Your Email or SMS for 3-Hr Hold Link" style={{ padding: "13px", borderRadius: "12px", border: "1px solid #475569", background: "#030712", color: "#fff" }} />
              </div>
              <button onClick={() => item && setSubmitted(true)} style={{ padding: "15px", borderRadius: "12px", background: "linear-gradient(90deg, #f59e0b, #38bdf8)", color: "#030712", fontWeight: 900, fontSize: "15px", border: "none", cursor: "pointer" }}>
                🎩 Launch Verified 3-Hour Grail Search (Lock 24-Hr Hold) →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
