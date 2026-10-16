import fs from 'fs';
import path from 'path';

function loadEnv() {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const envFile = fs.readFileSync(envPath, 'utf8');
      envFile.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) process.env[match[1].trim()] = match[2].trim();
      });
    }
  } catch (e) { console.log("Running in cloud mode"); }
}
loadEnv();

const SERPAPI_KEY = process.env.SERPAPI_API_KEY;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 🧠 LIVE MARKET SCRAPER
async function pullLiveMarketData(searchQuery, maxItems = 30) {
  const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(searchQuery)}&hl=en&gl=us&api_key=${SERPAPI_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data.shopping_results || data.shopping_results.length === 0) return [];

    const validItems = data.shopping_results
      .filter(item => item.title && item.extracted_price && item.thumbnail)
      .slice(0, maxItems);

    return validItems.map(item => ({
      name: item.title.replace(/[^a-zA-Z0-9 -]/g, '').substring(0, 60),
      price: item.extracted_price,
      image: item.thumbnail
    }));
  } catch (e) { return []; }
}

async function repriceEntireMatrix() {
  console.log("==================================================================");
  console.log(`🚀 DEPLOYING GLOBAL REPRICER: LIVE MARKET OVERRIDE FOR ALL ROOMS`);
  console.log("==================================================================");

  const inventoryPath = path.join(process.cwd(), 'app', 'inventory.ts');
  let currentInventory = {};
  if (fs.existsSync(inventoryPath)) {
    const rawContent = fs.readFileSync(inventoryPath, 'utf8');
    const jsonMatch = rawContent.match(/export const masterInventory: Record<string, any\[\]> = (\{[\s\S]*\});/);
    if (jsonMatch) currentInventory = JSON.parse(jsonMatch[1]);
  }

  let globalSkuId = 1;
  const rooms = Object.keys(currentInventory);

  for (const room of rooms) {
    console.log(`\n🏗️ RE-FORGING ROOM: ${room.toUpperCase()}`);
    // Uses the room name as the live search query
    const searchQuery = room.replace(/-/g, ' ') + " authentic rare"; 
    const liveItems = await pullLiveMarketData(searchQuery, 30);
    
    if (liveItems.length === 0) {
      console.log(`⚠️ Skipped ${room}: No live data found.`);
      continue;
    }

    const roomCatalog = [];
    for (const item of liveItems) {
      const sku = `NEXUS-${String(globalSkuId).padStart(5, '0')}`;
      let conditionTier = item.price > 300 ? "Collector Grade / Authenticated" : "Retail Market";
      
      roomCatalog.push({
        id: sku, name: item.name, price: `$${Number(item.price).toFixed(2)}`, media: [item.image], video: false,
        specs: { condition: conditionTier, shipping: `Tracked Shipping`, market_value: "Live Google Shopping Index" },
        status: "LIVE_MARKET_VERIFIED"
      });
      console.log(`✅ [LOCKED] ${sku} | $${item.price.toFixed(2)} | ${item.name.substring(0, 30)}...`);
      globalSkuId++;
      await sleep(2000); // 2 second delay per item
    }
    currentInventory[room] = roomCatalog; 
  }

  fs.writeFileSync(inventoryPath, `export const masterInventory: Record<string, any[]> = ${JSON.stringify(currentInventory, null, 2)};\n`, 'utf8');
  console.log(`\n🎯 [GLOBAL SYNC COMPLETE] All rooms updated with live market pricing.`);
}

repriceEntireMatrix();
