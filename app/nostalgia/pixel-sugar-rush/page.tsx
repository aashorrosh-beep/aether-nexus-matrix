import SelfieStation from '@/components/SelfieStation';

const inventory = [
  { upc: "ARC-801", name: "Classic Arcade Sanwa Fight Stick", price: "$129.99", tag: "PRO TOURNAMENT", color: "border-cyan-500" },
  { upc: "BEV-901", name: "Vintage Jolt Cola 4-Pack", price: "$18.50", tag: "RESTOCK", color: "border-yellow-500" },
  { upc: "CND-701", name: "Nik-L-Nip Wax Bottles Mini Crate", price: "$14.99", tag: "FAVORITE", color: "border-pink-500" },
  { upc: "SCAV-001", name: "Glitch Key #01: Pixel Token", price: "$1.00", tag: "SCAVENGER HUNT", color: "border-amber-400" }
];

export default function PixelSugarRushPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">The Pixel & Sugar Rush</h1>
        <SelfieStation theme="arcade" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {inventory.map((item) => (
            <div key={item.upc} className={`bg-zinc-950 border rounded-2xl p-6 flex flex-col justify-between ${item.color}`}>
              <h2 className="text-xl font-bold mb-2">{item.name}</h2>
              <div className="mt-8 flex justify-between items-center">
                <span className="text-2xl font-black font-mono">{item.price}</span>
                <button className="bg-zinc-800 text-xs font-mono uppercase px-4 py-2 rounded-lg">Buy →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
