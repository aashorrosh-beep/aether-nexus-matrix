"use client";
import React, { useState, useEffect } from "react";
import { holisticPeptides100 } from "../../data/holistic-peptides-100";

const AI_ROUTES: Record<string, { title: string; recipe: string; stack: string }> = {
  brain: {
    title: "🧠 Memory, Dementia & Neuro-Preventive Daily Protocol",
    recipe: "Morning Neuro Infusion: Steep 1 tsp Dual-Extract Lion's Mane + 1/2 tsp Bacopa + Rosemary in warm water with 1 tsp C8 MCT oil for brain-barrier lipid transport.",
    stack: "Top Clinical Stack: Lion's Mane 30% Beta-Glucan + Magnesium L-Threonate + Citicoline + Liposomal Curcumin."
  },
  herbal: {
    title: "🌿 Botanical Oncology-Supportive Comfort & Cellular Defense Protocol",
    recipe: "Slow-Simmer Apothecary Decoction: Simmer 2g Turkey Tail (PSK) + 2g Reishi + Soursop Leaf + Ginger root for 20 mins; finish with 1 tsp cold-pressed Black Seed Oil.",
    stack: "Top Clinical Stack: Turkey Tail PSK/PSP Extract + Organic Soursop + Activated Sulforaphane + Ginger Soothing Tea."
  },
  peptides: {
    title: "🧬 Oral & Topical Peptide Cellular Repair Protocol",
    recipe: "Synergistic Routine: Take Oral BPC-157 Arginine Salt & Liposomal NAD+ on a light stomach in the morning; apply GHK-Cu Copper Peptide Cream topically at night.",
    stack: "Top Clinical Stack: Oral BPC-157 (5mg/10mg/15mg) + GHK-Cu 2oz/4oz Cream + Liposomal Glutathione."
  },
  protein: {
    title: "💪 Senior Muscle Preservation, Anti-Wasting & Clean Protein Protocol",
    recipe: "Daily Strength Shake: Blend 1 scoop Cold-Filtered Whey Isolate (or Organic Plant Protein) + 3g HMB + D3 + 5g Micronized Creatine + L-Glutamine.",
    stack: "Top Clinical Stack: HMB + D3 Muscle Preservation Powder + 5lb Clean Whey Isolate + Essential Amino Acids."
  }
};

export default function HolisticPeptidesSuperstore() {
  const [dept, setDept] = useState("all");
  const [rankFilter, setRankFilter] = useState("all");
  const [budget, setBudget] = useState("all");
  const [routeKey, setRouteKey] = useState("brain");
  const [q, setQ] = useState("");
  const [zip, setZip] = useState("");
  const [clinics, setClinics] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const sku = p.get("sku");
    if (sku) {
      const f = holisticPeptides100.find((x: any) => x.id === sku);
      if (f) setSelected(f);
    }
  }, []);

  const buyNow = async (itemsToBuy: any[]) => {
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: itemsToBuy }) });
    const d = await r.json();
    if (d && d.url) window.location.href = d.url;
  };

  const shown = holisticPeptides100.filter((it: any) => {
    const dOk = dept === "all" ? true : it.deptId === dept;
    const rOk = rankFilter === "all" ? true : it.rankGroup === rankFilter;
    const bOk = budget === "all" ? true : it.priceBand === budget;
    const qOk = q.trim() === "" ? true : it.name.toLowerCase().includes(q.toLowerCase());
    return dOk && rOk && bOk && qOk;
  });
  const activeRoute = AI_ROUTES[routeKey];

  return (
    <main className="min-h-screen text-white pb-20" style={{ background: "linear-gradient(180deg, #041f18 0%, #09151b 50%, #04070a 100%)" }}>
      <header className="sticky top-0 z-40 bg-black/95 border-b-2 border-emerald-400 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a href="/" className="px-3.5 py-2 bg-amber-400 text-black font-black text-xs uppercase">← Mall Lobby</a>
            <div>
              <span className="bg-emerald-400 text-black font-black text-[10px] px-2 py-0.5 uppercase">Top 25 Clinical Value + Top 25 Best-Sellers Per Aisle • 5mg/10mg/15mg • 2oz/4oz • 1lb/2lb/5lb</span>
              <h1 className="text-lg md:text-2xl font-black text-white">🌿 200-Item Holistic, Peptide, Memory & Oncology-Support Superstore</h1>
            </div>
          </div>
          <button onClick={() => buyNow(cart)} className="px-4 py-2 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer">🛒 Checkout Cart ({cart.length})</button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 pt-4 pb-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-black/90 border-2 border-emerald-400 p-4">
          <span className="bg-emerald-400 text-black font-black text-[10px] px-2 py-0.5 uppercase">🤖 AI Well-Being Categorizer & Traditional Herbal Recipe Builder</span>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <button onClick={() => { setRouteKey("brain"); setDept("brain-memory"); }} className={routeKey === "brain" ? "px-3 py-1.5 bg-amber-400 text-black font-black text-xs uppercase cursor-pointer" : "px-3 py-1.5 bg-zinc-900 text-white font-black text-xs uppercase cursor-pointer"}>🧠 Dementia & Memory</button>
            <button onClick={() => { setRouteKey("herbal"); setDept("herbal-apothecary"); }} className={routeKey === "herbal" ? "px-3 py-1.5 bg-amber-400 text-black font-black text-xs uppercase cursor-pointer" : "px-3 py-1.5 bg-zinc-900 text-white font-black text-xs uppercase cursor-pointer"}>🌿 Oncology-Support Herbs</button>
            <button onClick={() => { setRouteKey("peptides"); setDept("peptides-creams"); }} className={routeKey === "peptides" ? "px-3 py-1.5 bg-amber-400 text-black font-black text-xs uppercase cursor-pointer" : "px-3 py-1.5 bg-zinc-900 text-white font-black text-xs uppercase cursor-pointer"}>🧬 Peptides & Creams</button>
            <button onClick={() => { setRouteKey("protein"); setDept("gnc-proteins"); }} className={routeKey === "protein" ? "px-3 py-1.5 bg-amber-400 text-black font-black text-xs uppercase cursor-pointer" : "px-3 py-1.5 bg-zinc-900 text-white font-black text-xs uppercase cursor-pointer"}>💪 Muscle & Proteins</button>
          </div>
          <div className="mt-3 p-3 bg-emerald-950/70 border border-emerald-400 text-xs space-y-1.5">
            <div className="font-black text-amber-300 text-sm">{activeRoute.title}</div>
            <p className="text-zinc-100"><strong>🍵 Traditional Recipe:</strong> {activeRoute.recipe}</p>
            <p className="text-emerald-300 font-bold"><strong>📦 Clinical Stack:</strong> {activeRoute.stack}</p>
          </div>
        </div>

        <div className="bg-black/90 border-2 border-amber-400 p-4 flex flex-col justify-between">
          <div>
            <span className="bg-amber-400 text-black font-black text-[10px] px-2 py-0.5 uppercase">📍 15-Mile Integrative Oncology, Memory Clinic & Apothecary Finder</span>
            <form onSubmit={e => { e.preventDefault(); setClinics([
              { t: "🧬 Integrative Oncology, NAD+ & Peptide Clinics (15 Mi of ZIP " + zip + ")", d: "Licensed naturopathic oncology support, IV nutrition & peptide consults." },
              { t: "🧠 Memory Care, Neurology & Cognitive Vitality Centers (ZIP " + zip + ")", d: "Early cognitive screening, neuro-nutrition & family caregiver support." },
              { t: "🌿 Local Organic Herbal Apothecaries & Compounding Pharmacies (15 Mi of " + zip + ")", d: "Medicinal mushrooms, custom topical creams & loose-leaf botanicals." }
            ]); }} className="flex flex-col sm:flex-row gap-2 mt-2">
              <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="Enter 5-Digit ZIP Code (e.g. 77433)..." className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-700 text-xs text-white font-bold" />
              <button type="submit" className="px-4 py-2 bg-amber-400 text-black font-black text-xs uppercase cursor-pointer">🔍 Find Local (15 Mi)</button>
            </form>
            {clinics && (
              <div className="mt-2 space-y-1">
                {clinics.map((c: any, i: number) => (
                  <div key={i} className="p-1.5 bg-zinc-900 border border-amber-400 text-[11px]">
                    <strong className="text-amber-300">{c.t}:</strong> {c.d}
                  </div>
                ))}
              </div>
            )}
          </div>
          <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search 200 items (Turkey Tail, Soursop, Lion's Mane, Mag Threonate, BPC-157, GHK-Cu, HMB, Whey)..." className="w-full mt-3 px-3.5 py-2 bg-zinc-950 border-2 border-emerald-400 text-xs text-white font-bold" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-3 space-y-2">
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setDept("all")} className="px-3 py-1.5 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer">🌿 All 200 Items (4 Aisles)</button>
          <button onClick={() => setDept("peptides-creams")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">🧬 Peptides, Creams & NAD+ (50)</button>
          <button onClick={() => setDept("brain-memory")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">🧠 Memory & Dementia Care (50)</button>
          <button onClick={() => setDept("herbal-apothecary")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">🍵 Oncology-Support Herbs & Mushrooms (50)</button>
          <button onClick={() => setDept("gnc-proteins")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">💪 Clean Proteins, HMB & Creatine (50)</button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={() => setRankFilter("all")} className={rankFilter === "all" ? "px-3 py-1.5 text-xs font-black uppercase bg-white text-black cursor-pointer" : "px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-zinc-300 cursor-pointer"}>All Tiers ({shown.length})</button>
          <button onClick={() => setRankFilter("med25")} className={rankFilter === "med25" ? "px-3 py-1.5 text-xs font-black uppercase bg-emerald-400 text-black cursor-pointer" : "px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-emerald-300 border border-emerald-500 cursor-pointer"}>🏆 Top 25 Highest Medical / Clinical Value Per Aisle</button>
          <button onClick={() => setRankFilter("top25")} className={rankFilter === "top25" ? "px-3 py-1.5 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer" : "px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-amber-300 border border-amber-500 cursor-pointer"}>🔥 Top 25 #1 Best-Selling Daily Staples Per Aisle</button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={() => setBudget("all")} className="px-3 py-1 text-xs font-black uppercase bg-zinc-800 text-white cursor-pointer">All Sizes & Prices</button>
          <button onClick={() => setBudget("low")} className="px-3 py-1 text-xs font-black uppercase bg-zinc-900 text-emerald-400 cursor-pointer">💲 Starter: 5mg / 30 Caps / 1lb ($21–$39)</button>
          <button onClick={() => setBudget("mid")} className="px-3 py-1 text-xs font-black uppercase bg-zinc-900 text-amber-400 cursor-pointer">💲💲 Standard: 10mg / 2oz Cream / 2lb ($40–$88)</button>
          <button onClick={() => setBudget("high")} className="px-3 py-1 text-xs font-black uppercase bg-zinc-900 text-purple-400 cursor-pointer">💲💲💲 Clinic Bulk: 15mg / 4oz / 5lb ($89+)</button>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
        {shown.map((item: any, idx: number) => (
          <div key={idx} className="bg-zinc-950 border-0 rounded-none m-0 p-0 overflow-hidden flex flex-col justify-between">
            <div onClick={() => setSelected(item)} className="relative aspect-square w-full bg-transparent overflow-hidden cursor-pointer">
              <img src={item.media[0]} alt={item.name} className="w-full h-full object-cover p-0 m-0 block" />
              <span className={item.rankGroup === "med25" ? "absolute top-1.5 left-1.5 bg-emerald-400 text-black text-[9px] font-black px-2 py-0.5" : "absolute top-1.5 left-1.5 bg-amber-400 text-black text-[9px] font-black px-2 py-0.5"}>{item.rankBadge}</span>
              <div className={item.count <= 5 ? "absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-black bg-red-700/95 text-white flex justify-between" : "absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-black bg-black/85 text-emerald-400 flex justify-between"}>
                <span>{item.count <= 5 ? "🔥 ONLY " + item.count + " LEFT!" : "✅ " + item.count + " IN STOCK"}</span>
                <span>{item.volumeSize.split(" ")[0]}</span>
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
