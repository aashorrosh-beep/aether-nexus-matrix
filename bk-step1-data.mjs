import fs from "fs";

const AISLES = [
  { id: "court-bundles", label: "1-Box Complete Home Court, AAU Team & Shooter Bundles", b: true, img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600" },
  { id: "hoops-backboards", label: "Tempered Glass Portable & In-Ground Basketball Hoops", b: false, img: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600" },
  { id: "balls-racks", label: "Official Indoor/Outdoor Leather Game Balls & Ball Carts", b: false, img: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=600" },
  { id: "return-nets-agility", label: "180-Degree Shot Return Nets, Dribble Specs & Vert Mats", b: false, img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600" }
];

const bk60 = [];
let idx = 1;
for (const a of AISLES) {
  for (let i = 0; i < 15; i++) {
    const p = i < 5 ? Number((19.99 + i * 3.50).toFixed(2)) : (i < 11 ? Number((49.99 + (i - 5) * 9.50).toFixed(2)) : Number((129.99 + (i - 11) * 32.00).toFixed(2)));
    const comp = Number((p * 1.19).toFixed(2));
    const cnt = i < 5 ? 3 : (i < 11 ? 8 : 20);
    bk60.push({
      id: "SPORTFLIX-BK-" + idx,
      storeRoute: "/sportflix/basketball",
      deptId: a.id,
      deptLabel: a.label,
      isCuratedBundle: a.b,
      priceBand: p < 40 ? "low" : (p <= 115 ? "mid" : "high"),
      count: cnt,
      name: a.b ? "[1-Box Court Bundle • Save $15] " + a.label + " #" + (i + 1) : "SPORTFLIX WORLD Basketball — " + a.label + " #" + (i + 1),
      price: "$" + p.toFixed(2),
      competitorPrice: "$" + comp.toFixed(2),
      savings: "Save $" + (comp - p).toFixed(2) + " Below Pro Shop Retail",
      media: [a.img, a.img, a.img],
      video: true,
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      specs: {
        manufacturer: "SPORTFLIX WORLD Court Direct • Insured ($2M Liability)",
        condition: a.b ? "Complete 1-Box Basketball Pack (Single Warehouse)" : "Brand New Pro Court Grade • 3+ Photos, Video & Spec Sheet",
        shipping: "Base Insured Shipping + 8.25% Tax & Card Fee at Checkout"
      }
    });
    idx++;
  }
}
fs.mkdirSync("app/data", { recursive: true });
fs.writeFileSync("app/data/sportflix-basketball-60.ts", "export const basketball60 = " + JSON.stringify(bk60, null, 2) + ";\n", "utf8");
console.log("✅ BASKETBALL STEP 1 DONE!");
