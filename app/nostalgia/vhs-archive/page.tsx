export default function VHSArchivePage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-red-600">The VHS Archive</h1>
        <p className="text-zinc-400 font-mono mt-3 max-w-xl text-sm">Sealed blockbusters, custom bootlegs, and retro media players.</p>
        <div className="bg-zinc-950 border border-red-900 rounded-2xl p-6 mt-6 max-w-2xl">
          <h2 className="text-2xl font-bold mb-2">Weekend Rental Pass</h2>
          <p className="text-sm text-zinc-500 mb-4">Access our digital conversion library of 1980s commercials and lost media.</p>
          <button className="bg-red-600 text-white font-bold text-sm uppercase px-6 py-3 rounded-lg">Unlock Archive</button>
        </div>
      </div>
    </main>
  );
}
