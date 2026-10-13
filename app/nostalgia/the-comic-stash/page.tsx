const comicInventory = [
  { sku: "CMX-001", name: "Amazing Fantasy #15 (CGC 3.0)", price: "$18,500.00", era: "SILVER AGE", style: "border-red-600" },
  { sku: "CMX-002", name: "X-Men #1 (1991) Magneto Variant", price: "$45.00", era: "MODERN", style: "border-yellow-500" },
  { sku: "CMX-003", name: "Spawn #1 (Direct Edition)", price: "$35.00", era: "MODERN", style: "border-green-600" },
  { sku: "CMX-004", name: "Batman: The Killing Joke (1st Print)", price: "$125.00", era: "COPPER AGE", style: "border-purple-600" },
  { sku: "CMX-005", name: "Acid-Free Comic Backer Boards (100ct)", price: "$15.00", era: "SUPPLIES", style: "border-zinc-400" }
];

export default function ComicStashPage() {
  return (
    <main className="min-h-screen bg-red-900 text-white p-6 md:p-12 font-bold">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="bg-yellow-400 p-6 border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] rotate-[-1deg]">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-red-700 tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">The Comic Stash</h1>
          <p className="mt-2 text-black font-black uppercase">Graded keys, variant covers, and omnibus editions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {comicInventory.map((item) => (
            <div key={item.sku} className={`bg-white text-black border-4 ${item.style} p-6 shadow-[6px_6px_0_rgba(0,0,0,1)] flex flex-col justify-between hover:translate-y-[-4px] hover:shadow-[10px_10px_0_rgba(0,0,0,1)] transition-all`}>
              <div>
                <span className="text-xs font-black bg-black text-white px-2 py-1 uppercase">{item.era}</span>
                <h2 className="text-xl font-black mt-3 leading-tight">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center border-t-4 border-black pt-4">
                <span className="text-2xl font-black">{item.price}</span>
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase px-4 py-2 border-2 border-black">Bag & Board</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
