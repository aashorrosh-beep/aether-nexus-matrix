const inventory = [
  { upc: "VNL-101", name: "Fleetwood Mac - Rumours (1977)", price: "$65.00", color: "border-emerald-500" },
  { upc: "APP-301", name: "Vintage 1980s Neon Windbreaker", price: "$85.00", color: "border-fuchsia-500" },
  { upc: "CST-401", name: "Authentic 1960s Mod Go-Go Dress", price: "$75.00", color: "border-pink-300" }
];

export default function ThreadsAndTracksPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">Threads & Tracks</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {inventory.map((item) => (
            <div key={item.upc} className={`bg-zinc-950 border rounded-2xl p-6 flex flex-col justify-between ${item.color}`}>
              <h2 className="text-xl font-bold mb-2">{item.name}</h2>
              <div className="mt-8 flex justify-between items-center">
                <span className="text-2xl font-black font-mono">{item.price}</span>
                <button className="bg-zinc-800 text-xs font-mono uppercase px-4 py-2 rounded-lg">Buy →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
