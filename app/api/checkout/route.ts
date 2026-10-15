import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    // 🛡️ Initialize Stripe INSIDE the request so Vercel doesn't crash during the build
    const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy';
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
    });

    const { itemName, priceInCents, itemId, depositInCents, requiresClearinghouse } = await req.json();

    const amountToCharge = requiresClearinghouse ? depositInCents : priceInCents;
    const displayName = requiresClearinghouse ? `${itemName} (50% ESCROW DEPOSIT)` : itemName;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: displayName, description: `SKU: ${itemId}` },
          unit_amount: amountToCharge,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://aether-nexus-matrix.vercel.app/success',
      cancel_url: 'https://aether-nexus-matrix.vercel.app/',
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Gateway Error:", error);
    return NextResponse.json({ error: "Failed to initialize secure checkout." }, { status: 500 });
  }
}
