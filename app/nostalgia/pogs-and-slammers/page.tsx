const pogInventory = [
  { sku: "POG-001", name: "Heavy Metal 8-Ball Slammer", price: "$25.00", style: "border-black" },
  { sku: "POG-002", name: "Complete Apollo 13 Pog Set", price: "$45.00", style: "border-blue-900" },
  { sku: "POG-003", name: "Poison Holographic Slammer (Gold)", price: "$35.00", style: "border-yellow-500" },
  { sku: "POG-004", name: "Clear Plastic Pog Storage Tube", price: "$8.00", style: "border-zinc-400" },
  { sku: "POG-005", name: "Random Assorted Milk Caps (100 Lot)", price: "$20.00", style: "border-red-600" }
];

export default function PogsPage() {
  return (
    <main className="min-h-screen bg-yellow-400 text-black p-6 md:p-12 font-black">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b-8 border-red-600 pb-6 text-center">
          <h1 className="text-5xl md:text-8xl uppercase text-red-600 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">Pogs & Slammers</h1>
          <p className="mt-6 text-black uppercase tracking-widest text-xl">Heavy metal slammers and complete cardboard sets.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {pogInventory.map((item) => (
            <div key={item.sku} className={`bg-white border-8 ${item.style} p-8 rounded-full aspect-square flex flex-col justify-center items-center text-center shadow-[10px_10px_0_rgba(0,0,0,0.2)] hover:rotate-12 transition-transform`}>
              <h2 className="text-xl leading-tight">{item.name}</h2>
              <div className="mt-6">
                <span className="text-3xl text-red-600 block mb-2">{item.price}</span>
                <button className="bg-black hover:bg-zinc-800 text-yellow-400 text-xs uppercase px-6 py-3 rounded-full">Play for Keeps</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
