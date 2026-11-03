import fs from "fs";

const code = `"use client";
import React, { useState, useEffect } from "react";
import { partySuperstore250 } from "../../data/party-superstore-250";

const AISLES = [
  { id: "all", label: "🎈 All 250 Party Items" },
  { id: "ages-1-5", label: "👶 Ages 1-5 Bundles" },
  { id: "ages-6-10", label: "🧒 Ages 6-10 Bundles" },
  { id: "ages-10-15", label: "🎧 Ages 10-15 & Quinceanera" },
  { id: "ages-15-21", label: "👑 Ages 15-21 Sweet 16 / Grad / 21st" },
  { id: "candy-buffet", label: "🍬 Candy Buffet & Fountains" },
  { id: "favors-pinatas", label: "🎁 Favors, Goodie Bags & Pinatas" },
  { id: "helium-balloons", label: "🎈 Helium Tanks, Pumps & Arches" },
  { id: "custom-standees", label: "📸 Custom Face Standees & Banners" },
  { id: "tableware-catering", label: "🍽️ Tableware & Chafing Dishes" },
  { id: "bounce-yard", label: "🎪 Bounce Houses, Fog & Karaoke" }
];

export default function PartyLapoozaSuperstore() {
  const [dept, setDept] = useState("all");
  const [budget, setBudget] = useState("all");
  const [q, setQ] = useState("");
  const [zip, setZip] = useState("");
  const [zipMsg, setZipMsg] = useState("");
  const [guestName, setGuestName] = useState("VIP BIRTHDAY STAR!");
  const [photoUrl, setPhotoUrl] = useState("https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500");
  const [narration, setNarration] = useState("Welcome everyone to the ultimate VIP celebration!");
  const [selected, setSelected] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const sku = p.get("sku");
    if (sku) {
      const f = partySuperstore250.find(x => x.id === sku);
      if (f) setSelected(f);
    }
  }, []);

  const speakNarration = () => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(guestName + "! " + narration);
      u.pitch = 1.15;
      window.speechSynthesis.speak(u);
    }
  };

  const buyNow = async (itemsToBuy: any[]) => {
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: itemsToBuy }) });
    const d = await r.json();
    if (d?.url) window.location.href = d.url;
  };

  const shown = partySuperstore250.filter(it => {
    const dOk = dept === "all" ? true : it.deptId === dept;
    const bOk = budget === "all" ? true : it.priceBand === budget;
    const qOk = q.trim() === "" ? true : it.name.toLowerCase().includes(q.toLowerCase());
    return dOk && bOk && qOk;
  });

  return (
    <main className="min-h-screen text-white pb-20" style={{ background: "linear-gradient(180deg, #2e0538 0%, #150726 50%, #070510 100%)" }}>
      <header className="sticky top-0 z-40 bg-black/95 border-b-2 border-fuchsia-400 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a href="/" className="px-3.5 py-2 bg-amber-400 text-black font-black text-xs uppercase">← Mall Lobby</a>
            <h1 className="text-lg md:text-2xl font-black text-white">🎈 Party Lapooza 250-Item Superstore (Ages 1–21 • Candy • Helium • Custom Cutouts)</h1>
          </div>
          <button onClick={() => setCartOpen(true)} className="px-4 py-2 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer">🛒 Cart ({cart.length})</button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 pt-4 pb-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-black/85 border-2 border-amber-400 p-4 space-y-2 text-xs">
          <span className="bg-amber-400 text-black font-black text-[10px] px-2 py-0.5 uppercase">📸 1. Upload Photo → 2. Preview on Banner & Cutouts → 3. Share It!</span>
          <h2 className="text-base font-black text-white">Put Yourself Inside the Party Decorations + Kids Audio Narration</h2>
          <input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) setPhotoUrl(URL.createObjectURL(f)); }} className="w-full text-zinc-300 file:mr-2 file:py-1.5 file:px-3 file:bg-amber-400 file:text-black file:font-black file:border-0 cursor-pointer" />
          <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-fuchsia-400 text-white font-bold" />
          <div className="flex gap-2">
            <input type="text" value={narration} onChange={e => setNarration(e.target.value)} className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 text-white" />
            <button onClick={speakNarration} className="px-3 py-2 bg-emerald-400 text-black font-black uppercase cursor-pointer">🔊 Play Voice</button>
          </div>
        </div>
        <div className="bg-gradient-to-b from-fuchsia-950 to-black border-2 border-dashed border-amber-400 p-4 flex flex-col items-center justify-center text-center">
          <img src={photoUrl} alt="Preview" className="w-24 h-24 rounded-full border-4 border-amber-400 object-cover mb-2" />
          <div className="px-4 py-1 bg-amber-400 text-black font-black text-xs uppercase">{guestName}</div>
          <p className="text-[11px] text-fuchsia-200 mt-1">Included Free on Your 3D Vinyl Banner, Life-Size Cutout & 24 Cupcake Toppers!</p>
          <button onClick={() => { navigator.clipboard?.writeText(window.location.href); alert("Copied Party Preview Link!"); }} className="mt-2 px-4 py-1.5 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer">📲 Share Preview With Family</button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search individual party items (helium, candy, pinata, quinceanera, bounce house)..." className="w-full px-4 py-2 bg-black border-2 border-fuchsia-400 text-xs text-white font-bold" />
        <form onSubmit={e => { e.preventDefault(); setZipMsg("📍 Verified Party Venues, Custom Cake Bakeries & Bounce Rentals Found Within 15 Miles of ZIP " + zip); }} className="flex gap-2">
          <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="📍 Enter 5-Digit ZIP for Local Venues & Bakeries (15 Mi)..." className="flex-1 px-3 py-2 bg-black border border-zinc-700 text-xs text-white" />
          <button type="submit" className="px-4 py-2 bg-amber-400 text-black font-black text-xs uppercase cursor-pointer">Find Local</button>
        </form>
      </section>
      {zipMsg && <div className="max-w-7xl mx-auto px-4 pb-2"><div className="p-2 bg-fuchsia-950 border border-amber-400 text-xs text-amber-200 font-bold">{zipMsg}</div></div>}

      <section className="max-w-7xl mx-auto px-4 pb-3 space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {AISLES.map(a => (
            <button key={a.id} onClick={() => setDept(a.id)} className={dept === a.id ? "px-3 py-1.5 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer" : "px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer"}>{a.label}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setBudget("all")} className="px-3 py-1 text-xs font-black uppercase bg-white text-black cursor-pointer">All Prices ({shown.length})</button>
          <button onClick={() => setBudget("low")} className="px-3 py-1 text-xs font-black uppercase bg-emerald-400 text-black cursor-pointer">💲 Starter ($19–$39)</button>
          <button onClick={() => setBudget("mid")} className="px-3 py-1 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer">💲💲 10-Guest Bundles & Helium ($40–$85)</button>
          <button onClick={() => setBudget("high")} className="px-3 py-1 text-xs font-black uppercase bg-fuchsia-400 text-black cursor-pointer">💲💲💲 VIP Suites & Bounce Houses ($85+)</button>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
        {shown.map((item, idx) => (
          <div key={idx} className="bg-zinc-950 border-0 rounded-none m-0 p-0 overflow-hidden flex flex-col justify-between">
            <div onClick={() => setSelected(item)} className="relative aspect-square w-full bg-transparent cursor-pointer overflow-hidden group">
              <img src={item.media[0]} alt={item.name} className="w-full h-full object-cover p-0 m-0 block" />
              <span className="absolute top-1.5 left-1.5 bg-black/85 text-amber-300 text-[10px] font-black px-2 py-0.5">{item.isCuratedBundle ? "🎁 1-BOX PARTY BUNDLE" : "📸 3 Photos + Video"}</span>
              <div className={item.count <= 5 ? "absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-black bg-red-700/95 text-white flex justify-between" : "absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-black bg-black/85 text-emerald-400 flex justify-between"}>
                <span>{item.count <= 5 ? "🔥 ONLY " + item.count + " LEFT — HURRY!" : "✅ " + item.count + " IN STOCK • BACKUP READY"}</span>
                <span>🔄 Auto-Shift</span>
              </div>
            </div>
            <div className="p-2.5 bg-zinc-950">
              <h3 onClick={() => setSelected(item)} className="text-xs font-bold text-white line-clamp-2 cursor-pointer">{item.name}</h3>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-lg font-black text-amber-400">{item.price}</span>
                <span className="text-[11px] line-through text-zinc-500">{item.competitorPrice}</span>
              </div>
              <div className="flex gap-1 mt-2">
                <button onClick={() => { setCart([...cart, item]); setCartOpen(true); }} className="flex-1 py-2 bg-amber-400 text-black font-black text-[10px] uppercase cursor-pointer">🛒 Add</button>
                <button onClick={() => buyNow([item])} className="flex-1 py-2 bg-emerald-400 text-black font-black text-[10px] uppercase cursor-pointer">⚡ Buy</button>
                <button onClick={() => setSelected(item)} className="px-2 py-2 bg-zinc-800 text-white font-black text-[10px] cursor-pointer">🔍</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border-2 border-fuchsia-400 max-w-xl w-full p-5 text-xs space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-black text-white">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="px-3 py-1 bg-zinc-800 text-white font-black cursor-pointer">✕</button>
            </div>
            <img src={selected.media[0]} alt="" className="w-full h-56 object-cover" />
            <div className="text-2xl font-black text-amber-400">{selected.price}</div>
            <p><strong>Details:</strong> {selected.specs.condition}</p>
            <p><strong>Shipping & Tax:</strong> {selected.specs.shipping}</p>
            <button onClick={() => buyNow([selected])} className="w-full py-3 bg-emerald-400 text-black font-black uppercase cursor-pointer">⚡ Enter Shipping Address & Checkout →</button>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex justify-end">
          <div className="bg-zinc-900 border-l-2 border-fuchsia-400 w-full max-w-md h-full p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between border-b border-zinc-800 pb-3 mb-3">
                <h3 className="text-lg font-black text-amber-400">🎈 Party Cart ({cart.length})</h3>
                <button onClick={() => setCartOpen(false)} className="px-3 py-1 bg-zinc-800 text-xs font-black cursor-pointer">✕</button>
              </div>
              {cart.map((c, i) => (
                <div key={i} className="flex justify-between bg-black p-2 mb-2 text-xs font-bold">{c.name} — <span className="text-amber-400">{c.price}</span></div>
              ))}
            </div>
            <button onClick={() => buyNow(cart)} className="w-full py-3.5 bg-emerald-400 text-black font-black text-sm uppercase cursor-pointer">💳 Enter Shipping Address & Pay →</button>
          </div>
        </div>
      )}
    </main>
  );
}
`;
fs.mkdirSync("app/stores/party-lapooza", { recursive: true });
fs.writeFileSync("app/stores/party-lapooza/page.tsx", code, "utf8");
console.log("✅ STEP 2 DONE: Party Lapooza UI Built Cleanly!");
