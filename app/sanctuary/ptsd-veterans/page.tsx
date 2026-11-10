"use client";
import React from "react";
import StoreCatalogView, { MallItem } from "../../components/StoreCatalogView";

const ITEMS: MallItem[] = [
  {
    "id": "PT-101",
    "name": "Vagus-Nerve Calming Haptic Wristband",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 22,
    "ship": 3.99,
    "stock": 6,
    "imgs": [
      "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?auto=format&fit=crop&w=600&q=80",
      "https://picsum.photos/seed/PT-0-2/600/420",
      "https://picsum.photos/seed/PT-0-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "PT-102",
    "name": "Service-Dog Tactical Vest & ADA Handle Kit",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 40.5,
    "ship": 5.99,
    "stock": 11,
    "imgs": [
      "https://picsum.photos/seed/PT-1-1/600/420",
      "https://picsum.photos/seed/PT-1-2/600/420",
      "https://picsum.photos/seed/PT-1-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "PT-103",
    "name": " Sunrise Simulation & White-Noise Sleep Sanctuary",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 59,
    "ship": 7.99,
    "stock": 16,
    "imgs": [
      "https://picsum.photos/seed/PT-2-1/600/420",
      "https://picsum.photos/seed/PT-2-2/600/420",
      "https://picsum.photos/seed/PT-2-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "PT-104",
    "name": "Deep-Pressure Grounding Weighted Shoulder Wrap",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 77.5,
    "ship": 3.99,
    "stock": 21,
    "imgs": [
      "https://picsum.photos/seed/PT-3-1/600/420",
      "https://picsum.photos/seed/PT-3-2/600/420",
      "https://picsum.photos/seed/PT-3-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "PT-105",
    "name": "Acupressure Mat & Cervical Relief Pillow",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 96,
    "ship": 5.99,
    "stock": 7,
    "imgs": [
      "https://picsum.photos/seed/PT-4-1/600/420",
      "https://picsum.photos/seed/PT-4-2/600/420",
      "https://picsum.photos/seed/PT-4-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "PT-106",
    "name": "Guided Breathwork Biofeedback Pebble",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 114.5,
    "ship": 7.99,
    "stock": 12,
    "imgs": [
      "https://picsum.photos/seed/PT-5-1/600/420",
      "https://picsum.photos/seed/PT-5-2/600/420",
      "https://picsum.photos/seed/PT-5-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  }
];

export default function MallPage() {
  return <StoreCatalogView title="🎗️ PTSD & VETERANS VALOR SANCTUARY" accent="#14b8a6" items={ITEMS} showTiers={true} />;
}
