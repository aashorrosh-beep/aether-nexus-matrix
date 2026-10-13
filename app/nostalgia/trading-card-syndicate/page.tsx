const cardInventory = [
  { sku: "TCS-001", name: "2024 Caitlin Clark Rookie Auto", price: "$1,250.00", grade: "PSA 10", tier: "border-blue-400" },
  { sku: "TCS-002", name: "1999 Base Set Charizard Holographic", price: "$8,500.00", grade: "BGS 9.5", tier: "border-amber-400" },
  { sku: "TCS-003", name: "One Piece TCG: Romance Dawn Sealed Box", price: "$350.00", grade: "SEALED", tier: "border-red-500" },
  { sku: "TCS-004", name: "MTG: Revised Edition Booster Pack", price: "$280.00", grade: "SEALED", tier: "border-purple-500" },
  { sku: "TCS-005", name: "2018 Jordan Groshans Bowman Chrome", price: "$145.00", grade: "PSA 10", tier: "border-blue-400" }
];

export default function TradingCardPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-mono">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b-4 border-blue-600 pb-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-800 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            The Trading Card Syndicate
          </h1>
          <p className="text-blue-300 mt-4 max-w-xl text-sm">Encapsulated investments, sealed wax, and high-stakes rips.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {cardInventory.map((item) => (
            <div key={item.sku} className={`bg-black border-2 ${item.tier} rounded-xl p-6 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex flex-col justify-between`}>
              <div>
                <span className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-400">{item.sku}</span>
                <h2 className="text-xl font-bold mt-3 mb-1">{item.name}</h2>
                <span className="text-xs font-bold tracking-widest text-blue-400 bg-blue-900/30 px-2 py-1 rounded">{item.grade}</span>
              </div>
              <div className="mt-8 flex justify-between items-end">
                <span className="text-2xl font-black">{item.price}</span>
                <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase px-4 py-2 rounded">Acquire</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
