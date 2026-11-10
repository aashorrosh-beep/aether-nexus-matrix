"use client";
import React from "react";
import StoreCatalogView, { MallItem } from "../components/StoreCatalogView";

const ITEMS: MallItem[] = [
  {
    "id": "WO-101",
    "name": "1964 NY World's Fair Brass Unisphere Desk Globe",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 22,
    "ship": 3.99,
    "stock": 6,
    "imgs": [
      "https://commons.wikimedia.org/wiki/Special:FilePath/The_Unisphere.JPG?width=600",
      "https://picsum.photos/seed/WO-0-2/600/420",
      "https://picsum.photos/seed/WO-0-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "WO-102",
    "name": "Vintage 1960s Diner Neon Wall Clock Replica",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 40.5,
    "ship": 5.99,
    "stock": 11,
    "imgs": [
      "https://picsum.photos/seed/WO-1-1/600/420",
      "https://picsum.photos/seed/WO-1-2/600/420",
      "https://picsum.photos/seed/WO-1-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "WO-103",
    "name": "Retro Tabletop Arcade Cabinet (60 Classic Games)",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 59,
    "ship": 7.99,
    "stock": 16,
    "imgs": [
      "https://picsum.photos/seed/WO-2-1/600/420",
      "https://picsum.photos/seed/WO-2-2/600/420",
      "https://picsum.photos/seed/WO-2-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "WO-104",
    "name": "1964 Fair Official Souvenir Guide & Map Folio",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 77.5,
    "ship": 3.99,
    "stock": 21,
    "imgs": [
      "https://picsum.photos/seed/WO-3-1/600/420",
      "https://picsum.photos/seed/WO-3-2/600/420",
      "https://picsum.photos/seed/WO-3-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "WO-105",
    "name": "Mid-Century Atomic Starburst Brass Chandelier",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 96,
    "ship": 5.99,
    "stock": 7,
    "imgs": [
      "https://picsum.photos/seed/WO-4-1/600/420",
      "https://picsum.photos/seed/WO-4-2/600/420",
      "https://picsum.photos/seed/WO-4-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "WO-106",
    "name": "Bluetooth Vacuum-Tube Style Walnut Turntable",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 114.5,
    "ship": 7.99,
    "stock": 12,
    "imgs": [
      "https://picsum.photos/seed/WO-5-1/600/420",
      "https://picsum.photos/seed/WO-5-2/600/420",
      "https://picsum.photos/seed/WO-5-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "WO-107",
    "name": "Classic Chrome Die-Cast 1964 Mustang 1:18",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 133,
    "ship": 3.99,
    "stock": 17,
    "imgs": [
      "https://picsum.photos/seed/WO-6-1/600/420",
      "https://picsum.photos/seed/WO-6-2/600/420",
      "https://picsum.photos/seed/WO-6-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "WO-108",
    "name": "Vintage View-Master 3D World's Fair Reel Box",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 151.5,
    "ship": 5.99,
    "stock": 22,
    "imgs": [
      "https://picsum.photos/seed/WO-7-1/600/420",
      "https://picsum.photos/seed/WO-7-2/600/420",
      "https://picsum.photos/seed/WO-7-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "WO-109",
    "name": "1970s Flip-Number Retro Mechanical Alarm Clock",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 170,
    "ship": 7.99,
    "stock": 8,
    "imgs": [
      "https://picsum.photos/seed/WO-8-1/600/420",
      "https://picsum.photos/seed/WO-8-2/600/420",
      "https://picsum.photos/seed/WO-8-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "WO-110",
    "name": " Collector Tin Wind-Up Space Robot Replica",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 188.5,
    "ship": 3.99,
    "stock": 13,
    "imgs": [
      "https://picsum.photos/seed/WO-9-1/600/420",
      "https://picsum.photos/seed/WO-9-2/600/420",
      "https://picsum.photos/seed/WO-9-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "WO-111",
    "name": "60s Shea Stadium & Flushing Meadows Print",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 207,
    "ship": 5.99,
    "stock": 18,
    "imgs": [
      "https://picsum.photos/seed/WO-10-1/600/420",
      "https://picsum.photos/seed/WO-10-2/600/420",
      "https://picsum.photos/seed/WO-10-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "WO-112",
    "name": "Authentic Mint Postage & Medallion Display",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 225.5,
    "ship": 7.99,
    "stock": 23,
    "imgs": [
      "https://picsum.photos/seed/WO-11-1/600/420",
      "https://picsum.photos/seed/WO-11-2/600/420",
      "https://picsum.photos/seed/WO-11-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  }
];

export default function MallPage() {
  return <StoreCatalogView title="🌐 1964 WORLD'S FAIR & GRAILS" accent="#f59e0b" items={ITEMS} showTiers={true} />;
}
