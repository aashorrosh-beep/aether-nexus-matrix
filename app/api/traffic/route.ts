import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
const LOG = path.join(process.cwd(), "LIVE_TRAFFIC_LOG.json");
export async function POST(req: Request) {
  try {
    const b = await req.json();
    const list = fs.existsSync(LOG) ? JSON.parse(fs.readFileSync(LOG, "utf8")) : [];
    list.unshift({ time: new Date().toISOString(), page: b.page || "/", ref: b.ref || "direct" });
    fs.writeFileSync(LOG, JSON.stringify(list.slice(0, 500), null, 2), "utf8");
    return NextResponse.json({ ok: true, total: list.length });
  } catch { return NextResponse.json({ ok: false }); }
}
export async function GET() {
  const list = fs.existsSync(LOG) ? JSON.parse(fs.readFileSync(LOG, "utf8")) : [];
  return NextResponse.json({ total: list.length, recent: list.slice(0, 25) });
}