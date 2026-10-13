const crtInventory = [
  { sku: "CRT-001", name: "Sony Trinitron PVM-20M4U (RGB Modded)", price: "$850.00", size: "20 INCH", tube: "border-green-500" },
  { sku: "CRT-002", name: "JVC D-Series AV-27D302", price: "$250.00", size: "27 INCH", tube: "border-green-400" },
  { sku: "CRT-003", name: "Toshiba AF Series Flat CRT", price: "$175.00", size: "14 INCH", tube: "border-green-600" },
  { sku: "CRT-004", name: "Extron Crosspoint Component Matrix Switcher", price: "$120.00", size: "HARDWARE", tube: "border-zinc-500" },
  { sku: "CRT-005", name: "Commodore 1702 Video Monitor", price: "$320.00", size: "13 INCH", tube: "border-green-500" }
];

export default function CRTGraveYardPage() {
  return (
    <main className="min-h-screen bg-black text-green-500 p-6 md:p-12 font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-50 z-50"></div>
      
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="border-b border-green-500/30 pb-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-widest text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]">
            CRT GRAVEYARD
          </h1>
          <p className="text-green-600 mt-2 text-sm">NO INPUT LAG. PURE PHOSPHOR. HEAVY GLASS.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {crtInventory.map((item) => (
            <div key={item.sku} className={`bg-[#051005] border ${item.tube} p-6 rounded flex flex-col justify-between hover:bg-[#0a1f0a] transition-colors`}>
              <div>
                <span className="text-xs text-green-700 mb-2 block">[{item.sku}] // {item.size}</span>
                <h2 className="text-lg font-bold text-green-300">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center border-t border-green-900/50 pt-4">
                <span className="text-xl font-bold">{item.price}</span>
                <button className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-bold text-xs px-4 py-2 transition-colors">INITIALIZE_PURCHASE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
