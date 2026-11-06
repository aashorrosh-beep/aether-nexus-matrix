import { NextResponse } from "next/server";
import { stargazer300 } from "../../data/stargazer-300";
export async function GET() {
  return NextResponse.json({
    mall: "ALBS Nexus Mall of Malls",
    updated: new Date().toISOString(),
    featured_campaigns: [
      { campaign: "15-Mile Disability & Respite ZIP Finder", url: "https://aether-nexus-matrix.vercel.app/sanctuary/autism-spectrum?utm_source=meta&utm_campaign=zip_finder_15mi" },
      { campaign: "Stargazer 300-SKU Celestial Mall", url: "https://aether-nexus-matrix.vercel.app/stores/stargazer-mall?utm_source=tiktok&utm_campaign=stargazer_launch" },
      { campaign: "Expecting Mothers & Free CPR Hub", url: "https://aether-nexus-matrix.vercel.app/stores/expecting-and-cpr?utm_source=ig&utm_campaign=free_cpr_maternity" }
    ],
    sample_skus: stargazer300.slice(0, 25)
  });
}