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
  } catch (e) {}
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

async function pullLiveMarketData(searchQuery, maxItems = 35, retries = 5) {
  const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(searchQuery)}&num=100&hl=en&gl=us&api_key=${SERPAPI_KEY}`;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`📡 Scanning Market [Attempt ${attempt}]: "${searchQuery}"...`);
      const response = await fetch(url);
      const data = await response.json();
      if (!data.shopping_results || data.shopping_results.length === 0) return [];
      return data.shopping_results
        .filter(item => item.title && item.extracted_price && item.thumbnail)
        .slice(0, maxItems)
        .map(item => ({
          name: item.title.replace(/[^a-zA-Z0-9 -]/g, '').substring(0, 60),
          price: item.extracted_price,
          image: item.thumbnail
        }));
    } catch (e) {
      console.log(`⚠️ Wi-Fi flicker. Waiting 8 seconds before retry...`);
      await sleep(8000);
    }
  }
  return [];
}

const checkList = [
  // 🎄 NEW: 100+ ITEM HOLIDAY CONFECTIONERY, BAKERY & BASKETS SUPER ROOM
  { 
    room: "holiday-confectionery-bakery", 
    brand: "Nexus Gourmet", 
    forceBuild: true,
    queries: [
      "gourmet christmas brownie gift box holiday bakery basket",
      "artisan holiday fudge gift tin christmas peppermint bark",
      "gourmet holiday peanut brittle pecan brittle gift tin",
      "christmas holiday cake sampler gourmet dessert gift tower"
    ],
    maxPerQuery: 30
  },
  // 🎄 ENSURE FULL 40+ ITEM SEASONAL GIFT BASKETS ROOM
  { 
    room: "seasonal-gift-baskets", 
    brand: "Nexus Gourmet", 
    forceBuild: true,
    queries: [
      "luxury christmas holiday food gift basket wine country tower",
      "gourmet holiday charcuterie chocolate gift basket"
    ],
    maxPerQuery: 30
  },
  // 🔧 PATCH ANY ROOMS SKIPPED BY WIFI BLINK
  { room: "retro-candy-soda", brand: "Nexus Pop", queries: ["nostalgic 90s retro candy box exotic soda bundle"], maxPerQuery: 35 },
  { room: "90s-skate-deck-vault", brand: "Heritage Vault", queries: ["vintage 90s skateboard deck world industries powell peralta"], maxPerQuery: 35 },
  { room: "vintage-sports-jerseys", brand: "Heritage Vault", queries: ["authentic vintage 90s mitchell and ness nba nfl throwback jersey"], maxPerQuery: 35 },
  { room: "retro-board-games", brand: "Heritage Vault", queries: ["vintage 1980s 1990s board game complete fireball island heroquest"], maxPerQuery: 35 },
  { room: "classic-walkman-audio", brand: "Heritage Vault", queries: ["vintage sony walkman cassette player boombox working"], maxPerQuery: 35 },
  { room: "ai-matrix-uplink", brand: "Nexus Core", queries: ["nvidia rtx workstation ai developer hardware neural"], maxPerQuery: 35 },
  { room: "android-customs", brand: "Nexus Core", queries: ["programmable unitree robotics cybernetic quadruped"], maxPerQuery: 35 },
  { room: "anti-grav-vehicles", brand: "Nexus Core", queries: ["electric hydrofoil surfboard onewheel personal ev"], maxPerQuery: 35 },
  { room: "bionic-prosthetics", brand: "Nexus Core", queries: ["exoskeleton wearable mobility leg support robotics"], maxPerQuery: 35 },
  { room: "cyberware-depot", brand: "Nexus Core", queries: ["ar smart glasses heads up display wearable tech"], maxPerQuery: 35 },
  { room: "neon-biolab", brand: "Nexus Core", queries: ["smart indoor hydroponic garden led bio planter"], maxPerQuery: 35 },
  { room: "neural-network-cafe", brand: "Nexus Core", queries: ["nootropic focus energy smart mushroom coffee bundle"], maxPerQuery: 35 },
  { room: "off-grid-comms", brand: "Nexus Core", queries: ["garmin inreach satellite communicator meshtastic lora radio"], maxPerQuery: 35 },
  { room: "plasma-optics", brand: "Nexus Core", queries: ["thermal imaging monocular night vision optics"], maxPerQuery: 35 },
  { room: "quantum-processing", brand: "Nexus Core", queries: ["high speed nas server rack homelab mini pc cluster"], maxPerQuery: 35 },
  { room: "smart-home-core", brand: "Nexus Core", queries: ["matter smart home hub automated shading lighting"], maxPerQuery: 35 },
  { room: "stealth-tech", brand: "Nexus Core", queries: ["faraday bag rfid blocking privacy security hardware"], maxPerQuery: 35 },
  { room: "holistic-longevity-lab", brand: "Nexus Holistic", queries: ["liposomal nad+ resveratrol longevity supplement pure"], maxPerQuery: 35 },
  { room: "adaptogen-apothecary", brand: "Nexus Holistic", queries: ["organic ashwagandha lions mane cordyceps extract tincture"], maxPerQuery: 35 },
  { room: "cellular-hydration-mineral", brand: "Nexus Holistic", queries: ["shilajit resin trace ocean minerals electrolytes pure"], maxPerQuery: 35 }
];

async function executeHolidayBakeryAndPatch() {
  const inventoryPath = path.join(process.cwd(), 'app', 'inventory.ts');
  let currentInventory = {};
  if (fs.existsSync(inventoryPath)) {
    const rawContent = fs.readFileSync(inventoryPath, 'utf8');
    const jsonMatch = rawContent.match(/export const masterInventory: Record<string, any\[\]> = (\{[\s\S]*\});/);
    if (jsonMatch) currentInventory = JSON.parse(jsonMatch[1]);
  }

  let globalSkuId = 7000;

  for (const division of checkList) {
    if (!division.forceBuild && currentInventory[division.room] && currentInventory[division.room].length >= 10) {
      console.log(`⏭️ [ALREADY STOCKED] ${division.room} (${currentInventory[division.room].length} items)`);
      continue;
    }

    console.log(`\n🧁 FORGING ROOM: ${division.room.toUpperCase()}`);
    let roomCatalog = [];

    for (const q of division.queries) {
      const liveItems = await pullLiveMarketData(q, division.maxPerQuery);
      for (const item of liveItems) {
        const sku = `GIFT-${String(globalSkuId++).padStart(5, '0')}`;
        roomCatalog.push({
          id: sku,
          name: item.name,
          price: `$${Number(item.price).toFixed(2)}`,
          media: [item.image],
          video: false,
          specs: {
            manufacturer: division.brand,
            condition: "Fresh / Sealed Gift Tin",
            shipping: `Tracked Priority Shipping ($${getShippingCharge(item.price).toFixed(2)})`,
            market_value: "Live Google Shopping Index"
          },
          status: "LIVE_MARKET_VERIFIED"
        });
        console.log(`✅ [LOCKED] ${sku} | $${item.price.toFixed(2)} | ${item.name.substring(0, 30)}...`);
      }
      await sleep(1000);
    }

    if (roomCatalog.length > 0) {
      currentInventory[division.room] = roomCatalog;
      fs.writeFileSync(inventoryPath, `export const masterInventory: Record<string, any[]> = ${JSON.stringify(currentInventory, null, 2)};\n`, 'utf8');
      console.log(`💾 [SAVED] ${division.room} locked in with ${roomCatalog.length} items.`);
    }
  }

  console.log(`\n🎄 [MERRY CHRISTMAS] Total Active Storefronts: ${Object.keys(currentInventory).length}`);
}

executeHolidayBakeryAndPatch();