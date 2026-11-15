export type HaloKind = "fire" | "fog" | "static" | "nebula";
export interface RibbonItem {
  id: string; name: string; es: string; href: string;
  border: string; puzzle?: boolean;
  r1: string; r2: string; r3?: string; r4?: string;
}
export interface NodeItem {
  id: string; x: number; y: number; size: number; kind: HaloKind;
  bolt: string; c1: string; c2: string;
  title: string; sub: string; href: string; img: string;
}
const b = (q: string) =>
  "https://tse1.mm.bing.net/th?q=" + encodeURIComponent(q) + "&w=480&h=480&c=7&p=0";
export const ORB_FALLBACK = b("deep space dark glowing nebula");
const R = (id: string, name: string, es: string, slug: string, border: string,
  r1: string, r2: string, puzzle = false, r3?: string, r4?: string): RibbonItem =>
  ({ id, name, es, href: "/sanctuary/" + slug, border, puzzle, r1, r2, r3, r4 });
const N = (id: string, x: number, y: number, size: number, kind: HaloKind,
  bolt: string, c1: string, c2: string, title: string, sub: string,
  href: string, q: string): NodeItem =>
  ({ id, x, y, size, kind, bolt, c1, c2, title, sub, href, img: b(q) });
export const RIBBONS: RibbonItem[] = [
  R("autism","Autism Spectrum","Espectro Autista","autism-spectrum","#3b82f6","#ef4444","#facc15",true,"#2563eb","#38bdf8"),
  R("down","Down Syndrome","Síndrome de Down","down-syndrome","#eab308","#1d4ed8","#facc15"),
  R("deafblind","Deaf / Blind","Sordos y Ciegos","deaf-blind","#7dd3fc","#f8fafc","#38bdf8"),
  R("ptsd","PTSD & Veterans","TEPT y Veteranos","ptsd-veterans","#14b8a6","#0d9488","#eab308"),
  R("mobility","Mobility & Rehab","Movilidad y Rehab","mobility-rehab","#22c55e","#16a34a","#84cc16"),
  R("peptides","Biomedical Peptides","Péptidos Biomédicos","biomedical-peptides","#a855f7","#7c3aed","#c084fc")
];
export const NODES: NodeItem[] = [
  N("megastores",800,152,13.2,"static","#38bdf8","#38bdf8","#fde047",
    "MEGA STORES","All Flagship Vaults","/stores/mega-stores",
    "glowing neon high top sneaker black background"),
  N("party",1415,196,13.2,"nebula","#38bdf8","#fb7185","#fde047",
    "PARTY LAPOOZA","Ultimate Event Vault","/stores/party-lapooza",
    "glowing party balloons dark evening celebration"),
  N("maternity",1165,550,10.6,"fog","#34d399","#10b981","#67e8f9",
    "MATERNITY & CPR","Nursery & Safety","/stores/expecting-and-cpr",
    "warm lamp modern baby nursery crib evening"),
  N("stadium",1455,858,13.2,"fog","#34d399","#10b981","#2dd4bf",
    "ALBS NEXUS STADIUM","Pro Sports Corridor","/sportflix",
    "night football stadium green turf lights dark sky"),
  N("matrix",1065,835,10.6,"fog","#22c55e","#22c55e","#86efac",
    "THE MATRIX • AI","AI Evolution","/netrix/vr-immersion-bay",
    "futuristic glowing cyber ai android head black background"),
  N("christmas",800,1022,13.2,"fire","#ef4444","#ef4444","#f59e0b",
    "CHRISTMAS STORE","365 Holiday Magic","/stores/christmas-store",
    "glowing warm decorated christmas tree dark night"),
  N("stargazer",535,835,10.6,"nebula","#38bdf8","#0ea5e9","#a855f7",
    "STARGAZER & AUTO","Cosmos & Detailing","/stores/stargazer-mall",
    "astronomy telescope silhouette purple starry nebula"),
  N("luxury",145,858,13.2,"fire","#f59e0b","#f59e0b","#fde047",
    "LUXURY SUITES","Top Brand Vault","/stores/luxury-couture",
    "dark dial luxury automatic chronograph watch black background"),
  N("worldsfair",435,550,10.6,"static","#818cf8","#8b5cf6","#38bdf8",
    "1964 WORLD'S FAIR","Rare Vintage Grails","/nostalgia",
    "1964 new york worlds fair unisphere dusk night"),
  N("squish",185,196,13.2,"nebula","#f43f5e","#ec4899","#c084fc",
    "SQUISH & BLIND VAULT","Collector Plush Corridor","/stores/squish-blindbox",
    "colorful plushies collection dark cozy lighting")
];
export const EXTRA_SEARCH = [
  { id:"sh", title:"Apex Shoe Vault (Sizes 5-15)", href:"/stores/shoe-store" },
  { id:"mu", title:"NEXUS Music Town (Vinyl/CD/Tapes)", href:"/stores/music-town" },
  { id:"em", title:"Emergency Superstore (Flood/Fire)", href:"/stores/emergency-ready" },
  { id:"cw", title:"Pro Car Wash & Auto Bay", href:"/stores/car-wash-auto" }
];
