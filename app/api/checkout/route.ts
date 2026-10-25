import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2023-10-16" as any });
const getShip = (p: number) => p < 100 ? 3.99 : (p < 250 ? 5.99 : (p < 500 ? 9.99 : 14.99));

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const itemPrice = Math.max(1, parseFloat(String(body.price || "29.99").replace(/[^0-9.]/g, "")));
    const itemName = String(body.name || "ALBS Nexus Verified Item");
    const isGift = itemName.toLowerCase().includes("gift card") || String(body.storeId || "").includes("gift-card");
    const ship = isGift ? 0 : getShip(itemPrice);
    const salesTax = isGift ? 0 : Number((itemPrice * 0.0825).toFixed(2));
    const preFee = itemPrice + ship + salesTax;
    const grandTotal = Number(((preFee + 0.30) / (1 - 0.029)).toFixed(2));
    const cardFee = Number((grandTotal - preFee).toFixed(2));
    const origin = req.headers.get("origin") || "https://aether-nexus-matrix.vercel.app";
    const items: any[] = [{ price_data: { currency: "usd", product_data: { name: itemName }, unit_amount: Math.round(itemPrice * 100) }, quantity: 1 }];
    if (ship > 0) items.push({ price_data: { currency: "usd", product_data: { name: `Expedited Insured Shipping (3–7 Days: $${ship.toFixed(2)})` }, unit_amount: Math.round(ship * 100) }, quantity: 1 });
    if (salesTax > 0) items.push({ price_data: { currency: "usd", product_data: { name: "Customer State & Local Sales Tax (8.25%)" }, unit_amount: Math.round(salesTax * 100) }, quantity: 1 });
    items.push({ price_data: { currency: "usd", product_data: { name: "Card Processing Pass-Through (2.9% + $0.30)" }, unit_amount: Math.round(cardFee * 100) }, quantity: 1 });
    const session = await stripe.checkout.sessions.create({ payment_method_types: ["card"], mode: "payment", line_items: items, success_url: origin + "/?checkout=success", cancel_url: origin + "/?checkout=cancelled" });
    return NextResponse.json({ url: session.url });
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
