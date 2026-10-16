import fs from 'fs';
import path from 'path';

const ACTIVE_PLATOON = 9; 

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

// THE Q4 LIFESTYLE & HOLIDAY LINEUP
const platoons = {
  9: [ 
    { room: "holiday-illumination", brand: "Nexus Seasonal", query: "twinkly smart christmas lights commercial grade outdoor led", max: 50 },
    { room: "premium-pet-supply", brand: "Nexus Lifestyle", query: "luxury smart pet dog feeder orthotic bed accessories", max: 50 },
    { room: "viral-home-trends", brand: "Nexus Lifestyle", query: "viral tiktok smart home galaxy projector premium drinkware", max: 50 }
  ]
};

async function executePlatoon() {
  const activeDivisions = platoons[ACTIVE_PLATOON];
  if (!activeDivisions) return console.error("❌ Invalid Platoon Selected.");

  console.log("==================================================================");
  console.log(`🚀 DEPLOYING PLATOON 9: HOLIDAY LIGHTS, PETS & VIRAL TRENDS`);
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
      const sku = `LIFESTYLE-${String(globalSkuId).padStart(4, '0')}`;
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
  console.log(`\n🎯 [PLATOON 9 COMPLETE] Lifestyle & Holiday Rooms Active.`);
}

executePlatoon();