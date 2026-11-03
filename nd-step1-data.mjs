import fs from "fs";

const AISLES = [
  { id: "nd-bundles", label: "1-Box North Dakota Walleye, Ice Shanty & Basecamp Bundles", b: true, img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600" },
  { id: "rods-reels-tackle", label: "Walleye & Bass Rods, Baitcaster Reels & Loaded Tackle Boxes", b: false, img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600" },
  { id: "ice-fishing-hardwater", label: "ND Hardwater: Thermal Pop-Up Ice Shanties, Augers & Sonar", b: false, img: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=600" },
  { id: "camping-outfitter", label: "4-Season Badlands Tents, Zero-Degree Bags, Stoves & Coolers", b: false, img: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600" }
];

const nd60 = [];
let idx = 1;
for (const a of AISLES) {
  for (let i = 0; i < 15; i++) {
    const p = i < 5 ? Number((19.99 + i * 3.50).toFixed(2)) : (i < 11 ? Number((54.99 + (i - 5) * 9.50).toFixed(2)) : Number((139.99 + (i - 11) * 32.00).toFixed(2)));
    const comp = Number((p * 1.20).toFixed(2));
    const cnt = i < 5 ? 3 : (i < 11 ? 8 : 19);
    nd60.push({
      id: "SPORTFLIX-ND-" + idx,
      storeRoute: "/sportflix/fishing-camping",
      deptId: a.id,
      deptLabel: a.label,
      isCuratedBundle: a.b,
      priceBand: p < 40 ? "low" : (p <= 125 ? "mid" : "high"),
      count: cnt,
      name: a.b ? "[1-Box Outfitter Bundle • Save $15] " + a.label + " #" + (i + 1) : "SPORTFLIX WORLD Outfitter — " + a.label + " #" + (i + 1),
      price: "$" + p.toFixed(2),
      competitorPrice: "$" + comp.toFixed(2),
      savings: "Save $" + (comp - p).toFixed(2) + " Below Outfitter Retail",
      media: [a.img, a.img, a.img],
      video: true,
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      specs: {
        manufacturer: "SPORTFLIX WORLD Outfitter Direct • Insured ($2M Liability)",
        condition: a.b ? "Complete 1-Box Fishing & Camping Pack (Single Warehouse)" : "Brand New Outfitter Grade • 3+ Photos, Video & Spec Sheet",
        shipping: "Base Insured Shipping + 8.25% Tax & Card Fee at Checkout"
      }
    });
    idx++;
  }
}
fs.mkdirSync("app/data", { recursive: true });
fs.writeFileSync("app/data/sportflix-fishing-camping-60.ts", "export const fishingCamping60 = " + JSON.stringify(nd60, null, 2) + ";\n", "utf8");
console.log("✅ ND STEP 1 DONE: 60 North Dakota Fishing, Ice Angling & Camping Items Saved!");
