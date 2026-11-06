"use client";
import React, { useState, useEffect } from "react";
import { ptsd150 } from "../../data/sanctuary-ptsd-150";

export default function PtsdVeteransSanctuary() {
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
      const f = ptsd150.find((x: any) => x.id === sku);
      if (f) setSelected(f);
    }
  }, []);

  const buyNow = async (itemsToBuy: any[]) => {
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: itemsToBuy }) });
    const d = await r.json();
    if (d && d.url) window.location.href = d.url;
  };

  const shown = ptsd150.filter((it: any) => {
    const dOk = dept === "all" ? true : it.deptId === dept;
    const bOk = budget === "all" ? true : it.priceBand === budget;
    const qOk = q.trim() === "" ? true : it.name.toLowerCase().includes(q.toLowerCase());
    return dOk && bOk && qOk;
  });

  return (
    <main className="min-h-screen text-white pb-20" style={{ background: "linear-gradient(180deg, #0a192f 0%, #0f172a 50%, #020617 100%)" }}>
      <header className="sticky top-0 z-40 bg-black/95 border-b-2 border-cyan-400 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => { if (window.history.length > 1) { window.history.back(); } else { window.location.href = "/"; } }} className="px-3.5 py-2 bg-amber-400 text-black font-black text-xs uppercase cursor-pointer">⬅ Back to Room</button><a href="/" className="px-2.5 py-2 bg-zinc-800 border border-amber-400 text-amber-300 font-black text-[10px] uppercase">Mall Map</a>
            <h1 className="text-lg md:text-2xl font-black text-white">🛡️ PTSD, Veterans, Trauma & Peace Recovery Sanctuary (150 Items)</h1>
          </div>
          <button onClick={() => buyNow(cart)} className="px-4 py-2 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer">🛒 Cart ({cart.length})</button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 pt-4 pb-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-slate-900/90 border border-cyan-400 p-3 text-xs">
          <strong className="text-amber-300">📰 Veteran & Trauma Recovery Signal:</strong> 25-lb Cooling Grounding Blankets, Vagus-Nerve Wearables & Ashwagandha/GABA Calm Gummies Priced 15% Below Retail.
        </div>
        <form onSubmit={e => { e.preventDefault(); setEvents("📍 Found Veteran Peer Coffee Meetups, K9 Service Dog Programs & VA Vet Centers Within 15 Miles of ZIP " + zip); }} className="flex gap-2">
          <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="📍 Enter 5-Digit ZIP for Local Veteran Meetups, K9 & VA Centers (15 Mi)..." className="flex-1 px-3 py-2 bg-black border border-cyan-400 text-xs text-white font-bold" />
          <button type="submit" className="px-4 py-2 bg-amber-400 text-black font-black text-xs uppercase cursor-pointer">Find (15 Mi)</button>
        </form>{zip.length>=5&&(<div className="mt-2 flex flex-wrap gap-2"><a href={"https://www.google.com/maps/search/veterans+PTSD+support+VA+vet+center+service+dog+near+"+zip} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-emerald-400 text-black font-black text-xs uppercase">🏥 15-Mi Veteran & PTSD Centers ({zip}) ➔</a><a href={"https://www.google.com/maps/search/veteran+outdoor+recreation+peer+activities+retreat+near+"+zip} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-amber-400 text-black font-black text-xs uppercase">🎯 15-Mi Veteran Activities ({zip}) ➔</a></div>)}
      </section>
      {events && <div className="max-w-7xl mx-auto px-4 pb-2"><div className="p-2 bg-slate-900 border border-amber-400 text-xs text-amber-300 font-bold">{events}</div></div>}

      <section className="max-w-7xl mx-auto px-4 pb-3 space-y-2">
        <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search 150 PTSD & Veteran items (grounding blanket, vagus nerve, K9 harness, brown noise, calm gummies)..." className="w-full px-4 py-2 bg-black border-2 border-cyan-400 text-xs text-white font-bold" />
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setDept("all")} className="px-3 py-1.5 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer">🛡️ All 150 Items</button>
          <button onClick={() => setDept("hard50")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-cyan-300 border border-cyan-500 cursor-pointer">🔍 50 Hardest-to-Find PTSD & K9 Gear</button>
          <button onClick={() => setDept("care35")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-indigo-300 border border-indigo-500 cursor-pointer">💙 35 Family & Home Lifesavers</button>
          <button onClick={() => setDept("daily15")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">⭐ 15 Daily Calm & Sleep</button>
          <button onClick={() => setDept("clinical25")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-emerald-300 border border-emerald-500 cursor-pointer">🏆 25 Clinical Cortisol & GABA Gummies</button>
          <button onClick={() => setDept("bestseller25")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-amber-300 border border-amber-500 cursor-pointer">🔥 25 Best-Seller Sleep Chews & Bundles</button>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
        {shown.map((item: any, idx: number) => (
          <div key={idx} className="bg-zinc-950 border-0 rounded-none m-0 p-0 overflow-hidden flex flex-col justify-between">
            <div onClick={() => setSelected(item)} className="relative aspect-square w-full bg-transparent overflow-hidden cursor-pointer">
              <img src={item.media[0]} alt={item.name} className="w-full h-full object-cover p-0 m-0 block" />
              <span className="absolute top-1.5 left-1.5 bg-black/85 text-amber-300 text-[9px] font-black px-2 py-0.5">{item.rankBadge}</span>
              <div className={item.count <= 5 ? "absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-black bg-red-700/95 text-white flex justify-between" : "absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-black bg-black/85 text-emerald-400 flex justify-between"}>
                <span>{item.count <= 5 ? "🔥 ONLY " + item.count + " LEFT!" : "✅ " + item.count + " IN STOCK"}</span>
                <span>15% Off</span>
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
