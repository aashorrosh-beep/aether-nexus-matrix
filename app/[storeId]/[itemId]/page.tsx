"use client";
import React, { useState, useEffect, use } from "react";
import { masterInventory } from "../../inventory";

export default function StorefrontPage({ params }: { params: Promise<{ storeId: string }> | { storeId: string } }) {
  const resolvedParams: any = typeof (params as any)?.then === "function" ? use(params as Promise<{ storeId: string }>) : params;
  const rawSlug = decodeURIComponent(String(resolvedParams?.storeId || "holiday-wishlist-100-superstore"));

  // Match exact slug or fallback gracefully so NO room ever 404s or 500s
  const allKeys = Object.keys(masterInventory);
  const matchedKey = masterInventory[rawSlug]
    ? rawSlug
    : (allKeys.find(k => k.toLowerCase() === rawSlug.toLowerCase()) ||
       allKeys.find(k => k.includes(rawSlug.replace(/^nostalgia-/, ""))) ||
       "holiday-wishlist-100-superstore");

  const items: any[] = masterInventory[matchedKey] || masterInventory["holiday-wishlist-100-superstore"] || [];
  const [searchQ, setSearchQ] = useState("");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  // If user clicked a product from "Search All 6 Malls", auto-open that exact product modal!
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const sku = urlParams.get("sku");
      if (sku && items.length) {
        const found = items.find((it: any) => String(it.id) === sku || String(it.name).toLowerCase().includes(sku.toLowerCase()));
        if (found) {
          setSelectedItem(found);
          setActiveImgIdx(0);
        }
      }
      const saved = localStorage.getItem("nexus_cart");
      if (saved) {
        try { setCart(JSON.parse(saved)); } catch (e) {}
      }
    }
  }, [matchedKey, items]);

  const addToCart = (item: any, openDrawer = true) => {
    const next = [...cart, { ...item, room: matchedKey, qty: 1 }];
    setCart(next);
    if (typeof window !== "undefined") localStorage.setItem("nexus_cart", JSON.stringify(next));
    if (openDrawer) setCartOpen(true);
  };

  const removeFromCart = (idx: number) => {
    const next = cart.filter((_, i) => i !== idx);
    setCart(next);
    if (typeof window !== "undefined") localStorage.setItem("nexus_cart", JSON.stringify(next));
  };

  const handleCheckout = async (itemsToBuy: any[]) => {
    if (!itemsToBuy.length) return;
    setCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemsToBuy })
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout Error: " + (data?.error || "Please verify Stripe API key"));
      }
    } catch (err: any) {
      alert("Checkout connection error: " + err.message);
    } finally {
      setCheckingOut(false);
    }
  };

  const filtered = items.filter((it: any) =>
    !searchQ.trim() ||
    String(it.name || "").toLowerCase().includes(searchQ.toLowerCase()) ||
    String(it.id || "").toLowerCase().includes(searchQ.toLowerCase())
  );

  const isPartyRoom = matchedKey.includes("lapooza") || matchedKey.includes("baby-shower") || matchedKey.includes("ugly-sweater");
  const prettyTitle = matchedKey.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-20">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur border-b border-amber-400/40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a href="/" className="px-3.5 py-2 rounded-xl bg-amber-400 text-black font-black text-xs uppercase shadow">← Back to All 6 Malls</a>
            <div>
              <h1 className="text-lg md:text-2xl font-black text-white">{prettyTitle}</h1>
              <p className="text-[11px] text-amber-300 font-bold">{items.length} Verified In-Stock Items • 3+ Vendor Photos, Video & Insured Specs</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder="Search inside this storefront..."
              className="flex-1 md:w-64 px-3.5 py-2 rounded-xl bg-black border border-zinc-700 text-xs text-white"
            />
            <button
              onClick={() => setCartOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-400 text-black font-black text-xs uppercase shrink-0 cursor-pointer shadow-lg"
            >
              🛒 Cart ({cart.length})
            </button>
          </div>
        </div>
      </header>

      {/* Party Lapooza Customizer Banner if inside a Party/Baby Shower Room */}
      {isPartyRoom && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="bg-gradient-to-r from-fuchsia-950 via-purple-900 to-indigo-950 border-2 border-amber-400 rounded-3xl p-5 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="inline-block bg-amber-400 text-black font-black text-xs px-3 py-1 rounded-full uppercase mb-1">📸 Put Anyone Inside The Party Decorations — Included Free!</span>
              <h2 className="text-lg md:text-2xl font-black text-white">1️⃣ Upload Phone Photo → 2️⃣ Preview on Arch, Cutouts & Toppers → 3️⃣ Love It & Share It!</h2>
              <p className="text-fuchsia-100 text-xs mt-1">Put the Birthday Star, Bride, Quinceañera, or Baby right inside the 3D Vinyl Banner, Life-Size Standee & Cupcake Toppers in 30 seconds.</p>
            </div>
            <a href="/party-lapooza-ai-studio.html" className="px-5 py-3 rounded-xl bg-amber-400 text-black font-black text-xs uppercase shrink-0 shadow-xl">📸 CUSTOMIZE RIGHT HERE →</a>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="w-full max-w-7xl mx-auto px-0 pt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0">
        {filtered.map((item: any, idx: number) => {
          const imgs = Array.isArray(item.media) && item.media.length ? item.media : ["https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600"];
          return (
            <div key={item.id || idx} className="bg-zinc-950 border-0 rounded-none overflow-hidden flex flex-col justify-between transition">
              <div>
                <div
                  onClick={() => { setSelectedItem(item); setActiveImgIdx(0); }}
                  className="relative aspect-square w-full bg-transparent cursor-pointer overflow-hidden group"
                >
                  <img src={imgs[0]} alt={item.name} className="w-full h-full object-cover p-0 m-0 block group-hover:scale-105 transition duration-300" />
                  <span className="absolute top-2 left-2 bg-black/80 text-amber-400 border border-amber-400/50 text-[10px] font-black px-2 py-0.5 rounded-md">
                    📸 {imgs.length} Photos + 🎥 Video
                  </span>
                  <span className="absolute top-2 right-2 bg-emerald-500 text-black text-[10px] font-black px-2 py-0.5 rounded-md">
                    In Stock ({item.count || 9})
                  </span>
                </div>

                <div className="p-2.5 bg-zinc-950">
                  <div className="text-[10px] text-zinc-400 font-mono mb-1">SKU: {item.id}</div>
                  <h3
                    onClick={() => { setSelectedItem(item); setActiveImgIdx(0); }}
                    className="font-bold text-sm text-white line-clamp-2 cursor-pointer hover:text-amber-300"
                  >
                    {item.name}
                  </h3>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-2xl font-black text-amber-400">{item.price}</span>
                    <span className="text-[11px] text-emerald-400 font-bold">✅ Certified Insured</span>
                  </div>
                  {item.specs?.shipping && (
                    <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{item.specs.shipping}</p>
                  )}
                </div>
              </div>

              <div className="px-2.5 pb-3 pt-0 bg-zinc-950 flex flex-col gap-1.5">
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item, true)}
                    className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase cursor-pointer"
                  >
                    🛒 Add to Cart
                  </button>
                  <button
                    onClick={() => handleCheckout([item])}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-black text-xs uppercase cursor-pointer"
                  >
                    ⚡ Buy Now
                  </button>
                </div>
                <button
                  onClick={() => { setSelectedItem(item); setActiveImgIdx(0); }}
                  className="w-full py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-[11px] cursor-pointer"
                >
                  🔍 View 3+ Photos, Video & Full Specs
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Detail Modal (3+ Photos, Video & Full Spec Sheet) */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border-2 border-amber-400 rounded-3xl max-w-3xl w-full p-5 md:p-6 shadow-2xl my-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-mono text-amber-400">{selectedItem.id}</span>
                <h2 className="text-lg md:text-2xl font-black text-white">{selectedItem.name}</h2>
              </div>
              <button onClick={() => setSelectedItem(null)} className="px-3 py-1.5 rounded-xl bg-zinc-800 text-white font-black text-xs cursor-pointer">✕ Close</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <div className="h-64 bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-zinc-800 mb-3">
                  {activeImgIdx === 99 && selectedItem.trailerUrl ? (
                    <video src={selectedItem.trailerUrl} controls autoPlay className="w-full h-full object-cover" />
                  ) : (
                    <img src={(selectedItem.media || [])[activeImgIdx] || (selectedItem.media || [])[0]} alt={selectedItem.name} className="w-full h-full object-cover p-0 m-0 block" />
                  )}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {(selectedItem.media || []).map((m: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setActiveImgIdx(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 cursor-pointer ${activeImgIdx === i ? "border-amber-400" : "border-zinc-700"}`}
                    >
                      <img src={m} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                  {selectedItem.trailerUrl && (
                    <button
                      onClick={() => setActiveImgIdx(99)}
                      className={`px-3 h-16 rounded-xl bg-red-600 text-white font-black text-xs shrink-0 cursor-pointer ${activeImgIdx === 99 ? "ring-2 ring-amber-400" : ""}`}
                    >
                      ▶ Watch Video
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="text-3xl font-black text-amber-400 mb-3">{selectedItem.price}</div>
                  <div className="bg-black/60 border border-zinc-800 rounded-2xl p-3.5 text-xs space-y-2 text-zinc-200">
                    <div><strong className="text-amber-400">Vendor & Insurance:</strong> {selectedItem.specs?.manufacturer}</div>
                    <div><strong className="text-amber-400">Condition & Stock:</strong> {selectedItem.specs?.condition}</div>
                    <div><strong className="text-amber-400">Guarantee:</strong> {selectedItem.specs?.authentication}</div>
                    <div><strong className="text-amber-400">Shipping & Tax:</strong> {selectedItem.specs?.shipping}</div>
                    <div><strong className="text-amber-400">Price Comparison:</strong> {selectedItem.specs?.market_value}</div>
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => { addToCart(selectedItem, true); setSelectedItem(null); }}
                    className="flex-1 py-3 rounded-xl bg-amber-400 text-black font-black text-xs uppercase cursor-pointer"
                  >
                    🛒 Add to Cart
                  </button>
                  <button
                    onClick={() => handleCheckout([selectedItem])}
                    className="flex-1 py-3 rounded-xl bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer"
                  >
                    ⚡ Instant Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-Over Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex justify-end">
          <div className="bg-zinc-900 border-l-2 border-amber-400 w-full max-w-md h-full p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                <h2 className="text-lg font-black text-amber-400">🛒 Your Universal Mall Cart ({cart.length})</h2>
                <button onClick={() => setCartOpen(false)} className="px-3 py-1 rounded-lg bg-zinc-800 text-xs font-bold cursor-pointer">✕ Close</button>
              </div>
              <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-zinc-400 text-xs">Your cart is empty. Click Add to Cart on any item!</p>
                ) : (
                  cart.map((c, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 bg-black/50 border border-zinc-800 rounded-xl p-2.5">
                      <img src={c.media?.[0]} alt="" className="w-12 h-12 rounded-lg object-cover bg-zinc-800 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">{c.name}</div>
                        <div className="text-xs font-black text-amber-400">{c.price}</div>
                      </div>
                      <button onClick={() => removeFromCart(i)} className="text-red-400 text-xs font-bold px-2 cursor-pointer">✕</button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-zinc-800 pt-4">
                <button
                  disabled={checkingOut}
                  onClick={() => handleCheckout(cart)}
                  className="w-full py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-black text-sm uppercase shadow-xl cursor-pointer"
                >
                  {checkingOut ? "Opening Secure Stripe Checkout..." : "💳 Proceed to Stripe Checkout →"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
