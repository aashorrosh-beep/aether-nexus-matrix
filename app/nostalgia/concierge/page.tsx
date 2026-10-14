export default function NostalgiaConciergePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-mono">
      <div className="max-w-4xl mx-auto space-y-8 bg-zinc-900 p-8 md:p-12 border-4 border-amber-500 shadow-[10px_10px_0_rgba(245,158,11,0.2)]">
        <div className="border-b-2 border-amber-500/50 pb-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase text-amber-500">The Archivist AI</h1>
          <p className="mt-4 text-zinc-400 font-bold tracking-widest">Bespoke Nostalgia Sourcing Service</p>
        </div>
        <div className="space-y-6 text-zinc-300">
          <p className="text-lg border-l-4 border-amber-500 pl-4">Looking for a specific childhood oddity, graded comic, or rare 90s collectible? Submit your bounty request below. Our AI network will scour private vaults and secondary markets to locate it.</p>
          <ul className="bg-black p-6 rounded space-y-4 text-sm font-bold">
            <li className="flex gap-3"><span className="text-amber-500">[1]</span> We locate your exact requested item.</li>
            <li className="flex gap-3"><span className="text-amber-500">[2]</span> You receive an email with the condition, photos, and secured pricing.</li>
            <li className="flex gap-3"><span className="text-amber-500">[3]</span> A strict 48-HOUR HOLD is placed on the item. If you do not claim it, it is released to the public floor.</li>
          </ul>
        </div>
        <div className="mt-8">
          <button className="w-full bg-amber-600 hover:bg-amber-500 text-black font-black text-xl uppercase py-4">Initialize Search Protocol</button>
        </div>
      </div>
    </main>
  );
}
