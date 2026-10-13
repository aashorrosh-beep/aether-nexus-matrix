import { createClient } from 'redis';

export const dynamic = 'force-dynamic';

export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      const client = createClient({ url: 'redis://127.0.0.1:6379' });
      await client.connect();
      
      await client.subscribe('nexus:telemetry', (message) => {
        controller.enqueue(new TextEncoder().encode(`data: ${message}\n\n`));
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
