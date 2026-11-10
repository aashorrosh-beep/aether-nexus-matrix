"use client";
import React from "react";
import StoreCatalogView, { MallItem } from "../../components/StoreCatalogView";
import { CHRISTMAS_100 } from "../../data/christmas-100";

const VIDS = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
];

const ITEMS: MallItem[] = CHRISTMAS_100.map((x, i) => ({
  ...x,
  imgs: [
    x.img,
    `https://picsum.photos/seed/${x.id}-angle2/600/420`,
    `https://picsum.photos/seed/${x.id}-angle3/600/420`,
  ],
  video: VIDS[i % VIDS.length],
}));

export default function ChristmasPage() {
  return (
    <StoreCatalogView
      title="🎄 THE CHRISTMAS STORE (165 TIERED SKUs)"
      accent="#ef4444"
      items={ITEMS}
      showTiers={true}
      categories={[
        ["all", "🎄 All Holiday (165)"],
        ["lights", "💡 Exterior Lights & Yard Inflatables (55)"],
        ["gifts", "🔥 Hottest 2026 Wanted Gifts (55)"],
        ["wrapping", "🎁 Paper, Boxes, Bags & Labels (30)"],
        ["decor", "🏠 Indoor Trees & Decor (25)"],
      ]}
    />
  );
}
