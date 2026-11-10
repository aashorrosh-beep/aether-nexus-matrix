"use client";
import React from "react";
import StoreCatalogView, { MallItem } from "../../components/StoreCatalogView";

const ITEMS: MallItem[] = [
  {
    "id": "DE-101",
    "name": " Ultrasonic Smart Haptic Obstacle Mobility Cane",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 22,
    "ship": 3.99,
    "stock": 6,
    "imgs": [
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80",
      "https://picsum.photos/seed/DE-0-2/600/420",
      "https://picsum.photos/seed/DE-0-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "DE-102",
    "name": "Bedside Vibrating Shaker & Strobe Wake Alarm",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 40.5,
    "ship": 5.99,
    "stock": 11,
    "imgs": [
      "https://picsum.photos/seed/DE-1-1/600/420",
      "https://picsum.photos/seed/DE-1-2/600/420",
      "https://picsum.photos/seed/DE-1-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "DE-103",
    "name": "Talking High-Contrast Tactile Kitchen Scale",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 59,
    "ship": 7.99,
    "stock": 16,
    "imgs": [
      "https://picsum.photos/seed/DE-2-1/600/420",
      "https://picsum.photos/seed/DE-2-2/600/420",
      "https://picsum.photos/seed/DE-2-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "DE-104",
    "name": "Live Speech-to-Caption Smart Display Hub",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 77.5,
    "ship": 3.99,
    "stock": 21,
    "imgs": [
      "https://picsum.photos/seed/DE-3-1/600/420",
      "https://picsum.photos/seed/DE-3-2/600/420",
      "https://picsum.photos/seed/DE-3-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "DE-105",
    "name": "Braille & Raised-Dot Labeling Organizer Kit",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 96,
    "ship": 5.99,
    "stock": 7,
    "imgs": [
      "https://picsum.photos/seed/DE-4-1/600/420",
      "https://picsum.photos/seed/DE-4-2/600/420",
      "https://picsum.photos/seed/DE-4-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "DE-106",
    "name": "Bone-Conduction Clarity Assist Headphones",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 114.5,
    "ship": 7.99,
    "stock": 12,
    "imgs": [
      "https://picsum.photos/seed/DE-5-1/600/420",
      "https://picsum.photos/seed/DE-5-2/600/420",
      "https://picsum.photos/seed/DE-5-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  }
];

export default function MallPage() {
  return <StoreCatalogView title="🎗️ DEAF & BLIND TECH SANCTUARY" accent="#38bdf8" items={ITEMS} showTiers={true} />;
}
