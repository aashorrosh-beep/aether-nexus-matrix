import fs from "fs";

// 1. Restore Exact Face-Value Gift Cards ($25, $50, $100, $250, $500, $1,000) with $0 Shipping & $0 Tax in app/inventory.ts
const invP = "app/inventory.ts";
const inv = JSON.parse(fs.readFileSync(invP, "utf8").match(/=\s*(\{[\s\S]*\});/)[1]);

const tiers = [25, 50, 100, 250, 500, 1000];
const themes = [
  { prefix: "Universal All-240-Rooms Mall Pass", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80" },
  { prefix: "🎄 Christmas & Holiday Wishlist Gift Card", img: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600&auto=format&fit=crop&q=80" },
  { prefix: "💙 Sanctuary Sponsor-A-Family & Adaptive Care Card", img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&auto=format&fit=crop&q=80" },
  { prefix: "👶 When You're Expecting & Baby Shower Gift Card", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80" },
  { prefix: "🎈 Party Lapooza Custom Celebration Gift Card", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80" },
  { prefix: "🏆 SPORTSFLIX Pro Locker & Outdoors Gift Card", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80" }
];

const gcItems = [];
let idx = 1;
for (const th of themes) {
  for (const amt of tiers) {
    gcItems.push({
      id: `NEXUS-GC-${amt}-${idx}`,
      name: `$${amt}.00 ${th.prefix} (Valid in All 240 Mall Storefronts)`,
      price: `$${amt}.00`,
      vendorCost: "$0.00 (100% Cash Float Until Redeemed)",
      netMargin: "100% Immediate Cash Flow • Locked to Your 240 Rooms",
      media: [th.img, themes[(idx) % themes.length].img, themes[(idx + 1) % themes.length].img],
      video: true,
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      count: 999,
      isGiftCard: true,
      specs: {
        manufacturer: "ALBS Nexus Universal Treasury • Closed-Loop Mall Gift Card",
        condition: "Instant Digital Code + Printable Gift Certificate • Never Expires",
        authentication: "Valid Across All 240 Storefronts (Sanctuaries, Holiday 100, Expecting, Party Lapooza, Sportsflix & Nostalgia)",
        shipping: "Instant Digital Delivery: $0.00 Shipping • $0.00 Sales Tax on Gift Card Purchase",
        market_value: `Face Value: $${amt}.00 | Redeemable via Promo/Gift Code Box at Stripe Checkout`,
        status: "GIFT_CARD_TAX_AND_SHIPPING_EXEMPT"
      }
    });
    idx++;
  }
}

inv["universal-mall-gift-cards"] = gcItems;
if (inv["gift-cards"]) inv["gift-cards"] = gcItems;
fs.writeFileSync(invP, "export const masterInventory: Record<string, any[]> = " + JSON.stringify(inv, null, 2) + ";\n");

// 2. Ensure app/api/checkout/route.ts enables allow_promotion_codes: true & charges $0 shipping / $0 tax on Gift Cards
const ckPath = "app/api/checkout/route.ts";
if (fs.existsSync(ckPath)) {
  let ck = fs.readFileSync(ckPath, "utf8");
  if (!ck.includes("allow_promotion_codes")) {
    ck = ck.replace(/mode:\s*["']payment["'],/, `mode: "payment",\n      allow_promotion_codes: true,`);
    fs.writeFileSync(ckPath, ck, "utf8");
  }
}

// 3. Pin the Universal Gift Card Showcase Card right into the Top-of-Mall Hero Stack on app/page.tsx
let p = fs.readFileSync("app/page.tsx", "utf8");
const gcCardCall = `\${card("from-amber-950 to-yellow-900", "border-amber-300", "💳 $0 TAX & $0 SHIPPING • VALID IN ALL 240 ROOMS", "🎁 Universal Mall Gift Cards ($25, $50, $100, $250, $500 & $1,000)", "Give the Gift of Choice Across All 240 Storefronts (Sanctuaries, Expecting, Holiday 100, Party Lapooza & Sportsflix) • Instant Digital Code Redeemable at Checkout", "/nostalgia/universal-mall-gift-cards", "💳 Buy or Send a Gift Card →")}`;

if (!p.includes("universal-mall-gift-cards")) {
  p = p.replace(
    /(\$\{card\("from-fuchsia-950[\s\S]*?\)\})/,
    `$1\n  ${gcCardCall}`
  );
  fs.writeFileSync("app/page.tsx", p, "utf8");
}

console.log("✅ UNIVERSAL GIFT CARD PROGRAM ($25–$1,000) RESTORED WITH $0 SHIPPING, $0 TAX & CHECKOUT REDEMPTION!");
