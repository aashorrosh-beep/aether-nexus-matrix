import fs from "fs";
let p = fs.readFileSync("app/page.tsx", "utf8");
p = p.replace(/SPORTLICK|SPORTPLEX|SPORTFLIX/g, "SPORTSFLIX")
     .replace(/Sportlick|Sportplex|Sportflix/g, "Sportsflix")
     .replace(/,\s*"new-life-expecting-superstore"(?!\s*:)/g, "")
     .replace(/"new-life-expecting-superstore"(?!\s*:)\s*,\s*/g, "");

const card = (bg, bdr, badge, title, sub, href, btn) => `
  <div className="bg-gradient-to-r ${bg} border-2 ${bdr} rounded-3xl p-4 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
    <div>
      <span className="inline-block bg-amber-400 text-black font-black text-xs px-2.5 py-0.5 rounded-full uppercase mb-1">${badge}</span>
      <h2 className="text-xl md:text-2xl font-black text-white">${title}</h2>
      <p className="text-zinc-200 text-xs mt-0.5">${sub}</p>
    </div>
    <a href="${href}" className="px-4 py-2.5 rounded-xl bg-amber-400 text-black font-black text-xs uppercase shrink-0 shadow-lg">${btn}</a>
  </div>`;

const hero = `<div className="w-full max-w-7xl mx-auto px-4 pt-4 pb-2 flex flex-col gap-3">
  ${card("from-red-950 to-emerald-950", "border-amber-400", "🎄 Top 100 In-Stock Bestsellers", "🎁 Holiday Favorites & Monday Wishlist Top 100 Superstore", "Tight 5%–6% High-Velocity Pricing • Beats Big-Box Landed Price Even After Shipping & Card Fees", "/nostalgia/holiday-wishlist-100-superstore", "🎄 Shop Holiday Top 100 →")}
  ${card("from-rose-950 to-pink-900", "border-pink-300", "✨ Joyful Motherhood Wing", "👶 When You're Expecting, Nursery & Free Infant/Adult CPR Classes", "100% Dedicated Motherhood Wing • Equal To or 10% Below Specialty Competitors", "/nostalgia/new-life-expecting-superstore", "🍼 Shop Expecting + CPR →")}
  ${card("from-fuchsia-950 to-indigo-950", "border-fuchsia-400", "🎉 10%–20% Below Custom Shops", "🎈 Party Lapooza Mega-Store + Live AI Face-Swap & Customizer", "88–170 Pc Room Boxes • 3+ Vendor Photos, Video & Live Customization Examples", "/party-lapooza-ai-studio.html", "🎨 Open Customizer & Kits →")}
</div>`;

if (!p.includes("holiday-wishlist-100-superstore")) {
  p = p.replace(/<main([^>]*)>/, `<main$1>\n${hero}`);
}
fs.writeFileSync("app/page.tsx", p, "utf8");
console.log("✅ SHORT SCRIPT APPLIED CLEANLY!");
