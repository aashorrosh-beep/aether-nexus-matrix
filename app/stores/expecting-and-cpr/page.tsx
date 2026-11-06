"use client";
import React, { useState } from "react";
const items = Array.from({ length: 24 }, (_, i) => ({
  id: "CPR-" + (i + 1),
  name: ["Smart Baby Breathing & Heart Monitor Sock", "Infant & Adult Choking Rescue Suction Kit", "Prenatal Fetal Doppler Heartbeat Listener", "Hospital-Grade Postpartum Recovery Care Kit", "Ergonomic 6-in-1 Hip-Healthy Baby Carrier", "Medical Nursery HEPA Air Purifier & Nightlight"][i % 6] + " — Series " + (i + 1),
  price: "$" + (24.99 + (i % 6) * 12).toFixed(2),
  competitorPrice: "$" + (39.99 + (i % 6) * 16).toFixed(2),
  count: 14 + (i % 10),
  rankBadge: i % 2 === 0 ? "🍼 MATERNITY BESTSELLER" : "🚑 SAFETY CERTIFIED",
  media: ["https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600"]
}));
export default function ExpectingCPR() {
  const [zip, setZip] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  async function buyNow(list: any[]) {
    const addr = prompt("Enter Shipping Address (Street, City, State, ZIP):");
    if (!addr) return;
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: list, shippingAddress: addr }) });
    const d = await r.json();
    if (d.url) window.location.href = d.url;
  }
  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8 space-y-6">
      <header className="flex flex-wrap justify-between items-center gap-3 border-b border-rose-500/40 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-rose-500 text-white">🍼 MATERNITY, NURSERY & FREE INFANT/ADULT CPR ACADEMY</span>
          <h1 className="text-2xl md:text-4xl font-black text-amber-300 mt-1">EXPECTING MOTHERS & LIFESAVING CPR HUB</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => history.back()} className="px-3 py-2 bg-amber-400 text-black font-black text-xs uppercase">⬅ Back</button>
          <a href="/" className="px-3 py-2 bg-zinc-900 border border-amber-400 text-amber-300 font-black text-xs uppercase">Lobby</a>
          <button onClick={() => buyNow(cart)} className="px-4 py-2 bg-emerald-400 text-black font-black text-xs uppercase">Cart ({cart.length}) • Cash Out</button>
        </div>
      </header>
      <section className="grid md:grid-cols-2 gap-4 bg-zinc-900 border border-rose-400/40 p-4">
        <div>
          <h2 className="text-sm font-black text-amber-300 uppercase">🚑 Free Instant Infant & Adult Hands-Only CPR Protocol</h2>
          <p className="text-xs text-zinc-300 mt-1">1. Call 911 • 2. Push hard & fast in center of chest (100–120 BPM; 2 fingers for infants) • 3. Use Choking Rescue Device if airway is blocked.</p>
        </div>
        <div>
          <h2 className="text-sm font-black text-amber-300 uppercase">📍 15-Mile Local Birthing Center, NICU & CPR Class ZIP Finder</h2>
          <div className="flex gap-2 mt-2">
            <input value={zip} onChange={e => setZip(e.target.value)} placeholder="Enter 5-Digit ZIP (e.g. 77433)" className="px-3 py-1.5 bg-black border border-zinc-700 text-xs text-white w-48" />
            {zip.length >= 5 && <a href={"https://www.google.com/maps/search/infant+cpr+class+maternity+birthing+center+near+" + zip} target="_blank" className="px-3 py-1.5 bg-emerald-400 text-black font-black text-xs uppercase">📍 15-Mi Map ({zip}) ➔</a>}
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map(it => (
          <div key={it.id} onClick={() => setSelected(it)} className="bg-zinc-900 border border-zinc-800 hover:border-amber-400 p-3 space-y-2 cursor-pointer">
            <div className="flex justify-between text-[10px] font-black"><span className="bg-rose-600 px-2 py-0.5">{it.rankBadge}</span><span className="text-amber-300">{it.count} Left</span></div>
            <img src={it.media[0]} className="w-full h-44 object-cover" />
            <h3 className="text-xs font-black text-white">{it.name}</h3>
            <div className="flex justify-between"><span className="text-lg font-black text-emerald-400">{it.price}</span><span className="text-xs line-through text-zinc-500">{it.competitorPrice}</span></div>
          </div>
        ))}
      </section>
      {selected && (<div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={()=>setSelected(null)}><div className="bg-zinc-950 border-2 border-amber-400 max-w-md w-full p-4 space-y-2 text-white" onClick={e=>e.stopPropagation()}><div className="flex justify-between"><span className="text-xs text-emerald-400 font-bold">{selected.count} In Stock</span><button onClick={()=>setSelected(null)} className="px-2 py-0.5 bg-red-600 text-xs font-bold">X</button></div><img src={selected.media?.[0]} className="w-full h-48 object-cover"/><h2 className="text-sm font-black text-amber-300">{selected.name}</h2><div className="text-lg font-black text-emerald-400">{selected.price}</div><div className="flex gap-2"><button onClick={()=>{if(selected.count>0){selected.count--;setCart([...cart,selected]);}}} className="flex-1 py-2 bg-amber-400 text-black font-black text-xs">+ Cart</button><button onClick={()=>buyNow([selected])} className="flex-1 py-2 bg-emerald-400 text-black font-black text-xs">Cash Out</button></div></div></div>)}
    </main>
  );
}