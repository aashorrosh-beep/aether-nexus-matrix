"use client";

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Dawn Sky to Warm Horizon Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, #090d16 0%, #1e1b4b 35%, #78350f 72%, #09090b 100%)"
        }}
      />
      {/* Rising Golden Sun Glow Shining Through the Mountains */}
      <div
        style={{
          position: "absolute",
          bottom: "16vh",
          left: "50%",
          transform: "translateX(-50%)",
          width: "750px",
          height: "380px",
          borderRadius: "9999px",
          background: "radial-gradient(circle, rgba(254,240,138,0.55) 0%, rgba(245,158,11,0.28) 42%, transparent 72%)",
          filter: "blur(24px)"
        }}
      />
      {/* Layered Mountain Ridges Silhouette */}
      <svg
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "38vh" }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#92400e"
          fillOpacity="0.38"
          d="M0,224L160,128L340,208L540,64L760,192L980,96L1220,208L1440,112L1440,320L0,320Z"
        />
        <path
          fill="#09090b"
          d="M0,264L200,172L410,256L640,124L890,248L1140,148L1330,232L1440,180L1440,320L0,320Z"
        />
      </svg>
    </div>
  );
}
