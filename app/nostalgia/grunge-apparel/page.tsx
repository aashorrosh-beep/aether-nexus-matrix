const apparelInventory = [
  { sku: "GRN-001", name: "Vintage 1992 Nirvana In Utero Tee", price: "$350.00", size: "XL", style: "border-zinc-700" },
  { sku: "GRN-002", name: "Faded Pendleton Wool Flannel", price: "$120.00", size: "L", style: "border-red-900" },
  { sku: "GRN-003", name: "Dr. Martens 1460 (Made in England, Worn)", price: "$145.00", size: "US 10", style: "border-amber-900" },
  { sku: "GRN-004", name: "Distressed Levi's 501 Button Fly Jeans", price: "$85.00", size: "32x30", style: "border-blue-900" },
  { sku: "GRN-005", name: "Pewter Skull Wallet Chain", price: "$28.00", size: "O/S", style: "border-zinc-400" }
];

export default function GrungeApparelPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 p-6 md:p-12 font-mono">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b border-zinc-800 pb-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-red-900 tracking-tighter opacity-90">Grunge Apparel</h1>
          <p className="mt-4 text-zinc-500">Faded denim, heavy flannels, and combat boots.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {apparelInventory.map((item) => (
            <div key={item.sku} className={`bg-zinc-900 border-l-2 ${item.style} p-6 flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity`}>
              <div>
                <span className="text-xs text-zinc-600 block mb-2">SIZE: {item.size}</span>
                <h2 className="text-lg font-bold text-zinc-200">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center border-t border-zinc-800 pt-4">
                <span className="text-xl font-bold">{item.price}</span>
                <button className="text-xs font-bold uppercase text-red-700 hover:text-red-500 underline">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
