import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
interface Hit { id: string; title: string; store: string; href: string; kind: string; }
let CACHE: Hit[] | null = null;

const SMAP: Record<string, [string, string]> = {
  "autism-skus.ts": ["Autism Spectrum", "/sanctuary/autism-spectrum"],
  "down-skus.ts": ["Down Syndrome", "/sanctuary/down-syndrome"],
  "deaf-blind-skus.ts": ["Deaf / Blind", "/sanctuary/deaf-blind"],
  "ptsd-skus.ts": ["PTSD & Veterans", "/sanctuary/ptsd-veterans"],
  "mobility-skus.ts": ["Mobility & Rehab", "/sanctuary/mobility-rehab"],
  "peptides-skus.ts": ["Biomedical Peptides", "/sanctuary/biomedical-peptides"]
};

function buildIndex(): Hit[] {
  if (CACHE) return CACHE;
  const out: Hit[] = [], seen = new Set<string>();
  const add = (id: string, title: string, store: string, href: string) => {
    const k = href + "|" + title;
    if (title.length > 3 && !seen.has(k)) {
      seen.add(k);
      out.push({ id, title, store, href, kind: "product" });
    }
  };
  const walk = (d: string): string[] =>
    fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap(e =>
      e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]) : [];
  const appDir = path.join(process.cwd(), "app");
  for (const f of walk(appDir).filter(x => /\.(ts|tsx)$/.test(x))) {
    const rel = f.replace(/\\/g, "/"), base = path.basename(rel);
    const m = rel.match(/app\/(stores\/[^/]+|sportflix(?:\/[^/]+)?|nostalgia(?:\/[^/]+)?|netrix\/[^/]+)\//);
    const info = SMAP[base] || (m ? [m[1].split("/").pop()!.replace(/-/g, " ").toUpperCase(), "/" + m[1]] : null);
    if (!info) continue;
    const [store, href] = info, txt = fs.readFileSync(f, "utf8");
    const r1 = /id["']?\s*:\s*["']([A-Z]{2,3}-\d{2,4})["'][^;\n]{0,120}?(?:name|title)["']?\s*:\s*["']([^"']{3,90})["']/g;
    const r2 = /["'](\d{1,4})\|([^"'|]{4,85})["']/g;
    let x: RegExpExecArray | null, n = 1;
    while ((x = r1.exec(txt))) add(x[1], x[2].trim(), store, href);
    while ((x = r2.exec(txt))) add("SKU-" + (n++), x[2].trim(), store, href);
  }
  CACHE = out;
  return out;
}

export async function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get("q") || "").trim().toLowerCase();
  if (q.length < 2) return NextResponse.json({ hits: [] });
  const terms = q.split(/\s+/);
  const hits = buildIndex().filter(h =>
    terms.every(t => (h.id + " " + h.title + " " + h.store).toLowerCase().includes(t))
  ).slice(0, 14);
  return NextResponse.json({ hits });
}
