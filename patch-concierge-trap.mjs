import fs from "fs";
let p = fs.readFileSync("app/page.tsx", "utf8");

// 1. Upgrade wording to strict 3-Hour Turnaround + 24-Hour Hold
p = p.replace(/3–4 Hours/g, "3 Hours").replace(/3–4 Hr/g, "3-Hr").replace(/3-4 Hr/g, "3-Hr");

const trapBanner = `<div className="mt-3 bg-gradient-to-r from-amber-950/90 via-zinc-900 to-pink-950/90 border-2 border-amber-400 rounded-2xl p-3.5 flex flex-col md:flex-row justify-between items-center gap-3 shadow-lg">
  <div className="text-xs text-zinc-100 text-left">
    <span className="bg-amber-400 text-black font-black px-2 py-0.5 rounded uppercase mr-1.5">🎩 VIP AI CONCIERGE</span>
    <b>DON&apos;T SEE IT? NEVER LEAVE THE STORE!</b> Tell us what you want — we will source it cheaper, email your private link within <b className="text-emerald-400">3 HOURS</b>, and lock it on a <b className="text-yellow-300">24-HOUR HOLD</b> just for you!
  </div>
  <Link href={"/nostalgia/concierge" + (mallQuery ? "?q=" + encodeURIComponent(mallQuery) : "")} className="bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase px-5 py-3 rounded-xl shrink-0 shadow">
    🎩 Get It Within 3 Hrs (24-Hr Hold) →
  </Link>
</div>`;
// 2. Inject right under the top Search input AND inside the Mega-Menu Corridor view
if (!p.includes("NEVER LEAVE THE STORE!")) {
  p = p.replace(
    /(placeholder="Try: ugly sweater[\s\S]*?<\/div>\s*<\/div>)/,
    `$1\n          ${trapBanner}`
  );
  p = p.replace(
    /(Back to All [56] Malls \(One Out\)\s*<\/button>\s*<\/div>)/,
    `$1\n          ${trapBanner}`
  );
}

fs.writeFileSync("app/page.tsx", p, "utf8");
console.log("✅ STEP 1B DONE: 3-Hour / 24-Hour Hold Concierge Locked Under Search & Inside Mega-Menus!");
