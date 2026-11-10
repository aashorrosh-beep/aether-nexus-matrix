"use client";
import React from "react";
import StoreCatalogView, { MallItem } from "../../components/StoreCatalogView";

const ITEMS: MallItem[] = [
  {
    "id": "PA-101",
    "name": "Custom Spider-Man & Hero Face-Swap Banner",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 22,
    "ship": 3.99,
    "stock": 6,
    "imgs": [
      "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=600&q=80",
      "https://picsum.photos/seed/PA-0-2/600/420",
      "https://picsum.photos/seed/PA-0-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "PA-102",
    "name": "All-Star Baseball Birthday Arch & Backdrop",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 40.5,
    "ship": 5.99,
    "stock": 11,
    "imgs": [
      "https://picsum.photos/seed/PA-1-1/600/420",
      "https://picsum.photos/seed/PA-1-2/600/420",
      "https://picsum.photos/seed/PA-1-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "PA-103",
    "name": "360-Degree Slow-Mo Video Party Booth Rig",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 59,
    "ship": 7.99,
    "stock": 16,
    "imgs": [
      "https://picsum.photos/seed/PA-2-1/600/420",
      "https://picsum.photos/seed/PA-2-2/600/420",
      "https://picsum.photos/seed/PA-2-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "PA-104",
    "name": "Commercial Bubble & Fog Stage Cannon",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 77.5,
    "ship": 3.99,
    "stock": 21,
    "imgs": [
      "https://picsum.photos/seed/PA-3-1/600/420",
      "https://picsum.photos/seed/PA-3-2/600/420",
      "https://picsum.photos/seed/PA-3-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "PA-105",
    "name": "LED Glow Foam Stick Party Pack (100-Pc)",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 96,
    "ship": 5.99,
    "stock": 7,
    "imgs": [
      "https://picsum.photos/seed/PA-4-1/600/420",
      "https://picsum.photos/seed/PA-4-2/600/420",
      "https://picsum.photos/seed/PA-4-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "PA-106",
    "name": " Giant 4ft Light-Up Marquee Age Numbers",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 114.5,
    "ship": 7.99,
    "stock": 12,
    "imgs": [
      "https://picsum.photos/seed/PA-5-1/600/420",
      "https://picsum.photos/seed/PA-5-2/600/420",
      "https://picsum.photos/seed/PA-5-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "PA-107",
    "name": "Custom Frosting Piping & Square Cake Kit",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 133,
    "ship": 3.99,
    "stock": 17,
    "imgs": [
      "https://picsum.photos/seed/PA-6-1/600/420",
      "https://picsum.photos/seed/PA-6-2/600/420",
      "https://picsum.photos/seed/PA-6-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "PA-108",
    "name": "inflatable Backyard Bounce Castle & Slide",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 151.5,
    "ship": 5.99,
    "stock": 22,
    "imgs": [
      "https://picsum.photos/seed/PA-7-1/600/420",
      "https://picsum.photos/seed/PA-7-2/600/420",
      "https://picsum.photos/seed/PA-7-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    "id": "PA-109",
    "name": "Wireless Karaoke Dual-Mic Party Tower",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 170,
    "ship": 7.99,
    "stock": 8,
    "imgs": [
      "https://picsum.photos/seed/PA-8-1/600/420",
      "https://picsum.photos/seed/PA-8-2/600/420",
      "https://picsum.photos/seed/PA-8-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    "id": "PA-110",
    "name": "VIP Velvet Rope & Red Carpet Entrance",
    "cat": "all",
    "tier": "T1",
    "tierLabel": "Tier 1 • $3.99 Ship",
    "w": 188.5,
    "ship": 3.99,
    "stock": 13,
    "imgs": [
      "https://picsum.photos/seed/PA-9-1/600/420",
      "https://picsum.photos/seed/PA-9-2/600/420",
      "https://picsum.photos/seed/PA-9-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    "id": "PA-111",
    "name": "Balloon Garland Electric Pump & 200-Pc Arch",
    "cat": "all",
    "tier": "T2",
    "tierLabel": "Tier 2 • $5.99 Ship",
    "w": 207,
    "ship": 5.99,
    "stock": 18,
    "imgs": [
      "https://picsum.photos/seed/PA-10-1/600/420",
      "https://picsum.photos/seed/PA-10-2/600/420",
      "https://picsum.photos/seed/PA-10-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    "id": "PA-112",
    "name": " cotton Candy & Popcorn Cart Station",
    "cat": "all",
    "tier": "T3",
    "tierLabel": "Tier 3 • $7.99 Ship",
    "w": 225.5,
    "ship": 7.99,
    "stock": 23,
    "imgs": [
      "https://picsum.photos/seed/PA-11-1/600/420",
      "https://picsum.photos/seed/PA-11-2/600/420",
      "https://picsum.photos/seed/PA-11-3/600/420"
    ],
    "video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  }
];

export default function MallPage() {
  return <StoreCatalogView title="🎉 PARTY LAPOOZA" accent="#f43f5e" items={ITEMS} showTiers={true} />;
}
