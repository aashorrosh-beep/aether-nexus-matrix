import fs from 'fs';
import path from 'path';

// 🎯 SET TO 5 FOR SYNTH WING, THEN 6 FOR DIGITAL RETRO
const ACTIVE_PLATOON = 5; 

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

const platoons = {
  5: [ 
    { room: "synthwave-audio", brand: "Nexus Matrix", mall: "netrix", prompt: "Give me 10 futuristic synthwave audio headsets and neon speakers. JSON array of strings." },
    { room: "stealth-tech", brand: "Nexus Matrix", mall: "netrix", prompt: "Give me 10 sci-fi stealth gadgets or cyberpunk tactical gear. JSON array of strings." },
    { room: "techwear-tailor", brand: "Nexus Matrix", mall: "netrix", prompt: "Give me 10 futuristic cyberpunk techwear clothing items. JSON array of strings." },
    { room: "vr-immersion-bay", brand: "Nexus Matrix", mall: "netrix", prompt: "Give me 10 high-end VR haptic suits and immersion gaming accessories. JSON array of strings." },
    { room: "synth-food-replicators", brand: "Nexus Matrix", mall: "netrix", prompt: "Give me 10 futuristic kitchen gadgets or sci-fi food replicator props. JSON array of strings." }
  ],
  6: [ 
    { room: "8-bit-consoles", brand: "Heritage Vault", mall: "nostalgia", prompt: "Give me 10 classic 8-bit retro gaming consoles and accessories. JSON array of strings." },
    { room: "crt-graveyard", brand: "Heritage Vault", mall: "nostalgia", prompt: "Give me 10 vintage CRT TVs and retro gaming monitors. JSON array of strings." },
    { room: "digital-pets", brand: "Heritage Vault", mall: "nostalgia", prompt: "Give me 10 nostalgic 90s digital pets. JSON array of strings." },
    { room: "pogs-and-slammers", brand: "Heritage Vault", mall: "nostalgia", prompt: "Give me 10 rare 90s Pog sets and heavy metal slammers. JSON array of strings." },
    { room: "threads-and-tracks", brand: "Heritage Vault", mall: "nostalgia", prompt: "Give me 10 iconic 90s tracksuits and vintage streetwear items. JSON array of strings." }
  ]
};

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
        const sku = `${ACTIVE_PLATOON}XX-${String(globalSkuId).padStart(4, '0')}`;
        const imgUrl = await callSourcingBrain(`${theme} ${division.brand}`);
        await sleep(800); 

        roomCatalog.push({
          id: sku, name: `${theme} [${dist.tier}]`, price: `$${dist.price.toFixed(2)}`, media: [imgUrl], video: false,
          specs: { manufacturer: division.brand, condition: dist.cond, shipping: `Tiered Tracked Shipping ($${customerShipping.toFixed(2)})` },
          status: "CRUCIBLE_VERIFIED"
        });
        
        console.log(`✅ [LOCKED] ${sku} | ${division.room}`);
        globalSkuId++;
      }
    }
    currentInventory[division.room] = roomCatalog; 
  }

  fs.writeFileSync(inventoryPath, `export const masterInventory: Record<string, any[]> = ${JSON.stringify(currentInventory, null, 2)};\n`, 'utf8');
  console.log(`\n🎯 [PLATOON ${ACTIVE_PLATOON} SYNC COMPLETE] 5 Rooms actively generated and appended.`);
}

executePlatoon();