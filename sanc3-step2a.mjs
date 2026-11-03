import fs from "fs";

const partA = `"use client";
import React, { useState, useEffect } from "react";
import { blindDeaf150 } from "../../data/sanctuary-blind-deaf-150";

export default function BlindDeafSanctuary() {
  const [dept, setDept] = useState("all");
  const [budget, setBudget] = useState("all");
  const [q, setQ] = useState("");
  const [zip, setZip] = useState("");
  const [events, setEvents] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const sku = p.get("sku");
    if (sku) {
      const f = blindDeaf150.find((x: any) => x.id === sku);
      if (f) setSelected(f);
    }
  }, []);

  const buyNow = async (itemsToBuy: any[]) => {
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: itemsToBuy }) });
    const d = await r.json();
    if (d && d.url) window.location.href = d.url;
  };

  const shown = blindDeaf150.filter((it: any) => {
    const dOk = dept === "all" ? true : it.deptId === dept;
    const bOk = budget === "all" ? true : it.priceBand === budget;
    const qOk = q.trim() === "" ? true : it.name.toLowerCase().includes(q.toLowerCase());
    return dOk && bOk && qOk;
  });
`;

fs.mkdirSync("app/sanctuary/blind-deaf", { recursive: true });
fs.writeFileSync("app/sanctuary/blind-deaf/page.tsx", partA, "utf8");
console.log("✅ BLIND & DEAF STEP 2A DONE!");
