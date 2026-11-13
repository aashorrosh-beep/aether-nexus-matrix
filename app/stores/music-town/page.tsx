"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiloItemGrid from "../../components/SiloItemGrid";
import NexusCheckoutModal from "../../components/NexusCheckoutModal";
import { MUSIC_INV, calcMu } from "./music-inventory";
type Tr = {
  id: string; track: string; artist: string;
  art: string; preview: string;
};
const CATS = [
  ["all","🎸 All (168)"],["vinyl","💿 180g Vinyl"],
  ["cds","💿 CDs & Box Sets"],["cassettes","📼 Cassettes"],
  ["posters","🖼️ Old & New Posters"],["movies","🎬 DVDs & 4K"],
  ["audio","📻 Turntables & Boomboxes"],["digital","⬇️ Digital Vault"]
];
const GENRES = [
  "80s Classic Rock","90s Hip Hop","80s Synth Pop","70s Motown Soul",
  "Jazz Classics","90s Country","Heavy Metal","80s Movie Themes"
];
export default function MusicTownStore() {
  const [cat, setCat] = useState("all"), [q, setQ] = useState("");
  const [sq, setSq] = useState("80s Classic Rock");
  const [trs, setTrs] = useState<Tr[]>([]), [src, setSrc] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [co, setCo] = useState(false), [cm, setCm] = useState("order");
  const sample = (t: string) => {
    setSq(t);
    fetch("/api/music-preview?q=" + encodeURIComponent(t))
      .then(r => r.json()).then(d => setTrs(d.items || [])).catch(() => {});
  };
  useEffect(() => { sample("80s Classic Rock"); }, []);
  const dlWav = () => {
    const sr = 22050, ln = sr * 2, b = new ArrayBuffer(44 + ln * 2);
    const v = new DataView(b), w = (o: number, s: string) =>
      [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
    w(0,"RIFF"); v.setUint32(4,36+ln*2,true); w(8,"WAVEfmt ");
    v.setUint32(16,16,true); v.setUint16(20,1,true); v.setUint16(22,1,true);
    v.setUint32(24,sr,true); v.setUint32(28,sr*2,true);
    v.setUint16(32,2,true); v.setUint16(34,16,true);
    w(36,"data"); v.setUint32(40,ln*2,true);
    for (let i = 0; i < ln; i++) {
      const t = i / sr, s = Math.sin(1382 * t) + Math.sin(2073 * t);
      v.setInt16(44 + i * 2, s * 7500 * Math.exp(-t), true);
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([b], { type: "audio/wav" }));
    a.download = "ALBS-MusicTown-Sample.wav"; a.click();
  };
  const list = MUSIC_INV.filter(x => (cat === "all" ? true : x.cat === cat) && x.name.toLowerCase().includes(q.toLowerCase()));
  const ln = MUSIC_INV.filter(x => (cart[x.id] ?? 0) > 0), cnt = ln.reduce((s, x) => s + cart[x.id], 0);
  const sub = +ln.reduce((s, x) => s + calcMu(x.w, x.ship).r * cart[x.id], 0).toFixed(2);
  const ship = sub === 0 ? 0 : sub < 100 ? 3.99 : 7.99, tax = +(sub * 0.0825).toFixed(2);
  const tot = sub === 0 ? 0 : +((sub + ship + tax + 0.3) / 0.971).toFixed(2);
  const bt = (bg: string, c = "#fff") => ({ background: bg, color: c, fontWeight: 900, border: 0, borderRadius: 9, padding: "8px 12px", fontSize: 12, cursor: "pointer" });
  return (<div style={{ minHeight: "100vh", background: "#090612", color: "#fff", padding: "16px 12px", fontFamily: "system-ui" }}><div style={{ maxWidth: 1260, margin: "0 auto" }}>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", background: "linear-gradient(90deg,#881337,#4c1d95,#0f172a)", padding: 15, borderRadius: 16, border: "2px solid #f43f5e", marginBottom: 12 }}>
      <div><Link href="/" style={{ color: "#fda4af", fontSize: 12, textDecoration: "none", fontWeight: 800 }}>← ALBS NEXUS HUB</Link><h1 style={{ margin: "3px 0 0", fontSize: 21, fontWeight: 900 }}>🎸 NEXUS MUSIC TOWN • VINYL, CDS, TAPES, POSTERS, DVDS & TURNTABLES</h1></div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}><button onClick={dlWav} style={bt("#0284c7")}>⬇️ Free .WAV Synth Sample</button><button onClick={() => { setCm("giftcard"); setCo(true); }} style={bt("#facc15", "#000")}>🎁 Gift Cards</button><button onClick={() => { setCm("order"); setCo(true); }} style={bt("#22c55e", "#000")}>🛒 ({cnt}) ${tot.toFixed(2)}</button></div>
    </div>
    <div style={{ background: "#130d24", border: "1.5px solid #f43f5e", borderRadius: 14, padding: 12, marginBottom: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 8 }}><b style={{ color: "#fde047", fontSize: 13 }}>🎧 SELF-SERVE LISTENING BOOTH (30-SEC SAMPLES):</b>{GENRES.map(g => <button key={g} onClick={() => sample(g)} style={bt(sq === g ? "#e11d48" : "#1e293b")}>{g}</button>)}</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}><input value={sq} onChange={e => setSq(e.target.value)} onKeyDown={e => e.key === "Enter" && sample(sq)} placeholder="Type any artist, band, song, or movie soundtrack..." style={{ flex: 1, background: "#090d16", border: "1px solid #475569", color: "#fff", borderRadius: 8, padding: "8px 12px", fontSize: 12 }} /><button onClick={() => sample(sq)} style={bt("#e11d48")}>▶ Load Samples</button></div>
      {src ? <audio src={src} autoPlay onEnded={() => setSrc("")} /> : null}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 8 }}>{trs.map(t => (<div key={t.id} style={{ background: "#090d16", border: "1px solid #334155", borderRadius: 10, padding: 8, display: "flex", gap: 8, alignItems: "center" }}><img src={t.art} alt="" style={{ width: 44, height: 44, borderRadius: 6 }} /><div style={{ flex: 1, minWidth: 0, fontSize: 11 }}><div style={{ fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.track}</div><div style={{ color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.artist}</div></div><button onClick={() => setSrc(src === t.preview ? "" : t.preview)} style={bt(src === t.preview ? "#22c55e" : "#e11d48", src === t.preview ? "#000" : "#fff")}>{src === t.preview ? "⏹" : "▶"}</button></div>))}</div>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>{CATS.map(([k, l]) => <button key={k} onClick={() => setCat(k)} style={bt(cat === k ? "#e11d48" : "#1e293b")}>{l}</button>)}<input value={q} onChange={e => setQ(e.target.value)} placeholder="Search vinyl, CDs, cassettes, blacklight posters, DVDs, turntables, boomboxes..." style={{ flex: 1, minWidth: 200, background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 12 }} /></div>
    <SiloItemGrid items={list} accent="#e11d48" calc={calcMu} onAdd={id => setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 })} onBuy={id => { setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 }); setCm("order"); setCo(true); }} />
  </div><NexusCheckoutModal open={co} mode0={cm} store="NEXUS Music Town" summary={cnt + " Item(s)"} total={tot} ship={ship} tax={tax} onClose={() => setCo(false)} onDone={() => setCart({})} /></div>);
}
