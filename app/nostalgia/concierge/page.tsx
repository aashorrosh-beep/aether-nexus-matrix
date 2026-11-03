"use client";
import React, { useState } from "react";

export default function ConciergePage() {
  const [query, setQuery] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [buyingId, setBuyingId] = useState("");

  const handleSource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const r = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, contact })
      });
      const d = await r.json();
      setResult(d);
    } catch (err) {}
    setLoading(false);
  };

  const buyNow = async (item: any) => {
    setBuyingId(item.id);
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [item] })
      });
      const d = await r.json();
      if (d?.url) window.location.href = d.url;
    } catch (e) {}
    setBuyingId("");
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <a href="/" className="inline-block mb-4 px-4 py-2 rounded-xl bg-amber-400 text-black font-black text-xs uppercase">← Back to All 6 Malls</a>
        <div className="bg-zinc-900 border-2 border-amber-400 p-6 mb-6">
          <span className="bg-emerald-400 text-black font-black text-xs px-3 py-1 uppercase">⚡ Live 30-Min to 3-Hour Global Sourcing Desk • 24-Hour Price Hold</span>
          <h1 className="text-2xl md:text-4xl font-black mt-2">Don't See It in Our 240 Rooms? We Source It Live & Hold It For 24 Hours!</h1>
          <p className="text-zinc-300 text-sm mt-1">Type any product on earth below. Our AI Concierge scans wholesale & direct vendor feeds immediately, beats or matches the competitor price, and locks your private checkout link for 24 hours.</p>

          <form onSubmit={handleSource} className="mt-4 flex flex-col md:flex-row gap-2">
            <input
              type="text"
              required
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="What exact item, brand, or model do you want us to find right now?"
              className="flex-1 px-4 py-3 bg-black border border-zinc-700 text-white text-sm font-bold"
            />
            <input
              type="text"
              value={contact}
              onChange={e => setContact(e.target.value)}
              placeholder="Your Phone or Email (for 24-Hr Hold Link)"
              className="md:w-72 px-4 py-3 bg-black border border-zinc-700 text-white text-sm"
            />
            <button type="submit" disabled={loading} className="px-6 py-3 bg-amber-400 text-black font-black text-xs md:text-sm uppercase cursor-pointer shrink-0">
              {loading ? "⚡ Sourcing Live..." : "⚡ Find & Lock Price Now →"}
            </button>
          </form>
        </div>

        {result?.items && (
          <div>
            <div className="bg-emerald-950 border border-emerald-400 p-3 mb-2 text-xs font-black text-emerald-300">
              ✅ CONCIERGE TICKET #{result.ticketId} LOCKED! Sourced in real time & held exclusively for you for {result.expiresIn}:
            </div>
            <div className="sku-flush-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0">
              {result.items.map((it: any, i: number) => (
                <div key={i} className="sku-flush-card bg-zinc-950 border-0 rounded-none overflow-hidden flex flex-col justify-between">
                  <div className="relative aspect-square w-full bg-transparent overflow-hidden">
                    <img src={it.media?.[0]} alt={it.name} className="w-full h-full object-cover p-0 m-0 block" />
                  </div>
                  <div className="p-2.5 bg-zinc-950">
                    <div className="text-xs font-bold text-white line-clamp-2">{it.name}</div>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-xl font-black text-amber-400">{it.price}</span>
                      <span className="text-[10px] line-through text-zinc-500">{it.competitorPrice}</span>
                    </div>
                    <button
                      onClick={() => buyNow(it)}
                      className="w-full mt-2 py-2.5 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer"
                    >
                      {buyingId === it.id ? "Opening Checkout..." : "⚡ Buy Sourced Item Now"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
