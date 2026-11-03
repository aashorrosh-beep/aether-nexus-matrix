import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    const stripe = new Stripe(secret, { apiVersion: "2024-06-20" as any });
    const { items = [] } = await req.json();
    if (!items.length) return NextResponse.json({ error: "Cart is empty" }, { status: 400 });

    const origin = req.headers.get("origin") || "https://aether-nexus-matrix.vercel.app";
    const allGiftCards = items.every(
      (it: any) => it.isGiftCard || String(it.id || "").includes("NEXUS-GC") || String(it.name || "").toLowerCase().includes("gift card")
    );

    let merchSubtotal = 0;
    let totalUnits = 0;
    const line_items: any[] = [];

    for (const it of items) {
      const unitPrice = parseFloat(String(it.price || "29.99").replace(/[^0-9.]/g, "")) || 29.99;
      const qty = Math.max(1, Number(it.qty) || 1);
      merchSubtotal += unitPrice * qty;
      totalUnits += qty;
      const img = Array.isArray(it.media) && String(it.media[0] || "").startsWith("http") ? [it.media[0]] : [];

      line_items.push({
        quantity: qty,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(unitPrice * 100),
          product_data: {
            name: String(it.name || "ALBS Nexus Verified Item"),
            description: it.specs?.condition || "Brand New • Insured 3–7 Day Delivery",
            images: img
          }
        }
      });
    }

    if (!allGiftCards) {
      // Base Staggered Shipping Tier + $2.99 per additional separate dropship unit so multi-vendor orders NEVER lose money
      const baseShip = merchSubtotal < 100 ? 3.99 : (merchSubtotal < 250 ? 5.99 : (merchSubtotal < 500 ? 9.99 : 14.99));
      const multiVendorSplitFee = totalUnits > 1 ? (totalUnits - 1) * 2.99 : 0;
      const totalShipping = Number((baseShip + multiVendorSplitFee).toFixed(2));

      // 8.25% Sales Tax on Merchandise + Exact Algebraic Stripe Fee Pass-Through ((Total + 0.30) / (1 - 0.029))
      const salesTax = Number((merchSubtotal * 0.0825).toFixed(2));
      const preFeeTotal = merchSubtotal + totalShipping + salesTax;
      const stripePassThroughFee = Number((((preFeeTotal + 0.30) / (1 - 0.029)) - preFeeTotal).toFixed(2));

      line_items.push({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(totalShipping * 100),
          product_data: {
            name: totalUnits > 1
              ? `🚚 Insured 3–7 Day Tracked Shipping (Base Tier + ${totalUnits} Direct Vendor Dispatch)`
              : "🚚 Insured 3–7 Business Day Tracked Shipping",
            description: "Delivered directly to the shipping address entered below."
          }
        }
      });

      line_items.push({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round((salesTax + stripePassThroughFee) * 100),
          product_data: {
            name: "🏛️ Sales Tax (8.25%) & Card Processing Pass-Through Fee (2.9% + $0.30)",
            description: `Sales Tax: $${salesTax.toFixed(2)} + Payment Network Clearing Fee: $${stripePassThroughFee.toFixed(2)}`
          }
        }
      });
    }

    const sessionConfig: any = {
      mode: "payment",
      allow_promotion_codes: true,
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      customer_creation: "always",
      line_items,
      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/stores/christmas-holiday?checkout=cancelled`
    };

    if (!allGiftCards) {
      sessionConfig.shipping_address_collection = { allowed_countries: ["US", "CA"] };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Checkout error" }, { status: 500 });
  }
}
