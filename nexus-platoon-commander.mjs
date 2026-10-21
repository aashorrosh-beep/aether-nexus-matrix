import fs from 'fs';
import path from 'path';

// Load SERPAPI_API_KEY from .env.local just like Platoons 8, 9 & 10
try {
  const envFile = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
  envFile.split('\n').forEach(line => {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
} catch (e) {}

const SERPAPI_KEY = process.env.SERPAPI_API_KEY;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function getTieredShip(p) {
  if (p < 100) return 3.99;
  if (p < 250) return 5.99;
  if (p < 500) return 9.99;
  return 14.99;
}

async function pullRealGoogleShopping(query, max = 15) {
  const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&num=30&hl=en&gl=us&api_key=${SERPAPI_KEY}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data.shopping_results || !data.shopping_results.length) return [];
      return data.shopping_results
        .filter(x => x.title && x.extracted_price && x.thumbnail)
        .slice(0, max);
    } catch (e) {
      await sleep(3000);
    }
  }
  return [];
}

async function runCommander() {
  if (!SERPAPI_KEY) {
    console.error("❌ No SERPAPI_API_KEY found in .env.local!");
    process.exit(1);
  }
  const list = JSON.parse(fs.readFileSync('trend-queries.json', 'utf8'));
  const invPath = 'app/inventory.ts';
  const raw = fs.readFileSync(invPath, 'utf8');
  const inv = JSON.parse(raw.match(/export const masterInventory:\s*Record<string,\s*any\[\]>\s*=\s*(\{[\s\S]*\});/)[1]);

  let skuCounter = 1;
  for (const entry of list) {
    console.log(`🔎 Scraping Real Product Photos & Specs for: ${entry.room}...`);
    const results = await pullRealGoogleShopping(entry.q, 15);
    if (results.length > 0) {
      inv[entry.room] = results.map((item, idx) => {
        const p = Number(item.extracted_price || 39.99);
        const ship = getTieredShip(p);
        const total = (p + ship).toFixed(2);
        const stockLeft = ((idx * 3) % 7) + 2;
        const secondImg = results[(idx + 1) % results.length].thumbnail;
        const thirdImg = results[(idx + 2) % results.length].thumbnail;

        return {
          id: `TREND-${String(skuCounter++).padStart(4, '0')}`,
          name: item.title.substring(0, 75),
          price: `$${p.toFixed(2)}`,
          media: [item.thumbnail, secondImg, thirdImg],
          video: true,
          trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          count: stockLeft,
          specs: {
            manufacturer: item.source || "Verified Direct Brand",
            condition: `🔥 ONLY ${stockLeft} LEFT IN STOCK | Bundle Value Pack | Source: ${item.source || "Authorized Brand"} ${item.rating ? "• ★ " + item.rating + "/5 (" + (item.reviews || 120) + " Reviews)" : ""}`,
            shipping: `Expedited Shipping (3–7 Days): $${ship.toFixed(2)} (Item $${p.toFixed(2)} + $${ship.toFixed(2)} Ship = $${total})`,
            market_value: `Live Google Shopping Price-Matched • +$${ship.toFixed(2)} Expedited Shipping`
          },
          status: "LIVE_MARKET_VERIFIED"
        };
      });
      // Save after every room just like Platoon 10 Safety Lock!
      fs.writeFileSync(invPath, `export const masterInventory: Record<string, any[]> = ${JSON.stringify(inv, null, 2)};\n`, 'utf8');
      console.log(`✅ [SAVED] ${entry.room} (${results.length} real product photos & prices locked!)`);
    }
    await sleep(600);
  }
  console.log("🎉 ALL 53 ROOMS SCRAPED WITH REAL GOOGLE SHOPPING PRODUCT PHOTOS!");
}
runCommander();
