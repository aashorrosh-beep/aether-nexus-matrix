import fs from "fs";

const AISLES = [
  { id: "golf-pickle-bundles", label: "1-Box Complete Golf Links & 4-Player Pickleball Bundles", b: true, img: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600" },
  { id: "pickleball-carbon", label: "T700 Raw Carbon Pickleball Paddles, Portable Nets & Balls", b: false, img: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600" },
  { id: "golf-clubs-bags", label: "Complete Golf Club Sets, Forged Drivers, Wedges & Stand Bags", b: false, img: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600" },
  { id: "rangefinders-mats", label: "Slope Laser Rangefinders, Launch Monitors & Putting Greens", b: false, img: "https://images.unsplash.com/photo-1592919505780-303950717480?w=600" }
];

const gp60 = [];
let idx = 1;
for (const a of AISLES) {
  for (let i = 0; i < 15; i++) {
    const p = i < 5 ? Number((19.99 + i * 3.50).toFixed(2)) : (i < 11 ? Number((49.99 + (i - 5) * 9.50).toFixed(2)) : Number((129.99 + (i - 11) * 32.00).toFixed(2)));
    const comp = Number((p * 1.19).toFixed(2));
    const cnt = i < 5 ? 3 : (i < 11 ? 8 : 20);
    gp60.push({
      id: "SPORTFLIX-GP-" + idx,
      storeRoute: "/sportflix/golf-pickleball",
      deptId: a.id,
      deptLabel: a.label,
      isCuratedBundle: a.b,
      priceBand: p < 40 ? "low" : (p <= 115 ? "mid" : "high"),
      count: cnt,
      name: a.b ? "[1-Box Club & Court Bundle • Save $15] " + a.label + " #" + (i + 1) : "SPORTFLIX WORLD Golf/Pickle — " + a.label + " #" + (i + 1),
      price: "$" + p.toFixed(2),
      competitorPrice: "$" + comp.toFixed(2),
      savings: "Save $" + (comp - p).toFixed(2) + " Below Country Club Pro Shop",
      media: [a.img, a.img, a.img],
      video: true,
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      specs: {
        manufacturer: "SPORTFLIX WORLD Links Direct • Insured ($2M Liability)",
        condition: a.b ? "Complete 1-Box Golf/Pickleball Pack (Single Warehouse)" : "Brand New Tour Grade • 3+ Photos, Video & Spec Sheet",
        shipping: "Base Insured Shipping + 8.25% Tax & Card Fee at Checkout"
      }
    });
    idx++;
  }
}
fs.mkdirSync("app/data", { recursive: true });
fs.writeFileSync("app/data/sportflix-golf-pickleball-60.ts", "export const golfPickle60 = " + JSON.stringify(gp60, null, 2) + ";\n", "utf8");
console.log("✅ GOLF & PICKLEBALL STEP 1 DONE!");
