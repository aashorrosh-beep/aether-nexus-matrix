import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const b = await req.json();
  const id = "NX-" + Date.now().toString(36).toUpperCase();
  if (b.mode === "giftcard") {
    if (!b.recipientEmail) return NextResponse.json({ ok: false, msg: "Enter recipient email" }, { status: 400 });
    const amt = Number(b.amount ? b.amount : 50);
    const code = "NEXUS-GC-" + amt + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
    return NextResponse.json({ ok: true, orderId: id, giftCode: code, amount: amt });
  }
  const a = b.address ? b.address : {};
  if (!a.name) return NextResponse.json({ ok: false, msg: "Enter full name" }, { status: 400 });
  if (!a.email) return NextResponse.json({ ok: false, msg: "Enter email address" }, { status: 400 });
  if (!a.street) return NextResponse.json({ ok: false, msg: "Enter street address" }, { status: 400 });
  if (!a.city) return NextResponse.json({ ok: false, msg: "Enter city" }, { status: 400 });
  if (!a.state) return NextResponse.json({ ok: false, msg: "Enter state" }, { status: 400 });
  if (!a.zip) return NextResponse.json({ ok: false, msg: "Enter ZIP code" }, { status: 400 });
  return NextResponse.json({ ok: true, orderId: id, shipTo: `${a.street}, ${a.city}, ${a.state} ${a.zip}` });
}
