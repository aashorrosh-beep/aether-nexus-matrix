import fs from "fs";

const partB = `
  return (
    <main className="min-h-screen text-white pb-20" style={{ background: "linear-gradient(180deg, #051b14 0%, #091e1a 50%, #050a09 100%)" }}>
      <header className="sticky top-0 z-40 bg-black/95 border-b-2 border-emerald-400 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a href="/" className="px-3.5 py-2 bg-amber-400 text-black font-black text-xs uppercase">← Mall Lobby</a>
            <h1 className="text-lg md:text-2xl font-black text-white">♿ Muscular Dystrophy, Senior Independence & Mobility Sanctuary (150 Items)</h1>
          </div>
          <button onClick={() => buyNow(cart)} className="px-4 py-2 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer">🛒 Cart ({cart.length})</button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 pt-4 pb-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-emerald-950/60 border border-emerald-400 p-3 text-xs">
          <strong className="text-amber-300">📰 Senior Independence & Mobility Update:</strong> Zero-Lift Transfer Boards, Anti-Tremor Utensils & HMB/CoQ10 Muscle Gummies Priced 15% Below Medical Supply Stores.
        </div>
        <form onSubmit={e => { e.preventDefault(); setEvents("📍 Found Wheelchair-Accessible Events, Mobility Clinics & Senior Independence Resources Within 15 Miles of ZIP " + zip); }} className="flex gap-2">
          <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="📍 Enter 5-Digit ZIP for Local Mobility Clinics & Events (15 Mi)..." className="flex-1 px-3 py-2 bg-black border border-emerald-400 text-xs text-white font-bold" />
          <button type="submit" className="px-4 py-2 bg-amber-400 text-black font-black text-xs uppercase cursor-pointer">Find (15 Mi)</button>
        </form>
      </section>
      {events && <div className="max-w-7xl mx-auto px-4 pb-2"><div className="p-2 bg-emerald-950 border border-amber-400 text-xs text-amber-300 font-bold">{events}</div></div>}

      <section className="max-w-7xl mx-auto px-4 pb-3 space-y-2">
        <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search 150 mobility & senior items (walker, ramp, transfer board, anti-tremor spoon, HMB chews, joint gummies)..." className="w-full px-4 py-2 bg-black border-2 border-emerald-400 text-xs text-white font-bold" />
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setDept("all")} className="px-3 py-1.5 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer">♿ All 150 Items</button>
          <button onClick={() => setDept("hard50")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-emerald-300 border border-emerald-500 cursor-pointer">🔍 50 Hardest-to-Find Mobility</button>
          <button onClick={() => setDept("care35")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-cyan-300 border border-cyan-500 cursor-pointer">💙 35 Caretaker Lifesavers</button>
          <button onClick={() => setDept("daily15")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">⭐ 15 Senior Independence</button>
          <button onClick={() => setDept("clinical25")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-emerald-300 border border-emerald-500 cursor-pointer">🏆 25 Clinical Muscle & Joint Gummies</button>
          <button onClick={() => setDept("bestseller25")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-amber-300 border border-amber-500 cursor-pointer">🔥 25 Best-Seller Comfort & Creams</button>
        </div>
      </section>
`;

fs.appendFileSync("app/sanctuary/md-mobility/page.tsx", partB, "utf8");
console.log("✅ MD STEP 2B DONE!");
