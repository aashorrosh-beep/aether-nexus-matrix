"use client";
import { useState } from "react";
import Link from "next/link";
import { masterInventory } from "./inventory";
const netrixFolders = new Set(["ai-matrix-uplink","android-customs","anti-grav-vehicles","bionic-prosthetics","crypto-cold-storage","cyber-deck-garage","cyber-flora-nursery","cyber-pets","cyber-weapons","cyberware-depot","data-broker","drone-racing","drone-syndicate","emp-shielding","exo-suit-garage","glitch-apparel","hologram-arcades","holographic-displays","hover-tech-hub","memory-crystals","memory-wipe","metaverse-assets","nanobot-pharmacy","neo-squish-pods","neon-biolab","neon-signs","neural-network-cafe","nexus-core","off-grid-comms","orbital-real-estate","plasma-optics","quantum-processing","smart-home-core","stealth-tech","synth-food-replicators","synth-organs","synthetic-skin","synthwave-audio","techwear-tailor","vr-immersion-bay","zero-g-gear"]);
const isLive = (id: string) => Boolean((masterInventory && masterInventory[id] && masterInventory[id].length > 0) || netrixFolders.has(id));
const fmt = (s: string) => s.replace(/-/g, " ").toUpperCase();
const matrixCogs = [
  { id: "m1", name: "⚙️ 1. Cybernetics, AI & Neural Rigs", desc: "Workstations, Robotics, Smart Glasses & Audio", rooms: ["oracle-ai-core","ai-matrix-uplink","android-customs","bionic-prosthetics","cyberware-depot","quantum-processing","smart-home-core","synthwave-audio","synth-food-replicators","neural-network-cafe","neon-biolab","nexus-core","cyber-deck-garage","data-broker","memory-crystals","memory-wipe"] },
  { id: "m2", name: "⚙️ 2. Off-World Survival & Tactical", desc: "EDC Gear, Thermal Optics, Drones, Exo-Suits & VR", rooms: ["survival-edc","vr-immersion-bay","zero-g-gear","anti-grav-vehicles","off-grid-comms","plasma-optics","stealth-tech","mars-colony-route","dyson-sphere-initiative","drone-syndicate","drone-racing","emp-shielding","exo-suit-garage","hover-tech-hub","orbital-real-estate","cyber-weapons"] },
  { id: "m3", name: "⚙️ 3. Modern Lifestyle, Neo-Squish & Holo-Tech", desc: "Neo-Squish Pods, Luxury Pets, Espresso, Holo-Displays & Techwear", rooms: ["neo-squish-pods","premium-pet-supply","home-barista-bar","holiday-illumination","lofi-study-room","hologram-arcades","holographic-displays","glitch-apparel","techwear-tailor","cyber-pets","cyber-flora-nursery","nanobot-pharmacy","synth-organs","synthetic-skin","crypto-cold-storage","metaverse-assets","neon-signs"] },
  { id: "m4", name: "🇺🇸 4. America’s Trending Mall: Tech, Creator & Smart Home (Stores 1–10)", desc: "Qi2 Power Banks, Smart Rings, 4K Projectors, Dash Cams, Creamy Keyboards, ANC & Handhelds", rooms: ["us-trend-mag-power-banks","us-trend-smart-rings","us-trend-mini-projectors","us-trend-dash-cams","us-trend-mechanical-keyboards","us-trend-earbuds-anc","us-trend-portable-monitors","us-trend-handheld-gaming","us-trend-smart-locks-security","us-trend-podcast-creator-rigs"] },
  { id: "m5", name: "🇺🇸 5. America’s Trending Mall: Home, Kitchen & Coffee (Stores 11–20)", desc: "40oz Tumblers, Dual Air Fryers, LiDAR Robot Vacs, Nugget Ice, Pizza Ovens, RO Water & Ergo Desks", rooms: ["us-trend-insulated-drinkware","us-trend-air-fryer-ovens","us-trend-robot-vacuums","us-trend-iced-coffee-makers","us-trend-pizza-ovens-grills","us-trend-water-filtrations","us-trend-smart-planters-hydro","us-trend-clean-laundry-home","us-trend-ergo-mesh-seating","us-trend-matcha-desk-cozy"] },
  { id: "m6", name: "🇺🇸 6. America’s Trending Mall: Sports, Outdoor & Maker Pro (Stores 31–40)", desc: "T700 Pickleball, Golf Monitors, Marathon Vests, Solar Generators, E-Bikes, 3D Printers & Lasers", rooms: ["us-trend-pickleball-pro","us-trend-golf-launch-monitors","us-trend-running-hydration","us-trend-portable-power","us-trend-ebikes-scooters","us-trend-outdoor-blackstone","us-trend-car-detailing-pro","us-trend-3d-printers","us-trend-laser-engravers","us-trend-modular-edc-tools"] }
];
const nostCogs = [
  { id: "n1", name: "⚙️ 1. Q4 Holiday, Christmas Story & Bakery", desc: "180-Item Christmas Story, Brownies, Fudge & Baskets", rooms: ["the-christmas-story","holiday-confectionery-bakery","seasonal-gift-baskets","ugly-sweater-party","friendsgiving-vault","holiday-gag-gifts"] },
  { id: "n2", name: "⚙️ 2. 150-Item Squishies & Blind Box Vaults", desc: "Rare Squishmallows, Pop Mart, Plushies & Novelty", rooms: ["super-squishies-hub","blind-box-vault","the-lost-edge","neo-squish","retro-mystery-vault","pixel-sugar-rush","retro-candy-soda","retro-squish-blind-boxes"] },
  { id: "n3", name: "⚙️ 3. 60s, 70s, 80s, 90s & Y2K Vaults", desc: "Era Relics, Vintage Streetwear, Jerseys & Skate", rooms: ["decade-60s-70s","decade-80s-90s","decade-y2k","threads-and-tracks","grunge-90s-flannel","grunge-apparel","y2k-pop-merch","vintage-sports-jerseys","neon-roller-rink","90s-skate-deck-vault","vintage-apparel-vault"] },
  { id: "n4", name: "⚙️ 4. Retro Gaming, Arcade, VHS & Toys", desc: "Action Figures, 8-Bit, Pogs, Tamagotchi & Vinyl", rooms: ["action-figures-90s","retro-toy-chest","8-bit-consoles","vintage-arcade","retro-arcade-systems","classic-consoles","saturday-morning-cartoons","retro-board-games","vintage-comic-stash","vhs-cult-archive","vintage-vinyl-records","polaroid-instant-film","classic-walkman-audio","pogs-and-slammers","digital-pets","pop-culture-relics"] },
  { id: "n5", name: "✨ 5. Custom Engraver, Hat/Shoe Studio & Offset Press", desc: "Silver Keepsake Engraving, 3D Puff Hats, Custom Kicks & Commercial Offset Print", rooms: ["custom-engraving-keepsakes","custom-hats-apparel-kicks","custom-offset-printing"] },
  { id: "n6", name: "🇺🇸 6. America’s Trending Mall: Beauty, Recovery & Bio-Health (Stores 21–30)", desc: "Red-Light Masks, K-Beauty Glass Skin, Vanilla Oud, Walking Pads, Cold Plunge, PEMF & Matcha", rooms: ["us-trend-led-skincare","us-trend-kbeauty-glass-skin","us-trend-perfume-atomizers","us-trend-walking-pads","us-trend-cold-plunge-recovery","us-trend-sleep-cooling-tech","us-trend-redlight-fullbody","us-trend-mushroom-nootropics","us-trend-matcha-ceremonial","us-trend-pilates-home-studio"] },
  { id: "n7", name: "🇺🇸 7. America’s Trending Mall: Travel, Family, Pets & Games (Stores 41–50)", desc: "Smart Luggage, Vacuum Backpacks, Y2K Cams, Heated Vests, AI Bird Feeders, Litter Bots & Mahjong", rooms: ["us-trend-smart-luggage","us-trend-travel-compression","us-trend-digital-cameras","us-trend-heated-apparel","us-trend-smart-bird-feeders","us-trend-baby-monitors-gear","us-trend-cat-litter-robots","us-trend-freeze-dried-candy","us-trend-mahjong-boardgames","us-trend-matchbox-diecast"] }
];
const wellCogs = [
  { id: "w1", side: "left", name: "⚙️ 1. All-in-One Holistic, Botanicals & Peptides", desc: "Turkey Tail, Sulforaphane, Soursop, NAD+, Peptides, Shilajit & Books", rooms: ["cellular-immune-botanicals","holistic-longevity-lab","peptide-research-vault","adaptogen-apothecary","cellular-hydration-mineral","gut-botanical-library"] },
  { id: "w2", side: "left", name: "⚙️ 2. GNC-Style Pro Protein, Ostrich & Meal Boxes", desc: "Protein Shakes, Ostrich Sticks, Clean Pantry & Prepared Diet Plans", rooms: ["gnc-sports-nutrition","diet-meal-delivery","organic-health-pantry"] },
  { id: "w3", side: "right", name: "⚙️ 3. Scrub Lounge, Back Relief & Senior Mobility", desc: "Cute/Funny Scrubs, Walkers, Rollators, Toilet Seats & Spine Relief", rooms: ["the-scrub-lounge","senior-mobility-independence","back-pain-spine-relief"] },
  { id: "w4", side: "right", name: "⚙️ 4. Sportswear, Home Gym & $1 Retro Sweat Club", desc: "Workout Tights, Training Shoes, Dumbbells & Sweatin to the Oldies", rooms: ["athletic-attire-footwear","home-fitness-recovery","retro-sweat-rentals"] }
];
export default function MallOfMallsLobby() {
  fetch("/api/traffic",{method:"POST",body:JSON.stringify({page:"/"})}).catch(()=>{});
  const [activeCog, setActiveCog] = useState<any>(null);
  const [showCoach, setShowCoach] = useState(false);
  const [waiverSigned, setWaiverSigned] = useState(false);
  const [sigName, setSigName] = useState("");
  const [coachGoal, setCoachGoal] = useState("");
  const [coachPlan, setCoachPlan] = useState("");
  const all = Object.keys(masterInventory || {}).filter(r => isLive(r));
  return (
    <main className="min-h-screen bg-transparent text-white font-sans relative overflow-x-hidden">
      {/* TOP TRENDING TICKER BANNER */}
      <div className="bg-gradient-to-r from-red-900 via-zinc-900 to-cyan-900 border-b border-zinc-700 py-2 px-4 text-center text-xs font-mono uppercase tracking-widest">
        🔥 #1 TRENDING CATEGORY: <span className="text-yellow-400 font-black">Q4 Holiday & White Elephant Drop</span> • ⚡ TOP 5 NOW: Super Squishies | PSA 10 Consignment | Holiday Bakery | Pure Shilajit | Survival EDC
      </div>
      {/* 3% LEGACY IMPACT CHARTER BANNER (TEXAS CHILDREN S, AUTISM FUND & PHOENIX RISING VETERANS) */}
      <div className="bg-emerald-950/80 border-b border-emerald-600/50 py-2.5 px-4 text-center text-xs font-sans text-emerald-200">
        ❤️ <span className="font-black uppercase text-white">THE ALBS 3% LEGACY IMPACT CHARTER:</span> Every purchase across all storefronts automatically dedicates <span className="text-yellow-400 font-bold">1% to Texas Children s Hospital</span> • <span className="text-cyan-300 font-bold">1% to the ALBS Autism & Sensory Family Grant Fund</span> • <span className="text-red-400 font-bold">1% to Military Veterans (Phoenix Rising)</span>.
      </div>
      {/* MAIN 3-COLUMN ATRIUM: MATRIX (LEFT) | ELEVATED ALBS VIP HUB (CENTER) | NOSTALGIA (RIGHT) */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: THE MATRIX MALL */}
        <div className="lg:col-span-4 bg-zinc-950/90 border border-cyan-500/40 rounded-2xl p-6 space-y-5 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
          <span className="text-cyan-400 font-mono text-xs tracking-widest border border-cyan-500/30 px-3 py-1 rounded-full">MALL 1 • FUTURE TECH & AI</span>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-cyan-400">The Matrix</h2>
          <p className="text-xs text-zinc-400">Select a category cog below to open its storefront corridor:</p>
          <div className="space-y-3">
            {matrixCogs.map(c => (
              <button key={c.id} onClick={() => setActiveCog(c)} className="w-full text-left bg-zinc-900 hover:bg-cyan-950 border border-cyan-800/60 p-4 rounded-xl transition-all">
                <div className="font-black text-sm uppercase text-white">{c.name}</div>
                <div className="text-[11px] text-cyan-300/80 font-mono mt-1">{c.desc} • <span className="text-yellow-400 font-bold">{c.rooms.filter((r: string) => isLive(r)).length} LIVE STORES</span> →</div>
              </button>
            ))}
          </div>
        </div>
        {/* CENTER: ELEVATED ALBS NEXUS & VIP CONCIERGE / PERSONAL SHOPPER STACK */}
        <div className="lg:col-span-4 bg-black border-2 border-zinc-700 rounded-3xl p-6 text-center space-y-5 shadow-[0_0_50px_rgba(236,72,153,0.25)]">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter text-pink-500">ALBS</h1>
            <h2 className="text-4xl font-black uppercase tracking-widest text-yellow-400">NEXUS</h2>
            <p className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase mt-2">The Global Mall of Malls • U.S. PATENT PENDING (No. 64/134,528 & CIP) • {all.length + 2} Active Storefronts</p>
          </div>
          <div className="border-t border-b border-zinc-800 py-4 space-y-2.5 text-left">
            <div className="text-center text-xs font-mono text-yellow-400 uppercase tracking-widest mb-2">★ Center Atrium VIP Services ★</div>
            <Link href="/nostalgia/consignment-vault" className="block bg-zinc-900 hover:bg-yellow-950 border border-yellow-600/60 p-3 rounded-xl font-black text-xs uppercase text-yellow-400 flex justify-between"><span>🏆 PSA 10 & Grail Consignment Vault</span><span>ENTER →</span></Link>
            <Link href="/nostalgia/concierge" className="block bg-zinc-900 hover:bg-pink-950 border border-pink-600/60 p-3 rounded-xl font-black text-xs uppercase text-pink-400 flex justify-between"><span>🎩 Nostalgia & Lost Edge Concierge</span><span>SOURCING →</span></Link>
            <Link href="/netrix/concierge" className="block bg-zinc-900 hover:bg-cyan-950 border border-cyan-600/60 p-3 rounded-xl font-black text-xs uppercase text-cyan-400 flex justify-between"><span>⚡ Matrix Neural AI Concierge</span><span>UPLINK →</span></Link>
            <Link href="/nostalgia/concierge" className="block bg-gradient-to-r from-amber-600 to-yellow-500 text-black p-3 rounded-xl font-black text-xs uppercase text-center shadow-lg">🛍️ Hire VIP Personal Shopper (48-Hr Hold)</Link>
          </div>
        </div>
        {/* RIGHT: THE NOSTALGIA MALL */}
        <div className="lg:col-span-4 bg-zinc-950/90 border border-pink-500/40 rounded-2xl p-6 space-y-5 shadow-[0_0_30px_rgba(236,72,153,0.15)]">
          <span className="text-pink-400 font-mono text-xs tracking-widest border border-pink-500/30 px-3 py-1 rounded-full">MALL 2 • VINTAGE & HOLIDAY</span>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-pink-500">Nostalgia</h2>
          <p className="text-xs text-zinc-400">Select a category cog below to open its storefront corridor:</p>
          <div className="space-y-3">
            {nostCogs.map(c => (
              <button key={c.id} onClick={() => setActiveCog(c)} className="w-full text-left bg-zinc-900 hover:bg-pink-950 border border-pink-800/60 p-4 rounded-xl transition-all">
                <div className="font-black text-sm uppercase text-white">{c.name}</div>
                <div className="text-[11px] text-pink-300/80 font-mono mt-1">{c.desc} • <span className="text-yellow-400 font-bold">{c.rooms.filter((r: string) => isLive(r)).length} LIVE STORES</span> →</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* MALL 3: THE VITALITY, FITNESS & HOLISTIC WELLNESS WING */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <div className="bg-emerald-950/30 border-2 border-emerald-600/50 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-emerald-800/60 pb-4">
            <div>
              <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest">MALL 3 • BIO-OPTIMIZATION, PEPTIDES, CLEAN FOOD & FITNESS</span>
              <h2 className="text-3xl md:text-4xl font-black uppercase italic text-emerald-400">Vitality & Holistic Wellness Mall</h2>
            </div>
            <button onClick={() => setShowCoach(true)} className="bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase px-6 py-4 rounded-xl shadow-lg">
              🩺 Launch FREE AI Workout, Meal Plan & Biomarker Coach →
            </button>
            <form action="/spectrum-knowledge-vault.html" method="GET" className="flex flex-col sm:flex-row gap-2 pt-2"><input name="zip" defaultValue="77301" placeholder="Enter US ZIP Code (e.g. 77301 Conroe)" className="flex-1 bg-black border-2 border-emerald-400 text-white px-4 py-3 rounded-xl text-xs font-mono font-bold uppercase" /><button type="submit" className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase px-5 py-3 rounded-xl">🔍 Scan 12-Mile Autism Radar →</button></form><a href="/spectrum-knowledge-vault.html" className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase px-6 py-4 rounded-xl shadow-lg text-center">
              📚 Open Autism Hospital Research & Downloadable Info Vault →
            </a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* LEFT FLANK: HOLISTIC, BOTANICALS, PEPTIDES & PRO NUTRITION */}
            <div className="lg:col-span-3 flex flex-col justify-between gap-4">
              {wellCogs.filter((c: any) => c.side === "left").map((c: any) => (
                <button key={c.id} onClick={() => setActiveCog(c)} className="text-left bg-zinc-900/90 hover:bg-emerald-950 border border-emerald-700/50 p-5 rounded-2xl transition-all flex-1">
                  <div className="font-black text-sm uppercase text-white">{c.name}</div>
                  <div className="text-xs text-emerald-300/80 font-mono mt-1">{c.desc} →</div>
                </button>
              ))}
            </div>
            {/* CENTER HEART: SPECTRUM AUTISM SUPERSTORE & NEW LIFE EXPECTING BABY SANCTUARY */}
            <div className="lg:col-span-6 bg-gradient-to-b from-emerald-950 via-black to-cyan-950 border-2 border-yellow-400 rounded-3xl p-6 space-y-5 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
              <div className="text-center space-y-1 border-b border-emerald-800/60 pb-3">
                <span className="bg-yellow-400 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">❤️ THE HEART OF ALBS • 10%–20% BELOW SPECIALTY COMPETITORS ON HARD-TO-FIND ITEMS • 3% LEGACY IMPACT CHARTER</span>
                <h3 className="text-2xl md:text-3xl font-black uppercase text-white pt-1">Autism & New Life Family Sanctuary</h3>
                <p className="text-xs text-emerald-300 font-mono">1% Texas Children s Hospital • 1% Autism Family Fund • 1% Military Veterans</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/nostalgia/spectrum-sensory-superstore" className="bg-zinc-900/95 hover:bg-emerald-900 border-2 border-emerald-400 p-5 rounded-2xl flex flex-col justify-between space-y-3 shadow-lg group">
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-emerald-500 text-black font-black px-2 py-0.5 rounded">CENTERPIECE #1 • 140+ ITEMS</span>
                    <h4 className="text-xl font-black uppercase text-white mt-2">🧩 Spectrum Autism Superstore</h4>
                    <p className="text-xs text-zinc-300 mt-1">Top-50 Hard-to-Find Sensory Tools, 300lb Swings, Crash Pads, AAC Talkers, XXT Chewelry & Safety Beds.</p>
                  </div>
                  <div className="text-xs font-mono font-black text-emerald-400 group-hover:translate-x-1 transition-transform">ENTER AUTISM SUPERSTORE →</div>
                </Link>
                <Link href="/nostalgia/new-life-expecting-superstore" className="bg-zinc-900/95 hover:bg-cyan-900 border-2 border-cyan-400 p-5 rounded-2xl flex flex-col justify-between space-y-3 shadow-lg group">
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-cyan-400 text-black font-black px-2 py-0.5 rounded">CENTERPIECE #2 • EXPECTING & BABY</span>
                    <h4 className="text-xl font-black uppercase text-white mt-2">👶 What to Expect: New Life Hub</h4>
                    <p className="text-xs text-zinc-300 mt-1">Newborn Coming-Home Outfits, Smart Nursery, Safe Sleep, Expecting Books & Free Infant CPR Training.</p>
                  </div>
                  <div className="text-xs font-mono font-black text-cyan-300 group-hover:translate-x-1 transition-transform">ENTER NEW LIFE SANCTUARY →</div>
                </Link>
              </div>
              <a href="/spectrum-knowledge-vault.html" className="block w-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 text-black font-black text-xs md:text-sm uppercase py-4 px-4 rounded-xl text-center shadow-xl">
                📡 Open 12-Mile Autism Event Radar & Hospital Research Vault →</a><a href="/new-life-expecting-vault.html" className="block w-full bg-cyan-400 hover:bg-cyan-300 text-black font-black text-xs md:text-sm uppercase py-3.5 px-4 rounded-xl text-center shadow-xl mt-2">👶 Open What to Expect: Pregnancy, Newborn & Free Infant CPR Guide →
              </a>
            </div>
            {/* RIGHT FLANK: SCRUB LOUNGE, SENIOR MOBILITY, BACK RELIEF & RETRO SWEAT */}
            <div className="lg:col-span-3 flex flex-col justify-between gap-4">
              {wellCogs.filter((c: any) => c.side === "right").map((c: any) => (
                <button key={c.id} onClick={() => setActiveCog(c)} className="text-left bg-zinc-900/90 hover:bg-emerald-950 border border-emerald-700/50 p-5 rounded-2xl transition-all flex-1">
                  <div className="font-black text-sm uppercase text-white">{c.name}</div>
                  <div className="text-xs text-emerald-300/80 font-mono mt-1">{c.desc} →</div>
                </button>
              ))}
            </div>
          </div>
          <p className="text-[10px] font-mono text-zinc-500 text-center">*FDA DSHEA NOTICE: Statements in the Holistic Mall have not been evaluated by the FDA. Products and AI tools are for educational wellness purposes only and are not intended to diagnose, treat, cure, or prevent any disease.</p>
        </div>
      </div>
      {/* PHASE 2 & 3D VR EXPANSION MALLS (UNDER CONSTRUCTION) */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">🚧 ALBS COMMERCIAL REAL ESTATE & 3D VR EXPANSION CONCOURSES (UNDER CONSTRUCTION)</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 border border-dashed border-zinc-700 rounded-xl bg-black/50"><div className="font-black text-amber-400 uppercase">4. The Luxury Direct Outlet Mall</div><p className="text-zinc-500 mt-1">Direct-from-warehouse designer flagships. Zero middleman freight.</p></div>
            <div className="p-4 border border-dashed border-zinc-700 rounded-xl bg-black/50"><div className="font-black text-amber-400 uppercase">5. The Children s & Wonder Mall</div><p className="text-zinc-500 mt-1">Interactive youth learning, family apparel & next-gen toys.</p></div>
            <div className="p-4 border border-dashed border-zinc-700 rounded-xl bg-black/50"><div className="font-black text-amber-400 uppercase">6. Around-The-World Global Bazaar</div><p className="text-zinc-500 mt-1">Authentic international goods sourced directly from global artisans.</p></div>
            <div className="p-4 border border-dashed border-zinc-700 rounded-xl bg-black/50"><div className="font-black text-amber-400 uppercase">7. The Southern Heritage Mall</div><p className="text-zinc-500 mt-1">Heirloom cast iron, outdoor living, culinary & southern craftsmanship.</p></div>
          </div>
        </div>
      </div>
      {/* INTERACTIVE CORRIDOR MODAL (OPENS WHEN ANY COG IS CLICKED) */}
      {activeCog && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border-2 border-zinc-600 rounded-3xl max-w-3xl w-full p-6 md:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <div><h3 className="text-2xl font-black uppercase text-white">{activeCog.name}</h3><p className="text-xs font-mono text-zinc-400">{activeCog.desc}</p></div>
              <button onClick={() => setActiveCog(null)} className="bg-red-600 text-white font-black text-xs uppercase px-4 py-2 rounded-lg">✕ Close Corridor</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeCog.rooms.filter((r: string) => isLive(r)).map((r: string) => (
                <Link key={r} href={"/nostalgia/" + r} className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 p-4 rounded-xl font-black uppercase text-sm flex justify-between items-center">
                  <span>{fmt(r)}</span><span className="text-xs font-mono text-emerald-400">{masterInventory[r].length} ITEMS →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* FREE AI WORKOUT, MEAL PLAN & BIOMARKER COACH MODAL (WITH 4-LAYER CLICKWRAP WAIVER) */}
      {showCoach && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border-2 border-emerald-500 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h3 className="text-2xl font-black uppercase text-emerald-400">🩺 ALBS Sovereign AI Vitality & Meal Coach (Free Utility)</h3>
              <button onClick={() => setShowCoach(false)} className="bg-zinc-800 text-white px-3 py-1 rounded text-xs font-bold">✕ Close</button>
            </div>
            {!waiverSigned ? (
              <div className="space-y-4 text-xs text-zinc-300 bg-black p-5 rounded-2xl border border-red-800/60">
                <div className="text-red-400 font-black uppercase text-sm">🛡️ Mandatory Legal & HIPAA Ephemeral Safe-Harbor Waiver</div>
                <p>1. <b>No Doctor-Patient Relationship:</b> This AI utility is strictly educational and does not diagnose, treat, cure, or prescribe.</p>
                <p>2. <b>Omission & Accuracy Indemnification:</b> You accept 100% responsibility for the completeness of the data you share and hold harmless ALBS Nexus, ALBS Nexus and The Shorrosh Family Foundation</p>
                <p>3. <b>Zero-Retention Privacy:</b> All inputs are processed in volatile memory and never permanently stored as medical records.</p>
                <input value={sigName} onChange={e => setSigName(e.target.value)} placeholder="TYPE YOUR FULL LEGAL NAME TO SIGN & UNLOCK" className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded font-bold uppercase text-white" />
                <button onClick={() => { if (sigName.trim().length > 2) setWaiverSigned(true); }} className="w-full bg-emerald-500 text-black font-black uppercase py-3 rounded-xl">I Agree & Digitally Sign Waiver →</button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-zinc-400">Signed by: <span className="text-emerald-400 font-bold uppercase">{sigName}</span> • Select Male/Female Sovereign Track & enter your workout, diet, or lab questions:</p>
                <textarea rows={3} value={coachGoal} onChange={e => setCoachGoal(e.target.value)} placeholder="Example: Build me a 4-day fat-loss workout, a 1,800-calorie high-protein meal plan + grocery list, and suggest longevity supplements..." className="w-full bg-black border border-zinc-700 p-3 rounded-xl text-sm text-white"></textarea>
                <button onClick={() => setCoachPlan("✅ CUSTOM PROTOCOL GENERATED:\n• WORKOUT: 4-Day Upper/Lower Metabolic Strength + 8k Daily Steps (See Compact Home Gym Room).\n• MEAL PLAN & GROCERY LIST: 180g Protein / Clean Whole Foods — Grass-Fed Beef, Wild Salmon, Eggs, Bone Broth, Avocados (See Clean Pantry & Diet Meal Delivery Rooms).\n• HOLISTIC STACK TO DISCUSS WITH YOUR MD: Pure Shilajit Minerals + Liposomal NAD+ + Lion s Mane (See Longevity & Adaptogen Rooms).\n⚠️ Educational Notice: Verify all protocols and lab panels with your licensed physician.")} className="w-full bg-emerald-500 text-black font-black uppercase py-3 rounded-xl text-xs">Generate Free Workout, Meal Plan & Holistic Protocol →</button>
                {coachPlan && <pre className="whitespace-pre-wrap bg-black border border-emerald-800 p-4 rounded-xl text-xs text-emerald-300 font-mono">{coachPlan}</pre>}
              </div>
            )}
          </div>
        </div>
      )}
          <footer className="border-t border-zinc-800 bg-black py-6 px-4 text-center text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
        🛡️ U.S. PATENT PENDING (USPTO Provisional App. No. 64/134,528 & Omnibus CIP) • Copyright © 2026 ALBS Nexus & The Shorrosh Family Foundation All Rights Reserved. Unauthorized reproduction or cloning of the ALBS Mall-of-Malls, 5-Brain Crucible, or Virtual Outlet Architecture is strictly prohibited.
      </footer>
    </main>
  );
}
