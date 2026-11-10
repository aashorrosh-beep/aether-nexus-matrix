"use client";
import React from "react";
import StoreCatalogView, { MallItem } from "../../components/StoreCatalogView";

const ITEMS: MallItem[] = [
  {
    "id": "TH-101",
    "name": "Standalone 4K Mixed-Reality VR Immersion Headset",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 22,
    "ship": 3.99,
    "stock": 6,
    "imgs": [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      "https://picsum.photos/seed/TH-0-2/600/420",
      "https://picsum.photos/seed/TH-0-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "TH-102",
    "name": "Programmable Biped AI Companion Robot Kit",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 40.5,
    "ship": 5.99,
    "stock": 11,
    "imgs": [
      "https://picsum.photos/seed/TH-1-1/600/420",
      "https://picsum.photos/seed/TH-1-2/600/420",
      "https://picsum.photos/seed/TH-1-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "TH-103",
    "name": "Haptic Feedback Force-Sensing VR Vest",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 59,
    "ship": 7.99,
    "stock": 16,
    "imgs": [
      "https://picsum.photos/seed/TH-2-1/600/420",
      "https://picsum.photos/seed/TH-2-2/600/420",
      "https://picsum.photos/seed/TH-2-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "TH-104",
    "name": "RGB Mechanical Hot-Swap Cyberdeck Keyboard",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 77.5,
    "ship": 3.99,
    "stock": 21,
    "imgs": [
      "https://picsum.photos/seed/TH-3-1/600/420",
      "https://picsum.photos/seed/TH-3-2/600/420",
      "https://picsum.photos/seed/TH-3-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "TH-105",
    "name": "Local Edge-AI Neural Compute Mini Server",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 96,
    "ship": 5.99,
    "stock": 7,
    "imgs": [
      "https://picsum.photos/seed/TH-4-1/600/420",
      "https://picsum.photos/seed/TH-4-2/600/420",
      "https://picsum.photos/seed/TH-4-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "TH-106",
    "name": "Dual-Arm Articulated Monitor Zero-G Cockpit",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 114.5,
    "ship": 7.99,
    "stock": 12,
    "imgs": [
      "https://picsum.photos/seed/TH-5-1/600/420",
      "https://picsum.photos/seed/TH-5-2/600/420",
      "https://picsum.photos/seed/TH-5-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "TH-107",
    "name": "Smart AR Translation & HUD Everyday Glasses",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 133,
    "ship": 3.99,
    "stock": 17,
    "imgs": [
      "https://picsum.photos/seed/TH-6-1/600/420",
      "https://picsum.photos/seed/TH-6-2/600/420",
      "https://picsum.photos/seed/TH-6-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "TH-108",
    "name": "3D Spatial Audio Low-Latency Gaming Rig",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 151.5,
    "ship": 5.99,
    "stock": 22,
    "imgs": [
      "https://picsum.photos/seed/TH-7-1/600/420",
      "https://picsum.photos/seed/TH-7-2/600/420",
      "https://picsum.photos/seed/TH-7-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "TH-109",
    "name": "Biometric Fingerprint Encrypted Hardware Vault",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 170,
    "ship": 7.99,
    "stock": 8,
    "imgs": [
      "https://picsum.photos/seed/TH-8-1/600/420",
      "https://picsum.photos/seed/TH-8-2/600/420",
      "https://picsum.photos/seed/TH-8-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "TH-110",
    "name": "High-Speed Multi-Filament CoreXY 3D Printer",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 188.5,
    "ship": 3.99,
    "stock": 13,
    "imgs": [
      "https://picsum.photos/seed/TH-9-1/600/420",
      "https://picsum.photos/seed/TH-9-2/600/420",
      "https://picsum.photos/seed/TH-9-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "TH-111",
    "name": "Voice-Controlled Smart Desk Matrix Light Wall",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 207,
    "ship": 5.99,
    "stock": 18,
    "imgs": [
      "https://picsum.photos/seed/TH-10-1/600/420",
      "https://picsum.photos/seed/TH-10-2/600/420",
      "https://picsum.photos/seed/TH-10-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "TH-112",
    "name": "Ultrawide OLED Curved Cyber Monitor",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 225.5,
    "ship": 7.99,
    "stock": 23,
    "imgs": [
      "https://picsum.photos/seed/TH-11-1/600/420",
      "https://picsum.photos/seed/TH-11-2/600/420",
      "https://picsum.photos/seed/TH-11-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  }
];

export default function MallPage() {
  return <StoreCatalogView title="🟢 THE MATRIX • AI & STEEL" accent="#10b981" items={ITEMS} showTiers={true} />;
}
