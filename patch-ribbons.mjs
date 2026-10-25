import fs from "fs";
let p = fs.readFileSync("app/page.tsx", "utf8");

if (!p.includes("sanctuaryZip")) {
  p = p.replace(
    'const [mallQuery, setMallQuery] = useState("");',
    'const [mallQuery, setMallQuery] = useState("");\n  const [sanctuaryZip, setSanctuaryZip] = useState("77301");'
  );
}

const ribbonHelper = `
const RIBBON_MAP: Record<string, { border: string; badge: string; radar: string }> = {
  "spectrum-sensory-superstore": { border: "border-2 border-blue-400 bg-blue-950/50", badge: "🧩 AUTISM RIBBON (BLUE & GOLD) • 10–20% OFF", radar: "Autism+Sensory+Friendly+Events+Clinics" },
  "new-life-expecting-superstore": { border: "border-2 border-pink-400 bg-pink-950/40", badge: "👶 EXPECTING & NEWBORN RIBBON (PINK & GOLD)", radar: "Maternity+Hospital+Birthing+Classes+Events" },
  "md-mobility-superstore": { border: "border-2 border-yellow-400 bg-yellow-950/40", badge: "🌻 DOWN SYNDROME & MD RIBBON (BLUE & YELLOW)", radar: "Down+Syndrome+Muscular+Dystrophy+Events+Support" },
  "deaf-blind-superstore": { border: "border-2 border-cyan-300 bg-cyan-950/50", badge: "🤟 DEAF & BLIND RIBBON (SILVER & TURQUOISE)", radar: "Deaf+ASL+Blind+Accessible+Events+Community" },
  "ptsd-calm-superstore": { border: "border-2 border-teal-400 bg-teal-950/60", badge: "🎖️ PTSD RECOVERY RIBBON (OFFICIAL TEAL)", radar: "PTSD+Veteran+Recovery+Support+Events" }
};
`;

if (!p.includes("RIBBON_MAP")) {
  p = p.replace("const wellCogs =", ribbonHelper + "\nconst wellCogs =");
}
const oldGrid = /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">\s*\{activeCog\.rooms\.filter[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*\)\}/;

const newGrid = `{activeCog.id === "w0" && (
              <div className="bg-emerald-950/80 border-2 border-emerald-400 rounded-2xl p-4 space-y-3">
                <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                  <div className="text-xs md:text-sm font-black uppercase text-yellow-300">📍 12-MILE SANCTUARY EVENT &amp; SUPPORT RADAR — ENTER YOUR 5-DIGIT ZIP CODE:</div>
                  <input value={sanctuaryZip} onChange={(e) => setSanctuaryZip(e.target.value)} maxLength={5} placeholder="ZIP (77301)" className="w-36 bg-black border-2 border-yellow-400 rounded-xl px-3 py-1.5 text-center font-black text-white" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  <a href={"/spectrum-knowledge-vault.html?zip=" + sanctuaryZip} className="bg-blue-600 border border-amber-300 text-white font-black text-[10px] uppercase py-2 px-2 rounded-xl text-center">🧩 12-Mi Autism Events ({sanctuaryZip}) →</a>
                  <a href={"https://www.google.com/maps/search/Down+Syndrome+Muscular+Dystrophy+Events+Support+near+" + sanctuaryZip} target="_blank" className="bg-yellow-400 border border-blue-600 text-black font-black text-[10px] uppercase py-2 px-2 rounded-xl text-center">🌻 12-Mi Down/MD Events →</a>
                  <a href={"https://www.google.com/maps/search/Deaf+ASL+Blind+Accessible+Events+near+" + sanctuaryZip} target="_blank" className="bg-cyan-300 border border-white text-black font-black text-[10px] uppercase py-2 px-2 rounded-xl text-center">🤟 12-Mi Deaf/Blind Events →</a>
                  <a href={"https://www.google.com/maps/search/PTSD+Veteran+Recovery+Events+Support+near+" + sanctuaryZip} target="_blank" className="bg-teal-400 border border-teal-100 text-black font-black text-[10px] uppercase py-2 px-2 rounded-xl text-center">🎖️ 12-Mi PTSD Events →</a>
                  <a href={"https://www.google.com/maps/search/Childrens+Hospital+Maternity+Emergency+near+" + sanctuaryZip} target="_blank" className="bg-pink-500 border border-white text-white font-black text-[10px] uppercase py-2 px-2 rounded-xl text-center">🏥 12-Mi Hospitals &amp; Expecting →</a>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCog.rooms.filter((r: string) => isLive(r)).map((room: string) => {
                const items = masterInventory[room] || [];
                const sample = items[0];
                const rb = RIBBON_MAP[room];
                return (
                  <div key={room} className={\`\${rb ? rb.border : "bg-zinc-900 border border-zinc-700"} hover:border-yellow-400 p-4 rounded-2xl flex flex-col justify-between gap-3 transition-all\`}>
                    {rb && <div className="text-[10px] font-black uppercase text-yellow-300 tracking-wider">{rb.badge}</div>}
                    <Link href={"/nostalgia/" + room} className="flex items-center gap-3.5 group">
                      {sample?.media?.[0] && <img src={sample.media[0]} alt="" className="w-16 h-16 rounded-xl object-cover border border-zinc-700 shrink-0" />}
                      <div className="min-w-0">
                        <div className="font-black text-sm uppercase text-white group-hover:text-yellow-400 truncate">{fmt(room)}</div>
                        <div className="text-xs font-mono text-emerald-400 mt-0.5">{items.length} Verified Items • From {sample?.price || "$24.99"}</div>
                        <div className="text-[11px] text-zinc-300 truncate mt-0.5">10%–20% Below Retail • 3–7 Day Ship →</div>
                      </div>
                    </Link>
                    {rb && (
                      <a href={"https://www.google.com/maps/search/" + rb.radar + "+near+" + sanctuaryZip} target="_blank" className="w-full bg-black/70 hover:bg-black border border-white/30 text-white font-black text-[10px] uppercase py-2 px-3 rounded-xl text-center block">
                        🔍 Scan 12-Mile Events &amp; Support ({sanctuaryZip}) →
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}`;

p = p.replace(oldGrid, newGrid);
fs.writeFileSync("app/page.tsx", p, "utf8");
console.log("✅ STEP 2B DONE: All 5 Sanctuary Stores Colored With Official Ribbons + 12-Mile Event Radars!");
