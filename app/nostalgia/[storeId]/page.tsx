"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { masterInventory } from '../../inventory';

export default function DynamicStorefront() {
  const params = useParams();
  const roomKey = (params?.storeId as string) || "store";
  const items = masterInventory[roomKey] || [];
  const displayTitle = roomKey.replace(/-/g, ' ').toUpperCase();

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [activeMedia, setActiveMedia] = useState<string>("");

  const handleCheckout = async (item: any) => {
    try {
      const priceFloat = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      const fullPriceInCents = Math.round(priceFloat * 100);
      const isLuxury = priceFloat >= 500.00; 
      const depositInCents = isLuxury ? Math.round(fullPriceInCents * 0.5) : fullPriceInCents;
      
      const payload = {
        itemName: item.name, fullPriceInCents, depositInCents, room: roomKey, itemId: item.id,
        requiresClearinghouse: isLuxury, refundPolicy: isLuxury ? "50_PERCENT_REFUNDABLE_ESCROW" : "STANDARD_RETAIL"
      };

      const backendUrl = process.env.NEXT_PUBLIC_API_URL || ''; 
      const response = await fetch(`${backendUrl}/api/checkout`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else alert("Checkout Gateway offline. Please verify API connection.");
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Secure checkout is currently initializing. Please try again in a moment.");
    }
  };

  const maskSupplier = (mfg: string) => {
    if (!mfg) return 'NEXUS AUTHENTICATED';
    const upper = mfg.toUpperCase();
    if (upper.includes('EBAY') || upper.includes('ETSY') || upper.includes('CLUB') || upper.includes('WHOLESALE') || upper.includes('MART') || upper.includes('MERCARI')) {
      return 'NEXUS AUTHENTICATED';
    }
    return 'NEXUS SECURED';
  };

  const openModal = (item: any) => {
    setSelectedItem(item);
    const firstValidImg = item.media?.find((img: string) => img && img.trim() !== '') || "";
    setActiveMedia(firstValidImg); 
  };

  return (
    <main className="min-h-screen bg-blue-900 text-white p-6 md:p-12 font-sans relative">
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <Link href="/" className="inline-block text-xs font-mono tracking-widest uppercase bg-black/40 hover:bg-black/80 px-4 py-2 rounded border border-white/20 mb-6 transition-colors">
            ← Return to Concourse
          </Link>
          <div className="bg-red-600 p-6 rounded-t-2xl border-b-8 border-yellow-400">
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tight">{displayTitle}</h1>
            <p className="mt-4 text-white font-medium text-lg">Dynamic inventory: {items.length} units cataloged.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any) => {
            const displayImg = item.media?.find((img: string) => img && img.trim() !== '');
            return (
              <div key={item.id} onClick={() => openModal(item)} className="bg-white text-black border-4 border-yellow-400 rounded-xl p-6 relative flex flex-col justify-between shadow-xl cursor-pointer hover:scale-[1.02] transition-transform">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black uppercase text-blue-700 tracking-wider">{maskSupplier(item.specs?.manufacturer)}</span>
                    <span className="text-[10px] font-mono font-bold bg-black text-white px-2 py-0.5 rounded">{item.id}</span>
                  </div>
                  
                  <div className="w-full h-48 bg-zinc-100 rounded-lg mb-4 border border-zinc-200 flex items-center justify-center overflow-hidden">
                    {displayImg ? (
                      <img src={displayImg} alt={item.name} className="object-cover w-full h-full" onError={(e) => e.currentTarget.style.display = 'none'} />
                    ) : (
                      <span className="text-zinc-400 text-xs font-mono font-bold">IMAGE SECURED</span>
                    )}
                  </div>
                  <h2 className="text-2xl font-black leading-tight mt-1">{item.name}</h2>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-4">
                  <span className="text-2xl font-black text-red-600">{item.price}</span>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase px-4 py-2 rounded text-xs transition-colors shadow">
                    View Specs
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- MVP INTERACTIVE PRODUCT MODAL --- */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm">
          <div className="bg-white text-black w-full max-w-6xl rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row relative max-h-[90vh] overflow-y-auto border-4 border-yellow-400">
            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 z-50 bg-black text-white w-10 h-10 rounded-full font-bold hover:bg-red-600 transition-colors flex items-center justify-center shadow-lg">X</button>

            <div className="w-full md:w-1/2 bg-zinc-100 p-6 flex flex-col gap-4 border-r border-zinc-200">
              <div className="w-full aspect-square bg-black rounded-lg overflow-hidden relative flex items-center justify-center shadow-inner">
                <img src={activeMedia} className="w-full h-full object-cover" alt="Main Product Media" onError={(e) => e.currentTarget.src="https://placehold.co/800x800/18181b/06b6d4?text=IMAGE+SECURED"} />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedItem.media?.filter((imgUrl: string) => imgUrl && imgUrl.trim() !== '').map((imgUrl: string, idx: number) => (
                  <button key={idx} onClick={() => setActiveMedia(imgUrl)} className={`h-16 w-16 rounded overflow-hidden border-2 ${activeMedia === imgUrl ? 'border-red-600' : 'border-transparent'}`}>
                     <img src={imgUrl} className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase text-zinc-500 tracking-wider block mb-2">{maskSupplier(selectedItem.specs?.manufacturer)} • SKU: {selectedItem.id}</span>
                <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-6">{selectedItem.name}</h2>
                <div className="space-y-4 mb-8 bg-zinc-50 p-6 rounded-lg border border-zinc-200">
                  <div className="flex justify-between border-b border-zinc-200 pb-2"><span className="text-sm font-bold text-zinc-500 uppercase">Condition</span><span className="text-sm font-bold text-black">{selectedItem.specs?.condition || "Collector Grade - Mint / Near Mint"}</span></div>
                  <div className="flex justify-between border-b border-zinc-200 pb-2"><span className="text-sm font-bold text-zinc-500 uppercase">Authentication</span><span className="text-sm font-bold text-green-600">100% Authenticated & Verified</span></div>
                  <div className="flex justify-between pb-2"><span className="text-sm font-bold text-zinc-500 uppercase">Fulfillment</span><span className="text-sm font-bold text-blue-600">{selectedItem.specs?.shipping || "Flat $2.99 Shipping"}</span></div>
                  
                  {parseFloat(selectedItem.price.replace(/[^0-9.]/g, '')) >= 500 && (
                    <div className="flex justify-between pt-2 border-t border-zinc-200"><span className="text-sm font-bold text-red-600 uppercase">TECHNICAL SPECIFICATIONS</span><span className="text-sm font-bold text-red-600">Market Price-Matched • $3.99 Base Shipping</span></div>
                  )}
                </div>
              </div>
              <div>
                <div className="text-5xl font-black text-red-600 mb-2">{selectedItem.price}</div>
                <button onClick={() => handleCheckout(selectedItem)} className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase py-4 rounded text-xl transition-colors shadow-lg flex items-center justify-center gap-2">SECURE CHECKOUT →</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
