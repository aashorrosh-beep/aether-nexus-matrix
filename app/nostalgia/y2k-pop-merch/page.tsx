const merchInventory = [
  { sku: "POP-001", name: "NSYNC 'No Strings Attached' Tour Tee (Vintage)", price: "$185.00", style: "border-cyan-400" },
  { sku: "POP-002", name: "Britney Spears Oversized Door Poster", price: "$45.00", style: "border-purple-400" },
  { sku: "POP-003", name: "Hair Mascara (Electric Blue)", price: "$18.00", style: "border-blue-400" },
  { sku: "POP-004", name: "Inflatable Bubble Chair (Clear/Glitter)", price: "$65.00", style: "border-white" },
  { sku: "POP-005", name: "Butterfly Hair Clips (50-Piece Set)", price: "$12.00", style: "border-pink-300" }
];

export default function PopMerchPage() {
  return (
    <main className="min-h-screen bg-purple-900 text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="bg-gradient-to-r from-cyan-400 to-purple-500 p-1 rounded-3xl">
          <div className="bg-purple-900 rounded-[22px] p-8 text-center shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300 drop-shadow-lg">Y2K Pop Merch</h1>
            <p className="mt-4 text-cyan-200 font-bold uppercase tracking-wider">Tour tees, frosted tips, and oversized posters.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {merchInventory.map((item) => (
            <div key={item.sku} className={`bg-purple-800/50 border-4 ${item.style} p-6 rounded-2xl flex flex-col justify-between hover:bg-purple-800 transition-colors`}>
              <div>
                <span className="text-xs bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">{item.sku}</span>
                <h2 className="text-xl font-bold mt-3">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <span className="text-2xl font-black">{item.price}</span>
                <button className="bg-cyan-400 hover:bg-cyan-300 text-purple-900 font-black text-xs uppercase px-5 py-2 rounded-full">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
