"use client";
import { useState, use } from "react";
import Link from "next/link";
import { masterInventory } from "../../inventory";

export default function StorefrontPage({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = use(params);
  const items = masterInventory[storeId] || [];
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [showSpecs, setShowSpecs] = useState(false);
  const [packLabel, setPackLabel] = useState("Standard / Individual");
  const [overridePrice, setOverridePrice] = useState<string | null>(null);
  const [aiNote, setAiNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [carZip, setCarZip] = useState("77301");
  const isCar = storeId === "us-trend-car-detailing-pro";

  const fmt = (s: string) => String(s || "").replace(/-/g, " ").toUpperCase();
  const isParty = String(storeId).startsWith("lapooza-");
  const isSport = String(storeId).startsWith("sportflex-") || String(storeId).startsWith("sportlick-");

  const handleCheckout = async () => {
    if (!selectedItem) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeId,
          name: `${selectedItem.name} [${packLabel}${aiNote ? " • Custom: " + aiNote : ""}]`,
          price: overridePrice || selectedItem.price,
          image: selectedItem.media?.[0] || ""
        })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {}
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-3 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-mono text-yellow-400 uppercase font-bold">🏪 VERIFIED ALBS NEXUS STOREFRONT</span>
            <h1 className="text-2xl md:text-4xl font-black uppercase text-white">{fmt(storeId)}</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/nostalgia/albs-mall-gift-cards" className="bg-amber-400 text-black font-black text-xs uppercase px-4 py-2.5 rounded-xl">🎁 Gift Cards ($25–$1,000)</Link>
            <Link href="/nostalgia/concierge" className="bg-pink-600 text-white font-black text-xs uppercase px-4 py-2.5 rounded-xl">🎩 3–4 Hr Concierge (24-Hr Hold)</Link>
            <Link href="/" className="bg-white text-black font-black text-xs uppercase px-4 py-2.5 rounded-xl">← All 6 Malls</Link>
          </div>
        </div>

        {isCar && (
          <div className="bg-gradient-to-r from-red-950 via-zinc-900 to-amber-950 border-2 border-amber-400 rounded-2xl p-4 space-y-3 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <div className="text-left">
                <span className="bg-amber-400 text-black font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full">🏎️ FREE AFICIONADO UPGRADE • 12-MILE CAR SHOW &amp; MEET RADAR</span>
                <h2 className="text-lg md:text-2xl font-black uppercase text-white mt-1">Scan Local Car Shows, Cars &amp; Coffee, Cruise-Ins &amp; DIY Wash Bays</h2>
              </div>
              <input value={carZip} onChange={(e) => setCarZip(e.target.value)} maxLength={5} placeholder="ZIP (e.g. 77301)" className="w-full md:w-36 bg-black border-2 border-amber-400 rounded-xl px-3 py-2 text-center font-black text-white outline-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              <a href={"https://www.google.com/maps/search/Car+Show+Cars+and+Coffee+Auto+Meet+near+" + carZip} target="_blank" className="bg-amber-400 hover:bg-amber-300 text-black font-black text-[11px] uppercase py-2.5 px-3 rounded-xl text-center block">🏁 12-Mi Car Shows &amp; Meets ({carZip}) →</a>
              <a href={"https://www.google.com/maps/search/Cars+and+Coffee+Cruise+In+Car+Club+near+" + carZip} target="_blank" className="bg-red-600 hover:bg-red-500 text-white font-black text-[11px] uppercase py-2.5 px-3 rounded-xl text-center block">☕ 12-Mi Cars &amp; Coffee / Clubs →</a>
              <a href={"https://www.google.com/maps/search/Self+Serve+Car+Wash+Bay+Detailing+near+" + carZip} target="_blank" className="bg-cyan-400 hover:bg-cyan-300 text-black font-black text-[11px] uppercase py-2.5 px-3 rounded-xl text-center block">💦 12-Mi DIY Spray Wash Bays →</a>
              <a href={"https://www.google.com/maps/search/Speedway+Drag+Strip+Custom+Auto+Shop+near+" + carZip} target="_blank" className="bg-zinc-800 hover:bg-zinc-700 border border-amber-400 text-amber-300 font-black text-[11px] uppercase py-2.5 px-3 rounded-xl text-center block">🔧 12-Mi Tracks &amp; Speed Shops →</a>
            </div>
          </div>
        )}

        {isParty && (
          <div className="bg-gradient-to-r from-fuchsia-900 via-purple-900 to-pink-900 border-2 border-yellow-400 rounded-2xl p-4 text-center">
            <div className="text-lg md:text-2xl font-black uppercase text-white">&ldquo;Where Fun, Adventure &amp; Imagination Come to Life — <span className="text-yellow-400">Put Yourself in the Middle of the Magic!</span>&rdquo;</div>
            <div className="text-xs text-fuchsia-200 mt-1">Buy 88–170 Pc Room Bulk Boxes OR Individual Decor • Free AI Party Man Face-Swap • Home Helium &amp; Archways</div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item: any, idx: number) => (
            <div key={item.id || idx} onClick={() => { setSelectedItem(item); setActiveImgIdx(0); setOverridePrice(null); setPackLabel("Standard"); }} className="bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-700 hover:border-yellow-400 rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="relative h-52 bg-black">
                  <img src={item.media?.[0]} alt={item.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-black/80 text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-emerald-500/40">🟢 LIVE • 4 PHOTOS + VIDEO</span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="font-black text-sm uppercase text-white line-clamp-2">{item.name}</div>
                  <div className="text-2xl font-black text-yellow-400">{item.price}</div>
                  <div className="text-[11px] text-zinc-400">{item.specs?.shipping}</div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase py-2.5 rounded-xl">View Options, Bulk / Tiers &amp; Buy →</button>
              </div>
            </div>
          ))}
        </div>

        {selectedItem && (
          <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-zinc-950 border-2 border-yellow-400 rounded-3xl max-w-2xl w-full p-6 space-y-4 my-8">
              <div className="flex justify-between items-start gap-4">
                <h2 className="text-lg md:text-xl font-black uppercase text-white">{selectedItem.name}</h2>
                <button onClick={() => setSelectedItem(null)} className="bg-red-600 text-white font-black text-xs px-3 py-1.5 rounded-lg">✕ CLOSE</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <img src={selectedItem.media?.[activeImgIdx] || selectedItem.media?.[0]} alt="" className="w-full h-56 object-cover rounded-xl border border-zinc-700" />
                  <div className="grid grid-cols-4 gap-2">
                    {(selectedItem.media || []).slice(0, 4).map((m: string, i: number) => (
                      <img key={i} src={m} alt="" onClick={() => setActiveImgIdx(i)} className={`h-12 w-full object-cover rounded-lg cursor-pointer border-2 ${activeImgIdx === i ? "border-yellow-400" : "border-zinc-700"}`} />
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <div className="text-3xl font-black text-yellow-400">{overridePrice || selectedItem.price}</div>
                  <div className="text-xs text-emerald-400 font-bold">{selectedItem.specs?.condition}</div>
                  <div className="text-[11px] text-zinc-300">{selectedItem.specs?.shipping}</div>
                  <button type="button" onClick={() => setShowSpecs(!showSpecs)} className="w-full bg-zinc-900 border border-cyan-500/50 text-cyan-300 text-[11px] font-black uppercase py-2 px-3 rounded-lg">
                    📋 {showSpecs ? "Hide" : "View"} Full Specs &amp; Insured Shipper Certificate
                  </button>
                  {showSpecs && (
                    <div className="bg-black border border-cyan-500/40 rounded-lg p-2.5 text-[11px] text-zinc-300 space-y-1">
                      <div>• <b>SKU:</b> {selectedItem.id}</div>
                      <div>• <b>Guarantee:</b> {selectedItem.specs?.market_value}</div>
                    </div>
                  )}
                </div>
              </div>

              {isParty && (
                <div className="bg-fuchsia-950/80 border border-fuchsia-400 rounded-xl p-3 space-y-2">
                  <div className="text-[11px] font-black uppercase text-yellow-300">🎉 CHOOSE 88–170 PC BULK BOX, INDIVIDUAL DECOR, OR HELIUM/ARCHWAY:</div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
                    {[
                      ["🎉 10-Guest Box (88 Pcs)", "$44.99"], ["🎈 15-Guest Box (128 Pcs)", "$62.99"], ["👑 20-Guest Box (170 Pcs)", "$78.99"],
                      ["🍽️ Individual Plates/Cups", "$9.99"], ["🖼️ 5x3ft Wall Poster", "$19.99"], ["🏮 Hanging Lanterns", "$14.99"],
                      ["🎈 150-Pc Balloon Archway", "$24.99"], ["🫧 30-Balloon Helium Tank", "$44.99"], ["🚀 50-Balloon Helium Tank", "$59.99"]
                    ].map(([lbl, pr]) => (
                      <button key={lbl} type="button" onClick={() => { setPackLabel(lbl); setOverridePrice(pr); }} className={`p-1.5 rounded-lg text-[10px] font-black uppercase border ${overridePrice === pr && packLabel === lbl ? "bg-yellow-400 text-black border-white" : "bg-black text-white border-fuchsia-500/40"}`}>{lbl} • {pr}</button>
                    ))}
                  </div>
                </div>
              )}

              {isSport && (
                <div className="bg-lime-950/80 border border-lime-400 rounded-xl p-3 space-y-2">
                  <div className="text-[11px] font-black uppercase text-lime-300">🏅 CHOOSE QUALITY TIER (STARTER / MID / LUXURY) OR FAN JERSEY / HAT / BUNDLE:</div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
                    {[
                      ["🥉 Starter / Youth Tier", "$29.99"], ["🥈 All-Season Mid-Tier", selectedItem.price], ["🥇 Pro Luxury Reserve", "$129.99"],
                      ["👕 Player Shirsey Tee", "$27.99"], ["🎽 Replica Game Jersey", "$69.99"], ["🧢 Fitted / Snapback Hat", "$29.99"],
                      ["🧦 Socks+Thermos+Finger", "$39.99"], ["🔥 Full Fan Head-to-Toe", "$149.99"], ["🏆 12-Pack Team/Trophy Bulk", "$199.99"]
                    ].map(([lbl, pr]) => (
                      <button key={lbl} type="button" onClick={() => { setPackLabel(lbl); setOverridePrice(pr); }} className={`p-1.5 rounded-lg text-[10px] font-black uppercase border ${overridePrice === pr && packLabel === lbl ? "bg-lime-400 text-black border-white" : "bg-black text-white border-lime-500/40"}`}>{lbl} • {pr}</button>
                    ))}
                  </div>
                </div>
              )}

              <input value={aiNote} onChange={(e) => setAiNote(e.target.value)} placeholder="✨ Custom Name, Player #, Size, Bat/Glove/Hat Size, Trophy Text, or AI Face-Swap Note..." className="w-full bg-black border border-yellow-400 rounded-xl px-3 py-2.5 text-xs text-white outline-none" />

              <button onClick={handleCheckout} disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm uppercase py-4 rounded-2xl shadow-lg">
                {loading ? "Connecting to Stripe..." : `🔒 SECURE CHECKOUT (${overridePrice || selectedItem.price}) →`}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
