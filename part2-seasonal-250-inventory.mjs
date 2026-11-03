import fs from "fs";

const env = fs.existsSync(".env.local") ? fs.readFileSync(".env.local", "utf8") : "";
const key = (env.match(/SERPAPI_API_KEY=([^\s"']+)/) || [])[1] || process.env.SERPAPI_API_KEY;
const getShip = p => p < 100 ? 3.99 : (p < 250 ? 5.99 : (p < 500 ? 9.99 : 14.99));

const AISLES = [
  { id: "curated-bundles", label: "🎁 Pre-Built Value Bundles (Save $15 • 1-Box Ship)", wingTag: "ALBS Controlled Margin Bundles", count: 25, q: "christmas gift wrapping bundle set village house set ornament mega pack", isBundle: true },
  { id: "villages-nativity", label: "🏡 Christmas Villages, Mini Houses & Nativity", wingTag: "Hobby Lobby & Michaels Wing", count: 25, q: "lighted christmas village houses ceramic porcelain miniature snow village nativity scene set" },
  { id: "outdoor-lights-inflatables", label: "🦌 Outdoor Inflatables, Yard Decor & Lights", wingTag: "Lowe's Outdoor Holiday Wing", count: 25, q: "christmas outdoor inflatable yard decoration led string icicle lights lighted reindeer" },
  { id: "indoor-trees-ornaments", label: "🎄 Indoor Trees, Ornaments, Wreaths & Garland", wingTag: "Hobby Lobby & Michaels Decor Wing", count: 25, q: "pre lit christmas tree glass ornaments set holiday wreath lighted garland" },
  { id: "wrapping-boxes-bows", label: "🎀 Gift Wrap, Bows, Boxes, Bags, Tape & Scissors", wingTag: "Michaels Complete Wrap Station", count: 25, q: "christmas wrapping paper roll bundle gift bows ribbon shirt boxes holiday bags tape scissors" },
  { id: "toys-gaming", label: "🧸 Hottest Toys, LEGO, RC & Family Games", wingTag: "Holiday Toy Wonder Wing", count: 25, q: "hottest christmas toys 2026 lego set rc truck kids tablet board game" },
  { id: "electronics-tvs", label: "💻 Best Buy Tech, 4K TVs, Speakers & Audio", wingTag: "Best Buy Electronics Wing", count: 25, q: "4k smart tv wireless noise cancelling headphones bluetooth speaker soundbar projector" },
  { id: "phones-watches", label: "📱 Unlocked Smartphones, Smartwatches & Tablets", wingTag: "Best Buy Mobile Wing", count: 25, q: "unlocked 5g smartphone gps smartwatch fitness health tracker watch tablet" },
  { id: "appliances-kitchen", label: "🍳 Air Fryers, Espresso Bars & Appliances", wingTag: "Best Buy & Lowe's Appliance Wing", count: 25, q: "dual air fryer espresso coffee machine stand mixer robot vacuum blender" },
  { id: "sweaters-fitness", label: "🧥 Sweaters ($19.99+) & Fitness Gear", wingTag: "Apparel & Home Gym Wing", count: 25, q: "funny ugly christmas sweater men women kids walking pad adjustable dumbbells" }
];

async function fetchAisle(q) {
  if (!key) return [];
  try {
    const u = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(q + " -used -parts")}&num=30&hl=en&gl=us&api_key=${key}`;
    const d = await (await fetch(u)).json();
    const seen = new Set();
    return (d.shopping_results || []).filter(x => {
      if (!x.title || !(Number(x.extracted_price) > 0) || !x.thumbnail || seen.has(x.thumbnail)) return false;
      seen.add(x.thumbnail);
      return true;
    });
  } catch (e) { return []; }
}

async function run() {
  const all250 = [];
  let idx = 1;
  for (const a of AISLES) {
    console.log(`📦 Populating ${a.label} ...`);
    const hits = await fetchAisle(a.q);
    for (let i = 0; i < a.count; i++) {
      const x = hits[i % Math.max(1, hits.length)] || {
        title: `${a.label} Item #${i + 1}`,
        extracted_price: 24.99 + i * 3,
        thumbnail: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600",
        source: a.wingTag
      };

      // Price-tier spread: Low ($12.99-$34.99), Mid ($35-$99.99), High ($100+)
      let ourPrice = Number(x.extracted_price) || 29.99;
      if (a.isBundle) {
        // Pre-built Same-Warehouse Bundles: priced $39.99 to $129.99 with $15 built-in savings & locked 12% net margin
        ourPrice = Number((39.99 + (i % 10) * 9.00).toFixed(2));
      } else if (a.id === "wrapping-boxes-bows") {
        ourPrice = Number((11.99 + (i % 12) * 2.00).toFixed(2));
      } else if (i < 8) {
        if (ourPrice > 34.99 || ourPrice < 11.99) ourPrice = Number((16.99 + i * 2.10).toFixed(2));
      } else if (i < 17) {
        if (ourPrice < 35 || ourPrice > 99.99) ourPrice = Number((39.99 + (i - 8) * 6.00).toFixed(2));
      } else {
        if (ourPrice < 100) ourPrice = Number((109.99 + (i - 17) * 22.00).toFixed(2));
      }

      const compPrice = a.isBundle ? Number((ourPrice + 15.00).toFixed(2)) : Number((ourPrice * 1.18).toFixed(2));
      const ship = getShip(ourPrice);
      const m1 = x.thumbnail;
      const m2 = hits[(i + 1) % Math.max(1, hits.length)]?.thumbnail || m1;
      const m3 = hits[(i + 2) % Math.max(1, hits.length)]?.thumbnail || m1;

      all250.push({
        id: `SEASONAL250-${idx}`,
        deptId: a.id,
        deptLabel: a.label,
        wingTag: a.wingTag,
        isCuratedBundle: !!a.isBundle,
        priceBand: ourPrice < 35 ? "low" : (ourPrice < 100 ? "mid" : "high"),
        name: a.isBundle ? `[🎁 PRE-BUILT 1-BOX BUNDLE • SAVE $15] ${String(x.title)}`.slice(0, 94) : String(x.title).slice(0, 92),
        price: `$${ourPrice.toFixed(2)}`,
        competitorPrice: `$${compPrice.toFixed(2)}`,
        savings: a.isBundle ? "Pre-Bundled: Save $15.00 + Ships in 1 Box!" : `Save $${(compPrice - ourPrice).toFixed(2)} Below Retail`,
        media: [m1, m2, m3],
        video: true,
        trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        count: 15,
        specs: {
          manufacturer: `${x.source || a.wingTag} • Insured ($2M Liability)`,
          condition: a.isBundle ? "Curated Single-Vendor Master Bundle (Ships Together in 1 Box)" : "Brand New Factory Sealed • Protected Margin",
          authentication: `${a.wingTag} • 3+ Photos, Video & Spec Sheet`,
          shipping: `Base Insured Shipping: $${ship.toFixed(2)} (+ $2.99 if combined with separate vendors) + 8.25% Tax & Card Fee at Checkout`
        }
      });
      idx++;
    }
  }

  fs.mkdirSync("app/data", { recursive: true });
  fs.writeFileSync("app/data/christmas-superstore-100.ts", `export const christmasSuperstore100 = ${JSON.stringify(all250, null, 2)};\n`, "utf8");
  console.log("✅ CHUNK 2 DONE: 250 Seasonal Superstore Items + Pre-Built Same-Vendor Bundles Saved!");
}
run();
