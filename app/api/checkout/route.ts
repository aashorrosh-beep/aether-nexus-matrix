import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    // Fallback direct payment link if STRIPE_SECRET_KEY is not yet in Vercel env
    if (!stripeKey) {
      if (process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK) {
        return NextResponse.json({ url: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK });
      }
      return NextResponse.json({ error: 'Missing STRIPE_SECRET_KEY in environment' }, { status: 500 });
    }

    const rawPrice = String(body.price || body.item?.price || '253.29').replace(/[^0-9.]/g, '');
    const amountCents = Math.max(50, Math.round(parseFloat(rawPrice || '253.29') * 100));
    const productName = body.title || body.name || body.item?.title || body.item?.name || 'ALBS Nexus Mall Order';
    const origin = req.headers.get('origin') || 'https://aether-nexus-matrix.vercel.app';

    const params = new URLSearchParams();
    params.append('mode', 'payment');
    params.append('success_url', `${origin}/?checkout=success`);
    params.append('cancel_url', `${origin}/?checkout=cancelled`);
    params.append('shipping_address_collection[allowed_countries][0]', 'US');
    params.append('line_items[0][price_data][currency]', 'usd');
    params.append('line_items[0][price_data][product_data][name]', productName);
    params.append('line_items[0][price_data][unit_amount]', String(amountCents));
    params.append('line_items[0][quantity]', '1');

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await stripeRes.json();
    if (session.url) {
      return NextResponse.json({ url: session.url });
    }
    return NextResponse.json({ error: session.error?.message || 'Stripe session failed' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
