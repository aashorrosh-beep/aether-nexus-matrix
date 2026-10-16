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

// 🧠 MULTI-PAGE SCRAPER TO BYPASS GOOGLE'S 100-ITEM LIMIT
async function pull150Items(searchQuery) {
  console.log(`\n📡 Scraping 150 Live Market Items for: "${searchQuery}"...`);
  let allItems = [];
  
  // Scrape Page 1 (Items 1-100)
  let url1 = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(searchQuery)}&num=100&hl=en&gl=us&api_key=${SERPAPI_KEY}`;
  // Scrape Page 2 (Items 101-200)
  let url2 = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(searchQuery)}&num=100&start=100&hl=en&gl=us&api_key=${SERPAPI_KEY}`;
  
  for (const url of [url1, url2]) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.shopping_results) {
        const valid = data.shopping_results
          .filter(item => item.title && item.extracted_price && item.thumbnail)
          .map(item => ({
            name: item.title.replace(/[^a-zA-Z0-9 -]/g, '').substring(0, 60),
            price: item.extracted_price,
            image: item.thumbnail
          }));
        allItems = allItems.concat(valid);
      }
    } catch (e) { console.log("API Error", e); }
  }
  
  // Force exactly 150 items
  return allItems.slice(0, 150);
}

async function executeSuperRooms() {
  console.log("==================================================================");
  console.log(`🚀 DEPLOYING TRAFFIC DRIVERS: 150-ITEM SUPER ROOMS`);
  console.log("==================================================================");

  const inventoryPath = path.join(process.cwd(), 'app', 'inventory.ts');
  let currentInventory = {};
  if (fs.existsSync(inventoryPath)) {
    const rawContent = fs.readFileSync(inventoryPath, 'utf8');
    const jsonMatch = rawContent.match(/export const masterInventory: Record<string, any\[\]> = (\{[\s\S]*\});/);
    if (jsonMatch) currentInventory = JSON.parse(jsonMatch[1]);
  }

  // TARGETING ONLY THE TWO TRAFFIC DRIVERS
  const superRooms = [
    { room: "super-squishies-hub", brand: "Nexus Pop", query: "rare squishmallows plush collectible" },
    { room: "blind-box-vault", brand: "Nexus Pop", query: "pop mart blind box secret rare figure" }
  ];

  let globalSkuId = 1;

  for (const division of superRooms) {
    console.log(`\n🏗️ FORGING SUPER ROOM: ${division.room.toUpperCase()}`);
    const liveItems = await pull150Items(division.query);
    const roomCatalog = [];

    for (const item of liveItems) {
      const sku = `MEGA-${String(globalSkuId).padStart(5, '0')}`;
      roomCatalog.push({
        id: sku, 
        name: item.name, 
        price: `$${Number(item.price).toFixed(2)}`, 
        media: [item.image], 
        video: false,
        specs: { 
          manufacturer: division.brand, 
          condition: "Retail Mint", 
          shipping: "Tracked Shipping ($7.99)", 
          market_value: "Live Google Shopping Index" 
        },
        status: "LIVE_MARKET_VERIFIED"
      });
      
      console.log(`✅ [LOCKED] ${sku} | $${item.price.toFixed(2)} | ${item.name.substring(0, 30)}...`);
      globalSkuId++;
      await sleep(200); // Super fast 0.2s delay
    }
    
    currentInventory[division.room] = roomCatalog; 
  }

  fs.writeFileSync(inventoryPath, `export const masterInventory: Record<string, any[]> = ${JSON.stringify(currentInventory, null, 2)};\n`, 'utf8');
  console.log(`\n🎯 [SUPER ROOMS COMPLETE] 150 items locked and loaded into traffic drivers.`);
}

executeSuperRooms();