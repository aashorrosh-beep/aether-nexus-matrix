const boardGameInventory = [
  { sku: "BRD-001", name: "HeroQuest (1989 Original Complete)", price: "$250.00", players: "2-5", style: "border-red-800" },
  { sku: "BRD-002", name: "Crossfire (1990s Edition)", price: "$85.00", players: "2", style: "border-zinc-800" },
  { sku: "BRD-003", name: "Mall Madness (Talking Computer Edition)", price: "$110.00", players: "2-4", style: "border-pink-600" },
  { sku: "BRD-004", name: "Fireball Island (Original Vintage)", price: "$320.00", players: "2-4", style: "border-orange-500" },
  { sku: "BRD-005", name: "Vintage Wooden Scrabble Tiles (Replacement)", price: "$18.00", players: "PARTS", style: "border-amber-700" }
];

export default function BoardGamesPage() {
  return (
    <main className="min-h-screen bg-green-900 text-white p-6 md:p-12 font-serif">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-4 border-amber-600 bg-green-800 p-8 rounded-lg shadow-2xl">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-amber-300 drop-shadow-md">Classic Board Games</h1>
          <p className="mt-4 text-green-200 italic font-sans text-lg">Complete in box. Strategy, luck, and tabletop wars.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {boardGameInventory.map((item) => (
            <div key={item.sku} className={`bg-[#fdf6e3] text-black border-8 ${item.style} p-6 flex flex-col justify-between`}>
              <div>
                <span className="text-xs font-bold text-green-800 font-sans tracking-widest block mb-2">PLAYERS: {item.players}</span>
                <h2 className="text-xl font-bold font-sans">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center border-t-2 border-zinc-300 pt-4">
                <span className="text-2xl font-black font-sans">{item.price}</span>
                <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase px-4 py-2 font-sans">Purchase</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
