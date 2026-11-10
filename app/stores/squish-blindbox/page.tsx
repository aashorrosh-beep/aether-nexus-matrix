"use client";
import React from "react";
import StoreCatalogView, { MallItem } from "../../components/StoreCatalogView";

const ITEMS: MallItem[] = [
  {
    "id": "SQ-101",
    "name": "24-Inch Jumbo Pastel Cow Plush",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 22,
    "ship": 3.99,
    "stock": 6,
    "imgs": [
      "https://images.unsplash.com/photo-1558679908-541bcf1249ff?auto=format&fit=crop&w=600&q=80",
      "https://picsum.photos/seed/SQ-0-2/600/420",
      "https://picsum.photos/seed/SQ-0-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "SQ-102",
    "name": "Pop Mart Sealed Case (12 Blind Boxes)",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 40.5,
    "ship": 5.99,
    "stock": 11,
    "imgs": [
      "https://picsum.photos/seed/SQ-1-1/600/420",
      "https://picsum.photos/seed/SQ-1-2/600/420",
      "https://picsum.photos/seed/SQ-1-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "SQ-103",
    "name": "Rare Collector Secret Chase Figure",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 59,
    "ship": 7.99,
    "stock": 16,
    "imgs": [
      "https://picsum.photos/seed/SQ-2-1/600/420",
      "https://picsum.photos/seed/SQ-2-2/600/420",
      "https://picsum.photos/seed/SQ-2-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "SQ-104",
    "name": "Kawaii Plush Mystery Bundle (5-Pk)",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 77.5,
    "ship": 3.99,
    "stock": 21,
    "imgs": [
      "https://picsum.photos/seed/SQ-3-1/600/420",
      "https://picsum.photos/seed/SQ-3-2/600/420",
      "https://picsum.photos/seed/SQ-3-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "SQ-105",
    "name": "16-Inch Dragon Squad Collector Plush",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 96,
    "ship": 5.99,
    "stock": 7,
    "imgs": [
      "https://picsum.photos/seed/SQ-4-1/600/420",
      "https://picsum.photos/seed/SQ-4-2/600/420",
      "https://picsum.photos/seed/SQ-4-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "SQ-106",
    "name": "Acrylic UV-Protected Blind-Box Display Case",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 114.5,
    "ship": 7.99,
    "stock": 12,
    "imgs": [
      "https://picsum.photos/seed/SQ-5-1/600/420",
      "https://picsum.photos/seed/SQ-5-2/600/420",
      "https://picsum.photos/seed/SQ-5-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "SQ-107",
    "name": "Limited Edition Berry Frog Squish",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 133,
    "ship": 3.99,
    "stock": 17,
    "imgs": [
      "https://picsum.photos/seed/SQ-6-1/600/420",
      "https://picsum.photos/seed/SQ-6-2/600/420",
      "https://picsum.photos/seed/SQ-6-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "SQ-108",
    "name": "Mega 10-Plush Family Gift Crate",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 151.5,
    "ship": 5.99,
    "stock": 22,
    "imgs": [
      "https://picsum.photos/seed/SQ-7-1/600/420",
      "https://picsum.photos/seed/SQ-7-2/600/420",
      "https://picsum.photos/seed/SQ-7-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "SQ-109",
    "name": "Anime Vinyl Chibi Blind Series",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 170,
    "ship": 7.99,
    "stock": 8,
    "imgs": [
      "https://picsum.photos/seed/SQ-8-1/600/420",
      "https://picsum.photos/seed/SQ-8-2/600/420",
      "https://picsum.photos/seed/SQ-8-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "SQ-110",
    "name": "Glow-in-the-Dark Cosmic Axolotl Plush",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 188.5,
    "ship": 3.99,
    "stock": 13,
    "imgs": [
      "https://picsum.photos/seed/SQ-9-1/600/420",
      "https://picsum.photos/seed/SQ-9-2/600/420",
      "https://picsum.photos/seed/SQ-9-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "SQ-111",
    "name": "Collector Velvet Plush Storage Hammock",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 207,
    "ship": 5.99,
    "stock": 18,
    "imgs": [
      "https://picsum.photos/seed/SQ-10-1/600/420",
      "https://picsum.photos/seed/SQ-10-2/600/420",
      "https://picsum.photos/seed/SQ-10-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "SQ-112",
    "name": "Deluxe 24-Day Mini Plush Vault",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 225.5,
    "ship": 7.99,
    "stock": 23,
    "imgs": [
      "https://picsum.photos/seed/SQ-11-1/600/420",
      "https://picsum.photos/seed/SQ-11-2/600/420",
      "https://picsum.photos/seed/SQ-11-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  }
];

export default function MallPage() {
  return <StoreCatalogView title="🧸 SQUISH & BLIND VAULT" accent="#ec4899" items={ITEMS} showTiers={true} />;
}
