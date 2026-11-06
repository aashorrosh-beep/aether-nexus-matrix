"use client";
import React, { useState } from "react";
import { stargazer300 } from "../../data/stargazer-300";
export default function StargazerMall() {
  const [tier, setTier] = useState("all");
  const [dept, setDept] = useState("all");
  const [zip, setZip] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const filtered = stargazer300.filter(i => (tier === "all" || i.priceBand === tier) && (dept === "all" || i.deptId === dept)).slice(0, 28);
  async function buyNow(items: any[]) {
    const addr = prompt("Enter Full Shipping Address (Street, City, State, ZIP):");
    if (!addr) return;
    const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items, shippingAddress: addr }) });
    const d = await res.json();
    if (d.url) window.location.href = d.url;
  }
  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8 space-y-6">
      <header className="flex flex-wrap justify-between items-center gap-3 border-b border-indigo-500/40 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-indigo-500 text-white">🔭 ALBS CELESTIAL WING • 300 VERIFIED SKUS</span>
          <h1 className="text-2xl md:text-4xl font-black text-amber-300 mt-1">STARGAZER OBSERVATORY & CELESTIAL MALL</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => history.back()} className="px-3 py-2 bg-amber-400 text-black font-black text-xs uppercase">⬅ Back</button>
          <a href="/" className="px-3 py-2 bg-zinc-900 border border-amber-400 text-amber-300 font-black text-xs uppercase">Lobby</a>
          <button onClick={() => buyNow(cart)} className="px-4 py-2 bg-emerald-400 text-black font-black text-xs uppercase">Cart ({cart.length}) • Cash Out</button>
        </div>
      </header>
      <section className="grid md:grid-cols-2 gap-4 bg-zinc-900/90 border border-indigo-400/40 p-4">
        <div>
          <h2 className="text-sm font-black text-amber-300 uppercase">🌌 15-Mile Dark-Sky Park, Observatory & Stargazing Club ZIP Finder</h2>
          <p className="text-xs text-zinc-300 mt-1">Enter your 5-digit ZIP to locate dark-sky viewing zones, planetariums, and astronomy clubs within 15 miles.</p>
          <div className="flex gap-2 mt-2">
            <input value={zip} onChange={e => setZip(e.target.value)} placeholder="Enter 5-Digit ZIP (e.g. 77433)" className="px-3 py-1.5 bg-black border border-zinc-700 text-xs text-white w-48" />
            {zip.length >= 5 && <a href={"https://www.google.com/maps/search/observatory+planetarium+astronomy+dark+sky+park+near+" + zip} target="_blank" className="px-3 py-1.5 bg-emerald-400 text-black font-black text-xs uppercase">📍 Open 15-Mi Sky Map ({zip}) ➔</a>}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-black text-amber-300 uppercase">⚡ Pricing Tiers & Spoke-Wheel Department Filter</h2>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {[["all","All Tiers (300)"],["low","Low ($14-$29)"],["mid","Mid ($36-$79)"],["high","High Pro ($89+)"]].map(([k,v]) => (
              <button key={k} onClick={() => setTier(k)} className={"px-2.5 py-1 text-[11px] font-black uppercase " + (tier === k ? "bg-amber-400 text-black" : "bg-black border border-zinc-700 text-zinc-300")}>{v}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {[["all","All Wings"],["optics","Telescopes & Optics"],["planetarium","4K Planetariums"],["meteorites","Meteorites & Gems"],["camp-sky","Dark-Sky Camping"]].map(([k,v]) => (
              <button key={k} onClick={() => setDept(k)} className={"px-2.5 py-1 text-[10px] font-bold uppercase " + (dept === k ? "bg-indigo-500 text-white" : "bg-zinc-950 border border-zinc-800 text-zinc-400")}>{v}</button>
            ))}
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(item => (
          <div key={item.id} onClick={() => setSelected(item)} className="bg-zinc-900 border border-zinc-800 hover:border-amber-400 p-3 space-y-2 cursor-pointer transition">
            <div className="flex justify-between text-[10px] font-black"><span className="bg-indigo-600 px-2 py-0.5">{item.rankBadge}</span><span className="text-amber-300">{item.count} Left</span></div>
            <img src={item.media[0]} alt={item.name} className="w-full h-44 object-cover" />
            <h3 className="text-xs font-black text-white line-clamp-2">{item.name}</h3>
            <div className="flex justify-between items-center"><span className="text-lg font-black text-emerald-400">{item.price}</span><span className="text-xs line-through text-zinc-500">{item.competitorPrice}</span></div>
          </div>
        ))}
      </section>
      {selected && (<div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={()=>setSelected(null)}><div className="bg-zinc-950 border-2 border-amber-400 max-w-md w-full p-4 space-y-2 text-white" onClick={e=>e.stopPropagation()}><div className="flex justify-between"><span className="text-xs text-emerald-400 font-bold">{selected.count} In Stock</span><button onClick={()=>setSelected(null)} className="px-2 py-0.5 bg-red-600 text-xs font-bold">X</button></div><img src={selected.media?.[0]} className="w-full h-48 object-cover"/><h2 className="text-sm font-black text-amber-300">{selected.name}</h2><div className="text-lg font-black text-emerald-400">{selected.price} <span className="text-xs line-through text-zinc-400">{selected.competitorPrice}</span></div><div className="flex gap-2"><button onClick={()=>{if(selected.count>0){selected.count--;setCart([...cart,selected]);}}} className="flex-1 py-2 bg-amber-400 text-black font-black text-xs">+ Cart ({selected.count} Avail)</button><button onClick={()=>buyNow([selected])} className="flex-1 py-2 bg-emerald-400 text-black font-black text-xs">Cash Out</button></div></div></div>)}
    </main>
  );
}