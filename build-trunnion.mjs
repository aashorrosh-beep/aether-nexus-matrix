import fs from 'fs';

console.log('==================================================================');
console.log('⚙️ BUILDING THE ALBS 3-ENGINE TRAFFIC TRUNNION & COG UPGRADE');
console.log('==================================================================');

// 1. Re-sync Google Merchant & Pinterest Feed to match the 2,583 Deduplicated SKUs
const invRaw = fs.readFileSync('app/inventory.ts', 'utf8');
const m = invRaw.match(/export const masterInventory: Record<string, any\[\]> = (\{[\s\S]*\});/);
const inv = m ? JSON.parse(m[1]) : {};

const merchantItems = [];
for (const [room, items] of Object.entries(inv)) {
  if (!Array.isArray(items)) continue;
  for (const x of items) {
    merchantItems.push({
      id: x.id,
      title: x.name,
      description: (x.specs && x.specs.condition ? x.specs.condition : 'Verified Authentic') + ' • Available in the ' + room.replace(/-/g, ' ').toUpperCase() + ' corridor at ALBS Nexus.',
      link: 'https://www.albsnexus.com/nostalgia/' + room,
      image_link: (x.media && x.media[0]) ? x.media[0] : '',
      price: String(x.price || '$19.99').replace('$', '') + ' USD',
      availability: 'in_stock',
      brand: (x.specs && x.specs.manufacturer) ? x.specs.manufacturer : 'ALBS Nexus'
    });
  }
}

fs.writeFileSync('public/google-merchant-feed.json', JSON.stringify({
  channel: 'ALBS Nexus Global Mall of Malls',
  link: 'https://www.albsnexus.com',
  updated_at: new Date().toISOString(),
  total_unique_skus: merchantItems.length,
  items: merchantItems
}, null, 2), 'utf8');
console.log('✅ [TRUNNION ENGINE #2] Synced public/google-merchant-feed.json (' + merchantItems.length + ' Deduplicated SKUs)');

// 2. Build Machine #1: Official Social Auto-Broadcaster (ai-social-broadcaster.mjs)
const feedPath = 'public/nexus-marketing-feed.json';
const mkt = fs.existsSync(feedPath) ? JSON.parse(fs.readFileSync(feedPath, 'utf8')).campaigns || [] : [];
const picks = [];
for (let i = 0; i < 4 && mkt.length > 0; i++) {
  picks.push(mkt[Math.floor(Math.random() * mkt.length)]);
}

const automatedPosts = [
  {
    slot: 'SHIFT 1 — FREE AUTISM 20-MILE RADAR HOOK',
    text: '🧩 Looking for sensory-friendly movies, quiet museum hours, or all-abilities events for kids & adults with autism? Enter any US ZIP code on the free ALBS 20-Mile Sensory Event Radar (plus hard-to-find sensory gear 10%–20% below specialty stores): https://www.albsnexus.com/spectrum-knowledge-vault.html #AutismParenting #SensoryFriendly #ALBSNexus',
    url: 'https://www.albsnexus.com/spectrum-knowledge-vault.html'
  },
  {
    slot: 'SHIFT 2 — NEW LIFE & EXPECTING BABY SANCTUARY',
    text: '👶 Expecting a little one? Print free Trimester Checklists, Hospital Go-Bag guides & Free Infant CPR quick-references—plus shop newborn essentials 10%–20% below boutique retail: https://www.albsnexus.com/new-life-expecting-vault.html #ExpectingMom #NewbornEssentials #ALBSNexus',
    url: 'https://www.albsnexus.com/new-life-expecting-vault.html'
  },
  ...picks.map((p, idx) => ({
    slot: 'PRODUCT SPOTLIGHT #' + (idx + 1),
    text: '🔥 ' + p.tiktok_hook + ' (' + p.price + ') -> Shop direct inside the ALBS Mall: ' + p.landing_url + ' ' + (p.hashtags || []).join(' '),
    url: p.landing_url,
    image: p.image_url
  }))
];

fs.writeFileSync('public/daily-auto-broadcast.json', JSON.stringify({
  generated_at: new Date().toISOString(),
  posts: automatedPosts
}, null, 2), 'utf8');
console.log('✅ [TRUNNION ENGINE #1] Generated Official Auto-Broadcast Queue in public/daily-auto-broadcast.json');

// 3. Upgrade the Interactive Cogs in app/page.tsx (Live Item Totals + Trunnion Share Link)
let page = fs.readFileSync('app/page.tsx', 'utf8');
page = page.replace(
  '{c.desc} →</div>',
  '{c.desc} • <span className="text-yellow-400 font-bold">{c.rooms.filter((r: string) => isLive(r)).length} LIVE STORES</span> →</div>'
);
if (!page.includes('/trunnion-command.html')) {
  page = page.replace(
    'href="/executive-report.html"',
    'href="/trunnion-command.html" className="bg-cyan-500 text-black font-black text-xs uppercase px-4 py-3.5 rounded-xl">⚙️ Traffic Trunnion</a><a href="/executive-report.html"'
  );
}
fs.writeFileSync('app/page.tsx', page, 'utf8');
console.log('✅ [COG UPGRADE] Added Live Storefront Counts to Category Cogs & Wired Trunnion Button!');

// 4. Build the Interactive Traffic Trunnion Command Center (public/trunnion-command.html)
const trunnionHtml = [
  '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
  '<title>ALBS 3-Engine Traffic Trunnion & Auto-Broadcast Hub</title>',
  '<style>',
  'body{background:#09090b;color:#f4f4f5;font-family:sans-serif;line-height:1.6;padding:24px;max-width:1050px;margin:0 auto}',
  'h1{color:#fde047;text-transform:uppercase;margin-bottom:4px}',
  'h2{color:#38bdf8;border-bottom:2px solid #27272a;padding-bottom:8px;margin-top:28px;text-transform:uppercase;font-size:18px}',
  '.card{background:#18181b;border:1px solid #27272a;border-left:5px solid #10b981;padding:18px;border-radius:12px;margin:14px 0}',
  '.box{background:#000;border:1px solid #3f3f46;padding:12px;border-radius:8px;font-family:monospace;font-size:12px;color:#6ee7b7;word-break:break-all;margin:8px 0}',
  'button,a.btn{background:#10b981;color:#000;font-weight:900;padding:10px 16px;border-radius:8px;text-decoration:none;border:none;cursor:pointer;display:inline-block;font-size:12px;text-transform:uppercase;margin:4px 4px 0 0}',
  '.btn-cyan{background:#38bdf8;color:#000}',
  '.btn-gold{background:#fde047;color:#000}',
  '</style></head><body>',
  '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap">',
  '  <h1>⚙️ ALBS 3-Engine Traffic Trunnion Command</h1>',
  '  <a class="btn" style="background:#27272a;color:#fff" href="/">← Back to Mall</a>',
  '</div>',
  '<p style="color:#a1a1aa;font-family:monospace;font-size:12px">HANDS-FREE TRAFFIC PIVOT • GOOGLE/PINTEREST 2,583-SKU FEED • AUTO-BROADCASTER • FAMILY AMBASSADOR DISPATCH</p>',
  '<h2>Engine #1: Google Merchant Center & Pinterest Auto-Catalog Feed (Zero Social Posting Required)</h2>',
  '<div class="card">',
  '  <b>Paste This Single Feed URL into Google Merchant Center (merchants.google.com) & Pinterest Business:</b>',
  '  <div class="box" id="feedUrl">https://www.albsnexus.com/google-merchant-feed.json</div>',
  '  <button class="btn-cyan" onclick="navigator.clipboard.writeText(document.getElementById(\'feedUrl\').innerText);this.innerText=\'✅ FEED URL COPIED!\'">📋 Copy 2,583-SKU Merchant Feed URL</button>',
  '  <a class="btn" target="_blank" href="/google-merchant-feed.json">Verify Live JSON Feed →</a>',
  '  <a class="btn" target="_blank" href="/sitemap.xml">Verify Sitemap.xml →</a>',
  '</div>',
  '<h2>Engine #2: Real Family & Friend Ambassador 1-Click Share (Zero Bots / 100% Legal)</h2>',
  '<div class="card" style="border-left-color:#fde047">',
  '  <b>Send This Text/Email to 3 Friends or Family Members so They Share It on Their Personal Nextdoor/FB:</b>',
  '  <div class="box" id="ambText" style="color:#fef08a">Hey! Check out our new project, ALBS Nexus (https://www.albsnexus.com) — we built an 80+ room online mall featuring a free 20-Mile Autism Sensory Event Radar (https://www.albsnexus.com/spectrum-knowledge-vault.html), hard-to-find sensory gear 10%-20% below specialty stores, Ugly Christmas Sweaters, and a Christmas Story Gag Vault. Would mean the world if you shared the link on your Facebook or Nextdoor!</div>',
  '  <button class="btn-gold" onclick="navigator.clipboard.writeText(document.getElementById(\'ambText\').innerText);this.innerText=\'✅ MESSAGE COPIED!\'">📋 Copy Text Message for Family/Friends</button>',
  '  <a class="btn" href="sms:?&body=Hey!%20Check%20out%20our%20new%2080-room%20mall%20and%20Free%2020-Mile%20Autism%20Event%20Radar%20at%20https://www.albsnexus.com/spectrum-knowledge-vault.html">📱 Open in Text Messages (SMS) →</a>',
  '</div>',
  '<h2>Engine #3: Today s Automated Official Brand Broadcast Queue (Refreshed 3x/Day by AI General)</h2>',
  '<div id="postsOut">Loading auto-generated broadcast queue...</div>',
  '<script>',
  'fetch("/daily-auto-broadcast.json").then(r=>r.json()).then(d=>{',
  '  document.getElementById("postsOut").innerHTML = (d.posts||[]).map((p,i)=>',
  '    "<div class=\'card\'><b>" + p.slot + "</b><div class=\'box\' id=\'bp"+i+"\'>" + p.text + "</div><button onclick=\\"navigator.clipboard.writeText(document.getElementById(\'bp"+i+"\').innerText);this.innerText=\'✅ COPIED!\'\\">📋 Copy Official Post</button> <a class=\'btn btn-cyan\' target=\'_blank\' href=\'https://twitter.com/intent/tweet?text=" + encodeURIComponent(p.text) + "\'>⚡ 1-Click Post to Official X →</a></div>"',
  '  ).join("");',
  '});',
  '</script></body></html>'
].join('\n');

fs.writeFileSync('public/trunnion-command.html', trunnionHtml, 'utf8');
console.log('✅ [TRUNNION HUB] Built public/trunnion-command.html!');
