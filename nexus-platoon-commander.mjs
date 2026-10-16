import fs from 'fs';
import path from 'path';

const ACTIVE_PLATOON = 8; 

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

function getShippingCharge(price) {
  if (price <= 20) return 4.99; 
  if (price <= 50) return 7.99; 
  if (price <= 150) return 14.99; 
  return 24.99; 
}

// 🧠 LIVE MARKET SCRAPER
async function pullLiveMarketData(searchQuery, maxItems) {
  console.log(`\n📡 Scanning Live Market for: "${searchQuery}"...`);
  const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(searchQuery)}&num=100&hl=en&gl=us&api_key=${SERPAPI_KEY}`;
  
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

// THE Q4 SEASONAL & AESTHETIC LINEUP
const platoons = {
  8: [ 
    { room: "ugly-sweater-party", brand: "Nexus Seasonal", query: "funny ugly christmas sweater retro nostalgic", max: 40 },
    { room: "friendsgiving-vault", brand: "Nexus Seasonal", query: "friendsgiving party decor aesthetic gift", max: 40 },
    { room: "holiday-gag-gifts", brand: "Nexus Seasonal", query: "funny gen z millennial gag gift holiday novelty", max: 40 },
    { room: "seasonal-gift-baskets", brand: "Nexus Seasonal", query: "premium holiday gift basket care package", max: 40 },
    { room: "lofi-study-room", brand: "Nexus Aesthetics", query: "aesthetic lofi study room desk setup decor", max: 50 }
  ]
};

async function executePlatoon() {
  const activeDivisions = platoons[ACTIVE_PLATOON];
  if (!activeDivisions) return console.error("❌ Invalid Platoon Selected.");

  console.log("==================================================================");
  console.log(`🚀 DEPLOYING PLATOON 8: Q4 SEASONAL & AESTHETIC DROP`);
  console.log("==================================================================");

  let currentInventory = {};
  const inventoryPath = path.join(process.cwd(), 'app', 'inventory.ts');
  if (fs.existsSync(inventoryPath)) {
    const rawContent = fs.readFileSync(inventoryPath, 'utf8');
    try {
      const jsonMatch = rawContent.match(/export const masterInventory: Record<string, any\[\]> = (\{[\s\S]*\});/);
      if (jsonMatch) currentInventory = JSON.parse(jsonMatch[1]);
    } catch (e) {}
  }

  let globalSkuId = 1;

  for (const division of activeDivisions) {
    const liveItems = await pullLiveMarketData(division.query, division.max);
    const roomCatalog = [];

    for (const item of liveItems) {
      const sku = `HOLIDAY-${String(globalSkuId).padStart(4, '0')}`;
      const customerShipping = getShippingCharge(item.price);

      roomCatalog.push({
        id: sku, 
        name: item.name, 
        price: `$${Number(item.price).toFixed(2)}`, 
        media: [item.image], 
        video: false,
        specs: { 
          manufacturer: division.brand, 
          condition: "Retail New", 
          shipping: `Tracked Shipping ($${customerShipping.toFixed(2)})`,
          market_value: "Live Google Shopping Index"
        },
        status: "LIVE_MARKET_VERIFIED"
      });
      
      console.log(`✅ [LOCKED] ${sku} | $${item.price.toFixed(2)} | ${item.name.substring(0, 30)}...`);
      globalSkuId++;
      await sleep(400); 
    }
    
    currentInventory[division.room] = roomCatalog; 
    await sleep(2000); 
  }

  fs.writeFileSync(inventoryPath, `export const masterInventory: Record<string, any[]> = ${JSON.stringify(currentInventory, null, 2)};\n`, 'utf8');
  console.log(`\n🎯 [PLATOON 8 COMPLETE] Seasonal & Study Rooms Active.`);
}

executePlatoon();