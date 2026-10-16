import Link from 'next/link';
import { masterInventory } from './inventory';

const isLive = (roomId: string) => masterInventory && masterInventory[roomId] && masterInventory[roomId].length > 0;

export default function PremiumLobby() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic drop-shadow-2xl">Aether Nexus</h1>
          <p className="text-xl md:text-2xl font-mono text-zinc-400 uppercase tracking-widest">Global E-Commerce Matrix • Sector 001</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
          
          {/* ==================== NOSTALGIA WING ==================== */}
          <div className="space-y-10">
            <div className="bg-red-600 p-4 border-l-8 border-yellow-400 shadow-[0_0_40px_rgba(220,38,38,0.5)]">
              <h2 className="text-5xl font-black uppercase italic">Nostalgia Wing</h2>
            </div>

            {/*