import fs from "fs";

const TIERS = [
  { id: "hard50", count: 50, badge: "🔍 TOP 50 HARDEST-TO-FIND", label: "50 Hardest-to-Find Mobility & Neuromuscular Aids", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600", items: ["Ultra-Light Carbon Folding Rollator Walker", "Anti-Tremor Gyroscopic Stabilizing Spoon & Fork", "Portable Suitcase Carbon Wheelchair Ramp", "Open-Back Magnetic Closure Adaptive Apparel Set", "Power-Assist Bed Backrest & Leg Elevator"] },
  { id: "care35", count: 35, badge: "💙 TOP 35 CARETAKER LIFESAVER", label: "35 Caretaker Zero-Lift & Transfer Lifesavers", img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600", items: ["Zero-Friction Patient Slide Transfer Board", "Padded Gait & Transfer Assist Belt with Handles", "Swivel Padded Tub & Shower Transfer Bench", "No-Rinse Foaming Bedside Hair & Body Cleanser", "Alternating Pressure Sore Prevention Air Mattress"] },
  { id: "daily15", count: 15, badge: "⭐ TOP 15 SENIOR INDEPENDENCE", label: "15 Daily Senior Comfort & Independence Essentials", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600", items: ["36-Inch Rotating Magnetic Grabber Reacher Tool", "Voice-Activated SOS Caregiver Call Pendant", "Heated Foot & Calf Circulation Compression Massager", "Ergonomic Arthritis Jar & Bottle Opener Aid", "Motion-Activated Amber Nighttime Fall-Prevention Lights"] },
  { id: "clinical25", count: 25, badge: "🏆 TOP 25 CLINICAL EDIBLES & JOINT", label: "25 Clinical Joint, Nerve & Muscle Preservation Gummies/Drops", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600", items: ["HMB + Vitamin D3 Senior Muscle-Strength Chews", "CoQ10 Ubiquinol + D-Ribose Cellular Energy Gummies", "Turmeric Curcumin + Boswellia Joint Relief Gummies", "Magnesium Glycinate Nighttime Cramp-Relief Chews", "Alpha-Lipoic Acid + B-Complex Nerve Comfort Drops"] },
  { id: "bestseller25", count: 25, badge: "🔥 TOP 25 BEST-SELLER COMFORT", label: "25 Best-Selling Soothing Creams, Chews & Comfort Gear", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600", items: ["Arnica + Menthol + Hemp Deep Joint Roll-On Gel", "Tart Cherry + Collagen Joint Cushion Gummies", "Orthopedic Gel Coccyx Wheelchair & Recliner Cushion", "Non-Slip Gripper Hospital & Home Comfort Socks (6-Pack)", "1-Box Complete Senior Independence & Mobility Bundle"] }
];

const list150 = [];
let idx = 1;
for (const t of TIERS) {
  for (let i = 0; i < t.count; i++) {
    const baseName = t.items[i - Math.floor(i / 5) * 5];
    const isB = i < 4;
    const p = i < 8 ? Number((15.99 + i * 1.85).toFixed(2)) : (i < 22 ? Number((36.99 + (i - 8) * 2.15).toFixed(2)) : Number((84.99 + (i - 22) * 3.75).toFixed(2)));
    const comp = Number((p * 1.18).toFixed(2));
    const cnt = i < 6 ? 3 : (i < 15 ? 8 : 20);
    list150.push({
      id: "SANC-MD-150-" + idx,
      storeRoute: "/sanctuary/md-mobility",
      deptId: t.id,
      deptLabel: t.label,
      rankBadge: t.badge,
      isCuratedBundle: isB,
      priceBand: p < 34 ? "low" : (p <= 79 ? "mid" : "high"),
      count: cnt,
      name: "[" + t.badge + "] " + baseName + " — Model #" + (i + 1),
      price: "$" + p.toFixed(2),
      competitorPrice: "$" + comp.toFixed(2),
      savings: "Save $" + (comp - p).toFixed(2) + " (15% Below Medical Supply Retail)",
      media: [t.img, t.img, t.img],
      video: true,
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      specs: {
        manufacturer: "Mobility & Senior Sanctuary Direct • Insured ($2M Liability)",
        condition: t.badge + " • Clinical & Home Care Approved • Full Spec Sheet",
        shipping: "Base Insured Shipping + 8.25% Tax & Card Fee at Checkout"
      }
    });
    idx++;
  }
}
fs.mkdirSync("app/data", { recursive: true });
fs.writeFileSync("app/data/sanctuary-md-150.ts", "export const mdMobility150 = " + JSON.stringify(list150, null, 2) + ";\n", "utf8");
console.log("✅ MD STEP 1 DONE: 150 Mobility & Senior Independence Items Saved!");
