"use client";
import Link from 'next/link';
import { masterInventory } from '../../inventory';

export default function ActionFiguresPage() {
  const items = masterInventory['action-figures-90s'] || [];

  // This function talks to Stripe when you click Buy Now
  const handleCheckout = async (item: any) => {
    try {
      // Convert "$550.00" string to 55000 cents for Stripe
      const priceInCents = parseInt(item.price.replace(/[^0-9]/g, ''));
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          itemName: item.name, 
          priceInCents: priceInCents, 
          room: 'action-figures-90s', 
          itemId: item.id 
        }),
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirects to Stripe Checkout
      } else {
        alert("Checkout failed. Verify Stripe Keys.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-blue-900 text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div>
          <Link href="/" className="inline-block text-xs font-mono tracking-widest uppercase bg-black/40 hover:bg-black/80 px-4 py-2 rounded border border-white/20 mb-6 transition-colors">
            ← Return to Concourse
          </Link>
          <div className="bg-red-600 p-6 rounded-t-2xl border-b-8 border-yellow-400">
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tight">90s Action Figures</h1>
            <p className="mt-4 text-white font-medium text-lg">Mint on card. Sealed cases. Exclusive mail-aways. Dynamic inventory: {items.length} units cataloged.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white text-black border-4 border-yellow-400 rounded-xl p-6 relative flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black uppercase text-blue-700 tracking-wider">{item.manufacturer || 'ARCHIVE'}</span>
                  <span className="text-[10px] font-mono font-bold bg-black text-white px-2 py-0.5 rounded">{item.id}</span>
                </div>
                
                {/* IMAGE / MEDIA WINDOW */}
                <div className="w-full h-48 bg-zinc-100 rounded-lg mb-4 border border-zinc-200 flex items-center justify-center overflow-hidden">
                  {item.img ? (
                    <img src={item.img} alt={item.name} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-zinc-400 text-xs font-mono font-bold">MEDIA SIGNAL LOST</span>
                  )}
                </div>

                <h2 className="text-2xl font-black leading-tight mt-1">{item.name}</h2>
                {item.condition && (
                  <p className="text-xs text-zinc-600 mt-2 font-mono">CONDITION: {item.condition}</p>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-4">
                <span className="text-2xl font-black text-red-600">{item.price}</span>
                
                {/* STRIPE BUY BUTTON */}
                <button 
                  onClick={() => handleCheckout(item)}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase px-6 py-2 rounded text-sm transition-colors shadow"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}