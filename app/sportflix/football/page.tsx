"use client";
import React from "react";
import StoreCatalogView, { MallItem } from "../../components/StoreCatalogView";

const ITEMS: MallItem[] = [
  {
    "id": "AL-101",
    "name": "Pro-Spec Official Leather Game Football",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 22,
    "ship": 3.99,
    "stock": 6,
    "imgs": [
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80",
      "https://picsum.photos/seed/AL-0-2/600/420",
      "https://picsum.photos/seed/AL-0-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "AL-102",
    "name": "Tour Laser Slope-Adjusted Golf Rangefinder",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 40.5,
    "ship": 5.99,
    "stock": 11,
    "imgs": [
      "https://picsum.photos/seed/AL-1-1/600/420",
      "https://picsum.photos/seed/AL-1-2/600/420",
      "https://picsum.photos/seed/AL-1-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "AL-103",
    "name": "Carbon-Graphite Saltwater Spinning Rod & Reel",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 59,
    "ship": 7.99,
    "stock": 16,
    "imgs": [
      "https://picsum.photos/seed/AL-2-1/600/420",
      "https://picsum.photos/seed/AL-2-2/600/420",
      "https://picsum.photos/seed/AL-2-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "AL-104",
    "name": "Tailgate Portable Smokeless Propane Grill",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 77.5,
    "ship": 3.99,
    "stock": 21,
    "imgs": [
      "https://picsum.photos/seed/AL-3-1/600/420",
      "https://picsum.photos/seed/AL-3-2/600/420",
      "https://picsum.photos/seed/AL-3-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "AL-105",
    "name": "UV-Protected Autograph Helmet Display Case",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 96,
    "ship": 5.99,
    "stock": 7,
    "imgs": [
      "https://picsum.photos/seed/AL-4-1/600/420",
      "https://picsum.photos/seed/AL-4-2/600/420",
      "https://picsum.photos/seed/AL-4-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "AL-106",
    "name": "Indoor Putting Green Return Mat (10ft)",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 114.5,
    "ship": 7.99,
    "stock": 12,
    "imgs": [
      "https://picsum.photos/seed/AL-5-1/600/420",
      "https://picsum.photos/seed/AL-5-2/600/420",
      "https://picsum.photos/seed/AL-5-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "AL-107",
    "name": "ATV Waterproof Cargo & Trail Recovery Kit",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 133,
    "ship": 3.99,
    "stock": 17,
    "imgs": [
      "https://picsum.photos/seed/AL-6-1/600/420",
      "https://picsum.photos/seed/AL-6-2/600/420",
      "https://picsum.photos/seed/AL-6-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "AL-108",
    "name": "Radar Pocket Pitching & Swing Speed Sensor",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 151.5,
    "ship": 5.99,
    "stock": 22,
    "imgs": [
      "https://picsum.photos/seed/AL-7-1/600/420",
      "https://picsum.photos/seed/AL-7-2/600/420",
      "https://picsum.photos/seed/AL-7-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "AL-109",
    "name": "Insulated 65-Qt Heavy-Duty Rotomolded Cooler",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 170,
    "ship": 7.99,
    "stock": 8,
    "imgs": [
      "https://picsum.photos/seed/AL-8-1/600/420",
      "https://picsum.photos/seed/AL-8-2/600/420",
      "https://picsum.photos/seed/AL-8-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "AL-110",
    "name": "Pro Agility Ladder, Cones & Resistance Chute",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 188.5,
    "ship": 3.99,
    "stock": 13,
    "imgs": [
      "https://picsum.photos/seed/AL-9-1/600/420",
      "https://picsum.photos/seed/AL-9-2/600/420",
      "https://picsum.photos/seed/AL-9-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "AL-111",
    "name": "Heated Stadium Bleacher Reclining Seat Duo",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 207,
    "ship": 5.99,
    "stock": 18,
    "imgs": [
      "https://picsum.photos/seed/AL-10-1/600/420",
      "https://picsum.photos/seed/AL-10-2/600/420",
      "https://picsum.photos/seed/AL-10-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "AL-112",
    "name": " polarized Tournament Fishing Sunglasses",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 225.5,
    "ship": 7.99,
    "stock": 23,
    "imgs": [
      "https://picsum.photos/seed/AL-11-1/600/420",
      "https://picsum.photos/seed/AL-11-2/600/420",
      "https://picsum.photos/seed/AL-11-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  }
];

export default function MallPage() {
  return <StoreCatalogView title="🏟️ ALBS NEXUS STADIUM" accent="#22c55e" items={ITEMS} showTiers={true} />;
}
