"use client";

import Link from 'next/link';

export default function NostalgiaConcourse() {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden relative">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#4c0519_0%,transparent_70%)] opacity-40 pointer-events-none"></div>
      
      <div className="w-full bg-[#e11d48] text-white text-xs md:text-sm font-bold tracking-[0.2em] uppercase py-2 flex justify-center items-center gap-4 relative z-10 shadow-[0_0_15px_rgba(225,29,72,0.6)]">
        <span className="animate-pulse">🔴 LIVE</span>
        <span>#1 TRENDING HERITAGE MARKET IN THE US</span>
        <span>|</span>
        <span>NEXT ALGORITHM RESET: 10:00 PM</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative z-10 border-b border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <p className="text-[#fca5a5] font-mono text-sm tracking-[0.3em] mb-2">◆ CONCOURSE 2: AMERICAN HERITAGE</p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(225,29,72,0.4)]">
              NOSTALGIA
            </h1>
            <p className="text-gray-400 mt-4 max-w-xl text-lg">
              20 exclusive storefronts rooted in the grit of the melting pot. Timeless hardware, cast iron traditions, and raw Americana.
            </p>
          </div>
          
          <Link href="/" className="px-6 py-3 border border-white/20 text-xs font-bold tracking-widest hover:bg-white/10 transition-colors rounded-sm uppercase">
            ← Return to Lobby
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-widest uppercase">Live Storefronts</h2>
          <p className="text-sm font-mono text-[#fca5a5]">DISPLAYING TOP 10 OF 20</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Link href="/nostalgia/cast-iron" className="group relative h-80 bg-black border border-white/10 overflow-hidden flex flex-col justify-end p-6 hover:border-[#e11d48] transition-colors">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584947936665-2766323bc068?q=80&w=600')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity grayscale group-hover:grayscale-0"></div>
            <div className="absolute top-4 right-4 bg-[#e11d48] text-white text-[10px] font-bold px-3 py-1 tracking-widest">VIRAL TIER</div>
            <div className="relative z-10">
              <p className="text-xs font-mono text-gray-300 mb-1 tracking-widest">STORE 01</p>
              <h3 className="text-2xl font-bold tracking-tight mb-2">Heritage Ironworks</h3>
              <p className="text-sm text-gray-400">Generational cast iron, seasoned for the modern kitchen.</p>
            </div>
          </Link>

          <Link href="/nostalgia/cards" className="group relative h-80 bg-black border border-white/10 overflow-hidden flex flex-col justify-end p-6 hover:border-[#e11d48] transition-colors">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620072559593-3765e90a59a7?q=80&w=600')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity grayscale group-hover:grayscale-0"></div>
            <div className="absolute top-4 right-4 bg-yellow-500 text-black text-[10px] font-bold px-3 py-1 tracking-widest">HIGH DEMAND</div>
            <div className="relative z-10">
              <p className="text-xs font-mono text-gray-300 mb-1 tracking-widest">STORE 02</p>
              <h3 className="text-2xl font-bold tracking-tight mb-2">The Vault: Trading Cards</h3>
              <p className="text-sm text-gray-400">Exclusive sports prospects, MTG, and TCG collector assets.</p>
            </div>
          </Link>

           <Link href="/nostalgia/audio" className="group relative h-80 bg-black border border-white/10 overflow-hidden flex flex-col justify-end p-6 hover:border-[#e11d48] transition-colors">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546707246-8646b9c91629?q=80&w=600')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity grayscale group-hover:grayscale-0"></div>
            <div className="relative z-10">
              <p className="text-xs font-mono text-gray-300 mb-1 tracking-widest">STORE 03</p>
              <h3 className="text-2xl font-bold tracking-tight mb-2">Analog Acoustics</h3>
              <p className="text-sm text-gray-400">High-fidelity vinyl, tubes, and golden age broadcast gear.</p>
            </div>
          </Link>

        </div>
      </div>
    </main>
  );
}