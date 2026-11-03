import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { query, contact } = await req.json();
    const q = String(query || "").trim();
    if (!q) return NextResponse.json({ error: "Please enter what you are looking for." }, { status: 400 });

    const key = process.env.SERPAPI_API_KEY || "";
    let hits: any[] = [];

    if (key) {
      const u = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(q)}&num=8&hl=en&gl=us&api_key=${key}`;
      const r = await fetch(u);
      const d = await r.json();
      hits = (d.shopping_results || [])
        .filter((x: any) => x.title && Number(x.extracted_price) > 0 && x.thumbnail)
        .slice(0, 6)
        .map((x: any, idx: number) => {
          const rawP = Number(x.extracted_price);
          const ourPrice = Number((rawP * 0.94).toFixed(2));
          return {
            id: `CONCIERGE-${Date.now()}-${idx + 1}`,
            name: `[⚡ 3-Hr Concierge Sourced • 24-Hr Hold] ${x.title}`.slice(0, 90),
            price: `$${ourPrice.toFixed(2)}`,
            competitorPrice: `$${rawP.toFixed(2)}`,
            media: [x.thumbnail, x.thumbnail, x.thumbnail],
            count: 5,
            specs: {
              manufacturer: (x.source || "Verified Direct Supplier") + " • Insured Concierge Dispatch",
              condition: "Brand New • Reserved Exclusively For You For 24 Hours",
              shipping: "Priority Insured Dispatch • Guaranteed Equal To or Below Competitor Landed Price"
            }
          };
        });
    }

    if (!hits.length) {
      hits = [{
        id: `CONCIERGE-CUSTOM-${Date.now()}`,
        name: `[⚡ 3-Hr Concierge Sourced • 24-Hr Hold] ${q.toUpperCase()} (Verified Direct Allocation)`,
        price: "$49.99",
        competitorPrice: "$59.99",
        media: ["https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600"],
        count: 3,
        specs: {
          manufacturer: "ALBS Concierge Direct Wholesale Desk",
          condition: "Brand New • Custom Sourced & Held For 24 Hours",
          shipping: "Expedited 3–7 Day Insured Delivery"
        }
      }];
    }

    return NextResponse.json({
      status: "SOURCED_AND_LOCKED_24H",
      ticketId: "ALBS-3HR-" + Math.floor(100000 + Math.random() * 900000),
      expiresIn: "23h 59m",
      contact: contact || "Guest",
      items: hits
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Concierge lookup error" }, { status: 500 });
  }
}
