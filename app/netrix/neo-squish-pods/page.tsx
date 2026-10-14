const neoSquishInventory = [
  { sku: "NSQ-001", name: "Smart Magnetic Putty (Cobalt)", price: "$22.00", style: "border-blue-500", tag: "COMPOUND" },
  { sku: "NSQ-002", name: "Designer Vinyl Art Toy (Series 4 Blind Box)", price: "$35.00", style: "border-purple-500", tag: "MYSTERY" },
  { sku: "NSQ-003", name: "Nano-Kinetic Sand (Glow Edition)", price: "$18.00", style: "border-green-400", tag: "TACTILE" },
  { sku: "NSQ-004", name: "Silicone Fidget Matrix (Carbon Black)", price: "$24.00", style: "border-zinc-500", tag: "SENSORY" },
  { sku: "NSQ-005", name: "Gacha Hologram Pod (Random Drop)", price: "$15.00", style: "border-cyan-400", tag: "BLIND POD" }
];

export default function NeoSquishPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 p-1 rounded-3xl">
          <div className="bg-black p-8 rounded-[22px] text-center">
            <h1 className="text-5xl md:text-7xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Neo-Squish & Mystery Pods</h1>
            <p className="mt-4 text-zinc-400 font-bold uppercase tracking-widest">Smart compounds, designer vinyl, and sealed digital drops.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {neoSquishInventory.map((item) => (
            <div key={item.sku} className={`bg-zinc-900 border-2 ${item.style} p-6 rounded-2xl flex flex-col justify-between hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-shadow`}>
              <div>
                <span className="text-[10px] font-black bg-zinc-800 text-white px-3 py-1 rounded-full uppercase tracking-wider">{item.tag}</span>
                <h2 className="text-xl font-bold mt-4 leading-tight">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <span className="text-2xl font-black text-white">{item.price}</span>
                <button className="bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase px-5 py-2 rounded-full">Acquire</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
