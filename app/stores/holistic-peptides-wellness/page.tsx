"use client";
import React from "react";
import StoreCatalogView, { MallItem } from "../../components/StoreCatalogView";

const ITEMS: MallItem[] = [
  {
    "id": "BI-101",
    "name": "Copper Tripeptide GHK-Cu Topical Renewal Serum",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 22,
    "ship": 3.99,
    "stock": 6,
    "imgs": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
      "https://picsum.photos/seed/BI-0-2/600/420",
      "https://picsum.photos/seed/BI-0-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "BI-102",
    "name": "Clinical Red & Near-Infrared Therapy Panel",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 40.5,
    "ship": 5.99,
    "stock": 11,
    "imgs": [
      "https://picsum.photos/seed/BI-1-1/600/420",
      "https://picsum.photos/seed/BI-1-2/600/420",
      "https://picsum.photos/seed/BI-1-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "BI-103",
    "name": "Liposomal NAD+ Cellular Longevity Complex",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 59,
    "ship": 7.99,
    "stock": 16,
    "imgs": [
      "https://picsum.photos/seed/BI-2-1/600/420",
      "https://picsum.photos/seed/BI-2-2/600/420",
      "https://picsum.photos/seed/BI-2-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "BI-104",
    "name": "Multi-Collagen Peptide Bio-Active Powder",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 77.5,
    "ship": 3.99,
    "stock": 21,
    "imgs": [
      "https://picsum.photos/seed/BI-3-1/600/420",
      "https://picsum.photos/seed/BI-3-2/600/420",
      "https://picsum.photos/seed/BI-3-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "BI-105",
    "name": "Cold-Storage Insulin & Peptide Travel Cooler",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 96,
    "ship": 5.99,
    "stock": 7,
    "imgs": [
      "https://picsum.photos/seed/BI-4-1/600/420",
      "https://picsum.photos/seed/BI-4-2/600/420",
      "https://picsum.photos/seed/BI-4-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "BI-106",
    "name": "Pure Electrolytes & Amino Recovery Formula",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 114.5,
    "ship": 7.99,
    "stock": 12,
    "imgs": [
      "https://picsum.photos/seed/BI-5-1/600/420",
      "https://picsum.photos/seed/BI-5-2/600/420",
      "https://picsum.photos/seed/BI-5-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "BI-107",
    "name": "Medical-Grade HEPA-14 Cleanroom Air Purifier",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 133,
    "ship": 3.99,
    "stock": 17,
    "imgs": [
      "https://picsum.photos/seed/BI-6-1/600/420",
      "https://picsum.photos/seed/BI-6-2/600/420",
      "https://picsum.photos/seed/BI-6-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "BI-108",
    "name": "Smart Body-Composition & HRV Bio-Scale",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 151.5,
    "ship": 5.99,
    "stock": 22,
    "imgs": [
      "https://picsum.photos/seed/BI-7-1/600/420",
      "https://picsum.photos/seed/BI-7-2/600/420",
      "https://picsum.photos/seed/BI-7-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "BI-109",
    "name": "Transdermal BPC Recovery Gel Patch Pack",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 170,
    "ship": 7.99,
    "stock": 8,
    "imgs": [
      "https://picsum.photos/seed/BI-8-1/600/420",
      "https://picsum.photos/seed/BI-8-2/600/420",
      "https://picsum.photos/seed/BI-8-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "BI-110",
    "name": "Blue-Light Blocking Circadian Sleep Eyewear",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 188.5,
    "ship": 3.99,
    "stock": 13,
    "imgs": [
      "https://picsum.photos/seed/BI-9-1/600/420",
      "https://picsum.photos/seed/BI-9-2/600/420",
      "https://picsum.photos/seed/BI-9-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "BI-111",
    "name": "Ultrasonic Hydrogen-Rich Water Generator",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 207,
    "ship": 5.99,
    "stock": 18,
    "imgs": [
      "https://picsum.photos/seed/BI-10-1/600/420",
      "https://picsum.photos/seed/BI-10-2/600/420",
      "https://picsum.photos/seed/BI-10-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "BI-112",
    "name": "Precision Digital Micro-Scale & Vial Organizer",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 225.5,
    "ship": 7.99,
    "stock": 23,
    "imgs": [
      "https://picsum.photos/seed/BI-11-1/600/420",
      "https://picsum.photos/seed/BI-11-2/600/420",
      "https://picsum.photos/seed/BI-11-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  }
];

export default function MallPage() {
  return <StoreCatalogView title="🧬 BIOMEDICAL PEPTIDES & WELLNESS" accent="#a855f7" items={ITEMS} showTiers={true} />;
}
