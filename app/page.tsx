import Link from "next/link";
import { masterInventory } from "./inventory";
const fmt = (s: string) => s.replace(/-/g, " ").toUpperCase();
const nostMatch = ["christmas","holiday","friendsgiving","ugly","squish","blind","lost-edge","decade","threads","grunge","jersey","roller","skate","action","8-bit","arcade","console","cartoon","board","comic","vhs","vinyl","polaroid","walkman","relic","apparel","consignment","card","candy"];
export default function Lobby() {
  const all = Object.keys(masterInventory || {}).filter(k => masterInventory[k]?.length > 0);
  const nost = all.filter(r => nostMatch.some(m => r.includes(m)));
  const mat = all.filter(r => !nost.includes(r));
  const cols = [
    { wing: "Nostalgia Wing", bg: "bg-red-600", rooms: nost, conc: "/nostalgia/concierge" },
    { wing: "The Matrix & Holistic Wing", bg: "bg-cyan-600 text-black", rooms: mat, conc: "/netrix/concierge" }
  ];
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 pt-4">
          <h1 className="text-6xl md:text-8xl font-black uppercase italic">Aether Nexus</h1>
          <p className="text-xl font-mono text-zinc-400 uppercase tracking-widest">Global E-Commerce Matrix • {all.length + 2} Active Storefronts</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {cols.map(c => (
            <div key={c.wing} className="space-y-4">
              <div className={`${c.bg} p-4 border-l-8 border-yellow-400`}><h2 className="text-4xl font-black uppercase italic">{c.wing}</h2></div>
              <Link href={c.conc} className="block p-5 border-2 border-dashed border-yellow-500 text-yellow-400 font-black uppercase">★ VIP Concierge & Custom Sourcing →</Link>
              <div className="grid grid-cols-1 gap-3">
                {c.rooms.map(r => (
                  <Link key={r} href={`/nostalgia/${r}`} className="bg-zinc-900 border border-zinc-700 p-5 font-black text-lg uppercase hover:border-white flex justify-between items-center">
                    <span>{fmt(r)}</span><span className="text-xs font-mono text-zinc-400">{masterInventory[r].length} ITEMS →</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}