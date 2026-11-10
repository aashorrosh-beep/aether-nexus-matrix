"use client";
import React from "react";
import StoreCatalogView, { MallItem } from "../../components/StoreCatalogView";

const ITEMS: MallItem[] = [
  {
    "id": "MO-101",
    "name": "Ultra-Light Folding Carbon Rollator Walker",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 22,
    "ship": 3.99,
    "stock": 6,
    "imgs": [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
      "https://picsum.photos/seed/MO-0-2/600/420",
      "https://picsum.photos/seed/MO-0-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "MO-102",
    "name": "Portable Non-Slip Aluminum Threshold Ramp",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 40.5,
    "ship": 5.99,
    "stock": 11,
    "imgs": [
      "https://picsum.photos/seed/MO-1-1/600/420",
      "https://picsum.photos/seed/MO-1-2/600/420",
      "https://picsum.photos/seed/MO-1-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "MO-103",
    "name": "One-Touch Electric Jar & Adaptive Utensil Set",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 59,
    "ship": 7.99,
    "stock": 16,
    "imgs": [
      "https://picsum.photos/seed/MO-2-1/600/420",
      "https://picsum.photos/seed/MO-2-2/600/420",
      "https://picsum.photos/seed/MO-2-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "MO-104",
    "name": "Memory-Foam Pressure-Relief Wheelchair Cushion",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 77.5,
    "ship": 3.99,
    "stock": 21,
    "imgs": [
      "https://picsum.photos/seed/MO-3-1/600/420",
      "https://picsum.photos/seed/MO-3-2/600/420",
      "https://picsum.photos/seed/MO-3-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "MO-105",
    "name": " Swivel Auto Seat Transfer Aid Cushion",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 96,
    "ship": 5.99,
    "stock": 7,
    "imgs": [
      "https://picsum.photos/seed/MO-4-1/600/420",
      "https://picsum.photos/seed/MO-4-2/600/420",
      "https://picsum.photos/seed/MO-4-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "MO-106",
    "name": "Under-Desk Motorized Rehab Pedal Exerciser",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 114.5,
    "ship": 7.99,
    "stock": 12,
    "imgs": [
      "https://picsum.photos/seed/MO-5-1/600/420",
      "https://picsum.photos/seed/MO-5-2/600/420",
      "https://picsum.photos/seed/MO-5-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  }
];

export default function MallPage() {
  return <StoreCatalogView title="🎗️ MOBILITY & REHAB SANCTUARY" accent="#22c55e" items={ITEMS} showTiers={true} />;
}
