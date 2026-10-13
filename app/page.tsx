'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030303] text-white overflow-hidden flex flex-col lg:flex-row font-sans">
      
      {/* CUSTOM CSS FOR THE DRAMATIC BACKGROUND SCENERY */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideLeft { from { transform: translateX(0%); } to { transform: translateX(-50%); } }
        @keyframes slideRight { from { transform: translateX(-50%); } to { transform: translateX(0%); } }
        .marquee-left { animation: slideLeft 40s linear infinite; display: inline-block; white-space: nowrap; }
        .marquee-right { animation: slideRight 40s linear infinite; display: inline-block; white-space: nowrap; }
      `}} />

      {/* BACKGROUND DRAMATIC SCENERY */}
      <div className="absolute inset-0 z-0 pointer-events-none flex flex-col justify-between py-24 opacity-30 mix-blend-screen">
        <div className="overflow-hidden w-[200%]">
          <div className="marquee-left text-cyan-800/40 font-mono text-2xl md:text-4xl tracking-[0.5em] font-black uppercase">
            2045: HOLOGRAPHIC COMMERCE ♦ NEXT-GEN SURVIVAL HARDWARE ♦ NEURAL LINK SYNC ♦ MARS COLONY ROUTE ♦ 2045: HOLOGRAPHIC COMMERCE ♦ NEXT-GEN SURVIVAL HARDWARE ♦ NEURAL LINK SYNC ♦ MARS COLONY ROUTE
          </div>
        </div>
        <div className="overflow-hidden w-[200%] mt-auto">
          <div className="marquee-right text-pink-800/40 font-mono text-2xl md:text-4xl tracking-[0.5em] font-black uppercase">
            1876: THE TELEPHONE ♦ "ROCK AND ROLL IS HERE TO STAY" ♦ 1969: LUNAR LANDING ♦ THE GOLDEN AGE OF RADIO ♦ 1876: THE TELEPHONE ♦ "ROCK AND ROLL IS HERE TO STAY" ♦ 1969: LUNAR LANDING ♦ THE GOLDEN AGE OF RADIO
          </div>
        </div>
      </div>

      {/* MOBILE BRANDING (Shows only on phones, sits at the top) */}
      <div className="lg:hidden w-full pt-12 pb-4 flex justify-center z-30 relative bg-gradient-to-b from-black via-black/80 to-transparent">
        <div className="text-center">
          <h2 className="text-4xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">ALBS NEXUS</h2>
          <p className="text-[8px] font-mono tracking-[0.3em] text-zinc-400 uppercase">Where Future & Past Collide</p>
        </div>
      </div>

      {/* THE MATRIX (Left Side) */}
      <div className="relative w-full lg:w-1/2 min-h-[45vh] lg:min-h-screen flex flex-col justify-center p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10 group hover:bg-cyan-950/20 transition-colors duration-700 z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-black z-0 pointer-events-none"></div>
        <div className="relative z-10 w-full max-w-lg mx-auto lg:ml-auto lg:mr-16">
          <div className="text-cyan-500 font-mono text-[10px] tracking-widest uppercase mb-4 border border-cyan-500/30 inline-block px-3 py-1 rounded-full bg-cyan-950/50 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            CONCOURSE 1 • THE 40 ROOMS
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400 drop-shadow-lg">
            THE MATRIX
          </h1>
          <p className="text-zinc-300 text-sm lg:text-base mb-8 leading-relaxed max-w-sm drop-shadow-md">
            Forging the bleeding edge of modern commerce. High-performance gaming hardware, viral squishies, and survival EDC gear.
          </p>
          <Link href="/matrix" className="inline-block bg-cyan-600 hover:bg-cyan-500 text-black font-black tracking-[0.2em] text-sm px-8 py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] hover:-translate-y-1">
            ENTER THE MATRIX ➔
          </Link>
        </div>
      </div>

      {/* NOSTALGIA (Right Side) */}
      <div className="relative w-full lg:w-1/2 min-h-[45vh] lg:min-h-screen flex flex-col justify-center p-8 lg:p-16 group hover:bg-pink-950/20 transition-colors duration-700 z-20">
        <div className="absolute inset-0 bg-gradient-to-bl from-pink-900/20 to-black z-0 pointer-events-none"></div>
        <div className="relative z-10 w-full max-w-lg mx-auto lg:mr-auto lg:ml-16">
          <div className="text-pink-500 font-mono text-[10px] tracking-widest uppercase mb-4 border border-pink-500/30 inline-block px-3 py-1 rounded-full bg-pink-950/50 backdrop-blur-sm shadow-[0_0_15px_rgba(236,72,153,0.2)]">
            CONCOURSE 2 • THE 20 ROOMS
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-400 drop-shadow-lg">
            NOSTALGIA
          </h1>
          <p className="text-zinc-300 text-sm lg:text-base mb-8 leading-relaxed max-w-sm drop-shadow-md">
            A curated vault of the 80s and 90s melting pot. 20 exclusive rooms featuring timeless cast iron, vintage trading cards, and Americana.
          </p>
          <Link href="/nostalgia" className="inline-block bg-pink-600 hover:bg-pink-500 text-white font-black tracking-[0.2em] text-sm px-8 py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] hover:-translate-y-1">
            EXPLORE THE PAST ➔
          </Link>
        </div>
      </div>

      {/* DESKTOP BRANDING (Shows only on laptops, perfectly centered) */}
      <div className="hidden lg:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex-col items-center pointer-events-none w-full max-w-[400px]">
        <div className="bg-black/70 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center w-full">
          <h2 className="text-5xl font-black tracking-tighter text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">ALBS NEXUS</h2>
          <p className="text-[10px] font-mono tracking-[0.4em] text-zinc-400 uppercase mb-8">
            Where Future & Past Collide
          </p>
          <div className="h-px w-20 bg-gradient-to-r from-cyan-500 via-white to-pink-500 mx-auto mb-8 opacity-50"></div>
          <p className="text-xs font-black tracking-widest uppercase text-white leading-relaxed">
            60 Exclusive Storefronts.<br/>
            <span className="text-zinc-500 font-bold">Zero Middlemen.</span>
          </p>
        </div>
      </div>

    </main>
  );
}
