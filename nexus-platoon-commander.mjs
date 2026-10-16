import fs from 'fs';
import path from 'path';

const ACTIVE_PLATOON = 7; 

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

// 🧠 LIVE MARKET SCRAPER - MAXIMIZED FOR SUPER ROOMS
async function pullLiveMarketData(searchQuery, maxItems) {
  console.log(`\n📡 Scanning Live National Market for: "${searchQuery}" (Target: ${maxItems} units)...`);
  const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(searchQuery)}&num=100&hl=en&gl=us&api_key=${SERPAPI_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.shopping_results || data.shopping_results.length === 0) {
      console.log("⚠️ No live market data found.");
      return [];
    }

    const validItems = data.shopping_results
      .filter(item => item.title && item.extracted_price && item.thumbnail)
      .slice(0, maxItems);

    return validItems.map(item => ({
      name: item.title.replace(/[^a-zA-Z0-9 -]/g, '').substring(0, 60),
      price: item.extracted_price,
      image: item.thumbnail
    }));

  } catch (e) { 
    console.log("❌ Live Market API Error", e);
    return []; 
  }
}

// THE MEGA-PLATOON LINEUP
const platoons = {
  7: [ 
    { room: "super-squishies-hub", brand: "Nexus Pop", query: "rare squishmallows plush collectible authentic", max: 100 },
    { room: "blind-box-vault", brand: "Nexus Pop", query: "pop mart blind box secret rare figure", max: 100 },
    { room: "the-lost-edge", brand: "Nexus Edge", query: "edgy pop culture novelty gift custom spencers", max: 50 },
    { room: "decade-60s-70s", brand: "Heritage Vault", query: "vintage 1960s 1970s authentic decor clothing", max: 40 },
    { room: "decade-80s-90s", brand: "Heritage Vault", query: "vintage 1980s 1990s retro staples apparel", max: 40 },
    { room: "decade-y2k", brand: "Heritage Vault", query: "authentic y2k 2000s fashion accessories", max: 40 },
    { room: "consignment-vault", brand: "Nexus Vault", query: "psa 10 high end graded trading cards", max: 50 }
  ]
};

async function executePlatoon() {
  const activeDivisions = platoons[ACTIVE_PLATOON];
  if (!activeDivisions) return console.error("❌ Invalid Platoon Selected.");

  console.log("==================================================================");
  console.log(`🚀 DEPLOYING MEGA-PLATOON: TRAFFIC DRIVERS & DECADE VAULTS`);
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
      const sku = `TRAFFIC-${String(globalSkuId).padStart(5, '0')}`;
      const customerShipping = getShippingCharge(item.price);
      let conditionTier = item.price > 300 ? "Collector Grade / Authenticated" : "Retail Market";

      roomCatalog.push({
        id: sku, 
        name: item.name, 
        price: `$${Number(item.price).toFixed(2)}`, 
        media: [item.image], 
        video: false,
        specs: { 
          manufacturer: division.brand, 
          condition: conditionTier, 
          shipping: `Tracked Shipping ($${customerShipping.toFixed(2)})`,
          market_value: "Live Google Shopping Index"
        },
        status: "LIVE_MARKET_VERIFIED"
      });
      
      console.log(`✅ [LOCKED] ${sku} | $${item.price.toFixed(2)} | ${item.name.substring(0, 30)}...`);
      globalSkuId++;
      
      await sleep(500); 
    }
    
    currentInventory[division.room] = roomCatalog; 
    await sleep(3000); 
  }

  fs.writeFileSync(inventoryPath, `export const masterInventory: Record<string, any[]> = ${JSON.stringify(currentInventory, null, 2)};\n`, 'utf8');
  console.log(`\n🎯 [MEGA-PLATOON SYNC COMPLETE] Traffic Drivers & Decade Vaults Active.`);
}

executePlatoon();