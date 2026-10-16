import Link from "next/link";
import { masterInventory } from "./inventory";
const isLive = (id: string) => Boolean(masterInventory && masterInventory[id] && masterInventory[id].length > 0);
const fmt = (s: string) => s.replace(/-/g, " ").toUpperCase();
const nostCorridors = [
  { title: "Q4 Holiday & Confectionery Drop", sub: "The Christmas Story, White Elephant Gags, Bakery & Baskets", rooms: ["the-christmas-story","holiday-confectionery-bakery","seasonal-gift-baskets","ugly-sweater-party","friendsgiving-vault","holiday-gag-gifts"] },
  { title: "Nexus Pop & 150-Item Super Rooms", sub: "Super Squishies, Blind Boxes, Plushies & Novelty Grails", rooms: ["super-squishies-hub","blind-box-vault","the-lost-edge","neo-squish","retro-mystery-vault","pixel-sugar-rush","retro-candy-soda"] },
  { title: "The Decade & Vintage Apparel Vaults", sub: "60s, 70s, 80s, 90s & Y2K Relics, Streetwear & Throwbacks", rooms: ["decade-60s-70s","decade-80s-90s","decade-y2k","threads-and-tracks","grunge-90s-flannel","grunge-apparel","y2k-pop-merch","vintage-sports-jerseys","neon-roller-rink","90s-skate-deck-vault","vintage-apparel-vault"] },
  { title: "Retro Gaming, Media & Toys", sub: "90s Action Figures, 8-Bit Consoles, Arcade, Vinyl & VHS", rooms: ["action-figures-90s","retro-toy-chest","8-bit-consoles","vintage-arcade","retro-arcade","retro-arcade-systems","classic-consoles","saturday-morning-cartoons","retro-board-games","vintage-comic-stash","the-comic-stash","vhs-cult-archive","vhs-archive","vintage-vinyl-records","vintage-vinyl","polaroid-instant-film","polaroid-and-film","classic-walkman-audio","pop-culture-relics"] },
  { title: "High-Ticket & Consignment Vault", sub: "PSA 10 Graded Slabs & Authenticated Grails", rooms: ["consignment-vault","trading-card-syndicate","trading-cards"] }
];
const matCorridors = [
  { title: "Holistic & Bio-Optimization Wing", sub: "Longevity Labs, Adaptogens & Cellular Minerals", rooms: ["holistic-longevity-lab","adaptogen-apothecary","cellular-hydration-mineral"] },
  { title: "Modern Lifestyle & Seasonal Tech", sub: "Luxury Pets, Home Barista, Lofi Sanctuary & Smart LEDs", rooms: ["premium-pet-supply","home-barista-bar","holiday-illumination","lofi-study-room"] },
  { title: "Cybernetics, AI & Neural Hardware", sub: "Oracle AI, Robotics, Smart Glasses & Synthwave Audio", rooms: ["oracle-ai-core","ai-matrix-uplink","android-customs","bionic-prosthetics","cyberware-depot","quantum-processing","smart-home-core","synthwave-audio","synth-food-replicators","neural-network-cafe","neon-biolab"] },
  { title: "Off-World Survival & Tactical", sub: "Survival EDC, VR Immersion, Thermal Optics & Off-Grid Comms", rooms: ["survival-edc","vr-immersion-bay","zero-g-gear","anti-grav-vehicles","off-grid-comms","plasma-optics","stealth-tech","mars-colony-route","dyson-sphere-initiative"] }
];
export default function MasterLobby() {
  const all = Object.keys(masterInventory || {}).filter(r => isLive(r));
  const placed = new Set([...nostCorridors.flatMap(c => c.rooms), ...matCorridors.flatMap(c => c.rooms)]);
  const unplaced = all.filter(r => !placed.has(r));
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 pt-4">
          <h1 className="text-6xl md:text-8xl font-black uppercase italic">Aether Nexus</h1>
          <p className="text-xl font-mono text-zinc-400 uppercase">Global E-Commerce Matrix • {all.length + 2} Active Storefronts</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="bg-red-600 p-4 border-l-8 border-yellow-400"><h2 className="text-4xl font-black uppercase italic">Nostalgia Wing</h2></div>
            <Link href="/nostalgia/concierge" className="block p-5 border-2 border-dashed border-red-500 text-red-400 font-black uppercase bg-zinc-950">★ White-Glove Sourcing & The Lost Edge Concierge →</Link>
            {nostCorridors.map(c => {
              const act = c.rooms.filter(r => isLive(r));
              if (!act.length) return null;
              return (
                <div key={c.title} className="space-y-3 bg-zinc-950 p-5 border border-red-900/40">
                  <h3 className="text-2xl font-black text-red-400 uppercase">{c.title}</h3>
                  <p className="text-zinc-400 font-mono text-xs">{c.sub}</p>
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    {act.map(r => (
                      <Link key={r} href={"/nostalgia/" + r} className="bg-zinc-900 border border-zinc-700 p-4 font-black uppercase hover:border-red-500 flex justify-between items-center">
                        <span>{fmt(r)}</span><span className="text-xs font-mono text-red-400">{masterInventory[r].length} ITEMS →</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="space-y-8">
            <div className="bg-cyan-600 text-black p-4 border-l-8 border-cyan-300"><h2 className="text-4xl font-black uppercase italic">The Matrix & Holistic</h2></div>
            <Link href="/netrix/concierge" className="block p-5 border-2 border-dashed border-cyan-500 text-cyan-400 font-black uppercase bg-zinc-950">★ Secure Neural Procurement & Matrix Concierge →</Link>
            {matCorridors.map(c => {
              const act = c.rooms.filter(r => isLive(r));
              if (!act.length) return null;
              return (
                <div key={c.title} className="space-y-3 bg-zinc-950 p-5 border border-cyan-900/40">
                  <h3 className="text-2xl font-black text-cyan-400 uppercase">{c.title}</h3>
                  <p className="text-zinc-400 font-mono text-xs">{c.sub}</p>
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    {act.map(r => (
                      <Link key={r} href={"/nostalgia/" + r} className="bg-zinc-900 border border-zinc-700 p-4 font-black uppercase hover:border-cyan-500 flex justify-between items-center">
                        <span>{fmt(r)}</span><span className="text-xs font-mono text-cyan-400">{masterInventory[r].length} ITEMS →</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
            {unplaced.length > 0 && (
              <div className="space-y-3 bg-zinc-950 p-5 border border-fuchsia-900/40">
                <h3 className="text-2xl font-black text-fuchsia-400 uppercase">Additional Active Vaults</h3>
                <div className="grid grid-cols-1 gap-2 pt-2">
                  {unplaced.map(r => (
                    <Link key={r} href={"/nostalgia/" + r} className="bg-zinc-900 border border-zinc-700 p-4 font-black uppercase hover:border-fuchsia-500 flex justify-between items-center">
                      <span>{fmt(r)}</span><span className="text-xs font-mono text-fuchsia-400">{masterInventory[r].length} ITEMS →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
