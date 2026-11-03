import fs from "fs";

const topPart = `"use client";
import React, { useState, useEffect } from "react";
import { partySuperstore250 } from "../../data/party-superstore-250";

const AISLES = [
  { id: "all", label: "🎈 All 250 Party Items" },
  { id: "ages-1-5", label: "👶 Ages 1-5 Bundles" },
  { id: "ages-6-10", label: "🧒 Ages 6-10 Bundles" },
  { id: "ages-10-15", label: "🎧 Ages 10-15 & Quinceanera" },
  { id: "ages-15-21", label: "👑 Ages 15-21 Sweet 16 / Grad / 21st" },
  { id: "candy-buffet", label: "🍬 Candy Buffet & Fountains" },
  { id: "favors-pinatas", label: "🎁 Favors, Goodie Bags & Pinatas" },
  { id: "helium-balloons", label: "🎈 Helium Tanks, Pumps & Arches" },
  { id: "custom-standees", label: "📸 Custom Face Standees & Banners" },
  { id: "tableware-catering", label: "🍽️ Tableware & Chafing Dishes" },
  { id: "bounce-yard", label: "🎪 Bounce Houses, Fog & Karaoke" }
];

export default function PartyLapoozaSuperstore() {
  const [dept, setDept] = useState("all");
  const [budget, setBudget] = useState("all");
  const [q, setQ] = useState("");
  const [guestName, setGuestName] = useState("VIP BIRTHDAY STAR!");
  const [photoUrl, setPhotoUrl] = useState("https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500");
  const [narration, setNarration] = useState("Welcome everyone to the ultimate VIP celebration!");
  const [selected, setSelected] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const sku = p.get("sku");
    if (sku) {
      const f = partySuperstore250.find((x: any) => x.id === sku);
      if (f) setSelected(f);
    }
  }, []);

  const buyNow = async (itemsToBuy: any[]) => {
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: itemsToBuy }) });
    const d = await r.json();
    if (d && d.url) window.location.href = d.url;
  };

  const shown = partySuperstore250.filter((it: any) => {
    const dOk = dept === "all" ? true : it.deptId === dept;
    const bOk = budget === "all" ? true : it.priceBand === budget;
    const qOk = q.trim() === "" ? true : it.name.toLowerCase().includes(q.toLowerCase());
    return dOk && bOk && qOk;
  });
`;

fs.mkdirSync("app/stores/party-lapooza", { recursive: true });
fs.writeFileSync("app/stores/party-lapooza/page.tsx", topPart, "utf8");
console.log("✅ STEP 2 COMPLETE: Top Half of UI Written!");
