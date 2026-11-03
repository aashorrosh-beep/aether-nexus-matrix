import fs from "fs";

// Create a dedicated UniversalSearch client component so searching & buying works anywhere on the homepage
const searchComp = `"use client";
import React, { useState, useMemo } from "react";
import { masterInventory } from "./inventory";

export default function UniversalMallSearch() {
  const [q, setQ] = useState("");
  const [busyId, setBusyId] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return { rooms: [], items: [] };
    const rooms: { slug: string; title: string; count: number }[] = [];
    const items: { room: string; item: any }[] = [];

    for (const [slug, arr] of Object.entries(masterInventory)) {
      if (!Array.isArray(arr)) continue;
      const cleanRoom = slug.replace(/-/g, " ");
      if (cleanRoom.includes(term)) {
        rooms.push({ slug, title: cleanRoom.replace(/\\b\\w/g, c => c.toUpperCase()), count: arr.length });
      }
      for (const it of arr) {
        if (items.length < 24 && (String(it.name || "").toLowerCase().includes(term) || String(it.id || "").toLowerCase().includes(term) || cleanRoom.includes(term))) {
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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-3 pb-2 relative z-30">
      <div className="bg-zinc-900/95 border-2 border-amber-400 rounded-2xl p-3 md:p-4 shadow-2xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
          <span className="text-xs font-black uppercase bg-amber-400 text-black px-3 py-2 rounded-xl shrink-0">🔍 Search All 6 Malls & 240 Rooms</span>
          <input
            type="text"
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Type any product, gift, sport, disability aid, party kit, or room name (e.g. baseball, wheelchair, balloon, holiday)..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-black border border-zinc-700 text-white text-sm font-bold focus:outline-none focus:border-amber-400"
          />
          {q && (
            <button onClick={() => setQ("")} className="px-4 py-2 rounded-xl bg-zinc-800 text-white text-xs font-black cursor-pointer">✕ Clear</button>
          )}
        </div>

        {q.trim().length >= 2 && (
          <div className="mt-4 border-t border-zinc-800 pt-4 max-h-[70vh] overflow-y-auto">
            {results.rooms.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-black uppercase text-amber-400 mb-2">🏪 Matching Storefronts ({results.rooms.length}):</div>
                <div className="flex flex-wrap gap-2">
                  {results.rooms.map(r => (
                    <a
                      key={r.slug}
                      href={\`/nostalgia/\${r.slug}\`}
                      className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-amber-400 hover:text-black text-white text-xs font-black transition shadow"
                    >
                      🏪 {r.title} ({r.count} Items) →
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs font-black uppercase text-emerald-400 mb-2">
              🛒 Matching In-Stock Products ({results.items.length}) — Click Any Item to View or Buy Immediately:
            </div>
            {results.items.length === 0 ? (
              <p className="text-xs text-zinc-400 py-2">No exact matches found for "{q}". Try a broader word like "holiday", "party", "sensory", or "baseball".</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {results.items.map(({ room, item }, i) => (
                  <div key={i} className="flex items-center gap-3 bg-black border border-zinc-800 hover:border-amber-400 rounded-xl p-2.5 transition">
                    <a href={\`/nostalgia/\${room}?sku=\${encodeURIComponent(item.id)}\`} className="w-16 h-16 rounded-lg bg-zinc-900 overflow-hidden shrink-0 border border-zinc-700">
                      <img src={item.media?.[0]} alt={item.name} className="w-full h-full object-contain" />
                    </a>
                    <div className="flex-1 min-w-0">
                      <a href={\`/nostalgia/\${room}?sku=\${encodeURIComponent(item.id)}\`} className="text-xs font-bold text-white hover:text-amber-300 line-clamp-2 block">
                        {item.name}
                      </a>
                      <div className="text-sm font-black text-amber-400 mt-0.5">{item.price}</div>
                      <div className="flex gap-1.5 mt-1.5">
                        <a
                          href={\`/nostalgia/\${room}?sku=\${encodeURIComponent(item.id)}\`}
                          className="px-2.5 py-1 rounded-lg bg-amber-400 text-black font-black text-[10px] uppercase"
                        >
                          🔍 Open Item
                        </a>
                        <button
                          onClick={() => instantBuy(item)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-400 text-black font-black text-[10px] uppercase cursor-pointer"
                        >
                          {busyId === item.id ? "..." : "⚡ Buy Now"}
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
`;

fs.writeFileSync("app/UniversalMallSearch.tsx", searchComp, "utf8");

let p = fs.readFileSync("app/page.tsx", "utf8");
if (!p.includes("UniversalMallSearch")) {
  p = p.replace(/(import\s+[^\n]+\n)/, `$1import UniversalMallSearch from "./UniversalMallSearch";\n`);
  p = p.replace(/<main([^>]*)>/, `<main$1>\n      <UniversalMallSearch />`);
}

// Also fix any old links on page.tsx that point to broken /netrix/ or /sportlick/ paths so they route through /nostalgia/[storeId]
p = p.replace(/href=["']\/(netrix|sportlick|sportsflix|lapooza|sanctuary)\/([^"']+)["']/g, 'href="/nostalgia/$2"');

fs.writeFileSync("app/page.tsx", p, "utf8");
console.log("✅ 2/2: Universal 6-Mall Search Bar + Clickable Product Links + All Storefront Routes Fixed!");
