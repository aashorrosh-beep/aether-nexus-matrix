'use client';
import Link from 'next/link';

export default function MatrixDirectory() {
  const stores = [
    { id: '1001', name: "Apex Athletics", category: "PERFORMANCE & RECOVERY", status: "OPEN" },
    { id: '1004', name: "Tactical & Urban EDC", category: "SURVIVAL HARDWARE", status: "🔥 #1 TRENDING" },
    { id: '1007', name: "Vault 77", category: "SECURED ASSETS", status: "OPEN" },
    { id: '1042', name: "Surprise Crates & Squishies", category: "SENSORY & PLUSH", status: "✨ VIRAL TIER" }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="text-zinc-500 hover:text-cyan-400 text-xs font-black tracking-[0.2em] uppercase transition-colors flex items-center gap-2 w-fit bg-zinc-900/50 px-4 py-2 rounded-full border border-white/5">
            ← RETURN TO GRAND LOBBY
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Room 1004 Hero */}
          <Link href="/matrix/room-1004" className="block border border-cyan-500/30 bg-black p-8 rounded-2xl hover:border-cyan-400 transition-all group shadow-[0_0_20px_rgba(6,182,212,0.1)]">
            <div className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-md inline-block mb-6 uppercase tracking-widest">🏆 #1 Global Market Trend</div>
            <div className="text-cyan-500 font-mono text-sm mb-2 font-bold">ROOM 1004</div>
            <h2 className="text-4xl font-black mb-4 uppercase group-hover:text-cyan-400 transition-colors">Tactical & Urban EDC</h2>
            <p className="text-zinc-400 font-mono text-sm mb-8">Premium Survival Hardware • High Margin Yield</p>
            <div className="text-cyan-400 font-black text-sm tracking-widest uppercase flex items-center gap-2">
              Enter Market Leader <span className="group-hover:translate-x-1.5 transition-transform text-lg">➔</span>
            </div>
          </Link>

          {/* Room 1042 Hero */}
          <Link href="/matrix/room-1042" className="block border border-purple-500/30 bg-black p-8 rounded-2xl hover:border-purple-400 transition-all group shadow-[0_0_20px_rgba(168,85,247,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] pointer-events-none"></div>
            <div className="bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-md inline-block mb-6 uppercase tracking-widest flex items-center gap-2 w-fit">
              <span>📈</span> Fastest Growing Volume
            </div>
            <div className="text-purple-400 font-mono text-sm mb-2 font-bold">ROOM 1042</div>
            <h2 className="text-4xl font-black mb-4 uppercase group-hover:text-purple-400 transition-colors">Surprise Crates</h2>
            <p className="text-zinc-400 font-mono text-sm mb-8">Viral Mochi Squishies • High Social Engagement</p>
            <div className="text-purple-400 font-black text-sm tracking-widest uppercase flex items-center gap-2 relative z-10">
              Enter Breakout Store <span className="group-hover:translate-x-1.5 transition-transform text-lg">➔</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
