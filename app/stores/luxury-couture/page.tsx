"use client";
import React from "react";
import StoreCatalogView, { MallItem } from "../../components/StoreCatalogView";

const ITEMS: MallItem[] = [
  {
    "id": "LU-101",
    "name": "Swiss Automatic Rose-Gold Chronograph Watch",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 22,
    "ship": 3.99,
    "stock": 6,
    "imgs": [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=600&q=80",
      "https://picsum.photos/seed/LU-0-2/600/420",
      "https://picsum.photos/seed/LU-0-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "LU-102",
    "name": "Lacquered Gold-Nib Executive Fountain Pen",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 40.5,
    "ship": 5.99,
    "stock": 11,
    "imgs": [
      "https://picsum.photos/seed/LU-1-1/600/420",
      "https://picsum.photos/seed/LU-1-2/600/420",
      "https://picsum.photos/seed/LU-1-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "LU-103",
    "name": "Italian Quilted Calfskin Designer Shoulder Purse",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 59,
    "ship": 7.99,
    "stock": 16,
    "imgs": [
      "https://picsum.photos/seed/LU-2-1/600/420",
      "https://picsum.photos/seed/LU-2-2/600/420",
      "https://picsum.photos/seed/LU-2-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "LU-104",
    "name": "Red-Bottom Patent Stiletto Evening Pumps",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 77.5,
    "ship": 3.99,
    "stock": 21,
    "imgs": [
      "https://picsum.photos/seed/LU-3-1/600/420",
      "https://picsum.photos/seed/LU-3-2/600/420",
      "https://picsum.photos/seed/LU-3-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "LU-105",
    "name": "Cashmere Monogrammed Salon Throw Blanket",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 96,
    "ship": 5.99,
    "stock": 7,
    "imgs": [
      "https://picsum.photos/seed/LU-4-1/600/420",
      "https://picsum.photos/seed/LU-4-2/600/420",
      "https://picsum.photos/seed/LU-4-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "LU-106",
    "name": "18K Vermeil Diamond-Cut Tennis Bracelet",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 114.5,
    "ship": 7.99,
    "stock": 12,
    "imgs": [
      "https://picsum.photos/seed/LU-5-1/600/420",
      "https://picsum.photos/seed/LU-5-2/600/420",
      "https://picsum.photos/seed/LU-5-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "LU-107",
    "name": "Hand-Stitched Alligator Leather Cardholder",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 133,
    "ship": 3.99,
    "stock": 17,
    "imgs": [
      "https://picsum.photos/seed/LU-6-1/600/420",
      "https://picsum.photos/seed/LU-6-2/600/420",
      "https://picsum.photos/seed/LU-6-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "LU-108",
    "name": "Crystal Champagne Flute & Decanter Suite",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 151.5,
    "ship": 5.99,
    "stock": 22,
    "imgs": [
      "https://picsum.photos/seed/LU-7-1/600/420",
      "https://picsum.photos/seed/LU-7-2/600/420",
      "https://picsum.photos/seed/LU-7-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "LU-109",
    "name": "Automatic Triple-Watch Winder Safe",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 170,
    "ship": 7.99,
    "stock": 8,
    "imgs": [
      "https://picsum.photos/seed/LU-8-1/600/420",
      "https://picsum.photos/seed/LU-8-2/600/420",
      "https://picsum.photos/seed/LU-8-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "LU-110",
    "name": "Silk Designer Twill Scarf & Brooch",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 188.5,
    "ship": 3.99,
    "stock": 13,
    "imgs": [
      "https://picsum.photos/seed/LU-9-1/600/420",
      "https://picsum.photos/seed/LU-9-2/600/420",
      "https://picsum.photos/seed/LU-9-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "LU-111",
    "name": "Carbon-Fiber Rollerball Signature Pen",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 207,
    "ship": 5.99,
    "stock": 18,
    "imgs": [
      "https://picsum.photos/seed/LU-10-1/600/420",
      "https://picsum.photos/seed/LU-10-2/600/420",
      "https://picsum.photos/seed/LU-10-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "LU-112",
    "name": "Structured Top-Handle Leather Tote",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 225.5,
    "ship": 7.99,
    "stock": 23,
    "imgs": [
      "https://picsum.photos/seed/LU-11-1/600/420",
      "https://picsum.photos/seed/LU-11-2/600/420",
      "https://picsum.photos/seed/LU-11-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  }
];

export default function MallPage() {
  return <StoreCatalogView title="💎 LUXURY SUITES" accent="#eab308" items={ITEMS} showTiers={true} />;
}
