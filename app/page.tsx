import Link from 'next/link';
import { masterInventory } from './inventory';

// Helper to check if a room actually has items
const isLive = (roomId: string) => masterInventory && masterInventory[roomId] && masterInventory[roomId].length > 0;

export default function PremiumLobby() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 font-sans relative overflow-hidden">
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* HEADER */}
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic drop-shadow-2xl">Aether Nexus</h1>
          <p className="text-xl md:text-2xl font-mono text-zinc-400 uppercase tracking-widest">Global E-Commerce Matrix • Sector 001</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
          
          {/* ==================== NOSTALGIA WING ==================== */}
          <div className="space-y-10">
            <div className="bg-red-600 p-4 border-l-8 border-yellow-400 shadow-[0_0_40px_rgba(220,38,38,0.5)]">
              <h2 className="text-5xl font-black uppercase italic">Nostalgia Wing</h2>
            </div>

            {/* CORRIDOR 1: NEXUS POP */}
            <div className="space-y-4">
              <div className="border-b-2 border-red-900 pb-2">
                <h3 className="text-2xl font-black text-red-500 uppercase tracking-widest">Nexus Pop Corridor</h3>
                <p className="text-zinc-500 font-mono text-sm">Trending Collectibles & Novelty Grails</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {isLive('super-squishies-hub') && (
                  <Link href="/nostalgia/super-squishies-hub" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-red-900 hover:border-red-500 transition-all shadow-lg flex justify-between items-center group relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-600 text-xs px-2 py-1 font-bold tracking-widest">TRENDING</div>
                    <span>Super Squishies Hub</span> <span className="text-red-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
                {isLive('blind-box-vault') && (
                  <Link href="/nostalgia/blind-box-vault" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-red-900 hover:border-red-500 transition-all shadow-lg flex justify-between items-center group">
                    <span>Blind Box Vault</span> <span className="text-red-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
                {isLive('the-lost-edge') && (
                  <Link href="/nostalgia/the-lost-edge" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-red-900 hover:border-red-500 transition-all shadow-lg flex justify-between items-center group">
                    <span>The Lost Edge (Novelty)</span> <span className="text-red-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
              </div>
            </div>

            {/* CORRIDOR 2: DECADE VAULTS */}
            <div className="space-y-4">
              <div className="border-b-2 border-orange-900 pb-2">
                <h3 className="text-2xl font-black text-orange-500 uppercase tracking-widest">The Decade Vaults</h3>
                <p className="text-zinc-500 font-mono text-sm">Verified Vintage & Era-Specific Relics</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {isLive('decade-60s-70s') && (
                  <Link href="/nostalgia/decade-60s-70s" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-orange-900 hover:border-orange-500 transition-all shadow-lg flex justify-between items-center group">
                    <span>60s & 70s Archive</span> <span className="text-orange-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
                {isLive('decade-80s-90s') && (
                  <Link href="/nostalgia/decade-80s-90s" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-orange-900 hover:border-orange-500 transition-all shadow-lg flex justify-between items-center group">
                    <span>80s & 90s Archive</span> <span className="text-orange-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
                {isLive('decade-y2k') && (
                  <Link href="/nostalgia/decade-y2k" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-orange-900 hover:border-orange-500 transition-all shadow-lg flex justify-between items-center group">
                    <span>Y2K Millennium</span> <span className="text-orange-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
              </div>
            </div>

            {/* CORRIDOR 3: HIGH TICKET */}
            <div className="space-y-4">
              <div className="border-b-2 border-yellow-900 pb-2">
                <h3 className="text-2xl font-black text-yellow-500 uppercase tracking-widest">Premium Assets</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {isLive('consignment-vault') && (
                  <Link href="/nostalgia/consignment-vault" className="bg-zinc-900 border border-yellow-700 p-6 font-black text-xl uppercase hover:bg-yellow-900 hover:border-yellow-400 transition-all shadow-[0_0_15px_rgba(234,179,8,0.2)] flex justify-between items-center group relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs px-2 py-1 font-bold tracking-widest">AUTHENTICATED</div>
                    <span>Consignment Vault</span> <span className="text-yellow-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
                <Link href="/nostalgia/concierge" className="p-6 border-2 border-dashed border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors font-black text-xl uppercase flex justify-between items-center bg-black/50">
                  <span>White-Glove Sourcing</span> <span className="text-xs tracking-widest text-zinc-500">CONCIERGE DESK</span>
                </Link>
              </div>
            </div>
          </div>

          {/* ==================== MATRIX WING ==================== */}
          <div className="space-y-10">
            <div className="bg-cyan-600 p-4 border-l-8 border-cyan-300 shadow-[0_0_40px_rgba(8,145,178,0.5)]">
              <h2 className="text-5xl font-black uppercase italic text-black">The Matrix</h2>
            </div>

            {/* CORRIDOR 1: HARDWARE & AI */}
            <div className="space-y-4">
              <div className="border-b-2 border-cyan-900 pb-2">
                <h3 className="text-2xl font-black text-cyan-500 uppercase tracking-widest">Cybernetics & Hardware</h3>
                <p className="text-zinc-500 font-mono text-sm">Next-Gen Tech & Neural Architecture</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {isLive('oracle-ai-core') && (
                  <Link href="/netrix/oracle-ai-core" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-cyan-950 hover:border-cyan-500 transition-all shadow-lg flex justify-between items-center group">
                    <span>Oracle AI Core</span> <span className="text-cyan-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
                {isLive('synthwave-audio') && (
                  <Link href="/netrix/synthwave-audio" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-cyan-950 hover:border-cyan-500 transition-all shadow-lg flex justify-between items-center group">
                    <span>Synthwave Audio</span> <span className="text-cyan-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
              </div>
            </div>

            {/* CORRIDOR 2: TACTICAL & IMMERSION */}
            <div className="space-y-4">
              <div className="border-b-2 border-fuchsia-900 pb-2">
                <h3 className="text-2xl font-black text-fuchsia-500 uppercase tracking-widest">Off-World Survival</h3>
                <p className="text-zinc-500 font-mono text-sm">Tactical EDC & Immersion Rigs</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {isLive('survival-edc') && (
                  <Link href="/netrix/survival-edc" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-fuchsia-950 hover:border-fuchsia-500 transition-all shadow-lg flex justify-between items-center group relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-fuchsia-600 text-xs px-2 py-1 font-bold tracking-widest">HIGH DEMAND</div>
                    <span>Survival EDC</span> <span className="text-fuchsia-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
                 {isLive('vr-immersion-bay') && (
                  <Link href="/netrix/vr-immersion-bay" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-fuchsia-950 hover:border-fuchsia-500 transition-all shadow-lg flex justify-between items-center group">
                    <span>VR Immersion Bay</span> <span className="text-fuchsia-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
              </div>
            </div>

            {/* CORRIDOR 3: MATRIX CONCIERGE */}
            <div className="space-y-4 pt-4">
               <Link href="/netrix/concierge" className="p-6 border-2 border-dashed border-zinc-700 text-zinc-400 hover:text-green-500 hover:border-green-500 transition-colors font-black text-xl uppercase flex justify-between items-center bg-black/50 group">
                  <span>Secure Procurement</span> <span className="text-xs tracking-widest text-zinc-500 group-hover:text-green-500 transition-colors">INITIATE UPLINK</span>
                </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}