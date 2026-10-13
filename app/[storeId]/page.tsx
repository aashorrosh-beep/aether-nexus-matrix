"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row relative z-10 font-sans text-white">
      
      {/* THE MATRIX - CONCOURSE 1 (Left Side) */}
      <div className="flex-1 flex flex-col justify-center px-10 md:px-20 relative border-r border-cyan-900/30">
        <div className="max-w-xl z-10">
          <p className="text-cyan-400 font-mono text-sm tracking-[0.3em] mb-4">◆ THE FUTURE • CONCOURSE 1</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white drop-shadow-[0_0_15px_rgba(103,232,249,0.5)]">
            THE MATRIX
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12 max-w-md">
            Forging the bleeding edge of commerce. High-performance hardware, next-gen tech, and elite survival EDC.
          </p>
          
          {/* THE MATRIX ANCHOR WITH CONFIRMATION */}
          <Link 
            href="/matrix"
            onClick={(e) => {
              if (!window.confirm("SYSTEM OVERRIDE: Enter Concourse 1 (The Future)?")) e.preventDefault();
            }}
            className="group relative px-8 py-4 bg-cyan-500 text-black font-bold tracking-widest text-sm hover:bg-cyan-400 transition-all duration-300 rounded-sm overflow-hidden flex items-center gap-3 w-fit"
          >
            <span className="relative z-10">ENTER THE FUTURE</span>
            <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          </Link>
        </div>
      </div>

      {/* NOSTALGIA - CONCOURSE 2 (Right Side) */}
      <div className="flex-1 flex flex-col justify-center items-end text-right px-10 md:px-20 relative">
        <div className="max-w-xl z-10 flex flex-col items-end">
          <p className="text-[#fca5a5] font-mono text-sm tracking-[0.3em] mb-4">AMERICAN HERITAGE • CONCOURSE 2 ◆</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white drop-shadow-[0_0_15px_rgba(225,29,72,0.5)]">
            NOSTALGIA
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12 max-w-md">
            Rooted in the grit of the melting pot. 20 vintage storefronts featuring timeless hardware, raw Americana, and proud traditions.
          </p>
          
          {/* THE NOSTALGIA ANCHOR WITH CONFIRMATION */}
          <Link 
            href="/nostalgia"
            onClick={(e) => {
              if (!window.confirm("SYSTEM OVERRIDE: Enter Concourse 2 (The Past)?")) e.preventDefault();
            }}
            className="group relative px-8 py-4 bg-[#e11d48] text-white font-bold tracking-widest text-sm hover:bg-[#be123c] transition-all duration-300 rounded-sm overflow-hidden flex items-center gap-3 w-fit"
          >
            <span className="relative z-10">ENTER THE PAST</span>
            <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          </Link>
        </div>
      </div>

      {/* THE CENTER NEXUS HUB (Floating over the split) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-md pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl text-center shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <p className="text-green-500 font-mono text-xs tracking-widest mb-2">THE NEXT AMERICAN ERA</p>
          <h2 className="text-5xl md:text-7xl font-black tracking-widest text-white/90 mb-4">NEXUS</h2>
          <p className="text-cyan-400 font-mono text-[0.65rem] tracking-[0.4em] mb-8 uppercase">Where the future and past collide</p>
          <div className="border-t border-white/10 pt-6">
            <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">60 Exclusive Storefronts.</p>
            <p className="text-gray-500 text-xs font-mono tracking-widest mt-2 uppercase">Priority Shipping. Zero Middlemen.</p>
          </div>
        </div>
      </div>

    </main>
  );
}