import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: 'Stripe key missing in .env.local' }, { status: 500 });
    }
    const stripe = new Stripe(secret, { apiVersion: '2023-10-16' as any });
    const body = await req.json();
    const { name, price, image, storeId } = body;

    const rawPrice = parseFloat(String(price || '29.99').replace(/[^0-9.]/g, '')) || 29.99;
    const ship = rawPrice < 100 ? 3.99 : (rawPrice < 250 ? 5.99 : (rawPrice < 500 ? 9.99 : 14.99));

    // Customer pays 8.25% Sales Tax on Item + Shipping so ALBS never pays tax out of profit
    const salesTax = Number(((rawPrice + ship) * 0.0825).toFixed(2));
    const preFeeTotal = rawPrice + ship + salesTax;

    // Gross-up math so customer pays 100% of Stripe's 2.9% + $0.30 fee on the entire transaction
    const finalGrossTotal = Number(((preFeeTotal + 0.30) / (1 - 0.029)).toFixed(2));
    const processingFee = Number((finalGrossTotal - preFeeTotal).toFixed(2));

    const origin = req.headers.get('origin') || 'https://aether-nexus-matrix.vercel.app';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      billing_address_collection: 'required',
      shipping_address_collection: { allowed_countries: ['US'] },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            tax_behavior: 'exclusive',
            product_data: {
              name: name || 'ALBS Nexus Verified Item',
              description: '100% Authenticated & Certified • Insured 3–7 Day Expedited Carrier',
              images: image && String(image).startsWith('http') ? [image] : [],
            },
            unit_amount: Math.round(rawPrice * 100),
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            tax_behavior: 'exclusive',
            product_data: {
              name: 'Expedited Insured Shipping (3–7 Days)',
              description: '4.8★+ Certified Carrier w/ Full Claim Protection',
            },
            unit_amount: Math.round(ship * 100),
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            tax_behavior: 'exclusive',
            product_data: {
              name: 'State & Local Sales Tax (Customer Pass-Through)',
              description: 'Calculated at 8.25% statutory rate so zero tax is deducted from merchant',
            },
            unit_amount: Math.round(salesTax * 100),
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            tax_behavior: 'exclusive',
            product_data: {
              name: 'Credit Card Processing Fee (2.9% + $0.30)',
              description: 'Direct Stripe Payment Gateway Pass-Through',
            },
            unit_amount: Math.round(processingFee * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/?checkout=success`,
      cancel_url: `${origin}/nostalgia/${storeId || ''}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Checkout error' }, { status: 500 });
  }
}
