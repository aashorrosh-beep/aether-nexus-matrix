import fs from "fs";

const AISLES = [
  {
    id: "peptides-creams",
    label: "Peptides, GHK-Cu Creams & NAD+ Repair",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600",
    med: ["Oral BPC-157 Arginine Salt Capsules", "GHK-Cu Copper Peptide Topical Cream", "Liposomal NAD+ Precursor Complex", "TB-500 Thymosin Recovery Formula", "KPV Gut & Cellular Calm Peptide"],
    top: ["Multi-Collagen Tripeptide Powder", "Hyaluronic + Copper Peptide Serum", "Liposomal Glutathione Master Antioxidant", "CoQ10 Ubiquinol Cellular Softgels", "Essential Amino + Peptide Hydration"]
  },
  {
    id: "brain-memory",
    label: "Memory, Dementia & Neuro-Preventive Care",
    img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600",
    med: ["Lion's Mane 30-Beta-Glucan Dual Extract", "Magnesium L-Threonate Brain-Barrier Formula", "Citicoline CDP-Choline + Phosphatidylserine", "Longvida Liposomal Curcumin Neuro-Shield", "PQQ + Acetyl-L-Carnitine Mitochondrial Stack"],
    top: ["High-DHA Wild Omega-3 Neuro Softgels", "Bacopa Monnieri + Ginkgo Memory Drops", "Methylated B12 + Folate Brain Defense", "Pure C8 MCT Brain Energy Oil", "Apigenin + L-Theanine Deep Brain Rest"]
  },
  {
    id: "herbal-apothecary",
    label: "Oncology-Supportive Herbs, Mushrooms & Apothecary",
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600",
    med: ["Turkey Tail PSK/PSP Standardized Extract", "Organic Soursop Graviola Leaf & Tincture", "Reishi Spore + Wild Chaga Dual Extract", "Activated Sulforaphane Broccoli Seed Complex", "Modified Citrus Pectin + Quercetin Defense"],
    top: ["Cold-Pressed Thymoquinone Black Seed Oil", "Wildcrafted St. Lucian Gold Sea Moss Gel", "Organic Ginger & Peppermint Soothing Tea", "Milk Thistle + Dandelion Root Liver Cleanse", "Raw Manuka Honey + Elderberry Immune Elixir"]
  },
  {
    id: "gnc-proteins",
    label: "Clean Proteins, Senior Muscle Preservation & Creatine",
    img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600",
    med: ["HMB + Vitamin D3 Muscle-Preservation Powder", "Cold-Filtered Grass-Fed Whey Isolate", "Medical-Grade Master Essential Amino Acids", "L-Glutamine Gut & Tissue Recovery Powder", "Micronized Creatine Monohydrate (Brain & Muscle)"],
    top: ["Organic Plant Protein (Pea, Hemp & Pumpkin)", "Hydrolyzed Bone Broth Collagen Protein", "Zero-Sugar Trace Mineral Electrolytes", "Organic Superfood Greens + Mushroom Blend", "Complete 1-Box Daily Longevity Protein Stack"]
  }
];

const VOLS = ["5mg / 30 Caps / 1lb (Starter)", "10mg / 2oz Cream / 2lb (Standard)", "15mg / 4oz Cream / 5lb (Clinic Bulk)"];
const hp200 = [];
let idx = 1;

for (const a of AISLES) {
  for (let i = 0; i < 50; i++) {
    const isMed25 = i < 25;
    const rankGroup = isMed25 ? "med25" : "top25";
    const rankBadge = isMed25 ? "🏆 TOP 25 CLINICAL VALUE" : "🔥 TOP 25 BEST-SELLER";
    const baseName = isMed25 ? a.med[i - Math.floor(i / 5) * 5] : a.top[(i - 25) - Math.floor((i - 25) / 5) * 5];
    const vol = VOLS[i < 16 ? 0 : (i < 34 ? 1 : 2)];
    const isB = i < 6;
    const p = i < 16 ? Number((21.99 + (i - Math.floor(i / 8) * 8) * 2.25).toFixed(2)) : (i < 34 ? Number((46.99 + (i - 16) * 2.10).toFixed(2)) : Number((89.99 + (i - 34) * 3.50).toFixed(2)));
    const comp = Number((p * 1.22).toFixed(2));
    const cnt = i < 14 ? 3 : (i < 32 ? 8 : 22);

    hp200.push({
      id: "HOLISTIC200-" + idx,
      storeRoute: "/stores/holistic-peptides-wellness",
      deptId: a.id,
      deptLabel: a.label,
      rankGroup,
      rankBadge,
      volumeSize: vol,
      isCuratedBundle: isB,
      priceBand: p < 40 ? "low" : (p <= 88 ? "mid" : "high"),
      count: cnt,
      name: "[" + rankBadge + " • " + vol + "] " + baseName + " — Spec #" + (i + 1),
      price: "$" + p.toFixed(2),
      competitorPrice: "$" + comp.toFixed(2),
      savings: "Save $" + (comp - p).toFixed(2) + " Below Clinic & GNC Retail",
      media: [a.img, a.img, a.img],
      video: true,
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      specs: {
        manufacturer: "ALBS Holistic & Peptide Lab Direct • 3rd-Party COA Verified",
        condition: rankBadge + " • Volume: " + vol + " • Full Purity Spec Sheet",
        shipping: "Insured Temperature-Protected Shipping + 8.25% Tax & Card Fee at Checkout"
      }
    });
    idx++;
  }
}

fs.mkdirSync("app/data", { recursive: true });
fs.writeFileSync("app/data/holistic-peptides-100.ts", "export const holisticPeptides100 = " + JSON.stringify(hp200, null, 2) + ";\n", "utf8");
console.log("✅ STEP 1 DONE: 200 Holistic, Peptide, Memory & Oncology-Comfort Items Saved!");
