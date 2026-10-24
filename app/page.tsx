"use client";
import { useState } from "react";
import Link from "next/link";
import { masterInventory } from "./inventory";

const isLive = (id: string) => Boolean(masterInventory && masterInventory[id] && masterInventory[id].length > 0);
const fmt = (s: string) => s.replace(/-/g, " ").toUpperCase();

const wellCogs = [
  { id: "w0", name: "💚 1. Special Needs, Expecting, MD, Deaf/Blind & PTSD Superstores (5 Stores)", desc: "Autism Sensory, Expecting Mothers, Muscular Dystrophy, Deaf/Blind & PTSD Calm Gear (10–20% Below Retail)", rooms: ["albs-mall-gift-cards","spectrum-sensory-superstore","new-life-expecting-superstore","md-mobility-superstore","deaf-blind-superstore","ptsd-calm-superstore"] },
  { id: "w1", name: "🌿 2. Holistic Longevity, Botanicals, Peptides & Shilajit (6 Stores)", desc: "Turkey Tail, Sulforaphane, Soursop, NAD+, Peptides, Pure Shilajit Resin & Holistic Books", rooms: ["cellular-immune-botanicals","holistic-longevity-lab","peptide-research-vault","adaptogen-apothecary","cellular-hydration-mineral","gut-botanical-library"] },
  { id: "w2", name: "💪 3. GNC-Style Pro Protein, Clean Pantry & Meal Prep (3 Stores)", desc: "Whey/Plant Protein Shakes, Ostrich Sticks, Organic Pantry & Prepared Diet Boxes", rooms: ["gnc-sports-nutrition","diet-meal-delivery","organic-health-pantry"] },
  { id: "w3", name: "🩺 4. The Scrub Lounge, Back Pain Relief & Senior Mobility (6 Stores)", desc: "Cute/Funny Medical Scrubs, Walkers, Rollators, Spine Decompression, Sportswear & Home Recovery", rooms: ["the-scrub-lounge","senior-mobility-independence","back-pain-spine-relief","athletic-attire-footwear","home-fitness-recovery","retro-sweat-rentals"] }
];

const nostCogs = [
  { id: "n1", name: "🎄 1. Q4 Holiday, The Christmas Story, Ugly Sweaters & Bakery (6 Stores)", desc: "110-Item Christmas Story Gags, Ugly Sweaters, Holiday Fudge/Brownies/Brittle & Gift Baskets", rooms: ["albs-mall-gift-cards","the-christmas-story","holiday-confectionery-bakery","seasonal-gift-baskets","ugly-sweater-party","friendsgiving-vault","holiday-gag-gifts"] },
  { id: "n2", name: "🧸 2. 150-Item Super Squishies, Pop Mart & Blind Box Vaults (8 Stores)", desc: "Rare Squishmallows, Mystery Blind Boxes, Stretch Armstrong, Retro Candy & Novelty Grails", rooms: ["super-squishies-hub","blind-box-vault","the-lost-edge","neo-squish","retro-mystery-vault","pixel-sugar-rush","retro-candy-soda","retro-squish-blind-boxes"] },
  { id: "n3", name: "🕹️ 3. 60s, 70s, 80s, 90s & Y2K Streetwear & Skate Vaults (11 Stores)", desc: "Era Relics, Vintage Jerseys, 90s Grunge Flannel, Roller Rink & 90s Skate Decks", rooms: ["decade-60s-70s","decade-80s-90s","decade-y2k","threads-and-tracks","grunge-90s-flannel","grunge-apparel","y2k-pop-merch","vintage-sports-jerseys","neon-roller-rink","90s-skate-deck-vault","vintage-apparel-vault"] },
  { id: "n4", name: "📼 4. Retro Gaming, 8-Bit Consoles, Vinyl, VHS & Action Figures (16 Stores)", desc: "90s Action Figures, Arcade Systems, Comic Stash, Walkmans, Pogs & Tamagotchi", rooms: ["action-figures-90s","retro-toy-chest","8-bit-consoles","vintage-arcade","retro-arcade-systems","classic-consoles","saturday-morning-cartoons","retro-board-games","vintage-comic-stash","vhs-cult-archive","vintage-vinyl-records","polaroid-instant-film","classic-walkman-audio","pogs-and-slammers","digital-pets","pop-culture-relics"] },
  { id: "n5", name: "✨ 5. Custom Engraver, 3D Puff Hat/Shoe Studio & Offset Press (3 Stores)", desc: "Silver/Brass Engraving, Custom Hats & Sneakers, and Commercial Heidelberg Offset Printing", rooms: ["custom-engraving-keepsakes","custom-hats-apparel-kicks","custom-offset-printing"] }
];

const trendCogs = [
  { id: "t1", name: "🔥 Block 1: Viral Tech, Smart Rings, Audio & Handhelds (10 Stores)", desc: "Qi2 MagSafe Banks, Titanium Smart Rings, 4K Gimbal Projectors, Dash Cams, Creamy Keyboards & OLED Screens", rooms: ["us-trend-mag-power-banks","us-trend-smart-rings","us-trend-mini-projectors","us-trend-dash-cams","us-trend-mechanical-keyboards","us-trend-earbuds-anc","us-trend-portable-monitors","us-trend-handheld-gaming","us-trend-smart-locks-security","us-trend-podcast-creator-rigs"] },
  { id: "t2", name: "🔥 Block 2: Home, Kitchen, Nugget Ice, Pizza Ovens & Cozy Desks (10 Stores)", desc: "40oz Tumblers, Dual Air Fryers, LiDAR Robot Vacs, Nugget Ice, Rotating Pizza Ovens & RO Water", rooms: ["us-trend-insulated-drinkware","us-trend-air-fryer-ovens","us-trend-robot-vacuums","us-trend-iced-coffee-makers","us-trend-pizza-ovens-grills","us-trend-water-filtrations","us-trend-smart-planters-hydro","us-trend-clean-laundry-home","us-trend-ergo-mesh-seating","us-trend-matcha-desk-cozy"] },
  { id: "t3", name: "🔥 Block 3: Beauty, Red-Light Masks, Cold Plunge & Pilates (10 Stores)", desc: "Red-Light LED Masks, Korean Glass-Skin, Vanilla Oud Parfums, Walking Pads, Cold Plunge & Pilates", rooms: ["us-trend-led-skincare","us-trend-kbeauty-glass-skin","us-trend-perfume-atomizers","us-trend-walking-pads","us-trend-cold-plunge-recovery","us-trend-sleep-cooling-tech","us-trend-redlight-fullbody","us-trend-mushroom-nootropics","us-trend-matcha-ceremonial","us-trend-pilates-home-studio"] },
  { id: "t4", name: "🔥 Block 4: Pickleball, Golf Monitors, E-Bikes, Solar & 3D Print (10 Stores)", desc: "T700 Pickleball, Golf Launch Monitors, Marathon Vests, LiFePO4 Solar, E-Bikes, 3D Printers & Lasers", rooms: ["us-trend-pickleball-pro","us-trend-golf-launch-monitors","us-trend-running-hydration","us-trend-portable-power","us-trend-ebikes-scooters","us-trend-outdoor-blackstone","us-trend-car-detailing-pro","us-trend-3d-printers","us-trend-laser-engravers","us-trend-modular-edc-tools"] },
  { id: "t5", name: "🔥 Block 5: Travel Compression, Y2K Cams, Pets, Candy & Mahjong (10 Stores)", desc: "Smart Carry-Ons, Vacuum Backpacks, Retro CCD Cams, Heated Vests, AI Bird Feeders, Litter Bots & Mahjong", rooms: ["us-trend-smart-luggage","us-trend-travel-compression","us-trend-digital-cameras","us-trend-heated-apparel","us-trend-smart-bird-feeders","us-trend-baby-monitors-gear","us-trend-cat-litter-robots","us-trend-freeze-dried-candy","us-trend-mahjong-boardgames","us-trend-matchbox-diecast"] }
];

const sportCogs = [
  { id: "s0", name: "🏆 Block 1: Custom Jerseys, Hats, Wood Bats/Mitts, Tee-Ball Coaches Dugout & Team Trophies (5 Stores • 125 Items)", desc: "Put Your Name & # on Baseball, Football & Basketball Jerseys, 3D Puff Team Hats & Custom Leather Baseball Mitts (Individual or Full Team Bulk!)", rooms: ["sportflex-custom-jerseys-uniforms","sportflex-custom-team-hats-caps","sportflex-pro-gloves-diamond-gear","sportflex-coaches-teeball-dugout","sportflex-trophies-awards-rings"] },
  { id: "s1", name: "⚾ Block 1: Baseball, Football & Basketball Pro Arena (3 Stores)", desc: "BBCOR Bats, Fielding Gloves, Football Visors/Gloves, Portable Glass Hoops & Court Training", rooms: ["sportlick-baseball-diamond","sportlick-football-gridiron","sportlick-basketball-hoops"] },
  { id: "s2", name: "🏎️ Block 2: DIY Car Wash & Tire/Scent Garage, Four-Wheelers (ATV/UTV), Cycling & Golf (4 Stores)", desc: "4500lb ATV Winches, UTV Light Bars & Ramps, MTB/Road Cycling, Golf Simulators & Pickleball", rooms: ["sportlick-atv-four-wheelers","us-trend-car-detailing-pro","sportlick-bicycling-tour","sportlick-golf-pickleball-plaza"] },
  { id: "s3", name: "🦌 Block 3: Hunting, Archery, Fishing Sonar & Overland Basecamp (3 Stores)", desc: "Compound Bows, Trail Cams, Thermal Optics, Baitcasters, Kayak Sonar & Overland Fridges", rooms: ["sportlick-hunting-archery","sportlick-fishing-anglers","sportlick-camping-overland"] },
  { id: "s4", name: "🥊 Block 4: Kayaks, Paddleboards, Boxing/MMA & Garage Gym Plaza (3 Stores)", desc: "Fishing SUPs, Sea Scooters, Heavy Bags, 16oz Gloves, Adjustable Dumbbells & Squat Racks", rooms: ["sportlick-watersports-marine","sportlick-combat-boxing-mma","sportlick-strength-speed-plaza"] }
];

const matrixCogs = [
  { id: "m1", name: "⚙️ 1. Cybernetics, AI & Neural Rigs (16 Stores)", desc: "Workstations, Robotics, Bionic Prosthetics, Smart Glasses, Quantum Nodes & Synthwave Audio", rooms: ["oracle-ai-core","ai-matrix-uplink","android-customs","bionic-prosthetics","cyberware-depot","quantum-processing","smart-home-core","synthwave-audio","synth-food-replicators","neural-network-cafe","neon-biolab","nexus-core","cyber-deck-garage","data-broker","memory-crystals","memory-wipe"] },
  { id: "m2", name: "⚙️ 2. Off-World Survival, Drones & Tactical EDC (16 Stores)", desc: "EDC Gear, Thermal Optics, Satellite Comms, VR Bays, Recon Drones, EMP Shielding & Exo-Suits", rooms: ["survival-edc","vr-immersion-bay","zero-g-gear","anti-grav-vehicles","off-grid-comms","plasma-optics","stealth-tech","mars-colony-route","dyson-sphere-initiative","drone-syndicate","drone-racing","emp-shielding","exo-suit-garage","hover-tech-hub","orbital-real-estate","cyber-weapons"] },
  { id: "m3", name: "⚙️ 3. Modern Lifestyle, Neo-Squish & Holo-Tech (15 Stores)", desc: "Neo-Squish Pods, Luxury Pets, Home Espresso Bars, Smart Holiday LEDs, Holo-Displays & Techwear", rooms: ["neo-squish-pods","premium-pet-supply","home-barista-bar","holiday-illumination","lofi-study-room","hologram-arcades","holographic-displays","glitch-apparel","techwear-tailor","cyber-pets","cyber-flora-nursery","nanobot-pharmacy","synth-organs","synthetic-skin","crypto-cold-storage","metaverse-assets","neon-signs"] }
];

const MALL_DIRECTORY = [
  { id: "sanctuary", badge: "MALL #1 • FEATURED MISSION & WELLNESS HUB", title: "1. The Wellness & Family Sanctuary", subtitle: "20 Storefronts + 5 Free 20-Mile U.S. ZIP Radars & CPR/Choking Certification Board", explain: "Includes: Autism & Sensory Superstore, When You’re Expecting, Muscular Dystrophy, Deaf & Blind, PTSD Recovery, Holistic Longevity/Shilajit, GNC Nutrition & The Scrub Lounge (10%–20% Below Specialty Retail).", border: "border-emerald-500", bg: "from-emerald-950/90 to-zinc-950", accent: "text-emerald-400", btnBg: "bg-emerald-500 hover:bg-emerald-400 text-black", cogs: wellCogs, hasSanctuaryPortals: true },
  { id: "nostalgia", badge: "MALL #2 • HOLIDAY, RETRO & CUSTOM STUDIO", title: "2. Nostalgia & Q4 Holiday Mall", subtitle: "44 Storefronts • 5 Corridors: Holiday Gags, 150-Item Squishies, 60s–Y2K, Retro Gaming & Custom Press", explain: "Includes: The Christmas Story (110 Items), Ugly Sweaters, Holiday Fudge & Bakery, Rare Squishmallows, Pop Mart Blind Boxes, Vintage Streetwear, Retro Gaming & Custom Engraving/Offset Print.", border: "border-pink-500", bg: "from-pink-950/80 to-zinc-950", accent: "text-pink-400", btnBg: "bg-pink-500 hover:bg-pink-400 text-white", cogs: nostCogs },
  { id: "trendalopolis", badge: "MALL #3 • TOP 50 U.S. TRENDING CATEGORIES", title: "3. Trendalopolis • Trending America", subtitle: "50 Storefronts • 5 Corridors • 750 Live-Market Items Across America’s Hottest Categories", explain: "Includes: 40oz Tumblers, Qi2 Power Banks, Titanium Smart Rings, Red-Light LED Masks, Korean Glass-Skin, Nugget Ice Makers, Rotating Pizza Ovens, Walking Pads, Cold Plunge & Freeze-Dried Candy.", border: "border-amber-500", bg: "from-amber-950/80 to-zinc-950", accent: "text-amber-400", btnBg: "bg-amber-400 hover:bg-amber-300 text-black", cogs: trendCogs },
  { id: "sportlick", badge: "MALL #4 • SPORTS, OUTDOORS & POWERSPORTS", title: "4. SportFlex • Pro Sports, Custom Jerseys & Outdoors Plaza", subtitle: "17 Super-Storefronts • 5 Corridors • Custom Name/# Jerseys, Team Hats, Baseball Mitts, Hunting & ATV • Team Sports, Hunting, Fishing, Golf & Four-Wheelers (ATV)", explain: "Includes: Baseball Bats & Gloves, Football Gridiron, Basketball Hoops, Bicycling, Four-Wheelers (ATV/UTV Winches & Ramps), Golf Simulators, T700 Pickleball, Compound Bows, Fishing Sonar & Garage Gym.", border: "border-lime-500", bg: "from-lime-950/80 to-zinc-950", accent: "text-lime-400", btnBg: "bg-lime-400 hover:bg-lime-300 text-black", cogs: sportCogs },
  { id: "matrix", badge: "MALL #5 • NEXT-GEN TECH, AI & TACTICAL", title: "5. The Matrix • Future Tech & AI", subtitle: "47 Storefronts • 3 Corridors • AI Workstations, Robotics, Drones, Espresso Bars & Smart Home", explain: "Includes: NVIDIA/AI Core, Recon & Racing Drones, VR Immersion Bays, Thermal Optics, Faraday/EMP Shielding, Home Barista Espresso Bars, Luxury Smart Pet Gear & Neo-Squish Pods.", border: "border-cyan-500", bg: "from-cyan-950/80 to-zinc-950", accent: "text-cyan-400", btnBg: "bg-cyan-400 hover:bg-cyan-300 text-black", cogs: matrixCogs }
];

export default function MallOfMallsLobby() {
  const [selectedMallId, setSelectedMallId] = useState<string | null>(null);
  const [activeCog, setActiveCog] = useState<any>(null);
  const [mallQuery, setMallQuery] = useState("");

  const allRooms = Object.keys(masterInventory || {}).filter(r => isLive(r));
  const selectedMall = MALL_DIRECTORY.find(m => m.id === selectedMallId) || null;

  return (
    <main className="min-h-screen bg-transparent text-white font-sans relative overflow-x-hidden pb-20">
      <div className="bg-emerald-950/95 border-b border-emerald-500/50 py-2.5 px-4 text-center text-xs">
        <span className="font-black uppercase text-white">💚 THE ALBS 3% LEGACY IMPACT CHARTER:</span> Every purchase dedicates <span className="text-yellow-400 font-bold">1% to Texas Children&apos;s Hospital</span> • <span className="text-cyan-300 font-bold">1% to the ALBS Autism &amp; Family Grant Fund</span> • <span className="text-red-400 font-bold">1% to Military Veterans</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-6 space-y-5">
        <div className="text-center space-y-1">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">
            <span className="text-pink-500">ALBS</span> <span className="text-yellow-400">NEXUS</span>
          </h1>
          <p className="text-xs font-mono text-zinc-300 uppercase tracking-widest">
            The Online Mall of Malls • {allRooms.length} Verified Storefronts • Expedited 3–7 Day Tiered Shipping
          </p>
        </div>

        <div className="bg-zinc-950/95 border-2 border-yellow-400/70 rounded-2xl p-4 shadow-lg">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="md:w-1/3 text-left">
              <div className="text-xs font-black uppercase text-yellow-400">🔍 SEARCH ALL 5 MALLS AT ONCE</div>
              <div className="text-[11px] text-zinc-400">Type any item to see every store that carries it:</div>
            </div>
            <div className="w-full md:w-2/3 flex gap-2">
              <input type="text" value={mallQuery} onChange={(e) => setMallQuery(e.target.value)} placeholder="Search all malls (e.g. ugly sweater, squishmallow, baseball, autism, coffee, drone)..." className="w-full bg-black border-2 border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-sm text-white outline-none" />
              {mallQuery && <button onClick={() => setMallQuery("")} className="bg-red-600 text-white font-black text-xs px-4 rounded-xl uppercase">Clear</button>}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-zinc-800 flex flex-wrap justify-between items-center gap-2">
            <Link href="/nostalgia/albs-mall-gift-cards" className="bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase px-4 py-2.5 rounded-xl">🎁 Buy Universal 6-Mall &amp; Sanctuary Gift Cards ($25–placeholder="Search all malls (e.g. ugly sweater, squishmallow, baseball, autism, coffee, drone)..." className="w-full bg-black border-2 border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-sm text-white outline-none" />
              {mallQuery && <button onClick={() => setMallQuery("")} className="bg-red-600 text-white font-black text-xs px-4 rounded-xl uppercase">Clear</button>}
            </div>
          </div>,000 • $0 Tax/Ship) →</Link>
            <Link href="/nostalgia/concierge" className="bg-pink-600 hover:bg-pink-500 text-white font-black text-xs uppercase px-4 py-2.5 rounded-xl">🎩 Don&apos;t See It? 3–4 Hr AI Concierge (24-Hr Price Hold) →</Link>
          </div>
          <div className="mt-3 pt-3 border-t border-yellow-500/30 flex flex-col md:flex-row justify-between items-center gap-2 bg-amber-500/10 border border-amber-400/50 rounded-xl p-2.5">
            <div className="text-[11px] text-zinc-200 text-left">
              <span className="text-amber-400 font-black uppercase">🎩 DON&apos;T SEE IT IN OUR MALLS?</span> Our AI Concierge will find it at a <span className="text-emerald-400 font-bold">cheaper rate &amp; email you options within 3–4 Hours</span> (Locked on a <span className="text-yellow-300 font-bold">24-Hour Impulse Hold</span>)!
            </div>
            <Link href={"/nostalgia/concierge" + (mallQuery ? "?q=" + encodeURIComponent(mallQuery) : "")} className="bg-amber-400 hover:bg-amber-300 text-black font-black text-[11px] uppercase px-4 py-2 rounded-lg shrink-0 shadow">
              🎩 Find It For Me (3–4 Hr Email • 24-Hr Hold) →
            </Link>
          </div>
          {mallQuery.trim().length > 1 && (() => {
            const q = mallQuery.toLowerCase().trim();
            const matched = Object.entries(masterInventory || {}).map(([room, items]: [string, any]) => {
              const hits = Array.isArray(items) ? items.filter(x => String(x.name || "").toLowerCase().includes(q) || room.toLowerCase().includes(q)) : [];
              return { room, hits };
            }).filter(s => s.hits.length > 0);
            return (
              <div className="mt-4 pt-4 border-t border-zinc-800 space-y-3 text-left">
                <div className="text-xs font-mono text-yellow-400 uppercase font-bold">🗺️ MALL STORE MAP: Found {matched.length} Storefronts with &ldquo;{mallQuery}&rdquo;:</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                  {matched.map(s => (
                    <Link key={s.room} href={"/nostalgia/" + s.room} className="bg-zinc-900 hover:bg-zinc-800 border border-yellow-500/40 p-3 rounded-xl flex items-center gap-3">
                      {s.hits[0]?.media?.[0] && <img src={s.hits[0].media[0]} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />}
                      <div className="min-w-0">
                        <div className="font-black text-xs uppercase text-white truncate">🏪 {fmt(s.room)}</div>
                        <div className="text-[11px] text-emerald-400 font-mono">{s.hits.length} Items • From {s.hits[0]?.price}</div>
                      </div>

        
          {mallQuery.trim().length > 1 && (() => {
            const q = mallQuery.toLowerCase().trim();
            const matched = Object.entries(masterInventory || {}).map(([room, items]: [string, any]) => {
              const hits = Array.isArray(items) ? items.filter(x => String(x.name || "").toLowerCase().includes(q) || room.toLowerCase().includes(q)) : [];
              return { room, hits };
            }).filter(s => s.hits.length > 0);
            return (
              <div className="mt-4 pt-4 border-t border-zinc-800 space-y-3 text-left">
                <div className="text-xs font-mono text-yellow-400 uppercase font-bold">🗺️ MALL STORE MAP: Found {matched.length} Storefronts with &ldquo;{mallQuery}&rdquo;:</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                  {matched.map(s => (
                    <Link key={s.room} href={"/nostalgia/" + s.room} className="bg-zinc-900 hover:bg-zinc-800 border border-yellow-500/40 p-3 rounded-xl flex items-center gap-3">
                      {s.hits[0]?.media?.[0] && <img src={s.hits[0].media[0]} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />}
                      <div className="min-w-0">
                        <div className="font-black text-xs uppercase text-white truncate">🏪 {fmt(s.room)}</div>
                        <div className="text-[11px] text-emerald-400 font-mono">{s.hits.length} Items • From {s.hits[0]?.price}</div>
                      </div>,000) */}
        
          {mallQuery.trim().length > 1 && (() => {
            const q = mallQuery.toLowerCase().trim();
            const matched = Object.entries(masterInventory || {}).map(([room, items]: [string, any]) => {
              const hits = Array.isArray(items) ? items.filter(x => String(x.name || "").toLowerCase().includes(q) || room.toLowerCase().includes(q)) : [];
              return { room, hits };
            }).filter(s => s.hits.length > 0);
            return (
              <div className="mt-4 pt-4 border-t border-zinc-800 space-y-3 text-left">
                <div className="text-xs font-mono text-yellow-400 uppercase font-bold">🗺️ MALL STORE MAP: Found {matched.length} Storefronts with &ldquo;{mallQuery}&rdquo;:</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                  {matched.map(s => (
                    <Link key={s.room} href={"/nostalgia/" + s.room} className="bg-zinc-900 hover:bg-zinc-800 border border-yellow-500/40 p-3 rounded-xl flex items-center gap-3">
                      {s.hits[0]?.media?.[0] && <img src={s.hits[0].media[0]} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />}
                      <div className="min-w-0">
                        <div className="font-black text-xs uppercase text-white truncate">🏪 {fmt(s.room)}</div>
                        <div className="text-[11px] text-emerald-400 font-mono">{s.hits.length} Items • From {s.hits[0]?.price}</div>
                      </div>00 • $250 • $500 • 🎩 Find It For Me (3–4 Hr Email • 24-Hr Hold) →
            </Link>
          </div>
          {mallQuery.trim().length > 1 && (() => {
            const q = mallQuery.toLowerCase().trim();
            const matched = Object.entries(masterInventory || {}).map(([room, items]: [string, any]) => {
              const hits = Array.isArray(items) ? items.filter(x => String(x.name || "").toLowerCase().includes(q) || room.toLowerCase().includes(q)) : [];
              return { room, hits };
            }).filter(s => s.hits.length > 0);
            return (
              <div className="mt-4 pt-4 border-t border-zinc-800 space-y-3 text-left">
                <div className="text-xs font-mono text-yellow-400 uppercase font-bold">🗺️ MALL STORE MAP: Found {matched.length} Storefronts with &ldquo;{mallQuery}&rdquo;:</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                  {matched.map(s => (
                    <Link key={s.room} href={"/nostalgia/" + s.room} className="bg-zinc-900 hover:bg-zinc-800 border border-yellow-500/40 p-3 rounded-xl flex items-center gap-3">
                      {s.hits[0]?.media?.[0] && <img src={s.hits[0].media[0]} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />}
                      <div className="min-w-0">
                        <div className="font-black text-xs uppercase text-white truncate">🏪 {fmt(s.room)}</div>
                        <div className="text-[11px] text-emerald-400 font-mono">{s.hits.length} Items • From {s.hits[0]?.price}</div>
                      </div>,000)
              </div>
              <p className="text-[11px] text-zinc-200">
                The perfect gift for Autism, Special-Needs &amp; Expecting Families: lets parents shop the <span className="text-emerald-300 font-bold">Wellness Sanctuary</span> while the rest of the family shops <span className="text-yellow-300 font-bold">Sports, Nostalgia, Party Lapooza &amp; Trending Tech</span>! <span className="text-zinc-400">(Funds Never Expire • $0 Tax &amp; $0 Shipping on Card Purchase)</span>
              </p>
            </div>
            <Link href="/nostalgia/albs-mall-gift-cards" className="bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase px-5 py-3.5 rounded-xl shrink-0 shadow-lg">
              🎁 Send a Mall Gift Card ($25–🎩 Find It For Me (3–4 Hr Email • 24-Hr Hold) →
            </Link>
          </div>
          {mallQuery.trim().length > 1 && (() => {
            const q = mallQuery.toLowerCase().trim();
            const matched = Object.entries(masterInventory || {}).map(([room, items]: [string, any]) => {
              const hits = Array.isArray(items) ? items.filter(x => String(x.name || "").toLowerCase().includes(q) || room.toLowerCase().includes(q)) : [];
              return { room, hits };
            }).filter(s => s.hits.length > 0);
            return (
              <div className="mt-4 pt-4 border-t border-zinc-800 space-y-3 text-left">
                <div className="text-xs font-mono text-yellow-400 uppercase font-bold">🗺️ MALL STORE MAP: Found {matched.length} Storefronts with &ldquo;{mallQuery}&rdquo;:</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                  {matched.map(s => (
                    <Link key={s.room} href={"/nostalgia/" + s.room} className="bg-zinc-900 hover:bg-zinc-800 border border-yellow-500/40 p-3 rounded-xl flex items-center gap-3">
                      {s.hits[0]?.media?.[0] && <img src={s.hits[0].media[0]} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />}
                      <div className="min-w-0">
                        <div className="font-black text-xs uppercase text-white truncate">🏪 {fmt(s.room)}</div>
                        <div className="text-[11px] text-emerald-400 font-mono">{s.hits.length} Items • From {s.hits[0]?.price}</div>
                      </div>,000) →
            </Link>
          </div>
        </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <button onClick={() => { setSelectedMallId(null); setActiveCog(null); }} className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase border ${!selectedMallId ? "bg-white text-black border-white" : "bg-zinc-900 text-zinc-300 border-zinc-700"}`}>🏛️ View All 5 Malls</button>
          {MALL_DIRECTORY.map(m => (
            <button key={m.id} onClick={() => { setSelectedMallId(m.id); setActiveCog(null); }} className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase border ${selectedMallId === m.id ? "bg-yellow-400 text-black border-yellow-400" : "bg-zinc-900 text-zinc-200 border-zinc-700"}`}>{m.title}</button>
          ))}
          <Link href="/nostalgia/concierge" className="px-3.5 py-2 rounded-xl text-xs font-black uppercase bg-pink-600 text-white">🎩 AI Concierge</Link>
        </div>
      </div>

      {!selectedMall && (
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-6 space-y-6">
          {MALL_DIRECTORY.map((m, idx) => {
            const storeCount = m.cogs.reduce((sum, c) => sum + c.rooms.filter(r => isLive(r)).length, 0);
            return (
              <div key={m.id} className={`bg-gradient-to-br ${m.bg} border-2 ${m.border} rounded-3xl p-6 md:p-7 space-y-4 shadow-xl`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1.5">
                    <span className={`font-mono text-xs font-bold uppercase ${m.accent}`}>{m.badge} • {m.cogs.length} CORRIDORS • {storeCount} LIVE STOREFRONTS</span>
                    <h2 className="text-2xl md:text-4xl font-black uppercase text-white">{m.title}</h2>
                    <p className={`text-xs font-bold ${m.accent}`}>{m.subtitle}</p>
                    <p className="text-xs text-zinc-300 max-w-3xl">{m.explain}</p>
                  </div>
                  <button onClick={() => setSelectedMallId(m.id)} className={`${m.btnBg} font-black text-xs uppercase px-6 py-4 rounded-2xl shrink-0`}>
                    Enter {m.title} ({storeCount} Stores) →</button>
                  <Link href="/nostalgia/concierge" className="bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400 text-amber-300 font-black text-[10px] uppercase px-3 py-2 rounded-xl text-center">🎩 Can&apos;t Find It? 3–4 Hr Concierge (24-Hr Hold) →</Link>
                </div>
                {idx === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-emerald-500/30">
                    <a href="/sanctuary-command-vault.html" className="bg-amber-400/20 border border-amber-400 p-3 rounded-xl text-xs font-bold text-amber-300">🎓 Free CPR/Choking Certification Board + MD, Deaf/Blind &amp; PTSD 20-Mile ZIP Radar →</a>
                    <a href="/spectrum-knowledge-vault.html" className="bg-emerald-900/50 border border-emerald-400 p-3 rounded-xl text-xs font-bold text-emerald-300">🧩 Autism 20-Mile ZIP Radar &amp; Hospital Vault →</a>
                    <a href="/new-life-expecting-vault.html" className="bg-pink-900/40 border border-pink-400 p-3 rounded-xl text-xs font-bold text-pink-300">👶 When You&apos;re Expecting &amp; Infant CPR Vault →</a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {selectedMall && !activeCog && (
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-6">
          <div className={`bg-gradient-to-br ${selectedMall.bg} border-2 ${selectedMall.border} rounded-3xl p-6 md:p-8 space-y-6`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-700 pb-4">
              <div>
                <span className={`font-mono text-xs uppercase ${selectedMall.accent}`}>{selectedMall.badge}</span>
                <h2 className="text-3xl md:text-4xl font-black uppercase text-white mt-1">{selectedMall.title}</h2>
                <p className="text-xs text-zinc-300 mt-1">All {selectedMall.cogs.length} Category Corridors inside {selectedMall.title}:</p>
              </div>
              <button onClick={() => setSelectedMallId(null)} className="bg-white text-black font-black text-xs uppercase px-5 py-3 rounded-xl">← Back to All 5 Malls</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedMall.cogs.map(c => (
                <button key={c.id} onClick={() => setActiveCog(c)} className="text-left bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-700 hover:border-yellow-400 p-5 rounded-2xl space-y-2">
                  <div className="font-black text-base uppercase text-white">{c.name}</div>
                  <div className="text-xs text-zinc-300">{c.desc}</div>
                  <div className="text-xs font-mono text-yellow-400 font-bold pt-1">📂 Open {c.rooms.filter((r: string) => isLive(r)).length} Live Storefronts →</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeCog && (
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-6">
          <div className="bg-zinc-950 border-2 border-yellow-400 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-4">
              <div>
                <h3 className="text-2xl font-black uppercase text-white">{activeCog.name}</h3>
                <p className="text-xs text-zinc-400 mt-1">{activeCog.desc}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setActiveCog(null)} className="bg-yellow-400 text-black font-black text-xs uppercase px-4 py-3 rounded-xl">← Back to Corridors</button>
                <button onClick={() => { setActiveCog(null); setSelectedMallId(null); }} className="bg-zinc-800 text-white font-black text-xs uppercase px-4 py-3 rounded-xl">🏛️ All 5 Malls</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeCog.rooms.filter((r: string) => isLive(r)).map((room: string) => {
                const items = masterInventory[room] || [];
                return (
                  <Link key={room} href={"/nostalgia/" + room} className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-yellow-400 p-4 rounded-2xl flex items-center gap-4">
                    {items[0]?.media?.[0] && <img src={items[0].media[0]} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />}
                    <div className="min-w-0">
                      <div className="font-black text-sm uppercase text-white truncate">{fmt(room)}</div>
                      <div className="text-xs font-mono text-emerald-400">{items.length} Verified Items • {items[0]?.price}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
