import Link from "next/link";
export default function NostalgiaConciergePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto bg-zinc-900 p-8 md:p-14 border-t-8 border-red-600 space-y-8">
        <Link href="/" className="text-xs font-mono text-red-400 uppercase">← Return to Aether Nexus</Link>
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic">White-Glove Sourcing</h1>
          <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest">The Lost Edge • Bespoke Curation & Custom Artifacts</p>
        </div>
        <div className="bg-black/60 p-6 border-l-4 border-yellow-500 space-y-2">
          <h3 className="font-black uppercase text-xl text-yellow-400">VIP Procurement & Custom Orders</h3>
          <p className="text-zinc-300 text-sm">Hunting a specific 60s-Y2K grail, PSA 10 slab, custom birthday card, or bespoke apparel? Submit your target specs below and our specialists will source and lock your asset.</p>
        </div>
        <div className="space-y-4">
          <input type="text" placeholder="YOUR NAME" className="bg-black p-4 border border-zinc-700 w-full text-sm font-bold uppercase" />
          <input type="email" placeholder="EMAIL OR PHONE FOR SMS VERIFICATION" className="bg-black p-4 border border-zinc-700 w-full text-sm font-bold uppercase" />
          <textarea rows={4} placeholder="DESCRIBE THE EXACT GRAIL, ERA, OR CUSTOM ITEM YOU NEED..." className="bg-black p-4 border border-zinc-700 w-full text-sm font-bold uppercase"></textarea>
          <button type="button" className="w-full bg-red-600 text-white font-black uppercase tracking-widest p-5 hover:bg-red-500">Submit Procurement Request →</button>
        </div>
      </div>
    </main>
  );
}
