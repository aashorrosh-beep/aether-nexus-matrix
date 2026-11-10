"use client";
import React, { useState, useEffect } from "react";

export default function ProductVideoReel({ name, imgs, price, stock, height = 195 }: { name: string; imgs: [string, string, string]; price: string; stock: number; height?: number }) {
  const [play, setPlay] = useState(true);
  const [t, setT] = useState(0);

  useEffect(() => {
    if (!play) return;
    const iv = setInterval(() => setT(p => (p + 0.1 >= 12 ? 0 : +(p + 0.1).toFixed(1))), 100);
    return () => clearInterval(iv);
  }, [play]);

  const idx = t < 4 ? 0 : t < 8 ? 1 : 2;
  const ph = (t % 4) / 4;
  const scale = idx === 0 ? 1.02 + ph * 0.14 : idx === 1 ? 1.26 - ph * 0.12 : 1.08 + ph * 0.14;
  const pan = idx === 0 ? -ph * 3 : idx === 1 ? 3 - ph * 6 : -2 + ph * 4;

  return (
    <div style={{ position: "relative", width: "100%", height: `${height}px`, background: "#020617", overflow: "hidden" }}>
      <img src={imgs[idx]} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale.toFixed(3)}) translateX(${pan.toFixed(2)}%)`, transition: "transform 0.12s linear" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(2,6,23,0.6) 0%,transparent 35%,transparent 65%,rgba(2,6,23,0.92) 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 7, left: 8, right: 8, display: "flex", justifyContent: "space-between", fontSize: "9.5px", fontWeight: 900 }}>
        <span style={{ background: "#dc2626", color: "#fff", padding: "2px 7px", borderRadius: 5 }}>● LIVE VIDEO • SHOT {idx + 1}/3</span>
        <span style={{ background: "rgba(2,6,23,0.9)", color: "#4ade80", border: "1px solid #22c55e", padding: "2px 7px", borderRadius: 5 }}>{price} • {stock} Avail</span>
      </div>
      <div style={{ position: "absolute", bottom: 6, left: 8, right: 8, display: "flex", alignItems: "center", gap: 6, zIndex: 10 }}>
        <button type="button" onClick={() => setPlay(!play)} style={{ width: 26, height: 22, borderRadius: 4, border: "1px solid #38bdf8", background: "#0f172a", color: "#fff", fontSize: 10, cursor: "pointer" }}>{play ? "❚❚" : "▶"}</button>
        <input type="range" min={0} max={11.9} step={0.1} value={t} onChange={e => setT(Number(e.target.value))} style={{ flex: 1, accentColor: "#ef4444", height: 4, cursor: "pointer" }} />
        <span style={{ fontSize: 10, fontWeight: 800, color: "#fff" }}>0:{String(Math.floor(t)).padStart(2, "0")}/0:12</span>
      </div>
    </div>
  );
}
