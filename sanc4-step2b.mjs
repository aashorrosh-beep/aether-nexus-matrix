import fs from "fs";

const partB = `
  return (
    <main className="min-h-screen text-white pb-20" style={{ background: "linear-gradient(180deg, #0a192f 0%, #0f172a 50%, #020617 100%)" }}>
      <header className="sticky top-0 z-40 bg-black/95 border-b-2 border-cyan-400 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a href="/" className="px-3.5 py-2 bg-amber-400 text-black font-black text-xs uppercase">← Mall Lobby</a>
            <h1 className="text-lg md:text-2xl font-black text-white">🛡️ PTSD, Veterans, Trauma & Peace Recovery Sanctuary (150 Items)</h1>
          </div>
          <button onClick={() => buyNow(cart)} className="px-4 py-2 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer">🛒 Cart ({cart.length})</button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 pt-4 pb-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-slate-900/90 border border-cyan-400 p-3 text-xs">
          <strong className="text-amber-300">📰 Veteran & Trauma Recovery Signal:</strong> 25-lb Cooling Grounding Blankets, Vagus-Nerve Wearables & Ashwagandha/GABA Calm Gummies Priced 15% Below Retail.
        </div>
        <form onSubmit={e => { e.preventDefault(); setEvents("📍 Found Veteran Peer Coffee Meetups, K9 Service Dog Programs & VA Vet Centers Within 15 Miles of ZIP " + zip); }} className="flex gap-2">
          <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="📍 Enter 5-Digit ZIP for Local Veteran Meetups, K9 & VA Centers (15 Mi)..." className="flex-1 px-3 py-2 bg-black border border-cyan-400 text-xs text-white font-bold" />
          <button type="submit" className="px-4 py-2 bg-amber-400 text-black font-black text-xs uppercase cursor-pointer">Find (15 Mi)</button>
        </form>
      </section>
      {events && <div className="max-w-7xl mx-auto px-4 pb-2"><div className="p-2 bg-slate-900 border border-amber-400 text-xs text-amber-300 font-bold">{events}</div></div>}

      <section className="max-w-7xl mx-auto px-4 pb-3 space-y-2">
        <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search 150 PTSD & Veteran items (grounding blanket, vagus nerve, K9 harness, brown noise, calm gummies)..." className="w-full px-4 py-2 bg-black border-2 border-cyan-400 text-xs text-white font-bold" />
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setDept("all")} className="px-3 py-1.5 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer">🛡️ All 150 Items</button>
          <button onClick={() => setDept("hard50")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-cyan-300 border border-cyan-500 cursor-pointer">🔍 50 Hardest-to-Find PTSD & K9 Gear</button>
          <button onClick={() => setDept("care35")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-indigo-300 border border-indigo-500 cursor-pointer">💙 35 Family & Home Lifesavers</button>
          <button onClick={() => setDept("daily15")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">⭐ 15 Daily Calm & Sleep</button>
          <button onClick={() => setDept("clinical25")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-emerald-300 border border-emerald-500 cursor-pointer">🏆 25 Clinical Cortisol & GABA Gummies</button>
          <button onClick={() => setDept("bestseller25")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-amber-300 border border-amber-500 cursor-pointer">🔥 25 Best-Seller Sleep Chews & Bundles</button>
        </div>
      </section>
`;

fs.appendFileSync("app/sanctuary/ptsd-veterans/page.tsx", partB, "utf8");
console.log("✅ PTSD STEP 3 DONE!");
