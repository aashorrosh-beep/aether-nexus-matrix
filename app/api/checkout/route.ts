import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initializes Stripe using the key we saved in .env.local
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  try {
    const { itemName, priceInCents, itemId, depositInCents, requiresClearinghouse } = await req.json();

    // If it requires escrow, we charge the deposit amount. Otherwise, full price.
    const amountToCharge = requiresClearinghouse ? depositInCents : priceInCents;
    const displayName = requiresClearinghouse ? `${itemName} (50% ESCROW DEPOSIT)` : itemName;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: displayName,
              description: `SKU: ${itemId}`,
            },
            unit_amount: amountToCharge,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Sends them back to the storefront after paying
      success_url: 'https://aether-nexus-matrix.vercel.app/success',
      cancel_url: 'https://aether-nexus-matrix.vercel.app/',
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Gateway Error:", error);
    return NextResponse.json({ error: "Failed to initialize secure checkout." }, { status: 500 });
  }
}
