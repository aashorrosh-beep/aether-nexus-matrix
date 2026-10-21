import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2023-10-16" as any });

function getTieredShipping(price: number) {
  if (price < 100) return 3.99;
  if (price < 250) return 5.99;
  if (price < 500) return 9.99;
  return 14.99;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const itemPrice = Math.max(1, parseFloat(String(body.price || "29.99").replace(/[^0-9.]/g, "")));
    const itemName = body.name || "ALBS Nexus Verified Item";
    const shippingCost = getTieredShipping(itemPrice);

    // Tally Item + Tiered Shipping + Customer Card Processing (2.9% + $0.30)
    const subtotal = itemPrice + shippingCost;
    const grandTotal = Number(((subtotal + 0.30) / (1 - 0.029)).toFixed(2));
    const processingFee = Number((grandTotal - subtotal).toFixed(2));

    const origin = req.headers.get("origin") || "https://aether-nexus-matrix.vercel.app";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: itemName, description: "Item Price: $" + itemPrice.toFixed(2) + " | Shipping: $" + shippingCost.toFixed(2) },
            unit_amount: Math.round(itemPrice * 100)
          },
          quantity: 1
        },
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Tiered Tracked Shipping ($" + shippingCost.toFixed(2) + ")", description: itemPrice >= 100 ? "Over-$100 Insured Priority Tier" : "Standard $3.99 Ground Tier" },
            unit_amount: Math.round(shippingCost * 100)
          },
          quantity: 1
        },
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Card Processing Fee (2.9% + $0.30)", description: "Customer Pass-Through Processing" },
            unit_amount: Math.round(processingFee * 100)
          },
          quantity: 1
        }
      ],
      success_url: origin + "/?checkout=success",
      cancel_url: origin + "/?checkout=cancelled"
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
