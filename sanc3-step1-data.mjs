import fs from "fs";

const TIERS = [
  { id: "hard50", count: 50, badge: "🔍 TOP 50 HARDEST-TO-FIND", label: "50 Hardest-to-Find Braille, Tactile & Deaf-Alert Tech", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600", items: ["Refreshable Tactile Braille Reader Display", "Smart Offline OCR Text-to-Speech Reading Glasses", "UL-Listed Strobe & Bed-Shaker Smoke/CO Alert System", "Ultrasonic Haptic Obstacle-Detecting Smart Cane", "Two-Way ASL Video & Caption Communication Tablet"] },
  { id: "care35", count: 35, badge: "💙 TOP 35 CARETAKER LIFESAVER", label: "35 Caretaker Navigation, Safety & Alert Lifesavers", img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600", items: ["Vibrating Pillow & Wristband Baby/Doorbell Alert", "Talking Voice-Guided Kitchen & Medication Scale", "High-Contrast Tactile Bump-Dot Appliance Marker Kit", "Ultrasonic Liquid Level Cup Overflow Audio/Vibe Sensor", "Voice-Recording Tactile Pill & Prescription Bottle Tags"] },
  { id: "daily15", count: 15, badge: "⭐ TOP 15 HIGH-SELLING DAILY", label: "15 High-Selling Daily Vision & Hearing Essentials", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600", items: ["5X Full-Page LED High-Contrast Magnifying Floor Lamp", "60dB Amplified Clarity Senior & Low-Vision Corded Phone", "Talking Atomic Español/English Wristwatch & Alarm", "UV-Shielding Anti-Glare Macular Protection Over-Glasses", "Rechargeable Hearing Aid Dehumidifier & UV Sanitizer Box"] },
  { id: "clinical25", count: 25, badge: "🏆 TOP 25 CLINICAL EYE & EAR EDIBLES", label: "25 Clinical Macular, Retinal & Auditory Nerve Gummies/Drops", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600", items: ["AREDS-2 Lutein 20mg + Zeaxanthin Macular Vision Gummies", "Astaxanthin + Bilberry Retinal Micro-Circulation Chews", "Ginkgo Biloba + Magnesium + Zinc Tinnitus & Ear Drops", "Methylcobalamin B12 + Alpha-Lipoic Optic Nerve Chews", "Saffron 30mg + DHA Omega-3 Retinal Clarity Softgels"] },
  { id: "bestseller25", count: 25, badge: "🔥 TOP 25 BEST-SELLER SENSORY & CHEWS", label: "25 Best-Selling Eye-Soothing Gels, Gummies & Tactile Aids", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600", items: ["Heated USB Dry-Eye Meibomian Relief Compress Mask", "Blue-Light Defense Elderberry + Lutein Daily Gummies", "Braille & Raised-Print Heavy-Duty Measuring Cup Set", "High-Contrast Large-Print Tactile Keyboard & Playing Cards", "1-Box Complete Low-Vision & Deaf Home Safety Bundle"] }
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
      id: "SANC-BLIND-150-" + idx,
      storeRoute: "/sanctuary/blind-deaf",
      deptId: t.id,
      deptLabel: t.label,
      rankBadge: t.badge,
      isCuratedBundle: isB,
      priceBand: p < 34 ? "low" : (p <= 79 ? "mid" : "high"),
      count: cnt,
      name: "[" + t.badge + "] " + baseName + " — Spec #" + (i + 1),
      price: "$" + p.toFixed(2),
      competitorPrice: "$" + comp.toFixed(2),
      savings: "Save $" + (comp - p).toFixed(2) + " (15% Below Assistive Tech Retail)",
      media: [t.img, t.img, t.img],
      video: true,
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      specs: {
        manufacturer: "Blind & Deaf Sanctuary Direct • Insured ($2M Liability)",
        condition: t.badge + " • High-Contrast & Tactile Verified • Full Spec Sheet",
        shipping: "Base Insured Shipping + 8.25% Tax & Card Fee at Checkout"
      }
    });
    idx++;
  }
}
fs.mkdirSync("app/data", { recursive: true });
fs.writeFileSync("app/data/sanctuary-blind-deaf-150.ts", "export const blindDeaf150 = " + JSON.stringify(list150, null, 2) + ";\n", "utf8");
console.log("✅ BLIND & DEAF STEP 1 DONE: 150 Items Saved!");
