import fs from 'fs';

// 1. Add Cross-Sell Mall Strip to both HTML Vaults (Autism & New Life)
const crossSellHtml = [
  '<div class="no-print" style="background:linear-gradient(135deg,#3b0764,#09090b);border:2px solid #ec4899;border-radius:16px;padding:20px;margin:28px 0">',
  '  <div style="color:#fde047;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:1px">🛍️ WHILE YOU ARE IN THE ALBS MALL • 3% OF EVERY ROOM SUPPORTS OUR LEGACY CHARTER</div>',
  '  <h2 style="margin:6px 0 8px 0;color:#fff;border:none;font-size:20px">Explore Our Viral Holiday, Ugly Sweater & Gift Storefronts</h2>',
  '  <p style="font-size:13px;color:#fbcfe8;margin:0 0 14px 0">Done checking the Radar? Step into the other wings of our 80+ Storefront Mall—every purchase across every room supports our 3% Legacy Charter:</p>',
  '  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px">',
  '    <a class="btn" style="background:#be123c;color:#fff;padding:12px;text-align:left" href="/nostalgia/the-christmas-story">🎄 <b>The Christmas Story & Gag Vault</b><br><span style="font-size:10px;font-weight:normal">Leg Lamps & White Elephant Gags →</span></a>',
  '    <a class="btn" style="background:#15803d;color:#fff;padding:12px;text-align:left" href="/nostalgia/ugly-sweater-party">🧥 <b>Ugly Christmas Sweater Party</b><br><span style="font-size:10px;font-weight:normal">Vintage & Hilarious Party Sweaters →</span></a>',
  '    <a class="btn" style="background:#a21caf;color:#fff;padding:12px;text-align:left" href="/nostalgia/super-squishies-hub">🧸 <b>150-Item Super Squishies Hub</b><br><span style="font-size:10px;font-weight:normal">Rare Plushies & Pop Mart Blind Boxes →</span></a>',
  '    <a class="btn" style="background:#b45309;color:#fff;padding:12px;text-align:left" href="/nostalgia/holiday-confectionery-bakery">🍫 <b>Holiday Confectionery & Bakery</b><br><span style="font-size:10px;font-weight:normal">Gourmet Fudge, Brownies & Towers →</span></a>',
  '    <a class="btn" style="background:#0369a1;color:#fff;padding:12px;text-align:left" href="/nostalgia/the-scrub-lounge">👕 <b>The Everyday Scrub Lounge</b><br><span style="font-size:10px;font-weight:normal">Cute, Funny & Ultra-Soft Lounge Scrubs →</span></a>',
  '    <a class="btn" style="background:#0f766e;color:#fff;padding:12px;text-align:left" href="/nostalgia/back-pain-spine-relief">💆 <b>Back Pain & Spine Relief</b><br><span style="font-size:10px;font-weight:normal">Decompression Belts & Massagers →</span></a>',
  '  </div>',
  '</div>'
].join('\n');

['public/spectrum-knowledge-vault.html', 'public/new-life-expecting-vault.html'].forEach(f => {
  if (fs.existsSync(f)) {
    let html = fs.readFileSync(f, 'utf8');
    if (html.indexOf('Explore Our Viral Holiday, Ugly Sweater') === -1) {
      html = html.replace('<script>', crossSellHtml + '\n<script>');
      fs.writeFileSync(f, html, 'utf8');
      console.log('✅ Added Cross-Sell Mall Strip to: ' + f);
    }
  }
});

// 2. Upgrade public/traffic-sniper.html with 5 Ready-to-Paste Viral Traffic Messages (FB, Nextdoor, Reddit, SMS, TikTok)
const sniperPath = 'public/traffic-sniper.html';
if (fs.existsSync(sniperPath)) {
  let s = fs.readFileSync(sniperPath, 'utf8');
  const launchPack = [
    '<h2>🚀 24-Hour Traffic Ignition: 3 Copy-Paste Posts to Get Your First Visitors Today</h2>',
    '<div class="grid">',
    '  <div class="card"><b style="color:#fde047">1. Local Nextdoor / Cypress & Conroe FB Groups (Highest Immediate Clicks)</b><div class="copy-box" id="p_nextdoor">Hey neighbors in Cypress, Conroe & The Woodlands — I just launched a local project called ALBS Nexus (https://www.albsnexus.com). Inside the Wellness wing, we built a free 20-Mile Autism & Sensory-Friendly Event Radar for local families, plus a 10-20% lower-price Sensory Superstore, Ugly Christmas Sweaters, a Christmas Story Gag Gift room, and a 150-item Squishies vault (with 3% of every sale supporting Texas Children s Hospital, our Autism Fund & Veterans). Would love for y all to take a look and tell me what you think!</div><button class="btn" onclick="navigator.clipboard.writeText(document.getElementById(\'p_nextdoor\').innerText);this.innerText=\'✅ COPIED!\'">📋 Copy Local Neighbor Post</button></div>',
    '  <div class="card"><b style="color:#34d399">2. Autism & Parenting Facebook / Reddit Groups</b><div class="copy-box" id="p_autism">For any parents looking for sensory-friendly events or hard-to-find gear (like 300lb indoor therapy swings, full-zip safety beds, XXT chewelry, or 3-sided toothbrushes) without the crazy 200% specialty catalog markup: check out https://www.albsnexus.com/spectrum-knowledge-vault.html — it has a free US ZIP code 20-mile sensory event finder, printable 2026 hospital research guides, and a 140-item sensory superstore priced 10-20% below specialty stores.</div><button class="btn" onclick="navigator.clipboard.writeText(document.getElementById(\'p_autism\').innerText);this.innerText=\'✅ COPIED!\'">📋 Copy Autism Group Post</button></div>',
    '  <div class="card"><b style="color:#ec4899">3. Holiday / White Elephant / Ugly Sweater / Squishmallow Groups</b><div class="copy-box" id="p_holiday">If anyone is already hunting for hilarious White Elephant gifts, Leg Lamps, Ugly Christmas Sweaters, or rare Squishmallows & Pop Mart blind boxes, check out the Nostalgia Wing inside our new online mall: https://www.albsnexus.com/nostalgia/the-christmas-story</div><button class="btn" onclick="navigator.clipboard.writeText(document.getElementById(\'p_holiday\').innerText);this.innerText=\'✅ COPIED!\'">📋 Copy Holiday / Gag Post</button></div>',
    '</div>'
  ].join('\n');
  if (s.indexOf('24-Hour Traffic Ignition') === -1) {
    s = s.replace('<h2>🎯 Live Autism', launchPack + '\n<h2>🎯 Live Autism');
    fs.writeFileSync(sniperPath, s, 'utf8');
    console.log('✅ Added 3 Copy-Paste Traffic Ignition Posts to public/traffic-sniper.html!');
  }
}
