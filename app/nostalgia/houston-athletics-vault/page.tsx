const athleticsInventory = [
  { sku: "HAV-001", name: "1994 Houston Rockets Championship Snapback", price: "$120.00", type: "DEADSTOCK", color: "border-red-600" },
  { sku: "HAV-002", name: "Authentic Astrodome Plastic Stadium Seat", price: "$450.00", type: "RELIC", color: "border-orange-500" },
  { sku: "HAV-003", name: "90s Astros Navy/Gold Star Starter Jacket", price: "$275.00", type: "VINTAGE", color: "border-amber-500" },
  { sku: "HAV-004", name: "1995 World Series Commemorative Ticket", price: "$85.00", type: "MEMORABILIA", color: "border-orange-500" },
  { sku: "HAV-005", name: "Game-Worn Minor League Cleats (Cleburne)", price: "$195.00", type: "RELIC", color: "border-red-600" }
];

export default function AthleticsVaultPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-l-8 border-orange-600 pl-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-orange-500">
            Houston Athletics Vault
          </h1>
          <p className="text-zinc-400 font-mono mt-3 max-w-xl text-sm uppercase tracking-widest">Archival Stadium Relics & Golden Era Deadstock</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {athleticsInventory.map((item) => (
            <div key={item.sku} className={`bg-zinc-900 border-t-4 ${item.color} p-6 flex flex-col justify-between shadow-lg`}>
              <div>
                <span className="text-xs font-black text-orange-500 tracking-widest">{item.type}</span>
                <h2 className="text-xl font-bold mt-2">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <span className="text-2xl font-black font-mono">{item.price}</span>
                <button className="bg-orange-600 hover:bg-orange-500 text-black font-bold text-xs uppercase px-4 py-2">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
