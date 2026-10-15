import Link from 'next/link';

export default function MainLobby() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic drop-shadow-2xl">Aether Nexus</h1>
          <p className="text-xl md:text-2xl font-mono text-zinc-400 uppercase tracking-widest">Global E-Commerce Matrix • Sector 001</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
          {/* NOSTALGIA WING */}
          <div className="space-y-6">
            <div className="bg-red-600 p-4 border-l-8 border-yellow-400 shadow-[0_0_30px_rgba(220,38,38,0.4)]">
              <h2 className="text-4xl font-black uppercase italic">Nostalgia Wing</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Link href="/nostalgia/retro-toys" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-red-900 hover:border-red-500 transition-all shadow-lg flex justify-between items-center group">
                <span>Retro Toy Hub</span> <span className="text-red-500 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
              <Link href="/nostalgia/vintage-lifestyle" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-orange-900 hover:border-orange-500 transition-all shadow-lg flex justify-between items-center group">
                <span>Vintage Lifestyle</span> <span className="text-orange-500 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
              <Link href="/nostalgia/digital-retro" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-indigo-900 hover:border-indigo-500 transition-all shadow-lg flex justify-between items-center group">
                <span>Digital Retro</span> <span className="text-indigo-500 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
              <div className="p-6 border-2 border-dashed border-zinc-800 text-zinc-600 font-black text-xl uppercase flex justify-between items-center bg-black/50">
                <span>Consignment Vault</span> <span className="text-xs tracking-widest text-yellow-500">OPENING SOON</span>
              </div>
              <div className="p-6 border-2 border-dashed border-zinc-800 text-zinc-600 font-black text-xl uppercase flex justify-between items-center bg-black/50">
                <span>Concierge Desk</span> <span className="text-xs tracking-widest text-yellow-500">OPENING SOON</span>
              </div>
            </div>
          </div>

          {/* MATRIX WING */}
          <div className="space-y-6">
            <div className="bg-cyan-600 p-4 border-l-8 border-cyan-300 shadow-[0_0_30px_rgba(8,145,178,0.4)]">
              <h2 className="text-4xl font-black uppercase italic text-black">The Matrix</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Link href="/netrix/cybernetics" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-cyan-950 hover:border-cyan-500 transition-all shadow-lg flex justify-between items-center group">
                <span>Cybernetics & Tech</span> <span className="text-cyan-500 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
              <Link href="/netrix/space-exploration" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-red-950 hover:border-red-500 transition-all shadow-lg flex justify-between items-center group">
                <span>Off-World Survival</span> <span className="text-red-500 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
              <Link href="/netrix/synth-vr-wing" className="bg-zinc-900 border border-zinc-700 p-6 font-black text-xl uppercase hover:bg-fuchsia-950 hover:border-fuchsia-500 transition-all shadow-lg flex justify-between items-center group">
                <span>Synth & VR Wing</span> <span className="text-fuchsia-500 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
              <div className="p-6 border-2 border-dashed border-zinc-800 text-zinc-600 font-black text-xl uppercase flex justify-between items-center bg-black/50">
                <span>Dark Web Hardware</span> <span className="text-xs tracking-widest text-cyan-700">ENCRYPTED</span>
              </div>
              <div className="p-6 border-2 border-dashed border-zinc-800 text-zinc-600 font-black text-xl uppercase flex justify-between items-center bg-black/50">
                <span>Concierge Desk</span> <span className="text-xs tracking-widest text-yellow-500">OPENING SOON</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}