import fs from 'fs';

const links = [
  { cat: '1. 💰 SALES, TRAFFIC, REPORTS & CUSTOMER VAULT', items: [
    { name: '💳 Stripe Live Sales & Payouts Dashboard', desc: 'Check live orders, credit card payments & bank payouts', url: 'https://dashboard.stripe.com' },
    { name: '📈 Vercel Real-Time Visitor & City Analytics', desc: 'Check live unique visitors, page views & traffic sources', url: 'https://vercel.com/httpsgeminigooglecomapp1307335c4bd4b772c/aether-nexus-matrix/analytics' },
    { name: '🟢 Vercel Cloud Deployment Status', desc: 'Verify all production builds are green and ready', url: 'https://vercel.com/httpsgeminigooglecomapp1307335c4bd4b772c/aether-nexus-matrix/deployments' },
    { name: '🖨️ Printable End-of-Day Store & Valuation Report', desc: 'Print full store-by-store SKU count, floor value & 3% Legacy totals', url: '/executive-report.html' },
    { name: '🔒 Encrypted In-Store VIP Customer Vault', desc: 'Decrypt customer sign-ups & ZIP codes (Passkey: ALBS-VAULT-2026)', url: '/admin/vip-vault' }
  ]},
  { cat: '2. 🚀 MARKETING, TRAFFIC TRUNNION & OUTREACH', items: [
    { name: '⚙️ 3-Engine Traffic Trunnion Command Center', desc: 'Google/Pinterest 2,583-SKU feed, Daily Auto-Posts & SMS Ambassador share', url: '/trunnion-command.html' },
    { name: '🎯 Live Visitor Counter & Social Sniper Hub', desc: 'Copy-paste Nextdoor, Facebook & Reddit launch posts + live board links', url: '/traffic-sniper.html' },
    { name: '💌 1-Click Autism, Special Ed & Hospital Email Hub', desc: 'Pre-written founder outreach emails that open directly in Gmail', url: '/autism-outreach-kit.html' },
    { name: '🏷️ Printable QR Code Sticker Sheet', desc: 'Print guerrilla QR stickers for the Mall & Consignment Vault', url: '/qr-stickers.html' },
    { name: '📦 Live 2,583-SKU Google Merchant & Pinterest JSON Feed', desc: 'Direct product catalog feed URL for Google & Pinterest shopping ads', url: '/google-merchant-feed.json' },
    { name: '🗺️ Live XML Sitemap (For Google Search Console)', desc: 'Submit this link to Google Search Console to index all 81 rooms', url: '/sitemap.xml' }
  ]},
  { cat: '3. ❤️ PUBLIC FAMILY SANCTUARIES & LIVE MALL', items: [
    { name: '🏛️ Main ALBS Nexus "Mall of Malls" Front Lobby', desc: 'Main 3-Mall Concourse (Matrix, Nostalgia, Vitality & VIP Center Atrium)', url: '/' },
    { name: '🧩 12-Mile Autism Event Radar & Hospital Research Vault', desc: 'US ZIP code 12-mile sensory event finder + printable 2026 clinical guides', url: '/spectrum-knowledge-vault.html' },
    { name: '🛒 140-Item Spectrum Autism Superstore', desc: 'Top-50 hard-to-find sensory tools priced 10%-20% below specialty catalogs', url: '/nostalgia/spectrum-sensory-superstore' },
    { name: '👶 What to Expect: Pregnancy, Newborn & Free CPR Vault', desc: 'Independent Expecting Parent trimester checklists, go-bag & free Infant CPR', url: '/new-life-expecting-vault.html' },
    { name: '🍼 What to Expect: New Life & Baby Superstore', desc: 'Newborn coming-home outfits, smart nursery & safe sleep essentials', url: '/nostalgia/new-life-expecting-superstore' }
  ]},
  { cat: '4. 🛡️ USPTO PATENT FILING & MASTER CODE REPOSITORY', items: [
    { name: '📜 Printable USPTO Provisional Patent Packet (PDF Generator)', desc: 'Official specification, 2D/3D/VR/Gaming claims, 10-year lease claims & 4 drawings', url: '/uspto-patent-filing.html' },
    { name: '🏛️ Official USPTO Patent Center Portal', desc: 'Upload your saved PDF packet to lock in your federal filing receipt', url: 'https://patentcenter.uspto.gov' },
    { name: '💻 GitHub Master Source Code & 3-Shift Actions Repo', desc: 'Private cloud backup, Lazarus 1-click rebuilder & Master E-Build Codebook', url: 'https://github.com/aashorrosh-beep/aether-nexus-matrix' }
  ]}
];

const html = [
  '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
  '<title>ALBS Executive Command Cockpit | All Master Links</title>',
  '<style>',
  'body{background:#09090b;color:#f4f4f5;font-family:sans-serif;line-height:1.5;padding:20px;max-width:1050px;margin:0 auto}',
  'h1{color:#fde047;text-transform:uppercase;margin-bottom:4px;font-size:26px}',
  'h2{color:#34d399;border-bottom:2px solid #27272a;padding-bottom:6px;margin-top:26px;font-size:17px;text-transform:uppercase}',
  '.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:12px;margin-top:12px}',
  '.card{background:#18181b;border:1px solid #27272a;border-left:5px solid #10b981;padding:16px;border-radius:12px;display:flex;flex-direction:column;justify-content:space-between}',
  'a.btn,button{background:#10b981;color:#000;font-weight:900;padding:10px 14px;border-radius:8px;text-decoration:none;border:none;cursor:pointer;display:inline-block;font-size:12px;text-transform:uppercase;text-align:center;margin-top:10px}',
  '@media print{body,.card{background:#fff!important;color:#000!important;border-color:#000!important}}',
  '</style></head><body>',
  '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap">',
  '  <div><h1>⚡ ALBS Executive Master Command Directory</h1><p style="color:#a1a1aa;font-size:12px;font-family:monospace;margin:0">ALL 19 BUSINESS, SALES, TRAFFIC, MARKETING, SANCTUARY & PATENT LINKS ON ONE PAGE</p></div>',
  '  <button onclick="window.print()" style="background:#fde047">🖨️ Print Master Link Sheet</button>',
  '</div>',
  links.map(sec => '<h2>' + sec.cat + '</h2><div class="grid">' + sec.items.map(i => '<div class="card"><div><div style="font-weight:900;font-size:15px;color:#fff">' + i.name + '</div><div style="font-size:12px;color:#a1a1aa;margin-top:4px">' + i.desc + '</div><div style="font-size:11px;font-family:monospace;color:#38bdf8;margin-top:4px;word-break:break-all">' + i.url + '</div></div><a class="btn" target="_blank" href="' + i.url + '">Open Link →</a></div>').join('') + '</div>').join(''),
  '</body></html>'
].join('\n');

fs.writeFileSync('public/ceo-command.html', html, 'utf8');
console.log('✅ Built Master 1-Page Executive Link Directory: public/ceo-command.html');
