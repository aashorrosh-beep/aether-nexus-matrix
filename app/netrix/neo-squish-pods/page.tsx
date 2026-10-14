const neoSquishInventory = [
  { sku: "NSQ-001", name: "Smart Magnetic Putty", price: "$22.00", style: "border-blue-500", tag: "COMPOUND" },
  { sku: "NSQ-002", name: "Designer Vinyl Blind Box", price: "$35.00", style: "border-purple-500", tag: "MYSTERY" },
  { sku: "NSQ-003", name: "Nano-Kinetic Sand", price: "$18.00", style: "border-green-400", tag: "TACTILE" },
  { sku: "NSQ-004", name: "Silicone Fidget Matrix", price: "$24.00", style: "border-zinc-500", tag: "SENSORY" },
  { sku: "NSQ-005", name: "Gacha Hologram Pod", price: "$15.00", style: "border-cyan-400", tag: "BLIND POD" }
];

export default function NeoSquishPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-5xl font-black uppercase text-cyan-300">Neo-Squish & Mystery Pods</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {neoSquishInventory.map((item) => (
            <div key={item.sku} className={`bg-zinc-900 border-2 ${item.style} p-6 rounded-2xl flex flex-col justify-between`}>
              <h2 className="text-xl font-bold">{item.name}</h2>
              <div className="mt-8 flex justify-between items-center">
                <span className="text-2xl font-black">{item.price}</span>
                <button className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-full text-xs font-black uppercase transition-colors">Acquire</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
