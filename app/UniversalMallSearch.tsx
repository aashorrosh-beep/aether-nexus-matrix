"use client";
import React, { useState, useMemo } from "react";
import { masterInventory } from "./inventory";

export default function UniversalMallSearch() {
  const [q, setQ] = useState("");
  const [busyId, setBusyId] = useState("");
  const [sourcing, setSourcing] = useState(false);
  const [sourcedItems, setSourcedItems] = useState<any[]>([]);
  const [ticketId, setTicketId] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return { rooms: [], items: [] };
    const rooms: { slug: string; title: string; count: number }[] = [];
    const items: { room: string; item: any }[] = [];

    for (const [slug, arr] of Object.entries(masterInventory)) {
      if (!Array.isArray(arr)) continue;
      const cleanRoom = slug.replace(/-/g, " ");
      if (cleanRoom.includes(term)) {
        rooms.push({ slug, title: cleanRoom.replace(/\b\w/g, c => c.toUpperCase()), count: arr.length });
      }
      for (const it of arr) {
        if (items.length < 30 && (String(it.name || "").toLowerCase().includes(term) || String(it.id || "").toLowerCase().includes(term) || cleanRoom.includes(term))) {
          items.push({ room: slug, item: it });
        }
      }
    }
    return { rooms: rooms.slice(0, 8), items };
  }, [q]);

  const instantBuy = async (it: any) => {
    setBusyId(it.id);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [it] })
      });
      const data = await res.json();
      if (data?.url) window.location.href = data.url;
    } catch (e) {}
    setBusyId("");
  };

  const trigger3HrConcierge = async () => {
    const searchTarget = q.trim() || prompt("What exact item do you want our 3-Hour Concierge to find and lock for you right now?") || "";
    if (!searchTarget) return;
    setQ(searchTarget);
    setSourcing(true);
    try {
      const r = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchTarget })
      });
      const d = await r.json();
      setSourcedItems(d.items || []);
      setTicketId(d.ticketId || "ALBS-3HR-LIVE");
    } catch (e) {}
    setSourcing(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-3 pb-2 relative z-30">
      <div className="bg-zinc-900/95 border-2 border-amber-400 p-3 md:p-4 shadow-2xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
          <span className="text-xs font-black uppercase bg-amber-400 text-black px-3 py-2.5 shrink-0">🔍 Search All 6 Malls & 240 Rooms</span>
          <input
            type="text"
            value={q}
            onChange={e => { setQ(e.target.value); setSourcedItems([]); }}
            placeholder="Search 5,520+ items or type ANYTHING you want sourced in 30 mins – 3 hours..."
            className="flex-1 px-4 py-2.5 bg-black border border-zinc-700 text-white text-sm font-bold focus:outline-none focus:border-amber-400"
          />
          <button
            onClick={trigger3HrConcierge}
            disabled={sourcing}
            className="px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-black text-xs uppercase cursor-pointer shrink-0"
          >
            {sourcing ? "⚡ Sourcing Live..." : "⚡ Don't Have It? Get It In 3 Hrs →"}
          </button>
          {q && (
            <button onClick={() => { setQ(""); setSourcedItems([]); }} className="px-3 py-2.5 bg-zinc-800 text-white text-xs font-black cursor-pointer">✕</button>
          )}
        </div>

        {/* Live 3-Hour Concierge Results */}
        {sourcedItems.length > 0 && (
          <div className="mt-4 border-t border-emerald-500 pt-3">
            <div className="bg-emerald-950 text-emerald-300 text-xs font-black p-2.5 mb-2">
              ✅ CONCIERGE SOURCED IN REAL TIME (TICKET #{ticketId}) — HELD FOR 24 HOURS AT GUARANTEED LOWEST LANDED PRICE:
            </div>
            <div className="sku-flush-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0">
              {sourcedItems.map((it, idx) => (
                <div key={idx} className="sku-flush-card bg-zinc-950 border-0 rounded-none p-0 overflow-hidden flex flex-col justify-between">
                  <div className="w-full aspect-square bg-transparent overflow-hidden">
                    <img src={it.media?.[0]} alt={it.name} className="w-full h-full object-cover p-0 m-0 block" />
                  </div>
                  <div className="p-2 bg-zinc-950">
                    <div className="text-xs font-bold text-white line-clamp-2">{it.name}</div>
                    <div className="text-sm font-black text-amber-400 mt-0.5">{it.price}</div>
                    <button
                      onClick={() => instantBuy(it)}
                      className="w-full mt-1.5 py-2 bg-emerald-400 text-black font-black text-[10px] uppercase cursor-pointer"
                    >
                      {busyId === it.id ? "..." : "⚡ Buy Sourced Item"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Standard 6-Mall Search Results (Flush Zero-Gap Borderless Grid) */}
        {q.trim().length >= 2 && (
          <div className="mt-3 border-t border-zinc-800 pt-3 max-h-[75vh] overflow-y-auto">
            {results.rooms.length > 0 && (
              <div className="mb-3">
                <div className="text-xs font-black uppercase text-amber-400 mb-1.5">🏪 Matching Storefronts ({results.rooms.length}):</div>
                <div className="flex flex-wrap gap-1.5">
                  {results.rooms.map(r => (
                    <a
                      key={r.slug}
                      href={`/nostalgia/${r.slug}`}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-amber-400 hover:text-black text-white text-xs font-black transition"
                    >
                      🏪 {r.title} ({r.count}) →
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-black uppercase text-emerald-400">
                🛒 Matching In-Stock SKUs ({results.items.length}):
              </span>
              <button
                onClick={trigger3HrConcierge}
                className="text-xs font-black bg-amber-400 text-black px-3 py-1 uppercase cursor-pointer"
              >
                ⚡ Don't see the exact model? Click here to source "{q}" in 30 mins – 3 hours →
              </button>
            </div>

            {results.items.length === 0 ? (
              <div className="bg-black border border-amber-400 p-4 text-center">
                <p className="text-sm font-bold text-white mb-2">We don't have "{q}" in our current 240 rooms yet—let our AI Concierge source it for you right now!</p>
                <button
                  onClick={trigger3HrConcierge}
                  className="px-5 py-2.5 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer"
                >
                  ⚡ Source "{q}" Live Now & Lock 24-Hr Price →
                </button>
              </div>
            ) : (
              <div className="sku-flush-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
                {results.items.map(({ room, item }, i) => (
                  <div key={i} className="sku-flush-card flex flex-col justify-between bg-zinc-950 border-0 rounded-none p-0 overflow-hidden">
                    <a href={`/nostalgia/${room}?sku=${encodeURIComponent(item.id)}`} className="w-full aspect-square bg-transparent overflow-hidden block border-0 rounded-none">
                      <img src={item.media?.[0]} alt={item.name} className="w-full h-full object-cover p-0 m-0 block" />
                    </a>
                    <div className="p-2 bg-zinc-950">
                      <a href={`/nostalgia/${room}?sku=${encodeURIComponent(item.id)}`} className="text-xs font-bold text-white hover:text-amber-300 line-clamp-2 block">
                        {item.name}
                      </a>
                      <div className="text-sm font-black text-amber-400 mt-0.5">{item.price}</div>
                      <div className="flex gap-1 mt-1.5">
                        <a
                          href={`/nostalgia/${room}?sku=${encodeURIComponent(item.id)}`}
                          className="flex-1 text-center py-1.5 bg-amber-400 text-black font-black text-[10px] uppercase"
                        >
                          🔍 View
                        </a>
                        <button
                          onClick={() => instantBuy(item)}
                          className="flex-1 py-1.5 bg-emerald-400 text-black font-black text-[10px] uppercase cursor-pointer"
                        >
                          {busyId === item.id ? "..." : "⚡ Buy"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
