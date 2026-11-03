import fs from "fs";

const AISLES = [
  { id: "gridiron-bundles", label: "1-Box Complete 7-on-7, Lineman & QB Training Bundles", b: true, img: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600" },
  { id: "helmets-pads", label: "Pro & Youth Football Helmets, Visors & Shoulder Pads", b: false, img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600" },
  { id: "gloves-cleats", label: "Ultra-Stick Receiver Gloves, Padded Girdles & Cleat Gear", b: false, img: "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=600" },
  { id: "sleds-qb-nets", label: "QB Target Nets, Blocking Dummies, Sleds & Speed Ladders", b: false, img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600" }
];

const fb60 = [];
let idx = 1;
for (const a of AISLES) {
  for (let i = 0; i < 15; i++) {
    const p = i < 5 ? Number((19.99 + i * 3.50).toFixed(2)) : (i < 11 ? Number((49.99 + (i - 5) * 9.50).toFixed(2)) : Number((129.99 + (i - 11) * 29.00).toFixed(2)));
    const comp = Number((p * 1.19).toFixed(2));
    const cnt = i < 5 ? 3 : (i < 11 ? 8 : 20);
    fb60.push({
      id: "SPORTFLIX-FB-" + idx,
      storeRoute: "/sportflix/football",
      deptId: a.id,
      deptLabel: a.label,
      isCuratedBundle: a.b,
      priceBand: p < 40 ? "low" : (p <= 115 ? "mid" : "high"),
      count: cnt,
      name: a.b ? "[1-Box Gridiron Bundle • Save $15] " + a.label + " #" + (i + 1) : "SPORTFLIX WORLD Football — " + a.label + " #" + (i + 1),
      price: "$" + p.toFixed(2),
      competitorPrice: "$" + comp.toFixed(2),
      savings: "Save $" + (comp - p).toFixed(2) + " Below Pro Shop Retail",
      media: [a.img, a.img, a.img],
      video: true,
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      specs: {
        manufacturer: "SPORTFLIX WORLD Gridiron Direct • Insured ($2M Liability)",
        condition: a.b ? "Complete 1-Box Football Pack (Single Warehouse)" : "Brand New Pro Gridiron Grade • 3+ Photos, Video & Spec Sheet",
        shipping: "Base Insured Shipping + 8.25% Tax & Card Fee at Checkout"
      }
    });
    idx++;
  }
}
fs.mkdirSync("app/data", { recursive: true });
fs.writeFileSync("app/data/sportflix-football-60.ts", "export const football60 = " + JSON.stringify(fb60, null, 2) + ";\n", "utf8");
console.log("✅ FOOTBALL STEP 1 DONE!");
