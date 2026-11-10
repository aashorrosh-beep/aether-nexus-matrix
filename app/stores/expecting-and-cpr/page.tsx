"use client";
import React from "react";
import StoreCatalogView, { MallItem } from "../../components/StoreCatalogView";

const ITEMS: MallItem[] = [
  {
    "id": "MA-101",
    "name": "Smart HD Breathing & Sleep Nursery Monitor",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 22,
    "ship": 3.99,
    "stock": 6,
    "imgs": [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80",
      "https://picsum.photos/seed/MA-0-2/600/420",
      "https://picsum.photos/seed/MA-0-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "MA-102",
    "name": "Infant & Child CPR Manikin + Free Cert Voucher",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 40.5,
    "ship": 5.99,
    "stock": 11,
    "imgs": [
      "https://picsum.photos/seed/MA-1-1/600/420",
      "https://picsum.photos/seed/MA-1-2/600/420",
      "https://picsum.photos/seed/MA-1-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "MA-103",
    "name": "Convertible 4-in-1 Solid Oak Nursery Crib",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 59,
    "ship": 7.99,
    "stock": 16,
    "imgs": [
      "https://picsum.photos/seed/MA-2-1/600/420",
      "https://picsum.photos/seed/MA-2-2/600/420",
      "https://picsum.photos/seed/MA-2-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "MA-104",
    "name": "Hospital-Grade Wearable Hands-Free Breast Pump",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 77.5,
    "ship": 3.99,
    "stock": 21,
    "imgs": [
      "https://picsum.photos/seed/MA-3-1/600/420",
      "https://picsum.photos/seed/MA-3-2/600/420",
      "https://picsum.photos/seed/MA-3-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "MA-105",
    "name": "Ergonomic Swivel Nursery Power Glider",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 96,
    "ship": 5.99,
    "stock": 7,
    "imgs": [
      "https://picsum.photos/seed/MA-4-1/600/420",
      "https://picsum.photos/seed/MA-4-2/600/420",
      "https://picsum.photos/seed/MA-4-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "MA-106",
    "name": "One-Hand Fold Luxury Stroller & Car Seat System",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 114.5,
    "ship": 7.99,
    "stock": 12,
    "imgs": [
      "https://picsum.photos/seed/MA-5-1/600/420",
      "https://picsum.photos/seed/MA-5-2/600/420",
      "https://picsum.photos/seed/MA-5-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "MA-107",
    "name": "Organic Bamboo Newborn Swaddle Trio",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 133,
    "ship": 3.99,
    "stock": 17,
    "imgs": [
      "https://picsum.photos/seed/MA-6-1/600/420",
      "https://picsum.photos/seed/MA-6-2/600/420",
      "https://picsum.photos/seed/MA-6-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "MA-108",
    "name": "UV-C Baby Bottle Washer & Sterilizer Dryer",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 151.5,
    "ship": 5.99,
    "stock": 22,
    "imgs": [
      "https://picsum.photos/seed/MA-7-1/600/420",
      "https://picsum.photos/seed/MA-7-2/600/420",
      "https://picsum.photos/seed/MA-7-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "MA-109",
    "name": "Maternity U-Shaped Cooling Full-Body Pillow",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 170,
    "ship": 7.99,
    "stock": 8,
    "imgs": [
      "https://picsum.photos/seed/MA-8-1/600/420",
      "https://picsum.photos/seed/MA-8-2/600/420",
      "https://picsum.photos/seed/MA-8-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "MA-110",
    "name": " Infant Choking Rescue Suction Kit + Training",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 188.5,
    "ship": 3.99,
    "stock": 13,
    "imgs": [
      "https://picsum.photos/seed/MA-9-1/600/420",
      "https://picsum.photos/seed/MA-9-2/600/420",
      "https://picsum.photos/seed/MA-9-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "MA-111",
    "name": "Smart Wipe Warmer & Diaper Caddy Station",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 207,
    "ship": 5.99,
    "stock": 18,
    "imgs": [
      "https://picsum.photos/seed/MA-10-1/600/420",
      "https://picsum.photos/seed/MA-10-2/600/420",
      "https://picsum.photos/seed/MA-10-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "MA-112",
    "name": "White-Noise & Starry Night Crib Soother",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 225.5,
    "ship": 7.99,
    "stock": 23,
    "imgs": [
      "https://picsum.photos/seed/MA-11-1/600/420",
      "https://picsum.photos/seed/MA-11-2/600/420",
      "https://picsum.photos/seed/MA-11-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  }
];

export default function MallPage() {
  return <StoreCatalogView title="👶 MATERNITY & FREE CPR" accent="#14b8a6" items={ITEMS} showTiers={true} />;
}
