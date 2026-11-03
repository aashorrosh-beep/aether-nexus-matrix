import fs from "fs";

const botUi = `
  return (
    <main className="min-h-screen text-white pb-20" style={{ background: "linear-gradient(180deg, #1f0e05 0%, #0d131a 50%, #05070b 100%)" }}>
      <header className="sticky top-0 z-40 bg-black/95 border-b-2 border-amber-400 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a href="/" className="px-3.5 py-2 bg-amber-400 text-black font-black text-xs uppercase">← Mall Lobby</a>
            <div>
              <span className="bg-amber-400 text-black font-black text-[10px] px-2 py-0.5 uppercase">🇺🇸 SPORTFLIX WORLD: An American Tradition</span>
              <h1 className="text-lg md:text-2xl font-black text-white">🏀 Basketball Hoops & Hardwood Court Superstore (60 Items)</h1>
            </div>
          </div>
          <button onClick={() => buyNow(cart)} className="px-4 py-2 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer">🛒 Cart ({cart.length})</button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 pt-4 pb-3">
        <div className="bg-black/85 border-2 border-amber-400 p-4">
          <h2 className="text-base font-black text-amber-300">📍 15-Mile Local AAU Tournaments, Indoor Courts & Shooting Machine Labs Finder</h2>
          <form onSubmit={e => { e.preventDefault(); setEvents([
            { t: "🏀 Indoor Hardwood Gyms & Open Run Courts (15 Mi of ZIP " + zip + ")", d: "Full-court hardwood gyms, Dr. Dish shooting machine rentals & leagues." },
            { t: "🏆 Weekend AAU, 3-on-3 & Youth Basketball Tournaments (ZIP " + zip + ")", d: "Active team brackets, rec leagues & summer showcase registration." },
            { t: "🔧 In-Ground Hoop Installation & Court Striping Pros (15 Mi of " + zip + ")", d: "Driveway tempered-glass hoop concrete anchor installers near you." }
          ]); }} className="flex flex-col sm:flex-row gap-2 mt-2">
            <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="Enter 5-Digit ZIP Code (e.g. 77433)..." className="flex-1 px-3.5 py-2 bg-zinc-950 border border-zinc-700 text-xs text-white font-bold" />
            <button type="submit" className="px-5 py-2 bg-amber-400 text-black font-black text-xs uppercase cursor-pointer">🔍 Search 15-Mile Radius →</button>
          </form>
          {events && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
              {events.map((ev: any, i: number) => (
                <div key={i} className="bg-amber-950/60 border border-amber-400 p-2.5 text-xs">
                  <div className="font-black text-amber-300">{ev.t}</div>
                  <p className="text-zinc-200 text-[11px] mt-1">{ev.d}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-3 space-y-2">
        <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search 60 pure basketball items (portable hoops, glass backboards, leather game balls, shot return nets)..." className="w-full px-4 py-2 bg-black border-2 border-amber-400 text-xs text-white font-bold" />
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setDept("all")} className="px-3 py-1.5 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer">🏀 All 60 Court Items</button>
          <button onClick={() => setDept("court-bundles")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">🎁 1-Box Court & Team Bundles (15)</button>
          <button onClick={() => setDept("hoops-backboards")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">🏀 Portable & In-Ground Hoops (15)</button>
          <button onClick={() => setDept("balls-racks")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">🏆 Official Game Balls & Racks (15)</button>
          <button onClick={() => setDept("return-nets-agility")} className="px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer">🎯 Shot Return Nets & Training (15)</button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setBudget("all")} className="px-3 py-1 text-xs font-black uppercase bg-white text-black cursor-pointer">All Prices ({shown.length})</button>
          <button onClick={() => setBudget("low")} className="px-3 py-1 text-xs font-black uppercase bg-emerald-400 text-black cursor-pointer">💲 Training Aids, Nets & Balls ($19–$39)</button>
          <button onClick={() => setBudget("mid")} className="px-3 py-1 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer">💲💲 Return Systems & Bundles ($40–$115)</button>
          <button onClick={() => setBudget("high")} className="px-3 py-1 text-xs font-black uppercase bg-purple-400 text-black cursor-pointer">💲💲💲 Tempered Glass Hoops ($120+)</button>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
        {shown.map((item: any, idx: number) => (
          <div key={idx} className="bg-zinc-950 border-0 rounded-none m-0 p-0 overflow-hidden flex flex-col justify-between">
            <div onClick={() => setSelected(item)} className="relative aspect-square w-full bg-transparent overflow-hidden cursor-pointer">
              <img src={item.media[0]} alt={item.name} className="w-full h-full object-cover p-0 m-0 block" />
              <span className="absolute top-1.5 left-1.5 bg-black/85 text-amber-300 text-[10px] font-black px-2 py-0.5">{item.isCuratedBundle ? "🎁 1-BOX BUNDLE" : "📸 3 Photos"}</span>
              <div className={item.count <= 5 ? "absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-black bg-red-700/95 text-white flex justify-between" : "absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-black bg-black/85 text-emerald-400 flex justify-between"}>
                <span>{item.count <= 5 ? "🔥 ONLY " + item.count + " LEFT!" : "✅ " + item.count + " IN STOCK"}</span>
                <span>🔄 Auto-Shift</span>
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
`;

fs.appendFileSync("app/sportflix/basketball/page.tsx", botUi, "utf8");
console.log("✅ BASKETBALL STEP 3 DONE!");
