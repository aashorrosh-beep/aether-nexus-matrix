import fs from "fs";

const topUi = `"use client";
import React, { useState, useEffect } from "react";
import { holisticPeptides100 } from "../../data/holistic-peptides-100";

const AI_ROUTES: Record<string, { title: string; recipe: string; stack: string }> = {
  brain: {
    title: "🧠 Memory, Dementia & Neuro-Preventive Daily Protocol",
    recipe: "Morning Neuro Infusion: Steep 1 tsp Dual-Extract Lion's Mane + 1/2 tsp Bacopa + Rosemary in warm water with 1 tsp C8 MCT oil for brain-barrier lipid transport.",
    stack: "Top Clinical Stack: Lion's Mane 30% Beta-Glucan + Magnesium L-Threonate + Citicoline + Liposomal Curcumin."
  },
  herbal: {
    title: "🌿 Botanical Oncology-Supportive Comfort & Cellular Defense Protocol",
    recipe: "Slow-Simmer Apothecary Decoction: Simmer 2g Turkey Tail (PSK) + 2g Reishi + Soursop Leaf + Ginger root for 20 mins; finish with 1 tsp cold-pressed Black Seed Oil.",
    stack: "Top Clinical Stack: Turkey Tail PSK/PSP Extract + Organic Soursop + Activated Sulforaphane + Ginger Soothing Tea."
  },
  peptides: {
    title: "🧬 Oral & Topical Peptide Cellular Repair Protocol",
    recipe: "Synergistic Routine: Take Oral BPC-157 Arginine Salt & Liposomal NAD+ on a light stomach in the morning; apply GHK-Cu Copper Peptide Cream topically at night.",
    stack: "Top Clinical Stack: Oral BPC-157 (5mg/10mg/15mg) + GHK-Cu 2oz/4oz Cream + Liposomal Glutathione."
  },
  protein: {
    title: "💪 Senior Muscle Preservation, Anti-Wasting & Clean Protein Protocol",
    recipe: "Daily Strength Shake: Blend 1 scoop Cold-Filtered Whey Isolate (or Organic Plant Protein) + 3g HMB + D3 + 5g Micronized Creatine + L-Glutamine.",
    stack: "Top Clinical Stack: HMB + D3 Muscle Preservation Powder + 5lb Clean Whey Isolate + Essential Amino Acids."
  }
};

export default function HolisticPeptidesSuperstore() {
  const [dept, setDept] = useState("all");
  const [rankFilter, setRankFilter] = useState("all");
  const [budget, setBudget] = useState("all");
  const [routeKey, setRouteKey] = useState("brain");
  const [q, setQ] = useState("");
  const [zip, setZip] = useState("");
  const [clinics, setClinics] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const sku = p.get("sku");
    if (sku) {
      const f = holisticPeptides100.find((x: any) => x.id === sku);
      if (f) setSelected(f);
    }
  }, []);

  const buyNow = async (itemsToBuy: any[]) => {
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: itemsToBuy }) });
    const d = await r.json();
    if (d && d.url) window.location.href = d.url;
  };

  const shown = holisticPeptides100.filter((it: any) => {
    const dOk = dept === "all" ? true : it.deptId === dept;
    const rOk = rankFilter === "all" ? true : it.rankGroup === rankFilter;
    const bOk = budget === "all" ? true : it.priceBand === budget;
    const qOk = q.trim() === "" ? true : it.name.toLowerCase().includes(q.toLowerCase());
    return dOk && rOk && bOk && qOk;
  });
  const activeRoute = AI_ROUTES[routeKey];
`;

fs.mkdirSync("app/stores/holistic-peptides-wellness", { recursive: true });
fs.writeFileSync("app/stores/holistic-peptides-wellness/page.tsx", topUi, "utf8");
console.log("✅ STEP 2 DONE: Top Half of 200-Item UI Written!");
