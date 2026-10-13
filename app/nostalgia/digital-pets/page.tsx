const petInventory = [
  { sku: "PET-001", name: "Tamagotchi Original (Gen 1, Translucent Blue)", price: "$85.00", style: "border-teal-300" },
  { sku: "PET-002", name: "Digimon Virtual Pet (V-Pet Original)", price: "$110.00", style: "border-orange-500" },
  { sku: "PET-003", name: "Giga Pet: T-Rex (Sealed)", price: "$65.00", style: "border-green-500" },
  { sku: "PET-004", name: "Nano Baby (Vintage 1997)", price: "$55.00", style: "border-pink-400" },
  { sku: "PET-005", name: "CR2032 Replacement Batteries (10 Pack)", price: "$8.00", style: "border-zinc-300" }
];

export default function DigitalPetsPage() {
  return (
    <main className="min-h-screen bg-teal-400 text-black p-6 md:p-12 font-mono">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="bg-teal-300 p-8 rounded-3xl border-8 border-teal-500 text-center shadow-inner">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-white bg-black inline-block px-8 py-4 rounded-full shadow-[0_10px_0_rgba(0,0,0,0.2)]">Digital Pets</h1>
          <p className="mt-8 text-teal-900 font-bold uppercase tracking-widest">Tamagotchis, pixel care, and keychain companions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {petInventory.map((item) => (
            <div key={item.sku} className={`bg-white border-4 ${item.style} p-6 rounded-[2rem] flex flex-col justify-between shadow-xl`}>
              <div>
                <span className="text-[10px] font-black bg-zinc-200 px-2 py-1 rounded-full uppercase block w-fit mb-3">{item.sku}</span>
                <h2 className="text-lg font-bold leading-snug">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center bg-teal-50 p-4 rounded-2xl">
                <span className="text-2xl font-black">{item.price}</span>
                <button className="bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase px-5 py-2 rounded-full shadow-md">Adopt</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
