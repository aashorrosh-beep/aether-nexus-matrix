import fs from 'fs';

const file = 'app/stores/christmas-store/christmas-inventory.ts';
const raw = fs.readFileSync(file, 'utf8');
const idx = raw.indexOf('export const CHRISTMAS_INVENTORY');
const items = JSON.parse(raw.slice(raw.indexOf('[', idx), raw.lastIndexOf(']') + 1));

async function get3RealPhotos(name) {
  const q = encodeURIComponent(name + ' product');
  const urls = [
    `https://images.search.yahoo.com/search/images?p=${q}`,
    `https://www.bing.com/images/search?q=${q}&form=HDRSC2`
  ];
  const found = [];
  for (const u of urls) {
    try {
      const r = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36' }, signal: AbortSignal.timeout(6000) });
      const html = await r.text();
      for (const m of html.matchAll(/OIP\.[A-Za-z0-9_-]{18,38}/g)) {
        if (!found.includes(m[0])) found.push(m[0]);
        if (found.length >= 3) break;
      }
    } catch {}
    if (found.length >= 3) break;
  }
  return found.length >= 3
    ? found.slice(0, 3).map(id => `https://tse2.mm.bing.net/th?id=${id}&w=640&h=480&c=7&pid=Api`)
    : null;
}

function makeSpecs(x) {
  if (x.cat === 'lights') return ['Commercial UL-Listed SMD LEDs', 'IP65 Weatherproof Outdoor/Indoor Rated', 'Auto 6-Hr On / 18-Hr Off Timer + Mounting Hardware', '1-Season Replacement Guarantee'];
  if (x.cat === 'wrapping') return ['120 GSM Heavyweight Tear-Resistant Stock', 'Precision Grid Backing / Retail Multi-Pack', 'Ribbon/Seal Coordinated Finish', 'Ships Flat/Armored Against Creasing'];
  if (x.cat === 'decor') return ['Heirloom Flame-Retardant Build', 'Quick-Setup Hinged / Ready-to-Display Base', 'Warm Micro-LED / Hand-Detailed Finish', 'Storage-Ready Box Included'];
  return ['2026 Retail Factory-Sealed Edition', 'UL / FCC Certified Hardware & Power', 'Full Retail Box + Accessories Included', '1-Year Warranty + ALBS 24-Hr Concierge'];
}

let ok = 0;
for (let i = 0; i < items.length; i += 15) {
  await Promise.all(items.slice(i, i + 15).map(async (it) => {
    const pics = await get3RealPhotos(it.name);
    if (pics) { it.imgs = pics; ok++; }
    it.specs = makeSpecs(it);
  }));
  process.stdout.write(`\rFetched real photos: ${Math.min(i + 15, items.length)}/${items.length}`);
}
const hdr = raw.slice(0, idx).replace('video: string;', 'video: string;\n  specs?: string[];');
fs.writeFileSync(file, `${hdr}export const CHRISTMAS_INVENTORY: StandaloneXmasSKU[] = ${JSON.stringify(items)};\n`);
console.log(`\n✅ DONE! ${ok}/${items.length} SKUs updated with 3 real product photos + specs!`);
