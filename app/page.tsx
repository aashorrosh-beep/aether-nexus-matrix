"use client";
import { useState } from "react";
import Link from "next/link";
import { masterInventory } from "./inventory";

const keys = Object.keys(masterInventory || {});
const pick = (p: string) => keys.filter(k => k.startsWith(p));
const fmt = (s: string) => String(s || "").replace(/-/g, " ").toUpperCase();

const MALLS = [
  { id: "wellness", title: "1. The Wellness & Family Sanctuary", badge: "MALL #1 • 12-MILE RADARS & SANCTUARY", color: "border-emerald-400", btn: "bg-emerald-400 text-black", rooms: ["spectrum-sensory-superstore","down-syndrome-superstore","md-mobility-superstore","deaf-blind-superstore","ptsd-calm-superstore","new-life-expecting-superstore","albs-mall-gift-cards","cellular-immune-botanicals","holistic-longevity-lab","peptide-research-vault","adaptogen-apothecary","cellular-hydration-mineral","gut-botanical-library","gnc-sports-nutrition","diet-meal-delivery","organic-health-pantry","the-scrub-lounge","senior-mobility-independence","back-pain-spine-relief","athletic-attire-footwear","home-fitness-recovery"] },
  { id: "lapooza", title: "2. Party Lapooza • Where Fun, Adventure & Imagination Come to Life!", badge: "MALL #2 • PUT YOURSELF IN THE MIDDLE OF THE MAGIC", color: "border-fuchsia-400", btn: "bg-fuchsia-400 text-black", rooms: pick("lapooza-") },
  { id: "nostalgia", title: "3. Nostalgia & Q4 Holiday Mall", badge: "MALL #3 • CHRISTMAS STORY, SQUISHIES & RETRO", color: "border-pink-500", btn: "bg-pink-500 text-white", rooms: ["the-christmas-story","holiday-confectionery-bakery","seasonal-gift-baskets","ugly-sweater-party","friendsgiving-vault","holiday-gag-gifts","super-squishies-hub","blind-box-vault","the-lost-edge","neo-squish","retro-mystery-vault","pixel-sugar-rush","retro-candy-soda","retro-squish-blind-boxes","custom-engraving-keepsakes","custom-hats-apparel-kicks","custom-offset-printing","decade-60s-70s","decade-80s-90s","decade-y2k","vintage-sports-jerseys","action-figures-90s","retro-toy-chest","8-bit-consoles","vintage-arcade"] },
  { id: "sportflex", title: "4. SportFlex • Fan Cave, Custom Jerseys, Coaches & Outdoors", badge: "MALL #4 • STARTER, MID-TIER & PRO LUXURY", color: "border-lime-400", btn: "bg-lime-400 text-black", rooms: [...pick("sportflex-"), ...pick("sportlick-"), "us-trend-car-detailing-pro"] },
  { id: "trending", title: "5. Trendalopolis • Trending America Top 50", badge: "MALL #5 • 50 VIRAL U.S. STOREFRONTS", color: "border-amber-400", btn: "bg-amber-400 text-black", rooms: pick("us-trend-") },
  { id: "matrix", title: "6. The Matrix • Future Tech, AI & Tactical", badge: "MALL #6 • AI, DRONES & CYBERNETICS", color: "border-cyan-400", btn: "bg-cyan-400 text-black", rooms: ["oracle-ai-core","ai-matrix-uplink","android-customs","bionic-prosthetics","cyberware-depot","quantum-processing","smart-home-core","synthwave-audio","synth-food-replicators","neural-network-cafe","neon-biolab","survival-edc","vr-immersion-bay","zero-g-gear","anti-grav-vehicles","off-grid-comms","plasma-optics","stealth-tech","drone-syndicate","emp-shielding","premium-pet-supply","home-barista-bar","holiday-illumination","lofi-study-room"] }
];

export default function HomePage() {
  const [zip, setZip] = useState("77301");
  const [q, setQ] = useState("");
  const [mallId, setMallId] = useState<string | null>(null);
  const hits = q.trim().length > 1 ? keys.filter(k => k.includes(q.toLowerCase()) || (masterInventory[k] || []).some((x: any) => String(x.name || "").toLowerCase().includes(q.toLowerCase()))).slice(0, 18) : [];
  const cur = MALLS.find(m => m.id === mallId);

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-emerald-950 border border-emerald-400 rounded-xl p-2.5 text-center text-xs font-bold text-emerald-200">
          💚 THE ALBS 3% LEGACY IMPACT CHARTER: 1% Texas Children&apos;s Hospital • 1% Autism &amp; Family Fund • 1% Military Veterans
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-4xl md:text-6xl font-black uppercase"><span className="text-pink-500">ALBS</span> <span className="text-yellow-400">NEXUS</span></h1>
          <p className="text-xs font-mono uppercase text-zinc-300">6 Malls • {keys.length} Verified Storefronts • Expedited 3–7 Day Insured Shipping</p>
        </div>

        <div className="bg-zinc-900 border-2 border-emerald-400 rounded-3xl p-4 space-y-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-sm md:text-lg font-black uppercase text-white">📍 4 OFFICIAL 12-MILE SANCTUARY ZIP RADARS (ENTER 5-DIGIT ZIP):</div>
            <input value={zip} onChange={e => setZip(e.target.value)} maxLength={5} className="w-40 bg-black border-2 border-yellow-400 rounded-xl px-3 py-2 text-center font-black text-lg text-white" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
            <div className="bg-blue-950 border-2 border-blue-400 rounded-xl p-3 space-y-2">
              <div className="text-xs font-black text-amber-300">🧩 1. AUTISM (BLUE/GOLD)</div>
              <a href={"/spectrum-knowledge-vault.html?zip=" + zip} className="bg-amber-400 text-black font-black text-xs py-2 rounded-lg block text-center">🔍 12-Mi Autism ({zip}) →</a>
              <Link href="/nostalgia/spectrum-sensory-superstore" className="bg-blue-600 text-white font-black text-xs py-2 rounded-lg block text-center">🏪 Autism Store →</Link>
            </div>
            <div className="bg-yellow-950 border-2 border-yellow-400 rounded-xl p-3 space-y-2">
              <div className="text-xs font-black text-yellow-300">🌻 2. DOWN SYNDROME</div>
              <a href={"https://www.google.com/maps/search/Down+Syndrome+Support+Clinic+near+" + zip} target="_blank" className="bg-yellow-400 text-black font-black text-xs py-2 rounded-lg block text-center">🔍 12-Mi Down Syndrome →</a>
              <Link href="/nostalgia/md-mobility-superstore" className="bg-blue-700 text-yellow-300 font-black text-xs py-2 rounded-lg block text-center">🏪 Down Syndrome/MD Store →</Link>
            </div>
            <div className="bg-cyan-950 border-2 border-white rounded-xl p-3 space-y-2">
              <div className="text-xs font-black text-cyan-300">🤟 3. BLIND &amp; DEAF</div>
              <a href={"https://www.google.com/maps/search/Blind+Deaf+Accessible+Services+near+" + zip} target="_blank" className="bg-cyan-400 text-black font-black text-xs py-2 rounded-lg block text-center">🔍 12-Mi Blind &amp; Deaf →</a>
              <Link href="/nostalgia/deaf-blind-superstore" className="bg-white text-black font-black text-xs py-2 rounded-lg block text-center">🏪 Blind &amp; Deaf Store →</Link>
            </div>
            <div className="bg-teal-950 border-2 border-teal-400 rounded-xl p-3 space-y-2">
              <div className="text-xs font-black text-teal-300">🎖️ 4. PTSD RECOVERY</div>
              <a href={"https://www.google.com/maps/search/PTSD+Veteran+Support+near+" + zip} target="_blank" className="bg-teal-400 text-black font-black text-xs py-2 rounded-lg block text-center">🔍 12-Mi PTSD Radar →</a>
              <Link href="/nostalgia/ptsd-calm-superstore" className="bg-teal-700 text-white font-black text-xs py-2 rounded-lg block text-center">🏪 PTSD Calm Store →</Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
            <Link href="/nostalgia/new-life-expecting-superstore" className="bg-pink-500 text-black font-black text-xs uppercase py-2.5 rounded-xl text-center">👶 When You&apos;re Expecting Superstore →</Link>
            <a href="/sanctuary-command-vault.html" className="bg-red-600 text-white font-black text-xs uppercase py-2.5 rounded-xl text-center">🚑 Free CPR &amp; Choking Cert Board →</a>
            <Link href="/nostalgia/albs-mall-gift-cards" className="bg-amber-400 text-black font-black text-xs uppercase py-2.5 rounded-xl text-center">🎁 Universal 6-Mall Gift Cards ($25–$1,000) →</Link>
          </div>
        </div>

        <div className="bg-zinc-900 border-2 border-yellow-400 rounded-3xl p-4 space-y-3">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search all 6 Malls (e.g. shrek, jersey, bat, trophy, helium, car wash, autism, ugly sweater)..." className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white" />
          {hits.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {hits.map(slug => (
                <Link key={slug} href={"/nostalgia/" + slug} className="bg-black border border-yellow-400 p-2.5 rounded-xl text-xs font-bold flex justify-between">
                  <span>🏪 {fmt(slug)}</span><span className="text-yellow-400">Open →</span>
                </Link>
              ))}
            </div>
          )}
          <div className="flex flex-wrap justify-between items-center gap-2 bg-amber-500/10 border border-amber-400/50 rounded-xl p-2.5">
            <span className="text-xs text-zinc-200">🎩 <b>Don&apos;t see it?</b> Our AI Concierge finds it cheaper &amp; emails you in <b>3–4 Hours</b> (<b>24-Hour Hold</b>)!</span>
            <Link href="/nostalgia/concierge" className="bg-amber-400 text-black font-black text-xs uppercase px-4 py-2 rounded-lg">🎩 3–4 Hr Concierge (24-Hr Hold) →</Link>
          </div>
        </div>

        {cur ? (
          <div className={`bg-zinc-900 border-2 ${cur.color} rounded-3xl p-5 space-y-4`}>
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h2 className="text-2xl font-black uppercase">{cur.title}</h2>
              <button onClick={() => setMallId(null)} className="bg-white text-black font-black text-xs uppercase px-4 py-2.5 rounded-xl">← Back to All 6 Malls</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {cur.rooms.map(r => (
                <Link key={r} href={"/nostalgia/" + r} className="bg-black hover:bg-zinc-800 border border-zinc-700 hover:border-yellow-400 p-4 rounded-2xl flex justify-between items-center">
                  <span className="font-black text-xs uppercase">🏪 {fmt(r)}</span>
                  <span className="text-xs text-emerald-400 font-bold">{(masterInventory[r] || []).length || 25} Items →</span>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MALLS.map(m => (
              <div key={m.id} className={`bg-zinc-900 border-2 ${m.color} rounded-3xl p-5 flex flex-col justify-between space-y-4`}>
                <div>
                  <span className="text-[11px] font-mono text-yellow-400 font-bold">{m.badge}</span>
                  <h2 className="text-xl md:text-2xl font-black uppercase mt-1">{m.title}</h2>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setMallId(m.id)} className={`w-full ${m.btn} font-black text-xs uppercase py-3.5 rounded-xl`}>Enter {m.title} ({m.rooms.length} Stores) →</button>
                  <Link href="/nostalgia/concierge" className="w-full bg-zinc-800 text-amber-300 font-black text-[11px] uppercase py-2 rounded-xl text-center">🎩 Can&apos;t Find It? 3–4 Hr Concierge (24-Hr Hold) →</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
