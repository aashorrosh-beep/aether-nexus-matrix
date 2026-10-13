const candyInventory = [
  { sku: "CND-001", name: "Dunkaroos (Vanilla with Rainbow Sprinkles)", price: "$12.00", type: "SNACK", style: "border-cyan-400" },
  { sku: "CND-002", name: "French Toast Crunch (Retro Box)", price: "$8.50", type: "CEREAL", style: "border-red-500" },
  { sku: "CND-003", name: "Surge Energy Soda (6-Pack)", price: "$24.00", type: "BEVERAGE", style: "border-green-500" },
  { sku: "CND-004", name: "Ouch! Bubble Gum Tin", price: "$15.00", type: "CANDY", style: "border-pink-500" },
  { sku: "CND-005", name: "Warheads Extreme Sour Minis", price: "$4.00", type: "CANDY", style: "border-yellow-400" }
];

export default function CandyShopPage() {
  return (
    <main className="min-h-screen bg-pink-400 text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b-4 border-white pb-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-white drop-shadow-[0_4px_4px_rgba(219,39,119,0.8)]">Nostalgic Candy Shop</h1>
          <p className="mt-4 text-pink-900 font-bold text-lg">Discontinued flavors, retro wrappers, and imported sugar.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {candyInventory.map((item) => (
            <div key={item.sku} className={`bg-white text-black border-4 ${item.style} p-6 rounded-3xl flex flex-col justify-between shadow-lg`}>
              <div>
                <span className="text-[10px] font-bold bg-pink-100 text-pink-800 px-3 py-1 rounded-full uppercase tracking-wider">{item.type}</span>
                <h2 className="text-xl font-black mt-3">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <span className="text-2xl font-black text-pink-600">{item.price}</span>
                <button className="bg-cyan-400 hover:bg-cyan-300 text-black font-black text-xs uppercase px-5 py-2 rounded-full">Add to Bag</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
