import fs from "fs";

const AISLES = [
  { id: "trail-bundles", label: "1-Box Complete ATV Trail Recovery, Winch & Lighting Bundles", b: true, img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600" },
  { id: "winches-recovery", label: "4500-lb Electric Winches, Synthetic Ropes & Hitch Kits", b: false, img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600" },
  { id: "led-whips-audio", label: "Off-Road LED Light Bars, RGB Whip Lights & Marine Soundbars", b: false, img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600" },
  { id: "helmets-cargo", label: "DOT Motocross/ATV Helmets, Goggles, Racks & UTV Cargo Boxes", b: false, img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600" }
];

const atv60 = [];
let idx = 1;
for (const a of AISLES) {
  for (let i = 0; i < 15; i++) {
    const p = i < 5 ? Number((22.99 + i * 3.50).toFixed(2)) : (i < 11 ? Number((59.99 + (i - 5) * 9.50).toFixed(2)) : Number((139.99 + (i - 11) * 32.00).toFixed(2)));
    const comp = Number((p * 1.20).toFixed(2));
    const cnt = i < 5 ? 3 : (i < 11 ? 8 : 19);
    atv60.push({
      id: "SPORTFLIX-ATV-" + idx,
      storeRoute: "/sportflix/atvs-offroad",
      deptId: a.id,
      deptLabel: a.label,
      isCuratedBundle: a.b,
      priceBand: p < 40 ? "low" : (p <= 125 ? "mid" : "high"),
      count: cnt,
      name: a.b ? "[1-Box Off-Road Bundle • Save $15] " + a.label + " #" + (i + 1) : "SPORTFLIX WORLD ATVs — " + a.label + " #" + (i + 1),
      price: "$" + p.toFixed(2),
      competitorPrice: "$" + comp.toFixed(2),
      savings: "Save $" + (comp - p).toFixed(2) + " Below Powersports Retail",
      media: [a.img, a.img, a.img],
      video: true,
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      specs: {
        manufacturer: "SPORTFLIX WORLD Off-Road Direct • Insured ($2M Liability)",
        condition: a.b ? "Complete 1-Box ATV/UTV Trail Pack (Single Warehouse)" : "Brand New Trail-Rated Grade • 3+ Photos, Video & Spec Sheet",
        shipping: "Base Insured Shipping + 8.25% Tax & Card Fee at Checkout"
      }
    });
    idx++;
  }
}
fs.mkdirSync("app/data", { recursive: true });
fs.writeFileSync("app/data/sportflix-atvs-60.ts", "export const atvs60 = " + JSON.stringify(atv60, null, 2) + ";\n", "utf8");
console.log("✅ ATV STEP 1 DONE!");
