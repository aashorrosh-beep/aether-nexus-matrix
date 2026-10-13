'use client';
import { useState, use, useEffect } from 'react';
import { masterInventory } from '../../inventory';

export default function DynamicStorefront({ params }: { params: Promise<{ storeId: string }> }) {
  const unwrappedParams = use(params);
  const storeId = unwrappedParams.storeId;
  const roomNumberString = storeId.split('-')[1] || "1004";

  const directoryStores = [
    { id: '1001', name: "Apex Athletics", category: "Performance & Recovery" },
    { id: '1004', name: "Obsidian Core", category: "Tactical & Urban EDC" },
    { id: '1007', name: "Vault 77", category: "Secured Trading Assets" },
    { id: '1021', name: "Pulse Gaming", category: "Esports Hardware" },
    { id: '1042', name: "Squishy Super Center", category: "Sensory & Plush Collectibles" }
  ];

  const currentStore = directoryStores.find(store => store.id === roomNumberString) || { name: "Obsidian Core", category: "Tactical & Urban EDC" };
  const inventoryMap = masterInventory as Record<string, any[]>;
  const inventoryDatabase = inventoryMap[roomNumberString] || inventoryMap["1004"] || [];

  const [activeItem, setActiveItem] = useState<any | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [selectedAngleIndex, setSelectedAngleIndex] = useState<number>(0);
  const [showSpecSheet, setShowSpecSheet] = useState<boolean>(false);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState<boolean>(false);

  const getColorVariants = (item: any) => {
    if (item?.variants && item.variants.length > 0) return item.variants;
    return [
      {
        colorName: "Factory Standard Finish",
        code: "STD",
        hex: "#18181b",
        angles: [
          { label: "01. Outer Studio Profile", caption: "Verified Manufacturer Studio Asset", url: item.img },
          { label: "02. Worn Field Ops", caption: "Verified On-Body / Active Utility View", url: item.wornImg || item.img },
          { label: "03. Open Inside Layout", caption: "Internal Architecture & Compartments", url: item.img },
          { label: "04. Packed Utility Loadout", caption: "Full Everyday Carry Integration", url: item.wornImg || item.img },
          { label: "05. Hardware & Seam Detail", caption: "Mil-Spec Fasteners & Stress Points", url: item.img }
        ]
      }
    ];
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const deepItemId = urlParams.get('item');
      const deepColor = urlParams.get('color');
      if (deepItemId) {
        const found = inventoryDatabase.find((i: any) => i.id === deepItemId);
        if (found) {
          setActiveItem(found);
          if (deepColor && found.variants) {
            const cIdx = found.variants.findIndex((v: any) => v.code === deepColor);
            if (cIdx >= 0) setSelectedColorIndex(cIdx);
          }
        }
      }
    }
  }, [inventoryDatabase]);

  const getTechnicalSpecs = (item: any, selectedColorName: string) => {
    const baseSpecs = item?.specs || [
      { metric: "Chassis Material", spec: "Aerospace-Grade Carbon / Titanium Alloy" },
      { metric: "Ingress Protection", spec: "IP68 Dust & Submersion Rated" },
      { metric: "Warranty Tier", spec: "Lifetime Nexus Direct Replacement" }
    ];
    return [
      { metric: "Universal Product Code (UPC)", spec: item?.upc || "840192837000" },
      { metric: "Manufacturer Part (MPN)", spec: item?.mpn || `${item?.id}-OEM` },
      { metric: "Selected Factory Finish", spec: selectedColorName },
      ...baseSpecs
    ];
  };

  const handleOpenItem = (item: any) => {
    setActiveItem(item);
    setSelectedColorIndex(0);
    setSelectedAngleIndex(0);
    setShowSpecSheet(false);
    setIsPlayingTrailer(false);
  };

  if (activeItem) {
    const colorVariants = getColorVariants(activeItem);
    const currentVariant = colorVariants[selectedColorIndex] || colorVariants[0];
    const angles = currentVariant.angles;
    const currentPhoto = angles[selectedAngleIndex] || angles[0];
    const techSpecs = getTechnicalSpecs(activeItem, currentVariant.colorName);

    return (
      <div className="min-h-screen bg-[#030303] text-white p-6 md:p-12 font-sans selection:bg-cyan-500/30">
        <div className="max-w-6xl mx-auto">
          <nav className="flex flex-wrap justify-between items-center mb-8 border-b border-white/10 pb-6 gap-4">
            <button onClick={() => setActiveItem(null)} className="text-zinc-400 hover:text-cyan-400 text-xs font-black tracking-[0.2em] uppercase transition-colors flex items-center gap-3 cursor-pointer">
              <span className="text-lg leading-none mb-1">←</span> Back to {currentStore.category}
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-mono text-zinc-300">
                UPC: <span className="text-cyan-400 font-bold">{activeItem.upc || "840192837461"}</span>
              </div>
              <div className="flex gap-2 items-center bg-green-900/20 border border-green-500/30 px-4 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-mono tracking-widest text-green-400 uppercase">
                  {activeItem.auditStatus || "QUAD-BRAIN CERTIFIED"}
                </span>
              </div>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="aspect-square w-full bg-zinc-900 border border-white/10 rounded-2xl relative overflow-hidden group shadow-2xl">
                <img src={currentPhoto.url} className="object-cover w-full h-full opacity-95 group-hover:scale-105 transition-all duration-700 ease-out" alt={currentPhoto.label} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute top-5 left-5 bg-black/85 border border-white/15 backdrop-blur px-3.5 py-1.5 rounded-full flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full border border-white/40" style={{ backgroundColor: currentVariant.hex }}></span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-200">{currentVariant.colorName}</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="bg-black/85 border border-white/10 backdrop-blur px-4 py-2.5 rounded-lg">
                    <div className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.25em] mb-1">{currentPhoto.label}</div>
                    <div className="text-zinc-200 text-xs font-mono">{currentPhoto.caption}</div>
                  </div>
                  <div className="text-cyan-400 font-mono text-xs bg-black/85 px-3 py-2 rounded-lg border border-cyan-500/30">
                    {selectedAngleIndex + 1} / {angles.length}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {angles.map((angle: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAngleIndex(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedAngleIndex === idx ? 'border-cyan-400 scale-[1.03] shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={angle.url} alt={angle.label} className="object-cover w-full h-full" />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 text-[8px] font-mono text-zinc-200 py-1.5 px-1 truncate text-center">
                      {angle.label.split('. ')[1]}
                    </div>
                  </button>
                ))}
              </div>

              <div
                onClick={() => !isPlayingTrailer && setIsPlayingTrailer(true)}
                className="aspect-video w-full bg-[#0a0a0a] border border-cyan-500/30 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-cyan-400 transition-colors"
              >
                {isPlayingTrailer ? (
                  <video
                    src={activeItem.trailerUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}
                    poster={angles[1]?.url || activeItem.img}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <img src={angles[1]?.url || activeItem.wornImg || activeItem.img} alt="Video Preview" className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-65 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(6,182,212,0.6)] z-10 group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-black border-b-[10px] border-b-transparent"></div>
                    </div>
                    <p className="mt-4 text-cyan-400 font-black tracking-widest text-xs z-10 uppercase drop-shadow-md">Play Official Manufacturer Field Trailer</p>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 px-3 py-1 rounded-sm text-[10px] font-black tracking-widest uppercase">
                  SKU: {activeItem.id}-{currentVariant.code}
                </div>
                <div className="border border-white/10 bg-zinc-900 text-zinc-400 px-3 py-1 rounded-sm text-[10px] font-mono uppercase">
                  MPN: {activeItem.mpn || "OEM-DIRECT"}
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg">{activeItem.name}</h1>

              <div className="flex items-end gap-4 mb-6 pb-6 border-b border-white/10">
                <span className="text-6xl text-cyan-400 font-mono font-light drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">${activeItem.price}</span>
                <span className="text-zinc-500 font-mono text-sm mb-2 uppercase tracking-widest">USD</span>
              </div>

              <div className="mb-6 bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Select Factory Colorway</span>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{currentVariant.colorName}</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {colorVariants.map((variant: any, idx: number) => (
                    <button
                      key={variant.code}
                      onClick={() => { setSelectedColorIndex(idx); setSelectedAngleIndex(0); }}
                      className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        selectedColorIndex === idx ? 'bg-zinc-900 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]' : 'bg-black/60 border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full flex-shrink-0 border border-white/30" style={{ backgroundColor: variant.hex }}></span>
                      <div className="overflow-hidden">
                        <div className="text-[10px] font-bold text-white truncate">{variant.colorName.split(' (')[0]}</div>
                        <div className="text-[9px] font-mono text-green-400">VERIFIED</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 mb-8 shadow-inner">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">Asset Specifications</h3>
                  <span className="text-[10px] font-mono text-cyan-400">UPC-MATCHED</span>
                </div>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-xs text-zinc-400 uppercase tracking-widest">Active Finish</span>
                    <span className="text-xs text-cyan-400 font-mono font-bold">{currentVariant.colorName}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-xs text-zinc-400 uppercase tracking-widest">Fulfillment</span>
                    <span className="text-xs text-white font-mono font-bold">{activeItem.shipping || "3-5 Days"} Priority</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs text-zinc-400 uppercase tracking-widest">Availability</span>
                    <span className="text-xs text-red-400 font-mono font-bold animate-pulse">{activeItem.status} ({activeItem.count || 10} Left)</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowSpecSheet(!showSpecSheet)}
                  className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-cyan-500/40 rounded-lg text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-between cursor-pointer"
                >
                  <span>{showSpecSheet ? "− Hide Technical Spec Sheet" : "+ View Full Technical Spec Sheet"}</span>
                  <span className="text-[10px] text-zinc-400">SPREADSHEET VIEW</span>
                </button>

                {showSpecSheet && (
                  <div className="mt-4 border border-white/10 rounded-lg overflow-hidden bg-black">
                    <div className="bg-zinc-900/90 px-3 py-2 border-b border-white/10 flex justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      <span>Parameter</span>
                      <span>Manufacturer Spec</span>
                    </div>
                    <div className="divide-y divide-white/5">
                      {techSpecs.map((row: any, index: number) => (
                        <div key={index} className="px-3 py-2.5 flex justify-between items-center text-xs font-mono">
                          <span className="text-zinc-400">{row.metric}</span>
                          <span className="text-cyan-300 font-bold text-right ml-4">{row.spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-auto bg-zinc-900/50 p-6 rounded-2xl border border-cyan-500/20">
                <label className="block text-[10px] font-black tracking-widest uppercase text-cyan-500 mb-2">Secure Order & Tracking Updates</label>
                <input type="email" placeholder="Enter Email Address" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white mb-4 focus:outline-none focus:border-cyan-500 font-mono" />
                <button 
                  onClick={() => window.location.href = `https://albsnexus.com/checkout?item=${activeItem.id}&color=${currentVariant.code}`}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-black tracking-[0.2em] text-sm py-5 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.3)] cursor-pointer"
                >
                  INITIATE SECURE CHECKOUT ({currentVariant.code})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-zinc-800 pb-8 gap-6 md:gap-0">
          <div>
            <a href="/nostalgia-jump" className="text-zinc-500 hover:text-cyan-400 text-[10px] font-black tracking-[0.2em] uppercase transition-colors flex items-center gap-2 mb-6 cursor-pointer">
              ← Return to Concourse
            </a>
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tighter uppercase drop-shadow-lg">
              {currentStore.category}
            </h1>
            <p className="text-cyan-500 tracking-[0.2em] uppercase text-sm mt-3 font-bold">Powered by {currentStore.name}</p>
          </div>
          <div className="text-right">
            <div className="text-cyan-400 font-mono text-sm font-bold flex items-center justify-end gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
              QUAD-BRAIN CERTIFIED INVENTORY ONLINE
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {inventoryDatabase.map((item: any) => {
            const variants = getColorVariants(item);
            const wornShotUrl = item.wornImg || variants[0]?.angles[1]?.url || item.img;

            return (
              <div key={item.id} onClick={() => handleOpenItem(item)} className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 cursor-pointer flex flex-col h-[430px] shadow-lg">
                <div className="h-3/5 w-full bg-black relative overflow-hidden grid grid-cols-2">
                  <div className="relative h-full w-full overflow-hidden border-r border-cyan-500/30">
                    <img src={item.img} alt={item.name} className="object-cover w-full h-full opacity-90 group-hover:scale-110 transition-all duration-700" />
                    <span className="absolute bottom-2 left-2 bg-black/85 text-[8px] font-mono text-zinc-200 px-1.5 py-0.5 rounded uppercase z-20">Studio</span>
                  </div>
                  <div className="relative h-full w-full overflow-hidden">
                    <img src={wornShotUrl} alt={`${item.name} worn`} className="object-cover w-full h-full opacity-85 group-hover:scale-110 transition-all duration-700" />
                    <span className="absolute bottom-2 right-2 bg-cyan-950/90 border border-cyan-500/40 text-[8px] font-mono text-cyan-300 px-1.5 py-0.5 rounded uppercase z-20">Worn Ops</span>
                  </div>
                  {item.status ? (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-[9px] font-black px-3 py-1.5 rounded uppercase z-20">
                      🔥 {item.status}
                    </div>
                  ) : null}
                </div>
                <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[9px] font-mono text-cyan-400/80 uppercase tracking-widest">
                      UPC {item.upc?.slice(-4) || "VERIFIED"} • {variants.length} Colors
                    </span>
                    <div className="flex gap-1">
                      {variants.map((v: any) => (
                        <span key={v.code} className="w-2.5 h-2.5 rounded-full border border-white/40" style={{ backgroundColor: v.hex }}></span>
                      ))}
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">{item.name}</h3>
                  <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Secure Transfer</span>
                      <span className="text-2xl font-mono font-black text-white group-hover:text-cyan-400 transition-colors">${item.price}</span>
                    </div>
                    <div className="text-cyan-500 font-black text-xl group-hover:translate-x-2 transition-transform">➔</div>
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
