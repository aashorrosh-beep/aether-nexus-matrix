"use client";
import React, { useState, useEffect } from "react";
import { football60 } from "../../data/sportflix-football-60";

export default function SportflixFootballStore() {
  const [dept, setDept] = useState("all");
  const [budget, setBudget] = useState("all");
  const [q, setQ] = useState("");
  const [zip, setZip] = useState("");
  const [events, setEvents] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const sku = p.get("sku");
    if (sku) {
      const f = football60.find((x: any) => x.id === sku);
      if (f) setSelected(f);
    }
  }, []);

  const buyNow = async (itemsToBuy: any[]) => {
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: itemsToBuy }) });
    const d = await r.json();
    if (d && d.url) window.location.href = d.url;
  };

  const shown = football60.filter((it: any) => {
    const dOk = dept === "all" ? true : it.deptId === dept;
    const bOk = budget === "all" ? true : it.priceBand === budget;
    const qOk = q.trim() === "" ? true : it.name.toLowerCase().includes(q.toLowerCase());
    return dOk && bOk && qOk;
  });

  return (
    <main className="min-h-screen text-white pb-20" style={{ background: "linear-gradient(180deg, #061c14 0%, #09131c 50%, #05070b 100%)" }}>
      <header className="sticky top-0 z-40 bg-black/95 border-b-2 border-amber-400 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => { if (window.history.length > 1) { window.history.back(); } else { window.location.href = "/"; } }} className="px-3.5 py-2 bg-amber-400 text-black font-black text-xs uppercase cursor-pointer">⬅ Back to Room</button><a href="/" className="px-2.5 py-2 bg-zinc-800 border border-amber-400 text-amber-300 font-black text-[10px] uppercase">Mall Map</a>
            <div>
              <span className="bg-amber-400 text-black font-black text-[10px] px-2 py-0.5 uppercase">🇺🇸 SPORTFLIX WORLD: An American Tradition</span>
              <h1 className="text-lg md:text-2xl font-black text-white">🏈 Football Gridiron Pro Superstore (60 Items)</h1>
            </div>
          </div>
          <button onClick={() => buyNow(cart)} className="px-4 py-2 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer">🛒 Cart ({cart.length})</button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 pt-4 pb-3">
        <div className="bg-black/85 border-2 border-emerald-400 p-4">
          <h2 className="text-base font-black text-amber-300">📍 15-Mile Local 7-on-7 Leagues, Turf Fields & Combine Camps Finder</h2>
          <form onSubmit={e => { e.preventDefault(); setEvents([
            { t: "🏈 Youth & High School 7-on-7 Passing Leagues (15 Mi of ZIP " + zip + ")", d: "Weekend tournament registration, turf field rentals & combine testing." },
            { t: "🛡️ Helmet Reconditioning, Custom Visors & Pad Fitting (ZIP " + zip + ")", d: "NOCSAE certified equipment checks & local team uniform suppliers." },
            { t: "⚡ Speed, Agility & Lineman Trench Camps (15 Mi of " + zip + ")", d: "Position-specific QB, WR & O-Line/D-Line training academies." }
          ]); }} className="flex flex-col sm:flex-row gap-2 mt-2">
            <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="Enter 5-Digit ZIP Code (e.g. 77433)..." className="flex-1 px-3.5 py-2 bg-zinc-950 border border-zinc-700 text-xs text-white font-bold" />
            <button type="submit" className="px-5 py-2 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer">🔍 Search 15-Mile Radius →</button>
          </form>
          {events && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
              {events.map((ev: any, i: number) => (
                <div key={i} className="bg-emerald-950/60 border border-emerald-400 p-2.5 text-xs">
                  <div className="font-black text-amber-300">{ev.t}</div>
                  <p className="text-zinc-200 text-[11px] mt-1">{ev.d}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-3 space-y-2">
        <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search 60 pure football items (helmets, shoulder pads, receiver gloves, QB nets, sleds)..." className="w-full px-4 py-2 bg-black border-2 border-emerald-400 text-xs text-white font-bold" />
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setDept("all")} className="px-3 py-1.5 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer">🏈 All 60 Football Items</button>
          <button onClick={() => setDept("gridiron-bundles")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">🎁 1-Box Gridiron Bundles (15)</button>
          <button onClick={() => setDept("helmets-pads")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">🛡️ Helmets & Shoulder Pads (15)</button>
          <button onClick={() => setDept("gloves-cleats")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">🧤 Receiver Gloves & Cleats (15)</button>
          <button onClick={() => setDept("sleds-qb-nets")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">🎯 QB Nets, Sleds & Dummies (15)</button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setBudget("all")} className="px-3 py-1 text-xs font-black uppercase bg-white text-black cursor-pointer">All Prices ({shown.length})</button>
          <button onClick={() => setBudget("low")} className="px-3 py-1 text-xs font-black uppercase bg-emerald-400 text-black cursor-pointer">💲 Gloves, Mouthguards & Accessories ($19–$39)</button>
          <button onClick={() => setBudget("mid")} className="px-3 py-1 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer">💲💲 Pads, QB Nets & Bundles ($40–$115)</button>
          <button onClick={() => setBudget("high")} className="px-3 py-1 text-xs font-black uppercase bg-purple-400 text-black cursor-pointer">💲💲💲 Pro Helmets & Blocking Sleds ($120+)</button>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
        {shown.map((item: any, idx: number) => (
          <div key={idx} className="bg-zinc-950 border-0 rounded-none m-0 p-0 overflow-hidden flex flex-col justify-between">
            <div onClick={() => setSelected(item)} className="relative aspect-square w-full bg-transparent overflow-hidden cursor-pointer">
              <img src={item.media[0]} alt={item.name} className="w-full h-full object-cover p-0 m-0 block" />
              <span className="absolute top-1.5 left-1.5 bg-black/85 text-amber-300 text-[10px] font-black px-2 py-0.5">{item.isCuratedBundle ? "🎁 1-BOX BUNDLE" : "📸 3 Photos"}</span>
              <div className={item.count <= 5 ? "absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-black bg-red-700/95 text-white flex justify-between" : "absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-black bg-black/85 text-emerald-400 flex justify-between"}>
                <span>{item.count <= 5 ? "🔥 ONLY " + item.count + " LEFT!" : "✅ " + item.count + " IN STOCK"}</span>
                <span>🔄 Auto-Shift</span>
              </div>
            </div>
            <div className="p-2.5 bg-zinc-950">
              <h3 className="text-xs font-bold text-white line-clamp-2">{item.name}</h3>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-lg font-black text-amber-400">{item.price}</span>
                <span className="text-[11px] line-through text-zinc-500">{item.competitorPrice}</span>
              </div>
              <div className="flex gap-1 mt-2">
                <button onClick={() => setCart([...cart, item])} className="flex-1 py-2 bg-amber-400 text-black font-black text-[10px] uppercase cursor-pointer">🛒 Add</button>
                <button onClick={() => buyNow([item])} className="flex-1 py-2 bg-emerald-400 text-black font-black text-[10px] uppercase cursor-pointer">⚡ Buy</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-zinc-950 border-2 border-amber-400 max-w-lg w-full p-5 space-y-3 text-white" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start gap-2">
              <span className="bg-emerald-400 text-black font-black text-[10px] px-2 py-0.5 uppercase">{selected.rankBadge || "Verified In-Stock"}</span>
              <button onClick={() => setSelected(null)} className="px-2.5 py-1 bg-red-600 text-white font-black text-xs">✕ CLOSE</button>
            </div>
            <img src={selected.media?.[0]} alt={selected.name} className="w-full h-56 object-cover border border-zinc-800" />
            <h2 className="text-base font-black text-amber-300">{selected.name}</h2>
            <div className="flex items-center justify-between text-xs bg-zinc-900 p-2 border border-zinc-800">
              <span className="text-xl font-black text-emerald-400">{selected.price}</span>
              <span className="line-through text-zinc-400">Retail: {selected.competitorPrice}</span>
              <span className="text-amber-300 font-bold">{selected.count} Left in Vault</span>
            </div>
            <p className="text-xs text-zinc-300">{selected.specs?.condition || "Clinical & Safety Vetted"} • {selected.specs?.shipping || "Insured 3-7 Day Shipping"}</p>
            <div className="flex gap-2 pt-2">
              <button onClick={() => { if (selected.count > 0) { selected.count -= 1; setCart([...cart, selected]); } }} className="flex-1 py-2.5 bg-amber-400 text-black font-black text-xs uppercase">+ Add to Cart ({selected.count} Avail)</button>
              <button onClick={() => { const addr = window.prompt("Enter Full Shipping Address (Street, City, State, ZIP) for Insured Delivery:"); if (addr) buyNow([selected]); }} className="flex-1 py-2.5 bg-emerald-400 text-black font-black text-xs uppercase">Instant Cash Out</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
