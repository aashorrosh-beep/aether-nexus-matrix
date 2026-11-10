import fs from 'fs';
const f = 'app/stores/christmas-store/christmas-inventory.ts';
const r = fs.readFileSync(f, 'utf8');
const i = r.indexOf('export const CHRISTMAS_INVENTORY');
const arr = JSON.parse(r.slice(r.indexOf('[', i), r.lastIndexOf(']') + 1));
async function pic(n) {
  const u = 'https://www.bing.com/images/search?q=' + encodeURIComponent(n + ' product');
  try {
    const h = await (await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' } })).text();
    const m = [...new Set([...h.matchAll(/OIP\.[A-Za-z0-9_-]{18,38}/g)].map(x => x[0]))];
    if (m.length >= 3) return m.slice(0, 3).map(id => `https://tse2.mm.bing.net/th?id=${id}&w=600&h=450&c=7&pid=Api`);
  } catch {}
  return null;
}
for (let k = 0; k < arr.length; k += 20) {
  await Promise.all(arr.slice(k, k + 20).map(async x => {
    const p = await pic(x.name);
    if (p) x.imgs = p;
  }));
  console.log(`Photos: ${Math.min(k + 20, arr.length)}/${arr.length}`);
}
fs.writeFileSync(f, r.slice(0, i) + 'export const CHRISTMAS_INVENTORY: StandaloneXmasSKU[] = ' + JSON.stringify(arr) + ';\n');
console.log("PHOTOS DONE!");
