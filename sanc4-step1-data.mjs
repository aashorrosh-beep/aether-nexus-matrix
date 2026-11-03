import fs from "fs";

const TIERS = [
  { id: "hard50", count: 50, badge: "🔍 TOP 50 HARDEST-TO-FIND", label: "50 Hardest-to-Find PTSD, Vagus-Nerve & K9 Service Gear", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600", items: ["25-lb Cooling Glass-Bead Adult Grounding Blanket", "Wrist-Worn Vagus Nerve Calming Pulse Wearable", "Tactical MOLLE Service Dog Harness & ADA Patch Kit", "Bluetooth Bone-Conduction Sleep Pillow Speaker", "32dB Acoustic Hypervigilance Noise-Filtering Earplugs"] },
  { id: "care35", count: 35, badge: "💙 TOP 35 CARETAKER LIFESAVER", label: "35 Family & Caregiver Non-Startle Home Lifesavers", img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600", items: ["Non-Startle Gradual Sunrise Simulation Wake Clock", "Soft-Glow Amber Hallway Motion Perimeter Light Set", "Full-Back Acupressure Myofascial Release Mat & Pillow", "Heart-Rate Variability (HRV) Night-Terror Alert Band", "Weighted 8-lb Deep-Pressure Neck & Shoulder Wrap"] },
  { id: "daily15", count: 15, badge: "⭐ TOP 15 HIGH-SELLING DAILY", label: "15 High-Selling Daily Calm & Sleep Essentials", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600", items: ["Studio-Grade Brown, Pink & Rain Sound Machine", "Contoured Blackout Zero-Eye-Pressure Sleep Mask", "Amber Nighttime Cortisol-Shielding Glasses", "Tactile Metal Breathing Necklace & Grounding Stone", "Portable Heated Shiatsu Neck & Trap Massager"] },
  { id: "clinical25", count: 25, badge: "🏆 TOP 25 CLINICAL CALM EDIBLES", label: "25 Clinical Cortisol, GABA & Nighttime Rest Gummies/Drops", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600", items: ["KSM-66 Ashwagandha + L-Theanine Cortisol Calm Gummies", "Magnesium Glycinate + GABA + Apigenin Deep Sleep Chews", "Broad-Spectrum Botanical Nervous-System Calm Drops", "Holy Basil (Tulsi) + Rhodiola Adrenal Balance Chews", "Phosphatidylserine + Lemon Balm Nighttime Calm Gummies"] },
  { id: "bestseller25", count: 25, badge: "🔥 TOP 25 BEST-SELLER SLEEP & RELIEF", label: "25 Best-Selling Sleep Gummies, Roll-Ons & Peace Bundles", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600", items: ["Melatonin-Free Tart Cherry + Valerian Root Sleep Gummies", "Vetiver, Cedarwood & Lavender Grounding Pulse Roll-On", "Organic Chamomile, Passionflower & Skullcap Night Tea", "Magnesium Bath Flakes + Epsom Muscle-Release Soak (5lb)", "1-Box Complete Veteran & PTSD Peace Recovery Bundle"] }
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
      id: "SANC-PTSD-150-" + idx,
      storeRoute: "/sanctuary/ptsd-veterans",
      deptId: t.id,
      deptLabel: t.label,
      rankBadge: t.badge,
      isCuratedBundle: isB,
      priceBand: p < 34 ? "low" : (p <= 79 ? "mid" : "high"),
      count: cnt,
      name: "[" + t.badge + "] " + baseName + " — Edition #" + (i + 1),
      price: "$" + p.toFixed(2),
      competitorPrice: "$" + comp.toFixed(2),
      savings: "Save $" + (comp - p).toFixed(2) + " (15% Below Specialty Retail)",
      media: [t.img, t.img, t.img],
      video: true,
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      specs: {
        manufacturer: "PTSD & Veteran Sanctuary Direct • Insured ($2M Liability)",
        condition: t.badge + " • Veteran & Trauma-Informed Spec • Full Spec Sheet",
        shipping: "Base Insured Shipping + 8.25% Tax & Card Fee at Checkout"
      }
    });
    idx++;
  }
}
fs.mkdirSync("app/data", { recursive: true });
fs.writeFileSync("app/data/sanctuary-ptsd-150.ts", "export const ptsd150 = " + JSON.stringify(list150, null, 2) + ";\n", "utf8");
console.log("✅ PTSD STEP 1 DONE: app/data/sanctuary-ptsd-150.ts Created!");
