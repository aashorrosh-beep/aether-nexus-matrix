export default function NostalgiaConciergePage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 shadow-2xl border-t-8 border-red-600">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">White-Glove Sourcing</h1>
          <p className="text-xl font-mono text-zinc-500 uppercase tracking-widest">Bespoke Curation • Custom Artifacts</p>
        </div>

        <div className="mt-12 space-y-8">
          <div className="bg-zinc-100 p-6 border-l-4 border-yellow-500">
            <h3 className="font-black uppercase text-xl mb-2">The Lost Edge Services</h3>
            <p className="text-zinc-600">Looking for a specific 1980s pop-culture grail? Need a custom-designed retro birthday card, bespoke apparel, or authentic decade decor? Our procurement specialists locate the impossible.</p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="YOUR NAME" className="bg-zinc-100 p-4 border border-zinc-300 w-full uppercase font-bold text-sm focus:outline-none focus:border-red-500" />
              <input type="email" placeholder="EMAIL ADDRESS" className="bg-zinc-100 p-4 border border-zinc-300 w-full uppercase font-bold text-sm focus:outline-none focus:border-red-500" />
            </div>
            <textarea rows={4} placeholder="DESCRIBE THE ASSET OR CUSTOM PROJECT YOU REQUIRE..." className="bg-zinc-100 p-4 border border-zinc-300 w-full uppercase font-bold text-sm focus:outline-none focus:border-red-500"></textarea>
            
            <button type="button" className="w-full bg-red-600 text-white font-black uppercase tracking-widest p-6 hover:bg-black transition-colors text-lg shadow-lg">
              Submit Procurement Request →
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}