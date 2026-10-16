import Link from "next/link";
export default function NetrixConciergePage() {
  return (
    <main className="min-h-screen bg-black text-green-500 p-6 md:p-12 font-mono">
      <div className="max-w-4xl mx-auto border border-green-800 p-8 space-y-8">
        <Link href="/" className="text-xs text-green-400 uppercase">← Return to Matrix Concourse</Link>
        <div>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-green-400">Neural Concierge</h1>
          <p className="mt-2 text-green-700 font-bold tracking-widest uppercase">Encrypted Hardware & Holistic Procurement</p>
        </div>
        <div className="bg-green-950/30 p-6 border border-green-900/50 space-y-2 text-green-300 text-sm">
          <p>• TARGET ACQUIRED: Receive encrypted comms ping with sourcing coordinates.</p>
          <p>• ASSET LOCKED: Reserved for 48 HOURS pending authorization.</p>
          <p>• HOLISTIC & LAB ADVISORY: Direct routing for custom longevity and hardware rigs.</p>
        </div>
        <button type="button" className="w-full border-2 border-green-500 text-green-400 p-4 hover:bg-green-500 hover:text-black font-bold tracking-widest uppercase">Initiate Encrypted Uplink →</button>
      </div>
    </main>
  );
}
