export default function NetrixConciergePage() {
  return (
    <main className="min-h-screen bg-black text-green-500 p-6 md:p-12 font-mono">
      <div className="max-w-4xl mx-auto relative z-10 border border-green-900/50 p-8">
        <h1 className="text-4xl md:text-6xl font-black uppercase text-green-400">Concierge</h1>
        <p className="mt-4 text-green-700 font-bold tracking-widest uppercase">Secure Procurement</p>

        <div className="mt-8 space-y-6 text-green-300">
          <p className="border-l-2 border-green-500 pl-4">Require unauthorized sourcing? Connect your Neural Link.</p>
          <div className="bg-green-950/30 p-6 border border-green-900/50">
            <p> TARGET ACQUIRED: You receive an encrypted comms ping with extraction coordinates.</p>
            <p> ASSET LOCKED: The item is secured for 48 HOURS pending wire transfer.</p>
            <p> RELEASE: Failure to authorize transaction results in public network burn.</p>
          </div>
        </div>
        
        <div className="mt-8">
          <button className="w-full border-2 border-green-500 text-green-500 p-4 hover:bg-green-500 hover:text-black transition-colors font-bold tracking-widest uppercase">
            Initiate Uplink
          </button>
        </div>
      </div>
    </main>
  );
}