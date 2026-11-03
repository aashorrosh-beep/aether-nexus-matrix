import fs from "fs";

const AISLES = [
  { id: "fighter-bundles", label: "1-Box Complete Home Boxing Gym & Strength Bundles", b: true, img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600" },
  { id: "gloves-headgear", label: "Full-Grain Leather Boxing Gloves, MMA Mitts & Headgear", b: false, img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600" },
  { id: "heavy-bags-rings", label: "100-lb Heavy Punching Bags, Reflex Bars & Speed Bags", b: false, img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600" },
  { id: "dumbbells-racks", label: "Adjustable Dumbbells, Kettlebells, Power Racks & Recovery", b: false, img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600" }
];

const cf60 = [];
let idx = 1;
for (const a of AISLES) {
  for (let i = 0; i < 15; i++) {
    const p = i < 5 ? Number((19.99 + i * 3.50).toFixed(2)) : (i < 11 ? Number((49.99 + (i - 5) * 9.50).toFixed(2)) : Number((129.99 + (i - 11) * 32.00).toFixed(2)));
    const comp = Number((p * 1.19).toFixed(2));
    const cnt = i < 5 ? 3 : (i < 11 ? 8 : 20);
    cf60.push({
      id: "SPORTFLIX-CF-" + idx,
      storeRoute: "/sportflix/combat-fitness",
      deptId: a.id,
      deptLabel: a.label,
      isCuratedBundle: a.b,
      priceBand: p < 40 ? "low" : (p <= 115 ? "mid" : "high"),
      count: cnt,
      name: a.b ? "[1-Box Fighter Bundle • Save $15] " + a.label + " #" + (i + 1) : "SPORTFLIX WORLD Combat — " + a.label + " #" + (i + 1),
      price: "$" + p.toFixed(2),
      competitorPrice: "$" + comp.toFixed(2),
      savings: "Save $" + (comp - p).toFixed(2) + " Below Gym Equipment Retail",
      media: [a.img, a.img, a.img],
      video: true,
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      specs: {
        manufacturer: "SPORTFLIX WORLD Combat Direct • Insured ($2M Liability)",
        condition: a.b ? "Complete 1-Box Combat & Gym Pack (Single Warehouse)" : "Brand New Pro Gym Grade • 3+ Photos, Video & Spec Sheet",
        shipping: "Base Insured Shipping + 8.25% Tax & Card Fee at Checkout"
      }
    });
    idx++;
  }
}
fs.mkdirSync("app/data", { recursive: true });
fs.writeFileSync("app/data/sportflix-combat-60.ts", "export const combat60 = " + JSON.stringify(cf60, null, 2) + ";\n", "utf8");
console.log("✅ COMBAT STEP 1 DONE!");
