import fs from "fs";
const u = "app/stores/christmas-holiday/page.tsx";
if (fs.existsSync(u)) {
  let s = fs.readFileSync(u, "utf8");
  const target = `{item.isCuratedBundle ? "🎁 1-BOX BUNDLE" : "📸 3 Photos + Video"}</span>`;
  const badge = `{item.isCuratedBundle ? "🎁 1-BOX BUNDLE" : "📸 3 Photos + Video"}</span>
                {(item.count || 4) <= 5 ? (
                  <div className="absolute top-3 -right-9 rotate-45 bg-red-600 text-white text-[10px] font-black uppercase py-1 w-36 text-center shadow-lg border-y border-amber-300 animate-pulse">🔥 ONLY {item.count || 3} LEFT!</div>
                ) : (item.count || 8) <= 11 ? (
                  <div className="absolute top-3 -right-9 rotate-45 bg-amber-400 text-black text-[10px] font-black uppercase py-1 w-36 text-center shadow-lg">⚡ {item.count} LEFT</div>
                ) : (
                  <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-black text-[10px] font-black px-2 py-0.5">✅ {item.count} In Stock</div>
                )}
                <div className={(item.count || 4) <= 5 ? "absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-black bg-red-700/95 text-white flex justify-between" : "absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-black bg-black/80 text-emerald-400 flex justify-between"}>
                  <span>{(item.count || 4) <= 5 ? "⚠️ HURRY — ONLY " + (item.count || 3) + " LEFT!" : "✅ " + (item.count || 12) + " IN STOCK • BACKUP READY"}</span>
                  <span>🔄 Auto-Shift</span>
                </div>`;
  if (!s.includes("🔥 ONLY")) {
    s = s.replace(target, badge);
    fs.writeFileSync(u, s, "utf8");
  }
  console.log("✅ PART B DONE: Visual Scarcity Stripes Injected!");
}
