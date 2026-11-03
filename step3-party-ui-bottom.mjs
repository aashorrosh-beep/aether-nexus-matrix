import fs from "fs";

const bottomPart = `
  return (
    <main className="min-h-screen text-white pb-20" style={{ background: "linear-gradient(180deg, #2e0538 0%, #150726 50%, #070510 100%)" }}>
      <header className="sticky top-0 z-40 bg-black/95 border-b-2 border-fuchsia-400 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a href="/" className="px-3.5 py-2 bg-amber-400 text-black font-black text-xs uppercase">← Mall Lobby</a>
            <h1 className="text-lg md:text-2xl font-black text-white">🎈 Party Lapooza 250-Item Superstore (Ages 1-21 • Candy • Helium • Custom Cutouts)</h1>
          </div>
          <button onClick={() => setCartOpen(true)} className="px-4 py-2 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer">🛒 Cart ({cart.length})</button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 pt-4 pb-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-black/85 border-2 border-amber-400 p-4 space-y-2 text-xs">
          <span className="bg-amber-400 text-black font-black text-[10px] px-2 py-0.5 uppercase">📸 1. Upload Photo → 2. Preview on Banner & Cutouts → 3. Share!</span>
          <input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) setPhotoUrl(URL.createObjectURL(f)); }} className="w-full text-zinc-300" />
          <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-fuchsia-400 text-white font-bold" />
          <div className="flex gap-2">
            <input type="text" value={narration} onChange={e => setNarration(e.target.value)} className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 text-white" />
            <button onClick={() => { if ("speechSynthesis" in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(guestName + " " + narration)); }} className="px-3 py-2 bg-emerald-400 text-black font-black uppercase cursor-pointer">🔊 Play Voice</button>
          </div>
        </div>
        <div className="bg-fuchsia-950/60 border-2 border-dashed border-amber-400 p-4 flex flex-col items-center justify-center text-center">
          <img src={photoUrl} alt="Preview" className="w-24 h-24 rounded-full border-4 border-amber-400 object-cover mb-2" />
          <div className="px-4 py-1 bg-amber-400 text-black font-black text-xs uppercase">{guestName}</div>
          <button onClick={() => { navigator.clipboard?.writeText(window.location.href); alert("Copied Party Preview Link!"); }} className="mt-2 px-4 py-1.5 bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer">📲 Share Preview</button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-3 space-y-2">
        <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search individual party items (helium, candy, pinata, quinceanera, bounce house)..." className="w-full px-4 py-2 bg-black border-2 border-fuchsia-400 text-xs text-white font-bold" />
        <div className="flex flex-wrap gap-1.5">
          {AISLES.map(a => (
            <button key={a.id} onClick={() => setDept(a.id)} className={dept === a.id ? "px-3 py-1.5 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer" : "px-3 py-1.5 text-xs font-black uppercase bg-zinc-900 text-white cursor-pointer"}>{a.label}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setBudget("all")} className="px-3 py-1 text-xs font-black uppercase bg-white text-black cursor-pointer">All Prices ({shown.length})</button>
          <button onClick={() => setBudget("low")} className="px-3 py-1 text-xs font-black uppercase bg-emerald-400 text-black cursor-pointer">💲 Starter ($19–$39)</button>
          <button onClick={() => setBudget("mid")} className="px-3 py-1 text-xs font-black uppercase bg-amber-400 text-black cursor-pointer">💲💲 10-Guest Bundles & Helium ($40–$85)</button>
          <button onClick={() => setBudget("high")} className="px-3 py-1 text-xs font-black uppercase bg-fuchsia-400 text-black cursor-pointer">💲💲💲 VIP Suites & Bounce Houses ($85+)</button>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
        {shown.map((item: any, idx: number) => (
          <div key={idx} className="bg-zinc-950 border-0 rounded-none m-0 p-0 overflow-hidden flex flex-col justify-between">
            <div onClick={() => setSelected(item)} className="relative aspect-square w-full bg-transparent cursor-pointer overflow-hidden">
              <img src={item.media[0]} alt={item.name} className="w-full h-full object-cover p-0 m-0 block" />
              <span className="absolute top-1.5 left-1.5 bg-black/85 text-amber-300 text-[10px] font-black px-2 py-0.5">{item.isCuratedBundle ? "🎁 1-BOX BUNDLE" : "📸 3 Photos"}</span>
              <div className={item.count <= 5 ? "absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-black bg-red-700/95 text-white flex justify-between" : "absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-black bg-black/85 text-emerald-400 flex justify-between"}>
                <span>{item.count <= 5 ? "🔥 ONLY " + item.count + " LEFT!" : "✅ " + item.count + " IN STOCK"}</span>
                <span>🔄 Auto-Shift</span>
              </div>
            </div>
            <div className="p-2.5 bg-zinc-950">
              <h3 onClick={() => setSelected(item)} className="text-xs font-bold text-white line-clamp-2 cursor-pointer">{item.name}</h3>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-lg font-black text-amber-400">{item.price}</span>
                <span className="text-[11px] line-through text-zinc-500">{item.competitorPrice}</span>
              </div>
              <div className="flex gap-1 mt-2">
                <button onClick={() => { setCart([...cart, item]); setCartOpen(true); }} className="flex-1 py-2 bg-amber-400 text-black font-black text-[10px] uppercase cursor-pointer">🛒 Add</button>
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

fs.appendFileSync("app/stores/party-lapooza/page.tsx", bottomPart, "utf8");
console.log("✅ STEP 3 COMPLETE: Full Party Lapooza UI Assembled!");
