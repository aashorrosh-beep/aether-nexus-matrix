"use client";
import React, { useState, useEffect } from "react";

export default function ProductVideoReel({
  sku,
  name,
  imgs,
  price,
  stock,
  customVideo,
  height = 190,
}: {
  sku: string;
  name: string;
  imgs: [string, string, string];
  price: string;
  stock: number;
  customVideo?: string;
  height?: number;
}) {
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0); // 0 to 12 seconds loop

  useEffect(() => {
    if (!playing || customVideo) return;
    const iv = setInterval(() => {
      setElapsed((prev) => (prev + 0.1 >= 12 ? 0 : +(prev + 0.1).toFixed(1)));
    }, 100);
    return () => clearInterval(iv);
  }, [playing, customVideo]);

  if (customVideo) {
    return (
      <video
        src={customVideo}
        controls
        autoPlay
        muted
        loop
        playsInline
        style={{ width: "100%", height: `${height}px`, objectFit: "cover", background: "#000", display: "block" }}
      />
    );
  }

  const angleIdx = elapsed < 4 ? 0 : elapsed < 8 ? 1 : 2;
  const phase = (elapsed % 4) / 4; // 0 -> 1 inside current 4s shot
  const scale = angleIdx === 0 ? 1.02 + phase * 0.14 : angleIdx === 1 ? 1.32 - phase * 0.12 : 1.12 + phase * 0.16;
  const panX = angleIdx === 0 ? -phase * 3 : angleIdx === 1 ? 4 - phase * 8 : -3 + phase * 6;
  const angleLabel = angleIdx === 0 ? "ANGLE 1 • STUDIO FULL" : angleIdx === 1 ? "ANGLE 2 • DETAIL ZOOM" : "ANGLE 3 • ALT SPEC VIEW";

  return (
    <div style={{ position: "relative", width: "100%", height: `${height}px`, background: "#020617", overflow: "hidden", userSelect: "none" }}>
      <img
        src={imgs[angleIdx]}
        alt={name}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=700&q=80";
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale.toFixed(3)}) translateX(${panX.toFixed(2)}%)`,
          transition: "transform 0.12s linear",
          filter: "contrast(1.06) saturate(1.12)",
        }}
      />

      {/* Subtle cinema vignette + live spec HUD */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(2,6,23,0.55) 0%, transparent 35%, transparent 62%, rgba(2,6,23,0.9) 100%)", pointerEvents: "none" }} />

      <div style={{ position: "absolute", top: "8px", left: "8px", right: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", pointerEvents: "none" }}>
        <span style={{ background: "rgba(220,38,38,0.92)", color: "#fff", padding: "2px 7px", borderRadius: "5px", fontSize: "9.5px", fontWeight: 900, letterSpacing: "0.06em" }}>
          ● HD REEL • {angleLabel}
        </span>
        <span style={{ background: "rgba(2,6,23,0.88)", color: "#4ade80", border: "1px solid #22c55e", padding: "2px 7px", borderRadius: "5px", fontSize: "9.5px", fontWeight: 900 }}>
          {price} • {stock} Avail
        </span>
      </div>

      {/* Interactive Video Controls Bar */}
      <div style={{ position: "absolute", bottom: "6px", left: "8px", right: "8px", display: "flex", alignItems: "center", gap: "8px", zIndex: 10 }}>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setPlaying(!playing); }}
          style={{ width: "26px", height: "24px", borderRadius: "5px", border: "1px solid #38bdf8", background: "rgba(15,23,42,0.92)", color: "#fff", fontSize: "11px", fontWeight: 900, cursor: "pointer" }}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <input
          type="range"
          min={0}
          max={11.9}
          step={0.1}
          value={elapsed}
          onChange={(e) => setElapsed(Number(e.target.value))}
          style={{ flex: 1, accentColor: "#ef4444", cursor: "pointer", height: "4px" }}
        />
        <span style={{ fontSize: "10px", fontWeight: 800, color: "#e2e8f0", minWidth: "54px", textAlign: "right" }}>
          0:{String(Math.floor(elapsed)).padStart(2, "0")} / 0:12
        </span>
      </div>
    </div>
  );
}
