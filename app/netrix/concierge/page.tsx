export default function NetrixConciergePage() {
  return (
    <main className="min-h-screen bg-black text-green-500 p-6 md:p-12 font-mono relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 border border-green-500/30 bg-black/80 backdrop-blur p-8 md:p-12">
        <h1 className="text-4xl md:text-6xl font-black uppercase text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">The Oracle AI</h1>
        <p className="mt-4 text-green-700 font-bold tracking-widest uppercase">Global Procurement Node</p>
        
        <div className="mt-8 space-y-6 text-green-300">
          <p className="border-l-2 border-green-500 pl-4">Require unauthorized tech, sold-out cyberware, or specific crypto-hardware? Submit your target payload. Our scraper drones will locate the asset globally.</p>
          <div className="bg-green-950/30 p-6 border border-green-900/50 space-y-4 text-sm font-bold">
            <p>> TARGET ACQUIRED: You receive an encrypted comms ping with pricing data.</p>
            <p>> ASSET LOCKED: The item is secured for 48 HOURS pending your authorization.</p>
            <p>> RELEASE: Failure to authorize transaction results in public floor release.</p>
          </div>
        </div>
        <div className="mt-8">
          <button className="w-full border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-black text-xl uppercase py-4 transition-colors">Deploy Scraper Drone</button>
        </div>
      </div>
    </main>
  );
}
