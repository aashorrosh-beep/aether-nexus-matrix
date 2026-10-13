const vhsInventory = [
  { sku: "VHS-001", name: "Back to the Future (1985) - Factory Sealed", price: "$450.00", format: "VHS", style: "border-blue-600" },
  { sku: "VHS-002", name: "Custom 1989 Saturday Morning Cartoon Mixtape", price: "$35.00", format: "SP MODE", style: "border-yellow-500" },
  { sku: "VHS-003", name: "Sports Bloopers '92 with Original Commercials", price: "$25.00", format: "EP MODE", style: "border-red-600" },
  { sku: "VHS-004", name: "Panasonic Omnivision 4-Head VCR (Refurbished)", price: "$180.00", format: "HARDWARE", style: "border-zinc-500" },
  { sku: "VHS-005", name: "Classic Red Sports Car VHS Tape Rewinder", price: "$45.00", format: "ACCESSORY", style: "border-red-600" }
];

export default function VHSArchivePage() {
  return (
    <main className="min-h-screen bg-blue-950 text-white p-6 md:p-12 font-mono">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="bg-yellow-400 p-8 rounded-t-3xl border-b-8 border-red-600">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-blue-900 skew-x-[-5deg]">
            The VHS Archive
          </h1>
          <p className="text-red-700 font-bold mt-2 max-w-xl text-lg skew-x-[-5deg]">Be Kind. Rewind. Preserve.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {vhsInventory.map((item) => (
            <div key={item.sku} className={`bg-blue-900 border-4 ${item.style} p-6 rounded-lg flex flex-col justify-between shadow-[8px_8px_0px_rgba(0,0,0,0.5)]`}>
              <div>
                <div className="bg-black text-white text-xs inline-block px-2 py-1 mb-3">{item.format}</div>
                <h2 className="text-xl font-bold leading-tight">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center bg-black p-3 rounded">
                <span className="text-xl font-black text-green-400">{item.price}</span>
                <button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-black text-xs uppercase px-4 py-2">Rent / Buy</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
