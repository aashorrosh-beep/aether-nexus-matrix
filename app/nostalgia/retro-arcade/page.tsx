const arcadeInventory = [
  { sku: "ARC-001", name: "Original Pac-Man Cabinet", price: "$2,450.00", type: "CABINET", style: "border-fuchsia-500" },
  { sku: "ARC-002", name: "Neo Geo MVS 4-Slot", price: "$1,200.00", type: "CABINET", style: "border-fuchsia-400" },
  { sku: "ARC-003", name: "Street Fighter II JAMMA PCB", price: "$350.00", type: "PCB", style: "border-purple-500" },
  { sku: "ARC-004", name: "Suzo Happ Arcade Buttons (Set of 8)", price: "$24.00", type: "PARTS", style: "border-zinc-500" },
  { sku: "ARC-005", name: "Coin-Op Token Dispenser", price: "$180.00", type: "HARDWARE", style: "border-purple-600" }
];

export default function RetroArcadePage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 font-mono">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b-4 border-fuchsia-600 pb-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-fuchsia-500 drop-shadow-[0_0_15px_rgba(217,70,239,0.8)]">Retro Arcade</h1>
          <p className="mt-4 text-fuchsia-300">Restored cabinets, JAMMA PCBs, and CRT monitors.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {arcadeInventory.map((item) => (
            <div key={item.sku} className={`bg-zinc-950 border-2 ${item.style} p-6 rounded-xl hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all flex flex-col justify-between`}>
              <div>
                <span className="text-xs bg-fuchsia-900/50 text-fuchsia-300 px-2 py-1 rounded">{item.type}</span>
                <h2 className="text-xl font-bold mt-3">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-end">
                <span className="text-2xl font-black">{item.price}</span>
                <button className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold uppercase px-4 py-2 rounded">Insert Coin</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
