export default function CRTGraveYardPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-green-500">The CRT Graveyard</h1>
        <p className="text-zinc-400 font-mono mt-3 max-w-xl text-sm">Heavy glass, scanlines, and zero input lag. The ultimate vintage gaming displays.</p>
        <div className="bg-zinc-950 border border-green-900 rounded-2xl p-6 mt-6 max-w-2xl">
          <h2 className="text-2xl font-bold mb-2">Sony Trinitron PVMs</h2>
          <p className="text-sm text-zinc-500 mb-4">Professionally serviced and RGB modded for arcade-perfect fidelity.</p>
          <button className="bg-green-600 text-black font-bold text-sm uppercase px-6 py-3 rounded-lg">View Inventory</button>
        </div>
      </div>
    </main>
  );
}
