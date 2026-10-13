'use client';
import { useState, use, useEffect } from 'react';
import Link from 'next/link';
import { masterInventory } from '../../inventory';

export default function CinematicStorefront({ params }: { params: Promise<{ storeId: string }> }) {
  const unwrappedParams = use(params);
  const storeId = unwrappedParams.storeId;
  const roomNumberString = storeId.split('-')[1] || "1004";

  const directoryStores = [
    { id: '1004', name: "Obsidian Core", category: "Tactical & Urban EDC", theme: "cyan" },
    { id: '1021', name: "Pulse Gaming", category: "Esports Hardware", theme: "cyan" },
    { id: '1042', name: "Squishy Super Center", category: "Sensory & Plush Collectibles", theme: "cyan" },
    { id: '2001', name: "Heritage Ironworks", category: "American Cast Iron", theme: "pink" }
  ];

  const currentStore = directoryStores.find(store => store.id === roomNumberString) || directoryStores[0];
  const inventoryMap = masterInventory as Record<string, any[]>;
  const inventoryDatabase = inventoryMap[roomNumberString] || inventoryMap["1004"] || [];
  const themeColor = currentStore.theme === 'pink' ? 'pink-500' : 'cyan-400';
  const themeGlow = currentStore.theme === 'pink' ? 'rgba(236,72,153,0.4)' : 'rgba(6,182,212,0.4)';

  const getColorVariants = (item: any) => {
    if (item?.variants && item.variants.length > 0) return item.variants;
    return [{ code: "STD", colorName: "Standard", hex: "#18181b", angles: [{ url: item.img }, { url: item.wornImg }] }];
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white p-4 sm:p-8 md:p-12 font-sans bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black">
      <div className="max-w-[1600px] mx-auto">
        
        {/* RESPONSIVE HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-6 gap-6 relative">
          <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 blur-[100px] pointer-events-none"></div>
          <div className="z-10">
            {/* FIXED BACK BUTTON TO ROOT */}
            <Link href="/" className="text-zinc-500 hover:text-white text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase transition-colors flex items-center gap-2 mb-6 w-fit bg-zinc-900/50 px-4 py-2 rounded-full border border-white/5">
              ← Return to Main Lobby
            </Link>
            <h1 className={`text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 tracking-tighter uppercase drop-shadow-lg leading-none`}>
              {currentStore.category}
            </h1>
            <p className={`text-${themeColor} tracking-[0.2em] uppercase text-xs sm:text-sm mt-4 font-bold flex items-center gap-3`}>
              <span className="w-8 h-px bg-current"></span> Powered by {currentStore.name}
            </p>
          </div>
          <div className="z-10 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3 shadow-2xl">
            <span className={`w-2 h-2 bg-${themeColor} rounded-full animate-ping`}></span>
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">QUAD-BRAIN SYNCED</span>
          </div>
        </header>

        {/* FLUID RESPONSIVE GRID (1 col mobile, 2 col tablet, 4 col laptop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {inventoryDatabase.map((item: any) => {
            const variants = getColorVariants(item);
            const wornShotUrl = item.wornImg || variants[0]?.angles[1]?.url || item.img;

            return (
              <div key={item.id} className="group relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 cursor-pointer flex flex-col h-[400px] sm:h-[450px] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transform hover:-translate-y-1">
                
                {/* SPLIT-SCREEN IMAGE BAY */}
                <div className="h-3/5 w-full bg-black relative overflow-hidden grid grid-cols-2">
                  <div className="relative h-full w-full overflow-hidden border-r border-white/10 group-hover:border-cyan-500/30 transition-colors">
                    <img src={item.img} alt={item.name} className="object-cover w-full h-full opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                    <span className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md text-[8px] sm:text-[9px] font-mono text-zinc-300 px-2 py-1 rounded-md uppercase z-20 border border-white/10">Studio</span>
                  </div>
                  <div className="relative h-full w-full overflow-hidden">
                    <img src={wornShotUrl} alt={`${item.name} worn`} className="object-cover w-full h-full opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out" />
                    <span className="absolute bottom-2 right-2 bg-cyan-950/80 backdrop-blur-md border border-cyan-500/40 text-[8px] sm:text-[9px] font-mono text-cyan-400 px-2 py-1 rounded-md uppercase z-20">Field Ops</span>
                  </div>
                  
                  {/* FLOATING STATUS BADGE */}
                  {item.status && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-red-600 to-red-500 text-white text-[9px] sm:text-[10px] font-black px-3 py-1.5 rounded-md uppercase z-20 shadow-lg border border-red-400/30 flex items-center gap-1">
                      <span className="animate-pulse">🔥</span> {item.status}
                    </div>
                  )}
                </div>

                {/* INFO BAY */}
                <div className="p-4 sm:p-6 flex flex-col flex-grow bg-gradient-to-b from-[#0a0a0a] to-[#050505] relative z-10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[8px] sm:text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                      UPC {item.upc?.slice(-4) || "VERIFIED"}
                    </span>
                    <div className="flex gap-1.5">
                      {variants.map((v: any) => (
                        <span key={v.code} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: v.hex }}></span>
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="font-black text-white text-sm sm:text-base leading-snug group-hover:text-cyan-400 transition-colors line-clamp-2">{item.name}</h3>
                  
                  <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest mb-1 font-mono">Secure Transfer</span>
                      <span className="text-xl sm:text-2xl font-mono font-black text-white group-hover:text-cyan-400 transition-colors drop-shadow-md">${item.price}</span>
                    </div>
                    
                    {/* UPDATED STRIPE BUTTON */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `https://albsnexus.com/checkout?item=${item.id}&color=${variants[0]?.code}`;
                      }}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:bg-cyan-600 group-hover:border-cyan-400 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_15px_${themeGlow}] cursor-pointer z-50`}
                    >
                      <span className="text-white font-black text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform">➔</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
