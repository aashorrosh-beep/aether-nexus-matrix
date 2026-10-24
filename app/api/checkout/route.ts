import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return NextResponse.json({ error: 'Stripe key missing' }, { status: 500 });
    const stripe = new Stripe(secret, { apiVersion: '2023-10-16' as any });
    const { name, price, image, storeId } = await req.json();

    const rawPrice = parseFloat(String(price || '29.99').replace(/[^0-9.]/g, '')) || 29.99;
    const isGC = String(storeId || '').includes('gift-card') || String(name || '').toLowerCase().includes('gift card');
    const ship = isGC ? 0 : (rawPrice < 100 ? 3.99 : (rawPrice < 250 ? 5.99 : (rawPrice < 500 ? 9.99 : 14.99)));
    const salesTax = isGC ? 0 : Number(((rawPrice + ship) * 0.0825).toFixed(2));
    const preFee = rawPrice + ship + salesTax;
    const gross = Number(((preFee + 0.30) / (1 - 0.029)).toFixed(2));
    const fee = Number((gross - preFee).toFixed(2));
    const origin = req.headers.get('origin') || 'https://aether-nexus-matrix.vercel.app';

    const items: any[] = [
      { price_data: { currency: 'usd', tax_behavior: 'exclusive', product_data: { name: name || 'ALBS Verified Item', images: image && String(image).startsWith('http') ? [image] : [] }, unit_amount: Math.round(rawPrice * 100) }, quantity: 1 }
    ];
    if (ship > 0) items.push({ price_data: { currency: 'usd', tax_behavior: 'exclusive', product_data: { name: 'Expedited Insured Shipping (3–7 Days)' }, unit_amount: Math.round(ship * 100) }, quantity: 1 });
    if (salesTax > 0) items.push({ price_data: { currency: 'usd', tax_behavior: 'exclusive', product_data: { name: 'State & Local Sales Tax (8.25% Pass-Through)' }, unit_amount: Math.round(salesTax * 100) }, quantity: 1 });
    if (fee > 0) items.push({ price_data: { currency: 'usd', tax_behavior: 'exclusive', product_data: { name: 'Card Processing Fee (2.9% + $0.30)' }, unit_amount: Math.round(fee * 100) }, quantity: 1 });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      shipping_address_collection: { allowed_countries: ['US'] },
      line_items: items,
      success_url: `${origin}/?checkout=success`,
      cancel_url: `${origin}/nostalgia/${storeId || ''}`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Checkout error' }, { status: 500 });
  }
}
