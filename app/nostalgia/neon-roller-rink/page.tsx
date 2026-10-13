const skateInventory = [
  { sku: "RNK-001", name: "Chicago Quad Roller Skates (Neon Pink)", price: "$120.00", style: "border-pink-500" },
  { sku: "RNK-002", name: "Glow Stick Bundles (100 Count)", price: "$15.00", style: "border-green-400" },
  { sku: "RNK-003", name: "Vintage 1990s Rink Carpet Square (Framed)", price: "$45.00", style: "border-purple-500" },
  { sku: "RNK-004", name: "Oversized Fuzzy Dice (Neon Green)", price: "$12.00", style: "border-green-500" },
  { sku: "RNK-005", name: "Light-Up Urethane Wheels (Set of 8)", price: "$45.00", style: "border-pink-400" }
];

export default function RollerRinkPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 font-sans overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-black to-black pointer-events-none"></div>
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="border-b-4 border-pink-600 pb-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,1)] skew-x-[-10deg]">Neon Roller Rink</h1>
          <p className="mt-4 text-pink-200 uppercase tracking-widest skew-x-[-10deg]">Quad skates, glow sticks, and synthetic carpets.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {skateInventory.map((item) => (
            <div key={item.sku} className={`bg-black/50 backdrop-blur border-2 ${item.style} p-6 rounded-xl shadow-[0_0_15px_rgba(236,72,153,0.3)] flex flex-col justify-between hover:scale-105 transition-transform`}>
              <div>
                <span className="text-[10px] text-pink-400 tracking-widest uppercase">{item.sku}</span>
                <h2 className="text-xl font-bold mt-2 text-white">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center border-t border-pink-900/50 pt-4">
                <span className="text-2xl font-black text-pink-400">{item.price}</span>
                <button className="bg-pink-600 hover:bg-pink-500 text-white font-black text-xs uppercase px-4 py-2 rounded-full">Lace Up</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
