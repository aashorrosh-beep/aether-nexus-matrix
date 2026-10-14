import Link from 'next/link';

export default function NexusLobby() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col md:flex-row relative font-sans overflow-hidden">
      
      {/* Left Side - The Matrix */}
      <Link href="/netrix/cyberware-depot" className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen relative group flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-900 overflow-hidden text-center md:text-left md:items-start md:pl-20 lg:pl-32">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-black pointer-events-none"></div>
        <div className="relative z-10 w-full max-w-2xl transform transition-transform duration-700 group-hover:scale-105">
          <span className="text-cyan-500 font-mono text-xs tracking-widest mb-4 inline-block md:block border border-cyan-500/30 px-3 py-1 rounded-full bg-black/50">CONCOURSE 1 • 42 ZONES</span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase text-white leading-none tracking-tighter">
            The<br/><span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">Matrix</span>
          </h1>
          <p className="mt-6 text-zinc-400 max-w-sm text-sm md:text-base mx-auto md:mx-0">Forging the bleeding edge of modern commerce. High-performance gaming hardware, viral squishies, and survival EDC gear.</p>
          
          {/* Cluster Directory */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start opacity-70 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-[10px] font-bold border border-zinc-700 bg-zinc-900/50 px-2 py-1 text-zinc-300">CYBERWARE</span>
            <span className="text-[10px] font-bold border border-zinc-700 bg-zinc-900/50 px-2 py-1 text-zinc-300">VEHICLES</span>
            <span className="text-[10px] font-bold border border-zinc-700 bg-zinc-900/50 px-2 py-1 text-zinc-300">NEO-SQUISH</span>
            <span className="text-[10px] font-bold border border-cyan-800 bg-cyan-900/30 px-2 py-1 text-cyan-400">ORACLE AI</span>
          </div>

          <div className="mt-8 inline-block bg-cyan-500 text-black font-black text-sm uppercase px-8 py-4 hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.2)] rounded-sm">Enter The Matrix →</div>
        </div>
      </Link>

      {/* Right Side - Nostalgia */}
      <Link href="/nostalgia/retro-toy-chest" className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen relative group flex flex-col items-center justify-center overflow-hidden text-center md:text-right md:items-end md:pr-20 lg:pr-32">
        <div className="absolute inset-0 bg-gradient-to-bl from-pink-900/20 to-black pointer-events-none"></div>
        <div className="relative z-10 w-full max-w-2xl transform transition-transform duration-700 group-hover:scale-105 flex flex-col items-center md:items-end">
          <span className="text-pink-500 font-mono text-xs tracking-widest mb-4 inline-block md:block border border-pink-500/30 px-3 py-1 rounded-full bg-black/50">CONCOURSE 2 • 22 ZONES</span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)] leading-none tracking-tighter">
            Nostalgia
          </h1>
          <p className="mt-6 text-zinc-400 max-w-sm text-sm md:text-base mx-auto md:mx-0 text-center md:text-right">The vault of the 80s and 90s melting pot. 22 exclusive storefronts featuring timeless cast iron, vintage trading cards, and Americana.</p>
          
          {/* Cluster Directory */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-end opacity-70 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-[10px] font-bold border border-zinc-700 bg-zinc-900/50 px-2 py-1 text-zinc-300">AMERICANA</span>
            <span className="text-[10px] font-bold border border-zinc-700 bg-zinc-900/50 px-2 py-1 text-zinc-300">ANALOG TECH</span>
            <span className="text-[10px] font-bold border border-zinc-700 bg-zinc-900/50 px-2 py-1 text-zinc-300">RETRO TOYS</span>
            <span className="text-[10px] font-bold border border-pink-800 bg-pink-900/30 px-2 py-1 text-pink-400">ARCHIVIST AI</span>
          </div>

          <div className="mt-8 inline-block bg-pink-600 text-white font-black text-sm uppercase px-8 py-4 hover:bg-pink-500 transition-colors shadow-[0_0_20px_rgba(236,72,153,0.2)] rounded-sm">Explore The Past →</div>
        </div>
      </Link>

      {/* Center ALBS NEXUS Floating Box - Shifted Left & Neon Colored */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-[55%] -translate-y-1/2 z-50 w-[85%] max-w-sm pointer-events-none">
        <div className="bg-black/90 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] text-center">
          
          {/* Neon ALBS */}
          <h2 className="text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] italic">
            ALBS
          </h2>
          
          {/* Neon NEXUS */}
          <h2 className="text-4xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 drop-shadow-[0_0_15px_rgba(252,211,77,0.8)] mt-[-5px]">
            NEXUS
          </h2>
          
          <p className="text-[9px] md:text-xs text-zinc-400 tracking-[0.3em] uppercase mt-4">Where Future & Past Collide</p>
          
          {/* Zapping Line */}
          <div className="relative h-4 w-24 mx-auto my-4 flex items-center justify-center">
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-500 to-transparent"></div>
            <div className="z-10 text-pink-500 text-xs font-black animate-pulse">~⚡~</div>
          </div>
          
          <p className="text-sm font-black text-white uppercase tracking-wider">64 Interactive Hubs</p>
          <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">Live Sourcing & Retail</p>
        </div>
      </div>

    </main>
  );
}
