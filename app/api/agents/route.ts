import { NextResponse } from 'next/server';
import { createClient } from 'redis';

export async function GET() {
  try {
    const client = createClient({ url: 'redis://127.0.0.1:6379' });
    await client.connect();

    const cachedAgents = await client.get('albs:agents');
    await client.disconnect();

    if (cachedAgents) {
      return NextResponse.json(JSON.parse(cachedAgents));
    }

    return NextResponse.json([], { status: 200 });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Failed to fetch agents from vault' }, { status: 500 });
  }
}
