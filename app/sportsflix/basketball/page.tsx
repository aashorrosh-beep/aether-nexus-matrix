"use client";
import React, { useState, useEffect } from "react";
import { sportItems } from "../../data/sportsflix-basketball";

export default function IndividualSportStore() {
  const [dept, setDept] = useState("all");
  const [budget, setBudget] = useState("all");
  const [q, setQ] = useState("");
  const [zip, setZip] = useState("");
  const [zipMsg, setZipMsg] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const first = sportItems[0];
  const cats = [
    { id: "all", label: "🏆 All 60 " + first.sportTitle + " Items" },
    { id: "cat-0", label: "🎁 " + sportItems[0].deptLabel },
    { id: "cat-1", label: "⚡ " + sportItems[15].deptLabel },
    { id: "cat-2", label: "🔥 " + sportItems[30].deptLabel },
    { id: "cat-3", label: "🏅 " + sportItems[45].deptLabel }
  ];

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const sku = p.get("sku");
    if (sku) {
      const f = sportItems.find((x: any) => x.id === sku);
      if (f) setSelected(f);
    }
  }, []);

  const buyNow = async (itemsToBuy: any[]) => {
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: itemsToBuy }) });
    const d = await r.json();
    if (d && d.url) window.location.href = d.url;
  };

  const shown = sportItems.filter((it: any) => {
    const dOk = dept === "all" ? true : it.deptId === dept;
    const bOk = budget === "all" ? true : it.priceBand === budget;
    const qOk = q.trim() === "" ? true : it.name.toLowerCase().includes(q.toLowerCase());
    return dOk && bOk && qOk;
  });

  return (
    <main className="min-h-screen text-white pb-20" style={{ background: "linear-gradient(180deg, #061c14 0%, #09131c 50%, #05070b 100%)" }}>
      <header className="sticky top-0 z-40 bg-black/95 border-b-2 border-emerald-400 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a href="/" className="px-3.5 py-2 bg-amber-400 text-black font-black text-xs uppercase">← Mall Lobby</a>
            <h1 className="text-lg md:text-2xl font-black text-white">🏆 SPORTSFLIX: {first.sportTitle} (60 Dedicated Pro Items)</h1>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <a href="/sportsflix/baseball" className="px-2.5 py-1.5 bg-zinc-800 text-white font-black">⚾ Baseball</a>
            <a href="/sportsflix/football" className="px-2.5 py-1.5 bg-zinc-800 text-white font-black">🏈 Football</a>
            <a href="/sportsflix/atvs-offroad" className="px-2.5 py-1.5 bg-zinc-800 text-white font-black">🛞 ATVs</a>
            <a href="/sportsflix/basketball" className="px-2.5 py-1.5 bg-zinc-800 text-white font-black">🏀 Basketball</a>
            <a href="/sportsflix/golf-pickleball" className="px-2.5 py-1.5 bg-zinc-800 text-white font-black">⛳ Golf/Pickle</a>
            <a href="/sportsflix/combat-fitness" className="px-2.5 py-1.5 bg-zinc-800 text-white font-black">🥊 Combat</a>
            <button onClick={() => setCartOpen(true)} className="px-3.5 py-1.5 bg-emerald-400 text-black font-black uppercase cursor-pointer">🛒 Cart ({cart.length})</button>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 pt-4 pb-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder={"🔍 Search inside " + first.sportTitle + " (bundles, pro gear, training aids)..."} className="w-full px-4 py-2.5 bg-black border-2 border-emerald-400 text-xs text-white font-bold" />
        <form onSubmit={e => { e.preventDefault(); setZipMsg("📍 Found Active " + first.zipEventLabel + " Within 15 Miles of ZIP " + zip + " — Open for Youth & Adult Registration!"); }} className="flex gap-2">
          <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder={"📍 Enter 5-Digit ZIP for Local " + first.zipEventLabel + " (15 Mi)..."} className="flex-1 px-3 py-2.5 bg-black border border-zinc-700 text-xs text-white" />
          <button type="submit" className="px-4 py-2.5 bg-amber-400 text-black font-black text-xs uppercase cursor-pointer">Find Events (15 Mi)</button>
        </form>
      </section>
      {zipMsg && <div className="max-w-7xl mx-auto px-4 pb-2"><div className="p-2.5 bg-emerald-950 border border-emerald-400 text-xs text-emerald-200 font-bold">{zipMsg}</div></div>}

      <section className="max-w-7xl mx-auto px-4 pb-3 space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {cats.map(c => (
            <button key={c.id} onClick={() => setDept(c.id)} className={dept === c.id ? "px-3 py-1.5 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer" : "px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer"}>{c.label}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setBudget("all")} className="px-3 py-1 text-xs font-black uppercase bg-white text-black cursor-pointer">All Prices ({shown.length})</button>
          <button onClick={() => setBudget("low")} className="px-3 py-1 text-xs font-black uppercase bg-emerald-400 text-black cursor-pointer">💲 Training & Accessories ($18–$39)</button>
          <button onClick={() => setBudget("mid")} className="px-3 py-1 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer">💲💲 Game-Day Gear & 1-Box Bundles ($40–$120)</button>
          <button onClick={() => setBudget("high")} className="px-3 py-1 text-xs font-black uppercase bg-purple-400 text-black cursor-pointer">💲💲💲 Pro Equipment ($120+)</button>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
        {shown.map((item: any, idx: number) => (
          <div key={idx} className="bg-zinc-950 border-0 rounded-none m-0 p-0 overflow-hidden flex flex-col justify-between">
            <div onClick={() => setSelected(item)} className="relative aspect-square w-full bg-transparent cursor-pointer overflow-hidden">
              <img src={item.media[0]} alt={item.name} className="w-full h-full object-cover p-0 m-0 block" />
              <span className="absolute top-1.5 left-1.5 bg-black/85 text-amber-300 text-[10px] font-black px-2 py-0.5">{item.isCuratedBundle ? "🎁 1-BOX BUNDLE" : "📸 3 Photos"}</span>
              <div className={item.count <= 5 ? "absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-black bg-red-700/95 text-white flex justify-between" : "absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-black bg-black/85 text-emerald-400 flex justify-between"}>
                <span>{item.count <= 5 ? "🔥 ONLY " + item.count + " LEFT!" : "✅ " + item.count + " IN STOCK"}</span>
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
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
