import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const STORES = [
  "Black Friday Cyber Vault", "Christmas Superstore", "Apex Shoe Vault",
  "NEXUS Music Town", "Emergency Superstore", "Pro Car Wash & Auto",
  "Party Lapooza", "Squish & Blind Vault", "Luxury Suites",
  "ALBS Nexus Stadium", "The Matrix AI", "Stargazer & Auto",
  "1964 World's Fair", "Maternity & CPR", "Autism Spectrum Sanctuary",
  "Down Syndrome Sanctuary", "Deaf / Blind Sanctuary", "PTSD & Veterans Sanctuary",
  "Mobility & Rehab Sanctuary", "Biomedical Peptides Sanctuary"
];

export const SUPPLIER_TIERS = [
  { code: "US-EAST-NJ", name: "CJ US-East & Zendrop Plus (NJ Hub)", dispatch: "24-Hr US Tracked", returnSla: "30-Day Money-Back + Instant Damaged Swap", rmaOwner: "Supplier Absorbs 100% RMA Cost" },
  { code: "US-SOUTH-TX", name: "ALBS Central & Direct Wholesale (Houston TX Hub)", dispatch: "Same-Day / 24-Hr", returnSla: "30-Day Full Refund + Free Return Label", rmaOwner: "Supplier Absorbs 100% RMA Cost" },
  { code: "US-WEST-CA", name: "Spocket Tier-1 & Adaptive Med Hub (Chino CA)", dispatch: "24-Hr Priority", returnSla: "30-Day Money-Back + Defective Replacement", rmaOwner: "Supplier Absorbs 100% RMA Cost" }
];
const LEDGER = path.join("/tmp", "albs-shift-ledger.json");

function readLedger(): any[] {
  try {
    if (fs.existsSync(LEDGER)) return JSON.parse(fs.readFileSync(LEDGER, "utf8"));
  } catch {}
  return [];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const hr = new Date().getHours();
    const shift = (hr >= 9 && hr < 22) ? "DAY_CROWD_9AM_10PM" : "NIGHT_CROWD_10PM_9AM";
    const rows = readLedger();
    rows.push({
      id: "ORD-" + Date.now(),
      ts: new Date().toISOString(),
      shift,
      store: body.store || "Black Friday Cyber Vault",
      summary: body.summary || "SKU Order",
      total: Number(body.total || 0),
      supplierSla: "US-30D-24H-VERIFIED"
    });
    fs.writeFileSync(LEDGER, JSON.stringify(rows.slice(-500)));
    return NextResponse.json({ ok: true, shift, totalLogged: rows.length });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function GET() {
  const rows = readLedger();
  const hr = new Date().getHours();
  const activeShift = (hr >= 9 && hr < 22) ? "DAY_CROWD_9AM_10PM" : "NIGHT_CROWD_10PM_9AM";
  const byStore = STORES.map(st => {
    const hits = rows.filter(r => r.store === st);
    const dayHits = hits.filter(r => r.shift === "DAY_CROWD_9AM_10PM");
    const nightHits = hits.filter(r => r.shift === "NIGHT_CROWD_10PM_9AM");
    const dayRev = +dayHits.reduce((s, x) => s + x.total, 0).toFixed(2);
    const nightRev = +nightHits.reduce((s, x) => s + x.total, 0).toFixed(2);
    return {
      store: st,
      orders: hits.length,
      dayRev,
      nightRev,
      totalRev: +(dayRev + nightRev).toFixed(2),
      itemsSold: hits.map(h => h.summary).slice(-5),
      status: hits.length > 0 ? "MOVING 🔥" : "NEEDS PROMO 🧊",
      supplierSla: "Verified 30-Day / 24-Hr US Supplier"
    };
  });
  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    schedules: ["09:00 AM CST (Night-Crowd Shift Report)", "10:00 PM CST (Day-Crowd Shift Report)"],
    activeShift,
    supplierGuarantee: SUPPLIER_TIERS,
    stores: byStore
  });
}
