// ============================================================================
// NEXUS OMNI-BRAIN: FULL MULTI-MALL MATRIX & MASTER SEO FEED
// ============================================================================
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

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const SERPAPI_KEY = process.env.SERPAPI_API_KEY;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function getShippingCharge(price) {
  if (price <= 10) return 1.99; 
  if (price <= 20) return 2.50; 
  if (price <= 35) return 3.50; 
  if (price <= 50) return 4.99; 
  if (price <= 150) return 7.99; 
  return 19.99; 
}

async function callTrendBrain(promptStr) {
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

// 🏢 MASTER MALL REGISTRY
const retailDivisions = [
  // MALL 1: THE MATRIX
  {
    room: "neo-squish", mall: "netrix", namePrefix: "Neo-Squish Gamified Crate", brand: "Nexus Matrix",
    prompt: `Give me exactly 10 high-trending, viral Squishmallow themes (e.g., "Galactic Axolotl"). Format strictly as a JSON array of strings.`
  },
  {
    room: "cyberware-depot", mall: "netrix", namePrefix: "Cyberpunk Hardware", brand: "Nexus Tech",
    prompt: `Give me 10 trending cyberpunk/tech accessories (e.g., "LED Visor", "Mechanical Keyboard"). Format strictly as a JSON array of strings.`
  },
  // MALL 2: NOSTALGIA
  {
    room: "retro-mystery-vault", mall: "nostalgia", namePrefix: "Vintage 90s Mystery Crate", brand: "Heritage Vault",
    prompt: `Give me exactly 10 high-value 80s/90s nostalgic themes (e.g., "Holographic Charizard"). Format strictly as a JSON array of strings.`
  },
  {
    room: "pixel-sugar-rush", mall: "nostalgia", namePrefix: "Retro Candy Box", brand: "Heritage Vault",
    prompt: `Give me 10 nostalgic 80s/90s candy themes (e.g., "Dunkaroos & Warheads"). Format strictly as a JSON array of strings.`
  },
  {
    room: "action-figures-90s", mall: "nostalgia", namePrefix: "90s Action Figure", brand: "Heritage Vault",
    prompt: `Give me 10 classic 90s action figure lines (e.g., "Street Sharks", "TMNT"). Format strictly as a JSON array of strings.`
  }
];

// 🧮 STANDARD 6-TIER DISTRIBUTION
const distribution = [
  { tier: "MICRO", count: 10, price: 9.99, cond: "Entry Level" },
  { tier: "COMMON", count: 10, price: 19.99, cond: "Common Pull" },
  { tier: "UNCOMMON", count: 5, price: 29.99, cond: "Uncommon Pull" },
  { tier: "RARE", count: 3, price: 49.99, cond: "Rare Guarantee" },
  { tier: "EPIC", count: 2, price: 149.99, cond: "Premium Scale" }
];

async function executeOmniBrain() {
  console.log("🔥 NEXUS OMNI-BRAIN: INITIATING MULTI-MALL SYNC");
  let currentInventory = {};
  const googleMerchantFeed = [];
  let globalSkuId = 1;

  for (const division of retailDivisions) {
    console.log(`\n🏗️ SYNCING DIVISION: ${division.room.toUpperCase()}`);
    const themes = await callTrendBrain(division.prompt);
    const roomCatalog = [];

    for (const dist of distribution) {
      const customerShipping = getShippingCharge(dist.price);
      
      for (let i = 0; i < dist.count; i++) {
        const theme = themes[i % themes.length] || "Vintage"; 
        const itemName = `${division.namePrefix}: ${theme} [${dist.tier}]`;
        const sku = `NEXUS-${String(globalSkuId).padStart(4, '0')}`;
        
        const imgUrl = await callSourcingBrain(`${theme} ${division.brand}`);
        await sleep(800); 

        roomCatalog.push({
          id: sku, name: itemName, price: `$${dist.price.toFixed(2)}`, media: [imgUrl], video: false,
          specs: { manufacturer: division.brand, condition: dist.cond, shipping: `Tiered Tracked Shipping ($${customerShipping.toFixed(2)})` },
          status: "CRUCIBLE_VERIFIED"
        });

        // 📡 MASTER SEO FEED INJECTION
        googleMerchantFeed.push({
          id: sku, title: itemName, description: `Official ${division.brand} ${dist.tier} item.`, 
          link: `https://aether-nexus-matrix.vercel.app/${division.mall}/${division.room}`,
          image_link: imgUrl, price: `${dist.price.toFixed(2)} USD`, availability: "in stock", brand: division.brand
        });
        
        console.log(`✅ [LOCKED] ${sku} | ${division.room} | ${dist.tier}`);
        globalSkuId++;
      }
    }
    currentInventory[division.room] = roomCatalog;
  }

  // Save the complete ledgers
  fs.writeFileSync(path.join(process.cwd(), 'app', 'inventory.ts'), `export const masterInventory: Record<string, any[]> = ${JSON.stringify(currentInventory, null, 2)};\n`, 'utf8');
  
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, 'google-merchant-feed.json'), JSON.stringify(googleMerchantFeed, null, 2), 'utf8');

  console.log(`\n🎯 [OMNI-BRAIN SYNC COMPLETE] Matrix updated. SEO Feed active.`);
}

executeOmniBrain();