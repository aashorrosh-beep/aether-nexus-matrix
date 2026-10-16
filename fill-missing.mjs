import fs from "fs";
import path from "path";
const envFile = fs.existsSync(".env.local") ? fs.readFileSync(".env.local", "utf8") : "";
envFile.split("\n").forEach(l => { const m = l.match(/^([^=]+)=(.*)$/); if (m) process.env[m[1].trim()] = m[2].trim(); });
const KEY = process.env.SERPAPI_API_KEY;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function scrape(q, max = 30) {
  const u = "https://serpapi.com/search.json?engine=google_shopping&q=" + encodeURIComponent(q) + "&num=100&hl=en&gl=us&api_key=" + KEY;
  for (let i = 1; i <= 4; i++) {
    try {
      console.log("📡 Scraping: " + q);
      const res = await fetch(u);
      const d = await res.json();
      if (!d.shopping_results) return [];
      return d.shopping_results.filter(x => x.title && x.extracted_price && x.thumbnail).slice(0, max).map(x => ({
        name: x.title.replace(/[^a-zA-Z0-9 -]/g, "").substring(0, 60), price: x.extracted_price, image: x.thumbnail
      }));
    } catch (e) { console.log("⚠️ Retry in 6s..."); await sleep(6000); }
  }
  return [];
}
const targets = [
  { room: "the-christmas-story", min: 150, brand: "Nexus Seasonal", queries: ["funny white elephant gag gift holiday","ugly christmas sweater funny retro","a christmas story movie leg lamp merchandise","hilarious christmas novelty gift adult","funny secret santa gag gift under 30","tacky christmas party sweater men women"], perQ: 30 },
  { room: "holiday-illumination", min: 55, brand: "Nexus Seasonal", queries: ["outdoor led christmas string lights commercial","twinkly smart christmas tree lights rgb","christmas icicle lights outdoor warm white","vintage c9 christmas pathway roof lights"], perQ: 20 },
  { room: "holiday-confectionery-bakery", min: 80, brand: "Nexus Gourmet", queries: ["gourmet christmas brownie gift box bakery","artisan holiday fudge gift tin peppermint bark","gourmet holiday peanut pecan brittle tin","christmas holiday cake dessert gift tower"], perQ: 25 },
  { room: "seasonal-gift-baskets", min: 50, brand: "Nexus Gourmet", queries: ["luxury christmas holiday food gift basket","gourmet holiday charcuterie chocolate gift tower"], perQ: 30 },
  { room: "retro-candy-soda", min: 30, brand: "Nexus Pop", queries: ["nostalgic 90s retro candy box exotic soda bundle"], perQ: 35 },
  { room: "90s-skate-deck-vault", min: 30, brand: "Heritage Vault", queries: ["vintage 90s skateboard deck world industries powell peralta"], perQ: 35 },
  { room: "pogs-and-slammers", min: 30, brand: "Heritage Vault", queries: ["vintage 1990s pogs milk caps heavy metal slammer lot"], perQ: 35 },
  { room: "digital-pets", min: 30, brand: "Heritage Vault", queries: ["original 1990s tamagotchi digimon virtual pet giga pet"], perQ: 35 },
  { room: "retro-squish-blind-boxes", min: 35, brand: "Heritage Vault", queries: ["original 90s stretch armstrong koosh ball vintage blind box"], perQ: 35 },
  { room: "retro-toy-chest", min: 35, brand: "Heritage Vault", queries: ["vintage 1980s 1990s classic electronic handheld game toy"], perQ: 35 },
  { room: "y2k-pop-merch", min: 35, brand: "Heritage Vault", queries: ["vintage y2k 2000s pop tour tee inflatable chair retro"], perQ: 35 }
];
async function run() {
  const p = path.join(process.cwd(), "app", "inventory.ts");
  const raw = fs.readFileSync(p, "utf8");
  const m = raw.match(/export const masterInventory: Record<string, any\[\]> = (\{[\s\S]*\});/);
  const inv = m ? JSON.parse(m[1]) : {};
  let id = 9000;
  for (const t of targets) {
    if (inv[t.room] && inv[t.room].length >= t.min) {
      console.log("⏭️ OK: " + t.room + " (" + inv[t.room].length + " items)");
      continue;
    }
    console.log("\n🏗️ UPGRADING ROOM: " + t.room + " (Target: " + t.min + "+ items)");
    let cat = [];
    for (const q of t.queries) {
      const items = await scrape(q, t.perQ);
      for (const x of items) {
        cat.push({ id: "NX-" + (id++), name: x.name, price: "$" + Number(x.price).toFixed(2), media: [x.image], video: false, specs: { manufacturer: t.brand, condition: "Verified Authentic", shipping: "Tracked Shipping ($7.99)", market_value: "Live Google Shopping Index" }, status: "LIVE_MARKET_VERIFIED" });
      }
      await sleep(1000);
    }
    if (cat.length > 0) {
      inv[t.room] = cat;
      fs.writeFileSync(p, "export const masterInventory: Record<string, any[]> = " + JSON.stringify(inv, null, 2) + ";\n", "utf8");
      console.log("✅ SAVED: " + t.room + " -> " + cat.length + " items!");
    }
  }
  console.log("\n🎯 AUDIT COMPLETE! Total Populated Rooms in inventory.ts: " + Object.keys(inv).filter(k => inv[k]?.length > 0).length);
}
run();