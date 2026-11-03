import fs from "fs";

const AISLES = [
  { id: "ages-1-5", label: "Ages 1-5 Theme Multi-Packs", age: "1-5", b: true, img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600" },
  { id: "ages-6-10", label: "Ages 6-10 Theme Multi-Packs", age: "6-10", b: true, img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600" },
  { id: "ages-10-15", label: "Ages 10-15 Neon & Quinceanera", age: "10-15", b: true, img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600" },
  { id: "ages-15-21", label: "Ages 15-21 Sweet 16, Grad & 21st", age: "15-21", b: true, img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600" },
  { id: "candy-buffet", label: "Bulk Candy Buffet & Fountains", age: "all", b: false, img: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=600" },
  { id: "favors-pinatas", label: "Pre-Filled Favors & Pinatas", age: "all", b: false, img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600" },
  { id: "helium-balloons", label: "Helium Tanks, Pumps & Arches", age: "all", b: false, img: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600" },
  { id: "custom-standees", label: "Custom Face Standees & Banners", age: "all", b: false, img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600" },
  { id: "tableware-catering", label: "Heavy Tableware & Chafing Dishes", age: "all", b: false, img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600" },
  { id: "bounce-yard", label: "Bounce Houses, Fog & Karaoke", age: "all", b: false, img: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600" }
];

const all250 = [];
let idx = 1;
for (const a of AISLES) {
  for (let i = 0; i < 25; i++) {
    const p = i < 8 ? Number((19.99 + i * 2.25).toFixed(2)) : (i < 18 ? Number((42.99 + (i - 8) * 3.75).toFixed(2)) : Number((89.99 + (i - 18) * 8.50).toFixed(2)));
    const comp = Number((p * 1.25).toFixed(2));
    const cnt = i < 8 ? 3 : (i < 17 ? 9 : 21);
    all250.push({
      id: "PARTY250-" + idx,
      deptId: a.id,
      deptLabel: a.label,
      ageBracket: a.age,
      isCuratedBundle: a.b,
      priceBand: p < 40 ? "low" : (p <= 85 ? "mid" : "high"),
      count: cnt,
      name: a.b ? "[10-Guest 1-Box Bundle + 60 Balloons + Custom Banner] " + a.label + " #" + (i + 1) : a.label + " Kit #" + (i + 1),
      price: "$" + p.toFixed(2),
      competitorPrice: "$" + comp.toFixed(2),
      savings: "Save $" + (comp - p).toFixed(2),
      media: [a.img, a.img, a.img],
      video: true,
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      specs: {
        manufacturer: "Party Lapooza Factory Direct • Insured ($2M Liability)",
        condition: a.b ? "Complete 10-Guest Multi-Pack (Ships in 1 Box)" : "Brand New • 3+ Photos, Video & Spec Sheet",
        shipping: "Insured 3-7 Day Delivery + 8.25% Tax & Card Fee at Checkout"
      }
    });
    idx++;
  }
}
fs.mkdirSync("app/data", { recursive: true });
fs.writeFileSync("app/data/party-superstore-250.ts", "export const partySuperstore250 = " + JSON.stringify(all250, null, 2) + ";\n", "utf8");
console.log("✅ STEP 1 COMPLETE: 250 Party Items Saved!");
