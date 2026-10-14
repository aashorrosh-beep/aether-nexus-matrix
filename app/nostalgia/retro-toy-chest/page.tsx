const toyInventory = [
  { sku: "TOY-001", name: "Original 1990 Stretch Armstrong (CIB)", price: "$150.00", type: "VINTAGE", style: "border-red-500" },
  { sku: "TOY-002", name: "90s Water Wiggler / Squish Tube", price: "$12.00", type: "SQUISH", style: "border-blue-400" },
  { sku: "TOY-003", name: "Y2K Mystery Blind Box Capsule", price: "$25.00", type: "MYSTERY", style: "border-purple-500" },
  { sku: "TOY-004", name: "Neon Koosh Ball (Classic)", price: "$15.00", type: "TACTILE", style: "border-green-400" },
  { sku: "TOY-005", name: "Sticky Hands Vending Capsules (5-Pack)", price: "$10.00", type: "NOVELTY", style: "border-yellow-400" }
];

export default function RetroToyChestPage() {
  return (
    <main className="min-h-screen bg-indigo-950 text-white p-6 md:p-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b-8 border-dashed border-pink-500 pb-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-cyan-400 drop-shadow-[4px_4px_0_rgba(236,72,153,1)] rotate-[-2deg]">Retro Toy Chest</h1>
          <p className="mt-4 text-yellow-300 font-bold uppercase tracking-widest text-lg">Stretch, squish, and blind box flashbacks.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {toyInventory.map((item) => (
            <div key={item.sku} className={`bg-indigo-900 border-4 ${item.style} p-6 rounded-3xl flex flex-col justify-between shadow-[8px_8px_0_rgba(0,0,0,0.5)]`}>
              <div>
                <span className="text-[10px] font-black bg-yellow-400 text-black px-3 py-1 rounded-full uppercase">{item.type}</span>
                <h2 className="text-xl font-black mt-4 text-white">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center bg-black/30 p-3 rounded-xl">
                <span className="text-2xl font-black text-green-400">{item.price}</span>
                <button className="bg-pink-500 hover:bg-pink-400 text-white font-black text-xs uppercase px-5 py-2 rounded-full border-2 border-white">Unbox</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
