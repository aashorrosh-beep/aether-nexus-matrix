import fs from "fs";

const AISLES = [
  { id: "wash-bundles", label: "1-Box Complete Car Wash & Ceramic Detail Bundles", b: true, img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600" },
  { id: "pressure-foam", label: "Electric Pressure Washers, Foam Cannons & Short Guns", b: false, img: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600" },
  { id: "ceramic-polish", label: "Graphene Ceramic Coatings, Dual-Action Buffers & Wax", b: false, img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600" },
  { id: "interior-vacuums", label: "High-Suction Wet/Dry Vacuums, Steamers & Microfiber", b: false, img: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=600" }
];

const car100 = [];
let idx = 1;
for (const a of AISLES) {
  for (let i = 0; i < 25; i++) {
    const p = i < 9 ? Number((14.99 + i * 2.15).toFixed(2)) : (i < 18 ? Number((39.99 + (i - 9) * 4.25).toFixed(2)) : Number((94.99 + (i - 18) * 12.00).toFixed(2)));
    const comp = Number((p * 1.22).toFixed(2));
    const cnt = i < 8 ? 3 : (i < 16 ? 8 : 20);
    car100.push({
      id: "CARWASH100-" + idx,
      storeRoute: "/stores/car-wash-auto",
      deptId: a.id,
      deptLabel: a.label,
      isCuratedBundle: a.b,
      priceBand: p < 35 ? "low" : (p <= 85 ? "mid" : "high"),
      count: cnt,
      name: a.b ? "[1-Box Pro Wash Bundle • Save $15] " + a.label + " #" + (i + 1) : a.label + " Pro Auto Spec #" + (i + 1),
      price: "$" + p.toFixed(2),
      competitorPrice: "$" + comp.toFixed(2),
      savings: "Save $" + (comp - p).toFixed(2) + " Below Auto Shop Retail",
      media: [a.img, a.img, a.img],
      video: true,
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      specs: {
        manufacturer: "ALBS Auto Detail Direct • Insured ($2M Liability)",
        condition: a.b ? "Complete 1-Box Wash & Detail Kit (Single Warehouse)" : "Brand New Auto Detailing Grade • 3+ Photos, Video & Spec Sheet",
        shipping: "Base Insured Shipping + 8.25% Tax & Card Fee at Checkout"
      }
    });
    idx++;
  }
}
fs.mkdirSync("app/data", { recursive: true });
fs.writeFileSync("app/data/car-wash-100.ts", "export const carWash100 = " + JSON.stringify(car100, null, 2) + ";\n", "utf8");
console.log("✅ CAR WASH STEP 1 DONE: 100 Pure Car Wash & Detailing Items Saved!");
