p = p
  .replace(/1\. The Wellness & Family Sanctuary/g, "1. The Beacon of Hope Sanctuary & Wellness Mall")
  .replace(/1\. Special Needs, Expecting, MD, Deaf\/Blind & PTSD Superstores \(5 Stores\)/g, "🌟 1. The Beacon of Hope Sanctuary (All 5 Family Superstores + 12-Mile Event Radars)")
  .replace(/📍 12-MILE SANCTUARY EVENT FINDER &amp; HARD-TO-FIND SUPERSTORES \(10–20% OFF\)/g, "🌟 THE BEACON OF HOPE SANCTUARY • ALL 4 COLOR-CODED 12-MILE RADARS, BREAKTHROUGHS & SUPERSTORES")
  .replace(/Enter Your 5-Digit ZIP to Find Local 12-Mile Events &amp; Shop Each Ribbon Store:/g, "🌟 THE BEACON OF HOPE SANCTUARY — Enter Your 5-Digit ZIP for 12-Mile Events, Breakthroughs & Superstores:")
  .replace(/🧩 1\. AUTISM \(BLUE &amp; GOLD RIBBON\)/g, "🧩 1. Spectrum & Sensory (Blue & Gold Ribbon)")
  .replace(/🌻 2\. DOWN SYNDROME &amp; MD \(BLUE\/YELLOW\)/g, "🌻 2. Bright Horizons: Down Syndrome & MD")
  .replace(/🤟 3\. DEAF &amp; BLIND \(SILVER\/TURQUOISE\)/g, "🤟 3. Sight & Sound: Blind & Deaf Connection")
  .replace(/🎖️ 4\. PTSD RECOVERY \(TEAL RIBBON\)/g, "🎖️ 4. Valor & Peace: PTSD & Veteran Calm")
  .replace(/Shop Autism Store →/g, "🏪 Spectrum Superstore →")
  .replace(/Shop Down\/MD Store →/g, "🏪 Bright Horizons Store →")
  .replace(/Shop Deaf &amp; Blind Store →/g, "🏪 Sight & Sound Store →")
  .replace(/Shop PTSD Calm Store →/g, "🏪 Valor & Peace Store →")
  .replace(/10–20% OFF/gi, "Competitive Direct Value")
  .replace(/\(10–20% Below Retail\)/gi, "(Competitive Direct Value)")
  .replace(/10%–20% Below Specialty Retail/gi, "Competitive Direct Value");

fs.writeFileSync("app/page.tsx", p, "utf8");

// Also add a top link to the 2026 Breakthroughs & 12-Mile Bulletin Board inside app/nostalgia/[storeId]/page.tsx
let sf = fs.readFileSync("app/nostalgia/[storeId]/page.tsx", "utf8");
sf = sf.replace(/FULFILLMENT/g, "EXPEDITED SHIPPING (3-7 DAYS)").replace(/10–20% OFF/gi, "Direct Value");
if (!sf.includes("spectrum-knowledge-vault.html")) {
  sf = sf.replace(
    /(RETURN TO CONCOURSE[\s\S]*?<\/Link>)/i,
    `$1 <a href="/spectrum-knowledge-vault.html" className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-black text-xs uppercase">🌟 Beacon of Hope 12-Mi Radar &amp; 2026 Breakthroughs →</a>`
  );
}
fs.writeFileSync("app/nostalgia/[storeId]/page.tsx", sf, "utf8");
console.log("✅ STEP 4B DONE: Beacon of Hope Sanctuary, Car Wash Pro & Storefront Header Wired!");
