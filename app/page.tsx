import Link from 'next/link';
import { masterInventory } from './inventory';

const isLive = (roomId: string) => masterInventory && masterInventory[roomId] && masterInventory[roomId].length > 0;

export default function PremiumLobby() {
  const allRooms = Object.keys(masterInventory || {}).filter(room => isLive(room));
  const sortedRooms = ['the-christmas-story', 'friendsgiving-vault', 'super-squishies-hub', 'blind-box-vault', 'the-lost-edge', 'decade-60s-70s', 'decade-80s-90s', 'decade-y2k', 'consignment-vault', 'lofi-study-room', 'oracle-ai-core', 'synthwave-audio', 'survival-edc', 'vr-immersion-bay', 'premium-pet-supply', 'home-barista-bar', 'holiday-illumination'];
  const unsortedRooms = allRooms.filter(r => !sortedRooms.includes(r));
  const formatName = (str: string) => str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
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

            {/* Q4 SEASONAL DROP */}
            <div className="space-y-4">
              <div className="border-b-2 border-emerald-900 pb-2">
                <h3 className="text-2xl font-black text-emerald-500 uppercase tracking-widest">Q4 Holiday Drop</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {isLive('the-christmas-story') && (
                  <Link href="/nostalgia/the-christmas-story" className="bg-zinc-900 border border-emerald-700 p-6 font-black text-xl uppercase hover:bg-emerald-900 hover:border-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] flex justify-between items-center group relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs px-2 py-1 font-bold tracking-widest">FLAGSHIP</div>
                    <span>The Christmas Story (Gags & Gifts)</span> <span className="text-emerald-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
                {isLive('friendsgiving-vault') && (
                  <Link href="/nostalgia/friendsgiving-vault" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-emerald-900 hover:border-emerald-500 transition-all shadow-lg flex justify-between items-center group">
                    <span>Friendsgiving Vault</span> <span className="text-emerald-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
              </div>
            </div>

            {/* NEXUS POP */}
            <div className="space-y-4">
              <div className="border-b-2 border-red-900 pb-2">
                <h3 className="text-2xl font-black text-red-500 uppercase tracking-widest">Nexus Pop Corridor</h3>
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

            {/* DECADE VAULTS */}
            <div className="space-y-4">
              <div className="border-b-2 border-orange-900 pb-2">
                <h3 className="text-2xl font-black text-orange-500 uppercase tracking-widest">The Decade Vaults</h3>
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

            {/* HIGH TICKET */}
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

            {/* MODERN LIFESTYLE */}
            <div className="space-y-4">
              <div className="border-b-2 border-indigo-900 pb-2">
                <h3 className="text-2xl font-black text-indigo-500 uppercase tracking-widest">Modern Lifestyle</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {isLive('premium-pet-supply') && (
                  <Link href="/netrix/premium-pet-supply" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-indigo-950 hover:border-indigo-500 transition-all shadow-lg flex justify-between items-center group">
                    <span>Premium Pet Supply</span> <span className="text-indigo-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
                {isLive('home-barista-bar') && (
                  <Link href="/netrix/home-barista-bar" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-indigo-950 hover:border-indigo-500 transition-all shadow-lg flex justify-between items-center group">
                    <span>Home Barista Bar</span> <span className="text-indigo-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
                {isLive('holiday-illumination') && (
                  <Link href="/netrix/holiday-illumination" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-indigo-950 hover:border-indigo-500 transition-all shadow-lg flex justify-between items-center group relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-indigo-600 text-xs px-2 py-1 font-bold tracking-widest">SEASONAL</div>
                    <span>Smart Holiday Illumination</span> <span className="text-indigo-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
                {isLive('lofi-study-room') && (
                  <Link href="/netrix/lofi-study-room" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-indigo-950 hover:border-indigo-500 transition-all shadow-lg flex justify-between items-center group">
                    <span>Lofi Study Sanctuary</span> <span className="text-indigo-500 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                )}
              </div>
            </div>

            {/* CYBERNETICS */}
            <div className="space-y-4">
              <div className="border-b-2 border-cyan-900 pb-2">
                <h3 className="text-2xl font-black text-cyan-500 uppercase tracking-widest">Cybernetics & Hardware</h3>
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

            {/* TACTICAL */}
            <div className="space-y-4">
              <div className="border-b-2 border-fuchsia-900 pb-2">
                <h3 className="text-2xl font-black text-fuchsia-500 uppercase tracking-widest">Off-World Survival</h3>
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

            {/* DYNAMIC CATCH-ALL */}
            {unsortedRooms.length > 0 && (
              <div className="space-y-4 pt-4">
                <div className="border-b-2 border-fuchsia-900 pb-2">
                  <h3 className="text-2xl font-black text-fuchsia-500 uppercase tracking-widest">Incoming Transmissions</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {unsortedRooms.map(room => (
                    <Link key={room} href={`/netrix/${room}`} className="bg-zinc-900 border border-fuchsia-900/50 p-6 font-black text-xl uppercase hover:bg-fuchsia-950 hover:border-fuchsia-500 transition-all shadow-lg flex justify-between items-center group relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-fuchsia-600 text-black text-xs px-2 py-1 font-bold tracking-widest">NEW DROP</div>
                      <span>{formatName(room)}</span> <span className="text-fuchsia-500 group-hover:translate-x-2 transition-transform">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* MATRIX CONCIERGE */}
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