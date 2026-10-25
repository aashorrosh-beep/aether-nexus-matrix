import fs from "fs";
let p = fs.readFileSync("app/page.tsx", "utf8");

const niceNames = `const NICE_NAMES: Record<string,string> = {
  "spectrum-sensory-superstore": "🧩 Beacon of Hope: Spectrum & Sensory Discovery Superstore",
  "new-life-expecting-superstore": "👶 Beacon of Hope: New Life & Expecting Motherhood Superstore",
  "md-mobility-superstore": "🌻 Beacon of Hope: Bright Horizons, Trisomy 21 & Mobility Superstore",
  "deaf-blind-superstore": "🤟 Beacon of Hope: Sight, Sound, Braille & ASL Connection Superstore",
  "ptsd-calm-superstore": "🎖️ Beacon of Hope: Valor, Veterans & Peace Recovery Superstore",
  "senior-mobility-independence": "🪜 Home Stair-Lifts, Modular Ramps & Mobility Superstore",
  "us-trend-car-detailing-pro": "🚗 DIY Car Wash, Snow-Foam & Auto Detail Pro Supplies",
  "custom-hats-apparel-kicks": "👕 Custom Graphic Shirts, 3D Puff Hats & Stitched Jerseys"
};\n`;

if (!p.includes("NICE_NAMES")) {
  p = p.replace("const fmt = (s: string) =>", niceNames + "const fmt = (s: string) => NICE_NAMES[s] ||");
}

p = p
  .replace(/1\. The Wellness & Family Sanctuary/g, "1. The Beacon of Hope & Holistic Wellness Sanctuary")
  .replace(/1\. Special Needs, Expecting, MD, Deaf\/Blind & PTSD Superstores \(5 Stores\)/g, "🌟 1. The Beacon of Hope Sanctuary (5 Family & Adaptive Superstores + 12-Mile Event Radars)")
  .replace(/📍 12-MILE SANCTUARY EVENT FINDER &amp; HARD-TO-FIND SUPERSTORES \(10–20\% OFF\)/g, "🌟 THE BEACON OF HOPE SANCTUARY • 5 SUPERSTORES • 4 COLOR-CODED 12-MILE RADARS &amp; BREAKTHROUGHS")
  .replace(/Enter Your 5-Digit ZIP to Find Local 12-Mile Events &amp; Shop Each Ribbon Store:/g, "🌟 THE BEACON OF HOPE SANCTUARY — Enter Your 5-Digit ZIP for 12-Mile Events, Breakthroughs &amp; Superstores:")
  .replace(/🧩 1\. AUTISM \(BLUE &amp; GOLD RIBBON\)/g, "🧩 Spectrum &amp; Sensory (Blue/Gold)")
  .replace(/🌻 2\. DOWN SYNDROME &amp; MD \(BLUE\/YELLOW\)/g, "🌻 Bright Horizons &amp; Mobility (Blue/Yellow)")
  .replace(/🤟 3\. DEAF &amp; BLIND \(SILVER\/TURQUOISE\)/g, "🤟 Sight &amp; Sound Connection (Silver/Cyan)")
  .replace(/🎖️ 4\. PTSD RECOVERY \(TEAL RIBBON\)/g, "🎖️ Valor &amp; Peace Recovery (Teal)")
  .replace(/Shop Autism Store →/g, "🏪 Sensory Superstore →")
  .replace(/Shop Down\/MD Store →/g, "🏪 Mobility Superstore →")
  .replace(/Shop Deaf &amp; Blind Store →/g, "🏪 Sight &amp; Sound Store →")
  .replace(/Shop PTSD Calm Store →/g, "🏪 Valor &amp; Peace Store →")
  .replace(/10–20% OFF/gi, "Direct Value")
  .replace(/\(10–20\% Below Retail\)/gi, "(Verified Direct Value)")
  .replace(/10%–20% Below Specialty Retail/gi, "Verified Direct Value");

fs.writeFileSync("app/page.tsx", p, "utf8");
console.log("✅ STEP 3 DONE: The Beacon of Hope Sanctuary & DIY Car Wash / Stair-Lifts / Custom Shirts Locked!");
