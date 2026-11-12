import { NextResponse as R } from "next/server";
import crypto from "crypto";
const sk = () => process.env.STRIPE_SECRET_KEY ?? "";
const sig = (v: string) => crypto.createHmac("sha256", sk() + "g").update(v).digest("hex").slice(0, 6).toUpperCase();
const bad = (msg: string, status = 400) => R.json({ ok: false, msg }, { status });
const chk = (c: string) => {
  const [n, g, am, r = ""] = String(c ?? "").trim().toUpperCase().split("-");
  const a = Number(am);
  return n === "NEXUS" && g === "GC" && a > 0 && r.length === 12 && r.slice(6) === sig(a + r.slice(0, 6)) ? a : 0;
};
export async function GET(req: Request) {
  const u = new URL(req.url), gc = u.searchParams.get("gc"), sid = u.searchParams.get("session_id");
  if (gc !== null) { const off = chk(gc); return off > 0 ? R.json({ ok: true, off }) : bad("Unpaid or invalid Gift Card"); }
  const r = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sid}`, { headers: { Authorization: `Bearer ${sk()}` } });
  const s = await r.json(), m = s.metadata ?? {}, t = String(s.id ?? "").slice(-6).toUpperCase();
  if (s.payment_status !== "paid") return bad("Card payment incomplete", 402);
  const giftCode = m.mode === "giftcard" ? `NEXUS-GC-${m.amount}-${t}${sig(m.amount + t)}` : "";
  return R.json({ ok: true, orderId: m.orderId, paid: (Number(s.amount_total) / 100).toFixed(2), shipTo: m.shipTo, giftCode });
}
export async function POST(req: Request) {
  const b = await req.json(), id = "NX-" + Date.now().toString(36).toUpperCase();
  const ret = (req.headers.get("origin") ?? "https://aether-nexus-matrix.vercel.app") + String(b.returnPath ?? "/"), k = sk();
  const pay = async (cents: number, name: string, email: string, meta: Record<string, string>) => {
    if (!k.startsWith("sk_")) return bad("Add STRIPE_SECRET_KEY in Vercel -> Settings -> Environment Variables ($0 charged, order NOT placed).", 402);
    const f = new URLSearchParams({ mode: "payment", "payment_method_types[0]": "card", customer_email: email, success_url: `${ret}?nx_session={CHECKOUT_SESSION_ID}`, cancel_url: ret, "line_items[0][quantity]": "1", "line_items[0][price_data][currency]": "usd", "line_items[0][price_data][unit_amount]": String(cents), "line_items[0][price_data][product_data][name]": name });
    Object.entries(meta).forEach(([mk, mv]) => f.set(`metadata[${mk}]`, mv));
    const sr = await fetch("https://api.stripe.com/v1/checkout/sessions", { method: "POST", headers: { Authorization: `Bearer ${k}`, "Content-Type": "application/x-www-form-urlencoded" }, body: f.toString() });
    const sd = await sr.json();
    return sd.url ? R.json({ ok: true, stripeUrl: sd.url }) : bad(sd.error?.message ?? "Stripe error", 402);
  };
  if (b.mode === "giftcard") {
    const amt = Number(b.amount ?? 50), rcpt = String(b.recipientEmail ?? "").trim();
    return rcpt.includes("@") ? pay(Math.round(amt * 100), `ALBS NEXUS $${amt} Gift Card ($0 Ship)`, rcpt, { mode: "giftcard", orderId: id, amount: String(amt), shipTo: rcpt }) : bad("Enter valid recipient email");
  }
  const a = b.address ?? {}, tot = Number(b.total ?? 0);
  if (!(tot > 0)) return bad("Your cart is empty");
  if ([a.name, a.street, a.city, a.state, a.zip].some(v => !v) ? true : !String(a.email ?? "").includes("@")) return bad("Complete name, email & full shipping address");
  const off = b.gcCode ? chk(String(b.gcCode)) : 0, due = Math.max(0, +(tot - off).toFixed(2));
  const shipTo = `${a.street}, ${a.city}, ${a.state} ${a.zip}`;
  if (due === 0 && off >= tot) return R.json({ ok: true, orderId: id, paid: tot.toFixed(2), shipTo });
  return pay(Math.round(due * 100), `${b.store} (${b.summary})`, String(a.email), { mode: "order", orderId: id, shipTo });
}
