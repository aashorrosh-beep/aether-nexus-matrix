const vinylInventory = [
  { sku: "VNL-001", name: "Pink Floyd - Dark Side of the Moon (1st Press)", price: "$850.00", condition: "VG+", style: "border-amber-500" },
  { sku: "VNL-002", name: "Technics SL-1200MK2 Turntable", price: "$950.00", condition: "MINT", style: "border-zinc-400" },
  { sku: "VNL-003", name: "Nirvana - Nevermind (Original 1991)", price: "$420.00", condition: "NM", style: "border-amber-600" },
  { sku: "VNL-004", name: "Vintage Marantz 2270 Receiver", price: "$1,100.00", condition: "SERVICED", style: "border-zinc-500" },
  { sku: "VNL-005", name: "Record Cleaning Kit & Anti-Static Brush", price: "$35.00", condition: "NEW", style: "border-amber-400" }
];

export default function VintageVinylPage() {
  return (
    <main className="min-h-screen bg-[#121212] text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b border-amber-900 pb-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-amber-500 tracking-tighter">Vintage Vinyl Vault</h1>
          <p className="mt-4 text-zinc-400">First pressings, rare imports, and analog turntables.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {vinylInventory.map((item) => (
            <div key={item.sku} className={`bg-[#1a1a1a] border-l-4 ${item.style} p-6 flex flex-col justify-between shadow-xl`}>
              <div>
                <span className="text-xs font-bold text-amber-600 tracking-widest">{item.condition}</span>
                <h2 className="text-xl font-bold mt-2 text-zinc-100">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <span className="text-2xl font-black">{item.price}</span>
                <button className="bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs uppercase px-4 py-2 rounded-full">Add to Crate</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
