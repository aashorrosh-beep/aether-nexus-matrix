import fs from 'fs';
import path from 'path';

console.log('==================================================================');
console.log('🔥 1. RUNNING MONTHLY VIRAL DOORBUSTER SCOUT (5%-10% NET MARGIN)');
console.log('==================================================================');

const invPath = 'app/inventory.ts';
const raw = fs.readFileSync(invPath, 'utf8');
const m = raw.match(/export const masterInventory: Record<string, any\[\]> = (\{[\s\S]*\});/);
const inv = m ? JSON.parse(m[1]) : {};
const num = (v) => parseFloat(String(v || '0').replace(/[^0-9.]/g, '')) || 0;

// Pick the 3 hottest viral traffic-magnet items from key high-demand rooms
const magnetRooms = ['super-squishies-hub', 'blind-box-vault', 'the-christmas-story'];
const viralPicks = [];

magnetRooms.forEach((rm, idx) => {
  const list = inv[rm] || [];
  if (list.length > 0) {
    const pick = JSON.parse(JSON.stringify(list[0]));
    const currentPrice = num(pick.price) || 29.99;
    const wholesaleSource = currentPrice * 0.62;
    // Target: 7.5% True Net Profit Margin (inside the 5%-10% Viral Magnet band)
    // Covers Wholesale + 2.9%+$0.30 Stripe + 3% Legacy + 7.5% Clear Profit
    const viralPrice = (wholesaleSource + 0.30) / (1 - (0.029 + 0.03 + 0.075));
    pick.id = 'VIRAL-MAGNET-' + (idx + 1);
    pick.price = '$' + viralPrice.toFixed(2);
    pick.specs = {
      manufacturer: 'ALBS Monthly Viral Doorbuster (High-Quantity Allocation)',
      condition: '🔥 MONTHLY TRAFFIC MAGNET • 5%–10% Razor-Margin Blowout',
      shipping: 'Fast Tracked Shipping ($6.99)',
      market_value: 'Regular Retail: $' + (wholesaleSource * 1.95).toFixed(2) + ' — VIRAL DOORBUSTER:$' + viralPrice.toFixed(2) + ' (Limit 2 Per Order)'
    };
    viralPicks.push(pick);
    console.log('🎯 Viral Magnet #' + (idx + 1) + ': ' + pick.name + ' -> Blowout Price: ' + pick.price + ' (7.5% Net Margin)');
  }
});

if (viralPicks.length > 0) {
  inv['monthly-viral-doorbusters'] = viralPicks;
  fs.writeFileSync(invPath, 'export const masterInventory: Record<string, any[]> = ' + JSON.stringify(inv, null, 2) + ';\n', 'utf8');
}

console.log('==================================================================');
console.log('🛡️ 2. BUILDING THE 1-CLICK "LAZARUS" MASTER COPY BOOK & CLONER');
console.log('==================================================================');

// Snapshot every essential code file, route, vault, and automation script in the Mall
const criticalFiles = [
  'package.json',
  'tsconfig.json',
  'app/layout.tsx',
  'app/page.tsx',
  'app/BackgroundEffects.tsx',
  'app/globals.css',
  'app/inventory.ts',
  'app/[storeId]/page.tsx',
  'app/nostalgia/[storeId]/page.tsx',
  'app/admin/vip-vault/page.tsx',
  'app/api/vip-signup/route.ts',
  'app/api/traffic/route.ts',
  'public/spectrum-knowledge-vault.html',
  'public/new-life-expecting-vault.html',
  'public/trunnion-command.html',
  'public/traffic-sniper.html',
  'public/executive-report.html',
  'public/qr-stickers.html',
  'mall-prewalk-auditor.mjs',
  'build-trunnion.mjs',
  'november-bfcm-scheduler.mjs',
  'ai-general-telemetry.mjs',
  'ALBS_MASTER_EBUILD_CODEBOOK.md'
];

const blueprint = {
  mall_name: 'ALBS NEXUS — MASTER E-BUILD SNAPSHOT',
  created_at: new Date().toISOString(),
  patent_shield: 'U.S. Provisional App. No. 64/134,528 & Omnibus CIP',
  files: {}
};

let savedCount = 0;
criticalFiles.forEach(f => {
  if (fs.existsSync(f)) {
    blueprint.files[f] = fs.readFileSync(f, 'utf8');
    savedCount++;
  }
});

fs.writeFileSync('ALBS_MASTER_SITE_BLUEPRINT.json', JSON.stringify(blueprint, null, 2), 'utf8');

// Create the 1-Button Self-Rebuilder Executable Script
const rebuilderCode = [
  '#!/usr/bin/env node',
  'import fs from "fs";',
  'import path from "path";',
  '',
  'console.log("⚡ [ALBS LAZARUS REBUILDER] Restoring / Cloning Full Mall Architecture...");',
  'const bp = JSON.parse(fs.readFileSync("ALBS_MASTER_SITE_BLUEPRINT.json", "utf8"));',
  'let restored = 0;',
  'for (const [filePath, content] of Object.entries(bp.files)) {',
  '  const dir = path.dirname(filePath);',
  '  if (dir && dir !== ".") fs.mkdirSync(dir, { recursive: true });',
  '  fs.writeFileSync(filePath, content, "utf8");',
  '  restored++;',
  '}',
  'console.log("✅ [1-SECOND REBUILD COMPLETE] Restored " + restored + " Core Files, Storefronts, Vaults & Inventory!");',
  'console.log("🚀 Next step: Run `npm install && npm run build` to launch in any new folder or domain!");'
].join('\n');

fs.writeFileSync('ALBS_LAZARUS_MASTER_REBUILDER.mjs', rebuilderCode + '\n', 'utf8');
console.log('✅ Snapshot Locked: ' + savedCount + ' Core Files backed up inside ALBS_MASTER_SITE_BLUEPRINT.json');
console.log('✅ 1-Button Rebuilder Created: Run `node ALBS_LAZARUS_MASTER_REBUILDER.mjs` anytime to rebuild or clone the entire site in 1 second!');
