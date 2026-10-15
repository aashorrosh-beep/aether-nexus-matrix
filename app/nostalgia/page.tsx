import Link from 'next/link';

export default function NostalgiaConcourse() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 font-sans flex flex-col items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-bl from-pink-900/20 to-black pointer-events-none"></div>
      
      <div className="relative z-10 max-w-2xl text-center border border-pink-900/50 bg-pink-950/20 p-8 md:p-16 rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.1)]">
        <span className="text-pink-500 font-mono text-xs tracking-widest uppercase mb-4 block">Concourse 2 • The Heritage Vault</span>
        
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-pink-700 mb-6">
          Nostalgia
        </h1>
        
        <p className="text-zinc-400 mb-10 font-medium text-sm md:text-base">
          You have entered the master concourse. Please select a specific vault from the main terminal to access the interactive procurement hubs.
        </p>
        
        <Link href="/" className="inline-block bg-pink-600 hover:bg-pink-500 text-white font-black text-sm uppercase px-8 py-4 transition-colors rounded shadow-[0_0_20px_rgba(236,72,153,0.2)] tracking-wider">
          ← Return to Main Terminal
        </Link>
      </div>
    </main>
  );
}
