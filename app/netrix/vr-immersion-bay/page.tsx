"use client";
import React, { useState } from "react";
import Link from "next/link";

const ITEMS = [{"name":"Meta Quest 3S / Pro Full-Body Haptic VR Rig","cat":"VR IMMERSION","w":460},{"name":"Apple Vision Spatial Developer Workstation Dock","cat":"SPATIAL AI","w":690},{"name":"Kat Walk C2 Core Omnidirectional VR Treadmill","cat":"VR TREADMILL","w":890},{"name":"bHaptics TactSuit X40 Wireless Haptic Vest","cat":"HAPTIC SUIT","w":420},{"name":"DJI Avata 2 FPV Cinewhoop Goggles 3 Combo","cat":"FPV DRONES","w":840},{"name":"Unitree Go2 Air Quadruped AI Companion Robot","cat":"ROBOTICS","w":1490},{"name":"NVIDIA Jetson Orin Nano Edge AI Developer Kit","cat":"AI COMPUTE","w":380},{"name":"XREAL Air 2 Ultra AR Spatial Micro-OLED Glasses","cat":"AR OPTICS","w":560}];

export default function NetrixStore() {
  const [q, setQ] = useState("");
  const list = ITEMS.filter(x => (x.name + " " + x.cat).toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ minHeight: "100vh", background: "#030712", color: "#f8fafc", paddingBottom: "80px" }}>
      <div style={{ background: "#090d16", borderBottom: "2px solid #a855f7", padding: "12px 20px", display: "flex", justifyContent: "space-between" }}>
        <Link href="/" style={{ color: "#38bdf8", fontWeight: 900, textDecoration: "none" }}>← Back to ALBS Nexus Reactor</Link>
        <span style={{ color: "#c084fc", fontWeight: 900 }}>⚡ THE MATRIX • AI & VR SUPERSTORE</span>
      </div>
      <div style={{ maxWidth: "1180px", margin: "24px auto", padding: "0 20px" }}>
        <div style={{ background: "#0f172a", border: "2px solid #a855f7", borderRadius: "20px", padding: "24px", textAlign: "center" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 900, margin: "0 0 10px" }}>🤖 The Matrix • VR Immersion, AI Rigs & Robotics Bay</h1>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search AI workstations, VR headsets, drones, robotics & tactical gear..." style={{ width: "100%", maxWidth: "720px", padding: "13px 18px", borderRadius: "12px", border: "2px solid #a855f7", background: "#030712", color: "#fff" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px", marginTop: "20px" }}>
          {list.map((x, i) => (
            <div key={i} style={{ background: "#0f172a", border: "1px solid #a855f7", borderRadius: "16px", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "10px", color: "#c084fc", fontWeight: 900 }}>{x.cat} • +6% VELOCITY MARGIN</div>
                <div style={{ fontSize: "15px", fontWeight: 900, margin: "6px 0" }}>{x.name}</div>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>Wholesale: ${x.w.toFixed(2)}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: "1px solid #1e293b" }}>
                <span style={{ fontSize: "20px", fontWeight: 900, color: "#fbbf24" }}>${(x.w * 1.06).toFixed(2)}</span>
                <Link href="/stores/car-wash-auto" style={{ padding: "8px 14px", borderRadius: "8px", background: "#a855f7", color: "#fff", fontWeight: 900, textDecoration: "none", fontSize: "12px" }}>Order Direct →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
