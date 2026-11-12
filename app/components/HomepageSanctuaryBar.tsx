"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
const S = [
  ["autism-spectrum","#3b82f6","Autism Spectrum","Espectro Autista"],
  ["down-syndrome","#eab308","Down Syndrome","Síndrome de Down"],
  ["deaf-blind","#38bdf8","Deaf / Blind","Sordos y Ciegos"],
  ["ptsd-veterans","#14b8a6","PTSD & Veterans","TEPT y Veteranos"],
  ["mobility-rehab","#22c55e","Mobility & Rehab","Movilidad y Rehab"],
  ["biomedical-peptides","#a855f7","Biomedical Peptides","Péptidos Biomédicos"]
];
export function useEs() {
  const [es, setEs] = useState(false);
  useEffect(() => { const f = () => setEs(localStorage.getItem("albs_lang") === "es"); f(); window.addEventListener("albs-lang", f); return () => window.removeEventListener("albs-lang", f); }, []);
  return { es, tog: () => { localStorage.setItem("albs_lang", es ? "en" : "es"); window.dispatchEvent(new Event("albs-lang")); } };
}
export function SpanishBtn() {
  const { es, tog } = useEs();
  return <button type="button" onClick={tog} style={{ background: "#facc15", color: "#000", fontWeight: 900, border: "2px solid #fff", borderRadius: 999, padding: "8px 15px", fontSize: 12.5, cursor: "pointer", whiteSpace: "nowrap" }}>{es ? "🇺🇸 ENGLISH" : "🇪🇸 ESPAÑOL"}</button>;
}
export default function HomepageSanctuaryBar() {
  const { es } = useEs();
  return (<div style={{ background: "rgba(9,13,26,0.94)", border: "1px solid #334155", borderRadius: 14, padding: "8px 10px", maxWidth: 1220, margin: "0 auto" }}>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 7 }}>
      <b style={{ fontSize: 12.5, color: "#fff", letterSpacing: 1 }}>{es ? "🎗️ SANTUARIOS DE ESPERANZA • AYUDA Y RECURSOS" : "🎗️ SANCTUARIES OF HOPE • CARE & HELP HUB"}</b>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}><Link href="/stores/emergency-ready" style={{ background: "#dc2626", color: "#fde047", fontWeight: 900, borderRadius: 999, padding: "6px 11px", fontSize: 11.5, textDecoration: "none" }}>{es ? "🚨 Emergencias" : "🚨 Emergency Store"}</Link><SpanishBtn /></div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(155px,1fr))", gap: 6 }}>{S.map(([id, c, en, sp]) => <Link key={id} href={`/sanctuary/${id}`} style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 10px", borderRadius: 10, border: `2px solid ${c}`, background: "#0f172a", color: "#fff", textDecoration: "none", fontWeight: 800, fontSize: 12 }}><span>🎗️</span><div><div>{es ? sp : en}</div><div style={{ fontSize: 10, color: "#93c5fd" }}>{es ? "Ayuda, ZIP y Tienda →" : "Help, ZIP & Store →"}</div></div></Link>)}</div></div>);
}
