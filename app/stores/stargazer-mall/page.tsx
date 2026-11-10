"use client";
import React from "react";
import StoreCatalogView, { MallItem } from "../../components/StoreCatalogView";

const ITEMS: MallItem[] = [
  {
    "id": "ST-101",
    "name": "Smart App-Guided Deep-Space 114mm Telescope",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 22,
    "ship": 3.99,
    "stock": 6,
    "imgs": [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
      "https://picsum.photos/seed/ST-0-2/600/420",
      "https://picsum.photos/seed/ST-0-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "ST-102",
    "name": "Graphene 9H Ceramic Pro Auto Coating Kit",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 40.5,
    "ship": 5.99,
    "stock": 11,
    "imgs": [
      "https://picsum.photos/seed/ST-1-1/600/420",
      "https://picsum.photos/seed/ST-1-2/600/420",
      "https://picsum.photos/seed/ST-1-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "ST-103",
    "name": "Dual-Action Variable Speed Orbital Car Polisher",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 59,
    "ship": 7.99,
    "stock": 16,
    "imgs": [
      "https://picsum.photos/seed/ST-2-1/600/420",
      "https://picsum.photos/seed/ST-2-2/600/420",
      "https://picsum.photos/seed/ST-2-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "ST-104",
    "name": "8-Inch Dobsonian Lunar & Planetary Reflector",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 77.5,
    "ship": 3.99,
    "stock": 21,
    "imgs": [
      "https://picsum.photos/seed/ST-3-1/600/420",
      "https://picsum.photos/seed/ST-3-2/600/420",
      "https://picsum.photos/seed/ST-3-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "ST-105",
    "name": "4K Front & Rear Night-Vision Dashcam Pro",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 96,
    "ship": 5.99,
    "stock": 7,
    "imgs": [
      "https://picsum.photos/seed/ST-4-1/600/420",
      "https://picsum.photos/seed/ST-4-2/600/420",
      "https://picsum.photos/seed/ST-4-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "ST-106",
    "name": "Astrophotography Smartphone & DSLR Eyepiece Rig",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 114.5,
    "ship": 7.99,
    "stock": 12,
    "imgs": [
      "https://picsum.photos/seed/ST-5-1/600/420",
      "https://picsum.photos/seed/ST-5-2/600/420",
      "https://picsum.photos/seed/ST-5-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "ST-107",
    "name": "High-Pressure Foam Cannon & Detailing Arsenal",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 133,
    "ship": 3.99,
    "stock": 17,
    "imgs": [
      "https://picsum.photos/seed/ST-6-1/600/420",
      "https://picsum.photos/seed/ST-6-2/600/420",
      "https://picsum.photos/seed/ST-6-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "ST-108",
    "name": "Carbon-Fiber Magnetic Phone Telemetry Mount",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 151.5,
    "ship": 5.99,
    "stock": 22,
    "imgs": [
      "https://picsum.photos/seed/ST-7-1/600/420",
      "https://picsum.photos/seed/ST-7-2/600/420",
      "https://picsum.photos/seed/ST-7-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "ST-109",
    "name": "80mm Travel Refractor Scope & Tripod Backpack",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 170,
    "ship": 7.99,
    "stock": 8,
    "imgs": [
      "https://picsum.photos/seed/ST-8-1/600/420",
      "https://picsum.photos/seed/ST-8-2/600/420",
      "https://picsum.photos/seed/ST-8-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "ST-110",
    "name": "Cordless Tire Inflator & 2000A Jump Starter",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 188.5,
    "ship": 3.99,
    "stock": 13,
    "imgs": [
      "https://picsum.photos/seed/ST-9-1/600/420",
      "https://picsum.photos/seed/ST-9-2/600/420",
      "https://picsum.photos/seed/ST-9-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "ST-111",
    "name": "Alcantara & Leather Interior Restoration Kit",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 207,
    "ship": 5.99,
    "stock": 18,
    "imgs": [
      "https://picsum.photos/seed/ST-10-1/600/420",
      "https://picsum.photos/seed/ST-10-2/600/420",
      "https://picsum.photos/seed/ST-10-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "ST-112",
    "name": "Solar Filter & Crater Moon Lens Case",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 225.5,
    "ship": 7.99,
    "stock": 23,
    "imgs": [
      "https://picsum.photos/seed/ST-11-1/600/420",
      "https://picsum.photos/seed/ST-11-2/600/420",
      "https://picsum.photos/seed/ST-11-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  }
];

export default function MallPage() {
  return <StoreCatalogView title="🔭 STARGAZER & PRO AUTO" accent="#38bdf8" items={ITEMS} showTiers={true} />;
}
