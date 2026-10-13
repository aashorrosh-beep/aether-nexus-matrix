const consoleInventory = [
  { sku: "8BT-001", name: "Nintendo Entertainment System (CIB)", price: "$350.00", status: "TESTED", style: "border-zinc-300" },
  { sku: "8BT-002", name: "Sega Master System", price: "$220.00", status: "TESTED", style: "border-red-600" },
  { sku: "8BT-003", name: "Super Mario Bros. 3 (Sealed)", price: "$850.00", status: "VGA 85", style: "border-yellow-400" },
  { sku: "8BT-004", name: "NES Advantage Arcade Joystick", price: "$45.00", status: "USED", style: "border-zinc-500" },
  { sku: "8BT-005", name: "The Legend of Zelda (Gold Cartridge)", price: "$110.00", status: "LOOSE", style: "border-yellow-600" }
];

export default function EightBitConsolesPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 font-mono">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b-4 border-gray-400 pb-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-gray-300 border-4 border-gray-300 inline-block p-4 shadow-[4px_4px_0_rgba(156,163,175,1)]">8-BIT CONSOLES</h1>
          <p className="mt-8 text-gray-400 uppercase tracking-widest">The machines that started it all. Hardware and cartridges.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {consoleInventory.map((item) => (
            <div key={item.sku} className={`bg-[#111] border-2 ${item.style} p-6 flex flex-col justify-between shadow-[4px_4px_0_rgba(255,255,255,0.1)]`}>
              <div>
                <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-1 uppercase">{item.status}</span>
                <h2 className="text-xl font-bold mt-3 leading-snug">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <span className="text-2xl font-black">{item.price}</span>
                <button className="bg-gray-300 hover:bg-white text-black font-black text-xs uppercase px-4 py-2">Power On</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
