"use client";
import React, { useState } from "react";
import { christmasSuperstore100 } from "../../data/christmas-superstore-100";

const TABS = [
  { id: "all", label: "🎄 All 250 Seasonal Items" },
  { id: "curated-bundles", label: "🎁 Pre-Built Value Bundles (Save $15 • 1-Box Ship)" },
  { id: "villages-nativity", label: "🏡 Villages, Mini Houses & Nativity" },
  { id: "outdoor-lights-inflatables", label: "🦌 Outdoor Inflatables & Lights" },
  { id: "indoor-trees-ornaments", label: "🎄 Indoor Trees, Ornaments & Decor" },
  { id: "wrapping-boxes-bows", label: "🎀 Gift Wrap, Bows, Boxes, Bags, Tape & Scissors" },
  { id: "toys-gaming", label: "🧸 Hottest Toys & Gaming" },
  { id: "electronics-tvs", label: "💻 Best Buy Tech & 4K TVs" },
  { id: "phones-watches", label: "📱 Phones & Smartwatches" },
  { id: "appliances-kitchen", label: "🍳 Kitchen & Home Appliances" },
  { id: "sweaters-fitness", label: "🧥 Sweaters ($19.99+) & Fitness" }
];

export default function ChristmasSuperstorePage() {
  const [dept, setDept] = useState("all");
  const [budget, setBudget] = useState("all");
  const [q, setQ] = useState("");
  const [zip, setZip] = useState("");
  const [zipEvents, setZipEvents] = useState<any[] | null>(null);
  const [selected, setSelected] = useState<any | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [concQ, setConcQ] = useState("");
  const [concEmail, setConcEmail] = useState("");
  const [concRes, setConcRes] = useState<any | null>(null);
  const [concBusy, setConcBusy] = useState(false);

  const runConcierge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concQ.trim()) return;
    setConcBusy(true);
    try {
      const r = await fetch("/api/concierge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: concQ, email: concEmail }) });
      setConcRes(await r.json());
    } catch (err) {}
    setConcBusy(false);
  };

  const buyNow = async (itemsToBuy: any[]) => {
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: itemsToBuy }) });
    const d = await r.json();
    if (d?.url) window.location.href = d.url;
  };

  const shown = christmasSuperstore100.filter(it =>
    (dept === "all" || it.deptId === dept) &&
    (budget === "all" || it.priceBand === budget) &&
    (!q.trim() || it.name.toLowerCase().includes(q.toLowerCase()) || it.deptLabel.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <main className="min-h-screen text-white pb-20" style={{ background: "linear-gradient(180deg, #2b0707 0%, #071f15 45%, #070b14 100%)" }}>
      <header className="sticky top-0 z-40 bg-black/95 border-b-2 border-amber-400 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a href="/" className="px-3.5 py-2 bg-amber-400 text-black font-black text-xs uppercase">← Mall Lobby</a>
            <div>
              <span className="bg-emerald-400 text-black font-black text-[10px] px-2 py-0.5 uppercase">Best Buy + Hobby Lobby + Michaels + Lowe's Combined Superstore</span>
              <h1 className="text-lg md:text-2xl font-black text-white">🎄 250-Item Christmas & Seasonal Mega-Superstore</h1>
            </div>
          </div>
          <button onClick={() => setCartOpen(true)} className="px-4 py-2 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer">
            🛒 Cart ({cart.length})
          </button>
        </div>
      </header>

      {/* 1-Hour Concierge + 15-Mile Holiday Event ZIP Finder */}
      <section className="max-w-7xl mx-auto px-4 pt-4 pb-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-black/85 border-2 border-emerald-400 p-4">
          <span className="bg-emerald-400 text-black font-black text-[10px] px-2 py-0.5 uppercase">⚡ 1-Hour Live Concierge • Photo + Specs + 24-Hr Hold</span>
          <h2 className="text-base font-black text-white mt-1">Can't Find a Specific Village Piece, Inflatable, Gift Wrap, or Tech Gift?</h2>
          <form onSubmit={runConcierge} className="flex flex-col sm:flex-row gap-2 mt-2">
            <input type="text" required value={concQ} onChange={e => setConcQ(e.target.value)} placeholder="Type exact item (e.g. ceramic snow village church, 10ft Santa)..." className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-700 text-xs text-white font-bold" />
            <input type="email" required value={concEmail} onChange={e => setConcEmail(e.target.value)} placeholder="Your Email for Photo + Specs" className="sm:w-48 px-3 py-2 bg-zinc-950 border border-zinc-700 text-xs text-white" />
            <button type="submit" className="px-4 py-2 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer">{concBusy ? "..." : "⚡ Find in 1 Hr"}</button>
          </form>
          {concRes?.items && (
            <div className="mt-2 bg-emerald-950 border border-amber-400 p-2.5 text-xs">
              <div className="font-black text-amber-300 mb-1">✅ Ticket #{concRes.ticketId} — Photo & Specs Dispatched to {concRes.emailSentTo} (Held 24 Hrs):</div>
              {concRes.items.slice(0, 2).map((ci: any, i: number) => (
                <div key={i} className="flex items-center justify-between gap-2 bg-black p-2 mt-1">
                  <img src={ci.media[0]} alt="" className="w-12 h-12 object-cover" />
                  <div className="flex-1 truncate font-bold">{ci.name} — <span className="text-amber-400">{ci.price}</span></div>
                  <button onClick={() => buyNow([ci])} className="px-2.5 py-1 bg-emerald-400 text-black font-black text-[10px] uppercase cursor-pointer">⚡ Buy</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-black/85 border-2 border-amber-400 p-4">
          <span className="bg-amber-400 text-black font-black text-[10px] px-2 py-0.5 uppercase">🔍 Search All 250 Items + 15-Mile Holiday Event ZIP Finder</span>
          <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Search villages, nativity, inflatables, lights, wrapping paper, bows, boxes, scissors, toys, TVs..." className="w-full mt-2 px-3 py-2 bg-zinc-950 border border-amber-400 text-xs text-white font-bold" />
          <form onSubmit={e => { e.preventDefault(); setZipEvents([{ t: `🎄 Light Shows, Nativity & Sensory Santa Within 15 Miles of ${zip || "77433"}`, d: "Verified drive-thru light villages, quiet-hour Santa photos & local holiday markets." }]); }} className="flex gap-2 mt-2">
            <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="Enter 5-Digit ZIP for Local Holiday Events (15 Mi)..." className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-700 text-xs text-white" />
            <button type="submit" className="px-4 py-2 bg-amber-400 text-black font-black text-xs uppercase cursor-pointer">📍 Find Events</button>
          </form>
          {zipEvents && <div className="mt-2 p-2 bg-zinc-900 border border-amber-400 text-xs text-amber-200"><strong>{zipEvents[0].t}:</strong> {zipEvents[0].d}</div>}
        </div>
      </section>

      {/* Aisle Tabs & Budget Filters */}
      <section className="max-w-7xl mx-auto px-4 pb-3 space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setDept(t.id)} className={`px-3 py-2 text-xs font-black uppercase cursor-pointer ${dept === t.id ? "bg-amber-400 text-black" : "bg-zinc-900 text-white"}`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setBudget("all")} className={`px-3 py-1 text-xs font-black uppercase cursor-pointer ${budget === "all" ? "bg-white text-black" : "bg-zinc-900 text-zinc-300"}`}>All Prices ({shown.length})</button>
          <button onClick={() => setBudget("low")} className={`px-3 py-1 text-xs font-black uppercase cursor-pointer ${budget === "low" ? "bg-emerald-400 text-black" : "bg-zinc-900 text-zinc-300"}`}>💲 Low: Under $35 (Wrap, Bows, Boxes, Scissors, Sweaters)</button>
          <button onClick={() => setBudget("mid")} className={`px-3 py-1 text-xs font-black uppercase cursor-pointer ${budget === "mid" ? "bg-amber-400 text-black" : "bg-zinc-900 text-zinc-300"}`}>💲💲 Mid: $35–$99.99 (Pre-Built Bundles, Villages, Nativity, Inflatables)</button>
          <button onClick={() => setBudget("high")} className={`px-3 py-1 text-xs font-black uppercase cursor-pointer ${budget === "high" ? "bg-purple-400 text-black" : "bg-zinc-900 text-zinc-300"}`}>💲💲💲 High: $100+ (Trees, Phones, Watches, 4K TVs)</button>
        </div>
      </section>

      {/* ZERO-GAP BORDERLESS 250-ITEM WALL */}
      <section className="w-full max-w-7xl mx-auto px-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
        {shown.map((item, idx) => (
          <div key={item.id || idx} className="bg-zinc-950 border-0 rounded-none m-0 p-0 overflow-hidden flex flex-col justify-between">
            <div>
              <div onClick={() => { setSelected(item); setImgIdx(0); }} className="relative aspect-square w-full bg-transparent cursor-pointer overflow-hidden group">
                <img src={item.media[0]} alt={item.name} className="w-full h-full object-cover p-0 m-0 block group-hover:scale-105 transition duration-300" />
                <span className="absolute top-1.5 left-1.5 bg-black/85 text-amber-300 text-[10px] font-black px-2 py-0.5">{item.isCuratedBundle ? "🎁 1-BOX BUNDLE" : "📸 3 Photos + Video"}</span>
              </div>
              <div className="p-2.5 bg-zinc-950">
                <h3 onClick={() => { setSelected(item); setImgIdx(0); }} className="text-xs font-bold text-white line-clamp-2 cursor-pointer">{item.name}</h3>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-lg font-black text-amber-400">{item.price}</span>
                  <span className="text-[11px] line-through text-zinc-500">{item.competitorPrice}</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-bold">{item.savings}</div>
              </div>
            </div>
            <div className="px-2.5 pb-2.5 bg-zinc-950 flex gap-1">
              <button onClick={() => { setCart([...cart, item]); setCartOpen(true); }} className="flex-1 py-2 bg-amber-400 text-black font-black text-[10px] uppercase cursor-pointer">🛒 Add</button>
              <button onClick={() => buyNow([item])} className="flex-1 py-2 bg-emerald-400 text-black font-black text-[10px] uppercase cursor-pointer">⚡ Buy Now</button>
              <button onClick={() => { setSelected(item); setImgIdx(0); }} className="px-2 py-2 bg-zinc-800 text-white font-black text-[10px] cursor-pointer">🔍</button>
            </div>
          </div>
        ))}
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border-2 border-amber-400 max-w-2xl w-full p-5">
            <div className="flex justify-between mb-3">
              <h2 className="text-lg font-black text-white">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="px-3 py-1 bg-zinc-800 text-white text-xs font-black cursor-pointer">✕</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <img src={selected.media[imgIdx] || selected.media[0]} alt="" className="w-full aspect-square object-cover mb-2" />
                <div className="flex gap-2">
                  {selected.media.map((m: string, i: number) => (
                    <button key={i} onClick={() => setImgIdx(i)} className="w-14 h-14 border border-amber-400 overflow-hidden"><img src={m} alt="" className="w-full h-full object-cover" /></button>
                  ))}
                </div>
              </div>
              <div className="text-xs space-y-2 text-zinc-200 flex flex-col justify-between">
                <div>
                  <div className="text-2xl font-black text-amber-400">{selected.price} <span className="text-xs line-through text-zinc-400">{selected.competitorPrice}</span></div>
                  <p><strong>Vendor:</strong> {selected.specs.manufacturer}</p>
                  <p><strong>Bundle/Condition:</strong> {selected.specs.condition}</p>
                  <p><strong>Shipping, Tax & Fee Policy:</strong> {selected.specs.shipping}</p>
                </div>
                <button onClick={() => buyNow([selected])} className="w-full py-3 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer">⚡ Enter Shipping Address & Checkout →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex justify-end">
          <div className="bg-zinc-900 border-l-2 border-amber-400 w-full max-w-md h-full p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between border-b border-zinc-800 pb-3 mb-3">
                <h3 className="text-lg font-black text-amber-400">🎄 Cart ({cart.length})</h3>
                <button onClick={() => setCartOpen(false)} className="px-3 py-1 bg-zinc-800 text-xs font-black cursor-pointer">✕</button>
              </div>
              <div className="space-y-2 max-h-[65vh] overflow-y-auto">
                {cart.map((c, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 bg-black p-2 border border-zinc-800">
                    <img src={c.media[0]} alt="" className="w-12 h-12 object-cover" />
                    <div className="flex-1 min-w-0 text-xs font-bold truncate">{c.name} — <span className="text-amber-400">{c.price}</span></div>
                    <button onClick={() => setCart(cart.filter((_, idx) => idx !== i))} className="text-red-400 text-xs font-black px-2 cursor-pointer">✕</button>
                  </div>
                ))}
              </div>
            </div>
            {cart.length > 0 && (
              <button onClick={() => buyNow(cart)} className="w-full py-3.5 bg-emerald-400 text-black font-black text-sm uppercase cursor-pointer">
                💳 Enter Shipping Address & Pay ({cart.length}) →
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
