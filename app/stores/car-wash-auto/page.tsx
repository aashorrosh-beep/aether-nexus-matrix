"use client";
import React, { useState } from "react";
import { carWash100 } from "../../data/car-wash-100";

export default function CarWashAutoSuperstore() {
  const [dept, setDept] = useState("all");
  const [budget, setBudget] = useState("all");
  const [q, setQ] = useState("");
  const [zip, setZip] = useState("");
  const [washes, setWashes] = useState<any[] | null>(null);
  const [cart, setCart] = useState<any[]>([]);

  const buyNow = async (itemsToBuy: any[]) => {
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: itemsToBuy }) });
    const d = await r.json();
    if (d && d.url) window.location.href = d.url;
  };

  const shown = carWash100.filter((it: any) => {
    const dOk = dept === "all" ? true : it.deptId === dept;
    const bOk = budget === "all" ? true : it.priceBand === budget;
    const qOk = q.trim() === "" ? true : it.name.toLowerCase().includes(q.toLowerCase());
    return dOk && bOk && qOk;
  });

  return (
    <main className="min-h-screen text-white pb-20" style={{ background: "linear-gradient(180deg, #06182c 0%, #09121d 50%, #05070b 100%)" }}>
      <header className="sticky top-0 z-40 bg-black/95 border-b-2 border-cyan-400 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a href="/" className="px-3.5 py-2 bg-amber-400 text-black font-black text-xs uppercase">← Mall Lobby</a>
            <h1 className="text-lg md:text-2xl font-black text-white">🚗 Consolidated Car Wash, Foam Cannon & Detailing Superstore (100 Items)</h1>
          </div>
          <button onClick={() => buyNow(cart)} className="px-4 py-2 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer">🛒 Checkout Cart ({cart.length})</button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 pt-4 pb-3">
        <div className="bg-black/85 border-2 border-cyan-400 p-4">
          <h2 className="text-base md:text-lg font-black text-cyan-300">📍 15-Mile Local Car Wash, Touchless Bay, Mobile Detailer & Fundraiser Finder</h2>
          <form onSubmit={e => { e.preventDefault(); setWashes([
            { t: "🚿 Express Tunnel & Touchless Laser Washes (15 Mi of ZIP " + zip + ")", d: "Open Daily • Free High-Suction Vacuums, Undercarriage Flush & Ceramic Arch." },
            { t: "🧽 Mobile Driveway Hand-Detailing & Ceramic Crews (ZIP " + zip + ")", d: "On-site steam interior cleaning, clay-bar paint correction & fleet wash." },
            { t: "🎗️ Weekend Charity, School & Team Car Wash Events (15 Mi of " + zip + ")", d: "Active local community fundraiser car washes & 24-hour self-serve pressure bays." }
          ]); }} className="flex flex-col sm:flex-row gap-2 mt-2">
            <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="Enter 5-Digit ZIP Code (e.g. 77433) to find all car washes within 15 miles..." className="flex-1 px-3.5 py-2 bg-zinc-950 border border-zinc-700 text-xs text-white font-bold" />
            <button type="submit" className="px-5 py-2 bg-cyan-400 text-black font-black text-xs uppercase cursor-pointer">🔍 Search 15-Mile Radius →</button>
          </form>
          {washes && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
              {washes.map((w, i) => (
                <div key={i} className="bg-cyan-950/60 border border-cyan-400 p-2.5 text-xs">
                  <div className="font-black text-cyan-300">{w.t}</div>
                  <p className="text-zinc-200 text-[11px] mt-1">{w.d}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-3 space-y-2">
        <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search 100 car wash & detailing items (foam cannon, pressure washer, ceramic, vacuum, towels)..." className="w-full px-4 py-2 bg-black border-2 border-cyan-400 text-xs text-white font-bold" />
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setDept("all")} className="px-3 py-1.5 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer">🚗 All 100 Auto Items</button>
          <button onClick={() => setDept("wash-bundles")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">🎁 1-Box Wash Bundles (25)</button>
          <button onClick={() => setDept("pressure-foam")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">🚿 Pressure Washers & Foam Cannons (25)</button>
          <button onClick={() => setDept("ceramic-polish")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">✨ Ceramic & Polishers (25)</button>
          <button onClick={() => setDept("interior-vacuums")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">🧽 Vacuums, Brushes & Towels (25)</button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setBudget("all")} className="px-3 py-1 text-xs font-black uppercase bg-white text-black cursor-pointer">All Prices ({shown.length})</button>
          <button onClick={() => setBudget("low")} className="px-3 py-1 text-xs font-black uppercase bg-emerald-400 text-black cursor-pointer">💲 Soaps, Towels & Brushes ($14–$34)</button>
          <button onClick={() => setBudget("mid")} className="px-3 py-1 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer">💲💲 Foam Cannons & 1-Box Kits ($35–$85)</button>
          <button onClick={() => setBudget("high")} className="px-3 py-1 text-xs font-black uppercase bg-cyan-400 text-black cursor-pointer">💲💲💲 Pressure Washers & Buffers ($85+)</button>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
        {shown.map((item: any, idx: number) => (
          <div key={idx} className="bg-zinc-950 border-0 rounded-none m-0 p-0 overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-square w-full bg-transparent overflow-hidden">
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
    </main>
  );
}
