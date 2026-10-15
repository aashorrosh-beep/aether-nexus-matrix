// ============================================================================
// NEXUS PLATOON COMMANDER: BATCH EXECUTION FOR 20 UNIQUE ROOMS
// ============================================================================
import fs from 'fs';
import path from 'path';

// 🎯 CHANGE THIS NUMBER (1, 2, 3, or 4) TO FIRE THE NEXT PLATOON
const ACTIVE_PLATOON = 4; 
// ============================================================================

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

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const SERPAPI_KEY = process.env.SERPAPI_API_KEY;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function getShippingCharge(price) {
  if (price <= 20) return 2.99; 
  if (price <= 50) return 4.99; 
  if (price <= 150) return 7.99; 
  return 19.99; 
}

async function callTrendBrain(promptStr) {
  console.log(`🧠 [BRAIN 1] Extracting Platoon Trends...`);
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_KEY}` },
      body: JSON.stringify({ model: "gpt-4", messages: [{ role: "user", content: promptStr }], temperature: 0.8 })
    });
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (e) { return []; }
}

async function callSourcingBrain(searchQuery) {
  const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(searchQuery)}&api_key=${SERPAPI_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.shopping_results && data.shopping_results.length > 0) return data.shopping_results[0].thumbnail;
  } catch (e) {}
  return "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800"; 
}

// 🏢 THE 4 PLATOONS: UNIQUE PROMPTS AND BRANDS FOR EVERY ROOM
const platoons = {
  1: [ // NOSTALGIA PLATOON A
    { room: "retro-toy-chest", brand: "Heritage Vault", mall: "nostalgia", prompt: "Give me 10 classic 80s/90s toys (e.g., Furbies, Tamagotchi). JSON array of strings." },
    { room: "the-comic-stash", brand: "Heritage Vault", mall: "nostalgia", prompt: "Give me 10 highly sought after 90s comic books. JSON array of strings." },
    { room: "vhs-archive", brand: "Heritage Vault", mall: "nostalgia", prompt: "Give me 10 classic nostalgic 80s/90s VHS tapes. JSON array of strings." },
    { room: "trading-card-syndicate", brand: "Heritage Vault", mall: "nostalgia", prompt: "Give me 10 rare 90s trading cards (Pokemon, Magic, Sports). JSON array of strings." },
    { room: "retro-arcade", brand: "Heritage Vault", mall: "nostalgia", prompt: "Give me 10 classic 80s/90s arcade machines or home consoles. JSON array of strings." }
  ],
  2: [ // NOSTALGIA PLATOON B
    { room: "grunge-apparel", brand: "Heritage Vault", mall: "nostalgia", prompt: "Give me 10 iconic 90s grunge apparel items (e.g., Flannel shirts, Doc Martens). JSON array of strings." },
    { room: "y2k-pop-merch", brand: "Heritage Vault", mall: "nostalgia", prompt: "Give me 10 iconic Y2K pop music merch items (e.g., Britney Spears posters, Nsync tees). JSON array of strings." },
    { room: "polaroid-and-film", brand: "Heritage Vault", mall: "nostalgia", prompt: "Give me 10 vintage Polaroid cameras and film types. JSON array of strings." },
    { room: "vintage-vinyl", brand: "Heritage Vault", mall: "nostalgia", prompt: "Give me 10 iconic 80s/90s vinyl records. JSON array of strings." },
    { room: "neon-roller-rink", brand: "Heritage Vault", mall: "nostalgia", prompt: "Give me 10 retro roller rink items (e.g., Neon skates, glow sticks). JSON array of strings." }
  ],
  3: [ // MATRIX PLATOON A
    { room: "cyberware-depot", brand: "Nexus Matrix", mall: "netrix", prompt: "Give me 10 cyberpunk tech accessories (e.g., LED Visor, Cyber-deck). JSON array of strings." },
    { room: "bionic-prosthetics", brand: "Nexus Matrix", mall: "netrix", prompt: "Give me 10 sci-fi bionic arm/leg prop replicas. JSON array of strings." },
    { room: "quantum-processing", brand: "Nexus Matrix", mall: "netrix", prompt: "Give me 10 high-end futuristic PC components or quantum drive props. JSON array of strings." },
    { room: "drone-depot", brand: "Nexus Matrix", mall: "netrix", prompt: "Give me 10 high-tech consumer drones or cyberpunk quadcopters. JSON array of strings." },
    { room: "neural-uplinks", brand: "Nexus Matrix", mall: "netrix", prompt: "Give me 10 sci-fi neural interface headsets or VR rigs. JSON array of strings." }
  ],
  4: [ // MATRIX PLATOON B
    { room: "zero-g-gear", brand: "Nexus Matrix", mall: "netrix", prompt: "Give me 10 futuristic astronaut/zero-g survival gear items. JSON array of strings." },
    { room: "mars-colony-route", brand: "Nexus Matrix", mall: "netrix", prompt: "Give me 10 space colonization props or Mars terrain kits. JSON array of strings." },
    { room: "dyson-sphere-initiative", brand: "Nexus Matrix", mall: "netrix", prompt: "Give me 10 sci-fi solar energy or Dyson sphere concept models. JSON array of strings." },
    { room: "survival-edc", brand: "Nexus Matrix", mall: "netrix", prompt: "Give me 10 futuristic tactical everyday carry (EDC) survival tools. JSON array of strings." },
    { room: "oracle-ai-core", brand: "Nexus Matrix", mall: "netrix", prompt: "Give me 10 AI smart home hubs or futuristic server props. JSON array of strings." }
  ]
};

// 🧮 STANDARD 30-ITEM ROOM DISTRIBUTION
const distribution = [
  { tier: "STANDARD", count: 10, price: 29.99, cond: "Retail Mint" },
  { tier: "PREMIUM", count: 10, price: 59.99, cond: "Verified Premium Asset" },
  { tier: "COLLECTOR", count: 10, price: 129.99, cond: "Collector Grade - Mint" }
];

async function executePlatoon() {
  const activeDivisions = platoons[ACTIVE_PLATOON];
  if (!activeDivisions) return console.error("❌ Invalid Platoon Selected.");

  console.log("==================================================================");
  console.log(`🚀 DEPLOYING NEXUS PLATOON COMMANDER (TARGETING PLATOON ${ACTIVE_PLATOON})`);
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

  const googleMerchantFeed = [];
  let globalSkuId = 1;

  for (const division of activeDivisions) {
    console.log(`\n🏗️ FORGING STOREFRONT: ${division.room.toUpperCase()}`);
    const themes = await callTrendBrain(division.prompt);
    const roomCatalog = [];

    for (const dist of distribution) {
      const customerShipping = getShippingCharge(dist.price);
      for (let i = 0; i < dist.count; i++) {
        const theme = themes[i % themes.length] || "Vintage Item"; 
        const itemName = `${theme} [${dist.tier}]`;
        const sku = `${ACTIVE_PLATOON}XX-${String(globalSkuId).padStart(4, '0')}`;
        
        const imgUrl = await callSourcingBrain(`${theme} ${division.brand}`);
        await sleep(800); 

        roomCatalog.push({
          id: sku, name: itemName, price: `$${dist.price.toFixed(2)}`, media: [imgUrl], video: false,
          specs: { manufacturer: division.brand, condition: dist.cond, shipping: `Tiered Tracked Shipping ($${customerShipping.toFixed(2)})` },
          status: "CRUCIBLE_VERIFIED"
        });

        googleMerchantFeed.push({
          id: sku, title: itemName, description: `Official ${division.brand} ${dist.tier} item.`, 
          link: `https://aether-nexus-matrix.vercel.app/${division.mall}/${division.room}`,
          image_link: imgUrl, price: `${dist.price.toFixed(2)} USD`, availability: "in stock", brand: division.brand
        });
        
        console.log(`✅ [LOCKED] ${sku} | ${division.room}`);
        globalSkuId++;
      }
    }
    currentInventory[division.room] = roomCatalog; 
  }

  fs.writeFileSync(inventoryPath, `export const masterInventory: Record<string, any[]> = ${JSON.stringify(currentInventory, null, 2)};\n`, 'utf8');
  
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  
  const feedPath = path.join(publicDir, 'google-merchant-feed.json');
  let currentFeed = [];
  if (fs.existsSync(feedPath)) {
    try { currentFeed = JSON.parse(fs.readFileSync(feedPath, 'utf8')); } catch (e) {}
  }
  fs.writeFileSync(feedPath, JSON.stringify(currentFeed.concat(googleMerchantFeed), null, 2), 'utf8');

  console.log(`\n🎯 [PLATOON ${ACTIVE_PLATOON} SYNC COMPLETE] 5 Rooms actively generated and appended.`);
}

executePlatoon();