"use client";
import React from "react";
import StoreCatalogView, { MallItem } from "../../components/StoreCatalogView";

const ITEMS: MallItem[] = [
  {
    "id": "AU-101",
    "name": "Cooling Glass-Bead Weighted Sensory Blanket",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 22,
    "ship": 3.99,
    "stock": 6,
    "imgs": [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80",
      "https://picsum.photos/seed/AU-0-2/600/420",
      "https://picsum.photos/seed/AU-0-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "AU-102",
    "name": "28dB Noise-Canceling Sensory Ear Defenders",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 40.5,
    "ship": 5.99,
    "stock": 11,
    "imgs": [
      "https://picsum.photos/seed/AU-1-1/600/420",
      "https://picsum.photos/seed/AU-1-2/600/420",
      "https://picsum.photos/seed/AU-1-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "AU-103",
    "name": "AAC Picture & Touch Speech Communication Tablet",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 59,
    "ship": 7.99,
    "stock": 16,
    "imgs": [
      "https://picsum.photos/seed/AU-2-1/600/420",
      "https://picsum.photos/seed/AU-2-2/600/420",
      "https://picsum.photos/seed/AU-2-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "AU-104",
    "name": "Sensory Indoor Compression Therapy Swing",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 77.5,
    "ship": 3.99,
    "stock": 21,
    "imgs": [
      "https://picsum.photos/seed/AU-3-1/600/420",
      "https://picsum.photos/seed/AU-3-2/600/420",
      "https://picsum.photos/seed/AU-3-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "AU-105",
    "name": "Liquid Motion & Tactile Fidget Calm Kit",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 96,
    "ship": 5.99,
    "stock": 7,
    "imgs": [
      "https://picsum.photos/seed/AU-4-1/600/420",
      "https://picsum.photos/seed/AU-4-2/600/420",
      "https://picsum.photos/seed/AU-4-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "AU-106",
    "name": "Visual Daily Routine Magnetic Schedule Board",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 114.5,
    "ship": 7.99,
    "stock": 12,
    "imgs": [
      "https://picsum.photos/seed/AU-5-1/600/420",
      "https://picsum.photos/seed/AU-5-2/600/420",
      "https://picsum.photos/seed/AU-5-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  }
];

export default function MallPage() {
  return <StoreCatalogView title="🎗️ AUTISM & DOWN SYNDROME SANCTUARY" accent="#3b82f6" items={ITEMS} showTiers={true} />;
}
