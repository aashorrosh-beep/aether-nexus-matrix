"use client";

import { usePathname } from 'next/navigation';

export default function BackgroundEffects() {
  const pathname = usePathname();

  if (pathname !== '/') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <style>{`
        @keyframes flowLeftToCenter {
          0% { transform: translateX(-15vw) scale(1.2); opacity: 0; }
          15% { opacity: 0.9; }
          70% { opacity: 0.8; filter: blur(0px); }
          100% { transform: translateX(50vw) scale(0.2); opacity: 0; filter: blur(15px); }
        }
        @keyframes flowRightToCenter {
          0% { transform: translateX(15vw) scale(1.2); opacity: 0; }
          15% { opacity: 0.9; }
          70% { opacity: 0.8; filter: blur(0px); }
          100% { transform: translateX(-50vw) scale(0.2); opacity: 0; filter: blur(15px); }
        }
        .track-left {
          position: absolute;
          left: 0;
          display: flex;
          align-items: center;
          gap: 2.5rem;
          animation: flowLeftToCenter linear infinite;
          color: #fca5a5;
          text-shadow: 0 0 10px rgba(252, 165, 165, 0.6);
        }
        .track-right {
          position: absolute;
          right: 0;
          display: flex;
          align-items: center;
          gap: 2.5rem;
          animation: flowRightToCenter linear infinite;
          color: #67e8f9;
          text-shadow: 0 0 10px rgba(103, 232, 249, 0.6);
        }
        .holo-frame-red {
          width: 100px; height: 65px; 
          border: 1px solid rgba(252, 165, 165, 0.8); 
          background: rgba(252, 165, 165, 0.1); 
          border-radius: 4px;
          box-shadow: inset 0 0 15px rgba(252, 165, 165, 0.2), 0 0 10px rgba(252, 165, 165, 0.4);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        .holo-frame-cyan {
          width: 100px; height: 65px; 
          border: 1px solid rgba(103, 232, 249, 0.8); 
          background: rgba(103, 232, 249, 0.1); 
          border-radius: 4px;
          box-shadow: inset 0 0 15px rgba(103, 232, 249, 0.2), 0 0 10px rgba(103, 232, 249, 0.4);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
      `}</style>

      {/* LEFT STREAMS: The Past (Pre-2000s) */}
      <div className="absolute top-[22%] w-1/2 h-20 flex items-center">
         <div className="track-left font-mono text-sm md:text-lg tracking-[0.2em] whitespace-nowrap" style={{animationDuration: '24s'}}>
            <div className="holo-frame-red">
               <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop" alt="Vintage Telephone" className="w-full h-full object-cover opacity-80 sepia brightness-75 mix-blend-luminosity" />
            </div>
            <span>◆ 1876: THE TELEPHONE ◆ "ROCK AND ROLL IS HERE TO STAY" - 1955 ◆</span>
            <div className="holo-frame-red">
               <img src="https://images.unsplash.com/photo-1550505096-748950d885a0?q=80&w=200&auto=format&fit=crop" alt="1950s Classic" className="w-full h-full object-cover opacity-80 sepia brightness-75 mix-blend-luminosity" />
            </div>
            <span>1969: LUNAR TOUCHDOWN ◆ 1984: THE PERSONAL COMPUTER</span>
         </div>
      </div>
      <div className="absolute top-[62%] w-1/2 h-20 flex items-center">
         <div className="track-left font-mono text-sm md:text-lg tracking-[0.2em] whitespace-nowrap" style={{animationDuration: '28s', animationDelay: '-12s'}}>
            <span>◆ THE GOLDEN AGE OF RADIO ◆ 1991: THE WORLD WIDE WEB ◆</span>
            <div className="holo-frame-red">
               <img src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=200&auto=format&fit=crop" alt="Vintage Tech" className="w-full h-full object-cover opacity-80 sepia brightness-75 mix-blend-luminosity" />
            </div>
            <span>"ONE SMALL STEP FOR MAN" ◆ STURGIS HERITAGE</span>
         </div>
      </div>

      {/* RIGHT STREAMS: The Future (2025+) */}
      <div className="absolute top-[32%] right-0 w-1/2 h-20 flex items-center justify-end">
         <div className="track-right font-mono text-sm md:text-lg tracking-[0.2em] whitespace-nowrap" style={{animationDuration: '22s'}}>
            <span>◆ 2030: A.G.I. PROTOCOL ACTIVE ◆ NEURAL UPLINK SECURED ◆</span>
            <div className="holo-frame-cyan">
               <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop" alt="Futuristic Smartphone" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
            </div>
            <span>2045: HOLOGRAPHIC COMMERCE</span>
            <div className="holo-frame-cyan">
               <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=200&auto=format&fit=crop" alt="Cyber Security" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
            </div>
         </div>
      </div>
      <div className="absolute top-[72%] right-0 w-1/2 h-20 flex items-center justify-end">
         <div className="track-right font-mono text-sm md:text-lg tracking-[0.2em] whitespace-nowrap" style={{animationDuration: '26s', animationDelay: '-15s'}}>
            <div className="holo-frame-cyan">
               <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=200&auto=format&fit=crop" alt="Quantum Grid" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
            </div>
            <span>◆ 2050: DYSON SPHERE INITIATIVE ◆</span>
            <span>MARS COLONY ROUTE ◆ NEXT-GEN SURVIVAL HARDWARE</span>
            <div className="holo-frame-cyan">
               <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=200&auto=format&fit=crop" alt="Matrix Code" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
            </div>
         </div>
      </div>
      
      {/* THE SYNERGY CORE */}
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="w-[60vw] h-[60vh] bg-[radial-gradient(circle_at_center,#000000_15%,transparent_65%)] opacity-80 z-10"></div>
      </div>
    </div>
  );
}