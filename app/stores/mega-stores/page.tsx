"use client";
import React, { useState } from "react";
import Link from "next/link";
const MEGAS: [string, string, string, string, string][] = [
  ["/stores/shoe-store","#0284c7","👟","APEX SHOE VAULT",
   "160+ Footwear • Women's 5-12, Men's 6-15, Wide & Youth"],
  ["/stores/music-town","#e11d48","🎸","NEXUS MUSIC TOWN",
   "168+ Vinyl, CDs, Tapes, Posters, DVDs, Turntables & Samples"],
  ["/stores/emergency-ready","#ea580c","🚨","EMERGENCY SUPERSTORE",
   "200+ Flood Dams, Hurricane Generators, Fire & Water Gear"],
  ["/stores/car-wash-auto","#10b981","🚗","PRO CAR WASH & AUTO",
   "Foam Cannons, Ceramic Coatings, Polishers & Shop Vacs"],
  ["/stores/stargazer-mall","#6366f1","🕶️","ECLIPSE & STARGAZER",
   "ISO 12312-2 Solar Eclipse Glasses, Scopes & Astro Gear"],
  ["/stores/christmas-store","#dc2626","🎄","365 CHRISTMAS STORE",
   "165+ Exterior Lights, Inflatables, Wrapping & Hot Gifts"]
];
export default function MegaStoresPage() {
  const [q, setQ] = useState("");
  const list = MEGAS.filter(m =>
    (m[3] + " " + m[4]).toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ minHeight:"100vh", background:"#040711",
      color:"#fff", padding:"20px 14px", fontFamily:"system-ui" }}>
      <div style={{ maxWidth:1140, margin:"0 auto" }}>
        <div style={{ background:"#0f172a", border:"2px solid #facc15",
          borderRadius:16, padding:18, marginBottom:16 }}>
          <Link href="/" style={{ color:"#fde047", fontWeight:900,
            textDecoration:"none", fontSize:13 }}>← ALBS NEXUS GALAXY</Link>
          <h1 style={{ margin:"6px 0 8px", fontSize:23, fontWeight:900 }}>
            ⚡ ALBS MEGA STORES ROTUNDA
          </h1>
          <input value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search Mega Stores (shoes, vinyl, flood, auto)..."
            style={{ width:"100%", background:"#020617", color:"#fff",
              border:"1.5px solid #38bdf8", borderRadius:999,
              padding:"9px 15px", fontSize:13 }} />
        </div>
        <div style={{ display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))", gap:14 }}>
          {list.map(([hr, col, ic, ti, sb]) => (
            <Link key={hr} href={hr} style={{ background:"#0b1120",
              border:"2px solid " + col, borderRadius:15, padding:16,
              textDecoration:"none", color:"#fff", display:"flex",
              gap:12, alignItems:"center" }}>
              <span style={{ fontSize:34 }}>{ic}</span>
              <div><b style={{ color:"#fde047", fontSize:15 }}>{ti}</b>
                <div style={{ fontSize:12, color:"#cbd5e1", marginTop:4 }}>{sb}</div>
              </div></Link>))}
        </div></div></div>);
}
