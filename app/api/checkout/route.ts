import { NextResponse } from "next/server";
import Stripe from "stripe";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items = body.items || [];
    const addr = body.shippingAddress || "";
    if (!items.length) return NextResponse.json({ error: "Empty cart" }, { status: 400 });
    const key = process.env.STRIPE_SECRET_KEY || "";
    if (!key) return NextResponse.json({ url: "/?checkout=success" });
    const stripe = new Stripe(key, { apiVersion: "2023-10-16" as any });
    const line_items = items.map((it: any) => ({
      price_data: {
        currency: "usd",
        product_data: { name: String(it.name || "ALBS Item"), metadata: { sku: String(it.id || ""), ship_to: String(addr) } },
        unit_amount: Math.round((Number(String(it.price || "24.99").replace(/[^0-9.]/g, "")) || 24.99) * 100)
      },
      quantity: Math.min(Number(it.qty || 1), Number(it.count || 20))
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      phone_number_collection: { enabled: true },
      billing_address_collection: "required",
      metadata: { customer_Entered_Address: String(addr) },
      line_items,
      success_url: "https://aether-nexus-matrix.vercel.app/?order=success",
      cancel_url: "https://aether-nexus-matrix.vercel.app/?order=cancel"
    });
    return NextResponse.json({ url: session.url });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}