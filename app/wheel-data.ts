export type HaloKind = "fire" | "fog" | "static" | "nebula";
export interface RibbonItem {
  id: string; name: string; es: string; href: string;
  border: string; puzzle?: boolean;
  r1: string; r2: string; r3?: string; r4?: string;
}
export interface NodeItem {
  id: string; x: number; y: number; size: number; kind: HaloKind;
  bolt: string; c1: string; c2: string;
  title: string; titleEs: string; sub: string; subEs: string;
  href: string; img: string; edge?: string;
}
const u = (id: string) => "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=520&h=520&q=80";
const b = (q: string) => "https://tse2.mm.bing.net/th?q=" + encodeURIComponent(q) + "&w=480&h=480&c=7&p=0";
export const ORB_FALLBACK = u("1462331940025-496dfbfc7564");
const R = (id: string, name: string, es: string, slug: string, border: string,
  r1: string, r2: string, puzzle = false, r3?: string, r4?: string): RibbonItem =>
  ({ id, name, es, href: "/sanctuary/" + slug, border, puzzle, r1, r2, r3, r4 });
const N = (id: string, x: number, y: number, size: number, kind: HaloKind,
  bolt: string, c1: string, c2: string, title: string, titleEs: string,
  sub: string, subEs: string, href: string, img: string, edge?: string): NodeItem =>
  ({ id, x, y, size, kind, bolt, c1, c2, title, titleEs, sub, subEs, href, img, edge });
export const RIBBONS: RibbonItem[] = [
  R("autism","Autism Spectrum","Espectro Autista","autism-spectrum","#3b82f6","#ef4444","#facc15",true,"#2563eb","#38bdf8"),
  R("down","Down Syndrome","Síndrome de Down","down-syndrome","#eab308","#1d4ed8","#facc15"),
  R("deafblind","Deaf / Blind","Sordos y Ciegos","deaf-blind","#7dd3fc","#f8fafc","#38bdf8"),
  R("ptsd","PTSD & Veterans","TEPT y Veteranos","ptsd-veterans","#14b8a6","#0d9488","#eab308"),
  R("mobility","Mobility & Rehab","Movilidad y Rehab","mobility-rehab","#22c55e","#16a34a","#84cc16"),
  R("peptides","Biomedical Peptides","Péptidos Biomédicos","biomedical-peptides","#a855f7","#7c3aed","#c084fc")
];
export const NODES: NodeItem[] = [
  N("megastores",800,155,13.6,"static","#38bdf8","#38bdf8","#fde047","MEGA STORES","MEGA TIENDAS","All Flagship Vaults","Bóvedas Principales","/stores/mega-stores",b("futuristic neon sneaker black background")),
  N("party",1450,230,13.6,"nebula","#38bdf8","#fb7185","#fde047","PARTY LAPOOZA","FIESTA LAPOOZA","Ultimate Event Vault","Eventos y Fiestas","/stores/party-lapooza",u("1530103862676-de8c9debad1d"),"right"),
  N("maternity",1220,560,11.8,"fog","#34d399","#10b981","#67e8f9","MATERNITY & CPR","MATERNIDAD Y RCP","Nursery & Safety","Cunas y Seguridad","/stores/expecting-and-cpr",b("warm modern baby nursery crib evening")),
  N("stadium",1460,880,13.6,"fog","#34d399","#10b981","#2dd4bf","ALBS NEXUS STADIUM","ESTADIO ALBS NEXUS","Pro Sports Corridor","Corredor Deportivo","/sportflix",u("1540747913346-19e32dc3e97e"),"right"),
  N("matrix",1170,1045,11.8,"fog","#22c55e","#22c55e","#86efac","THE MATRIX • AI","LA MATRIX • IA","AI Evolution","Evolución IA","/netrix/vr-immersion-bay",b("futuristic cyber ai android head black background")),
  N("christmas",800,1230,13.6,"fire","#ef4444","#ef4444","#f59e0b","CHRISTMAS STORE","TIENDA DE NAVIDAD","365 Holiday Magic","Magia Navideña 365","/stores/christmas-store",u("1543589077-47d81606c1bf"),"bottom"),
  N("stargazer",430,1045,11.8,"nebula","#38bdf8","#0ea5e9","#a855f7","STARGAZER & AUTO","COSMOS Y AUTO","Cosmos & Detailing","Telescopios y Auto","/stores/stargazer-mall",b("astronomy telescope silhouette purple starry nebula")),
  N("luxury",140,880,13.6,"fire","#f59e0b","#f59e0b","#fde047","LUXURY SUITES","SUITES DE LUJO","Top Brand Vault","Relojes y Alta Gama","/stores/luxury-couture",u("1523170335258-f5ed11844a49"),"left"),
  N("worldsfair",380,560,11.8,"static","#818cf8","#8b5cf6","#38bdf8","1964 WORLD'S FAIR","FERIA MUNDIAL 1964","Rare Vintage Grails","Reliquias Clásicas","/nostalgia",b("Unisphere Queens night globe")),
  N("squish",150,230,13.6,"nebula","#f43f5e","#ec4899","#c084fc","SQUISH & BLIND VAULT","PELUCHES Y CAJAS","Collector Plush Corridor","Peluches de Colección","/stores/squish-blindbox",b("colorful plushies collection dark lighting"),"left")
];
export const EXTRA_SEARCH = [
  { id:"bf", title:"Black Friday • Cyber Monday Vault (5 Daily Doorbusters)", href:"/stores/black-friday" },
  { id:"sh", title:"Apex Shoe Vault (Sizes 5-15)", href:"/stores/shoe-store" },
  { id:"mu", title:"NEXUS Music Town (Vinyl/CD/Tapes)", href:"/stores/music-town" },
  { id:"em", title:"Emergency Superstore (Flood/Fire)", href:"/stores/emergency-ready" },
  { id:"cw", title:"Pro Car Wash & Auto Bay", href:"/stores/car-wash-auto" }
];
