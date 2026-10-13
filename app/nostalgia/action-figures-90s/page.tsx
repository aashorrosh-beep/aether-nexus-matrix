const figureInventory = [
  { sku: "FIG-001", name: "TMNT 1989 Party Wagon (In Box)", price: "$550.00", line: "PLAYMATES", style: "border-green-500" },
  { sku: "FIG-002", name: "X-Men Wolverine (Tiger Stripe) MOC", price: "$120.00", line: "TOYBIZ", style: "border-yellow-400" },
  { sku: "FIG-003", name: "Mighty Morphin Green Ranger (Auto)", price: "$850.00", line: "BANDAI", style: "border-green-600" },
  { sku: "FIG-004", name: "Batman Animated Series Batmobile", price: "$300.00", line: "KENNER", style: "border-zinc-800" },
  { sku: "FIG-005", name: "Biker Mice from Mars - Throttle", price: "$85.00", line: "GALOOB", style: "border-red-500" }
];

export default function ActionFiguresPage() {
  return (
    <main className="min-h-screen bg-blue-900 text-white p-6 md:p-12 font-bold">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="bg-red-600 p-6 rounded-t-2xl border-b-8 border-yellow-400 shadow-xl">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-yellow-300 transform -skew-x-6">90s Action Figures</h1>
          <p className="mt-4 text-white transform -skew-x-6">Mint on card. Sealed cases. Exclusive mail-aways.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {figureInventory.map((item) => (
            <div key={item.sku} className={`bg-white text-black border-4 ${item.style} p-6 rounded-lg flex flex-col justify-between relative overflow-hidden`}>
              <div className="absolute top-0 right-0 bg-black text-white text-[10px] px-2 py-1 rounded-bl-lg">PEG: {item.sku}</div>
              <div>
                <span className="text-xs font-black text-blue-700 tracking-widest">{item.line}</span>
                <h2 className="text-xl font-black mt-2 leading-tight">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <span className="text-2xl font-black text-red-600">{item.price}</span>
                <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-black text-xs uppercase px-4 py-2 border-2 border-blue-900 shadow-[2px_2px_0_rgba(30,58,138,1)]">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
