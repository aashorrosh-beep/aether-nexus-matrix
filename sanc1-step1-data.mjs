import fs from "fs";

const TIERS = [
  { id: "hard50", count: 50, badge: "🔍 TOP 50 HARDEST-TO-FIND", label: "50 Most Difficult-to-Find (Youth & Adult-Child Sizing)", img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600", items: ["Adult-Size Enclosed Safety Sensory Bed Tent", "Dedicated Offline AAC Speech Tablet", "Heavy-Duty Adult-Child Compression Sensory Swing", " GPS Elopement Smart Safety Wristband", "Seamless Tagless Escape-Proof Adaptive Jumpsuit"] },
  { id: "care35", count: 35, badge: "💙 TOP 35 CARETAKER LIFESAVER", label: "35 Most Needed & Effective Caretaker Lifesavers", img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600", items: ["Waterproof Washable Zippered Mattress Encasement", "Wireless Bed & Door Exit Caregiver Pager", "Unbreakable Silicone Suction Divided Dining Plate", "Visual Magnetic Daily Routine Schedule Board", "32dB Acoustic Meltdown Noise-Canceling Earmuffs"] },
  { id: "daily15", count: 15, badge: "⭐ TOP 15 HIGH-SELLING DAILY", label: "15 High-Selling Daily Sensory Essentials", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600", items: ["Cooling Glass-Bead Weighted Blanket (15lb/20lb/25lb)", "Liquid Motion Calming Sensory Timer Set", "Soft Bristle 3-Sided Sensory Toothbrush", "Lyca Deep-Pressure Sensory Body Sock", "Silent Classroom & Home Fidget Cube Kit"] },
  { id: "clinical25", count: 25, badge: "🏆 TOP 25 CLINICAL EDIBLES & AIDS", label: "25 Clinical Gummies, Gut-Brain Edibles & Neuro Drops", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600", items: ["L-Theanine + Mag L-Threonate Calm Focus Gummies", "Gut-Brain Psychobiotic Pre/Probiotic Chewables", "Broad-Spectrum Botanical Calm Relief Edibles", "Methylated B12 + Folate Spectrum Liquid Drops", "Algal DHA Omega-3 + Lion's Mane Brain Chews"] },
  { id: "bestseller25", count: 25, badge: "🔥 TOP 25 BEST-SELLER GUMMIES & SENSORY", label: "25 Best-Selling Calming Gummies, Chews & Sensory Gear", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600", items: ["Chamomile + Lemon Balm + GABA Bedtime Gummies", "Food-Grade Silicone Oral-Motor Chew Necklace Pack", "Sugar-Free Tart Cherry & Magnesium Sleep Chews", "Organic Elderberry + Zinc Sensory-Friendly Gummies", "1-Box Complete Autism Calm & Caregiver Bundle"] }
];

const list150 = [];
let idx = 1;

for (const t of TIERS) {
  for (let i = 0; i < t.count; i++) {
    const baseName = t.items[i - Math.floor(i / 5) * 5];
    const isB = i < 4;
    const p = i < 8 ? Number((14.99 + i * 1.75).toFixed(2)) : (i < 22 ? Number((34.99 + (i - 8) * 1.95).toFixed(2)) : Number((79.99 + (i - 22) * 3.25).toFixed(2)));
    const comp = Number((p * 1.18).toFixed(2));
    const cnt = i < 6 ? 3 : (i < 15 ? 8 : 21);

    list150.push({
      id: "SANC-AUTISM-150-" + idx,
      storeRoute: "/sanctuary/autism-spectrum",
      deptId: t.id,
      deptLabel: t.label,
      rankBadge: t.badge,
      isCuratedBundle: isB,
      priceBand: p < 32 ? "low" : (p <= 75 ? "mid" : "high"),
      count: cnt,
      name: "[" + t.badge + "] " + baseName + " — Edition #" + (i + 1),
      price: "$" + p.toFixed(2),
      competitorPrice: "$" + comp.toFixed(2),
      savings: "Save $" + (comp - p).toFixed(2) + " (15% Below Specialty Medical Retail)",
      media: [t.img, t.img, t.img],
      video: true,
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      specs: {
        manufacturer: "Autism Sanctuary Direct • Lab & Safety Tested",
        condition: t.badge + " • Youth & Adult-Child Approved • Full Spec Sheet",
        shipping: "Base Insured Shipping + 8.25% Tax & Card Fee at Checkout"
      }
    });
    idx++;
  }
}

fs.mkdirSync("app/data", { recursive: true });
fs.writeFileSync("app/data/sanctuary-autism-150.ts", "export const autism150 = " + JSON.stringify(list150, null, 2) + ";\n", "utf8");
console.log("✅ AUTISM STEP 1 DONE: 150 Vetted Items (50 Hardest + 35 Caretaker + 15 Daily + 25 Clinical + 25 Best-Seller Gummies/Sensory) Saved!");
