const techInventory = [
  { sku: "Y2K-001", name: "Apple iMac G3 (Bondi Blue)", price: "$450.00", format: "DESKTOP", style: "border-cyan-500" },
  { sku: "Y2K-002", name: "Sony Walkman NW-MS70D", price: "$220.00", format: "AUDIO", style: "border-zinc-400" },
  { sku: "Y2K-003", name: "Motorola RAZR V3 (Silver)", price: "$150.00", format: "MOBILE", style: "border-zinc-300" },
  { sku: "Y2K-004", name: "Nintendo Game Boy Advance (Glacier)", price: "$180.00", format: "HANDHELD", style: "border-blue-400" },
  { sku: "Y2K-005", name: "Iomega Zip Drive 100MB", price: "$65.00", format: "STORAGE", style: "border-indigo-400" }
];

export default function Y2KTechPage() {
  return (
    <main className="min-h-screen bg-zinc-200 text-black p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b-2 border-cyan-300 pb-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-blue-600 drop-shadow-sm">Y2K Tech Boutique</h1>
          <p className="mt-4 text-zinc-600 font-medium">Translucent plastics, early MP3 players, and flip phones.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {techInventory.map((item) => (
            <div key={item.sku} className={`bg-white/80 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${item.style} p-6 rounded-2xl flex flex-col justify-between`}>
              <div>
                <span className="text-[10px] font-bold bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full">{item.format}</span>
                <h2 className="text-xl font-bold mt-3 text-zinc-800">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center border-t border-zinc-100 pt-4">
                <span className="text-2xl font-black text-blue-600">{item.price}</span>
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase px-5 py-2 rounded-full transition-colors">Purchase</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
