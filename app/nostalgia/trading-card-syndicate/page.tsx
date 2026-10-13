export default function TradingCardPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-blue-500">The Trading Card Syndicate</h1>
        <p className="text-zinc-400 font-mono mt-3 max-w-xl text-sm">Sealed wax, graded slabs, and raw hits. Exclusive access to Pokémon, MTG, One Piece TCG, and premium sports drops.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="bg-zinc-950 border border-blue-900 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-2">High-Stakes Rip & Ship</h2>
            <p className="text-sm text-zinc-500 mb-4">Live box breaks every Friday night. Secure your spot in the queue.</p>
            <button className="bg-blue-600 text-white text-xs font-mono uppercase px-4 py-2 rounded-lg">View Schedule →</button>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-2">Graded Slab Vault</h2>
            <p className="text-sm text-zinc-500 mb-4">Verified PSA and BGS investments tracked in real-time.</p>
            <button className="bg-zinc-800 text-white text-xs font-mono uppercase px-4 py-2 rounded-lg">Browse Vault →</button>
          </div>
        </div>
      </div>
    </main>
  );
}
