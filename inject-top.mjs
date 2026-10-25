import fs from "fs";
let p = fs.readFileSync("app/page.tsx", "utf8");

if (!p.includes("const [zip12, setZip12]")) {
  p = p.replace("const [mallQuery, setMallQuery] = useState(\"\");", "const [mallQuery, setMallQuery] = useState(\"\");\n  const [zip12, setZip12] = useState(\"77301\");");
}

const topMega = `
        {/* 1. 3-HOUR AI CONCIERGE (24-HOUR HOLD) RIGHT UNDER SEARCH */}
        <div className="bg-amber-950/90 border-2 border-amber-400 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-3 shadow-lg">
          <div className="text-xs text-white text-left">
            <span className="bg-amber-400 text-black font-black px-2 py-0.5 rounded uppercase mr-2">🎩 3-HOUR AI CONCIERGE</span>
            <b>DON&apos;T SEE IT? NEVER LEAVE OUR STORE!</b> We will find it cheaper, email your link within <b className="text-emerald-400">3 HOURS</b> &amp; lock it on a <b className="text-yellow-300">24-HOUR HOLD</b>!
          </div>
          <Link href="/nostalgia/concierge" className="bg-amber-400 text-black font-black text-xs uppercase px-5 py-3 rounded-xl shrink-0">🎩 Get It Within 3 Hrs (24-Hr Hold) →</Link>
        </div>

        {/* 2. STANDALONE PARTY LAPOOZA MEGA-SUPERSTORE BANNER */}
        <div className="bg-gradient-to-r from-fuchsia-950 via-purple-950 to-pink-950 border-2 border-fuchsia-400 rounded-3xl p-5 space-y-3 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-left">
              <span className="bg-fuchsia-400 text-black font-black text-[10px] uppercase px-3 py-1 rounded-full">🎉 STANDALONE MEGA-SUPERSTORE • 15 PARTY STORES</span>
              <h2 className="text-2xl md:text-4xl font-black uppercase text-white mt-1">PARTY LAPOOZA • MEGA PARTY SUPERSTORE</h2>
              <p className="text-xs text-yellow-300 font-bold">✨ Where Fun, Adventure &amp; Imagination Come to Life — Put Yourself in the Middle of the Magic! ✨</p>
            </div>
            <a href="/party-lapooza-ai-studio.html" className="bg-yellow-400 text-black font-black text-xs uppercase px-5 py-3.5 rounded-xl shrink-0">🎨 Launch Free AI Face-Swap Studio →</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-1">
            <Link href="/nostalgia/lapooza-boys-ages-1-5" className="bg-black/80 border border-fuchsia-400 text-white font-black text-[11px] uppercase p-2.5 rounded-xl text-center">🦖 Boys 1–5 (Shrek/Dino) →</Link>
            <Link href="/nostalgia/lapooza-boys-ages-5-10" className="bg-black/80 border border-fuchsia-400 text-white font-black text-[11px] uppercase p-2.5 rounded-xl text-center">🎮 Boys 5–16 Party →</Link>
            <Link href="/nostalgia/lapooza-girls-ages-1-5" className="bg-black/80 border border-fuchsia-400 text-white font-black text-[11px] uppercase p-2.5 rounded-xl text-center">🦄 Girls 1–16 Party →</Link>
            <Link href="/nostalgia/lapooza-quinceanera-royale" className="bg-black/80 border border-fuchsia-400 text-white font-black text-[11px] uppercase p-2.5 rounded-xl text-center">👑 Quince &amp; Bridal →</Link>
            <Link href="/nostalgia/lapooza-balloon-arch-helium" className="bg-fuchsia-500 text-black font-black text-[11px] uppercase p-2.5 rounded-xl text-center">🎈 Helium &amp; 150pc Arch →</Link>
          </div>
        </div>
`;
const fourRibbons = `
        {/* 3. ALL 4 SEPARATE COLORED RIBBON SANCTUARIES + 12-MILE EVENT RADAR */}
        <div className="bg-zinc-950 border-2 border-emerald-400 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-left">
              <span className="bg-emerald-400 text-black font-black text-[10px] uppercase px-3 py-1 rounded-full">📍 12-MILE SANCTUARY EVENT FINDER &amp; HARD-TO-FIND SUPERSTORES (10–20% OFF)</span>
              <h2 className="text-lg md:text-2xl font-black uppercase text-white mt-1">Enter Your 5-Digit ZIP to Find Local 12-Mile Events &amp; Shop Each Ribbon Store:</h2>
            </div>
            <input value={zip12} onChange={e => setZip12(e.target.value)} maxLength={5} placeholder="ZIP (77301)" className="w-40 bg-black border-2 border-yellow-400 rounded-xl px-4 py-2 text-center font-black text-xl text-white" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-blue-950 border-2 border-blue-400 rounded-2xl p-3.5 space-y-2">
              <div className="text-xs font-black uppercase text-amber-300">🧩 1. AUTISM (BLUE &amp; GOLD RIBBON)</div>
              <a href={"/spectrum-knowledge-vault.html?zip=" + zip12} className="w-full bg-amber-400 text-black font-black text-xs uppercase py-2.5 rounded-xl block text-center">🔍 12-Mi Autism Events ({zip12}) →</a>
              <Link href="/nostalgia/spectrum-sensory-superstore" className="w-full bg-blue-600 text-white font-black text-xs uppercase py-2.5 rounded-xl block text-center">🏪 Shop Autism Store →</Link>
            </div>
            <div className="bg-yellow-950 border-2 border-yellow-400 rounded-2xl p-3.5 space-y-2">
              <div className="text-xs font-black uppercase text-yellow-300">🌻 2. DOWN SYNDROME &amp; MD (BLUE/YELLOW)</div>
              <a href={"https://www.google.com/maps/search/Down+Syndrome+Muscular+Dystrophy+Events+near+" + zip12} target="_blank" className="w-full bg-yellow-400 text-black font-black text-xs uppercase py-2.5 rounded-xl block text-center">🔍 12-Mi Down/MD Events ({zip12}) →</a>
              <Link href="/nostalgia/md-mobility-superstore" className="w-full bg-blue-700 text-yellow-300 font-black text-xs uppercase py-2.5 rounded-xl block text-center">🏪 Shop Down/MD Store →</Link>
            </div>
            <div className="bg-cyan-950 border-2 border-white rounded-2xl p-3.5 space-y-2">
              <div className="text-xs font-black uppercase text-cyan-300">🤟 3. DEAF &amp; BLIND (SILVER/TURQUOISE)</div>
              <a href={"https://www.google.com/maps/search/Deaf+ASL+Blind+Accessible+Events+near+" + zip12} target="_blank" className="w-full bg-cyan-400 text-black font-black text-xs uppercase py-2.5 rounded-xl block text-center">🔍 12-Mi Deaf/Blind Events ({zip12}) →</a>
              <Link href="/nostalgia/deaf-blind-superstore" className="w-full bg-white text-black font-black text-xs uppercase py-2.5 rounded-xl block text-center">🏪 Shop Deaf &amp; Blind Store →</Link>
            </div>
            <div className="bg-teal-950 border-2 border-teal-400 rounded-2xl p-3.5 space-y-2">
              <div className="text-xs font-black uppercase text-teal-300">🎖️ 4. PTSD RECOVERY (TEAL RIBBON)</div>
              <a href={"https://www.google.com/maps/search/PTSD+Veteran+Support+Events+near+" + zip12} target="_blank" className="w-full bg-teal-400 text-black font-black text-xs uppercase py-2.5 rounded-xl block text-center">🔍 12-Mi PTSD Events ({zip12}) →</a>
              <Link href="/nostalgia/ptsd-calm-superstore" className="w-full bg-teal-700 text-white font-black text-xs uppercase py-2.5 rounded-xl block text-center">🏪 Shop PTSD Calm Store →</Link>
            </div>
          </div>
        </div>
`;

// Inject right before the QUICK JUMP TABS comment or flex-wrap gap-2 justify-center
const anchor = p.indexOf("{/* QUICK JUMP TABS") !== -1 ? "{/* QUICK JUMP TABS" : "<div className=\"flex flex-wrap gap-2 justify-center";
if (!p.includes("PARTY LAPOOZA • MEGA PARTY SUPERSTORE") && anchor) {
  p = p.replace(anchor, topMega + "\n" + fourRibbons + "\n        " + anchor);
}
fs.writeFileSync("app/page.tsx", p, "utf8");
console.log("✅ INJECTED VERIFIED:", p.includes("PARTY LAPOOZA • MEGA PARTY SUPERSTORE"), p.includes("3. DEAF &amp; BLIND"));
