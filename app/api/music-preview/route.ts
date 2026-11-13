import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") || "80s rock";
  const u = "https://itunes.apple.com/search?media=music&limit=6"
    + "&term=" + encodeURIComponent(q);
  try {
    const r = await fetch(u, { cache: "no-store" });
    const d = await r.json();
    const raw: Record<string, unknown>[] = d.results || [];
    const items = raw.map(x => ({
      id: String(x.trackId || Math.random()),
      track: String(x.trackName || "Track"),
      artist: String(x.artistName || "Artist"),
      art: String(x.artworkUrl100 || ""),
      preview: String(x.previewUrl || "")
    })).filter(x => Boolean(x.preview));
    return NextResponse.json({ ok: true, items });
  } catch {
    return NextResponse.json({ ok: false, items: [] });
  }
}
