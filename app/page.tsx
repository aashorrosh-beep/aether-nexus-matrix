import Link from 'next/link';
import { masterInventory } from './inventory';

export default function MainLobby() {
  const rooms = Object.keys(masterInventory || {}).filter(room => masterInventory[room].length > 0);
  
  const nostalgiaRooms = rooms.filter(r => ['action-figures-90s', 'trading-card-syndicate', 'vintage-arcade', 'threads-and-tracks', '8-bit-consoles', 'retro-toys', 'vintage-lifestyle', 'digital-retro'].includes(r));
  const matrixRooms = rooms.filter(r => !nostalgiaRooms.includes(r));

  const formatName = (str: string) => str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic drop-shadow-2xl">Aether Nexus</h1>
          <p className="text-xl md:text-2xl font-mono text-zinc-400 uppercase tracking-widest">Global E-Commerce Matrix • Sector 001</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
          <div className="space-y-6">
            <div className="bg-red-600 p-4 border-l-8 border-yellow-400 shadow-[0_0_30px_rgba(220,38,38,0.4)]">
              <h2 className="text-4xl font-black uppercase italic">Nostalgia Wing</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {nostalgiaRooms.map(room => (
                <Link key={room} href={`/nostalgia/${room}`} className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-red-900 hover:border-red-500 transition-all shadow-lg flex justify-between items-center group">
                  <span>{formatName(room)}</span> <span className="text-red-500 group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-cyan-600 p-4 border-l-8 border-cyan-300 shadow-[0_0_30px_rgba(8,145,178,0.4)]">
              <h2 className="text-4xl font-black uppercase italic text-black">The Matrix</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {matrixRooms.map(room => (
                <Link key={room} href={`/netrix/${room}`} className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-cyan-950 hover:border-cyan-500 transition-all shadow-lg flex justify-between items-center group">
                  <span>{formatName(room)}</span> <span className="text-cyan-500 group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}